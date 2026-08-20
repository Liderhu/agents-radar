# Hugging Face 热门模型日报 2026-08-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-20 17:03 UTC

---

# Hugging Face 热门模型日报（2026-08-21）

## 今日速览

今天 Hugging Face 热门榜被 **Qwen3.8 生态**强势占据：官方多模态模型周点赞达 11,680，GGUF、FP8、MLX、NVFP4 等衍生量化版本也大量上榜。**DeepSeek V4** 的 Pro 与 Flash 齐登语言模型榜，Flash 下载量达 255 万，凸显高效文本推理需求。视频/音乐生成热度不减，**MiniMax-H3、MiniMax-Music3** 与 **LTX-2.5** 共同撑起生成类榜单。**Kimi K3** 以 10,880 赞成为新亮点，社区 “abliterated/uncensored” 微调与量化仍是重要增长极。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) | deepseek-ai | 672 | 43,287 | DeepSeek V4 Pro 是系列旗舰文本生成模型，主攻对话与复杂推理。周点赞 672，是 DeepSeek 新一代权重的重要代表作。 |
| [Qwen/Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B) | Qwen | 1,117 | 14,592 | Qwen 3.8 的 MoE 文本模型，总参数 2.4T、激活参数 95B。面向极致规模语言建模，呼应高效稀疏激活路线。 |
| [deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,571 | 2,547,549 | DeepSeek V4 Flash 是主打高效推理的文本生成模型。周点赞 3,571、下载 255 万，是当前部署热度最高的 DeepSeek 变体。 |
| [ornith-ai/Ornith-1.5-35B-A3B](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) | ornith-ai | 196 | 1,713 | Ornith 推出的 MoE 文本生成模型，35B 总参数、约 3B 激活。标签含 qwen3_5_moe，代表低激活成本的新一代 MoE 趋势。 |

### 🎨 多模态与生成（图像、视频、音频、文本到X）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 11,680 | 1,373,584 | Qwen 3.8 系列官方多模态旗舰，支持图像+文本输入并输出对话。周点赞 11,680、下载 137 万，是今日榜单热度第一。 |
| [MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3) | MiniMaxAI | 1,088 | 14,471 | MiniMax Music3 是文本生成音乐模型，使用 diffusers 架构。上榜单显示音乐生成进入主流视野。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 1,390 | 611,825 | LTX-2.5 由 Lightricks 出品，支持图像/文本/视频到视频的多任务视频生成。下载 61 万，是视频生成赛道的重要开源候选。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,218 | 3,308,673 | MiniMax-H3 是热门视频生成模型，支持文生/图生视频。周点赞 4,218、下载 330 万，衍生 Turbo 和微调版已出现。 |
| [meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B) | meta-models | 1,715 | 478,622 | Muse-Glimmer 30B 是多模态对话模型，支持图像+文本输入。周点赞 1,715，是榜单中值得关注的新势力。 |
| [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 10,880 | 2,349,853 | Kimi K3 是月之暗面发布的多模态模型，支持图像+文本，并采用 compressed-tensors 压缩技术。周点赞 10,880，是今日第二大热门权重。 |
| [dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev) | dots-studio | 240 | 1,373 | dots3 note 是面向笔记/文档场景的多模态模型预览版。以图像+文本到文本为核心，聚焦垂直生产力场景。 |
| [TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max) | TenStrip | 296 | 0 | 基于 MiniMax-H3 的社区微调视频生成模型，支持文本/图像生成视频。点赞 296，说明 H3 生态开始快速衍生。 |
| [Comfy-Org/MiniMax-Music-3](https://huggingface.co/Comfy-Org/MiniMax-Music-3) | Comfy-Org | 202 | 418,785 | ComfyUI 官方的 MiniMax-Music-3 单文件适配版，便于节点式音乐生成工作流。下载 41.8 万，说明 ComfyUI 集成度高。 |
| [lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo) | lightx2v | 644 | 380,072 | MiniMax-H3 的 Turbo 加速版，面向图生视频等任务。下载 38 万，是 H3 衍生生态的代表。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [froggeric/Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,328 | 0 | 开发工具型仓库，不是权重模型。修复 Qwen3.5/3.8 系列聊天模板的 Jinja 配置，周点赞 1,328，说明模板兼容性痛点显著。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 简要说明 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 2,300 | 5,126,652 | unsloth 出品的 GGUF 量化版，基于 Qwen3.8-27B 转换。下载 512 万，是榜单下载量最高的量化衍生模型。 |
| [Qwen/Qwen3.8-27B-FP8](https://huggingface.co/Qwen/Qwen3.8-27B-FP8) | Qwen | 626 | 1,517,643 | 官方 FP8 量化版，兼容 transformers/safetensors，降低部署门槛。下载 152 万，适合高吞吐场景。 |
| [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 663 | 76,109 | orcarouter 的 abliterated FP8 量化版，保留多模态输入但去除部分安全限制。面向需要“无审查”的本地部署。 |
| [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 686 | 2,628 | MLX 量化版，适配 Apple Silicon 平台。针对 Mac 用户提供去审查多模态模型。 |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 503 | 979,768 | GGUF 格式，支持 llama.cpp 推理。下载 98 万，是 Qwen3.8 去审查量化中较流行选择。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 347 | 268,258 | 社区定制 GGUF，加入 Aggressive MTP 策略与去审查微调。满足偏好更强生成风格和长尾需求。 |
| [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) | unsloth | 304 | 831,483 | unsloth 的 NVIDIA FP4 量化版，面向新一代 GPU 显存优化。代表低比特量化在 27B 多模态模型上的探索。 |
| [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF) | empero-ai | 218 | 55,074 | GGUF 的 Ridge 量化版本，提供更多档位选择。适合在显存和效果之间自己权衡。 |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 230 | 52,382 | orcarouter 的 GGUF 去审查版，适配 llama.cpp。与 FP8/MLX 版本互补，形成完整量化矩阵。 |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 194 | 187,008 | huihui-ai 的 abliterated GGUF 版，是社区去审查量化主流分支。下载 18.7 万，常用于本地推理。 |
| [Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF](https://huggingface.co/Blackfrost-AI/Qwen3.8-27B-ABLITERATED-GGUF) | Blackfrost-AI | 183 | 186,470 | Blackfrost-AI 的同主题量化版，与 huihui 版本形成竞争。多个 abliterated 版本并存，显示社区需求稳定。 |
| [0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF](https://huggingface.co/0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF) | 0bserverx | 183 | 326,638 | 强调 Heretic/Uncensored 的 GGUF 量化版，属于更激进风格。下载 32.6 万，说明细分市场活跃。 |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 175 | 4,415 | OBLITERATUS 的 abliterated 多格式版本，提供 MLX/safetensors/GGUF。适合不同推理框架。 |
| [huihui-ai/Huihui-Qwen3.8-27B-abliterated](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated) | huihui-ai | 192 | 10,540 | 非量化 safetensors 版 abliterated 模型，适合继续微调。保留 transformers 格式，便于接入训练流程。 |
| [DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF) | DavidAU | 2,181 | 3,001,999 | 长命名社区微调 GGUF，集 uncensored/heretic/MTP 多种特性于一体。周点赞 2,181、下载 300 万，是榜单黑马。 |

## 生态信号

榜单显示，开放权重模型正在形成“基础权重 + 量化 + 微调”的完整生态：Qwen3.8 家族最明显，官方权重与社区衍生互相拉动；DeepSeek V4、Kimi K3 等国产模型也站稳头部，开源与闭源差距进一步缩小。模型类型从文本快速扩展到视频和音乐生成，MiniMax 贡献了 H3 与 Music3 两个重要支点。社区侧，GGUF/FP8/MLX 多格式量化、abliterated 去审查微调是主要活动方向，反映出本地部署、硬件适配和定制化需求的集中爆发。

## 值得探索

- **[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)** — 官方多模态旗舰，点赞/下载双高，适合作为理解当前最强开源多模态能力的基准模型。
- **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** — 开源视频生成明星，衍生 Turbo/微调已出现，适合做视频生成和二次开发实验。
- **[deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)** — 高效文本部署首选，下载量 255 万，适合低延迟推理场景探索。

---
*本日报由 [agents-radar](https://github.com/Liderhu/agents-radar) 自动生成。*