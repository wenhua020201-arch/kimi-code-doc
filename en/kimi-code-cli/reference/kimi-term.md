# `kimi term` subcommand

The `kimi term` command launches the [Toad](https://github.com/batrachianai/toad) terminal UI, a modern terminal interface built with [Textual](https://textual.textualize.io/).

```sh
kimi term [OPTIONS]
```

::: warning 📢 Version Notice
Kimi Code CLI has gone through a major version upgrade — moving from Python/uv to Node.js, bringing a simpler install experience, faster startup, and a redesigned terminal UI. This page applies to the legacy Kimi Code CLI only. The legacy version will gradually be phased out — we recommend upgrading as soon as possible. See [Version Upgrade](/en/kimi-code-cli/cli-migration) for details.
This documentation is being rebuilt — for new-version feature details, please visit the [Kimi Code CLI docs](https://moonshotai.github.io/kimi-code/en/) in the meantime.
:::


## Description

[Toad](https://github.com/batrachianai/toad) is a graphical terminal interface for Kimi Code CLI that communicates with the Kimi Code CLI backend via the ACP protocol. It provides a richer interactive experience, including better output rendering and interface layout.

When you run `kimi term`, it automatically starts a `kimi acp` server in the background, and Toad connects to it as an ACP client.

## Options

All extra options are passed through to the internal `kimi acp` command. For example:

```sh
kimi term --work-dir /path/to/project --model kimi-for-coding
```

Common options:

| Option | Description |
|------|------|
| `--work-dir PATH` | Specify working directory |
| `--model NAME` | Specify model |
| `--yolo` | Auto-approve all operations |

For the full list of options, see [`kimi` command](/en/kimi-code-cli/reference/kimi-command).

## System Requirements

::: warning Note
`kimi term` requires Python 3.14+. If you installed Kimi Code CLI with an older Python version, you need to reinstall with Python 3.14 to use this feature:

```sh
uv tool install --python 3.14 kimi-cli
```
:::
