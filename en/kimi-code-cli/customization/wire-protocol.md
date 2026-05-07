# Wire Protocol

The Wire Protocol is like Kimi Code CLI's **"telephone wire"** — it defines how Kimi talks to the outside world.

Think of Kimi as a smart assistant that normally chats with you through the terminal. But sometimes, you want other programs (like your own app, a web interface, or an IDE plugin) to talk to this assistant too. The Wire Protocol makes that happen: it lets external programs have structured, two-way conversations with Kimi.

## What is Wire

Simply put, Wire is the **"relay"** inside Kimi Code CLI.

When you chat with Kimi in the terminal, the interface you see (the Shell UI) receives Kimi's replies through Wire and shows them to you. When you integrate Kimi into an IDE (via ACP), the IDE also talks to Kimi's core brain through Wire.

Wire mode (`--wire`) exposes this "telephone wire" so any external program can dial Kimi directly. With Wire mode, you can:

- Build a pretty web-based chat interface for Kimi
- Embed Kimi into your own app
- Write automated tests to check if Kimi behaves as expected

```sh
kimi --wire
```

> **When do you NOT need Wire?**
> If you just want to send Kimi some text and get a simple reply, Print mode (the default) is enough. Wire is for scenarios that need **real-time two-way conversation** — like interrupting Kimi while it's speaking, asking follow-up questions, or watching Kimi's thought process step by step.

---

## How Wire Talks

Wire uses a format called **JSON-RPC 2.0** to pass messages. You can think of it as a **"standardized sticky note"**:

- Both sides write notes in JSON format
- Each note takes exactly one line (one line = one message)
- Every note must say: who you are, what you want, and what tracking number this message has
- The current protocol version is `1.7`

Here are the base building blocks:

```typescript
/** JSON-RPC 2.0 request message base structure */
interface JSONRPCRequest<Method extends string, Params> {
  jsonrpc: "2.0"
  method: Method
  id: string
  params: Params
}

/** JSON-RPC 2.0 notification message (no id, no response needed) */
interface JSONRPCNotification<Method extends string, Params> {
  jsonrpc: "2.0"
  method: Method
  params: Params
}

/** JSON-RPC 2.0 success response */
interface JSONRPCSuccessResponse<Result> {
  jsonrpc: "2.0"
  id: string
  result: Result
}

/** JSON-RPC 2.0 error response */
interface JSONRPCErrorResponse {
  jsonrpc: "2.0"
  id: string
  error: JSONRPCError
}

interface JSONRPCError {
  code: number
  message: string
  data?: unknown
}
```

### Three Sticky Note Formats

**Format 1: Request — I ask you something, you must answer me**

```json
{
  "jsonrpc": "2.0",
  "method": "the feature you want to call",
  "id": "tracking number for this message",
  "params": { "specific parameter": "..." }
}
```

The `id` is like a **tracking number** on a package. When I send it out, I stick a number on it; when you reply, you stick the same number on your reply, so I know which answer goes with which question.

**Format 2: Notification — I tell you something, you don't need to reply**

```json
{
  "jsonrpc": "2.0",
  "method": "event name",
  "params": { "specific content": "..." }
}
```

Notice: notifications have no `id`, because they don't need a reply.

**Format 3: Response — Answering someone else's request**

When successful:
```json
{
  "jsonrpc": "2.0",
  "id": "tracking number",
  "result": { "result": "..." }
}
```

When it fails:
```json
{
  "jsonrpc": "2.0",
  "id": "tracking number",
  "error": { "code": error code, "message": "reason for error" }
}
```

---

## What Both Sides Can Say

Below is a complete list of all the "conversation commands" in the Wire Protocol. **Client → Agent** means "external program sends to Kimi", and **Agent → Client** means "Kimi sends to external program".

### `initialize` —— Handshake

- **Direction**: Client → Agent
- **Type**: Request (needs a response)

Like two people introducing themselves on a phone call. When the external program starts the connection, it sends an `initialize` first, telling Kimi: "I am such-and-such program, I support these features, and here are the tools I want to register for you." Kimi replies: "Hello, I am Kimi Code CLI, version X, and here are the slash commands I support..."

```typescript
/** initialize request parameters */
interface InitializeParams {
  /** Protocol version */
  protocol_version: string
  /** Client info, optional */
  client?: ClientInfo
  /** External tool definitions, optional */
  external_tools?: ExternalTool[]
  /** Client capabilities, optional */
  capabilities?: ClientCapabilities
  /** Hook subscriptions, optional. Declares hook events the client wants to handle */
  hooks?: WireHookSubscription[]
}

interface ClientCapabilities {
  /** Whether the client can handle QuestionRequest messages */
  supports_question?: boolean
  /** Whether the client supports plan mode */
  supports_plan_mode?: boolean
}

interface WireHookSubscription {
  /** Subscription ID, referenced in HookRequest */
  id: string
  /** Event type to subscribe to, e.g., 'PreToolUse', 'Stop' */
  event: string
  /** Regex filter, empty string matches all */
  matcher?: string
  /** Timeout for client response in seconds, default 30 */
  timeout?: number
}

interface ClientInfo {
  name: string
  version?: string
}

interface ExternalTool {
  /** Tool name, must not conflict with built-in tools */
  name: string
  /** Tool description */
  description: string
  /** Parameter definition in JSON Schema format */
  parameters: JSONSchema
}

/** initialize response result */
interface InitializeResult {
  /** Protocol version */
  protocol_version: string
  /** Server info */
  server: ServerInfo
  /** Available slash commands */
  slash_commands: SlashCommandInfo[]
  /** External tool registration result, only returned when request includes external_tools */
  external_tools?: ExternalToolsResult
  /** Server capabilities */
  capabilities?: ServerCapabilities
  /** Hook system info, optional */
  hooks?: HooksInfo
}

interface HooksInfo {
  /** List of all hook event types supported by the server */
  supported_events: string[]
  /** Currently configured hooks statistics, key is event type, value is count */
  configured: Record<string, number>
}

interface ServerCapabilities {
  /** Whether the server supports sending QuestionRequest messages */
  supports_question?: boolean
}

interface ServerInfo {
  name: string
  version: string
}

interface SlashCommandInfo {
  name: string
  description: string
  aliases: string[]
}

interface ExternalToolsResult {
  /** Successfully registered tool names */
  accepted: string[]
  /** Failed tool registrations with reasons */
  rejected: Array<{ name: string; reason: string }>
}
```

Kimi's reply tells you:
- Its version
- What slash commands are available
- Which of your registered external tools succeeded and which failed
- What hook events it supports

If Kimi doesn't support handshakes (older versions), it returns a `-32601 method not found` error. In that case, the external program should automatically fall back to no-handshake mode.

**Request example**

```json
{"jsonrpc": "2.0", "method": "initialize", "id": "550e8400-e29b-41d4-a716-446655440000", "params": {"protocol_version": "1.7", "client": {"name": "my-ui", "version": "1.0.0"}, "capabilities": {"supports_question": true}, "external_tools": [{"name": "open_in_ide", "description": "Open file in IDE", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}}]}}
```

**Success response example**

```json
{"jsonrpc": "2.0", "id": "550e8400-e29b-41d4-a716-446655440000", "result": {"protocol_version": "1.7", "server": {"name": "Kimi Code CLI", "version": "1.14.0"}, "slash_commands": [{"name": "init", "description": "Analyze the codebase ...", "aliases": []}], "capabilities": {"supports_question": true}, "external_tools": {"accepted": ["open_in_ide"], "rejected": []}}}
```

---

### `prompt` —— Tell Kimi to Start Working

- **Direction**: Client → Agent
- **Type**: Request (needs a response)

This is the most important command. Sending a `prompt` to Kimi is like saying: "The user asked a question, please handle it." Kimi starts thinking, looking up information, writing code... The whole process takes a while. During this time, Kimi keeps sending `event` notifications with progress updates, and also sends `request` messages to ask you to confirm certain things. Only when Kimi is completely done will it return the final result for the `prompt`.

```typescript
/** prompt request parameters */
interface PromptParams {
  /** User input, can be plain text or array of content parts */
  user_input: string | ContentPart[]
}

/** prompt response result */
interface PromptResult {
  /** Turn end status */
  status: "finished" | "cancelled" | "max_steps_reached"
  /** Number of steps executed when status is max_steps_reached */
  steps?: number
}
```

When Kimi finishes, the result fields mean:

| Field | Meaning |
|-------|---------|
| `status` | Completion status: `finished` (normal completion), `cancelled` (was cancelled), `max_steps_reached` (too many steps, stopped automatically) |
| `steps` | If stopped because of too many steps, tells you how many steps were actually executed |

**Request example**

```json
{"jsonrpc": "2.0", "method": "prompt", "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8", "params": {"user_input": "Hello"}}
```

**Success response example**

```json
{"jsonrpc": "2.0", "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8", "result": {"status": "finished"}}
```

**Error response example**

```json
{"jsonrpc": "2.0", "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8", "error": {"code": -32001, "message": "LLM is not set"}}
```

**Common error codes**

| Error code | Meaning |
|------------|---------|
| `-32000` | A task is already running; wait for the previous one to finish before sending another |
| `-32001` | LLM (large language model) not configured yet — Kimi doesn't know who to ask for thinking |
| `-32002` | The specified LLM is not supported |
| `-32003` | LLM service error |

---

### `replay` —— Playback History

- **Direction**: Client → Agent
- **Type**: Request (needs a response)

Ask Kimi to replay the previous conversation history. Like watching a video replay, Kimi re-sends every `event` and `request` in the original order. Note: replay is read-only; any `request` messages that appear during replay (like confirmation requests from back then) do not need real replies.

If there is no history, Kimi simply tells you: 0 events, 0 requests.

```typescript
/** replay request has no parameters, params can be empty object or omitted */
type ReplayParams = Record<string, never>

/** replay response result */
interface ReplayResult {
  /** Replay end status */
  status: "finished" | "cancelled"
  /** Number of replayed events */
  events: number
  /** Number of replayed requests */
  requests: number
}
```

**Request example**

```json
{"jsonrpc": "2.0", "method": "replay", "id": "6ba7b812-9dad-11d1-80b4-00c04fd430c8"}
```

**Success response example**

```json
{"jsonrpc": "2.0", "id": "6ba7b812-9dad-11d1-80b4-00c04fd430c8", "result": {"status": "finished", "events": 42, "requests": 3}}
```

---

### `steer` —— Chime In Midway

- **Direction**: Client → Agent
- **Type**: Request (needs a response)

Imagine Kimi is busy working (a `prompt` task hasn't finished yet), and you suddenly want to add: "Wait, what I just said should be implemented in Python." You send a `steer` message. Kimi will append your words to the context after the current step finishes, then continue to the next step.

This is different from sending another `prompt`: `prompt` starts a brand new task, while `steer` is "adding a line" to the task already in progress.

```typescript
/** steer request parameters */
interface SteerParams {
  /** User input, can be plain text or array of content parts */
  user_input: string | ContentPart[]
}

/** steer response result */
interface SteerResult {
  /** Fixed as "steered" */
  status: "steered"
}
```

If there is no task currently running, an error is returned: `No agent turn is in progress`.

**Request example**

```json
{"jsonrpc": "2.0", "method": "steer", "id": "7ca7c810-9dad-11d1-80b4-00c04fd430c8", "params": {"user_input": "Use Python"}}
```

**Success response example**

```json
{"jsonrpc": "2.0", "id": "7ca7c810-9dad-11d1-80b4-00c04fd430c8", "result": {"status": "steered"}}
```

**Error response example**

If no turn is in progress:

```json
{"jsonrpc": "2.0", "id": "7ca7c810-9dad-11d1-80b4-00c04fd430c8", "error": {"code": -32000, "message": "No agent turn is in progress"}}
```

---

### `set_plan_mode` —— Switch Plan Mode

- **Direction**: Client → Agent
- **Type**: Request (needs a response)

Control whether Kimi enters "plan mode." In plan mode, Kimi first writes a detailed plan for you to review, and only starts working after you give the thumbs-up.

This feature needs advance "notice": you must declare `supports_plan_mode: true` during `initialize`, or Kimi won't even know your program can handle plan mode, and won't enable the related tools.

Plan mode state is saved, so it survives restarts.

```typescript
/** set_plan_mode request parameters */
interface SetPlanModeParams {
  /** Whether to enable plan mode */
  enabled: boolean
}

/** set_plan_mode response result */
interface SetPlanModeResult {
  /** Fixed as "ok" */
  status: "ok"
  /** Plan mode state after the call */
  plan_mode: boolean
}
```

**Request example**

```json
{"jsonrpc": "2.0", "method": "set_plan_mode", "id": "8da7d810-9dad-11d1-80b4-00c04fd430c8", "params": {"enabled": true}}
```

**Success response example**

```json
{"jsonrpc": "2.0", "id": "8da7d810-9dad-11d1-80b4-00c04fd430c8", "result": {"status": "ok", "plan_mode": true}}
```

**Error response example**

If plan mode is not supported in the current environment:

```json
{"jsonrpc": "2.0", "id": "8da7d810-9dad-11d1-80b4-00c04fd430c8", "error": {"code": -32000, "message": "Plan mode is not supported"}}
```

---

### `cancel` —— Cancel the Current Task

- **Direction**: Client → Agent
- **Type**: Request (needs a response)

Like shouting "Stop!" The currently running `prompt` or `replay` gets interrupted, and the part already completed returns with a `cancelled` status.

```typescript
/** cancel request has no parameters, params can be empty object or omitted */
type CancelParams = Record<string, never>

/** cancel response result is empty object */
type CancelResult = Record<string, never>
```

**Request example**

```json
{"jsonrpc": "2.0", "method": "cancel", "id": "6ba7b811-9dad-11d1-80b4-00c04fd430c8"}
```

**Success response example**

```json
{"jsonrpc": "2.0", "id": "6ba7b811-9dad-11d1-80b4-00c04fd430c8", "result": {}}
```

**Error response example**

If no turn is in progress:

```json
{"jsonrpc": "2.0", "id": "6ba7b811-9dad-11d1-80b4-00c04fd430c8", "error": {"code": -32000, "message": "No agent turn is in progress"}}
```

---

### `event` —— Kimi Reports Progress

- **Direction**: Agent → Client
- **Type**: Notification (no response needed)

While Kimi is working, it keeps sending `event` messages telling you: "I've started working," "I'm writing code now," "I found this," "I've finished saying this..." These are one-way broadcasts — you just listen, no need to reply.

Each `event` contains:
- `type`: the event type (see the event type list below)
- `payload`: the specific content

```typescript
/** event notification parameters, contains serialized Wire message */
interface EventParams {
  type: string
  payload: object
}
```

**Example**

```json
{"jsonrpc": "2.0", "method": "event", "params": {"type": "ContentPart", "payload": {"type": "text", "text": "Hello"}}}
```

---

### `request` —— Kimi Has Something to Ask You

- **Direction**: Agent → Client
- **Type**: Request (needs a response)

While working, Kimi may need your help to confirm some things. For example: "I'm about to run `rm -rf /`, do you agree?" Or: "I want to call your registered external tool `open_in_ide` with parameter `README.md`, is that okay?" Or: "I have three options, which one do you choose?"

All of these must wait for your reply before Kimi can continue. If you don't reply, Kimi just stands there waiting.

`request` has three types:
- `ApprovalRequest`: approval request (like confirming before a dangerous operation)
- `ToolCallRequest`: external tool call request
- `QuestionRequest`: structured question (a popup asking you to choose a plan)

```typescript
/** request parameters, contains serialized Wire message */
interface RequestParams {
  type: "ApprovalRequest" | "ToolCallRequest" | "QuestionRequest"
  payload: ApprovalRequest | ToolCallRequest | QuestionRequest
}
```

**Approval request example**

```json
{"jsonrpc": "2.0", "method": "request", "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "params": {"type": "ApprovalRequest", "payload": {"id": "approval-1", "tool_call_id": "tc-1", "sender": "Shell", "action": "run shell command", "description": "Run command `ls`", "display": []}}}
```

Your reply (approve):
```json
{"jsonrpc": "2.0", "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "result": {"request_id": "approval-1", "response": "approve"}}
```

**External tool call request example**

```json
{"jsonrpc": "2.0", "method": "request", "id": "a3bb189e-8bf9-3888-9912-ace4e6543002", "params": {"type": "ToolCallRequest", "payload": {"id": "tc-1", "name": "open_in_ide", "arguments": "{\"path\":\"README.md\"}"}}}
```

Your reply (success):
```json
{"jsonrpc": "2.0", "id": "a3bb189e-8bf9-3888-9912-ace4e6543002", "result": {"tool_call_id": "tc-1", "return_value": {"is_error": false, "output": "Opened", "message": "Opened README.md in IDE", "display": []}}}
```

---

## Standard Error Codes

If the JSON format itself is broken, or the method called doesn't exist, JSON-RPC 2.0 standard errors are returned:

| Error code | Meaning |
|------------|---------|
| `-32700` | The received JSON is broken and can't be parsed |
| `-32600` | The request format is wrong, like missing required fields |
| `-32601` | The method called doesn't exist (for example, older versions don't support `initialize`) |
| `-32602` | The method parameters are wrong |
| `-32603` | Kimi had an internal error |

---

## Events Kimi Reports

The various events Kimi sends through the `event` method can be understood as **"Kimi's live diary."** Each event has a `type` (event name) and `payload` (specific content).

```typescript
/** Union type of all Wire messages */
type WireMessage = Event | Request

/** Events: sent via event method, no response needed */
type Event =
  | TurnBegin
  | TurnEnd
  | StepBegin
  | StepInterrupted
  | CompactionBegin
  | CompactionEnd
  | StatusUpdate
  | ContentPart
  | ToolCall
  | ToolCallPart
  | ToolResult
  | ApprovalResponse
  | SubagentEvent
  | SteerInput
  | PlanDisplay
  | HookTriggered
  | HookResolved

/** Requests: sent via request method, require response */
type Request = ApprovalRequest | ToolCallRequest | QuestionRequest | HookRequest
```

### `TurnBegin` —— A New Turn Starts

Kimi received user input and is getting ready to process it. The `payload` contains what the user said.

```typescript
interface TurnBegin {
  /** User input, can be plain text or array of content parts */
  user_input: string | ContentPart[]
}
```

### `TurnEnd` —— This Turn is Done

Everything has been handled, this turn is over. If cancelled midway, this event might not be sent.

```typescript
interface TurnEnd {
  // No additional fields
}
```

### `StepBegin` —— Starting Step N

Kimi breaks a big task into many small steps, and sends this event every time a new step starts. The `payload` contains the step number `n`, starting from 1.

```typescript
interface StepBegin {
  /** Step number, starting from 1 */
  n: number
}
```

### `StepInterrupted` —— Step Was Interrupted

A step was interrupted before it finished (for example, the user shouted "stop"). No additional fields.

### `CompactionBegin` / `CompactionEnd` —— Context Compression

Kimi's "brain" has limited capacity (context length limit). When the conversation gets too long, Kimi automatically compresses previous memories into a summary to free up space. A `CompactionBegin` event is sent when compression starts, and a `CompactionEnd` event is sent when it's done.

### `StatusUpdate` —— Status Update

Kimi regularly reports its "health status":

```typescript
interface StatusUpdate {
  /** Context usage ratio, float between 0-1, may be absent in JSON */
  context_usage?: number | null
  /** Number of tokens currently in the context, may be absent in JSON */
  context_tokens?: number | null
  /** Maximum number of tokens the context can hold, may be absent in JSON */
  max_context_tokens?: number | null
  /** Token usage stats for current step, may be absent in JSON */
  token_usage?: TokenUsage | null
  /** Message ID for current step, may be absent in JSON */
  message_id?: string | null
  /** Whether plan mode is active, null means no change, may be absent in JSON */
  plan_mode?: boolean | null
}

interface TokenUsage {
  /** Input tokens excluding input_cache_read and input_cache_creation */
  input_other: number
  /** Total output tokens */
  output: number
  /** Cached input tokens */
  input_cache_read: number
  /** Input tokens used for cache creation, currently only Anthropic API supports this field */
  input_cache_creation: number
}
```

| Field | Meaning |
|-------|---------|
| `context_usage` | How full the brain is, as a percentage (between 0 and 1) |
| `context_tokens` | How many tokens are currently remembered |
| `max_context_tokens` | The maximum number of tokens the brain can hold |
| `token_usage` | Token usage statistics for the current step |
| `message_id` | Message ID for the current step |
| `plan_mode` | Whether plan mode is on |

### `ContentPart` —— What Kimi Says

Kimi's reply can be made up of many types of content: text, thinking process, images, audio, video. Each piece of content is a `ContentPart`.

```typescript
type ContentPart =
  | TextPart
  | ThinkPart
  | ImageURLPart
  | AudioURLPart
  | VideoURLPart

interface TextPart {
  type: "text"
  /** Text content */
  text: string
}

interface ThinkPart {
  type: "think"
  /** Thinking content */
  think: string
  /** Encrypted thinking content or signature, may be absent in JSON */
  encrypted?: string | null
}

interface ImageURLPart {
  type: "image_url"
  image_url: {
    /** Image URL, can be data URI (e.g., data:image/png;base64,...) */
    url: string
    /** Image ID for distinguishing different images, may be absent in JSON */
    id?: string | null
  }
}

interface AudioURLPart {
  type: "audio_url"
  audio_url: {
    /** Audio URL, can be data URI (e.g., data:audio/aac;base64,...) */
    url: string
    /** Audio ID for distinguishing different audio, may be absent in JSON */
    id?: string | null
  }
}

interface VideoURLPart {
  type: "video_url"
  video_url: {
    /** Video URL, can be data URI (e.g., data:video/mp4;base64,...) */
    url: string
    /** Video ID for distinguishing different video, may be absent in JSON */
    id?: string | null
  }
}
```

| Type | Meaning |
|------|---------|
| `text` | Plain text |
| `think` | Kimi's thinking process (internal monologue) |
| `image_url` | Image link (can be a web address or a base64-encoded data URI) |
| `audio_url` | Audio link |
| `video_url` | Video link |

### `ToolCall` —— Kimi Decides to Call a Tool

When Kimi wants to perform an action (like reading a file, running a command, or searching the web), it sends a `ToolCall` event telling you which tool it wants to call and what parameters to pass.

```typescript
interface ToolCall {
  /** Fixed as "function" */
  type: "function"
  /** Tool call ID */
  id: string
  function: {
    /** Tool name */
    name: string
    /** JSON-format argument string, may be absent in JSON */
    arguments?: string | null
  }
  /** Extra info, may be absent in JSON */
  extras?: object | null
}
```

| Field | Meaning |
|-------|---------|
| `id` | Unique ID for this tool call |
| `name` | Tool name |
| `arguments` | Parameters (JSON string) |

### `ToolCallPart` —— Fragment of Tool Arguments

If the tool arguments are very long, Kimi might send them in multiple pieces, a little bit at a time. This situation is rare.

```typescript
interface ToolCallPart {
  /** Argument fragment for streaming tool call arguments, may be absent in JSON */
  arguments_part?: string | null
}
```

### `ToolResult` —— Tool Finished Running

The tool has finished, and the result is sent back. It contains:

```typescript
interface ToolResult {
  /** Corresponding tool call ID */
  tool_call_id: string
  return_value: ToolReturnValue
}

interface ToolReturnValue {
  /** Whether this is an error */
  is_error: boolean
  /** Output content returned to model */
  output: string | ContentPart[]
  /** Explanatory message for model */
  message: string
  /** Display blocks shown to user */
  display: DisplayBlock[]
  /** Extra debug info, may be absent in JSON */
  extras?: object | null
}
```

| Field | Meaning |
|-------|---------|
| `tool_call_id` | Which `ToolCall` this result belongs to |
| `is_error` | Whether an error occurred |
| `output` | Raw output returned to Kimi |
| `message` | Explanatory message for Kimi to read |
| `display` | Content blocks shown to the user (like code diffs or todo lists) |

### `ApprovalResponse` —— Approval Result

The user (or external program) responded to an approval request: approve, reject, or approve for the whole session.

```typescript
interface ApprovalResponse {
  /** Approval request ID */
  request_id: string
  /** Approval result */
  response: "approve" | "approve_for_session" | "reject"
  /** Optional feedback text when rejecting, may be absent in JSON */
  feedback?: string
}
```

| Result | Meaning |
|--------|---------|
| `approve` | Approve this operation |
| `approve_for_session` | Approve, and don't ask again for similar operations this session |
| `reject` | Reject; you can attach feedback to tell Kimi why |

### `SubagentEvent` —— Sub-Agent Activity

When Kimi sends a "minion" (a sub-agent) to do work, everything that happens on the minion's side is passed back through this event. It contains:
- Which minion it is (`agent_id`)
- What type of minion it is (`subagent_type`)
- What specific event the minion sent (nested `event`)

```typescript
interface SubagentEvent {
  /** Associated parent Agent tool call ID, may be absent in JSON */
  parent_tool_call_id?: string | null
  /** Subagent instance ID, may be absent in JSON */
  agent_id?: string | null
  /** Built-in subagent type used by this instance, may be absent in JSON */
  subagent_type?: string | null
  /** Event from subagent, nested Wire message format */
  event: { type: string; payload: object }
}
```

### `SteerInput` —— User Added Input Midway

When the user sends a `steer` message, Kimi sends this event after the current step finishes and before the next step begins, confirming that the added input has been incorporated into the context.

```typescript
interface SteerInput {
  /** User input, can be plain text or array of content parts */
  user_input: string | ContentPart[]
}
```

### `PlanDisplay` —— Plan Display

In plan mode, Kimi has written a plan and wants to show it to you. The `payload` contains:
- `content`: the full Markdown content of the plan
- `file_path`: where the plan file is saved

```typescript
interface PlanDisplay {
  /** Full markdown content of the plan */
  content: string
  /** Path to the plan file */
  file_path: string
}
```

### `HookTriggered` —— Hook Started Running

A hook was triggered and started executing. It tells you:
- What type of event triggered it (`event`)
- Who the target is (`target`, like a specific tool name)
- How many matching hooks are running in parallel (`hook_count`)

```typescript
interface HookTriggered {
  /** Hook event type, e.g., 'PreToolUse', 'Stop' */
  event: string
  /** Target of the hook: tool name for tool hooks, agent name for subagent hooks, etc. */
  target: string
  /** Number of matched hooks running in parallel */
  hook_count: number
}
```

### `HookResolved` —— Hook Finished Running

The hook has finished. The result is either allow or block:
- `action: allow` — let it through, continue executing
- `action: block` — stop it right here
- `reason` — if blocked, why
- `duration_ms` — how many milliseconds it took

```typescript
interface HookResolved {
  /** Hook event type, e.g., 'PreToolUse', 'Stop' */
  event: string
  /** Same as HookTriggered.target */
  target: string
  /** Aggregate decision: 'block' if any hook blocked, 'allow' otherwise */
  action: "allow" | "block"
  /** Reason for blocking, empty if allowed */
  reason: string
  /** Wall-clock time for the entire batch in milliseconds */
  duration_ms: number
}
```

---

## Confirmations Kimi Asks For

### `ApprovalRequest` —— Please Give the Thumbs-Up

Kimi is about to do something that might need your approval (like running a shell command or deleting a file). You must reply with `approve`, `approve_for_session`, or `reject`.

```typescript
interface ApprovalRequest {
  /** Request ID, used when responding */
  id: string
  /** Associated tool call ID */
  tool_call_id: string
  /** Sender (tool name) */
  sender: string
  /** Action description */
  action: string
  /** Detailed description */
  description: string
  /** Display blocks shown to user, may be absent in JSON, defaults to [] */
  display?: DisplayBlock[]
  /** Where the request originated: foreground turn or background agent, may be absent in JSON */
  source_kind?: "foreground_turn" | "background_agent" | null
  /** Source identifier (e.g. background agent ID), may be absent in JSON */
  source_id?: string | null
  /** Subagent instance ID if from a subagent, may be absent in JSON */
  agent_id?: string | null
  /** Subagent type if from a subagent, may be absent in JSON */
  subagent_type?: string | null
  /** Human-readable source description, may be absent in JSON */
  source_description?: string | null
}
```

| Field | Meaning |
|-------|---------|
| `id` | Request ID |
| `tool_call_id` | Associated tool call ID |
| `sender` | Who initiated it (like "Shell") |
| `action` | Type of action |
| `description` | Specific description |
| `display` | Content shown to the user |
| `source_kind` | From a foreground turn or background agent |
| `source_id` | Source identifier |
| `agent_id` | If from a sub-agent, the sub-agent's ID |
| `subagent_type` | Type of sub-agent |
| `source_description` | Human-readable source description |

**Response format**

The client needs to return `ApprovalResponse` as the response result:

```typescript
interface ApprovalResponse {
  request_id: string
  response: "approve" | "approve_for_session" | "reject"
  /** Optional feedback text when rejecting, may be absent in JSON */
  feedback?: string
}
```

| response | Meaning |
|----------|---------|
| `approve` | Approve this operation |
| `approve_for_session` | Approve similar operations for this session |
| `reject` | Reject the operation; optionally include `feedback` to tell the model what to do instead |

### `ToolCallRequest` —— Call Your External Tool

Kimi wants to call an external tool you registered during `initialize`. You need to execute this tool and return the result.

```typescript
interface ToolCallRequest {
  /** Tool call ID */
  id: string
  /** Tool name */
  name: string
  /** JSON-format argument string, may be absent in JSON */
  arguments?: string | null
}
```

| Field | Meaning |
|-------|---------|
| `id` | Tool call ID |
| `name` | Tool name |
| `arguments` | Parameters (JSON string) |

**Response format**

The client needs to return `ToolResult` as the response result:

```typescript
interface ToolResult {
  tool_call_id: string
  return_value: ToolReturnValue
}
```

### `QuestionRequest` —— Popup Asking You to Choose

Kimi has a few options and can't decide, so it wants you to pick. This feature requires you to declare `supports_question: true` during `initialize`, or Kimi won't use this tool.

```typescript
interface QuestionRequest {
  /** Request ID, used when responding */
  id: string
  /** Associated tool call ID */
  tool_call_id: string
  /** Questions list (1–4 questions) */
  questions: QuestionItem[]
}

interface QuestionItem {
  /** Question text */
  question: string
  /** Short label, max 12 characters */
  header?: string
  /** Available options (2–4) */
  options: QuestionOption[]
  /** Whether multiple options can be selected */
  multi_select?: boolean
}

interface QuestionOption {
  /** Option label */
  label: string
  /** Option description */
  description?: string
}
```

| Field | Meaning |
|-------|---------|
| `id` | Request ID |
| `tool_call_id` | Associated tool call ID |
| `questions` | List of questions (1 to 4) |
| `questions[].question` | Question text |
| `questions[].header` | Short label |
| `questions[].options` | Options (2 to 4) |
| `questions[].multi_select` | Whether multiple selection is allowed |

Each option has a `label` (label) and `description` (description).

**Request example**

```json
{"jsonrpc": "2.0", "method": "request", "id": "b1a2c3d4-e5f6-7890-abcd-ef1234567890", "params": {"type": "QuestionRequest", "payload": {"id": "q-1", "tool_call_id": "tc-1", "questions": [{"question": "Which language should I use?", "header": "Lang", "options": [{"label": "Python", "description": "Widely used, large ecosystem"}, {"label": "Rust", "description": "High performance, memory safe"}], "multi_select": false}]}}}
```

**Response format**

The client needs to return `QuestionResponse` as the response result:

```typescript
interface QuestionResponse {
  /** Corresponding request ID */
  request_id: string
  /** Answer mapping, key is question text, value is selected option label(s) (comma-separated for multi-select) */
  answers: Record<string, string>
}
```

**Response example**

```json
{"jsonrpc": "2.0", "id": "b1a2c3d4-e5f6-7890-abcd-ef1234567890", "result": {"request_id": "q-1", "answers": {"Which language should I use?": "Python"}}}
```

If the user doesn't want to answer or your program doesn't support it, you can return empty `answers`:

```json
{"jsonrpc": "2.0", "id": "b1a2c3d4-e5f6-7890-abcd-ef1234567890", "result": {"request_id": "q-1", "answers": {}}}
```

### `HookRequest` —— Hook Processing Request

If you subscribed to a hook event, when the event triggers, Kimi hands control over to you and lets you decide whether to allow it through.

```typescript
interface HookRequest {
  /** Request ID, used when responding */
  id: string
  /** Subscription ID, identifies which subscription triggered this request */
  subscription_id: string
  /** Hook event type, e.g., 'PreToolUse', 'Stop' */
  event: string
  /** Target that triggered the hook: tool name, agent name, etc. */
  target: string
  /** Complete event payload (same content shell hooks receive from stdin) */
  input_data: object
}
```

| Field | Meaning |
|-------|---------|
| `id` | Request ID |
| `subscription_id` | Your subscription ID |
| `event` | Event type |
| `target` | Target (tool name or agent name) |
| `input_data` | Complete event data |

**Response format**

The client needs to return `HookResponse` as the response result:

```typescript
interface HookResponse {
  /** Corresponding request ID */
  request_id: string
  /** Decision: allow or block */
  action: "allow" | "block"
  /** Reason for blocking */
  reason: string
}
```

Your reply:
```json
{
  "request_id": "request ID",
  "action": "allow" | "block",
  "reason": "explanation"
}
```

---

## Display Blocks

Sometimes Kimi's results need to show special-formatted content to the user. These contents are wrapped in a `DisplayBlock`.

```typescript
type DisplayBlock =
  | UnknownDisplayBlock
  | BriefDisplayBlock
  | DiffDisplayBlock
  | TodoDisplayBlock
  | ShellDisplayBlock

/** Fallback for unrecognized display block types */
interface UnknownDisplayBlock {
  /** Arbitrary type identifier */
  type: string
  /** Raw data */
  data: object
}

interface BriefDisplayBlock {
  type: "brief"
  /** Short text content */
  text: string
}

interface DiffDisplayBlock {
  type: "diff"
  /** File path */
  path: string
  /** Original content */
  old_text: string
  /** New content */
  new_text: string
}

interface TodoDisplayBlock {
  type: "todo"
  /** Todo list items */
  items: TodoDisplayItem[]
}

interface TodoDisplayItem {
  /** Todo item title */
  title: string
  /** Status */
  status: "pending" | "in_progress" | "done"
}

interface ShellDisplayBlock {
  type: "shell"
  /** Language identifier for syntax highlighting (e.g., "sh", "powershell") */
  language: string
  /** Shell command content */
  command: string
}
```

| Type | Purpose |
|------|---------|
| `brief` | Short text summary |
| `diff` | Code difference comparison (includes file path, old content, new content) |
| `todo` | Todo list (each item has a title and status: `pending`, `in_progress`, `done`) |
| `shell` | Shell command related display |

---

## Rust Wire Server

> Note: Kimi Agent is currently experimental. APIs and behavior may change in subsequent versions.

Kimi Agent (Rust) is a Rust version of Kimi's core brain, built specifically for Wire mode. If you only need the Wire protocol service, it provides a lighter alternative — like swapping a big desktop phone for a sleek mobile one. The Rust implementation lives at [`MoonshotAI/kimi-agent-rs`](https://github.com/MoonshotAI/kimi-agent-rs).

### Features

- **Fully Wire protocol compatible**: Uses the same Wire protocol as the Python version `kimi --wire`, existing clients need no modifications
- **Smaller footprint**: Single statically-linked binary, no Python runtime needed
- **Faster startup**: Native compilation, faster launch speed
- **Same configuration**: Uses the same config file (`~/.kimi/config.toml`) and session directory

### Limitations

- **Wire mode only**: No Shell/Print/ACP UI
- **Kimi provider only**: Does not support OpenAI, Anthropic, or other providers
- **No Kimi account login**: No `login`/`logout` subcommands and `/login`, `/logout` slash commands; API key must be configured manually
- **No `--prompt`/`--command` support**: Wire server does not accept initial prompts
- **Local execution only**: No SSH Kaos support
- **Different MCP OAuth storage location**: Kimi Agent stores in `~/.kimi/credentials/mcp_auth.json`, Python version stores in `~/.fastmcp/oauth-mcp-client-cache/`, the two are not compatible

### Installation

Download precompiled binaries from [GitHub Releases](https://github.com/MoonshotAI/kimi-agent-rs/releases):

```sh
# macOS (Apple Silicon)
curl -L https://github.com/MoonshotAI/kimi-agent-rs/releases/latest/download/kimi-agent-aarch64-apple-darwin.tar.gz | tar xz
sudo mv kimi-agent /usr/local/bin/

# Linux (x86_64)
curl -L https://github.com/MoonshotAI/kimi-agent-rs/releases/latest/download/kimi-agent-x86_64-unknown-linux-gnu.tar.gz | tar xz
sudo mv kimi-agent /usr/local/bin/
```

### Usage

Kimi Agent runs Wire mode by default:

```sh
kimi-agent
```

Common options are the same as the `kimi` command:

```sh
# Specify working directory
kimi-agent --work-dir /path/to/project

# Resume previous session
kimi-agent --continue

# Use specific session
kimi-agent --session <session-id>

# Use specific model
kimi-agent --model kimi-for-coding

# YOLO mode (skip approvals)
kimi-agent --yolo
```

Subcommands:

```sh
# Show version and environment info
kimi-agent info

# Manage MCP servers
kimi-agent mcp list
kimi-agent mcp add <name> <command> [args...]
kimi-agent mcp remove <name>
```

### Version Synchronization

Kimi Agent is released independently from Kimi Code CLI. Compatibility and synchronization status are subject to the release notes of `MoonshotAI/kimi-agent-rs`.
