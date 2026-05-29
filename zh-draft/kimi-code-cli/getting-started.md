<script setup>
import { ref } from 'vue'
const copied = ref(false)
const osTab = ref('unix')
const feedback = ref('')

function copyPage() {
  const el = document.querySelector('.vp-doc')
  if (!el) return
  navigator.clipboard.writeText(el.innerText).then(() => {
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  })
}
</script>

<style>
.vp-doc h2 {
  border-top: none !important;
  padding-top: 0 !important;
  margin-top: 44px !important;
}
.vp-doc code { color: var(--vp-c-text-1) !important; }

.vp-doc p a, .vp-doc li a, .vp-doc td a,
.vp-doc blockquote a, .vp-doc .doc-step-body a, .vp-doc .faq-a a,
.vp-doc .tip-block a {
  color: inherit !important;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: var(--vp-c-brand-1);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

/* 表格行分割线 */
.vp-doc table { border-collapse: collapse; border: none; }
.vp-doc tr { border-top: none !important; border-bottom: 1px solid var(--vp-c-divider) !important; }
.vp-doc thead tr, .vp-doc tbody tr { background: transparent !important; }
.vp-doc th, .vp-doc td { border: none !important; background: transparent !important; padding: 10px 24px 10px 0; }
.vp-doc .cmd-table { width: 100%; }
.vp-doc .cmd-table table { width: 100%; table-layout: fixed; }
.vp-doc .cmd-table th, .vp-doc .cmd-table td { padding: 13px 20px; }
.vp-doc .cmd-table th:first-child, .vp-doc .cmd-table td:first-child { width: 40%; }
.vp-doc .cmd-table th:last-child, .vp-doc .cmd-table td:last-child { width: 60%; }

/* 章节导读块（可复用） */
.doc-intro {
  font-style: italic;
  font-size: 0.97rem;
  line-height: 1.85;
  color: var(--vp-c-text-2);
  margin: 0 0 28px;
}

/* 步骤组件 */
.doc-steps { margin: 16px 0 24px; }
.doc-step { display: flex; gap: 16px; position: relative; }
.doc-step:not(:last-child)::after {
  content: ''; position: absolute;
  left: 12px; top: 28px; bottom: 0;
  width: 1px; background: var(--vp-c-divider);
}
.doc-step-num {
  width: 26px; height: 26px; border-radius: 50%;
  background: transparent; border: 1.5px solid #6b7280;
  color: #374151 !important; font-size: 0.75rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 2px; position: relative; z-index: 1;
}
.doc-step-body { flex: 1; padding-bottom: 22px; }
.doc-step:last-child .doc-step-body { padding-bottom: 4px; }
.doc-step-body > p:first-child { margin-top: 2px; }

/* 页面标题行 */
.page-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 16px; margin-bottom: 20px;
}
.page-header h1 { margin: 0 !important; border: none !important; }
.copy-btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 14px; background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider); border-radius: 7px;
  font-size: 0.8rem; color: var(--vp-c-text-2);
  cursor: pointer; white-space: nowrap; flex-shrink: 0; margin-top: 8px;
  font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.copy-btn:hover { border-color: #6b7280; color: var(--vp-c-text-1); }
.copy-btn.done { color: #16a34a; border-color: #16a34a; }


/* Tips 高亮块 */
.tip-block {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 12px 0 4px;
  font-size: 0.88rem;
  line-height: 1.75;
  color: var(--vp-c-text-1);
}
.tip-block .tip-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: #2563eb;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}
.tip-block p, .tip-block ul { margin: 0; }
.tip-block ul { padding-left: 1.2em; }
.tip-block li { margin: 2px 0; }
.tip-block code { color: var(--vp-c-text-1) !important; }
html.dark .tip-block {
  background: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.3);
}

/* 场景卡片 */
.ks-scenario-cards {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 10px; margin: 12px 0 28px;
}
.ks-scenario-card {
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  padding: 16px 18px; transition: border-color 0.15s;
}
.ks-scenario-card:hover { border-color: #9ca3af; }
.ks-scenario-icon { color: var(--vp-c-text-2); margin-bottom: 10px; display: flex; align-items: center; }
.ks-scenario-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 4px; }
.ks-scenario-desc { font-size: 0.82rem; color: var(--vp-c-text-2); line-height: 1.6; }

/* 使用方式卡片 */
.ks-mode-cards {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 10px; margin: 12px 0 28px;
}
.ks-mode-card {
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  padding: 18px; transition: border-color 0.15s;
}
.ks-mode-card:hover { border-color: #9ca3af; }
.ks-mode-icon { color: var(--vp-c-text-2); margin-bottom: 10px; }
.ks-mode-cmd {
  display: inline-block; background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider); border-radius: 5px;
  padding: 2px 10px; font-family: var(--vp-font-family-mono);
  font-size: 0.82rem; color: var(--vp-c-text-1) !important; margin-bottom: 10px;
}
.ks-mode-title { font-weight: 700; font-size: 0.92rem; margin-bottom: 5px; }
.ks-mode-desc { font-size: 0.82rem; color: var(--vp-c-text-2); line-height: 1.6; }

/* OS Tab 切换 */
.os-tabs { margin: 12px 0; }
.os-tab-list {
  display: flex; gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 0;
}
.os-tab-btn {
  padding: 7px 18px;
  font-size: 0.85rem; font-weight: 500;
  font-family: inherit;
  color: var(--vp-c-text-2);
  background: none; border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer; transition: color 0.15s, border-color 0.15s;
}
.os-tab-btn:hover { color: var(--vp-c-text-1); }
.os-tab-btn.active { color: var(--vp-c-brand-1); border-bottom-color: var(--vp-c-brand-1); font-weight: 600; }
.os-tab-panel { padding-top: 2px; }

/* FAQ */
.faq-list { margin-top: 8px; }
.faq-item { margin-bottom: 24px; }
.faq-q {
  font-weight: 700; font-size: 0.97rem;
  margin-bottom: 10px; color: var(--vp-c-text-1);
  display: flex; align-items: flex-start; gap: 8px;
}
.faq-badge {
  font-size: 0.68rem; font-weight: 800; color: #6b7280;
  border: 1.5px solid #9ca3af; border-radius: 4px;
  padding: 1px 5px; margin-top: 2px; flex-shrink: 0;
  letter-spacing: 0.5px; line-height: 1.6;
}
.faq-a { font-size: 0.92rem; color: var(--vp-c-text-2); line-height: 1.8; padding-left: 26px; }
.faq-a p { margin: 0 0 8px; }
.faq-a code { color: var(--vp-c-text-1) !important; }

/* 页面反馈 */
.page-feedback {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 48px;
  gap: 16px;
}
.page-feedback-label {
  font-size: 0.9rem; color: var(--vp-c-text-2);
}
.page-feedback-btns { display: flex; gap: 8px; }
.feedback-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 18px; border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.88rem; color: var(--vp-c-text-2);
  font-family: inherit; cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.feedback-btn:hover { border-color: #9ca3af; color: var(--vp-c-text-1); }
.feedback-btn.active-yes { border-color: #16a34a; color: #16a34a; }
.feedback-btn.active-no  { border-color: #dc2626; color: #dc2626; }

@media (max-width: 720px) {
  .ks-scenario-cards, .ks-mode-cards { grid-template-columns: 1fr; }
}
</style>

<div class="page-header">
<h1>快速开始</h1>
<button class="copy-btn" :class="{ done: copied }" @click="copyPage">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
  {{ copied ? '已复制' : '复制页面' }}
</button>
</div>

<div class="doc-intro">「读完本文，你将能完成 Kimi Code CLI 的安装与账号授权，并通过三个实战练习亲身感受 AI Agent 如何自主工作。」</div>

Kimi Code CLI 是一个运行在终端中的 AI Agent，帮助你完成软件开发任务和终端操作。它可以阅读和编辑代码、执行 Shell 命令、搜索和抓取网页，并在执行过程中自主规划和调整行动。

**Kimi CLI 适合在以下场景中使用：**

<div class="ks-scenario-cards">
  <div class="ks-scenario-card">
    <div class="ks-scenario-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    </div>
    <div class="ks-scenario-title">编写和修改代码</div>
    <div class="ks-scenario-desc">实现新功能、修复 bug、重构代码</div>
  </div>
  <div class="ks-scenario-card">
    <div class="ks-scenario-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </div>
    <div class="ks-scenario-title">理解项目</div>
    <div class="ks-scenario-desc">探索陌生代码库，解答架构和实现问题</div>
  </div>
  <div class="ks-scenario-card">
    <div class="ks-scenario-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </div>
    <div class="ks-scenario-title">自动化任务</div>
    <div class="ks-scenario-desc">批量处理文件、执行构建和测试、运行脚本</div>
  </div>
</div>

**支持三种使用方式：**

<div class="ks-mode-cards">
  <div class="ks-mode-card">
    <div class="ks-mode-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
    </div>
    <div class="ks-mode-cmd">kimi</div>
    <div class="ks-mode-title">交互式命令行</div>
    <div class="ks-mode-desc">在终端中以 Shell 方式与 AI 对话，支持自然语言描述任务或直接执行命令</div>
  </div>
  <div class="ks-mode-card">
    <div class="ks-mode-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    </div>
    <div class="ks-mode-cmd">kimi web</div>
    <div class="ks-mode-title">浏览器界面</div>
    <div class="ks-mode-desc">在本地浏览器中打开图形界面，支持会话管理、文件引用、代码高亮</div>
  </div>
  <div class="ks-mode-card">
    <div class="ks-mode-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
    </div>
    <div class="ks-mode-cmd">kimi acp</div>
    <div class="ks-mode-title">Agent 集成</div>
    <div class="ks-mode-desc">以服务方式运行，通过 Agent Client Protocol 集成到 IDE 和其他本地 Agent 中</div>
  </div>
</div>

## 安装

**安装前确认**：操作系统为 macOS、Linux 或 Windows（通过 PowerShell），并拥有 Kimi 会员订阅或可调用的 API Key。

<div class="doc-steps">

<div class="doc-step">
<span class="doc-step-num">1</span>
<div class="doc-step-body">

**运行安装脚本**

脚本会先安装 [uv](https://docs.astral.sh/uv/)（Python 包管理工具），再通过 uv 安装 Kimi Code CLI：

<div class="os-tabs">
<div class="os-tab-list">
  <button class="os-tab-btn" :class="{ active: osTab === 'unix' }" @click="osTab = 'unix'">macOS / Linux</button>
  <button class="os-tab-btn" :class="{ active: osTab === 'win' }" @click="osTab = 'win'">Windows</button>
</div>

<div class="os-tab-panel" v-show="osTab === 'unix'">

```sh
curl -LsSf https://code.kimi.com/install.sh | bash
```

</div>
<div class="os-tab-panel" v-show="osTab === 'win'">

```powershell
Invoke-RestMethod https://code.kimi.com/install.ps1 | Invoke-Expression
```

</div>
</div>

<div class="tip-block">
<div class="tip-label">Tips</div>
如果你已安装 uv，也可以直接运行：<code>uv tool install --python 3.13 kimi-cli</code>
</div>

</div>
</div>

<div class="doc-step">
<span class="doc-step-num">2</span>
<div class="doc-step-body">

**验证安装**

```sh
kimi --version
```

<div class="tip-block">
<div class="tip-label">Tips</div>
<strong>macOS 用户</strong>：首次运行可能因 Gatekeeper 安全检查较慢。可在「系统设置 → 隐私与安全性 → 开发者工具」中添加你的终端应用来加速后续启动。
</div>

</div>
</div>

</div>

## 第一次运行

进入你的项目目录，按顺序完成以下步骤：

<div class="doc-steps">

<div class="doc-step">
<span class="doc-step-num">1</span>
<div class="doc-step-body">

**启动 CLI**

```sh
cd your-project
kimi
```

</div>
</div>

<div class="doc-step">
<span class="doc-step-num">2</span>
<div class="doc-step-body">

**配置 API 来源**

首次启动后输入 `/login`。推荐选择 **Kimi Code** 平台——会自动打开浏览器完成 OAuth 授权，无需手动管理 API Key。配置完成后自动保存并重新加载。

详见[平台与模型](/kimi-code-cli/configuration/providers-and-models)。

</div>
</div>

<div class="doc-step">
<span class="doc-step-num">3</span>
<div class="doc-step-body">

**提问理解**：用自然语言了解你的项目

```
这个项目的整体架构是怎样的？入口文件在哪里？
```

Kimi Code CLI 会自动搜索和阅读相关文件，然后给出回答。

</div>
</div>

<div class="doc-step">
<span class="doc-step-num">4</span>
<div class="doc-step-body">

**修改代码**：让 AI 直接动手

```
给 README 添加一个"快速开始"部分，包含安装和运行步骤
```

修改文件前会展示 diff 并请求确认——你可以批准、拒绝，或输入反馈让它调整方向。

</div>
</div>

<div class="doc-step">
<span class="doc-step-num">5</span>
<div class="doc-step-body">

**执行命令**：运行并分析结果

```
运行测试，如果有失败的用例就修复它们
```

到这里，你已经体验了三个核心能力：**提问理解**、**修改代码**、**执行命令**。

<div class="tip-block">
<div class="tip-label">Tips</div>
项目中可以运行 <code>/init</code>，让 Kimi Code CLI 分析项目结构并生成 AGENTS.md 文件，帮助 AI 更好地理解你的项目规范。
</div>

</div>
</div>

</div>

## 常用命令速查

<div class="cmd-table">

| 命令 | 说明 |
|------|------|
| `kimi` | 启动交互式对话 |
| `kimi web` | 打开浏览器图形界面 |
| `/login` | 配置或切换 API 来源 |
| `/usage` | 查看剩余额度和配额 |
| `/help` | 查看所有命令和快捷键 |
| `Ctrl-J` | 换行（不提交） |
| `Ctrl-C` / `Ctrl-D` | 中断当前操作 / 退出 |

</div>

完整命令列表请参考[斜杠命令](/kimi-code-cli/reference/slash-commands)和[键盘快捷键](/kimi-code-cli/reference/keyboard-shortcuts)。

## 常见问题

<div class="faq-list">

<div class="faq-item">
<div class="faq-q"><span class="faq-badge">Q</span>我填了 API Key 怎么提示鉴权失败</div>
<div class="faq-a">

先确认你用的 Key 和 Base URL 是不是同一个平台的。`api.kimi.com` 和 `api.moonshot.cn` 是两个完全独立的账号体系，API Key 互不通用：

| 平台 | Base URL | 计费方式 | Key 创建入口 |
|------|---------|---------|-------------|
| **Kimi Code** | OpenAI：`https://api.kimi.com/coding/v1`<br>Anthropic：`https://api.kimi.com/coding/` | 会员订阅（含额度） | [Kimi Code 控制台](https://www.kimi.com/code/console) |
| **Kimi 开放平台** | `https://api.moonshot.cn/v1` | 按量付费 | [开放平台官网](https://platform.kimi.com) |

</div>
</div>

<div class="faq-item">
<div class="faq-q"><span class="faq-badge">Q</span>安装后 `kimi` 命令找不到</div>
<div class="faq-a">

安装脚本会将 `kimi` 添加到 PATH，但需要重启终端或执行 `source ~/.bashrc`（或 `source ~/.zshrc`）才能生效。如果仍然找不到，检查 `~/.local/bin` 是否在你的 PATH 中。

</div>
</div>

<div class="faq-item">
<div class="faq-q"><span class="faq-badge">Q</span>`/login` 后浏览器没有弹出</div>
<div class="faq-a">

如果在远程服务器或无图形界面的环境中，`/login` 会显示一个 URL，手动复制到浏览器打开即可完成授权。

</div>
</div>

</div>

更多问题请参考[常见问题](/kimi-code/faq)。

## 升级与卸载

升级到最新版本：

```sh
uv tool upgrade kimi-cli --no-cache
```

卸载：

```sh
uv tool uninstall kimi-cli
```

## 下一步

- [核心操作](/kimi-code-cli/core-operations) — 学习交互输入、上下文管理、工作模式等交互技巧
- [配置文件](/kimi-code-cli/configuration/configuration-files) — 自定义模型、行为和工具权限
- [MCP 集成](/kimi-code-cli/customization/mcp) — 连接外部工具和数据源扩展能力

<div class="page-feedback">
  <span class="page-feedback-label">{{ feedback ? '感谢你的反馈！' : '这篇文档对你有帮助吗？' }}</span>
  <div class="page-feedback-btns" v-if="!feedback">
    <button class="feedback-btn" @click="feedback = 'yes'">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
      有帮助
    </button>
    <button class="feedback-btn" @click="feedback = 'no'">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
      没帮助
    </button>
  </div>
</div>
