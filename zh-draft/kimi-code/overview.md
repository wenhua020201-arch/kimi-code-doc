<style>
/* ── 去掉 h2 自带上边线 ── */
.vp-doc h2 {
  border-top: none !important;
  padding-top: 0 !important;
  margin-top: 40px !important;
}

/* ── 表格：仅横向行分割线，无外框无纵线 ── */
.vp-doc table {
  border-collapse: collapse;
  width: auto;
  border: none;
}
.vp-doc thead tr {
  background: transparent !important;
}
.vp-doc tbody tr {
  background: transparent !important;
}
.vp-doc tr {
  border-top: none !important;
  border-bottom: 1px solid var(--vp-c-divider) !important;
}
.vp-doc th,
.vp-doc td {
  border: none !important;
  background: transparent !important;
  padding: 10px 20px 10px 0;
}

/* ── 超链接：加粗 + 浅灰下划线，字体不变色 ── */
.vp-doc p a,
.vp-doc li a,
.vp-doc td a,
.vp-doc blockquote a,
.vp-doc .doc-step-body a {
  color: inherit !important;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: var(--vp-c-brand-1);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.vp-doc p a:hover,
.vp-doc li a:hover,
.vp-doc td a:hover,
.vp-doc .doc-step-body a:hover {
  opacity: 0.75;
}

/* ── inline code：去掉蓝色，保持中性深色 ── */
.vp-doc code {
  color: var(--vp-c-text-1) !important;
}

/* ── 缩进 ── */
.indent {
  padding-left: 1.5rem;
}

/* ── 顺序步骤组件（圈 + 连线） ── */
.doc-steps {
  margin: 16px 0 24px;
}
.doc-step {
  display: flex;
  gap: 16px;
  position: relative;
}
.doc-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 13px;
  top: 30px;
  bottom: 0;
  width: 1px;
  background: #dde1e7;
}
.doc-step-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: transparent;
  border: 1.5px solid #9ca3af;
  color: #6b7280 !important;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 3px;
  position: relative;
  z-index: 1;
}
.doc-step-body {
  flex: 1;
  padding-bottom: 24px;
}
.doc-step:last-child .doc-step-body {
  padding-bottom: 4px;
}
.doc-step-body > p:first-child {
  margin-top: 2px;
}
</style>

# Kimi Code 概览

## Kimi Code 是什么

Kimi Code 是 [Kimi 会员权益](https://www.kimi.com/membership/pricing?from=kfc_docs_overview) 中专为开发者提供的智能编程服务，基于 Kimi 最新旗舰模型，通过 CLI、VS Code 扩展插件等产品形态，为开发者提供代码阅读、文件编辑、命令执行等 AI 辅助能力。订阅用户可获取 API Key，将模型能力接入第三方开发工具与平台。

## 核心优势

- **底层模型持续升级**：紧跟 Kimi 最新旗舰模型，持续获得前沿代码理解、推理与生成能力
- **广泛兼容**：完美适配 Kimi Code CLI、VS Code、Claude Code 等各类开发工具
- **极速响应**：最高输出速度可达 100 Tokens/s
- **高频并发**：每 5 小时支持约 300–1200 次请求，最高并发 30

## 开始使用

Kimi Code 支持会员在官方客户端和第三方平台使用，覆盖不同的开发场景。

### 使用官方客户端

<div class="indent">

选择适合你的客户端：

#### Kimi Code CLI

<div class="indent">

适合习惯终端操作的开发者。在终端中与 AI 对话，让它阅读代码、编辑文件、执行命令、搜索网页，自主完成开发任务。

<div class="doc-steps">

<div class="doc-step">
<span class="doc-step-num">1</span>
<div class="doc-step-body">

**安装**

```bash
# macOS / Linux
curl -LsSf https://code.kimi.com/install.sh | bash
```

```powershell
# Windows (PowerShell)
Invoke-RestMethod https://code.kimi.com/install.ps1 | Invoke-Expression
```

</div>
</div>

<div class="doc-step">
<span class="doc-step-num">2</span>
<div class="doc-step-body">

**启动**：安装完成后，在终端中运行 `kimi` 即可启动。

</div>
</div>

</div>

</div>

#### Kimi Code for VS Code

<div class="indent">

适合偏好 VS Code 编辑器的开发者。在编辑器侧边栏与 AI 协同，支持代码补全、文件编辑、网页搜索和自动化任务。

<div class="doc-steps">

<div class="doc-step">
<span class="doc-step-num">1</span>
<div class="doc-step-body">

**安装**：在 VS Code 扩展市场搜索 **Kimi Code**，或访问 [Visual Studio Marketplace](vscode:extension/moonshot-ai.kimi-code) 直接安装。

若安装后未显示扩展，请重启 VS Code 或在命令面板执行 **Developer: Reload Window**（Mac：`Cmd+Shift+P`，Windows/Linux：`Ctrl+Shift+P`）。

</div>
</div>

<div class="doc-step">
<span class="doc-step-num">2</span>
<div class="doc-step-body">

**登录**：点击侧边栏登录按钮，完成 OAuth 授权，即可使用。

</div>
</div>

</div>

其他编辑器如 JetBrains、Zed 可通过 ACP 协议接入，详见 [JetBrains 配置](/third-party-tools/jetbrains) 和 [Zed 配置](/third-party-tools/zed)。

</div>

</div>

### API 接入

<div class="indent">

#### OAuth 自动认证（官方客户端）

<div class="indent">

使用官方客户端的用户通过 OAuth 授权自动接入，无需手动管理 API Key：

- **Kimi Code CLI**：执行 `/login` 命令完成登录
- **VS Code 扩展**：通过侧边栏登录按钮完成登录

</div>

#### API Key（第三方工具 / 自建应用）

<div class="indent">

适用于 Claude Code、Roo Code、OpenCode 等第三方工具，或自行调用 API 的场景：

<div class="doc-steps">

<div class="doc-step">
<span class="doc-step-num">1</span>
<div class="doc-step-body">

**获取 API Key**：登录 [Kimi Code 控制台](https://www.kimi.com/code/console) 创建（最多 5 个，仅创建时显示一次，请妥善保存）。

</div>
</div>

<div class="doc-step">
<span class="doc-step-num">2</span>
<div class="doc-step-body">

**选择协议和 Base URL**：

| 协议 | Base URL |
|------|----------|
| OpenAI 兼容 | `https://api.kimi.com/coding/v1` |
| Anthropic 兼容 | `https://api.kimi.com/coding/` |

模型 ID 统一填写 `kimi-for-coding`，后端自动对应最新模型，无需手动更新。

</div>
</div>

<div class="doc-step">
<span class="doc-step-num">3</span>
<div class="doc-step-body">

**配置到工具**：将 Base URL 和 API Key 填入对应工具的环境变量，详见 [在其他 Coding Agent 中使用](/third-party-tools/other-coding-agents)。

> **注意**：使用时请保持工具的真实 User-Agent 标识，篡改客户端标识将被视为违规，可能导致权益暂停。

</div>
</div>

</div>

</div>

</div>

## 平台对比

Kimi Code 面向个人编程场景。如需在产品中集成大模型，或需要团队协作与用量管理，请访问 [Kimi 开放平台](https://platform.kimi.com)。

| 对比项 | Kimi Code 平台 | Kimi 开放平台 |
|--------|---------------|---------------|
| Base URL | OpenAI：`https://api.kimi.com/coding/v1`<br>Anthropic：`https://api.kimi.com/coding/` | `https://api.moonshot.cn/v1` |
| 计费方式 | 会员订阅，按月/年付费，有频控限制 | 按量付费，充值即用 |
| 最佳场景 | 终端/IDE Agent 编程、多文件工程任务 | 产品集成、企业级调用、多模态应用开发 |

## 额度与限制

Kimi Code 的额度以订阅日为起点**每 7 天自动刷新**，未用完不累积。此外还有**每 5 小时的滚动频率窗口**——即使总量充足，短时间请求过多也会触发限流，窗口滚动后自动恢复。

- 所有登录设备和 API Key 共享同一套配额
- 超过 30 天未活跃的设备自动解绑，重新 `/login` 即可恢复
- 登录 [Kimi Code 控制台](https://www.kimi.com/code/console) 随时查看剩余额度与频限状态

> Kimi Code 与 Kimi 会员计划共享额度。月总额度达到上限后，Kimi Code 额度进入冻结状态，需等待月额度重置或升级订阅。月额度消耗可在 [订阅页面](https://www.kimi.com/membership/subscription) 查看。

## 下一步

- [Kimi Code CLI 快速开始](/kimi-code-cli/getting-started) — 安装、登录、第一次对话
- [Kimi Code for VS Code 快速开始](/kimi-code-for-vscode/getting-started) — 安装扩展、登录、典型工作流
- [在更多第三方工具中使用](/third-party-tools/other-coding-agents) — Claude Code、Roo Code 等
- [常见问题](/kimi-code/faq) — 安装、登录、使用中的常见问题
