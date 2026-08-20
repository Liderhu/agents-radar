# AI 基础设施日报 2026-08-21

> 生成时间: 2026-08-20 17:03 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施横向对比分析报告（2026-08-21）

## 1. 生态全景

今日动态显示，AI 基础设施正在围绕新一代大模型（如 Kimi-K3、DeepSeek-V4、Qwen3.5/3.6、GLM-5.2）进行密集的内核级优化与适配，推理引擎（vLLM、SGLang）与本地运行时（llama.cpp、Ollama）呈现“上游新架构驱动、下游稳定性承压”的态势。推测解码（MTP/DFlash）成为高热度 Bug 集中区，多项目均出现 FP8/新硬件下的崩溃或正确性问题，说明高性能加速路径尚不成熟。同时，多后端（ROCm/HIP、Vulkan、MLX、NPU）的支持与修复占据了大量开发资源，跨平台可靠性仍是显著挑战。网关层（LiteLLM）与微调层（Unsloth）则在成本管控、工具调用稳定性与易用性上持续演进，整体生态正处于“快速上新、积极补课”的并行阶段。

## 2. 各项目活跃度对比

| 项目 | 今日提及 PR 数 | 今日提及 Issue 数 | Release 情况 |
|------|---------------|------------------|--------------|
| vLLM | 15+ | 12+ | 无新版本 |
| SGLang | 14+ | 15+ | 无新版本 |
| llama.cpp | 18+ | 13+ | 6 个新版本（b10505–b10516） |
| Ollama | 7+ | 18+ | v0.32.15 |
| LiteLLM | 10+ | 7+ | 无新版本 |
| Unsloth | 11+ | 11+ | v0.1.801-beta |

> 说明：PR/Issue 数量根据今日动态摘要中明确提及的编号统计，实际活跃数可能更高。

## 3. 模型支持竞速

- **vLLM** 在头部新模型支持上明显领先：针对 **Kimi-K3** 推出 GEMM-AR 扩展、FlashKDA 预填充检查点，针对 **DeepSeek-V4** 实现共享专家融合进 MegaMoE，并修复 **GLM-OCR** 的 MTP 权重加载；同时为 **gpt-oss** 增加路由专家加载能力。
- **SGLang** 紧随其后：新增 **MiniCPM-SALA** 原生支持、**MiniMax-M3** 的 FlashInfer 稀疏注意力路径，并为 **DeepSeek-V4-Flash**、**Qwen3.5** 提供量化与性能优化，但对应硬件上仍有崩溃待修。
- **llama.cpp** 覆盖新架构的速度较快但规模偏轻：新增 **Granite SWA / GraniteMoE SWA** 支持、**DFlash2** 投机架构、**lfm2/lfm2moe** 张量并行，适合本地小模型场景。
- **Ollama** 新模型支持相对滞后，仅社区请求 **Upstage Solar Pro 4**，且 Qwen3.x 系列存在多项回归。
- **LiteLLM** 侧重网关侧的 provider 接入，新增 **Parallel AI** 的 chat/responses 支持和 Anthropic 1m 上下文 beta header。
- **Unsloth** 今日无新增模型架构，主要精力放在 Studio 稳定性与工具链完善。

**结论**：vLLM 和 SGLang 在新模型 + 新硬件的深度优化上领先；llama.cpp 兼顾新架构但更偏轻量；Ollama 与 Unsloth 更多依赖上游后端，自身模型支持节奏较慢。

## 4. 性能优化前沿

今日各项目的优化火力集中在以下方向：

- **KV Cache 管理与量化**：vLLM 将 GLM 默认 KV cache 切换为 FP8、FlashKDA 细粒度前缀缓存；SGLang 引入 token-aware admission cap 防止 OOM；llama.cpp 实现 SYCL TILE 量化 KV decode，实测提速 **+42%~+169%**。
- **量化内核**：vLLM 优化 RMSNorm + 动态 per-token FP8 量化，减少全局内存读取；SGLang 融合 Qwen3.5 混合模型的 NVFP4 W4A4 量化；llama.cpp 提升 AVX2 IQ 模型大 batch 处理能力。
- **分布式推理与通信**：vLLM 的 GEMM-AR 用 `multimem.st` 取代 unicast store，硬件级标志同步；DSv4 共享专家融合进 MegaMoE 减少 kernel 启动；SGLang 推出同 GPU 多副本（DP replicas + CUDA MPS）方案。
- **调度与预填充**：SGLang 的 Weight Cache Daemon 将权重加载从 306s 降至 **<1s**；vLLM 探索 TP1 初始化引擎快照以缩短冷启动。
- **算子与后端适配**：llama.cpp 新增 `ggml_rope_set_offset` 算子；Metal 端优化 q8_0 反量化；SGLang 修复确定性持久 kernel 的 shared memory fallback，降低 JIT 开销。

整体看，**量化内核 + KV cache + 分布式通信**是当前性能突破的主要抓手，而跨后端的算子适配也是高频投入方向。

## 5. 分层定位差异

| 项目 | 分层定位 | 核心特征 |
|------|---------|----------|
| vLLM | 生产级推理引擎 | 深度内核调优、多卡多节点扩展、新模型快速适配，面向高并发线上服务 |
| SGLang | 生产级推理引擎 | 与 vLLM 重叠但更强调端到端性能、多后端（AMD/NPU）和高级调度策略 |
| llama.cpp | 轻量本地推理运行时 | 跨平台 CPU/GPU，极低依赖，适合桌面/边缘设备，社区驱动新架构支持 |
| Ollama | 本地部署工具 / 上层服务 | 基于 llama.cpp 等后端，提供 API/CLI，主打开箱即用和消费者体验 |
| LiteLLM | AI 网关 / 代理层 | 统一多 provider 接口，负责路由、预算、认证、可观测性，不参与模型推理 |
| Unsloth | 微调框架 + 轻量部署 | 聚焦 LoRA/QLoRA 微调效率，同时提供 Studio 本地管理，与推理引擎协同但非核心 |

**差异要点**：vLLM/SGLang 主攻云端大规模推理；llama.cpp/Ollama 占据本地与边缘；LiteLLM 是纯网关；Unsloth 则从训练侧切入，覆盖微调与本地 serve 的衔接。

## 6. 值得关注的趋势信号

- **新架构驱动内核创新，但伴随“加速未稳”风险**：Kimi-K3 的 GEMM-AR、DeepSeek-V4 的 MegaMoE 融合体现了头部模型与内核协同设计的趋势；但 MTP/DFlash 在 FP8、MI355X、Hopper 等组合下频繁出现崩溃（vLLM #40756、#52833；llama.cpp #25618），说明高倍率推测解码尚未达到生产级稳定，建议使用方锁定已知良好版本并补充长序列回归测试。
- **多后端可靠性仍是生态短板**：ROCm 上的 KV 串扰（Ollama #17847）、HIP 并行响应串线（llama.cpp #25992）、NIXL/UCX segfault（SGLang #35189）都直接威胁数据隔离与正确性。任何计划多硬件部署的团队都应优先验证这些路径，而不是盲目信任单一后端。
- **Agent/工具调用是应用层最大痛点**：LiteLLM 在强化预算管控（shadow_eval 美元化），但 Ollama、Unsloth、SGLang 均出现工具调用解析错误、流式超时、死锁等问题。建议 Agent 开发者：所有流式请求设置超时与熔断；对工具参数做二次 JSON 校验；对 500 错误后的请求显式重置会话而非盲目重放。
- **网关层开始承担更高阶治理职责**：LiteLLM 的美元预算替代轮次计数、readiness probe 修正、CLI OAuth 登录，表明网关正从简单路由走向成本治理、身份安全和故障域管理的一体化入口。企业级采购可重点关注此类能力。
- **本地推理与微调的正向融合**：Unsloth v0.1.801 引入 Rolling Context + Auto Compaction，Ollama 优化元数据缓存，llama.cpp 简化多版本发布——本地运行时的易用性和长会话能力在快速提升，低资源环境下的 Agent 部署将受益。
- **安全与数据隔离被提至新高度**：vLLM 的 int32 指针溢出跨用户泄露修复（#53131）、MNNVL 静默输出损坏修复（#53000）说明基础设施层面的边界安全已成为重点审查项。多租户部署应优先合入并验证此类修复。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

## vLLM 动态日报 2026-08-21

### 1. 今日速览

Kimi-K3 成为当前最热技术主线：NVIDIA 侧出现 GEMM-AR 扩展（#53053）与预填充检查点（#52971）两项核心 PR，ROCm 侧同步建立跟踪 issue（#50682）并以高评论数位居前列。推测解码仍是 Bug 高发区：MTP 在 FP8 长序列上非法内存访问（#40756，41 评论）与 GLM-5.2 在 MI355X 上 0% 接受率（#52833）均为今日高热度问题，暂无对应 fix PR。基础设施层面，两个值得关注的修复落地：CUDA 内核 int32 指针运算溢出的安全修复（#53131）与 MNNVL 多播邮箱静默输出损坏修复（#53000），均直接影响多租户与大规模部署稳定性。

### 2. 版本发布与破坏性变更

**无新版本发布**。以下行为变更进入 review 阶段，合并后将影响部署配置：

- **[Model] GLM KV cache 在 NVIDIA 上默认切换为 FP8**（#53138）：当使用 `fp8` 或 `modelopt_fp4` 量化的 `GlmMoeDsaForCausalLM` 检查点时，若 `--kv-cache-dtype` 保持 `auto`，缓存默认改为 FP8。显式指定缓存类型的行为不受影响，非 NVIDIA 平台不受影响。→ [vllm-project/vllm PR #53138](https://github.com/vllm-project/vllm/pull/53138)
- **[Frontend] 引入可复用的 TP1 初始化引擎快照**（#51360）：该 PR 探索在无 serving 进程时对初始化引擎做快照复用的方案，若合并将显著缩短 TP1 场景的冷启动时间。→ [vllm-project/vllm PR #51360](https://github.com/vllm-project/vllm/pull/51360)

### 3. 新模型与硬件支持

**新增模型/架构支持（进行中）**：

- **gpt-oss 路由专家加载**（#52209）：为 gpt-oss 添加按专家加载（routed expert loading）能力，使 verl 等 RL 引擎可在 actor-rollout 同步时逐专家同步，避免全量 all-gather。→ [vllm-project/vllm PR #52209](https://github.com/vllm-project/vllm/pull/52209)
- **GLM-OCR MTP 权重加载修复**（#49869）：识别 `model.language_model.layers.*` 作为合法 MTP 检查点前缀，修复 GLM-OCR 的 MTP 权重加载。→ [vllm-project/vllm PR #49869](https://github.com/vllm-project/vllm/pull/49869)

**硬件与后端动态**：

- **Kimi-K3 ROCm 支持与性能路线图**（#50682）：跟踪上游在 ROCm 上的 Day 0 特性和性能优化基线，包括 AITER fused-moe 集成状态。→ [vllm-project/vllm Issue #50682](https://github.com/vllm-project/vllm/issues/50682)
- **ROCm 侧新增两项性能优化**：MiniMax-M3 MTP 与稠密层启用 AITER PA gluon decode 内核（#52849）；DSv3 系列新增 bpreshuffled blockscaled FP8 GEMM，TP8+DPA 下 QPS 提升 4-8%（#51692）。→ [PR #52849](https://github.com/vllm-project/vllm/pull/52849) · [PR #51692](https://github.com/vllm-project/vllm/pull/51692)
- **FP8 block-scaled 权重在 sm120（RTX 5090）上无法加载**（#51884）：DeepGEMM 在 `process_weights_after_loading` 阶段报 "Unknown SF transformation"，影响 sm120 平台上的 block-scaled FP8 模型。→ [vllm-project/vllm Issue #51884](https://github.com/vllm-project/vllm/issues/51884)

### 4. 性能与优化

**今日核心性能 PR**：

- **[Kimi-K3] GEMM-RS 扩展为 GEMM-AR**（#53053）：引入 `multimem.st` 替换 unicast store，支持任意 M 值、无需 padding/输入拷贝，标志同步完全由硬件完成。→ [vllm-project/vllm PR #53053](https://github.com/vllm-project/vllm/pull/53053)
- **[Kimi-K3] 单次 FlashKDA 传递导出预填充检查点**（#52971）：支持细粒度前缀缓存，中间循环状态检查点存储于 request 持有的 Mamba block 中，可提高前缀缓存命中率。→ [vllm-project/vllm PR #52971](https://github.com/vllm-project/vllm/pull/52971)
- **[DSv4] 共享专家融合进 MegaMoE**（#53040）：将 DeepSeek V4 的 FP8 复制共享专家融合进 DeepGEMM 的 SM100 MegaMoE 内核，避免每层额外启动一个 routed FP4 MegaMoE kernel。→ [vllm-project/vllm PR #53040](https://github.com/vllm-project/vllm/pull/53040)
- **[Kernel] RMSNorm + 动态 per-token FP8 量化单次全局读快路径**（#45428）：消除原有的三次全局内存读取，降低输入带宽消耗。→ [vllm-project/vllm PR #45428](https://github.com/vllm-project/vllm/pull/45428)
- **[MLA] 共享扁平化 DCP decode 元数据**（#53139）：将 block-table、序列长度等状态移入 `MLACommonDecodeMetadata`，简化 Kimi-K3 与通用 MLA 的 DCP 输出组合路径。→ [vllm-project/vllm PR #53139](https://github.com/vllm-project/vllm/pull/53139)

**性能问题跟踪（无 fix 但值得关注）**：

- **torch.compile 下 QuantFP8.forward_native 分组量化（1,128）比 CUDA 慢**（#25094，评论 18）：需重新用 torch 2.10/2.11 验证。→ [vllm-project/vllm Issue #25094](https://github.com/vllm-project/vllm/issues/25094)
- **Inductor partition 性能问题**（#27828）：Blackwell 上 no partition 有时优于 Inductor partition（尤其 TTFT 的 attention+quant 融合场景）。→ [vllm-project/vllm Issue #27828](https://github.com/vllm-project/vllm/issues/27828)

### 5. 稳定性与回归

按严重程度排列：

**🔴 崩溃/数据安全**

- **CUDA 内核 int32 指针运算溢出（安全修复）**（#53131）：将 32 位指针偏移运算加宽至 64 位，防止 `num_tokens * stride` 超过 2^32 时发生跨用户数据泄露。多租户环境建议优先跟进。→ [vllm-project/vllm PR #53131](https://github.com/vllm-project/vllm/pull/53131)
- **MNNVL 多播邮箱静默输出损坏修复**（#53000）：CUDA multicast 地址必须使用 `multimem.*` 写入，否则 Lamport all-gather/reduce-scatter 静默产出错误结果。→ [vllm-project/vllm PR #53000](https://github.com/vllm-project/vllm/pull/53000)
- **MTP 推测解码长序列非法内存访问**（#40756，41 评论）：Qwen3.6-27B-FP8 + v0.19.1，`num_spec_tokens=5` 时崩溃。高热度无修复。→ [vllm-project/vllm Issue #40756](https://github.com/vllm-project/vllm/issues/40756)
- **TurboQuant KV cache 在 chunked continuation prefill 中崩溃**（#41726）：最新 nightly 上 workspace lock 后的崩溃，与 PR #39931（Hybrid Attention 模型 TQ 支持）相关。→ [vllm-project/vllm Issue #41726](https://github.com/vllm-project/vllm/issues/41726)
- **GLM-5.2 MTP 在 MI355X 上 0% 草稿接受率**（#52833）：gfx950 上禁用 expert parallelism 后直接 hipErrorIllegalAddress。→ [vllm-project/vllm Issue #52833](https://github.com/vllm-project/vllm/issues/52833)

**🟠 正确性回归**

- **DeepSeek-V4-Flash 间歇性输出损坏的 DSML tool-call 起始包裹**（#51914）：`<｜DSML｜tool_calls>` 被破坏为 `<｜DSML｜toolcalls>`，v0.27.1 + DSpark 下触发。→ [vllm-project/vllm Issue #51914](https://github.com/vllm-project/vllm/issues/51914)
- **OpenAI `strict` 标志泄漏进 chat template**（#52741）：`tools[].function.strict` 被渲染进模型可见的模板，改变工具调用行为。→ [vllm-project/vllm Issue #52741](https://github.com/vllm-project/vllm/issues/52741)
- **ngram_gpu + 结构化输出 + async 调度下 FSM 非法 token 被接受**（#49694）：导致 HTTP 500 与静默截断。→ [vllm-project/vllm Issue #49694](https://github.com/vllm-project/vllm/issues/49694)
- **Composite VLM 包装器错误解析 `tie_word_embeddings`**（#51063，已修复）：从错误的 config 层级取值导致丢弃真实 `lm_head.weight`，产生词表正确但语义混乱的输出。→ [vllm-project/vllm Issue #51063](https://github.com/vllm-project/vllm/issues/51063)
- **对齐模式前缀缓存在使用 priority 调度时完全未命中**（#52897）：0 / 996k 查询命中，与混合 GDN 模型及 post-#51113 相关。→ [vllm-project/vllm Issue #52897](https://github.com/vllm-project/vllm/issues/52897)

**🟡 已有 fix PR 的较旧问题（供回归验证）**

- **DFlash2 候选选择器不接受未量化线性 LM head**（#52883，stacked on #52816）：修复 `isinstance()` 类型守卫过严的问题。→ [vllm-project/vllm PR #52883](https://github.com/vllm-project/vllm/pull/52883)
- **DFlash2 新增局部卷积 + 候选选择器**（#52816）：对声明 `DFlash2DraftModel` 的检查点启用新的草稿架构，旧检查点行为不变。→ [vllm-project/vllm PR #52816](https://github.com/vllm-project/vllm/pull/52816)

### 6. 对应用开发者的意义

- **Kimi-K3 / DeepSeek-V4 用户将最先受益**：今日多个内核级 PR（GEMM-AR、共享专家融合、FlashKDA 检查点）直接服务这两类新模型，若应用已切换至此系列，可跟进对应 PR 合入后的性能提升。
- **MTP/推测解码仍是配置雷区**：多个高热度 Bug 尚未修复（#40756、#52833）。若生产环境依赖 MTP 加速，建议暂时锁版并添加长序列/特定硬件回归测试，避免盲目升级 nightly。
- **多租户部署应优先跟进两个安全性修复**：#53131 的指针溢出修复和 #53000 的 MNNVL 静默损坏修复。前者关乎跨用户数据隔离，后者可能导致静默错误推理结果，均建议合入后立即验证。
- **结构化输出与推测解码的组合使用需谨慎**：#49694 显示在并发下可能返回 HTTP 500 或静默截断，建议在 Agent/工具调用场景中为输出增加格式校验和重试机制。
- **前端行为变更影响面相对可控**：#53138 的 GLM KV cache 默认 FP8 仅影响未显式指定 cache dtype 的用户；#51360 的引擎快照则可能带来 TP1 冷启动的显著改善，值得关注其后续演进。

---
*本日报基于 vllm-project/vllm GitHub 仓库公开数据自动整理，覆盖 2026-08-19 至 2026-08-20 的 Issues/PRs 动态（数据获取于 2026-08-21）。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 动态日报 — 2026-08-21

### 1. 今日速览

今日无新版本发布，社区重心集中在**新硬件/量化支持**（FlashInfer SM90 MXFP4 MoE、ROCm 7.14 发布、同 GPU 多副本特性）与**稳定性回归修复**（NIXL prefill segfault 仍未解决、DeepSeek-V4-Flash 在 Hopper 上崩溃、Qwen3.5 架构模型在 0.5.17 版本出现生成退化）。多个问题已有关联 PR 在途，建议关注下文标注的修复进展。

---

### 2. 版本发布与破坏性变更

无新 Release。无明确破坏性变更；但注意 PR #35694 调整了 speculative decoding 越界 token 进入 radix cache key 的行为（修复 bug），可能影响缓存命中模式。

---

### 3. 新模型与硬件支持

- **[Perf] 添加 FlashInfer SM90 MXFP4 W4A8 CUTLASS MoE** — 在 Hopper (SM90) 上新增 MXFP4 W4A8 专家并行路径，补充现有 W4A16 支持（PR #34967）  
  https://github.com/sgl-project/sglang/pull/34967
- **[AMD] ROCm 7.14 (gfx942 / gfx950) 发布支持** — 因 ROCm 7.14 无 apt repo，改为基于 pip wheels + Docker 组装 SDK（PR #35319）  
  https://github.com/sgl-project/sglang/pull/35319
- **[Feature] MiniCPM-SALA 原生支持**（PR #30360）  
  https://github.com/sgl-project/sglang/pull/30360
- **MiniMax-M3 集成 FlashInfer 源码 MSA** — 支持 TP4、top-k 16、head-dim 128 的稀疏注意力路径（PR #35731）  
  https://github.com/sgl-project/sglang/pull/35731
- **[RFC] 同 GPU 多副本（DP replicas + CUDA MPS）** — Phase 1 PR 已提交，支持 `--same-gpu-replicas N` 在同一 GPU 上运行多个 SGLang 数据并行副本（Issue #35648 / PR #35706）  
  https://github.com/sgl-project/sglang/issues/35648  
  https://github.com/sgl-project/sglang/pull/35706
- **[NPU] Ascend A5 MXFP8/MXFP4 能力跟踪** 和 **跨代设备适配 RFC** — 定义了独立 kernel/适配层架构（Issue #34559 / #35709）  
  https://github.com/sgl-project/sglang/issues/34559  
  https://github.com/sgl-project/sglang/issues/35709
- **[diffusion] SANA-Video 支持 breakable CUDA graphs**，并允许外部模型/流水线插件注册（PR #35729 / #35713）  
  https://github.com/sgl-project/sglang/pull/35729  
  https://github.com/sgl-project/sglang/pull/35713

---

### 4. 性能与优化

- **[Perf] 融合 Qwen3.5 混合模型的 prefill norm/act 量化**（NVFP4 W4A4）— 覆盖 SiLU、post-LN+FP4-quant、gated-norm+FP8-quant（PR #34934）  
  https://github.com/sgl-project/sglang/pull/34934
- **Token-aware admission cap（`--max-inflight-prefill-tokens`）** — 防止长上下文请求超过 prefill 显存导致 OOM（PR #34011）  
  https://github.com/sgl-project/sglang/pull/34011
- **Weight Cache Daemon 路线图进展** — Phase 1 已合并：权重加载从 306–327s 降至 **<1s**（Qwen3-235B FP8）（Issue #33522）  
  https://github.com/sgl-project/sglang/issues/33522
- **修复确定性持久 kernel 的 shared memory fallback** — 仅当 Triton 报 OOR 时重试 num_stages=2，并缓存成功配置，减少 JIT 开销（PR #35732）  
  https://github.com/sgl-project/sglang/pull/35732
- **[Perf] PP8 PD 分离部署出现 ~30 秒 TTFT 下限**（Kimi-K3）— 负载无关，疑似与 pipeline parallel 下的 prefill 调度有关，待调查（Issue #34815）  
  https://github.com/sgl-project/sglang/issues/34815

---

### 5. 稳定性与回归

按严重度排列：

- **[严重] NIXL/UCX prefill segfault 未修复** — 在 v0.5.17 / CUDA 13.0 / B200 上复现，旧 issue #23489/#23499 被关闭但无根因修复；当前 issue 标记 high priority（Issue #35189）  
  https://github.com/sgl-project/sglang/issues/35189
- **[严重] DeepSeek-V4-Flash 在 Hopper (SM90) 上 EP 崩溃** — DeepEP + MXFP4 MegaMoE 在 decode CUDA-graph 捕获阶段崩溃，且错误信息误导（Issue #35557）  
  https://github.com/sgl-project/sglang/issues/35557
- **[严重] Qwen3.5-arch 模型在 0.5.17 生成退化为 token 循环** — 0.5.6.dev 正常，疑似回归；影响 NVFP4 量化 + DFlash2 草稿模型组合（Issue #35723）  
  https://github.com/sgl-project/sglang/issues/35723
- **[高] EAGLE + DP Attention + PD 分离死锁** — 开启 `index_share_for_mtp_iteration` 时 warmup 阶段挂起（GLM-5.2）（Issue #32527）  
  https://github.com/sgl-project/sglang/issues/32527
- **[高] PrefillDelayer 在 DP Attention + chunked prefill 下陷入混合状态反馈循环** — 请求成功但调度性能剧烈波动（Issue #35241）  
  https://github.com/sgl-project/sglang/issues/35241
- **[中] Anthropic 端点故障**：`tool_result` 中 `tool_reference` 导致 HTTP 500（Issue #35692）；流式输出两个 chunk 时 DeepSeek 工具调用被丢弃（Issue #35563）  
  https://github.com/sgl-project/sglang/issues/35692  
  https://github.com/sgl-project/sglang/issues/35563
- **[中] `sharded_state` 无法保存/加载 MLA 模型**（Issue #35702）  
  https://github.com/sgl-project/sglang/issues/35702
- **[中] ROCm 镜像 AITER pin 过旧**，导致 gfx950 上 FlyDSL MXFP4 MoE 不可用（Issue #35591）  
  https://github.com/sgl-project/sglang/issues/35591
- **[低] `move_logprobs_to_cpu` AttributeError：list 无 tolist**（Issue #35705）  
  https://github.com/sgl-project/sglang/issues/35705
- **[低] CUDA IPC JIT 在 NVCC 12.8 + apache-tvm-ffi 下编译失败** — 已有修复 PR #35733  
  https://github.com/sgl-project/sglang/pull/35733
- **[已修复] 量化 lm_head 未初始化 logits**（compressed-tensors ParallelLMHead 未 dispatch）— Issue #35358 已关闭  
  https://github.com/sgl-project/sglang/issues/35358
- **[已修复] PD 传输跳过空线性注意力状态缓冲区** — 修复 Inkling 模型 PD 分离失败问题（PR #35689）  
  https://github.com/sgl-project/sglang/pull/35689
- **[已修复] speculative overshoot 污染 radix cache key** — 已提交修复，避免缓存键含“幻影 token”（PR #35694）  
  https://github.com/sgl-project/sglang/pull/35694

---

### 6. 对应用开发者的意义

- **长上下文/高并发场景建议关注 `--max-inflight-prefill-tokens`**：可避免大 prompt 突发导致 OOM，适合 Agent 类应用承载大规模长上下文请求（PR #34011）。  
  https://github.com/sgl-project/sglang/pull/34011
- **使用 Anthropic 兼容端点并依赖工具调用的应用**：当前 `tool_reference` 在 `tool_result` 中会导致 500，建议暂时避免该用法或等待修复（Issue #35692）。  
  https://github.com/sgl-project/sglang/issues/35692
- **流式工具调用输出可能丢失**：DeepSeek 系列工具调用解析器在双 chunk 输出时有缺陷，影响流式 Agent 稳定性（Issue #35563）。  
  https://github.com/sgl-project/sglang/issues/35563
- **Qwen3.5 量化模型用户谨慎升级 0.5.17**：存在生成退化问题，若受影响可回退到 0.5.6.dev（Issue #35723）。  
  https://github.com/sgl-project/sglang/issues/35723
- **多副本 / 高密度部署**：`--same-gpu-replicas` 为中小模型单 GPU 多副本提供官方路径，适合延迟敏感的小模型服务（PR #35706）。  
  https://github.com/sgl-project/sglang/pull/35706
- **可观测性改进**：OTLP `service.name` 将支持自定义，多部署在 Jaeger/Tempo 中将不再混在一起，便于追踪（PR #35730）。  
  https://github.com/sgl-project/sglang/pull/35730

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态日报 2026-08-21

## 1. 今日速览

过去 24 小时发布 6 个新版本（b10505–b10516），重点包括 Granite SWA 架构支持（b10514）与新 ggml 算子 `ggml_rope_set_offset`（b10509）。性能侧，SYCL TILE 量化 KV decode 提速 +42%~+169%、AVX2 IQ 模型大 batch、Vulkan IQ3_S 寄存器溢出修复等多个 PR 处于活跃状态。稳定性方面，HIP 并行请求返回他人完整响应（#25992）与 SM_60 FP32 精度静默降级（#25593）是最值得关注的两条正确性风险。

## 2. 版本发布

- **[b10516](https://github.com/ggml-org/llama.cpp/releases/tag/b10516)**：Vulkan queue command pools cleanup 增加空指针保护（[#27353](https://github.com/ggml-org/llama.cpp/pull/27353)）
- **[b10514](https://github.com/ggml-org/llama.cpp/releases/tag/b10514)**：支持 GraniteSWAForCausalLM / GraniteMoeSWAForCausalLM 架构（转换脚本 + 推理，[#25505](https://github.com/ggml-org/llama.cpp/pull/25505)）
- **[b10509](https://github.com/ggml-org/llama.cpp/releases/tag/b10509)**：新增 ggml 算子 `ggml_rope_set_offset`，含 CPU / Metal 实现（[#27120](https://github.com/ggml-org/llama.cpp/pull/27120)）、CUDA 实现及 WebGPU gate 调整（[#27121](https://github.com/ggml-org/llama.cpp/pull/27121)）
- **[b10507](https://github.com/ggml-org/llama.cpp/releases/tag/b10507)**：MTMD 新增 `mtmd_bitmap_set_mergeable` 位图合并 API（[#27348](https://github.com/ggml-org/llama.cpp/pull/27348)）
- **[b10506](https://github.com/ggml-org/llama.cpp/releases/tag/b10506)**：Metal 端 q8_0 反量化改用 packed types 优化（[#27370](https://github.com/ggml-org/llama.cpp/pull/27370)）
- **[b10505](https://github.com/ggml-org/llama.cpp/releases/tag/b10505)**：server 新增 `dedup-cache-models` 预设选项，支持模型去重缓存（[#27346](https://github.com/ggml-org/llama.cpp/pull/27346)）

> 注意：b10509 引入新 ggml 算子，自定义后端/算子层需要同步适配。

## 3. 新模型与硬件支持

- **Granite SWA / Granite MoE SWA**：新增转换脚本与 `llama` 侧架构支持（[#25505](https://github.com/ggml-org/llama.cpp/pull/25505)）
- **DFlash2 投机架构**：PR 实现 local convolution + candidate selector 两个新模块，扩展 DFlash 系列（[#27342](https://github.com/ggml-org/llama.cpp/pull/27342)）
- **lfm2 / lfm2moe**：新增 `--split-mode tensor` 多卡张量并行支持，测试 NMSE 约 1e-14（[#26993](https://github.com/ggml-org/llama.cpp/pull/26993)）
- **mmproj 独立设备**：新增 `--mmproj-device`，视觉编码器可单独卸载至 iGPU 等设备（[#23255](https://github.com/ggml-org/llama.cpp/pull/23255)）

## 4. 性能与优化

- **SYCL TILE 量化 KV decode**（[#26689](https://github.com/ggml-org/llama.cpp/pull/26689)）：将 q4_0/q8_0 KV decode 从 VEC kernel 切换至 TILE kernel，Qwen3.6-35B、Gemma 4 26B/12B 在 32K/118K 上下文下实测 **+42% ~ +169%**，无回归，标记 merge ready
- **AVX2 IQ 模型大 batch prompt 处理提速**（[#27402](https://github.com/ggml-org/llama.cpp/pull/27402)）：优化 imatrix/perplexity 等 512-token 大 batch 场景下 IQ 权重的重复解码路径
- **Vulkan IQ3_S 大 batch 修复**（[#27449](https://github.com/ggml-org/llama.cpp/pull/27449)）：batch >4 时寄存器溢出导致 shader spill 442 寄存器至 17KB scratch，实测慢约 9 倍；修复后恢复至正常水平
- **Metal Mamba-2 SSD MMA**（[#26647](https://github.com/ggml-org/llama.cpp/pull/26647)）：Mamba-2 prefill 增加 chunked SSD matmul，64-token chunk 内并行 simdgroup matmul 以替代逐 token 串行
- **自适应 MTP draft 深度**（[#27210](https://github.com/ggml-org/llama.cpp/pull/27210)）：新增 `--spec-type draft-mtp-adaptive`，基于计数状态机动态调整 draft 长度

## 5. 稳定性与回归

按严重程度排列：

**🔴 严重——数据正确性 / 数据隔离**

- **HIP 并行请求响应串线**（[#25992](https://github.com/ggml-org/llama.cpp/issues/25992)）：`-np 4 --kv-unified` 下、Strix Halo gfx1151 集成 GPU，返回其他请求的完整响应内容；已 bisect 至 c7d87229，尚无 fix PR。建议 HIP 并行部署暂缓升级
- **SM_60 FP32 精度静默降级**（[#25593](https://github.com/ggml-org/llama.cpp/issues/25593)）：Tesla P100（sm_60）上 FP32 数学被静默改为 FP16 导致质量损失；两个下游 fork 已有修复，上游尚未合入
- **投机解码 greedy 输出分叉**（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)）：`temperature=0, top_k=1` 下 draft-mtp/dspark 与 vanilla 在量化目标上输出不一致，bf16 目标无此问题

**🟠 中等——性能回退 / 崩溃**

- **MTP 性能自 b9935 起回退**（[#25489](https://github.com/ggml-org/llama.cpp/issues/25489)）
- **CUDA 上 Qwen3.6-27B 崩溃**（[#23210](https://github.com/ggml-org/llama.cpp/issues/23210)）
- **SYCL host-pinned 内存大分配导致高 CPU 占用**（[#27038](https://github.com/ggml-org/llama.cpp/issues/27038)）
- **CUDA cublasCreate_v2 资源分配失败回归**（[#25304](https://github.com/ggml-org/llama.cpp/issues/25304)）：b9870 首次推理即崩溃，b9553 正常
- **纯 CPU 多客户端并发乱码**（[#26031](https://github.com/ggml-org/llama.cpp/issues/26031)）：b9922 起出现，b9918 正常

**🟡 低——特定环境 / 特定模型**

- agent 模式无限生成 `/` 字符（[#26209](https://github.com/ggml-org/llama.cpp/issues/26209)），同样 bisect 至 c7d8722
- Vulkan iGPU 约 50K context 后 `ErrorDeviceLost`（[#26447](https://github.com/ggml-org/llama.cpp/issues/26447)）
- Blackwell SOFT_MAX 崩溃（[#25060](https://github.com/ggml-org/llama.cpp/issues/25060)）
- RPC 多节点 GLM-5.2 崩溃（[#26583](https://github.com/ggml-org/llama.cpp/issues/26583)）
- MTP draft context 计算缓冲保留过大，压缩可容纳上下文（[#26038](https://github.com/ggml-org/llama.cpp/issues/26038)）

**相关修复 PR**

- [#27405](https://github.com/ggml-org/llama.cpp/pull/27405)：CUDA 多 GPU state restore 时 pin host buffer，规避 ROCm 异步 H2D 拷贝缺陷
- [#27446](https://github.com/ggml-org/llama.cpp/pull/27446)：Vulkan 设备内存分配失败时 fallback 至 host-visible buffer，替代直接 abort

## 6. 对应用开发者的意义

- **HIP 并行部署注意**：`-np>1` + `--kv-unified` 在 Strix Halo（gfx1151）当前存在串响应问题（[#25992](https://github.com/ggml-org/llama.cpp/issues/25992)），生产环境建议固定版本或改用其他后端
- **投机解码选项更丰富**：adaptive MTP（[#27210](https://github.com/ggml-org/llama.cpp/pull/27210)）与 DFlash2（[#27342](https://github.com/ggml-org/llama.cpp/pull/27342)）落地后，`--spec-type` 的可选策略增加，对延迟敏感型 Agent 应用可跟进实测
- **算子层 API 扩展**：`ggml_rope_set_offset`（b10509）是新的位置编码偏移算子，自定义后端或接入层需要跟踪适配；WebGPU gate 同时做了调整
- **server 运维**：新增 `dedup-cache-models` 预设（b10505），多模型切换场景可降低重复加载开销；上游正在清理 release.yml 与 HF UI 托管逻辑（[#27316](https://github.com/ggml-org/llama.cpp/issues/27316)）
- **新架构接入**：Granite SWA 系列（b10514）与 lfm2/lfm2moe tensor split（[#26993](https://github.com/ggml-org/llama.cpp/pull/26993)）已可开箱使用，相关 GGUF 转换脚本已合入
- **CPU/GPU 性能升级**：SYCL TILE 量化 KV decode（+42%~+169%）与 Vulkan IQ3_S 大 batch 修复对 Intel Arc 和 Vulkan 用户收益明显，建议优先合入这两个 PR 的版本

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 动态日报 — 2026-08-21

## 今日速览

v0.32.15 正式发布，核心变化是为模型引入元数据缓存以降低每次请求的开销；与此同时，社区报告集中在 Qwen3.x 系列的正确性回归（JSON 格式化、并行请求、视觉色域丢失）以及 MLX/ROCm 后端的稳定性问题上。多个关键修复 PR 已在同日提交，值得关注。

---

## 版本发布与破坏性变更

### v0.32.15 发布
- **核心变更**：引入模型元数据缓存，降低 Ollama 每次请求的额外开销（per-request overhead）。
- **新贡献者**：@gaugarg-nv（PR #17752）
- **链接**：https://github.com/ollama/ollama/releases/tag/v0.32.15

> 暂未发现破坏性变更或需要迁移的配置项。

---

## 新模型与硬件支持

- **Upstage Solar Pro 4**（524K 上下文、面向长程 Agent 任务）已被社区请求支持，目前为 [OPEN] 状态，暂无明确排期。
  - 链接：https://github.com/ollama/ollama/issues/17773

其余无重大新增模型或硬件后端更新。

---

## 性能与优化

- **模型元数据缓存（v0.32.15 已落地）**：新增缓存机制以削减每次请求的元数据解析开销，对高频小请求场景（如 Agent 多步工具调用）收益明显。
  - 链接：https://github.com/ollama/ollama/releases/tag/v0.32.15

- **MLX 预填充（prefill）速度回归已修复**：v0.32.14 中 MLX 引擎的 prompt 处理吞吐下降约 **3 倍**，在 v0.32.15 预发布版中已基本恢复（M5 Max 实测；GGUF 路径不受影响）。
  - 链接：https://github.com/ollama/ollama/issues/17884

- **MLX 长期内存增长问题（进行中）**：MLX runner 的 KV 缓存内存随请求数量单调增长，不随上下文长度/工具 schema 变化，无法在模型重载前释放。已有人指出其与 #16698 同源。
  - 链接：https://github.com/ollama/ollama/issues/17875

---

## 稳定性与回归

> 按严重程度从高到低排列。

### 1. 正确性/数据污染类（最严重）

- **[ROCm] gfx1151 (Strix Halo) KV 状态串扰**：在 ROCm 后端上，连续两次无关请求之间发生 KV 缓存泄漏，后一个请求的回答内容被前一个请求污染。无任何报错，极具隐蔽性。
  - 链接：https://github.com/ollama/ollama/issues/17847

- **[ROCm] 长提示词（>4k tokens）输出错误**：同一台 Strix Halo 机器上，ROCm 后端在长 prompt 下产生错误输出（模型忽略指令），而 Vulkan 与 CPU 后端均正确。疑似 ROCm 后端可复现 bug。
  - 链接：https://github.com/ollama/ollama/issues/17895

- **Embedding 静默全零向量**：在持续负载下，`/v1/embeddings` 与 `/api/embed` 开始返回全零向量，HTTP 200 + 正常 usage 字段，无任何日志区分失败——对 RAG 应用是静默数据损坏。
  - 链接：https://github.com/ollama/ollama/issues/17878

### 2. 请求挂起/死锁类

- **工具调用解析失败后重试永久挂起**：`qwen3.8:27b` 在发生工具调用解析错误（500）后，重放同一请求会无限期挂起，无响应、无日志，直至 runner 被回收。**已有修复 PR #17883**。
  - Issue: https://github.com/ollama/ollama/issues/17825
  - Fix PR: https://github.com/ollama/ollama/pull/17883

- **流式中断导致 goroutine 泄漏**：`/api/generate`、`/api/chat`、pull/push 流式接口在客户端断开时，后台 goroutine 会阻塞在无缓冲 channel 上造成泄漏。**已有 PR #17881**。
  - 链接：https://github.com/ollama/ollama/pull/17881

- **Cloud 模型思考循环**：`deepseek-v4-flash:cloud` 可陷入无限思考循环（单次会话重复同一推理段落 221 次，无有效输出）；另一同类问题中 Claude Code 曾触发 193 次连续相同工具调用、消耗约 3100 万 token。云模型侧的兜底限流与熔断需引起重视。
  - https://github.com/ollama/ollama/issues/17892
  - https://github.com/ollama/ollama/issues/17617

### 3. 回归类

- **Qwen3.6 JSON 模式回归**：`think: false` + `format: "json"` 时，模型仍会把 reasoning 序列化为合法 JSON 对象（如 `{"thought": ...}`），而不是遵循请求的 schema。0.31.2 → 0.32.x 引入。
  - 链接：https://github.com/ollama/ollama/issues/17871

- **HTTP OPTIONS 请求回归 405**：浏览器 CORS 预检请求（`OPTIONS`）在最新版本返回 `405 Method Not Allowed`，破坏 Web 端 fetch 直连 Ollama。**已有 PR #17890（loopback/private 主机返回 204）**。
  - Issue: https://github.com/ollama/ollama/issues/17887
  - Fix PR: https://github.com/ollama/ollama/pull/17890

- **Qwen3.5 并行能力被强制降级**：ARM64 DGX Spark（GB10、128GB 统一内存）上 Qwen3.5 架构被硬编码为 `numParallel = 1`，即使设置了 `OLLAMA_NUM_PARALLEL` 也无效。**已有 PR #17144 解除该限制**（上游 llama.cpp 崩溃已修复）。
  - Issue: https://github.com/ollama/ollama/issues/14621
  - Fix PR: https://github.com/ollama/ollama/pull/17144

### 4. 其他值得关注

- **Mac 上 Agent 集成挂起**：Qwen 本地模型在 macOS 上通过 Ollama 直接调用一切正常（含 OpenAI 兼容 API、流式、推理、工具调用），但 Agent 集成（如 Claude Code 等）会无限期挂起。
  - 链接：https://github.com/ollama/ollama/issues/17839

- **Qwen3.x 视觉模型丢失颜色**：红色圆盘被报告为“gray”、绿/蓝为“black”，但在 mlx_vlm 下相同权重颜色正常。Ollama 视觉管线存在色度（chroma）丢失问题。
  - 链接：https://github.com/ollama/ollama/issues/17872

- **MLX 视觉高分辨率崩溃**：输入 5712×4284 JPEG 时，MLX vision runner 请求约 **125GB** Metal buffer 导致崩溃（M5 Pro 48GB 机型）。
  - 链接：https://github.com/ollama/ollama/issues/17804

- **Vulkan 后端 gfx1151 看门狗超时**：长 prompt prefill 触发 amdgpu compute-ring timeout / ErrorDeviceLost；`num_batch=128` 可规避。
  - 链接：https://github.com/ollama/ollama/issues/17870

- **gemma4 工具调用格式解析失败**：模型以 `key=value` 而非 `key:<|"|>value<|"|>` 输出参数时，API 返回空 `tool_calls` 与空 `content`。**已有 PR #17888 修复**。
  - Issue: https://github.com/ollama/ollama/issues/17882
  - Fix PR: https://github.com/ollama/ollama/pull/17888

- **CLI `/set think` 参数错误**：`/set think false` 返回 400，要求必须是 `"high"/"medium"/"low"/"max"/true/false`，与文档语义不一致。
  - 链接：https://github.com/ollama/ollama/issues/17859

---

## 对应用开发者的意义

以下是今日动态中对 Agent / 应用开发者影响最大的几个点：

1. **Agent 链路仍是重灾区**：工具调用解析失败后重试挂起（#17825）、流式中断 goroutine 泄漏（#17881）、Cloud 模型思考无限循环（#17892/#17617）、macOS 上 Agent 集成挂起（#17839）——这些都会直接导致 Agent 任务超时或死循环。建议：
   - 为所有流式请求设置客户端超时与自动重试熔断；
   - 避免对 500 错误后的请求做盲目重放（可能永久挂起），应显式卸载/重置会话；
   - 对 Cloud 模型加上 token 消耗上限与工具调用次数上限。

2. **Embedding 全零向量检测**：RAG 应用在生产环境中应对 embedding 结果增加“非零校验”，否则数据会静默损坏。建议监控 `prompt_tokens` 与实际向量范数的相关性。

3. **CORS 回归影响 Web 端应用**：如果你在浏览器中通过 `fetch` 直连 Ollama API，v0.32.15（及 0.32.x 系列）会遇到 OPTIONS 预检失败；建议临时在服务端增加反向代理，或等待 PR #17890 合入。

4. **Qwen3.x 系列是本次回归的集中地带**：JSON 模式（#17871）、并行（#14621）、视觉色域（#17872）、系统消息渲染（PR #17855）均有变更或缺陷，当前阶段若在生产使用 Qwen3.x 建议锁定版本并充分回归测试。

5. **好消息**：v0.32.15 的模型元数据缓存对高调用频次场景（多 Agent 并发、短 prompt 工具循环）有正面收益；MLX 预填充的 3 倍退化也已在预发布版修复，Apple Silicon 用户可保持跟进。

---

*报告生成时间：2026-08-21 | 数据来源：github.com/ollama/ollama（Releases / Issues / PRs 近 24 小时更新）*

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态日报 2026-08-21

## 今日速览

今日核心动态集中在三个方面：shadow_eval 预算机制从"轮次计数"重构为"美元消耗"（PR #37555），直接提升预算管控精度；虚拟密钥预算超支错误与 spend 数据不一致的问题（#27735）成为社区最关注的 Bug，已有 10 条评论；另有 FastAPI 兼容性回归导致代理无法启动（#36922），已有修复 PR 在途。稳定性修复与功能增强并行推进，整体项目活跃度较高。

## 破坏性变更与行为变化

- **shadow_eval 预算语义变更（PR #37555）**：将 per-key 预算从 `max_turns`（轮次计数）改为按美元 spend 计算。此前轮次成本因模型和提示词不同而波动，`max_turns` 只能松散约束花费；且基于名称的定价缺失时 judge_spend 会读为 $0.00。**迁移注意**：依赖轮次计数的现有 shadow_eval 配置需要改为显式设置美元预算上限。 [PR #37555](https://github.com/BerriAI/litellm/pull/37555)

- **Readiness probe 行为修正（PR #37640）**：`/health/readiness` 在数据库不可用时会返回 503，即使用户设置了 `allow_requests_on_db_unavailable: true`。该 PR 让 readiness 在 fail-open 配置下保持 200，避免 K8s 在数据库故障时将全部 Pod 摘除。**影响**：启用 fail-open 的部署在数据库故障时行为将改变（不再被 K8s 驱逐）。 [PR #37640](https://github.com/BerriAI/litellm/pull/37640)

- **原生 CLI OAuth 登录（PR #37626）**：新增 CLI 通过 OAuth authorization code + PKCE 完成代理登录的能力。此前 CLI 无法通过 SSO 完成用户身份认证，只能使用管理员手工签发的 key。该能力面向非 Python CLI 也提供了机器可读的发现契约。 [PR #37626](https://github.com/BerriAI/litellm/pull/37626)

## 新模型与功能支持

- **Parallel AI 新增 chat + responses LLM provider（PR #36704）**：此前 LiteLLM 仅支持 Parallel AI 的搜索能力，现通过其 OpenAI Responses 兼容端点支持完整 chat/responses 调用，并补齐 `after_date`、`fetch_policy`、`location` 等 v1 search 参数，同时修复了 flat per-request 定价被记录为 $0 的问题。 [PR #36704](https://github.com/BerriAI/litellm/pull/36704)

- **complexity_router 新增 business 分类 rubric 预设（PR #37534）**：内置 rubric 此前仅覆盖 chat 和 agentic coding 流量，商务/销售类提示容易被工程向的 tier 条件错误路由。新增 `business` 预设，用商务 tier 定义替换工程向标准。 [PR #37534](https://github.com/BerriAI/litellm/pull/37534)

- **Azure passwordless 数据存储认证（PR #30633）**：为代理数据库添加 Azure PostgreSQL Entra token 支持，并将 Azure AD Redis 凭据透传到 URL 和 pool 客户端。适合使用 Azure 托管 PostgreSQL/Redis 且不愿管理静态密码的部署。 [PR #30633](https://github.com/BerriAI/litellm/pull/30633)

- **Anthropic 1m 上下文 beta header 自动注入（PR #31611）**：模型名带 `[1m]` 后缀时自动注入 `context-1m` beta header，避免用户手动配置。 [PR #31611](https://github.com/BerriAI/litellm/pull/31611)

## 性能与优化

- **共享 JSONFragmentAccumulator 消除 O(n²) 流式解析瓶颈（PR #36610）**：Vertex 和 Anthropic 流式响应在每个 chunk 上复制整个 SSE fragment 缓冲区，复杂度为 O(n²)；且 Anthropic 侧缺少解析延迟启发式，两个拼接的 JSON envelope 可能永久卡住。新增共享累加器同时解决这两个问题。 [PR #36610](https://github.com/BerriAI/litellm/pull/36610)

- **CI 单元测试矩阵重构（PR #37590）**：将九个薄封装 workflow 文件折叠为单一矩阵调用，减少维护成本，shard 名称保持兼容。属于工程效率优化，不直接影响 runtime 性能。 [PR #37590](https://github.com/BerriAI/litellm/pull/37590)

- **Prompt caching 路由亲和性 TTL 硬编码问题（Issue #28427）**：`optional_pre_call_checks: ["prompt_caching"]` 将 `model_id → cacheable_prefix_hash` 绑定的 TTL 硬编码为 5 分钟，对于 1 小时有效的 ephemeral cache（如 Anthropic）会导致缓存亲和性失效，路由可能把请求发往缓存未命中的部署。目前仍为打开状态，无修复 PR。 [Issue #28427](https://github.com/BerriAI/litellm/issues/28427)

## 稳定性与回归

按严重程度从高到低排列：

- **[严重] FastAPI 兼容性回归导致代理无法启动（#36922）**：`uv tool update litellm["proxy"]` 升级到 v1.96.2 后，`get_flat_dependant` 与当前 FastAPI 版本不兼容，代理启动即失败。已有修复 PR 在途（devin-ai-integration 提交）。 [Issue #36922](https://github.com/BerriAI/litellm/issues/36922) / [PR #37640](https://github.com/BerriAI/litellm/pull/37640)（注意：PR #37640 为 readiness probe 修复，与该 issue 对应的 PR 尚未合入）

- **[高] 虚拟密钥预算超支检查使用陈旧 spend 数据（#27735）**：代理拒绝请求并报 `BudgetExceededError`，但 `/key/info` 显示的 spend 仍低于 `max_budget`。与 #27639 相关但发生在团队级虚拟密钥场景。目前仍为打开状态。 [Issue #27735](https://github.com/BerriAI/litellm/issues/27735)

- **[高] `/health` 端点明文泄露敏感信息（#36898）**：`GET /health` 未经过与 `/model/info` 相同的脱敏逻辑，`extra_headers` 和 `aws_session_token` 以明文返回。`api_key` 已正确脱敏，但其余字段存在暴露风险。目前仍为打开状态。 [Issue #36898](https://github.com/BerriAI/litellm/issues/36898)

- **[中] provider_budget_config 的 budget_reset_at 计算偏差约57年（#37261）**：未配置 Redis 时，`GET /provider/budgets` 返回的 `budget_reset_at` 指向约 57 年后，导致月度预算实际上永不重置。目前仍为打开状态。 [Issue #37261](https://github.com/BerriAI/litellm/issues/37261)

- **[中] mid-conversation system-role hoist 使 prompt-cache 前缀全部失效（#36559）**：`AnthropicMessagesConfig._normalize_system_role_messages` 将对话中部的 system 消息提升到顶层 `system` 字段以避免 400，但此转换破坏了 prompt-cache 的 prefix 连续性，导致每次请求都完全 miss 缓存。该 issue 已关闭（可能已修复或被认为是预期行为），但未在数据中看到对应修复 PR。 [Issue #36559](https://github.com/BerriAI/litellm/issues/36559)

- **[低] 升级 1.90.0 后出现未解析成本信息的日志噪音（#32484）**：1.85.3 升级到 1.90.0 后开始出现模型不在 cost map 中的日志。目前仍为打开状态。 [Issue #32484](https://github.com/BerriAI/litellm/issues/32484)

## 对应用开发者的意义

1. **密钥预算行为变化需要关注**：shadow_eval 预算改为美元口径后，依赖轮次限制的 CI 流程需要重新配置；同时虚拟密钥超支误判问题（#27735）尚未修复，如果生产环境依赖密钥级预算做硬隔离，应持续跟踪该 issue 的进展。

2. **健康检查与敏感信息**：如果当前部署在 DB 故障时依赖 `allow_requests_on_db_unavailable` 实现 fail-open，PR #37640 合入后 readiness 行为将修正为符合预期；同时 `/health` 端点会泄露 `extra_headers` 等敏感信息，在暴露到公网前应评估风险。

3. **CLI 登录体验即将改善**：PR #37626 合入后，非 Python CLI 可以通过标准 OAuth PKCE 流程完成代理登录，避免管理员手工签发 key 的运维负担。

4. **流式解析稳定性提升**：JSONFragmentAccumulator（PR #36610）合入后，Vertex/Anthropic 流式场景下的 O(n²) 解析开销和双 JSON envelope 卡住问题将得到解决，对高并发流式应用是实质性收益。

5. **Parallel AI 集成扩展**：如果应用使用 Parallel AI 的搜索/推理能力，PR #36704 后可以通过 OpenAI 兼容的 chat/responses 接口统一调用，无需再绕过网关直连上游。

6. **JWT 团队别名修复**：PR #37645 修复了 JWT 直连用户路径下 team model_aliases 被忽略的问题，此前请求会静默使用原始模型名而非别名，合入后行为更可预期。 [PR #37645](https://github.com/BerriAI/litellm/pull/37645)

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态日报 — 2026-08-21

## 今日速览

v0.1.801-beta 发布，带来 Rolling Context + Auto Compaction（预览）和 LAN Remote Access，累计合并 200+ PR。同时今日大量 Studio 相关修复集中在错误传播质量与 KV cache 并发准入控制上，其中 Codex 88% 失败率的最高频故障已修复（#9403）。平台方面，macOS 上出现 Qwen3.8-27B 加载导致系统级闪烁崩溃的严重报告（#9279），目前尚无修复 PR。

---

## 版本发布与破坏性变更

- **v0.1.801-beta**（2026-08-21）
  - 核心变更：
    - **Rolling Context + Auto Compaction（实验性）**：超过上下文上限时自动压缩历史，支持更长对话
    - **Remote & LAN Access（预览）**：支持局域网内远程访问
  - 同时合并 200+ PR，涉及大量修复与新功能
  - 未明确列出破坏性变更；合并量较大，建议升级后回归测试自定义工作流
  - 🔗 [Release v0.1.801-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.801-beta)（根据 issue 数据推断，建议在 Release 页面确认详细 changelog）

---

## 新模型与硬件支持

- 今日无新增模型/架构/量化格式的官方公告。

- **Qwen3.8-27B 相关**：
  - **问题**：在 macOS M3/M4 上加载 Qwen3.8-27B 官方量化版时，Unsloth GUI 应用变紫、屏幕闪烁，疑似系统级崩溃风险；LM Studio 无此问题。无修复 PR。
  - 🔗 [Issue #9279](https://github.com/unslothai/unsloth/issues/9279)

- **Diffusion 模型**：
  - PR #9418 修复了 diffusion 模型上 Tensor Parallelism 开关错误显示的问题（尚未合并）。
  - 🔗 [PR #9418](https://github.com/unslothai/unsloth/pull/9418)

- **ROCm/AMD**：
  - 遗留问题：Strix Halo + ROCm 预构建 b10079 存在性能回退（Open），无新进展。
  - 🔗 [Issue #7371](https://github.com/unslothai/unsloth/issues/7371)

---

## 性能与优化

今日无量化/算子级性能优化；优化集中在 Studio 的资源管理与交互性能：

- **KV cache 并发准入控制（已合并）**：此前两个 chat 同时生成时，后到的请求会直接"Context size exceeded"杀死先到请求。PR #9392 将 KV cache 实际 token 数纳入准入判断，而非仅看 slot 数，从根上消除该互杀场景。
  - 🔗 [PR #9392](https://github.com/unslothai/unsloth/pull/9392)

- **Sidebar 拖拽性能优化（已合并）**：拖拽侧边栏时会对整个 document 每帧重写两次 CSS 自定义属性。PR #9400 将写入范围收窄到实际消费方子树（默认关闭，需显式开启）。
  - 🔗 [PR #9400](https://github.com/unslothai/unsloth/pull/9400)

- **大工具结果适配（进行中）**：PR #9384 按当前模型窗口对 tool 结果做限长截断；后续 PR #9421 进一步修正为实际测量（而非预估）密度化文本的 token 占用，并移除对配置上限的强制抬升。
  - 🔗 [PR #9384](https://github.com/unslothai/unsloth/pull/9384)　[PR #9421](https://github.com/unslothai/unsloth/pull/9421)

- **Max Tokens 自动续写（已合并）**：回复达到 Max Tokens 上限时自动续写完成，不再停留等待用户点击 Continue 打断流程。
  - 🔗 [PR #9382](https://github.com/unslothai/unsloth/pull/9382)

---

## 稳定性与回归

按严重程度排序，标注是否已有 fix PR：

### 高风险

- **macOS 加载 Qwen3.8-27B 导致系统级屏幕闪烁/疑似崩溃（OPEN，无 fix）**：仅 Unsloth GUI 触发；M3 24GB / M4 均受影响。建议在修复前改用 LM Studio 或 Web UI。
  - 🔗 [Issue #9279](https://github.com/unslothai/unsloth/issues/9279)

- **安全扫描器误封所有微调模型（已关闭，修复未验证）**：macOS v0.1.800-beta 对所有微调模型报 "Custom code blocked / CRITICAL"，即使模型无自定义代码。Issue 已关闭，升级到 v0.1.801-beta 前建议手动确认扫描逻辑是否恢复正常。
  - 🔗 [Issue #9239](https://github.com/unslothai/unsloth/issues/9239)

### 中风险

- **Codex 88% 失败率（已修复）**：`connection (codex, stable)` 在 40 次运行中失败 88%（其余 agent 0% 失败），根因是 llama-server 读取 prompt 时 Codex 自发取消了自己的首个 turn。PR #9403 已修复（CLOSED）。
  - 🔗 [PR #9403](https://github.com/unslothai/unsloth/pull/9403)

- **KV starvation 误报为上下文超限（修复中）**：PR #9390 让中途流错误真正透出；PR #9417 进一步修正其中 KV starvation 消息在客户端被误标为 context limit 的措辞问题。
  - 🔗 [PR #9390](https://github.com/unslothai/unsloth/pull/9390)　[PR #9417](https://github.com/unslothai/unsloth/pull/9417)

- **工具调用参数 JSON 格式非法（OPEN，无统一 fix）**：多条报告（#9338 云 API、#9039 自定义 endpoint），`tool_calls[].function.arguments` 出现 trailing characters 或 invalid arguments。对 agent 类应用影响大，建议在网关层防御性校验。
  - 🔗 [Issue #9338](https://github.com/unslothai/unsloth/issues/9338)　[Issue #9039](https://github.com/unslothai/unsloth/issues/9039)

- **macOS llama-server 启动失败 / 二次启动报错（已关闭，需验证）**：涉及加载本地 GGUF 时启动失败（#8566）及二次启动报错（#8610），均在近期关闭，修复随 v0.1.801-beta 发布。
  - 🔗 [Issue #8566](https://github.com/unslothai/unsloth/issues/8566)　[Issue #8610](https://github.com/unslothai/unsloth/issues/8610)

### 低风险 / 体验类

- **NVFP4 在 RTX 5060 Ti 16GB 上无法加载（OPEN，无 fix）**
  - 🔗 [Issue #8246](https://github.com/unslothai/unsloth/issues/8246)

- **下载速度与剩余时间显示波动严重（已关闭）**
  - 🔗 [Issue #9378](https://github.com/unslothai/unsloth/issues/9378)

- **统计面板日/月切换不刷新汇总（OPEN）**
  - 🔗 [Issue #9337](https://github.com/unslothai/unsloth/issues/9337)

- **macOS 文本编码错误（OPEN）**
  - 🔗 [Issue #8594](https://github.com/unslothai/unsloth/issues/8594)

- **预构建 b10079 在 Strix Halo + ROCm 上性能回退（OPEN，无进展）**
  - 🔗 [Issue #7371](https://github.com/unslothai/unsloth/issues/7371)

---

## 对应用开发者的意义

1. **错误信息终于有用了**：此前中途流错误在到达用户前被吞掉真实原因（统一替换为 "Local model stream failed"）。PR #9390 已修复——对依赖 Studio 做本地模型代理的应用，排障成本显著下降。但注意 #9417 显示 KV starvation 消息仍可能被客户端误标为 context limit，语义解析需等待该 PR 合并。

2. **并发生成不再互相踩死**：PR #9392 的 KV cache 准入控制意味着多个 chat 同时请求时，后者会排队而非直接触发 "Context size exceeded"——多租户/多会话场景的稳定性有实质提升。

3. **SSM 内核安装静默失败风险仍存**：PR #9419 修复 causal-conv1d 安装时的假死状态（Linux aarch64），但尚未合并。使用 Qwen3.5 Safetensors + Studio 组合的开发者需留意。

4. **注意 macOS 上 Qwen3.8-27B 的严重崩溃报告**（#9279）：建议在 Studio 桌面版修复前，优先通过 CLI/API 方式跑该模型。

5. **工具调用仍是重灾区**：多条 tool-calling 相关 issue（#9338、#9039）表明参数序列化在云 API/自定义 endpoint 路径上仍不稳定。在 Unsloth 之上构建 agent 的团队，应在客户端做 JSON 参数二次校验和重试，不要依赖上游。

6. **llama-server 参数兼容性处理**：PR #9416 解决了 `--swa-checkpoints` 与 `--ctx-checkpoints` 新旧命名兼容问题——如果你在 Extra Arguments 里手写 flag，建议优先使用新名字，旧版本会做 fallback。

7. **安全扫描器可能误伤模型**：macOS 上 v0.1.800-beta 曾出现全量误报（#9239）。升级 v0.1.801-beta 后若微调流程被 "Custom code blocked" 拦截，优先怀疑扫描器逻辑而非模型本身。

</details>

---
*本日报由 [agents-radar](https://github.com/Liderhu/agents-radar) 自动生成。*