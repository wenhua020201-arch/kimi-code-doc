# Using in Third-Party Coding Agents

Kimi Code benefits support usage in mainstream Coding Agents — such as Claude Code, Roo Code, OpenCode, and more. It can also work with generic Agent frameworks like OpenClaw and Hermes, allowing you to freely call Kimi's AI capabilities in the tools you're already used to.

This document demonstrates the configuration methods for Claude Code and Roo Code.

## Prerequisites

- You have subscribed to Kimi membership and activated Kimi Code benefits.
- You have obtained an API Key (created in the [Kimi Code Console](https://www.kimi.com/code/console)).

![Kimi Code Console](/images/en/third-party-tools/other-coding-agents/kimi-code-console.png)

## Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) is a command-line programming assistant launched by Anthropic. For installation instructions, please refer to the [Claude Code official documentation](https://docs.anthropic.com/en/docs/claude-code/getting-started).

> After installation, you need to skip Anthropic's default login flow. Execute the following script in the terminal:
>
> ```sh
> node --eval "
>     const homeDir = os.homedir();
>     const filePath = path.join(homeDir, '.claude.json');
>     if (fs.existsSync(filePath)) {
>         const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
>         fs.writeFileSync(filePath, JSON.stringify({ ...content, hasCompletedOnboarding: true }, null, 2), 'utf-8');
>     } else {
>         fs.writeFileSync(filePath, JSON.stringify({ hasCompletedOnboarding: true }), 'utf-8');
>     }"
> ```

### Configure Kimi Code Model

Set environment variables before starting Claude Code:

**macOS / Linux**

```sh
export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/
export ANTHROPIC_API_KEY=你的API Key

claude
```

**Windows**

```powershell
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/"
$env:ANTHROPIC_API_KEY="你的API Key"

claude
```

After starting, enter `/status` to confirm the model is active. Use the keyboard shortcut to enable Thinking mode: `Option+T` on macOS, `Alt+T` on Windows and Linux.

---

## Roo Code

[Roo Code](https://docs.roocode.com/) is an AI programming plugin for VS Code. If you haven't installed it yet, search for `Roo Code` in the VS Code Extensions marketplace and install it.

### Configure Kimi Code Model

Open the Roo Code panel → Settings page → In the Providers area select `OpenAI Compatible`, and fill in the following information:

| Configuration Item | Value |
| --- | --- |
| Entrypoint | `https://api.kimi.com/coding/v1` |
| API Key | Your Kimi Code API Key |
| Model | `kimi-for-coding` |

Set the remaining options as follows:

```
Use legacy OpenAI API format  ✓
Enable streaming              ✓
Include max output tokens     ✓
Enable Reasoning Effort       Medium
Max Output Tokens             32768
Context Window Size           262144
```

Max Output Tokens and Context Window Size are used to inform Roo Code of the model's capability range; leaving them blank may lead to truncated output or insufficient context.

Save the configuration and start a new session to use it.


> **Note**: Please maintain the tool's real identity identifier when using. Tampering with the client identifier (User-Agent) is considered a violation and may result in suspension of membership benefits.
