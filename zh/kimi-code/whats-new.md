# 最新动态

记录 Kimi Code 各产品的新功能与核心修复，重点介绍最值得关注的变化。

<div class="wn-timeline">

<!-- ─────────────── v0.8.0 ─────────────── -->
<div class="wn-entry">
<div class="wn-meta">
  <span class="wn-badge">最新</span>
  <span class="wn-product">Kimi Code CLI</span>
  <div class="wn-version">v0.8.0</div>
  <div class="wn-date">2026 年 6 月 2 日</div>
</div>
<div class="wn-content">

**不用一轮一轮地催了——自主 Goal 模式（实验）**：给 Kimi 一个目标，它会持续推进、自己决定下一步，直到完成或遇到真正需要你决策的阻塞。输入 `/goal <目标>` 启动，用 `/goal pause` / `/goal resume` / `/goal cancel` 随时介入。需提前设置 `KIMI_CODE_EXPERIMENTAL_GOAL_COMMAND=1`。→ [自主 goal](/kimi-code-cli/reference/slash-commands#自主-goal实验功能)

**Agent 遇到问题不再卡住——后台结构化提问**：以前 Agent 碰到需要你确认的小问题，整个流程就停在那儿等。现在它会把问题挂到后台，继续推进其他步骤，你回来看到的是进度，而不是空白的等待界面。→ [AskUserQuestion](/kimi-code-cli/reference/tools#协作类)

**Shell 里直接管理供应商——`kimi provider` 子命令**：不用进 TUI，在终端直接增删供应商。`kimi provider add <url>` 从自定义 registry 批量导入，`catalog list / catalog add` 从 models.dev 公共目录挑选。适合脚本或 CI 场景。→ [kimi provider](/kimi-code-cli/reference/kimi-command#kimi-provider)

此外：**后台自动更新**默认开启（可在 `tui.toml` 中关闭）；**上下文压缩**时待办列表会附在摘要里，Agent 恢复后不会忘记之前做到哪一步。

</div>
</div>

<!-- ─────────────── v0.7.0 ─────────────── -->
<div class="wn-entry">
<div class="wn-meta">
  <span class="wn-product">Kimi Code CLI</span>
  <div class="wn-version">v0.7.0</div>
  <div class="wn-date">2026 年 6 月 2 日</div>
</div>
<div class="wn-content">

**切换模型不用再改配置文件——`/provider` 交互式管理器**：TUI 内输入 `/provider` 打开可视化界面，所有已配置的供应商一览无余，新增、删除、切换都在这里完成，按供应商分标签页选择模型。从此告别手改 `config.toml`。→ [平台与模型](/kimi-code-cli/configuration/providers-and-models#provider-与供应商管理)

**自定义端点也能精确控制 Thinking——`KIMI_MODEL_ADAPTIVE_THINKING`**：接非官方命名的自定义端点时，Kimi 无法自动判断模型是否支持 adaptive thinking。这个环境变量让你显式指定，不再靠猜。→ [模型字段](/kimi-code-cli/configuration/configuration-files#models)

此外：定时任务触发时间改为按**本地时区**显示，不再是 UTC。

</div>
</div>

<!-- ─────────────── v0.6.0 ─────────────── -->
<div class="wn-entry">
<div class="wn-meta">
  <span class="wn-product">Kimi Code CLI</span>
  <div class="wn-version">v0.6.0</div>
  <div class="wn-date">2026 年 5 月 29 日</div>
</div>
<div class="wn-content">

**临时换模型不用动配置文件——`KIMI_MODEL_*` 环境变量通道**：设两个环境变量（`KIMI_MODEL_NAME` + `KIMI_MODEL_API_KEY`）就能让 Kimi Code 切到指定模型，重启后自动失效。供应商类型、Base URL、上下文长度、Thinking 配置都有对应的 `KIMI_MODEL_*` 变量可覆盖——测试新模型或在 CI 里切换端点从此不需要碰 `config.toml`。→ [用环境变量定义模型](/kimi-code-cli/configuration/environment-variables#用环境变量定义模型-kimi-model)

**一行命令装社区插件——GitHub URL 直接安装**：`/plugins install https://github.com/<owner>/<repo>` 即可安装最新 release，也支持指定分支、tag 或 commit 锁定版本。Plugin 管理器会标注来源信任等级（`kimi-official` / `curated` / `third-party`），方便判断风险。→ [安装与管理](/kimi-code-cli/customization/plugins#安装与管理)

**长任务不再被强制打断——移除默认步数上限**：之前 Agent 每轮最多执行 1000 步就会停下来，现在已取消这个限制。如果你需要重新设一个上限，在 `config.toml` 里配置 `max_steps_per_turn`。→ [loop\_control](/kimi-code-cli/configuration/configuration-files#loop_control)

</div>
</div>

<!-- ─────────────── v0.5.0 ─────────────── -->
<div class="wn-entry">
<div class="wn-meta">
  <span class="wn-product">Kimi Code CLI</span>
  <div class="wn-version">v0.5.0</div>
  <div class="wn-date">2026 年 5 月 28 日</div>
</div>
<div class="wn-content">

**让 Kimi 定时帮你做事——定时任务**：用自然语言就能设置定时计划，Kimi 按 cron 节奏自动执行，或到点提醒你回来检查。计划绑定当前会话，`kimi resume` 后继续触发，不需要你守着。

```
每个工作日上午 9 点帮我汇总 CI 失败情况
30 分钟后提醒我检查部署
```

→ [定时任务](/kimi-code-cli/reference/tools#定时任务)

**无人值守但不乱跑——`/auto` 权限模式**：比 `--yolo` 更克制的自动化模式。开启后工具审批自动处理、Agent 不向你提问，但它仍然保留了权限判断，不会盲目执行危险操作。适合不想频繁确认但又不放心完全放开的场景。→ [交互与输入](/kimi-code-cli/interaction#yolo--auto-模式)

此外：`Ctrl-O` 展开工具输出时 Bash 命令显示完整内容；待办列表面板超出 5 行时折叠显示 `+N more`。

</div>
</div>

<!-- ─────────────── v0.4.0 ─────────────── -->
<div class="wn-entry">
<div class="wn-meta">
  <span class="wn-product">Kimi Code CLI</span>
  <div class="wn-version">v0.4.0</div>
  <div class="wn-date">2026 年 5 月 27 日</div>
</div>
<div class="wn-content">

**社区工具可以直接接进来了——Plugin 系统上线**：Plugin 是比 MCP 更高一级的打包单元——一个 Plugin 可以同时带 Agent Skills、MCP servers，装上就能用，不用单独配置每一项。`/plugins` 打开交互式管理器，`Space` 安装或更新，`M` 管理 MCP server 开关。官方 marketplace 同步上线，Kimi Datasource 数据插件已上架。→ [Plugins](/kimi-code-cli/customization/plugins)

**对话记录可以保存下来了——会话导出**：`/export-md` 把当前会话导出为可读的 Markdown 文件，方便归档或分享；`/export-debug-zip` 打包完整会话目录（含诊断日志），提交反馈时直接附上。→ [会话与上下文](/kimi-code-cli/sessions#导出会话)

**只读操作不再弹审批——权限系统重构**：工作目录外的只读文件操作不再打断你，只有真正有副作用的操作才需要确认。会话级审批现在精确匹配调用，路径匹配改为大小写不敏感。→ [权限配置](/kimi-code-cli/configuration/configuration-files#permission)

</div>
</div>

<!-- ─────────────── v0.2.0 – v0.3.0 ─────────────── -->
<div class="wn-entry">
<div class="wn-meta">
  <span class="wn-product">Kimi Code CLI</span>
  <div class="wn-version">v0.2.0 – v0.3.0</div>
  <div class="wn-date">2026 年 5 月 26 日</div>
</div>
<div class="wn-content">

**DeepSeek、Qwen 等带思考的模型直接能用——OpenAI 兼容推理模型支持**：`openai` 供应商现在自动识别各家的推理字段（`reasoning_content`、`reasoning_details`、`reasoning`），不需要额外配置。通过 One API、新月等网关接入的托管服务也同样适用。→ [openai 供应商](/kimi-code-cli/configuration/providers-and-models#openai)

**退出登录不再误操作——`/logout` 支持选择供应商**：以前 `/logout` 会退出当前供应商，没有确认。现在弹出选择器列出所有已登录供应商，当前项默认高亮，手动选择再退出。

**更容易加新供应商——`/connect` 命令**：从 models.dev 公共目录搜索供应商并一键配置，不用手写 TOML。（v0.7.0 起已升级为更完整的 `/provider` 命令。）

</div>
</div>

<!-- ─────────────── v0.1.0 ─────────────── -->
<div class="wn-entry">
<div class="wn-meta">
  <span class="wn-product">Kimi Code CLI</span>
  <div class="wn-version">v0.1.0</div>
  <div class="wn-date">2026 年 5 月</div>
</div>
<div class="wn-content">

**Kimi Code CLI 新版首发**，底层从 Python / uv 完整重写为 TypeScript / Node.js。这不是一次渐进式更新，而是一个新起点——核心架构、安装方式、配置格式全面升级。

与旧版 kimi-cli 的主要区别：

| 对比项 | 旧版 kimi-cli | 新版 Kimi Code CLI |
| --- | --- | --- |
| 运行时 | Python + uv | Node.js（无 Python 依赖） |
| 安装 | `uv tool install` | 一行 `curl` 脚本或 `npm install -g` |
| 配置文件 | `~/.kimi/config.toml` | `~/.kimi-code/config.toml`（格式不兼容） |
| 终端界面 | 基础文本输出 | 全功能 TUI（对话视图 + 状态栏 + 审批面板） |
| 启动速度 | 较慢（Python 冷启动） | 更快（Node.js 原生二进制） |
| 多供应商支持 | 有限 | 内置 Anthropic / OpenAI / Gemini / Vertex 等 |
| Agent 子任务 | 不支持 | 内置 coder / explore / plan 三种子 Agent |
| Plugin 系统 | 不支持 | 支持（v0.4.0 起） |
| 定时任务 | 不支持 | 支持（v0.5.0 起） |

已有 kimi-cli 数据（配置、会话、MCP 声明）可通过 `kimi migrate` 一键迁移。→ [版本升级](/kimi-code-cli/cli-migration)

</div>
</div>

</div>

<style>
.wn-timeline {
  margin-top: 2rem;
}
.wn-entry {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 0 2rem;
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-divider);
}
.wn-entry:last-child {
  border-bottom: 1px solid var(--vp-c-divider);
}
.wn-meta {
  padding-top: 2px;
}
.wn-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.wn-product {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}
.wn-version {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}
.wn-date {
  font-size: 12px;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}
.wn-content {
  font-size: 15px;
  line-height: 1.7;
}
.wn-content p {
  margin: 0 0 1em;
}
.wn-content p:last-child {
  margin-bottom: 0;
}
@media (max-width: 640px) {
  .wn-entry {
    grid-template-columns: 1fr;
    gap: 0.5rem 0;
  }
}
</style>
