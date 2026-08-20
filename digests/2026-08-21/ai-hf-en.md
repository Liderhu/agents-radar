# Hugging Face Trending Models Digest 2026-08-21

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-20 17:03 UTC

---

Here is the Hugging Face trending models digest for **2026-08-21**.

## 1. Today's Highlights

Qwen3.8-27B is the week’s dominant release, powering a huge ecosystem of GGUF, FP8, NVFP4, MLX, and uncensored/abliterated variants — Unsloth’s GGUF alone has passed 5.1M downloads. DeepSeek also made a strong showing with V4 Pro and Flash, while Moonshot’s Kimi K3 became one of the most-liked models of the week at 10,880 likes. On the generation side, MiniMax expanded its lineup with Music3 and the hugely popular H3 video model, and Lightricks LTX-2.5 remains a versatile video-generation favorite. The chart is heavily weighted toward open-weight, multimodal, and local-friendly models, with community fine-tunes and quantizations often outpacing original releases in download volume.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 672 | 43,287 | DeepSeek’s V4 Pro text-generation model, tuned for general conversational use. It is trending as a compact flagship from DeepSeek’s V4 lineup, with 672 likes and 43,287 downloads as users compare it to the higher-volume Flash variant. |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,117 | 14,592 | A frontier-scale sparse MoE model with 2.4T total parameters and 95B active parameters. It is notable for bringing Qwen3.8 architecture to massive scale; 1,117 likes signal strong research interest despite only 14,592 downloads. |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,571 | 2,547,549 | DeepSeek’s Flash edition for fast, high-throughput text generation. It is one of the week’s top open-weight LLMs, with 3,571 likes and 2,547,549 downloads. |
| [ornith-ai/Ornith-1.5-35B-A3B](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) | ornith-ai | 196 | 1,713 | Ornith’s 35B MoE model with 3B active parameters and Qwen3.5 MoE lineage. It is attracting attention for efficient text generation with optional image-text-to-text capability in a small active-parameter package. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,680 | 1,373,584 | Qwen’s flagship 27B image-text-to-text multimodal model. It anchors the week’s Qwen3.8 ecosystem: 11,680 likes, 1,373,584 downloads, and dozens of derived GGUF, FP8, and abliterated variants. |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 1,088 | 14,471 | MiniMax’s text-to-music generation model with a dedicated music-generation diffusers pipeline. It is trending as a high-quality open music generation release, with a ComfyUI-ready version already available. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,390 | 611,825 | Lightricks’ open video generation model supporting image-to-video, text-to-video, and video-to-video. 1,390 likes and 611,825 downloads make it a mainstream choice for open video synthesis. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,218 | 3,308,673 | MiniMax’s video generation model for image-text-to-video and text-to-video tasks. It is a breakout release with 4,218 likes and 3,308,673 downloads, and it has already spawned community fine-tunes such as 10Eros-Max and Turbo variants. |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,715 | 478,622 | A 30B image-text-to-text multimodal conversational model from meta-models. It is trending with 1,715 likes and 478,622 downloads, likely due to strong vision-language chat performance. |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 240 | 1,373 | A preview image-text-to-text model from dots-studio labeled as dots3_note. It is an early release with 240 likes and 1,373 downloads, generating curiosity around the dots3 note-taking series. |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,880 | 2,349,853 | Moonshot’s Kimi K3 image-text-to-text model with compressed-tensor and feature-extraction tags. It is one of the most-liked releases this week, at 10,880 likes, and 2,349,853 downloads point to strong demand for compact multimodal LLMs. |
| [Comfy-Org/MiniMax-Music-3](https://huggingface.co/Comfy-Org/MiniMax-Music-3) | Comfy-Org | 202 | 418,785 | A ComfyUI single-file version of MiniMax Music 3 for local music generation. It complements the original release with 202 likes and 418,785 downloads, showing how ComfyUI packaging accelerates adoption. |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 644 | 380,072 | A faster Turbo variant of MiniMax-H3 for image-to-video generation. It is trending with 644 likes and 380,072 downloads, offering improved inference speed over the base H3 model. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,328 | 0 | A small repository that fixes Qwen Jinja chat templates for MLX and broader Qwen3.5 compatibility. It is notable because 1,328 likes accrued with zero downloads, highlighting how much developers care about template correctness. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 2,300 | 5,126,652 | Unsloth’s GGUF quantization of Qwen3.8-27B. It is the week’s most-downloaded model at 5,126,652 downloads, making it the default choice for local Qwen3.8 inference. |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 626 | 1,517,643 | Official FP8 quantized version of Qwen3.8-27B. With 1,517,643 downloads and 626 likes, it is a high-traffic GPU-friendly option that reduces memory footprint while keeping multimodal capabilities. |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 663 | 76,109 | Abliterated FP8 build from orcarouter. It combines FP8 efficiency with uncensored behavior; 663 likes and 76,109 downloads show strong niche demand. |
| [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 686 | 2,628 | MLX conversion of Qwen3.8-27B uncensored for Apple silicon. 686 likes on only 2,628 downloads indicates early interest from Mac-based local LLM users. |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 503 | 979,768 | Uncensored GGUF with MTP support from JonathanColetti. 979,768 downloads and 503 likes make it one of the most-used Qwen3.8 GGUF variants. |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 347 | 268,258 | Aggressive multi-token-prediction GGUF of the uncensored Qwen3.8-27B. 268,258 downloads show a niche appetite for fast, aggressive local inference builds. |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 304 | 831,483 | Unsloth’s NVFP4 quantization for NVIDIA FP4-accelerated hardware. It accumulated 831,483 downloads and 304 likes, indicating strong interest in cutting-edge low-precision formats. |
| [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 218 | 55,074 | A community GGUF quantized build from empero-ai. With 218 likes and 55,074 downloads, it extends the Qwen3.8 GGUF ecosystem with another tuned option. |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 230 | 52,382 | The GGUF counterpart to orcarouter’s uncensored Qwen3.8 builds. 230 likes and 52,382 downloads give users a straightforward llama.cpp-compatible uncensored model. |
| [TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 296 | 0 | Community video-generation fine-tune of MiniMax-H3 for text/image-to-video. It has 296 likes but zero downloads yet, likely because it is a very recent creative fine-tune exploring stylized video output. |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 194 | 187,008 | huihui’s abliterated GGUF of Qwen3.8-27B. It is part of the popular Huihui uncensored line, with 194 likes and 187,008 downloads. |
| [Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF](https://huggingface.co/Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF) | Blackfrost-AI | 183 | 186,470 | An abliterated dense 27B GGUF from Blackfrost-AI. 183 likes and 186,470 downloads place it among the many uncensored Qwen3.8 GGUF options. |
| [0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF](https://huggingface.co/0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF) | 0bserverx | 183 | 326,638 | A “heretic”-style abliterated uncensored GGUF. 326,638 downloads and 183 likes make it one of the more aggressive uncensored builds in the list. |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 175 | 4,415 | A multi-format abliterated release with MLX, safetensors, and GGUF tags. 175 likes and 4,415 downloads position it as a newer, total-uncensoring variant. |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated) | huihui-ai | 192 | 10,540 | The safetensors version of huihui’s abliterated Qwen3.8-27B. It is useful as a starting point for further quantization or fine-tuning, with 192 likes and 10,540 downloads. |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,181 | 3,001,999 | A community GGUF with a long feature-name string, based on Qwen3.6 27B and tuned for uncensored/heretic use with MTP. Despite the Qwen3.6 naming, it is one of the most downloaded community models this week, at 3,001,999 downloads and 2,181 likes. |

## 3. Ecosystem Signal

Qwen3.8 is the clear center of gravity this week: the base 27B model and its many quantized and abliterated derivatives occupy most of the list, with Unsloth’s GGUF passing 5.1M downloads and DavidAU’s community GGUF passing 3.0M. This points to a mature open-weight local inference ecosystem around Qwen’s multimodal 27B design. DeepSeek’s V4 Pro and Flash, along with Moonshot’s Kimi K3, show that large labs are still pushing efficient text and multimodal LLMs, with Flash attracting 2.5M downloads. Open-weight releases dominate the trending chart; no proprietary API-only models appear. Quantization is nearly synonymous with GGUF, but FP8, NVFP4, and MLX variants are growing, especially for GPU and Apple-silicon users. The proliferation of abliterated and uncensored fine-tunes — under names like “uncensored,” “heretic,” “obliterated,” and “abliterated” — remains a major community signal, indicating strong demand for reduced-refusal models. Meanwhile, ComfyUI ports like MiniMax-Music-3 demonstrate that format accessibility drives adoption, and chat-template fixes receive high likes despite zero downloads, showing that compatibility friction is a real pain point.

## 4. Worth Exploring

- **[Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)** — A 2.4T-parameter sparse MoE with 95B active parameters. It is worth studying for how Qwen scales its architecture while keeping inference feasible, and it may define the next generation of efficient frontier LLMs.

- **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** — A versatile open video generation model supporting image-to-video, text-to-video, and video-to-video. It is worth trying because it balances high quality, broad task support, and an accessible diffusion-single-file format, backed by 611,825 downloads.

- **[froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates)** — Not a standard model, but a high-value utility: 1,328 likes with zero downloads shows how much the community cares about chat-template compatibility. Studying it helps understand deployment friction in MLX and Qwen workflows.

---
*This digest is auto-generated by [agents-radar](https://github.com/Liderhu/agents-radar).*