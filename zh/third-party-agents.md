# 在第三方 Coding Agent 中使用

## Claude Code

::: tip
在 Claude Code 中，你可以使用 tab 键切换 Kimi K2 Thinking 模型
:::

### 安装 Claude Code

若已安装，可跳至下一节。

#### macOS 与 Linux

```sh
# MacOS 和 Linux 上安装 nodejs
curl -fsSL https://fnm.vercel.app/install | bash

# 新开一个terminal，让 fnm 生效
fnm install 24.3.0
fnm default 24.3.0
fnm use 24.3.0

# 安装 claude-code
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com

# 初始化配置
node --eval "
    const homeDir = os.homedir();
    const filePath = path.join(homeDir, '.claude.json');
    if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        fs.writeFileSync(filePath, JSON.stringify({ ...content, hasCompletedOnboarding: true }, null, 2), 'utf-8');
    } else {
        fs.writeFileSync(filePath, JSON.stringify({ hasCompletedOnboarding: true }), 'utf-8');
    }"
```

> 如果终端提示 `fnm` 命令未找到，请重新打开终端窗口再执行后续命令。

#### Windows

```powershell
# 打开 windows 终端中的 powershell 终端
# windows 上安装 nodejs
# 右键按 Windows 按钮，点击「终端」

# 然后依次执行下面的
winget install --id Git.Git -e --source winget # 或者参考 https://git-scm.com/install/windows 用其他办法安装 Git
winget install OpenJS.NodeJS # 或者参考 https://nodejs.org/zh-cn/download 用其他办法安装 Node.js
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

# 然后关闭终端窗口，新开一个终端窗口

# 安装 claude-code
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com

# 初始化配置
node --eval "
    const homeDir = os.homedir();
    const filePath = path.join(homeDir, '.claude.json');
    if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        fs.writeFileSync(filePath, JSON.stringify({ ...content, hasCompletedOnboarding: true }, null, 2), 'utf-8');
    } else {
        fs.writeFileSync(filePath, JSON.stringify({ hasCompletedOnboarding: true }), 'utf-8');
    }"
```

### 配置 Kimi For Coding 模型

完成 Claude Code 安装后，请按照一下方式设置环境变量使用 Kimi For Coding 模型。

#### macOS 与 Linux

```sh
export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/
export ANTHROPIC_AUTH_TOKEN=<你的 API Key>  # 这里填在会员页面生成的 API Key
export ANTHROPIC_MODEL=kimi-for-coding
export ANTHROPIC_SMALL_FAST_MODEL=kimi-for-coding

claude
```

#### Windows

```powershell
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/";
$env:ANTHROPIC_AUTH_TOKEN="<你的 API Key>"  # 这里填在会员页面生成的 API Key
$env:ANTHROPIC_MODEL="kimi-for-coding"
$env:ANTHROPIC_SMALL_FAST_MODEL="kimi-for-coding"

claude
```

#### 确认环境变量是否生效

启动 Claude Code 后，在命令输入框输入 `/status`，确认模型状态。

接下来就可以使用 Claude Code 进行开发了！

## Roo Code

### 安装 Roo Code

若已安装，可跳至下一节。

1. 打开 VS Code，进入扩展视图（`Cmd+Shift+X` / `Ctrl+Shift+X`）。
2. 搜索 `Roo Code` 并安装 Roo Code 官方扩展。
3. 安装完成后，活动栏会出现 Roo Code 图标；如未出现，可重启 VS Code。

### 配置 Kimi For Coding 模型

1. 打开 Roo Code 面板，进入设置页。
2. 在 Providers 区域选择 `OpenAI Compatible`，按照提示填写：
   - **Entrypoint**：`https://api.kimi.com/coding/v1`
   - **API Key**：输入在会员页面获取的 Kimi For Coding API Key
   - **Model**：`kimi-for-coding`
   - **Use legacy OpenAI API format**：✅
   - **Enable streaming**：✅
   - **Include max output tokens**：✅
   - **Max Output Tokens**：32768
   - **Context Window Size**：262144
3. 如无需浏览器自动化，可关闭相关选项。
4. 保存后返回 Roo Code 主界面，新建会话即可使用。

完成配置后，即可在 Roo Code 中调用 Kimi For Coding 模型开展代码开发与协作。
