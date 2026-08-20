# OpenClaw Ecosystem Digest 2026-08-21

> Issues: 500 | PRs: 500 | Projects covered: 12 | Generated: 2026-08-20 17:03 UTC

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

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-08-21

## 1. Today's Overview

OpenClaw is in an intense maintenance cycle: 500 issues and 500 PRs were updated in the last 24 hours, with 53 issues and 150 PRs reaching closed/merged status. No new release was published; the closest release signal is active community validation of `v2026.8.1-beta.2`. Activity is dominated by bug fixes around session state integrity, message delivery, provider/auth handling, and event-loop stalls. Overall throughput is high, but maintainer bandwidth appears stretched: many top issues remain tagged `needs-maintainer-review` or `needs-product-decision`.

## 2. Releases

**No new releases were published in the last 24 hours.**

The only release-related activity is the open validation issue for `v2026.8.1-beta.2`:
- [#125626 — Release validation: v2026.8.1-beta.2](https://github.com/openclaw/openclaw/issues/125626) — 17 comments, updated 2026-08-20. Beta validation still appears to be in progress.

## 3. Project Progress

150 PRs are recorded as merged/closed in the aggregate 24-hour window. Among the visible top-30 PRs, the notable closed/merged items are:

- [#126284 — feat(sessions): recover offline device placements](https://github.com/openclaw/openclaw/pull/126284) — session/UI handling for offline paired devices.
- [#125471 — fix(models): keep Claude CLI OAuth available in Control UI](https://github.com/openclaw/openclaw/pull/125471) — OAuth refresh ownership fix.
- [#120900 — feat(ui): review install policy warnings](https://github.com/openclaw/openclaw/pull/120900) — admins can acknowledge install-policy warnings in UI.
- [#116489 — feat(security): require acknowledgement for install policy warnings](https://github.com/openclaw/openclaw/pull/116489) — security boundary improvement.
- [#125816 — fix(models): Web UI provider probe fails for direct-credential providers](https://github.com/openclaw/openclaw/pull/125816) — model provider probing fix.
- [#126739 — fix(telegram): make common emoji reactions work reliably](https://github.com/openclaw/openclaw/pull/126739) — Telegram reaction identifier handling.

Two high-profile issues also closed in the window:
- [#50165 — Subagents can appear completed before underlying work is finished](https://github.com/openclaw/openclaw/issues/50165)
- [#112395 — Startup migration preflight blocks gateway after 6.11 → 7.1 upgrade](https://github.com/openclaw/openclaw/issues/112395) — P0 regression, now closed.

## 4. Community Hot Topics

The most active issues by comment count are:

| Issue | Comments | Summary |
|---|---|---|
| [#125626](https://github.com/openclaw/openclaw/issues/125626) | 17 | Release validation for v2026.8.1-beta.2 |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) | 16 | Large SQLite transcript cleanup blocks gateway event loop |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) | 15 | WhatsApp image wedges main lane ~3 min |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 14 | Gemini provider regression: “Cannot convert undefined or null to object” |
| [#108435](https://github.com/openclaw/openclaw/issues/108435) | 14 | Gateway fails to start after updating to 2026.7.1 |
| [#53628](https://github.com/openclaw/openclaw/issues/53628) | 13 | `XDG_CONFIG_HOME` not expanded when installing a skill |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | 13 | Umbrella: duplicate transcript/replay/context-assembly bugs across channels |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | 13 | Multi-agent orchestration unstable: config overwrites, session-lock failures, detached work |
| [#88657](https://github.com/openclaw/openclaw/issues/88657) | 11 | DeepSeek V4 Flash produces incomplete turns |
| [#43747](https://github.com/openclaw/openclaw/issues/43747) | 11 | Memory management behavior inconsistent across users |

By reactions, the most notable are:
- [#38327](https://github.com/openclaw/openclaw/issues/38327) — 3 👍
- [#108435](https://github.com/openclaw/openclaw/issues/108435) — 3 👍
- [#80498](https://github.com/openclaw/openclaw/issues/80498) — 3 👍 (premature/duplicated subagent completion announcements)

**Underlying need:** Users are primarily asking for reliability and trust — no silent message loss, no session/transcript corruption, and clear failure behavior across channels, providers, and auth paths.

## 5. Bugs & Stability

Ranked by severity:

| Severity | Issue | Status | Summary |
|---|---|---|---|
| P0 | [#108435](https://github.com/openclaw/openclaw/issues/108435) | Open | Gateway fails to start after update to 2026.7.1; systemd, ollama, and manual launch all fail |
| P0 | [#112395](https://github.com/openclaw/openclaw/issues/112395) | Closed | Startup migration preflight blocks gateway after upgrade; migration tables/leases empty |
| P0 | [#124788](https://github.com/openclaw/openclaw/issues/124788) | Open | beta.2 gateway event loop blocks ~100–120s every ~10.9 min; HTTP, WebSocket, and cron stall |
| P1 | [#112423](https://github.com/openclaw/openclaw/issues/112423) | Open | Large SQLite transcript cleanup blocks the gateway event loop |
| P1 | [#96834](https://github.com/openclaw/openclaw/issues/96834) | Open | WhatsApp 1:1 inbound image wedges message lane; stranded active/queued work |
| P1 | [#123273](https://github.com/openclaw/openclaw/issues/123273) | Open | Image attachments fail for named agents, but work for default agent |
| P1 | [#92241](https://github.com/openclaw/openclaw/issues/92241) | Open | Gateway holds stale module paths after rollback; messages silently dropped |
| P1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Open | Hook/tool child processes leak, causing zombie accumulation |
| P1 | [#119087](https://github.com/openclaw/openclaw/issues/119087) | Open | Gateway cold start regressed ~2.5x from 7.1-beta.1 to 7.2-beta.7 |
| P1 | [#95553](https://github.com/openclaw/openclaw/issues/95553) | Open | Preflight compaction hard-capped at ~60s; ignores `compaction.timeoutSeconds` |
| P1 | [#38327](https://github.com/openclaw/openclaw/issues/38327) | Open | Regression: google-vertex/gemini-3.1-pro-preview fails with “Cannot convert undefined or null to object” |
| P1 | [#120735](https://github.com/openclaw/openclaw/issues/120735) | Open | Telegram stickers arrive as raw refs, not staged or described |
| P1 | [#114211](https://github.com/openclaw/openclaw/issues/114211) | Open | Matrix room agents loop on no-reply output and stale session replay |
| P1 | [#86612](https://github.com/openclaw/openclaw/issues/86612) | Open | Docker gateway restart loop with `OPENCLAW_SANDBOX=1` and `OPENCLAW_HOME=/mnt/...` |
| P1 | [#83598](https://github.com/openclaw/openclaw/issues/83598) | Open | `anthropic:claude-cli` OAuth refresh still dead-ends main lane |

**Fix PRs visible today:** No directly linked fix PRs appear for most P0/P1 issues in the provided data. However, several nearby fixes landed or are open:

- [#126685](https://github.com/openclaw/openclaw/pull/126685) — avoid startup stalls with many empty agent stores.
- [#126748](https://github.com/openclaw/openclaw/pull/126748) — keep divergent retired device identity from blocking gateway readiness.
- [#126749](https://github.com/openclaw/openclaw/pull/126749) — keep unresolved image suppression out of persisted transcript.
- [#126611](https://github.com/openclaw/openclaw/pull/126611) — fix custom reasoning models truncating tool-call JSON.
- [#126616](https://github.com/openclaw/openclaw/pull/126616) — fix HTTP chat binding one unbounded session for constant OpenAI `user`.
- [#126737](https://github.com/openclaw/openclaw/pull/126737) — report cached plugin load failures before registry activation.

## 6. Feature Requests & Roadmap Signals

Notable user-requested features that could shape the next release:

- [#14785](https://github.com/openclaw/openclaw/issues/14785) — Reduce tool schema token overhead (~3,500 tokens/session). Strong cost-saving candidate.
- [#13700](https://github.com/openclaw/openclaw/issues/13700) — Session snapshots: `/session save|load` checkpoints. Long-standing workflow request.
- [#42276](https://github.com/openclaw/openclaw/issues/42276) — Reasoning stream / overwrite-line thinking output like OpenAI and Grok.
- [#53654](https://github.com/openclaw/openclaw/issues/53654) — Discord `messageUpdate` / `messageDelete` support for edit-to-reprocess and delete-to-cancel.
- [#88032](https://github.com/openclaw/openclaw/issues/88032) — First-class durable Telegram quote/reply context.
- [#47910](https://github.com/openclaw/openclaw/issues/47910) — Provider fallback by failure class, quarantining auth-broken providers.
- [#51441](https://github.com/openclaw/openclaw/issues/51441) — Expose resolved backend model in session status/agent runtime when using LiteLLM/proxies.
- [#50798](https://github.com/openclaw/openclaw/issues/50798) — Visible agent-to-agent messaging for ACP thread-bound sessions.
- [#33102](https://github.com/openclaw/openclaw/issues/33102) — Config support for TUI `--deliver` flag default.
- [#14747](https://github.com/openclaw/openclaw/issues/14747) — Configurable lane-wait diagnostic threshold for long cron jobs.

**Near-term roadmap signals from open PRs:** The next beta/patch likely includes HTTP-chat improvements ([#126616](https://github.com/openclaw/openclaw/pull/126616), [#126619](https://github.com/openclaw/openclaw/pull/126619)), custom reasoning-model token fixes ([#126611](https://github.com/openclaw/openclaw/pull/126611)), Control UI refresh/storm fixes ([#123535](https://github.com/openclaw/openclaw/pull/123535), [#126726](https://github.com/openclaw/openclaw/pull/126726)), and Telegram/channel reliability PRs ([#120419](https://github.com/openclaw/openclaw/pull/120419), [#126739](https://github.com/openclaw/openclaw/pull/126739)).

## 7. User Feedback Summary

Recurring user pain points visible in the data:

- **Silent failures are the biggest frustration:** messages dropped after rollback ([#92241](https://github.com/openclaw/openclaw/issues/92241)), silent model-switch failures ([#58957](https://github.com/openclaw/openclaw/issues/58957)), and incomplete DeepSeek turns ([#88657](https://github.com/openclaw/openclaw/issues/88657)).
- **Session/state integrity is a major concern:** duplicate transcripts ([#69208](https://github.com/openclaw/openclaw/issues/69208)), orphaned compaction forks ([#48810](https://github.com/openclaw/openclaw/issues/48810)), premature subagent completion ([#50165](https://github.com/openclaw/openclaw/issues/50165), [#80498](https://github.com/openclaw/openclaw/issues/80498)), and inconsistent memory management ([#43747](https://github.com/openclaw/openclaw/issues/43747)).
- **Channel and multimodal support remains uneven:** WhatsApp image handling ([#96834](https://github.com/openclaw/openclaw/issues/96834)), Telegram stickers ([#120735](https://github.com/openclaw/openclaw/issues/120735)), and named-agent image attachment failures ([#123273](https://github.com/openclaw/openclaw/issues/123273)).
- **Provider/auth pain is widespread:** OAuth refresh dead-ends ([#83598](https://github.com/openclaw/openclaw/issues/83598)), Gemini regression ([#38327](https://github.com/openclaw/openclaw/issues/38327)), and provider display normalization issues ([#47840](https://github.com/openclaw/openclaw/issues/47840)).
- **Performance regressions on constrained hardware:** event-loop blocks ([#124788](https://github.com/openclaw/openclaw/issues/124788), [#112423](https://github.com/openclaw/openclaw/issues/112423)), cold-start regression ([#119087](https://github.com/openclaw/openclaw/issues/119087)), and zombie process accumulation ([#97616](https://github.com/openclaw/openclaw/issues/97616)).

Users are actively engaged and file high-quality reproductions, but the overall sentiment skews toward frustration with regressions and state-inconsistency bugs.

## 8. Backlog Watch

Long-running or important issues still needing maintainer attention:

| Issue | Age / Status | Why it matters |
|---|---|---|
| [#14785](https://github.com/openclaw/openclaw/issues/14785) | Opened Feb 12, P2, needs maintainer/product | Tool schema token overhead (~3,500 tokens/session) |
| [#13700](https://github.com/openclaw/openclaw/issues/13700) | Opened Feb 10, enhancement | Session snapshot save/load feature |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | Opened Mar 6, P1 regression | Gemini regression, 3 👍, 14 comments |
| [#43747](https://github.com/openclaw/openclaw/issues/43747) | Opened Mar 12, needs maintainer/product | Memory management described as “in chaos” |
| [#45494](https://github.com/openclaw/openclaw/issues/45494) | Opened Mar 13, needs maintainer/product | Cron jobs silently time out during provider outages |
| [#50291](https://github.com/openclaw/openclaw/issues/50291) | Opened Mar 19, needs maintainer/product | Plugin hooks missing distributed-trace context |
| [#53654](https://github.com/openclaw/openclaw/issues/53654) | Opened Mar 24 | Discord edit/delete event support; 3 👍 |
| [#123799](https://github.com/openclaw/openclaw/issues/123799) | Opened Aug 14, P1 | Production users need upgrade/backport guidance for Codex compact 404 |

Open PRs currently waiting on author/maintainer responses:

- [#126744](https://github.com/openclaw/openclaw/pull/126744) — test(gateway): keep per-case session stores authoritative
- [#123356](https://github.com/openclaw/openclaw/pull/123356) — improve(control-ui): stage slash command arguments in composer
- [#114466](https://github.com/openclaw/openclaw/pull/114466) — fix(discord): strip internal runtime context
- [#117712](https://github.com/openclaw/openclaw/pull/117712) — dependabot actions group update
- [#123288](https://github.com/openclaw/openclaw/pull/123288) — fix(ui): show one session activity indicator
- [#126738](https://github.com/openclaw/openclaw/pull/126738) — fix(ui): lazy-load onboarding memory import

The large number of `needs-maintainer-review` / `needs-product-decision` items suggests maintainer review capacity is the main bottleneck for clearing the backlog.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Comparison Report — 2026-08-21

## 1. Ecosystem Overview

The personal AI assistant/agent open-source landscape is in a **consolidation and hardening phase**: across the twelve tracked projects, 604 issues and 781 PRs were updated in 24 hours, but no major new feature releases landed — the dominant activity is bug fixing, regression repair, and backlog cleanup. The ecosystem is clustering around three themes: **channel reliability** (WhatsApp, Slack, Telegram, Discord), **session/state integrity**, and **provider/auth robustness**, with install-path integrity and sandbox security emerging as new trust gates. OpenClaw remains the reference implementation with 10× the activity of any peer, but it is visibly bottlenecked on maintainer review capacity, while smaller projects like IronClaw, Moltis, and CoPaw ship stable releases with healthier merge-to-open ratios, suggesting the center of gravity for *reliable* innovation is shifting. Chinese-ecosystem projects (CoPaw, LobsterAI) are converging on the same reliability concerns as Western projects, indicating a shared global pain matrix rather than regional divergence.

## 2. Activity Comparison

Data covers the 24-hour window ending 2026-08-21. Health score = weighted composite of merge/close throughput, release cadence, backlog risk (stale/conflicted items), and open-severity bugs (1–10).

| Project | Issues updated (closed) | PRs updated (merged/closed) | Release status | Health |
|---|---|---|---|---|
| **OpenClaw** | 500 (53) | 500 (150) | None; v2026.8.1-beta.2 in community validation | 8/10 |
| **IronClaw** | 15 (4) | 38 (15) | **v1.3.0 stable** (promoted from rc.2) | 9/10 |
| **CoPaw (QwenPaw)** | 27 (13) | 50 (29) | v2.1.1-beta.1 | 8/10 |
| **Moltis** | 1 (1) | 6 (4) | **20260820.01** published | 8/10 |
| **NanoClaw** | 4 (1) | 50 (19) | None | 7/10 |
| **ZeroClaw** | 50 (6) | 50 (5) | None; v0.8.4 latest | 7/10 |
| **NanoBot** | 4 (2) | 27 (11) | None | 7/10 |
| **Hermes Agent** | 50 (0) | 50 (3) | None; v0.20.4 referenced | 5/10 |
| **LobsterAI** | 2 (0) | 7 (6)* | None | 5/10 |
| **PicoClaw** | 0 (0) | 3 (0) | None | 4/10 |
| **NullClaw** | 0 (0) | 0 (0) | None | 2/10 |
| **ZeptoClaw** | 0 (0) | 0 (0) | None | 2/10 |

*\*LobsterAI's PR closures are 5/6 `[stale]`-labeled; merge status needs maintainer verification.*

**Key observations:**
- **Merge efficiency leaders:** IronClaw (39% of touched PRs merged), CoPaw (58%), Moltis (67%).
- **Volume leader:** OpenClaw (150 merges) — but with 500 touched, close ratio is only 30%.
- **Stalled:** Hermes closed 0 issues despite 50 touched; PicoClaw, NullClaw, ZeptoClaw are effectively dormant.
- **Only IronClaw and Moltis shipped stable, non-beta releases** in this window; OpenClaw, CoPaw, and ZeroClaw are between releases or validating betas.

## 3. OpenClaw's Position

**Advantages:**
- **Scale and gravity:** 500 issues/PRs per day vs. 15–50 for peers; 53 issue closures and 150 PR merges in 24h alone. No other project approaches this community footprint.
- **Reference status:** LobsterAI explicitly builds on the OpenClaw runtime, confirming its role as an engine, not just an app. The gateway architecture (channels as lanes, provider abstraction, session state) is becoming the ecosystem's mental model.
- **Broad channel/provider surface:** 12+ channels and a long-tail provider ecosystem; peers typically cover 3–5 channels.

**Technical approach differences:**
- OpenClaw's **centralized gateway + lane-based concurrency** enables multi-channel parity but creates single points of failure (event-loop stalls, migration preflight blocks). Peers like Moltis (lightweight messaging layer) and IronClaw (sandbox-first) deliberately avoid this coupling.
- OpenClaw carries **10+ open P0/P1 reliability bugs** (event-loop blocks, silent message drops, subagent completion races) — a tax on its breadth. IronClaw's smaller surface shipped a stable v1.3.0 with no equivalent severity cluster.

**Community size comparison:**
- OpenClaw's 24h activity (500/500) is ~10× NanoClaw/ZeroClaw, ~15× IronClaw, ~100× Moltis/PicoClaw. Community engagement (17 comments on beta validation, reaction-driven issue ranking) confirms broad active usage.
- **However:** high volume with `needs-maintainer-review` backlogs indicates the community outpaces maintainer capacity. IronClaw and Moltis demonstrate the opposite dynamic — small, fast, decisive maintainer teams.

## 4. Shared Technical Focus Areas

Requirements emerging across three or more projects (with specifics):

| Focus area | Projects | Specific needs |
|---|---|---|
| **Channel reliability & semantics** | OpenClaw, Moltis, NanoClaw, Hermes, PicoClaw, CoPaw, ZeroClaw | WhatsApp media mount paths (NanoClaw #2715; OpenClaw #96834), reply-as-mention semantics (Moltis #1217), thread/mention-sticky engagement (NanoClaw #3369), Telegram topics (PicoClaw #3315) and stickers (OpenClaw #120735), Discord edit/delete (OpenClaw #53654) |
| **Session/state integrity** | OpenClaw, Hermes, NanoBot, PicoClaw, CoPaw, ZeroClaw | Transcript duplication (OpenClaw #69208), cross-channel history persistence (NanoBot #3145), lost sessions after update (Hermes #89675), routed-agent context loss (PicoClaw #3316), silent stops (CoPaw #6921), failed turns disappearing (ZeroClaw #9333, #8794) |
| **Provider/auth robustness** | OpenClaw, NanoBot, Hermes, IronClaw, CoPaw | OAuth failure modes (OpenClaw #83598; NanoBot #5444), provider regression quarantine (OpenClaw #47910), exception-class fallbacks (NanoBot #5413), network-recovery without restart (CoPaw #6932), model-specific bugs (Gemini/DeepSeek/GLM/Kimi) |
| **Streaming resilience** | OpenClaw, NanoBot, CoPaw, ZeroClaw | Mid-stream error retry (NanoBot #5454), `httpx.ReadError` during streaming (CoPaw #7162), incomplete turns (OpenClaw #88657) |
| **Install/update path integrity** | Hermes, NanoClaw, ZeroClaw, LobsterAI, Moltis | Windows update silent crashes (Hermes #90060), Node 26 setup failure (NanoClaw #3359), installer crashes (ZeroClaw #9290), packaging utility gaps (LobsterAI #1555), atomic config writes (CoPaw #7135) |
| **Sandbox & security policy** | ZeroClaw, IronClaw, Moltis, OpenClaw | High-risk command policy bypasses (ZeroClaw #10164/#10165), persistent per-user sandboxes (IronClaw #7732), unauthenticated vault endpoints (Moltis #1177), install-policy warnings (OpenClaw #116489) |
| **MCP integration maturation** | NanoBot, IronClaw, ZeroClaw, CoPaw | SDK v2 migration decision (NanoBot #5179/#5180), local/stdio MCP transport (IronClaw #5998), MCP-backed memory (IronClaw #7661), MCP as modular-core replacement (ZeroClaw #6165) |
| **Memory/context management** | ZeroClaw, OpenClaw, IronClaw, PicoClaw, CoPaw | Persistent memory parity epic (ZeroClaw #8891), inconsistent memory behavior (OpenClaw #43747), expected-version writes (IronClaw #7776), `history.db` bloat (CoPaw #7168) |

## 5. Differentiation Analysis

| Project | Feature focus | Target users | Architecture |
|---|---|---|---|
| **OpenClaw** | General-purpose multi-channel gateway; session-state platform | Power users, self-hosters, developers building agents | Centralized gateway, channel lanes, provider abstraction, large plugin surface |
| **IronClaw** | Sandbox persistence, automations, agent lifecycle hooks, notifications | Teams/enterprise-adjacent (nearai); production deployments | Phased epic-driven; Docker-Exec sandboxes, hook-based extensibility, notification-inbox contracts |
| **Hermes Agent** | Desktop-first UX (Tauri), Bot Mode, cloud (Hermes Cloud) parity | Consumer desktop users across macOS/Windows/Linux | Desktop app + cloud gateway; heavy install/update surface |
| **CoPaw (QwenPaw)** | Qwen-model ecosystem, task-oriented console, Chat/Agent/Workflow tri-mode | Chinese-speaking users; Alibaba/Qwen developers | Desktop console + Python backend; persistent drivers for cold-start performance |
| **LobsterAI** | Agent cowork (Write tool artifacts, file preview), Chinese UI, OpenClaw-engine integration | Chinese desktop users; NetEase Youdao ecosystem | Electron desktop on OpenClaw runtime; Redux-heavy client state |
| **Moltis** | Messaging-layer platform; WhatsApp-first; self-hosted security | Production-ish WhatsApp/DM operators | Lightweight HTTP + auth-gate; channel semantics attention |
| **NanoBot** | Personal lightweight agent; TUI + WebUI; session resume | Solo developers, Docker self-hosters | Python; websocket sessions; provider fallback policy |
| **ZeroClaw** | Rust core, ZeroCode UX, SOP automation, policy contracts | Security-conscious Rust users; automation-heavy ops | Rust; SOP step engine; WASM-plugin roadmap; strict config |
| **NanoClaw** | Install-skill ecosystem; one-click Slack/WhatsApp | Node/TypeScript developers, quick onboarding | TypeScript/Node; DB-backed group instructions; per-group MCP seams |
| **PicoClaw** | Lightweight Go channel bots (Discord/LINE/Telegram) | Go developers; single-channel deployments | Go; minimal surface; routed-agent context |

**Structural insight:** The ecosystem is dividing into **platforms** (OpenClaw, IronClaw, ZeroClaw), **channel-first deployments** (Moltis, PicoClaw, NanoClaw), and **desktop/product experiences** (Hermes, LobsterAI, CoPaw) — with NanoBot as the lightweight personal tool. Regional clusters (CoPaw/LobsterAI for Chinese-first UX) coexist with global infrastructure concerns.

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration, shipping:**
*IronClaw, Moltis, CoPaw* — High merge ratios (39–67%), stable/beta releases in-window, balanced issue-to-PR hygiene. IronClaw has the strongest governance signal: explicit version targets (v1.4.0), phased epics, and a maintainer decision queue.

**Tier 2 — High volume, review-bottlenecked:**
*OpenClaw, ZeroClaw, NanoClaw* — Massive PR throughput (19–150 merges/day) but with stretched maintainers, stacked-PR dependencies (NanoClaw's 12-PR audit stack on #3408), and `needs-maintainer-review` backlogs. OpenClaw's 500-issue surface is both its strength and its biggest operational risk.

**Tier 3 — Responsive but lower volume:**
*NanoBot* — Healthy contributor-led fixes, but harbors a competing-PR risk (MCP SDK v2 #5179/#5180) that needs a maintainer decision before it rots.

**Tier 4 — Defensive/stabilizing:**
*Hermes Agent* — 50 issues touched, 0 closed; heavy reproduction/review phase. The low close rate plus two new security findings suggests a phase of triage before recovery, despite strong fix-PR momentum (#90937, #90941, #90954).

**Tier 5 — Stale/dormant:**
*PicoClaw* (3 open PRs, `[stale]`-tagged, 0 merged), *LobsterAI* (ambiguous stale-policy closures), *NullClaw* and *ZeptoClaw* (no activity).

**Maturity signal:** The healthiest projects (IronClaw, Moltis) are those with **narrower scope and explicit decision processes** — not the largest communities.

## 7. Trend Signals

1. **Reliability is the new feature.** The single loudest user demand across every project with feedback is *no silent failures*: dropped messages (OpenClaw #92241), silent task stops (CoPaw #6921), destroyed replies (Hermes #90879), and silent tool absence (Hermes #89050) all erode trust faster than any missing feature.

2. **Session/state integrity is the ecosystem's largest unpaid debt.** Duplicate transcripts, lost context, vanished turns, corrupt SQLite, and inconsistent memory appear in 8 of 12 projects. The next differentiator will be **durable, inspectable session state** — ZeroClaw's proof-carrying state proposal (#90866) and OpenClaw's session-snapshot request (#13700) point this way.

3. **Install/update paths are a trust gate.** Hermes' Windows update breakage, NanoClaw's Node 26 failure, ZeroClaw's installer crash, and LobsterAI's packaging bug show that **first-run and upgrade friction is now a P1-class problem** for desktop, Termux, and Docker deployments alike.

4. **Channel UX requires native semantics, not generic abstraction.** Users expect WhatsApp replies to count as mentions (Moltis), Slack silent-context to stay silent (NanoClaw), Telegram topics to work in private chats (PicoClaw), and bot identity to reflect configured names (Moltis #1218). Translation layers are no longer acceptable.

5. **Streaming is expected but not yet trustworthy.** Mid-stream retry gaps (NanoBot #5454), incomplete turns (OpenClaw #88657), and streaming-timeout freezes (CoPaw #7102) are common. Expect **streaming-aware retry classification** to become a standard provider-layer feature.

6. **Security is expanding from credentials to policy.** Beyond fixing auth gaps (Moltis CWE-306), the ecosystem is building **sandbox permission contracts** (ZeroClaw #9598), high-risk command governance (ZeroClaw #10164/#10165), and install-policy acknowledgement (OpenClaw #116489). Policy engines will be a differentiation surface in v0.9/v1.4-era releases.

7. **MCP is consolidating as the integration standard — with friction.** Conflicting SDK-v2 migration paths (NanoBot), missing local transports (IronClaw #5998), and the push for modular cores via MCP (ZeroClaw #6165) indicate the ecosystem is betting on MCP while still lacking a canonical implementation pattern.

8. **Provider churn creates a routing abstraction opportunity.** Model-specific regressions (Gemini, DeepSeek, GLM, Kimi) across four projects signal demand for **failure-class-based provider fallback** (OpenClaw #47910, NanoBot #5413) and **automatic model routing** (CoPaw #6436) — a likely near-term feature wave.

9. **Memory/context persistence is the next battleground.** ZeroClaw's 14-item memory-parity epic, OpenClaw's memory-management complaints, IronClaw's expected-version memory writes, and CoPaw's history-DB bloat all converge on one conclusion: **context is the product**, and cross-session durable memory with concurrency safety will separate the leading agents from the rest.

---

**Bottom line for decision-makers:** If you are choosing a platform to build on, OpenClaw offers the broadest community and channel surface but budget for reliability work; IronClaw is the strongest choice for sandbox-heavy, production-oriented deployments; Moltis is the cleanest messaging-layer bet. If you are building agent tooling, prioritize streaming-resilient provider abstractions, session-state durability, native channel semantics, and MCP-first integration — those four needs are confirmed across the entire ecosystem as of 2026-08-21.

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-08-21

## 1. Today's Overview

NanoBot is in a **high-activity maintenance and feature-development phase**: 4 issues were updated in the last 24 hours (2 open, 2 closed), and **27 PRs were updated, with 11 merged/closed and 16 still open**. No new release was published, so the project remains between releases while substantial fixes land in WebUI, provider fallback/retry behavior, background task handling, and MCP integration. The open PR queue includes several mature improvements, but also two conflicting MCP SDK v2 migration efforts and a few stale/conflicted PRs that need maintainer attention. Overall project health looks active and responsive, with contributors self-identifying bugs and providing fixes.

## 2. Releases

No new releases were published in this window. There are no changelog, breaking-change, or migration notes to report.

## 3. Project Progress

The following PRs were **closed/merged** in the last 24 hours:

- **feat(tui): print resume command on exit** — [#5452](https://github.com/HKUDS/nanobot/pull/5452) — TUI now prints a ready-to-run `nanobot agent --session websocket:<id>` resume command after terminal restore, improving session continuity.
- **refactor(webui): unify floating controls** — [#5240](https://github.com/HKUDS/nanobot/pull/5240) — Centralized floating-surface styling and accessibility semantics for menus, popovers, and comboboxes.
- **fix(webui): restore transcript-only session history** — [#5384](https://github.com/HKUDS/nanobot/pull/5384) — Restores WebUI sidebar discovery for persisted display transcripts without a canonical session JSONL.
- **feat(webui): add native workspace folder picker** — [#5381](https://github.com/HKUDS/nanobot/pull/5381) — Adds native macOS/Windows/Linux folder selection for local WebUI sessions, with loopback/security guards.
- **refactor(models): unify preset names** — [#5400](https://github.com/HKUDS/nanobot/pull/5400) — Makes model preset names canonical across config, WebUI, sessions, fallbacks, and runtime snapshots, with inline rename feedback.
- **fix(agent): persist cross-channel messages into target session history** — [#3145](https://github.com/HKUDS/nanobot/pull/3145) — Long-running fix ensuring messages sent via the `message` tool from session A to channel B are recorded in session B's history, preventing context loss.

Additionally, issue **#5425** (legacy `socks://` proxy URL support) and feature/discussion issue **#5447** (paid security-scan MCP integration) were closed.

## 4. Community Hot Topics

The most discussed items in the last 24 hours, based on explicit comments, are:

- **[Issue #5444 — Failed to login OpenAI via OAuth in Docker](https://github.com/HKUDS/nanobot/issues/5444)** — 1 comment. A user reports the OAuth flow breaks in Docker because the redirect URL is localhost-bound; this points to a real Docker networking / localhost-binding usability gap for containerized deployments.
- **[Issue #5425 — Support legacy socks:// proxy URLs](https://github.com/HKUDS/nanobot/issues/5425)** — 1 comment, now closed. Custom OpenAI-compatible providers fail when using the common `socks://` alias instead of `socks5://`, showing friction for self-hosted/proxy users.
- **[Issue #5454 — Streaming providers: mid-stream server_error skips retry once content has streamed](https://github.com/HKUDS/nanobot/issues/5454)** — 0 comments, but highly relevant to stability. It has a linked fix PR, so maintainers and users are clearly watching it.

Underlying need: users are actively running NanoBot in Docker, behind proxies, and with streaming OpenAI-compatible providers. The common thread is **reliability in production-like network environments**.

## 5. Bugs & Stability

Ranked by severity:

1. **High — OpenAI OAuth login fails in Docker** ([#5444](https://github.com/HKUDS/nanobot/issues/5444))  
   The localhost redirect/callback flow breaks inside Docker. No fix PR is visible yet. This blocks a common deployment mode.

2. **High/Medium — Mid-stream `server_error` not retried after content streams** ([#5454](https://github.com/HKUDS/nanobot/issues/5454))  
   Codex `response.failed` events are only retried before the first delta. PR [#5455](https://github.com/HKUDS/nanobot/pull/5455) adds `"server_error"` to the transient-error markers, but the PR explicitly scopes itself to failures *before* streaming begins — so the mid-stream case likely remains open.

3. **Medium — `socks://` proxy alias breaks custom provider requests** ([#5425](https://github.com/HKUDS/nanobot/issues/5425))  
   Closed in this window; users with legacy proxy configs need compatibility.

4. **Stability fixes in flight via PRs:**
   - [#5457](https://github.com/HKUDS/nanobot/pull/5457) — Scope dispatcher exception boundary so one bad outbound message doesn't kill the entire outbound message loop.
   - [#5413](https://github.com/HKUDS/nanobot/pull/5413) — Apply provider fallback policy to raised exceptions, not just `LLMResponse(finish_reason="error")`.
   - [#5414](https://github.com/HKUDS/nanobot/pull/5414) — Validate Slack file downloads across redirect chains.
   - [#5412](https://github.com/HKUDS/nanobot/pull/5412) — Flush background gateway child output promptly to logs.
   - [#5431](https://github.com/HKUDS/nanobot/pull/5431) / [#5430](https://github.com/HKUDS/nanobot/pull/5430) — Report background task failures and release completed task groups to avoid memory/session growth.

## 6. Feature Requests & Roadmap Signals

- **Paid MCP / x402 service integration** ([#5447](https://github.com/HKUDS/nanobot/issues/5447), closed) — A user proposed integrating NanoBot with a Solana x402 micropayment security scanner. Though not accepted as an issue, it signals interest in **agent monetization / paid MCP tools**.
- **SenseNova provider** ([#5453](https://github.com/HKUDS/nanobot/pull/5453)) — Adds 商汤日日新 as a native OpenAI-compatible provider. If merged, NanoBot expands its provider ecosystem further into Chinese commercial models.
- **Turn observability and safe recovery** ([#5420](https://github.com/HKUDS/nanobot/pull/5420)) — Open PR that would give WebUI users a per-turn answer surface, provider usage accumulation, and recovery from interrupted work. This is a strong candidate for future WebUI improvements.
- **MCP SDK v2 migration** — [#5179](https://github.com/HKUDS/nanobot/pull/5179) and [#5180](https://github.com/HKUDS/nanobot/pull/5180) both target migrating MCP to SDK v2 with different scopes. A maintainer decision is needed; this is a major roadmap item.

Prediction: next release will likely include the closed WebUI improvements (#5381, #5384, #5400, #5240), TUI resume (#5452), the SenseNova provider if reviewed, and several provider/channel stability fixes.

## 7. User Feedback Summary

Real user pain points in this window:

- **Docker users** are blocked by OAuth callback URL handling — the most serious reported problem.
- **Proxy-heavy/self-hosted users** need legacy `socks://` URL support.
- **Streaming users** expect transient provider errors to retry even after partial streaming; the current behavior loses turns or requires manual intervention.
- **Channel operations** are fragile when one outbound message throws — a single bad message can silently stop all future sends.
- **Background agent tasks** have been hard to debug because exceptions were not being logged and task groups were retained indefinitely.
- **UI/UX requests** center on faster session recovery, native folder pickers, and canonical model naming — these were addressed and closed, indicating positive response to user needs.

Overall, users are actively exercising NanoBot in production-like environments and reporting concrete edge cases. The number of contributor-submitted fixes suggests a healthy, engaged community, though container networking and streaming resilience remain friction points.

## 8. Backlog Watch

These open PRs have been waiting the longest or carry conflict markers and likely need maintainer decisions:

- **[PR #3145](https://github.com/HKUDS/nanobot/pull/3145) — fix(agent): persist cross-channel messages into target session history** — Opened 2026-04-14, now closed/merged, but worth watching if any regressions appear.
- **[PR #5179](https://github.com/HKUDS/nanobot/pull/5179) — Migrate MCP integration to SDK v2 with legacy compatibility** — Opened 2026-07-30, priority p1, marked `conflict`. Needs attention.
- **[PR #5180](https://github.com/HKUDS/nanobot/pull/5180) — chore(mcp): evaluate minimal SDK v2 migration** — Opened 2026-07-30, also marked `conflict`. This is an alternative/competing approach to #5179.
- **[PR #5338](https://github.com/HKUDS/nanobot/pull/5338) — fix(mcp): preserve credentials when OAuth store read fails** — Opened 2026-08-11, marked `conflict`. Important security/credential fix that could easily rot.
- **[PR #5339](https://github.com/HKUDS/nanobot/pull/5339) — fix(webui): reject discarded temporary chat messages** — Opened 2026-08-11, still in draft. Long-dormant draft; needs review or closure.
- **[PR #5455](https://github.com/HKUDS/nanobot/pull/5455) — fix(provider): retry Codex server_error** — Newly updated, but explicitly does **not** solve the mid-stream case from [#5454](https://github.com/HKUDS/nanobot/issues/5454). Maintainers should decide whether to expand scope or open a follow-up.

The biggest backlog risk is the **MCP SDK v2 migration**: two conflicting PRs have been open for over three weeks without a maintainer decision, and the longer they sit, the more likely conflicts will grow.

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-21

## 1. Today's Overview

Hermes Agent is in a high-intensity stabilization phase. Over the last 24 hours, 50 issues and 50 PRs were updated, but **zero issues were closed** and only **3 PRs reached merged/closed status** — suggesting heavy reproduction/review activity rather than rapid merge throughput. The dominant themes are Desktop reliability (Windows update breakage, macOS session loading, model routing), installation reproducibility, and Bot Mode messaging. A long-running automation issue ([#66616](https://github.com/NousResearch/hermes-agent/issues/66616), skills index degradation) remains the single most active discussion with 64 comments. No new releases were published, indicating the project is consolidating fixes ahead of the next cut.

## 2. Releases

**No new releases published** as of 2026-08-21. The most recent desktop build referenced in issues is v0.20.4 ([#90915](https://github.com/NousResearch/hermes-agent/issues/90915)).

## 3. Project Progress

- **3 PRs merged/closed** in the last 24 hours (specific items not enumerated in the updated set; all 20 highest-activity PRs remain open).
- Strong fix-forward momentum in open PRs:

**Bug fixes advancing:**
- [PR #90937](https://github.com/NousResearch/hermes-agent/pull/90937) — Windows Desktop updates finish instead of parking on "Updating Hermes" (salvage of #90564; P1)
- [PR #90941](https://github.com/NousResearch/hermes-agent/pull/90941) — Tauri bootstrap installer (`Hermes-Setup.exe --update`) stops waiting on pipe EOF
- [PR #90954](https://github.com/NousResearch/hermes-agent/pull/90954) — Parks unowned completion notifications instead of dropping them (fixes [#90879](https://github.com/NousResearch/hermes-agent/issues/90879))
- [PR #90955](https://github.com/NousResearch/hermes-agent/pull/90955) — Surfaces archived+hidden sessions in the archived-only listing
- [PR #90948](https://github.com/NousResearch/hermes-agent/pull/90948) — Makes "thinking off" actually stick on Portal Claude models
- [PR #90942](https://github.com/NousResearch/hermes-agent/pull/90942) — Maps framework-generic tool aliases (`shell`, `bash`) to `terminal`
- [PR #90953](https://github.com/NousResearch/hermes-agent/pull/90953) — Forwards `delegation.request_overrides` on the direct-endpoint branch
- [PR #90467](https://github.com/NousResearch/hermes-agent/pull/90467) — Stops Bot Chat click-spam reminting sessions into the launch store (fixes #90458)
- [PR #88772](https://github.com/NousResearch/hermes-agent/pull/88772) — Isolates Python verification in a project-owned venv

**Feature work in flight:**
- [PR #86220](https://github.com/NousResearch/hermes-agent/pull/86220) — Gemini 3.1 Flash TTS streaming into Discord voice channels
- [PR #18348](https://github.com/NousResearch/hermes-agent/pull/18348) — E2B cloud sandbox backend for terminal execution (large, multi-tool PR)
- [PR #90926](https://github.com/NousResearch/hermes-agent/pull/90926) — Optional "Hydrafetch" skill for JS-heavy/cookie-walled pages
- [PR #86140](https://github.com/NousResearch/hermes-agent/pull/86140) — Exposes `skip_tool_search_assembly` through public agent constructors
- [PR #31106](https://github.com/NousResearch/hermes-agent/pull/31106) — Editable Telegram todo checklists in the progress bubble

## 4. Community Hot Topics

| Issue | Engagement | Underlying signal |
|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills index stale/degraded | 64 comments; open since Jul 18 | Automated freshness probe failing repeatedly; docs/API trust concern |
| [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) — Desktop: no sessions load for any profile (P1) | 14 comments, 2 👍 | Backend spawned without `--profile` after update; core desktop workflow broken |
| [#59877](https://github.com/NousResearch/hermes-agent/issues/59877) — Install fails on Python 3.14.6 | 9 comments; open since Jul 6 | Version constraint `<3.14,>=3.11` blocks Termux users |
| [#90687](https://github.com/NousResearch/hermes-agent/issues/90687) — Install error on all devices | 6 comments | Widespread installation regression beginning Aug 20 |
| [#90879](https://github.com/NousResearch/hermes-agent/issues/90879) — Bot Mode handoff replies destroyed | 5 comments | Background notification lifecycle bug breaking agent-to-agent replies (fix: #90954) |
| [#89995](https://github.com/NousResearch/hermes-agent/issues/89995) — Expose Bot Mode group chats in web/gateway | 5 comments | Desktop-only feature parity gap |
| [#78565](https://github.com/NousResearch/hermes-agent/issues/78565) — `write_file`/`patch` destroy git worktree `.git` files | 5 comments | Data-safety bug in core file tools |
| [#90060](https://github.com/NousResearch/hermes-agent/issues/90060) — Windows Desktop breaks after in-app update | 5 comments | Silent crash + undocumented fallback to local sessions |

**Analysis:** The community's attention clusters around three needs: (1) trustworthy installation/update paths across platforms, (2) desktop parity with web/gateway features (Bot Mode), and (3) protection against silent data loss or silent misconfiguration.

## 5. Bugs & Stability

Ranked by severity, with fix status where available:

**Critical (P1)**
- [#89675](https://github.com/NousResearch/hermes-agent/issues/89675) — Desktop shows no sessions for any profile after update; backend spawned without `--profile`. No fix PR yet.
- [#89050](https://github.com/NousResearch/hermes-agent/issues/89050) — `platform_toolsets` validation counts globally; an empty list on the active platform silently yields zero tools (agent emits tool calls as text). No fix PR yet.

**High (P2)**
- [#90687](https://github.com/NousResearch/hermes-agent/issues/90687) — Installation broken on all devices since Aug 20 (possibly related to [#59877](https://github.com/NousResearch/hermes-agent/issues/59877)'s Python constraint).
- [#90060](https://github.com/NousResearch/hermes-agent/issues/90060) — Windows Desktop silent 1005 crash after in-app update; **fix in [PR #90937](https://github.com/NousResearch/hermes-agent/pull/90937)**.
- [#90493](https://github.com/NousResearch/hermes-agent/issues/90493) — Session-persistence failures collapse SQLite corruption into a generic message.
- [#90886](https://github.com/NousResearch/hermes-agent/issues/90886) — Kimi K3 multi-turn replay rejected with HTTP 400 (`invalid base64url encoding`), not self-healed.
- [#90702](https://github.com/NousResearch/hermes-agent/issues/90702) — **Security:** native-login pending store can be filled via spoofed `X-Forwarded-For`, bypassing per-IP caps.
- [#90700](https://github.com/NousResearch/hermes-agent/issues/90700) — **Security:** public `/api/status` leaks unfiltered platform error diagnostics.
- [#90922](https://github.com/NousResearch/hermes-agent/issues/90922) — Desktop terminal pane spawns a **local** shell when the SSH connection lives in the v2 registry.
- [#90915](https://github.com/NousResearch/hermes-agent/issues/90915) — Desktop model selector drops target provider on cross-provider picks.
- [#86249](https://github.com/NousResearch/hermes-agent/issues/86249) — Relay-fronted cron deliveries never reach Discord on Hermes Cloud.

**Moderate (P3)**
- [#90833](https://github.com/NousResearch/hermes-agent/issues/90833) — Feishu stale inbound DM delivered ~7h late despite healthy reconnect.
- [#90918](https://github.com/NousResearch/hermes-agent/issues/90918) — Windows Hindsight `local_embedded` daemon restart fails with WinError 87 (duplicate).
- [#90134](https://github.com/NousResearch/hermes-agent/issues/90134) — Windows desktop build fails in `blockmap.js` (needs repro).
- [#90879](https://github.com/NousResearch/hermes-agent/issues/90879) — Bot Mode handoff replies destroyed; **fix in [PR #90954](https://github.com/NousResearch/hermes-agent/pull/90954)**.
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills index freshness degraded (29.8h old vs 26h limit).

## 6. Feature Requests & Roadmap Signals

**Likely candidates for next release:**
- [#89995](https://github.com/NousResearch/hermes-agent/issues/89995) — Expose Bot Mode group chat rooms in web dashboard & gateway. High alignment with recent multi-gateway desktop work; strong candidate.
- [#90713](https://github.com/NousResearch/hermes-agent/issues/90713) — Configurable memory-pressure thresholds (dashboard banner + kanban guard share classifier).
- [#90719](https://github.com/NousResearch/hermes-agent/issues/90719) — Read-only session storage attribution report (`hermes sessions stats` deep-dive).

**Long-lead signals:**
- [#23051](https://github.com/NousResearch/hermes-agent/issues/23051) — Discord per-guild/per-server configuration (open since May; steadily referenced).
- [#86950](https://github.com/NousResearch/hermes-agent/issues/86950) — ByteDance/TikTok Business + Douyin plugin integration package (large feature tracker).
- **Architecture direction** — Multiple proposals by a recurring contributor push toward systematic reliability: transactional install/update/bootstrap ([#88683](https://github.com/NousResearch/hermes-agent/issues/88683)), immutable generation-bound route identity ([#90149](https://github.com/NousResearch/hermes-agent/issues/90149)), durable generation fencing for recovery/teardown ([#90145](https://github.com/NousResearch/hermes-agent/issues/90145)), and proof-carrying observable state ([#90866](https://github.com/NousResearch/hermes-agent/issues/90866)). These suggest a roadmap emphasis on deployment integrity and state provenance.

## 7. User Feedback Summary

- **Direct frustration with UX:** A Windows 11 user on a ~900-message session called the "Show earlier messages" paging design "stupid" — exact quote: *"显示更多消息是哪个傻逼的设计？"* ("Who the hell designed this show-more-messages thing?") — [#90473](https://github.com/NousResearch/hermes-agent/issues/90473).
- **Installation trust is eroding:** Users report fresh Termux installs failing since Aug 20 on all devices ([#90687](https://github.com/NousResearch/hermes-agent/issues/90687)); Termux users are blocked by the Python `<3.14` pin ([#59877](https://github.com/NousResearch/hermes-agent/issues/59877)).
- **Windows update pain:** In-app update leads to a silent crash and an unexplained fallback to a local session with no user-facing explanation ([#90060](https://github.com/NousResearch/hermes-agent/issues/90060)).
- **macOS desktop regression:** After updating, no agent profile loads any sessions ([#89675](https://github.com/NousResearch/hermes-agent/issues/89675)).
- **Feature parity demand:** Users want Bot Mode group chats available outside the desktop app — web dashboard and gateway ([#89995](https://github.com/NousResearch/hermes-agent/issues/89995)).
- **Safety concerns:** Core file tools can silently sever git worktree linkage ([#78565](https://github.com/NousResearch/hermes-agent/issues/78565)); silent loss of Bot Mode handoff replies ([#90879](https://github.com/NousResearch/hermes-agent/issues/90879)).

## 8. Backlog Watch

Items needing maintainer attention due to age, severity, or staleness:

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills index watchdog degraded; **34 days open, 64 comments**, no resolution in sight.
- [#59877](https://github.com/NousResearch/hermes-agent/issues/59877) — Python version constraint breaks Termux installs; open since Jul 6, likely related to the Aug 20 install regression.
- [#23051](https://github.com/NousResearch/hermes-agent/issues/23051) — Discord per-guild configuration; open since May, no PR.
- [#78565](https://github.com/NousResearch/hermes-agent/issues/78565) — `write_file`/`patch` git worktree `.git` destruction; P2, awaiting reproduction.
- [#81318](https://github.com/NousResearch/hermes-agent/issues/81318) — Hermes Cloud hosted-dashboard OAuth `invalid_grant`; open since Aug 7, P2.
- [#86249](https://github.com/NousResearch/hermes-agent/issues/86249) — Relay-fronted cron delivery never reaches Discord on Hermes Cloud; open since Aug 14, P2, with a known in-process path that works — suggests a focused fix is tractable.

---

**Overall health assessment:** Hermes Agent is in a defensive stabilization cycle — heavy bug-fix throughput, high issue velocity, but low close rate (0 issues closed in 24h). The concentration of P1/P2 issues in install/update and Desktop session management, plus two new security findings, suggests the next release should prioritize update-path integrity and surface-state correctness. Positively, several of today's most severe bugs already have fix PRs in flight ([#90937](https://github.com/NousResearch/hermes-agent/pull/90937), [#90941](https://github.com/NousResearch/hermes-agent/pull/90941), [#90954](https://github.com/NousResearch/hermes-agent/pull/90954)).

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Digest — 2026-08-21

## 1. Today's Overview

PicoClaw shows low issue activity: zero issues were updated in the reporting window, and no new releases were published. The main activity is concentrated in three open pull requests, all of which remain unmerged. No PRs were merged or closed during this period, meaning no feature or fix advanced to `main` in the last day. The project appears stable overall, but several important integration-related PRs are waiting for maintainer attention. The presence of `[stale]`-tagged PRs suggests some backlog risk if review does not happen soon.

## 2. Releases

No new releases were published during this period.

## 3. Project Progress

No pull requests were merged or closed in the last 24 hours. However, three open PRs were updated and represent proposed improvements:

- [#3329](https://github.com/sipeed/picoclaw/pull/3329) — Fixes LINE webhook configuration by warning on inert `webhook_host` / `webhook_port` settings instead of silently seeding unused values.
- [#3316](https://github.com/sipeed/picoclaw/pull/3316) — Fixes routed-agent context management so history, summarization, compression, and "seahorse bootstrap" work correctly per agent/channel.
- [#3315](https://github.com/sipeed/picoclaw/pull/3315) — Adds support for Telegram topics in private bot chats with forum topic mode enabled.

None of these have been merged yet, so the changes are proposed but not yet part of the codebase.

## 4. Community Hot Topics

There is no explicit comment/reaction data available, but the three updated PRs represent the current community activity.

- [PR #3316](https://github.com/sipeed/picoclaw/pull/3316) — Routed-agent memory/context failure. The underlying need is for durable, channel-scoped agent context that respects history limits and auto-compaction.
- [PR #3329](https://github.com/sipeed/picoclaw/pull/3329) — LINE webhook configuration usability. The underlying need is for predictable configuration behavior: settings should either work or produce clear warnings.
- [PR #3315](https://github.com/sipeed/picoclaw/pull/3315) — Telegram private-chat topic support. The underlying need is for consistent topic handling across all Telegram chat types, not just forum supergroups.

## 5. Bugs & Stability

No new issues were reported in the last 24 hours. Two open PRs address existing bugs, ranked by severity:

1. **High — Routed agent context loss / broken memory** ([PR #3316](https://github.com/sipeed/picoclaw/pull/3316))  
   Routed agents are not remembering previous messages, and auto-compaction never triggers. This directly impacts multi-turn conversation quality and token management for users who route agents to specific channels.

2. **Medium — Inert LINE webhook configuration** ([PR #3329](https://github.com/sipeed/picoclaw/pull/3329))  
   `line.settings.webhook_host` and `webhook_port` are declared, defaulted, and env-bound but never consumed. This is misleading for operators configuring LINE webhooks and can cause silent setup failures.

Both bugs have proposed fix PRs currently open.

## 6. Feature Requests & Roadmap Signals

The clearest feature request in this window is Telegram topic support for private bot chats ([PR #3315](https://github.com/sipeed/picoclaw/pull/3315)). The current code only recognizes topics when `Chat.IsForum` is true, which misses private chats where Telegram provides `IsTopicMessage` instead.

If merged, this would round out PicoClaw's Telegram integration and likely appear in the next minor release. Separately, the routed-agent context-management fix ([PR #3316](https://github.com/sipeed/picoclaw/pull/3316)) is important enough to be a strong candidate for the next patch release, since it affects core agent memory behavior.

## 7. User Feedback Summary

User pain points from the active PRs include:

- **Memory loss in routed agents**: Messages are not remembered per Discord channel, and compaction never runs.
- **Misleading LINE webhook settings**: Configuration values look functional but are ignored.
- **Telegram topic limitation**: Private bot chats with topic mode do not behave correctly.

No positive satisfaction signals were available in this window. The overall feedback tone is constructive, with users submitting detailed bug reports and fixes rather than feature-only requests.

## 8. Backlog Watch

The following PRs have been open for an extended period and need maintainer review:

- [PR #3316](https://github.com/sipeed/picoclaw/pull/3316) — Open since 2026-08-03, tagged `[stale]`, updated 2026-08-19. This fixes a core routed-agent memory bug and should be prioritized to avoid losing context-related fixes.
- [PR #3315](https://github.com/sipeed/picoclaw/pull/3315) — Open since 2026-08-03, tagged `[stale]`, updated 2026-08-19. This is a small, targeted Telegram feature/fix that may be at risk of stale auto-closure.
- [PR #3329](https://github.com/sipeed/picoclaw/pull/3329) — Open since 2026-08-11, updated 2026-08-19. The fix is straightforward and improves configuration correctness.

No long-unanswered GitHub issues are currently in the backlog, as the tracked issue count is zero.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest — 2026-08-21

**Data window:** last 24 hours  
**Issues updated:** 4 (3 open/active, 1 closed)  
**PRs updated:** 50 (31 open, 19 merged/closed)  
**New releases:** 0  

## 1. Today's Overview

NanoClaw is in an active stabilization and hardening phase. No releases were published, but 50 PRs were touched, with 19 merged/closed, and activity was dominated by a large core-team audit of 12 install skills. The audit produced a foundational trunk-repair PR ([#3408](https://github.com/nanocoai/nanoclaw/pull/3408)) plus a stack of per-skill fixes. Meanwhile, user-reported issues highlight three important friction points: WhatsApp media being unreachable by agents, a setup failure on Node 26, and unwanted agent engagement in Slack threads. Overall project attention is concentrated on making existing features reliably work rather than expanding scope.

## 2. Releases

No new releases in the last 24 hours. No changelog, migration notes, or upgrade guidance to report.

## 3. Project Progress

19 PRs were merged/closed in the window. The visible closed/merged PRs from the provided top-20 set are:

- [nanocoai/nanoclaw#3421](https://github.com/nanocoai/nanoclaw/pull/3421) — **docs+setup: announce one-click Slack agents**. Adds the announcement layer for a one-click Slack onboarding flow.
- [nanocoai/nanoclaw#3407](https://github.com/nanocoai/nanoclaw/pull/3407) — **fix(permissions): assert the scope warning via its constant**, reducing copy/paste drift.
- [nanocoai/nanoclaw#3406](https://github.com/nanocoai/nanoclaw/pull/3406) — **fix(slack-agent-flow): await the async DB helpers in orchestrate.test**.

Issue [nanocoai/nanoclaw#2606](https://github.com/nanocoai/nanoclaw/issues/2606) — `engage_mode='always'` silently dropping all messages — was also closed in this window.

The biggest in-flight effort is the core-skills audit stack. [nanocoai/nanoclaw#3408](https://github.com/nanocoai/nanoclaw/pull/3408) “fix: cross-cutting trunk repairs from the core-skills audit” restores all four e2e harnesses and fixes trunk-level issues hit by multiple skills. Twelve per-skill PRs are stacked on it:

- [#3409](https://github.com/nanocoai/nanoclaw/pull/3409) — per-group `base_url`, rebuild `/add-ollama-provider`
- [#3410](https://github.com/nanocoai/nanoclaw/pull/3410) — non-npm binary entries in `cli-tools.json`, rebuild `/add-rtk`
- [#3411](https://github.com/nanocoai/nanoclaw/pull/3411) — fix `/add-mnemon` to target the real container spawn path
- [#3412](https://github.com/nanocoai/nanoclaw/pull/3412) — deliver `/add-karpathy-llm-wiki` through DB-backed group instructions
- [#3413](https://github.com/nanocoai/nanoclaw/pull/3413) — `/add-vercel`: remove destructive rsync, fix secret assignment
- [#3414](https://github.com/nanocoai/nanoclaw/pull/3414) — `/add-clidash`: cap refresh fan-out and repair payload
- [#3415](https://github.com/nanocoai/nanoclaw/pull/3415) — `/add-atomic-chat-tool`: move config onto per-group MCP seam
- [#3416](https://github.com/nanocoai/nanoclaw/pull/3416) — `/add-ollama-tool`: per-group MCP seam, live config path
- [#3417](https://github.com/nanocoai/nanoclaw/pull/3417) — `/add-dashboard`: REMOVE.md, portable SQL, shutdown wiring
- [#3418](https://github.com/nanocoai/nanoclaw/pull/3418) — `/add-tavily-tool`: honest smoke test, idempotent removal
- [#3419](https://github.com/nanocoai/nanoclaw/pull/3419) — `/add-anydoc`: install-scoped `ncl`, portable skill test
- [#3420](https://github.com/nanocoai/nanoclaw/pull/3420) — `/add-macos-statusbar`: slug-aware Swift code and plist labels

These PRs are open, but they represent a coordinated effort to fix broken, dead, or misconfigured out-of-box skills.

## 4. Community Hot Topics

- [nanocoai/nanoclaw#2715](https://github.com/nanocoai/nanoclaw/issues/2715) — **Inbound WhatsApp media is unreachable by the agent**. This is the only issue in the window with a comment. It has been open since June and describes a critical path failure: WhatsApp media lands in an unmounted host directory, so the agent receives a `/workspace/attachments/...` path that does not exist inside its container. Underlying need: inbound images/docs/audio must be mounted into the agent's session inbox.

- [nanocoai/nanoclaw#3369](https://github.com/nanocoai/nanoclaw/issues/3369) — **mention-sticky engages without a mention**. In Slack, `engage_mode: 'mention-sticky'` combined with `ignored_message_policy: 'accumulate'` causes the agent to reply in threads where it was never mentioned. The `accumulate` policy creates a session row that becomes a subscription. Underlying need: “silent context” must remain silent and must not create engagement side effects.

- The **core-skills audit PR cluster** ([#3408](https://github.com/nanocoai/nanoclaw/pull/3408) and stacked PRs) is the hottest activity center. No PR has notable comment counts in the provided data, but the scale of the stack signals a high-priority maintainer push to fix install skills that shipped broken.

## 5. Bugs & Stability

Ranked by severity:

1. **High — WhatsApp media inaccessible** ([#2715](https://github.com/nanocoai/nanoclaw/issues/2715))  
   Inbound WhatsApp images, docs, and audio are unreachable by the agent. Files are saved outside the mounted container path, so the agent cannot open them. No explicit fix PR is visible in the window.

2. **High — Setup fails on Node 26** ([#3359](https://github.com/nanocoai/nanoclaw/issues/3359))  
   On macOS arm64 with Homebrew Node 26.7.0, `bash nanoclaw.sh` passes the version check but fails at bootstrap because `better-sqlite3 11.10.0` cannot compile. `check_node` only enforces a lower bound. Blocking new installs on current Node versions.

3. **High — Unwanted replies from mention-sticky + accumulate** ([#3369](https://github.com/nanocoai/nanoclaw/issues/3369))  
   Agents begin replying in Slack threads where they were never mentioned. This is a behavioral/trust bug for threaded platforms. No fix PR is visible yet.

4. **Moderate — Out-of-box skills shipped broken**  
   The audit descriptions document multiple dead or harmful skill installs:
   - [nanocoai/nanoclaw#3411](https://github.com/nanocoai/nanoclaw/pull/3411) — `/add-mnemon` edited a file never executed by the spawn path.
   - [nanocoai/nanoclaw#3413](https://github.com/nanocoai/nanoclaw/pull/3413) — `/add-vercel` could overwrite skill-discovery symlinks.
   - [nanocoai/nanoclaw#3414](https://github.com/nanocoai/nanoclaw/pull/3414) — `/add-clidash` launched ~29 concurrent processes and timed out most of them.
   - [nanocoai/nanoclaw#3415](https://github.com/nanocoai/nanoclaw/pull/3415) / [#3416](https://github.com/nanocoai/nanoclaw/pull/3416) — documented config surfaces read only `process.env`, so tools could never register.

5. **Closed — `engage_mode='always'` silently drops messages** ([#2606](https://github.com/nanocoai/nanoclaw/issues/2606))  
   Long-standing routing bug, closed in this window.

## 6. Feature Requests & Roadmap Signals

- **Cursor Agent SDK support** is incoming via two open PRs: [nanocoai/nanoclaw#3356](https://github.com/nanocoai/nanoclaw/pull/3356) adds the Cursor Agent SDK payload, and [nanocoai/nanoclaw#3355](https://github.com/nanocoai/nanoclaw/pull/3355) adds the `/add-cursor` provider skill. This is likely planned for the next provider-focused release.

- **One-click Slack agents** are already being announced in docs ([#3421](https://github.com/nanocoai/nanoclaw/pull/3421)), suggesting the setup flow is close to user-facing availability.

- **`add-why` utility skill** ([#3189](https://github.com/nanocoai/nanoclaw/pull/3189)) is a community contribution that explains what happened for one message. It remains open and unreviewed.

- **Core trunk enablers** from the audit stack, especially per-group `base_url` ([#3409](https://github.com/nanocoai/nanoclaw/pull/3409)) and non-npm binary entries in `cli-tools.json` ([#3410](https://github.com/nanocoai/nanoclaw/pull/3410)), are likely to be prerequisites for future provider/tool flexibility.

- User-reported issues also signal roadmap pressure: Node 26 setup compatibility ([#3359](https://github.com/nanocoai/nanoclaw/issues/3359)), WhatsApp media mount behavior ([#2715](https://github.com/nanocoai/nanoclaw/issues/2715)), and `mention-sticky` engagement semantics ([#3369](https://github.com/nanocoai/nanoclaw/issues/3369)) all need resolution in a near-term patch.

## 7. User Feedback Summary

- **WhatsApp media handling is blocking real use.** The reporter ([#2715](https://github.com/nanocoai/nanoclaw/issues/2715)) cannot use the agent for image/document/audio workflows because the agent cannot access inbound files.
- **Slack engagement trust is at risk.** The `mention-sticky` + `accumulate` behavior ([#3369](https://github.com/nanocoai/nanoclaw/issues/3369)) means agents may respond in threads where they were never invoked, which is likely to feel noisy or intrusive.
- **Fresh installs are fragile.** The Node 26 setup failure ([#3359](https://github.com/nanocoai/nanoclaw/issues/3359)) affects a current, common toolchain and makes first-run experience poor.
- **Skill installation reliability is an internal and external concern.** The core-team audit PRs repeatedly describe features being “100% dead with a green guard,” unappliable install steps, and destructive commands. This indicates user-facing quality risk for self-hosted installs, even if no direct user complaint appears in the issue data.

## 8. Backlog Watch

- [nanocoai/nanoclaw#2715](https://github.com/nanocoai/nanoclaw/issues/2715) — open since 2026-06-08 with only 1 comment. Severity is high, age is ~10 weeks, and no fix PR is visible. This deserves immediate maintainer triage.

- [nanocoai/nanoclaw#3189](https://github.com/nanocoai/nanoclaw/pull/3189) — open since 2026-08-05 with no maintainer signal in the top-20 data. A user-contributed skill that needs review or a decision.

- [nanocoai/nanoclaw#3359](https://github.com/nanocoai/nanoclaw/issues/3359) — open since 2026-08-19. Fresh-install blocker on Node 26; should be prioritized for the next patch release.

- [nanocoai/nanoclaw#3369](https://github.com/nanocoai/nanoclaw/issues/3369) — newly reported routing bug. Needs maintainer confirmation and likely a behavior fix for `accumulate` subscriptions.

- [nanocoai/nanoclaw#3408](https://github.com/nanocoai/nanoclaw/pull/3408) and its 12 stacked PRs need coordinated review. Because all per-skill PRs depend on the trunk repair, `#3408` is the critical path for the whole audit stack.

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-08-21

## Today's Overview

IronClaw saw high activity in the last 24 hours: **15 issues** and **38 PRs** were updated, with **4 issues closed** and **15 PRs merged/closed**. The project shipped a stable release candidate promotion, **ironclaw-v1.3.0**, while the majority of ongoing work targeted persistent sandboxing, notification infrastructure, automations, and the new agent-lifecycle hooks epic. Core contributors are driving several large, deliberately phased PRs; the project appears healthy but is carrying a few long-open infrastructure requests, particularly around local MCP transports and design-system adoption.

## Releases

### [ironclaw-v1.3.0](https://github.com/nearai/ironclaw/releases) — 1.3.0 (2026-08-19)

Stable promotion of `1.3.0-rc.2`. The release notes highlight:

- **Fixed in 1.3.0-rc.2**: Upgrades from 1.2 now accept and preserve the released extension `activation_state` field instead of crash-looping during startup.
- The stable release includes the upgrade and container fixes validated in RC2, plus the full RC1 scope.
- No breaking changes are explicitly listed in the provided release note excerpt.

## Project Progress

Closed/merged items from the last 24 hours span sandboxing, runtime stability, notifications, and onboarding.

### Closed PRs

- [PR #7764 — feat(sandbox): persistent per-user container with Docker Exec](https://github.com/nearai/ironclaw/pull/7764) — closes a major step toward the persistent sandbox epic.
- [PR #7761 — fix(runtime): bound provider diagnostic stack footprint](https://github.com/nearai/ironclaw/pull/7761) — reduces provider-auth error stack size and unifies the auth-requirement type at error boundaries.
- [PR #7753 — fix(capabilities): preserve terminal dispatch records](https://github.com/nearai/ironclaw/pull/7753) — ensures failed dispatch still produces a durable terminal state.
- [PR #7759 — chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7759) — CI-generated knowledge-graph refresh.
- [PR #7751 — feat(sandbox): persistent per-user container with Docker Exec](https://github.com/nearai/ironclaw/pull/7751) — same sandbox feature track, closed during the 24h window.

### Closed Issues

- [Issue #7044 — Epic: Onboarding to channel-first approach](https://github.com/nearai/ironclaw/issues/7044) — closed.
- [Issue #6993 — Backend wiring for the OOBE automation-tasks prototype](https://github.com/nearai/ironclaw/issues/6993) — closed.
- [Issue #7688 — Add durable notification inbox contracts, storage, and ProductSurface APIs](https://github.com/nearai/ironclaw/issues/7688) — closed.
- [Issue #7755 — Collapse two duplicated turn/subagent vocabulary types](https://github.com/nearai/ironclaw/issues/7755) — cleanup issue closed.

### Open PRs advancing major features

- [PR #7729 — feat(automations): add run-now across trigger domain and WebUI](https://github.com/nearai/ironclaw/pull/7729)
- [PR #7765 — feat(hooks): AfterTurn lifecycle point + memory curation as its first consumer](https://github.com/nearai/ironclaw/pull/7765)
- [PR #7766 — fix(telegram): separate bot pairing from personal device linking](https://github.com/nearai/ironclaw/pull/7766)
- [PR #7699 / #7698 / #7700 — notification inbox, run gates, and run outcomes](https://github.com/nearai/ironclaw/pull/7699)
- [PR #7491 — feat(coding): omp core-tool contract + engines + benchmark arm](https://github.com/nearai/ironclaw/pull/7491)

## Community Hot Topics

### [Issue #7732 — Epic: Persistent per-user sandbox with iron-proxy; defer loop executors](https://github.com/nearai/ironclaw/issues/7732)  
**8 comments** — the most active issue today. Underlying need: the current Docker-backed `builtin.shell` creates and removes a container for every command, and `/workspace` persists only per `(tenant, user)` pair. Users want a stable, low-latency per-user environment without per-command container churn.

### [Issue #7770 — Epic: hook the agent lifecycle](https://github.com/nearai/ironclaw/issues/7770)  
**1 comment** — a phased epic to extend `ironclaw_hooks` with after-turn, before-turn, compaction, and tool-result seams. The community/team driver is to make “when X happens, do Y” features hook registrations instead of core-engine edits.

### [Issue #5998 — Reborn has no transport for a local MCP server](https://github.com/nearai/ironclaw/issues/5998)  
**1 comment** — stdio is rejected and loopback HTTP is denied, leaving no way to connect an on-device MCP server. This is a recurring pain point for local-first integrations.

## Bugs & Stability

Ranked by severity:

- **[High] Issue #7776 — `memory.write` needs an expected-version mode**  
  https://github.com/nearai/ironclaw/issues/7776  
  Full-document rewrites are a read-modify-write. CAS only protects against torn writes, not silent overwrites of concurrent writes. Found by review on [PR #7765](https://github.com/nearai/ironclaw/pull/7765). No dedicated fix PR is visible yet.

- **[High/Medium] Issue #5998 — No transport for local MCP servers**  
  https://github.com/nearai/ironclaw/issues/5998  
  Open since 2026-07-11 with only one comment; still no resolution path. Blocks on-device/localhost MCP use cases.

- **[Medium] Issue #7760 — Deliberate lineage-drop in `AgentTurnProcessStateMetadata::from_state` is unpinned**  
  https://github.com/nearai/ironclaw/issues/7760  
  Subagent lineage is intentionally dropped on state-derived rewrites; needs a regression pin to prevent accidental behavior change.

- **[Medium] Issue #7768 — Unused Settings and Extensions tabs and duplicate route metadata**  
  https://github.com/nearai/ironclaw/issues/7768  
  Duplicate inventory has already drifted from real routes. Fix PR: [PR #7773](https://github.com/nearai/ironclaw/pull/7773).

- **[Medium] Issue #7769 — Extension setup phase and blockers not surfaced in Configure**  
  https://github.com/nearai/ironclaw/issues/7769  
  Only Hosted MCP auth selection is handled; other blockers may be silently discarded. Fix PR: [PR #7772](https://github.com/nearai/ironclaw/pull/7772).

- **[Low] Issue #7767 — Automation presenter date tests are not timezone-robust**  
  https://github.com/nearai/ironclaw/issues/7767  
  Tests fail in timezones such as `Asia/Shanghai`. Fix PR: [PR #7774](https://github.com/nearai/ironclaw/pull/7774).

### Stability fixes landed/closed today

- [PR #7761](https://github.com/nearai/ironclaw/pull/7761) — bounded provider diagnostic stack footprint.
- [PR #7753](https://github.com/nearai/ironclaw/pull/7753) — preserved terminal dispatch records on capability failure.
- [PR #7764](https://github.com/nearai/ironclaw/pull/7764) and [PR #7751](https://github.com/nearai/ironclaw/pull/7751) — persistent per-user containers via Docker Exec, replacing per-command container lifecycle.

## Feature Requests & Roadmap Signals

Active roadmap signals point toward **v1.4.0**:

- **Persistent per-user sandbox** — [Issue #7732](https://github.com/nearai/ironclaw/issues/7732) is a v1.4.0 epic; Step 1 Docker Exec work already closed in [PR #7764](https://github.com/nearai/ironclaw/pull/7764) and [PR #7751](https://github.com/nearai/ironclaw/pull/7751).
- **Agent lifecycle hooks** — [Issue #7770](https://github.com/nearai/ironclaw/issues/7770) is a phased epic; Phase 1 AfterTurn hook is in [PR #7765](https://github.com/nearai/ironclaw/pull/7765).
- **Unbound runs skip gating instead of aborting** — [Issue #7775](https://github.com/nearai/ironclaw/issues/7775), a direct follow-up to #7770 Phase 1.
- **Onboarding / channel-first approach** — [Issue #7044](https://github.com/nearai/ironclaw/issues/7044) closed; backend OOBE wiring [Issue #6993](https://github.com/nearai/ironclaw/issues/6993) also closed.
- **Durable notification inbox** — groundwork [Issue #7688](https://github.com/nearai/ironclaw/issues/7688) closed; open PRs [PR #7699](https://github.com/nearai/ironclaw/pull/7699), [PR #7698](https://github.com/nearai/ironclaw/pull/7698), and [PR #7700](https://github.com/nearai/ironclaw/pull/7700) continue it.
- **Pluggable MCP-backed memory** — [PR #7661](https://github.com/nearai/ironclaw/pull/7661) makes memory provider binding config-driven.
- **Design system / Storybook** — [Issue #7038](https://github.com/nearai/ironclaw/issues/7038) remains a tracked v1.4.0-era UX epic.

**Prediction:** v1.4.0 will likely include the first real slice of persistent per-user sandboxes, AfterTurn hooks with memory curation, notification-inbox surfaces, automation run-now, and possibly MCP-backed memory as a configuration option.

## User Feedback Summary

- **Blank-slate onboarding friction** was a significant user problem: [Issue #7044](https://github.com/nearai/ironclaw/issues/7044) described users not knowing what to do when the WebUI opens empty. The related OOBE backend work is now closed.
- **Local MCP server support remains a blocker** ([Issue #5998](https://github.com/nearai/ironclaw/issues/5998)) — users want stdio or loopback HTTP for on-device tools and are currently forced out.
- **Per-command sandbox overhead** is visible to users: the [#7732 epic](https://github.com/nearai/ironclaw/issues/7732) exists because Docker create/remove per shell command is too slow and not a true persistent user computer.
- **Benchmark signal** from [Issue #7771](https://github.com/nearai/ironclaw/issues/7771): the 2026-08-20 taxonomy from `officeqa` (58 non-pass) shows that most failures are genuine model-quality errors, not infrastructure problems. That is a positive sign for runtime stability but a negative signal for model choice on that benchmark.

Overall, core-engine stability appears strong, but users and contributors are pushing for lower-latency sandboxes, local-first MCP connectivity, and hook-based extensibility.

## Backlog Watch

The following items have been open longest or have low maintainer engagement and may need attention:

- [Issue #5998 — No transport for local MCP servers](https://github.com/nearai/ironclaw/issues/5998)  
  Open since **2026-07-11**, only 1 comment, no maintainer resolution visible. This is the most important long-unanswered infrastructure request.

- [Issue #7038 — Epic: Storybook + AI-first Design System](https://github.com/nearai/ironclaw/issues/7038)  
  Open since **2026-08-03**, 0 comments. Large UX epic; may need explicit ownership or phase scoping.

- [PR #7491 — omp core-tool contract + engines + benchmark arm](https://github.com/nearai/ironclaw/pull/7491)  
  Open since **2026-08-11**; a large, medium-risk coding-surface PR that is still in review.

- [PR #7661 — MCP-backed memory provider](https://github.com/nearai/ironclaw/pull/7661)  
  Open since **2026-08-14**; broad architectural change that could affect the memory roadmap.

- [PR #7729 — Automations run-now](https://github.com/nearai/ironclaw/pull/7729)  
  Open since **2026-08-18**; large feature with WebUI and trigger-domain changes, still open.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest — 2026-08-21

## 1. Today's Overview

LobsterAI saw moderate maintenance activity over the last 24 hours: 7 PRs were touched (6 merged/closed, 1 still open) and 2 open issues were updated. Notably, most of the PR activity was **stale-policy cleanup** — the majority of touched PRs were authored in early April and carry the `[stale]` label, meaning today's merge/close actions largely reflect backlog resolution rather than fresh feature work. No new releases were published. The one genuinely active signal is open PR #1547 (a scheduled-task notification bug fix), which remains in need of review. Overall project health looks stable: no crashes or regressions were reported, and the bug fixes that surfaced are small, well-scoped UI/state issues.

## 2. Releases

No new releases in the last 24 hours. (Latest releases: none.)

## 3. Project Progress

Six PRs were merged/closed today. Because five of them carry the `[stale]` label, the actual acceptance status of each should be verified by maintainers, but the work they represent spans several meaningful improvements:

**Agent / Chat UX**
- [#1545 fix(agent): sync activeSkillIds immediately when updating current agent's skills](https://github.com/netease-youdao/LobsterAI/pull/1545) *(closed, stale)* — Fixes skill badges not refreshing after editing an agent's skill list until switching agents and back (Fixes #1502).
- [#1560 fix: 修复Agent编辑后点击原Agent无法切换回聊天界面的问题](https://github.com/netease-youdao/LobsterAI/pull/1560) *(closed, stale)* — Fixes an issue where clicking the currently selected Agent after editing it would not return to the chat view; the guard clause `agentId === currentAgentId` bypassed `onShowCowork()`.

**Cowork / File Preview**
- [#1553 feat(cowork): Write 工具文件卡片及分屏预览面板](https://github.com/netease-youdao/LobsterAI/pull/1553) *(closed, stale)* — Adds an inline FileCard for Write tool calls (filename, path, type, size, open/preview/copy actions) plus a resizable right-side preview panel (320–900px) supporting Markdown, HTML sandbox iframe, SVG, images, and syntax highlighting. Closes #1552.

**Engine / Stability**
- [#1546 feat(engine-overlay): 引擎启动超时后显示取消启动和查看日志按钮](https://github.com/netease-youdao/LobsterAI/pull/1546) *(closed, stale)* — After 30s of engine startup hang, shows "Cancel Launch" and "View Logs" buttons to avoid a 5-minute hard timeout with no escape.
- [#1555 fix: npm run dist:mac:x64打包失败](https://github.com/netease-youdao/LobsterAI/pull/1555) *(closed, stale)* — Fixes macOS packaging failure caused by `sha256sum` being unavailable; adds a `shasum` compatibility fallback in `build-openclaw-runtime.sh`.

**Settings / UX**
- [#1557 feat(settings): 设置面板侧栏支持搜索筛选分类](https://github.com/netease-youdao/LobsterAI/pull/1557) *(closed, stale)* — Adds a search box to the settings sidebar to filter the many setting tabs; NFKC-normalized, multi-keyword AND matching, auto-switch to first visible tab when current tab is filtered out.

The single still-open PR is [#1547 fix(scheduledTask): 修复定时任务通知渠道选择后无法改回"不通知"的问题](https://github.com/netease-youdao/LobsterAI/pull/1547) — a two-line fix for a historical bug where the notification channel dropdown reverts to a previously selected IM channel instead of "No notification".

## 4. Community Hot Topics

- [#1556 [OPEN] doc bug: IM机器人配置指南404](https://github.com/netease-youdao/LobsterAI/issues/1556) — 2 comments. A documentation link on the project site 404s. Low complexity, but it's a user-facing trust issue for onboarding; the stale-flagged issue has sat since April 8.
- [#1552 [OPEN] feat: AI产物 Markdown 预览及文件卡片支持](https://github.com/netease-youdao/LobsterAI/issues/1552) — 1 comment. The most substantive community request this cycle. It directly motivated PR #1553; since that PR is now closed as stale, the issue's fate is unclear.
- [#1547 [OPEN] fix(scheduledTask): 通知渠道无法改回"不通知"](https://github.com/netease-youdao/LobsterAI/pull/1547) — the only actively open PR; expected reviewer attention.

Underlying needs: users want **fewer round-trips** (preview generated files in-app instead of pasting content into chat), **reliable UI state persistence** (notification settings, agent selection), and **escape hatches during long-running operations** (engine startup, packaging).

## 5. Bugs & Stability

Ranked by severity:

1. **Medium — Scheduled task notification channel cannot be reset to "No notification"** (#1547, open PR). Historical bug (commit `61cfe60`): the form initializes from `delivery.channel` before checking `delivery.mode`, so saving "No notification" still shows the stale IM channel on re-edit. A +2-line fix is proposed in the open PR — should be reviewed and merged.
2. **Medium/Low — Documentation 404** (#1556, open issue). The IM bot configuration guide link (`LobsterAI-IM机器人配置指南.md`) returns 404 on the project site. Likely a docs-site path restructuring issue; trivial to fix but still unresolved after ~4 months.
3. **Low — macOS x64 packaging failure** (#1555, closed). `sha256sum` is unavailable on macOS; fixed with `shasum` fallback. Ship-blocker for mac distribution, now resolved.
4. **Low — Agent chat switch broken after editing current Agent** (#1560, closed). Sidebar guard clause prevented returning to the chat view; fixed by invoking `onShowCowork()` even when `agentId === currentAgentId`.
5. **Low — Active skill badges not syncing after agent skill edit** (#1545, closed). Redux `skillIds` updated without updating `state.skill.activeSkillIds`; the PR aligns both immediately.

No crashes, security issues, or new regressions were reported today.

## 6. Feature Requests & Roadmap Signals

- **Write tool FileCard + in-app preview panel (#1552 / PR #1553)** — The most likely near-term feature. PR #1553 was closed as stale, but the request is well-specified and targets a clear pain point (writing/document workflows). If the PR was actually merged despite the stale label, this ships in the next release; if not, it is a strong candidate for re-submission or re-opening.
- **Settings sidebar search (#1557, closed)** — Low-risk UX improvement; if merged, it lands in the next version and addresses the growing number of settings tabs.
- **Engine startup cancel/log buttons (#1546, closed)** — Improves failure recovery for network/compile stalls; useful for the OpenClaw engine integration and likely to appear in upcoming release notes.

Prediction: the next minor release will likely include the settings search, engine overlay escape buttons, the two agent-state fixes (#1545, #1560), and the mac packaging fix — assuming the stale closures represent merges. The FileCard/preview feature is the only candidate with "new feature" weight.

## 7. User Feedback Summary

Recurring user pain points visible in today's data:

- **File handling friction**: After an agent uses the Write tool, users must either ask the agent to Read the file back into the chat (wasting context) or manually open the file manager — a poor experience for writing/docs tasks (#1552).
- **UI state desync**: Skill badges not updating, notification channels silently reverting, and agent chat not switching back after edits — all point to a common theme of Redux/component state not staying in sync with user actions (#1545, #1547, #1560).
- **Hanging operations lack control**: A 5-minute hard timeout on engine startup with no cancel option was reported as unacceptable for network/compile failure cases (#1546).
- **Packaging reliability**: macOS x64 builds failing due to a shell utility mismatch frustrates mac users and blocks distribution (#1555).
- **Docs quality**: A 404 on the IM bot setup guide harms onboarding; the issue has been open for months, which may signal docs maintenance is under-resourced (#1556).

Overall sentiment: users are engaged with the agent/cowork workflow and want it to feel like a polished local product, but small state bugs and stale documentation erode trust.

## 8. Backlog Watch

Items needing maintainer attention:

- **[#1547 — open PR: scheduled task notification fix](https://github.com/netease-youdao/LobsterAI/pull/1547)** — The only open PR in the 24h window. It's a minimal, well-diagnosed two-line fix for a bug users can hit in daily workflows. Needs review and merge.
- **[#1556 — doc 404 for IM bot guide](https://github.com/netease-youdao/LobsterAI/issues/1556)** — Open since 2026-04-08, stale-flagged, 2 comments, no fix. Documentation link rot on the project site; low effort, high visibility fix.
- **[#1552 — Write tool file card / preview feature request](https://github.com/netease-youdao/LobsterAI/issues/1552)** — Open since 2026-04-08 with a complete PR (#1553) now closed as stale. Maintainers should decide whether the feature was actually merged (and close the issue) or re-open/prioritize the work.
- **Stale-label hygiene** — Most PRs touched today were from April 7–8. If these were auto-closed without merge, the code changes in #1553 and #1546 represent valuable work that could be lost; maintainers should audit stale closures for salvageable implementations.

---

*Digest generated from LobsterAI GitHub activity (netease-youdao/LobsterAI) as of 2026-08-21.*

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest — 2026-08-21

## 1. Today's Overview

Moltis saw a focused, healthy day of activity: 6 pull requests were updated in the last 24 hours (4 merged/closed, 2 still open), the single tracked issue was a security vulnerability that has now been resolved and closed, and a new release (20260820.01) was published. The bulk of merged work centered on the WhatsApp channel (push-name handling, reply addressing, markdown rendering) plus hard security fixes for the HTTP vault endpoints. Maintainers are actively shepherding PRs through review and merging, indicating a responsive project cadence. One older PR (#468, Windows shell hooks) remains open after roughly five months and continues to await attention.

## 2. Releases

**Release `20260820.01`** was published on 2026-08-20.

No changelog details were included in the provided data snapshot. Based on the PRs merged around this release, the build likely includes:
- Vault unlock/recovery authentication enforcement (fixes CWE-306)
- WhatsApp push-name and reply-addressing fixes
- Configurable untrusted-turn tool ceiling for channels

No breaking changes or migration notes were reported.

## 3. Project Progress

Four PRs were merged/closed in the last 24 hours:

- **[#1216 — fix(httpd): require authentication for vault unlock and recovery](https://github.com/moltis-org/moltis/pull/1216)** — Closes security issue #1177 (CWE-306). `POST /api/auth/vault/unlock` and `POST /api/auth/vault/recovery` were previously allowlisted under `/api/auth/` and required no `AuthSession`, letting unauthenticated remote callers brute-force the vault. Now gated by `auth_gate`.
- **[#1217 — fix(whatsapp): treat a reply to the bot as addressing it](https://github.com/moltis-org/moltis/pull/1217)** — In groups with `mention_mode = "mention"`, replies to the bot are now recognized as directed messages, matching user expectations that @ mentions and replies behave the same.
- **[#1218 — fix(whatsapp): stop hardcoding the push name to "Moltis"](https://github.com/moltis-org/moltis/pull/1218)** — Removes the hardcoded presence-stanza push name so a bot configured as "Ada" no longer appears as "Moltis" to users who haven't saved the number.
- **[#1219 — fix(channels): make the untrusted-turn tool ceiling configurable](https://github.com/moltis-org/moltis/pull/1219)** — Adjusts the deny-all tool policy added in #1170; operators can now configure the tool ceiling for untrusted turns, making layers 4–5 reachable and restoring the three public-audience tools.

## 4. Community Hot Topics

The most active items this cycle:

- **[PR #1220 — fix(whatsapp): render Markdown in outbound messages](https://github.com/moltis-org/moltis/pull/1220)** (open, created 2026-08-20) — Converts model-generated markdown to WhatsApp-native markup before delivery, preserving original markdown in session history and web UI. This is the newest PR and touches a core UX surface (how users actually see bot output on WhatsApp).
- **[PR #468 — fix(plugins): use cmd.exe on Windows for shell hooks](https://github.com/moltis-org/moltis/pull/468)** (open since 2026-03-23) — Fixes Windows compatibility for plugin shell hooks by detecting the OS at runtime and using `cmd.exe /C` instead of `sh -c`. The author reports Windows CI passing and testing on Windows 10. Its age and lack of merge indicate a lingering Windows-support gap.
- **[Issue #1177 — Vault Unlock/Recovery Endpoints Missing Authentication (CWE-306)](https://github.com/moltis-org/moltis/issues/1177)** (closed) — Although reported on 2026-07-30, it drove the security fix in #1216 and reflects users actively probing the security posture of self-hosted deployments.

The underlying pattern: community members are using Moltis as a real messaging-layer for production-ish setups and care about (a) security boundaries on exposed endpoints and (b) WhatsApp behaving like the native client users expect.

## 5. Bugs & Stability

One issue was updated/closed today; no new regressions were reported in the last 24 hours.

- **[#1177 — [Bug]: Vault Unlock/Recovery Endpoints Missing Authentication (CWE-306)](https://github.com/moltis-org/moltis/issues/1177)** — **Severity: Critical (security).** Any unauthenticated remote caller could brute-force the vault unlock/recovery endpoints because the `/api/auth/` prefix was fully allowlisted in `is_public_path()`. **Status: Fixed** by PR [#1216](https://github.com/moltis-org/moltis/pull/1216), which added `AuthSession` extraction and closed the gap. No known remaining exposure.

## 6. Feature Requests & Roadmap Signals

Strong signals from this batch:

- **WhatsApp markdown rendering** ([#1220](https://github.com/moltis-org/moltis/pull/1220)) — Users want bot output on WhatsApp to display formatted headings, bold, and emphasis rather than raw markdown. Likely to merge soon given the cluster of WhatsApp fixes in this cycle.
- **Configurable tool ceilings for untrusted turns** ([#1219](https://github.com/moltis-org/moltis/pull/1219), merged) — The community wanted to opt out of the hardcoded deny-all policy for public-audience tools. Expect follow-up docs on the new configuration option.
- **Windows-first-class support** ([#468](https://github.com/moltis-org/moltis/pull/468)) — Open since March; represents a persistent community desire to run Moltis on Windows without shell-hook breakage. This is a candidate for the next release if maintainers pick it up.

## 7. User Feedback Summary

Real pain points and use cases surfaced this cycle:

- **Security of exposed endpoints** (#1177) — A user highlighted that vault unlock/recovery were unauthenticated, a serious hardening concern for self-hosters exposing Moltis publicly. The quick fix and closure suggest maintainers took it seriously.
- **WhatsApp identity** (#1218) — A bot named "Ada" showing up as "Moltis" in group chats was a visible branding/correctness bug that degraded the assistant's presence in multi-user chats.
- **WhatsApp addressing semantics** (#1217) — Users treat replying to the bot as "mentioning" it; the old behavior silently dropped valid messages, which is a frustrating UX in group chats.
- **Desktop/OS coverage** (#468) — Windows users cannot rely on shell hooks; the reporter invested in testing and CI, indicating a motivated user base wanting parity with Unix.

Overall sentiment appears positive: contributors are filing precise bug reports, submitting their own fixes, and maintainers are merging quickly.

## 8. Backlog Watch

- **[PR #468 — fix(plugins): use cmd.exe on Windows for shell hooks](https://github.com/moltis-org/moltis/pull/468)** — Open since **2026-03-23** (~5 months). Author reports tested on Windows 10 and passing Windows CI. This is the oldest open PR in the current batch and directly addresses multi-platform support. Without maintainer feedback, Windows users remain blocked on shell hooks. Needs a review decision (merge, request changes, or close with guidance).
- **[PR #1220 — fix(whatsapp): render Markdown in outbound messages](https://github.com/moltis-org/moltis/pull/1220)** — Open and newest; not yet flagged as stale, but worth monitoring for review latency given the flurry of WhatsApp work being merged this week.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-08-21

> Data source: GitHub activity from `agentscope-ai/QwenPaw` (CoPaw project).  
> Reporting window: last 24 hours.

## 1. Today's Overview

CoPaw is in a high-activity period: 27 issues and 50 PRs were updated in the last 24 hours, with 13 issues and 29 PRs closed/merged. One new beta release, `v2.1.1-beta.1`, shipped with console and provider fixes. Community engagement is strong, but several high-severity reliability issues remain open, especially around silent task stops, network recovery, and long-running session stability. Overall the project shows healthy throughput, with a mix of rapid bug fixes and ambitious feature work in flight.

## 2. Releases

### [v2.1.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.1-beta.1)

Changes:
- `feat(console)` — improve editor tab overflow navigation ([#6983](https://github.com/agentscope-ai/QwenPaw/pull/6983))
- `fix(providers)` — lower rate limiter init log level ([#6988](https://github.com/agentscope-ai/QwenPaw/pull/6988))
- `chore` — release notes update

No breaking changes or migration notes were provided. This is a beta patch focused on console UX and provider logging polish.

## 3. Project Progress

Notable closed/merged PRs from the last 24 hours:

- [#7172](https://github.com/agentscope-ai/QwenPaw/pull/7172) — `chore(deps)` patches vulnerable website and Creator dependencies: `vite`, `rollup`, `react-router-dom`, `js-yaml`.
- [#7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) — `fix(envs)` preserves corrupt `envs.json` files and writes environment variables atomically.
- [#7174](https://github.com/agentscope-ai/QwenPaw/pull/7174) — `perf(drivers)` initializes persistent drivers concurrently, reducing workspace cold-start time.
- [#7166](https://github.com/agentscope-ai/QwenPaw/pull/7166) — `fix(release)` bundles `qwenpawmail` MCP as a standalone sidecar.
- [#7161](https://github.com/agentscope-ai/QwenPaw/pull/7161) — `feat(console)` adds artifacts to the assistant response card.
- [#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880) — `feat(console)` unifies apps, plugins, and skills under a shared `/market` page.
- [#6371](https://github.com/agentscope-ai/QwenPaw/pull/6371) — `fix(file-handling)` continues downloader fallback after subprocess timeout.

Also closed: skill name deduplication for workspace/built-in skills ([#7073](https://github.com/agentscope-ai/QwenPaw/issues/7073)) and downloader fallback timeout fix ([#6370](https://github.com/agentscope-ai/QwenPaw/issues/6370)).

## 4. Community Hot Topics

Most active issues by comment count:

- [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) — **Agent silently stops after planning; user must say “继续” to continue.** 10 comments.  
  Underlying need: users expect reliable autonomous multi-step task execution and clear progress/error visibility, not silent halts.

- [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) — **Freeze longer than 10 minutes with GLM 5.3.** 9 comments.  
  Underlying need: provider integrations need better timeout, heartbeat, or cancellation behavior to avoid long unresponsive freezes.

- [#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643) — **Task outputs should live in per-task directories instead of one shared `media` folder.** 6 comments.  
  Underlying need: users doing file-heavy work want better artifact organization and project hygiene.

- [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) — **Automatic model routing: “The Right Model for Every Message.”** 4 comments, 1 👍.  
  Underlying need: power users want cost/latency/capability trade-offs handled automatically (small model for simple turns, vision model for images, big model for hard reasoning).

- [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) — **Assistant message end time displayed incorrectly.** 4 comments.  
  Underlying need: accurate timing information in chat UI for users auditing long agent runs.

## 5. Bugs & Stability

Ranked by estimated severity:

| Severity | Issue | Status | Notes |
|---|---|---|---|
| High | [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) — Silent stop after planning | Open | No fix PR yet; critical autonomous-task reliability issue. |
| High | [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) — No auto-recovery after network interruption | Open | All LLM requests keep failing with `httpx.ConnectTimeout` until manual restart. No fix PR visible. |
| High | [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) — `history.db` bloated to 7.6 GB by `recall_history` expand | Open | Duplicate range writes and full tool output persisted; storage/performance risk. |
| Medium | [#7156](https://github.com/agentscope-ai/QwenPaw/issues/7156) — Embedding health check times out even when warm; timeout hardcoded | Open | WIP PR [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) adds configurable per-attempt timeout. |
| Medium | [#7162](https://github.com/agentscope-ai/QwenPaw/issues/7162) — `httpx.ReadError` during streaming causes `UNKNOWN_AGENT_ERROR` | Closed | Retry classification missed `ReadError`; fix likely landed, but no explicit PR shown. |
| Medium | [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102) — Freeze >10 minutes with GLM 5.3 | Closed | Closed, but no visible fix PR in the current data. |
| Low/UX | [#7110](https://github.com/agentscope-ai/QwenPaw/issues/7110) — Undownloadable image link makes entire session unusable | Closed | Session recovered only with `/clear`. |
| Low/UX | [#7118](https://github.com/agentscope-ai/QwenPaw/issues/7118) — Corrupt `envs.json` silently overwritten, env vars lost | Closed | Fix PR [#7135](https://github.com/agentscope-ai/QwenPaw/pull/7135) preserves corrupt files and writes atomically. |
| Low/UX | [#6370](https://github.com/agentscope-ai/QwenPaw/issues/6370) — Downloader timeout escapes fallback chain | Closed | Fix PR [#6371](https://github.com/agentscope-ai/QwenPaw/pull/6371). |

## 6. Feature Requests & Roadmap Signals

Active feature requests that may influence upcoming versions:

- [#7182](https://github.com/agentscope-ai/QwenPaw/issues/7182) / [#7183](https://github.com/agentscope-ai/QwenPaw/pull/7183) — **Workspace-scoped always-on Skills** for specialized agents. An implementation PR is already open, so this is likely for the next minor release.
- [#7156](https://github.com/agentscope-ai/QwenPaw/issues/7156) / [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) — **Configurable embedding health-check timeout**, currently a WIP PR.
- [#7176](https://github.com/agentscope-ai/QwenPaw/pull/7176) — **Console performance for long chat sessions**, open and likely to improve the streaming/markdown rendering experience.
- [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) — **Automatic model routing** remains an open roadmap item with community support.
- [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) — **Self-hosted multi-user Hub** with local and Docker runtimes; large feature PR under review.
- [#7013](https://github.com/agentscope-ai/QwenPaw/issues/7013) — **Unified tool panel**: file preview, diff view, Web service preview, and interactive terminal.
- [#7181](https://github.com/agentscope-ai/QwenPaw/issues/7181) — **Support Qwen_Code as a third-party agent harness**.
- [#7159](https://github.com/agentscope-ai/QwenPaw/issues/7159), [#7158](https://github.com/agentscope-ai/QwenPaw/issues/7158) — **QQ scheduled push** and **DingTalk group context modes**.

## 7. User Feedback Summary

Real user pain points observed in the data:

- **Task reliability is the loudest theme.** Users repeatedly report silent stops, long freezes, and streaming failures ([#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921), [#7102](https://github.com/agentscope-ai/QwenPaw/issues/7102), [#7162](https://github.com/agentscope-ai/QwenPaw/issues/7162)).
- **Network resilience matters.** Brief network interruptions should not require a full restart ([#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932)).
- **Long-running sessions face storage and performance issues**, including `history.db` bloat and media file clutter ([#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168), [#6643](https://github.com/agentscope-ai/QwenPaw/issues/6643)).
- **Localization/UX concerns**: Chinese filenames are not preserved, “New Chat” should be “New Task,” and agent switching is cumbersome ([#6453](https://github.com/agentscope-ai/QwenPaw/issues/6453), [#6734](https://github.com/agentscope-ai/QwenPaw/issues/6734), [#7179](https://github.com/agentscope-ai/QwenPaw/issues/7179)).
- **VPN/proxy support is still a blocker** for some desktop users ([#6974](https://github.com/agentscope-ai/QwenPaw/issues/6974)).

Satisfaction signals are mixed but generally positive: many bugs and small enhancements were closed within the last 24 hours, suggesting responsive maintainers. However, the still-open critical issues around autonomous continuation and network recovery need visible progress to maintain trust.

## 8. Backlog Watch

Items that need maintainer attention or clear roadmapping:

- [#6921](https://github.com/agentscope-ai/QwenPaw/issues/6921) — Critical silent-stop bug, 10 comments, open for 8 days. No fix PR yet.
- [#6932](https://github.com/agentscope-ai/QwenPaw/issues/6932) — Network recovery bug, open for 8 days. High operational impact.
- [#6436](https://github.com/agentscope-ai/QwenPaw/issues/6436) — Automatic model routing, open since 2026-07-24. Needs maintainer roadmap decision.
- [#7168](https://github.com/agentscope-ai/QwenPaw/issues/7168) — New `history.db` bloat bug, needs triage and a mitigation/fix plan.
- [#7013](https://github.com/agentscope-ai/QwenPaw/issues/7013) — Large UI feature request for a unified tool panel; needs scoping.
- [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) — Self-hosted Hub PR; large and needs sustained review.
- [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080) — PowerContext memory backend PR, first-time contributor, under review.
- [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133) — WIP ReMe update; addresses a real bug, needs test/merge follow-up.
- [#7180](https://github.com/agentscope-ai/QwenPaw/issues/7180) — Release duty verification for `v2.1.1-beta.1`; deadline was 2026-08-20 14:43 UTC and the issue is still open.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-08-21

## 1. Today's Overview

ZeroClaw is in a period of high, sustained activity: 50 issues and 50 pull requests were updated in the last 24 hours, with 44 issues open vs. 6 closed, and 45 PRs open vs. 5 merged/closed. No new releases were published during this window; the project remains on the v0.8.x line (most recently v0.8.4, per the [crates.io packaging tracker #9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)). Attention is concentrated on architecture-level RFCs — lighter core, SOP permission contracts, opt-in telemetry — while two new high-severity sandbox policy bugs ([#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165), [#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164)) landed today and are already accepted for triage. Overall health is positive: steady closure of task-type issues, active security hardening across Docker/CI and channel credentials, and a functioning maintainer decision queue ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)) — though several P1 bugs on Windows and in the sandbox remain open.

## 2. Releases

**No new releases in this reporting period.**

The last release, v0.8.4, shipped with deliberate deferrals tracked in [zeroclaw-labs/zeroclaw#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381): in-crate symlinks that break Windows checkouts without developer mode, and crates.io publishing follow-ups. No migration notes apply to this window. Users are reminded that v0.8.3-era Windows installer issues are still tracked separately ([#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)).

## 3. Project Progress

**Merged/closed PRs visible today (2 of 5):**
- [PR #10057](https://github.com/zeroclaw-labs/zeroclaw/pull/10057) — `feat(zerocode)`: queued message recovery actions (Send now, Copy, Edit, Delete). Closes issue [#10044](https://github.com/zeroclaw-labs/zeroclaw/issues/10044).
- [PR #10090](https://github.com/zeroclaw-labs/zeroclaw/pull/10090) — `fix(tests)`: silence Windows-only cfg warnings.

**Closed issues (5 of 6 visible):**
- [#5842](https://github.com/zeroclaw-labs/zeroclaw/issues/5842) — Warn when Codex CLI `extra_args` weaken sandbox/policy boundaries (implemented/closed).
- [#10011](https://github.com/zeroclaw-labs/zeroclaw/issues/10011) — Remove runtime-written executable fixture from daemon heartbeat test.
- [#9803](https://github.com/zeroclaw-labs/zeroclaw/issues/9803) — RFC accepted: retire standalone `zeroclaw-robot-kit`, fold into `zeroclaw-hardware`.
- [#9470](https://github.com/zeroclaw-labs/zeroclaw/issues/9470) — Correct Reliable fallback telemetry attribution and stale notices.
- [#10044](https://github.com/zeroclaw-labs/zeroclaw/issues/10044) — ZeroCode queued message recovery (landed via #10057).

**Features/fixes advanced today:**
- [PR #10144](https://github.com/zeroclaw-labs/zeroclaw/pull/10144) — Complete lifecycle provider accounting (`XL`): normalizes Reliable, Router, model-pin, vision-override, direct, streaming, and recovery paths. Tracks issue [#10143](https://github.com/zeroclaw-labs/zeroclaw/issues/10143).
- [PR #10174](https://github.com/zeroclaw-labs/zeroclaw/pull/10174) — Smoke-test pinned release tools on native Linux/Windows runners; adds `release_tools_only` workflow path. Tracks [#10159](https://github.com/zeroclaw-labs/zeroclaw/issues/10159).
- [PR #10150](https://github.com/zeroclaw-labs/zeroclaw/pull/10150) — ZeroCode now accepts terminal paste during active turns instead of discarding it.
- [PR #10176](https://github.com/zeroclaw-labs/zeroclaw/pull/10176) — CI enforces Alpine non-root image metadata and updates `SECURITY.md` to match reality.
- [PR #10107](https://github.com/zeroclaw-labs/zeroclaw/pull/10107) — Google STT API keys moved out of URLs into `x-goog-api-key` headers.
- [PR #10163](https://github.com/zeroclaw-labs/zeroclaw/pull/10163) — Anchors the rapid-resample CPU cache test to its timing premise (flake fix).
- [PR #10101](https://github.com/zeroclaw-labs/zeroclaw/pull/10101) — Normalizes `.SRCINFO` fixture line endings for Windows CI.

## 4. Community Hot Topics

**Most-discussed issues:**

- [Issue #6165 — RFC: Prefer a lighter ZeroClaw core through external integrations](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) *(17 comments, open since 2026-04-27)* — The single most active thread. The community is pushing to move long-tail integrations out of the default core into MCP/external replacements, citing configuration, security, and compatibility burden. Flagged `needs-maintainer-review`; a decision appears overdue.
- [Issue #8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) *(13 comments)* — A community-created tracker to force timely decisions on exactly the kind of RFC above. Healthy governance signal.
- [Issue #8891 — Persistent memory parity tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8891) *(9 comments)* — Coordinates 14 open items (4 issues + 10 PRs) toward cross-session memory parity with peer agent runtimes. The largest active epic.
- [Issue #9598 — RFC: SOP capability permission contract](https://github.com/zeroclaw-labs/zeroclaw/issues/9598) *(8 comments)* — Rev 3 of the v0.9.0 SOP authorization contract; separates interim owner/risk-profile enforcement from a future shared policy layer.
- [Issue #9621 — RFC: staged opt-in product telemetry](https://github.com/zeroclaw-labs/zeroclaw/issues/9621) *(8 comments, accepted)* — Maintainers want real usage data before making support/removal decisions; prompted by the Lucid/Qdrant production-usage question in #9103.

**Most-active PRs:** [#9634](https://github.com/zeroclaw-labs/zeroclaw/pull/9634) (Telegram `allowed_groups` authorization), [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) (declarative skill auto-activation, stacked on #9563), [#10174](https://github.com/zeroclaw-labs/zeroclaw/pull/10174) (release-tools CI verification), and [#10144](https://github.com/zeroclaw-labs/zeroclaw/pull/10144) (provider-call accounting).

**Underlying needs:** (1) faster maintainer decisions on architecture RFCs; (2) core modularization (lighter binary, WASM plugins); (3) persistent memory parity; (4) a coherent security/sandbox permission contract.

## 5. Bugs & Stability

**New today (ranked by severity):**

- [Issue #10165 — Independent delegate bypasses `block_high_risk_commands` on its own risk profile](https://github.com/zeroclaw-labs/zeroclaw/issues/10165) — **S0 (data loss/security risk)**, P1, accepted. A high-risk command such as `rm` succeeds through an independent delegate even when the delegate's own profile blocks it. No fix PR yet.
- [Issue #10164 — `block_high_risk_commands = false` not honored: allowlisted high-risk command still blocked on the parent path](https://github.com/zeroclaw-labs/zeroclaw/issues/10164) — **S2**, P1, accepted. The inverse policy bug: allowlisting + disabling the block still hard-blocks `rm` with no approval path. No fix PR yet.
- [Issue #10074 — SECURITY.md documents a CI job removed in April](https://github.com/zeroclaw-labs/zeroclaw/issues/10074) — P2, in-progress; a fix PR is open ([#10176](https://github.com/zeroclaw-labs/zeroclaw/pull/10176)).

**Existing high-priority bugs still open:**

- [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) — **S1**: Failed ACP turns disappear after switching sessions (P1, in-progress).
- [#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290) — **S1**: Windows desktop installer fails at launch with missing `TaskDialogIndirect` (P1, help wanted).
- [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) — **S1**: Stopping the agent mid-work erases tool calls and reasoning from context (P1, accepted).
- [#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) — **S2**: Windows: killed process leaves port bound (zombie LISTENING/CLOSE_WAIT); new daemon fails to start (P1, accepted).
- [#9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436) — **S2**: `config init` writes template sections that fail the strict loader; fresh config born degraded (P1, in-progress).
- [#9929](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) — **S2**: Headless SOP step turns get a session path but are never persisted (P1, blocked).
- [#10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106) — **S2**: Exact proxy selectors reject supported transcription services (P2).

**Fix PRs in flight:** [#10107](https://github.com/zeroclaw-labs/zeroclaw/pull/10107) (Google STT keys out of URLs), [#10176](https://github.com/zeroclaw-labs/zeroclaw/pull/10176) (Alpine non-root enforcement + SECURITY.md correction), [#10150](https://github.com/zeroclaw-labs/zeroclaw/pull/10150) (paste during active turns), [#10101](https://github.com/zeroclaw-labs/zeroclaw/pull/10101) (.SRCINFO Windows line endings), [#10163](https://github.com/zeroclaw-labs/zeroclaw/pull/10163) (test timing flake).

## 6. Feature Requests & Roadmap Signals

**Likely candidates for the next release (v0.9.0):**

- **Modular core direction** — [RFC #6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) (lighter core via external integrations) and the accepted [tracker #8850](https://github.com/zeroclaw-labs/zeroclaw/issues/8850) (compile-time features → runtime WASM plugins) both point to a slimmer default binary. #8850 is explicitly "the concrete path" and in-progress.
- **Persistent memory parity** ([#8891](https://github.com/zeroclaw-labs/zeroclaw/issues/8891)) — 10 open PRs under this epic; visible momentum toward full parity.
- **SOP permission contract** ([#9598](https://github.com/zeroclaw-labs/zeroclaw/issues/9598)) — targets v0.9.0 explicitly; interim enforcement path separated from the shared policy model.
- **Opt-in product telemetry** ([#9621](https://github.com/zeroclaw-labs/zeroclaw/issues/9621)) — accepted; likely ships as the staged, operator-reviewed form described in the RFC.
- **Goal mode v2** ([#9702](https://github.com/zeroclaw-labs/zeroclaw/issues/9702)) — durable continuation + trusted browser controls; still in maintainer review.
- **CI/security hygiene** — Alpine non-root enforcement ([#10176](https://github.com/zeroclaw-labs/zeroclaw/pull/10176)), release-tools verification on native runners ([#10174](https://github.com/zeroclaw-labs/zeroclaw/pull/10174)), Blacksmith debugging isolation ([#10041](https://github.com/zeroclaw-labs/zeroclaw/issues/10041)), and CI-gate annotations ([#9512](https://github.com/zeroclaw-labs/zeroclaw/issues/9512), accepted, XS).
- **User-facing channel features** — Telegram group-wide allowlists ([PR #9634](https://github.com/zeroclaw-labs/zeroclaw/pull/9634)) and WhatsApp passkey-gate support ([PR #10084](https://github.com/zeroclaw-labs/zeroclaw/pull/10084)) respond to concrete integration gaps; both need author action to avoid staling.

**Completed signals:** ZeroCode UX polish is actively shipping — queued-message recovery ([#10057](https://github.com/zeroclaw-labs/zeroclaw/pull/10057), closed) and paste-during-turn ([PR #10150](https://github.com/zeroclaw-labs/zeroclaw/pull/10150)) both landed in days.

## 7. User Feedback Summary

- **Windows remains the loudest pain cluster.** Users report an installer crash at launch (`TaskDialogIndirect`, [#9290](https://github.com/zeroclaw-labs/zeroclaw/issues/9290)), zombie port binding after killing the process ([#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800)), erased agent context when stopping mid-work ([#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)), and Windows-specific config/CI failures ([#9436](https://github.com/zeroclaw-labs/zeroclaw/issues/9436), [#10101](https://github.com/zeroclaw-labs/zeroclaw/pull/10101)).
- **Sandbox policy is confusing and inconsistent.** Today's two reports ([#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164), [#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)) show the same setting behaving oppositely on different paths — too strict on the parent path (allowlist ignored), too loose through delegates (block bypassed). This is a trust-breaking bug cluster for security-conscious users.
- **Mobile/Linux edge users feel unserved.** The Android/Termux installer bug ([#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911)) has been open since June with no fix visible.
- **Positive signals:** Users' UX complaints (lost queued prompts, paste discarded during turns) were addressed within days ([#10044](https://github.com/zeroclaw-labs/zeroclaw/issues/10044) → [#10057](https://github.com/zeroclaw-labs/zeroclaw/pull/10057); [PR #10150](https://github.com/zeroclaw-labs/zeroclaw/pull/10150)). The quick closure of [#5842](https://github.com/zeroclaw-labs/zeroclaw/issues/5842) and [#9470](https://github.com/zeroclaw-labs/zeroclaw/issues/9470) shows maintainers acting on user-reported security/observability bugs.
- **Documentation drift:** A user caught `SECURITY.md` describing a CI job that no longer exists ([#10074](https://github.com/zeroclaw-labs/zeroclaw/issues/10074)) — a reminder that documented security guarantees must match actual CI.

## 8. Backlog Watch

**Long-unanswered / awaiting maintainer decision:**

- [Issue #6165 — RFC: lighter ZeroClaw core](https://github.com/zeroclaw-labs/zeroclaw/issues/6165) — open since **April 27**, 17 comments, `needs-maintainer-review`. The single most important RFC awaiting a decision; its outcome shapes packaging and roadmap.
- [Issue #8800 — Windows zombie port binding](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) — open since July 7, P1, accepted, no fix PR yet.
- [Issue #9290 — Windows installer `TaskDialogIndirect`](https://github.com/zeroclaw-labs/zeroclaw/issues/9290) — open since July 23, P1, marked `help wanted`; a maintainer/contributor is needed.
- [Issue #7911 — Android/Termux install.sh](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) — open since June 18, accepted, P2; scripts fix never scheduled.
- [Issue #9929 — headless SOP sessions not persisted](https://github.com/zeroclaw-labs/zeroclaw/issues/9929) — P1 but `blocked`; unblocking this would remove a data-loss-adjacent risk.

**PRs at risk of staling (`needs-author-action` / `stale-candidate`):**
- [#9634](https://github.com/zeroclaw-labs/zeroclaw/pull/9634) — Telegram `allowed_groups` (P1, security-relevant).
- [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) — Declarative skill auto-activation (`XL`, stacked on #9563, needs rebase).
- [#9563](https://github.com/zeroclaw-labs/zeroclaw/pull/9563) — Typed media envelope from Telegram (P1, blocks #8965).
- [#10084](https://github.com/zeroclaw-labs/zeroclaw/pull/10084) — WhatsApp passkey-gate fix.
- [#9828](https://github.com/zeroclaw-labs/zeroclaw/pull/9828) — Agent-facing config authoring with policy previews (`XL`).

**PRs tagged `do-not-merge` pending review decisions:**
- [#9744](https://github.com/zeroclaw-labs/zeroclaw/pull/9744) — Require authenticated webhook ingress before agent dispatch (security boundary).
- [#9451](https://github.com/zeroclaw-labs/zeroclaw/pull/9451) — Retire dormant DORA telemetry.
- [#9942](https://github.com/zeroclaw-labs/zeroclaw/pull/9942) — Report the withheld `vi_verify` tool through the config surface.
- [#9515](https://github.com/zeroclaw-labs/zeroclaw/pull/9515) — Capture skill-review fork messages instead of slicing trimmed history (P1).

---

*Data source: GitHub activity for [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw) as of 2026-08-20/21. All links are to the original issues/PRs.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Liderhu/agents-radar).*