# OpenClaw 生态日报 2026-08-21

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-20 17:03 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-21

## 1. 今日速览

过去 24 小时 OpenClaw 仓库保持超高活跃度：累计 500 条 Issue 更新（新开/活跃 447 条，关闭 53 条）和 500 条 PR 更新（待合并 350 条，已合并/关闭 150 条），属于典型的高迭代开源项目节奏。无新版本发布，当前社区焦点集中在 v2026.8.1-beta.2 的 release validation（[#125626](https://github.com/openclaw/openclaw/issues/125626)，17 条评论）。讨论热度最高的三大问题分别是：SQLite transcript 清理阻塞事件循环（[#112423](https://github.com/openclaw/openclaw/issues/112423)）、WhatsApp 图片消息卡死主通道（[#96834](https://github.com/openclaw/openclaw/issues/96834)）、以及 P0 级 gateway 启动失败与事件循环周期性阻塞（[#108435](https://github.com/openclaw/openclaw/issues/108435)、[#124788](https://github.com/openclaw/openclaw/issues/124788)）。整体健康度判断：**迭代极快但稳定性积压明显**——24 小时合入/关闭 150 个 PR，但同时仍有多个 P0/P1 级会话状态与消息丢失问题持续数周未闭环，维护者评审带宽是当前瓶颈。

## 2. 版本发布

过去 24 小时**无新版本发布**。当前处于 v2026.8.1-beta.2 的 release validation 阶段（[#125626](https://github.com/openclaw/openclaw/issues/125626)），社区测试者正在按 worksheet 流程验证 beta 质量，该 issue 已有 17 条评论，但尚无正式 release 产出。

## 3. 项目进展

24 小时内共 **150 个 PR 合并/关闭**，代表性成果集中在以下四个方向：

**会话与设备管理**
- [#126284](https://github.com/openclaw/openclaw/pull/126284)（已关闭）feat(sessions): recover offline device placements — 支持会话所在设备离线后的放置恢复，修复了「设备离线后会话卡在 active 但不可达」的管理盲区
- [#126685](https://github.com/openclaw/openclaw/pull/126685) fix(sessions): avoid startup stalls with many empty agent stores — 消除多 agent 空存储场景下的二次方级文件系统扫描，避免启动阻塞

**认证与模型配置**
- [#125471](https://github.com/openclaw/openclaw/pull/125471)（已关闭）fix(models): keep Claude CLI OAuth available in Control UI — 修复 gateway 重启后 Claude CLI OAuth 刷新所有权丢失、以及 `anthropic: missing` 矛盾状态发布问题（关联 [#83598](https://github.com/openclaw/openclaw/issues/83598)）
- [#125816](https://github.com/openclaw/openclaw/pull/125816)（已关闭）fix(models): Web UI provider probe fails for direct-credential providers — 修复直接凭据提供商在 Web UI 的探测失败
- [#117883](https://github.com/openclaw/openclaw/pull/117883) fix(onboard): honor explicit provider auth choice（关闭 [#88373](https://github.com/openclaw/openclaw/issues/88373)）

**安全与合规**
- [#116489](https://github.com/openclaw/openclaw/pull/116489)（已关闭）feat(security): require acknowledgement for install policy warnings — 安装策略警告现在需要授权操作者确认目标名后才能继续
- [#120900](https://github.com/openclaw/openclaw/pull/120900)（已关闭）feat(ui): review install policy warnings — 在 Control UI 中提供安装策略警告的审阅界面，配套 `acknowledgeInstallPolicyWarning` 参数

**渠道与消息可靠性**
- [#126739](https://github.com/openclaw/openclaw/pull/126739)（已关闭）fix(telegram): make common emoji reactions work reliably — 修复 ❤️⚡️✍️🕊️☃️ 等常用 emoji reaction 静默消失的问题
- [#120419](https://github.com/openclaw/openclaw/pull/120419) fix(channels): requeue pre-adoption ingress stalls instead of silently losing the message — 修复消息被静默丢弃的问题
- [#123193](https://github.com/openclaw/openclaw/pull/123193) fix(channels/turn): clear pending history on error paths — 修复群聊失败后 pending buffer 未清导致下轮重复注入历史

**值得注意的关闭 Issue**
- [#112395](https://github.com/openclaw/openclaw/issues/112395)（已关闭）P0 级「6.11 → 7.1 升级后启动迁移 preflight 阻塞 gateway」已被解决，但同因升级引发的 [#108435](https://github.com/openclaw/openclaw/issues/108435) 仍开放（详见下文 Bug 板块）

总体来看，项目在**会话管理、安全确认流、认证修复**上明显补课，这类「生产可用性」方向的 PR 占比升高，是项目走向稳定化的积极信号。

## 4. 社区热点

| 排名 | Issue/PR | 评论数 | 主题 | 背后诉求 |
|---|---|---|---|---|
| 1 | [#125626](https://github.com/openclaw/openclaw/issues/125626) Release validation: v2026.8.1-beta.2 | 17 | 测试者协作验证 beta，要求按 worksheet 逐项回归并追加 release-only 评论 | 社区对版本质量的集体把关；期待 8.1 正式版尽快落地 |
| 2 | [#112423](https://github.com/openclaw/openclaw/issues/112423) 大型 SQLite transcript 清理阻塞 gateway 事件循环 | 16 | P1，session-state 受损 | 长时间使用后 gateway 卡顿、消息延迟，用户迫切需要一个不阻塞主线程的清理方案 |
| 3 | [#96834](https://github.com/openclaw/openclaw/issues/96834) WhatsApp 1:1 图片消息卡住主通道约 3 分钟 | 15 | P1，消息丢失 + 多模态处理缺陷，`clawsweeper-recovery-stuck` | WhatsApp 重度用户核心场景受损，且自动化恢复机制未能收敛，情绪共鸣最高（👍1） |
| 4 | [#38327](https://github.com/openclaw/openclaw/issues/38327) "Cannot convert undefined or null to object"（google-vertex/gemini-3.1-pro-preview） | 14 | P1 回归，已持续 5.5 个月 | 大型模型提供商回归造成长尾用户不满（👍3），急切希望修复或给出 workaround |
| 5 | [#108435](https://github.com/openclaw/openclaw/issues/108435) 升级 2026.7.1 后 gateway 启动失败 | 14 | P0 回归（systemd/ollama/手动启动均失败），diamond lobster 评级 | 升级阻断性故障，用户被锁在旧版本，对发布质量产生质疑 |

**热点分析**：今日社区讨论的共性诉求是**「消息不丢、事件循环不卡、升级不停机」**。5 个热点议题中有 3 个直指消息/会话状态可靠性（#112423、#96834、#108435），说明生产环境用户对核心链路的稳定性敏感度极高。值得注意的是 #96834 的 `clawsweeper-recovery-stuck` 标签说明自动恢复机器人已多次尝试未果，这类问题需要人工介入。

## 5. Bug 与稳定性

### P0（阻断级，3 个）

| Issue | 问题 | 状态 | Fix PR |
|---|---|---|---|
| [#108435](https://github.com/openclaw/openclaw/issues/108435) | 升级 2026.7.1 后 gateway 无法启动（systemd/ollama/手动均失败），报 `did not start on 127.0...` | OPEN，diamond lobster，maturity:stable | ❌ 无 |
| [#124788](https://github.com/openclaw/openclaw/issues/124788) | 2026.8.1-beta.2 gateway 事件循环每 ~10.9 分钟阻塞 ~100–120s（定时器 + 字符串拼接 + fs 扫描），WebSocket 断连、/ready 无响应、cron 停摆；禁用全部 memory 插件仍复现 | OPEN，P0，gold shrimp | ❌ 无 |
| [#112395](https://github.com/openclaw/openclaw/issues/112395) | 6.11 → 7.1 升级后迁移 preflight 阻塞，迁移表和 lease 为空 | ✅ CLOSED（已解决） | — |

### P1（高优，12 个）

| Issue | 问题 | 时间线 | Fix PR |
|---|---|---|---|
| [#112423](https://github.com/openclaw/openclaw/issues/112423) | 大型 SQLite transcript 归档在 gateway 线程做完整物化/压缩/落盘/回读，阻塞事件循环 | 07-21 创建，16 评论 | ❌ source-repro |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | WhatsApp 1:1 图片注入导致主通道卡 ~3 分钟，`active_reply_work` 悬空 | 06-25 创建，recovery-stuck | ❌ 需 live-repro |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 2026.3.2 起 google-vertex/gemini-3.1-pro-preview 报 "Cannot convert undefined or null to object" | 03-06 创建，5.5 个月未闭环 | ❌ 需 live-repro |
| [#123273](https://github.com/openclaw/openclaw/issues/123273) | 非默认（named）agent 收不到图片附件，default agent 正常 | 08-13 创建 | ❌ source-repro |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程未收割，僵尸进程累积导致运行时劣化 | 06-29 创建 | ❌ 待维护者评审 |
| [#119087](https://github.com/openclaw/openclaw/issues/119087) | 1-vCPU 容器 gateway 冷启动从 7.1-beta.1 到 7.2-beta.7 慢 ~2.5x | 08-04 创建 | ✅ linked-pr-open |
| [#92241](https://github.com/openclaw/openclaw/issues/92241) | 升级/回滚后 gateway 持有旧 dist 模块路径，入站消息被静默丢弃（ERR_MODULE_NOT_FOUND） | 06-11 创建 | ❌ 需产品决策 |
| [#83598](https://github.com/openclaw/openclaw/issues/83598) | anthropic:claude-cli OAuth 刷新在 2026.5.12 仍死锁主通道（#73682 修复未覆盖） | 05-18 创建 | ❌ |
| [#86612](https://github.com/openclaw/openclaw/issues/86612) | Windows + OPENCLAW_SANDBOX=1 + OPENCLAW_HOME=/mnt/... 时 gateway 容器无限重启 | 05-25 创建 | ❌ source-repro |
| [#90361](https://github.com/openclaw/openclaw/issues/90361) | memory_search 间歇性 "index metadata is missing"，疑似 search/reindex 竞态 | 06-04 创建 | ❌ not-repro-on-main |
| [#114211](https://github.com/openclaw/openclaw/issues/114211) | Matrix 房间 agent 对 no-reply 输出自循环、重启后重放陈旧会话 | 07-27 创建 | ❌ 需产品决策 |
| [#80498](https://github.com/openclaw/openclaw/issues/80498) | 子代理完成通知在 tool-use 轮次后过早/重复出现 | 05-11 创建 | ❌ source-repro |
| [#123799](https://github.com/openclaw/openclaw/issues/123799) | 生产部署受 Codex compact 404 影响，需要升级/回滚安全指引 | 08-14 创建 | ❌ 需产品决策 |

### P2（值得关注）

- [#88657](https://github.com/openclaw/openclaw/issues/88657) DeepSeek V4 Flash 经 OpenRouter 产生不完整 turn（5.27/5.28 回归，5.26 正常）
- [#120735](https://github.com/openclaw/openclaw/issues/120735) Telegram 贴纸以裸 file ref 到达且未落盘，agent 无法读取（✅ linked-pr-open）
- [#118018](https://github.com/openclaw/openclaw/issues/118018) 陈旧子代理完成被投递到已被替换的 requester 生命周期（✅ linked-pr-open）
- [#48810](https://github.com/openclaw/openclaw/issues/48810) 压缩重试产生孤儿 fork，parentId 链断裂（recovery-stuck）
- [#90478](https://github.com/openclaw/openclaw/issues/90378) 5.28 → 6.1 cron 存储静默迁移 SQLite 且新任务默认 delivery.mode=announce 导致渠道报错
- [#95840](https://github.com/openclaw/openclaw/issues/95840) cache-ttl 上下文裁剪对 OpenAI 模型永久失效（isCacheTtlEligibleProvider 排除 OpenAI）——影响面最大的提供商反而享受不到该机制

**稳定性小结**：P0 级问题从上周的 2 个增加到 3 个（新增 #124788 beta.2 事件循环阻塞），且均无对应 fix PR；P1 队列中仅 2 个有 linked PR。`clawsweeper-recovery-stuck` 与 `needs-maintainer-review` 标签的高频出现表明**自动化 triage 已尽力但人工评审积压严重**，这是当前项目健康度最大的短期风险。

## 6. 功能请求与路线图信号

**高价值、可能进入下一版本的需求：**

- [#14785](https://github.com/openclaw/openclaw/issues/14785) 降低工具 schema token 开销（当前每次会话固定消耗 ~3,500 tokens / 13,972 chars，6 个月未动，待产品决策）— 若落地可显著降低所有用户的 token 成本，属高杠杆优化
- [#13700](https://github.com/openclaw/openclaw/issues/13700) Session snapshots（`/session save|load`）— 长期开发会话的存档/回滚/A-B 测试需求，社区呼声持续但无 PR
- [#53654](https://github.com/openclaw/openclaw/issues/53654) Discord 支持 messageUpdate/messageDelete（编辑重处理、删除取消）— 👍3，Discord 用户高频诉求
- [#88032](https://github.com/openclaw/openclaw/issues/88032) Telegram quote/reply 上下文成为一等公民，而非分散的 prompt/runtime 补丁
- [#47910](https://github.com/openclaw/openclaw/issues/47910) 按失败类别做 provider 故障转移——把认证损坏的 provider 隔离（quarantine），避免无效重试浪费延迟
- [#51441](https://github.com/openclaw/openclaw/issues/51441) 在 session_status 中暴露实际解析后的 backend model（LiteLLM 代理场景下 agent 需要知道真实模型身份）

**与现有 PR 相关的路线图信号：**

- HTTP API 系列修复（#126616 会话无限增长、#126619 系统提示词冗余、#126611 自定义 reasoning 模型 maxTokens 截断）暗示**OpenAI 兼容 HTTP 层正在被系统性地补齐**，该方向可能成为下一版本亮点
- 两个 install-policy 安全 PR（#116489、#120900）已合入，说明**供应链安全**是当前重点投资方向；后续可能扩展到更多插件/技能安装的审查场景

**低优先级但社区持续提及：** 推理流式显示（#42276）、TUI `--deliver` 默认值可配置（#33102）、可配置 lane 等待诊断阈值（#14747）、Control UI provider 名归一化显示（#47840）。

## 7. 用户反馈摘要

**真实用户痛点（来自 Issue 评论）：**

- **多用户记忆行为不一致**（[#43747](https://github.com/openclaw/openclaw/issues/43747)）：用户与两位同事使用同一版本，三人各自观察到完全不同的记忆管理行为（一个在做 chunking/embedding 存 `~/.openclaw/memory/main.sqlite`，另一个存别处……），说明记忆子系统缺少统一契约，直接打击多用户部署信心。
- **多代理并发时全量 LLM 调用同时超时**（[#43374](https://github.com/openclaw/openclaw/issues/43374)）：4 个 agent 并发时所有 API 调用同步超时（每 60–90s 一批），但同一时刻 `curl` 直连同一 API 完全正常——用户明确指出"这不是 LLM 提供商的问题，是内部瓶颈"，指向连接池/调度缺陷。
- **账号级封禁事故**（[#44134](https://github.com/openclaw/openclaw/issues/44134)）：Google Antigravity 作为主模型时，因工具 schema 高频重新加载触发 Cloud Code Assist API 滥用检测，**账号被封**。这是目前看到的最严重的用户侧后果，优先级虽标 P2 但实际伤害远超普通 bug。
- **生产环境 SOS**（[#123799](https://github.com/openclaw/openclaw/issues/123799)）：生产部署停留在 2026.5.12，受 Codex compact 404 影响，上游 #123706 已关闭但用户得不到升级/回滚指引——"我们是受影响的 production deployment，需要 operational guidance"。
- **静默失败挫伤信任**（[#58957](https://github.com/openclaw/openclaw/issues/58957)、[#88657](https://github.com/openclaw/openclaw/issues/88657)）：模型切换/长会话中上下文超限无明确报错；DeepSeek V4 Flash 同一天前后版本行为不一致——用户对"无声的错误"容忍度最低。
- **Feishu（飞书）群聊激活模式失效**（[#50490](https://github.com/openclaw/openclaw/issues/50490)）：`/activation mention` 切换后机器人仍响应所有消息，中文用户社区在群聊场景的刚需场景受损。
- **知名用户参与**：[#124911](https://github.com/openclaw/openclaw/issues/124911) 由 Scott Hanselman 的 OpenClaw agent 代其提交（agent 分析、本人确认），说明**OpenClaw 已被知名开发者用在自己日常流程中**，其 agent 指出的 compaction reserveTokensFloor 忽略模型上下文窗口问题相当专业，也侧面说明项目已形成"用户即贡献者"的生态正循环。

**积极信号**：用户愿意为 beta 版本做逐项 release validation（#125626），说明社区对项目有较高信任与参与意愿；多个 issue 附带了完整的复现步骤与日志，测试质量较高。

## 8. 待处理积压

以下 issue 长期开放且近期仍有活跃讨论，但迟迟未能解决，建议维护者优先关注：

| Issue | 开放时长 | 严重度 | 阻塞原因 |
|---|---|---|---|
| [#38327](https://github.com/openclaw/openclaw/issues/38327) vertex/gemini-3.1-pro-preview 回归 | 5.5 个月 | P1 | 需 live-repro，暂无维护者认领 |
| [#14785](https://github.com/openclaw/openclaw/issues/14785) 工具 schema token 开销 | 6.3 个月 | P2 增强 | 待产品决策，一直搁置 |
| [#13700](https://github.com/openclaw/openclaw/issues/13700) session snapshots | 6.4 个月 | P2 增强 | 无 PR，需求范围大 |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) 多 agent 编排不稳定（配置覆盖/会话锁失败/子任务脱离） | 5.3 个月 | P1 | linked PR 已开，但长期未合入 |
| [#43747](https://github.com/openclaw/openclaw/issues/43747) 记忆管理混乱 | 5.3 个月 | P2 | 待产品决策 + 维护者评审 |
| [#50291](https://github.com/openclaw/openclaw/issues/50291) 插件钩子缺 trace 上下文 | 5.1 个月 | P2 | stale + recovery-stuck |
| [#48810](https://github.com/openclaw/openclaw/issues/48810) 压缩重试造成孤儿 fork | 5.1 个月 | P2 | recovery-stuck |
| [#45494](https://github.com/openclaw/openclaw/issues/45494) cron 在 LLM 持续故障时静默超时而非快速失败 | 5.3 个月 | P2 | 需产品决策 + 维护者评审 |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) WhatsApp 图片卡顿 | 近 2 个月 | P1 | recovery-stuck，需 live-repro |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) 跨渠道重复 transcript/replay umbrella | 4 个月 | P1 | 需产品决策 + 维护者评审 |

**给维护者的提醒**：#96834、#48810、#50291 等多条 issue 都带 `clawsweeper-recovery-stuck` 标签，说明自动修复循环已空转多次；建议人工介入评估是否调整 clawsweeper 策略，或降低这些 issue 的自动化优先级并显式分配给人。另外 #38327（5.5 个月 P1）与 #14785（6.3 个月高杠杆优化）长期无进展，会持续消耗社区耐心。

---

*数据来源：github.com/openclaw/openclaw，统计窗口 2026-08-20 ~ 2026-08-21（过去 24 小时）。*

---

## 横向生态对比

# AI 智能体与个人 AI 助手开源生态横向对比分析报告

**日期：2026-08-21 | 分析对象：12 个开源项目**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**规模化高迭代阶段**：头部项目单日 PR 合并量达百级，且普遍在向"生产可用性"补课——消息不丢、事件循环不卡、升级不停机三大稳定性诉求成为跨项目共性痛点。生态分层明显：OpenClaw 以绝对体量领跑，中坚力量（Hermes、CoPaw、ZeroClaw、NanoBot）在功能迭代与稳定性积压间博弈，长尾项目（PicoClaw、NullClaw、ZeptoClaw）则进入停滞或低频期。值得关注的是，**沙箱持久化、生命周期钩子、安全强制路径、会话可恢复性**正在成为新一代架构竞争的焦点，头部项目已开始从"逐 bug 修补"转向"系统化可靠性架构"。

---

## 2. 各项目活跃度对比

| 项目 | Issues（24h） | PRs（24h） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500 新开/活跃 447，关闭 53 | 500 更新，合并/关闭 150 | 无（beta 验证中） | ⚠️ 迭代极快但 P0/P1 积压严重，维护者评审带宽是瓶颈 |
| **Hermes Agent** | 50 活跃，0 关闭 | 50 更新，合并/关闭 3 | 无 | ⚠️ 桌面端与安装链路稳定性短板明显，但 bug 响应快 |
| **NanoBot** | 4（新开/活跃 2，关闭 2） | 27 更新，合并/关闭 11 | 无 | ✅ 合并率高，PR 积压与 conflict 分支需关注 |
| **PicoClaw** | 0 | 0（3 个 stale PR 待合并） | 无 | 🔴 低活跃，两个 18 天 stale PR 有被自动关闭风险 |
| **NanoClaw** | 4 | 50 更新，合并/关闭 19 | 无 | ✅ 技能审计是亮点，但 12 个 per-skill PR 堆叠待合 |
| **NullClaw** | — | — | — | ⚪ 24h 无活动 |
| **IronClaw** | 15（活跃 11，关闭 4） | 38（合并/关闭 15） | ✅ v1.3.0 | ✅ 健康，沙箱持久化 epic 稳步推进 |
| **LobsterAI** | 2 条旧 issue 活跃 | 7（合并/关闭 6） | 无 | ✅ 开发活跃但 Issue 关闭停滞（关闭率 0%） |
| **Moltis** | 1（关闭） | 6（合并/关闭 4） | ✅ v20260820.01 | ✅ 安全漏洞快速闭环，唯一积压是 5 个月老 PR #468 |
| **CoPaw** | 27 | 50（合并/关闭 29） | ✅ v2.1.1-beta.1 | ⚠️ 迭代速度优秀，但 agent 自主执行断裂是核心短板 |
| **ZeptoClaw** | — | — | — | ⚪ 24h 无活动 |
| **ZeroClaw** | 50（新增 44，关闭 6） | 50（合并/关闭 5） | 无 | ⚠️ 活跃度高，新增 2 个 P1 安全漏洞，合并队列积压 |

---

## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的绝对核心与参照系**，单日 500 条 Issue + 500 条 PR 的体量是第二名（Hermes/CoPaw/ZeroClaw，各 50+50）的 **5-10 倍**，社区规模与贡献者生态无人能及。其核心优势在于：

- **全功能覆盖**：会话/设备管理、认证（Claude CLI OAuth）、安全合规（install policy acknowledgement）、渠道（Telegram/WhatsApp/Matrix）全线推进，是生态中唯一具备"企业级网关"形态的项目。
- **高杠杆优化意识**：工具 schema token 开销（#14785）、provider 故障转移隔离（#47910）等路线图需求体现了对成本与可靠性的深层次思考。
- **生态正循环**：Scott Hanselman 等知名开发者自主提交 issue，验证了"用户即贡献者"的飞轮效应。

**相对短板**：稳定性积压与体量不匹配——24h 合入 150 个 PR 的同时，仍有 3 个 P0（含 #124788 事件循环每 10.9 分钟阻塞 100-120s）和 12 个 P1 无 fix PR；`clawsweeper-recovery-stuck` 标签泛滥说明自动化 triage 已过载。相比之下，IronClaw 的 v1.3.0 稳定发布、Moltis 的 24h 安全漏洞闭环，显示出小型项目在质量把控上的灵活性优势。

---

## 4. 共同关注的技术方向

### 4.1 消息不丢失与主通道可靠性（涉及 6+ 项目）

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | WhatsApp 图片卡死主通道 3 分钟（#96834）；入站消息静默丢弃（#92241） |
| NanoBot | outbound 消息异常终止后台任务，后续消息不再发送（#5457） |
| CoPaw | 流式中途 ReadError 不重试（#7162）；网络瞬断后需手动重启（#6932） |
| Hermes | Bot Mode handoff 回复被销毁（#90879） |
| PicoClaw | 路由 agent 不记忆历史消息，上下文机制失效（#3316） |
| NanoClaw | WhatsApp 媒体文件对 agent 不可达（#2715） |

### 4.2 事件循环阻塞 / 长任务卡顿（涉及 4 项目）

OpenClaw 的 SQLite 清理事件循环阻塞（#112423）与 P0 级周期性阻塞（#124788）、CoPaw 的 GLM 冻结 10 分钟（#7102）、NanoBot 的 dispatcher 异常边界（#5457）、ZeroClaw 的 Web Dashboard 停止 agent 后上下文丢失（#8794）——核心矛盾是**同步阻塞操作侵入异步主循环**，多项目均缺少不阻塞主线程的后台任务方案。

### 4.3 安装/升级稳定性（涉及 5 项目）

- **Hermes**：Termux Python 版本冲突已 46 天未修复，8/20 起扩大到所有设备（#59877/#90687）；macOS/Windows 桌面端更新即损坏（#89675/#90060）
- **OpenClaw**：升级 7.1 后 gateway 启动失败（#108435，P0）
- **NanoClaw**：Node 26.7.0 全新 macOS 安装失败（#3359）
- **ZeroClaw**：`config init` 生成的配置"出生即降级"（#9436）
- **Moltis**：Windows shell hooks 因缺 `sh -c` 失败（#468，已等 5 个月）

### 4.4 安全强制路径一致性（涉及 3 项目）

- **ZeroClaw**：`block_high_risk_commands` 在父路径与 delegate 子路径执行不一致（#10164/#10165，P1 安全漏洞）
- **Moltis**：Vault 解锁/恢复端点完全免鉴权（CWE-306），已修复
- **Hermes**：伪造 X-Forwarded-For 绕过限流 + `/api/status` 泄露诊断字段（#90702/#90700）

### 4.5 会话持久化与上下文连续性（涉及 5 项目）

- **OpenClaw**：设备离线后会话卡在 active 不可达（#126284 已修复）
- **NanoBot**：跨渠道消息持久化到目标 session（#3145 已合并）
- **Hermes**：会话存储失败时真错误被吞（#90493）；归档+隐藏会话从 UI 消失（#90955）
- **ZeroClaw**：手动停止 agent 后工具调用记录丢失（#8794）
- **IronClaw**：沙箱持久化 epic（#7732）——将每次命令创建/销毁容器改为 per-user 可复用容器

### 4.6 多代理 / 多租户配置一致性（涉及 4 项目）

- **ZeroClaw**：核心轻量化 RFC（#6165，17 评论）——长尾集成移出默认核心
- **OpenClaw**：多用户记忆行为不一致（#43747）
- **CoPaw**：自动模型路由（#6436）、按任务分目录（#6643）
- **Hermes**：platform_toolsets 全局误计数导致 agent 静默失去工具（#89050）

---

## 5. 差异化定位分析

| 项目 | 定位 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手 + 企业级网关 | 开发者/极客/企业部署 | 单体仓库 + 多 channel adapter + gateway 抽象；Memory 插件化；Python 为主 |
| **Hermes Agent** | 桌面端优先的 AI 伴侣 | 个人桌面用户 | Electron/Tauri 桌面 + 多 Profile + Bot Mode 群聊；后端多网关架构 |
| **NanoBot** | 轻量级、可自托管的 Agent 运行时 | 轻量部署/开发者 | WebUI/TUI 双前端 + provider 抽象 + MCP；Python，强调配置统一（canonical name） |
| **PicoClaw** | 多通道路由的轻量分身 | 渠道重度用户 | dispatch rules 路由 agent 到特定频道；Telegram/Discord/LINE |
| **NanoClaw** | 技能生态 + 一键接入 | 非技术用户/团队 | 官方技能体系（12 核心技能审计）；一键 Slack Agent；低门槛 onboarding |
| **IronClaw** | 工程向 Agent 基础设施 | 平台/基础设施团队 | 持久化沙箱（Docker Exec）+ 生命周期钩子 + 通知中心；XL PR 驱动的 epic 开发 |
| **LobsterAI** | AI 编程/写作工具集成 | 创意/编程用户 | Write 工具文件卡片 + 分屏预览；macOS 打包；引擎超时逃生通道 |
| **Moltis** | 自托管隐私优先 AI 助手 | 隐私敏感/自托管用户 | Vault 加密存储；WhatsApp/Telegram 渠道；安全审计响应快 |
| **CoPaw** | 功能丰富的大众 Agent 平台 | 广大用户/社区 | 市场统一（apps/plugins/skills）；记忆系统（ReMe/PowerContext）；多模型路由探索 |
| **ZeroClaw** | Rust 高性能可嵌入 Agent | 开发者/嵌入式 | Rust + WASM 插件化路线 + SOP 权限契约；硬件集成（robot-kit）；编译期 feature |

**核心维度对比**：

- **技术栈**：Python 系（OpenClaw/NanoBot/Hermes）vs Rust 系（ZeroClaw）vs 混合（IronClaw）
- **部署形态**：云端网关（OpenClaw）vs 桌面端（Hermes/LobsterAI）vs 轻量自托管（Moltis/NanoBot/PicoClaw）vs 嵌入式（ZeroClaw）
- **扩展机制**：MCP 生态（NanoBot/CoPaw/IronClaw）vs 技能系统（NanoClaw/Hermes）vs 插件系统（OpenClaw/PicoClaw）
- **商业模式信号**：NanoBot 社区探索 x402 付费 MCP 集成，Moltis 强调自托管安全，ZeroClaw 通过受控遥测驱动路线图

---

## 6. 社区热度与成熟度

### 第一梯队：超大规模迭代（日 PR >100）
**OpenClaw**——唯一达到该量级的项目，社区规模是生态其余项目的总和级。但速度与稳定性的矛盾也最突出：150 个 PR 合并 / 日 vs 3 个 P0 无 fix 并存。处于典型的"功能扩张期"向"质量巩固期"过渡的阵痛阶段。

### 第二梯队：高活跃迭代（日 PR 30-50）
| 项目 | 阶段特征 |
|---|---|
| **Hermes** | 快速修 bug（当日 issue 当日 fix PR），但安装链路与桌面端"更新即损坏"侵蚀信任，处于**活跃修补期** |
| **CoPaw** | 29 个 PR 合并 / 日，功能迭代速度惊人，但核心 agent 自主执行断裂一周未解，处于**功能扩张期** |
| **ZeroClaw** | 45 个 PR 待合并，大量架构级 RFC（轻量化、权限契约）推进，处于**平台化转型期** |
| **IronClaw** | 15 合并 + v1.3.0 稳定发布，沙箱持久化 epic 按计划推进，处于**质量巩固期** |
| **NanoBot** | 11 合并，WebUI/MCP 基建收尾，PR 冲突积压需清理，处于**迭代收束期** |
| **NanoClaw** | 19 合并 + 技能审计 + 一键 Slack，处于**体验优化期** |

### 第三梯队：低频维护（日 PR <10）
**LobsterAI**（6 合并，但 Issue 关闭停滞）、**Moltis**（4 合并，安全闭环快但量小）——均为"开发侧活跃、社区侧清淡"，项目体量聚焦特定场景。

### 第四梯队：停滞/空心化
**PicoClaw**（stale PR 积压 18 天）、**NullClaw**、**ZeptoClaw**（24h 无活动）——需警惕项目健康度，可能已进入维护者离场或生态边缘化阶段。

### 成熟度综合排序（基于稳定性指标）
```
IronClaw > Moltis > NanoBot > LobsterAI > NanoClaw > CoPaw > Hermes > OpenClaw > ZeroClaw > PicoClaw >> NullClaw/ZeptoClaw
```

---

## 7. 值得关注的趋势信号

### 信号一：从"对话式助手"到"自主执行 Agent"的范式转移
CoPaw #6921（模型计划后停止需手动"继续"）、ZeroClaw #8794（停止 agent 后上下文丢失）、Hermes #90879（Bot Mode handoff 回复被销毁）——多项目用户在表达同一个诉求：**agent 应从头干到尾，中途不需要人类发号施令，且中断后状态不可丢失**。这标志着行业正从"聊天机器人"框架转向"自主 Agent"执行框架，执行连续性（execution continuity）将成为下一阶段核心竞争力。

### 信号二：安全左移——从"功能安全"到"强制路径一致"
ZeroClaw 的 `block_high_risk_commands` 在父/子代理路径行为不一致、Moltis 的 Vault 端点免鉴权、Hermes 的伪造 X-Forwarded-For 绕过限流——共同揭示一个事实：**安全策略必须在所有执行路径上强制一致**，否则存在系统性漏洞。结合 ZeroClaw #9598（SOP 权限契约 RFC）与 NanoClaw 的权限断言常量，安全模型正在从"尽力而为"走向"契约化、可验证"。

### 信号三：沙箱持久化成为 Agent 基础设施标配
IronClaw #7732（per-user 持久化容器）与 OpenClaw 的会话设备管理（#126284）、CoPaw 的 envs 原子写入（#7135）形成呼应。**"状态可恢复、环境可持久、存储不丢失"**正在从 devops 最佳实践下沉为 Agent 运行时的基础要求。

### 信号四：轻量化核心 + 插拔生态
ZeroClaw #6165（核心轻量化 RFC，将 Lucid/Qdrant 等集成移出默认核心，WASM 插件化）与 IronClaw 的生命周期钩子、NanoClaw 的技能审计（12 个官方技能中多数存在"配置生效假象"）共同指向：**核心保持小而稳，扩展通过契约化插件/技能生态提供**。这与 OpenClaw 的插件化方向一致，但 ZeroClaw 的 WASM 方案可能代表更激进的下一代架构。

### 信号五：配置系统的"可诊断性"革命
NanoClaw #3359（Node 版本校验只有下限无上限）、PicoClaw #3329（配置项声明但未读取）、LobsterAI #1556（文档 404 四个月未修）——用户对"假配置、假文档、假功能"的容忍度正在逼近临界点。**可预期性（predictability）**正成为用户体验的核心维度，配置系统需要从静默播种转向显式校验+警告+可诊断报告。

### 信号六：知名开发者深度参与，agent 提交 issue 成为常态
Scott Hanselman 的 agent 代其提交专业 issue（OpenClaw #124911）——**"用户即贡献者"的生态正循环已从口号变为现实**。对开发者而言，这意味着：你的下一个 issue 可能由你的 agent 提交，工具的可靠性将直接决定其在真实工作流中的可信度。

---

### 对技术决策者的建议

1. **若追求稳定性**：IronClaw（沙箱基建）、Moltis（自托管安全）是标杆；OpenClaw 建议等待 v2026.8.1 正式版及 P0 修复后再升级生产环境
2. **若追求生态与功能覆盖**：OpenClaw 无出其右，但需接受其 beta 期的高波动性
3. **若面向个人桌面/轻量使用**：Hermes（桌面体验）与 NanoBot（轻量自托管）各有优势，但需关注两者当前的安装链路与 PR 积压风险
4. **若考虑多代理/渠道路由**：PicoClaw 的 routed-agent 上下文修复长期搁置，建议谨慎依赖；可关注 OpenClaw 的会话管理演进
5. **平台化/嵌入式场景**：ZeroClaw 的 Rust + WASM 路线值得长期追踪，但当前需评估其 P1 安全漏洞与合并队列积压的短期风险

---

*数据来源：各项目 GitHub 仓库 2026-08-21 日报。所有 Issue/PR 编号均为真实数据。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-08-21）

## 今日速览

- 过去 24 小时 Issue 更新 4 条：新开/活跃 2 条、关闭 2 条；PR 更新 27 条：待合并 16 条、合并/关闭 11 条；无新版本发布。
- 项目迭代非常活跃，PR 侧尤其密集，主要集中在 **WebUI 交互、provider 容错、MCP、渠道分发、TUI 体验** 等模块。
- 11 条 PR 进入合并/关闭状态，说明近期功能开发开始收尾；但仍有 16 条 PR 待合并，其中包含多个带 `conflict` 标签的积压 PR。
- 社区反馈问题集中在 **Docker 下 OAuth 登录失败、代理 URL 兼容、流式响应中途报错不重试** 等运行稳定性场景。
- 整体健康度较高：Issue 关闭率 50%，PR 合并/关闭率约 40.7%；主要风险是 PR 合并积压与长期冲突分支需要维护者介入。

## 版本发布

无

---

## 项目进展

今日有 11 条 PR 进入 `merged/closed` 状态，以下几条从功能或修复角度看影响较大：

- **#5452 feat(tui): print resume command on exit**  
  TUI 退出后打印可直接执行的 `nanobot agent --session websocket:<id>` 恢复命令，提升会话恢复效率。  
  [HKUDS/nanobot PR #5452](https://github.com/HKUDS/nanobot/pull/5452)

- **#5400 refactor(models): unify preset names**  
  统一模型预设命名，使 config、WebUI、commands、sessions、fallbacks 等模块共享同一 canonical name，并支持 WebUI 侧联机重命名。  
  [HKUDS/nanobot PR #5400](https://github.com/HKUDS/nanobot/pull/5400)

- **#5384 fix(webui): restore transcript-only session history**  
  恢复只有显示 transcript、没有 canonical session JSONL 的历史会话在侧边栏的可见性，并允许打开和删除，避免会话“丢失”。  
  [HKUDS/nanobot PR #5384](https://github.com/HKUDS/nanobot/pull/5384)

- **#5381 feat(webui): add native workspace folder picker**  
  为本地 WebUI 增加 macOS/Windows/Linux 原生文件夹选择器，提升本地会话工作区配置体验。  
  [HKUDS/nanobot PR #5381](https://github.com/HKUDS/nanobot/pull/5381)

- **#5240 refactor(webui): unify floating controls**  
  统一浮动面板、命令菜单、富面板的样式与语义，降低 WebUI 维护成本。  
  [HKUDS/nanobot PR #5240](https://github.com/HKUDS/nanobot/pull/5240)

- **#3145 fix(agent): persist cross-channel messages into target session history**  
  修复 session A 通过 `message` 工具发消息到 channel B 时，B 侧会话历史未记录、用户回复后丢失上下文的问题。对跨渠道 Agent 工作流是重要修复。  
  [HKUDS/nanobot PR #3145](https://github.com/HKUDS/nanobot/pull/3145)

整体来看，WebUI 体验、模型命名一致性、TUI 会话恢复、跨渠道上下文持久化是本次收尾的主要方向，项目在这些模块上向前迈进了明显一步。

---

## 社区热点

在可获取的 Issue 数据中，评论主要集中在以下两条：

- **#5444 [OPEN] Docker 下 OpenAI OAuth 登录失败** — 1 条评论  
  用户反馈在 Docker 环境登录 OpenAI 时，OAuth 回调 URL 已粘贴但仍无法完成 token 交换。该问题直接影响容器化部署用户，讨论热度最高。  
  [HKUDS/nanobot Issue #5444](https://github.com/HKUDS/nanobot/issues/5444)

- **#5425 [CLOSED] 自定义 OpenAI-compatible provider 不支持 `socks://` 代理 URL** — 1 条评论  
  用户希望兼容社区常见的 `socks://` 别名，否则配置了代理的自定义 provider 会在请求发出前失败。该 Issue 已被关闭，但具体修复版本仍需确认。  
  [HKUDS/nanobot Issue #5425](https://github.com/HKUDS/nanobot/issues/5425)

另外，**#5454** 虽然暂无评论，但已快速对应生成修复 PR **#5455**，说明该问题被维护者或贡献者重视，也是当前流式 provider 稳定性方向的热点。  
[HKUDS/nanobot Issue #5454](https://github.com/HKUDS/nanobot/issues/5454)

PR 侧未提供评论数数据；从变更规模和主题看，**#5420 WebUI turn observability** 与 **#5179/#5180 MCP SDK v2 迁移** 是当前社区较关注的大型改动。  
[HKUDS/nanobot PR #5420](https://github.com/HKUDS/nanobot/pull/5420)  
[HKUDS/nanobot PR #5179](https://github.com/HKUDS/nanobot/pull/5179)

---

## Bug 与稳定性

按严重程度排列：

### 高严重度

- **#5444 [OPEN] Docker 下 OpenAI OAuth 登录失败**  
  影响 Docker 用户的核心登录流程，当前未见对应 fix PR 出现在更新列表中，需要重点跟进。  
  [HKUDS/nanobot Issue #5444](https://github.com/HKUDS/nanobot/issues/5444)

- **#5454 [OPEN] 流式 provider 中途 `server_error` 不重试**  
  一旦有 content/reasoning 已流式输出，再遇到 Codex `response.failed` / `server_error` 就不会重试，降低流式场景稳定性。已有修复 PR **#5455** 待合并。  
  [HKUDS/nanobot Issue #5454](https://github.com/HKUDS/nanobot/issues/5454)  
  [HKUDS/nanobot PR #5455](https://github.com/HKUDS/nanobot/pull/5455)

### 中严重度

- **#5425 [CLOSED] 自定义 provider 的 `socks://` 代理别名不支持**  
  代理 URL 兼容性问题，Issue 已关闭，建议在 changelog 中确认是否已修复。  
  [HKUDS/nanobot Issue #5425](https://github.com/HKUDS/nanobot/issues/5425)

### 已提交修复、但尚未合并的稳定性 PR

- **#5457 fix(channels): scope dispatcher exception boundary to message processing**  
  单条 outbound 消息异常会终止 `ChannelManager._dispatch_outbound` 后台任务，导致后续消息不再发送。  
  [HKUDS/nanobot PR #5457](https://github.com/HKUDS/nanobot/pull/5457)

- **#5413 fix(providers): apply fallback policy to raised errors**  
  provider 抛异常而非返回 `finish_reason="error"` 时，fallback 策略不会生效。  
  [HKUDS/nanobot PR #5413](https://github.com/HKUDS/nanobot/pull/5413)

- **#5414 fix(slack): validate file downloads across redirects**  
  Slack 文件下载 URL 重定向链路缺少校验，存在被恶意 URL 重定向的风险。  
  [HKUDS/nanobot PR #5414](https://github.com/HKUDS/nanobot/pull/5414)

- **#5412 fix(gateway): flush background child output to logs**  
  后台 Python 子进程 stdout 因非 TTY 被 block-buffer，启动日志无法及时落盘。  
  [HKUDS/nanobot PR #5412](https://github.com/HKUDS/nanobot/pull/5412)

- **#5431 fix(agent): report background task failures**  
  后台任务异常未记录完整 traceback，影响排查。  
  [HKUDS/nanobot PR #5431](https://github.com/HKUDS/nanobot/pull/5431)

- **#5430 fix(agent): release completed task groups**  
  长运行 `AgentLoop` 会为每个已完成 task group 保留空集合，造成内存/状态残留。  
  [HKUDS/nanobot PR #5430](https://github.com/HKUDS/nanobot/pull/5430)

- **#5339 fix(webui): reject discarded temporary chat messages**  
  用户丢弃 Temporary Chat 后，WebSocket 消息仍可能恢复并持久化成普通 chat。  
  [HKUDS/nanobot PR #5339](https://github.com/HKUDS/nanobot/pull/5339)

- **#5338 fix(mcp): preserve credentials when OAuth store read fails**  
  OAuth store 读取失败时被当作空 store，后续写入可能覆盖其他 server 的 credentials。  
  [HKUDS/nanobot PR #5338](https://github.com/HKUDS/nanobot/pull/5338)

---

## 功能请求与路线图信号

- **#5447 [CLOSED] 付费安全扫描 MCP 集成（ScanPay x402）**  
  社区开发者提出基于 Solana x402 的付费 MCP 安全扫描服务，希望与 nanobot 集成。该 Issue 已关闭，短期内可能不会进入主线，但说明社区正在探索 **nanobot 作为 autonomous agent 收费服务底座** 的方向。  
  [HKUDS/nanobot Issue #5447](https://github.com/HKUDS/nanobot/issues/5447)

- **#5453 [OPEN] feat(providers): add SenseNova（商汤日日新）provider**  
  新增 `sensenova-6.8-flash-lite`、`deepseek-v4-flash`、`glm-5.2` 等模型支持。若合并，将扩展 nanobot 在国内大模型 provider 上的覆盖。  
  [HKUDS/nanobot PR #5453](https://github.com/HKUDS/nanobot/pull/5453)

- **#5420 [OPEN] feat(webui): add turn observability and safe recovery**  
  将用户每一轮 turn 映射为独立 answer surface，保留 reasoning、tool、file-edit 等活动记录，并支持中断恢复与 usage 统计。这是 WebUI 可观测性方向的明显路线图信号。  
  [HKUDS/nanobot PR #5420](https://github.com/HKUDS/nanobot/pull/5420)

- **#5179 / #5180 [OPEN] MCP SDK v2 迁移**  
  两个 PR 都指向 MCP SDK v2 迁移，且都带 `conflict` 标签。说明这是一项已提上日程但尚未定案的技术债迁移工作，可能进入后续大版本。  
  [HKUDS/nanobot PR #5179](https://github.com/HKUDS/nanobot/pull/5179)  
  [HKUDS/nanobot PR #5180](https://github.com/HKUDS/nanobot/pull/5180)

---

## 用户反馈摘要

- **Docker 部署用户卡在 OpenAI OAuth 登录**  
  用户按提示打开 URL 并粘贴完整回调地址后，`Exchanging authorization code for tokens...` 阶段失败。这说明 Docker 环境下的 OAuth 回调解析或网络出口存在实际阻塞，是影响开箱即用体验的高频痛点。  
  [HKUDS/nanobot Issue #5444](https://github.com/HKUDS/nanobot/issues/5444)

- **自定义 provider 用户受限于代理 URL 格式**  
  用户配置了 `socks://` 代理别名，但 nanobot 无法识别，请求在到达 provider 前失败。社区希望兼容更宽松的代理配置写法，而不仅是标准 `socks5://`。  
  [HKUDS/nanobot Issue #5425](https://github.com/HKUDS/nanobot/issues/5425)

- **流式场景用户希望“部分输出后也能重试”**  
  用户使用 Codex 流式输出时，若中途 `server_error`，内容已经显示了一部分，但系统不再重试，只能手动重新发起整轮请求。用户对瞬时错误的容忍度较低，期望更智能的恢复策略。  
  [HKUDS/nanobot Issue #5454](https://github.com/HKUDS/nanobot/issues/5454)

- **开发者希望将 nanobot 接入付费 MCP 商业模式**  
  有开发者已搭建 Solana x402 微支付安全扫描服务，并尝试让 nanobot 作为客户端接入。这说明社区正在将 nanobot 用于真实 agent 商业化场景，MCP 生态扩展能力会越来越重要。  
  [HKUDS/nanobot Issue #5447](https://github.com/HKUDS/nanobot/issues/5447)

---

## 待处理积压

以下 PR 开放时间较长或带有 `conflict` 标记，建议维护者优先处理：

- **#5179 Migrate MCP integration to SDK v2 with legacy compatibility**  
  创建于 2026-07-30，`priority: p1`，带 `conflict`。涉及 MCP 客户端、`httpx2` transport、SSRF 校验与兼容层，是较关键的技术债。  
  [HKUDS/nanobot PR #5179](https://github.com/HKUDS/nanobot/pull/5179)

- **#5180 chore(mcp): evaluate minimal SDK v2 migration**  
  创建于 2026-07-30，带 `conflict`，与 #5179 目标重叠，需要维护者决策采用哪个迁移基线。  
  [HKUDS/nanobot PR #5180](https://github.com/HKUDS/nanobot/pull/5180)

- **#5338 fix(mcp): preserve credentials when OAuth store read fails**  
  创建于 2026-08-11，带 `conflict`。属于 MCP 凭据安全修复，建议尽快解决冲突并合入。  
  [HKUDS/nanobot PR #5338](https://github.com/HKUDS/nanobot/pull/5338)

- **#5339 fix(webui): reject discarded temporary chat messages**  
  创建于 2026-08-11，带 `conflict`。涉及临时聊天丢弃后的状态一致性，建议优先处理。  
  [HKUDS/nanobot PR #5339](https://github.com/HKUDS/nanobot/pull/5339)

- **#5420 [OPEN] feat(webui): add turn observability and safe recovery**  
  虽然开放时间不长，但改动范围较大，涉及 WebUI 核心交互，建议尽早安排 review，避免后续冲突扩大。  
  [HKUDS/nanobot PR #5420](https://github.com/HKUDS/nanobot/pull/5420)

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-08-21

## 1. 今日速览

过去 24 小时 Hermes Agent 仓库保持**高活跃度**：50 条 Issue 更新（50 活跃 / 0 关闭），50 条 PR 更新（47 待合并 / 3 合并或关闭），无新版本发布。当日问题焦点集中在三块：**桌面端（Desktop）会话加载与更新回归、安装链路兼容性故障（Termux/Python）、以及会话状态持久化与恢复缺陷**。值得肯定的是，多个 P1/P2 级 Bug 在当日即获得对应修复 PR（如 #90937、#90954、#90941），维护团队响应迅速；但需警惕两点：一是 #59877/#90687 反映的安装失败已持续 46 天且影响面于 8/20 起扩大到"所有设备"；二是新增 2 条安全漏洞报告（#90702、#90700），涉及认证绕过与信息泄露。整体判定：项目迭代节奏快，但桌面端与安装链路的稳定性仍是当前最大短板。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

过去 24 小时有 **3 个 PR 被合并/关闭**（具体条目未进入评论数 TOP 20 展示列表）。在活跃 PR 中，以下工作正在实质推进项目稳定性与功能边界：

**关键修复 PR（均有对应 Issue 驱动）：**

| PR | 修复内容 | 关联 Issue |
|---|---|---|
| [#90954 fix(desktop): park unowned completion notifications instead of dropping them](https://github.com/NousResearch/hermes-agent/pull/90954) | Bot Mode 中 handoff 回复不再因 poller 不存活而被销毁，改为暂存待 owner 认领 | 修复 #90879 |
| [#90937 fix(update): Windows Desktop updates finish instead of parking on "Updating Hermes"](https://github.com/NousResearch/hermes-agent/pull/90937) | 修复 Windows 桌面版更新卡在 "Updating Hermes" 的问题，拯救 #90564 诊断成果 | P1 更新回归 |
| [#90941 fix(installer): the bootstrap installer stops waiting on pipe EOF](https://github.com/NousResearch/hermes-agent/pull/90941) | 修复 Tauri 引导安装器 `--update` 模式下的管道阻塞 | 更新器同源 Bug |
| [#90467 fix(desktop): stop Bot Chat click-spam reminting into the launch store](https://github.com/NousResearch/hermes-agent/pull/90467) | 阻止 Bot Chat 点击连发将 kickoff 会话写入默认 state.db 并覆盖 profile 配置 | 修复 #90458 |

**功能与兼容性 PR：**

- [#90942 fix: map framework-generic tool aliases (shell, bash) to terminal](https://github.com/NousResearch/hermes-agent/pull/90942) — 解决 qwen3.8、laguna-xs-2.1 等小模型输出 `shell`/`bash`/`execute_command` 等框架通用工具名导致调用失败的问题，对本地小模型用户是重要体验修复。
- [#90926 feat(skills): add hydrafetch optional skill](https://github.com/NousResearch/hermes-agent/pull/90926) — 新增可选 Hydrafetch 技能，覆盖 `web_extract` 无法读取的 JS 渲染、cookie 墙和反爬页面。
- [#90948 fix(anthropic): honor "thinking off" on Portal Claude models](https://github.com/NousResearch/hermes-agent/pull/90948) — 修复 Claude 4.6+ 因默认思考导致"关闭思考"无效的问题。
- [#90955 fix(state): surface archived+hidden sessions in the archived-only listing](https://github.com/NousResearch/hermes-agent/pull/90955) — 修复同时带 `archived=1` 和 `hidden=1` 的会话从所有 UI 列表消失的恢复死角。

整体来看，项目正在密集修补桌面端多网关/多 Profile 架构带来的回归，并同步完善小模型兼容性与工具链，方向明确但面较广。

## 4. 社区热点

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#66616 Skills index is stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616) | 64 | 技能索引已 29.8h 未刷新（上限 26h），/docs/skills 依赖的构建链路持续异常，社区讨论最激烈，足见技能生态对用户的重要性 |
| [#89675 Desktop: no sessions load for any agent profile after update](https://github.com/NousResearch/hermes-agent/issues/89675) | 14 | macOS 桌面版更新后所有 Profile 会话无法加载，后端未带 `--profile` 启动即被连接，P1 级回归 |
| [#59877 Package requires Python <3.14,>=3.11](https://github.com/NousResearch/hermes-agent/issues/59877) | 9 | Termux 全新安装因 Python 3.14.6 超出包版本约束而失败，46 天未修复 |
| [#90687 ERROR codes on all devices - Installation](https://github.com/NousResearch/hermes-agent/issues/90687) | 6 | 标记为 duplicate，但报告"8/20 起所有设备（含新装 Termux）均安装失败"，影响面疑似扩大 |
| [#90879 notify_on_complete dropped in Bot Mode handoff](https://github.com/NousResearch/hermes-agent/issues/90879) | 5 | Bot Mode 中被 handoff 调用的 agent 无法回复调用方，后台进程随父进程退出而销毁 |
| [#89995 Expose Bot Mode group chat rooms in web dashboard & gateway](https://github.com/NousResearch/hermes-agent/issues/89995) | 5 | Bot Mode 群聊目前仅桌面端可用，用户要求 Web 端与网关也能访问 |
| [#78565 write_file/patch silently destroy git worktree .git files](https://github.com/NousResearch/hermes-agent/issues/78565) | 5 | 文件工具自动创建父目录时覆盖 `.git` 指针文件，导致 worktree 与 git 失联 |
| [#90060 Windows Desktop breaks after in-app update](https://github.com/NousResearch/hermes-agent/issues/90060) | 5 | Windows 更新后静默 1005 崩溃并回退本地会话，需清空 userData 才能恢复 |

**分析**：今日社区热度最高的三类诉求是——① 安装链路连续受阻（#59877/#90687），用户对"所有设备装不上"的容忍度已接近临界；② 桌面端更新引入回归（#89675/#90060），"更新即损坏"严重侵蚀用户对自动更新的信任；③ Bot Mode 作为新兴功能（#90879/#89995/#90467）出现多起一致性缺陷，说明该功能正在快速迭代但质量尚未稳固。

## 5. Bug 与稳定性

### P1 严重级别

1. **[Desktop: no sessions load for any agent profile after update](https://github.com/NousResearch/hermes-agent/issues/89675)** — macOS 桌面版更新后所有 Profile 会话不可见，原因是后端被以无 `--profile` 方式拉起。14 条评论、2 👍，目前**未见对应修复 PR**。
2. **[platform_toolsets validation counts valid toolsets globally](https://github.com/NousResearch/hermes-agent/issues/89050)** — 校验逻辑按全局而非按平台统计，空工具集（如 `platform_toolsets: cli: []`）被其他平台的合法配置掩盖，agent 静默失去全部工具并输出文本形式的工具调用。目前**未见对应修复 PR**。

### P2 严重级别

| # | 问题 | 状态 |
|---|---|---|
| [#59877](https://github.com/NousResearch/hermes-agent/issues/59877) | Termux 安装失败：Python 3.14.6 不满足 `<3.14,>=3.11` | **无 fix PR**，持续 46 天 |
| [#90687](https://github.com/NousResearch/hermes-agent/issues/90687) | 8/20 起所有设备安装失败（与 #59877 同源） | 标记 duplicate，**无 fix PR** |
| [#90060](https://github.com/NousResearch/hermes-agent/issues/90060) | Windows 更新后崩溃 + 静默回退本地会话 | **有 fix PR** [#90937](https://github.com/NousResearch/hermes-agent/pull/90937)（待合并） |
| [#78565](https://github.com/NousResearch/hermes-agent/issues/78565) | write_file/patch 覆盖 git worktree 的 `.git` 指针文件 | **无 fix PR** |
| [#90493](https://github.com/NousResearch/hermes-agent/issues/90493) | Session 持久化失败将真实 SQLite 错误（如 `database disk image is malformed`）折叠为通用消息 | **无 fix PR** |
| [#90915](https://github.com/NousResearch/hermes-agent/issues/90915) | 桌面模型选择器跨 Provider 选择失败，静默保持当前模型 | **无 fix PR** |
| [#90473](https://github.com/NousResearch/hermes-agent/issues/90473) | "Show earlier messages"分页在长会话（~900 条）中 UX 严重缺陷 | **无 fix PR** |
| [#90886](https://github.com/NousResearch/hermes-agent/issues/90886) | Kimi K3 多轮重放 HTTP 400：`malformed encrypted reasoning content`，不自愈 | **无 fix PR** |
| [#90134](https://github.com/NousResearch/hermes-agent/issues/90134) | Windows 上 `hermes desktop` 构建报错 blockmap.js | **无 fix PR** |
| [#90922](https://github.com/NousResearch/hermes-agent/issues/90922) | v2 注册表中的 SSH 连接在桌面终端窗格中打开本地 shell | **无 fix PR** |
| [#86249](https://github.com/NousResearch/hermes-agent/issues/86249) | Relay 前置部署下 cron 任务投递 Discord 永远失败 | **无 fix PR** |
| [#90702](https://github.com/NousResearch/hermes-agent/issues/90702) 🔒 | 安全：伪造 `X-Forwarded-For` 可绕过每-IP 限流，填满 pending store 10 分钟 | **无 fix PR** |
| [#90700](https://github.com/NousResearch/hermes-agent/issues/90700) 🔒 | 安全：公共 `/api/status` 未过滤 `error_message`/`gateway_exit_reason` 诊断字段 | **无 fix PR** |
| [#81318](https://github.com/NousResearch/hermes-agent/issues/81318) | Hermes Cloud 托管 Dashboard OAuth 回调 `invalid_grant` | **无 fix PR** |

### P3 严重级别

- [#66616 Skills index stale](https://github.com/NousResearch/hermes-agent/issues/66616)（64 评论）— 索引构建链路持续异常，**无 fix PR**。
- [#90879 Bot Mode 回复被销毁](https://github.com/NousResearch/hermes-agent/issues/90879) — **有 fix PR** [#90954](https://github.com/NousResearch/hermes-agent/pull/90954)（待合并）。
- [#90833 Feishu 消息延迟 7 小时投递](https://github.com/NousResearch/hermes-agent/issues/90833) — `create_time` 未过滤（#21651 变体），**无 fix PR**。
- [#90918 Windows Hindsight local_embedded 重启失败](https://github.com/NousResearch/hermes-agent/issues/90918) — WinError 87，标记 duplicate，**无 fix PR**。

### 已有关联修复 PR 一览

| Bug | 修复 PR | 状态 |
|---|---|---|
| #90879 | [#90954](https://github.com/NousResearch/hermes-agent/pull/90954) | 待合并 |
| #90060 | [#90937](https://github.com/NousResearch/hermes-agent/pull/90937) | 待合并 |
| #90458 | [#90467](https://github.com/NousResearch/hermes-agent/pull/90467) | 待合并 |
| 更新器管道阻塞 | [#90941](https://github.com/NousResearch/hermes-agent/pull/90941) | 待合并 |
| 归档+隐藏会话死角 | [#90955](https://github.com/NousResearch/hermes-agent/pull/90955) | 待合并 |
| Portal Claude 思考无法关闭 | [#90948](https://github.com/NousResearch/hermes-agent/pull/90948) | 待合并 |
| 小模型工具别名 | [#90942](https://github.com/NousResearch/hermes-agent/pull/90942) | 待合并 |

## 6. 功能请求与路线图信号

**社区呼声较高的功能需求：**

- **[#89995 Expose Bot Mode group chat rooms in web dashboard & gateway](https://github.com/NousResearch/hermes-agent/issues/89995)** — Bot Mode 群聊目前仅 Electron 桌面端可见，Web 仪表盘与网关只暴露 1:1 会话。结合当日多条 Bot Mode 相关 Issue/PR（#90879、#90467），该功能正处在快速演进期，预计会被纳入后续版本。
- **[#23051 Discord adapter: per-guild/per-server configuration](https://github.com/NousResearch/hermes-agent/issues/23051)** — 已开放超 3 个月仍无进展，用户希望按服务器配置 `require_mention` 而非全局统一。
- **[#90713 Make system memory-pressure thresholds configurable](https://github.com/NousResearch/hermes-agent/issues/90713)** — 内存告警与 kanban 调度守卫共用硬编码阈值，ZFS 用户请求支持配置/环境变量覆盖。
- **[#90719 Add a read-only session storage attribution report](https://github.com/NousResearch/hermes-agent/issues/90719)** — 当 `state.db` 异常膨胀时，缺少定位各 Profile/会话存储占用的只读工具。

**架构类路线图信号（出自 @andrexibiza 系列提案）：**

- [#90866 Make observable state proof-carrying from source to side effect](https://github.com/NousResearch/hermes-agent/issues/90866)
- [#90145 Recovery and teardown must be fenced by durable generation identity](https://github.com/NousResearch/hermes-agent/issues/90145)
- [#88683 Make install/update/bootstrap obey one transactional deployment plan](https://github.com/NousResearch/hermes-agent/issues/88683)

三个提案共同指向一个方向：用**持久化 generation/incarnation 身份**统一会话恢复、部署计划与状态发布，一劳永逸地解决当前分散的回归问题。这表明项目正在从"逐 bug 修补"转向"系统化可靠性架构"。

**值得关注的新功能 PR：**

- [#86220 Gemini 3.1 TTS 流式接入 Discord 语音频道](https://github.com/NousResearch/hermes-agent/pull/86220) — P3、needs-decision，功能完整但需决策。
- [#18348 E2B 云沙箱终端后端](https://github.com/NousResearch/hermes-agent/pull/18348) — 已开放 3.5 个月，与现有 Daytona/Vercel 后端接口一致。
- [#90926 Hydrafetch 可选技能](https://github.com/NousResearch/hermes-agent/pull/90926) — 解决 JS 渲染/反爬页面抓取，补充 `web_extract` 盲区。
- [#86140 skip_tool_search_assembly 透传公共构造函数](https://github.com/NousResearch/hermes-agent/pull/86140) — 让使用者可直接获取 eager 工具目录而非 collapsed bridge。
- [#31106 Telegram 可编辑 Todo 清单](https://github.com/NousResearch/hermes-agent/pull/31106) — 将 `todo` 工具结果渲染为 Telegram 内可编辑清单，已开放 3 个月。

## 7. 用户反馈摘要

**最强烈的负面反馈：**

- [#90473](https://github.com/NousResearch/hermes-agent/issues/90473) 中，Windows 11 用户在约 900 条消息的长会话中遭遇 "Show earlier messages" 分页障碍，原话直指设计缺陷："**显示更多消息是哪个傻逼的设计？**"（"Who the hell designed this 'show more messages' thing?"）。该 Issue 标记为 P2、area/sessions，代表真实用户在长会话场景下的核心痛点——分页逻辑割裂、无法自然回溯上下文。

**安装受阻的集体焦虑：**

- [#90687](https://github.com/NousResearch/hermes-agent/issues/90687) 用户报告"8 月 20 日清晨起，所有设备均无法安装 Hermes Agent"，包括全新安装的 Termux。#59877 此前已单独报告 Termux 的 Python 版本冲突，但影响面如今扩大到全平台，用户已明显不安。

**桌面端信任受损：**

- [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) macOS 用户更新后所有 Profile 会话从侧边栏消失；[#90060](https://github.com/NousResearch/hermes-agent/issues/90060) Windows 用户更新后静默崩溃并回退到本地会话，需清除全部 userData 才可恢复。连续两起"更新即损坏"事件，让用户对自动更新机制产生抵触。

**功能需求侧的声音：**

- [#89995](https://github.com/NousResearch/hermes-agent/issues/89995) 用户希望 Bot Mode 群聊能在 Web Dashboard 使用（当前仅桌面端），反映多端一致性的诉求。
- [#90719](https://github.com/NousResearch/hermes-agent/issues/90719) 用户建议提供只读的会话存储归属报告，帮助定位 `state.db` 异常膨胀问题。

## 8. 待处理积压

以下项目长期未获解决或长时间未被合并，建议维护者优先关注：

| 项目 | 创建日期 | 持续时长 | 备注 |
|---|---|---|---|
| [#18348 E2B 云沙箱终端后端 PR](https://github.com/NousResearch/hermes-agent/pull/18348) | 2026-05-01 | ~3.5 个月 | 功能完整、接口与现有后端一致，长期待合并 |
| [#23051 Discord per-guild 配置](https://github.com/NousResearch/hermes-agent/issues/23051) | 2026-05-10 | ~3 个月 | 社区持续有需求，未见进展 |
| [#31106 Telegram 可编辑 Todo 清单 PR](https://github.com/NousResearch/hermes-agent/pull/31106) | 2026-05-23 | ~3 个月 | 依赖 #31001，长期待合并 |
| [#66616 Skills index 持续降级](https://github.com/NousResearch/hermes-agent/issues/66616) | 2026-07-18 | 34 天 | **64 条评论为全仓库最高**，索引构建链路至今未修复，直接影响 /docs/skills 生态 |
| [#59877 Termux Python 版本冲突](https://github.com/NousResearch/hermes-agent/issues/59877) | 2026-07-06 | 46 天 | 未修复且影响面于 8/20 起扩大（见 #90687），建议优先处理 |
| [#86220 Gemini TTS 流式接入 Discord PR](https://github.com/NousResearch/hermes-agent/pull/86220) | 2026-08-14 | 7 天 | 功能丰富但带 needs-decision，需尽快拍板 |

**特别提醒**：#66616 虽为 P3，但 64 条评论说明技能索引可用性对用户生态影响重大；#59877/#90687 同源安装问题已持续 46 天且在扩大影响，二者均建议提升优先级。此外，当日 2 条安全报告（#90702 认证绕过、#90700 信息泄露）尚未有任何修复 PR，考虑到涉及安全边界，建议尽快排期。

---

*本日报由数据自动分析生成，基于 2026-08-21 的 GitHub 仓库快照，所有链接均可跳转至对应 Issue/PR 详情页。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-21

## 1. 今日速览

过去 24 小时内，PicoClaw 项目处于低活跃度状态：无新 Issue 提交/关闭、无新版本发布、无新 PR 创建。当前共有 3 个 PR 处于待合并状态，其中最老的 PR #3315 已积压 18 天并被打上 `[stale]` 标签，说明维护者响应速度有所放缓。不过，这 3 个待合并 PR 分别涉及配置行为修正、上下文管理修复和 Telegram 话题支持增强，若被合并将为项目带来实质性的稳定性提升和功能补全。总体而言，项目活跃度目前处于低频期，但核心维护链路（PR 审查/合并）仍具推进空间。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

**今日无合并或关闭的 PR**。值得关注的是，当前有 3 个待合并 PR，各对应一项明确的改进方向，若审查通过并合并，将分别补强以下方面：

- **修复 LINE 通道配置误导问题**（[PR #3329](https://github.com/sipeed/picoclaw/pull/3329)）— 解决 `webhook_host` / `webhook_port` 声明但未被读取的隐患，避免用户被无效配置误导。对应 Issue #3328。
- **修复 routed-agent 上下文管理**（[PR #3316](https://github.com/sipeed/picoclaw/pull/3316)）— 修复通过 dispatch rules 路由到特定 Discord 通道的 agent 不记忆历史消息、自动压缩（auto-compaction）永不触发的问题。涉及历史记录、摘要、压缩及 seahorse bootstrap 多个环节。
- **支持私有机器人聊天中的话题（Topics）**（[PR #3315](https://github.com/sipeed/picoclaw/pull/3315)）— 扩展 Telegram 话题识别逻辑，使其兼容 `IsTopicMessage` 标记，填补仅支持论坛超群的限制。

这些改进覆盖了配置有效性、多代理记忆一致性和平台兼容性，合并后项目在多通道场景下的可靠性和体验将有明显提升。

---

## 4. 社区热点

今日没有讨论活跃、评论多或高赞的 Issue/PR。当前所有 PR 均处于零评论、零赞状态，社区讨论热度极低，没有形成热点的讨论线程。

---

## 5. Bug 与稳定性

今日没有新报告的 Bug。但两个待合并 PR 直接指向已存在的稳定性与功能性缺陷，按其影响程度排列如下：

| 严重程度 | 描述 | 对应修复 PR |
|---|---|---|
| **高** | **Routed agent 会话不记忆历史消息，自动压缩从不触发**。这会导致通过 dispatch rules 路由到指定 Discord 通道的 agent 在多轮对话中完全失忆，上下文管理机制失效。 | [PR #3316](https://github.com/sipeed/picoclaw/pull/3316)（待合并） |
| **低** | **LINE 通道的 `webhook_host` / `webhook_port` 配置项声明但未被读取**，用户设置后不生效且无任何提示，造成误导。修复方案改为发出警告而非继续"静默播种"。 | [PR #3329](https://github.com/sipeed/picoclaw/pull/3329)（待合并） |

此外，未发现新的崩溃或回归报告。

---

## 6. 功能请求与路线图信号

今日没有新提交的功能请求 Issue，但以下 PR 透露了潜在的功能演进方向：

- **Telegram 私有机器人聊天话题支持**（[PR #3315](https://github.com/sipeed/picoclaw/pull/3315)）— 该改动表明社区用户对 Telegram 平台私有聊天场景的深度支持有明确需求，尤其在启用了 forum topic 模式的机器人上。这是一个增量兼容性增强，不涉及破坏性变更，且有较大概率被纳入下一版本。
- **配置行为规范化**（[PR #3329](https://github.com/sipeed/picoclaw/pull/3329)）— 从"静默播种默认值"改为"显式警告"，体现项目在配置系统上向更透明、更可诊断的方向演进。

结合现有 PR 来看，下一版本可能聚焦于 Telegram 功能补全、多代理上下文管理可靠性以及配置系统的可观测性改进。

---

## 7. 用户反馈摘要

今日没有新的 Issue 评论可供分析。但从已提交 PR 的描述中可以提炼出以下真实用户痛点和使用场景：

- **多代理 + 按频道路由的场景下，上下文失忆是核心痛点**。用户在配置了 dispatch rules 将 agent 路由至特定 Discord 频道后，发现 agent 无法记住同一会话的历史消息，且自动压缩机制完全不触发，即使消息数和 token 数已远超阈值。
- **Telegram 机器人启用话题模式后，私有聊天中的话题无法被正确识别**。用户期望在私有机器人聊天中也能像论坛超群一样区分不同话题并分别维护上下文。
- **配置项存在"假功能"困扰**——LINE 通道的 webhook 配置看似可用但实际上被代码忽略，用户在排查问题时容易走弯路。

以上均属于实际使用中遇到的明确功能缺陷或行为误导，而非模糊的改进愿望，反映出用户对配置可预期性和多平台一致性的高要求。

---

## 8. 待处理积压

以下 PR 长期未获处理，建议维护者优先关注：

| PR | 创建时间 | 等待天数 | 状态 | 说明 |
|---|---|---|---|---|
| [PR #3315](https://github.com/sipeed/picoclaw/pull/3315) | 2026-08-03 | 18 天 | `[stale]` | 支持 Telegram 私有聊天话题，功能增强，代码量小，风险低，已长期搁置 |
| [PR #3316](https://github.com/sipeed/picoclaw/pull/3316) | 2026-08-03 | 18 天 | `[stale]` | 修复 routed-agent 上下文管理失效问题，属高影响 bug 修复 |
| [PR #3329](https://github.com/sipeed/picoclaw/pull/3329) | 2026-08-11 | 10 天 | 待审查 | 修复 LINE 配置误导行为，附有对应 issue #3328 |

其中 PR #3316 和 #3315 已连续多日未更新，且均被标记为 `[stale]`，存在被自动关闭的风险。考虑到 #3316 修复的是一个会显著影响多代理使用体验的高严重度缺陷，建议维护者优先安排审查。另请注意 PR #3329 关联的 Issue #3328 目前仍未在公开 Issue 列表中显示，可能存在可见性问题，建议一并核查。

---

*本日报由 AI 自动生成，数据截至 2026-08-21。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-21

## 1. 今日速览

项目今日活跃度较高：过去 24 小时产生 50 条 PR 更新和 4 条 Issue 更新，核心团队正在主导一轮覆盖 12 个官方技能的深度审计修复（以 #3408 为骨干，12 个 per-skill 修复 PR 堆叠其上），反映了项目对技能生态健康度的系统性投入。最值得关注的用户侧进展是 **一键 Slack Agent 功能已随 #3421 合并落地**，显著降低了接入门槛。社区侧则有两个行为级 Bug 需要关注：#3369（mention-sticky 在未被提及时误触发回复）和 #2715（WhatsApp 媒体文件对 Agent 不可达，已持续两个多月）。今日无新版本发布。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

今日共有 **19 个 PR 合并/关闭**，重点集中在以下几项：

- **[#3421 [已合并] docs+setup: 一键 Slack Agent 上线公告](https://github.com/nanocoai/nanoclaw/pull/3421)** — 在 README 主横幅下新增 "Add Agent to Slack" 引导，用户运行 setup、选择 Slack、"帮我创建" 即可一步完成应用注册、头像与工作区安装。这是降低非技术用户使用门槛的关键一步。

- **[#3408 [开放，核心] 核心技能审计的跨切面修复](https://github.com/nanocoai/nanoclaw/pull/3408)** — 对 12 个核心（非渠道/provider）安装技能在全新环境上逐一实测后，修复了多个 trunk 级缺陷，**包括全部四个 e2e 测试框架的恢复**，并作为基底支撑 12 个 per-skill 修复 PR。这是今日项目健康度提升幅度最大的一项工作。

- **[#3407 [已合并] fix(permissions): 通过常量断言 scope 警告，而非其副本](https://github.com/nanocoai/nanoclaw/pull/3407)** — 消除测试断言与实现间的重复文本耦合，降低未来权限提示变更时的维护断裂风险。

- **[#3406 [已合并] fix(slack-agent-flow): 在 orchestrate.test 中 await 异步 DB helpers](https://github.com/nanocoai/nanoclaw/pull/3406)** — 修复 Slack Agent 编排测试中的异步调用未等待问题，提升测试稳定性。

- **[#2606 [已关闭] bug: engage_mode='always' 静默丢弃所有消息](https://github.com/nanocoai/nanoclaw/issues/2606)** — 此前的行为 Bug 今日关闭，应已通过相关修复解决（详见第 5 节）。

**整体判断**：项目今日向前迈进了"技能体系从部分失效到可验证可用"的一大步——审计修复不仅挽救了 12 个官方技能，还恢复了 e2e 测试基础设施本身。

---

## 4. 社区热点

- **[#3369 [开放] mention-sticky 在未被提及时触发回复](https://github.com/nanocoai/nanoclaw/issues/3369)** — 今日新开 Issue（作者 nilsborg）。当配置 `engage_mode: 'mention-sticky'` + `ignored_message_policy: 'accumulate'` 时，Slack 线程中 agent **从未被提及**也会开始回复。核心矛盾在于 `accumulate` 被文档定义为"静默上下文存储"，但实现中会话行的创建本身构成了订阅关系，导致静默丢失。这触及消息路由语义的深层设计问题。

- **[#2715 [开放] WhatsApp 入站媒体文件对 Agent 不可达](https://github.com/nanocoai/nanoclaw/issues/2715)** — 虽然创建于 6 月 8 日，但 8 月 20 日仍在更新，且直接影响 WhatsApp 渠道的核心体验：媒体保存到未挂载进容器的主机目录，agent 拿到的 `/workspace/attachments/...` 路径在容器内不存在。该 Issue 有一条评论，说明用户侧仍在持续关注。

- **[#3408 [开放] 核心技能审计：跨切面 trunk 修复](https://github.com/nanocoai/nanoclaw/pull/3408)** — 今日讨论与协作最集中的 PR。审计结果相当触目：12 个官方技能中多数存在"文档配置生效"假象（如 add-mnemon 完全失效、add-karpathy-llm-wiki 实际交付零指令、add-clidash 的 UI 自毁式刷新等），围绕此 PR 有 12 个后续修复 PR 等待合并，是社区与核心团队当前协同的核心枢纽。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 问题描述 | Fix PR 状态 |
|---|---|---|---|
| **P1** | [#2715](https://github.com/nanocoai/nanoclaw/issues/2715) | WhatsApp 图片/文档/音频保存到未挂载的主机目录，agent 完全无法访问用户媒体 | 暂无 fix PR |
| **P1** | [#3369](https://github.com/nanocoai/nanoclaw/issues/3369) | mention-sticky + accumulate 组合下，agent 在从未被提及的 Slack 线程中开始回复，行为与文档不符 | 暂无 fix PR |
| **P2** | [#3359](https://github.com/nanocoai/nanoclaw/issues/3359) | Node 26.7.0（Homebrew 当前版本）通过 `check_node` 但 better-sqlite3 11.10.0 无法编译，全新 macOS 用户在 bootstrap 阶段 `deps_failed` 安装失败 | 暂无 fix PR |
| **P2** | [#2606](https://github.com/nanocoai/nanoclaw/issues/2606) | `engage_mode: 'always'` 因 `evaluateEngage()` 缺少该 case 而静默丢弃全部消息 | ✅ 已关闭（修复） |

**稳定性亮点**：#3408 恢复了全部四个 e2e 测试框架，意味着 trunk 的回归防线重新完整。同时 #3406、#3407 两个测试/断言层面的修复已合并，测试基础设施的可靠性在回升。

---

## 6. 功能请求与路线图信号

- **Cursor Agent SDK provider（[#3356](https://github.com/nanocoai/nanoclaw/pull/3356) + [#3355](https://github.com/nanocoai/nanoclaw/pull/3355)）** — zvi-fried 提交了 Cursor Agent SDK 的 payload 支持与 setup 技能（`/add-cursor`）。结合现有 Slack、WhatsApp 等渠道，这表明项目在向更多 Agent 运行时生态扩展，**有较大概率进入下一版本**。

- **per-group base_url 配置（[#3409](https://github.com/nanocoai/nanoclaw/pull/3409)）** — 作为 #3408 审计的衍生特性，将 base_url 提升为按 group 维度配置，提升多环境路由灵活性。属于架构层增强，预计随审计修复合并。

- **add-why 调试技能（[#3189](https://github.com/nanocoai/nanoclaw/pull/3189)）** — 新增工具技能，让用户对单条消息追问"刚才发生了什么"，增强可解释性。已开放 16 天，等待维护者决策。

- **一键 Slack Agent（[#3421](https://github.com/nanocoai/nanoclaw/pull/3421)）** — 已合并，正式进入主流程。下一步大概率会推广到其他渠道（如 WhatsApp 一键接入）。

---

## 7. 用户反馈摘要

- **WhatsApp 媒体不可用是真实痛点**（[#2715](https://github.com/nanocoai/nanoclaw/issues/2715)）：用户发送的图片、文档、音频对 agent 完全隐形，意味着"多模态交互"在 WhatsApp 渠道上实际不可用，属于开箱即坏的体验。该 Issue 从 6 月持续至今，用户侧的耐心可能正在消耗。

- **新用户安装门槛依旧存在**（[#3359](https://github.com/nanocoai/nanoclaw/issues/3359)）：全新 macOS 用户按官方 `nanoclaw.sh` 安装，在依赖编译阶段直接失败。`check_node` 只有版本下限、无上限校验的问题，意味着"新机器、最新环境"反而成为安装障碍——对新用户转化有直接负面影响。

- **Slack 场景的预期错位**（[#3369](https://github.com/nanocoai/nanoclaw/issues/3369)）：NanoClaw 文档承诺 `accumulate` 是"静默上下文"，但实际行为是 agent 会开始主动回复——用户按文档配置、却得到完全相反的行为，信任损伤较大。此类"行为与文档不符"比"未实现功能"更让用户困惑。

---

## 8. 待处理积压

- **[#2715 WhatsApp 媒体不可达](https://github.com/nanocoai/nanoclaw/issues/2715)** — 创建于 2026-06-08，已积压 **74 天**，无 fix PR。渠道核心功能缺陷，建议优先排期。

- **[#3189 add-why 技能 PR](https://github.com/nanocoai/nanoclaw/pull/3189)** — 创建于 2026-08-05，已 **16 天**未合并/未关闭。功能完整且为独立工具技能，风险低、收益明确，需要维护者给出明确决策。

- **[#3408 审计基底 + 12 个 per-skill 修复 PR](https://github.com/nanocoai/nanoclaw/pull/3408)** — 所有 12 个 per-skill PR（#3409–#3420）均处于"待合并"状态，且彼此堆叠。**批量合并时需协调好合并顺序**（先 #3408，再依依赖顺序合入），避免冲突。这是当前最大的合并积压块。

- **[#3359 Node 26 兼容问题](https://github.com/nanocoai/nanoclaw/issues/3359)** — 创建于 08-19，虽仅 2 天，但直接影响新用户安装转化率，且与 `check_node` 的校验逻辑有关，建议在下一个 patch 版本中跟进。

---

*本日报基于 GitHub 公开数据生成，聚焦项目健康度与社区信号，供维护者与贡献者参考。*

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-21

## 今日速览

过去 24 小时项目保持高位活跃：共产生 15 条 Issue 更新（11 条新开/活跃，4 条关闭）和 38 条 PR 更新（23 条待合并，15 条已合并/关闭），并发布了 v1.3.0 稳定版本。核心方向集中在三大主线：**持久化沙箱（#7732）**、**Agent 生命周期钩子（#7770）** 和 **通知中心泛化（#7688 系列）**，对应多个 XL 级 PR 进入待合并队列。稳定性方面有 2 个 bug 修复 PR 今日关闭（#7753、#7761），另有一个高严重度并发写入问题被提出（#7776）但尚未附修复 PR。项目整体健康度良好，版本发布节奏稳定，技术债务清理与功能推进并重。

---

## 版本发布

### ironclaw-v1.3.0（2026-08-19 发布，今日进入日报窗口）
- **链接**: https://github.com/nearai/ironclaw/releases

**更新内容**：
- 将 `1.3.0-rc.2` 正式提升为稳定版，包含 RC2 已验证的升级路径与容器修复。
- 修复了从 1.2 升级时的关键问题：现在可正确接受并保留已发布扩展的 `activation_state` 字段，不再在启动阶段崩溃循环（crash-loop）。
- 完整纳入 RC1 的全部变更范围。

**破坏性变更**：无明确标注，升级路径验证已通过。

**迁移注意事项**：从 1.2.x 升级的用户可安全保留扩展的 `activation_state` 字段，无需手动干预。

---

## 项目进展

今日关闭/合并了 15 条 PR，以下为关键合并：

| PR | 标题 | 类型 | 意义 |
|---|---|---|---|
| [#7751](https://github.com/nearai/ironclaw/pull/7751) / [#7764](https://github.com/nearai/ironclaw/pull/7764) | feat(sandbox): persistent per-user container with Docker Exec | 功能 | **沙箱持久化 Step 1 落地**：将以每次命令创建/销毁容器的模式替换为每个 `(tenant, user)` 一个可复用容器（~40ms 执行延迟），为 #7732 epic 迈出第一步。两条 PR 标题相同，一条已关闭（可能为重复提交或备选实现），另一条已合并。 |
| [#7753](https://github.com/nearai/ironclaw/pull/7753) | fix(capabilities): preserve terminal dispatch records | Bug 修复 | 修复派发失败时能力调用状态被提前清除、导致无法生成必需的持久化 `Failed` 终态边的问题；移除 `discard_pending` 逃生舱。 |
| [#7761](https://github.com/nearai/ironclaw/pull/7761) | fix(runtime): bound provider diagnostic stack footprint | Bug 修复 | 通过共享 `DispatchAuthRequirement` 并在三个真实错误边界装箱，约束 provider 认证错误栈体积，保持敏感信息与诊断信息不被截断。 |
| [#7759](https://github.com/nearai/ironclaw/pull/7759) | chore(agents): refresh codebase knowledge graph | 维护 | CI 机器人夜间刷新代码库记忆快照，保持 agent 辅助开发的知识库与默认分支同步。 |

**综合评估**：沙箱持久化是 v1.4.0 的核心 epic（#7732）的第一块拼图，已在今日落地；另有 2 个稳定性修复关闭，整体向前推进了半个版本周期的关键功能。

---

## 社区热点

### 最热 Issue：**#7732** — Epic: Persistent per-user sandbox with iron-proxy（8 条评论）
- https://github.com/nearai/ironclaw/issues/7732
- 属于 v1.4.0 范围，讨论围绕当前 `builtin.shell` 的局限：每次命令创建/销毁容器、`/workspace` 按 `(tenant, user)` 持久化策略等。今日已有配套 PR（#7751/#7764）合入，说明该 epic 已从讨论进入实施阶段。

### 次热 Issue：**#7770** — Epic: hook the agent lifecycle（1 条评论）
- https://github.com/nearai/ironclaw/issues/7770
- 提出将 `ironclaw_hooks` 扩展至 agent 生命周期的 after-turn、before-turn、compaction、tool-result 等节点。作为新开 epic 即获得配套 PR（#7765），社区/核心团队反应迅速。

### 值得注意的 PR 活跃信号
- **#7729**（Automations run-now，XL）与 **#7699/#7698/#7700**（通知中心三连，均为 XL）长期保持 open 并持续更新，是当前正在密集推进的大型功能块。

**诉求分析**：社区与核心团队当前最关心的是**基础设施体验**——沙箱持久性、生命周期可编程性、通知可操作性。这说明项目正从“功能可用”向“体验完整”过渡。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| **高** | [#7776](https://github.com/nearai/ironclaw/issues/7776) | `memory.write`（`append: false`）存在读-改-写竞态：CAS 只能防撕裂写，无法防并发覆盖。全文档重写可能静默丢失并发写入。由 #7765 评审发现。 | 待修复，尚无 fix PR |
| **中** | [#7769](https://github.com/nearai/ironclaw/issues/7769) | Configure 界面只处理 Hosted MCP 认证选择阻塞项，其他扩展安装 blocker 可能被丢弃，导致界面误报“无需配置”。 | 已有 PR #7772（open） |
| **中** | [#7767](https://github.com/nearai/ironclaw/issues/7767) | Automation presenter 日期测试在 `Asia/Shanghai` 等时区下失败，假设浏览器本地格式化使用 UTC。 | 已有 PR #7774（open） |
| **低** | [#7760](https://github.com/nearai/ironclaw/issues/7760) | `AgentTurnProcessStateMetadata::from_state` 中故意丢弃 subagent 谱系（lineage），但代码未被显式固定/加注释保护。 | 待处理，无 PR |
| **低** | [#5998](https://github.com/nearai/ironclaw/issues/5998) | 本地 MCP 服务器无可用传输层：`stdio` 被拒、`http://127.0.0.1` 被安全策略阻止。 | 存活 41 天，仅 1 条评论，未修复 |

**今日已关闭的修复**：#7753（终端派发记录保留）、#7761（provider 诊断栈足迹收敛）。

---

## 功能请求与路线图信号

### 明确进入 v1.4.0 路线图
- **#7732** — 持久化 per-user 沙箱 + iron-proxy（今日 Step 1 已合入）
- **#7044** — 渠道优先的引导体验（今日已关闭，后端部分 #6993 同步关闭，说明该 epic 相关实现已收尾）

### 新提出的高潜力方向
- **#7770** — Agent 生命周期钩子（after-turn/before-turn/compaction/tool-result），已有 Phase 1 PR（#7765），且 #7775 是其直系 follow-up，**极可能进入 v1.4.0 或紧随其后**。
- **#7762**（来自新贡献者 jpdevries）— 修复无认证 MCP 服务器静态工具的网络策略 allowlist 为空的问题，属于安全边界补强，合并概率高。
- **#7729** — run-now 手动触发自动化，跨 trigger domain + WebUI，XL 级功能，已在 review 中。

### 信号判断
社区对**沙箱持久化**和**生命周期扩展**的呼声最高，这两者也将是 v1.4.0 的主要卖点。内存插件化（#7661）与通知中心（#7698-7700）作为平行能力，预计在 v1.3.x 系列中陆续落地。

---

## 用户反馈摘要

- **沙箱体验痛点（#7732 评论）**：用户指出当前每次 shell 命令都创建/销毁容器，`/workspace` 按 `(tenant, user)` 隔离，但缺乏持久性统一视图。核心团队回应积极，今日已插入 Step 1 实现。这表明**开发体验的“可持久性”是用户最关心的痛点之一**。
- **本地开发受限（#5998）**：用户明确表示“本地 MCP 服务器无法使用任何传输方式”，该 issue 已存活 41 天、仅 1 条评论，说明虽被记录但关注度低。这可能是本地/边缘开发场景的长期阻塞点。
- **基准失败归因（#7771）**：用户 pranavraja99 发起每日失败分类报告，指出 officeqa 套件 58 项失败中大部分是模型质量问题（DeepSeek-V4-Flash agent 导航典型场景失败），而非框架 bug。这是健康的信号——将失败归因从框架移向模型能力。
- **时间/地区差异问题（#7767）**：非 UTC 时区（如上海）下的测试失败暴露了团队对非 UTC 用户环境的覆盖不足，但修复 PR 已在同日提出，响应积极。

---

## 待处理积压

| 项目 | 类型 | 存活时长 | 备注 |
|---|---|---|---|
| [#5998](https://github.com/nearai/ironclaw/issues/5998) — 本地 MCP 传输不可用 | Issue | 41 天 | 无 assignee、无 fix PR、仅 1 评论，建议关注或标记为 later |
| [#7038](https://github.com/nearai/ironclaw/issues/7038) — Storybook + AI-first Design System epic | Epic | 18 天 | 提案完整（有 PR #7257），但无近期动态，需确认排期 |
| [#7491](https://github.com/nearai/ironclaw/pull/7491) — omp core-tool contract + engines（XL） | PR | 10 天 | 长期 open 未合并，涉及崩溃性工具面变更，需要维护者决策 |
| [#7661](https://github.com/nearai/ironclaw/pull/7661) — MCP-backed memory provider（XL） | PR | 7 天 | 内存插件化的关键 PR，持续更新中但未接近合并 |
| [#7699](https://github.com/nearai/ironclaw/pull/7699) / [#7698](https://github.com/nearai/ironclaw/pull/7698) / [#7700](https://github.com/nearai/ironclaw/pull/7700) — 通知中心三连 | PR x3 | 4 天 | 均为 XL，彼此依赖，建议合并时统一 review 避免冲突 |

---

*本日报基于 GitHub 公开数据自动生成，仅供参考。链接均指向原始 Issue/PR 页面。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-21

> 数据来源：github.com/netease-youdao/LobsterAI | 统计周期：2026-08-20 ~ 2026-08-21

---

## 1. 今日速览

📊 **今日项目状态：开发推进积极，合并效率高，但 Issue 关闭停滞**

过去 24 小时，LobsterAI 在 PR 处理方面表现活跃：**7 条 PR 更新中有 6 条已完成合并/关闭，仅 1 条待合并**，修复了 Agent 技能徽章同步、macOS 打包失败、Agent 切换回退等多个稳定性问题，并落地了文件卡片预览、设置面板搜索等体验优化。同时，**2 条老 Issue 出现新动态**（均为 4 月创建、当前被标记 `[stale]`），但全部仍处于开启状态，Issue 关闭率为 0%。**无新版本发布**。整体活跃度呈"开发端高、维护响应端偏低"的分化状态，建议关注 Issue 积压问题。

---

## 2. 版本发布

📦 今日无新版本发布。项目处于常规开发与合并冲刺周期中。

---

## 3. 项目进展

今日 **6 条 PR 已合并/关闭**，覆盖功能迭代与稳定性修复两大方向，项目整体推进了以下关键能力：

### 3.1 核心功能落地

| PR | 类型 | 内容摘要 |
|----|------|---------|
| [#1553](https://github.com/netease-youdao/LobsterAI/pull/1553) `[已合并]` | ✨ 功能 | **Write 工具文件卡片 + 分屏预览面板**。为 AI 产物（Markdown/HTML/SVG/图片/代码）提供内联文件卡片和可拖拽宽度预览面板（320-900px），支持 Markdown 渲染、HTML 沙箱 iframe、语法高亮等。直接关闭 Issue #1552 |
| [#1557](https://github.com/netease-youdao/LobsterAI/pull/1557) `[已合并]` | ✨ 功能 | **设置面板侧栏搜索筛选**。在设置弹窗左侧栏增加搜索框，支持中英文关键词按空格分词 AND 匹配、NFKC 规范化、选中 Tab 被过滤时自动切换、无匹配空态提示 |
| [#1546](https://github.com/netease-youdao/LobsterAI/pull/1546) `[已合并]` | ✨ 功能 | **引擎启动超时操作面板**。启动超过 30 秒后自动显示"取消启动"和"查看日志"按钮，避免用户卡死在 5 分钟硬超时窗口中，提供逃逸出口 |

### 3.2 稳定性修复

| PR | 类型 | 内容摘要 |
|----|------|---------|
| [#1560](https://github.com/netease-youdao/LobsterAI/pull/1560) `[已合并]` | 🐛 修复 | 修复 Agent 编辑后点击原 Agent 无法切换回聊天界面的问题（根因：`handleSwitch` 中相同 agentId 直接 return，未调用 `onShowCowork()`） |
| [#1545](https://github.com/netease-youdao/LobsterAI/pull/1545) `[已合并]` | 🐛 修复 | 修复 Agent 技能列表保存后 Active Skill Badges 不立即更新的问题（根因：Redux 更新 `skillIds` 时未同步 `activeSkillIds`），修复 Issue #1502 |
| [#1555](https://github.com/netease-youdao/LobsterAI/pull/1555) `[已合并]` | 🐛 修复 | 修复 `npm run dist:mac:x64` 打包失败（根因：macOS 不支持 `sha256sum`，在构建脚本中加入 `shasum` 兼容） |

> **积木搭建评估**：今日合并的 PR 覆盖面广，从 Agent 配置体验、AI 产物预览到构建链路均有触及。特别值得关注的是 **#1553 完整实现了 #1552 的功能请求**，完成了从用户需求到落地交付的闭环。同时，4 个 bug 修复中有 3 个属于历史遗留问题，项目的技术债清理正在推进。

---

## 4. 社区热点

### 🔥 热点 1：AI 产物 Markdown 预览与文件卡片（Issue #1552 ↔ PR #1553）

- **Issue**: [#1552](https://github.com/netease-youdao/LobsterAI/issues/1552) — 创建于 2026-04-08，今日仍保持活跃
- **PR**: [#1553](https://github.com/netease-youdao/LobsterAI/pull/1553) — 今日已合并

**诉求拆解**：当 Agent 通过 Write 工具创建 Markdown、HTML 等文件后，用户无法在应用内直接预览。现有替代方案存在明显痛点：让 Agent 用 Read 读全文贴到聊天（**大量占用对话空间**）或手动切到文件管理器（**打断工作流**）。该需求在写作、文档生成等场景下呼声较高，**从 Issue 提出到 PR 合并历时约 4 个月**，说明功能具有一定的复杂度，但也揭示了用户对 Agent 产物即时预览的刚性需求。

### 🔥 热点 2：IM 机器人配置指南 404（Issue #1556）

- **链接**: [#1556](https://github.com/netease-youdao/LobsterAI/issues/1556)
- **动态**：今日有新增评论，说明该问题持续影响用户

**诉求分析**：用户访问 `lobsterai.youdao.com` 上的 IM 机器人配置指南时遇到 **404 错误**。该 Issue 自 4 月 8 日创建至今已超过 4 个月仍未关闭，期间被标记为 `[stale]`。作为一个文档链接问题，修复成本应该较低，但长期未解决，可能对 IM 机器人功能的新用户 onboarding 产生持续不良影响。

---

## 5. Bug 与稳定性

今日报告的 Bug/稳定性问题共 **5 项**（含已修复），按严重程度排列如下：

| 严重度 | 问题 | 状态 | 链接 |
|--------|------|------|------|
| 🟠 中 | **定时任务通知渠道无法改回"不通知"**：用户将通知渠道从 IM 改为"不通知"并保存后，再次编辑仍显示之前的 IM 渠道。根因来自 commit `61cfe60` 的历史 bug，涉及 `delivery.mode` 与表单初始化逻辑不一致 | 🩹 已有修复 PR [#1547](https://github.com/netease-youdao/LobsterAI/pull/1547)，**待合并** | [Issue → PR](https://github.com/netease-youdao/LobsterAI/pull/1547) |
| 🟡 中低 | **macOS x64 打包失败**：`npm run dist:mac:x64` 无法产出安装包，根因是 macOS 不支持 `sha256sum` | ✅ 已修复，PR [#1555](https://github.com/netease-youdao/LobsterAI/pull/1555) 已合并 | — |
| 🟡 中低 | **Agent 编辑后无法切换回聊天界面**：编辑某个 Agent 后，点击已选中的 Agent A 无法回到聊天界面 | ✅ 已修复，PR [#1560](https://github.com/netease-youdao/LobsterAI/pull/1560) 已合并 | — |
| 🟢 低 | **Agent 技能徽章不即时更新**：保存技能配置后需手动切换 Agent 才能看到新的 Active Skill Badges | ✅ 已修复，PR [#1545](https://github.com/netease-youdao/LobsterAI/pull/1545) 已合并 | — |
| 🟢 低 | **IM 机器人配置指南链接 404**：官方文档链接失效 | ❌ 无修复 PR，Issue [#1556](https://github.com/netease-youdao/LobsterAI/issues/1556) 仍开启 | — |

> **稳定性评估**：今日 4 个 bug 已完成修复并合并，修复速度较快。**唯一积压风险是 PR #1547**——定时任务通知渠道 bug 的修复已被提出，但尚未合并。该问题影响表单交互且属于数据回显错误，建议尽快完成 code review 并合并。

---

## 6. 功能请求与路线图信号

今日出现的功能需求信号主要指向 **"AI 产物可视化与可操作"** 和 **"配置面板可用性"** 两个方向：

| 功能需求 | 来源 | 当前状态 | 下一版本信号 |
|----------|------|---------|-------------|
| **AI 产物 Markdown 预览 + 文件卡片** | Issue [#1552](https://github.com/netease-youdao/LobsterAI/issues/1552) | ✅ PR #1553 已合并，功能已落地 | **已确认纳入近期版本（实际已实现）** |
| **设置面板搜索筛选** | PR [#1557](https://github.com/netease-youdao/LobsterAI/pull/1557) | ✅ 已合并 | **已确认可用** |
| **引擎启动失败逃生通道**（取消启动 / 查看日志） | PR [#1546](https://github.com/netease-youdao/LobsterAI/pull/1546) | ✅ 已合并 | **已确认可用** |
| **定时任务通知渠道修复**（回归到"不通知"） | PR [#1547](https://github.com/netease-youdao/LobsterAI/pull/1547) | 🔶 待合并 | 代码已就绪，合并后进入下一版本 |

**路线图观察**：从今日合并的 PR 来看，LobsterAI 当前开发重点偏向 **Agent 交互体验的完善**（文件卡片、预览面板、设置搜索、引擎状态反馈），而非全新的架构级功能。这说明项目可能正处于上一阶段大功能（如 Agent/Cowork 能力）交付后的"体验打磨期"。

---

## 7. 用户反馈摘要

从今日活跃的 Issues 评论中提炼真实用户反馈：

### 😣 痛点反馈

> **"无法在应用内直接预览文件，让 Agent 用 Read 读取并把全文贴到聊天中，会占用大量对话空间。"**
> —— Issue [#1552](https://github.com/netease-youdao/LobsterAI/issues/1552) 用户 `noransu`

该反馈指向 AI 编程/写作工具中的典型工作流断裂：生成产物后缺少即时反馈闭环。用户期望 **"Write 工具完成后始终可见地展示文件卡片"**，无需展开工具调用详情即可操作文件。同时用户也提到，**Read 工具应保持标准结果摘要展示**，避免批量读取时产生大量卡片视觉干扰——说明用户对"少即是多"的 UI 有明确预期。

### 📄 文档 / 上手体验反馈

> **"IM 机器人配置指南 404"**
> —— Issue [#1556](https://github.com/netease-youdao/LobsterAI/issues/1556) 用户 `darkSheep404`

用户通过官方文档链接访问 IM 机器人配置指南时遇到 404。由于该 Issue 自 4 月以来持续未解决，可推测有部分用户因文档失效而影响了 IM 机器人的配置上手体验。

### ✅ 值得注意的正面反馈

今日没有明确的用户表扬正面反馈，但从 PR 层面看，**用户主导提交的 PR 占比高**（7 条 PR 中 7 条全部来自非核心维护者），说明外部贡献者/重度用户对项目有较高的参与热情。

---

## 8. 待处理积压

### ⚠️ 高优先级

| 类型 | 条目 | 状态 | 积压时长 | 建议 |
|------|------|------|---------|------|
| 🔶 PR | [#1547](https://github.com/netease-youdao/LobsterAI/pull/1547) [fix(scheduledTask)] 定时任务通知渠道无法改回"不通知" | OPEN，待合并 | 创建于 2026-04-07，已超 4 个月 | **积压风险最高**。修复代码已完备（+2 行/-0 行），但长期未合并，相关 bug 持续影响用户。建议尽快完成 review |
| 🔴 Issue | [#1556](https://github.com/netease-youdao/LobsterAI/issues/1556) IM 机器人配置指南 404 | OPEN，已标记 `[stale]` | 创建于 2026-04-08，已超 4 个月 | 文档链接失效修复成本极低，建议直接响应关闭 |

### 🟡 中优先级

| 类型 | 条目 | 状态 | 积压时长 | 建议 |
|------|------|------|---------|------|
| 🟡 Issue | [#1552](https://github.com/netease-youdao/LobsterAI/issues/1552) AI 产物 Markdown 预览及文件卡片支持 | OPEN，已标记 `[stale]` | 创建于 2026-04-08 | 功能已被 PR #1553 实现，**Issue 应在 #1553 合并后由维护者确认关闭**。当前仍处于 OPEN 状态，容易造成"需求未实现"的误导 |

### 📋 结构性关注点

- **全部 7 条 PR 均被标记 `[stale]`**，说明仓库的 stale bot 判定规则较为激进，或维护者响应周期较长。建议审视 stale bot 的配置阈值，避免"标签噪音"干扰真实积压判断。
- 今日 2 条活跃 Issue 均为 4 月创建、今日才产生新动态，**中间存在约 4 个月的静默期**，建议维护者对长周期存活的 Issue 进行定期扫描。

---

**报告整体评估**：LobsterAI 今日在代码合并能力上表现扎实，6 条 PR 高质量落地；但 Issue 关闭和 PR #1547 的搁置反映了维护端存在响应延迟。建议下阶段关注：**① 合并 #1547 清除积压 fix；② 主动关闭 #1552 避免需求状态误导；③ 低成本修复 #1556 文档 404**。总体项目健康度：**良好偏上，开发活跃度 ⭐⭐⭐⭐，维护响应 ⭐⭐⭐**。

---

*本报告由 LobsterAI 开源项目分析师自动生成，数据截至 2026-08-21。*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 — 2026-08-21

## 1. 今日速览

过去24小时项目保持稳定迭代节奏：1个安全相关 Issue（#1177，CWE-306）已通过 PR #1216 修复并关闭，标志着高风险漏洞闭环；24小时内有 6 条 PR 更新，其中 4 条已合并/关闭、2 条待合并，合并率较高；同时发布了新版本 20260820.01。整体活跃度健康，修复集中在 WhatsApp 渠道体验与安全加固方向，无新增 Bug 报告。

## 2. 版本发布

**v20260820.01**（2026-08-20 发布）

本次版本发布紧随多个修复 PR 合并节点，推测包含以下方向（具体变更日志未随数据提供）：

- **Vault 解锁/恢复端点鉴权修复**（对应 PR #1216，详情见下文"项目进展"）
- **WhatsApp 渠道多项修复**（push name 不再硬编码、群组回复识别、Markdown 渲染等）
- **工具调用策略可配置性改进**（untrusted-turn 天花板）

> ⚠️ **迁移注意**：由于 `POST /api/auth/vault/unlock` 和 `POST /api/auth/vault/recovery` 新增了身份验证要求，依赖无鉴权调用这些端点的客户端或自动化脚本需要更新为携带有效会话凭证。此变更为安全加固所需，建议尽快适配。

## 3. 项目进展

今日合并/关闭的 4 个 PR 从安全、渠道体验、配置灵活性三个维度推进了项目：

| PR | 标题 | 状态 | 影响 |
|---|---|---|---|
| [#1216](https://github.com/moltis-org/moltis/pull/1216) | fix(httpd): require authentication for vault unlock and recovery | 已合并 | 🔴 修复严重安全漏洞 CWE-306：Vault 解锁/恢复端点原本完全免鉴权，任何人都可远程暴力破解，现在已接入 `AuthSession` 校验 |
| [#1217](https://github.com/moltis-org/moltis/pull/1217) | fix(whatsapp): treat a reply to the bot as addressing it | 已合并 | 🟢 修复群组场景下"回复"消息不被识别为 @ 提及的问题，提升 WhatsApp 群聊交互准确性 |
| [#1218](https://github.com/moltis-org/moltis/pull/1218) | fix(whatsapp): stop hardcoding the push name to "Moltis" | 已合并 | 🟢 移除硬编码的 push name，使 bot 在 WhatsApp 中以配置的身份名称显示（如"Ada"），而非统一显示为"Moltis" |
| [#1219](https://github.com/moltis-org/moltis/pull/1219) | fix(channels): make the untrusted-turn tool ceiling configurable | 已合并 | 🟡 使非可信会话的默认工具策略可配置，修复了共享渠道中公共听众工具被误删的问题，恢复工具策略第 4/5 层的可达性 |

**整体推进**：安全漏洞快速闭环（从 Issue #1177 报告到修复合并约 3 周），WhatsApp 渠道体验集中改善，同时工具策略体系向可配置化演进，项目正朝着更成熟、更安全的 AI 助手方向稳步前进。

## 4. 社区热点

今日数据中无高讨论量或高赞 Issue/PR，属于正常日常排期状态。即便如此，有两个值得注意的信号：

- **[PR #1220](https://github.com/moltis-org/moltis/pull/1220)**（fix(whatsapp): render Markdown in outbound messages，作者 rubenssoto）是今日新开且尚待合并的 PR，处于活跃审查期。该 PR 为 WhatsApp 外发消息添加 Markdown 到 WhatsApp 原生格式的转换，覆盖正文和媒体标题，同时保留会话历史与 Web UI 中的原始 Markdown，实现精细分层渲染。

- **[Issue #1177](https://github.com/moltis-org/moltis/issues/1177)** 虽然是安全漏洞，但今天因修复合并而关闭。该 Issue 关注的 Vault 端点鉴权缺失问题实际上回应了自托管 AI 助手用户对数据安全的普遍关切——任何暴露在公网上的实例都可能受到攻击。

## 5. Bug 与稳定性

今日无新增 Bug 报告。以下为已修复问题的最终状态确认：

| 严重程度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 严重（安全） | [#1177](https://github.com/moltis-org/moltis/issues/1177) | Vault 解锁/恢复端点缺少鉴权（CWE-306），任何未认证的远程调用者都可尝试暴力破解 Vault | ✅ 已由 [PR #1216](https://github.com/moltis-org/moltis/pull/1216) 修复并关闭 |
| 🟡 中等 | 无独立 Issue | WhatsApp 群组中回复消息被忽略（mention_mode=mention 时） | ✅ 已由 [PR #1217](https://github.com/moltis-org/moltis/pull/1217) 修复 |
| 🟢 轻微 | 无独立 Issue | WhatsApp push name 硬编码为"Moltis"，与实际 bot 名称不符 | ✅ 已由 [PR #1218](https://github.com/moltis-org/moltis/pull/1218) 修复 |
| 🟡 中等 | 无独立 Issue | Windows 下 shell hooks 因缺少 `sh -c` 而失败 | 🕐 修复中，见 [PR #468](https://github.com/moltis-org/moltis/pull/468)（待合并） |

值得肯定的是：未发现新的回归问题，安全漏洞在 24 小时内完成了闭环处理。

## 6. 功能请求与路线图信号

- **WhatsApp Markdown 渲染**（[PR #1220](https://github.com/moltis-org/moltis/pull/1220)）：将模型生成的 Markdown 自动转换为 WhatsApp 原生格式，这直接改善了 WhatsApp 渠道的用户阅读体验。鉴于该 PR 刚提交且目标明确，极有可能在下一版本中合入。

- **Windows 原生 shell 钩子支持**（[PR #468](https://github.com/moltis-org/moltis/pull/468)）：从 3 月延续至今，使用 `cmd.exe /C` 替代 `sh -c` 执行 shell hooks，为 Windows 用户扫清障碍。该 PR 今日有更新，测试已在 Windows 10 验证通过，合入概率增大。

- **工具策略可配置化**（[PR #1219](https://github.com/moltis-org/moltis/pull/1219) 已合并）：将 untrusted-turn 的工具策略从硬编码改为可配置，这暗示项目正在往更灵活的权限体系演进，未来可能支持按渠道、按会话类型自定义工具使用策略——这是面向多租户/复杂部署场景的重要基础。

## 7. 用户反馈摘要

今日 Issue/PR 的评论数据较少，但可以从提交内容与问题描述中提炼以下用户真实诉求：

- **自托管安全诉求强烈**：Issue #1177 的提交者明确报告了未鉴权的 Vault 端点问题，这是自托管部署用户最核心的痛点——AI 助手中存储的会话数据、密钥、恢复码都可能被外部访问。修复后项目需要引导用户升级并更新相关调用方式。

- **WhatsApp 身份与交互不能"千篇一律"**：问题指出所有 bot 在 WhatsApp 中都显示为"Moltis"，意味着用户配置的个性化身份（如"Ada"）在群聊场景中被抹平，这不符合用户对 bot 品牌化和个性化呈现的期待。

- **群聊交互需要符合用户直觉**：用户会自然地将"回复某条消息"视为对发送者的定向对话，这种交互方式在 WhatsApp 用户习惯中根深蒂固。修复后群聊中的对话上下文将更完整、更符合直觉。

## 8. 待处理积压

| 项目 | 类型 | 创建时间 | 状态 | 说明 |
|---|---|---|---|---|
| [PR #468](https://github.com/moltis-org/moltis/pull/468) | PR | 2026-03-23（已近 5 个月） | 待合并 | Windows shell hooks 修复，功能完整且测试通过（Windows 10 + CI），长时间未合入可能影响 Windows 用户采用率。今日有更新，建议维护者尽快安排 review 并合入。 |
| [PR #1220](https://github.com/moltis-org/moltis/pull/1220) | PR | 2026-08-20 | 待合并 | 新提交的 WhatsApp Markdown 渲染功能，需尽快 review 避免与 #1217/#1218 的 WhatsApp 改动产生冲突。 |
| 无未关闭的待响应 Issue | — | — | — | 当前 Issue 积压清理较干净，未发现超过 7 天未响应的用户反馈。 |

---

*报告生成时间：2026-08-21 | 数据来源：Moltis GitHub 仓库*
*项目健康度评估：🟢 良好 —— 安全漏洞快速闭环，PR 合并率高，无新增 Bug 积压，仅存在少量待审 PR。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-21

> 数据来源：GitHub（agentscope-ai/QwenPaw），统计窗口为过去 24 小时。
> 注：原仓库名为 QwenPaw，本项目日报沿用你提供的开源项目名称 CoPaw。

---

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：共产生 77 条更新（Issues 27 条、PR 50 条），净增功能与修复请求密集，同时发布了 v2.1.1-beta.1 预发布版本。社区反馈集中在 **agent 自主执行中断**（规划后停住、长时间冻结、流式中断）和**存储/历史数据失控**（history.db 膨胀至 7.6G）两大稳定性问题上，尚未看到对应修复合入。开发侧则持续推进性能优化（驱动并发初始化、长会话控制台性能）、安全加固（依赖漏洞修补、envs 原子写入、master key 权限）与功能扩展（市场统一、artifacts 展示、Hub 多用户版）。总体来看，**功能迭代速度很快，但核心 agent 稳定性仍是当前最突出的短板**，需要维护者优先投入。

---

## 2. 版本发布

### v2.1.1-beta.1（Beta）
发布链接：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.1-beta.1

**更新内容：**
- `feat(console):` 改进编辑器标签页溢出导航
- `fix(providers):` 降低 rate limiter 初始化日志级别
- `chore:` 更新发布说明

**破坏性变更：** 无。
**迁移注意：** 该版本为小步 beta 修复，不涉及配置格式或数据迁移。配套的安装验证 Issue（#7180）截止时间为 2026-08-20 18:43 UTC，目前已过截止时间，**需要维护者确认各平台验证是否全部通过**。

---

## 3. 项目进展

过去 24 小时共合并/关闭 29 个 PR，以下为代表性合并项：

| PR | 类型 | 内容 | 价值评估 |
|---|---|---|---|
| [#7174](https://github.com/agentscope-ai/QwenPaw/pull/7174) | perf | 持久化驱动在工作区启动时**并发初始化** | 降低冷启动时间，保持故障隔离 |
| [#7161](https://github.com/agentscope-ai/QwenPaw/pull/7161) | feat | Console 助手回复卡片新增 **artifacts 展示** | 让用户更直观看到任务产出物 |
| [#7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) | fix | **envs.json 损坏时不再静默覆盖**，改为保留原文件并原子写入 | 修复环境变量静默丢失问题，数据安全关键修复 |
| [#7172](https://github.com/agentscope-ai/QwenPaw/pull/7172) | deps | 修补 website 与 creator 的 **vite/rollup/react-router-dom/js-yaml** 漏洞 | 修复任意文件读取等安全告警 |
| [#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880) | feat | 统一 **apps/plugins/skills 市场**到同一 `/market` 页面 | 控制台信息架构整合 |
| [#7166](https://github.com/agentscope-ai/QwenPaw/pull/7166) | fix | qwenpawmail MCP 以**独立 sidecar** 形式打包进发布物 | 修复 frozen build 中邮件 MCP 不可用的问题 |
| [#6371](https://github.com/agentscope-ai/QwenPaw/pull/6371) | fix | 文件下载器超时后**正确切换到下一个 fallback**（wget→curl→urllib） | 修复下载链路完整性 |

**整体判断：** 团队在“稳定性加固 + 安全补漏 + 控制台体验统一”三个方向同步推进，7 个已合入 PR 中有 4 个属于修复类，说明质量保障仍是重点。

---

## 4. 社区热点

| Issue | 评论数 | 状态 | 核心诉求 |
|---|---|---|---|
| [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) | 10 | OPEN | Agent 输出“现在做 2.1、3.1、3.2”等计划后**无提示停止**，必须手动说“继续”才继续 |
| [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) | 9 | CLOSED | 使用 GLM 5.3 时 **QwenPaw 冻结超过 10 分钟**，无任何 token 输出，thinking 也卡住 |
| [#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) | 6 | CLOSED | 所有任务产出物全部堆积在 `media/` 目录，**希望按任务分目录存放** |
| [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) | 4 | OPEN | **自动模型路由**：简单请求走小模型，图片走视觉模型，困难任务走大模型 |
| [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 4 | CLOSED | 助手消息结束时间显示异常（实际思考 2 分钟，页面显示几秒） |

**热点分析：** 今日排名靠前的 Issue 呈现一个共同特征——**用户对 agent 自主执行连续性有很高期待**。#6921 是最典型代表：模型“已经把计划想好了但没有动手做”，暴露了 agent 在计划→行动链路中的可靠性缺陷。结合 #7102 的长时间无响应，用户核心诉求是“**让模型真正从头干到尾，不要中途停下等我发号施令**”。此外 #6643 的关闭说明官方已响应产出物组织问题。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高严重度

| 问题 | 状态 | 说明 |
|---|---|---|
| [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) Agent 计划后停止，需手动“继续” | OPEN | 影响所有多步任务的连贯执行，一周以上无修复 PR，**社区反馈最强烈** |
| [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) 网络短暂中断后无法自动恢复 | OPEN | 所有 LLM 请求持续 `httpx.ConnectTimeout`，必须重启进程，**运维负面影响大** |
| [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) history.db 膨胀至 7.6G | OPEN | `ToolResultCapMiddleware` 将完整工具输出反复落库，**存储失控**，长期运行不可持续 |
| [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) GLM 5.3 下冻结超过 10 分钟 | CLOSED | 用户已尝试绕过，但根本原因需确认是否已在 beta 修复 |

### 🟡 中严重度

| 问题 | 状态 | 说明 |
|---|---|---|
| [#7118](https://github.com/agentscope-ai/QwenPaw/issues/7118) envs.json 损坏后静默丢失全部环境变量 | **CLOSED，已有 [PR #7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) 合并** | 数据丢失风险已修复 |
| [#7156](https://github.com/agentscope-ai/QwenPaw/issues/7156) embedding health check 超时且 timeout 硬编码 | OPEN | 有 WIP PR [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) 正在补充可配置超时 |
| [#7162](https://github.com/agentscope-ai/QwenPaw/issues/7162) 流式输出中途 ReadError 不重试 | CLOSED | 根因已定位为 `_get_httpx_retryable()` 漏掉 `ReadError`，建议确认修复版本 |
| [#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110) 无法下载的图片链接导致整个会话不可用 | CLOSED | 用户仅能用 `/clear` 恢复，需确认修复方式 |

### 🟢 低严重度

| 问题 | 状态 | 说明 |
|---|---|---|
| [#7060](https://github.com/agentscope-ai/QwenPaw/issues/7060) view_video 内联 2MB 硬编码 | CLOSED，已有 [PR #7061](https://github.com/agentscope-ai/QwenPaw/pull/7061) 修复 | 视频工具结果现在能进入 OpenAI Responses API 上下文 |
| [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) 助手消息结束时间显示异常 | CLOSED | 前端展示错误，影响较小 |

---

## 6. 功能请求与路线图信号

### 可能进入下一版本（已有对应 PR 在推进）

- **WorkSpace 级 always-on 技能**：[Issue #7182](https://github.com/agentscope-ai/QwenPaw/issues/7182) + [PR #7183](https://github.com/agentscope-ai/QwenPaw/pull/7183) —— 为专业 agent 预载常驻技能到 system prompt，提升首次决策前的记忆力
- **记忆系统升级**：[PR #7133](https://github.com/agentscope-ai/QwenPaw/pull/7133)（ReMe 0.4.1.8，支持可配置超时）、[PR #7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)（PowerContext 可插拔记忆后端，Under Review）—— 记忆方向是当前开发重点
- **会话级思考模式**：[PR #7163](https://github.com/agentscope-ai/QwenPaw/pull/7163) —— 新增 Off/Low/Medium/High 四档思考级别，按会话持久化

### 社区呼声高但尚无 PR

- **自动模型路由**：[#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436)（2026-07-24 提出，至今无 PR）—— 按请求难度动态选择模型，是提升成本/延迟效率的重要方向
- **统一工具面板**：[#7013](https://github.com/agentscope-ai/QwenPaw/issues/7013) —— 文件产出预览、Diff、Web 服务预览、交互式终端一体化的“工作台”入口
- **Agent 级跨会话 recall 开关**：[#7184](https://github.com/agentscope-ai/QwenPaw/issues/7184) —— 控制新会话是否可以召回其他会话内容，兼顾上下文与隐私

### Channel 生态扩展

- [#7158](https://github.com/agentscope-ai/QwenPaw/issues/7158)：钉钉群聊上下文模式（隔离/共享可配置）
- [#7159](https://github.com/agentscope-ai/QwenPaw/issues/7159)：QQ 群主动推送 + 定时任务
- [#7181](https://github.com/agentscope-ai/QwenPaw/issues/7181)：支持 Qwen_Code 作为第三方 agent harness（面向弱网环境）

---

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的真实用户声音：

1. **“规划完就停”是最伤体验的 bug**（[#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921)）
   用户 rerbin 观察到：模型输出“Now 2.1, 3.1, 3.2. Let me do all three.”这类计划后就停止，没有任何视觉提示。**用户需要说“继续”模型才动手**，说明 agent 的“计划→行动”链路存在断裂。

2. **长时间无响应，连 thinking 也卡住**（[#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102)）
   用户使用 GLM 5.3 时超过 10 分钟收不到任何 token，甚至思考过程也冻结，对第三方模型兼容性提出更高要求。

3. **产出物组织混乱**（[#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643)）
   所有任务文件都堆积在 `media/` 目录，用户明确表达“很混乱”，期望**按任务建目录**。该 Issue 已关闭，预计新版本将优化。

4. **网络瞬断恢复后必须手动重启**（[#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932)）
   一天复现两次，用户明确期望“网络恢复后自动重连 LLM API”，这是对生产环境可用性的基础诉求。

5. **一条坏图片链接毁掉整个会话**（[#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110)）
   用户只能 `/clear` 清空，体验很差——**单点故障不应导致整个会话不可用**。

6. **中文文件名被转成不可识别字符**（[#6453](https://github.com/agentscope-ai/QwenPaw/issues/6453)，已关闭）—— 说明本地化细节影响真实使用感受。

7. **历史库爆炸**（[#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168)）
   7.6GB 的 history.db 且同一区间被重复落库，长期运行用户遭遇存储失控，说明默认配置下的 token 上限与落库策略需要重新设计。

---

## 8. 待处理积压

以下为长期未响应或需维护者重点关注的事项：

| 项目 | 创建时间 | 天数 | 优先级建议 |
|---|---|---|---|
| [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) Agent 规划后停止 | 2026-08-12 | 9 天 | 🔴 **高** —— 核心稳定性 bug，社区热度最高（10 评论），尚无修复 PR |
| [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) 网络恢复后无法自动重连 | 2026-08-12 | 9 天 | 🔴 **高** —— 运维影响大，需在 HTTP 客户端层增加自动重连机制 |
| [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) history.db 膨胀 | 2026-08-20 | 1 天 | 🔴 **高** —— 数据存储缺陷，建议快速定位重复落库问题 |
| [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) 自动模型路由 | 2026-07-24 | 28 天 | 🟡 **中** —— 社区呼声高（1 👍），接近一个月无 PR，建议纳入路线图评估 |
| [#7013](https://github.com/agentscope-ai/QwenPaw/issues/7013) 统一工具面板 | 2026-08-14 | 7 天 | 🟡 **中** —— 功能范围大，需要设计讨论 |
| [PR #7080](https://github.com/agentscope-ai/QwenPaw/pull/7080) PowerContext 记忆后端 | 2026-08-17 | 4 天 | 🟡 **中** —— 已标记 Under Review，需维护者尽快审阅决策 |
| [PR #7119](https://github.com/agentscope-ai/QwenPaw/pull/7119) master key 文件权限 0o600 | 2026-08-18 | 3 天 | 🟡 **中** —— 安全修复，建议尽快合并 |
| [#7180](https://github.com/agentscope-ai/QwenPaw/issues/7180) v2.1.1-beta.1 安装验证 | 2026-08-20 | 1 天 | 🟢 截止已过，需确认各平台验证结果 |

---

**日报总结：** CoPaw 项目迭代速度优秀，社区参与度高，安全与性能修复推进及时。但核心 agent 自主执行的稳定性问题已连续一周未解决，是本日最需管理层关注的健康度风险。建议下一阶段将 #6921（规划后停止）、#6932（网络断线重连）、#7168（历史库膨胀）列为 P0 修复项。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-21

> 数据范围：GitHub 过去 24 小时（截至 2026-08-21）
> 数据来源：zeroclaw-labs/zeroclaw Issues & PRs

---

## 1. 今日速览

ZeroClaw 过去 24 小时保持极高社区活跃度：**50 条 Issue 更新（44 新开/活跃 + 6 关闭）** 与 **50 条 PR 更新（45 待合并 + 5 合并/关闭）** 双线并行，开发者贡献节奏强劲。无新版本发布，处于 v0.8.4 之后的稳定迭代窗口期。值得警惕的是，当日新上报 **2 个 P1 安全漏洞（#10164、#10165）**，均与 `block_high_risk_commands` 配置失效/绕过相关，反映出安全策略执行路径仍需加固。此外，45 条待合并 PR 中有多条带有 `needs-author-action` 或 `stale-candidate` 标记，合并队列存在一定积压风险，需维护者加快审阅节奏。

---

## 2. 版本发布

**无**。今日无新 Release。项目处于 v0.8.4 发布后的功能迭代与稳定性修复期，多个面向 v0.9.0 的 RFC 正在推进中。

---

## 3. 项目进展

今日共 **5 条 PR 合并/关闭、6 条 Issue 关闭**，主要成果集中在功能落地与工程基础设施收尾：

**已合并/关闭的关键 PR：**

| PR | 内容 | 意义 |
|---|---|---|
| [PR #10057](https://github.com/zeroclaw-labs/zeroclaw/pull/10057) | ZeroCode 队列消息恢复操作（Send now / Copy / Edit / Delete） | 落地 #10044，解决用户误入队列消息无法直接恢复的痛点 |
| [PR #10090](https://github.com/zeroclaw-labs/zeroclaw/pull/10090) | 收窄 Unix-only 测试导入，清理 Windows 构建警告 | 提升跨平台构建健康度 |

**已关闭的 Issue：**

- [#5842](https://github.com/zeroclaw-labs/zeroclaw/issues/5842) — Codex CLI extra_args 安全弱化警告功能已完成并关闭，表明安全审计向 CLI 配置面延伸
- [#10011](https://github.com/zeroclaw-labs/zeroclaw/issues/10011) — 移除 daemon 心跳测试中的运行时写入可执行文件，消除测试环境安全隐患
- [#9803](https://github.com/zeroclaw-labs/zeroclaw/issues/9803) — 将 standalone `zeroclaw-robot-kit` 合并入 `zeroclaw-hardware`，精简 crate 结构
- [#9470](https://github.com/zeroclaw-labs/zeroclaw/issues/9470) — 修正 Reliable fallback 遥测归属与过期通知；[PR #10144](https://github.com/zeroclaw-labs/zeroclaw/pull/10144) 正在更完整地解决该问题
- [#10044](https://github.com/zeroclaw-labs/zeroclaw/issues/10044) — 随 PR #10057 合并而关闭

**整体判断**：项目正在沿"安全策略加固 → 可观测性完善 → 跨平台修复 → 模块化精简"四条线稳步推进，每个方向均有对应 PR 在途。

---

## 4. 社区热点

今日讨论热度最集中的 Issue 反映了社区对 **ZeroClaw 架构演进方向** 的深度关注：

| Issue | 评论数 | 核心议题 |
|---|---|---|
| [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) | 17 | **RFC：通过外部集成实现更轻量的 ZeroClaw 核心**。讨论大量内置集成（Lucid/Qdrant 等）是否应移出默认核心，以降低配置、安全与兼容性负担 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 13 | **维护者决策队列 Tracker**：汇总等待维护者裁决的 RFC 与设计问题，社区对决策效率表示关注 |
| [#8891](https://github.com/zeroclaw-labs/zeroclaw/issues/8891) | 9 | **持久化内存三平面对齐 Tracker**：14 个 open items（4 issues + 10 PRs），跨会话记忆完整能力对齐成熟 Agent 运行时 |
| [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) | 8 | **RFC Rev3：SOP 能力权限契约**，使 `required_permissions` 成为权威而不建立第二套授权体系 |
| [#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621) | 8 | **RFC：分阶段 opt-in 产品遥测**，由运营者审核报告，辅助维护者做功能去留决策 |

**热点诉求分析**：评论热度最高的议题高度一致地指向 **ZeroClaw 的平台化转型** —— 社区不再满足于"功能堆叠"，而是要求：
1. 核心保持轻量、可插拔（WASM 插件化方向）；
2. 安全与权限模型有明确契约；
3. 通过受控遥测数据驱动路线图决策。这些信号与 [PR #8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965)（技能声明式自动激活）、[PR #8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850)（编译期 feature → 运行时插件）等方向形成呼应。

---

## 5. Bug 与稳定性

今日上报 Bug 中 **安全风险突出**，按严重程度排列如下：

### 🔴 S0 — 数据丢失 / 安全风险

| Issue | 描述 | 状态 |
|---|---|---|
| [#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165) | **独立 delegate 绕过 `block_high_risk_commands`**：即使 delegate 自己的 risk_profile 设置为拦截，`rm` 等高危命令仍可执行。涉及安全策略强制失效 | 新开，`status:accepted`，**暂无 fix PR** |
| [#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164) | **`block_high_risk_commands = false` 不生效**：父/代理直接路径上即使显式关闭拦截并加入白名单，`rm` 仍被硬拦截且无审批路径 | 新开，`status:accepted`，**暂无 fix PR** |

### 🟠 S1 — 工作流阻断

| Issue | 描述 | 状态 |
|---|---|---|
| [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) | 失败的 ACP 会话（Code/ACP）切换后整个 turn 从转录中消失 | `in-progress`，相关修复在 [PR #9515](https://github.com/zeroclaw-labs/zeroclaw/pull/9515) 中（skill-review fork 消息捕获） |
| [#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290) | Windows 桌面安装包启动失败，报 `TaskDialogIndirect` 缺失 | 待认领，**无 fix PR** |
| [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | Web Dashboard 中手动停止 agent 后，其已执行的工具调用与思考过程从上下文中丢失 | `status:accepted`，**无 fix PR** |
| [#9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436) | `config init` 生成的配置无法通过严格加载器，新装配置先天降级，`config migrate` 退出码 1 | `in-progress`，**无 fix PR** |

### 🟡 S2 — 功能降级

| Issue | 描述 | 状态 |
|---|---|---|
| [#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) | Windows 下进程被杀后端口仍被占用（zombie LISTENING/CLOSE_WAIT），新 daemon 无法启动 | `status:accepted`，**无 fix PR** |
| [#9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) | headless SOP step turn 有会话路径但从未持久化到会话存储 | `status:blocked`，**无 fix PR** |
| [#10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106) | 代理选择器拒绝受支持的转录服务（Groq/OpenAI/Deepgram 等） | `follow-up`，**无 fix PR** |
| [#10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074) | SECURITY.md 引用的 CI docker 检查 job 已于四月移除，文档与实际情况脱节 | `in-progress`，对应修复见 [PR #10176](https://github.com/zeroclaw-labs/zeroclaw/pull/10176) |

**安全趋势提示**：#10164 与 #10165 两个 P1 安全 Bug 同日出现，均指向命令拦截策略在"父路径"与"delegate 子路径"上执行不一致。建议维护者优先审查 [PR #9828](https://github.com/zeroclaw-labs/zeroclaw/pull/9828)（agent 配置编写 + 策略预览）与 [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598)（SOP 权限契约 RFC）之间的关联，避免安全模型出现系统性缺口。

---

## 6. 功能请求与路线图信号

今日 Issue 中反映了用户对以下方向的明确需求，且多数已有对应 PR 在途：

| 需求方向 | 代表 Issue | 对应 PR / 状态 |
|---|---|---|
| **核心轻量化**：将长尾集成移出默认核心，改由外部插件/集成提供 | [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) | [PR #8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) 推进 WASM 运行时插件化 |
| **SOP 权限契约**：统一能力授权模型 | [#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598)（Rev 3） | 待维护者裁决，涉及 [#9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) 等安全修复 |
| **产品遥测**：受控 opt-in 遥测辅助决策 | [#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621) | `status:accepted`，尚待实现 |
| **Goal mode v2**：持久化延续 + Web 控制 | [#9702](https://github.com/zeroclaw-labs/zeroclaw/issues/9702) | `needs-maintainer-review` |
| **CI 可解释性**：为每条 CI 门禁标注动机 Issue | [#9512](https://github.com/zeroclaw-labs/zeroclaw/issues/9512) | `status:accepted`，已有关联注释实践 |
| **ZeroCode 消息恢复** | [#10044](https://github.com/zeroclaw-labs/zeroclaw/issues/10044) | ✅ 已通过 [PR #10057](https://github.com/zeroclaw-labs/zeroclaw/pull/10057) 落地 |

**在途重要 PR 信号**：

- [PR #8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965)（XL）：技能声明式自动激活 + provider 切换 + 图片 turn 工具阻断 —— 依赖 #9563，需先合并基础分支
- [PR #8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)（XL）：Matrix 单消息进度草稿模式，扩展聊天渠道体验
- [PR #9828](https://github.com/zeroclaw-labs/zeroclaw/pull/9828)（XL）：agent 面向配置编写 + 运营商审批策略预览
- [PR #10144](https://github.com/zeroclaw-labs/zeroclaw/pull/10144)（XL）：provider 调用生命周期完整计费（回应 #10143）

这些 PR 一旦合并，将显著提升 ZeroClaw 在 **插件化、渠道体验、安全配置、可观测性** 四个维度的平台成熟度。

---

## 7. 用户反馈摘要

从今日 Issues 评论中提炼的用户真实反馈：

**😤 安装与上手痛点：**
- [Android/Termux 用户](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) 反映 `install.sh` 在 Termux 上错误选择 generic Linux 二进制，且本地编译同样识别错误；希望针对 Termux 环境做专门检测
- [Windows 用户](https://github.com/zeroclaw-labs/zeroclaw/issues/9290) 反馈 v0.8.3 安装后无法启动（`TaskDialogIndirect` 缺失），属 S1 级阻断

**😠 运行时信任受损：**
- [Web Dashboard 用户](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) 明确表达："Stopping the agent mid work... causes the whole tool calls and thinking to not be considered in the next message" —— 手动停止 agent 导致已执行工作"从未发生过"，严重打击用户对上下文的信任
- [Windows 用户](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) 报告进程被杀后端口仍被占用的"僵尸 listener"现象，影响日常重启迭代

**😖 配置体验缺陷：**
- [#9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436) 用户指出 `config init` 生成的配置"出生即降级"，且 `config migrate` 报错退出 —— 对新手极其不友好
- 多名用户（[#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164)、[#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)）对 `block_high_risk_commands` 配置在 **父路径/子代理路径行为不一致** 表示困惑与担忧

**🙏 渠道集成请求：**
- [Telegram 用户](https://github.com/zeroclaw-labs/zeroclaw/pull/9634) 关注群组级 `allowed_groups` 组授权白名单功能，期望对群聊访问做细粒度控制
- [WhatsApp 用户](https://github.com/zeroclaw-labs/zeroclaw/pull/10084) 受困于官方 passkey 验证导致设备链接中断，已提交依赖升级修复

**总体评价**：用户对 ZeroClaw 的功能广度给予认可，但 **Windows 稳定性、配置默认质量、安全策略一致性** 是当前体验的主要扣分项。

---

## 8. 待处理积压

以下长期未闭合或被阻塞的重要项，建议维护者优先关注：

| 项目 | 类型 | 创建至今 | 状态 | 风险 |
|---|---|---|---|---|
| [#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) — 核心轻量化 RFC | Issue | 2026-04-27（**近 4 个月**） | 17 评论，`needs-maintainer-review` | 高：架构方向悬而未决，影响后续插件化投资 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 维护者决策队列 | Tracker | 2026-07-04 | 13 评论，持续累积 | 中：反映 RFC 决策积压，需加速裁决节奏 |
| [#9634](https://github.com/zeroclaw-labs/zeroclaw/pull/9634) — Telegram 组授权 | PR | 2026-08-01 | `needs-author-action` + `stale-candidate`（P1） | 高：安全相关功能，作者超时未响应可能被关闭 |
| [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) — 技能自动激活 | PR | 2026-07-11 | 堆叠在 #9563 之上，需 rebase | 高：XL 级核心功能被依赖 PR 阻塞 |
| [#9563](https://github.com/zeroclaw-labs/zeroclaw/pull/9563) — Telegram 媒体信封修复 | PR | 2026-07-30 | `needs-author-action` + `stale-candidate`（P1） | 高：是 #8965 的前置依赖，双重受阻 |
| [#9451](https://github.com/zeroclaw-labs/zeroclaw/pull/9451) — 退役 DORA 遥测 | PR | 2026-07-27 | `do-not-merge` 标记 | 中：重构型 PR 长期悬挂，需明确处置结论 |
| [#9744](https://github.com/zeroclaw-labs/zeroclaw/pull/9744) — 网关 webhook 认证强制 | PR | 2026-08-04 | `do-not-merge` + `needs-maintainer-review` | 高：安全加固代码未合入，暴露面持续存在 |
| [#9942](https://github.com/zeroclaw-labs/zeroclaw/pull/9942) — vi_verify 工具配置可见性 | PR | 2026-08-12 | `do-not-merge` + `needs-maintainer-review` | 中：安全功能缺少运维可见性 |

**维护者行动建议**：
1. 优先裁决 #6165 与 #8692 中的架构类 RFC，明确 v0.9.0 的核心边界；
2. 对 #9634、#9563 等 P1 安全/功能 PR 做出 author-timeout 处理或接手完成；
3. 对 #10164、#10165 两个新安全漏洞尽快指派 owner，评估是否阻塞下个 patch release。

</details>

---
*本日报由 [agents-radar](https://github.com/Liderhu/agents-radar) 自动生成。*