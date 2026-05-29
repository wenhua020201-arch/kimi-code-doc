# `kimi acp` subcommand

The `kimi acp` command starts a multi-session ACP (Agent Client Protocol) server.

```sh
kimi acp
```

::: warning 📢 Version Notice
Kimi Code CLI has gone through a major version upgrade — moving from Python/uv to Node.js, bringing a simpler install experience, faster startup, and a redesigned terminal UI. This page applies to the legacy Kimi Code CLI only. The legacy version will gradually be phased out — we recommend upgrading as soon as possible. See [Version Upgrade](/en/kimi-code-cli/cli-migration) for details.
This documentation is being rebuilt — for new-version feature details, please visit the [Kimi Code CLI docs](https://moonshotai.github.io/kimi-code/en/) in the meantime.
:::


## Description

ACP is a standardized protocol that allows IDEs and other clients to interact with AI Agents.

## Use Cases

- IDE plugin integration (e.g., JetBrains, Zed)
- Custom ACP client development
- Multi-session concurrent processing

For using Kimi Code CLI in IDEs, please refer to Using in IDEs.

## Authentication

The ACP server checks user authentication status before creating or loading sessions. If the user is not logged in, the server returns an `AUTH_REQUIRED` error (error code `-32000`) with available authentication method details.

After the client receives this error, it should guide the user to run the `kimi login` command in the terminal to complete login. Once logged in, subsequent ACP requests will proceed normally.
