# 在第三方 Coding Agent 中使用

Kimi Code 权益支持在主流 Coding Agent 中使用——例如 Claude Code、Roo Code、OpenCode 等；也可以配合 OpenClaw、Hermes 等通用 Agent 框架。让你在自己习惯的工具里自由调用 Kimi Code 的 AI 能力。

本文档将展示 Claude Code 与 Roo Code 的配置方法

## 开始之前

- 确保你已经订阅 [Kimi 会员](https://www.kimi.com/membership/pricing?from=)并开通 Kimi Code 权益。
- 获取 API Key：
  1. 进入 [Kimi Code 控制台](https://www.kimi.com/code/console)；
  2. 点击「新建 API Key」，输入名称后确认；
  3. 复制生成的 Key 并妥善保存（关闭弹窗后无法再次查看完整 Key）。

![Kimi Code 控制台](/images/zh/third-party-tools/other-coding-agents/kimi-code-console.png)

## Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) 是 Anthropic 推出的命令行编程助手。通过配置环境变量将其接入 Kimi 的 API 端点，你就能在 Claude Code 中直接调用 Kimi Code 的 AI 能力，在熟悉的终端交互里获得 Kimi Code 的编程体验。

<span class="step-num">①</span> **安装 Claude Code**

安装方式请参考 [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code/getting-started)。

│

<span class="step-num">②</span> **执行脚本，跳过登录流程**

> 安装完成后，不要直接启动 Claude。先在终端执行以下脚本，跳过 Anthropic 默认的登录流程：
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

<span class="step-num">③</span> **设置环境变量后启动**

::: code-group

```sh [macOS / Linux]
export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/
export ANTHROPIC_API_KEY=你的API Key

claude
```

```powershell [Windows]
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/"
$env:ANTHROPIC_API_KEY="你的API Key"

claude
```

:::

> 启动后若提示是否使用该 API key，确认使用即可。随后按照指引选择你信任的项目文件夹，完成授权即可。
>
> ![Claude Code 授权访问项目文件](/images/zh/third-party-tools/other-coding-agents/claude-trust-folder.jpg)

│

<span class="step-num">④</span> **启动后验证**

启动后输入 `/status`，如果返回信息中显示 Base URL 为 `https://api.kimi.com/coding/`，则配置成功。此时即使模型名称仍显示为 Claude 模型，实际调用的仍是 Kimi Code 的 API。

![Claude Code 状态检查](/images/zh/third-party-tools/other-coding-agents/claude-status-check.png)

> **注意**：使用快捷键可开启 Thinking 模式——macOS 为 `Option+T`，Windows 和 Linux 为 `Alt+T`。

## Roo Code

[Roo Code](https://docs.roocode.com/) 是 VS Code 中的一款 AI 编程插件，支持通过 OpenAI Compatible 协议接入 Kimi 模型，在编辑器内完成代码生成、重构与多文件协作等任务。

<span class="step-num">①</span> **安装 Roo Code**

在 VS Code 中点击 [安装 Roo Code](vscode:extension/RooVeterinaryInc.roo-cline)。

│

<span class="step-num">②</span> **在侧边栏打开 Roo Code**

安装完成后，点击 VS Code 左侧活动栏中的 Roo Code 图标（袋鼠图标）打开面板。

![Roo Code 面板](/images/zh/third-party-tools/other-coding-agents/roo-code-panel.png)

│

<span class="step-num">③</span> **配置 Kimi Code 模型**

- **新用户**：首次使用时直接选择「第三方提供商（3rd-party Provider）」进入配置。
- **老用户**：打开 Roo Code 面板后进入设置页，点击 Configuration Profile 旁的「+」新增配置。

![创建配置](/images/zh/third-party-tools/other-coding-agents/roo-code-create-config.png)

模型配置信息按如下方式填写：

| 配置项 | 设置值 | 说明 |
| --- | --- | --- |
| API Provider | `OpenAI Compatible` | 选择第三方兼容提供商 |
| Base URL | `https://api.kimi.com/coding/v1` | Kimi Code API 入口 |
| API Key | 你的 Kimi Code API Key | 从控制台获取 |
| Model ID | `kimi-for-coding` | 统一模型标识 |

![模型配置](/images/zh/third-party-tools/other-coding-agents/roo-code-model-config.png)

其余选项按如下方式设置：

| 选项 | 设置值 | 说明 |
| --- | --- | --- |
| Enable streaming | ✓ | 启用流式输出 |
| Include max output tokens | ✓ | 包含最大输出 token 数 |
| Enable Reasoning Effort | Medium（推荐） | 推理强度 |
| Max Output Tokens | 32768 | 最大输出 token 数 |
| Context Window Size | 262144 | 上下文窗口大小 |
| Image Support | ✓ | 支持图像处理 |

其中 Max Output Tokens 和 Context Window Size 用于告知 Roo Code 模型的能力范围，不填可能导致输出截断或上下文不足。

![模型配置补充](/images/zh/third-party-tools/other-coding-agents/roo-code-model-config-2.jpg)

│

<span class="step-num">④</span> **切换配置（老用户）**

配置完成后，老用户需在 Roo Code 面板中切换到新保存的 Kimi Code 配置。

![切换配置](/images/zh/third-party-tools/other-coding-agents/roo-code-switch-config.png)

保存配置后新建会话即可使用。