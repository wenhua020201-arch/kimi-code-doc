# 官方插件

## kimi-datasource (Beta)

kimi-datasource 是 Kimi Code 官方推出的股票行情插件，支持查询 A 股、港股的实时价格、技术指标和盘面摘要，全程通过自然语言驱动，无需手动调用接口。

## 快速开始

<span class="step-num">①</span> **打开终端、安装插件**

```bash
kimi plugin install https://cdn.kimi.com/kimi-code-plugins/kimi-datasource.zip
```

> 插件安装后位于 `~/.kimi/plugins/`。

│

<span class="step-num">②</span> **验证安装**

```bash
kimi plugin list
```

确认输出中包含 `kimi-datasource` 即安装成功。

│

<span class="step-num">③</span> **唤起 Kimi，开始使用**

通过 slash 命令触发：

```
/skill:kimi-datasource 帮我查一下茅台现在的价格
```

或直接用自然语言描述需求，Kimi 会自动调用插件，例如：

```
比亚迪今天收盘涨了还是跌了
```

## 功能覆盖

| 功能类别 | 说明 | 支持市场 |
|---|---|---|
| 实时行情 | 当前价、分钟 K 线、涨跌幅 | A 股、港股 |
| 技术指标 | MACD、KDJ、RSI、BOLL、MA 等 | 仅 A 股 |
| 开盘摘要 | 盘前参考价（前一日收盘） | A 股、港股 |
| 收盘摘要 | 涨跌幅、成交量、换手率、均价等 | A 股、港股 |
| 自选股管理 | 添加、查看自选股，支持持仓盈亏计算 | A 股、港股 |

> 美股、ETF、指数、基金暂不支持。

## 示例

::: details 查询实时股价

```text
茅台现在多少钱，今天涨了多少？
```

:::

::: details 查看技术指标

```text
帮我看一下宁德时代的 MACD 和 KDJ，现在多空信号怎么样？
```

:::

::: details 收盘摘要

```text
腾讯今天收盘怎么样，换手率和成交量如何？
```

:::

::: details 多股对比

```text
帮我对比一下茅台、五粮液、泸州老窖今天的涨跌幅和成交量。
```

:::

::: details 添加自选股

```text
帮我把比亚迪加到自选股，成本价 280，持仓 200 股。
```

:::

## 插件管理

查看插件详情

```bash
kimi plugin info kimi-datasource
```

卸载

```bash
kimi plugin remove kimi-datasource
```

升级（重新安装覆盖即可）

```bash
kimi plugin install https://cdn.kimi.com/kimi-code-plugins/kimi-datasource.zip
```

## 注意事项

- 本插件为只读查询，不提供交易下单功能。
- 数据覆盖 A 股（上交所、深交所、北交所）及港股，美股暂不支持。
- 技术指标（MACD、KDJ 等）及实时行情仅在交易时段内可用。
- AI 输出内容仅供参考，不构成任何投资建议。

## 下一步

- [自定义插件](./plugins.md) — 了解如何安装、卸载与配置自己的插件
- [Skills](./skills.md) — 了解 skill 的调用方式与目录结构
