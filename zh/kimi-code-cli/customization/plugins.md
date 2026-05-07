# 自定义插件 (Beta)

> Beta 功能：插件系统目前处于 Beta 阶段，具体的实现细节和配置定义可能会在未来版本中调整。请谨慎在生产环境中使用，并关注后续更新。

插件就像是给 Kimi 配的「瑞士军刀」——你可以自己做一把小刀、一把剪刀、一把开瓶器……然后装进 Kimi 的工具箱里。Kimi 遇到合适的任务时，就会自动拿出对应的工具来用。

和 MCP 服务器相比，插件更轻量、更简单，不需要常驻后台运行。它本质上就是一些本地脚本，适合封装你自己项目里常用的功能。

## 插件是什么

一个插件就是一个文件夹，文件夹里必须有一个叫 `plugin.json` 的文件。这个文件相当于插件的「身份证」，上面写着：
- 我叫什么名字
- 我能干什么
- 我有哪些工具

插件可以声明多个「工具」，每个工具就是一个可执行脚本（Python、TypeScript、Shell 脚本等都可以）。Kimi 就像一个聪明的管家，它会阅读 `plugin.json`，了解每个工具的用途，然后在需要的时候自动调用。

**你能用插件做什么？**

- 封装公司内部 API 的调用脚本，让 Kimi 能查业务数据
- 写一套项目专属的代码生成工具，比如自动生成页面模板
- 连接私有服务或数据库，让 Kimi 能查内部资料

**插件和 Skill 有什么区别？**

打个比方：
- **Skill** 就像一本「操作手册」——Kimi 读了之后知道该怎么做，但还得自己动手
- **Plugin** 就像一把「电动螺丝刀」——Kimi 按一下按钮，工具自己就把活干了，然后把结果拿回来

Skill 提供的是「知识」，Plugin 提供的是「行动力」。

## 安装插件

用 `kimi plugin` 命令管理插件，就像手机里的 App Store 一样简单。

**从本地目录安装**

你已经写好了一个插件文件夹，直接告诉 Kimi 在哪：

```sh
kimi plugin install /path/to/my-plugin
```

**从 ZIP 文件安装**

把插件打包成 zip，传给 Kimi：

```sh
kimi plugin install my-plugin.zip
```

**从 Git 仓库安装**

插件代码放在 GitHub 上？一行命令搞定：

```sh
# 安装仓库根目录的插件
kimi plugin install https://github.com/user/repo.git

# 安装子目录里的插件（一个仓库里有多个插件时常用）
kimi plugin install https://github.com/user/repo.git/plugins/my-plugin

# 指定分支（注意用浏览器里看到的 URL 格式）
kimi plugin install https://github.com/user/repo/tree/develop/plugins/my-plugin
```

> 如果 Git 仓库根目录没有 `plugin.json`，Kimi 会主动检查根目录和直接子目录，列出所有可用的插件让你挑。

**查看已安装的插件**

```sh
kimi plugin list
```

**查看某个插件的详情**

```sh
kimi plugin info my-plugin
```

**卸载插件**

```sh
kimi plugin remove my-plugin
```

## 创建插件

写插件只需要三步，比做一道番茄炒蛋还简单：

1. 创建一个文件夹
2. 写一份 `plugin.json`
3. 写工具脚本

**文件夹结构**

```
my-plugin/
├── plugin.json       # 插件身份证（必须有）
├── config.json       # 配置文件（可选，用来存密码等敏感信息）
└── scripts/          # 工具脚本放在这里
    ├── greet.py
    └── calc.ts
```

**`plugin.json` 怎么写**

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "我的项目专用插件",
  "config_file": "config.json",
  "inject": {
    "api_key": "api_key",
    "endpoint": "base_url"
  },
  "tools": [
    {
      "name": "greet",
      "description": "生成一句问候语",
      "command": ["python3", "scripts/greet.py"],
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "要问候的名字"
          }
        },
        "required": ["name"]
      }
    }
  ]
}
```

**字段说明**

| 字段 | 必填 | 含义 |
|------|------|------|
| `name` | 是 | 插件名字，只能用小写字母、数字和连字符（`-`） |
| `version` | 是 | 版本号，按语义化版本写（比如 `1.0.0`） |
| `description` | 否 | 插件是干嘛的，Kimi 会读这个来了解你的插件 |
| `config_file` | 否 | 配置文件路径，用来存密码等敏感信息 |
| `inject` | 否 | 凭证注入配置，下面会详细讲 |
| `tools` | 否 | 工具列表，没有工具的话插件就只能当 Skill 用了 |

**工具字段说明**

| 字段 | 必填 | 含义 |
|------|------|------|
| `name` | 是 | 工具名字 |
| `description` | 是 | 工具是干嘛的，Kimi 靠这个决定什么时候调用它 |
| `command` | 是 | 怎么运行这个工具，写成字符串数组（比如 `["python3", "scripts/greet.py"]`） |
| `parameters` | 否 | 工具需要什么参数，用 JSON Schema 格式描述 |

`parameters` 这部分看起来很吓人，其实就是回答三个问题：
1. 需要什么参数？
2. 每个参数是什么类型？
3. 哪些参数必须给？

上面的例子中，`greet` 工具需要一个 `name` 参数，类型是字符串，而且是必填的。

## 凭证注入

如果你的插件需要调用 LLM API（比如你自己的大模型服务），你可能需要 API 密钥和接口地址。手动把密钥写死在脚本里不安全，Kimi 提供了一种「凭证注入」机制。

**原理**：你在 `plugin.json` 里声明「我需要这两个东西」，安装时 Kimi 会自动把自己当前的 API 密钥和 base URL 填进你的 `config.json` 里。之后你的脚本读取 `config.json` 就能拿到密钥了。

**配置示例**

```json
{
  "config_file": "config.json",
  "inject": {
    "llm.api_key": "api_key",
    "llm.endpoint": "base_url"
  }
}
```

这句话的意思是：
- Kimi 把自己的 `api_key` 填到你 `config.json` 里的 `llm.api_key` 位置
- Kimi 把自己的 `base_url` 填到你 `config.json` 里的 `llm.endpoint` 位置

**支持的注入变量**

| 变量名 | 含义 |
|--------|------|
| `api_key` | LLM 提供商的 API 密钥（支持 OAuth token 和普通 API key） |
| `base_url` | LLM API 的接口地址 |

**`config.json` 模板**

```json
{
  "llm": {
    "api_key": "",
    "endpoint": ""
  }
}
```

安装时 Kimi 会自动把空字符串替换成真实的值。如果你之后换了 LLM 提供商或者重新授权了，重启 Kimi 就会自动刷新配置文件里的凭证。**不需要重新安装插件。**

> **关于环境变量名的小坑**
> `inject` 里的键名（比如 `llm.api_key`）也会被当成环境变量名传给工具脚本。但点号（`.`）在有些环境里不好用（比如 Shell 里 `$llm.api_key` 会报错）。解决办法：
> - **Node.js**：用 `process.env["llm.api_key"]`
> - **Python**：用 `os.environ["llm.api_key"]`
> 
> 如果你想要更友好的环境变量名，建议用下划线大写格式（比如 `LLM_API_KEY`），并相应调整 `config.json` 的结构。

## 工具脚本规范

工具脚本怎么和 Kimi 对话？靠标准输入（stdin）和标准输出（stdout）。

**Kimi 怎么把参数传给脚本**

Kimi 会把参数写成 JSON，通过「管道」塞进脚本的标准输入：

```json
{
  "name": "World"
}
```

**脚本怎么把结果还给 Kimi**

脚本把结果写到标准输出。如果想返回结构化的数据，建议输出 JSON：

```json
{
  "content": "Hello, World!"
}
```

**Python 示例**

```python
#!/usr/bin/env python3
import json
import sys

# 从标准输入读取参数
params = json.load(sys.stdin)
name = params.get("name", "Guest")

# 生成结果
result = {"content": f"Hello, {name}!"}

# 写到标准输出
print(json.dumps(result))
```

**TypeScript 示例**

```typescript
#!/usr/bin/env tsx
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let input = "";
rl.on("line", (line) => {
  input += line;
});

rl.on("close", () => {
  const params = JSON.parse(input);
  const name = params.name || "Guest";
  console.log(JSON.stringify({ content: `Hello, ${name}!` }));
});
```

## 给插件配一本「说明书」（附带 Skill）

插件文件夹里除了 `plugin.json`，还可以放一个 `SKILL.md`。这相当于给插件配了一本「使用说明书」——Kimi 启动时会自动发现它，不需要额外注册。

为什么需要说明书？因为 `plugin.json` 只能告诉 Kimi「这个工具是干嘛的」，但 `SKILL.md` 可以告诉 Kimi「在什么情况下应该用哪个工具、怎么用、要注意什么」。

**目录结构**

```
my-plugin/
├── plugin.json
├── SKILL.md          # 可选：插件的使用说明书
└── scripts/
```

`SKILL.md` 的名字优先取文件开头的 frontmatter 里的 `name`，如果没有就用文件夹名。这个 Skill 以 `extra` 作用域被发现，也就是说，如果其他地方有同名的 Skill，会覆盖掉插件自带的这个。

> **限制**：一个插件只能带一本说明书。类似 `my-plugin/skills/xxx/SKILL.md` 这种嵌套结构是扫不到的。

## 一个完整的插件示例

```json
{
  "name": "sample-plugin",
  "version": "1.0.0",
  "description": "演示 Skill + Tool 的组合用法",
  "tools": [
    {
      "name": "py_greet",
      "description": "生成问候语（Python 工具）",
      "command": ["python3", "scripts/greet.py"],
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "名字"
          },
          "lang": {
            "type": "string",
            "enum": ["en", "zh", "ja"],
            "description": "语言"
          }
        },
        "required": ["name"]
      }
    },
    {
      "name": "ts_calc",
      "description": "计算数学表达式（TypeScript 工具）",
      "command": ["npx", "tsx", "scripts/calc.ts"],
      "parameters": {
        "type": "object",
        "properties": {
          "expression": {
            "type": "string",
            "description": "数学表达式"
          }
        },
        "required": ["expression"]
      }
    }
  ]
}
```

## 插件装在哪里

所有插件都安装在 `~/.kimi/plugins/` 目录下。每个插件是一个独立的子文件夹，里面包含完整的 `plugin.json` 和脚本文件。

> **插件 vs MCP 服务器**
> - **MCP**：像是一个 24 小时营业的服务台，适合需要持续运行、复杂流程、跨程序通信的场景
> - **Plugin**：像是一把随手可取的工具，适合简单脚本、项目专用功能、快速试错
