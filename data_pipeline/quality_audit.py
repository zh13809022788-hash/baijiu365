#!/usr/bin/env python3
"""
Baijiu365 质量蓄水期全站审计脚本
=================================
质量蓄水期三大质检维度：
  1. Soft 404 扫描 — 扫描 dist/ 所有页面，检测内容不足/元数据缺失/死链
  2. 数据完整性核对 — 检查 /db/ 下每个页面的7维度完整性，标记 draft
  3. 内链可达性 — 验证术语表→数据库页面在3次点击内可达

用法:
    python quality_audit.py                        # 全量审计
    python quality_audit.py --mode soft404          # 仅Soft 404扫描
    python quality_audit.py --mode completeness     # 仅数据完整性核对
    python quality_audit.py --mode links            # 仅内链验证
    python quality_audit.py --json                  # JSON输出
"""

import json
import sys
import os
import re
import argparse
from pathlib import Path
from datetime import datetime
from html.parser import HTMLParser
from collections import defaultdict

# ============================================================
# Configuration
# ============================================================

SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
DIST_DIR = PROJECT_ROOT / "dist"
PAGES_DIR = PROJECT_ROOT / "src" / "pages"
VARIETIES_DIR = SCRIPT_DIR / "varieties"
INDEX_PATH = SCRIPT_DIR / "index.json"
SCHEMA_PATH = SCRIPT_DIR / "schemas" / "baijiu-variety.schema.json"
REPORT_PATH = SCRIPT_DIR / "quality_report.json"
LINK_GRAPH_PATH = SCRIPT_DIR / "link_graph.json"

# Soft 404 阈值
MIN_MEANINGFUL_CONTENT_CHARS = 500      # 正文内容至少500字符
MIN_HEADINGS = 1                         # 至少1个h1
REQUIRED_META = ["title", "description"]

# 7维度数据结构必含字段
# buying 维度使用灵活检查：prices 数组 / value_picks+splurge_picks / price_range 字符串，任一即可
DB_7_DIMENSIONS = [
    ("brand",        ["name", "name_cn"]),
    ("aroma",        ["aroma_type"]),
    ("specs",        ["abv_range", "gbt_standard"]),
    ("origin",       ["region", "production.raw_materials"]),
    ("tasting",      ["tasting_notes.nose", "tasting_notes.palate", "tasting_notes.finish"]),
    ("buying",       ["buying_guide.where_to_buy_global"]),
    ("context",      ["history", "faq", "seo.meta_title", "seo.meta_description"]),
]

# buying 维度的附加价格检查（灵活匹配）
BUYING_PRICE_PATHS = [
    "buying_guide.price_range",
    "buying_guide.prices",
    "buying_guide.value_picks",
    "buying_guide.splurge_picks",
]

# 旧博客式页面 — 需要在下一阶段淘汰
LEGACY_BLOG_PAGES = [
    "how-to-drink-baijiu",
    "how-to-buy-baijiu-outside-china",
    "how-to-spot-fake-maotai",
    "baijiu-vs-vodka",
    "baijiu-101",
]

# 旧品牌页面 — 会被 /db/ 取代
LEGACY_BRAND_PAGES = [
    "brands/maotai",
]

# 合法系统页面（不管内容多少都不算Soft 404）
SYSTEM_PAGES = [
    "404",
    "rss.xml",
    "llms.txt",
    "sitemap-0.xml",
    "sitemap-index.xml",
    "robots.txt",
]

# 薄但合法的页面 — 作者档案、重定向页等
THIN_BUT_VALID_PREFIXES = [
    "author/",
]


# ============================================================
# HTML 解析器
# ============================================================

class PageInspector(HTMLParser):
    """轻量级 HTML 检查器，不依赖完整 DOM。"""

    def __init__(self):
        super().__init__()
        self.title = None
        self.meta_description = None
        self.meta_robots = None
        self.canonical = None
        self.h1_count = 0
        self.h2_count = 0
        self.all_links = []
        self.body_text = []
        self.in_title = False
        self.in_body = False
        self.in_nav = False
        self.in_footer = False
        self.in_script = False
        self.in_style = False
        self.text_buffer = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "body":
            self.in_body = True
        elif tag in ("nav", "header"):
            self.in_nav = True
        elif tag == "footer":
            self.in_footer = True
        elif tag == "script":
            self.in_script = True
        elif tag == "style":
            self.in_style = True
        elif tag == "meta":
            name = attrs_dict.get("name", "")
            prop = attrs_dict.get("property", "")
            content = attrs_dict.get("content", "")
            if name == "description" or prop == "og:description":
                self.meta_description = content
            if name == "robots":
                self.meta_robots = content
        elif tag == "link":
            if attrs_dict.get("rel") == "canonical":
                self.canonical = attrs_dict.get("href", "")
        elif tag in ("h1",):
            self.h1_count += 1
        elif tag in ("h2",):
            self.h2_count += 1
        elif tag == "a":
            href = attrs_dict.get("href", "")
            if href and not href.startswith("#"):
                self.all_links.append(href)

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "body":
            self.in_body = False
        elif tag in ("nav", "header"):
            self.in_nav = False
        elif tag == "footer":
            self.in_footer = False
        elif tag == "script":
            self.in_script = False
        elif tag == "style":
            self.in_style = False

    def handle_data(self, data):
        if self.in_title:
            self.title = data.strip()
        if self.in_body and not self.in_nav and not self.in_footer \
           and not self.in_script and not self.in_style:
            text = data.strip()
            if text:
                self.body_text.append(text)


# ============================================================
# 章节 1: Soft 404 扫描
# ============================================================

def soft_404_scan() -> dict:
    """
    扫描 dist/ 下所有 HTML 页面，检测：
    - 内容不足（正文 < 500 字符）
    - 缺少 meta description
    - 缺少 h1
    - 内链指向不存在的页面
    - 404 页是否有效
    """
    results = {
        "total_pages": 0,
        "soft_404_candidates": [],
        "valid_pages": [],
        "broken_internal_links": [],
        "missing_404_targets": [],
        "legacy_pages_detected": [],
    }

    if not DIST_DIR.exists():
        results["error"] = f"dist/ directory not found at {DIST_DIR}. Run 'npm run build' first."
        return results

    # 收集所有已生成页面的 URL 路径
    all_valid_urls = set()
    html_pages = []

    for root, dirs, files in os.walk(str(DIST_DIR)):
        for f in files:
            if f.endswith(".html"):
                full_path = Path(root) / f
                rel_path = str(full_path.relative_to(DIST_DIR)).replace("\\", "/")
                all_valid_urls.add("/" + rel_path.replace(".html", "").replace("/index", ""))
                html_pages.append((full_path, rel_path))

    results["total_pages"] = len(html_pages)

    for full_path, rel_path in html_pages:
        try:
            html_content = full_path.read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            results["soft_404_candidates"].append({
                "path": rel_path,
                "issue": f"Cannot read file: {e}"
            })
            continue

        # 跳过系统页面
        page_name = rel_path.replace(".html", "").replace("\\", "/")
        if page_name in SYSTEM_PAGES or any(page_name.startswith(sp + "/") for sp in SYSTEM_PAGES):
            continue

        # 跳过薄但合法的页面
        if any(page_name.startswith(prefix) for prefix in THIN_BUT_VALID_PREFIXES):
            continue

        # 解析 HTML
        inspector = PageInspector()
        try:
            inspector.feed(html_content)
        except Exception:
            pass

        body_text = " ".join(inspector.body_text)
        body_len = len(body_text)

        issues = []

        # 检查 0: noindex + canonical 的重定向页面不算 Soft 404
        has_noindex = inspector.meta_robots and "noindex" in inspector.meta_robots
        has_canonical = bool(inspector.canonical and inspector.canonical != "/" + page_name)
        is_redirect_page = has_noindex and has_canonical

        if is_redirect_page:
            # 故意设计为薄的重定向页，跳过内容检查
            if body_len < 50:
                issues.append(f"Redirect page too thin: {body_len} chars")
            else:
                continue  # 合法的重定向页，跳过全部检查

        # 检查 1: 内容不足
        if body_len < MIN_MEANINGFUL_CONTENT_CHARS:
            issues.append(f"Content too short: {body_len} chars (min {MIN_MEANINGFUL_CONTENT_CHARS})")

        # 检查 2: 无 meta description
        if not inspector.meta_description:
            issues.append("Missing meta description")

        # 检查 3: 无 h1
        if inspector.h1_count == 0:
            issues.append("Missing <h1>")

        # 检查 4: 仅 noindex（无 canonical）可能是被忽略的内容页
        if has_noindex and not has_canonical:
            issues.append("Page has noindex without canonical — may be unmaintained")

        # 检查 5: 内链有效性
        for link in inspector.all_links:
            # 只检查内部链接
            if link.startswith("/") and not link.startswith("//"):
                # 去掉 query string 和 hash
                clean_link = link.split("?")[0].split("#")[0].rstrip("/")
                if clean_link and clean_link not in all_valid_urls:
                    results["broken_internal_links"].append({
                        "page": rel_path,
                        "broken_link": link,
                    })

        # 检查 6: 检测旧博客/品牌页面
        url_path = rel_path.replace(".html", "").replace("\\", "/")
        for legacy in LEGACY_BLOG_PAGES + LEGACY_BRAND_PAGES:
            if url_path == legacy or url_path.startswith(legacy + "/"):
                results["legacy_pages_detected"].append({
                    "path": rel_path,
                    "legacy_type": "blog" if legacy in LEGACY_BLOG_PAGES else "brand",
                    "action": "Replace with /db/ data card or redirect to 404"
                })

        if issues:
            results["soft_404_candidates"].append({
                "path": rel_path,
                "url": "/" + url_path,
                "content_chars": body_len,
                "h1_count": inspector.h1_count,
                "has_meta_desc": bool(inspector.meta_description),
                "has_noindex": bool(inspector.meta_robots and "noindex" in inspector.meta_robots),
                "issues": issues,
            })
        else:
            results["valid_pages"].append(rel_path)

    # 检查 404 页是否存在且正确
    if "404.html" in [p[1] for p in html_pages]:
        results["has_404_page"] = True
    else:
        results["has_404_page"] = False
        results["soft_404_candidates"].append({
            "path": "404.html",
            "issue": "404 page not found in dist/ — critical error"
        })

    return results


# ============================================================
# 章节 2: 数据完整性核对
# ============================================================

def get_nested_value(data: dict, dotted_path: str):
    """从嵌套字典中取值。"""
    keys = dotted_path.split(".")
    current = data
    for key in keys:
        if not isinstance(current, dict) or key not in current:
            return None
        current = current[key]
    return current


def check_data_completeness() -> dict:
    """
    检查所有 variety JSON 文件的7维度完整性。
    不完整的标记为 draft_status。
    """
    results = {
        "total_varieties": 0,
        "complete": [],
        "draft": [],
        "dimension_summary": {},
    }

    if not VARIETIES_DIR.exists():
        results["error"] = "No varieties directory found"
        return results

    index_data = {}
    if INDEX_PATH.exists():
        try:
            index_data = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass

    for json_file in sorted(VARIETIES_DIR.glob("*.json")):
        try:
            data = json.loads(json_file.read_text(encoding="utf-8"))
        except Exception as e:
            results["draft"].append({
                "id": json_file.stem,
                "draft_reason": f"Invalid JSON: {e}"
            })
            continue

        file_id = json_file.stem
        dim_status = {}
        missing_fields = []

        for dim_name, paths in DB_7_DIMENSIONS:
            dim_ok = True
            for path in paths:
                val = get_nested_value(data, path)
                if val is None or (isinstance(val, str) and not val.strip()) \
                   or (isinstance(val, list) and len(val) == 0):
                    dim_ok = False
                    missing_fields.append(path)
            dim_status[dim_name] = "OK" if dim_ok else "INCOMPLETE"

        # buying 维度的额外价格检查：任一价格字段非空即通过
        if dim_status.get("buying") == "OK":
            has_price = False
            for price_path in BUYING_PRICE_PATHS:
                val = get_nested_value(data, price_path)
                if val is not None and (
                    (isinstance(val, str) and val.strip()) or
                    (isinstance(val, list) and len(val) > 0)
                ):
                    has_price = True
                    break
            if not has_price:
                dim_status["buying"] = "INCOMPLETE"
                missing_fields.append("buying: no price data (prices/value_picks/splurge_picks/price_range)")

        all_ok = all(v == "OK" for v in dim_status.values())

        entry = {
            "id": file_id,
            "name_cn": data.get("name_cn", file_id),
            "aroma_type": data.get("aroma_type", "unknown"),
            "dimensions": dim_status,
            "draft_status": "published" if all_ok else "draft",
        }

        if all_ok:
            results["complete"].append(entry)
        else:
            entry["missing_fields"] = missing_fields
            results["draft"].append(entry)

    results["total_varieties"] = len(results["complete"]) + len(results["draft"])
    results["complete_count"] = len(results["complete"])
    results["draft_count"] = len(results["draft"])
    results["completeness_rate"] = round(
        len(results["complete"]) / max(results["total_varieties"], 1) * 100, 1
    )

    # 按维度汇总
    dim_summary = {}
    for dim_name, _ in DB_7_DIMENSIONS:
        ok_count = sum(1 for v in results["complete"] + results["draft"]
                       if v["dimensions"].get(dim_name) == "OK")
        dim_summary[dim_name] = {
            "ok": ok_count,
            "total": results["total_varieties"],
            "rate": round(ok_count / max(results["total_varieties"], 1) * 100, 1)
        }
    results["dimension_summary"] = dim_summary

    return results


# ============================================================
# 章节 3: 内链网络构建与验证
# ============================================================

def build_link_graph() -> dict:
    """
    构建术语表 ↔ 酒款数据库的内链图谱。
    同时生成 link_graph.json 供 Hermes/Codex 消费。
    """
    # 加载所有酒款数据
    varieties = {}
    if VARIETIES_DIR.exists():
        for json_file in sorted(VARIETIES_DIR.glob("*.json")):
            try:
                varieties[json_file.stem] = json.loads(json_file.read_text(encoding="utf-8"))
            except Exception:
                pass

    # 定义术语与对应酒款的关联
    # 每个术语可以关联多个酒款（按相关性排序）
    glossary_links = {
        "sauce-aroma": {
            "term": "Sauce Aroma",
            "term_cn": "酱香型",
            "definition": "A savory, complex aroma style with fermented soybean, umami, and roasted grain notes.",
            "linked_varieties": ["maotai", "langjiu", "xijiu"],
            "target_aroma_page": "/db/aroma/sauce/",
        },
        "strong-aroma": {
            "term": "Strong Aroma",
            "term_cn": "浓香型",
            "definition": "Rich, fruity, cellar-influenced style, China's most common baijiu category.",
            "linked_varieties": ["wuliangye", "luzhou-laojiao", "yanghe", "jiannanchun", "gujinggong", "shuijingfang", "shede"],
            "target_aroma_page": "/db/aroma/strong/",
        },
        "light-aroma": {
            "term": "Light Aroma",
            "term_cn": "清香型",
            "definition": "Clean, grain-forward style with floral and light fruit notes.",
            "linked_varieties": ["fenjiu", "niulanshan", "hongxing"],
            "target_aroma_page": "/db/aroma/light/",
        },
        "phoenix-aroma": {
            "term": "Phoenix Aroma",
            "term_cn": "凤香型",
            "definition": "Unique Shaanxi style combining elements of light and strong aroma techniques.",
            "linked_varieties": ["xifeng"],
            "target_aroma_page": "/db/aroma/phoenix/",
        },
        "herbal-aroma": {
            "term": "Herbal Aroma (Dong)",
            "term_cn": "董香型",
            "definition": "Distinctive style incorporating traditional Chinese medicinal herbs in the fermentation process.",
            "linked_varieties": ["dongjiu"],
            "target_aroma_page": "/db/aroma/herbal/",
        },
        "mixed-aroma": {
            "term": "Mixed Aroma (Fuyu)",
            "term_cn": "馥郁香型",
            "definition": "Complex style combining characteristics of sauce, strong, and light aroma.",
            "linked_varieties": ["jiugui"],
            "target_aroma_page": "/db/aroma/mixed/",
        },
        "qu": {
            "term": "Qu",
            "term_cn": "酒曲",
            "definition": "Fermentation starter made with grains and microbes, crucial to baijiu aroma formation.",
            "linked_varieties": [],
            "target_page": "/glossary/#qu",
        },
        "gbt-standard": {
            "term": "GB/T Standard",
            "term_cn": "国家标准",
            "definition": "Chinese national standard codes that classify baijiu production methods and quality grades.",
            "linked_varieties": [],
            "target_page": "/glossary/#gbt",
        },
        "guizhou": {
            "term": "Guizhou",
            "term_cn": "贵州产区",
            "definition": "Home to Maotai and the core sauce aroma production region along the Chishui River.",
            "linked_varieties": ["maotai", "xijiu"],
            "target_page": "/db/region/guizhou/",
        },
        "sichuan": {
            "term": "Sichuan",
            "term_cn": "四川产区",
            "definition": "China's largest baijiu producing province, home to strong aroma giants and Langjiu.",
            "linked_varieties": ["wuliangye", "luzhou-laojiao", "jiannanchun", "shuijingfang", "shede", "langjiu"],
            "target_page": "/db/region/sichuan/",
        },
    }

    # 为每个酒款构建反向术语索引
    variety_glossary = {}
    for vid, vdata in varieties.items():
        related_terms = []
        for term_id, term_data in glossary_links.items():
            if vid in term_data.get("linked_varieties", []):
                related_terms.append({
                    "term_id": term_id,
                    "term": term_data["term"],
                    "term_cn": term_data["term_cn"],
                })
        # 额外匹配：按香型
        aroma = vdata.get("aroma_type", "")
        aroma_terms = {
            "sauce": "sauce-aroma",
            "strong": "strong-aroma",
            "light": "light-aroma",
            "phoenix": "phoenix-aroma",
            "herbal": "herbal-aroma",
            "mixed": "mixed-aroma",
        }
        if aroma in aroma_terms:
            tid = aroma_terms[aroma]
            if not any(t["term_id"] == tid for t in related_terms):
                related_terms.append({
                    "term_id": tid,
                    "term": glossary_links[tid]["term"],
                    "term_cn": glossary_links[tid]["term_cn"],
                })

        # 产区匹配
        region = vdata.get("region", "").strip().lower()
        if region in glossary_links:
            related_terms.append({
                "term_id": region,
                "term": glossary_links[region]["term"],
                "term_cn": glossary_links[region]["term_cn"],
            })

        variety_glossary[vid] = {
            "name_cn": vdata.get("name_cn", vid),
            "aroma_type": aroma,
            "region": vdata.get("region", ""),
            "db_path": f"/db/variety/{vid}/",
            "related_terms": related_terms,
        }

    link_graph = {
        "version": "1.0",
        "generated_at": datetime.now().isoformat(),
        "glossary_terms": glossary_links,
        "variety_glossary_links": variety_glossary,
        "three_click_paths": {},
    }

    # 验证 3 次点击可达性
    # 路径：术语表页面 → 术语链接(nav/tag) → 香型聚合页 → 酒款详情页
    # 这是 3 次点击
    for term_id, term_data in glossary_links.items():
        paths = []
        for vid in term_data.get("linked_varieties", []):
            if vid in varieties:
                path = [
                    {"click": 1, "page": "/glossary/", "title": "Glossary"},
                    {"click": 2, "page": term_data.get("target_aroma_page", term_data.get("target_page", "")),
                     "title": term_data["term"] + " 聚合页"},
                    {"click": 3, "page": f"/db/variety/{vid}/",
                     "title": varieties[vid].get("name_cn", vid) + " 数据卡片"},
                ]
                paths.append({"variety_id": vid, "path": path})
        if paths:
            link_graph["three_click_paths"][term_id] = paths

    # 保存 link_graph.json
    LINK_GRAPH_PATH.write_text(json.dumps(link_graph, ensure_ascii=False, indent=2), encoding="utf-8")

    return link_graph


def validate_three_click_reachability(link_graph: dict) -> dict:
    """验证所有酒款在3次点击内可达。"""
    all_variety_ids = set(link_graph["variety_glossary_links"].keys())
    reachable_via_glossary = set()
    unreachable = []

    for paths in link_graph["three_click_paths"].values():
        for p in paths:
            reachable_via_glossary.add(p["variety_id"])

    unreachable = list(all_variety_ids - reachable_via_glossary)

    return {
        "total_varieties": len(all_variety_ids),
        "reachable_in_3_clicks": len(reachable_via_glossary),
        "unreachable": unreachable,
        "reachability_rate": round(
            len(reachable_via_glossary) / max(len(all_variety_ids), 1) * 100, 1
        ),
    }


# ============================================================
# 主函数：全量审计
# ============================================================

def run_full_audit() -> dict:
    """执行全量质量审计。"""
    print("=" * 60)
    print("  Baijiu365 Quality Audit — 质量蓄水期全站自检")
    print("=" * 60)

    # 1. Soft 404 扫描
    print("\n[1/3] Soft 404 扫描中...")
    soft404 = soft_404_scan()

    # 2. 数据完整性核对
    print("[2/3] 数据完整性核对中...")
    completeness = check_data_completeness()

    # 3. 内链网络
    print("[3/3] 内链网络构建中...")
    link_graph = build_link_graph()
    reachability = validate_three_click_reachability(link_graph)

    # 汇总报告
    report = {
        "audit_type": "quality_accumulation_period",
        "generated_at": datetime.now().isoformat(),
        "project": "Baijiu365",
        "audit_period": "Week 1 — Quality Accumulation",
        "overall_status": "PASS" if (
            len(soft404.get("soft_404_candidates", [])) == 0
            and len(soft404.get("broken_internal_links", [])) == 0
            and completeness.get("draft_count", 999) == 0
            and reachability.get("reachability_rate", 0) == 100.0
        ) else "NEEDS_WORK",
        "soft_404_scan": soft404,
        "data_completeness": completeness,
        "internal_linking": reachability,
        "link_graph_saved": str(LINK_GRAPH_PATH),
        "action_items": [],
    }

    # 生成 action items
    if soft404.get("soft_404_candidates"):
        report["action_items"].append(
            f"Fix {len(soft404['soft_404_candidates'])} Soft 404 candidates in dist/"
        )
    if soft404.get("broken_internal_links"):
        report["action_items"].append(
            f"Fix {len(soft404['broken_internal_links'])} broken internal links"
        )
    if soft404.get("legacy_pages_detected"):
        report["action_items"].append(
            f"Replace {len(soft404['legacy_pages_detected'])} legacy blog/brand pages with /db/ data cards"
        )
    if completeness.get("draft_count", 0) > 0:
        report["action_items"].append(
            f"Fill missing data for {completeness['draft_count']} draft varieties"
        )
    if reachability.get("unreachable"):
        report["action_items"].append(
            f"Add glossary links for {len(reachable['unreachable'])} unreachable varieties"
        )

    # 保存报告
    REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    return report


def print_report(report: dict):
    """人类可读报告输出。"""
    print(f"\n{'='*60}")
    print(f"  QUALITY AUDIT REPORT")
    print(f"{'='*60}")
    print(f"  Status:      {report['overall_status']}")
    print(f"  Generated:   {report['generated_at']}")
    print(f"  Report:      {REPORT_PATH}")

    # Soft 404
    s = report["soft_404_scan"]
    print(f"\n--- Soft 404 Scan ---")
    print(f"  Pages scanned: {s.get('total_pages', 0)}")
    print(f"  Soft 404 candidates: {len(s.get('soft_404_candidates', []))}")
    for c in s.get("soft_404_candidates", []):
        print(f"    ⚠ {c['path']}: {'; '.join(c.get('issues', []))}")
    print(f"  Broken internal links: {len(s.get('broken_internal_links', []))}")
    for bl in s.get("broken_internal_links", [])[:10]:
        print(f"    ❌ {bl['page']} → {bl['broken_link']}")
    print(f"  Legacy pages: {len(s.get('legacy_pages_detected', []))}")
    for lp in s.get("legacy_pages_detected", []):
        print(f"    🗑 {lp['path']} ({lp['legacy_type']}) → {lp['action']}")
    print(f"  404 page: {'✅' if s.get('has_404_page') else '❌ MISSING'}")

    # Data completeness
    c = report["data_completeness"]
    print(f"\n--- Data Completeness Check ---")
    print(f"  Total varieties: {c.get('total_varieties', 0)}")
    print(f"  Complete (published): {c.get('complete_count', 0)}")
    print(f"  Incomplete (draft): {c.get('draft_count', 0)}")
    print(f"  Rate: {c.get('completeness_rate', 0)}%")
    for d in c.get("draft", []):
        print(f"    📝 DRAFT: {d['id']} — missing: {', '.join(d.get('missing_fields', []))}")
    print(f"  Dimension summary:")
    for dim, stats in c.get("dimension_summary", {}).items():
        icon = "✅" if stats["rate"] == 100.0 else "⚠"
        print(f"    {icon} {dim}: {stats['ok']}/{stats['total']} ({stats['rate']}%)")

    # Internal links
    il = report["internal_linking"]
    print(f"\n--- Internal Link Network ---")
    print(f"  Varieties reachable in 3 clicks: {il.get('reachable_in_3_clicks', 0)}/{il.get('total_varieties', 0)}")
    print(f"  Reachability rate: {il.get('reachability_rate', 0)}%")
    if il.get("unreachable"):
        print(f"  Unreachable: {il['unreachable']}")
    print(f"  Link graph: {report.get('link_graph_saved', 'N/A')}")

    # Action items
    if report["action_items"]:
        print(f"\n--- ACTION ITEMS ---")
        for i, item in enumerate(report["action_items"], 1):
            print(f"  {i}. {item}")

    print(f"\n{'='*60}")
    if report["overall_status"] == "PASS":
        print("  ✅ All quality checks passed. Ready for production.")
    else:
        print(f"  🔧 {len(report['action_items'])} items need attention before going live.")
    print(f"{'='*60}\n")


def main():
    parser = argparse.ArgumentParser(description="Baijiu365 Quality Audit Tool")
    parser.add_argument("--mode", choices=["soft404", "completeness", "links", "all"],
                        default="all", help="Audit mode")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    args = parser.parse_args()

    if args.mode == "soft404":
        result = soft_404_scan()
    elif args.mode == "completeness":
        result = check_data_completeness()
    elif args.mode == "links":
        lg = build_link_graph()
        result = validate_three_click_reachability(lg)
    else:
        result = run_full_audit()

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    elif args.mode != "all":
        # 单模式输出时也做个简单打印
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print_report(result)

    # 退出码
    if isinstance(result, dict) and result.get("overall_status") == "NEEDS_WORK":
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
