# Error Reference

This document covers **server-side errors** and **tool call errors** you may encounter when calling the Kimi Code API, including authentication, rate limiting, request format, and internal server issues. If you are experiencing client-side problems (such as CLI installation failures, IDE connection issues, MCP configuration errors, etc.), please refer to the [FAQ](#).

Find the relevant entry in the table below based on the error message shown in your terminal or client, and follow the guidance provided.

::: tip Note
If you are using a third-party client such as OpenCode or Claude Code, the client may transform or re-wrap error codes, so the code you see may differ from what is documented here. In that case, **focus on the text content of the error message** and match keywords in the quick lookup table below.
:::


## Quick Lookup

| Error keyword | HTTP status | Jump to |
|--------------|------------|---------|
| `The API Key appears to be invalid or may have expired` | 401 | [Invalid API Key](#invalid-api-key) |
| `Invalid Authentication` | 401 | [Invalid Authentication](#invalid-authentication) |
| `unable to verify your membership benefits` | 402 | [Unable to Verify Membership](#unable-to-verify-membership) |
| `Kimi For Coding is currently only available for Coding Agents` | 403 | [Client Not on Whitelist](#client-not-on-whitelist) |
| `You've reached your usage limit for this billing cycle` | 403 | [Billing Cycle Quota Exhausted](#billing-cycle-quota-exhausted) |
| `Access terminated` | 403 | [Account Access Terminated](#account-access-terminated) |
| `The engine is currently overloaded` | 429 | [Inference Engine Overloaded](#inference-engine-overloaded) |
| `We're receiving too many requests` | 429 | [Too Many Concurrent Requests](#too-many-concurrent-requests) |
| `You've reached your usage limit for this period` | 429 | [5-Hour Rolling Quota Reached](#5-hour-rolling-quota-reached) |
| `You've reached kimi monthly usage limit` | 429 | [Monthly Kimi Quota Exhausted](#monthly-kimi-quota-exhausted) |
| `total message size N exceeds limit 2097152` | 400 | [Message Body Exceeds Context Limit](#message-body-exceeds-context-limit) |
| `Your request exceeded model token limit: 262144` | 400 | [Token Limit Exceeded](#token-limit-exceeded) |
| `thinking is enabled but reasoning_content is missing` | 400 | [Missing Reasoning Content Field](#missing-reasoning-content-field) |
| `unsupported image url` | 400 | [Unsupported Image URL](#unsupported-image-url) |
| `function name ... is duplicated` | 400 | [Duplicate Tool Name](#duplicate-tool-name) |
| `The request was rejected because it was considered high risk` | 400 | [Content Safety Rejection](#content-safety-rejection) |
| `Not found the model kimi-for-coding or Permission denied` | 404 | [Model Not Found](#model-not-found) |
| `method not found` | 404 | [Endpoint Not Found](#endpoint-not-found) |
| `bot_id ... value does not match id_kinds` | 500 | [Invalid bot_id Format](#invalid-bot_id-format) |
| `failed to connect to ... database=membership_` | 500 | [Database Connection Failed](#database-connection-failed) |
| `FATAL: terminating connection due to administrator command` | 500 | [Database Connection Failed](#database-connection-failed) |
| `failed to evaluate rate limit script` | 500 | [Internal Connection Error](#internal-connection-error) |
| `i/o timeout` / `conn closed` / `bad connection` | 500 | [Internal Connection Error](#internal-connection-error) |
| `503 Service Unavailable` / `504 Gateway Timeout` / `502 Bad Gateway` | 500 | [Downstream Service Unavailable](#downstream-service-unavailable) |
| `context canceled` | 499 | [Request Canceled](#request-canceled) |
| `url2text` / `spider checkUrl failed` / `invalid html` | 500 | [Web Page Read Failed](#web-page-read-failed) |
| `image_url:moderation request error` | 500 | [Image Moderation Failed](#image-moderation-failed) |
| `We consider the current URL poses a security risk` | 403 | [URL Security Risk Blocked](#url-security-risk-blocked) |
| `invalid_url: The provided URL is invalid` | 400 | [Invalid URL Format](#invalid-url-format) |


## Authentication Errors

**HTTP 401**

The request did not carry valid credentials, or the credentials have expired. The server validates identity before processing any request — 401 means this step failed. **Do not retry**; fix the credentials and resend the request.

### Invalid API Key

```
error, status code: 401, message: The API Key appears to be invalid or may have expired. Please verify your credentials and try again.
```

The API Key is incorrect, or the key has been revoked or expired in the console.

**How to fix:**
- **Typo in key**: Check for extra spaces or missing characters
- **Key revoked or expired**: Go to [Console](https://www.kimi.com/code/console?from=kfc_overview_topbar) › API Keys and verify the key's status
- **Environment variable override**: Check whether a `KIMI_API_KEY` or `OPENAI_API_KEY` environment variable is overriding your config file — run `echo $KIMI_API_KEY` to check


### Invalid Authentication

```
error, status code: 401, message: Invalid Authentication
```

The request did not carry valid credentials, or uses an unsupported authentication format.

**How to fix:**

The most common cause is accidentally using an API key or Base URL from the Kimi Open Platform. Kimi Code and the [Kimi Open Platform](https://platform.kimi.com) are two separate systems — keys and Base URLs are not interchangeable:
- Kimi Code: get your key from the [Console](https://www.kimi.com/code/console?from=kfc_overview_topbar), Base URL is `https://api.kimi.com/coding/v1` (OpenAI protocol) or `https://api.kimi.com/coding/` (Anthropic protocol)
- Open Platform: get your key from [platform.kimi.com](https://platform.kimi.com), Base URL is `https://api.moonshot.cn/v1`



## Membership Benefit Unavailable

**HTTP 402**

The server cannot verify the subscription status of the current account. This is usually a temporary issue.

### Unable to Verify Membership

```
error, status code: 402, message: We're unable to verify your membership benefits at this time. Please ensure your membership is active.
```

**How to fix:**
- Confirm your Kimi Code subscription is still active
- Wait a moment and retry
- If the issue persists, check your subscription status in the [Console](https://www.kimi.com/code/console?from=kfc_overview_topbar) or contact [code@moonshot.ai](mailto:code@moonshot.ai)


## Permission Errors

**HTTP 403**

The request is correctly formatted and identity is verified, but the current account does not have permission to perform the operation. Two categories: access control (not on whitelist, account terminated) and quota exhaustion (exceeded allowed usage). **Retrying is pointless** — resolve the permission or quota issue first.

### Client Not on Whitelist

```
error, status code: 403, message: Kimi For Coding is currently only available for Coding Agents such as Kimi CLI, Claude Code, Roo Code, Kilo Code, etc.
```

You are using the OpenAI-compatible protocol, but the current client is not on the whitelist, so the server rejected the request.

**How to fix:**
- **Recommended:** Switch to the Anthropic-compatible protocol — change your Base URL to `https://api.kimi.com/coding/`. No whitelist approval needed, and it works with more clients.


### Billing Cycle Quota Exhausted

```
error, status code: 403, message: You've reached your usage limit for this billing cycle. Your quota will be refreshed in the next cycle.
```

The account's weekly quota has been fully used up.

**How to fix:**
- Wait for the next billing cycle to refresh
- View usage details in the [Console](https://www.kimi.com/code/console?from=kfc_overview_topbar)
- [Upgrade your subscription](https://www.kimi.com/membership/pricing?from=upgrade_plan&track_id=5b8a0861-96ab-424d-b015-5992ec9ab98a) for higher quota


### Account Access Terminated

```
error, status code: 403, message: Access terminated.
```

The account has been terminated for violating the community guidelines.

**How to fix:**
- Read the [Kimi Code Community Guidelines](https://www.kimi.com/code/docs/kimi-code/community-guidelines.html) to understand the violation and what is covered
- To appeal, email [support@moonshot.ai](mailto:support@moonshot.ai) with a description of the circumstances


## Rate Limits & Quotas

**HTTP 429**

Request frequency or usage volume has exceeded a limit. Two types: inference engine overload is a server capacity issue — **retry directly**; quota errors are account usage issues — **retrying is pointless**, wait for reset or upgrade your plan.

### Inference Engine Overloaded

```
error, status code: 429, message: The engine is currently overloaded, please try again later
```

The server's current request volume exceeds inference capacity. **Not related to your personal quota or account status.**
This may occur during peak hours (14:00–17:00 on weekdays). Kimi Code will address this promptly — you can also avoid peak hours.

**How to fix:**
- Wait a moment and retry


### Too Many Concurrent Requests

```
error, status code: 429, message: We're receiving too many requests at the moment. Please wait a moment and try again.
```

Too many requests were sent in a short period, exceeding the account limit.

**How to fix:**
- Wait a moment and retry; avoid sending requests rapidly in succession


### 5-Hour Rolling Quota Reached

```
error, status code: 429, message: You've reached your usage limit for this period. Your quota will be refreshed in the next period.
```

The call volume within the current 5-hour rolling window has reached its limit.

**How to fix:**
- Wait for the quota window to reset; check the reset time in the [Console](https://www.kimi.com/code/console?from=kfc_overview_topbar)
- [Upgrade your subscription](https://www.kimi.com/membership/pricing?from=upgrade_plan&track_id=5b8a0861-96ab-424d-b015-5992ec9ab98a) for a higher limit


### Monthly Kimi Quota Exhausted

```
error, status code: 429, message: You've reached kimi monthly usage limit for this billing cycle. Your quota will be refreshed in the next cycle.
```

Your Kimi [monthly quota](https://www.kimi.com/membership/subscription) has been fully consumed.

All Kimi membership benefits — including PPT, Agent Cluster, Kimi Code, etc. — share the same monthly quota. Once the total quota is exhausted, further requests cannot be made even if Kimi Code still has remaining quota. You must wait for the quota to automatically reset next month or upgrade your plan. See [Kimi Membership Credits](https://www.kimi.com/membership-credits) for details. When the quota is exhausted, your account enters a frozen state, as shown below:

![Monthly quota exhausted — frozen state](/月额度冻结英文版.png)

**How to fix:**
- Wait for automatic reset at the start of the next billing cycle
- [Upgrade your subscription](https://www.kimi.com/membership/pricing?from=upgrade_plan&track_id=5b8a0861-96ab-424d-b015-5992ec9ab98a) for a higher monthly quota


## Request Format Errors

**HTTP 400**

The request content itself has a problem; the server rejects it during parsing or validation. **Fix the request content — no need to wait or contact support.**

### Message Body Exceeds Context Limit

```
error, status code: 400, message: total message size 5943865 exceeds limit 2097152
```

The total size of all messages (including conversation history, system prompt, and tool results) exceeds the 2 MB context limit. This is the most frequently occurring 400 error.

**How to fix:**
- Trim conversation history by removing unnecessary earlier turns
- Process long content in segments to keep each request within size limits


### Token Limit Exceeded

```
error, status code: 400, message: Invalid request: Your request exceeded model token limit: 262144 (requested: 558009)
```

The number of tokens in the request exceeds the model's single-request limit (262,144 tokens).

**How to fix:**
- Shorten the prompt or truncate conversation history
- Process long content across multiple requests


### Missing Reasoning Content Field

```
error, status code: 400, message: thinking is enabled but reasoning_content is missing in assistant tool call message at index 2
```

Extended thinking (thinking mode) is enabled, but the `reasoning_content` field is missing from the tool call message. This is a Kimi Code-specific field required when thinking mode is active.

**How to fix:**
- Add the `reasoning_content` field to the assistant message in tool calls
- See the [Providers & Models configuration docs](https://www.kimi.com/code/docs/kimi-code-cli/configuration/providers-and-models.html) for the field specification


### Unsupported Image URL

```
error, status code: 400, message: Invalid request: unsupported image url: C:\Users\pc\...\screenshot.jpg
```

The image URL format is not supported: local file paths, non-standard base64 prefixes, or unsupported external domains.

**How to fix:**
- Local paths must be uploaded to a publicly accessible URL
- Base64 images must use the standard format: `data:image/jpeg;base64,...`


### Duplicate Tool Name

```
error, status code: 400, message: function name unnamed_function is duplicated
```

The `tools` array contains duplicate tool definitions with the same name.

**How to fix:**
- Ensure every tool's `name` field is unique


### Content Safety Rejection

```
error, status code: 400, message: The request was rejected because it was considered high risk
```

The request content triggered content safety detection and was rejected by the server.

**How to fix:**
- Review your prompt for sensitive content and retry after modification
- If you believe this is a false positive, email [code@moonshot.ai](mailto:code@moonshot.ai) with the content that triggered the error


## Resource Not Found

**HTTP 404**

The requested resource does not exist, or the current account does not have access. Verify the model name and endpoint path.

### Model Not Found

```
error, status code: 404, message: Not found the model kimi-for-coding or Permission denied
```

**How to fix:**
- Confirm the model name is spelled correctly (`kimi-for-coding`)
- Confirm the account has [Kimi Code](https://kimi.com/code) access enabled


### Endpoint Not Found

```
method not found
```

**How to fix:**
- Verify the request URL is correct. Kimi Code Base URL is `https://api.kimi.com/coding/v1` (OpenAI protocol) or `https://api.kimi.com/coding/` (Anthropic protocol)


## Internal Server Errors

**HTTP 500**

An unexpected error occurred on the server — **not caused by request content or account status**. In most cases, waiting a moment and retrying will resolve it. If the issue persists, submit feedback to [code@moonshot.ai](mailto:code@moonshot.ai).

### Invalid bot_id Format

```
invalid_argument: field kimi.billing.v1.ClawExtension.bot_id: value "KIMI_CLAW_ID" (id_kind=uuid_v4): value does not match id_kinds: [uuid_v4]
invalid_argument: field kimi.billing.v1.ClawExtension.bot_id: value "openclaw-local" (id_kind=uuid_v4): value does not match id_kinds: [uuid_v4]
```

The `bot_id` is not a valid UUID v4. This field is automatically attached by client software when sending requests — it is normally managed by the client, not set manually by users.

**How to fix:**
- Update to the latest version of your client and retry
- If the issue persists after updating, email [code@moonshot.ai](mailto:code@moonshot.ai) with the full error message


### Database Connection Failed

```
internal: failed to connect to `user=kimi_chat_prod_rw database=membership_009`: ...: connection reset by peer
internal: FATAL: terminating connection due to administrator command (SQLSTATE 57P03)
```

The server could not connect to the membership verification database, or the database is under maintenance. This is an infrastructure-level failure.

**How to fix:**
- Wait 1–2 minutes and retry


### Internal Connection Error

```
internal: conn closed
internal: driver: bad connection
internal: read tcp ...: i/o timeout
internal: unexpected EOF
internal: failed to evaluate rate limit script: read tcp ...: i/o timeout
```

Internal network connection anomaly on the server side, covering connection resets, I/O timeouts, Redis rate-limit script timeouts, and similar low-level errors. Usually a transient fault.

**How to fix:**
- Wait a moment and retry (start with 1 second, up to 3 retries)


### Downstream Service Unavailable

```
unavailable: 503 Service Unavailable
unavailable: 504 Gateway Timeout
unavailable: 502 Bad Gateway
```

The server received a 5xx response while calling a downstream model or infrastructure component.

**How to fix:**
- Wait a moment and retry


### Account Status Abnormal

```
unauthenticated: not_found: 未找到该账号，请确认是否注册
unauthenticated: failed_precondition: 因违反用户协议，该账号已被禁用。
unauthenticated: failed_precondition: 因违反用户协议，该账号已被暂时禁用。
unauthenticated: failed_precondition: 因违反用户协议，该账号已被禁言。
```

When the server queried the account, it found the account does not exist or is in an abnormal state.

**How to fix:**
- Account not found: confirm the account you are using has completed registration
- Account disabled/muted: email [support@kimi-code.com](mailto:support@kimi-code.com) to learn the reason and how to appeal


## Tool Call Errors

The following errors occur during AI tool call execution (such as reading web pages or processing images). **They do not affect the conversation itself** — only the specific operation that failed.

If you see authentication or rate-limiting errors (e.g. 401, 429) in this context, refer to the corresponding sections above.


### Request Canceled

**HTTP 499**

```
error sending 'CallDataSourceTool' request: Post "http://...": context canceled
canceled: context canceled
```

The client disconnected before receiving a result — typically caused by the user manually stopping the operation, a network interruption, or a client-side timeout. Not a server error.

**How to fix:**
- If manually stopped, no action needed
- If this happens frequently without being triggered manually, check whether your client's timeout setting is too short


### Web Page Read Failed

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

The AI failed to read the web page content. Common causes: target page response timeout, abnormal page structure, login required, URL on blocklist, or the target server itself returned an error.

**How to fix:**
- Timeout or server error: retry later
- Login-required pages (verify page): cannot be read via tool call — manually copy the content and paste it to the AI instead
- Blocklisted URL: the address is blocked by the system and cannot be accessed


### Image Moderation Failed

**HTTP 500**

```
image_url:moderation request error: 非法输入
image_url:Post "https://api.msh.team/v1/moderations": context deadline exceeded
```

While the AI was processing an image, the image content moderation service returned an error or timed out.

**How to fix:**
- `非法输入` (illegal input): the image content triggered content moderation — ensure the image complies with usage policies
- Timeout: retry later, or check your network connection


### URL Security Risk Blocked

**HTTP 403**

```
(security_risk) We consider the current URL poses a security risk and are unable to provide fetch service at this time.
```

The URL passed in the tool call was flagged as a security risk, and the server refused to fetch it.

**How to fix:**
- Internal network addresses (e.g. `192.168.x.x`, `10.x.x.x`) and known high-risk domains will be blocked
- Pages that require login cannot be fetched via tool calls


### Invalid URL Format

**HTTP 400**

```
(invalid_url) The provided URL is invalid: parse "https://the repo for the contents of the path": invalid character " " in host name
(invalid_url) The provided URL is invalid: missing scheme
```

The model passed a natural-language description or a malformed string as a URL to the tool — typically a descriptive phrase treated as an address, or a missing protocol prefix.

**How to fix:**
- Ensure the value passed is a real, accessible URL — not a text description of one
- The protocol prefix (`http://` or `https://`) is required and cannot be omitted


## Errors Not Covered Here

If none of the entries above match the error you encountered, please report it by email to [code@moonshot.ai](mailto:code@moonshot.ai), and include the full error message, Request ID, and the time of the request.
