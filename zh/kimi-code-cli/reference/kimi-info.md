# `kimi info` 子命令

`kimi info` 显示 Kimi Code CLI 的版本和协议信息。

```sh
kimi info [--json]
```

::: warning 📢 版本说明
Kimi Code CLI 已完成重大版本升级，底层从 Python/uv 迁移至 Node.js，带来更简单的安装方式、更快的启动速度和全新的终端界面。本页内容仅适用于旧版 Kimi Code CLI。旧版将逐渐停止维护，建议尽快完成升级。查看[版本升级](/kimi-code-cli/cli-migration)了解详情。
本文档正在重建中，新版功能细节暂请移步 [Kimi Code CLI 文档站](https://moonshotai.github.io/kimi-code/zh/)。
:::


## 选项

| 选项 | 说明 |
|------|------|
| `--json` | 以 JSON 格式输出 |

## 输出内容

| 字段 | 说明 |
|------|------|
| `kimi_cli_version` | Kimi Code CLI 版本号 |
| `agent_spec_versions` | 支持的 Agent 规格版本列表 |
| `wire_protocol_version` | Wire 协议版本 |
| `python_version` | Python 运行时版本 |

## 示例

**文本输出**

```sh
$ kimi info
kimi-cli version: 1.20.0
agent spec versions: 1
wire protocol: 1.7
python version: 3.13.1
```

**JSON 输出**

```sh
$ kimi info --json
{"kimi_cli_version": "1.20.0", "agent_spec_versions": ["1"], "wire_protocol_version": "1.7", "python_version": "3.13.1"}
```
