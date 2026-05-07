# Wire 协议

Wire 协议就像是 Kimi Code CLI 的「电话线」——它规定了 Kimi 怎么和外面的世界通话。

你可以把 Kimi 想象成一个聪明的助手，它平时通过终端和你聊天。但有时候，你希望其他程序（比如你自己写的 App、网页界面、IDE 插件）也能和这个助手对话。Wire 协议就是做这件事的：它让外部程序能和 Kimi 进行结构化、双向的通信。

## Wire 是什么

简单来说，Wire 是 Kimi Code CLI 内部的「传声筒」。

当你在终端里和 Kimi 聊天时，你看到的界面（Shell UI）就是通过 Wire 接收 Kimi 的回复，然后显示给你看的。当你把 Kimi 集成到 IDE 里时（通过 ACP），IDE 也是通过 Wire 和 Kimi 的核心大脑通信的。

Wire 模式（`--wire`）就是把这根「电话线」的接口暴露出来，让任何外部程序都能直接拨通 Kimi。比如你可以用 Wire 模式：
- 给自己做一个漂亮的网页版 Kimi 聊天界面
- 把 Kimi 嵌入到你自己的 App 里
- 写自动化测试，检查 Kimi 的行为是否符合预期

```sh
kimi --wire
```

> **什么时候不需要 Wire？**
> 如果你只是想简单地给 Kimi 发一段文字、收一段回复，用 Print 模式（默认模式）就够了。Wire 适合需要「实时双向对话」的场景——比如你要在 Kimi 说话的过程中打断它、追问它，或者你需要看到 Kimi 每一步的思考过程。

---

## Wire 是怎么通话的

Wire 使用一种叫做 **JSON-RPC 2.0** 的格式来传消息。你可以把它理解为一种「标准化便签」：
- 双方都写 JSON 格式的纸条
- 每条纸条占一行（一行就是一个消息）
- 纸条上必须写清楚：你是谁、你想干什么、这件事的编号是什么
- 当前协议版本是 `1.7`

### 便签的三种格式

**第一种：请求（Request）—— 我问你一件事，你要回答我**

```json
{
  "jsonrpc": "2.0",
  "method": "你想调用的功能",
  "id": "这件事的编号",
  "params": { "具体参数": "..." }
}
```

`id` 就像快递单号，我发出去的时候贴一个号，你回复的时候也贴同一个号，这样我就知道哪个回复对应哪个问题了。

**第二种：通知（Notification）—— 我告诉你一件事，你不用回我**

```json
{
  "jsonrpc": "2.0",
  "method": "事件名称",
  "params": { "具体内容": "..." }
}
```

注意，通知没有 `id`，因为它不需要回复。

**第三种：响应（Response）—— 回答别人的请求**

成功时：
```json
{
  "jsonrpc": "2.0",
  "id": "快递单号",
  "result": { "结果": "..." }
}
```

失败时：
```json
{
  "jsonrpc": "2.0",
  "id": "快递单号",
  "error": { "code": 错误码, "message": "错误原因" }
}
```

---

## 双方都能说哪些话

下面列出 Wire 协议里所有的「对话指令」。方向用 **Client → Agent** 表示「外部程序发给 Kimi」，用 **Agent → Client** 表示「Kimi 发给外部程序」。

### `initialize` —— 握手打招呼

- **方向**：Client → Agent
- **类型**：请求（需要回复）

就像两个人打电话先自报家门一样。外部程序启动连接时，先发一条 `initialize`，告诉 Kimi：「我是某某程序，我支持哪些功能，我想用你哪些工具。」Kimi 回复：「你好，我是 Kimi Code CLI，版本多少，我支持这些斜杠命令……」

| 参数 | 含义 |
|------|------|
| `protocol_version` | 协议版本号，比如 `"1.7"` |
| `client` | 你的名字和版本（可选） |
| `external_tools` | 你想注册给 Kimi 用的外部工具列表（可选） |
| `capabilities` | 你支持的能力，比如 `supports_question: true` 表示你能处理弹窗提问 |
| `hooks` | 你想订阅哪些 Hook 事件（可选） |

Kimi 的回复里会告诉你：
- 它的版本
- 有哪些斜杠命令可用
- 你注册的外部工具哪些成功了、哪些失败了
- 它支持哪些 Hook 事件

如果 Kimi 不支持握手（老版本），会返回 `-32601 method not found` 错误，这时外部程序应该自动降级，直接进入无握手模式。

**请求示例**

```json
{"jsonrpc": "2.0", "method": "initialize", "id": "550e8400-e29b-41d4-a716-446655440000", "params": {"protocol_version": "1.7", "client": {"name": "my-ui", "version": "1.0.0"}, "capabilities": {"supports_question": true}, "external_tools": [{"name": "open_in_ide", "description": "Open file in IDE", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}}]}}
```

**成功回复示例**

```json
{"jsonrpc": "2.0", "id": "550e8400-e29b-41d4-a716-446655440000", "result": {"protocol_version": "1.7", "server": {"name": "Kimi Code CLI", "version": "1.14.0"}, "slash_commands": [{"name": "init", "description": "Analyze the codebase ...", "aliases": []}], "capabilities": {"supports_question": true}, "external_tools": {"accepted": ["open_in_ide"], "rejected": []}}}
```

---

### `prompt` —— 让 Kimi 开始干活

- **方向**：Client → Agent
- **类型**：请求（需要回复）

这是最重要的指令。你给 Kimi 发一条 `prompt`，相当于说：「用户问了一个问题，你处理一下。」Kimi 收到后会开始思考、查资料、写代码……整个过程会持续一段时间。在这期间，Kimi 会不断通过 `event` 通知发回进度更新，也会通过 `request` 请求向你确认一些事情。直到 Kimi 完全处理完，才会给 `prompt` 返回最终结果。

| 参数 | 含义 |
|------|------|
| `user_input` | 用户输入的内容，可以是纯文字，也可以是图片/文件等混合内容 |

Kimi 处理完后回复的结果：

| 字段 | 含义 |
|------|------|
| `status` | 完成状态：`finished`（正常完成）、`cancelled`（被取消了）、`max_steps_reached`（步骤太多，自动停了） |
| `steps` | 如果是因为步骤太多停下来的，会告诉你实际执行了多少步 |

**请求示例**

```json
{"jsonrpc": "2.0", "method": "prompt", "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8", "params": {"user_input": "你好"}}
```

**成功回复示例**

```json
{"jsonrpc": "2.0", "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8", "result": {"status": "finished"}}
```

**错误回复示例**

```json
{"jsonrpc": "2.0", "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8", "error": {"code": -32001, "message": "LLM is not set"}}
```

**常见错误码**

| 错误码 | 含义 |
|--------|------|
| `-32000` | 已经有任务在进行中了，等上一个忙完再发 |
| `-32001` | 还没配置 LLM（大语言模型），Kimi 不知道找谁思考 |
| `-32002` | 指定的 LLM 不支持 |
| `-32003` | LLM 服务出错了 |

---

### `replay` —— 回放历史

- **方向**：Client → Agent
- **类型**：请求（需要回复）

让 Kimi 把之前的对话记录重新播放一遍。就像看视频回放一样，Kimi 会按照当时的顺序，把每一个 `event` 和 `request` 重新发给你。注意：回放是只读的，回放过程中出现的 `request`（比如当时的确认请求）你不需要真的回复。

如果没有历史记录，Kimi 会直接告诉你：0 个事件，0 个请求。

**请求示例**

```json
{"jsonrpc": "2.0", "method": "replay", "id": "6ba7b812-9dad-11d1-80b4-00c04fd430c8"}
```

**成功回复示例**

```json
{"jsonrpc": "2.0", "id": "6ba7b812-9dad-11d1-80b4-00c04fd430c8", "result": {"status": "finished", "events": 42, "requests": 3}}
```

---

### `steer` —— 中途插嘴

- **方向**：Client → Agent
- **类型**：请求（需要回复）

想象一下，Kimi 正在埋头干活（一个 `prompt` 任务还没结束），你突然想补充一句：「等等，刚才我说的用 Python 实现。」这时候你就发一条 `steer`。Kimi 会在当前步骤完成后，把你这句追加到上下文里，然后继续下一步。

这和重新发一个 `prompt` 不一样：`prompt` 是开一个新任务，`steer` 是给正在进行的任务「加戏」。

| 参数 | 含义 |
|------|------|
| `user_input` | 你想追加的话 |

如果当前没有任务在进行，会报错：`No agent turn is in progress`。

**请求示例**

```json
{"jsonrpc": "2.0", "method": "steer", "id": "7ca7c810-9dad-11d1-80b4-00c04fd430c8", "params": {"user_input": "用 Python 实现"}}
```

---

### `set_plan_mode` —— 切换计划模式

- **方向**：Client → Agent
- **类型**：请求（需要回复）

控制 Kimi 是否进入「计划模式」。计划模式下，Kimi 会先写一份详细方案给你看，等你点头同意后再动手执行。

这个功能需要提前「打招呼」：你在 `initialize` 时声明 `supports_plan_mode: true`，Kimi 才会给你开这个权限。如果没声明，Kimi 自己都不知道你能处理计划模式，就不会启用相关工具。

计划模式的状态会保存下来，即使重启了也会记住。

| 参数 | 含义 |
|------|------|
| `enabled` | `true` 开启计划模式，`false` 关闭 |

---

### `cancel` —— 取消当前任务

- **方向**：Client → Agent
- **类型**：请求（需要回复）

就像喊「停！」一样。当前正在进行的 `prompt` 或 `replay` 会被中断，已进行的部分返回 `cancelled` 状态。

**请求示例**

```json
{"jsonrpc": "2.0", "method": "cancel", "id": "6ba7b811-9dad-11d1-80b4-00c04fd430c8"}
```

---

### `event` —— Kimi 主动报告进度

- **方向**：Agent → Client
- **类型**：通知（不需要回复）

Kimi 在干活的过程中，会不断发 `event` 告诉你：「我开始干活了」「我正在写代码」「我查到了这个」「我说完这句话了」……这些都是单向广播，你听着就行，不用回。

每条 `event` 包含：
- `type`：事件类型（见下面的消息类型列表）
- `payload`：具体内容

**示例**

```json
{"jsonrpc": "2.0", "method": "event", "params": {"type": "ContentPart", "payload": {"type": "text", "text": "Hello"}}}
```

---

### `request` —— Kimi 有事要问你

- **方向**：Agent → Client
- **类型**：请求（需要回复）

Kimi 干活干到一半，可能需要你帮忙确认一些事情。比如：「我要执行 `rm -rf /`，你同意吗？」或者「我想调用你注册的外部工具 `open_in_ide`，参数是 `README.md`，可以吗？」又或者「我有三个方案，你选哪个？」

这些都必须等你回复后，Kimi 才能继续。如果你不回复，Kim 就会卡在那里等着。

`request` 有三种类型：
- `ApprovalRequest`：审批请求（比如执行危险操作前的确认）
- `ToolCallRequest`：外部工具调用请求
- `QuestionRequest`：结构化问答（弹窗让你选方案）

**审批请求示例**

```json
{"jsonrpc": "2.0", "method": "request", "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "params": {"type": "ApprovalRequest", "payload": {"id": "approval-1", "tool_call_id": "tc-1", "sender": "Shell", "action": "run shell command", "description": "Run command `ls`", "display": []}}}
```

你的回复（同意）：
```json
{"jsonrpc": "2.0", "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "result": {"request_id": "approval-1", "response": "approve"}}
```

**外部工具调用请求示例**

```json
{"jsonrpc": "2.0", "method": "request", "id": "a3bb189e-8bf9-3888-9912-ace4e6543002", "params": {"type": "ToolCallRequest", "payload": {"id": "tc-1", "name": "open_in_ide", "arguments": "{\"path\":\"README.md\"}"}}}
```

你的回复（执行成功）：
```json
{"jsonrpc": "2.0", "id": "a3bb189e-8bf9-3888-9912-ace4e6543002", "result": {"tool_call_id": "tc-1", "return_value": {"is_error": false, "output": "Opened", "message": "Opened README.md in IDE", "display": []}}}
```

---

## 标准错误码

如果 JSON 格式本身有问题，或者调用的方法不存在，会返回 JSON-RPC 2.0 标准错误：

| 错误码 | 含义 |
|--------|------|
| `-32700` | 收到的 JSON 格式是坏的，解析不了 |
| `-32600` | 请求格式不对，比如少了必要字段 |
| `-32601` | 调用的方法不存在（比如老版本不支持 `initialize`） |
| `-32602` | 方法参数传错了 |
| `-32603` | Kimi 内部出错了 |

---

## Kimi 会报告哪些事件

Kimi 通过 `event` 方法发送的各种事件，可以理解为「Kimi 的实时日记」。每个事件都有 `type`（事件名）和 `payload`（具体内容）。

### `TurnBegin` —— 新一轮对话开始

Kimi 收到用户输入，准备开始处理。`payload` 里包含用户说了什么。

### `TurnEnd` —— 这一轮干完了

所有事情都处理完毕，这一轮对话结束。如果中途被取消了，这个事件可能不会发出来。

### `StepBegin` —— 开始第 N 步

Kimi 把一个大任务拆成很多小步骤，每开始一个新步骤就发一次。`payload` 里有步骤编号 `n`，从 1 开始。

### `StepInterrupted` —— 步骤被打断了

某个步骤还没做完就被中断了（比如用户喊停）。

### `CompactionBegin` / `CompactionEnd` —— 上下文压缩

Kimi 的「大脑」容量有限（上下文长度限制）。当对话太长时，Kimi 会自动把之前的记忆压缩成摘要，腾出空间。压缩开始和结束各发一个事件。

### `StatusUpdate` —— 状态更新

Kimi 定期汇报自己的「身体状况」：

| 字段 | 含义 |
|------|------|
| `context_usage` | 大脑用了百分之几（0 到 1 之间） |
| `context_tokens` | 当前记了多少个 token |
| `max_context_tokens` | 大脑最多能记多少个 token |
| `token_usage` | 当前步骤的 token 用量统计 |
| `message_id` | 当前步骤的消息 ID |
| `plan_mode` | 计划模式是否开启 |

### `ContentPart` —— Kimi 说的话

Kimi 的回复可能由多种内容组成：文字、思考过程、图片、音频、视频。每种内容都是一个 `ContentPart`。

| 类型 | 含义 |
|------|------|
| `text` | 普通文字 |
| `think` | Kimi 的思考过程（内部独白） |
| `image_url` | 图片链接（可以是网络地址，也可以是 base64 编码的 data URI） |
| `audio_url` | 音频链接 |
| `video_url` | 视频链接 |

### `ToolCall` —— Kimi 决定调用某个工具

Kimi 想执行一个操作（比如读文件、运行命令、搜索网页），就会发一个 `ToolCall` 事件，告诉你它想调用什么工具、传什么参数。

| 字段 | 含义 |
|------|------|
| `id` | 这次工具调用的唯一编号 |
| `name` | 工具名称 |
| `arguments` | 参数（JSON 字符串） |

### `ToolCallPart` —— 工具参数的片段

如果工具参数很长，Kimi 可能会分多次发送，每次发一小段。这种情况很少见。

### `ToolResult` —— 工具执行完毕

工具跑完了，结果发回来。包含：

| 字段 | 含义 |
|------|------|
| `tool_call_id` | 对应哪次 `ToolCall` |
| `is_error` | 是否出错 |
| `output` | 返回给 Kimi 的原始输出 |
| `message` | 给 Kimi 看的解释性消息 |
| `display` | 展示给用户看的内容块（比如代码 diff、待办列表） |

### `ApprovalResponse` —— 审批结果

用户（或外部程序）对某个审批请求作出了回应：同意、拒绝、还是本会话都同意。

| 结果 | 含义 |
|------|------|
| `approve` | 同意这次操作 |
| `approve_for_session` | 同意，而且以后同类的都不问了 |
| `reject` | 拒绝，可以附带反馈告诉 Kimi 为什么 |

### `SubagentEvent` —— 子 Agent 的动静

当 Kimi 派了一个「小弟」（子 Agent）去干活时，小弟那边发生的一切都会通过这个事件传回来。包含：
- 是哪个小弟（`agent_id`）
- 小弟是什么类型的（`subagent_type`）
- 小弟具体发了什么事件（嵌套的 `event`）

### `SteerInput` —— 用户中途追加输入

当用户通过 `steer` 插了一句话后，Kimi 会在当前步骤完成后、下一步开始前发这个事件，确认已经把追加的话加入了上下文。

### `PlanDisplay` —— 计划方案展示

在计划模式下，Kimi 写好了方案要给你看。`payload` 包含：
- `content`：方案的完整 Markdown 内容
- `file_path`：方案文件保存在哪

### `HookTriggered` —— Hook 开始执行

某个 Hook 被触发并开始运行了。告诉你：
- 是什么类型的事件触发的（`event`）
- 目标是谁（`target`，比如某个工具名）
- 有多少个匹配的 Hook 在并行跑（`hook_count`）

### `HookResolved` —— Hook 执行完毕

Hook 跑完了，结果是放行还是拦截：
- `action: allow` —— 放行，继续执行
- `action: block` —— 拦截，停在这里
- `reason` —— 如果拦截了，原因是什么
- `duration_ms` —— 花了多少毫秒

---

## Kimi 会向你要哪些确认

### `ApprovalRequest` —— 请你点头

Kimi 要做一件可能需要你同意的事（比如运行 Shell 命令、删除文件）。你必须回复 `approve`、`approve_for_session` 或 `reject`。

| 字段 | 含义 |
|------|------|
| `id` | 请求编号 |
| `tool_call_id` | 关联的工具调用编号 |
| `sender` | 谁发起的（比如 "Shell"） |
| `action` | 操作类型 |
| `description` | 具体描述 |
| `display` | 展示给用户的内容 |
| `source_kind` | 来自前台还是后台 Agent |
| `source_id` | 来源标识 |
| `agent_id` | 如果是子 Agent 发起的，子 Agent 的 ID |
| `subagent_type` | 子 Agent 的类型 |
| `source_description` | 可读的来源描述 |

### `ToolCallRequest` —— 调用你的外部工具

Kimi 想调用你在 `initialize` 时注册的外部工具。你需要执行这个工具，然后把结果返回。

| 字段 | 含义 |
|------|------|
| `id` | 工具调用编号 |
| `name` | 工具名称 |
| `arguments` | 参数（JSON 字符串） |

你的回复格式是 `ToolResult`（见上面 `ToolResult` 事件的说明）。

### `QuestionRequest` —— 弹窗让你选

Kimi 有几个方案拿不定主意，想让你选。这个功能需要你在 `initialize` 时声明 `supports_question: true`，否则 Kimi 不会用这个工具。

| 字段 | 含义 |
|------|------|
| `id` | 请求编号 |
| `tool_call_id` | 关联的工具调用编号 |
| `questions` | 问题列表（1 到 4 个） |
| `questions[].question` | 问题文本 |
| `questions[].header` | 短标签 |
| `questions[].options` | 选项（2 到 4 个） |
| `questions[].multi_select` | 是否允许多选 |

每个选项有 `label`（标签）和 `description`（说明）。

**请求示例**

```json
{"jsonrpc": "2.0", "method": "request", "id": "b1a2c3d4-e5f6-7890-abcd-ef1234567890", "params": {"type": "QuestionRequest", "payload": {"id": "q-1", "tool_call_id": "tc-1", "questions": [{"question": "Which language should I use?", "header": "Lang", "options": [{"label": "Python", "description": "Widely used, large ecosystem"}, {"label": "Rust", "description": "High performance, memory safe"}], "multi_select": false}]}}}
```

你的回复：
```json
{"jsonrpc": "2.0", "id": "b1a2c3d4-e5f6-7890-abcd-ef1234567890", "result": {"request_id": "q-1", "answers": {"Which language should I use?": "Python"}}}
```

如果用户不想回答或者你的程序不支持，可以返回空的 `answers`：
```json
{"jsonrpc": "2.0", "id": "b1a2c3d4-e5f6-7890-abcd-ef1234567890", "result": {"request_id": "q-1", "answers": {}}}
```

### `HookRequest` —— Hook 处理请求

如果你订阅了某个 Hook 事件，当事件触发时，Kimi 会把处理权交给你，让你决定是否放行。

| 字段 | 含义 |
|------|------|
| `id` | 请求编号 |
| `subscription_id` | 你的订阅编号 |
| `event` | 事件类型 |
| `target` | 目标（工具名或 Agent 名） |
| `input_data` | 完整的事件数据 |

你的回复：
```json
{
  "request_id": "请求编号",
  "action": "allow" | "block",
  "reason": "原因说明"
}
```

---

## 展示给用户看的内容块

Kimi 返回的结果里，有时候需要展示一些特殊格式的内容给用户，这些内容封装在 `DisplayBlock` 里。

| 类型 | 用途 |
|------|------|
| `brief` | 简短文字摘要 |
| `diff` | 代码差异对比（包含文件路径、旧内容、新内容） |
| `todo` | 待办事项列表（每个事项有标题和状态：`pending`、`in_progress`、`done`） |
| `shell` | Shell 命令相关的展示 |
