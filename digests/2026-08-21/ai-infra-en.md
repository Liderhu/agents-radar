# AI Infrastructure Digest 2026-08-21

> Generated: 2026-08-20 17:03 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — 2026-08-21

## 1. Ecosystem Overview

The AI infrastructure ecosystem is shifting from generic serving features toward model-specific execution paths, with speculative decoding, quantized MoE kernels, and caching architecture getting the most attention. Correctness and security are emerging as constraints: several projects reported cross-request contamination, silent all-zero embeddings, credential leaks, and grammar-illegal draft acceptance in the same 24-hour window. llama.cpp and Ollama shipped releases, while vLLM, SGLang, and LiteLLM are in a heavier development/build-up phase. Across every project, agent tool-calling remains the least reliable layer, with parser bugs, malformed tool-call wrappers, and unbounded agent loops appearing repeatedly. For infrastructure engineers, the takeaway is clear: pin versions, isolate multi-tenant traffic, and validate outputs rather than trusting HTTP-level success.

## 2. Activity Comparison

Counts are distinct issue/PR numbers referenced in each digest, not full GitHub totals.

| Project | Referenced Issues | Referenced PRs | Release Status |
|---|---:|---:|---|
| vLLM | 19 | 18 | No release in last 24h |
| SGLang | 24 | 19 | No release in last 24h; 0.5.17 implicated in regressions |
| llama.cpp | 12 | 20 | 6 releases shipped: b10505–b10516 |
| Ollama | 15 | 7 | v0.32.15 shipped |
| LiteLLM | 11 | 10 | No release in last 24h |
| Unsloth | 15 | 13 | v0.1.801-beta shipped |

## 3. Model Support Race

| Project | New Model / Architecture Activity | Where It Leads |
|---|---|---|
| vLLM | GLM FP8 KV default, Kimi-K3 GEMM-AR/FlashKDA, DeepSeek V4 shared-expert fusion, gpt-oss routed expert loading, MiniMax-M3 ROCm | Datacenter MoE and speculative-decoding kernels |
| SGLang | FlashInfer SM90 MXFP4 W4A8 MoE, MiniCPM-SALA, MiniMax-M3 SM100 MSA, ROCm 7.14 builds, Ascend/MUSA enablement | Hardware/quantization breadth and scheduler features |
| llama.cpp | GraniteSWA/GraniteMoeSWA conversion + inference, DFlash2 speculator, lfm2/lfm2moe tensor split, multi-node RPC tensor split | Local/edge architecture coverage and multi-node GGUF inference |
| Ollama | No new architectures shipped; MLX Qwen3.5 vision landed; feature requests for Upstage Solar Pro 4, Qwen3.8, Q3_K_M MLX | Local developer experience rather than model breadth |
| LiteLLM | Parallel AI provider, Anthropic 1M context beta header, Bedrock AgentCore search request | Provider/gateway-level model access |
| Unsloth | Qwen3.8-27B support credited; NVFP4 on sm120 not loading; MLX backend race fixed | Fine-tuning and Studio model enablement |

**Who is ahead:** vLLM and SGLang are ahead for frontier datacenter serving, especially for MoE and next-generation NVIDIA/AMD hardware. llama.cpp is ahead for local/edge architecture breadth and conversion tooling. LiteLLM leads in provider-agnostic gateway integration. Unsloth is the clear player in the fine-tuning layer.

## 4. Performance Frontier

Optimization effort today is concentrated in four areas:

- **Speculative decoding:** vLLM is precomputing EAGLE/DFlash index mappings and fixing MTP candidates; SGLang removed speculative overshoot from radix-cache keys and is routing DFlash/DSpark through ReplaySSM; llama.cpp added adaptive MTP draft depth and a DFlash2 speculator. This remains the least stable performance feature across all engines.
- **Quantized MoE and kernels:** The biggest wins are model-specific: DeepSeek V4 shared-expert fusion into DeepGEMM MegaMoE, FlashInfer SM90 MXFP4 W4A8, NVFP4 W4A4 hybrid quantization, ROCm bpreshuffled blockscaled FP8 GEMM, and Metal/SYCL/Vulkan kernel improvements. FP8 block-scaled and MXFP4 paths are landing quickly but remain platform-fragmented.
- **KV cache / prefix caching / admission control:** SGLang’s Weight Cache Daemon cuts large-model weight load from ~300s to <1s; vLLM added FlashKDA prefill checkpoints for prefix caching; Unsloth made admission KV-cache-aware; Ollama is still missing MLX prefix caching. Token-aware admission controls are replacing simple slot-count limits.
- **Distributed and multi-backend serving:** llama.cpp is pushing multi-node RPC tensor splits; vLLM is tuning TP/EP on ROCm; SGLang is working through PD-disaggregation and PP8 TTFT floor issues. These are still bleeding-edge, with crash and data-integrity bugs active.

## 5. Layer Positioning

| Project | Layer | Primary Role |
|---|---|---|
| vLLM | Serving engine | High-throughput, multi-GPU inference with deep kernel/speculative/MoE optimization |
| SGLang | Serving engine | Competing serving engine with strong scheduler, radix cache, and hardware-enablement focus |
| llama.cpp | Local runtime | GGUF-based inference across CPU, Metal, CUDA, Vulkan, SYCL, and RPC multi-node setups |
| Ollama | Local runtime + developer API | User-friendly model management, streaming, and local/edge serving |
| LiteLLM | Gateway | LLM-agnostic access, provider routing, auth, budgets, rate limits, and health |
| Unsloth | Fine-tuning framework | Efficient training/quantization, Studio UI, and chat/agent experimentation |

The key distinction: vLLM/SGLang optimize model execution in datacenter serving; llama.cpp/Ollama optimize local runtime reach and developer ergonomics; LiteLLM controls access and policy without executing models; Unsloth owns the training/fine-tuning layer.

## 6. Trend Signals

- **Speculative decoding is expanding faster than its correctness story.** MTP/DFlash/EAGLE work is heavy across vLLM, SGLang, and llama.cpp, but crashes, grammar-illegal drafts, and quantized-target divergence are common. Application developers should pin versions, disable spec decode for structured-output endpoints, and validate determinism separately.
- **Quantized MoE is the competitive battleground.** MXFP4/NVFP4, FP8 block scaling, and DeepGEMM/FlashInfer kernel work dominate. Platform-specific failures (sm120 FP8, Hopper EP crashes, ROCm AITER pinning) are still frequent enough that hardware/software compatibility matrices matter.
- **Data isolation and security are becoming serving-layer issues.** The vLLM int32 pointer-overflow fix, llama.cpp HIP cross-request response contamination, Ollama all-zero embeddings, and LiteLLM `/health` credential leak all point in the same direction: multi-tenant inference now needs security and correctness validation, not just throughput testing.
- **Agent tool-calling remains the most fragile layer.** DSML corruption, qwen3.8 parser hangs, gemma4 separator mismatch, MCP auto-execute hijacks, and deepseek thinking loops appeared across every project. Agent builders need retry logic, watchdog limits, and server-side schema validation.
- **Cold-start and memory admission are becoming product differentiators.** Weight Cache Daemon, KV-cache-aware admission, model metadata caches, and token-aware admission controls are aimed at the operational pain of large-model serving and multi-client concurrency.
- **Watch these for production planning:** the CUDA security fix in vLLM, the HIP `c7d87229` bisect in llama.cpp, the qwen3.5/3.8 version pinning guidance in SGLang/Ollama, and the LiteLLM `/health` exposure. These are not theoretical risks; each has a concrete reproduction path in today’s digests.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-08-21

## 1. Today's Highlights

No release shipped in the last 24 hours; activity is concentrated in speculative decoding and next-gen MoE serving. On the PR side, Kimi-K3 GEMM-AR ([#53053](https://github.com/vllm-project/vllm/pull/53053)) and FlashKDA prefill checkpoints ([#52971](https://github.com/vllm-project/vllm/pull/52971)), DeepSeek V4 shared-expert fusion into MegaMoE ([#53040](https://github.com/vllm-project/vllm/pull/53040)), and DFlash2 candidate-selector fixes ([#52883](https://github.com/vllm-project/vllm/pull/52883)) stand out. On the stability side, the long-running MTP illegal-memory-access crash ([#40756](https://github.com/vllm-project/vllm/issues/40756), 41 comments) remains open, and a new CUDA security-hardening PR ([#53131](https://github.com/vllm-project/vllm/pull/53131)) closes an int32 pointer-overflow path that could leak data across users.

## 2. Releases & Breaking Changes

None. No vLLM releases were published in the last 24 hours.

## 3. New Model & Hardware Support

- **GLM**: [#53138](https://github.com/vllm-project/vllm/pull/53138) defaults the KV cache to FP8 for quantized `GlmMoeDsaForCausalLM` checkpoints on NVIDIA (only when `--kv-cache-dtype auto`); explicit dtypes are preserved. [#49869](https://github.com/vllm-project/vllm/pull/49869) fixes GLM-OCR MTP weight loading by recognizing `model.language_model.layers.*` as a valid MTP prefix.
- **Kimi-K3**: [#53139](https://github.com/vllm-project/vllm/pull/53139) shares flattened DCP decode metadata across generic MLA and Kimi-K3; [#52971](https://github.com/vllm-project/vllm/pull/52971) exports recurrent-state checkpoints during prefill for fine-grained prefix caching in a single FlashKDA pass; [#53053](https://github.com/vllm-project/vllm/pull/53053) extends GEMM-RS to GEMM-AR via `multimem.st`.
- **DeepSeek V4**: [#53040](https://github.com/vllm-project/vllm/pull/53040) fuses replicated FP8 shared experts into DeepGEMM's SM100 MegaMoE kernel, removing a separate shared-expert launch per MoE layer (tracked under [#45861](https://github.com/vllm-project/vllm/issues/45861)).
- **gpt-oss**: [#52209](https://github.com/vllm-project/vllm/pull/52209) adds routed expert loading so RL engines (e.g., verl) can sync experts individually instead of all-gathering during actor-rollout sync.
- **MiniMax-M3 (ROCm)**: [#52849](https://github.com/vllm-project/vllm/pull/52849) enables AITER paged-attention gluon decode for MTP and dense layers, removing the EAGLE3 fallback to native vLLM attention.
- **XPU / Intel GPU**: [#51605](https://github.com/vllm-project/vllm/pull/51605) makes the expert id the fastest-varying grid axis and resizes tiles in the batched Triton MoE kernel.
- **Rust frontend**: [#52946](https://github.com/vllm-project/vllm/pull/52946) adds a Step3p5 tool parser for `<tool_call><function=...>` output, with JSON-schema conversion and arbitrary chunk-boundary tolerance.
- **New models appearing in issue reports** (not necessarily upstream-supported yet): GLM-5.2 ([#52833](https://github.com/vllm-project/vllm/issues/52833)), DeepSeek-V4-Flash-0731 ([#51914](https://github.com/vllm-project/vllm/issues/51914)), Muse-Glimmer-30B ([#51884](https://github.com/vllm-project/vllm/issues/51884)), Qwen3.6-27B-FP8 ([#40756](https://github.com/vllm-project/vllm/issues/40756)).
- **Kernel/hardware proposals**: PTX 9.4 `ldmatrix.s8.s4` in-flight INT4→INT8 expanding loads for W4A8-INT8 paths ([#49529](https://github.com/vllm-project/vllm/issues/49529)); FP8 block-scaled weights currently fail on sm120/RTX 5090 in DeepGEMM ([#51884](https://github.com/vllm-project/vllm/issues/51884)).

## 4. Performance & Optimization

- **Kimi-K3 GEMM-AR** ([#53053](https://github.com/vllm-project/vllm/pull/53053)): replaces unicast stores with `multimem.st`, supports any M value with no padding/copy, and makes flag signaling fully distributed.
- **DeepSeek V4 shared-expert fusion** ([#53040](https://github.com/vllm-project/vllm/pull/53040)): eliminates one kernel launch plus redundant weight reads per MoE layer.
- **Fused RMSNorm + per-token FP8 quant** ([#45428](https://github.com/vllm-project/vllm/pull/45428)): single-global-read fast path reduces three token-row reads from global memory to one.
- **ROCm bpreshuffled blockscaled FP8 GEMM** ([#51692](https://github.com/vllm-project/vllm/pull/51692)): +4–8% QPS on DSv3 TP8+DPA and +0–4% QPS on TP8+EP across 8× MI350.
- **Speculative decoding**: [#50790](https://github.com/vllm-project/vllm/pull/50790) precomputes the draft-to-target index mapping in EAGLE/DFlash models, eliminating per-`compute_logits` recomputation.
- **Open performance issues**: compiled `QuantFP8.forward_native` group quantization still slower than CUDA on H100/RTX 5090 ([#25094](https://github.com/vllm-project/vllm/issues/25094)); Inductor partition regressions on Blackwell, notably TTFT with attention+quant fusion ([#27828](https://github.com/vllm-project/vllm/issues/27828)).

## 5. Stability & Regressions

Ranked by severity:

1. **MTP speculative decoding illegal memory access** ([#40756](https://github.com/vllm-project/vllm/issues/40756), open, 41 comments) — crash on long sequences with Qwen3.6-27B-FP8 and 5 spec tokens. No fix PR yet.
2. **CUDA security: int32 pointer overflow** ([#53131](https://github.com/vllm-project/vllm/pull/53131), PR open) — widens offset arithmetic to int64 to prevent cross-user data disclosure when `num_tokens * stride` exceeds 2^32.
3. **TurboQuant KV cache crash on chunked continuation prefill** ([#41726](https://github.com/vllm-project/vllm/issues/41726), open) — nightly build with PR #39931 crashes after workspace lock on RTX 5080.
4. **Draft-model init crash under TP>1** ([#52023](https://github.com/vllm-project/vllm/issues/52023), open) — TRT-LLM fused allreduce+RMSNorm workspace is sized from the target hidden size, crashing when the draft hidden size is larger.
5. **DeepSeek-V4-Flash DSML tool-call corruption** ([#51914](https://github.com/vllm-project/vllm/issues/51914), open) — intermittent malformed `<｜DSML｜toolcalls>` wrappers on v0.27.1 + DSpark; affects agent tool-call output.
6. **Grammar-illegal drafts with xgrammar** ([#49694](https://github.com/vllm-project/vllm/issues/49694), open) — ngram_gpu spec decode + structured outputs lets the verifier accept illegal tokens under async scheduling, causing "Failed to advance FSM", HTTP 500s, and silent truncation.
7. **Align-mode prefix cache never hits** ([#52897](https://github.com/vllm-project/vllm/issues/52897), open) — 0 / 996k queries hit with `--scheduling-policy priority` on hybrid GDN models post-#51113.
8. **OpenAI `strict` flag leaks into chat template** ([#52741](https://github.com/vllm-project/vllm/issues/52741), open) — `tools[].function.strict` is rendered into the model-visible prompt, changing tool-call behavior.
9. **FP8 block-scaled weights fail on sm120** ([#51884](https://github.com/vllm-project/vllm/issues/51884), open) — DeepGEMM "Unknown SF transformation" during weight loading on RTX 5090.
10. **GLM-5.2 MTP on MI355X (gfx950)** ([#52833](https://github.com/vllm-project/vllm/issues/52833), open) — 0% draft acceptance; disabling expert parallelism triggers `hipErrorIllegalAddress`.
11. **MTP may reduce prefix-cache hit rate** ([#38182](https://github.com/vllm-project/vllm/issues/38182), open) — reported on Qwen3.5-35B-A3B; impacts cost/latency even when not crashing.
12. **Recently closed**: Qwen3 warmup GPU memory leak (~3.4 GiB, [#36973](https://github.com/vllm-project/vllm/issues/36973)); Qwen3 structured-generation capability regression ([#39677](https://github.com/vllm-project/vllm/issues/39677)); GDN mixed decode/spec-decode crash ([#36917](https://github.com/vllm-project/vllm/issues/36917)); ROCm BF16 MLA with AITER FA on gfx950 ([#52312](https://github.com/vllm-project/vllm/issues/52312)); DSv4-Flash Triton `fp8_mqa_logits` exceeding MI325X shared-memory limits ([#41963](https://github.com/vllm-project/vllm/issues/41963)); Mistral3 composite VLM `tie_word_embeddings` mis-resolution ([#51063](https://github.com/vllm-project/vllm/issues/51063)).
13. **Fix PRs in flight**: DFlash2 unquantized linear LM head in the candidate selector ([#52883](https://github.com/vllm-project/vllm/pull/52883), stacked on [#52816](https://github.com/vllm-project/vllm/pull/52816)); GLM-OCR MTP weight-loading fix ([#49869](https://github.com/vllm-project/vllm/pull/49869)).

## 6. What This Means for Application Developers

- **Speculative decoding remains the highest-risk feature.** MTP crashes ([#40756](https://github.com/vllm-project/vllm/issues/40756), [#52833](https://github.com/vllm-project/vllm/issues/52833)) and grammar-illegal draft acceptance ([#49694](https://github.com/vllm-project/vllm/issues/49694)) can take down or corrupt production serving. If you run MTP/DFlash/EAGLE3, pin versions, soak-test long sequences, and consider disabling spec decode on structured-output endpoints.
- **Tool-call output is not yet guaranteed correct.** The DSML corruption on DeepSeek-V4-Flash ([#51914](https://github.com/vllm-project/vllm/issues/51914)) and `strict`-flag leakage into the chat template ([#52741](https://github.com/vllm-project/vllm/issues/52741)) mean server-side schema validation or client-side retry logic is still required for agent workloads.
- **Track the CUDA security fix** ([#53131](https://github.com/vllm-project/vllm/pull/53131)) if you run multi-tenant or high-token-count workloads — it addresses potential cross-user data disclosure from int32 overflow.
- **Nightly users should be cautious.** Two recent regressions — the TurboQuant crash ([#41726](https://github.com/vllm-project/vllm/issues/41726)) and prefix-cache misses ([#52897](https://github.com/vllm-project/vllm/issues/52897)) — are pinned to nightlies and unreleased PRs rather than stable releases.
- **Performance gains are model-concentrated.** The largest wins are landing for DeepSeek V4 ([#53040](https://github.com/vllm-project/vllm/pull/53040)), Kimi-K3 ([#53053](https://github.com/vllm-project/vllm/pull/53053), [#52971](https://github.com/vllm-project/vllm/pull/52971)), and GLM ([#53138](https://github.com/vllm-project/vllm/pull/53138)) on Hopper/Blackwell/ROCm — plan upgrades around those merges if you serve those models.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-08-21

## 1. Today's Highlights

SGLang's busiest front is MoE/hardware enablement: the FlashInfer SM90 MXFP4 W4A8 CUTLASS MoE path ([#34967](https://github.com/sgl-project/sglang/pull/34967)) closes the Hopper gap for NVFP4-class MoE models, while the Weight Cache Daemon roadmap ([#33522](https://github.com/sgl-project/sglang/issues/33522)) reports weight-load time collapsing from ~306–327 s to <1 s on Qwen3-235B FP8. Stability is the counterweight: the NIXL/UCX prefill segfault is reported unfixed on v0.5.17/B200 ([#35189](https://github.com/sgl-project/sglang/issues/35189)), DeepSeek-V4-Flash expert parallelism crashes on SM90 ([#35557](https://github.com/sgl-project/sglang/issues/35557)), and a Qwen3.5-arch regression in 0.5.17 causes token-loop degeneration ([#35723](https://github.com/sgl-project/sglang/issues/35723)).

## 2. Releases & Breaking Changes

- **No releases published in the last 24 hours.**
- **Watch out:** `0.5.17` (PyPI wheel) is implicated in a Qwen3.5-arch NVFP4 token-loop generation regression; `0.5.6.post3.dev9196` is reported working ([#35723](https://github.com/sgl-project/sglang/issues/35723)).
- **In-flight config/API changes** to track: `--same-gpu-replicas N` for same-GPU DP replicas ([#35706](https://github.com/sgl-project/sglang/pull/35706)), token-aware admission cap `--max-inflight-prefill-tokens` ([#34011](https://github.com/sgl-project/sglang/pull/34011)), and `OTEL_SERVICE_NAME` support for custom OTLP service names ([#35730](https://github.com/sgl-project/sglang/pull/35730)).
- **Architecture RFC:** Rust migration of non-GPU SGLang processes, with an active refactor PR ([RFC #23206](https://github.com/sgl-project/sglang/issues/23206), [PR #35239](https://github.com/sgl-project/sglang/pull/35239)).

## 3. New Model & Hardware Support

- **Hopper MXFP4 MoE:** FlashInfer SM90 MXFP4 W4A8 CUTLASS MoE added ([#34967](https://github.com/sgl-project/sglang/pull/34967)); related inactive issue for SM90 NVFP4 W4A8 kernels ([#22459](https://github.com/sgl-project/sglang/issues/22459)) is now effectively superseded.
- **MiniCPM-SALA:** native serving support in progress ([#30360](https://github.com/sgl-project/sglang/pull/30360)).
- **MiniMax-M3:** FlashInfer source-distributed MSA kernel integration for SM100, TP4 top-k 16 ([#35731](https://github.com/sgl-project/sglang/pull/35731)).
- **ROCm 7.14:** release builds for gfx942/gfx950 assembled from pip wheels + Docker ([#35319](https://github.com/sgl-project/sglang/pull/35319)).
- **Ascend NPU:** A5 MXFP8/MXFP4 capability tracking ([#34559](https://github.com/sgl-project/sglang/issues/34559)) plus a cross-generation device adaptation RFC ([#35709](https://github.com/sgl-project/sglang/issues/35709)).
- **Moore Threads (MUSA) GPU:** first-class support roadmap, 12 👍 ([#16565](https://github.com/sgl-project/sglang/issues/16565)); CI hardening landed ([#35610](https://github.com/sgl-project/sglang/pull/35610)).
- **Same-GPU replicas:** Phase 1 `--same-gpu-replicas` with optional managed CUDA MPS and shared KV pool, targeting two Qwen3-0.6B replicas per GPU ([PR #35706](https://github.com/sgl-project/sglang/pull/35706), [RFC #35648](https://github.com/sgl-project/sglang/issues/35648)).
- **Diffusion:** SANA-Video breakable CUDA graphs ([#35729](https://github.com/sgl-project/sglang/pull/35729)); out-of-tree model/pipeline registration via `register_pipeline` ([#35713](https://github.com/sgl-project/sglang/pull/35713)).
- **AITER tracking:** version readiness tracker for ROCm/AITER kernel dependencies ([#21302](https://github.com/sgl-project/sglang/issues/21302)).

## 4. Performance & Optimization

- **Fast engine recovery:** Weight Cache Daemon Phase 1 serves post-quantized weights over CUDA IPC, cutting weight load from ~306–327 s to **<1 s** on Qwen3-235B FP8 ([#33522](https://github.com/sgl-project/sglang/issues/33522)).
- **Qwen3.5 hybrid quantization:** prefill norm/act quantization fusion for NVFP4 W4A4 hybrid models (SiLU, post-LN, gated-norm coverage) ([#34934](https://github.com/sgl-project/sglang/pull/34934)).
- **Admission control:** token-aware `--max-inflight-prefill-tokens` to shed long-context bursts before prefill OOM, replacing pure count-based limits ([#34011](https://github.com/sgl-project/sglang/pull/34011)).
- **Radix cache correctness:** speculative overshoot (measured 0–7 tokens with DSpark `block_size=7`) removed from the radix cache key ([#35694](https://github.com/sgl-project/sglang/pull/35694)).
- **Diffusion offload:** offloaded weights kept on checkpoint mapping to avoid duplicate 61.73 GiB host copies for MiniMax-H3 DiT ([#35701](https://github.com/sgl-project/sglang/pull/35701)).
- **Rust server refactor** for non-GPU processes continues, reducing Python-side overhead in scheduler/tokenizer paths ([#35239](https://github.com/sgl-project/sglang/pull/35239)).

## 5. Stability & Regressions

High severity:

1. **NIXL/UCX prefill segfault unfixed** — reproduces on v0.5.17 / CUDA 13.0 / B200; prior reports [#23489](https://github.com/sgl-project/sglang/issues/23489)/[#23499](https://github.com/sgl-project/sglang/issues/23499) were closed without a root cause ([#35189](https://github.com/sgl-project/sglang/issues/35189)).
2. **DeepSeek-V4-Flash EP crash on Hopper/SM90** — stock MXFP4 model with `--enable-expert-parallel` fails at decode CUDA-graph capture; DeepGEMM MXFP4 MegaMoE is SM100-only and the error is misleading ([#35557](https://github.com/sgl-project/sglang/issues/35557)).
3. **Qwen3.5-arch generation degenerates into token loops** on 0.5.17 (NVFP4 + DFlash2 draft, single 80 GB GPU); working on 0.5.6.dev ([#35723](https://github.com/sgl-project/sglang/issues/35723)).
4. **PrefillDelayer feedback loop** — persistent mixed-state collapse of prefill progress under DP attention + chunked prefill ([#35241](https://github.com/sgl-project/sglang/issues/35241)).
5. **EAGLE + DP attention + PD disaggregation deadlock** during warmup on GLM-5.2 with `index_share_for_mtp_iteration` ([#32527](https://github.com/sgl-project/sglang/issues/32527)).

Medium severity:

6. **PP8 disaggregated prefill has a load-independent ~30 s TTFT floor** on Kimi-K3 ([#34815](https://github.com/sgl-project/sglang/issues/34815)).
7. **XPU Qwen3.5 GDN + speculative decode:** `causal_conv1d_update_xpu()` unexpected keyword argument `intermediate_conv_window` ([#34720](https://github.com/sgl-project/sglang/issues/34720)).
8. **deepseekv32/v4 tool-call parsers drop calls** when streamed output splits into two chunks ([#35563](https://github.com/sgl-project/sglang/issues/35563)).
9. **Chunked-prefill cancellation leaks one visible token** and leaves negative scheduler output ids ([#34112](https://github.com/sgl-project/sglang/issues/34112)).
10. **`move_logprobs_to_cpu` AttributeError:** `'list' object has no attribute 'tolist'` ([#35705](https://github.com/sgl-project/sglang/issues/35705)).

Lower severity / config:

11. **`sharded_state` cannot save/load an MLA model** ([#35702](https://github.com/sgl-project/sglang/issues/35702)).
12. **Anthropic endpoint HTTP 500** when `tool_reference` parts appear inside `tool_result` for templates without deferred-reference support ([#35692](https://github.com/sgl-project/sglang/issues/35692)).
13. **ROCm images pin AITER below the FlyDSL MXFP4 MoE kernels**, breaking tuned `AITER_CONFIG_FMOE` tables on gfx950 ([#35591](https://github.com/sgl-project/sglang/issues/35591)).

Fixes in flight: PD transfer now skips empty linear-attention state buffers ([#35689](https://github.com/sgl-project/sglang/pull/35689)); LLaVA image fetch removed from CPU-preprocess timeout budget ([#35700](https://github.com/sgl-project/sglang/pull/35700)); CUDA IPC JIT TVM FFI tuple fix for NVCC 12.8 ([#35733](https://github.com/sgl-project/sglang/pull/35733)); persistent-kernel shared-memory fallback with cached fallback configs ([#35732](https://github.com/sgl-project/sglang/pull/35732)); DFlash/DSpark commits routed through ReplaySSM spec fold for GDN ([#35725](https://github.com/sgl-project/sglang/pull/35725)). CI state per tracker: 3 broken, 11 flaky, 670 recently fixed ([#17050](https://github.com/sgl-project/sglang/issues/17050)).

## 6. What This Means for Application Developers

- **Pin SGLang if you serve Qwen3.5-arch NVFP4 models:** 0.5.17 shows token-loop degeneration; stay on 0.5.6.dev until a fix lands ([#35723](https://github.com/sgl-project/sglang/issues/35723)).
- **Blackwell + UCX:** the NIXL/UCX prefill segfault is still open on CUDA 13.0/B200 — validate your UCX path, and budget for a workaround if you hit it ([#35189](https://github.com/sgl-project/sglang/issues/35189)).
- **Tool-calling agents are exposed to two parser bugs:** DeepSeek-v32/v4 streamed tool calls can be dropped across chunk boundaries ([#35563](https://github.com/sgl-project/sglang/issues/35563)), and Anthropic-compatible `tool_reference` blocks 500 without deferred-reference chat templates ([#35692](https://github.com/sgl-project/sglang/issues/35692)).
- **Hopper NVFP4 MoE is now viable:** the FlashInfer SM90 MXFP4 W4A8 path ([#34967](https://github.com/sgl-project/sglang/pull/34967)) is the intended replacement for the closed SM90 NVFP4 kernel request ([#22459](https://github.com/sgl-project/sglang/issues/22459)).
- **Cold-start relief is on the way:** the Weight Cache Daemon cuts multi-hundred-second weight loads to <1 s for large FP8 models ([#33522](https://github.com/sgl-project/sglang/issues/33522)).
- **Long-context traffic management:** the future admission knob is token-aware, not count-based — plan for `--max-inflight-prefill-tokens` once merged ([#34011](https://github.com/sgl-project/sglang/pull/34011)).
- **Small-model economics:** same-GPU multi-replica DP with CUDA MPS and shared KV pool is explicitly targeting 0.6B-class models on one GPU ([#35706](https://github.com/sgl-project/sglang/pull/35706)).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-08-21

## 1. Today's Highlights

Six releases landed in the last 24 hours (b10505–b10516), headlined by conversion/support for IBM GraniteSWA and GraniteMoeSWA architectures (#25505), a new `ggml_rope_set_offset` op with CPU/Metal/CUDA kernels (#27120), and a new `dedup-cache-models` server preset (#27346). On the stability front, the tracker shows a cluster of speculative-decoding (MTP) regressions and a critical HIP bug — bisected to `c7d87229` — where `llama-server` returns one request's response verbatim to another under `-np 4 --kv-unified`, plus an infinite `"/"` token loop in agent mode from the same commit.

## 2. Releases & Breaking Changes

No breaking config/API changes observed; all releases are incremental.

- **b10516** — [vulkan: add null checks in `ggml_vk_queue_command_pools_cleanup` (#27353)](https://github.com/ggml-org/llama.cpp/pull/27353). Guards against null queue pointers during Vulkan queue pool cleanup.
- **b10514** — [GraniteSWAForCausalLM / GraniteMoeSWAForCausalLM (#25505)](https://github.com/ggml-org/llama.cpp/pull/25505). Adds conversion scripts and architecture support (see §3).
- **b10509** — [ggml: add `ggml_rope_set_offset` + metal support (#27120)](https://github.com/ggml-org/llama.cpp/pull/27120). New op with CPU and Metal kernels; CUDA support via [#27121](https://github.com/ggml-org/llama.cpp/pull/27121), other backends gated.
- **b10507** — [mtmd: add `mtmd_bitmap_set_mergeable` (#27348)](https://github.com/ggml-org/llama.cpp/pull/27348).
- **b10506** — [metal: dequantize q8_0 using packed types (#27370)](https://github.com/ggml-org/llama.cpp/pull/27370).
- **b10505** — [server: add `dedup-cache-models` preset option (#27346)](https://github.com/ggml-org/llama.cpp/pull/27346). New server preset for deduplicating models in the cache.

Downloads: [macOS arm64 b10507](https://github.com/ggml-org/llama.cpp/releases/download/b10507/llama-b10507-bin-macos-arm64.tar.gz) (and arm64+KleidiAI variants on each release page). Full binary set for b10516 was not yet published at digest time.

## 3. New Model & Hardware Support

- **GraniteSWA / GraniteMoeSWA** — [PR #25505](https://github.com/ggml-org/llama.cpp/pull/25505) adds conversion and inference support for IBM's sliding-window-attention Granite family (incl. MoE variant, used for Bob/OpenCode + Qwen3.6-35B).
- **DFlash2 speculator** — [PR #27342](https://github.com/ggml-org/llama.cpp/pull/27342) adds a new draft-model architecture with grouped dynamic depthwise convolution + candidate selector, on top of the existing DFlash support.
- **`ggml_rope_set_offset`** — [PR #27120](https://github.com/ggml-org/llama.cpp/pull/27120) / [#27121](https://github.com/ggml-org/llama.cpp/pull/27121): new ggml op landed in CPU, Metal and CUDA backends; other backends gated until implemented.
- **`--mmproj-device`** — [PR #23255](https://github.com/ggml-org/llama.cpp/pull/23255) (closed/merged) lets multimodal projector (mmproj) be offloaded to a different backend/device than the main model — useful for offloading vision encoder to iGPU. Works in `preset.ini` too.
- **lfm2 / lfm2moe tensor split** — [PR #26993](https://github.com/ggml-org/llama.cpp/pull/26993, merge-ready) enables `--split-mode tensor`; NMSE ~1e-14 on test-llama-archs.
- **Multi-node RPC `-sm tensor`** — [PR #26610](https://github.com/ggml-org/llama.cpp/pull/26610) (2x DGX Spark via RDMA) and [DeepSeek 4 tensor split PR #26490](https://github.com/ggml-org/llama.cpp/pull/26490), both in progress.

## 4. Performance & Optimization

Landed:

- **Metal q8_0 dequant via packed types** — [b10506 / #27370](https://github.com/ggml-org/llama.cpp/pull/27370).

In progress (with numbers):

- **SYCL TILE kernel for quantized KV decode** — [PR #26689](https://github.com/ggml-org/llama.cpp/pull/26689, merge-ready): gating TILE instead of VEC on Battlemage gives **+42% to +169%** decode on Qwen3.6-35B, Gemma 4 26B/12B at 32K and 118K context, zero regressions.
- **AVX2 IQ-model prompt processing** — [PR #27402](https://github.com/ggml-org/llama.cpp/pull/27402): targets the 512-token batch case where every weight is decoded repeatedly (imatrix/perplexity workloads).
- **Vulkan IQ3_S mat-vec for batch > 4** — [PR #27449](https://github.com/ggml-org/llama.cpp/pull/27449): fixes shader register spill (442 regs → 17 KB scratch/wave) that made large-batch IQ3_S **~9× slower** than `NUM_COLS=4`; triggered by DFlash2 speculation.
- **Metal chunked SSD MMA for Mamba-2** — [PR #26647](https://github.com/ggml-org/llama.cpp/pull/26647): parallel simdgroup matmuls over 64-token chunks instead of sequential per-token path.
- **Adaptive MTP draft depth** — [PR #27210](https://github.com/ggml-org/llama.cpp/pull/27210): new `--spec-type draft-mtp-adaptive` with counting-based state machine (climb counter + weighted drop accumulator); suggested `--spec-draft-n-max 12`.

## 5. Stability & Regressions

Ranked by severity. Note that #25992 and #26209 bisect to the **same commit (`c7d87229`)**, suggesting a common root cause.

1. **Cross-request response contamination on HIP** — [Issue #25992](https://github.com/ggml-org/llama.cpp/issues/25992): with `-np 4 --kv-unified` on Strix Halo (gfx1151), a request receives another request's complete response verbatim. Blatant data leak between concurrent sessions; bisected to `c7d87229`. No fix PR yet. **Highest severity.**
2. **Infinite `"/"` tokens in agent mode (HIP)** — [Issue #26209](https://github.com/ggml-org/llama.cpp/issues/26209): regression after the same `c7d8722` on AMD MAX+ 395 (gfx1151). Likely same family as above.
3. **Speculative decoding divergence on quantized targets** — [Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618): greedy (`temp=0`) output with draft-mtp/draft-dspark diverges from vanilla on Q4_K_M targets but matches on bf16 — indicates a quantization-path bug in draft verification. Ngram speculation unaffected.
4. **MTP performance regression since b9935** — [Issue #25489](https://github.com/ggml-org/llama.cpp/issues/25489): throughput drop on Windows with Qwen3.6-35B-A3B-MTP; open, unresolved.
5. **SM_60 quality loss (P100)** — [Issue #25593](https://github.com/ggml-org/llama.cpp/issues/25593): FP32 math silently executed in FP16 on sm_60; fixes merged in two forks but not upstream.
6. **CUDA `cublasCreate_v2` resource failure** — [Issue #25304](https://github.com/ggml-org/llama.cpp/issues/25304): server loads model but crashes on first inference; regression between b9553 and b9870 on Fedora.
7. **Concurrent-client garbled output (CPU, `-np > 1`)** — [Issue #26031](https://github.com/ggml-org/llama.cpp/issues/26031): Qwen3.6-35B-A3B-Q8_0; first broken at b9922, b9918 is OK.
8. **HIP MTP over-reserves compute buffer** — [Issue #26038](https://github.com/ggml-org/llama.cpp/issues/26038): fitted context size unnecessarily reduced on RX 6800.
9. **Vulkan device-lost at ~50K context** — [Issue #26447](https://github.com/ggml-org/llama.cpp/issues/26447): Vega 8 iGPU, `vk::Queue::submit: ErrorDeviceLost`; OOM-adjacent.
10. **Blackwell SOFT_MAX crash** — [Issue #25060](https://github.com/ggml-org/llama.cpp/issues/25060): CUDA softmax path crashes on RTX 5090 (SM 12.0).
11. **GLM-5.2 multi-node RPC crash** — [Issue #26583](https://github.com/ggml-org/llama.cpp/issues/26583): `invalid data ptr` on worker, `ggml_backend_rpc_buffer_get_tensor` abort on orchestrator.
12. **SYCL pinned-memory CPU spin** — [Issue #27038](https://github.com/ggml-org/llama.cpp/issues/27038): high CPU utilization from full-size allocation in new host-pinned-mem support.

Fix PRs in flight:

- [PR #27405](https://github.com/ggml-org/llama.cpp/pull/27405): pin host state buffer during multi-GPU state restore (ROCm async H2D fault, 2+ devices).
- [PR #27446](https://github.com/ggml-org/llama.cpp/pull/27446): Vulkan fallback to host-visible buffer on `VK_ERROR_OUT_OF_DEVICE_MEMORY` instead of aborting.
- [PR #27358](https://github.com/ggml-org/llama.cpp/pull/27358): fix potential `strncpy` issue (motivated by Linux 7.2 dropping `strncpy`), closed.

## 6. What This Means for Application Developers

- **If you serve concurrent requests on AMD HIP (Strix Halo / gfx1151)**: verify your build does not contain `c7d87229` — two active issues trace multi-request response contamination and agent-mode infinite loops to it. This is production-blocking for any multi-user or agentic workload. Pin to an earlier known-good build until a fix lands.
- **Speculative decoding (MTP/DFlash) on quantized models**: greedy outputs can diverge from non-speculative runs on Q4_K_M. If exact determinism matters, validate draft-spec runs against vanilla, or use bf16 targets. Also monitor for the b9935 MTP throughput regression on Windows.
- **Vulkan on AMD iGPUs**: large-context runs (~50K+) remain at risk of device-lost; PR #27446 (host-visible fallback) will soften OOM aborts but expect a perf hit when it kicks in. For mmproj-heavy multimodal apps, the new `--mmproj-device` lets you push the vision encoder to iGPU and keep the LLM on dGPU.
- **New server preset `dedup-cache-models`** (b10505) is worth evaluating if you host many model variants — it changes cache keying for model dedup and may reduce memory footprint in multi-model gateways.
- **GraniteSWA/MoeSWA** users can now convert and run these architectures natively; watch for follow-up tuning of the SWA kernels on Metal/CUDA.
- **Tensor-split across nodes** continues to mature (RPC `-sm tensor`, lfm2/lfm2moe, DeepSeek 4). If you run multi-node inference, the GLM-5.2 RPC crash (#26583) is a reminder that this path is still bleeding-edge — test before production rollout.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-21

## Today's Highlights

- Ollama `v0.32.15` shipped with a model metadata cache intended to cut per-request overhead on common serving paths.
- The most serious signals today are correctness regressions on ROCm/Strix Halo and silent all-zero embedding vectors under load — both can corrupt application behavior without erroring.
- Several targeted fix PRs landed or opened around streaming parser wedges, CORS `OPTIONS` handling, qwen3.8 truncation, and gemma4 tool-call parsing.

## Releases & Breaking Changes

- **v0.32.15**: Adds a model metadata cache to reduce Ollama’s per-request overhead. No explicit breaking changes or migration notes in the release notes.  
  [Release notes](https://github.com/ollama/ollama/compare/v0.32.14...v0.32.15-rc1)

## New Model & Hardware Support

- No new model architectures or official hardware backends were announced in this release.
- **MLX Qwen3.5 vision support** appears to have landed via [PR #14968](https://github.com/ollama/ollama/pull/14968) (closed).
- Open requests include **Upstage Solar Pro 4** ([#17773](https://github.com/ollama/ollama/issues/17773)), **Qwen3.8 on Ollama Cloud** ([#17720](https://github.com/ollama/ollama/issues/17720)), and an official **Q3_K_M MLX quantization for Qwen3.8-35B-A3B** ([#17869](https://github.com/ollama/ollama/issues/17869)).

## Performance & Optimization

- **v0.32.15** reduces request-path overhead with a model metadata cache.  
  [Release notes](https://github.com/ollama/ollama/compare/v0.32.14...v0.32.15-rc1)
- **MLX prefill regression**: `#17884` reports MLX prompt-processing throughput dropping ~3x in v0.32.14, then largely restored in the v0.32.15 pre-release. GGUF was unaffected.  
  [Issue #17884](https://github.com/ollama/ollama/issues/17884)
- **MLX lacks prompt/prefix caching**: multi-step agent sessions re-prefill the full prompt (20–30K tokens) every request on the MLX engine, hurting TTFT.  
  [Issue #17829](https://github.com/ollama/ollama/issues/17829)
- **Benchmarking**: `#17480` switches speculative-draft benchmarks to packed HumanEval Python prompts to better reflect code-like continuations.  
  [PR #17480](https://github.com/ollama/ollama/pull/17480)

## Stability & Regressions

Ranked by likely impact:

### Critical — silent correctness failures
- **ROCm KV-state bleed on Strix Halo (gfx1151)**: responses are contaminated by the previous request’s content.  
  [Issue #17847](https://github.com/ollama/ollama/issues/17847)
- **ROCm wrong outputs for prompts >4K tokens on gfx1151**: Vulkan and CPU are correct on the same machine.  
  [Issue #17895](https://github.com/ollama/ollama/issues/17895)
- **Embeddings return all-zero vectors under sustained load**: HTTP 200 with correct dimensions and plausible token counts, but the vectors are zeros. No log distinction.  
  [Issue #17878](https://github.com/ollama/ollama/issues/17878)

### High — agent loops and hangs
- **Cloud deepseek-v4-flash loop**: a leaked literal `</think>` in assistant history caused 193 identical tool-call responses (~31M tokens).  
  [Issue #17617](https://github.com/ollama/ollama/issues/17617)
- **Cloud deepseek-v4-flash:0731 thinking loop**: same reasoning block repeated 221 times with zero usable output.  
  [Issue #17892](https://github.com/ollama/ollama/issues/17892)
- **qwen3.8 tool-call parse failure then permanent hang**: after a 500 parse error, retrying the same request hangs indefinitely until runner recycle. A fix for mid-stream parser wedges landed in [PR #17883](https://github.com/ollama/ollama/pull/17883).

### Medium — regressions and resource leaks
- **Vulkan timeout on gfx1151 long-prompt prefill**: amdgpu compute-ring watchdog reset, surfaced as `ErrorDeviceLost`; `num_batch=128` is a workaround.  
  [Issue #17870](https://github.com/ollama/ollama/issues/17870)
- **MLX KV-cache memory grows per-request** on dense models and only releases on restart. Reported closed.  
  [Issue #17875](https://github.com/ollama/ollama/issues/17875)
- **qwen3.6 `think: false` + `format: "json"` regression**: returns serialized reasoning like `{"thought": ...}` instead of the requested schema.  
  [Issue #17871](https://github.com/ollama/ollama/issues/17871)
- **CORS regression**: `OPTIONS` preflight to `/api/generate` returns 405 in recent versions; fix PR open.  
  [Issue #17887](https://github.com/ollama/ollama/issues/17887) · [PR #17890](https://github.com/ollama/ollama/pull/17890)
- **gemma4 tool-call parsing fails with `key=value`** instead of canonical `key:value`; parser now accepts both.  
  [Issue #17882](https://github.com/ollama/ollama/issues/17882) · [PR #17888](https://github.com/ollama/ollama/pull/17888)
- **qwen3.8 truncation can drop the user message** in long multi-step tool loops, producing `500: no user query found in messages`; PR preserves the latest user message.  
  [PR #17894](https://github.com/ollama/ollama/pull/17894)
- **Streaming routes can leak goroutines on client disconnect**; mitigation PR open.  
  [PR #17881](https://github.com/ollama/ollama/pull/17881)

## What This Means for Application Developers

- **Prefer v0.32.15** for lower per-request overhead, and test MLX workloads against the 0.32.15 pre-release if you saw the prefill slowdown in 0.32.14.
- **On AMD Strix Halo / gfx1151, avoid the ROCm backend for correctness-sensitive work** until the KV bleed and long-prompt issues are fixed; Vulkan/CPU were correct in the same reproduction.
- **Embedding consumers should validate vector norms** — all-zero embeddings under sustained load are silent and cannot be detected from HTTP status or token usage.
- **Agent builders should add watchdog limits around cloud deepseek models**: repeated identical thinking blocks or leaked `</think>` markers can turn into unbounded token burn loops.
- **Tool-call integrations need retry/timeout hardening**: the qwen3.8 parse-then-hang case and gemma4 `=` separator issue show that malformed model output can still wedge or empty tool calls despite HTTP-level success/failure.
- For web app deployments, the CORS `OPTIONS` 405 regression is not fixed in a release yet; track [PR #17890](https://github.com/ollama/ollama/pull/17890) if you rely on browser `fetch()` to Ollama endpoints.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-08-21

## Today's Highlights
No releases landed in the last 24h, but important gateway-security and spend-governance work is moving. A breaking-change PR ([#37555](https://github.com/BerriAI/litellm/pull/37555)) redefines shadow-eval budgets from turn counts to dollar spend, while a new issue ([#36898](https://github.com/BerriAI/litellm/issues/36898)) shows `GET /health` leaking `extra_headers` and `aws_session_token` in plaintext. The most active bug thread remains stale spend causing false `BudgetExceededError`s for virtual keys ([#27735](https://github.com/BerriAI/litellm/issues/27735)).

## Releases & Breaking Changes
None in the last 24h. Note the in-review breaking change in [#37555](https://github.com/BerriAI/litellm/pull/37555): shadow-eval per-key budgets are now gated on dollar spend instead of max turns.

## New Model & Hardware Support
- **Parallel AI provider** ([#36704](https://github.com/BerriAI/litellm/pull/36704)): adds chat + Responses LLM support through the gateway, with full v1 search params (`after_date`, `fetch_policy`, `location`).
- **Anthropic 1M context beta** ([#31611](https://github.com/BerriAI/litellm/pull/31611)): auto-injects `context-1m` beta header for models using the `[1m]` suffix.
- **Bedrock AgentCore Web Search** ([#31819](https://github.com/BerriAI/litellm/issues/31819)): closed feature request proposing `bedrock_agentcore` as a native search provider; no PR yet.

## Performance & Optimization
- **SSE fragment accumulation** ([#36610](https://github.com/BerriAI/litellm/pull/36610)): introduces a shared `JSONFragmentAccumulator` for Vertex and Anthropic streaming, eliminating O(n²) buffer copies and adding parse-deferral to avoid wedging on concatenated JSON envelopes.
- **Prompt-cache routing TTL** ([#28427](https://github.com/BerriAI/litellm/issues/28427)): router affinity TTL for prompt caching is hardcoded to 5 minutes, which breaks correct routing for 1-hour ephemeral caches — still open.
- **Cache accounting fix** ([#36091](https://github.com/BerriAI/litellm/issues/36091)): closed issue for the Anthropic `/v1/messages` bridge not propagating `cache_read_input_tokens` from OpenAI Responses-API upstreams.

## Stability & Regressions
Ranked by severity:

1. **`/health` leaks credentials** ([#36898](https://github.com/BerriAI/litellm/issues/36898)) — `GET /health` returns `extra_headers` and `aws_session_token` in plaintext. No fix PR yet; avoid exposing the endpoint.
2. **False budget-exceeded errors** ([#27735](https://github.com/BerriAI/litellm/issues/27735)) — virtual key requests fail with `BudgetExceededError` while `/key/info` shows spend below budget; stale spend state suspected.
3. **MCP auto-execute hijacks agent tools** ([#37031](https://github.com/BerriAI/litellm/issues/37031)) — `require_approval: "never"` causes server-side MCP auto-execution to break client-sent tools from Claude Code, resulting in "Error executing tool" for all non-MCP tools.
4. **Rate limiter double-counts team per-model limits** ([#34140](https://github.com/BerriAI/litellm/issues/34140)) — `model_per_team` limits via `/team/update` are enforced at half the configured RPM/TPM.
5. **Provider budget reset broken without Redis** ([#37261](https://github.com/BerriAI/litellm/issues/37261)) — `provider_budget_config` reports `budget_reset_at` ~57 years in the future when Redis is absent.
6. **Proxy startup failure after uv update** ([#36922](https://github.com/BerriAI/litellm/issues/36922)) — upgrading to v1.96.2 via `uv tool update litellm["proxy"]` breaks startup due to FastAPI `get_flat_dependant` incompatibility.
7. **Cost-map warnings after image upgrade** ([#32484](https://github.com/BerriAI/litellm/issues/32484)) — Docker 1.90.0 logs unresolved-cost messages for models that were fine on 1.85.3.
8. **Search router drops provider `litellm_params`** ([#37538](https://github.com/BerriAI/litellm/issues/37538)) — provider-specific keys (e.g. `tool_name`) in YAML `search_tools` entries are silently ignored.

Fix PRs in transit:
- **#37639** — Responses bridge now maps incomplete responses to `finish_reason: length` instead of 500.
- **#37640** — `/health/readiness` honors `allow_requests_on_db_unavailable: true` and adds a bounded DB check.
- **#37644** — MCP OAuth tokens can target a custom upstream header instead of hardcoded `Authorization`.
- **#37645** — loads team `model_aliases` on the JWT user-direct auth path.

## What This Means for Application Developers
- **Shield `/health` or avoid it** — the plaintext credential leak ([#36898](https://github.com/BerriAI/litellm/issues/36898)) will affect any LB or monitoring integration until fixed.
- **Virtual-key budgets may reject valid traffic** — if you see `BudgetExceededError` while `/key/info` shows headroom, track [#27735](https://github.com/BerriAI/litellm/issues/27735).
- **Do not use MCP `require_approval: "never"` in front of agentic clients** like Claude Code or Codex until [#37031](https://github.com/BerriAI/litellm/issues/37031) is resolved.
- **Recheck team per-model rate limits** — the v3 limiter is enforcing half the configured value ([#34140](https://github.com/BerriAI/litellm/issues/34140)).
- **Prompt-cache routing won't match long-lived caches yet** — the 5-minute affinity window ([#28427](https://github.com/BerriAI/litellm/issues/28427)) limits hit rates for 1-hour cache TTLs.
- **Watch for incoming capabilities**: tag-scoped rate limits ([#36541](https://github.com/BerriAI/litellm/pull/36541)), shadow-eval dollar budgets ([#37555](https://github.com/BerriAI/litellm/pull/37555)), and OAuth/PKCE CLI login ([#37626](https://github.com/BerriAI/litellm/pull/37626)) are all open PRs worth tracking.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## Unsloth Digest — 2026-08-21

### Today's Highlights
- **v0.1.801-beta** shipped with experimental **Rolling Context + Auto Compaction** and **Remote/LAN Access (Preview)**, merging 200+ PRs — the largest single release in the dataset.
- A dense Studio reliability burst from `danielhanchen` landed ~12 PRs: KV-cache-aware admission, tool-result window sizing, accurate stream error propagation, and compaction fixes.
- Two open regressions stand out: **Qwen3.8-27B makes a MacBook M3 visually glitch/“look like it is dying”** ([#9279](https://github.com/unslothai/unsloth/issues/9279)) and a **ROCm Strix Halo performance regression** in prebuilt `b10079` ([#7371](https://github.com/unslothai/unsloth/issues/7371)).

---

### Releases & Breaking Changes
- **[v0.1.801-beta](https://github.com/unslothai/unsloth/releases)**: Auto compaction (preview) for chats beyond context limits; Remote & LAN Access (preview); 200+ PRs merged. No explicit breaking changes or migration notes listed.
- **Security-scanner regression in 0.1.800-beta**: falsely blocked *all* fine-tuning models with “Custom code blocked / CRITICAL” ([#9239](https://github.com/unslothai/unsloth/issues/9239)) — closed as of this digest; verify before upgrading production desktop installs past 0.1.800-beta.

---

### New Model & Hardware Support
- **Qwen3.8-27B** credited in the release notes as newly supported — but see the macOS instability report below ([#9279](https://github.com/unslothai/unsloth/issues/9279)).
- **NVFP4 quantization fails to load on RTX 5060 Ti 16 GB** (Blackwell, `sm_120`) — open ([#8246](https://github.com/unslothai/unsloth/issues/8246)).
- **MLX backend**: Train/Export falsely greyed out at startup — root-caused as a first-import thread race, not a broken install; closed ([#9120](https://github.com/unslothai/unsloth/issues/9120)).
- **Ling 3.0 support** requested for Studio ([#8532](https://github.com/unslothai/unsloth/issues/8532)); packaging requests for **Homebrew Cask** ([#5156](https://github.com/unslothai/unsloth/issues/5156)) and **Flatpak** ([#4380](https://github.com/unslothai/unsloth/issues/4380)) remain open.

---

### Performance & Optimization
- **KV-cache-aware admission** ([#9392](https://github.com/unslothai/unsloth/pull/9392), merged): two concurrent generations previously killed each other with `Context size has been exceeded`; admission now counts the KV cache, not just slot count.
- **Tool-result sizing** ([#9384](https://github.com/unslothai/unsloth/pull/9384), merged): large `web_search` results are truncated to the model’s actual window. Follow-up [#9421](https://github.com/unslothai/unsloth/pull/9421) (open) measures dense (non-ASCII) tool results exactly instead of estimating and never raises a user-configured cap.
- **UI performance**: sidebar drag was restyling the entire document twice per animation frame; scoped behind `PANEL_RESIZE_SCOPED_VARS_ENABLED` (default off) ([#9400](https://github.com/unslothai/unsloth/pull/9400)). Streamdown code-block rendering optimization unblocked ([#9047](https://github.com/unslothai/unsloth/pull/9047)).
- **Regression (open)**: ROCm Strix Halo (Radeon 8060S) prebuilt perf regression since `b10079` ([#7371](https://github.com/unslothai/unsloth/issues/7371)).
- **User-reported**: exceeding VRAM silently falls back to system RAM, dropping from ~50 tps to ~0.2 tps; user wants a hard “no RAM” option — closed without a user-facing control ([#9343](https://github.com/unslothai/unsloth/issues/9343)).

---

### Stability & Regressions
1. **HIGH — Qwen3.8-27B destabilizes macOS (open)**: on an M3 Pro 24 GB the GUI flickers, other apps/icon bar flicker, “looks like the Macbook is dying”; LM Studio loads the same quants fine ([#9279](https://github.com/unslothai/unsloth/issues/9279)).
2. **HIGH — 0.1.800-beta security scanner blocked every model**: false-positive “Custom code blocked / CRITICAL” on macOS; closed, presumed fixed in 0.1.801-beta ([#9239](https://github.com/unslothai/unsloth/issues/9239)).
3. **MEDIUM — Codex agent 88% failure rate**: `connection (codex, stable)` failed 8 of 9 runs (siblings at 0%); root cause was Codex cancelling its own first turn while the server still read the prompt — fixed in [#9403](https://github.com/unslothai/unsloth/pull/9403), merged.
4. **MEDIUM — Compaction drops context on short prompts**: `carried_forward_chars: 0` on every compaction; reset logic dropped the task — fixed in [#9379](https://github.com/unslothai/unsloth/pull/9379), merged.
5. **MEDIUM — ROCm Strix Halo perf regression (open)** ([#7371](https://github.com/unslothai/unsloth/issues/7371)).
6. **LOW/MEDIUM — macOS text-encoding errors** in the desktop app (open, [#8594](https://github.com/unslothai/unsloth/issues/8594)); **`-H 0.0.0.0` binds/serves the wrong IP on macOS** — security-relevant, open ([#8868](https://github.com/unslothai/unsloth/issues/8868)); first-launch lock failure closed ([#9140](https://github.com/unslothai/unsloth/issues/9140)).
7. **Other merged PR fixes this cycle**: admission-queue deadlock when a cancelled waiter blocked the line ([#9415](https://github.com/unslothai/unsloth/pull/9415)); stream errors now surface the server’s actual cause ([#9390](https://github.com/unslothai/unsloth/pull/9390)); clearer context-overflow message naming the offending part of the prompt ([#9413](https://github.com/unslothai/unsloth/pull/9413)); `--swa-checkpoints` fallback for older llama-server builds ([#9416](https://github.com/unslothai/unsloth/pull/9416)); SSM kernel install keepalive + worker reap on timeout ([#9419](https://github.com/unslothai/unsloth/pull/9419)); Max Tokens replies now finish automatically instead of asking the user ([#9382](https://github.com/unslothai/unsloth/pull/9382)).

---

### What This Means for Application Developers
- **Concurrent sessions are now safer**: KV-budget admission ([#9392](https://github.com/unslothai/unsloth/pull/9392)) plus accurate mid-stream error reporting ([#9390](https://github.com/unslothai/unsloth/pull/9390)) means multi-tenant chat on one server fails loudly with the real cause instead of killing both clients.
- **Watch RAM fallback**: if you drive the server near context limits, expect VRAM overcommit to degrade to (~0.2 tps) system-RAM mode with no per-request opt-out ([#9343](https://github.com/unslothai/unsloth/issues/9343)) — cap tokens conservatively in your client.
- **Tool-calling agents**: tool results are now window-sized automatically ([#9384](https://github.com/unslothai/unsloth/pull/9384), [#9421](https://github.com/unslothai/unsloth/pull/9421)), but external API tool-call validation still fails against Nemotron ([#9338](https://github.com/unslothai/unsloth/issues/9338)) and custom endpoints ([#9039](https://github.com/unslothai/unsloth/issues/9039)) — pin OpenAI-compatible endpoints that validate JSON arguments strictly.
- **Quant selection via API**: `GET /models` does not expose GGUF quant variants, so you cannot select Q8 vs Q4_K_M programmatically ([#9340](https://github.com/unslothai/unsloth/issues/9340)) — work around it by naming the quant in the model path.
- **Auto compaction is experimental**: early telemetry shows `carried_forward_chars` can be 0 on legitimate compactions ([#9379](https://github.com/unslothai/unsloth/pull/9379)); verify summarization fidelity before trusting it for long-running agent memory.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/Liderhu/agents-radar).*