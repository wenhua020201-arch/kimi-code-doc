# Customization

## MCP Servers

MCP (Model Context Protocol) servers can extend Kimi with external tools and services. Manage them via the action menu (gear icon) → **MCP Servers**.

### Transport Types

Two transport types are supported:

- **stdio**: Local command-line tools; requires specifying command, arguments, and environment variables
- **http**: Remote service; requires specifying URL, with optional OAuth

### Recommended Servers

![Kimi Code MCP Servers](/images/en/vscode/kimi-code-mcp.png)

One-click installation of recommended servers is provided:

| Server | Purpose |
| --- | --- |
| Playwright | Browser automation |
| Context7 | Real-time documentation |
| GitHub | API access |

Some servers require OAuth authentication. Click the authorize button to open the flow, or reset credentials. You can test the connection before saving to verify server availability.
