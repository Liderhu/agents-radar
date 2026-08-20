# AI 开源趋势日报 2026-08-21

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-20 17:03 UTC

---

# AI 开源趋势日报（2026-08-21）

> 数据来源：GitHub Trending 今日热榜 + AI 主题搜索（7 天活跃）。已剔除与 AI/ML 无明确关联的通用工具（如鼠标配置、位置可视化、通用项目管理等）。以下为各维度精选的最具代表性项目。

## 今日速览

- **Agent Skills 生态呈爆发态势**：mattpocock/skills（+2,267）、obra/superpowers（+749）、caveman（+309）等“技能包 / 方法论”项目集中登榜，AI 编程的竞争焦点正从模型能力转向工程技能复用与分发。
- **AI 短视频生成继续领跑今日热榜**：MoneyPrinterTurbo 单日新增 2,774 stars，为今日最高增量，验证 AI 内容生成在普通开发者中的普惠需求。
- **上下文工程开始“基础设施化”**：火山引擎开源 OpenViking（+955），定位“自进化 Context Database”，与 ai-memory、mem0、claude-mem 等项目一起，将 Agent 记忆、RAG、技能统一为新的数据层。
- **Cursor 发布官方插件规范与插件库**（+473），AI 编辑器正在从独立工具走向开放插件生态，平台化信号明显。
- **基础模型层热度不减**：Transformers、vLLM、Ollama 等项目的 stars 体量依旧占据头部，开源模型发布节奏持续激活周边工具链。

## 各维度热门项目

### 🔧 AI 基础工具

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 179,043 | 本地运行开源大模型的事实标准工具，覆盖 Kimi、GPT-OSS、GLM、Qwen、Gemma 等主流模型。今日继续维持高热度，是私有化 AI 与 Agent 本地落地的核心依赖。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 144,638 | 面向 LLM 应用的 Agent 工程平台，提供从模型调用到工具编排的完整抽象。在 Agent/Skills 生态爆发期，仍是使用最广的上层框架之一。 |
| [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) | C++ | 76,042 | 经典开源 OCR 引擎，为文档数字化和 RAG 提供关键文本抽取能力。文档智能与知识库建设需求让其持续保持稳定关注。 |
| [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) | Python | 66,979 | 经典机器学习框架，涵盖分类、回归、聚类等完整算法体系。作为 MLOps 流程中的常青组件，其 stars 增长仍稳定。 |
| [cursor/plugins](https://github.com/cursor/plugins) | TypeScript | 0（+473） | Cursor 官方插件规范与示例插件库，为 AI 编辑器引入标准化插件机制。今日新增 473 stars，平台生态化趋势值得关注。 |
| [modular/modular](https://github.com/modular/modular) | Mojo | 0（+340） | Modular 公司的 AI 平台仓库，包含 MAX 运行时与 Mojo 语言。今日 +340，代表面向 AI 基础设施的新编译语言/运行时仍在吸引开发者。 |
| [RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec) | Rust | 0（+251） | 基于 TurboQuant 的向量索引，Rust 核心 + Python 绑定。今日 +251，反映 Rust 正在向量检索这类性能敏感型 AI 基础设施中快速渗透。 |

### 🤖 AI 智能体/工作流

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 241,364 | Agent harness 性能优化系统，覆盖 skills、记忆、安全与研究优先开发。它是当前 GitHub 上 stars 最高的 Agent 基础设施项目之一，代表 Agent 工程化主流方向。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 233,453 | NousResearch 推出的“与你一起成长”的个人 Agent，强调可扩展性与持续进化。高 star 与活跃的社区迭代使其成为现象级 Agent 项目。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 186,686 | 让 AI 自主完成规划与执行的经典 Agent 框架。作为 Agent 概念的重要推广者，其影响力在今日智能体生态中仍在延续。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 153,037 | 可编排 Agentic Workflow 与 RAG 管线的 LLMOps 平台。在 AI 应用从原型到生产的转化过程中，是团队协作最常用的中台之一。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 109,869 | 让 AI Agent 操作浏览器的开源工具，为网页自动化与“Agent 上网”提供标准化能力。与当前 AI 操作电脑/网页的热潮直接相关。 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Shell | 0（+2,267） | 真实工程师的 Skills 合集，可直接放入 .agents 目录使用。今日 +2,267 高居 Trending 第二，是“Agent 技能包”分发需求爆发的最直接信号。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 91,340 | 为 Claude Code、Codex 等 Agent CLI 提供跨会话持久上下文，自动压缩并注入相关记忆。它是“Agent 记忆”赛道中用户规模领先的解决方案。 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Go | 99,477（+309） | Claude Code 技能，通过“原始人话术”减少约 65% token 消耗。今日 +309，直观反映 token 成本优化正在成为 AI 工程化的刚需。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 112,645（+2,774） | 利用 AI 大模型与自动化工作流，一键生成高清短视频。今日 +2,774 为全榜最高增量，AI 内容生成工具仍是最广泛的普惠应用方向。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 149,363 | 用户友好的 AI 交互界面，支持 Ollama、OpenAI API 等后端。在本地化 AI 需求下，已成为自托管 LLM 的标配前端。 |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 66,416（+855） | 开源 AI 求职助手：扫描职位、按 A-F 规则评分、定制简历并跟踪进展。今日 +855，体现 AI 在垂直个人场景中的快速落地。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 50,838 | AI 生产力工作室，支持智能聊天、自主 Agent 与 300+ 助手。面向普通用户的 All-in-One AI 客户端，star 持续稳定增长。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 48,218 | 将文档或主题自动转为原生 PowerPoint 演示文稿，支持动画、图表和音频旁白。垂直办公场景的 AI 应用典型代表。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 63,484 | LLM 驱动的多市场股票智能分析系统，集行情、新闻、决策看板与自动推送于一体。金融垂直领域 Agent 应用的头部项目。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 169,972 | 面向 AI 应用的数据获取 API，支持搜索、爬取与网页交互。是 RAG 与 Agent 从外部获取上下文的关键基础设施。 |
| [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) | Python | 29,767 | 基于 AI 的 Python 爬虫库，通过 LLM 驱动网页抓取与结构化提取。与 firecrawl 一起构成 AI 数据获取工具的两极。 |

### 🧠 大模型/训练

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 197,099 | 端到端机器学习框架，覆盖训练、部署与生产环境工具链。作为经典深度学习底座，其生态仍在企业级 AI 中大量使用。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,276 | HuggingFace 模型定义与训练/推理框架，支持文本、视觉、音频等多模态模型。新模型发布后通常数小时内即获支持，是开源模型分发的枢纽。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,500 | 动态神经网络与 GPU 加速框架，学术界与工业界训练的事实标准。stars 持续增长，生态地位稳固。 |
| [vllm-project/vllm](https://github.com/vllm-project/vllm) | Python | 89,544 | 高吞吐、内存高效的 LLM 推理与 Serving 引擎。是开源模型部署层的最常用选择，新模型发布同步更新，长期占据热榜。 |
| [keras-team/keras](https://github.com/keras-team/keras) | Python | 64,240 | 高层深度学习 API，兼容 JAX/TensorFlow/PyTorch 多后端。面向快速原型与教学，是入门用户的首选框架之一。 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | Python | 60,800 | YOLO26/11/8 系列目标检测与 CV 模型工具库。持续领跑开源计算机视觉落地，具备活跃的模型迭代节奏。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,320 | 大模型评测平台，支持 100+ 数据集与主流开源模型。在模型发布加速期，评测工具已成为社区验证能力的重要基础设施。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,509 | 在 Apple Silicon 上从零构建小型 vLLM + Qwen 的教学项目。面向系统工程师的 LLM 推理入门资源，近期热度上升。 |

### 🔍 RAG/知识库

| 项目 | 语言 | Stars（总量 / 今日） | 简要说明 |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 108,609 | 将代码库、文档、SQL Schema 等转为可查询知识图谱，支持 Claude Code、Cursor 等工具。不依赖向量库，是“结构化 RAG”路线的代表项目。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 88,918 | 领先的开源 RAG 引擎，融合 Agent 能力为 LLM 构建上下文层。企业级 RAG 落地的高频选择，stars 保持高位增长。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 64,972 | 本地优先的一体化文档问答与 Agent 产品，支持多种向量库与模型后端。“Own your intelligence”理念契合私有化 AI 趋势。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 63,691 | 面向 AI Agent 的通用记忆层，提供跨会话的长期记忆能力。与 OpenViking、claude-mem 等共同推动 Agent 记忆层走向标准化。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 51,770 | 文档 Agent 与 OCR/数据连接框架，是 RAG 生态中最成熟的数据层工具之一。在知识库构建与文档 QA 场景中应用广泛。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,712 | 云原生向量数据库，专为大规模向量 ANN 搜索构建。与 Zilliz Cloud 生态联动，是生产级 RAG 常用底座。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 34,092 | 高性能、大规模向量数据库与搜索引擎，Rust 实现。在 AI 应用中对低延迟检索的需求持续推高其热度。 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | Python | 0（+955） | 火山引擎开源自进化 Context Database，统一 Agent Memory、知识 RAG 与 Skills。今日 +955 登 Trending，是“上下文工程”基础设施化的最新入局者。 |

## 趋势信号分析

Agent Skills 是今日最强烈的爆发信号。Trending 中 skills（+2,267）、superpowers（+749）、caveman（+309）等技能包项目集中上榜，AI 编程竞争已从模型与 IDE 转向工作流与技能分发，可复用的 Skill/插件正在成为新的“软件包”。

上下文工程正快速基础设施化。OpenViking（+955）将 Agent Memory、RAG、Skills 统一为自进化 Context Database；ai-memory、turbovec、mem0 等同步出现，表明 Agent 长期记忆与跨会话状态正从应用层下沉为独立数据层。

本地优先与成本优化并存。caveman 减少 65% token、skills 直接跑在本地 CLI、career-ops 本地运行，开发者对隐私与 token 成本的敏感度已传导到工具设计上。

大厂与官方平台入局：火山引擎开源 OpenViking、Cursor 官方发布插件规范、腾讯开源 AI 安全平台，生态由个人驱动走向平台共建。

## 社区关注热点

- **Agent Skills 分发生态**：mattpocock/skills 单日 +2,267，说明可复制、可分享的“技能包”正在成为 Agent 时代的应用分发单元，值得跟进 `.agents` 目录、Skill 注册表等新约定。
- **OpenViking（火山引擎）**：+955 登榜的“自进化上下文数据库”，首次把 Agent Memory、RAG、Skills 统一到一个数据层，值得重点跟踪其对 RAG 技术栈的冲击。
- **cursor/plugins**：Cursor 官方插件规范发布，标志着 AI 编辑器进入可扩展平台时代。对独立开发者而言，插件生态将是新的机会窗口。
- **caveman（token 优化）**：用戏谑方式解决真实成本问题——减少 65% token。其思路可延伸到提示词压缩与上下文裁剪，是成本敏感型 Agent 应用的重要参考。
- **Tencent/AI-Infra-Guard**：Agent 越热，安全越重要。AI 红队、Agent 扫描、MCP 安全评估刚刚起步，未来或成为企业采用 Agent 的刚需配套。

---
*本日报由 [agents-radar](https://github.com/Liderhu/agents-radar) 自动生成。*