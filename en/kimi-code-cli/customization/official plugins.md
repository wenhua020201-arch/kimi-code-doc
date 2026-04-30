# Official Plugins

## kimi-datasource (Beta)

kimi-datasource is an official stock data plugin developed by Kimi Code. It supports real-time price queries, technical indicators, and market summaries for A-shares and Hong Kong stocks — all driven by natural language, with no manual API calls needed.

## Quick Start

<span class="step-num">①</span> **Open a terminal and install the plugin**

```bash
kimi plugin install https://cdn.kimi.com/kimi-code-plugins/kimi-datasource.zip
```

> The plugin will be installed in `~/.kimi/plugins/`.

│

<span class="step-num">②</span> **Verify the installation**

```bash
kimi plugin list
```

Confirm that `kimi-datasource` appears in the output.

│

<span class="step-num">③</span> **Start using Kimi**

Trigger it via a slash command:

```
/skill:kimi-datasource what's the current price of Moutai?
```

Or simply describe your request in natural language, and Kimi will automatically call the plugin:

```
Did BYD go up or down today?
```

## Feature Coverage

| Feature | Description | Markets |
|---|---|---|
| Real-time Quotes | Current price, minute K-lines, change % | A-shares, HK |
| Technical Indicators | MACD, KDJ, RSI, BOLL, MA, etc. | A-shares only |
| Pre-market Summary | Reference price (previous close) | A-shares, HK |
| Post-market Summary | Change %, volume, turnover, average price | A-shares, HK |
| Watchlist Management | Add and view watchlist stocks; supports P&L tracking | A-shares, HK |

> US stocks, ETFs, indices, and funds are not supported yet.

## Examples

::: details Query real-time price

```text
What's Moutai's current price and daily change?
```

:::

::: details View technical indicators

```text
Show me MACD and KDJ for CATL. What's the signal?
```

:::

::: details Post-market summary

```text
How did Tencent close today? What's the turnover and volume?
```

:::

::: details Multi-stock comparison

```text
Compare the price change and volume of Moutai, Wuliangye, and Luzhou Laojiao today.
```

:::

::: details Add to watchlist

```text
Add BYD to my watchlist — cost basis 280, 200 shares.
```

:::

## Plugin Management

Viewing plugin details

```bash
kimi plugin info kimi-datasource
```

Uninstalling

```bash
kimi plugin remove kimi-datasource
```

Upgrading (reinstall to overwrite)

```bash
kimi plugin install https://cdn.kimi.com/kimi-code-plugins/kimi-datasource.zip
```

## Notes

- This plugin is read-only and does not provide trading or order placement functionality.
- Data covers A-shares (SSE, SZSE, BSE) and Hong Kong stocks; US stocks are not supported.
- Technical indicators (MACD, KDJ, etc.) and real-time prices are only available during trading hours.
- AI-generated content is for reference only and does not constitute investment advice.

## Next Steps

- [Custom Plugins](./plugins.md) — Learn how to install, uninstall, and configure your own plugins
- [Skills](./skills.md) — Learn about skill usage and directory structure
