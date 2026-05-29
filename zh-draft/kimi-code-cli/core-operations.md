<script setup>
import { ref } from 'vue'
const copied = ref(false)
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
.vp-doc h2 { border-top: none !important; padding-top: 0 !important; margin-top: 44px !important; }
.vp-doc h3 { margin-top: 28px !important; }
.vp-doc code { color: var(--vp-c-text-1) !important; }
.vp-doc p a, .vp-doc li a, .vp-doc td a, .vp-doc th a,
.vp-doc blockquote a, .vp-doc .doc-step-body a {
  color: inherit !important; font-weight: 700;
  text-decoration: underline;
  text-decoration-color: var(--vp-c-brand-1);
  text-decoration-thickness: 1px; text-underline-offset: 3px;
}

/* 表格：仅行分割线 */
.vp-doc table { border-collapse: collapse; border: none; width: 100%; }
.vp-doc tr { border-top: none !important; border-bottom: 1px solid var(--vp-c-divider) !important; }
.vp-doc thead tr, .vp-doc tbody tr { background: transparent !important; }
.vp-doc th, .vp-doc td { border: none !important; background: transparent !important; padding: 10px 20px 10px 0; }

/* 页面标题行 */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
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

/* 章节导读 */
.doc-intro {
  font-style: italic;
  font-size: 0.97rem;
  line-height: 1.85;
  color: var(--vp-c-text-2);
  margin: 0 0 32px;
}

/* 输入参考卡 */
.input-ref {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 8px; margin: 14px 0 20px;
}
.input-ref-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px; padding: 12px 14px;
}
.input-ref-wide { grid-column: 1 / -1; }
.input-ref-key {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--vp-font-family-mono); font-size: 0.82rem;
  color: var(--vp-c-text-1); font-weight: 600; margin-bottom: 6px;
}
.input-ref-desc { font-size: 0.83rem; color: var(--vp-c-text-2); line-height: 1.65; }
.input-ref-desc p { margin: 4px 0 0; }

/* 模式概览表 */
.mode-overview { margin: 16px 0 32px; }
.mode-overview table { width: 100%; }
.mode-overview td:first-child { width: 140px; font-weight: 600; white-space: nowrap; }
.mode-overview td:nth-child(2) { color: var(--vp-c-text-2); }
.mode-overview td:last-child { font-family: var(--vp-font-family-mono); font-size: 0.82rem; color: var(--vp-c-text-2); white-space: nowrap; }

/* 页面反馈 */
.page-feedback {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 48px; gap: 16px;
}
.page-feedback-label { font-size: 0.9rem; color: var(--vp-c-text-2); }
.page-feedback-btns { display: flex; gap: 8px; }
.feedback-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 18px; border-radius: 20px;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  font-size: 0.88rem; color: var(--vp-c-text-2);
  font-family: inherit; cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.feedback-btn:hover { border-color: #9ca3af; color: var(--vp-c-text-1); }

@media (max-width: 720px) {
  .input-ref { grid-template-columns: 1fr; }
}
</style>

<div class="page-header">
<h1>核心操作</h1>
<button class="copy-btn" :class="{ done: copied }" @click="copyPage">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
  {{ copied ? '已复制' : '复制页面' }}
</button>
</div>

<div class="doc-intro">「读完本文，你将掌握顺畅使用 Kimi Code CLI 最核心的操作：如何高效输入和控制 AI、管理对话上下文，以及在不同工作模式间切换。」</div>

## 输入与控制

<div class="input-ref">
  <div class="input-ref-item">
    <div class="input-ref-key">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>
      Ctrl-J / Alt-Enter
    </div>
    <div class="input-ref-desc">插入换行而不提交，<code>Enter</code> 发送整条消息</div>
  </div>
  <div class="input-ref-item">
    <div class="input-ref-key">@ 路径补全</div>
    <div class="input-ref-desc">输入 <code>@</code> 触发文件路径补全，<code>Tab</code>/<code>Enter</code> 选择；Git 仓库优先用 <code>git ls-files</code>，支持万级文件</div>
  </div>
  <div class="input-ref-item">
    <div class="input-ref-key">/ 斜杠命令</div>
    <div class="input-ref-desc">输入 <code>/</code> 触发内置命令菜单，支持模糊匹配。完整列表见<a href="/kimi-code-cli/reference/slash-commands">斜杠命令参考</a></div>
  </div>
  <div class="input-ref-item">
    <div class="input-ref-key">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
      Ctrl-V 粘贴
    </div>
    <div class="input-ref-desc">支持文本、图片（<code>[image:…]</code> 占位符）和视频路径；长文本超过 1000 字符自动折叠为占位符，发送时展开。图片/视频需要模型支持对应能力</div>
  </div>
  <div class="input-ref-item input-ref-wide">
    <div class="input-ref-key">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      Ctrl-O 外部编辑器
    </div>
    <div class="input-ref-desc">打开系统默认编辑器，写完保存后自动回填到输入框，适合复杂的长文本输入；粘贴的折叠占位符在编辑器中自动展开，保存后未修改部分重新折叠</div>
  </div>
</div>

### 多行输入

有时你需要输入多行内容，比如贴入一段代码或错误日志。按 `Ctrl-J` 或 `Alt-Enter` 可以插入换行，而不是直接发送消息。

输入完成后，按 `Enter` 发送整条消息。

### 剪贴板与媒体粘贴

按 `Ctrl-V` 可以粘贴剪贴板中的文本、图片或视频文件。

在 Agent 模式下，较长的粘贴文本（超过 1000 字符或 15 行）会自动折叠为 `[Pasted text #n]` 占位符显示在输入框中，保持界面整洁。完整内容仍会在发送时展开并传递给模型。使用外部编辑器（`Ctrl-O`）时，占位符会自动展开为原始文本，保存后未修改的部分重新折叠。

如果剪贴板中是图片，Kimi Code CLI 会将图片缓存到磁盘并在输入框中显示为 `[image:…]` 占位符。发送消息后，AI 可以看到并分析这张图片。如果剪贴板中是视频文件，其文件路径会以文本形式插入输入框。

> 提示：图片输入需要当前模型支持 `image_in` 能力，视频输入需要支持 `video_in` 能力。

### @ 路径补全

在消息中输入 `@` 后，Kimi Code CLI 会自动补全工作目录中的文件和目录路径。这让你可以方便地引用项目中的文件：

```
帮我看一下 @src/components/Button.tsx 这个文件有没有问题
```

输入 `@` 后开始输入文件名，会显示匹配的补全项。按 `Tab` 或 `Enter` 选择补全项。**在 Git 仓库中，文件发现优先使用 `git ls-files` 查询，可以在包含数万文件的大型仓库中快速定位文件；非 Git 项目则回退到目录扫描。**

### 斜杠命令

斜杠命令是以 `/` 开头的特殊指令，用于执行 Kimi Code CLI 的内置功能，如 `/help`、`/login`、`/sessions` 等。输入 `/` 后会自动显示可用命令列表。完整的斜杠命令列表请参考[斜杠命令参考](/kimi-code-cli/reference/slash-commands)。

### 运行中发送消息（steer）

当 AI 正在执行任务时，你可以直接在输入框中输入并发送后续消息，无需等待当前轮次结束。这个功能称为"引导"（steer），可以在 AI 运行过程中调整其方向。发送时有两种方式：

- **排队（Enter）**：放入队列，当前轮次完成后自动发送
- **立即注入（Ctrl+S）**：立即注入当前轮次上下文

无论哪种方式，发送的引导消息都会追加到上下文中，AI 会看到并响应你的消息。在 AI 运行期间，审批请求和问答面板也支持内联键盘交互。

> 提示：引导消息不会中断 AI 当前正在执行的步骤，而是在步骤间被处理。如果需要立即中断，请使用 `Ctrl-C`。

### 侧问

在 AI 工作期间，你可以使用 `/btw` 命令提出快速侧问，不会打断主对话流程。

```
/btw 这个函数的返回类型是什么？
```

侧问在隔离的上下文中运行：能看到对话历史但不会修改它，也不会调用工具。响应会显示在一个可滚动的模态面板中，使用 ↑/↓ 滚动，Escape 关闭。

> **Wire/ACP 集成**：Wire 和 ACP 客户端可使用 `BtwBegin`/`BtwEnd` Wire 事件配合 `run_side_question()` API。

### 审批与确认

当 AI 需要执行可能有影响的操作（如修改文件、运行命令）时，Kimi Code CLI 会请求你的确认。

确认提示会显示操作的详情，包括 Shell 命令和文件 Diff 预览。如果内容较长被截断，可以按 `Ctrl-E` 展开查看完整内容。你可以选择：

| 选项 | 含义 |
|---|---|
| **允许** | 执行这次操作 |
| **本会话允许** | 在当前会话中自动批准同类操作（此决策会随会话持久化，恢复会话时自动还原） |
| **拒绝** | 不执行此操作 |
| **附带反馈拒绝** | 拒绝操作并输入文字反馈，告诉 Agent 应该如何调整 |

如果你信任 AI 的操作，或者你正在安全的隔离环境中运行 Kimi Code CLI，可以启用「YOLO 模式」来自动批准所有请求：

```sh
# 启动时启用
kimi --yolo

# 或在运行中切换
/yolo
```

你也可以在配置文件中设置 `default_yolo = true`，每次启动时默认开启 YOLO 模式。

开启 YOLO 模式后，底部状态栏会显示黄色的 YOLO 标识。再次输入 `/yolo` 可关闭。

> 注意：YOLO 模式会跳过所有确认，请确保你了解可能的风险。建议仅在可控环境中使用。

### 切换模型

你可以通过 `/model` 命令切换模型和 Thinking 模式。

此命令会先从 API 平台刷新可用模型列表。不带参数调用时，显示交互式选择界面，首先选择模型，然后选择是否开启 Thinking 模式（如果模型支持）。

选择完成后，Kimi Code CLI 会自动更新配置文件并重新加载。

> 提示：此命令仅在使用默认配置文件时可用。如果通过 `--config` 或 `--config-file` 指定了配置，则无法使用此命令。

### 结构化问答

在执行过程中，AI 可能需要你做出选择来决定下一步方向。此时 AI 会使用 `AskUserQuestion` 工具向你展示结构化的问题和选项。

问题面板会显示问题描述和可选项，你可以通过键盘选择：

- 使用方向键（上 / 下）浏览选项
- 按 `Enter` 确认选择
- 按 `Space` 切换多选模式下的选中状态
- 选择 "Other" 选项可以输入自定义文本
- 按 `Esc` 跳过问题

每个问题支持 2–4 个预定义选项，AI 会根据当前任务上下文设置合适的选项和说明。如果有多个问题需要回答，面板会以标签页形式展示，使用左右方向键或 `Tab` 键在问题间切换，已回答的问题会标记为已完成状态，切换回已回答的问题时会恢复之前的选择。

> 提示：AI 只会在你的选择真正影响后续操作时才使用此工具。对于能从上下文推断的决策，AI 会自行判断并继续执行。

### 后台任务

当 AI 需要执行耗时较长的命令（如构建项目、运行测试套件、启动开发服务器）时，可以将命令作为后台任务启动。后台任务在独立进程中运行，AI 可以继续处理其他请求，无需等待命令完成。

后台任务的工作流程：

1. AI 使用 `Shell` 工具的 `run_in_background=true` 参数启动命令
2. 工具立即返回任务 ID，AI 继续处理其他工作
3. 任务完成后，如果 AI 处于空闲状态（等待用户输入），系统会自动触发新的 Agent 轮次来处理结果，无需你手动输入

你可以使用 `/task` 斜杠命令打开交互式任务浏览器，实时查看所有后台任务的状态和输出（包括正在运行中的任务）。

> 提示：默认最多同时运行 4 个后台任务，可在配置文件的 `[background]` 节中调整。CLI 退出时默认会终止所有后台任务。

## 上下文管理

### 会话续接

Kimi Code CLI 会自动保存你的对话历史，方便你随时继续之前的工作。

每次启动 Kimi Code CLI 时，都会创建一个新的会话。在运行过程中，你也可以输入 `/new` 命令随时创建并切换到一个新会话，无需退出程序。

如果你想继续之前的对话，有几种方式：

| 场景 | 命令 |
|---|---|
| 继续当前目录最近的会话 | `kimi --continue` |
| 交互式选择要恢复的会话 | `kimi --session` |
| 恢复指定会话 | `kimi -r <id>` |
| 运行中切换会话 | `/sessions` |

> 提示：`kimi --session` 交互式选择器仅在 Shell 模式下可用。

退出时 CLI 会自动打印续接命令，直接复制运行即可：

```
To resume this session: kimi -r <session-id>
```

空会话不会显示此提示。

`/sessions` 列表会显示每个会话的标题和最后更新时间。按 **Ctrl-A** 可在「仅当前目录」和「所有目录」之间切换范围，方便跨项目查找会话。使用 `/title <text>` 可以为会话设置一个自定义标题，方便后续查找。

当你继续一个已有会话时，Kimi Code CLI 会回放之前的对话历史，让你快速了解上下文。

### 会话状态持久化

除了对话历史，Kimi Code CLI 还会自动保存和恢复会话的运行状态。当你恢复一个会话时，以下状态会自动还原：

- **审批决策**：YOLO 模式的开关状态、通过 "本会话允许" 批准过的操作类型
- **Plan 模式**：Plan 模式的开关状态
- **子 Agent 实例**：通过 `Agent` 工具在会话中创建的子 Agent 实例状态和上下文历史
- **额外目录**：通过 `--add-dir` 或 `/add-dir` 添加的工作区目录

这意味着你不需要在每次恢复会话时重新配置这些设置。例如，如果你在上次会话中批准了某类 Shell 命令的自动执行，恢复会话后这些批准仍然有效。

### 导出与导入

Kimi Code CLI 支持将会话上下文导出为文件，或从外部文件和其他会话导入上下文。

**导出**：输入 `/export` 可以将当前会话的完整对话历史导出为 Markdown 文件：

```
/export
/export ~/exports/my-session.md
```

导出文件包含会话元数据、对话概览和按轮次组织的完整对话记录。

**导入**：输入 `/import` 可以从文件或其他会话导入上下文。导入的内容会作为参考信息附加到当前会话中：

```
/import ./previous-session-export.md
/import abc12345
```

支持导入常见的文本格式文件（Markdown、代码、配置文件等）。你也可以传入一个会话 ID，从该会话导入完整的对话历史。

> 提示：导出文件可能包含敏感信息（如代码片段、文件路径等），分享前请注意检查。

### 清空与压缩

随着对话的进行，上下文会越来越长。Kimi Code CLI 会在需要的时候自动对上下文进行压缩，确保对话能够继续。

你也可以使用斜杠命令手动管理上下文：

**压缩（`/compact`）**：让 AI 总结当前的对话，并用总结替换原有的上下文，保留关键信息的同时减少 token 消耗：

```
/compact
/compact 保留数据库相关的讨论
```

**清空（`/clear`）**：清空当前会话的所有上下文，重新开始对话。通常你不需要使用这个命令，对于新任务，开启新的会话会是更好的选择。

```
/clear
```

> 提示：底部状态栏会显示当前的上下文使用率和 Token 数量（如 `context: 42.0% (4.2k/10.0k)`），帮助你了解何时需要清空或压缩。

> 提示：`/clear` 和 `/reset` 会清空对话上下文，但不会重置会话状态（如审批决策、动态子 Agent 和额外目录）。如需完全重新开始，建议创建一个新会话。

## 工作模式

Kimi Code CLI 有多种工作模式，适用不同场景：

<div class="mode-overview">

| 模式 | 适合场景 | 进入方式 |
|------|---------|---------|
| **Agent**（默认） | 日常 AI 对话与编码 | 启动即用 |
| **Shell** | 快速执行终端命令，不经过 AI | `Ctrl-X` 切换 |
| **Plan** | 复杂任务先规划、再执行，避免跑偏 | `Shift-Tab` / `/plan` |
| **Thinking** | 架构设计、复杂算法等深度推理场景 | `/model` 切换 |
| **Print** | 脚本、CI/CD 等非交互场景 | `--print` 参数 |

</div>

### Agent 与 Shell 模式

Kimi Code CLI 有两种输入模式：

- **Agent 模式**：默认模式，输入的内容会发送给 AI 处理
- **Shell 模式**：直接执行 Shell 命令，无需离开 Kimi Code CLI

按 `Ctrl-X` 可以在两种模式之间切换。当前模式会显示在底部状态栏中。

在 Shell 模式下，你可以像在普通终端中一样执行命令：

```sh
$ ls -la
$ git status
$ npm run build
```

Shell 模式也支持部分斜杠命令，包括 `/help`、`/exit`、`/version`、`/editor`、`/changelog`、`/feedback`、`/export`、`/import` 和 `/task`。

> 注意：Shell 模式中每个命令独立执行，`cd`、`export` 等改变环境的命令不会影响后续命令。

### Plan 模式

Plan 模式是一种只读的规划模式，让 AI 在动手编码之前先制定实施方案，避免在错误方向上浪费精力。

在 Plan 模式下，AI 只能使用只读工具（`Glob`、`Grep`、`ReadFile`）探索代码库，不能修改任何文件或执行命令。AI 会将方案写入一个专门的 plan 文件，然后提交给你审批。你可以选择批准、拒绝或提供修改意见。

#### 进入 Plan 模式

有四种方式进入 Plan 模式：

- **启动参数**：使用 `kimi --plan` 直接以 Plan 模式启动新会话
- **快捷键**：按 `Shift-Tab` 切换 Plan 模式的开关
- **斜杠命令**：输入 `/plan` 或 `/plan on`
- **AI 主动触发**：面对复杂任务时，AI 可能会通过 `EnterPlanMode` 工具请求进入 Plan 模式，你可以选择同意或拒绝

你也可以在配置文件中设置 `default_plan_mode = true`，让每次新建会话都默认进入 Plan 模式。

进入 Plan 模式后，提示符会变为 `📋`，底部状态栏会显示蓝色的 `plan` 标识。

#### 审批方案

AI 完成方案后会通过 `ExitPlanMode` 提交审批。审批面板会显示完整的方案内容，你可以：

| 选项 | 含义 |
|---|---|
| **批准执行** | 有多个路径时先选择，单路径直接 Approve，AI 开始执行 |
| **Reject** | 拒绝方案，保持 Plan 模式，你可以在对话中提供反馈 |
| **Reject and Exit** | 拒绝方案并退出 Plan 模式，一步完成拒绝和退出操作 |
| **Revise** | 输入修改意见，AI 会据此修订方案并重新提交 |

按 `Ctrl-E` 可以在全屏分页器中查看完整方案内容。

#### 管理 Plan 模式

使用 `/plan` 命令可以管理 Plan 模式：

- `/plan`：切换 Plan 模式开关
- `/plan on`：开启 Plan 模式
- `/plan off`：关闭 Plan 模式
- `/plan view`：查看当前方案内容
- `/plan clear`：清除当前方案文件

### Thinking 模式

Thinking 模式让 AI 在回答前进行更深入的思考，适合处理复杂问题。

你可以通过 `/model` 命令切换模型和 Thinking 模式。在选择模型后，如果模型支持 Thinking 模式，系统会询问是否开启。也可以在启动时通过 `--thinking` 参数启用：

```sh
kimi --thinking
```

> 提示：Thinking 模式需要当前模型支持。

### Print 模式

Print 模式让 Kimi Code CLI 以非交互方式运行，适合脚本调用和自动化场景。

#### 基本用法

使用 `--print` 参数启用 Print 模式：

```sh
# 通过 -p 传入指令（或 -c）
kimi --print -p "列出当前目录的所有 Python 文件"

# 通过 stdin 传入指令
echo "解释这段代码的作用" | kimi --print
```

Print 模式的特点：

- **非交互**：执行完指令后自动退出
- **自动审批**：隐式启用 `--yolo` 模式，所有操作自动批准，交互式问答（`AskUserQuestion`）和计划模式切换也会自动处理
- **文本输出**：AI 的回复输出到 stdout

#### 仅输出最终消息

使用 `--final-message-only` 选项可以只输出最终的 assistant 消息，跳过中间的工具调用过程：

```sh
kimi --print -p "根据当前变更给我一个 Git commit message" --final-message-only
```

`--quiet` 是 `--print --output-format text --final-message-only` 的快捷方式，适合只需要最终结果的场景：

```sh
kimi --quiet -p "根据当前变更给我一个 Git commit message"
```

#### JSON 格式

Print 模式支持 JSON 格式的输入和输出，方便程序化处理。输入和输出都使用 Message 格式。

- **JSON 输出**

使用 `--output-format=stream-json` 以 JSONL（每行一个 JSON）格式输出：

```sh
kimi --print -p "你好" --output-format=stream-json
```

输出示例：

```jsonl
{"role":"assistant","content":"你好！有什么可以帮助你的吗？"}
```

如果 AI 调用了工具，会依次输出 assistant 消息和 tool 消息。

- **JSON 输入**

使用 `--input-format=stream-json` 接收 JSONL 格式的输入：

```sh
echo '{"role":"user","content":"你好"}' | kimi --print --input-format=stream-json --output-format=stream-json
```

这种模式下，Kimi Code CLI 会持续读取 stdin，每收到一条用户消息就处理并输出响应，直到 stdin 关闭。

#### Message 格式

输入和输出都使用统一的 Message 格式。

- **User 消息**

```json
{"role": "user", "content": "你的问题或指令"}
```

也可以使用数组形式的 content：

```json
{"role": "user", "content": [{"type": "text", "text": "你的问题"}]}
```

- **Assistant 消息**

```json
{"role": "assistant", "content": "回复内容"}
```

带工具调用的助手消息包含 `tool_calls` 字段。

- **Tool 消息**

```json
{"role": "tool", "tool_call_id": "tc_1", "content": "工具执行结果"}
```

#### 退出码

Print 模式使用退出码表示执行结果，方便脚本和 CI 系统判断是否需要重试：

| 退出码 | 含义 | 说明 |
| --- | --- | --- |
| `0` | 成功 | 任务正常完成 |
| `1` | 失败（不可重试） | 配置错误、认证失败、额度用尽等永久性错误 |
| `75` | 失败（可重试） | 429 速率限制、5xx 服务端错误、连接超时等暂时性错误 |

#### 使用场景

- **CI/CD 集成**

```sh
kimi --print -p "检查 src/ 目录下是否有明显的安全问题，输出 JSON 格式的报告"
```

- **批量处理**

```sh
for file in src/*.py; do
  kimi --print -p "为 $file 添加类型注解"
done
```

- **与其他工具集成**

```sh
my-tool | kimi --print --input-format=stream-json --output-format=stream-json | process-output
```

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
