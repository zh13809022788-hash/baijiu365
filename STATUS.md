# Baijiu365 全局作战看板

> 宪法版本：v2.0（7字段铁律） | 模式：🟢 就绪 | 最后更新：2026-07-13 22:17 CST
> 运营官：WorkBuddy | 数据官：Hermes | 前端：Codex (Astro) | 管线：GitHub Actions

---

## 一、战役总览

| 指标 | 数值 |
|------|------|
| **系统状态** | 🟢 就绪 — 16/16 数据完整，GitHub Actions 管线配置完成，等待 push 触发首次部署 |
| **当前阶段** | 部署就绪（2026-07-13 21:45 CST） |
| **酱香型状态** | ✅ 3/3 全量入库（茅台/郎酒/习酒），7字段100%合规 |
| **目标酒款数** | 16/16 ✅ 100% |
| **7字段合规率** | 100%（16/16 全部通过） |
| **数据完整性** | ✅ 7/7 维度 100% |
| **校验状态** | ✅ PASS（0 errors, 0 warnings） |
| **Soft 404** | ✅ 0 candidates |
| **内链锚点** | ✅ 16/16 每款 ≥5 个锚点（香型/产区/国标/同类酒款×2） |
| **内链可达性** | ✅ 100% 3次点击可达（3条独立路径） |
| **GB/T 标准覆盖** | ✅ 7/7 国标+地标全部入库 |
| **前端编译** | ⏸ 待 push 后 GitHub Actions 自动触发 |
| **GitHub Actions** | ✅ 已配置（.github/workflows/auto-process.yml） |
| **中转站 API** | ⏸ 待配置 GitHub Secrets（RELAY_API_ENDPOINT + RELAY_API_TOKEN） |
| **Git** | ⚠️ 未提交（含 .github/ + data_pipeline/ + src/ 全部改动） |

---

## 二、质量蓄水期指标

> 截止日期：2026-07-20 21:00 CST | 目标：三项指标同时为 ✅

| # | 质检项 | 当前状态 | 目标 | 工具 |
|---|--------|:--:|:--:|------|
| 1 | Soft 404 清零 | ✅ 0/22 | 0 | quality_audit.py --mode soft404 |
| 2 | 7维度数据完整性 | ✅ 16/16 (100%) | 100% | quality_audit.py --mode completeness |
| 3 | 3次点击可达性 | ✅ 16/16 (100%) | 100% | quality_audit.py --mode links |
| 4 | 遗留页面迁移 | ⚠️ 5页待处理 | 0 | Codex 编译 /db/ 数据卡片 |
| 5 | 内链断裂 | ✅ 0 | 0 | quality_audit.py |

### 遗留页面待迁移清单

| 页面 | 类型 | 处理方案 |
|------|------|----------|
| `baijiu-vs-vodka` | blog | 保留为参考文章，加注脚链向 /db/ |
| `brands/maotai` | brand | → 301 重定向到 /db/variety/maotai/ |
| `how-to-buy-baijiu-outside-china` | blog | 保留为指南页，内链至相关酒款 /db/ 页 |
| `how-to-drink-baijiu` | blog | 保留，加术语表内链 |
| `how-to-spot-fake-maotai` | blog | 保留，加 linked_varieties 反向链接 |

---

## 三、质量审计日报

| 日期 | Soft 404 | 数据完整性 | 3次点击 | 断裂内链 | 审计人 |
|------|:--:|:--:|:--:|:--:|--------|
| 07-13 | ✅ 0 | ✅ 100% | ✅ 100% | ✅ 0 | WorkBuddy |
| 07-14 | | | | | automated |
| 07-15 | | | | | automated |
| 07-16 | | | | | automated |
| 07-17 | | | | | automated |
| 07-18 | | | | | automated |
| 07-19 | | | | | automated |
| 07-20 | | | | | automated |

---

## 四、香型作战地图

| 香型 | 代号 | GB/T 标准 | 已入库 | 进度 |
|------|------|-----------|:--:|:--:|
| 酱香型 | sauce | GB/T 26760 / GB/T 18356 | 3 | ✅ 100% |
| 浓香型 | strong | GB/T 10781.1 | 7 | ✅ 100% |
| 清香型 | light | GB/T 10781.2 | 3 | ✅ 100% |
| 凤香型 | phoenix | GB/T 14867 | 1 | ✅ 100% |
| 董香型 | herbal | DB52/T 550 | 1 | ✅ 100% |
| 馥郁香型 | mixed | GB/T 10781.11 | 1 | ✅ 100% |
| 米香型 | rice | GB/T 10781.3 | 0 | ⬜ 待扩展 |
| 豉香型 | chi | GB/T 10781.5 | 0 | ⬜ 待扩展 |
| 特香型 | te | GB/T 10781.7 | 0 | ⬜ 待扩展 |
| 芝麻香型 | sesame | GB/T 10781.9 | 0 | ⬜ 待扩展 |
| 老白干香型 | laobaigan | GB/T 10781.10 | 0 | ⬜ 待扩展 |
| 兼香型 | fuyu | GB/T 10781.8 | 0 | ⬜ 待扩展 |

---

## 五、已入库酒款明细（16/16）

| # | ID | 酒款 | 香型 | GB/T | 产区 | 层级 |
|---|-----|------|------|------|------|------|
| 1 | maotai | 茅台 | sauce | GB/T 18356 | Guizhou | ultra-premium |
| 2 | langjiu | 郎酒 | sauce | GB/T 26760 | Sichuan | premium |
| 3 | xijiu | 习酒 | sauce | GB/T 26760 | Guizhou | premium |
| 4 | wuliangye | 五粮液 | strong | GB/T 10781.1 | Sichuan | ultra-premium |
| 5 | luzhou-laojiao | 泸州老窖 | strong | GB/T 10781.1 | Sichuan | premium |
| 6 | yanghe | 洋河 | strong | GB/T 10781.1 | Jiangsu | premium |
| 7 | jiannanchun | 剑南春 | strong | GB/T 10781.1 | Sichuan | premium |
| 8 | gujinggong | 古井贡酒 | strong | GB/T 10781.1 | Anhui | premium |
| 9 | shuijingfang | 水井坊 | strong | GB/T 10781.1 | Sichuan | premium |
| 10 | shede | 舍得 | strong | GB/T 10781.1 | Sichuan | premium |
| 11 | fenjiu | 汾酒 | light | GB/T 10781.2 | Shanxi | premium |
| 12 | niulanshan | 牛栏山 | light | GB/T 10781.2 | Beijing | entry |
| 13 | hongxing | 红星二锅头 | light | GB/T 10781.2 | Beijing | entry |
| 14 | xifeng | 西凤酒 | phoenix | GB/T 14867 | Shaanxi | premium |
| 15 | dongjiu | 董酒 | herbal | DB52/T 550 | Guizhou | premium |
| 16 | jiugui | 酒鬼酒 | mixed | GB/T 10781.11 | Hunan | premium |

---

## 六、产区覆盖

| 产区 | 已入库酒款 |
|------|-----------|
| Sichuan（四川） | langjiu, wuliangye, luzhou-laojiao, jiannanchun, shuijingfang, shede |
| Guizhou（贵州） | maotai, xijiu, dongjiu |
| Beijing（北京） | niulanshan, hongxing |
| Jiangsu（江苏） | yanghe |
| Anhui（安徽） | gujinggong |
| Shanxi（山西） | fenjiu |
| Shaanxi（陕西） | xifeng |
| Hunan（湖南） | jiugui |

---

## 七、管线状态

| 阶段 | 状态 | 详情 |
|------|------|------|
| JSON 数据生产 | ✅ 完成 | 16/16 入库，6香型8产区 |
| validate.py | ✅ PASS | 0 errors, 0 warnings |
| orchestrate.py | ✅ 完成 | build_signal.json 已更新 |
| quality_audit.py | ✅ PASS | Soft 404=0, 7-dim=100%, links=100% |
| link_graph.json | ✅ v2.0 | 全链路拓扑：16款各≥5锚点，8产区+7国标术语齐全，三路径验证 |
| GitHub Actions 配置 | ✅ 已创建 | .github/workflows/auto-process.yml v2.0 |
| 中转站 API 集成 | ⏸ 待配置 | RELAY_API_ENDPOINT + RELAY_API_TOKEN (GitHub Secrets) |
| 缓存检查机制 | ✅ 就绪 | 已存在 JSON 严禁重新生产 |
| Codex 编译 | ⏸ push 后自动触发 | 需编译16个/db/数据卡片 + 首页产区索引 |
| 首页产区卡片 | ⚠️ UPDATE NEEDED | 7新区待加入 |
| Sitemap | ⏸ | 编译时自动生成 |
| Schema.org 注入 | ⏸ | Product/DefinedTerm 待注入 |

---

## 八、执行日志

| # | 时间 | 任务 | 结果 |
|---|------|------|------|
| 9 | 2026-07-13 22:17 | link_graph.json v2.0：全链路拓扑重建，每款≥5锚点，8产区+7国标术语齐全，首页SEO+数据库入口 | ✅ |
| 8 | 2026-07-13 21:45 | GitHub Actions 管线 v2.0：集成中转站 API + 缓存检查 + 自动部署 | ✅ |
| 7 | 2026-07-13 21:35 | 质量蓄水期启动：quality_audit.py + link_graph.json 建立 | ✅ |
| 6 | 2026-07-13 21:26 | 全量校验 PASS：16/16，0错误。orchestrate.py 生成信号 | ✅ |
| 5 | 2026-07-13 21:15 | 全局作战指令下达，STATUS.md 重构为作战看板 | ✅ |
| 4 | 2026-07-13 21:12 | 酱香型专题：langjiu + xijiu 入库 | ✅ |
| 3 | 2026-07-13 21:02 | 治理框架 v2.0 | ✅ |

---

## 九、质量门禁

| 门禁 | 工具 | 当前 |
|------|------|------|
| 7字段完整性 | validate.py | ✅ 16/16 PASS |
| GB/T + DB 格式校验 | validate.py | ✅ |
| 编排一致性 | orchestrate.py | ✅ |
| Soft 404 清零 | quality_audit.py --mode soft404 | ✅ |
| 7维度数据完整性 | quality_audit.py --mode completeness | ✅ |
| 3次点击可达性 | quality_audit.py --mode links | ✅ |
| 前端编译 | npm run build | ⏸ push 后自动触发 |
| 首页卡片完整性 | 手动 | ⏸ |

---

## 十、GitHub Actions 全自动管线

### 触发条件
| 触发方式 | 说明 |
|----------|------|
| **定时 (cron)** | 每日北京时间 08:00 自动运行 |
| **push** | main 分支 data_pipeline/ 或 src/ 变更时 |
| **手动 (workflow_dispatch)** | GitHub Actions 页面点 "Run workflow" |

### 管线五阶段
```
① 缓存检查 → ② 中转站API(Hermes) → ③ 校验+编排+审计 → ④ Astro编译+部署 → ⑤ 中转站API(Codex)
```

### 缓存检查核心逻辑
- 扫描 `data_pipeline/varieties/*.json` 统计已有酒款
- 对比 `index.json` 注册表，识别缺失酒款
- **已存在且通过校验的酒款 JSON 数据 —— 严禁重新生产**
- 仅对缺失酒款触发 Hermes 补全（通过中转站 API）

### 中转站 API 配置
> 用于桥接 GitHub Actions 与本地 Hermes/Codex 实例。

在 GitHub 仓库 → **Settings → Secrets and variables → Actions** 中添加：

| Secret 名称 | 说明 | 示例 |
|-------------|------|------|
| `RELAY_API_ENDPOINT` | 中转站 API 地址 | `https://your-relay.example.com/api` |
| `RELAY_API_TOKEN` | API 认证 Token | `b3-xxxxxxxxxxxx` |

**未配置时不影响管线核心功能**：校验、编排、编译、部署均正常运行，仅跳过远程 AI 任务触发。

### 首次部署前需要
1. `git add -A && git commit && git push` 推送所有改动
2. GitHub 仓库 Settings → Actions → General → "Read and write permissions"
3. GitHub 仓库 Settings → Pages → Source 选 "GitHub Actions"
4. 首次 push 后管线自动运行，后续每日 08:00 自动巡检
