# Kimi CLI 使用说明

Kimi CLI 是 Moonshot AI 自研的命令行通用智能体工具，它可以帮助你快速完成各种各样的编程和文件处理等任务。

> Kimi CLI 目前还在 Technical Preview 阶段，如遇到 bug 或有任何意见或建议，欢迎通过 https://github.com/MoonshotAI/kimi-cli/issues 提交反馈！

![](./screenshots/kimi-cli/hello.png)

## 安装

Kimi CLI 支持 macOS 和 Linux 系统，要求使用 uv 包管理器安装。

如果你的系统中还没有安装 uv，请先参考 [uv 安装说明](https://docs.astral.sh/uv/getting-started/installation/) 进行安装。通常，在 macOS 和 Linux 系统中，可使用以下命令安装 uv：

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

安装 uv 后，使用以下命令安装 Kimi CLI：

```sh
uv tool install --python 3.13 kimi-cli
```

运行以下命令检查是否安装成功：

```sh
kimi --version
```

## 使用

在命令行中进入你想要 Kimi CLI 操作的项目目录，运行 `kimi` 命令，即可启动 Kimi CLI。例如：

```sh
cd my-project
kimi
```

首次运行时，Kimi CLI 会提示没有配置 LLM 模型，需输入 `/setup` 元命令，进入配置流程：

![](./screenshots/kimi-cli/setup.png)

Coding 包月计划用户，选择第一个「Kimi Coding Plan」，在随后的提示中，输入在会员页面获得的 API key，并选择 `kimi-for-coding` 模型；Moonshot AI 开放平台用户，根据提示选择对应的平台，输入 API key 并选择想要使用的模型。

配置完成后，即可开始使用 Kimi CLI，例如：

![](./screenshots/kimi-cli/2048-game.png)

## Shell 模式

Kimi CLI 不仅仅是一个编程智能体，还可以通过 Ctrl-K 快捷键切换到 shell 模式。通过该模式，你可以在不离开 Kimi CLI 的情况下，直接执行 shell 命令，方便进行文件操作和查看结果。例如：

![](./screenshots/kimi-cli/shell-mode.png)

## 搭配 Zed 编辑器使用

Kimi CLI 原生提供 [Agent Client Protocol](https://github.com/agentclientprotocol/agent-client-protocol) 支持，可以搭配任何 ACP 客户端使用，例如 [Zed 编辑器](https://zed.dev/)。

> ACP 是 Zed 编辑器推出的一种通用智能体协议，使智能体的核心功能（服务端）和用户界面（客户端）解耦，用户可以自由选择不同的智能体服务端和客户端进行搭配使用。

要在 Zed 中使用 Kimi CLI，首先需确保已经安装并配置好 Kimi CLI，然后在 Zed 配置文件（`~/.config/zed/settings.json`）中添加以下内容：

```json
{
  "agent_servers": {
    "Kimi CLI": {
      "command": "kimi",
      "args": ["--acp"],
      "env": {}
    }
  }
}
```

随后即可在 Zed 侧边栏创建 Kimi CLI Thread：

![](./screenshots/kimi-cli/zed-new-thread.png)

## 搭配 Zsh 使用

Zsh 用户可以搭配 [zsh-kimi-cli](https://github.com/MoonshotAI/zsh-kimi-cli) 插件，在 shell 中快速调用 Kimi CLI。

使用如下命令安装（以 oh-my-zsh 为例，其它包管理请参考仓库 README）：

```sh
git clone https://github.com/MoonshotAI/zsh-kimi-cli.git \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/kimi-cli
```

然后在 `~/.zshrc` 中启用该插件：

```sh
plugins=(... kimi-cli)
```

重新启动 Zsh 之后，即可在 Zsh 中通过 Ctrl-K 进入 Kimi CLI 模式：

![](./screenshots/kimi-cli/zsh-integration.png)

目前 zsh-kimi-cli 插件还在持续更新中，请定期前往 `custom/plugins/kimi-cli` 目录通过 `git pull` 拉取更新。

## 接入 MCP 工具

Kimi CLI 支持通过 Claude 兼容的 MCP 配置格式指定 MCP 工具。启动时，通过 `--mcp-config-file` 参数指定 MCP 配置文件路径即可。例如：

```sh
kimi --mcp-config-file ~/.cursor/mcp.json
```

## 更多用法

除了上述功能，可以通过 `kimi --help` 查看更多用法。
