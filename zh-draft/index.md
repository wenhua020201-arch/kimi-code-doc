---
layout: page
---

<style>
/* ── 根容器 ── */
.hp {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 80px;
  font-family: var(--vp-font-family-base);
}

/* ── Hero ── */
.hp-hero {
  text-align: center;
  padding: 80px 0 72px;
}
.hp-hero h1 {
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #1a6bff 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 16px;
  line-height: 1.15;
}
.hp-hero .hp-sub {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin: 0 0 36px;
  line-height: 1.7;
}
.hp-hero .hp-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.hp-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.18s;
}
.hp-btn-primary {
  background: #1a6bff;
  color: #fff;
}
.hp-btn-primary:hover { background: #1457d9; transform: translateY(-1px); }
.hp-btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}
.hp-btn-secondary:hover { border-color: #1a6bff; color: #1a6bff; }

/* ── Z 字布局 ── */
.hp-z-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  padding: 64px 0;
  border-top: 1px solid var(--vp-c-divider);
}
.hp-z-section.reverse { direction: rtl; }
.hp-z-section.reverse > * { direction: ltr; }

.hp-z-visual {
  border-radius: 14px;
  overflow: hidden;
  background: #0d1117;
  border: 1px solid #30363d;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
}
.hp-z-visual .term-bar {
  background: #21262d;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #30363d;
}
.hp-z-visual .term-dot {
  width: 12px; height: 12px;
  border-radius: 50%;
}
.hp-z-visual .term-dot.red   { background: #ff5f57; }
.hp-z-visual .term-dot.yel   { background: #febc2e; }
.hp-z-visual .term-dot.grn   { background: #28c840; }
.hp-z-visual .term-label {
  color: #8b949e; font-size: 0.8rem; margin-left: 6px;
}
.hp-z-visual .term-body {
  padding: 20px 22px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.82rem;
  line-height: 1.8;
  color: #c9d1d9;
}
.term-prompt { color: #58a6ff; }
.term-cmd    { color: #e6edf3; }
.term-dim    { color: #6e7681; }
.term-green  { color: #3fb950; }
.term-yellow { color: #d29922; }
.term-blue   { color: #58a6ff; }

/* VS Code 视觉块 */
.hp-z-visual.vscode-mock {
  background: #1e1e1e;
  border-color: #3c3c3c;
}
.vscode-mock .vs-titlebar {
  background: #3c3c3c;
  padding: 8px 16px;
  display: flex; align-items: center; gap: 8px;
  border-bottom: 1px solid #3c3c3c;
}
.vscode-mock .vs-title {
  color: #ccc; font-size: 0.78rem;
}
.vscode-mock .vs-body {
  display: grid;
  grid-template-columns: 48px 1fr;
  min-height: 180px;
}
.vscode-mock .vs-sidebar {
  background: #252526;
  border-right: 1px solid #3c3c3c;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 18px;
}
.vscode-mock .vs-icon {
  width: 22px; height: 22px;
  border-radius: 4px;
  background: #4c4c4c;
}
.vscode-mock .vs-icon.active { background: #1a6bff; }
.vscode-mock .vs-chat {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.vs-bubble {
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.78rem;
  line-height: 1.5;
  max-width: 85%;
}
.vs-bubble.user {
  background: #1a6bff22;
  color: #93c5fd;
  align-self: flex-end;
  border: 1px solid #1a6bff44;
}
.vs-bubble.ai {
  background: #252526;
  color: #ccc;
  border: 1px solid #3c3c3c;
}

/* API 代码块 */
.hp-z-visual.api-mock {
  background: #1e2130;
  border-color: #2d3250;
}
.api-mock .api-bar {
  background: #252840;
  padding: 10px 16px;
  display: flex; align-items: center; gap: 8px;
  border-bottom: 1px solid #2d3250;
}
.api-mock .api-lang {
  font-size: 0.75rem; color: #6272a4; margin-left: auto;
}
.api-mock .api-body {
  padding: 20px 22px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.78rem;
  line-height: 1.9;
  color: #f8f8f2;
}
.api-kw   { color: #ff79c6; }
.api-str  { color: #f1fa8c; }
.api-key  { color: #8be9fd; }
.api-val  { color: #bd93f9; }
.api-cmt  { color: #6272a4; }

/* Z 文字区 */
.hp-z-text { }
.hp-z-text .hp-z-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  margin-bottom: 14px;
  letter-spacing: 0.3px;
}
.hp-z-text h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 14px;
  letter-spacing: -0.3px;
  border: none;
  padding: 0;
}
.hp-z-text p {
  color: var(--vp-c-text-2);
  line-height: 1.8;
  margin: 0 0 20px;
  font-size: 0.97rem;
}
.hp-z-text ul {
  padding: 0;
  margin: 0 0 24px;
  list-style: none;
}
.hp-z-text ul li {
  display: flex;
  gap: 8px;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.7;
  padding: 2px 0;
}
.hp-z-text ul li::before {
  content: "✓";
  color: var(--vp-c-brand-1);
  font-weight: 700;
  flex-shrink: 0;
}
.hp-z-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 0.93rem;
  text-decoration: none;
}
.hp-z-link:hover { gap: 8px; }

/* ── 优势卡片 ── */
.hp-cards-section {
  padding: 64px 0;
  border-top: 1px solid var(--vp-c-divider);
}
.hp-cards-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 40px;
  letter-spacing: -0.3px;
}
.hp-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.hp-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 28px;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.hp-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 24px rgba(26,107,255,0.08);
}
.hp-card-icon { font-size: 1.6rem; margin-bottom: 12px; }
.hp-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 8px;
  border: none; padding: 0;
}
.hp-card p {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0;
}
.hp-card .hp-card-stat {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  margin-bottom: 4px;
}

/* ── 响应式 ── */
@media (max-width: 720px) {
  .hp-hero h1 { font-size: 2.2rem; }
  .hp-z-section { grid-template-columns: 1fr; gap: 32px; }
  .hp-z-section.reverse { direction: ltr; }
  .hp-cards { grid-template-columns: 1fr; }
}
</style>

<div class="hp">

<!-- ── Hero ── -->
<section class="hp-hero">
  <h1>Kimi Code</h1>
  <p class="hp-sub">面向开发者的 AI 编程助手<br>在终端和 IDE 中阅读代码、编辑文件、执行命令，自主完成开发任务</p>
  <div class="hp-actions">
    <a href="/kimi-code-cli/getting-started" class="hp-btn hp-btn-primary">🚀 快速开始</a>
    <a href="/kimi-code-for-vscode/getting-started" class="hp-btn hp-btn-secondary">VS Code 扩展</a>
    <a href="/third-party-tools/other-coding-agents" class="hp-btn hp-btn-secondary">API 接入</a>
  </div>
</section>

<!-- ── Z 行 1：CLI（视觉左，文字右）── -->
<section class="hp-z-section">
  <div class="hp-z-visual">
    <div class="term-bar">
      <span class="term-dot red"></span>
      <span class="term-dot yel"></span>
      <span class="term-dot grn"></span>
      <span class="term-label">~/my-project</span>
    </div>
    <div class="term-body">
      <div><span class="term-prompt">❯</span> <span class="term-cmd">kimi</span></div>
      <div class="term-dim">✦ Kimi Code v1.2.0 · kimi-for-coding</div>
      <br>
      <div><span class="term-prompt">你</span> <span class="term-cmd">帮我重构 src/auth/ 目录，提取公共逻辑</span></div>
      <br>
      <div class="term-dim">● 读取文件 src/auth/login.ts</div>
      <div class="term-dim">● 读取文件 src/auth/middleware.ts</div>
      <div class="term-dim">● 读取文件 src/auth/utils.ts</div>
      <br>
      <div><span class="term-green">✔</span> <span class="term-cmd">已提取 AuthHelper 类，3 处重复逻辑合并</span></div>
      <div><span class="term-green">✔</span> <span class="term-cmd">新建 src/auth/helpers.ts</span></div>
      <div><span class="term-yellow">△</span> <span class="term-cmd">修改 3 个文件，确认执行？</span> <span class="term-dim">[y/n]</span></div>
    </div>
  </div>
  <div class="hp-z-text">
    <span class="hp-z-badge">Kimi Code CLI</span>
    <h2>在终端里，让 AI 接管繁琐工作</h2>
    <p>不再在编辑器和终端之间来回切换——Kimi Code CLI 在你的工作流里直接运作，读代码、写文件、跑命令，一步到位。</p>
    <ul>
      <li>自动读取项目文件，理解上下文后再动手</li>
      <li>执行命令前主动展示计划，你来确认</li>
      <li>Plan 模式先规划再执行，复杂任务不跑偏</li>
      <li>后台任务并行运行，不阻塞对话</li>
    </ul>
    <a href="/kimi-code-cli/getting-started" class="hp-z-link">安装 CLI →</a>
  </div>
</section>

<!-- ── Z 行 2：VS Code（文字左，视觉右）── -->
<section class="hp-z-section reverse">
  <div class="hp-z-visual vscode-mock">
    <div class="vs-titlebar">
      <span class="term-dot red"></span>
      <span class="term-dot yel"></span>
      <span class="term-dot grn"></span>
      <span class="vs-title">my-project — VS Code</span>
    </div>
    <div class="vs-body">
      <div class="vs-sidebar">
        <div class="vs-icon"></div>
        <div class="vs-icon active"></div>
        <div class="vs-icon"></div>
        <div class="vs-icon"></div>
      </div>
      <div class="vs-chat">
        <div class="vs-bubble user">帮我给 Button 组件加上 loading 状态</div>
        <div class="vs-bubble ai">好的，我来修改 <code>Button.tsx</code>，添加 loading prop 并处理禁用逻辑……</div>
        <div class="vs-bubble ai" style="color:#3fb950;border-color:#3fb95044;background:#3fb95011">✔ 已修改 src/components/Button.tsx<br>+23 行，-4 行</div>
      </div>
    </div>
  </div>
  <div class="hp-z-text">
    <span class="hp-z-badge">Kimi Code for VS Code</span>
    <h2>编辑器侧边栏，随时召唤 AI 协作</h2>
    <p>在 VS Code 里安装扩展后，Kimi Code 常驻侧边栏，与编辑器深度集成——文件引用、变更追踪、多轮对话，无缝融入日常开发习惯。</p>
    <ul>
      <li>用 <code>@文件名</code> 精准引用上下文</li>
      <li>所有文件变更自动追踪，随时 diff 或撤销</li>
      <li>支持图片、视频输入，描述 UI 直接改代码</li>
      <li>消息队列让你边等回复边排下一问</li>
    </ul>
    <a href="/kimi-code-for-vscode/getting-started" class="hp-z-link">安装扩展 →</a>
  </div>
</section>

<!-- ── Z 行 3：API（视觉左，文字右）── -->
<section class="hp-z-section">
  <div class="hp-z-visual api-mock">
    <div class="api-bar">
      <span class="term-dot red"></span>
      <span class="term-dot yel"></span>
      <span class="term-dot grn"></span>
      <span class="api-lang">python</span>
    </div>
    <div class="api-body">
      <div><span class="api-kw">from</span> anthropic <span class="api-kw">import</span> Anthropic</div>
      <br>
      <div><span class="api-cmt"># 兼容 Anthropic 协议</span></div>
      <div>client = Anthropic(</div>
      <div>&nbsp;&nbsp;<span class="api-key">base_url</span>=<span class="api-str">"https://api.kimi.com/coding/"</span>,</div>
      <div>&nbsp;&nbsp;<span class="api-key">api_key</span>=<span class="api-str">"your-api-key"</span>,</div>
      <div>)</div>
      <br>
      <div>response = client.messages.create(</div>
      <div>&nbsp;&nbsp;<span class="api-key">model</span>=<span class="api-str">"kimi-for-coding"</span>,</div>
      <div>&nbsp;&nbsp;<span class="api-key">max_tokens</span>=<span class="api-val">1024</span>,</div>
      <div>&nbsp;&nbsp;<span class="api-key">messages</span>=[{<span class="api-str">"role"</span>: <span class="api-str">"user"</span>,</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="api-str">"content"</span>: <span class="api-str">"解释这段代码"</span>}],</div>
      <div>)</div>
    </div>
  </div>
  <div class="hp-z-text">
    <span class="hp-z-badge">API 接入</span>
    <h2>接入你喜欢的任意 AI 工具</h2>
    <p>Kimi Code 同时兼容 OpenAI 和 Anthropic 双协议，Claude Code、Roo Code、Cursor 等主流 Coding Agent 均可直接对接，无需修改工作流。</p>
    <ul>
      <li>OpenAI 和 Anthropic 双协议兼容</li>
      <li>统一模型 ID <code>kimi-for-coding</code>，后端自动升级</li>
      <li>最高并发 30，输出速度可达 100 Tokens/s</li>
      <li>在 <a href="https://www.kimi.com/code/console" style="color:inherit">控制台</a> 创建最多 5 个 API Key</li>
    </ul>
    <a href="/third-party-tools/other-coding-agents" class="hp-z-link">查看配置 →</a>
  </div>
</section>

<!-- ── 优势卡片 ── -->
<section class="hp-cards-section">
  <h2>为什么选 Kimi Code</h2>
  <div class="hp-cards">
    <div class="hp-card">
      <div class="hp-card-stat">100</div>
      <div style="font-size:0.78rem;color:var(--vp-c-text-3);margin-bottom:10px">Tokens/s 输出速度</div>
      <h3>⚡ 极速响应</h3>
      <p>最高输出速度 100 Tokens/s，复杂任务不卡顿，大文件修改秒级反馈。</p>
    </div>
    <div class="hp-card">
      <div class="hp-card-icon">🔄</div>
      <h3>持续模型升级</h3>
      <p>底层始终对接 Kimi 最新旗舰模型，模型升级自动生效，无需变更配置。</p>
    </div>
    <div class="hp-card">
      <div class="hp-card-icon">🔌</div>
      <h3>广泛生态兼容</h3>
      <p>OpenAI + Anthropic 双协议，覆盖 Claude Code、Roo Code、Cursor 等主流工具，开箱即用。</p>
    </div>
    <div class="hp-card">
      <div class="hp-card-stat">7d</div>
      <div style="font-size:0.78rem;color:var(--vp-c-text-3);margin-bottom:10px">额度自动刷新周期</div>
      <h3>📊 透明额度管理</h3>
      <p>每 7 天自动刷新，设备和 API Key 共享同一套配额，控制台随时查看用量。</p>
    </div>
  </div>
</section>

</div>
