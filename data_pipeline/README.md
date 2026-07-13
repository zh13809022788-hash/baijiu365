# Baijiu365 Data Pipeline — 自动化协调系统

## 架构总览

```
Hermes (数据生产)           WorkBuddy (校验+协调)            Codex (编译+部署)
─────────────────          ─────────────────────            ─────────────────
                          ┌──────────────────────┐
  生成 JSON 数据 ────────▶│ validate.py          │
  varieties/*.json        │  ├─ JSON Schema 校验   │
                          │  ├─ 必填字段检查       │
                          │  ├─ SEO 完整性         │
                          │  └─ Index 一致性       │
                          │                      │
                          │ orchestrate.py       │
                          │  ├─ 运行校验          │
                          │  ├─ 产区变动检测      │
                          │  └─ 写入构建信号      │────▶ build_signal.json
                          └──────────────────────┘              │
                                                          ┌────▼─────────────┐
                                                          │ 检测信号变化      │
                                                          │ 触发 npm run build│
                                                          │ 更新首页产区卡片  │
                                                          │ 更新 sitemap/RSS │
                                                          └──────────────────┘
```

## 三 AI 角色分工

| 角色 | 职责 | 禁止 |
|------|------|------|
| **Hermes** | 生产白酒结构化 JSON 数据，严格遵循 schema.json | 禁止输出非结构化文本、Markdown、自由格式 |
| **WorkBuddy** | 运行校验脚本，检测数据完整性 + 产区变动，写入构建信号 | 禁止直接修改网站代码或原始数据 |
| **Codex** | 监听 build_signal.json 变更，触发编译 + 首页更新 | 禁止修改 data_pipeline/ 中的数据文件 |

## 目录结构

```
data_pipeline/
├── README.md                          # 本文档
├── index.json                         # 酒款总索引
├── build_signal.json                  # 构建信号（Codex 消费）
├── validate.py                        # 数据校验脚本
├── orchestrate.py                     # 编排总协调脚本
├── schemas/
│   └── baijiu-variety.schema.json     # JSON Schema（唯一标准）
└── varieties/
    ├── maotai.json                    # 茅台数据（完整示例）
    ├── wuliangye.json                 # 待 Hermes 产出
    ├── fenjiu.json                    # 待 Hermes 产出
    └── ...                            # 其余13个酒款待产出
```

## 工作流详解

### 阶段 1: Hermes 生产数据

Hermes 必须严格按照以下约束输出:

```
约束1: 输出格式必须是 data_pipeline/varieties/<id>.json
约束2: 必须通过 data_pipeline/schemas/baijiu-variety.schema.json 定义的 JSON Schema
约束3: 禁止输出任何 Markdown、自由文本段落、或非 JSON 格式
约束4: 每完成一个酒款，必须同时更新 data_pipeline/index.json 的 varieties 数组
约束5: 每个 JSON 文件的 updated_at 字段必须填写当天日期
```

### 阶段 2: WorkBuddy 校验 & 协调

```bash
# 全流程编排
cd D:\白酒独立站\data_pipeline
python orchestrate.py

# 仅校验（不生成信号文件）
python orchestrate.py --validate-only

# CI 模式
python orchestrate.py --ci
```

校验覆盖:
- JSON Schema 类型校验
- 必填字段完整性（id, name, name_cn, aroma_type, region）
- 品鉴笔记质量（nose/palate/finish 不能为空）
- SEO 字段完整性（meta_title, meta_description）
- FAQ 非空检查
- index.json 与 varieties/ 一致性
- 数据过期检测（90天未更新）
- **产区变动检测** — 新产区触发更新首页产区索引卡片

### 阶段 3: Codex 消费信号

`build_signal.json` 字段说明:

| 字段 | 含义 | Codex 动作 |
|------|------|-----------|
| `build_requested: true` | 数据就绪，可以编译 | 执行 `npm run build` |
| `build_requested: false` | 数据有问题 | 停止编译，等待 Hermes 修复 |
| `region_update.needed: true` | 有新产区 | **强制更新首页产区索引卡片** |
| `region_update.new_regions` | 新区列表 | 确保每个新区都有对应展示 |
| `build_instructions.homepage_region_card_update` | 首页更新标记 | 禁止跳过 |

### 阶段 4: Codex 编译 & 一致性检查

Codex 在检测到 `build_signal.json` 变更后必须执行:

1. 检查 `build_requested` — 如果 false，停止并报告原因
2. 检查 `region_update.needed` — 如果 true，更新首页产区索引卡片，**此项不可跳过**
3. 执行 `npm run build`
4. 确保 `known_regions` 中的所有产区都在首页有对应展示
5. 禁止「页面内容」与「数据条目」不一致

## 启动指令

### Hermes 启动指令

```
你负责 Baijiu365 的白酒数据生产。必须严格遵循以下规则:

1. 所有输出使用 data_pipeline/schemas/baijiu-variety.schema.json 定义的格式
2. 输出到 data_pipeline/varieties/<id>.json
3. 禁止输出 Markdown 或自由文本
4. 每完成一个酒款，更新 data_pipeline/index.json
5. 参考 data_pipeline/varieties/maotai.json 作为完整示例
6. 从 index.json 中获取待完成的酒款列表
```

### Codex 启动指令

```
你是 Baijiu365 的前端编译器。必须遵循以下规则:

1. 每次启动先检查 data_pipeline/build_signal.json 是否有变更
2. 如果 build_requested = true，执行 npm run build
3. 如果 region_update.needed = true，必须更新首页产区索引卡片
4. 严禁「页面内容」与 data_pipeline 中的数据不一致
5. 禁止修改 data_pipeline/ 中的任何文件
```

## 快速命令参考

```bash
# 校验所有数据
cd D:\白酒独立站\data_pipeline && python validate.py

# 校验单个酒款
python validate.py --file maotai

# 完整编排流程
python orchestrate.py

# JSON 输出（供自动化消费）
python validate.py --json
```
