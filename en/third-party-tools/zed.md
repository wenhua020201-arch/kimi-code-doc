# Using in Zed

Kimi Code CLI supports integration with IDEs through the [Agent Client Protocol (ACP)](https://agentclientprotocol.com/), allowing you to use AI-assisted programming directly within your editor.

::: warning Legacy CLI only
The new Kimi Code CLI (Node.js) does not currently support ACP integration. If you prefer using ACP in Zed, it is only available on the legacy CLI (Python/uv) for now.
:::

## Prerequisites

- [Kimi Code CLI](/en/kimi-code-cli/getting-started) is installed and `kimi /login` configuration is completed.
- [Zed](https://zed.dev/) editor is installed.

## Configuration

[Zed](https://zed.dev/) is a modern IDE that supports ACP.

Add the following to Zed's configuration file `~/.config/zed/settings.json`:

```json
{
  "agent_servers": {
    "Kimi Code CLI": {
      "type": "custom",
      "command": "kimi",
      "args": ["acp"],
      "env": {}
    }
  }
}
```

Configuration notes:

- `type`: Fixed value `"custom"`
- `command`: Path to the Kimi Code CLI command. If `kimi` is not in PATH, use the full path
- `args`: Startup arguments. `acp` enables ACP mode
- `env`: Environment variables, usually left empty

After saving the configuration, you can create Kimi Code CLI sessions in Zed's Agent panel.
