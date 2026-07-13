#!/usr/bin/env python3
"""
Baijiu365 Pipeline Orchestrator
================================
数据管道总协调器 — 串联 验证 → 产区检测 → 构建信号生成 → Git 提交。

职责:
    1. 运行 validate.py 校验所有酒款 JSON 数据的完整性
    2. 检测新产区 → 标记首页索引卡片需要更新的信号
    3. 生成/更新 build_signal.json → Codex 消费并触发编译
    4. 可选: 自动 git commit 数据变更

AI 角色分工:
    - Hermes:  生产 JSON 数据 → data_pipeline/varieties/*.json
    - WorkBuddy (本脚本): 校验 + 信号生成 + 协调
    - Codex:   读取 build_signal.json → 触发编译 + 更新首页

用法:
    python orchestrate.py                  # 全流程: 校验→信号→(可选git)
    python orchestrate.py --validate-only  # 仅校验
    python orchestrate.py --ci             # CI 模式, 严格退出码
"""

import json
import sys
import subprocess
import argparse
from pathlib import Path
from datetime import datetime

SCRIPT_DIR = Path(__file__).parent.resolve()
BUILD_SIGNAL_PATH = SCRIPT_DIR / "build_signal.json"
INDEX_PATH = SCRIPT_DIR / "index.json"
VALIDATE_SCRIPT = SCRIPT_DIR / "validate.py"
SCHEMA_PATH = SCRIPT_DIR / "schemas" / "baijiu-variety.schema.json"


def run_validation(json_output: bool = False) -> dict:
    """运行 validate.py 并返回结构化结果。"""
    cmd = [
        sys.executable, str(VALIDATE_SCRIPT),
        "--json",
        "--quiet"
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30, cwd=str(SCRIPT_DIR))
        if result.returncode == 0 or result.returncode == 1:
            # 0 = PASS, 1 = FAIL (both valid runs)
            return json.loads(result.stdout.strip())
        else:
            return {
                "status": "FATAL",
                "error": f"Validator crashed with exit code {result.returncode}",
                "stderr": result.stderr.strip(),
                "timestamp": datetime.now().isoformat()
            }
    except subprocess.TimeoutExpired:
        return {
            "status": "FATAL",
            "error": "Validator timed out (>30s)",
            "timestamp": datetime.now().isoformat()
        }
    except json.JSONDecodeError as e:
        return {
            "status": "FATAL",
            "error": f"Validator returned invalid JSON: {e}",
            "timestamp": datetime.now().isoformat()
        }


def write_build_signal(validation_result: dict) -> dict:
    """根据校验结果生成构建信号文件。"""
    region_update = validation_result.get("region_update_needed", False)
    new_regions = validation_result.get("new_regions", [])

    # 加载已知产区历史
    known_regions = []
    if BUILD_SIGNAL_PATH.exists():
        try:
            old_signal = json.loads(BUILD_SIGNAL_PATH.read_text(encoding="utf-8"))
            known_regions = old_signal.get("known_regions", [])
        except Exception:
            pass

    # 合并新产区
    updated_regions = sorted(set(r.lower() for r in (known_regions + new_regions)))

    can_build = validation_result["status"] == "PASS" and len(new_regions) == 0

    missing_files = []
    if "variety_ids" in validation_result:
        index_data = json.loads(INDEX_PATH.read_text(encoding="utf-8")) if INDEX_PATH.exists() else {"varieties": []}
        index_ids = {v["id"] for v in index_data.get("varieties", [])}
        file_ids = set(validation_result.get("variety_ids", []))
        missing_files = sorted(index_ids - file_ids)

    signal = {
        "$schema": "https://baijiu365.com/data_pipeline/schemas/build_signal.schema.json",
        "version": "1.0.0",
        "last_validated": validation_result["timestamp"],
        "validation_status": validation_result["status"],
        "validation_errors": len(validation_result.get("errors", [])),
        "validation_warnings": len(validation_result.get("warnings", [])),

        "build_requested": can_build,
        "build_reason": _build_reason(validation_result, region_update, new_regions, missing_files, can_build),

        "data_summary": {
            "total_varieties": validation_result.get("total_files", 0),
            "total_in_index": validation_result.get("total_files_in_index", 0),
            "aroma_types": validation_result.get("aroma_types", []),
            "regions": validation_result.get("regions", []),
            "files_validated": validation_result.get("variety_ids", []),
            "files_missing": missing_files
        },

        "region_update": {
            "needed": region_update,
            "new_regions": new_regions,
            "action": "Codex must update 首页产区索引卡片" if region_update else "No region update needed",
            "current_known_regions": updated_regions
        },

        "content_type_updates": {
            "aroma_types_added": validation_result.get("aroma_types", []),
            "aroma_types_removed": [],
            "action": "If new aroma types were added, verify filter pages still work"
        },

        "build_instructions": {
            "astro_build": True,
            "sitemap_regenerate": True,
            "rss_update": True,
            "internal_links_check": True,
            "homepage_region_card_update": region_update,
            "notes": "Run 'npm run build' after all missing variety JSON files are created and validation passes."
            if not can_build
            else "All checks passed. Ready to build."
        },

        "known_regions": updated_regions
    }

    BUILD_SIGNAL_PATH.write_text(
        json.dumps(signal, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8"
    )

    return signal


def _build_reason(result: dict, region_update: bool, new_regions: list,
                  missing_files: list, can_build: bool) -> str:
    """生成构建原因说明。"""
    reasons = []

    if result["status"] == "FAIL":
        reasons.append(f"{len(result.get('errors', []))} validation errors")
    if missing_files:
        reasons.append(f"{len(missing_files)} varieties missing from data_pipeline")
    if region_update and new_regions:
        regions_str = ", ".join(new_regions)
        reasons.append(f"New regions detected: {regions_str}")
    if can_build:
        reasons.append("All checks passed. Ready for Codex build.")

    return ". ".join(reasons)


def print_orchestration_summary(signal: dict):
    """打印编排总结。"""
    ds = signal.get("data_summary", {})
    ru = signal.get("region_update", {})

    print(f"\n{'='*60}")
    print(f"  Baijiu365 Pipeline Orchestrator")
    print(f"{'='*60}")
    print(f"  Validation:    {signal['validation_status']} ({signal['validation_errors']} errors)")
    print(f"  Build Ready:   {'YES' if signal['build_requested'] else 'NO'}")
    print(f"  Varieties:     {ds.get('total_varieties', 0)}/{ds.get('total_in_index', 0)} complete")
    print(f"  New Regions:   {ru.get('new_regions', [])}")
    print(f"  Region Card:   {'UPDATE NEEDED' if ru.get('needed') else 'OK'}")
    print(f"{'='*60}")
    print(f"  Signal file:   {BUILD_SIGNAL_PATH}")
    print(f"  Reason: {signal.get('build_reason', '')}")
    print()


def main():
    parser = argparse.ArgumentParser(description="Baijiu365 Pipeline Orchestrator")
    parser.add_argument("--validate-only", action="store_true", help="Only validate, don't write signal file")
    parser.add_argument("--ci", action="store_true", help="CI mode — exit 0 only if build is ready")
    args = parser.parse_args()

    # Step 1: 运行校验
    print("[1/3] Running validation...")
    validation_result = run_validation(json_output=True)

    if validation_result["status"] == "FATAL":
        print(f"FATAL: {validation_result.get('error', 'Unknown error')}")
        if validation_result.get("stderr"):
            print(validation_result["stderr"])
        sys.exit(2)

    validation_status = validation_result["status"]
    print(f"      Status: {validation_status}")

    if args.validate_only:
        print("      --validate-only: skipping signal generation")
        sys.exit(0 if validation_status == "PASS" else 1)

    # Step 2: 生成构建信号
    print("[2/3] Generating build signal...")
    signal = write_build_signal(validation_result)
    print(f"      Signal written to {BUILD_SIGNAL_PATH}")

    # Step 3: 总结
    print("[3/3] Orchestration complete")
    print_orchestration_summary(signal)

    # 退出码
    if args.ci:
        if signal["build_requested"]:
            sys.exit(0)
        else:
            sys.exit(1)
    else:
        sys.exit(0 if signal["build_requested"] else 1)


if __name__ == "__main__":
    main()
