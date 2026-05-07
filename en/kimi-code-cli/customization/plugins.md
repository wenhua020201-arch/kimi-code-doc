# Custom Plugins (Beta)

> Beta feature: The plugin system is currently in Beta. Implementation details and configuration definitions may change in future versions. Use with caution in production environments and watch for updates.

Plugins are like a Swiss Army knife for Kimi — you can forge a small blade, a pair of scissors, a bottle opener… and pack them all into Kimi's toolbox. When Kimi runs into the right task, it automatically pulls out the matching tool to use.

Compared to MCP servers, plugins are lighter and simpler — they don't need to stay running in the background. They're essentially local scripts, perfect for packaging the everyday functions you use in your own projects.

## What Are Plugins

A plugin is just a folder, and inside that folder there must be a file called `plugin.json`. This file is like the plugin's "ID card" — it says:
- What my name is
- What I can do
- What tools I have

The plugin can declare multiple "tools," and each tool is an executable script (Python, TypeScript, shell script, etc. all work). Kimi acts like a smart butler: it reads `plugin.json`, learns what each tool is for, and then automatically calls the right one when needed.

**What can you do with plugins?**

- Wrap internal API call scripts so Kimi can query business data
- Write project-specific code generation tools, like auto-generating page templates
- Connect to private services or databases so Kimi can look up internal information

**What's the difference between a Plugin and a Skill?**

Think of it this way:
- **Skill** is like an "instruction manual" — Kimi reads it and knows what to do, but still has to do the work itself
- **Plugin** is like an "electric screwdriver" — Kimi presses a button, the tool does the job on its own, and brings back the result

A Skill provides "knowledge"; a Plugin provides "action."

## Installing Plugins

Use the `kimi plugin` command to manage plugins — as easy as the App Store on your phone.

**Install from a local directory**

You've already written a plugin folder; just tell Kimi where it is:

```sh
kimi plugin install /path/to/my-plugin
```

**Install from a ZIP file**

Pack the plugin into a zip and hand it to Kimi:

```sh
kimi plugin install my-plugin.zip
```

**Install from a Git repository**

Plugin code lives on GitHub? One command does it:

```sh
# Install the root plugin
kimi plugin install https://github.com/user/repo.git

# Install a plugin from a subdirectory (common when one repo holds multiple plugins)
kimi plugin install https://github.com/user/repo.git/plugins/my-plugin

# Specify a branch (use the browser-style GitHub URL)
kimi plugin install https://github.com/user/repo/tree/develop/plugins/my-plugin
```

> If the Git repository root has no `plugin.json`, Kimi will proactively check the root and its immediate subdirectories, listing all available plugins for you to pick from.

**List installed plugins**

```sh
kimi plugin list
```

**View plugin details**

```sh
kimi plugin info my-plugin
```

**Remove a plugin**

```sh
kimi plugin remove my-plugin
```

## Creating a Plugin

Writing a plugin takes just three steps — simpler than cooking a tomato-and-egg stir-fry:

1. Create a folder
2. Write a `plugin.json`
3. Write the tool scripts

**Folder structure**

```
my-plugin/
├── plugin.json       # Plugin ID card (required)
├── config.json       # Config file (optional, for storing passwords and other secrets)
└── scripts/          # Tool scripts go here
    ├── greet.py
    └── calc.ts
```

**How to write `plugin.json`**

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "My custom plugin for project X",
  "config_file": "config.json",
  "inject": {
    "api_key": "api_key",
    "endpoint": "base_url"
  },
  "tools": [
    {
      "name": "greet",
      "description": "Generate a greeting message",
      "command": ["python3", "scripts/greet.py"],
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name to greet"
          }
        },
        "required": ["name"]
      }
    }
  ]
}
```

**Field descriptions**

| Field | Required | Meaning |
|-------|----------|---------|
| `name` | Yes | Plugin name; lowercase letters, numbers, and hyphens only |
| `version` | Yes | Version number; use semantic versioning (like `1.0.0`) |
| `description` | No | What the plugin does; Kimi reads this to understand your plugin |
| `config_file` | No | Config file path for credential injection; used for storing passwords and other secrets |
| `inject` | No | Credential injection mapping; the key is the target path, the value is the source variable name. Explained in detail below |
| `tools` | No | List of tools; without tools the plugin can only act as a Skill |

**Tool field descriptions**

| Field | Required | Meaning |
|-------|----------|---------|
| `name` | Yes | Tool name |
| `description` | Yes | What the tool does; Kimi relies on this to decide when to call it |
| `command` | Yes | How to run the tool; write it as an array of strings (like `["python3", "scripts/greet.py"]`) |
| `parameters` | No | What parameters the tool needs; described in JSON Schema format |

The `parameters` part looks intimidating, but it's really just answering three questions:
1. What parameters are needed?
2. What type is each parameter?
3. Which parameters are mandatory?

In the example above, the `greet` tool needs a `name` parameter, the type is string, and it's required.

## Credential Injection

If your plugin needs to call an LLM API (like your own large-model service), you may need an API key and an endpoint address. Hard-coding the key directly into the script isn't safe, so Kimi offers a "credential injection" mechanism.

**How it works**: You declare in `plugin.json` "I need these two things," and when installing, Kimi will automatically fill in its current API key and base URL into your `config.json`. After that, your script can read `config.json` to get the key.

**Config example**

```json
{
  "config_file": "config.json",
  "inject": {
    "llm.api_key": "api_key",
    "llm.endpoint": "base_url"
  }
}
```

What this means:
- Kimi fills its `api_key` into the `llm.api_key` spot in your `config.json`
- Kimi fills its `base_url` into the `llm.endpoint` spot in your `config.json`

**Supported injection variables**

| Variable | Meaning |
|----------|---------|
| `api_key` | LLM provider's API key (supports OAuth tokens and regular API keys) |
| `base_url` | LLM API endpoint address |

**`config.json` template**

```json
{
  "llm": {
    "api_key": "",
    "endpoint": ""
  }
}
```

During installation, Kimi Code CLI injects the currently configured API key and base URL into the specified config file. If OAuth is configured, a valid token is automatically obtained and injected. Later, when the application starts, Kimi Code CLI will also try to write the latest credentials (such as the refreshed OAuth token) into the configuration file of the installed plugin.

Generally, there is no need to reinstall the plugin in order to update credentials: after switching the LLM provider or re-authorizing, restarting Kimi Code CLI will automatically refresh the credentials in the configuration file. The plugin tool will also obtain the currently valid credentials through environment variables when it is actually run. The plugin needs to be reinstalled only when the configuration structure of the plugin itself (such as `config_file` or `inject` mapping) is modified.

> **A small pitfall about environment variable names**
> The keys under `inject` (for example, `llm.api_key`) are also passed to your tool scripts as environment variable names. But dots (`.`) don't play nice in some environments (for example, `$llm.api_key` will error in a shell). The fix:
> - **Node.js**: use `process.env["llm.api_key"]`
> - **Python**: use `os.environ["llm.api_key"]`
> 
> If you want a friendlier environment variable name, we recommend using uppercase underscore format (like `LLM_API_KEY`), and adjusting the structure of `config.json` accordingly.

## Tool Script Specification

How do tool scripts talk to Kimi? Through standard input (stdin) and standard output (stdout).

**How Kimi passes parameters to the script**

Kimi writes the parameters as JSON and "pipes" them into the script's standard input:

```json
{
  "name": "World"
}
```

**How the script returns results to Kimi**

The script writes results to standard output. If you want to return structured data, outputting JSON is recommended:

```json
{
  "content": "Hello, World!"
}
```

**Python example**

```python
#!/usr/bin/env python3
import json
import sys

# Read parameters from standard input
params = json.load(sys.stdin)
name = params.get("name", "Guest")

# Generate result
result = {"content": f"Hello, {name}!"}

# Write to standard output
print(json.dumps(result))
```

**TypeScript example**

```typescript
#!/usr/bin/env tsx
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let input = "";
rl.on("line", (line) => {
  input += line;
});

rl.on("close", () => {
  const params = JSON.parse(input);
  const name = params.name || "Guest";
  console.log(JSON.stringify({ content: `Hello, ${name}!` }));
});
```

## Give Your Plugin a "User Manual" (Bundled Skill)

Besides `plugin.json`, you can also put a `SKILL.md` in the plugin folder. This is like giving your plugin a "user manual" — Kimi discovers it automatically on startup, with no extra registration needed, because `~/.kimi/plugins/` is treated as a skills root (see [Skills](./skills.md) for how skill discovery works).

Why do you need a manual? Because `plugin.json` can only tell Kimi "what this tool does," but `SKILL.md` can tell Kimi "in what situation should which tool be used, how to use it, and what to watch out for."

**Directory structure**

```
my-plugin/
├── plugin.json
├── SKILL.md          # Optional: the plugin's user manual
└── scripts/
```

The skill's name is taken from the `name` frontmatter at the top of `SKILL.md` if present; otherwise the folder name is used. This Skill is discovered with `extra` scope, meaning same-name project-level or user-level skills still take priority over the one bundled with the plugin.

> **Limitation**: A plugin can only carry one manual. Nested structures like `my-plugin/skills/xxx/SKILL.md` are not scanned.

## A Complete Plugin Example

```json
{
  "name": "sample-plugin",
  "version": "1.0.0",
  "description": "Sample plugin demonstrating Skills + Tools",
  "tools": [
    {
      "name": "py_greet",
      "description": "Generate a greeting message (Python tool)",
      "command": ["python3", "scripts/greet.py"],
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name to greet"
          },
          "lang": {
            "type": "string",
            "enum": ["en", "zh", "ja"],
            "description": "Language"
          }
        },
        "required": ["name"]
      }
    },
    {
      "name": "ts_calc",
      "description": "Evaluate a math expression (TypeScript tool)",
      "command": ["npx", "tsx", "scripts/calc.ts"],
      "parameters": {
        "type": "object",
        "properties": {
          "expression": {
            "type": "string",
            "description": "Math expression to evaluate"
          }
        },
        "required": ["expression"]
      }
    }
  ]
}
```

## Where Plugins Are Installed

All plugins are installed in the `~/.kimi/plugins/` directory. Each plugin is an independent subfolder containing the complete `plugin.json` and script files.

> **Plugin vs MCP Server**
> - **MCP**: Like a 24-hour service desk — suitable for scenarios that need continuous running, complex workflows, or cross-program communication
> - **Plugin**: Like a handy tool you grab at will — suitable for simple scripts, project-specific features, or quick experiments
