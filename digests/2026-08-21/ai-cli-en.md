# AI CLI Tools Community Digest 2026-08-21

> Generated: 2026-08-20 17:03 UTC | Tools covered: 10

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

## Cross-Tool Comparison

# Cross-Tool Comparison Report — AI CLI Developer Tools
**2026-08-21 Community Digest Analysis**

---

## 1. Ecosystem Overview

The AI CLI landscape on 2026-08-21 shows intense engineering activity: 8 of 10 tracked tools shipped releases or merged notable PRs within 24 hours, with only Kimi Code and Grok Build dormant. The field is converging on agentic workflow fundamentals—cross-session messaging, subagent reliability, memory persistence across compactions, and MCP integration maturity dominate every project's issue tracker. A systemic weakness is emerging on Windows: GPU-process crashes, sandbox path failures, and TUI rendering bugs rank among the highest-activity issues across Claude Code, Codex, Pi, and Copilot CLI simultaneously. Release cadence varies dramatically (Codex shipped 3 alphas; Qwen shipped 6 artifacts including benchmark smokes), indicating a market still iterating rapidly rather than stabilizing.

---

## 2. Activity Comparison

*Counts reflect issues/PRs highlighted in each tool's 24-hour digest — representative of activity, not exhaustive GitHub totals.*

| Tool | Hot Issues | Key PRs | Releases (24h) | Momentum Signal |
|---|---|---|---|---|
| Claude Code | 13 | 0 | 2 patches (v2.1.236, v2.1.237) | Release-only day; hottest issue at 297 👍 |
| OpenAI Codex | 10 | 10 | 3 alphas (rust-v0.149.0-a.2–.4) | Fastest CLI iteration; desktop pain |
| Gemini CLI | 10 | 10 | 3 (v0.56.0 stable, v0.57.0-preview, nightly) | Stable + preview + nightly cadence |
| GitHub Copilot CLI | 10 | 1 | 2 patches (v1.0.81-4/5) | Prerelease regression churn |
| Kimi Code | 0 | 0 | 0 | No activity |
| OpenCode | 10 | 10 | 1 (v1.18.19) | Strong outside-contributor pipeline |
| Pi (pi-mono) | 10 | 10 | 0 | Active PRs, no release; Windows CTA thread |
| Qwen Code | 10 | 10 | 6 (1 nightly + 5 benchmark smokes) | Benchmark-gated release process |
| CodeWhale (DeepSeek) | 11 | 10 | 1 (v0.9.10) | i18n/localization focus; legacy pkg deprecated |
| Grok Build | 0 | 0 | 0 | No activity |

---

## 3. Shared Feature Directions

**Cross-session messaging & agent coordination**
- Claude Code: `SendMessage` gained `notify_when_idle`; regressions in silent message drops (#86298, #88125)
- Qwen Code: Cross-session messaging spec (#8724) now backed by implementation PR #9576 (UNIX-socket peer discovery, inbound gate)
- Claude Code (#88177/#88197) and Codex (#20077) both fielding multi-agent fleet/spawn control requests

**Memory persistence & compaction correctness** — the most deeply felt unsolved gap
- Claude Code: #34556 closed only because the author built a custom solution spanning 59 compactions
- Pi: Auto-compaction fires too late (#6879, 17 👍); per-model compaction profiles requested (#8133)
- Qwen Code: `/compress` dropped 170k→7k tokens (#9309); unbounded UI memory since March (#2128)
- CodeWhale: Emergency compaction at ~85–105K tokens despite 327,680-token route context (#5518)

**Windows platform stability**
- Claude Code: GPU-process crashes kill sessions (#81698) or brick the MSIX package (#80444)
- Codex: Verbatim `\\?\` path archive failures (#39239); sandbox helper regression (#27125)
- Copilot CLI: Sandbox blocks Git on Windows (#4524)
- Pi: Windows input-redraw bug (#6300); dedicated pain-point consolidation thread (#7547)
- CodeWhale: Header indicator invisible on Windows Terminal (#5512); IME candidate-window jumps (#5023)

**Subagent trust & lifecycle**
- Gemini: False `GOAL` success after MAX_TURNS (#22323); generalist agent hangs (#21409)
- Copilot CLI: TUI freezes when parallel subagents spawn (#4533)
- Codex: Completed subagents persist and restore stale MCP stacks (#33700)
- OpenCode: Permissions don't propagate to child sessions (#43675 PR fixed; #41991 bug class)

**MCP ecosystem maturation**
- Copilot CLI: OAuth token bridging missing between app and CLI (#4096); GitLab RFC 8414 issuer mismatch (#4439)
- Gemini: Fail-open corrupt MCP configs fixed (#28787, #28794)
- CodeWhale: MCP image results now forwarded as typed content (#5515)
- OpenCode: 64-char tool-name truncation for provider limits (#43684)

**Permission/security model enforcement**
- Copilot CLI: ACP mode auto-approves tool calls again (#4537) — recurrence of fixed #845
- Claude Code: PreToolUse hook deny stops entire turn (#78527), breaking security-judge patterns
- Qwen Code: PAT-bearing CI jobs on shared hosts (#9089); pipeline executes code as invoking user (#9556)

**Model & rate-limit governance**
- Codex: Model-tier context windows inconsistent after long-context rollout (#39144); Pro 20x treated as 5x (#38157)
- OpenCode: Rate limits aligned to ChatGPT subscription tiers in v1.18.19
- Claude Code: `ANTHROPIC_DEFAULT_MODEL` env var added in v2.1.236

---

## 4. Differentiation Analysis

| Tool | Distinctive Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Hooks/plugins ecosystem, output styles, desktop+MCP session management | Enterprise daily drivers, long-session power users | Horizontal integration; small surgical patches; model-quality sensitivity (Opus tone at 297👍) |
| **OpenAI Codex** | Rust-based rewrite, sandboxing, Computer Use, multi-agent V2 | Cutting-edge adopters tolerating alpha cadence | 3 alphas/day infrastructure hardening; desktop app layer is the weak spot |
| **Gemini CLI** | Subagents, skills, Auto Memory, Cloud Workstations OAuth | Google Cloud ecosystem developers | Orchestration-rich feature set; community wants more agent autonomy and honesty |
| **Copilot CLI** | Managed policies, org model catalogs, ACP mode, enterprise MCP | GitHub enterprise orgs | Security-first posture undermined by prerelease regressions (auto-approve, sandbox) |
| **OpenCode** | Provider-agnostic aggregator (Cloudflare AI Gateway, Bedrock, Qwen, GPT-5.x), plugin HTTP API | Open-source community, multi-provider users | Community-driven distribution; v2 UI gaps show growing pains |
| **Pi (pi-mono)** | Lean TUI specialist, now expanding provider/model breadth | Terminal purists, self-hosters | Community PR-driven; renderer and theme architecture investments |
| **Qwen Code** | SWE-bench/Terminal-Bench CI gates, Web Shell, session↔PR binding, hierarchical memory | Benchmark-conscious and remote-dev users | Release quality gated by benchmark smokes; security-hardened review pipeline |
| **CodeWhale** | Chinese localization, DeepSeek V4 tuning, LSP integration, TUI crate decomposition | Chinese-speaking users, DeepSeek model users | i18n "dictionary spine" refactor; legacy `deepseek-tui` deprecated |
| **Kimi / Grok** | — | — | Dormant; no observable signal |

---

## 5. Community Momentum & Maturity

**Rapid hardening phase:** OpenAI Codex (3 alphas/24h) and Qwen Code (6 release artifacts/24h including benchmark smoke gates) are iterating fastest, with Qwen's approach of gating releases on SWE-bench/Terminal-Bench runs standing out as a maturing quality bar.

**Strong contributor ecosystems:** OpenCode (10 PRs including an Amazon One Medical Bedrock patch) and Pi (10 PRs, including a V8 stack-overflow fix for 14.5MB diffs) show healthy outside-contributor pipelines. Gemini CLI maintains a stable release + preview + nightly rhythm with an engaged roadmap community (#4191, 99👍).

**Largest daily-driver installed base:** Claude Code. Its tracker carries the highest-reacted open issue (Opus tone, 297👍), a 98-comment memory thread closed only via user-built tooling, and daily Windows crash reports — evidence of broad adoption but also high feature expectations.

**Testing-capacity strain:** Copilot CLI's prerelease regressions (ACP auto-approve, TUI freeze, `store_memory` failure, `autoUpdate` ignored) suggest release velocity is outpacing regression coverage.

**Niche but active:** Pi and CodeWhale are smaller in scale but strategically vocal — Pi consolidating Windows pain (#7547), CodeWhale pursuing full Chinese docs localization and CJK IME fixes. Both are addressing underserved segments rather than competing head-on with the big four.

**Maturity gradient:** Claude Code (enterprise-hardened, desktop-fragile) → Codex (infrastructure rewriting) → Copilot (policy depth, execution instability) → Gemini (feature-rich orchestration) → Qwen (benchmark-disciplined) → OpenCode/Pi/CodeWhale (community and niche plays).

---

## 6. Trend Signals

1. **Agent-to-agent communication is becoming table stakes.** Cross-session messaging landed or shipped in Claude Code and Qwen Code within the same cycle; expect standardized session discovery, message framing, and inbound security gates across all major CLIs within quarters.

2. **Long-session memory is the industry's unsolved problem.** No tool ships durable memory across compaction; users are building 59-compaction custom systems. Expect productized memory tiers (dedicated memory stores, canonical-path dedup, per-model compaction profiles) as the next feature battleground.

3. **Windows is the opportunity gap.** GPU crashes, path-handling bugs, IME issues, and updater failures dominate every tracker. Tools that genuinely fix Windows reliability will capture significant underserved developer share — Pi's #7547 consolidation thread is the canary.

4. **Security regressions recur cyclically.** ACP auto-approve (Copilot, recurrence of #845) and PreToolUse deny turning into hard stops (Claude Code #78527) show permission enforcement needs dedicated regression suites, not incidental coverage. Security-judge and guardian patterns are becoming first-class architecture, not add-ons.

5. **Model behavior is a product feature now.** Token/context limits, tone, thinking modes, and model-tier inconsistencies generate some of the highest-reacted issues (Claude Code Opus 297👍; Codex #39144; Qwen #9309). Gateway routing, default-model controls, and transparent model substitution warnings are emerging differentiators.

6. **MCP is mainstream but its auth is immature.** OAuth bridging failures (Copilot #4096, #4439), config corruption fail-open (Gemini #28787), and typed content handling (CodeWhale #5515) repeat across vendors — a standardization opportunity for the ecosystem.

7. **Token economics drive user frustration.** Forked-session cache misses (Pi #8348), prompt-cache key support requests (OpenCode #43689), and plan/rate-limit mismatches (Codex #38157) show users are increasingly cost-sensitive in long agentic sessions.

8. **Benchmark-gated releases are emerging.** Qwen's dsw-eas smoke runs (SWE-bench Verified + Terminal-Bench 2.0) as CI gates signal a maturing quality bar that other tools may adopt.

**Developer guidance:** When evaluating an AI CLI today, prioritize (a) Windows reliability if that is your platform, (b) memory/compaction behavior for sessions exceeding ~2 hours, (c) subagent failure semantics for multi-agent workflows, and (d) whether the permission model has regression coverage — these four dimensions generate the majority of cross-tool user pain, regardless of vendor.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights — 2026-08-21

All PRs below are **open** as of 2026-08-21.

## 1. Top Skills Ranking

Most-discussed Skill PRs by community attention:

- [**#514 — document-typography skill**](https://github.com/anthropics/skills/pull/514)  
  Adds typographic quality control for generated documents: orphan word wrap, widow section headers, and numbering misalignment. Discussion centers on how these issues affect essentially every Claude-generated document and are rarely requested by users explicitly.

- [**#486 — ODT skill**](https://github.com/anthropics/skills/pull/486)  
  Adds OpenDocument support: create, fill, read, and convert `.odt`/`.ods` files, plus ODT-to-HTML conversion. Triggers include “ODT”, “ODS”, “OpenDocument”, and “LibreOffice document”.

- [**#210 — frontend-design skill revision**](https://github.com/anthropics/skills/pull/210)  
  Rewrites the existing frontend-design skill for clarity and actionability, focusing on instructions Claude can actually execute within a single conversation. The discussion emphasizes internal coherence and more specific behavioral guidance.

- [**#83 — skill-quality-analyzer + skill-security-analyzer**](https://github.com/anthropics/skills/pull/83)  
  Proposes two meta-skills: one evaluates Skills across structure, documentation, examples, and resources; the other analyzes Skill security. This PR is a direct response to the need for trust and quality control in the Skills ecosystem.

- [**#1367 — self-audit skill**](https://github.com/anthropics/skills/pull/1367)  
  Adds a universal pre-delivery audit skill: mechanical verification of claimed output files first, then a four-dimension reasoning audit ordered by damage severity. Positioned as model- and stack-agnostic.

- [**#723 — testing-patterns skill**](https://github.com/anthropics/skills/pull/723)  
  A comprehensive testing skill covering the Testing Trophy model, unit testing with AAA patterns, React component testing with Testing Library, and practical “what not to test” guidance.

- [**#568 — ServiceNow platform skill**](https://github.com/anthropics/skills/pull/568)  
  Broad ServiceNow assistant covering ITSM, ITOM, ITAM/SAM, FSM, HRSD/CSM, SPM/PPM, Vulnerability Response, Security Incident Response, CSDM, and IntegrationHub.

- [**#525 — pyxel skill**](https://github.com/anthropics/skills/pull/525)  
  Enables retro/pixel-art/8-bit game development with Python using pyxel-mcp. Includes a workflow: write → run_and_capture → inspect → iterate.

## 2. Community Demand Trends

From the most-commented Issues:

- **Security and trust are the top concern.** [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments) warns that community skills distributed under the `anthropic/` namespace enable trust-boundary abuse. Users want official namespace controls and security analysis for Skills.

- **Enterprise sharing and governance are strongly requested.** [Issue #228](https://github.com/anthropics/skills/issues/228) asks for org-wide skill sharing in Claude.ai. [Issue #412](https://github.com/anthropics/skills/issues/412) proposes agent-governance safety patterns; [Issue #1175](https://github.com/anthropics/skills/issues/1175) raises security/context concerns for SharePoint Online integrations.

- **Skill tooling and evaluation need to be reliable.** [Issue #556](https://github.com/anthropics/skills/issues/556) documents `run_eval.py` never triggering skills; [Issue #202](https://github.com/anthropics/skills/issues/202) argues skill-creator should be rewritten as an operational skill; [Issue #189](https://github.com/anthropics/skills/issues/189) reports duplicate skills from plugin overlap.

- **Context efficiency is a growing demand.** [Issue #1487](https://github.com/anthropics/skills/issues/1487) reports a bundled `claude-api` skill injecting ~156k tokens in one call; [Issue #1329](https://github.com/anthropics/skills/issues/1329) proposes a `compact-memory` skill using symbolic notation to reduce persistent-memory overhead.

- **Platform compatibility and MCP interoperability remain unresolved.** [Issue #29](https://github.com/anthropics/skills/issues/29) asks about AWS Bedrock support; [Issue #16](https://github.com/anthropics/skills/issues/16) proposes exposing Skills as MCP tools.

## 3. High-Potential Pending Skills

Active PRs not yet merged that may land soon:

- [**#181 — SAP-RPT-1-OSS predictor skill**](https://github.com/anthropics/skills/pull/181)  
  New skill for predictive analytics on SAP business data using SAP’s open-source tabular foundation model.

- [**#1538 — Bring two skills back under the Agent Skills spec**](https://github.com/anthropics/skills/pull/1538)  
  Fixes spec-compliance issues in existing skills, including a `name` field mismatch in `template/SKILL.md`. Important for ecosystem consistency.

- [**#1595 — Add UIZZE to partner skills**](https://github.com/anthropics/skills/pull/1595)  
  Adds UIZZE, a free anti-UI-slop skill grounded in 800,000+ real screens, to the README partner listing.

- [**#1367 — self-audit skill**](https://github.com/anthropics/skills/pull/1367)  
  Still open and actively discussed; a strong candidate for near-term merge given its universal applicability and explicit verification-first design.

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is not for more domain skills, but for **trust, verifiability, and context-efficiency**: meta-skills that audit, secure, evaluate, and optimize other Skills are as sought-after as new domain capabilities, with enterprise sharing/governance close behind.

---

# Claude Code Community Digest — 2026-08-21

## Today's Highlights

Two patch releases landed, adding a built-in "Concise" output style (v2.1.237) and a persistent default-model environment variable (v2.1.236), plus a fix for prompt caching through LLM gateways. The community's attention remains fixed on Windows desktop stability and cross-session messaging regressions, with several fresh reports of Fable safeguard false positives. The long-running memory-persistence request (#34556) was closed after its author built a custom solution spanning 59 context compactions — evidence of a still-unaddressed gap in long-session memory.

## Releases

**v2.1.237**
- Fixed prompt caching for sessions using an LLM gateway or custom base URL
- Added a built-in **"Concise" output style**: Claude leads with results, skips preamble and narration, while doing the work just as thoroughly. Selectable under Output style in `/config`.

**v2.1.236**
- Added `ANTHROPIC_DEFAULT_MODEL` environment variable: sets the model new sessions start on, while a `/model` pick still overrides it and persists across restarts (unlike `ANTHROPIC_MODEL`)
- Added `notify_when_idle` to cross-session `SendMessage`: ask another Claude Code session

## Hot Issues

1. **[#34556](https://github.com/anthropics/claude-code/issues/34556)** — Persistent Memory Across Context Compactions [CLOSED] — 98 comments, 59 compactions over 26 days. The author built a complete custom memory persistence system after losing context repeatedly. Closed, but the underlying request for durable session memory remains a top community desire.

2. **[#77136](https://github.com/anthropics/claude-code/issues/77136)** — Opus 4.8's language "incessantly toxic," Opus 5.0 "incoherence" — 297 👍, the highest-reacted open issue. Strong signal that model communication style is materially affecting developer workflow satisfaction.

3. **[#81698](https://github.com/anthropics/claude-code/issues/81698)** — Windows desktop app: GPU process crash (exit code 101457950) kills the entire app and all running sessions — 50 comments, RTX 5080, Windows 11. Highest-activity bug this week.

4. **[#80444](https://github.com/anthropics/claude-code/issues/80444)** — Windows desktop fatal GPU-process crash via in-app Browser tab — 47 comments. Worse: leaves the MSIX package unlaunchable until Repair. Reproduced on two driver versions.

5. **[#48237](https://github.com/anthropics/claude-code/issues/48237)** — Font size adjustment for the Code tab in Claude Desktop — 117 👍. A simple, heavily requested quality-of-life feature that has been open since April.

6. **[#14280](https://github.com/anthropics/claude-code/issues/14280)** — VS Code extension: stream bash command output in real-time — 81 👍. Long-standing request (since Dec 2025) for visibility into long-running commands in the IDE.

7. **[#86298](https://github.com/anthropics/claude-code/issues/86298)** — Windows desktop: cross-session messages silently dropped, held for an approval the UI never offers, then expire (~5 min) — regression since app 1.28929.0. 20 comments; trust-breaking behavior for agents.

8. **[#88125](https://github.com/anthropics/claude-code/issues/88125)** — `send_message` (ccd_session_mgmt) silently stops delivering and wedges the recipient session — regression since CLI 2.1.227; 197 consecutive sends acknowledged but never delivered. Filed yesterday; critical for cross-session workflows.

9. **[#78527](https://github.com/anthropics/claude-code/issues/78527)** — v2.1.210 regression: PreToolUse prompt-hook deny stops the entire turn (`hook_stopped_continuation`) instead of returning a tool error. Breaks LLM security-judge hook patterns (e.g., `{ok, reason}` contract).

10. **[#62493](https://github.com/anthropics/claude-code/issues/62493)** — AskUserQuestion overlay obscures the assistant's previous message — the modal covers the report/context the user needs to answer the question. Also mirrored in new issue [#88278](https://github.com/anthropics/claude-code/issues/88278).

Also notable: [#58671](https://github.com/anthropics/claude-code/issues/58671) phantom user messages appearing in transcripts; [#81658](https://github.com/anthropics/claude-code/issues/81658) cross-platform sync failure on Desktop/Web/Android; [#85438](https://github.com/anthropics/claude-code/issues/85438) Fable model reported unusable for coding tasks.

## Key PR Progress

No pull requests were updated in the last 24 hours — the repository saw release-only activity.

## Feature Request Trends

- **Persistent session memory** — The closed #34556 still represents the most-demanded capability: memory that survives context compactions without external tooling.
- **Agent fleet oversight** — [#88177](https://github.com/anthropics/claude-code/issues/88177) asks for tools to manage 15–20+ background agents; [#88197](https://github.com/anthropics/claude-code/issues/88197) requests daemon mode with background process management and session persistence comparable to Codex.
- **IDE & desktop ergonomics** — Font size control (#48237) and real-time bash streaming in VS Code (#14280) remain the most-upvoted UI/UX requests.
- **Plugin skill management** — [#88302](https://github.com/anthropics/claude-code/issues/88302) wants `skillOverrides` extended to plugin-namespaced skills.
- **Output style control** — Community demand for terser, result-first responses was at least partially addressed by v2.1.237's built-in Concise style.

## Developer Pain Points

- **Windows desktop instability** — GPU-process crashes (#81698, #80444) that kill active sessions or corrupt the MSIX package to the point of needing repair dominate the bug tracker.
- **Cross-session messaging unreliability** — Repeated regressions (#86298, #88125) with silent message drops and wedged recipient sessions erode confidence in desktop/MCP session management.
- **Model behavior unpredictability** — Opus tone issues (#77136, 297 👍) and a cluster of Fable safeguard false positives ([#88304](https://github.com/anthropics/claude-code/issues/88304), [#88303](https://github.com/anthropics/claude-code/issues/88303), [#88301](https://github.com/anthropics/claude-code/issues/88301)) are interrupting otherwise normal workflows.
- **Hooks regressions** — The PreToolUse deny regression (#78527) breaks critical security-judge automation; a notable setback for hook-based guardrails.
- **Context loss** — Despite #34556 being closed, memory loss across compactions remains one of the most deeply felt limitations for daily-driver users.
- **Windows CLI edge cases** — A steady trickle of Windows-specific TUI issues (statusLine path-with-spaces failures [#88256](https://github.com/anthropics/claude-code/issues/88256), clipboard conflicts in RDP sessions [#87205](https://github.com/anthropics/claude-code/issues/87205), orphaned plugin temp folders [#87778](https://github.com/anthropics/claude-code/issues/87778)) indicates ongoing platform polish gaps.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-21

## Today's Highlights
Activity today is split between new `rust-v0.149.0-alpha` releases and a surge of desktop-app reliability reports, especially around macOS Computer Use worker OOM crashes and Windows session archive failures. The PR pipeline is dominated by internal hardening: sandbox path safety, Guardian configuration, and CI/credential hygiene. No stable CLI release landed, but the alpha cadence suggests continued iteration toward 0.149.0.

## Releases
- [rust-v0.149.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.2)
- [rust-v0.149.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.3)
- [rust-v0.149.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.149.0-alpha.4)

All three are alpha builds of the Rust-based CLI; the provided changelogs contain only release tags, so the practical changes are not yet documented.

## Hot Issues
1. [Issue #38455 — ChatGPT desktop repeatedly spawns Computer Use workers and crashes with V8 OOM on macOS](https://github.com/openai/codex/issues/38455)  
   High-severity reliability issue: 31 comments, 13 👍. App crashes ~98 seconds after launch with 187 named `computer-use` threads. Multiple related reports indicate this is a systemic macOS problem.

2. [Issue #39239 — Windows: `thread/archive` fails with "os error 2" after `thread/resume` stores a `\\?\` verbatim rollout_path](https://github.com/openai/codex/issues/39239)  
   26 comments, 3 👍. Root cause appears to be path-equality mismatch between normal and verbatim Windows paths, causing queued archive operations to fail on files that exist.

3. [Issue #39162 — macOS: Opening an existing conversation invalidates ChatGPT auth and redirects to sign-in](https://github.com/openai/codex/issues/39162)  
   24 comments, 18 👍. High community impact: the desktop app loses an already-validated session just by opening a conversation, while CLI authentication continues to work.

4. [Issue #38350 — Recurring scheduled tasks disable themselves after successful runs](https://github.com/openai/codex/issues/38350)  
   23 comments. Users report unrelated recurring schedules toggling from enabled to paused without authorization — a trust-breaking automation bug.

5. [Issue #27125 — Windows sandbox helper not found in Codex CLI 0.138.0; regression from 0.132.0](https://github.com/openai/codex/issues/27125)  
   15 comments, 2 👍. Long-running Windows sandbox regression that prevents local sandboxing from starting at all. Still open after two months.

6. [Issue #24047 — Windows Desktop update installs but Codex does not relaunch afterward](https://github.com/openai/codex/issues/24047)  
   12 comments, 5 👍. MSIX update replaces the package but fails to start the app post-update; older known-good update flow was more reliable.

7. [Issue #32706 — Windows/Edge: Chrome plugin update leaves locked host, partial cache, stale manifest, and uninstallable plugin](https://github.com/openai/codex/issues/32706)  
   11 comments, 1 👍. A multi-layer Windows update failure combining Edge extension state, app-server manifests, and a locked host — hard to recover from manually.

8. [Issue #20077 — MultiAgentV2 `spawn_agent` defaults to full-history fork, rejecting agent_type/model overrides](https://github.com/openai/codex/issues/20077)  
   10 comments, 9 👍. Directly blocks customizing child agents in multi-agent workflows; the community wants override support without full-history forking.

9. [Issue #33700 — macOS App: Completed subagents stay open in `thread_spawn_edges` and restore stale MCP stacks](https://github.com/openai/codex/issues/33700)  
   9 comments, 3 👍. Subagent lifecycle leaks cause stale MCP context to be re-activated, increasing memory and confusing later turns.

10. [Issue #39144 — GPT-5.6 Sol still receives 272K max_context_window after long-context rollout; Terra and Luna receive 872K](https://github.com/openai/codex/issues/39144)  
    8 comments, 3 👍. Model-tier context inconsistencies after the long-context rollout — important for users relying on large rollouts.

## Key PR Progress
1. [PR #39744 — Skip postprocessing for short composer input](https://github.com/openai/codex/pull/39744)  
   Avoids grapheme/word-boundary passes for single-line composer input shorter than the available width; a small latency win.

2. [PR #39741 — Use model-specific auto-review outcome instructions](https://github.com/openai/codex/pull/39741)  
   Adds `rejection_instructions` and `timeout_instructions` to auto-review messages so the acting model handles denials and timeouts more appropriately.

3. [PR #39738 — Honor Guardian runtime settings from model defaults](https://github.com/openai/codex/pull/39738)  
   Adds `max_tool_call_lag`, `reuse_parent_compaction`, and transcript `include_images` to Guardian config with inheritance from model defaults.

4. [PR #39736 — Remove private executor directory creation](https://github.com/openai/codex/pull/39736)  
   Routes remote plugin metrics through the standard executor filesystem API and removes the private directory creation protocol option.

5. [PR #39731 — Avoid rollout reads for configured TUI sessions](https://github.com/openai/codex/pull/39731)  
   Prevents the TUI from waiting on rollout-reader retries when a lifecycle response already provides authenticated session state.

6. [PR #39726 — Box the WebSocket dial future](https://github.com/openai/codex/pull/39726)  
   Erases the concrete future type at the WebSocket connector boundary, simplifying the connector interface.

7. [PR #39722 — Track multi-agent v2 spawn calls in analytics](https://github.com/openai/codex/pull/39722)  
   Emits started/completed collaboration tool events for `spawn_agent`, including failures, duration, and child-agent metadata.

8. [PR #39720 — Expose managed policy for browser settings imports](https://github.com/openai/codex/pull/39720)  
   Adds `in_app_browser.allow_external_browser_settings_import` to managed policy requirements with layered composition support.

9. [PR #39719 — Stop persisting checkout credentials in V8 workflows](https://github.com/openai/codex/pull/39719)  
   Sets `persist-credentials: false` for V8 canary and `rusty_v8` checkouts, reducing leaked-credential risk in CI.

10. [PR #39717 — Pass CI workflow inputs through environment variables](https://github.com/openai/codex/pull/39717)  
    Prevents reusable-workflow inputs from being interpreted as shell syntax by exporting them as environment variables before script execution.

## Feature Request Trends
- **Richer fork/session control**: Multiple issues ask for forking the *current* session, returning to the fork point, and forking into a new window ([#9499](https://github.com/openai/codex/issues/9499), [#14520](https://github.com/openai/codex/issues/14520)).
- **Subagent configuration flexibility**: Users want `spawn_agent` to accept `agent_type`, `model`, and `reasoning_effort` overrides even when full-history forking is not desired ([#20077](https://github.com/openai/codex/issues/20077)).
- **Consistent long-context behavior across models**: Model-tier context windows should match the rollout already available to newer model variants ([#39144](https://github.com/openai/codex/issues/39144)).
- **Better MCP approval and notification UX**: MCP elicitation approvals need the same actionable notifications as command approvals, especially on Windows ([#35947](https://github.com/openai/codex/issues/35947)).
- **Desktop/CLI parity**: Users want the desktop app to preserve CLI working behavior, especially for auth, remote project visibility, and voice/chat quota handling ([#39162](https://github.com/openai/codex/issues/39162), [#31407](https://github.com/openai/codex/issues/31407), [#37619](https://github.com/openai/codex/issues/37619)).

## Developer Pain Points
- **Windows session archiving remains fragile**: Verbatim paths and path-alias mismatches cause archives to fail even when files exist; new reports continue to surface on the latest app-server versions ([#39239](https://github.com/openai/codex/issues/39239), [#39705](https://github.com/openai/codex/issues/39705), [#39627](https://github.com/openai/codex/issues/39627)).
- **macOS Computer Use worker leaks**: The desktop app repeatedly spawns unbounded workers, leading to V8 OOM and crashes; symlinked `CODEX_HOME` appears to trigger one variant ([#38455](https://github.com/openai/codex/issues/38455), [#39732](https://github.com/openai/codex/issues/39732)).
- **Auth invalidation and login loops**: Desktop app sessions are invalidated after conversation open, while CLI remains operational — a confusing split-brain auth state ([#39162](https://github.com/openai/codex/issues/39162), [#39718](https://github.com/openai/codex/issues/39718)).
- **Windows updater and installer loops**: MSIX auto-updates download but never deploy, or install but fail to relaunch; some apps launch into a permanently suspended state ([#24047](https://github.com/openai/codex/issues/24047), [#38843](https://github.com/openai/codex/issues/38843)).
- **Sandbox/helper regressions on Windows**: Older working sandbox configurations broke in newer CLI versions, blocking local sandbox usage ([#27125](https://github.com/openai/codex/issues/27125)).
- **MCP lifecycle storms**: Some Windows users see `taskkill /T /F` respawn cycles and per-spawn network re-fetching of git-pinned MCP servers, causing CPU spikes and input stutter ([#37402](https://github.com/openai/codex/issues/37402)).
- **Rate limit/plan mismatch**: Pro 20x subscribers report being treated as Pro 5x by Codex usage capacity, causing confusion and blocked work ([#38157](https://github.com/openai/codex/issues/38157)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Today's Highlights

Stable **v0.56.0** shipped this cycle, alongside **v0.57.0-preview.0** and a fresh nightly. The preview adds Cloud Workstations OAuth proxy redirect handling and fixes an IDE connection directory mismatch; the nightly also preserves empty text turns when tools or media are present. Community attention remains concentrated on subagent reliability — especially false success reports after `MAX_TURNS` and generalist agent hangs — plus the desire for configurable command substitution.

## Releases

- **v0.56.0** — [Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0) | [Full changelog](https://github.com/google-gemini/gemini-cli/compare/v0.55.1...v0.56.0)  
  Stable release with the accumulated changes since v0.55.1.
- **v0.57.0-preview.0** — [Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0-preview.0)  
  - `fix(core)`: dynamically resolve Cloud Workstations proxy redirect URI for OAuth flows ([#28688](https://github.com/google-gemini/gemini-cli/pull/28688))
  - `fix(core)`: resolve swallowed directory mismatch in IDE connections
- **v0.56.0-nightly.20260820.ge90c63fa1** — [Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260820.ge90c63fa1)  
  - `fix(core)`: preserve empty text turns with tools or media ([#28892](https://github.com/google-gemini/gemini-cli/pull/28892))

## Hot Issues

1. **[#27393 — Command substitution block should be user-configurable](https://github.com/google-gemini/gemini-cli/issues/27393)**  
   19 comments, 1 👍. Users want an `allowCommandSubstitution` toggle in `settings.json`, and better YOLO-mode behavior instead of a hardcoded silent block.

2. **[#4191 — Public Roadmap](https://github.com/google-gemini/gemini-cli/issues/4191)**  
   18 comments, 99 👍. A tracking issue for the public roadmap and contribution opportunities; one of the most-upvoted issues in the project.

3. **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)**  
   12 comments. Subagents like `codebase_investigator` report `status: "success"` even when they hit turn limits before doing work, hiding real interruptions.

4. **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)**  
   8 comments, 8 👍. Simple operations like folder creation can hang indefinitely when the generalist subagent is used.

5. **[#19873 — Leverage model's bash affinity via OS sandboxing](https://github.com/google-gemini/gemini-cli/issues/19873)**  
   8 comments. Proposes zero-dependency OS sandboxing and post-execution intent routing to unlock the model's native shell skills safely.

6. **[#25166 — Shell command execution gets stuck with “Waiting input”](https://github.com/google-gemini/gemini-cli/issues/25166)**  
   4 comments, 3 👍. Simple commands that have already finished sometimes remain shown as active and awaiting input.

7. **[#26525 — Deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)**  
   4 comments. Privacy/security concern: transcript content is sent to the extraction model before redaction, and logging can expose skill data.

8. **[#24246 — 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)**  
   3 comments. Gemini CLI encounters API 400 errors when too many tools are available; users want smarter in-scope tool limiting.

9. **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)**  
   6 comments. Custom skills and sub-agents are only used when explicitly instructed, even when relevant to the task.

10. **[#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)**  
    4 comments. Browser subagent terminates with `GOAL` but fails in Wayland environments, affecting Linux users.

## Key PR Progress

- **[#28933 — Iterative orchestrator state machine for PR generation](https://github.com/google-gemini/gemini-cli/pull/28933)**  
  Implements an orchestrator for repo setup, multi-turn coding/evaluation, ESLint static analysis, and trajectory logging.

- **[#28932 — Antigravity agent runner and async stream resolution](https://github.com/google-gemini/gemini-cli/pull/28932)**  
  Adds async execution for Antigravity agents, turn timeout enforcement, and stream chunk export for trajectory logging.

- **[#28930 — Drop unsafe `diff.external` override](https://github.com/google-gemini/gemini-cli/pull/28930)**  
  Fixes [#28928](https://github.com/google-gemini/gemini-cli/issues/28928) by removing a Git override that could break sandboxed shell behavior.

- **[#28915 — Consistent symlink evaluation in ignore path handling](https://github.com/google-gemini/gemini-cli/pull/28915)**  
  Ensures `.geminiignore` and `.gitignore` rules are evaluated consistently against literal and canonical paths.

- **[#28867 — Prevent subagents from running when agents mode is disabled](https://github.com/google-gemini/gemini-cli/pull/28867)**  
  Fixes [#22093](https://github.com/google-gemini/gemini-cli/issues/22093), a regression where subagents initialized even when explicitly disabled.

- **[#28910 — Add Gemini 3.7 Flash, 3.6 Flash, and 3.5 Flash-Lite model configurations](https://github.com/google-gemini/gemini-cli/pull/28910)**  
  Adds complete model resolution support across `core` and `cli`.

- **[#28828 — Warn when a preview model is silently substituted](https://github.com/google-gemini/gemini-cli/pull/28828)**  
  Fixes [#28825](https://github.com/google-gemini/gemini-cli/issues/28825): users should be told when a requested preview model lacks entitlement rather than silently falling back.

- **[#28787 — Don't treat corrupt MCP enablement config as empty](https://github.com/google-gemini/gemini-cli/pull/28787)**  
  Prevents fail-open behavior caused by collapsing JSON parse errors into an empty config.

- **[#28794 — Prevent fail-open and data loss on corrupt MCP enablement config](https://github.com/google-gemini/gemini-cli/pull/28794)**  
  Fixes [#28786](https://github.com/google-gemini/gemini-cli/issues/28786), addressing a vulnerability in `McpServerEnablementManager` when config JSON is invalid.

- **[#28789 — Fix vscode-ide-companion `stop()` hang and keep-alive failure threshold](https://github.com/google-gemini/gemini-cli/pull/28789)**  
  Fixes [#28785](https://github.com/google-gemini/gemini-cli/issues/28785): resolves hangs with active MCP streaming sessions and a keep-alive resource leak.

## Feature Request Trends

- **Configurable agent behavior** — Users repeatedly ask for more control: command substitution toggles, agent/skill usage heuristics, browser agent overrides, and clearer YOLO-mode behavior.
- **Memory system hardening** — Auto Memory needs better retry handling, deterministic secret redaction, and quarantine of invalid memory patches.
- **Smarter code understanding** — AST-aware file reads, search, and codebase mapping are ongoing themes for reducing token noise and improving investigator agents.
- **Security and sandboxing** — Requests include zero-dependency OS sandboxing, discouraging destructive git/database operations, and fixing MCP config fail-open paths.
- **Better evaluation infrastructure** — Component-level behavioral evals, stable test suites, and public roadmap visibility remain high-interest areas for contributors.

## Developer Pain Points

- **Subagent trust issues** — Hangs, false `GOAL` success reports, ignored settings overrides, and Wayland failures make subagents unreliable in real workflows.
- **Shell execution stalls** — Commands completing successfully but leaving the UI in a “Waiting input” state is a recurring, high-frustration bug.
- **Safety overhead** — Models creating temp scripts in random locations and occasionally using destructive git commands adds cleanup and risk-management burden.
- **Scalability limits** — More than ~128 available tools triggers API 400 errors, and Auto Memory can retry low-signal sessions indefinitely.
- **Configuration fragility** — Corrupt MCP enablement configs can silently re-enable servers or cause data loss; symlinked agents and ignore paths also break expected behavior.
- **Platform friction** — Windows-specific issues around long paths, privilege-dependent tests, and PowerShell requirements keep surfacing in both issues and PRs.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-21

## Today's Highlights
Two patch releases landed in the last 24 hours, including a fix for an annoying duplicate “pending” prompt bug in the interactive transcript. The community is also watching a wave of prerelease regressions: ACP mode auto-approving tool calls again, a terminal UI freeze around parallel subagents, and `store_memory` failures in 1.0.81 builds. Meanwhile, several older MCP/auth and enterprise model issues were closed, suggesting continued hardening work in those areas.

## Releases
- [v1.0.81-5](https://github.com/github/copilot-cli/releases/tag/v1.0.81-5) — Fixes an issue where a prompt sent while the agent is working left a second copy of itself stuck as `(pending)` at the bottom of the transcript after being answered.
- [v1.0.81-4](https://github.com/github/copilot-cli/releases/tag/v1.0.81-4) — General fixes and changes; no further details provided.

## Hot Issues
1. [ACP mode auto-approves tool calls again (#4537)](https://github.com/github/copilot-cli/issues/4537) — Since 1.0.81-1, `--acp` mode no longer sends `session/request_permission`; shell commands, edits, and deletions run unattended. This is a serious security regression and a reoccurrence of previously fixed issue #845.

2. [Sandbox won't let copilot use git anymore (#4524)](https://github.com/github/copilot-cli/issues/4524) — Closed but still notable: the enforced sandbox became overly restrictive on Windows even after enabling the working directory and `~/.copilot`, breaking core Git workflows.

3. [Terminal UI stops consuming events when parallel subagents spawn (#4533)](https://github.com/github/copilot-cli/issues/4533) — On 1.0.81-4/5, the UI becomes unresponsive to input and scroll while the Rust runtime continues making model calls. High impact for users running agent-heavy sessions.

4. [`store_memory` fails: “Instance id is required” (#4535)](https://github.com/github/copilot-cli/issues/4535) — The native memory writer is broken in 1.0.81 prereleases, breaking memory persistence for agent workflows.

5. [Enabled organization models missing from catalogue (#4390)](https://github.com/github/copilot-cli/issues/4390) — Closed, but important for enterprise users: models explicitly enabled in Copilot Business, including Claude Sonnet 5/Opus 5 and Kimi K3, were unavailable in the CLI. 15 comments and 7 👍 show strong community interest.

6. [SHIFT+ENTER executes instead of inserting a line break (#1481)](https://github.com/github/copilot-cli/issues/1481) — Closed after being open for months. The standard chat-app keystroke was prematurely executing prompts; 28 comments and 17 👍 made it one of the most-discussed UX issues.

7. [GitLab MCP OAuth metadata rejected with RFC 8414 issuer mismatch (#4439)](https://github.com/github/copilot-cli/issues/4439) — GitLab Self-Managed MCP servers using OAuth 2.0 dynamic registration fail authentication. Relevant for enterprises running self-hosted GitLab with MCP integrations.

8. [Third-party MCP server tools missing despite “Connected” status (#4096)](https://github.com/github/copilot-cli/issues/4096) — Atlassian Remote MCP OAuth works in the app UI but tools never appear in CLI sessions because the OAuth token is not bridged. Signals a broader MCP auth integration gap.

9. [Environment footer stuck on “Loading:” forever (#4206)](https://github.com/github/copilot-cli/issues/4206) — The status footer never transitioned to complete even though `/env` showed everything was loaded. Misleading UI state under org MCP policy; closed in this cycle.

10. [`autoUpdate: false` ignored; cached prerelease overrides stable npm install (#4534)](https://github.com/github/copilot-cli/issues/4534) — A cached prerelease under `~/.copilot/pkg` keeps being re-exec'd despite stable npm installation and the documented setting. Users cannot reliably pin stable versions.

## Key PR Progress
- [Remove GitHub Copilot CLI documentation from README (#4510)](https://github.com/github/copilot-cli/pull/4510) — Open PR that removes detailed CLI installation instructions and usage guidelines from the README. The rationale is not stated in the available data; likely a documentation cleanup or migration effort, but worth watching for confirmation that docs are relocating elsewhere.

## Feature Request Trends
- **Keyboard and input UX improvements** — Persistent requests for standard chat-style editing: SHIFT+ENTER for line breaks (#1481), fix for backspace deleting whole words (#4447), and multi-turn conversation support inside `/ask` (#4538).
- **Model and setting persistence** — Users want not just model selection but reasoning effort to persist across sessions (#4530), and enterprise users want org-enabled model catalogues to be respected (#4390).
- **MCP ecosystem maturity** — Recurring asks for reliable OAuth bridging (#4096), correct registry/policy validation (#3162), image content block support (#4536), and compatibility with non-GitHub MCP servers such as GitLab (#4439).
- **Security/permission model hardening** — Regressions and bypasses around ACP permission requests (#4537) and non-interactive modes (#4528) are pushing for more consistent enforcement of managed settings.

## Developer Pain Points
- **Prerelease regressions** are a top frustration: memory writes failing, terminal UI freezing, pending duplicate lines, and config settings like `autoUpdate` being silently ignored.
- **MCP authentication and policy handling** remains a recurring source of false positives and missing tools — especially for OAuth-based third-party servers and self-managed GitLab.
- **Sandbox/permission behavior is hard to predict** across Windows, non-interactive mode, and ACP mode, causing blocked Git operations or unintended auto-approval.
- **Terminal rendering and session state** issues — stuck footers, duplicated pending lines, and sessions disappearing after restart or Remote-SSH reconnect — continue to disrupt daily workflows.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-21

## Today's Highlights
v1.18.19 shipped with Cloudflare AI Gateway passthroughs and Codex rate-limit alignment. Community attention remains on OpenCode Go / Console Go provider regressions — encrypted content failures, tool-schema rejections, and tool-count limits — plus several v2 UI gaps like missing skills and blank direct session URLs. On the PR side, contributors landed fixes for composer data loss, MCP tool-name truncation, and a new HTTP route API for server plugins.

## Releases

### v1.18.19
- Added native OpenAI and Anthropic passthroughs for Cloudflare AI Gateway models.
- Matched Codex rate limits more closely to ChatGPT subscription limits. (@GameOn223)
- Removed built-in Qwen sampling defaults that could send unsupported settings.
- Additional bugfix included in the release notes, though the description is truncated in the source feed.

## Hot Issues

1. **#10531 — Native Multimodal Context Support (Video/Audio)** [CLOSED]  
   Request for video/audio context in sessions. 13 comments, 16 👍 — clear demand for richer input beyond text/images.  
   https://github.com/anomalyco/opencode/issues/10531

2. **#43364 — Luna session isn't working in opencode go** [CLOSED]  
   GPT-5.6 Luna fails with `invalid_encrypted_content`. 10 comments, 4 👍. Provider-level encryption errors are blocking real sessions.  
   https://github.com/anomalyco/opencode/issues/43364

3. **#7207 — opencode shell output empty(** [CLOSED]  
   Shell integration fails to render output when `eza` replaces `ls`. 12 comments — core terminal/UX issue for users with custom shells.  
   https://github.com/anomalyco/opencode/issues/7207

4. **#7675 — Install script ignores OPENCODE_INSTALL_DIR** [CLOSED]  
   Install script hardcodes `~/.opencode/bin` instead of honoring documented env vars. 9 comments, 9 👍 — affects package managers and custom setups.  
   https://github.com/anomalyco/opencode/issues/7675

5. **#43371 — Console Go rejects tool schema and encrypted content during session drain** [CLOSED]  
   v2 beta-17639 fails at teardown with `unsupported_tool_schema` and `invalid_encrypted_content`. 7 comments. Provider drain path instability.  
   https://github.com/anomalyco/opencode/issues/43371

6. **#43378 — OpenCode Go deepseek-v4-flash rejects >16 tools** [CLOSED]  
   Tool-count regression started 2026-08-19. 6 comments. Blocks agent workflows that need many parallel tools.  
   https://github.com/anomalyco/opencode/issues/43378

7. **#43652 — [2.0] TUI: skills completely missing** [CLOSED]  
   Command palette has no “skills” entry in v2 TUI. 4 comments. v2 feature regression with no workaround in the UI.  
   https://github.com/anomalyco/opencode/issues/43652

8. **#39030 — Mobile browser tab does not reconnect SSE stream** [OPEN]  
   Chat freezes on Android Chrome after returning from another app. 3 comments, 2 👍. Mobile web UX still fragile.  
   https://github.com/anomalyco/opencode/issues/39030

9. **#43679 — Amazon Bedrock broken by incorrect “us.” cross-region prefix for DeepSeek** [OPEN]  
   `resolveModelID` adds a cross-region prefix to any Bedrock model ID containing `deepseek`. 2 comments. Critical for Bedrock + DeepSeek users.  
   https://github.com/anomalyco/opencode/issues/43679

10. **#36960 — Fork button on assistant response texts** [OPEN]  
    Popular UX request: fork an assistant message directly from the chat timeline. 4 comments.  
    https://github.com/anomalyco/opencode/issues/36960

## Key PR Progress

1. **#43683 — feat(plugin): add HTTP route registration for server plugins**  
   Lets plugins expose HTTP endpoints on the OpenCode server, enabling chat bridges and CI/webhook integrations. Closes #41362.  
   https://github.com/anomalyco/opencode/pull/43683

2. **#43685 — feat(opencode): configurable timeout for task tool**  
   Prevents subagent stalls — provider hangs or dead SSE keepalives — from blocking forever. Closes #15080.  
   https://github.com/anomalyco/opencode/pull/43685

3. **#43684 — fix(mcp): truncate tool names exceeding 64-char provider limit**  
   Avoids OpenAI-compatible API rejections when MCP tool names are too long. Closes #3523.  
   https://github.com/anomalyco/opencode/pull/43684

4. **#43687 — fix(tui): snapshot the composer before submit awaits**  
   Fixes #43563: text typed while a submit request is in flight was silently destroyed and prompt history recorded a message that was never sent.  
   https://github.com/anomalyco/opencode/pull/43687

5. **#43681 — fix(core): resolve Bedrock AWS profile credentials for V2**  
   Contributor patch from Amazon One Medical; fixes Bedrock credential resolution on the v2 branch. Closes #40663.  
   https://github.com/anomalyco/opencode/pull/43681

6. **#43677 — fix(core): send console anthropic api key header**  
   Translates Console Bearer credentials to `x-api-key` for Anthropic Messages requests, scoped to the OpenCode provider.  
   https://github.com/anomalyco/opencode/pull/43677

7. **#43675 — fix(opencode): answer subagent permissions in run**  
   Tracks child/nested sessions in non-interactive runs and auto-approves/rejects permissions for the whole run tree. Addresses the #41991 bug class.  
   https://github.com/anomalyco/opencode/pull/43675

8. **#43555 — refactor(core): route title and compaction through shared model requests**  
   Unifies title generation and compaction summaries through the shared `SessionModelRequest.prepare` boundary.  
   https://github.com/anomalyco/opencode/pull/43555

9. **#43576 — fix(core): settle foreign typed tool failures instead of dropping them**  
   Plugin tools throwing non-`Tool.Error` values left spinners running forever; now the tool call is settled correctly.  
   https://github.com/anomalyco/opencode/pull/43576

10. **#42629 — feat(tui): add turn summary flash experiment**  
    Opt-in TUI animation showing agent, model, and duration after a turn completes, then fading to semantic colors. Disabled by default.  
    https://github.com/anomalyco/opencode/pull/42629

## Feature Request Trends

- **Native multimodal support** keeps resurfacing: #10531 asks for video/audio context, signaling demand for non-text input handled natively.
- **TUI/Desktop customization**: fork buttons on assistant responses (#36960), more granular mouse-capture control (#43676), and even a desktop-pet companion (#39853).
- **Cost control & caching**: #43689 requests `prompt_cache_key` support for GPT-5.6+ to avoid paying full input-token costs in long sessions.
- **Provider/model breadth**: QwenCloud International (#43067 via PR #43674), Ox Alpha free model documentation (#43690), and Bedrock DeepSeek fixes show continued demand for more providers and cheaper/free models.

## Developer Pain Points

- **Provider reliability is the top frustration**: OpenCode Go/Console Go encrypted-content failures (#43364, #43371), tool-count limits (#43378), DeepSeek token spikes (#43639, #43661), and Bedrock DeepSeek misrouting (#43679).
- **Silent failures and lost work**: composer input destroyed during submit (#43687), clipboard write false-success toast (#41924), v2 pre-runner errors not surfaced (#34839), and permissions not propagating to subagents (#41991).
- **Configuration/install friction**: install script ignoring `OPENCODE_INSTALL_DIR` (#7675), missing `{env:VAR}` resolving to empty strings (#33853), and v2 permission overrides not applying (#43669).
- **TUI/Web UI regressions**: skills missing in v2 TUI (#43652), blank page on direct session URLs (#43667), Revert button silently doing nothing (#43670), and code-block endings cut off while streaming (#43688).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-08-21

## 1. Today's Highlights

A wave of TUI stability fixes landed this week: large-diff rendering crashes (#8395), Markdown table color leaks (#8363), and soft-wrapped text copying (#8407) are all being addressed. Community demand for `/exit` as a `/quit` alias reached critical mass with five-plus duplicate issues and two PRs, making it a likely near-term UX win. Provider-side fixes are also moving, with a kimi-coding signature normalization fix (#8405) and a Gemini 3.7 thinking-level correction (#8383) both merged or in review.

## 2. Releases

No new releases in the last 24 hours.

## 3. Hot Issues

1. **[#7547 — [Windows] How do you use Pi on windows? What issues are you seeing?](https://github.com/earendil-works/pi/issues/7547)** · by petrroll · 32 comments · 👍 1
   A community call-to-action for Windows users to consolidate pain points. With "gazillions of developers on Windows," this thread is shaping the roadmap for Windows-specific bugs, docs, and out-of-box experience.

2. **[#6879 — Auto-compaction never triggers after context grows past 100% until provider overflow](https://github.com/earendil-works/pi/issues/6879)** · by alexanderkreidich · 18 comments · 👍 17
   A 2-hour agentic turn on gpt-5.6-sol ran until the API rejected the request at 373k tokens. The author proposes checking after every agentic step, not just turn boundaries. High 👍 count signals broad frustration with context management.

3. **[#5023 — Terminal scrolls to beginning without reason](https://github.com/earendil-works/pi/issues/5023)** · by markokocic · 17 comments · 👍 2
   Closed TUI bug: the terminal randomly jumps to session start and fast-scrolls back while the model is writing output. Likely related to renderer buffer resets.

4. **[#3442 — Support WebSocket transport in openai-responses](https://github.com/earendil-works/pi/issues/3442)** · by hsingjui · 9 comments
   The `openai-responses` provider ignores `transport: "websocket"` / `"auto"` and only speaks HTTP/SSE. Latency-sensitive users want WebSocket support for streaming.

5. **[#6300 — Windows: Input line redrawn on every keystroke](https://github.com/earendil-works/pi/issues/6300)** · by polemotionkor-arch · 8 comments
   On Windows 10 with cmd.exe or Windows Terminal, each character renders on a new line. A basic TUI usability bug that blocks Windows adoption.

6. **[#8157 — Migrate grok-mermaid → lovely-mermaid](https://github.com/earendil-works/pi/issues/8157)** · by xl0 · 6 comments
   Proposal to swap the 1:1 grok mermaid port for the more polished lovely-mermaid renderer, which has better parsers and fewer inherited corner cases.

7. **[#6996 — Gemini 3.x fails during tool use due to missing thought_signature](https://github.com/earendil-works/pi/issues/6996)** · by Dulani · 5 comments
   Gemini 3.x models error when tool results are submitted back because history lacks `thought_signature`. Breaks any multi-step agentic workflow on Gemini.

8. **[#8183 — Document Windows Terminal's Ctrl+Shift+F conflict with fullscreen transcript search](https://github.com/earendil-works/pi/issues/8183)** · by MyGO-Mujica · 4 comments
   The TUI's fullscreen search binding collides with Windows Terminal's Find shortcut. Community requests a docs note plus rebinding guidance.

9. **[#8133 — Per-model compaction settings](https://github.com/earendil-works/pi/issues/8133)** · by Blue-B · 3 comments · 👍 3
   Proposal for a `compaction.profiles` map in settings.json keyed by model ID, since context limits and token economics differ wildly across models.

10. **[#8348 — No inter-session cache on OpenAI APIs, especially for forked sessions](https://github.com/earendil-works/pi/issues/8348)** · by taozhou-glean · 3 comments
    `prompt_cache_key` derives from session ID, so forked sessions miss cache entirely and re-pay prompt processing costs. Community suggests content-derived keys.

## 4. Key PR Progress

1. **[#8395 — fix(coding-agent): prevent TUI crash on large diffs by avoiding spread in push](https://github.com/earendil-works/pi/pull/8395)** · by Battleplus
   Replaces `lines.push(...contentLines)` with a loop, fixing a V8 stack-overflow crash when rendering ~14.5MB diffs. Direct fix for a painful real-world failure.

2. **[#8405 — Normalize kimi-coding thinking signatures to base64url](https://github.com/earendil-works/pi/pull/8405)** · by ytspar
   Fixes "malformed encrypted reasoning content" 400 errors on second+ turns by normalizing signature encoding for the kimi-coding provider.

3. **[#8363 — fix(tui): prevent wrapped table link color leaks](https://github.com/earendil-works/pi/pull/8363)** · by rwachtler
   Resets link colors before table padding/borders and adds tests. Fixes #8335 where link accent color bled into following cells.

4. **[#8407 — fix(tui): preserve logical lines when copying soft-wrapped text](https://github.com/earendil-works/pi/pull/8407)** · by smrnjeet222
   Mouse selections in fullscreen mode were joining visual rows with `\n`, corrupting paragraphs/URLs. Now respects logical line boundaries.

5. **[#8398 — feat: add color values and theme styling](https://github.com/earendil-works/pi/pull/8398)** · by mitsuhiko
   Major TUI/theme refactor exposing colors directly for agent styling and future non-terminal UIs. Backwards-compatible, but a significant architectural step.

6. **[#8399 — feat(settings-selector): show & make "default" searchable for model and thinking](https://github.com/earendil-works/pi/pull/8399)** · by cristinaponcela
   Adds a labeled default option in `/model` and `/thinking` pickers, making it clear when the persisted setting will be used.

7. **[#8383 — fix(ai): send LOW to disable thinking on gemini-3.7-flash](https://github.com/earendil-works/pi/pull/8383)** · by jingtao-wisdomgraph
   `MINIMAL` thinking level is rejected by gemini-3.7-flash; sends `LOW` instead. Small fix, but unblocks a popular model for non-thinking use.

8. **[#8377 — fix(coding-agent): respect min-release-age when checking npm package updates](https://github.com/earendil-works/pi/pull/8377)** · by zeke
   `npm view ... version` ignored npm's `min-release-age` cutoff, causing false "update available" banners. Aligns the checker with actual install resolution.

9. **[#8374 — fix(coding-agent): abort active run before forking from a user message](https://github.com/earendil-works/pi/pull/8374)** · by elithecho
   Forking while a run was in-flight (after escape/stop-gen or during retry sleep) could race the fork. Now settles the active run first.

10. **[#8302 — feat(ai): amazon bedrock mantle (WIP)](https://github.com/earendil-works/pi/pull/8302)** · by cristinaponcela
    Adds Mantle API support for Amazon Bedrock's new GPT-5.x models, which fail via Converse. Complements the earlier #6216; awaiting e2e API permissions.

## 5. Feature Request Trends

- **`/exit` (and `/bye`) aliases for `/quit`** — The single most duplicated request this cycle: #5340, #4538, #5161, #5863, #6193 plus the "unknown slash command" warning in #8081. Users coming from Claude Code, Codex, and opencode repeatedly waste tokens when muscle-memory commands get sent to the model.
- **Windows experience hardening** — Beyond the active #7547 thread, users want keybinding-conflict docs (#8183, #8372) and fixes for input redraw (#6300). Windows is clearly a strategic platform gap.
- **Compaction configurability and reliability** — Auto-compaction firing too late (#6879) and per-model compaction profiles (#8133) both point to context-window management as a top pain area.
- **Provider breadth and correctness** — New providers (Umans AI #8404, Bedrock Mantle #8302), WebSocket transport for openai-responses (#3442), and Gemini tool-use fixes (#6996) show the community actively extending model support.
- **Extension/host robustness** — Concurrent-session safety (#8408), last-request-context hooks (#8406), and nested-prompt guards (#8401) reflect growing use of Pi as a hosted server, not just a TUI.

## 6. Developer Pain Points

- **Muscle memory from other CLIs**: `/exit`, `/config`, and `/bye` are silently sent to the model as chat messages, costing tokens and polluting transcripts (#8081, #5863). Multiple duplicate issues indicate this is a top onboarding friction.
- **Context overflow before compaction**: Long agentic turns can blow past 100% context because compaction only triggers at turn boundaries or provider rejection (#6879, 17 👍).
- **Windows TUI flakiness**: Input redraw per keystroke (#6300) and terminal-jump bugs (#5023) make Windows a second-class experience — the exact concern #7547 is trying to quantify.
- **Provider interop failures**: Gemini 3.x tool use breaks on missing `thought_signature` (#6996); kimi-coding rejects its own encrypted reasoning signatures (#8405). Multi-turn agentic loops are fragile across providers.
- **Large-payload crashes**: Rendering large diffs can crash the TUI via stack overflow (#8395); visual-line computation wastes cycles (#8066). Users hitting big files expect the terminal to survive.
- **Forked-session cache misses**: Forking resets `prompt_cache_key`, so users re-pay full prompt processing on OpenAI-compatible APIs (#8348) — a silent cost for a common workflow.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-08-21

## 1. Today's Highlights

The Qwen Code team is heavily focused on hardening session reliability and CI/CD security, with notable progress on cross-session messaging (`#9576`) and canonical-identity deduplication for hierarchical memory (`#9600`). A new nightly release improves Web Shell approval flows by rendering approval/ask-user dialogs as in-flow sheets, while a batch of smoke-test releases confirm SWE-bench Verified and Terminal-Bench 2.0 green against reference `v0.21.14` after several sandbox-cache repairs. The busiest community threads remain provider tool-call duplication errors and unbounded memory growth in long sessions.

## 2. Releases

- **[v0.21.11-nightly.20260820.b414f135fa](https://github.com/QwenLM/qwen-code/releases)** — Nightly release featuring `feat(web-shell)`: approval and ask-user dialogs now render as in-flow sheets, plus a fix for background-agent false failure reporting (contributed by @ytahdn).
- **dsw-eas-tb-smoke-20260820-r1/r2/r3** — End-to-end smoke runs (1 SWE-bench Verified case + 1 Terminal-Bench 2.0 case) after fresh Sandbox bootstrap repair and a Harbor adapter cache-gate repair. All succeeded against benchmark ref `v0.21.14`.
- **dsw-eas-manual-smoke-20260820-r1/r2** — Manual regression smokes for ACR Python base-image mapping and post-repair Harbor flows; all SWE-bench Verified cases resolved with no execution errors.

## 3. Hot Issues

1. **[#8382 — Duplicate provider tool call id](https://github.com/QwenLM/qwen-code/issues/8382)** *(P2, 7 comments)* — Recurring "Duplicate provider tool call id" / "not recorded" errors that derail sessions. A related fix landed in the daemon path but users still report instability; this is the most-felt core bug this week.
2. **[#8724 — Cross-session messaging](https://github.com/QwenLM/qwen-code/issues/8724)** *(7 comments)* — Proposal for Qwen Code sessions on the same machine to discover and message each other with a fail-closed inbound gate. Now backed by an actual implementation PR (`#9576`); high community interest.
3. **[#9309 — Compression seems incorrect](https://github.com/QwenLM/qwen-code/issues/9309)** *(6 comments)* — After `/compress-fast` + `/compress`, context dropped from 170k to ~7k tokens, with the user suspecting incorrect truncation. Points to ongoing token-management correctness issues.
4. **[#9089 — PAT-bearing jobs share host with untrusted code](https://github.com/QwenLM/qwen-code/issues/9089)** *(P1, 6 comments)* — Review hardeners identified that autofix PAT-bearing GitHub Actions jobs run on the same host as untrusted branch code; requires runner-level isolation that can't be fixed purely inside a workflow step.
5. **[#2128 — Memory grows unboundedly in long sessions](https://github.com/QwenLM/qwen-code/issues/2128)** *(P1, 5 comments)* — Long-standing issue where the UI History array (`useHistoryManager.history`) accumulates without limit during multi-hour sessions, causing ever-growing process memory. Still open since March.
6. **[#9485 — Web Shell copy buttons fail over HTTP](https://github.com/QwenLM/qwen-code/issues/9485)** *(5 comments, closed)* — Clipboard API unavailable when the daemon serves Web Shell via plain HTTP from a non-localhost address (e.g. `http://remote-ip:4170`); a common remote-setup pain point now resolved.
7. **[#9556 — Pipeline keeps granting code execution as invoking user](https://github.com/QwenLM/qwen-code/issues/9556)** *(5 comments)* — Security review asks whether the CI pipeline should continue executing code as the review's own user; the same precondition underlies all 20 review rounds on `#9221`.
8. **[#9573 — Resumed sessions show "Tool result missing from saved history"](https://github.com/QwenLM/qwen-code/issues/9573)** *(3 comments)* — Completed tool calls appear as failed with a placeholder after session resume. Actively awaiting retest; critical for long-running agent workflows.
9. **[#9597 — Hierarchical memory loads same QWEN.md twice via symlink](https://github.com/QwenLM/qwen-code/issues/9597)** *(3 comments)* — A workspace-level `QWEN.md` symlinked to an ancestor loads the same physical file twice because dedup compares path strings only. Already addressed by PR `#9600`.
10. **[#9507 — Agent Team output isn't scrollable](https://github.com/QwenLM/qwen-code/issues/9507)** *(3 comments)* — Teammate tab content scrolls off screen and is permanently lost; a UX blocker for the experimental multi-agent feature.

## 4. Key PR Progress

1. **[#9576 — Accept cross-session messages behind an inbound gate](https://github.com/QwenLM/qwen-code/pull/9576)** — Implements `#8724`: UNIX-domain-socket peer discovery, newline-delimited JSON framing, and a policy-controlled inbound gate feeding marked messages into a session's input queue.
2. **[#9600 — Dedupe hierarchical memory files by canonical identity](https://github.com/QwenLM/qwen-code/pull/9600)** — Fixes `#9597` by resolving symlinks/canonical paths before dedup, preventing double-loading of the same physical context file.
3. **[#9584 — Clear high-severity CVE baseline and harden security gate](https://github.com/QwenLM/qwen-code/pull/9584)** — Upgrades the vulnerable OpenTelemetry stack to 0.221.x and turns the dependency CVE gate from reporting-only into a hard failing gate.
4. **[#9577 — Disable install scripts in release CI](https://github.com/QwenLM/qwen-code/pull/9577)** — Npm packaging and stable-release finalizers now run with lifecycle scripts disabled and explicit repository-owned postinstall steps, reducing supply-chain risk from write-capable PATs.
5. **[#9543 — Bind GitHub PRs to sessions with sidebar badge and search](https://github.com/QwenLM/qwen-code/pull/9543)** — Web Shell now binds created PRs to the originating session (bounded list of 10), with sidebar badge and search support.
6. **[#9506 — Invalidate token counts recorded for a switched model route](https://github.com/QwenLM/qwen-code/pull/9506)** — Scopes GeminiChat's API-reported token counts to the active model route and invalidates them on route change; follow-up `#9564` threads the request route through in-send compression.
7. **[#9273 — capture-tui: rendering claims get pixels, not prose](https://github.com/QwenLM/qwen-code/pull/9273)** — New `qwen review capture-tui` command drives commands in a private tmux server, captures pane text to `.ans`, and renders `.png` when `freeze` is available.
8. **[#9441 — Show edit/exec diffs when PreToolUse hook returns ask](https://github.com/QwenLM/qwen-code/pull/9441)** — Bounces tool calls back to `awaiting_approval` with structured edit/exec diffs instead of a synthetic plain-text prompt, improving interactive approval UX.
9. **[#8927 — Bound session lifetime with sessionRotation](https://github.com/QwenLM/qwen-code/pull/8927)** — Adds per-channel `sessionRotation` with `maxTurns` and time bounds, so stale routes rotate to fresh sessions instead of reusing them indefinitely.
10. **[#9602 — Clear tool display list before awaiting completion callback](https://github.com/QwenLM/qwen-code/pull/9602)** — Moves the display-list clear ahead of the completion callback in `CoreToolScheduler.checkAndNotifyCompletion()`, preventing stale tool UI during async completions.

## 5. Feature Request Trends

- **Inter-session and multi-agent collaboration** — Cross-session messaging (`#8724`, PR `#9576`) and Agent Team UX improvements (`#9507`) show growing demand for sessions/agents that coordinate with each other.
- **External/enterprise memory integration** — `#7449` proposes a provider-neutral enterprise external-memory integration profile; memory reliability issues like `#9597` are also drawing attention.
- **Session lifecycle governance** — Session rotation bounds (`#8927`) and unblocking session operations that currently depend on provenance classification (`#9488`) point toward more robust lifecycle management.
- **Goal/agent observability** — Token accounting for Goals (`#9583`) and unified continuation-prompt rendering (`#9581`) indicate demand for more transparent multi-agent operations.
- **Web Shell productivity features** — PR binding to sessions (`#9543`), reasoning-effort previews before session creation (`#9599`), and persisted manual session names across `/clear` (`#9260`) continue to polish the remote-development experience.
- **Security-hardened automated review** — Multiple PRs/Issues from @wenshao (e.g. `#9526`, `#9572`, `#9557`) push toward a review pipeline with pinned identities, convergence exit conditions, and least-privilege execution.

## 6. Developer Pain Points

- **Tool-call flakiness** — "Duplicate provider tool call id" errors (`#8382`, `#9586`) and resumed sessions showing missing tool results (`#9573`) are the top session-reliability frustrations.
- **Unbounded memory growth** — `#2128` remains open since March; long-running sessions keep exhausting memory due to unbounded UI history accumulation.
- **Context compression correctness** — `#9309` and `#9564` highlight that compression and token accounting behave unexpectedly after model-route switches or consecutive `/compress` calls.
- **Web Shell remote-access friction** — HTTP clipboard failures (`#9485`), slow/unstable sidebar pinning (`#9465`), non-scrollable teammate output (`#9507`), and confirmation dialogs grabbing focus (`#9571`) all degrade the remote UI experience.
- **CI/CD security anxiety** — PAT exposure on shared runners (`#9089`), symlink wipe-guard wedges (`#9480`), and pipelines executing code as the invoking user (`#9556`) signal deep unease about self-hosted CI trust boundaries.
- **Update-notification noise** — Homebrew users continue to see persistent "update available" prompts (`#9493`) because the npm `latest` check ignores the Homebrew install path.

---

*Data source: [github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) · Digest generated 2026-08-21*

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI / CodeWhale Community Digest — 2026-08-21

## Today’s Highlights
Codewhale v0.9.10 shipped as the “retention, identity, first-run, and release-hardening” train, while the legacy `deepseek-tui` package was formally deprecated. Community PRs advanced the read_lints tool, turn-loop decomposition, and the web documentation i18n “dictionary spine.” The hottest open threads are UX regressions, Chinese localization, and first-run onboarding friction.

## Releases
- **[v0.9.10](https://github.com/Hmbown/CodeWhale/releases)** — “Codewhale” is now the public product name; the `codewhale` command, npm package, and release assets stay lowercase. The legacy npm package `deepseek-tui` is deprecated and receives no further releases. This release is described as the retention, identity, first-run, and release-hardening train. See the release PR: [Hmbown/CodeWhale PR #5513](https://github.com/Hmbown/CodeWhale/pull/5513)

## Hot Issues
- [#5522 — v0.9.10: make first run progressive instead of front-loading configuration](https://github.com/Hmbown/CodeWhale/issues/5522)  
  Direct user feedback: first launch has too much psychological cost, especially for non-English users. New release acceptance criteria call for starting in the selected locale and reducing upfront settings walls.

- [#5518 — Emergency compaction triggers around ~85K–105K tokens on DeepSeek V4 despite a 327,680-token route context](https://github.com/Hmbown/CodeWhale/issues/5518)  
  Reproducible early compaction in long-running sessions with `context_window = 327680` and `auto_compact = false`. Points to possible output-headroom budgeting and handoff state contamination.

- [#5516 — HTTP 400 max_tokens=384000 exceeds model limit after upgrading to v0.9.9](https://github.com/Hmbown/CodeWhale/issues/5516)  
  Users report every request failing after upgrade even with no manual configuration. Serious upgrade regression affecting model limits.

- [#5512 — Header status indicator (cw/whale/dots) never renders since 0.9.7](https://github.com/Hmbown/CodeWhale/issues/5512)  
  Windows 11 / Windows Terminal regression. The status indicator worked in the 0.8.64 era but is invisible on 0.9.7+.

- [#5355 — v0.9.8 Known issues: parallel-load and config-fixture flakes](https://github.com/Hmbown/CodeWhale/issues/5355)  
  Known flaky tests carried over from the v0.9.7 close-out, including `exec_persistent_service::failed_exec_*` and `exact_turn_snapshot_restores_custom_endpoint...`.

- [#5316 — EPIC-005: CodeWhale TUI Crate Decomposition (Umbrella)](https://github.com/Hmbown/CodeWhale/issues/5316)  
  Large architectural tracking issue for decomposing the TUI crate. Still open with 10 comments and multiple sub-EPICs reporting progress.

- [#5482 — EPIC(docs): review, partially restructure, and fully localize documentation to Chinese](https://github.com/Hmbown/CodeWhale/issues/5482)  
  Growing Chinese user base, but many `docs/` files remain English-only. Machine translation quality and stale docs are also concerns.

- [#5023 — IME Candidate Window Jumps / Unstable Position During Input](https://github.com/Hmbown/CodeWhale/issues/5023)  
  Windows IME candidate window positioning is unstable. Important for Chinese/Japanese/Korean input users.

- [#5526 — Deprecated shell completion](https://github.com/Hmbown/CodeWhale/issues/5526)  
  `codew completions powershell` generates outdated completion scripts that still trigger `codewhale-tui`. User cannot find docs or config to fix it.

- [#5442 — Discoverability debt: advanced commands hidden at the palette root, config-only capabilities](https://github.com/Hmbown/CodeWhale/issues/5442)  
  Product audit showing ~34 advanced commands never appear at the discovery root, making shipped power features effectively invisible.

- [#998 — 文案展示不全 / truncated text needs hover tooltip](https://github.com/Hmbown/CodeWhale/issues/998)  
  Old but still active enhancement: text is truncated in the UI and users want a full tooltip on hover.

- [#5345 — [FR] Add multi-line mode or allow custom “send” shortcut](https://github.com/Hmbown/CodeWhale/issues/5345)  
  Users want `enter` to insert newlines and `shift+enter` / `ctrl+enter` to send, similar to Grok Build and Codex.

## Key PR Progress
- [#5524 — feat(tui): add multi-file read_lints operation](https://github.com/Hmbown/CodeWhale/pull/5524)  
  Implements the approved scope of #4070: model-visible `lsp` tool gains `read_lints` for multiple existing workspace files, reusing the existing LSP manager and transport pool.

- [#5525 — refactor(tui): adopt command shapes in utility group (FEAT-018)](https://github.com/Hmbown/CodeWhale/pull/5525)  
  Converts the complete TUI utility command group to the new external command shapes from FEAT-014/FEAT-015 without physically moving command files.

- [#5523 — refactor(tui): extract tool call stages from turn loop](https://github.com/Hmbown/CodeWhale/pull/5523)  
  Splits tool-call planning, approval/execution, and result projection into separate functions while preserving control order and cancellation behavior.

- [#5520 — feat(web): move docs/sandbox and docs/web onto the dictionary spine (#5337)](https://github.com/Hmbown/CodeWhale/pull/5520)  
  Removes 14 and 15 `isZh` branches in two doc areas; zero `isZh` branches remain there. Adds both to `check-locales.mjs` optional parity checks.

- [#5521 — chore(tui): drop a single-argument concat!](https://github.com/Hmbown/CodeWhale/pull/5521)  
  Fixes a clippy `useless-concat` lint failure on `main` at `runtime_handoff.rs:83`.

- [#5515 — fix(tui): forward MCP image results as typed content](https://github.com/Hmbown/CodeWhale/pull/5515)  
  Converts MCP `image` content into CodeWhale’s provider-neutral rich tool-result block, preserving text, structured content, and `isError` semantics.

- [#5514 — refactor(tui): extract stream processing from turn loop](https://github.com/Hmbown/CodeWhale/pull/5514)  
  Extracts the response-stream state machine into `process_stream`, returning only stream-produced state through `StreamOutcome`.

- [#5513 — release: Codewhale v0.9.10 — retention, identity, and durable approvals](https://github.com/Hmbown/CodeWhale/pull/5513)  
  The full 76-commit release lane, rebased over `main` and prior community changes.

- [#5509 — fix(tui): restore /title as an independent terminal window title (#5430)](https://github.com/Hmbown/CodeWhale/pull/5509)  
  Fixes regression where `/title` became a delegated alias to `/rename`; now `/title` is again an independent terminal window title command.

- [#5517 — feat(web): move docs/constitution and docs/runtime-api onto the dictionary spine (#5337)](https://github.com/Hmbown/CodeWhale/pull/5517)  
  Phase 2 of i18n: removes 14 `isZh` branches per doc area, wires two dictionaries per page, and adds files to locale parity enforcement.

## Feature Request Trends
- **Chinese localization and documentation**: Multiple PRs continue the “dictionary spine” work (#5337 series), while #5482 asks for full Chinese docs. The Chinese community is a major voice in both issues and PRs.
- **Multi-line input / custom send keybindings**: #5345 and related UX requests show strong demand for editor-friendly input over single-line terminal prompts.
- **On-demand diagnostics**: The read_lints tool request (#4070) is now being implemented in #5524, indicating LSP-driven diagnostics are a priority.
- **Lower first-run friction**: #5522 highlights the need for progressive onboarding instead of front-heavy configuration and telemetry disclosure.
- **Continuous/infinite turn mode**: #5508 asks for an “infinite turn” option until interruption, useful for AI-coordinator agents.
- **Discoverability improvements**: #5442 wants advanced commands surfaced at the palette root instead of hidden in config-only features.
- **Typed MCP content**: #5515 shows movement toward richer MCP tool-result handling, a trend likely to continue.

## Developer Pain Points
- **Upgrade regressions**: Reports like #5516 (`max_tokens` failure after v0.9.9) and #5512 (header indicator missing) show that upgrades are breaking previously working configurations.
- **Flaky CI / release gates**: #5355 and #5496 document parallel-load flakes, config-fixture instability, and unbounded release jobs that stall release validation.
- **Windows-specific friction**: IME candidate window jumps (#5023) and default terminal behavior (#1854) remain recurring pain points for Windows users.
- **i18n and CJK text rendering**: Issues like #998 and #5345 continue to surface poor text truncation and input behavior for Chinese users.
- **Discoverability and outdated documentation**: #5526 and #5442 reflect frustration with hidden commands, stale shell completions, and documentation that does not match current command names.
- **Long-session reliability**: #5518 shows that even with explicitly configured large context windows and `auto_compact = false`, the TUI can trigger emergency compaction prematurely — a high-impact reliability concern for agent-style workflows.

</details>

<details>
<summary><strong>Grok Build</strong> — <a href="https://github.com/xai-org/grok-build">xai-org/grok-build</a></summary>

No activity in the last 24 hours.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Liderhu/agents-radar).*