# 个人信息雷达页面与飞书多维表格同步设计

日期：2026-08-20  
状态：待用户书面确认后进入实施计划

## 1. 目标

在 `Liderhu/agents-radar` 上部署一个可长期使用的个人信息雷达：

- 每天自动抓取最多 30 条唯一 Hacker News AI 链接；
- 生成稳定的 Top 5 推荐以及完整候选列表；
- 通过独立公开页面阅读当天与历史信息；
- 将每天全部候选写入中国大陆飞书多维表格；
- 同一链接跨日期分别保留，同一天重复运行不重复插入；
- DeepSeek 或飞书失败时不阻止本地报告和公开页面生成。

本期不加入登录、付费托管、独立数据库、收藏账号体系、全文抓取或复杂后台。

## 2. 用户入口

公开页面固定为：

`https://liderhu.github.io/agents-radar/radar.html`

页面只展示信息雷达，不展示原项目的其他日报。桌面与手机均可使用。

### 页面信息结构

1. 顶部：站点名称、当前日期、评分模式、扫描数、候选数、去重数。
2. 日期导航：上一天、下一天、日期选择器。
3. Top 5：按推荐顺序展示标题、分数、推荐理由、摘要、原文和 HN 讨论链接。
4. 全部候选：30 条可搜索列表，展示当日排名、总分、基础分、编辑分、发布时间和摘要。
5. 状态提示：无数据、加载失败、确定性降级模式均给出明确说明。

### 视觉方向

页面以“雷达扫描记录”为主题，不复刻原站的多报告侧边栏。使用克制的深蓝灰背景、青色信号线和暖黄色 Top 5 标记；标题强调每日观察，数字和元数据使用等宽字体。唯一显著视觉元素是一条随日期切换的“扫描轨迹”，其他部分保持安静、便于长文阅读。

## 3. 数据文件

Markdown 继续作为人类可读报告，同时新增结构化 JSON 作为页面和飞书同步的共同数据源：

`digests/YYYY-MM-DD/ai-radar.json`

核心结构：

```json
{
  "date": "2026-08-20",
  "generatedAt": "2026-08-20 00:00",
  "mode": "deepseek",
  "scannedCount": 150,
  "duplicateCount": 3,
  "items": [
    {
      "key": "2026-08-20|https://example.com/article",
      "rank": 1,
      "isTop5": true,
      "title": "Example",
      "url": "https://example.com/article",
      "hnUrl": "https://news.ycombinator.com/item?id=123",
      "totalScore": 91.2,
      "baseScore": 66.2,
      "editorialScore": 25,
      "publishedAt": "2026-08-19T12:00:00.000Z",
      "summary": { "zh": "…", "en": "…" },
      "reason": { "zh": "…", "en": "…" }
    }
  ]
}
```

`key` 使用“日期 + 规范化后的原文 URL”。同一天重复运行可定位并更新记录；隔天相同 URL 会得到新 key，从而保留历史快照。

根目录新增 `radar-manifest.json`，只保存存在结构化雷达数据的日期列表。页面先读取它，再按需加载某一天的 JSON，避免把全部历史打包进一个越来越大的文件。

## 4. 代码边界

### 4.1 生产数据

- `src/radar-json.ts`：把 `RadarData` 映射成稳定、可序列化的公开结构；不调用网络。
- `src/report-savers.ts`：在已有中英文 Markdown 保存之外，只额外保存一次 `ai-radar.json`。
- `src/index.ts`：共享同一个 `radarData`，不增加第二次 LLM 调用。
- `src/generate-manifest.ts`：扫描 JSON 文件并生成 `radar-manifest.json`。

### 4.2 独立页面

- `radar.html`：无构建步骤的单页应用，读取静态 JSON。
- 页面使用原生 HTML/CSS/JavaScript，不引入 React、数据库或新的部署平台。
- 所有外部链接使用安全的新窗口属性；页面不接触任何飞书或模型密钥。

### 4.3 飞书同步

- `src/feishu-bitable.ts`：获取 `tenant_access_token`、读取当日已有记录、批量新增或更新。
- 仅在四个环境变量都存在时运行，否则输出明确的跳过信息：
  - `FEISHU_APP_ID`
  - `FEISHU_APP_SECRET`
  - `FEISHU_BITABLE_APP_TOKEN`
  - `FEISHU_BITABLE_TABLE_ID`
- 同步读取当天 `ai-radar.json`，不解析 Markdown。
- 以 `唯一键` 为幂等键：已有则更新，没有则新增。
- API 错误不得打印 App Secret 或 access token。

## 5. 飞书多维表格模型

表名建议：`每日信息雷达`

| 字段 | 类型 | 来源 |
|---|---|---|
| 唯一键 | 文本（主字段） | 日期 + URL |
| 日期 | 日期 | 当天日期 |
| 当日排名 | 数字 | 排序位置 |
| Top 5 | 复选框 | 是否进入推荐 |
| 标题 | 文本 | 原文标题 |
| 原文链接 | URL | 文章地址 |
| HN 讨论 | URL | HN item 地址 |
| 总分 | 数字 | 总评分 |
| 基础分 | 数字 | 确定性评分 |
| 编辑分 | 数字 | 模型评分，降级时为 0 |
| 中文摘要 | 多行文本 | 中文摘要 |
| 推荐理由 | 多行文本 | 中文推荐理由 |
| 评分模式 | 单选 | DeepSeek / 确定性降级 |
| 发布时间 | 日期时间 | HN 发布时间 |

本期只同步中文摘要和中文理由，以控制表宽；英文内容仍保留在网页 JSON 和英文 Markdown 中。

## 6. 从零配置飞书

用户需要完成一次人工配置：

1. 在[飞书开放平台](https://open.feishu.cn/)创建“企业自建应用”。
2. 在“凭证与基础信息”复制 App ID 与 App Secret。
3. 在“权限管理”申请应用身份下的多维表格读取与编辑/管理权限，并发布应用版本。
4. 在飞书中新建多维表格和数据表，按第 5 节建立字段。
5. 从多维表格 URL 获取 `app_token`，从数据表 URL/开发信息获取 `table_id`。
6. 在多维表格“添加文档应用/协作者”中加入该自建应用并授予可编辑权限。
7. 将四个值保存为 Fork 仓库的 GitHub Actions Secrets；任何密钥都不进入代码、日志或公开页面。

飞书官方说明强调应用 API 权限与文档协作者权限是两层独立授权，缺少任一层都可能返回 403：

- [创建企业自建应用](https://open.feishu.cn/document/uYjL24iN/uMTMuMTMuMTM/development-guide/step1)
- [云文档权限与应用身份常见问题](https://open.feishu.cn/document/server-docs/docs/faq)
- [获取企业自建应用 tenant_access_token](https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant_access_token_internal)

## 7. 每日自动化与部署

Fork 的 GitHub Actions 每天北京时间约 08:00 执行：

1. 抓取并生成所有现有报告；
2. 保存双语 Markdown 与 `ai-radar.json`；
3. 生成 `manifest.json`、`feed.xml` 和 `radar-manifest.json`；
4. 提交当天产物到 Fork 的 `master`；
5. 调用飞书同步脚本；
6. GitHub Pages 从 `master` 根目录发布静态页面。

飞书同步设置为非阻断步骤：失败会在 Actions 中标红/告警，但不回滚已生成的公开页面与日报。页面部署不依赖飞书。

## 8. 错误处理

- DeepSeek 超时或返回无效数据：沿用确定性降级并在页面和表格标注模式。
- HN 个别条目失败：跳过该条，继续扫描。
- JSON 缺失：该日期不进入 `radar-manifest.json`。
- 页面加载某天失败：保留日期导航并提示重新选择日期。
- 飞书未配置：同步脚本安全跳过，不影响日报。
- 飞书部分写入失败：操作按小批次执行，报告成功/失败数量；下一次同日重跑按唯一键补齐。
- 同日重复运行：查询当日已有唯一键后更新，不重复新增。

## 9. 验收标准

最小版本完成时必须满足：

1. `radar.html` 能在手机和桌面读取一个真实日期。
2. 页面显示 5 条 Top 推荐和全部实际候选，并支持标题/摘要搜索。
3. 日期导航能读取历史 `radar-manifest.json`。
4. 同一份 `ai-radar.json` 同时驱动页面与飞书同步。
5. 飞书首次同步新增当天全部记录；同日第二次同步不增加记录总数。
6. 跨日期相同 URL 产生不同记录。
7. 飞书失败不会阻止 JSON/Markdown/Page 产物。
8. 页面源代码、仓库提交和 Actions 日志不含 App Secret、DeepSeek Key 或 access token。

## 10. 实施范围控制

为了保持最小可实现，本期明确不做：

- 飞书内反向编辑网页数据；
- 用户登录、私有访问或收藏同步；
- 自建后端、Supabase、Netlify 或 Vercel；
- 全文内容镜像和附件存储；
- 自动创建飞书企业、应用或管理员审批；
- 复杂图表、个性化推荐或多用户权限。

