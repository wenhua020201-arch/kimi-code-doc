# Configuration

Configure in the "Kimi" section of VS Code settings (you can also open it via the action menu → **General Config**).

### Operation Approval

| Setting | Default | Description |
| --- | --- | --- |
| `kimi.yoloMode` | `false` | Automatically approve all tool calls. Suitable for scenarios where you trust the workflow and pursue efficiency |

### Files and Editor

| Setting | Default | Description |
| --- | --- | --- |
| `kimi.autosave` | `true` | Automatically save files before Kimi reads or writes |
| `kimi.editorContext` | `never` | Controls when to share the current editor's file and cursor position (`never` / `onConversationStart` / `onFileChange`) |

### Input and Shortcuts

| Setting | Default | Description |
| --- | --- | --- |
| `kimi.useCtrlEnterToSend` | `false` | Use Ctrl/Cmd+Enter to send messages |
| `kimi.enableNewConversationShortcut` | `false` | Enable Cmd/Ctrl+N new conversation shortcut (enabling this will occupy the system's default "New File" shortcut) |

### Model and Reasoning

| Setting | Default | Description |
| --- | --- | --- |
| `kimi.alwaysExpandThinking` | `false` | Expand thinking/reasoning process by default |

### Advanced

| Setting | Default | Description |
| --- | --- | --- |
| `kimi.executablePath` | `""` | Custom Kimi Code CLI path (empty value uses built-in) |
| `kimi.environmentVariables` | `{}` | Environment variables passed to Kimi Code CLI |
