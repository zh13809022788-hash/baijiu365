#!/usr/bin/env python3
"""
Baijiu365 Data Pipeline Validator
===================================
强制执行预定义 schema 标准。Hermes 产出的所有白酒数据必须通过此校验。
未通过校验的数据 = 无效数据，不会被 Codex 消费。

用法:
    python validate.py                    # 校验所有 JSON 文件
    python validate.py --file maotai      # 校验单个酒款
    python validate.py --changed           # 仅校验 git 变更的文件
    python validate.py --json              # JSON 输出，供编排脚本消费
"""

import json
import sys
import os
import argparse
from pathlib import Path
from datetime import datetime

# jsonschema is required
try:
    from jsonschema import validate as jsonschema_validate
    from jsonschema.exceptions import ValidationError as SchemaError
except ImportError:
    print("FATAL: jsonschema not installed. Run: pip install jsonschema")
    sys.exit(1)


SCRIPT_DIR = Path(__file__).parent.resolve()
SCHEMA_PATH = SCRIPT_DIR / "schemas" / "baijiu-variety.schema.json"
INDEX_PATH = SCRIPT_DIR / "index.json"
VARIETIES_DIR = SCRIPT_DIR / "varieties"

# GB/T 格式校验：必须是 GB/T 后跟空格和数字的格式
import re
GBT_PATTERN = re.compile(r'^(GB/T|DB\d{2}/T)\s+\d+')

# Aroma types that should trigger "产区索引卡片" update on homepage
REGION_TRIGGER_KEYWORDS = [
    "sichuan", "guizhou", "shanxi", "jiangsu", "anhui", "shaanxi",
    "hunan", "hubei", "henan", "shandong", "hebei", "beijing",
    "guangdong", "guangxi", "liaoning", "zhejiang", "fujian",
    "tianjin", "chongqing", "jiangxi", "yunnan", "xinjiang",
    "inner mongolia", "tibet", "ningxia", "gansu", "qinghai",
    "heilongjiang", "jilin", "hainan"
]

# Required top-level fields — 7字段铁律 (COO v2.0)
REQUIRED_TOP_FIELDS = [
    "name",           # 品牌
    "name_cn",        # 酒款名
    "aroma_type",     # 香型
    "abv_range",      # 度数
    "gbt_standard",   # GB/T 标准号
    "region",         # 产区
    "id"              # 唯一标识
]

# 质量检查：如下字段不能为空字符串或默认值
NON_EMPTY_STRING_FIELDS = [
    "tasting_notes.nose",
    "tasting_notes.palate",
    "tasting_notes.finish",
    "history",
    "buying_guide.where_to_buy_global",
    "faq"
]

# SEO 必须字段
SEO_REQUIRED = ["meta_title", "meta_description"]


def load_json(path: Path) -> dict:
    """加载 JSON 文件，失败时抛出明确错误。"""
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if not isinstance(data, dict):
            raise ValueError(f"Root must be a JSON object, got {type(data).__name__}")
        return data
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON: {e}")
    except FileNotFoundError:
        raise ValueError(f"File not found: {path}")


def validate_schema(data: dict, schema: dict, file_id: str) -> list[str]:
    """JSON Schema 严格校验。返回错误列表，空列表 = 通过。"""
    errors = []
    try:
        jsonschema_validate(data, schema)
    except SchemaError as e:
        errors.append(f"[SCHEMA] {file_id}: {e.message}")
    return errors


def validate_required_fields(data: dict, file_id: str) -> list[str]:
    """检查所有必填顶层字段是否存在且非空。"""
    errors = []
    for field in REQUIRED_TOP_FIELDS:
        if field not in data or data[field] is None:
            errors.append(f"[MISSING] {file_id}: required field '{field}' missing or null")
        elif isinstance(data[field], str) and not data[field].strip():
            errors.append(f"[EMPTY] {file_id}: required field '{field}' is empty string")
    return errors


def validate_nested_field(data: dict, dotted_path: str, file_id: str) -> list[str]:
    """检查嵌套字段（如 tasting_notes.nose）是否存在且非空。"""
    errors = []
    keys = dotted_path.split(".")
    current = data
    for key in keys:
        if not isinstance(current, dict) or key not in current:
            errors.append(f"[MISSING] {file_id}: nested field '{dotted_path}' not found")
            return errors
        current = current[key]
    if current is None:
        errors.append(f"[EMPTY] {file_id}: '{dotted_path}' is null")
    elif isinstance(current, str) and not current.strip():
        errors.append(f"[EMPTY] {file_id}: '{dotted_path}' is empty string")
    elif isinstance(current, list) and len(current) == 0:
        errors.append(f"[EMPTY] {file_id}: '{dotted_path}' is empty array")
    return errors


def validate_seo(data: dict, file_id: str) -> list[str]:
    """SEO 字段完整性检查。"""
    errors = []
    seo = data.get("seo", {})
    for field in SEO_REQUIRED:
        val = seo.get(field, "")
        if not val or not val.strip():
            errors.append(f"[SEO] {file_id}: seo.{field} missing or empty")
    return errors


def validate_gbt(data: dict, file_id: str) -> list[str]:
    """GB/T 标准号校验 — 强制引用权威标准，Google EEAT 信号。"""
    errors = []
    gbt = data.get("gbt_standard", "")
    if not gbt or not gbt.strip():
        errors.append(f"[GBT] {file_id}: gbt_standard missing — 7-field rule violation")
    elif not GBT_PATTERN.match(gbt.strip()):
        errors.append(f"[GBT] {file_id}: gbt_standard '{gbt}' invalid format, must be 'GB/T XXXX'")
    return errors


def validate_raw_materials(data: dict, file_id: str) -> list[str]:
    """原料字段深度校验 — 7字段铁律第6项。production.raw_materials 必须存在且非空。"""
    errors = []
    production = data.get("production", {})
    raw = production.get("raw_materials", [])
    if not raw or len(raw) == 0:
        errors.append(f"[RAW] {file_id}: production.raw_materials missing or empty — 7-field rule violation")
    return errors


def validate_index_consistency(varieties_data: dict, index_data: dict) -> list[str]:
    """确保 index.json 与 varieties/ 目录一致。"""
    errors = []
    index_ids = {v["id"] for v in index_data.get("varieties", [])}
    file_ids = set(varieties_data.keys())

    in_index_not_file = index_ids - file_ids
    in_file_not_index = file_ids - index_ids

    for vid in in_index_not_file:
        errors.append(f"[SYNC] {vid}: in index.json but no file in varieties/")
    for vid in in_file_not_index:
        errors.append(f"[SYNC] {vid}: file exists but not listed in index.json")
    return errors


def detect_new_regions(varieties_data: dict, known_regions: set = None) -> list[str]:
    """检测是否有新的产区出现。返回新产区列表。"""
    if known_regions is None:
        # 从 index.json 读取已知产区
        region_set = set()
        all_varieties = list(varieties_data.values())
        for v in all_varieties:
            region = v.get("region", "").strip().lower()
            if region:
                region_set.add(region)
        # 从信号文件读取历史记录
        signal_path = SCRIPT_DIR / "build_signal.json"
        if signal_path.exists():
            try:
                signal = json.loads(signal_path.read_text(encoding="utf-8"))
                known_regions = set(r.lower() for r in signal.get("known_regions", []))
            except Exception:
                known_regions = set()
        else:
            known_regions = set()

    new_regions = []
    all_data = list(varieties_data.values())
    for v in all_data:
        region = v.get("region", "").strip().lower()
        if region and region not in known_regions:
            new_regions.append(v.get("region", ""))
    return new_regions


def validate_all() -> dict:
    """
    全量校验。
    返回结构化结果，供编排脚本消费。
    """
    if not SCHEMA_PATH.exists():
        return {
            "status": "FATAL",
            "error": f"Schema file not found: {SCHEMA_PATH}",
            "timestamp": datetime.now().isoformat()
        }

    schema = load_json(SCHEMA_PATH)
    index_data = load_json(INDEX_PATH) if INDEX_PATH.exists() else {"varieties": []}

    # 加载所有 variety JSON 文件
    varieties_data = {}
    file_errors = []
    if VARIETIES_DIR.exists():
        for json_file in sorted(VARIETIES_DIR.glob("*.json")):
            try:
                varieties_data[json_file.stem] = load_json(json_file)
            except ValueError as e:
                file_errors.append(f"[LOAD] {json_file.name}: {e}")

    all_errors = []
    all_warnings = []

    for file_id, data in varieties_data.items():
        # Schema 校验
        all_errors.extend(validate_schema(data, schema, file_id))

        # 必填字段
        all_errors.extend(validate_required_fields(data, file_id))

        # 嵌套质量字段
        for field in NON_EMPTY_STRING_FIELDS:
            result = validate_nested_field(data, field, file_id)
            if field.startswith("faq"):
                # FAQ 为空是警告不是错误
                all_warnings.extend(result)
            else:
                all_errors.extend(result)

        # SEO
        all_errors.extend(validate_seo(data, file_id))

        # 7-field iron rule: GB/T + raw_materials
        all_errors.extend(validate_gbt(data, file_id))
        all_errors.extend(validate_raw_materials(data, file_id))

        # 检查 updated_at 是否超过 90 天
        updated = data.get("updated_at", "")
        if updated:
            try:
                dt = datetime.fromisoformat(updated)
                if (datetime.now() - dt).days > 90:
                    all_warnings.append(f"[STALE] {file_id}: last updated {updated} (>90 days)")
            except ValueError:
                all_warnings.append(f"[FORMAT] {file_id}: invalid updated_at format")

    # Index 一致性
    all_errors.extend(validate_index_consistency(varieties_data, index_data))

    # 产区检测
    new_regions = detect_new_regions(varieties_data)

    result = {
        "status": "PASS" if len(all_errors) == 0 else "FAIL",
        "timestamp": datetime.now().isoformat(),
        "total_files": len(varieties_data),
        "total_files_in_index": len(index_data.get("varieties", [])),
        "errors": all_errors,
        "warnings": all_warnings,
        "new_regions": new_regions,
        "region_update_needed": len(new_regions) > 0,
        "variety_ids": sorted(varieties_data.keys()),
        "aroma_types": sorted(set(v.get("aroma_type", "unknown") for v in varieties_data.values())),
        "regions": sorted(set(v.get("region", "").strip() for v in varieties_data.values() if v.get("region")))
    }

    return result


def print_human_result(result: dict):
    """人类可读输出。"""
    print(f"\n{'='*60}")
    print(f"  Baijiu365 Data Pipeline Validator")
    print(f"{'='*60}")
    print(f"  Status:     {result['status']}")
    print(f"  Time:       {result['timestamp']}")
    print(f"  Files:      {result['total_files']} validated")
    print(f"  In Index:   {result['total_files_in_index']}")
    print(f"{'='*60}")

    if result["errors"]:
        print(f"\n  ERRORS ({len(result['errors'])}):")
        for e in result["errors"]:
            print(f"    {e}")

    if result["warnings"]:
        print(f"\n  WARNINGS ({len(result['warnings'])}):")
        for w in result["warnings"]:
            print(f"    {w}")

    if result["region_update_needed"]:
        print(f"\n  REGION UPDATE REQUIRED:")
        print(f"    New regions detected: {result['new_regions']}")
        print(f"    Codex must update 首页产区索引卡片!")

    print(f"\n  Aroma types:  {result['aroma_types']}")
    print(f"  Regions:      {result['regions']}")
    print(f"  Variety IDs:  {result['variety_ids']}")
    print()

    if result["status"] == "PASS":
        print("  All checks passed. Signal Codex to build.")
    else:
        print(f"  BLOCKED: {len(result['errors'])} errors must be fixed before Codex can build.")


def main():
    parser = argparse.ArgumentParser(description="Baijiu365 Data Pipeline Validator")
    parser.add_argument("--file", help="Validate specific variety by id (without .json)")
    parser.add_argument("--json", action="store_true", help="Output result as JSON")
    parser.add_argument("--quiet", action="store_true", help="Silence non-error output")
    args = parser.parse_args()

    if args.file:
        # 单文件校验
        schema = load_json(SCHEMA_PATH)
        file_path = VARIETIES_DIR / f"{args.file}.json"
        data = load_json(file_path)
        errors = []
        errors.extend(validate_schema(data, schema, args.file))
        errors.extend(validate_required_fields(data, args.file))
        for field in NON_EMPTY_STRING_FIELDS:
            errors.extend(validate_nested_field(data, field, args.file))
        errors.extend(validate_seo(data, args.file))
        errors.extend(validate_gbt(data, args.file))
        errors.extend(validate_raw_materials(data, args.file))
        result = {
            "status": "PASS" if len(errors) == 0 else "FAIL",
            "timestamp": datetime.now().isoformat(),
            "total_files": 1,
            "total_files_in_index": 1,
            "file": args.file,
            "errors": errors,
            "warnings": [],
            "variety_ids": [args.file],
            "aroma_types": [data.get("aroma_type", "unknown")],
            "regions": [data.get("region", "")],
            "new_regions": [],
            "region_update_needed": False
        }
    else:
        result = validate_all()

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    elif not args.quiet:
        print_human_result(result)

    # 返回非零退出码让 CI/CD 感知
    if result["status"] == "FAIL" or result.get("region_update_needed"):
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
