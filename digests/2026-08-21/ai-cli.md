# AI CLI 工具社区动态日报 2026-08-21

> 生成时间: 2026-08-20 17:03 UTC | 覆盖工具: 10 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Grok Build](https://github.com/xai-org/grok-build)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具社区动态横向对比分析报告

**报告日期：2026-08-21** | **覆盖工具：** Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、Kimi Code、OpenCode、Pi、Qwen Code、CodeWhale（原 DeepSeek TUI）、Grok Build

---

## 1. 生态全景

AI CLI 工具已从"单点实验"进入**规模化生产依赖阶段**，社区讨论重心由"能做什么"转向"能否稳定可靠地持续工作"——静默失败、长会话记忆丢失、跨平台崩溃成为各工具共有的核心痛点。头部厂商（Anthropic、OpenAI、Google、GitHub）保持高频迭代，其中 OpenAI Codex 在 24 小时内连发 3 个 alpha 版本，Qwen Code 则呈现明显的 CI/CD 安全加固与自动修复驱动的开发模式。与此同时，开源社区（OpenCode、Pi、CodeWhale）正通过 TUI 交互打磨、多 Provider 接入和本地化策略寻求差异化生存空间，而 MCP 生态互操作性与安全沙箱的完善成为所有工具共同的技术底座竞争点。

---

## 2. 各工具活跃度对比

> 注：Issues/PR 数为各日报筛选出的高热度/重要条目，非当日全量数据；Release 为过去 24-48 小时动态。

| 工具 | Releases | 高热度 Issues | 重要 PRs | 迭代阶段 |
|---|---|---|---|---|
| Claude Code | v2.1.236 / v2.1.237（2 个） | 10 | 0 | 成熟期，稳定迭代 |
| OpenAI Codex | rust-v0.149.0-alpha.2/3/4（3 个 alpha） | 10 | 10 | 快速迭代，alpha 密集 |
| Gemini CLI | v0.57.0-preview.0 + v0.56.0 稳定版 + nightly | 10 | 10 | 高速迭代，双轨发布 |
| Copilot CLI | v1.0.81-4 / v1.0.81-5（prerelease） | 10 | 1 | 成熟期，pre-release 高频修复 |
| Kimi Code | 无 | — | — | 静默期（过去 24h 无活动） |
| OpenCode | v1.18.19 | 10 | 10 | 开源快速迭代 |
| Pi | 无 | 10 | 10 | 功能重构期（TUI 主题/架构重构） |
| Qwen Code | v0.21.11-nightly | 10 | 10 | 快速迭代，autofix 驱动 |
| CodeWhale | v0.9.10（76 commits 发布列车） | 10 | 10 | 品牌/架构转型期 |
| Grok Build | 无 | — | — | 静默期（过去 24h 无活动） |

**活跃度排序（综合）：** Gemini CLI ≈ OpenAI Codex ≈ Qwen Code ≈ OpenCode ＞ Pi ≈ CodeWhale ≈ Claude Code ≈ Copilot CLI ＞＞ Kimi Code ≈ Grok Build

---

## 3. 共同关注的功能方向

### 3.1 长会话记忆与上下文管理（最普遍痛点）
- **Claude Code**：#34556 上下文压缩后无持久内存（98 评论），社区自建记忆系统
- **Pi**：#6879 auto-compaction 超 100% 后不触发，直到 provider 拒绝（17 👍）
- **Qwen Code**：#9309 压缩计数异常、#2128 UI 历史数组无界增长
- **CodeWhale**：#5518 紧急压缩过早触发（85K-105K 即触发）
- **共同诉求**：压缩策略透明化、按模型可配置、内存加载状态可见

### 3.2 Windows 平台稳定性（重灾区）
- **Claude Code**：桌面端 GPU 崩溃杀死所有会话（#81698 RTX 5080、#80444 MSIX 无法启动）
- **Codex**：Windows 会话归档失败（#39239 `\\?\` 路径前缀）、sandbox helper 缺失（#27125）
- **Copilot CLI**：enforced-sandbox 阻止 git（#4524）
- **Pi**：#6300 输入重绘、#7547 Windows 问题集中反馈（32 评论）、#8372 快捷键冲突
- **CodeWhale**：#5512 状态指示器不渲染、#5023 IME 候选窗口跳变
- **共同诉求**：崩溃恢复机制、路径处理规范化、权限沙箱与 git 工作流兼容

### 3.3 静默失败与可观测性
- **Claude Code**：#86298 跨会话消息静默丢弃、#88125 197 次发送全部"成功"但未投递
- **Gemini CLI**：#22323 MAX_TURNS 中断被误报为成功
- **Codex**：Release Notes 为空占位、auth 静默失效（#39162）
- **Copilot CLI**：#4535 store_memory 报错、#4534 autoUpdate 被忽略
- **共同诉求**：显式错误 + 日志痕迹 + 状态可见，拒绝"无提示但功能失效"

### 3.4 MCP 生态互操作与安全
- **Copilot CLI**：OAuth token 未桥接（#4096）、issuer 校验失败（#4439）、handshake 卡死（#4206）
- **Gemini CLI**：MCP 损坏配置 fail-open 修复（#28794/#28787）
- **OpenCode**：MCP 工具名超 64 字符截断（#43684）
- **共同诉求**：OAuth 链路完整桥接、损坏配置 fail-closed、工具 schema 兼容

### 3.5 权限模型与安全沙箱
- **Copilot CLI**：ACP 模式权限绕过回归（#4537）、非交互模式绕过 disableBypassPermissionsMode（#4528）
- **Codex**：凭据不落盘（#39719）、Seatbelt 路径加固（#39706）、fail-closed 解析（#39700）
- **Gemini CLI**：移除不安全 diff.external 覆盖（#28930，沙箱逃逸风险）
- **Qwen Code**：PAT 作业隔离（#9089）、git 身份 TOCTOU 绕过（#9572）
- **共同诉求**：安全边界默认收紧、权限策略可配置、拒绝行为可被模型妥善处理

### 3.6 子代理/多智能体可靠性
- **Gemini CLI**：#21409 通用代理无限挂起、#22323 子代理假成功
- **Codex**：#20077 spawn_agent full-history fork 拒绝覆盖、#33700 子代理残留
- **OpenCode**：#41991 子代理权限请求挂起（PR #43675 修复中）
- **Qwen Code**：#9507 Agent Team 输出不可滚动
- **共同诉求**：子代理生命周期干净、中断原因真实上报、权限自动审批链路完整

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线 | 目标用户 | 差异化特征 |
|---|---|---|---|---|
| **Claude Code** | 商用编码 Agent 标杆 | TypeScript + 自有模型生态（Opus/Sonnet），桌面应用 + CLI | 企业开发者、重度长会话用户 | 模型行为精细（Concise 风格）、hook 安全机制、记忆持久化讨论深入 |
| **OpenAI Codex** | OpenAI 生态原生 Agent | Rust 重写，V8 嵌入式 workflow 引擎，seatbelt 沙箱 | 追求前沿功能（Computer Use、MultiAgentV2）的开发者 | 迭代速度极快（同日 3 个 alpha）、安全加固 PR 密集、多智能体架构最激进 |
| **Gemini CLI** | 多模态 Agent 编排 | TypeScript，深度绑定 Gemini 3.x 模型，Orchestrator 状态机 | Google 生态用户、自动化工作流使用者 | 子代理体系完善（bugreport 轨迹分享）、MCP 配置安全实践领先 |
| **Copilot CLI** | GitHub 企业级编码助手 | Node.js + ACP 协议，深度集成 GitHub/MCP 注册表 | 企业组织用户、VS Code 生态 | 企业策略（enforced-sandbox）与 MCP 远程序列化支持是双刃剑；权限体系最复杂 |
| **OpenCode** | 开源多 Provider Agent | TypeScript（TUI + Go 服务），原生/OpenAI/Anthropic/Bedrock 透传 | 自托管、多模型切换用户 | Provider 兼容性最广（Cloudflare AI Gateway）、插件可编程性（HTTP route 注册） |
| **Pi** | 极简开源 TUI | Rust，本地优先，轻量化 | Linux/终端重度用户、自建部署 | 架构重构期（主题系统/命令规范）、Windows 适配为当前主线 |
| **Qwen Code** | 阿里云生态 + Web Shell | TypeScript，Web Shell 远程开发，Agent Team | 阿里云用户、远程开发场景 | CI/CD 供应链安全最激进（CVE 零基线 + 安装脚本禁用）、跨会话通信已进实现 |
| **CodeWhale** | 中文开发者友好 TUI | Rust，LSP 深度集成，本地 vLLM 部署 | 中文用户、本地模型部署者 | 中文本地化领先（i18n 字典化、IME 修复）、独立 read_lints 按需诊断 |
| **Kimi Code / Grok Build** | 静默观望 | — | — | 当日无可见社区动态，需关注后续产品动作 |

**关键差异维度：**
- **安全哲学**：Codex/Qwen 走"fail-closed 默认收紧"，Copilot 走"企业策略强制"，Claude 走"hook 可编程护栏"
- **模型绑定度**：Claude Code、Gemini CLI 深度绑定自家模型；OpenCode、Pi、CodeWhale 为模型中立
- **平台策略**：Codex/Claude 发力桌面应用，Pi/CodeWhale 深耕终端 TUI，Qwen 押注 Web Shell

---

## 5. 社区热度与成熟度

### 第一梯队：高热度 + 高迭代（Gemini CLI、OpenCode、Qwen Code）
- **Gemini CLI**：讨论聚焦 P1 级可靠性 Bug（挂起/假成功），PR 覆盖新模型、安全、语音模式，社区对 Agent 架构方向有深度探讨（#19873 OS 沙箱 + bash 亲和）
- **OpenCode**：Issue 关闭率高，PR 响应快（当日提交当日修复），社区已将其作为可编程开发平台使用（服务端插件、Desktop Pets）
- **Qwen Code**：呈"autofix 驱动"模式，大量 `[autofix/takeover]` PR，但社区开始质疑该模式自身权限边界（#9556），属于"快速但需收敛"状态

### 第二梯队：成熟稳定 + 生态积累（Claude Code、Copilot CLI、Codex）
- **Claude Code**：版本节奏稳（2 个/日），但 PR 活动为 0、高赞 Issue 积压（#77136 297 👍 未解决），呈现"发布快、修 bug 慢"的成熟期特征
- **Copilot CLI**：prerelease 高频（连续 5 个补丁）但引入回归（#4533/#4535/#4537 均指向 1.0.81），建议用户停留 stable，说明发布质量管控需加强
- **Codex**：3 个 alpha/日但 Release Notes 为空占位，透明度不足；安全 PR 质量高，体现工程实力

### 第三梯队：转型重构期（Pi、CodeWhale）
- **Pi**：无新版本但 10 个 PR 持续推进（TUI 主题重构、模型兼容修复），社区对 Windows 支持呼声最高
- **CodeWhale**：v0.9.10 完成品牌迁移但带来 shell 补丁未同步等过渡混乱；升级回归频发（max_tokens、状态指示器）

### 静默观察：Kimi Code、Grok Build
- 过去 24 小时无任何社区动态，不代表项目停滞，但公开透明度较弱

---

## 6. 值得关注的趋势信号

### 信号一：静默失败已成为 AI CLI 工具最致命的信任杀手
从 Claude Code 的 `send_message` 197 次假成功、Gemini 的 MAX_TURNS 误报、到 Copilot 的 autoUpdate 静默失效，**"返回成功但实际未执行"** 正取代显式报错成为社区第一痛点。对开发者的启示：优先为自动化工作流建立**外部可观测性**（日志、状态轮询、幂等校验），不要盲信工具返回码。

### 信号二：Windows 是尚未被征服的最大战场
7 个活跃工具中 6 个有 Windows 专属高热度 Issue（GPU 崩溃、路径 `\\?\` 前缀、sandbox 阻止 git、IME 输入），而各家修复节奏普遍滞后。对开发者的启示：Windows 环境（尤其企业 Windows + 远程开发）采用新 CLI 前先评估稳定性风险；对工具厂商而言，Windows 首跑体验是尚未被占领的差异化高地。

### 信号三：安全策略从"附加功能"走向"默认 fail-closed"
Codex 的凭据不落盘与 Seatbelt 加固、Qwen 的 CVE 零基线 + 安装脚本禁用、Gemini 的 MCP 损坏配置防 fail-open、Copilot 的权限绕过回归，共同指向**默认安全边界收紧**。同时 Claude Code #78527 显示安全 hook 拒绝行为本身可能产生新回归。对开发者的启示：安全护栏需要"护栏的护栏"——拒绝行为必须可见、可审计、可被模型正确处理。

### 信号四：MCP 互操作性是当前生态的最大短板与最大机会
Copilot CLI 的 OAuth 桥接失败、Gemini 的 fail-open 风险、OpenCode 的 64 字符 schema 限制，说明 MCP 从"能连上"到"可靠用于生产"仍有距离。具备完整 MCP 认证/权限/内容传递链路的工具将获得显著先发优势。

### 信号五：社区"自建轮子"倾向加剧工具碎片化
Claude Code 用户 59 次压缩后自建记忆系统、Qwen Code 用户推动跨会话通信实现、Pi 用户将 Pi 嵌入多会话宿主——当核心能力长期缺位，头部用户会自发补齐，这既是社区活力的证明，也是工具厂商的流失风险信号。

### 信号六：模型行为可控性需求超越"哪个模型更强"
Claude Code #77136 对模型语气的 297 👍、Gemini 对 preview 模型静默回退的警告需求、CodeWhale 对推理字段格式的兼容修复，表明社区已从追逐 benchmark 转向要求**细腻的模型行为控制**（语气、工具调用自由度、推理可见性、模型间能力对齐）。

---

**结论建议：** 对于技术决策者，当前 AI CLI 选型的关键排序应为：① 稳定性（静默失败率）＞ ② 安全合规（沙箱与权限模型）＞ ③ 生态集成（MCP/IDE/企业策略）＞ ④ 模型能力。处于快速迭代期的工具（Codex、Gemini CLI、Qwen Code）功能领先但回归风险高，建议**锁定 stable 版本并建立回归验证清单**；成熟期工具（Claude Code、Copilot CLI）功能稳定但痛点修复慢，需关注社区 workaround 生态。多工具并行（如 Claude Code + OpenCode 组合）正成为降低单点风险的实际选择。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据截止：2026-08-21 ｜ 来源：github.com/anthropics/skills  
> 说明：PR 原始排序按评论数给出，但具体评论数字段未显示；以下条目均按该排序选取，当前状态均为 **Open**。

## 1. 热门 Skills 排行

1. **skill-creator 评估管线修复** — [PR #1298](https://github.com/anthropics/skills/pull/1298)  
   **功能**：修复 `run_eval.py` 对所有 skill 描述都报告 `recall=0%` 的严重问题；将 eval artifact 安装为真实 skill，并修复 Windows 流读取、触发检测、并行 worker 等兼容性。  
   **社区热点**：对应已有多人复现的 [Issue #556](https://github.com/anthropics/skills/issues/556)，讨论聚焦在“优化循环正在对着噪声优化”这一可信度危机。  
   **状态**：Open

2. **文档排版质量 skill** — [PR #514](https://github.com/anthropics/skills/pull/514)  
   **功能**：新增 `document-typography` skill，用于防止 AI 生成文档中的孤字换行、孤立段落标题、编号错位等排版问题。  
   **社区热点**：用户普遍认可 AI 生成文档存在系统性排版缺陷，希望将 typographic quality control 沉淀为可复用 skill。  
   **状态**：Open

3. **PDF skill 大小写引用修复** — [PR #538](https://github.com/anthropics/skills/pull/538)  
   **功能**：修复 `skills/pdf/SKILL.md` 中 8 处大小写不一致的引用（`REFERENCE.md` → `reference.md` 等），避免在大小写敏感文件系统上失效。  
   **社区热点**：讨论焦点是跨平台可用性，尤其是 Linux/CI 环境下 skill 资产引用必须严格匹配。  
   **状态**：Open

4. **ODT 文档 skill** — [PR #486](https://github.com/anthropics/skills/pull/486)  
   **功能**：新增 `odt` skill，支持创建、填充、读取 OpenDocument 文件（.odt/.ods），并可解析 ODT 为 HTML。  
   **社区热点**：围绕 LibreOffice / 开源办公格式互操作，以及企业文档场景中对 ODF 的支持需求。  
   **状态**：Open

5. **frontend-design skill 可执行性改进** — [PR #210](https://github.com/anthropics/skills/pull/210)  
   **功能**：重写 `frontend-design` skill，让每条指令更具体、可操作、内部自洽，避免“人类读得懂但 Claude 无法执行”的描述。  
   **社区热点**：讨论如何让 skill 从“文档式说明”转向“可执行规范”。  
   **状态**：Open

6. **skill 质量与安全分析器** — [PR #83](https://github.com/anthropics/skills/pull/83)  
   **功能**：新增两个 meta skills：`skill-quality-analyzer` 和 `skill-security-analyzer`，分别从结构、文档、示例、安全等维度评估 skill。  
   **社区热点**：与社区对 skill 安全、命名空间信任的担忧直接相关，讨论如何为第三方 skill 建立质量门槛。  
   **状态**：Open

7. **DOCX 修订 ID 冲突修复** — [PR #541](https://github.com/anthropics/skills/pull/541)  
   **功能**：修复 DOCX skill 添加修订时 `w:id` 与已有书签冲突，导致文档损坏的问题。  
   **社区热点**：讨论集中在 OOXML 中 `w:id` 为全局共享 ID 空间的隐蔽性，以及文档损坏的严重性。  
   **状态**：Open

8. **skill-creator YAML 描述校验** — [PR #539](https://github.com/anthropics/skills/pull/539)  
   **功能**：在 `quick_validate.py` 中增加预解析检查，检测未加引号且包含冒号的 `description` 字段，避免 YAML 静默解析失败。  
   **社区热点**：skill 作者常踩的 frontmatter 坑，讨论期望在创建阶段就拦截错误。  
   **状态**：Open

---

## 2. 社区需求趋势

从 Issues 看，社区最期待的新 Skill 方向和能力集中在以下几类：

- **Skill 工程质量与评估工具**  
  [Issue #556](https://github.com/anthropics/skills/issues/556) 反映 `run_eval.py` 对任何查询都报 0% 触发率，[Issue #202](https://github.com/anthropics/skills/issues/202) 批评 skill-creator 更像人类文档而非可执行指令，[Issue #1362](https://github.com/anthropics/skills/issues/1362) 指出 web-artifacts-builder 在现代工具链上无法构建。说明社区强烈需要**更可靠的 skill 评估、校验和脚手架工具**。

- **安全与信任边界**  
  [Issue #492](https://github.com/anthropics/skills/issues/492) 指出社区 skill 在 `anthropic/` 命名空间下分发可能造成信任边界滥用；[Issue #1175](https://github.com/anthropics/skills/issues/1175) 关注 SharePoint Online 文档处理时的权限与上下文安全。社区希望官方明确**官方 skill 与社区 skill 的信任边界**，并提供安全审查机制。

- **企业级共享与治理**  
  [Issue #228](https://github.com/anthropics/skills/issues/228) 建议支持组织内直接共享 skill，而非手动下载上传；[Issue #189](https://github.com/anthropics/skills/issues/189) 报告 `document-skills` 与 `example-skills` 插件重复安装相同内容。说明企业用户需要**集中式分发、去重和版本管理**能力。

- **上下文与 Token 效率**  
  [Issue #1487](https://github.com/anthropics/skills/issues/1487) 显示 `claude-api` skill 一次注入约 156k token，直接耗尽上下文窗口；[Issue #12](https://github.com/anthropics/skills/issues/12) 报告 docx skill 因空白符重排导致文档损坏。社区正高度关注**skill 的体量控制和副作用最小化**。

- **跨平台与生态集成**  
  [Issue #29](https://github.com/anthropics/skills/issues/29) 询问 Bedrock 兼容性，[Issue #16](https://github.com/anthropics/skills/issues/16) 提议将 Skills 暴露为 MCP 接口。用户希望 skill 能接入更多运行环境和工具协议。

- **Agent 记忆与推理治理**  
  [Issue #1329](https://github.com/anthropics/skills/issues/1329) 提出 `compact-memory`，用符号化表示压缩长期 agent 状态；[Issue #1385](https://github.com/anthropics/skills/issues/1385) 提出推理质量门禁流水线。说明社区开始探索**面向 agent 自身的元能力 skill**。

---

## 3. 高潜力待合并 Skills

以下 PR 当前均为 Open，但讨论活跃、问题明确且具有较高落地价值：

- **[PR #1298](https://github.com/anthropics/skills/pull/1298) — skill-creator eval 修复**  
  它是 [Issue #556](https://github.com/anthropics/skills/issues/556) 的直接修复，且该问题已经影响所有使用 `run_eval.py` 的用户，合并优先级应当最高。

- **[PR #1367](https://github.com/anthropics/skills/pull/1367) — self-audit skill（v1.3.0）**  
  提供“机械文件校验 + 四维推理质量审计”，通用性较强，且对应 [Issue #1385](https://github.com/anthropics/skills/issues/1385) 的提案，属于新兴的 agent 输出质量治理方向。

- **[PR #568](https://github.com/anthropics/skills/pull/568) — ServiceNow 平台 skill**  
  覆盖 ITSM、ITOM、SecOps、ITAM/SAM、FSM、SPM、CSDM、IntegrationHub 等企业级场景，已知最后更新于 2026-08-12，仍保持活跃。

- **[PR #525](https://github.com/anthropics/skills/pull/525) — Pyxel 复古游戏开发 skill**  
  由 pyxel-mcp 原作者提交，面向 Python 复古/像素风游戏开发，社区属性强，且持续更新至 2026-07-15。

- **[PR #514](https://github.com/anthropics/skills/pull/514) — 文档排版质量 skill**  
  针对 AI 生成文档的普遍痛点，使用面广，若完成评审很可能成为官方文档类 skill 的补充。

- **[PR #83](https://github.com/anthropics/skills/pull/83) — skill 质量与安全分析器**  
  直接回应社区对 skill 质量和安全的担忧，如果被接受，将有助于建立第三方 skill 的审查机制。

---

## 4. Skills 生态洞察

**一句话总结：当前社区对 Skills 最集中的诉求，是把它们从“能跑的示例”推向“可信、可复用、可治理的基础设施”——尤其是评估工具链可靠性、官方命名空间安全、企业级共享能力和上下文体量控制。**

---

# Claude Code 社区动态日报

**日期：2026-08-21**  
**数据来源：** [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 今日速览

昨日连发 v2.1.236、v2.1.237 两个版本，新增默认模型环境变量、简洁输出风格，并修复了 LLM 网关下的 prompt caching 问题。社区侧，Windows 桌面端 GPU 崩溃问题持续发酵（多条高热度 Issue），同时跨会话消息投递的回归问题引发开发者广泛关注。

---

## 版本发布

### v2.1.237
**链接：** [anthropics/claude-code Releases](https://github.com/anthropics/claude-code/releases)

**更新要点：**
- 修复了使用 LLM 网关或自定义 base URL 时 prompt caching 失效的问题
- 新增内置 **“Concise” 输出风格**：Claude 直接给出结果，跳过开场白和叙述性内容，但工作完成度不变。可在 `/config` 中通过 Output style 选择

### v2.1.236
**链接：** [anthropics/claude-code Releases](https://github.com/anthropics/claude-code/releases)

**更新要点：**
- 新增 `ANTHROPIC_DEFAULT_MODEL` 环境变量：设置新会话默认模型；`/model` 选择仍可覆盖它，且跨重启持久生效（与 `ANTHROPIC_MODEL` 不同）
- 跨会话 `SendMessage` 工具新增 `notify_when_idle` 参数：可让另一 Claude Code 会话空闲时通知

---

## 社区热点 Issues

> 以下按讨论热度与影响面筛选出 10 条最值得关注的 Issue。

### 1. [#34556 上下文压缩后无持久内存（98 评论）](https://github.com/anthropics/claude-code/issues/34556) 🔒 已关闭
**标签：** enhancement / memory  
**核心问题：** 上下文窗口填满后压缩，实例会丢失所有未外部保存的信息。作者经历 26 天、59 次压缩后，自建了一套完整的内存持久化系统。该 Issue 引发社区对**长期记忆机制**的强烈诉求，虽已关闭，但讨论热度不减。

### 2. [#77136 Opus 4.8 语气问题 & Opus 5.0 不连贯（297 👍 / 43 评论）](https://github.com/anthropics/claude-code/issues/77136)
**标签：** bug / area:model  
**核心问题：** 开发者反馈 Opus 4.8 的措辞选择“有毒、令人不悦”，而 Opus 5.0 则导致输出“极其不连贯”。这是当前**获得点赞最多的 Issue**，说明大量用户对模型行为在意。

### 3. [#81698 Windows 桌面端 GPU 崩溃杀死所有会话（50 评论）](https://github.com/anthropics/claude-code/issues/81698)
**标签：** area:desktop  
**核心问题：** Windows 桌面应用（1.24012.9）GPU 进程崩溃（退出码 101457950）导致整个应用及所有运行中的会话终止。环境为 RTX 5080、驱动 610.47、Win11。影响**桌面端所有会话**且无恢复机制。

### 4. [#80444 Windows 桌面端致命 GPU 崩溃（47 评论）](https://github.com/anthropics/claude-code/issues/80444)
**标签：** area:desktop  
**核心问题：** 桌面应用 1.24012.1 版本通过内置浏览器打开 tab 会触发致命 GPU 崩溃（0x060C201E），且崩溃后 **MSIX 包变得无法启动**（appxState=2），必须执行 Repair 才能恢复。已在两个驱动版本上复现。

### 5. [#48237 Code 标签页缺少字号调整（117 👍 / 36 评论）](https://github.com/anthropics/claude-code/issues/48237)
**标签：** enhancement / area:desktop  
**核心问题：** Claude Desktop 的 Code 标签页无法调整字体大小，影响代码浏览体验。点赞数仅次于模型行为 Issue，属于**桌面端 UI 高频需求**。

### 6. [#86298 Windows 跨会话消息被静默丢弃（20 评论）](https://github.com/anthropics/claude-code/issues/86298)
**标签：** bug / has repro / regression  
**核心问题：** 自桌面应用 1.28929.0 起，跨会话消息被挂起等待一个 UI 从未提供的审批，约 5 分钟后静默过期消失。**无任何提示、无日志**，属于典型静默故障。

### 7. [#14280 VS Code 扩展：bash 输出实时流式显示（81 👍 / 25 评论）](https://github.com/anthropics/claude-code/issues/14280)
**标签：** enhancement / area:tools / area:ide  
**核心问题：** 当 Claude 执行 bash 命令时，VS Code 扩展无法实时看到输出结果，只能在命令结束后一次性展示。社区希望获得**类似终端但实时刷新的体验**，这是 IDE 集成中呼声很高的改进。

### 8. [#88125 send_message 静默停止投递——197 次发送全部失败（3 评论）](https://github.com/anthropics/claude-code/issues/88125)
**标签：** bug / regression  
**核心问题：** 自 CLI 2.1.227 起，`send_message` 工具出现**静默失败**：197 次连续发送均返回“成功”但从未送达，无错误、无重试、无日志痕迹。导致接收端会话完全“卡住”。属于影响面大但刚报告不久的新回归。

### 9. [#81658 跨平台同步失败，对话消失（13 评论）](https://github.com/anthropics/claude-code/issues/81658)
**标签：** bug  
**核心问题：** Desktop/Web/Android 三端的 Cowork 对话和聊天内容无法同步并消失，用户怀疑为服务端事故。跨端数据一致性风险，移动端用户影响显著。

### 10. [#78527 PreToolUse hook 拒绝被变成本轮终止（6 评论）](https://github.com/anthropics/claude-code/issues/78527)
**标签：** bug / regression / reproduced  
**核心问题：** v2.1.210 回归：`PreToolUse` hook 返回 `{ok:false}` 拒绝命令时，正确行为应该把工具错误返回给模型继续，而当前实现直接**终止整个 turn**。这是**安全关键回归**——安全 hook 的拒绝不再能被模型妥善处理。

---

## 重要 PR 进展

**无。** 过去 24 小时内 GitHub 上没有来自 anthropics/claude-code 仓库的 Pull Request 更新。

---

## 功能需求趋势

**1. 会话记忆持久化**
除 #34556（98 评论外），#82056（auto-memory 加载状态不透明）也讨论热烈。社区核心痛点是：压缩后记忆丢失、内存加载状态不可见。Claude Code 需要**更可靠的长期记忆机制**，并暴露内存加载状态的可见性。

**2. 桌面端稳定性与崩溃恢复**
#81698、#80444 表明 Windows GPU 进程崩溃正在成为桌面端主要稳定性问题。用户期望崩溃不要连带杀掉所有会话，且应用应具备可恢复能力。

**3. 跨会话通信可靠性**
#86298、#88125 揭示了跨会话消息从 UI 到 API 层面的静默丢失问题。这类 Bug 返回“成功”但实际未投递，比显式失败更难以排查。

**4. 模型行为可控性**
#77136（模型语气与连贯性）、#85438（Fable 无法用于编码）、#88304（Fable 对 `jq` 命令拒绝触发保护开关）显示社区对**模型行为细腻控制**的需求，包括语言风格、工具调用自由度、安全护栏的误报问题。

**5. UI/UX 改进持续升温**
#48237（字号调整）、#14280（bash 实时输出）、#62493/#88278（弹窗遮挡响应内容）反映桌面端和 IDE 插件的交互细节仍有较大改进空间。

---

## 开发者关注点

- **静默失败最有毒：** 多个高热度 Issue（#86298、#88125、#78202 daemon 认证状态卡死）均表现为“无错误提示但功能失效”。开发者需要更透明的状态反馈和诊断信息。
- **Windows 依然是重灾区：** 崩溃、GPU、剪切板（#87205）、statusLine 引号问题（#88256）等均为 Windows 专属，Windows 上首跑体验亟待改进。
- **安全 hook 的回归不容小觑：** #78527 表明安全护栏的拒绝行为回归，可能导致自动化流程中断或安全防线失效。这类问题应获最高修复优先级。
- **Fable 模型受到质疑：** #85438、#88304、#88303 连续反馈 Fable 在编码场景的不可用性、误报安全护栏问题，社区对 Fable 在编码场景下的能力打出问号。
- **开发者开始自建轮子：** #34556 作者 59 次压缩后自建记忆系统、#88197 请求类 Codex 的 daemon 后台进程管理，说明部分核心能力若长期缺位，社区会自发补齐——这反过来会增加工具碎片化风险。

---

*日报信息基于 2026-08-21 上午的 GitHub 数据自动汇总，仅供社区参考。Issue/PR 链接均指向官方仓库。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-21

## 今日速览

- 今日连续发布 3 个 `rust-v0.149.0-alpha` 版本（alpha.2 → alpha.4），迭代节奏密集，但 Release 说明仅为占位符，未附详细变更日志。
- 社区讨论最集中的是稳定性与回归问题：macOS 上 Computer Use worker 引发 V8 OOM（#38455，31 条评论）、Windows 会话归档失败（#39239/#39705）、以及 macOS 打开会话即触发认证失效（#39162）。
- 安全加固类 PR 密集合入，包括停止持久化 checkout 凭据（#39719）、加固 Seatbelt 可写根路径绑定（#39706）、以及配置/分词解析 fail-closed（#39700）。

## 版本发布

| 版本 | 说明 | 链接 |
|---|---|---|
| rust-v0.149.0-alpha.2 | Release 0.149.0-alpha.2 | [Release](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.2) |
| rust-v0.149.0-alpha.3 | Release 0.149.0-alpha.3 | [Release](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.3) |
| rust-v0.149.0-alpha.4 | Release 0.149.0-alpha.4 | [Release](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.4) |

> 三个 alpha 版本集中在 24 小时内连续发布，但 Release Notes 均为空占位，建议关注后续补充说明或直接查看源码 diff。

## 社区热点 Issues（10 个）

1. **macOS Desktop 反复生成 Computer Use worker 并以 V8 OOM 崩溃**
   - [Issue #38455](https://github.com/openai/codex/issues/38455)
   - 31 条评论 / 13 👍。App 启动后约 98 秒即崩溃，崩溃时 316 个线程中有 187 个名为 computer-use。上一版本正常工作，属于明显回归，且触发时处于空闲状态，影响面大。

2. **Windows 下 `thread/archive` 失败：`os error 2`**
   - [Issue #39239](https://github.com/openai/codex/issues/39239)
   - 26 条评论 / 3 👍。`thread/resume` 后存档失败，根因指向路径相等性检查未处理 `\\?\` 前缀（verbatim path）。与今日 #39705 高度相关，属于 Windows 路径处理系统性问题。

3. **macOS 打开已有会话使 ChatGPT 认证失效并跳转登录**
   - [Issue #39162](https://github.com/openai/codex/issues/39162)
   - 24 条评论 / 18 👍。26.814.41407 版本中，打开一个历史会话即导致认证失效，使用体验受损严重，是今日高赞问题之一。

4. **定时任务无授权自动禁用**
   - [Issue #38350](https://github.com/openai/codex/issues/38350)
   - 23 条评论 / 0 👍。ChatGPT Work 中多个 recurring 任务在成功执行后自动变为 paused。自动化系统行为不可预期，影响对定时任务的信任。

5. **Windows sandbox helper 缺失：CLI 0.138.0 回归**
   - [Issue #27125](https://github.com/openai/codex/issues/27125)
   - 15 条评论 / 2 👍。0.132.0 可用、0.138.0 报 sandbox helper 找不到。虽然已提交 2 个月仍未关闭，Windows 沙箱稳定性持续受到关注。

6. **MultiAgentV2 `spawn_agent` 默认 full-history fork，拒绝参数覆盖**
   - [Issue #20077](https://github.com/openai/codex/issues/20077)
   - 10 条评论 / 9 👍。`fork_turns` 省略时走完整历史 fork，导致 `agent_type`、`model`、`reasoning_effort` 覆盖被拒绝。多智能体子代理的灵活性不足，属 API 设计层面问题。

7. **macOS 子代理残留并恢复陈旧 MCP 栈**
   - [Issue #33700](https://github.com/openai/codex/issues/33700)
   - 9 条评论 / 3 👍。已完成子代理仍保留在 `thread_spawn_edges` 中，重新挂载时恢复过期 MCP stacks，导致资源浪费和状态错乱。

8. **GPT-5.6 Sol 仍使用 272K 上下文窗口，Terra/Luna 已升级 872K**
   - [Issue #39144](https://github.com/openai/codex/issues/39144)
   - 8 条评论 / 3 👍。长上下文 rollout 后模型间能力不一致，Sol 未获得升级，影响使用长上下文的任务。

9. **ChatGPT Pro 20x 账户实际使用 Pro 5x Codex 配额**
   - [Issue #38157](https://github.com/openai/codex/issues/38157)
   - 5 条评论 / 5 👍。订阅显示 Pro 20x、API 也报 `plan_type: "pro"`，但实际 Codex 用量上限被限制在 5x 档位。配额判定逻辑存在问题，用户付费权益受损。

10. **macOS `CODEX_HOME` 为符号链接时触发无界 worker 泄漏与 V8 OOM**
    - [Issue #39732](https://github.com/openai/codex/issues/39732)
    - 2 条评论 / 1 👍。今日新提交，约 90 秒内崩溃，与 #38455 同为 computer-use worker 泄漏，但根因新增 symlink 路径隔离因素，值得关注后续修复方向。

## 重要 PR 进展（10 个）

1. **停止在 V8 workflows 中持久化 checkout 凭据**
   - [PR #39719](https://github.com/openai/codex/pull/39719)
   - 安全加固。为 V8 canary 与 `rusty_v8` checkout 设置 `persist-credentials: false`，避免 CI 泄露凭据。

2. **加固 Seatbelt 可写根路径绑定**
   - [PR #39706](https://github.com/openai/codex/pull/39706)
   - macOS 沙箱安全修复。防止攻击者可变的路径组件将 writable root 重绑定到其它位置，同时限制文件根只作用于文件自身。

3. **不安全的配置与 sed 解析 fail-closed**
   - [PR #39700](https://github.com/openai/codex/pull/39700)
   - 安全修复。不受支持的审批策略即使 app-server 允许 fallback 也必须是启动错误；复合命令摘要不得丢弃可编辑文件的 `sed` 阶段。

4. **按模型使用 auto-review 结果指令**
   - [PR #39741](https://github.com/openai/codex/pull/39741)
   - 行为改进。为工具审批、shell 升级、MCP elicitation 增加 `rejection_instructions` 与 `timeout_instructions`，使自动审查结果更符合当前模型的指引。

5. **Guardian 运行时设置支持从模型默认值继承**
   - [PR #39738](https://github.com/openai/codex/pull/39738)
   - 配置增强。新增 `max_tool_call_lag`、`reuse_parent_compaction`、`include_images`，并支持模型默认值继承，保留本地显式覆盖。

6. **为已配置的 TUI 会话避免 rollout 读取**
   - [PR #39731](https://github.com/openai/codex/pull/39731)
   - 性能修复。`ThreadStarted` 发生时 rollout 可能尚未落盘，旧逻辑会等待读取重试；现在优先使用生命周期响应中的认证状态。

7. **Box 化 WebSocket dial future**
   - [PR #39726](https://github.com/openai/codex/pull/39726)
   - 代码结构优化。在 `WebSocketConnector::connect` 中 box 具体的 future 类型，减少编译体积并隐藏实现细节。

8. **多智能体 v2 spawn 调用分析埋点**
   - [PR #39722](https://github.com/openai/codex/pull/39722)
   - 可观测性。为 `spawn_agent` 增加 started/completed 事件，记录执行时长与子代理配置，失败调用同样埋点但不含提示词内容。

9. **移除私有 executor 目录创建协议**
   - [PR #39736](https://github.com/openai/codex/pull/39736)
   - 架构简化。远程插件 metrics 目录改由标准 executor 文件系统 API 创建，删除私有目录协议选项与平台相关处理。

10. **减少 unified exec 输出缓冲分配**
    - [PR #39712](https://github.com/openai/codex/pull/39712)
    - 性能优化。追加输出块改用借用切片，合并 drained head-tail 缓冲时复用已有存储，降低流式消费的分配开销。

## 功能需求趋势

- **Windows 平台支持与稳定性**：今日 Issue 中约 1/3 与 Windows 相关，涉及 archive 失败、更新循环、sandbox helper 回归、Chrome 插件 nodePath bug。Windows 已成 Codex 生态中问题最集中、需求最迫切的平台。
- **多智能体（MultiAgentV2）可配置性**：社区持续要求 `spawn_agent` 能灵活覆盖 agent_type、model、reasoning_effort，并期望子代理生命周期更干净、不残留 MCP 栈。
- **长上下文模型一致性**：GPT-5.6 Sol 未获得与 Terra/Luna 相同的 872K 上下文，用户希望同一发布批次内模型能力对齐。
- **认证与会话管理**：login loop、打开会话导致 auth 失效、token 刷新异常等高频出现，认证链路稳定性成为重点诉求。
- **自动化任务可靠性**：定时任务无授权自禁用、配额判定不透明（Pro 20x 变 5x）等问题，影响用户对自动化功能的信任。
- **安全与加固**：凭据不落盘、沙箱路径绑定、fail-closed 解析等 PR 集中出现，表明团队正主动加固安全边界。

## 开发者关注点

- **稳定性痛点**：V8 OOM（#38455/#39732）、Linux SIGSEGV（#39724）、worker 无限泄漏、MCP 进程 kill/respawn 风暴（#37402）导致 CPU/Defender 尖峰和系统级输入卡顿。
- **更新与安装流程**：Windows MSIX 更新下载成功但永不部署（#38843）、更新后 App 不重启（#24047）、Chrome 插件更新后残留锁文件（#32706）。
- **会话归档可靠性**：Windows 下 archive 持续失败，`\\?\` 路径别名导致同一文件被调度两次（#39705），用户担心会话数据丢失。
- **认证与配额透明度**：macOS 登录循环（#39718）、已有会话强制登出（#39162）、订阅容量与档位不符（#38157），直接影响付费用户权益。
- **安全策略误报**：#7250 老问题仍被反复提及，合法 prompt 被 usage policy 误判，制约正常开发流。
- **编辑器细节体验**：Ctrl+Shift+V 粘贴内容出现两次（#26199）、Quick Chat 点击新窗口无响应（#35917）、TUI 在 Zellij 中冻结（#36338）等细节问题虽小但影响日常效率和观感。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-21

## 今日速览

- 昨日发布 **v0.57.0-preview.0** 与 **v0.56.0** 稳定版，重点修复 Cloud Workstations OAuth 重定向及 IDE 连接目录不匹配问题。  
- 社区讨论热度集中在 Agent 稳定性与可观测性：子代理 `MAX_TURNS` 误报成功、通用代理挂起、Shell 命令卡死等高频问题仍在发酵。  
- PR 方面亮点颇多：Gemini 3.7 Flash 模型支持、MCP 损坏配置安全加固、Whisper 语音模式原子下载与缓冲修复等。

## 版本发布

### v0.57.0-preview.0（预览版）
- [Release 页面](https://github.com/google-gemini/gemini-cli/releases)  
- 修复 Cloud Workstations 场景下 OAuth 流程的代理重定向 URI 动态解析问题。  
- 修复 IDE 连接中目录不匹配被“静默吞噬”的问题。

### v0.56.0（稳定版）
- [Release 页面](https://github.com/google-gemini/gemini-cli/releases)  
- 自 v0.55.1 以来的常规累积更新，具体变更见 [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.55.1...v0.56.0)。

### v0.56.0-nightly.20260820.ge90c63fa1（Nightly）
- [Release 页面](https://github.com/google-gemini/gemini-cli/releases)  
- 核心修复：当文本回合与工具或媒体共存时，不再丢失空文本回合（由 [DavidAPierce](https://github.com/DavidAPierce) 提交）。

## 社区热点 Issues（10 个）

1. **[#4191 Public Roadmap — 公共路线图跟踪](https://github.com/google-gemini/gemini-cli/issues/4191)**
   99 👍 / 18 条评论 · 社区长期置顶的路线图入口，标记为 maintainer only，是了解官方方向的窗口。

2. **[#27393 命令替换块应可配置，而非硬编码墙](https://github.com/google-gemini/gemini-cli/issues/27393)**
   19 条评论 · 用户希望新增 `allowCommandSubstitution` 开关（默认 `false`），并建议 YOLO 模式下默认启用或至少给出警告。这是近期社区讨论最活跃的 issue。

3. **[#22323 Subagent 在 MAX_TURNS 后恢复被误报为 GOAL 成功](https://github.com/google-gemini/gemini-cli/issues/22323)**
   12 条评论 · P1 严重级 Bug：`codebase_investigator` 明明因达到最大轮数而中断，却对外报告“成功”。这类“假成功”会误导上层编排逻辑，社区高度关注。

4. **[#21409 通用代理（Generalist agent）挂起](https://github.com/google-gemini/gemini-cli/issues/21409)**
   8 👍 / 8 条评论 · P1 严重级 Bug：一旦 defer 给通用代理就无限挂起，连“创建文件夹”这样的简单操作也长时间无响应，用户被迫等待一小时后手动取消。

5. **[#25166 Shell 命令执行完成却卡在 “Awaiting user input”](https://github.com/google-gemini/gemini-cli/issues/25166)**
   3 👍 / 4 条评论 · P1 严重级：极简 CLI 命令执行完成后仍显示等待输入，影响自动化与交互式工作流。

6. **[#21983 Browser subagent 在 Wayland 下失败](https://github.com/google-gemini/gemini-cli/issues/21983)**
   1 👍 / 4 条评论 · P1 严重级：浏览器子代理在 Wayland 环境无法工作，限制 Linux 用户使用浏览器自动化能力。

7. **[#22186 get-shit-done 输出钩子在汇总打印阶段崩溃](https://github.com/google-gemini/gemini-cli/issues/22186)**
   3 条评论 · P1 严重级：输出钩子接近完成时触发崩溃，导致整个 Gemini CLI 进程退出。

8. **[#21968 Gemini 几乎不会主动使用 skills 和 sub-agents](https://github.com/google-gemini/gemini-cli/issues/21968)**
   6 条评论 · 用户反馈即使已有 gradle/git 等技能描述，模型也“几乎不用”，除非显式指令。这直接关系到自定义 Agent 生态的价值兑现。

9. **[#26522 Auto Memory 对低信号会话无限重试](https://github.com/google-gemini/gemini-cli/issues/26522)**
   5 条评论 · 后台提取代理跳过低信号会话后，状态永远不标记为“已处理”，导致同一会话反复被重试，浪费 Token 并产生噪音。

10. **[#19873 利用模型原生 bash 能力：零依赖 OS 沙箱 + 执行后意图路由](https://github.com/google-gemini/gemini-cli/issues/19873)**
    8 条评论 · 建议让 Gemini 3 模型在受控沙箱中直接使用 POSIX 工具链（grep/cat/sed），代替受限的专用工具抽象，同时保障安全。属于 Agent 架构方向的重要探讨。

## 重要 PR 进展（10 个）

1. **[#28910 添加 Gemini 3.7 Flash / 3.6 Flash / 3.5 Flash-Lite 模型配置（已关闭）](https://github.com/google-gemini/gemini-cli/pull/28910)**
   在 `core` 与 `cli` 包中补全新一代 Flash 模型的基础定义与选择能力，是未来模型切换的重要前置工作。

2. **[#28933 PR 生成：迭代式 Orchestrator 状态机](https://github.com/google-gemini/gemini-cli/pull/28933)**
   实现集中式编排器，协调仓库设置、多轮编码/评估、ESLint 静态分析与轨迹日志，为自动化 bug 修复提供统一框架。

3. **[#28932 PR 生成：Antigravity Agent 运行器与异步流解析](https://github.com/google-gemini/gemini-cli/pull/28932)**
   引入异步 AgentRunner，支持 `agent.chat()` / `response.resolve()` 流式调用、超时强制以及 GCS 轨迹块导出。

4. **[#28915 忽略路径处理中统一符号链接（symlink）解析](https://github.com/google-gemini/gemini-cli/pull/28915)**
   确保 `.geminiignore` 和 `.gitignore` 规则在字面路径与真实路径上一致生效，解决工具行为不一致问题。

5. **[#28930 移除不安全的 `diff.external` Git 覆盖（修复 #28928）](https://github.com/google-gemini/gemini-cli/pull/28930)**
   澄清 Git 行为：空值不代表“禁用外部 diff”，而是“使用默认的完整外部工具”，可能导致沙箱逃逸。该 PR 删除这一错误覆盖，属于安全修复。

6. **[#28794 防止 MCP 配置损坏时 fail-open 与数据丢失（修复 #28786）](https://github.com/google-gemini/gemini-cli/pull/28794)**
   `readConfig()` 解析失败时不再返回 `{}`（空配置），避免已禁用的服务器被重新启用；并会保留损坏文件供排查。

7. **[#28787 不把损坏的 MCP enablement 配置当作空配置](https://github.com/google-gemini/gemini-cli/pull/28787)**
   与 #28794 同源：区分“文件不存在”与“JSON 损坏”，损坏时不再默认启用全部 MCP 服务器，降低安全风险。

8. **[#28828 预览模型被静默替换时输出警告（修复 #28825）](https://github.com/google-gemini/gemini-cli/pull/28828)**
   当用户请求 `gemini-3.1-pro-preview` 但账号无预览权限时，当前逻辑会静默回退到 `auto-gemini-2.5`。该 PR 增加明确警告与可观测性。

9. **[#28917 Whisper 模型下载改为原子写入 + 失败清理（修复 #28644）](https://github.com/google-gemini/gemini-cli/pull/28917)**
   下载过程写入临时文件 `.downloading`，处理背压、流错误、长度校验，成功后再原子 rename 到目标路径，避免半截文件污染模型缓存。

10. **[#28916 Whisper 转录 Provider 缓冲不完整 stdout 块（修复 #28648）](https://github.com/google-gemini/gemini-cli/pull/28916)**
    为本地语音模式增加行缓冲，解决带时间戳的转录文本被任意长度 `data` 事件切断、导致内容丢失的问题。

## 功能需求趋势

从今日 Issue 与 PR 中可以提炼出社区关注的几个主要方向：

- **Agent 稳定性与可观测性**：子代理轨迹分享（#22598）、bugreport 携带子代理上下文（#21763）、`MAX_TURNS` 等中断原因的真实上报（#22323）都是高频诉求。
- **安全与沙箱**：零依赖 OS 沙箱 + bash 亲和（#19873）、阻止破坏性 Git/DB 操作（#22672）、敏感信息确定性 redaction（#26525）、MCP 配置防 fail-open（#28794）——安全性正在从“附加功能”走向“核心设计”。
- **内存系统改进**：Auto Memory 低信号会话重试抑制（#26522）、无效 patch 隔离/告警（#26523）、整体质量问题跟踪（#26516）。
- **配置可编程性**：命令替换块可配置（#27393）、Browser Agent 尊重 `settings.json` 覆盖（#22267）、预览模型替换可见性（#28828）。
- **AST 感知工具**：#22745 / #22746 两个 issue 均在探索 AST 感知的文件读取、搜索与代码库映射，目标是减少 Token 消耗与误读。
- **新模型支持**：Gemini 3.7 Flash 等新模型配置合入，社区对最新模型能力接入速度有明显期待。

## 开发者关注点

- **Shell 执行卡死/假成功**：#25166 的 “Awaiting user input” 卡死、#22323 的 MAX_TURNS 误报，都在削弱自动化可信度，是当前体验最大痛点。
- **Subagent 挂起与不透明**：#21409 通用代理无限挂起、#21763 子代理上下文缺失，让用户无法判断“它在干什么/为什么卡住”。
- **配置静默覆盖与损坏数据**：#28828 预览模型回退无提示、#28794 MCP 配置损坏导致服务器被重新启用，反映配置层的容错与可观测性不足。
- **平台兼容性**：#21983 Wayland 下浏览器代理失效、#28832 Windows 上 13 个无条件失败测试、Windows 长路径（#28926），说明跨平台打磨仍在路上。
- **模型“手懒”问题**：#21968 模型不会主动调用 skills / sub-agents，用户自定义能力很难被自然触发，影响 Agent 生态扩展意愿。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-21

## 1. 今日速览

昨日 Copilot CLI 发布两个 prerelease 补丁（`v1.0.81-4` / `v1.0.81-5`），修复了 agent 工作时提交 prompt 导致 pending 行残留的问题。社区焦点集中在两处：一是 ACP 模式权限绕过回归（#4537），二是 `store_memory` 在 1.0.81 prerelease 中报 `Instance id is required`（#4535）。此外，一批长期未决的 MCP / OAuth / 输入交互历史 Issue 本周集中关闭，社区对 MCP 生态与权限安全的高频反馈仍然突出。

## 2. 版本发布

**v1.0.81-5**（prerelease）
- 修复：agent 工作期间发送 prompt，不再导致第二个副本残留为 `(pending)` 并滞留在 transcript 底部。

**v1.0.81-4**（prerelease）
- 包含修复与变更（具体内容未详细说明）。

## 3. 社区热点 Issues（10 个）

### #1481 — SHIFT+ENTER 应换行却执行 prompt
- 作者: mithunshanbhag | 更新: 2026-08-20 | 评论: 28 | 👍: 17
- 摘要：`SHIFT + ENTER` 在主流聊天应用中用于换行，Copilot CLI 却用 `CTRL + ENTER` 换行、`SHIFT + ENTER` 直接执行。日常输入体验受影响明显。
- 社区反应：已是长期高赞 Issue（2 月创建），近期仍在更新，说明用户基数大、修复诉求持久。
- 链接: https://github.com/github/copilot-cli/issues/1481

### #4390 — 企业组织已启用的模型（Claude Sonnet 5 / Opus 5 / Kimi K3）未出现在模型目录
- 作者: Rogn | 创建: 2026-08-06 | 更新: 2026-08-20 | 评论: 15 | 👍: 7
- 摘要：Copilot Business 组织显式启用的模型在 CLI 的模型目录中缺失，选择 Anthropic 模型时报 `This model is disabled`。
- 社区反应：企业用户对最新模型支持敏感，讨论热度高。
- 链接: https://github.com/github/copilot-cli/issues/4390

### #4096 — 第三方 MCP 服务器显示 "Connected" 但工具不进入 CLI 会话（OAuth token 未桥接）
- 作者: bugale | 创建: 2026-07-11 | 更新: 2026-08-20 | 评论: 6 | 👍: 2
- 摘要：通过 Copilot App UI 登录 Atlassian Remote MCP 后显示绿色 "Connected"，但 CLI 会话中看不到任何工具。OAuth token 从未传递到会话。
- 社区反应：涉及远程 MCP + OAuth 的完整链路，属于核心互操作缺陷。
- 链接: https://github.com/github/copilot-cli/issues/4096

### #4439 — Copilot CLI 1.0.79 拒绝 GitLab MCP OAuth metadata（RFC 8414 issuer mismatch）
- 作者: patrickzel | 创建: 2026-08-11 | 更新: 2026-08-20 | 评论: 5 | 👍: 3
- 摘要：自托管 GitLab 使用 OAuth 2.0 DCR 时，CLI 报告 issuer 不匹配并拒绝认证。
- 社区反应：自托管 MCP 用户面临的 OAuth 兼容性问题，预计随着 MCP 普及会更普遍。
- 链接: https://github.com/github/copilot-cli/issues/4439

### #4206 — 环境 footer 永久停在 "Loading: 1 instruction, 40 skills, 2 agents"
- 作者: cryptonic7-tech | 创建: 2026-07-21 | 更新: 2026-08-20 | 评论: 4 | 👍: 3
- 摘要：所有内容实际已加载（`/env` 可见），但状态 footer 一直显示 Loading，永不转完。由内置 GitHub MCP 在 org policy 下的 handshake 阻塞引起。
- 社区反应：企业环境下 MCP 策略导致状态机卡死，属于影响面广的可用性问题。
- 链接: https://github.com/github/copilot-cli/issues/4206

### #4524 — enforced-sandbox 过严，Windows 下 Copilot 无法使用 git
- 作者: logar16 | 创建: 2026-08-18 | 更新: 2026-08-20 | 评论: 3
- 摘要：开启 enforced-sandbox 后，即使授予工作目录权限，git 命令仍被拦截。用户反馈"super broken and overly restrictive"。
- 社区反应：Windows 平台权限沙箱与 git 工作流冲突，影响日常开发。
- 链接: https://github.com/github/copilot-cli/issues/4524

### #4533 — 并行 subagents 导致终端 UI 停止消费事件（输入 + 滚动失效）
- 作者: bikramjitk | 创建: 2026-08-20 | 更新: 2026-08-20 | 评论: 0
- 摘要：prerelease `1.0.81-4/5` 中，turn 启动并行 subagents 时，Rust 运行时继续工作但终端 UI 冻结，输入和滚动均无响应。
- 社区反应：新引入的渲染/事件消费回归，影响复杂 agent 任务。
- 链接: https://github.com/github/copilot-cli/issues/4533

### #4534 — autoUpdate: false 被忽略，CLI 反复 re-exec 缓存的 prerelease
- 作者: bikramjitk | 创建: 2026-08-20 | 更新: 2026-08-20 | 评论: 0
- 摘要：`~/.copilot/pkg/` 中一旦存在 prerelease 缓存，即使 npm 装的是 stable、settings.json 设置 `autoUpdate: false`，CLI 仍每次执行缓存的 prerelease。
- 社区反应：版本控制失效，可能导致用户停留在未验证的 prerelease 构建上，风险较高。
- 链接: https://github.com/github/copilot-cli/issues/4534

### #4535 — `store_memory` 在 1.0.81 prerelease 中报 `Instance id is required`
- 作者: DavidTeju | 创建: 2026-08-20 | 更新: 2026-08-20 | 评论: 3
- 摘要：原生 memory writer 调用时缺少 instance ID，`store_memory` 在 prerelease 中持续失败。
- 社区反应：上下文记忆功能是近期主推能力，回归影响面较大。
- 链接: https://github.com/github/copilot-cli/issues/4535

### #4537 — ACP 模式自动批准工具调用（`session/request_permission` 不再发送）
- 作者: richardjv-msft | 创建: 2026-08-20 | 更新: 2026-08-20 | 评论: 0
- 摘要：`--acp` 模式下 shell 命令、文件编辑/删除全部自动执行，客户端无审批机会，无日志记录。这是 #845 的回归。
- 社区反应：权限安全回归，对使用 ACP 协议集成的客户端影响严重。
- 链接: https://github.com/github/copilot-cli/issues/4537

## 4. 重要 PR 进展

过去 24 小时 PR 队列中活跃的仅 1 条，暂无法凑足 10 条。当前最值得关注的是：

### #4510 — 从 README 移除 GitHub Copilot CLI 文档
- 作者: prioritizedprotection086 | 创建: 2026-08-17 | 更新: 2026-08-20 | 评论: 暂无
- 摘要：删除 README 中关于 Copilot CLI 的安装与使用说明，包括详细文档与示例。
- 分析：README 是许多新用户了解 CLI 的第一入口。若文档未迁移到独立站点，移除可能影响可发现性。建议关注是否配套 docs 链接跳转。
- 链接: https://github.com/github/copilot-cli/pull/4510

## 5. 功能需求趋势

从近期 Issue 中可提炼出以下社区关注方向：

- **权限与安全模型**：多个 Issue 围绕权限绕过/失效（#4528、#4537）和沙箱过度限制（#4524），说明权限系统是当前最高频的痛点。
- **MCP 生态成熟度**：包括误报 policy 拦截（#3162）、OAuth token 未桥接（#4096）、OAuth issuer 校验失败（#4439）、MCP handshake 卡死 UI（#4206）、图片 content block 未传给模型（#4536）。MCP 连接、认证、内容传递皆存在问题。
- **终端 UI 稳定性**：#4532 pending 行重复堆积、#4533 UI 冻结、#4206 footer 卡 Loading。渲染层 bug 频繁，影响长时间交互体验。
- **输入交互细节**：#1481 SHIFT+ENTER 换行、#4447 Backspace 按词删除、#4538 /ask 多轮对话。用户对基础键盘行为与对话模式的期望在提升。
- **模型与配置持久化**：#4390 企业模型缺失、#4530 reasoning effort 跨会话持久化、#4534 autoUpdate 设置失效。
- **会话恢复与同步**：#4539 Ctrl+Z 后会话丢失、#4529 Remote-SSH 重连后 VS Code 面板空白。跨端会话可靠性成为关注点。

## 6. 开发者关注点

- **1.0.81 prerelease 引入的回归**：`store_memory`（#4535）、ACP 权限绕过（#4537）、终端 UI 冻结（#4533）、autoUpdate 失效（#4534）都在 prerelease 中被报告。建议用户停留在 stable 版本，团队需加速修复并补充 pre-release 回归测试。
- **权限机制的边界场景**：非交互 `-p` 模式绕过 `disableBypassPermissionsMode`（#4528）、ACP 模式不再发送 `request_permission`，以及 sandbox 阻止 git（#4524），共同表明权限体系需要在强制策略与日常开发工作流之间找到平衡。
- **MCP 互操作仍是最大短板**：从注册表误判到 OAuth 握手失败再到工具内容丢失，开发者对 MCP 的采用意愿明显，但稳定性是首要阻塞。
- **基础交互体验持续有强反馈**：SHIFT+ENTER 的 17 👍 与 28 评论说明用户对"符合肌肉记忆"的交互细节非常在意，此类小问题的修复能显著提升满意度。

---
*本日报由 GitHub Copilot CLI 公开仓库数据自动整理，仅供技术社区参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-21）

## 今日速览

今日发布 **v1.18.19**，核心改进集中在 Cloudflare AI Gateway 模型透传和 Codex 限流对齐；社区讨论热度集中在 OpenCode Go 服务的稳定性问题（luna 会话失败、工具数量限制、加密内容校验失败）以及 TUI/Web UI 的体验缺陷。PR 侧则有多项针对 MCP 工具兼容性、子代理权限、TUI 性能与插件扩展能力的重要修复。

## 版本发布

### v1.18.19
- **新增**: 为 Cloudflare AI Gateway 模型提供原生 OpenAI / Anthropic 透传支持。
- **限流**: 更紧密地对齐 Codex 与 ChatGPT 订阅额度限制（贡献者 @GameOn223）。
- **Bugfix**: 移除内置 Qwen 采样默认值，避免发送不受支持的参数；另有若干稳定性修复。

## 社区热点 Issues

以下为过去 24 小时内更新频繁、讨论度或影响面较大的 10 个 Issue：

1. **[#10531] Native Multimodal Context Support (Video/Audio)**
   - 作者: AimAmit | 评论: 13 | 👍: 16
   - 状态: CLOSED（长期讨论后关闭但仍具参考价值）
   - 为什么重要：社区对多模态上下文支持（视频/音频）有持续需求，用户从 Claude Code 迁移后希望 opencode 能处理更丰富输入。
   - 链接: https://github.com/anomalyco/opencode/issues/10531

2. **[#43364] luna session isn't working in opencode go**
   - 作者: abdullahaldarwish | 评论: 10 | 👍: 4
   - 状态: CLOSED
   - 为什么重要：OpenCode Go 内置模型 luna 出现“encrypted content could not be decrypted”错误，直接影响用户正常会话，属于高危服务稳定性问题。
   - 链接: https://github.com/anomalyco/opencode/issues/43364

3. **[#43378] OpenCode Go (deepseek-v4-flash) rejects >16 tools**
   - 作者: giovannipapini | 评论: 6 | 👍: 1
   - 状态: CLOSED
   - 为什么重要：工具数量超过 16 个即被拒绝，是一个从 2026-08-19 开始的回归，影响涉及大量工具函数的复杂 agent 场景。
   - 链接: https://github.com/anomalyco/opencode/issues/43378

4. **[#7675] Install script ignores OPENCODE_INSTALL_DIR environment variable**
   - 作者: grgong | 评论: 9 | 👍: 9
   - 状态: CLOSED
   - 为什么重要：安装脚本硬编码 `$HOME/.opencode/bin`，忽略文档中的 `OPENCODE_INSTALL_DIR` / `XDG_BIN_DIR`，是开发者环境迁移和包管理中的常见痛点。
   - 链接: https://github.com/anomalyco/opencode/issues/7675

5. **[#7207] opencode shell output empty**
   - 作者: crper | 评论: 12
   - 状态: CLOSED
   - 为什么重要：使用 `eza` 替代 `ls` 的用户在 opencode 内嵌 shell 中看不到输出，暴露 TUI shell 对非 POSIX 工具链的兼容性问题。
   - 链接: https://github.com/anomalyco/opencode/issues/7207

6. **[#43679] Amazon Bedrock provider: DeepSeek V3/V3.1/V3.2 broken by incorrect "us." cross-region prefix**
   - 作者: rrinaldi | 评论: 2 | 👍: 1
   - 状态: OPEN
   - 为什么重要：`resolveModelID` 对包含 `"deepseek"` 的模型 ID 无条件添加 cross-region 前缀，导致 Bedrock 上 DeepSeek 系列模型不可用，影响企业用户。
   - 链接: https://github.com/anomalyco/opencode/issues/43679

7. **[#41991] Permission doesn't extend to subagents**
   - 作者: skorokithakis | 评论: 3
   - 状态: CLOSED
   - 为什么重要：`opencode run` 在子代理请求权限时会一直挂起，因为 CLI 只处理顶层 session 的权限事件。这是自动化工作流的关键阻塞问题。
   - 链接: https://github.com/anomalyco/opencode/issues/41991

8. **[#36960] Fork button on assistant response texts**
   - 作者: ohsalmeron | 评论: 4
   - 状态: OPEN
   - 为什么重要：用户希望在聊天时间线上直接 Fork 某条助手回复，便于基于历史消息派生新会话，是对话式 AI 工具的常见体验诉求。
   - 链接: https://github.com/anomalyco/opencode/issues/36960

9. **[#43689] Enable OpenAI prompt caching by setting `prompt_cache_key` for GPT-5.6+**
   - 作者: yue-arch | 评论: 1
   - 状态: OPEN
   - 为什么重要：GPT-5.6+ 需要显式设置 `prompt_cache_key` 才能可靠命中缓存，否则长会话每次都会支付完整 input token 费用，直接关系用户成本。
   - 链接: https://github.com/anomalyco/opencode/issues/43689

10. **[#43652] [2.0] tui: skills completely missing**
    - 作者: HugeLetters | 评论: 4
    - 状态: CLOSED
    - 为什么重要：V2 的 TUI 命令面板中完全找不到 skills 入口，导致用户无法查看或管理已安装技能，属于 2.0 UI 功能缺失。
    - 链接: https://github.com/anomalyco/opencode/issues/43652

## 重要 PR 进展

1. **[#43685] Configurable timeout for task tool**
   - 状态: OPEN
   - 内容：为 `task` 工具增加可配置超时，避免子代理因 provider 挂起或 SSE 无内容而永久等待。
   - 链接: https://github.com/anomalyco/opencode/pull/43685

2. **[#43684] Truncate MCP tool names exceeding 64-char provider limit**
   - 状态: OPEN
   - 内容：将 MCP 工具名截断至 OpenAI 工具 API 的 64 字符限制内，修复 provider 拒绝工具 schema 的问题。
   - 链接: https://github.com/anomalyco/opencode/pull/43684

3. **[#43675] Answer subagent permissions in run**
   - 状态: OPEN
   - 内容：跟踪非交互式 run 创建的子孙 session，并只对该 run 的会话树自动批准/拒绝权限请求，修复 #41991。
   - 链接: https://github.com/anomalyco/opencode/pull/43675

4. **[#43681] Resolve Bedrock AWS profile credentials for V2**
   - 状态: OPEN
   - 内容：修复 V2 分支中 Bedrock 无法正确解析 AWS profile 凭据的问题，已在作者环境中使用约 1.5 周。
   - 链接: https://github.com/anomalyco/opencode/pull/43681

5. **[#43683] HTTP route registration for server plugins**
   - 状态: OPEN
   - 内容：允许服务端插件注册自定义 HTTP 路由，为 chat bridge、CI webhook 等场景提供扩展能力。
   - 链接: https://github.com/anomalyco/opencode/pull/43683

6. **[#43678] Preserve websocket upgrade diagnostics**
   - 状态: OPEN
   - 内容：捕获 Node `ws` rejected-upgrade 响应，保留状态码、头信息、请求 ID 与限流元数据，提升连接失败可诊断性。
   - 链接: https://github.com/anomalyco/opencode/pull/43678

7. **[#43677] Send console anthropic api key header**
   - 状态: OPEN
   - 内容：将 OpenCode Console 的 Bearer 凭据转换为 `x-api-key`，用于 Anthropic Messages 请求，并附带回归测试。
   - 链接: https://github.com/anomalyco/opencode/pull/43677

8. **[#43576] Settle foreign typed tool failures instead of dropping them**
   - 状态: CLOSED
   - 内容：修复插件工具抛出非 `Tool.Error` 类型错误时，工具调用永远停在 running/spinner 状态的问题。
   - 链接: https://github.com/anomalyco/opencode/pull/43576

9. **[#43562] Stop registering one resize listener per transcript row**
   - 状态: CLOSED
   - 内容：修复 TUI renderer 监听器数量随 transcript 长度线性增长的问题，避免超过 EventTarget 默认监听数限制。
   - 链接: https://github.com/anomalyco/opencode/pull/43562

10. **[#43687] Snapshot the composer before submit awaits**
    - 状态: OPEN
    - 内容：修复提交请求进行时用户输入被静默销毁、回车丢失且 prompt 历史记录未发送内容的问题。
    - 链接: https://github.com/anomalyco/opencode/pull/43687

## 功能需求趋势

- **Provider 与模型兼容性**：新模型接入（QwenCloud International、Ox Alpha）和 provider 透传优化是当前重点；同时 OpenAI / Anthropic / Bedrock / Copilot 等不同 API 协议的适配问题频繁被提出。
- **TUI / Web UI 交互体验**：社区希望更精细的鼠标捕获控制、消息 Fork 按钮、流式代码块完整显示、移动端 SSE 自动重连等，说明 UI 细节正成为用户留存的关键因素。
- **权限与自动化控制**：子代理权限透传、任务超时配置、非交互式 run 的自动审批等需求集中出现，用户越来越依赖 opencode 作为无人值守 agent 运行底座。
- **成本与 Token 优化**：OpenAI prompt caching、DeepSeek 用量异常、重复工具调用浪费 token 等议题表明，成本可观测性和缓存策略成为社区明确关注方向。
- **插件与扩展能力**：服务端插件 HTTP 路由、Desktop Pets 等自定义扩展诉求反映出社区希望 opencode 不仅是 CLI，而更像可编程开发平台。

## 开发者关注点

- **OpenCode Go 服务稳定性**：luna 会话失败、deepseek-v4-flash 工具数量限制、加密内容校验错误、`unsupported_tool_schema` 等问题集中出现，直接影响生产可用性。
- **TUI 渲染与输入问题**：shell 输出为空、代码块结尾被截断、Desktop 输入文字渲染异常、resize 监听器泄漏等，说明 TUI 在长会话和特殊终端环境下仍不够健壮。
- **配置和环境变量行为不一致**：安装脚本忽略 `OPENCODE_INSTALL_DIR`、`{env:VAR}` 未设置时静默变成空字符串、V2 配置无法覆盖内置 agent 策略等问题，破坏开发者对配置系统的信任。
- **Token 消耗透明性**：多个 Issue 提到“首次 prompt 耗尽免费额度”“agent 无限循环重复调用工具”“嵌套测试重复消耗 token”，社区需要更清晰的用量控制和循环检测机制。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报 — 2026-08-21

## 今日速览
过去 24 小时 Pi 没有新版本发布。社区关注重点集中在 Windows 平台体验、上下文自动压缩失效（#6879）以及 Gemini 3.x 工具调用兼容性上。多个月来反复被请求的 `/exit` 命令别名相关 PR 今日关闭，TUI 渲染修复也持续密集推进。

## 版本发布
过去 24 小时无新版本发布。

## 社区热点 Issues

1. **[bug] auto-compaction never triggers after context grows past 100% until provider overflow**  
   评论 18，👍 17 | [Issue #6879](https://github.com/earendil-works/pi/issues/6879)  
   长时间 agentic 会话中，上下文超过 100% 后自动压缩不生效，直到 API 拒绝请求。这是当前最受关注的核心稳定性问题，直接影响长会话可用性。

2. **[Windows] How do you use Pi on windows? What issues are you seeing?**  
   评论 32 | [Issue #7547](https://github.com/earendil-works/pi/issues/7547)  
   Windows 使用问题集中反馈帖，评论数最多。开发者正在收集不同运行方式下的问题，以便确定优化优先级，Windows 支持是当前社区最大诉求之一。

3. **Windows: Input line is redrawn on every keystroke**  
   评论 8 | [Issue #6300](https://github.com/earendil-works/pi/issues/6300)  
   Windows TUI 中输入时每个字符都会换行重绘，严重干扰日常使用，是 Windows 体验的关键 bug。

4. **Gemini 3.x models fail during tool use due to missing thought_signature**  
   评论 5 | [Issue #6996](https://github.com/earendil-works/pi/issues/6996)  
   Gemini 3.x 在工具调用回传时因历史中缺少 `thought_signature` 导致请求失败，影响新模型接入进度。

5. **Migrate grok-mermaid -> lovely-mermaid**  
   评论 6 | [Issue #8157](https://github.com/earendil-works/pi/issues/8157)  
   将 mermaid 渲染从 grok-mermaid 迁移到 lovely-mermaid，以解决原渲染器大量边界条件和限制。

6. **Per-model compaction settings**  
   评论 3，👍 3 | [Issue #8133](https://github.com/earendil-works/pi/issues/8133)  
   建议允许按模型配置不同的压缩参数。社区希望更细粒度控制上下文管理，而非全局一刀切。

7. **Document Windows Terminal's Ctrl+Shift+F conflict with fullscreen transcript search**  
   评论 4 | [Issue #8183](https://github.com/earendil-works/pi/issues/8183)  
   Windows Terminal 的查找快捷键与全屏转录搜索冲突，需要文档说明和变通方案，属于 Windows 快捷键冲突典型问题。

8. **Windows terminal (wsl or native) key-bindings**  
   评论 2 | [Issue #8372](https://github.com/earendil-works/pi/issues/8372)  
   进一步讨论 Windows 平台按键绑定冲突，说明该问题不是个例，需要更系统的平台适配方案。

9. **Unknown slash commands (e.g. /exit) are silently sent to the model as chat messages**  
   评论 2 | [Issue #8081](https://github.com/earendil-works/pi/issues/8081)  
   输入未知 `/` 命令会被当作普通聊天消息发送，浪费 token 并污染会话。这一 UX 问题与大量 `/exit` 别名请求相关，反映来自其他 CLI 用户的使用习惯。

10. **terminal scrolls to beginning without reason**  
    评论 17 | [Issue #5023](https://github.com/earendil-works/pi/issues/5023)  
    终端在模型工作时无规律跳转回会话开头，虽已关闭，但评论数高，说明该问题曾长期困扰较多用户。

## 重要 PR 进展

1. **feat: add color values and theme styling**  
   [PR #8398](https://github.com/earendil-works/pi/pull/8398)  
   大规模重构 TUI 颜色与主题系统，直接暴露颜色值，为未来 Agent 自定义样式及非终端 UI 打基础。

2. **feat(ai): amazon bedrock mantle**  
   [PR #8302](https://github.com/earendil-works/pi/pull/8302)  
   新增 Amazon Bedrock Mantle API 支持，解决 OpenAI GPT 等模型通过旧 Converse 接口调用失败的问题。

3. **fix(coding-agent): prevent TUI crash on large diffs by avoiding spread in push**  
   [PR #8395](https://github.com/earendil-works/pi/pull/8395)  
   修复编辑工具渲染超大 diff（约 14.5MB）时因 `push(...contentLines)` 超过调用栈限制导致 TUI 崩溃的问题。

4. **fix(ai): send LOW to disable thinking on gemini-3.7-flash**  
   [PR #8383](https://github.com/earendil-works/pi/pull/8383)  
   修复在 `gemini-3.7-flash` 上禁用思考时使用不支持的 `MINIMAL` 级别，改为 `LOW`，避免请求失败。

5. **FD-2120: Normalize kimi-coding thinking signatures to base64url**  
   [PR #8405](https://github.com/earendil-works/pi/pull/8405)  
   修复 kimi-coding 多轮推理对话中 `signature` 不是合法 base64url 导致的 400 错误。

6. **fix(coding-agent): abort active run before forking from a user message**  
   [PR #8374](https://github.com/earendil-works/pi/pull/8374)  
   修复在用户消息上执行 fork 时与正在运行的 agent 产生的竞态，提升操作安全性。

7. **fix(tui): preserve logical lines when copying soft-wrapped text**  
   [PR #8407](https://github.com/earendil-works/pi/pull/8407)  
   修复全屏 TUI 复制鼠标选区时，将软换行错误转换为硬换行，破坏段落、URL 和列表的问题。

8. **fix(coding-agent): respect min-release-age when checking npm package updates**  
   [PR #8377](https://github.com/earendil-works/pi/pull/8377)  
   npm 更新检测此前忽略 `min-release-age` 配置，导致提示安装尚未稳定发布的版本，现改为按实际安装解析逻辑判断。

9. **fix(tui): prevent wrapped table link color leaks**  
   [PR #8363](https://github.com/earendil-works/pi/pull/8363)  
   修复 Markdown 表格中链接换行后颜色泄漏到相邻单元格和边框的问题，并补充测试。

10. **feat: add /exit and /bye as alternative quit commands**  
    [PR #5160](https://github.com/earendil-works/pi/pull/5160)  
    为用户新增 `/exit` 和 `/bye` 作为 `/quit` 的别名，匹配 Claude Code、Codex 等行业通用命令习惯。

## 功能需求趋势
- **Windows 平台深度优化**：多个 Issue 集中在 Windows 运行方式、输入重绘、快捷键冲突，表明 Windows 是当前最大的用户诉求和痛点聚集地。
- **CLI 兼容性与命令别名**：社区大量请求 `/exit`、`/config`、`/bye` 等别名，主要来自 Claude Code、Codex 等工具的迁移用户。
- **新模型与 Provider 支持**：Gemini 3.x 兼容问题、Amazon Bedrock Mantle、Umans AI 等新 provider 的集成需求持续增加。
- **上下文管理与压缩策略**：自动压缩 bug 引发讨论，并出现按模型配置压缩参数的需求，精细化上下文控制是趋势。
- **TUI 渲染与交互细节**：多处渲染 bug（表格颜色、复制换行、滚动跳跃、光标状态）被集中修复，社区对终端交互细节要求较高。
- **扩展机制与宿主集成**：已有用户将 Pi 作为服务嵌入到多会话宿主中，扩展加载并发安全、请求上下文暴露等需求开始浮现。

## 开发者关注点
- **Windows 体验不稳定**：输入重绘、快捷键冲突、运行方式碎片化等问题频繁被报告，影响新用户上手。
- **自动压缩机制不可靠**：上下文超过 100% 仍不压缩，直到 API 强制拒绝，白白消耗 token 并中断任务。
- **新模型兼容滞后**：Gemini 3.x 与 kimi-coding 的 reasoning 字段处理问题说明对前沿模型的适配仍有缺口。
- **命令肌肉记忆被忽视**：来自其他 CLI 的用户期望 `/exit`、`/bye` 直接退出，但 Pi 会将其当作聊天消息发送给模型，浪费 token 且体验割裂。
- **大会话/大 diff 性能瓶颈**：渲染超大 diff 会直接导致 TUI 崩溃，长会话、大文件场景下的稳定性需加强。
- **扩展 API 面向服务端场景不足**：并发会话宿主无法安全复用扩展运行时，核心钩子不足以获取请求上下文，限制二次开发。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-08-21）

## 今日速览

昨日发布 v0.21.11-nightly 更新，主要改进 Web Shell 审批与 ask-user 对话框交互，并修复后台智能体误报失败问题。社区讨论集中在会话恢复可靠性、层次记忆 symlink 去重与 CI/CD 安全加固；多个安全相关 autofix PR 持续推进，另有跨会话通信功能进入实施阶段。

## 版本发布

**v0.21.11-nightly.20260820.b414f135fa**

- 新功能：Web Shell 审批与 ask-user 对话框改为 in-flow sheets 形式，优化交互流程
- 修复：后台智能体（background-agent）假性失败问题
- 另有多个 DSW EAS SWE + TB smoke 测试运行，基准版本均引用 v0.21.14，涉及 Harbor 适配器缓存门修复、沙箱启动引导修复以及 ACR Python 基础镜像映射验证

## 社区热点 Issues（10 条）

1. **#9586 ACP 重复工具调用断路器留下无结果调用**（[链接](https://github.com/QwenLM/qwen-code/issues/9586)）
   重复的 provider tool-call 触发断路器后，持久化的 `functionCall` 缺少终止 `tool_result`。P2 严重度，4 条评论，与多次出现的 "Duplicate provider tool call id" 属于同类问题。

2. **#9573 恢复会话后工具结果显示丢失**（[链接](https://github.com/QwenLM/qwen-code/issues/9573)）
   P1 严重度。恢复会话时，本已正常完成的工具调用被错误显示为 "Tool result missing from saved history"。直接影响长任务断点续跑的可靠性，社区正在等待重测。

3. **#9597 层次记忆通过 symlink 重复加载同一文件**（[链接](https://github.com/QwenLM/qwen-code/issues/9597)）
   当工作区级 `QWEN.md` 是祖先级文件的 symlink 时，同一物理文件被加载两次，造成上下文重复。该 Issue 与 PR #9600 同日提交，修复已在进行中。

4. **#9488 会话生命周期操作受来源分类门控限制**（[链接](https://github.com/QwenLM/qwen-code/issues/9488)）
   P1 严重度。删除/归档等批量会话操作前置依赖 provenance 分类，无法完成分类的会话将无法管理，属于 #9341 评审后的遗留问题。

5. **#9089 安全：带 PAT 的 Job 与不受信任分支代码共享主机**（[链接](https://github.com/QwenLM/qwen-code/issues/9089)）
   P1 安全类。autofix 流水线的 PAT 权限步骤存在被同主机不受信任代码攻击的风险，需要在 runner 级别隔离。社区评论提及经历了 `global-driver` 事故与四轮 `/review` 加固。

6. **#9309 上下文压缩计数不正确**（[链接](https://github.com/QwenLM/qwen-code/issues/9309)）
   用户截图显示先执行 `/compress-fast` 再执行 `/compress` 后，上下文从 170k 被压缩到异常程度，token 管理逻辑疑似有误。6 条评论。

7. **#2128 长会话内存无界增长**（[链接](https://github.com/QwenLM/qwen-code/issues/2128)）
   P1 老 Issue，仍在跟进。UI History 数组（`useHistoryManager.history`）无上限增长是根因。运行数十小时后内存只增不减，社区持续反馈。

8. **#8724 跨会话消息传递：同机 Qwen Code 会话互通**（[链接](https://github.com/QwenLM/qwen-code/issues/8724)）
   提议同机会话之间通过 `list_agents` 发现、`send_message` 定向通信，且接收端需 fail-closed 门控。7 条评论热度很高，已实现为 PR #9576。

9. **#9507 Agent Team 队友页签输出不可滚动**（[链接](https://github.com/QwenLM/qwen-code/issues/9507)）
   实验性 Agent Team 功能中，队友输出超出屏幕后无法滚动查看，内容永久丢失。影响多智能体协作的可观测性。

10. **#9556 审查：流水线是否应继续以调用用户身份执行代码**（[链接](https://github.com/QwenLM/qwen-code/issues/9556)）
    安全评审元问题：所有未解决的审查发现都以「代码已以审查者自身用户身份执行」为前提。这个能力在流水线更早阶段就被授予，需要架构决策。5 条评论，属于 #9221 二十轮评审后的核心安全讨论。

## 重要 PR 进展（10 个）

1. **#9600 fix(core): 按规范标识对层次记忆文件去重**（[链接](https://github.com/QwenLM/qwen-code/pull/9600)）
   将去重逻辑从路径字符串 `Set` 改为基于 canonical identity，修复 #9597 中 symlink 导致的同一文件二次加载问题。

2. **#9576 feat(core): 在入站门控后接受跨会话消息**（[链接](https://github.com/QwenLM/qwen-code/pull/9576)）
   同机 Qwen Code 会话通过 UNIX domain socket 接收 newline-delimited JSON 消息；策略允许时作为标记消息进入输入队列。回应 #8724。

3. **#9602 fix(core): 回调前清除工具显示列表**（[链接](https://github.com/QwenLM/qwen-code/pull/9602)）
   将 `CoreToolScheduler` 中工具显示清理移至完成回调之前执行，避免回调期间残留显示项，附带回归测试。

4. **#9599 fix(web-shell): 会话创建前显示 reasoning effort**（[链接](https://github.com/QwenLM/qwen-code/pull/9599)）
   为工作区模型条目添加只读的推理预览，修复懒创建会话时缺少 Thinking/effort 控件的问题（#9595）。

5. **#9506 fix(core): 切换模型路由时作废已记录 token 数**（[链接](https://github.com/QwenLM/qwen-code/pull/9506)）
   GeminiChat 的 token 计数现在绑定到模型路由（model id + auth type + endpoint），路由切换即失效旧计数，修复非精确 `modelOverride` 场景下的统计偏差。

6. **#9577 chore(ci): 发布 CI 禁用安装脚本并守卫 security-checks 工作流**（[链接](https://github.com/QwenLM/qwen-code/pull/9577)）
   npm 发布流程禁用生命周期脚本后显式执行仓库自有 postinstall，避免依赖安装阶段执行不可信代码；finalizer 不再持久化写权限 PAT。

7. **#9584 chore(deps): 清零高严重度 CVE 基线并强化安全门**（[链接](https://github.com/QwenLM/qwen-code/pull/9584)）
   升级受影响包使生产依赖审计清零；依赖 CVE 检查从报告模式改为硬性门禁。OpenTelemetry 栈升级至 0.221.x。

8. **#9503 feat(cli): 将已完成的读/搜工具批次折叠进思路行**（[链接](https://github.com/QwenLM/qwen-code/pull/9503)）
   TUI 将「思考 9s」和「已搜索 alpha, beta」两行合并为一行过渡显示，减少信息噪声，提升输出可读性。

9. **#9543 feat(web-shell): 将 GitHub PR 绑定到会话（侧边栏徽章 + 搜索）**（[链接](https://github.com/QwenLM/qwen-code/pull/9543)）
   Web Shell Git 对话框创建 PR 后，PR 编号和 URL 绑定到源会话，支持一个会话多个 PR（最多 10 条）及侧边栏标识与搜索。

10. **#9572 fix(review): 固定验证过的 git 身份跨残留探针**（[链接](https://github.com/QwenLM/qwen-code/pull/9572)）
    修复 #9557：`worktreeResidue` 不再只验证一次 git 身份，而是每次命令都通过已固定路径执行，避免通过 `.git` 文件的 TOCTOU 绕过。

## 功能需求趋势

- **会话生命周期可靠性**：重复工具调用 ID、会话恢复历史丢失、生命周期操作门控等是当前最高频问题，开发者对长会话稳定性的要求迫切。
- **供应链与 CI/CD 安全**：PAT 作业隔离、安装脚本禁用、CVE 基线清零、git 身份 TOCTOU——项目在自动修复与审查流水线上的安全投入明显加大。
- **Web Shell 体验打磨**：从复制按钮兼容性、侧边栏固定性能、会话目录刷新到确认框默认选中，UI 细节的反馈量持续走高。
- **记忆与上下文管理**：除常规压缩准确性问题外，symlink 导致的重复加载表明用户正在更复杂环境中使用层次记忆，需要面向真实文件系统的去重。
- **跨会话/多智能体协作**：跨会话消息（#8724）和 Agent Team 可滚动输出（#9507）表明社区正将 Qwen Code 推向多智能体协同工作场景。
- **企业级能力**：外部内存集成配置档案（#7449，已关闭）显示了企业部署对 provider-neutral 记忆抽象的需求。

## 开发者关注点

- **高频反复错误**："Duplicate provider tool call id" 和 "Tool result missing from saved history" 在多期报告中以不同形式反复出现（#8382、#9586、#9573），开发者反映这些问题会打断长任务连续性。
- **长会话资源占用**：UI History 无界增长、上下文压缩计数异常是两大痛点，直接影响长时间运行场景的可行性。
- **远程 Web Shell 兼容性**：通过 HTTP 非 localhost 访问时 Clipboard API 不可用、复制按钮失效等问题，反映真实部署环境比本地开发更复杂。
- **安全加固的连锁影响**：CI wipe 守卫、审查流水线安全和 git 身份验证等安全修复在加固系统的同时，也引入 runner 偶发不可用、审查误判等连带问题，社区在等待进一步收敛。
- **自动修复驱动的开发模式**：大量 `[autofix/takeover]` 和 `[review/self-reported]` PR 显示项目已深度依赖机器人审查与自动修复；有 Issue（#9556）开始系统性质疑该模式自身的权限边界，这值得持续关注。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报 — 2026-08-21

> 注：原 DeepSeek-TUI 仓库已更名为 **CodeWhale**，下述 Issue/PR 均位于 Hmbown/CodeWhale。

## 1. 今日速览

CodeWhale（原 DeepSeek TUI）今日发布 **v0.9.10**，正式完成向 Shannon Labs 产品身份的迁移；同时，i18n 字典化、TUI 模块解耦和文档中文化等重构 PR 持续推进。社区反馈集中指向**首次启动体验、max_tokens 升级回归**和**shell 补全脚本未同步更名**三大问题。

## 2. 版本发布

**v0.9.10**（PR #5513，76 commits）
- 发布主题：retention、identity、first-run 优化与 release-hardening
- 重要变更：官方产品名定为 **Codewhale**；旧 npm 包 `deepseek-tui` 正式弃用，不再发布新版本
- 本次发布为 rebase 后的完整 release lane，包含此前社区已接受的变更
- 链接：https://github.com/Hmbown/CodeWhale/pull/5513

## 3. 社区热点 Issues

1. **首次运行心理成本过高**（#5522，OPEN）
  非英语用户首次启动即遭遇 English telemetry 披露、设置墙和快捷键提示，建议改为渐进式引导。该 issue 刚创建即被维护者采纳为 release acceptance 条件。
  https://github.com/Hmbown/CodeWhale/issues/5522

2. **Emergency compaction 过早触发**（#5518，CLOSED）
  本地 vLLM 部署 DeepSeek-V4-Flash、配置 327,680 上下文窗口时，在 85K-105K tokens 即触发紧急压缩，疑似 output-headroom 预算溢出和 handoff 状态污染。
  https://github.com/Hmbown/CodeWhale/issues/5518

3. **v0.9.9 升级后 HTTP 400 max_tokens 错误**（#5516，CLOSED）
  用户未改配置，升级后所有请求失败：max_tokens=384000 超出模型 262144 上限。典型的升级回归问题，影响面大。
  https://github.com/Hmbown/CodeWhale/issues/5516

4. **shell 补全脚本过时**（#5526，OPEN）
  `codew completions powershell` 生成的脚本仍触发已弃用的 `codewhale-tui` 命令，文档中也无相关说明。
  https://github.com/Hmbown/CodeWhale/issues/5526

5. **文档中文化 EPIC**（#5482，OPEN）
  大量 `docs/` 仅英文，中文用户阅读门槛高；机器翻译存在错误，且部分源文档已陈旧。该 issue 获得持续关注。
  https://github.com/Hmbown/CodeWhale/issues/5482

6. **头部状态指示器不渲染**（#5512，CLOSED）
  Windows 11 + Windows Terminal 下，0.9.7+ 的 status_indicator（cw/whale/dots/off）完全失效，0.8.64 时代正常。
  https://github.com/Hmbown/CodeWhale/issues/5512

7. **IME 候选窗口位置跳变**（#5023，CLOSED）
  中文输入法候选窗口在输入时位置不稳定/乱动，影响中文用户日常使用（Windows 11，v0.9.3）。
  https://github.com/Hmbown/CodeWhale/issues/5023

8. **多行模式 / 自定义发送快捷键**（#5345，CLOSED）
  用户希望参考 Grok Build、Codex：支持多行输入模式，或将 Enter / Shift+Enter / Ctrl+Enter 发送组合可配置化，便于用 Markdown 结构化书写长指令。
  https://github.com/Hmbown/CodeWhale/issues/5345

9. **continuous loop 无限回合模式**（#5508，CLOSED）
  用 AI 协调多个 AI 的场景下，需要"无限回合直到手动中断"的选项，替代单回合 + sleep 的 hack 方案。
  https://github.com/Hmbown/CodeWhale/issues/5508

10. **独立 read_lints 按需诊断工具**（#4070，OPEN）
  目前 LSP 诊断仅在编辑后追加到工具结果中，缺少读取未编辑文件 lint/类型错误的入口；该需求已被 PR #5524 实现。
  https://github.com/Hmbown/CodeWhale/issues/4070

## 4. 重要 PR 进展

1. **v0.9.10 发布 PR**（#5513，CLOSED）
  完整的 76-commit 发布列车，覆盖身份更名、保留策略、首次运行优化和发布流程硬化。
  https://github.com/Hmbown/CodeWhale/pull/5513

2. **多文件 read_lints 操作**（#5524，OPEN）
  为 #4070 新增 `read_lints` 操作，支持多个 workspace-relative 文件，复用现有 LspManager 连接池。
  https://github.com/Hmbown/CodeWhale/pull/5524

3. **抽取 tool call 处理阶段**（#5523，OPEN）
  将 tool-call planning、approval/execution、result projection 从 turn loop 中独立为函数，保留原有控制流和取消语义。
  https://github.com/Hmbown/CodeWhale/pull/5523

4. **抽取流处理状态机**（#5514，CLOSED）
  将响应流状态机提取为 `process_stream`，通过 `StreamOutcome` 返回状态，保持请求计时与透明重试。
  https://github.com/Hmbown/CodeWhale/pull/5514

5. **utility 命令组采用 command shapes**（#5525，OPEN）
  FEAT-018：7 个 utility 命令迁移至 FEAT-014/015 的外部命令形状，注册 `/a...` 等入口。
  https://github.com/Hmbown/CodeWhale/pull/5525

6. **docs/sandbox 与 docs/web 接入字典脊柱**（#5520，CLOSED）
  消除 14+15 个 `isZh` 分支，两个页面完成 i18n 字典化，并纳入 `check-locales.mjs` 校验。
  https://github.com/Hmbown/CodeWhale/pull/5520

7. **docs/constitution 与 docs/runtime-api 接入字典脊柱**（#5517，CLOSED）
  同上，各消除 14 个 `isZh` 分支，推进 #5337 的 Phase 2 目标。
  https://github.com/Hmbown/CodeWhale/pull/5517

8. **MCP 图像结果类型化**（#5515，CLOSED）
  将标准 MCP `image` 内容转为基础中立的富工具结果块，移除文本回执中的内联 base64，保留 5 MiB 限制。
  https://github.com/Hmbown/CodeWhale/pull/5515

9. **恢复 /title 独立窗口标题**（#5509，CLOSED）
  修复 `/title` 与 `/rename` 合并后语义丢失的问题，恢复 `/title` 作为终端窗口标题命令。
  https://github.com/Hmbown/CodeWhale/pull/5509

10. **移除单参数 concat! 宏**（#5521，CLOSED）
  修复 clippy `useless-concat` 告警，保持 Lint 干净。
  https://github.com/Hmbown/CodeWhale/pull/5521

## 5. 功能需求趋势

- **中文本地化与国际化**：文档中文化（#5482）、IME 候选窗口稳定（#5023）、文案悬停提示（#998）——中文用户诉求在 UI、输入、文档三个层面集中爆发。
- **首次启动与引导体验**：#5522 反对"配置墙"，期待渐进式引导；#1854 要求 Windows 默认使用 Windows Terminal 而非 raw .exe。
- **输入交互灵活性**：#5345 多行模式/自定义发送键、#5508 无限回合模式——长指令结构化书写与 AI 编排场景驱动。
- **长会话与上下文可靠性**：#5518 紧急压缩过早触发、#5516 max_tokens 升级回归——显示长跑编码会话是核心场景，预算管理需更透明。
- **Agent 自主诊断能力**：#4070 read_lints 获社区高度认同并已在 #5524 落地，方向是"agent 按需读取诊断而非仅编辑后触发"。

## 6. 开发者关注点

- **升级回归频发**：v0.9.9 max_tokens 错误、v0.9.8 并行加载 flake、v0.9.7 状态指示器消失——"每个版本都有新回归"成为高频抱怨。
- **品牌更名过渡混乱**：shell 补全仍生成 `codewhale-tui`，旧 `deepseek-tui` 弃用而文档与脚本未同步，社区需要彻底的重命名清理。
- **中文用户输入体验**：IME 候选窗口、多行输入、中文文案展示是中文社区反馈最集中的三个方向。
- **长会话稳定性瓶颈**：紧急压缩、handoff 状态污染、max_tokens 预算暗示长会话仍不够稳定，需要更可预测的上下文管理。
- **架构重构接受度高**：EPIC-005 crate 分解、command shapes、turn loop 提取等重构 PR 参与者众，说明社区认可"先稳架构、再增功能"的路线。

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/Liderhu/agents-radar) 自动生成。*