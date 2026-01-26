# Kimi Code for VS Code

Kimi Code for VS Code 是集成于 Visual Studio Code 的扩展插件。安装后，您可在编辑器内直接发起提问、审查代码 diff 并快速提交变更。插件能够读取您引用的文件内容，并通过可视化界面展示修改建议，经您确认后执行。整个流程由您掌控，同时显著提升开发效率。

![Kimi Code VS Code](./images/kimi-code-showcase.jpeg)

本扩展在 VS Code 中提供了原生聊天面板，支持通过 `@` 符号引用文件或文件夹、`/` 命令执行项目扫描与上下文管理、diff 视图展示文件变更并支持回退操作，同时支持集成 MCP 服务器以调用外部工具。聊天面板可置于活动栏、侧边栏或独立标签页中。

## 环境要求

需拥有 Kimi 账号订阅或 Kimi API 密钥。

## 安装方式

通过 [VS Code Marketplace](vscode:extension/moonshot-ai.kimi-code) 安装。

若安装后未显示扩展，请重启 VS Code 或在命令面板中执行 "Developer: Reload Window" (Mac: Cmd+Shift+P, Windows/Linux: Ctrl+Shift+P)。

## 身份认证

Kimi Code 支持两种认证模式：

**Kimi 账号模式**：点击登录按钮，浏览器将打开授权页面，完成授权流程后返回 VS Code。

**Kimi API 密钥模式**：若已配置 Kimi API 密钥，可点击跳过登录。插件将在此模式下运行。

![Kimi Code Gear Icon](images/kimi-code-gear-icon.png)

您可随时通过齿轮图标切换认证模式。登出后将返回登录界面。

## 基本使用

### 打开面板

![Kimi Code Command Palette](images/kimi-code-command-palette.png)

点击活动栏中的 Kimi 图标，或通过命令面板执行 "Kimi Code" 命令。

### 文件引用

输入 `@` 后选择文件或文件夹名称。例如：`@src/handlers/` 引用文件夹，`@app.ts` 引用文件，`@src/app.ts:10-20` 引用特定行范围。

按 `Alt+K` 可快速插入当前文件或选中代码作为引用。

### 斜杠命令

输入 `/` 打开命令菜单。使用 `/init` 扫描项目并生成文档，或使用 `/compact` 压缩过长的上下文。

### 媒体文件输入

支持粘贴、拖拽或选择媒体文件。支持的格式包括：PNG、JPEG、GIF、WebP、HEIC 等图片格式，以及 MP4、WebM、MOV 等视频格式。每条消息最多可附加 9 个文件，其中单张图片不超过 5MB，单个视频不超过 40MB，总计不超过 80MB。当附加媒体文件时，不支持多模态的模型将被自动过滤。

## 模型与深度思考模式

通过输入栏下拉菜单切换模型。

部分模型支持扩展推理能力。思考模式切换有三种状态：模型不支持思考模式时隐藏、用户可手动启用/禁用、或像 k2-thinking 模型始终开启。

启用后，思考步骤在响应中默认折叠，可展开查看推理过程。

## 操作确认与工具执行

当 Kimi 提议运行工具或写入文件时，将显示确认对话框，提供三个选项：

- **Yes**：仅批准当前操作
- **Yes, for this session**：批准当前会话内同类操作，直至开启新会话
- **No**：拒绝执行操作

在设置中启用 `kimi.yoloMode` 可自动批准所有工具调用。适用于信任工作流程且追求效率的场景。

## 文件变更追踪

Kimi 修改文件后，所有变更将被追踪并显示在"文件变更"栏中。您可以查看被修改文件的列表及其状态（新增、修改或删除），以及增删行数统计。

针对每个文件，您可在 VS Code 原生 diff 视图中查看变更、恢复至原始状态，或保留变更以清除追踪记录。支持批量操作，可一次性保留或撤销所有变更。基准状态在会话中首次修改时捕获，回退将恢复至此基准版本。

## 历史会话

点击面板顶部的历史下拉菜单可浏览过往会话。会话数据本地存储，支持关键词搜索。您可删除旧会话或加载会话以继续之前的对话。

状态栏显示上下文使用百分比及输入输出 token 计数。当上下文使用率较高时，请使用 `/compact` 命令进行压缩。

## MCP 服务器

MCP（Model Context Protocol）服务器可为 Kimi 扩展外部工具与服务。通过操作菜单 > MCP 服务器进行管理。

支持两种传输类型：stdio（本地命令行工具，需指定命令、参数和环境变量）和 http（远程服务，需指定 URL，可选 OAuth）。

![Kimi Code MCP Servers](images/kimi-code-mcp.png)

提供推荐服务器的一键安装，包括 Playwright（浏览器自动化）、Context7（实时文档）和 GitHub（API 访问）。部分服务器需 OAuth 认证，点击授权按钮打开流程，或重置凭证。保存前可测试连接以验证服务器可用性。

## 命令与快捷键

| 快捷键                          | 功能                                  |
| ------------------------------ | ------------------------------------ |
| `Ctrl+Shift+K` / `Cmd+Shift+K` | 聚焦 Kimi 输入框                      |
| `Alt+K`                        | 插入当前文件引用                      |
| `Ctrl+N` / `Cmd+N`             | 新建对话（需启用 `kimi.enableNewConversationShortcut`）|

在命令面板中输入 "Kimi Code" 可访问更多命令：在新标签页打开、在侧边栏打开、新建对话等。

## 设置配置

在 VS Code 设置的 "Kimi" 部分进行配置。

| 设置项                              | 默认值 | 说明                                  |
| ------------------------------------ | ------- | ------------------------------------ |
| `kimi.yoloMode`                      | false   | 自动批准所有工具调用                  |
| `kimi.autosave`                      | true    | Kimi 读写文件前自动保存               |
| `kimi.executablePath`                | ""      | 自定义 Kimi Code CLI 路径（空值使用内置）|
| `kimi.enableNewConversationShortcut` | false   | 启用 Cmd/Ctrl+N 新建对话快捷键        |
| `kimi.useCtrlEnterToSend`            | false   | 使用 Ctrl/Cmd+Enter 发送消息          |
| `kimi.environmentVariables`          | {}      | 传递给 Kimi Code CLI 的环境变量        |

## 故障排查

**未打开工作区**：请在 VS Code 中打开文件夹，Kimi Code 需要工作区才能正常工作。

**CLI 未找到**：请手动安装 Kimi Code CLI 并设置 `kimi.executablePath`，或确保内置 CLI 存在。

**登录持续失败**：请尝试跳过登录使用 API 密钥模式，检查网络连接，或稍后通过操作菜单重试。

**发送无响应**：请确认 Kimi Code CLI 可用、模型已配置且工作区文件夹已打开。通过 "Kimi Code: Show Logs" 查看错误日志。

**连接超时**：若 30 秒内无响应将超时。请检查网络后重试。

**预检错误**：某些错误会阻止发送，如 Kimi Code CLI 未找到、版本过低、未登录或会话忙碌。错误将以 toast 提示，您的输入将被保留以便重试。

## 典型工作流

**代码解读**：输入 `@` 选择文件或文件夹，请求解释代码流程，可继续追问细节。

**重构**：引用目标代码如 `@src/feature/`，请求重构方案，审查 diff 并选择性批准，必要时使用回退。

**调试**：粘贴错误信息或堆栈跟踪，引用相关文件，请求诊断与修复，然后批准提议的变更。

**项目概览**：引用文件夹如 `@src/services/`，请求模块地图或架构摘要，可继续询问依赖关系或薄弱环节。

## 快速参考

输入 `/` 打开命令菜单，`@` 引用文件或文件夹。按 `Alt+K` 插入当前文件。通过操作菜单（齿轮图标）访问设置、MCP 配置和认证。文件变更栏显示所有修改，支持 diff 和回退。切换思考模式进行深度推理，或启用 YOLO 模式自动批准操作。

---