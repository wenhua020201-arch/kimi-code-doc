# Claude Code

## 安装 Claude Code

若已安装，可跳至下一节。

### macOS 与 Linux

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
        fs.writeFileSync(filePath,JSON.stringify({ ...content, hasCompletedOnboarding: true }, 2), 'utf-8');
    } else {
        fs.writeFileSync(filePath,JSON.stringify({ hasCompletedOnboarding: true }), 'utf-8');
    }"
```

> 如果终端提示 `fnm` 命令未找到，请重新打开终端窗口再执行后续命令。

### Windows

```powershell
# 打开 windows 终端中的 powershell 终端
# windows 上安装 nodejs
# 右键按 Windows 按钮，点击「终端」

# 然后依次执行下面的
winget install OpenJS.NodeJS
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
        fs.writeFileSync(filePath,JSON.stringify({ ...content, hasCompletedOnboarding: true }, 2), 'utf-8');
    } else {
        fs.writeFileSync(filePath,JSON.stringify({ hasCompletedOnboarding: true }), 'utf-8');
    }"
```

## 配置 Kimi Coding 模型

完成 Claude Code 安装后，请按照一下方式设置环境变量使用 Kimi Coding 模型。

### macOS 与 Linux

```sh
export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/v1/anthropic
export ANTHROPIC_AUTH_TOKEN=<你的 API key>  # 这里填在会员页面生成的 API key
export ANTHROPIC_MODEL=kimi-for-coding
export ANTHROPIC_SMALL_FAST_MODEL=kimi-for-coding

claude
```

### Windows

```powershell
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/v1/anthropic";
$env:ANTHROPIC_AUTH_TOKEN="<你的 API key>"  # 这里填在会员页面生成的 API key
$env:ANTHROPIC_MODEL="kimi-for-coding"
$env:ANTHROPIC_SMALL_FAST_MODEL="kimi-for-coding"

claude
```

### 确认环境变量是否生效

启动 Claude Code 后，在命令输入框输入 `/status`，确认模型状态。

接下来就可以使用 Claude Code 进行开发了！
