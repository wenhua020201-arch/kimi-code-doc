# `kimi info` subcommand

`kimi info` displays version and protocol information for Kimi Code CLI.

```sh
kimi info [--json]
```

::: warning 📢 Version Notice
Kimi Code CLI has gone through a major version upgrade — moving from Python/uv to Node.js, bringing a simpler install experience, faster startup, and a redesigned terminal UI. This page applies to the legacy Kimi Code CLI only. The legacy version will gradually be phased out — we recommend upgrading as soon as possible. See [Version Upgrade](/en/kimi-code-cli/cli-migration) for details.
This documentation is being rebuilt — for new-version feature details, please visit the [Kimi Code CLI docs](https://moonshotai.github.io/kimi-code/en/) in the meantime.
:::


## Options

| Option | Description |
|------|------|
| `--json` | Output in JSON format |

## Output

| Field | Description |
|------|------|
| `kimi_cli_version` | Kimi Code CLI version number |
| `agent_spec_versions` | List of supported Agent specification versions |
| `wire_protocol_version` | Wire protocol version |
| `python_version` | Python runtime version |

## Examples

**Text output**

```sh
$ kimi info
kimi-cli version: 1.20.0
agent spec versions: 1
wire protocol: 1.7
python version: 3.13.1
```

**JSON output**

```sh
$ kimi info --json
{"kimi_cli_version": "1.20.0", "agent_spec_versions": ["1"], "wire_protocol_version": "1.7", "python_version": "3.13.1"}
```
