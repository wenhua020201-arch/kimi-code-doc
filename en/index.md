# Kimi Code Membership Benefits

Kimi Code is a premium subscription tier within the Kimi ecosystem, specifically engineered to empower developers with advanced AI capabilities for coding.

## Key Advantages

* **Seamless Integration:** Full compatibility with **Kimi Code CLI**, **Claude Code**, and **Roo Code**, fitting perfectly into your existing CI/CD or local workflows.
* **Elite Performance:** Experience blistering output speeds of up to **100 Tokens/s** with high stability.
* **Throughput capacity:** A 5-hour token budget handles roughly **300–1,200** API calls, enabling continuous workloads.

## Getting Started

> **New Users:** Visit the [Kimi Code Official Site](https://www.kimi.com/code), log in, and select a "Coding Plan" to activate your benefits.
>
> **Subscribers:** Manage your credentials or authorized devices via the [Kimi Code Console](https://www.kimi.com/code/console).

### Step 1: Generate Your Kimi Code API Key

For manual integration in third-party agents or custom scripts:

1.  **Access Console:** Navigate to `Console` -> `API Keys`.
2.  **Create Key:** Click "Create New Key" to generate a unique identifier.
    ![Create API Key in Console](../screenshots/kimi-cli/create-api-key.png)
3.  **Secure Your Key:** Copy the key from the pop-up. **Note:** For security, the key will only be displayed in full once.
    ![Save API Key](../screenshots/kimi-cli/copy-api-key.png)

### Step 2: Configure Your Development Environment

Choose the guide that matches your setup:

* 📖 [Configuring Kimi Code for Kimi CLI](./kimi-cli/guides/getting-started.html)
* 🤖 [Using Kimi Code with Claude Code or Roo Code](./more/third-party-agents.html)

## One-Click Authentication

If you are using an official Kimi coding agent, we provide a streamlined **Login Authentication** feature. This removes the need for manual API key handling by securely binding your device to your Kimi account.

#### Using Kimi Code for CLI
Simply execute the `/login` command in your terminal:
![CLI Login Demo](../screenshots/kimi-cli/cli-login-demo.png)

#### Using Kimi Code for VS Code
The CLI-based login command is also supported within the VS Code integrated terminal:
![VS Code Login Demo](../screenshots/kimi-cli/vscode-login-demo.png)

## Device & Session Management

Authorized devices can be monitored and managed in real-time via the [Kimi Code Console](https://www.kimi.com/code/console).

![Device Management Console](../screenshots/kimi-cli/login-device-mgt.png)

> **Session Security Policy:**
> To protect your account quota, if a device remains **inactive for more than 30 days**, the session will automatically expire. The device record will be removed from the console, and you will need to re-authenticate using the `/login` flow.
