# Agent 与子 Agent

你可以把 **Agent** 理解为 Kimi 的「人格设定」。

同一个大脑（AI 模型），配上不同的「人格」，表现会完全不同。有的 Agent 擅长写代码，有的擅长做分析，有的比较谨慎每一步都要问你，有的比较大胆直接开干。Kimi Code CLI 允许你切换内置人格，也可以自己写一个人格配置文件。

而 **子 Agent** 就像是主 Agent 的「临时工」——遇到专门的活儿时，主 Agent 可以喊一个小弟来干，干完小弟把结果交回来，主 Agent 继续统筹全局。

## 内置人格

Kimi Code CLI 自带两种人格，启动时可以用 `--agent` 参数挑选：

```sh
kimi --agent okabe
```

### `default` —— 默认人格

适合绝大多数场景。这个人格手头有一大堆工具：能读写文件、运行命令、搜索网页、管理待办事项、启动后台任务、制定计划……是一个全能型选手。

它手里的工具包括：`Agent`（召唤小弟）、`AskUserQuestion`（问你问题）、`SetTodoList`（待办清单）、`Shell`（执行命令）、`ReadFile`（读文件）、`ReadMediaFile`（读图片/视频）、`Glob`（找文件）、`Grep`（搜内容）、`WriteFile`（写文件）、`StrReplaceFile`（替换文件内容）、`SearchWeb`（搜网页）、`FetchURL`（抓网页内容）、`EnterPlanMode` / `ExitPlanMode`（计划模式）、`TaskList` / `TaskOutput` / `TaskStop`（后台任务管理）。

### `okabe` —— 实验性人格

在 `default` 的基础上多了一个 `SendDMail` 工具，用于发送延迟消息（检查点回滚场景）。目前还在实验阶段，普通人一般用不上。

## 自己写一个人格

如果内置人格不合你胃口，你可以写一份 YAML 配置文件，定制属于你自己的 Kimi。

```sh
kimi --agent-file /path/to/my-agent.yaml
```

**最简单的配置**

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

这份配置的意思是：
- `name`：这个人格的名字
- `system_prompt_path`：系统提示词文件的路径（相对于这个 YAML 文件的位置）
- `tools`：这个人格能使用哪些工具

**站在巨人的肩膀上（继承与覆盖）**

你不需要从零写一个人格，可以继承现有的人格，只改你想改的部分：

```yaml
version: 1
agent:
  extend: default  # 继承默认人格的所有配置
  system_prompt_path: ./my-prompt.md  # 只换提示词
  exclude_tools:  # 去掉一些不想让它用的工具
    - "kimi_cli.tools.web:SearchWeb"
    - "kimi_cli.tools.web:FetchURL"
```

`extend: default` 表示继承内置的默认人格。你也可以写相对路径，继承你自己写的其他人格文件。

**配置字段说明**

| 字段 | 必填 | 含义 |
|------|------|------|
| `extend` | 否 | 继承谁，可以是 `default` 或另一个 YAML 文件的路径 |
| `name` | 是（继承时可省略） | 人格名字 |
| `system_prompt_path` | 是（继承时可省略） | 系统提示词文件路径 |
| `system_prompt_args` | 否 | 传给提示词的自定义参数，继承时会合并 |
| `tools` | 是（继承时可省略） | 工具列表，格式为 `模块:类名` |
| `exclude_tools` | 否 | 要排除的工具 |
| `subagents` | 否 | 子 Agent 定义 |

## 系统提示词 —— 人格的「灵魂」

系统提示词是一个 Markdown 文件，它告诉 Kimi「你是谁、你擅长什么、你应该怎么做事」。你可以把它理解为给 Kimi 写的「入职培训手册」。

这个手册支持变量替换：用 `${变量名}` 的语法，Kimi 启动时会把变量替换成实际的值。也支持 Jinja2 的 `{% include %}` 指令来引入其他文件。

**内置变量**

| 变量 | 含义 |
|------|------|
| `${KIMI_NOW}` | 当前时间（ISO 格式） |
| `${KIMI_WORK_DIR}` | 工作目录路径 |
| `${KIMI_WORK_DIR_LS}` | 工作目录里的文件列表 |
| `${KIMI_AGENTS_MD}` | 从项目根目录到工作目录逐层合并的 `AGENTS.md` 内容 |
| `${KIMI_SKILLS}` | 当前加载的所有 Skills 列表 |
| `${KIMI_ADDITIONAL_DIRS_INFO}` | 通过 `--add-dir` 添加的额外目录信息 |

**自定义变量**

你可以在 YAML 里定义自己的变量：

```yaml
agent:
  system_prompt_args:
    MY_VAR: "自定义值"
```

然后在提示词里用 `${MY_VAR}` 引用。

**提示词示例**

```markdown
# My Agent

You are a helpful assistant. Current time: ${KIMI_NOW}.

Working directory: ${KIMI_WORK_DIR}

${MY_VAR}
```

## 子 Agent —— 喊小弟来帮忙

主 Agent 不可能什么事都亲力亲为。遇到专门的活儿，它可以喊一个「小弟」（子 Agent）来处理。

**怎么定义小弟**

在人格配置文件里写：

```yaml
version: 1
agent:
  extend: default
  subagents:
    coder:
      path: ./coder-sub.yaml
      description: "负责写代码"
    reviewer:
      path: ./reviewer-sub.yaml
      description: "负责审代码"
```

这里定义了两个小弟：`coder`（程序员）和 `reviewer`（代码审查员）。每个小弟都有自己的配置文件。

小弟的配置文件和主 Agent 格式一样，通常会继承主 Agent：

```yaml
# coder.yaml
version: 1
agent:
  extend: ./agent.yaml  # 继承主 Agent 的配置
  system_prompt_args:
    ROLE_ADDITIONAL: |
      你现在作为专职程序员运行，专注于代码实现...
```

## 内置的小弟类型

即使你不自己定义小弟，默认人格也自带三种「专业临时工」，各有所长：

| 类型 | 擅长什么 | 手里有什么工具 |
|------|---------|--------------|
| `coder` | 通用软件工程：读写文件、运行命令、搜索代码 | Shell、ReadFile、Glob、Grep、WriteFile、StrReplaceFile、SearchWeb、FetchURL |
| `explore` | 快速只读探索：看看代码里有什么，不做修改 | Shell、ReadFile、Glob、Grep、SearchWeb、FetchURL（**没有写入工具**） |
| `plan` | 做规划和架构设计：分析现状、制定方案 | ReadFile、Glob、Grep、SearchWeb、FetchURL（**没有 Shell、没有写入工具**） |

> 所有小弟都不能再召唤自己的小弟（子 Agent 不能嵌套）。`Agent` 工具只有主 Agent 能直接用。

## 小弟是怎么干活的

主 Agent 通过 `Agent` 工具召唤小弟。小弟会在一个独立的工作间里干活，和主 Agent 的办公桌互不干扰。干完之后，小弟把结果整理好交给主 Agent。

每个小弟实例都会在自己的「档案室」（`subagents/<agent_id>/`）里保存工作记录，下次主 Agent 喊同一个 ID 的小弟时，它会带着之前的记忆继续工作。

**这样做的好处：**
- 隔离：小弟的胡言乱语不会污染主 Agent 的记忆
- 并行：可以同时派多个小弟去干不同的活
- 专业：每个小弟可以有自己的专属「入职培训」
- 持久：同一个实例可以跨多次召唤保持记忆

## Kimi 有哪些工具可用

下面列出 Kimi Code CLI 内置的所有工具。你可以理解为这是 Kimi 的「工具箱」，每个人格可以挑选自己想用的工具。

### `Agent` —— 召唤小弟

- **功能**：启动或恢复一个子 Agent 实例，让它去处理专门的任务
- **参数**：
  - `description`：任务简介（3-5 个词）
  - `prompt`：任务详细说明
  - `subagent_type`：用哪种小弟，默认 `coder`
  - `model`：要不要换个 AI 模型来做这个任务（可选）
  - `resume`：恢复之前的小弟实例（可选）
  - `run_in_background`：让小弟在后台干活，默认 `false`

### `AskUserQuestion` —— 问用户问题

- **功能**：在干活过程中突然停下来问你问题，比如「有三个方案，你选哪个？」
- **适用场景**：需要你在多个方案中选一个、指令模糊需要澄清、收集需求信息
- **参数**：
  - `questions`：问题列表（1-4 个）
  - 每个问题有 `question`（问题文本）、`header`（短标签）、`options`（选项列表）、`multi_select`（是否多选）
  - 每个选项有 `label`（标签）和 `description`（说明）

> 不要滥用这个工具，只在你的选择真正影响后续操作时才问。

### `SetTodoList` —— 待办清单

- **功能**：管理待办事项，跟踪任务进度
- **参数**：
  - `todos`：待办列表，每个事项有 `title`（标题）和 `status`（状态：`pending` 待办 / `in_progress` 进行中 / `done` 完成）

### `Shell` —— 执行命令

- **功能**：运行 Shell 命令（Unix 用 bash/zsh，Windows 用 PowerShell）
- **注意**：每次执行都需要你审批
- **参数**：
  - `command`：要执行的命令
  - `timeout`：超时时间（秒），默认 60，前台最多 300，后台最多 86400
  - `run_in_background`：是否后台运行，默认 `false`
  - `description`：后台任务的描述（后台运行时必须填）

后台任务启动后，Kimi 立刻拿到任务 ID 继续干别的，任务完成后系统会自动通知。

### `ReadFile` —— 读文件

- **功能**：读取文本文件内容
- **限制**：一次最多读 1000 行，每行最多 2000 字符
- **参数**：
  - `path`：文件路径
  - `line_offset`：从第几行开始读，默认 1。支持负数表示从末尾读（如 `-100` 读最后 100 行）
  - `n_lines`：读多少行，默认/最大 1000

### `ReadMediaFile` —— 读图片/视频

- **功能**：读取图片或视频文件，发给 AI 看
- **限制**：最大 100MB，只有模型支持多模态时才有效
- **参数**：
  - `path`：文件路径

### `Glob` —— 按模式找文件

- **功能**：按通配符模式搜索文件和目录，比如 `*.py`、`src/**/*.ts`
- **限制**：最多返回 1000 个结果，不允许以 `**` 开头的模式
- **参数**：
  - `pattern`：匹配模式
  - `directory`：搜索目录，默认当前工作目录
  - `include_dirs`：是否包含目录，默认 `true`

### `Grep` —— 文本搜索

- **功能**：用正则表达式搜索文件内容，底层基于 ripgrep
- **参数**：
  - `pattern`：正则表达式
  - `path`：搜索路径
  - `glob`：文件过滤（如 `*.js`）
  - `type`：文件类型（如 `py`、`js`、`go`）
  - `output_mode`：输出模式：`files_with_matches`（只返回文件名）、`content`（返回匹配内容）、`count_matches`（返回匹配数）
  - `-B` / `-A` / `-C`：显示匹配行前后多少行
  - `-n`：显示行号
  - `-i`：忽略大小写
  - `multiline`：支持多行匹配
  - `head_limit`：限制输出数量

### `WriteFile` —— 写文件

- **功能**：创建新文件或覆盖现有文件
- **注意**：需要用户审批，写工作目录外文件时必须用绝对路径
- **参数**：
  - `path`：文件路径（绝对路径）
  - `content`：文件内容
  - `mode`：`overwrite`（覆盖，默认）或 `append`（追加）

### `StrReplaceFile` —— 替换文件内容

- **功能**：在文件中查找一段文字并替换成另一段
- **注意**：需要用户审批，编辑工作目录外文件时必须用绝对路径
- **参数**：
  - `path`：文件路径（绝对路径）
  - `edit`：编辑操作，可以是单个或列表
  - `edit.old`：要替换的原字符串
  - `edit.new`：新字符串
  - `edit.replace_all`：是否替换所有匹配项，默认 `false`

### `SearchWeb` —— 搜索网页

- **功能**：上网搜索资料
- **参数**：
  - `query`：搜索关键词
  - `limit`：结果数量，默认 5，最多 20
  - `include_content`：是否包含网页正文，默认 `false`

### `FetchURL` —— 抓取网页

- **功能**：打开一个网页，提取主要文字内容
- **参数**：
  - `url`：网页地址

### `Think` —— 记录思考

- **功能**：让 Kimi 把思考过程记下来，适合复杂推理场景
- **参数**：
  - `thought`：思考内容

### `SendDMail` —— 发送延迟消息

- **功能**：发送延迟消息（D-Mail），用于检查点回滚场景
- **参数**：
  - `message`：消息内容
  - `checkpoint_id`：目标检查点 ID

### `EnterPlanMode` —— 进入计划模式

- **功能**：请求进入计划模式。调用后会弹出确认框，问你同不同意。在 YOLO 模式下，只有用户明确要求规划或存在重大架构分歧时才会用。
- **参数**：无

### `ExitPlanMode` —— 提交计划方案

- **功能**：在计划模式下写好方案后，提交给用户审批。调用前需要先把方案写入 plan 文件。
- **用户的选择**：可以选某个方案开始执行、拒绝、或提修改意见
- **参数**：
  - `options`：如果有多个可选方案，列出 2-3 个供用户选择（每个有 `label` 标签和 `description` 说明）

### `TaskList` —— 查看后台任务

- **功能**：列出当前正在跑的后台任务
- **参数**：
  - `active_only`：只看正在运行的，默认 `true`
  - `limit`：最多返回多少个，默认 20

### `TaskOutput` —— 查看后台任务输出

- **功能**：查看某个后台任务的输出和状态
- **参数**：
  - `task_id`：任务 ID
  - `block`：是否等到任务完成，默认 `false`
  - `timeout`：等待的最大秒数，默认 30

### `TaskStop` —— 停止后台任务

- **功能**：强制停止一个正在运行的后台任务
- **注意**：需要用户审批，只在必须取消时使用（正常完成的任务等它自己通知）
- **参数**：
  - `task_id`：任务 ID
  - `reason`：停止原因（可选）

## 安全边界

### 工作区范围

- 文件读写默认只能在当前工作目录（以及通过 `--add-dir` 添加的额外目录）内进行
- 读工作目录外的文件需要用绝对路径
- 写和编辑操作都需要你手动审批；操作工作目录外文件时必须用绝对路径

### 需要审批的操作

| 操作 | 审批要求 |
|------|---------|
| 执行 Shell 命令 | 每次都要你点头 |
| 写文件 / 改文件 | 每次都要你点头 |
| 调用 MCP 工具 | 每次都要你点头 |
| 停止后台任务 | 每次都要你点头 |
