# Official Plugins

## kimi-datasource (Beta)

kimi-datasource is an official stock market plugin from Kimi Code. It supports real-time price queries, technical indicators, and market summaries for A-shares and HK stocks — all driven by natural language, no manual API calls needed.

## Quick Start

<span class="step-num">①</span> **Open a terminal and install the plugin**

```bash
kimi plugin install https://cdn.kimi.com/kimi-code-plugins/kimi-datasource.zip
```

> The plugin will be installed to `~/.kimi/plugins/`.

│

<span class="step-num">②</span> **Verify the installation**

```bash
kimi plugin list
```

Confirm that `kimi-datasource` appears in the output.

│

<span class="step-num">③</span> **Launch Kimi and start using it**

Trigger via slash command:

```
/skill:kimi-datasource what's the current price of Moutai?
```

Or simply describe your request in natural language and Kimi will automatically invoke the plugin:

```
Did BYD go up or down today?
```

## Feature Coverage

| Feature | Description | Markets |
|---|---|---|
| Real-time Price | Current price, minute K-lines, change % | A-shares, HK |
| Technical Indicators | MACD, KDJ, RSI, BOLL, MA, etc. | A-shares only |
| Pre-market Summary | Reference price (previous close) | A-shares, HK |
| Post-market Summary | Change %, volume, turnover, average price | A-shares, HK |
| Watchlist Management | Add/view watchlist stocks, support P&L calculation | A-shares, HK |

> US stocks, ETFs, indices, and funds are not supported yet.

## Examples

::: details Query real-time price

```text
How much is Moutai now, and how much did it rise today?
```

:::

::: details View technical indicators

```text
Show me the MACD and KDJ for CATL, what's the signal now?
```

:::

::: details Post-market summary

```text
How did Tencent close today, what's the turnover and volume?
```

:::

::: details Multi-stock comparison

```text
Compare the price change and volume of Moutai, Wuliangye, and Luzhou Laojiao today.
```

:::

::: details Add to watchlist

```text
Add BYD to my watchlist, cost basis 280, 200 shares.
```

:::

## Plugin Management

View plugin details

```bash
kimi plugin info kimi-datasource
```

Uninstall

```bash
kimi plugin remove kimi-datasource
```

Upgrade (re-install to overwrite)

```bash
kimi plugin install https://cdn.kimi.com/kimi-code-plugins/kimi-datasource.zip
```

## Notes

- This plugin is read-only and does not provide trading or order placement functionality.
- Data covers A-shares (SSE, SZSE, BSE) and HK stocks; US stocks are not supported.
- Technical indicators (MACD, KDJ, etc.) and real-time prices are only available during trading hours.
- AI-generated content is for reference only and does not constitute investment advice.

## Next Steps

- [Custom Plugins](./plugins.md) — Learn how to install, uninstall, and configure your own plugins
- [Skills](./skills.md) — Learn about skill invocation and directory structure
