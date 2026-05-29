# Official Plugins

::: warning 📢 Version Notice
Kimi Code CLI has gone through a major version upgrade — moving from Python/uv to Node.js, bringing a simpler install experience, faster startup, and a redesigned terminal UI. This page applies to the legacy Kimi Code CLI only. The legacy version will gradually be phased out — we recommend upgrading as soon as possible. See [Version Upgrade](/en/kimi-code-cli/cli-migration) for details.
This documentation is being rebuilt — for new-version feature details, please visit the [Kimi Code CLI docs](https://moonshotai.github.io/kimi-code/en/) in the meantime.
:::



## kimi-datasource (Beta)

kimi-datasource is a Kimi Code official plugin that connects Kimi to professional data sources — financial markets, macroeconomic indicators, corporate records, and academic literature. It covers A-shares, Hong Kong stocks, global markets, and 50+ years of World Bank economic data, all queryable through natural language with no API calls required.

::: tip Version update
Current version: **2.1.0**. If you have a previous installation, re-run the install command to update.
:::

::: details Changelog

**2.1.0** — Fixed a known issue with enterprise data queries, improving call reliability.

**2.0.2** — Added historical prices, company fundamentals and financial statements, enterprise data, and academic data.

**2.0.0** · May 1, 2025 — Initial release with real-time quote support for A-shares, HK stocks, and US stocks.

:::

## Quick Start

<div class="steps">
  <div class="step">
    <div class="step-left">
      <div class="step-circle">1</div>
      <div class="step-line"></div>
    </div>
    <div class="step-body">

**Install the plugin**

```bash
kimi plugin install https://cdn.kimi.com/kimi-code-plugins/kimi-datasource.zip
```

> The plugin will be installed in `~/.kimi/plugins/`.

  </div>
  </div>
  <div class="step">
    <div class="step-left">
      <div class="step-circle">2</div>
      <div class="step-line"></div>
    </div>
    <div class="step-body">

**Verify the installation**

```bash
kimi plugin list
```

Confirm that `kimi-datasource` appears in the output.

  </div>
  </div>
  <div class="step">
    <div class="step-left">
      <div class="step-circle">3</div>
    </div>
    <div class="step-body">

**Start Kimi and use the plugin**

Trigger via a slash command:

```
/skill:kimi-datasource What's the current price of Moutai?
```

Or simply describe your request in natural language:

```
Did BYD go up or down today?
```

  </div>
  </div>
</div>

> After a successful query, you can verify the call in the [console](https://www.kimi.com/code/console) under **Usage History**.

## Financial Data

### Stock & Global Market Quotes

| Feature | Description | Markets |
|---|---|---|
| Real-time quotes | Current price, change %, intraday data | A-shares, HK, US |
| Historical prices | Historical closing prices and price-change ranges | A-shares, HK, US, and major global markets |
| Technical indicators | MACD, KDJ, RSI, BOLL, MA — with bullish/bearish signals | A-shares only |
| Financial statements | Balance sheets, year-over-year financial data | A-shares, HK, US, and major global markets |
| Company fundamentals | Business overview, shareholder information | A-shares, HK, US, and major global markets |
| Stock screening | Filter by sector, market cap, price change, financial metrics, and more | A-shares, HK, US |
| Market indices | CSI 300, SSE, S&P 500, Nasdaq, Nikkei, and more | A-shares, major global markets |
| Watchlist management | Track holdings, calculate P&L based on cost basis | A-shares, HK, US |

### Macroeconomic Data

Powered by the **World Bank** Open Data API — **189 member countries, 50+ years** of historical time series covering GDP, trade, population, poverty, education, climate, and dozens of other indicators. Great for cross-country comparisons, policy research, and data-driven analysis.

| Feature | Description |
|---|---|
| Core macro indicators | GDP, CPI, trade volume, unemployment, external debt, etc. |
| Long-run historical data | Up to 50+ years of data per country |
| Cross-country comparison | Compare any indicator across multiple countries |
| Thematic datasets | Poverty rates, education enrollment, CO₂ emissions, energy mix, demographics, and more |

### Financial Data Examples

::: details Historical price query

```text
What was Apple's (AAPL) highest and lowest closing price in Q4 2025?
```

:::

::: details Financial statement analysis

```text
What are the key figures in Microsoft's 2024 annual balance sheet — total assets, liabilities, and equity?
```

:::

::: details Company fundamentals

```text
What are NVIDIA's main business segments and who are its largest institutional shareholders?
```

:::

::: details Stock screening

```text
In the US semiconductor sector, find stocks with market cap above $500B and list their names and current market caps.
```

:::

::: details Global market overview

```text
How are the S&P 500, Nasdaq, and Nikkei 225 performing today? Any notable sector moves?
```

:::

::: details Macroeconomic comparison

```text
Compare GDP growth rates and GDP per capita trends for China, India, and Vietnam over the past 20 years.
```

:::

::: details Thematic data research

```text
Show CO₂ emissions trends for major economies over the past decade, alongside their renewable energy share.
```

:::

## Academic Data

Access millions of papers across physics, mathematics, computer science, quantitative finance, economics, and more — spanning both peer-reviewed journals and preprint repositories. Whether you're writing a literature review, tracking a research frontier, or looking for the most cited work in a field, just describe what you need.

| Feature | Description |
|---|---|
| Paper search | Search by keyword, author, topic, or field across a large academic corpus |
| Citation lookup | Find the most cited and influential papers in any domain |
| Preprint access | Access the latest research before formal publication |
| Cross-discipline | Physics, math, CS, economics, quantitative finance, climate science, and more |

### Academic Data Examples

::: details Literature search

```text
Find key academic papers on financial fraud detection from the past five years, focusing on abnormal accruals and earnings manipulation models.
```

:::

::: details Research frontier

```text
What are the most important recent papers on LLM reasoning capabilities? Summarize the main findings.
```

:::

::: details Preprint lookup

```text
What are the latest preprints at the intersection of quantitative finance and machine learning?
```

:::

::: details Citation analysis

```text
What are the most influential papers on reinforcement learning from human feedback? Who are the key authors?
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

- Plugin queries are credit-based and billed per call.
- This plugin is read-only and does not support trading, writing, or any data submission.
- Technical indicators and real-time prices are only available during active trading hours. After market close, ask about closing data instead (e.g. "How did X close today?").
- AI-generated output is for reference only and does not constitute investment or business advice.

## Next Steps

- [Custom Plugins](./plugins.md) — Learn how to install, uninstall, and configure your own plugins
- [Skills](./skills.md) — Learn about skill usage and directory structure


<style>
.steps { display: flex; flex-direction: column; margin: 24px 0; }
.step { display: flex; gap: 16px; }
.step-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.step-circle {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--vp-c-brand-1, #3451b2); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 600; flex-shrink: 0;
}
.step-line { width: 2px; flex: 1; background: var(--vp-c-divider); margin: 4px 0; min-height: 16px; }
.step-body { padding-bottom: 28px; flex: 1; min-width: 0; }
</style>
