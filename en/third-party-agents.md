# Use in Third-Party Coding Agents

## Claude Code

::: tip
In Claude Code, you can toggle Kimi K2 Thinking model by pressing the Tab key.
:::

### Install Claude Code

If it is already installed, skip to the next section.

#### macOS and Linux

```sh
# Install nodejs on macOS and Linux
curl -fsSL https://fnm.vercel.app/install | bash

# Open a new terminal so fnm takes effect
fnm install 24.3.0
fnm default 24.3.0
fnm use 24.3.0

# Install claude-code
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com

# Initialize configuration
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

> If the terminal reports that `fnm` is not found, please reopen the terminal window and try again.

#### Windows

```powershell
# Open a PowerShell terminal in Windows Terminal
# Install nodejs on Windows
# Right-click the Windows button and click “Terminal”

# Then run the following in order
winget install --id Git.Git -e --source winget # Or install Git via other methods, e.g., https://git-scm.com/install/windows
winget install OpenJS.NodeJS # Or install Node.js via other methods, e.g., https://nodejs.org/en/download
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

# Close the terminal window and open a new one

# Install claude-code
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com

# Initialize configuration
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

### Configure the Kimi For Coding model

After installing Claude Code, set environment variables as follows to use the Kimi For Coding model.

#### macOS and Linux

```sh
export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/
export ANTHROPIC_AUTH_TOKEN=sk-kimi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx # Fill in the API Key generated on the membership page

claude
```

#### Windows

```powershell
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/";
$env:ANTHROPIC_AUTH_TOKEN="sk-kimi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # Fill in the API Key generated on the membership page

claude
```

#### Verify that the environment variables are active

After starting Claude Code, type `/status` in the command input box to confirm the model status.

You can now use Claude Code for development!

## Roo Code

### Install Roo Code

If it is already installed, skip to the next section.

1. Open VS Code and go to the Extensions view (`Cmd+Shift+X` / `Ctrl+Shift+X`).
2. Search for `Roo Code` and install the official Roo Code extension.
3. After installation, a Roo Code icon will appear in the Activity Bar. If it does not, restart VS Code.

### Configure the Kimi For Coding model

1. Open the Roo Code panel and go to Settings.
2. In Providers, select `OpenAI Compatible`, then fill in the fields as prompted:
   - **Entrypoint**: `https://api.kimi.com/coding/v1`
   - **API Key**: Enter the Kimi For Coding API Key retrieved from the membership page
   - **Model**: `kimi-for-coding`
   - **Use legacy OpenAI API format**: ✅
   - **Enable streaming**: ✅
   - **Include max output tokens**: ✅
   - **Enable Reasoning Effort**：Medium
   - **Max Output Tokens**: 32768
   - **Context Window Size**: 262144
3. If you do not need browser automation, you can disable related options.
4. Save, return to the Roo Code main view, and create a new session to start using it.

After configuration, you can invoke the Kimi For Coding model in Roo Code for coding and collaboration.


