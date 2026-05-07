# Agents and Subagents

Think of an **Agent** as Kimi's "personality."

It is the same brain (the AI model), but with a different personality, the behavior changes completely. Some personalities are great at writing code, some excel at analysis, some are cautious and ask you at every step, and some are bold and just dive right in. Kimi Code CLI lets you switch between built-in personalities, or you can write your own personality configuration file.

A **Subagent** is like a "temp worker" or "sidekick" for the main agent — when a specialized job comes up, the main agent can call in a sidekick to handle it. Once the sidekick finishes, they hand the results back, and the main agent keeps steering the ship.

## Built-in personalities

Kimi Code CLI comes with two personalities out of the box. You can pick one at startup using the `--agent` parameter:

```sh
kimi --agent okabe
```

### `default` — the default personality

Suitable for most situations. This personality has a full toolbox: it can read and write files, run commands, search the web, manage a todo list, launch background tasks, make plans — an all-rounder.

Its tools include: `Agent` (call a sidekick), `AskUserQuestion` (ask you something), `SetTodoList` (todo list), `Shell` (run commands), `ReadFile` (read files), `ReadMediaFile` (read images/videos), `Glob` (find files), `Grep` (search content), `WriteFile` (write files), `StrReplaceFile` (replace file content), `SearchWeb` (search the web), `FetchURL` (fetch webpage content), `EnterPlanMode` / `ExitPlanMode` (plan mode), `TaskList` / `TaskOutput` / `TaskStop` (background task management).

### `okabe` — the experimental personality

Built on top of `default`, this one adds an extra `SendDMail` tool for sending delayed messages (checkpoint rollback scenarios). It is still experimental and not something most people need day-to-day.

## Writing your own personality

If the built-in personalities do not suit your taste, you can write a YAML configuration file to create your own Kimi.

```sh
kimi --agent-file /path/to/my-agent.yaml
```

**The simplest configuration**

```yaml
version: 1
agent:
  name: my-agent
  system_prompt_path: ./system.md
  tools:
    - "kimi_cli.tools.shell:Shell"
    - "kimi_cli.tools.file:ReadFile"
    - "kimi_cli.tools.file:WriteFile"
```

What this means:
- `name`: the personality's name
- `system_prompt_path`: the path to the system prompt file (relative to this YAML file)
- `tools`: which tools this personality is allowed to use

**Standing on the shoulders of giants (inheritance and overrides)**

You do not have to build a personality from scratch. You can inherit an existing one and only change the parts you care about:

```yaml
version: 1
agent:
  extend: default  # Inherit from default agent
  system_prompt_path: ./my-prompt.md  # Override system prompt
  exclude_tools:  # Exclude certain tools
    - "kimi_cli.tools.web:SearchWeb"
    - "kimi_cli.tools.web:FetchURL"
```

`extend: default` inherits from the built-in default agent. You can also specify a relative path to inherit from another agent file you wrote.

**Configuration fields**

| Field | Required | Description |
|-------|----------|-------------|
| `extend` | No | Who to inherit from — can be `default` or a relative path to another YAML file |
| `name` | Yes (optional when inheriting) | Personality name |
| `system_prompt_path` | Yes (optional when inheriting) | System prompt file path, relative to the agent file |
| `system_prompt_args` | No | Custom arguments passed to the system prompt, merged when inheriting |
| `tools` | Yes (optional when inheriting) | Tool list, format is `module:ClassName` |
| `exclude_tools` | No | Tools to exclude |
| `subagents` | No | Subagent definitions |

## System prompt — the soul

The system prompt is a Markdown file that tells Kimi "who you are, what you are good at, and how you should work." Think of it as an "onboarding manual" written for Kimi.

This manual supports variable substitution: using the `${variable_name}` syntax, Kimi replaces variables with actual values at startup. It also supports Jinja2's `{% include %}` directive to pull in other files.

**Built-in variables**

| Variable | Description |
|----------|-------------|
| `${KIMI_NOW}` | Current time (ISO format) |
| `${KIMI_WORK_DIR}` | Working directory path |
| `${KIMI_WORK_DIR_LS}` | Working directory file list |
| `${KIMI_AGENTS_MD}` | Merged `AGENTS.md` content from project root to working directory (including `.kimi/AGENTS.md`) |
| `${KIMI_SKILLS}` | Loaded skills list |
| `${KIMI_ADDITIONAL_DIRS_INFO}` | Information about additional directories added via `--add-dir` or `/add-dir` |

**Custom variables**

You can define your own variables in the YAML:

```yaml
agent:
  system_prompt_args:
    MY_VAR: "custom value"
```

Then reference them in the prompt with `${MY_VAR}`.

**System prompt example**

```markdown
# My Agent

You are a helpful assistant. Current time: ${KIMI_NOW}.

Working directory: ${KIMI_WORK_DIR}

${MY_VAR}
```

## Subagents — calling sidekicks

The main agent cannot do everything itself. When a specialized job comes up, it can call a "sidekick" (subagent) to handle it.

**How to define a sidekick**

Write this in the personality configuration file:

```yaml
version: 1
agent:
  extend: default
  subagents:
    coder:
      path: ./coder-sub.yaml
      description: "Handle coding tasks"
    reviewer:
      path: ./reviewer-sub.yaml
      description: "Code review expert"
```

Here we defined two sidekicks: `coder` (the programmer) and `reviewer` (the code reviewer). Each sidekick has its own configuration file.

A sidekick's configuration file uses the same format as the main agent, and usually inherits from the main agent:

```yaml
# coder-sub.yaml
version: 1
agent:
  extend: ./agent.yaml  # Inherit from main agent
  system_prompt_args:
    ROLE_ADDITIONAL: |
      You are now running as a subagent...
```

## Built-in sidekick types

Even if you do not define your own sidekicks, the default personality comes with three "professional temp workers" built in, each with their own specialty:

| Type | What they are good at | Tools in their toolbox |
|------|-----------------------|------------------------|
| `coder` | General software engineering: read/write files, run commands, search code | `Shell`, `ReadFile`, `Glob`, `Grep`, `WriteFile`, `StrReplaceFile`, `SearchWeb`, `FetchURL` |
| `explore` | Fast read-only exploration: look around the codebase without making changes | `Shell`, `ReadFile`, `Glob`, `Grep`, `SearchWeb`, `FetchURL` (**no write tools**) |
| `plan` | Planning and architecture design: analyze the current state and create a plan | `ReadFile`, `Glob`, `Grep`, `SearchWeb`, `FetchURL` (**no Shell, no write tools**) |

> Sidekicks cannot call their own sidekicks (no nesting). The `Agent` tool is only available to the main agent.

## How sidekicks work

The main agent summons a sidekick through the `Agent` tool. The sidekick works in an isolated room, separate from the main agent's desk. When finished, the sidekick tidies up the results and hands them back to the main agent.

Each sidekick instance keeps its own "archive room" (`subagents/<agent_id>/`) where work records are stored. The next time the main agent calls the same sidekick ID, it picks up where it left off, carrying its previous memory.

**Why this is useful:**
- **Isolation**: a sidekick's ramblings do not pollute the main agent's memory
- **Parallel**: you can send multiple sidekicks to work on different tasks at the same time
- **Specialized**: each sidekick can have its own custom "onboarding manual"
- **Persistent**: the same instance can retain memory across multiple summons

## Available tools

Below is Kimi Code CLI's complete toolbox. Think of it as the set of tools each personality can pick from.

### `Agent` — summon a sidekick

- **Path**: `kimi_cli.tools.agent:Agent`
- **Description**: Start or resume a subagent instance for a focused task. Three built-in subagent types are available: `coder` (general software engineering), `explore` (fast read-only codebase exploration), and `plan` (implementation planning and architecture design). Each instance maintains its own context history and supports foreground or background execution.

| Parameter | Type | Description |
|-----------|------|-------------|
| `description` | string | Short task description (3–5 words) |
| `prompt` | string | Detailed task description |
| `subagent_type` | string | Built-in subagent type, default `coder` |
| `model` | string | Optional model override |
| `resume` | string | Optional agent instance ID to resume an existing instance |
| `run_in_background` | bool | Whether to run in background, default false |

### `AskUserQuestion` — ask the user a question

- **Path**: `kimi_cli.tools.ask_user:AskUserQuestion`
- **Description**: Present structured questions and options to the user during execution, collecting preferences or decisions. Suitable for scenarios where the user needs to choose between approaches, resolve ambiguous instructions, or provide requirements. Should not be overused — only call when the user's choice genuinely affects subsequent actions.

| Parameter | Type | Description |
|-----------|------|-------------|
| `questions` | array | Questions list (1–4 questions) |
| `questions[].question` | string | Question text, ending with `?` |
| `questions[].header` | string | Short label, max 12 characters (e.g., `Auth`, `Style`) |
| `questions[].options` | array | Available options (2–4), the system adds an "Other" option automatically |
| `questions[].options[].label` | string | Option label (1–5 words), append `(Recommended)` for recommended options |
| `questions[].options[].description` | string | Option description |
| `questions[].multi_select` | bool | Allow multiple selections, default false |

> Do not overuse this tool. Only ask when your choice truly affects what happens next.

### `SetTodoList` — todo list

- **Path**: `kimi_cli.tools.todo:SetTodoList`
- **Description**: Manage todo list, track task progress

| Parameter | Type | Description |
|-----------|------|-------------|
| `todos` | array | Todo list items |
| `todos[].title` | string | Todo item title |
| `todos[].status` | string | Status: `pending`, `in_progress`, `done` |

### `Shell` — run commands

- **Path**: `kimi_cli.tools.shell:Shell`
- **Description**: Execute shell commands. Requires user approval. Uses the appropriate shell for the OS (bash/zsh on Unix, PowerShell on Windows).

| Parameter | Type | Description |
|-----------|------|-------------|
| `command` | string | Command to execute |
| `timeout` | int | Timeout in seconds, default 60, max 300 for foreground / 86400 for background |
| `run_in_background` | bool | Whether to run as a background task, default false |
| `description` | string | Short description for the background task, required when `run_in_background=true` |

When `run_in_background=true`, the command is launched as a background task and the tool immediately returns a task ID, allowing the AI to continue working. The system automatically sends a notification when the task completes. Ideal for long-running builds, tests, watchers, and servers.

### `ReadFile` — read a file

- **Path**: `kimi_cli.tools.file:ReadFile`
- **Description**: Read text file content. Max 1000 lines per read, max 2000 characters per line. Files outside working directory require absolute paths. Every read returns the total number of lines in the file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | string | File path |
| `line_offset` | int | Starting line number, default 1. Supports negative values to read from the end of the file (e.g., `-100` reads the last 100 lines); absolute value cannot exceed 1000 |
| `n_lines` | int | Number of lines to read, default/max 1000 |

### `ReadMediaFile` — read images/videos

- **Path**: `kimi_cli.tools.file:ReadMediaFile`
- **Description**: Read image or video files. Max file size 100MB. Only available when the model supports image/video input. Files outside working directory require absolute paths.

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | string | File path |

### `Glob` — find files by pattern

- **Path**: `kimi_cli.tools.file:Glob`
- **Description**: Match files and directories by pattern. Returns max 1000 matches, patterns starting with `**` not allowed. Can also search within discovered skill roots, and `~` in paths is expanded to the user's home directory.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pattern` | string | Glob pattern (e.g., `*.py`, `src/**/*.ts`) |
| `directory` | string | Search directory, defaults to working directory |
| `include_dirs` | bool | Include directories, default true |

### `Grep` — text search

- **Path**: `kimi_cli.tools.file:Grep`
- **Description**: Search file content with regular expressions, based on ripgrep

| Parameter | Type | Description |
|-----------|------|-------------|
| `pattern` | string | Regular expression pattern |
| `path` | string | Search path, defaults to current directory |
| `glob` | string | File filter (e.g., `*.js`) |
| `type` | string | File type (e.g., `py`, `js`, `go`) |
| `output_mode` | string | Output mode: `files_with_matches` (default), `content`, `count_matches` |
| `-B` | int | Show N lines before match |
| `-A` | int | Show N lines after match |
| `-C` | int | Show N lines before and after match |
| `-n` | bool | Show line numbers, default true |
| `-i` | bool | Case insensitive |
| `multiline` | bool | Enable multiline matching |
| `head_limit` | int | Limit output lines |

### `WriteFile` — write a file

- **Path**: `kimi_cli.tools.file:WriteFile`
- **Description**: Write files. Requires user approval. Absolute paths are required when writing files outside the working directory.

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | string | Absolute path |
| `content` | string | File content |
| `mode` | string | `overwrite` (default) or `append` |

### `StrReplaceFile` — replace file content

- **Path**: `kimi_cli.tools.file:StrReplaceFile`
- **Description**: Edit files using string replacement. Requires user approval. Absolute paths are required when editing files outside the working directory.

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | string | Absolute path |
| `edit` | object/array | Single edit or list of edits |
| `edit.old` | string | Original string to replace |
| `edit.new` | string | Replacement string |
| `edit.replace_all` | bool | Replace all matches, default false |

### `SearchWeb` — search the web

- **Path**: `kimi_cli.tools.web:SearchWeb`
- **Description**: Search the web. Requires search service configuration (auto-configured on Kimi Code platform).

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | Search keywords |
| `limit` | int | Number of results, default 5, max 20 |
| `include_content` | bool | Include page content, default false |

### `FetchURL` — fetch a webpage

- **Path**: `kimi_cli.tools.web:FetchURL`
- **Description**: Fetch webpage content, returns extracted main text. Uses fetch service if configured, otherwise uses local HTTP request.

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string | URL to fetch |

### `Think` — record thoughts

- **Path**: `kimi_cli.tools.think:Think`
- **Description**: Let the agent record thinking process, suitable for complex reasoning scenarios

| Parameter | Type | Description |
|-----------|------|-------------|
| `thought` | string | Thinking content |

### `SendDMail` — send a delayed message

- **Path**: `kimi_cli.tools.dmail:SendDMail`
- **Description**: Send delayed message (D-Mail), for checkpoint rollback scenarios

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string | Message to send |
| `checkpoint_id` | int | Checkpoint ID to send back to (>= 0) |

### `EnterPlanMode` — enter plan mode

- **Path**: `kimi_cli.tools.plan.enter:EnterPlanMode`
- **Description**: Request to enter plan mode. After calling, an approval request is presented to the user, who can approve or reject entering plan mode. In YOLO mode, this is only used when the user explicitly requests planning or when there is significant architectural ambiguity.

This tool takes no parameters.

### `ExitPlanMode` — submit a plan

- **Path**: `kimi_cli.tools.plan:ExitPlanMode`
- **Description**: Submit a plan for user approval while in plan mode. Before calling, the plan must be written to the plan file. This tool reads the plan file content and presents it to the user for approval. The user can select an implementation path (exit plan mode and start execution), reject (stay in plan mode and wait for feedback), or provide revision comments.

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | list \| null | When the plan contains multiple alternative implementation paths, list 2–3 options for the user to choose from. Each option has a `label` (1–8 word short name, may append "(Recommended)") and an optional `description` (brief summary). The labels "Approve", "Reject", and "Revise" are reserved and cannot be used. |

### `TaskList` — view background tasks

- **Path**: `kimi_cli.tools.background:TaskList`
- **Description**: List background tasks in the current session. Useful for re-enumerating task IDs after context compaction or checking which tasks are still running.

| Parameter | Type | Description |
|-----------|------|-------------|
| `active_only` | bool | List only active tasks, default true |
| `limit` | int | Maximum number of tasks to return (1–100), default 20 |

### `TaskOutput` — view background task output

- **Path**: `kimi_cli.tools.background:TaskOutput`
- **Description**: Retrieve output and status of a background task. Returns a non-blocking status/output snapshot by default; if output is truncated, use `ReadFile` to page through the full log.

| Parameter | Type | Description |
|-----------|------|-------------|
| `task_id` | string | Task ID to query |
| `block` | bool | Whether to wait for task completion, default false |
| `timeout` | int | Maximum wait time in seconds when `block=true` (0–3600), default 30 |

### `TaskStop` — stop a background task

- **Path**: `kimi_cli.tools.background:TaskStop`
- **Description**: Stop a running background task. Requires user approval. Use only when a task must be cancelled; for normal completion, wait for the automatic notification. Not available in plan mode.

| Parameter | Type | Description |
|-----------|------|-------------|
| `task_id` | string | Task ID to stop |
| `reason` | string | Reason for stopping (optional), default "Stopped by TaskStop" |

## Security boundaries

### Workspace scope

- File reading and writing are typically done within the working directory (and additional directories added via `--add-dir` or `/add-dir`)
- Absolute paths are required when reading files outside the workspace
- Write and edit operations require user approval; absolute paths are required when operating on files outside the workspace

### Operations requiring approval

| Operation | Approval Required |
|-----------|-------------------|
| Shell command execution | Each execution |
| File write/edit | Each operation |
| MCP tool calls | Each call |
| Stop background task | Each stop |
