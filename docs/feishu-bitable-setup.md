# 中国飞书多维表格接入

信息雷达每天把 `digests/YYYY-MM-DD/ai-radar.json` 中的全部候选写入一张飞书多维表格。第一次接入需要你在中国飞书开放平台和飞书文档界面完成以下步骤；程序不会也不能代替企业管理员授权。

## 1. 创建企业自建应用

1. 打开[飞书开放平台开发者后台](https://open.feishu.cn/app)，创建“企业自建应用”。
2. 在“凭证与基础信息”复制 **App ID** 和 **App Secret**。
3. 在“权限管理”申请“查看、评论、编辑和管理多维表格”等多维表格读写权限。
4. 创建并发布一个应用版本；如果企业要求管理员审批，等待审批通过。

官方参考：[创建应用](https://open.feishu.cn/document/uYjL24iN/uMTMuMTMuMTM/development-guide/step1) · [获取 tenant_access_token](https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant_access_token_internal)

## 2. 创建 Base 和数据表

在飞书中创建一个多维表格和一张数据表，并按下表逐字创建字段。字段名或类型不同会导致 API 写入失败。

| 字段名   | 字段类型         | 说明                                     |
| -------- | ---------------- | ---------------------------------------- | ------------------------- |
| 唯一键   | 单行文本，主字段 | `日期                                    | 规范化链接`，用于同日更新 |
| 日期     | 日期             | 雷达所属日期                             |
| 当日排名 | 数字             | 1–30                                     |
| Top 5    | 复选框           | 当日推荐标记                             |
| 标题     | 单行文本         | 文章标题                                 |
| 原文链接 | URL              | 外部文章                                 |
| HN讨论   | URL              | Hacker News 讨论页                       |
| 总分     | 数字             | 最终排序分                               |
| 基础分   | 数字             | 热度、讨论、排名及时效分                 |
| 编辑分   | 数字             | DeepSeek 编辑分；降级时为 0              |
| 中文摘要 | 多行文本         | 中文摘要                                 |
| 推荐理由 | 多行文本         | 中文推荐理由                             |
| 评分模式 | 单选             | 先创建 `DeepSeek`、`确定性降级` 两个选项 |
| 发布时间 | 日期时间         | 原始 HN 条目时间                         |

## 3. 取得 Base 标识并授权应用

1. Base 地址形如 `https://你的企业.feishu.cn/base/app...?...table=tbl...`。
2. `base/` 后以 `app` 开头的部分是 **app_token**。
3. `table=` 后以 `tbl` 开头的部分是 **table_id**。
4. 在多维表格右上角打开“更多”，选择“添加文档应用”，把刚创建的自建应用加入并授予可编辑权限。

应用拥有开放平台权限但未被添加为文档应用时，接口仍会返回无权限。官方接口参考：[列出记录](https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-record/list) · [批量新增记录](https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-record/batch_create) · [批量更新记录](https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-record/batch_update)

## 4. 配置 GitHub Actions Secrets

在个人 fork 的 **Settings → Secrets and variables → Actions** 中添加：

| Secret                     | 值                  |
| -------------------------- | ------------------- |
| `FEISHU_APP_ID`            | 自建应用 App ID     |
| `FEISHU_APP_SECRET`        | 自建应用 App Secret |
| `FEISHU_BITABLE_APP_TOKEN` | 多维表格 app_token  |
| `FEISHU_BITABLE_TABLE_ID`  | 数据表 table_id     |

不要把 App Secret 粘贴到 Issue、聊天、日志或仓库文件中。`FEISHU_WEBHOOK_URLS` 是群机器人通知配置，不能代替以上四项。

## 5. 首次导入和日常同步

首次把仓库中已有的所有结构化日期导入：

```bash
pnpm sync:feishu-bitable:all
```

只同步最新日期：

```bash
pnpm sync:feishu-bitable
```

GitHub Actions 每天自动运行后一条命令。相同日期、相同规范化链接会更新原行；相同链接在不同日期有不同唯一键，会保留为两条历史记录。飞书同步失败不会阻止 Markdown、JSON 和公开阅读页继续生成。
