# 错误参考（Error Reference）

本文档收录的是调用 Kimi Code API 时可能遇到的**服务端错误**和**工具调用错误**，包括权限、限流、请求格式、服务器内部等问题。如果你遇到的是客户端本身的问题（如 CLI 安装失败、IDE 连接异常、MCP 配置错误等），请参考 [常见问题 FAQ](#)。

根据终端或客户端显示的报错信息，在下表中找到对应条目，查看含义和处理方式。

::: tip 提示
如果你使用的是 OpenCode、Claude Code 等第三方客户端，客户端自身可能对错误码进行了转换或重新包装，导致你看到的错误码与本文档不一致。这种情况下，请**以报错信息中的文字内容为主**，在下方快速查找表中匹配关键词，找到对应条目。
:::


## 快速查找

| 看到的报错关键词 | HTTP 状态码 | 跳转章节 |
|--------------|-----------|---------|
| `The API Key appears to be invalid or may have expired` | 401 | [认证错误](#api-key-无效) |
| `Invalid Authentication` | 401 | [认证错误](#invalid-authentication) |
| `unable to verify your membership benefits` | 402 | [会员权益异常](#会员权益无法验证) |
| `Kimi For Coding is currently only available for Coding Agents` | 403 | [权限错误](#非白名单客户端) |
| `You've reached your usage limit for this billing cycle` | 403 | [权限错误](#计费周期配额耗尽) |
| `Access terminated` | 403 | [权限错误](#账号访问终止) |
| `The engine is currently overloaded` | 429 | [限流与配额](#推理引擎过载) |
| `We're receiving too many requests` | 429 | [限流与配额](#并发请求过多) |
| `You've reached your usage limit for this period` | 429 | [限流与配额](#5-小时限额触顶) |
| `You've reached kimi monthly usage limit` | 429 | [限流与配额](#会员月度额度耗尽) |
| `total message size N exceeds limit 2097152` | 400 | [请求格式错误](#消息体超出上下文限制) |
| `Your request exceeded model token limit: 262144` | 400 | [请求格式错误](#token-超限) |
| `thinking is enabled but reasoning_content is missing` | 400 | [请求格式错误](#思维链字段缺失) |
| `unsupported image url` | 400 | [请求格式错误](#不支持的图片-url) |
| `function name ... is duplicated` | 400 | [请求格式错误](#工具名重复) |
| `The request was rejected because it was considered high risk` | 400 | [请求格式错误](#内容安全拦截) |
| `Not found the model kimi-for-coding or Permission denied` | 404 | [资源未找到](#模型未找到) |
| `method not found` | 404 | [资源未找到](#接口路径不存在) |
| `bot_id ... value does not match id_kinds` | 500 | [服务端内部错误](#bot_id-格式不合规) |
| `failed to connect to ... database=membership_` | 500 | [服务端内部错误](#数据库连接失败) |
| `FATAL: terminating connection due to administrator command` | 500 | [服务端内部错误](#数据库连接失败) |
| `failed to evaluate rate limit script` | 500 | [服务端内部错误](#内部连接异常) |
| `i/o timeout` / `conn closed` / `bad connection` | 500 | [服务端内部错误](#内部连接异常) |
| `503 Service Unavailable` / `504 Gateway Timeout` / `502 Bad Gateway` | 500 | [服务端内部错误](#下游服务不可用) |
| `未找到该账号` / `该账号已被禁用` / `已被禁言` | 500 | [服务端内部错误](#账号状态异常) |
| `context canceled` | 499 | [工具调用错误](#请求被取消) |
| `url2text` / `spider checkUrl failed` / `invalid html` | 500 | [工具调用错误](#网页读取失败) |
| `image_url:moderation request error` | 500 | [工具调用错误](#图片审核失败) |
| `We consider the current URL poses a security risk` | 403 | [工具调用错误](#url-安全风险拦截) |
| `invalid_url: The provided URL is invalid` | 400 | [工具调用错误](#url-格式无效) |


## 认证错误

**HTTP 401**

请求未携带有效凭证，或凭证已失效。服务端在处理请求之前会先验证身份，401 表示这一步没有通过。**不需要重试**，修复凭证后重新发送请求。

### API Key 无效

```
error, status code: 401, message: The API Key appears to be invalid or may have expired. Please verify your credentials and try again.
```

API Key 填写有误，或该 Key 已在控制台被撤销/过期。

**处理方式：**
- **密钥输入错误**：检查是否有多余的空格或遗漏的字符
- **密钥已过期或被撤销**：前往[控制台](https://www.kimi.com/code/console?from=kfc_overview_topbar) › API Keys 确认密钥状态
- **环境变量覆盖**：检查是否有 `KIMI_API_KEY` 或 `OPENAI_API_KEY` 环境变量覆盖了配置文件中的密钥，可运行 `echo $KIMI_API_KEY` 检查


### Invalid Authentication

```
error, status code: 401, message: Invalid Authentication
```

请求未携带有效凭证，或使用了不支持的认证格式。

**处理方式：**

最常见原因是误用了开放平台的 Key 或 URL。Kimi Code 和 [Kimi 开放平台](https://platform.kimi.com) 是两套独立系统，Key 和 Base URL 均不通用：
- Kimi Code：Key 从[控制台](https://www.kimi.com/code/console?from=kfc_overview_topbar)获取，Base URL 为 `https://api.kimi.com/coding/v1`（OpenAI 协议）或 `https://api.kimi.com/coding/`（Anthropic 协议）
- 开放平台：Key 从 [platform.kimi.com](https://platform.kimi.com) 获取，Base URL 为 `https://api.moonshot.cn/v1`



## 会员权益异常

**HTTP 402**

服务端无法确认当前账号的订阅状态，通常为临时性问题。

### 会员权益无法验证

```
error, status code: 402, message: We're unable to verify your membership benefits at this time. Please ensure your membership is active.
```

**处理方式：**
- 确认 Kimi Code 订阅仍在有效期内
- 等待片刻后重试
- 如持续出现，前往[控制台](https://www.kimi.com/code/console?from=kfc_overview_topbar)检查订阅状态或联系 [code@moonshot.ai](mailto:code@moonshot.ai)


## 权限错误

**HTTP 403**

请求本身格式正确，身份也已验证，但当前账号没有执行该操作的权限。分两类：一类是访问控制（不在白名单、账号被终止），一类是配额耗尽（本质是超出了被允许的使用量）。**重试无意义**，需要解决权限或配额问题本身。

### 非白名单客户端

```
error, status code: 403, message: Kimi For Coding is currently only available for Coding Agents such as Kimi CLI, Claude Code, Roo Code, Kilo Code, etc.
```

使用了 OpenAI 兼容协议，但当前客户端不在白名单内，服务端拒绝了请求。

**处理方式：**
- **推荐：** 切换到 Anthropic 兼容协议，将 Base URL 改为 `https://api.kimi.com/coding/`，无需申请白名单，可在更多客户端中使用



### 计费周期配额耗尽

```
error, status code: 403, message: You've reached your usage limit for this billing cycle. Your quota will be refreshed in the next cycle.
```

账户当前周额度已全部用完。

**处理方式：**
- 等待下个计费周期刷新
- 前往[控制台](https://www.kimi.com/code/console?from=kfc_overview_topbar)查看额度使用情况
- [升级订阅](https://www.kimi.com/membership/pricing?from=upgrade_plan&track_id=5b8a0861-96ab-424d-b015-5992ec9ab98a)获取更高配额


### 账号访问终止

```
error, status code: 403, message: Access terminated.
```

账号因违反社区规范被终止访问。

**处理方式：**
- 前往 [Kimi Code 社区倡议](https://www.kimi.com/code/docs/kimi-code/community-guidelines.html) 了解违规原因及判定范围
- 如需申诉，请发送邮件至 [support@moonshot.cn](mailto:support@moonshot.cn)，并在邮件中说明风控的大致情况


## 限流与配额

**HTTP 429**

请求频次或使用量超出了限制。分两种性质：推理引擎过载属于服务端容量问题，**直接重试即可**；配额类错误属于账户使用量问题，**重试无意义**，需等待重置或升级套餐。

### 推理引擎过载

```
error, status code: 429, message: The engine is currently overloaded, please try again later
```

服务端当前请求量超出推理容量，**与个人配额和账户状态无关**。
工作日高峰期（14:00-17:00）可能会触发，Kimi Code会及时处理，为你提供更丝滑的体验，也可避开高峰期请求

**处理方式：**
- 稍等片刻后重试


### 并发请求过多

```
error, status code: 429, message: We're receiving too many requests at the moment. Please wait a moment and try again.
```

短时间内发出的请求太多，超出了账户限制。

**处理方式：**
- 稍等片刻后重试，避免连续快速地重复发送请求


### 5 小时限额触顶

```
error, status code: 429, message: You've reached your usage limit for this period. Your quota will be refreshed in the next period.
```

当前 5 小时滚动窗口内的调用量已达上限。

**处理方式：**
- 等待限额窗口重置，可前往[控制台](https://www.kimi.com/code/console?from=kfc_overview_topbar)查看重置时间
- [升级订阅](https://www.kimi.com/membership/pricing?from=upgrade_plan&track_id=5b8a0861-96ab-424d-b015-5992ec9ab98a)提升限额上限


### 会员月度额度耗尽

```
error, status code: 429, message: You've reached kimi monthly usage limit for this billing cycle. Your quota will be refreshed in the next cycle.
```

你的 Kimi [月度额度](https://www.kimi.com/membership/subscription)已全部用完。

Kimi 的所有会员权益——包括 PPT、Agent 集群、Kimi Code 等共用同一套月度额度。一旦总额度耗尽，即使 Kimi Code 还有剩余额度，也继续发起请求，需等待下个月额度自动刷新或升级会员计划，详情见[Kimi 会员额度计费说明](https://www.kimi.com/membership-credits)。额度耗尽后账户进入冻结状态，如下图所示：

![月度额度耗尽冻结状态](/月限额.png)

**处理方式：**
- 等待下个计费周期自动重置
- [升级订阅](https://www.kimi.com/membership/pricing?from=upgrade_plan&track_id=5b8a0861-96ab-424d-b015-5992ec9ab98a)获取更高的月度额度


## 请求格式错误

**HTTP 400**

请求内容本身有问题，服务端在解析或校验阶段就拒绝了。**修改请求内容即可解决，无需等待或联系支持。**

### 消息体超出上下文限制

```
error, status code: 400, message: total message size 5943865 exceeds limit 2097152
```

所有消息（含历史对话、系统提示、工具结果）加起来超过 2MB 上下文限制。这是出现频率最高的 400 错误。

**处理方式：**
- 精简对话历史，删除不必要的早期轮次
- 分段处理长文本，控制单次请求体积


### Token 超限

```
error, status code: 400, message: Invalid request: Your request exceeded model token limit: 262144 (requested: 558009)
```

请求的 token 数超过模型单次处理上限（262,144 tokens）。

**处理方式：**
- 缩短 prompt 长度或截断历史对话
- 分多次请求处理长文本


### 思维链字段缺失

```
error, status code: 400, message: thinking is enabled but reasoning_content is missing in assistant tool call message at index 2
```

启用了思维链（thinking）模式，但工具调用消息中缺少 `reasoning_content` 字段。这是 Kimi Code 特有字段，启用思维链时必须携带。

**处理方式：**
- 在工具调用的 assistant 消息中补充 `reasoning_content` 字段
- 参考 [Providers & Models 配置文档](https://www.kimi.com/code/docs/kimi-code-cli/configuration/providers-and-models.html) 查看思维链字段规范



### 不支持的图片 URL

```
error, status code: 400, message: Invalid request: unsupported image url: C:\Users\pc\...\screenshot.jpg
```

传入的图片 URL 格式不支持：本地路径、非标准 base64 前缀，或不支持的外部域名。

**处理方式：**
- 本地路径需上传至可公开访问的 URL
- base64 图片需使用标准格式：`data:image/jpeg;base64,...`


### 工具名重复

```
error, status code: 400, message: function name unnamed_function is duplicated
```

`tools` 数组中存在同名工具定义。

**处理方式：**
- 确保每个工具的 `name` 字段唯一


### 内容安全拦截

```
error, status code: 400, message: The request was rejected because it was considered high risk
```

请求内容触发了内容安全检测，服务端拒绝处理。

**处理方式：**
- 检查 prompt 中是否包含敏感内容，修改后重试
- 如认为是误判，发送邮件至 [code@moonshot.ai](mailto:code@moonshot.ai) 并附上触发报错的请求内容


## 资源未找到

**HTTP 404**

请求的资源不存在，或当前账号无权访问。检查模型名称和接口路径是否正确。

### 模型未找到

```
error, status code: 404, message: Not found the model kimi-for-coding or Permission denied
```

**处理方式：**
- 确认模型名称拼写正确（`kimi-for-coding`）
- 确认账号已开通 [Kimi Code](https://kimi.com/code) 访问权限


### 接口路径不存在

```
method not found
```

**处理方式：**
- 检查请求 URL 是否正确，Kimi Code 的 Base URL 为 `https://api.kimi.com/coding/v1`（OpenAI 协议）或 `https://api.kimi.com/coding/`（Anthropic 协议）


## 服务端内部错误

**HTTP 500**

服务端发生了意外错误，**不由请求内容或账户状态引起**。大多数情况下等待片刻后重试即可恢复，如持续出现请通过邮箱[code@moonshot.ai](mailto:code@moonshot.ai)提交反馈。

### bot_id 格式不合规

```
invalid_argument: field kimi.billing.v1.ClawExtension.bot_id: value "KIMI_CLAW_ID" (id_kind=uuid_v4): value does not match id_kinds: [uuid_v4]
invalid_argument: field kimi.billing.v1.ClawExtension.bot_id: value "openclaw-local" (id_kind=uuid_v4): value does not match id_kinds: [uuid_v4]
```

`bot_id` 不是合法的 UUID v4 格式。这是客户端软件在发请求时自动附上的字段，通常由客户端负责填写，用户无需手动设置。

**处理方式：**
- 更新到最新版本的客户端后重试
- 如更新后仍出现，发送邮件至 [code@moonshot.ai](mailto:code@moonshot.ai) 并附上完整报错信息


### 数据库连接失败

```
internal: failed to connect to `user=kimi_chat_prod_rw database=membership_009`: ...: connection reset by peer
internal: FATAL: terminating connection due to administrator command (SQLSTATE 57P03)
```

服务端无法连接会员资格校验数据库，或数据库正在维护重启。属于基础设施层故障。

**处理方式：**
- 等待 1-2 分钟后重试


### 内部连接异常

```
internal: conn closed
internal: driver: bad connection
internal: read tcp ...: i/o timeout
internal: unexpected EOF
internal: failed to evaluate rate limit script: read tcp ...: i/o timeout
```

服务端内部网络连接异常，涵盖连接被重置、I/O 超时、Redis 限流脚本超时等多种底层错误，通常为瞬态故障。

**处理方式：**
- 稍等片刻后重试（初始等待 1 秒，最多重试 3 次）


### 下游服务不可用

```
unavailable: 503 Service Unavailable
unavailable: 504 Gateway Timeout
unavailable: 502 Bad Gateway
```

服务端调用下游模型或基础组件时收到 5xx 响应。

**处理方式：**
- 等待片刻后重试


### 账号状态异常

```
unauthenticated: not_found: 未找到该账号，请确认是否注册
unauthenticated: failed_precondition: 因违反用户协议，该账号已被禁用。
unauthenticated: failed_precondition: 因违反用户协议，该账号已被暂时禁用。
unauthenticated: failed_precondition: 因违反用户协议，该账号已被禁言。
```

服务端查询账号信息时发现账号不存在或处于异常状态。

**处理方式：**
- 账号未注册：确认使用的账号已完成注册
- 账号被禁用/禁言：发送邮件至 [support@kimi-code.com](mailto:support@kimi-code.com) 了解原因和申诉方式



## 工具调用错误

以下错误发生在 AI 执行工具调用过程中（如读取网页、处理图片），**不影响对话本身继续使用**，只是当前这一步操作没有成功。

如果看到的是认证或限流类错误（如 401、429），请参考前面的对应章节。


### 请求被取消

**HTTP 499**

```
error sending 'CallDataSourceTool' request: Post "http://...": context canceled
canceled: context canceled
```

客户端在收到结果之前主动中断了连接，通常是用户手动停止操作、网络中断或客户端超时触发。不是服务端错误。

**处理方式：**
- 用户主动停止属正常行为，无需处理
- 频繁出现且非主动触发时，检查客户端超时配置是否过短


### 网页读取失败

**HTTP 500**

```
url2text:v2:fresh-request timeout
url-to-text request failed: 30001 invalid html
url-to-text request failed: 30041 check url failed, client error (4xx)
url-to-text request failed: 30043 check url failed, server error (5xx)
url-to-text request failed: 403 verify page
url-to-text request failed: 500 url is in blacklist
spider checkUrl failed: Post "...": context deadline exceeded
```

AI 尝试读取网页内容时失败。常见原因：目标页面响应超时、页面结构异常、需要登录验证、URL 在黑名单内，或目标服务器本身出错。

**处理方式：**
- 超时或服务器错误：稍后重试
- 需要登录验证的页面（verify page）：无法通过工具读取，改为手动复制内容后粘贴给 AI
- 黑名单 URL：该地址被系统拦截，无法访问


### 图片审核失败

**HTTP 500**

```
image_url:moderation request error: 非法输入
image_url:Post "https://api.msh.team/v1/moderations": context deadline exceeded
```

AI 在处理图片时，图片内容审核服务返回错误或超时。

**处理方式：**
- `非法输入`：图片内容触发了内容审核，请确认图片符合使用规范
- 超时：稍后重试，或检查网络连接是否正常


### URL 安全风险拦截

**HTTP 403**

```
(security_risk) We consider the current URL poses a security risk and are unable to provide fetch service at this time.
```

工具调用中传入的 URL 被判定为安全风险，服务端拒绝抓取。

**处理方式：**
- 内网地址（如 `192.168.x.x`、`10.x.x.x`）及已知风险域名会被拦截
- 需要登录才能访问的页面无法通过工具调用抓取


### URL 格式无效

**HTTP 400**

```
(invalid_url) The provided URL is invalid: parse "https://the repo for the contents of the path": invalid character " " in host name
(invalid_url) The provided URL is invalid: missing scheme
```

模型将自然语言描述或格式有误的字符串作为 URL 传给工具，通常是描述性文字被当成地址传入，或缺少协议头。

**处理方式：**
- 确认传入的是真实可访问的 URL，不是对 URL 的文字描述
- 协议头（`http://` 或 `https://`）不可省略


## 未覆盖的错误类型

如以上条目未能覆盖你遇到的报错，请通过邮箱反馈 [code@moonshot.ai](mailto:code@moonshot.ai)，并附上完整的错误消息、Request ID 和请求时间。
