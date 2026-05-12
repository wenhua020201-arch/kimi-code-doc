# Using in Third-Party Coding Agents

Kimi Code benefits support usage in mainstream Coding Agents — such as Claude Code, Roo Code, OpenCode, and more. It can also work with generic Agent frameworks like OpenClaw and Hermes, allowing you to freely call Kimi Code's AI capabilities in the tools you're already used to.

This document demonstrates the configuration methods for Claude Code and Roo Code.

## Before You Start

- Make sure you have subscribed to [Kimi membership](https://www.kimi.com/membership/pricing?from=) and activated Kimi Code benefits.
- Obtain an API Key:
  1. Go to the [Kimi Code Console](https://www.kimi.com/code/console);
  2. Click "Create API Key", enter a name and confirm;
  3. Copy the generated key and keep it safe (the full key cannot be viewed again after closing the dialog).

![Kimi Code Console](/images/en/third-party-tools/other-coding-agents/kimi-code-console.png)

## Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) is a command-line programming assistant launched by Anthropic. By configuring environment variables to connect it to Kimi's API endpoint, you can directly call Kimi Code's AI capabilities within Claude Code and enjoy the Kimi Code programming experience in a familiar terminal interface.

<span class="step-num">①</span> **Install Claude Code**

For installation instructions, please refer to the [Claude Code official documentation](https://docs.anthropic.com/en/docs/claude-code/getting-started).

│

<span class="step-num">②</span> **Run Script to Skip Login**

> After installation, do not start Claude directly. Execute the following script in the terminal first to skip Anthropic's default login flow:
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

│

<span class="step-num">③</span> **Set Environment Variables and Start**

::: code-group

```sh [macOS / Linux]
export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/
export ANTHROPIC_API_KEY=Your API Key

claude
```

```powershell [Windows]
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/"
$env:ANTHROPIC_API_KEY="Your API Key"

claude
```

:::

> If prompted whether to use this API key, confirm to proceed. Afterwards, follow the prompts to select your trusted project folder to complete the authorization.
>
> ![Claude Code Authorize Project Access](/images/zh/third-party-tools/other-coding-agents/claude-trust-folder.jpg)

│

<span class="step-num">④</span> **Verify After Starting**

After starting, enter `/status`. If the returned information shows Base URL as `https://api.kimi.com/coding/`, the configuration is successful. Even if the model name still appears as a Claude model, the actual calls are still made to the Kimi Code API.

![Claude Code Status Check](/images/zh/third-party-tools/other-coding-agents/claude-status-check.png)

> **Note**: Use the keyboard shortcut to enable Thinking mode — `Option+T` on macOS, `Alt+T` on Windows and Linux.

## Roo Code

[Roo Code](https://docs.roocode.com/) is an AI programming plugin for VS Code. By configuring the OpenAI Compatible protocol, you can call Kimi models within Roo Code to complete code generation, refactoring, and multi-file collaboration tasks.

<span class="step-num">①</span> **Install Roo Code**

Click [Install Roo Code](vscode:extension/RooVeterinaryInc.roo-cline) in VS Code.

│

<span class="step-num">②</span> **Open Roo Code from the Sidebar**

After installation, click the Roo Code icon (kangaroo) in the VS Code left activity bar to open the panel.

![Roo Code Panel](/images/zh/third-party-tools/other-coding-agents/roo-code-panel.png)

│

<span class="step-num">③</span> **Configure Kimi Code Model**

Open the Roo Code panel and go to the Settings page:

- **New users**: On first use, directly select "3rd-party Provider" to enter configuration.
- **Existing users**: Open the Roo Code panel, go to Settings, and click the 「+」 next to Configuration Profile to add a new configuration.

![Create Configuration](/images/zh/third-party-tools/other-coding-agents/roo-code-create-config.png)

Fill in the model configuration information as follows:

| Configuration Item | Value | Description |
| --- | --- | --- |
| API Provider | `OpenAI Compatible` | Select third-party compatible provider |
| Base URL | `https://api.kimi.com/coding/v1` | Kimi Code API endpoint |
| API Key | Your Kimi Code API Key | Obtained from the console |
| Model ID | `kimi-for-coding` | Unified model identifier |

![Model Configuration](/images/zh/third-party-tools/other-coding-agents/roo-code-model-config.png)

Set the remaining options as follows:

| Option | Value | Description |
| --- | --- | --- |
| Enable streaming | ✓ | Enable streaming output |
| Include max output tokens | ✓ | Include max output token count |
| Enable Reasoning Effort | Medium (Recommended) | Reasoning intensity |
| Max Output Tokens | 32768 | Maximum output token count |
| Context Window Size | 262144 | Context window size |
| Image Support | ✓ | Support image processing |

Max Output Tokens and Context Window Size are used to inform Roo Code of the model's capability range; leaving them blank may lead to truncated output or insufficient context.

![Model Configuration Supplement](/images/zh/third-party-tools/other-coding-agents/roo-code-model-config-2.jpg)

│

<span class="step-num">④</span> **Switch Configuration (Existing Users)**

After configuration, existing users need to switch to the newly saved Kimi Code configuration in the Roo Code panel.

![Switch Configuration](/images/zh/third-party-tools/other-coding-agents/roo-code-switch-config.png)

Save the configuration and start a new session to use it.
