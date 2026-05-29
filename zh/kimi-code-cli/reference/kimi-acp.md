# `kimi acp` 子命令

`kimi acp` 命令启动一个支持多会话的 ACP (Agent Client Protocol) 服务器。

```sh
kimi acp
```

::: warning 📢 版本说明
Kimi Code CLI 已完成重大版本升级，底层从 Python/uv 迁移至 Node.js，带来更简单的安装方式、更快的启动速度和全新的终端界面。本页内容仅适用于旧版 Kimi Code CLI。旧版将逐渐停止维护，建议尽快完成升级。查看[版本升级](/kimi-code-cli/cli-migration)了解详情。
本文档正在重建中，新版功能细节暂请移步 [Kimi Code CLI 文档站](https://moonshotai.github.io/kimi-code/zh/)。
:::


## 说明

ACP 是一种标准化协议，允许 IDE 和其他客户端与 AI Agent 进行交互。

## 使用场景

- IDE 插件集成（如 JetBrains、Zed）
- 自定义 ACP 客户端开发
- 多会话并发处理

如需在 IDE 中使用 Kimi Code CLI，请参阅 在 IDE 中使用。

## 认证

ACP 服务器在创建或加载会话前会检查用户认证状态。如果未登录，服务器会返回 `AUTH_REQUIRED` 错误（错误码 `-32000`），并携带可用的认证方式信息。

客户端收到此错误后，应引导用户在终端中执行 `kimi login` 命令完成登录。登录成功后，后续的 ACP 请求即可正常执行。
