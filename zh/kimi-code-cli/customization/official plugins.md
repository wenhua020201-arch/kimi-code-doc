# 官方插件

## kimi-datasource (Beta)

kimi-datasource 是 Kimi Code 官方插件，为 Kimi 接入金融行情、宏观经济、企业工商、学术文献等专业数据源，覆盖 A 股港股全市场、全球主要金融市场及宏观经济数据，通过自然语言即可完成查询与分析，无需手动调用接口。

::: warning 版本更新提示
当前版本为 **2.0.2**。如之前已安装，请重新执行安装命令覆盖更新。
:::

## 快速开始

<div class="steps">
  <div class="step">
    <div class="step-left">
      <div class="step-circle">1</div>
      <div class="step-line"></div>
    </div>
    <div class="step-body">

**安装插件**

```bash
kimi plugin install https://cdn.kimi.com/kimi-code-plugins/kimi-datasource.zip
```

> 插件安装后位于 `~/.kimi/plugins/`。

  </div>
  </div>
  <div class="step">
    <div class="step-left">
      <div class="step-circle">2</div>
      <div class="step-line"></div>
    </div>
    <div class="step-body">

**验证安装**

```bash
kimi plugin list
```

确认输出中包含 `kimi-datasource` 即安装成功。

  </div>
  </div>
  <div class="step">
    <div class="step-left">
      <div class="step-circle">3</div>
    </div>
    <div class="step-body">

**唤起 Kimi，开始使用**

通过 slash 命令触发：

```
/skill:kimi-datasource 帮我查一下茅台现在的价格
```

或直接用自然语言描述需求，Kimi 会自动调用插件，例如：

```
比亚迪今天收盘涨了还是跌了
```

  </div>
  </div>
</div>

## 金融数据

### 股票与全球市场行情

| 功能类别 | 说明 | 支持市场 |
|---|---|---|
| 实时行情 | 当前价、涨跌幅、分时数据 | A 股、港股、美股 |
| 历史行情 | 历史区间收盘价、涨跌幅统计 | A 股、港股、美股及全球主要市场 |
| 技术指标 | MACD、KDJ、RSI、BOLL、MA 等多空信号 | 仅 A 股 |
| 财务报表 | 资产负债表、历年财务数据同比分析 | A 股、港股、美股及全球主要市场 |
| 公司基本面 | 主营业务构成、股东信息 | A 股、港股、美股及全球主要市场 |
| 股票筛选 | 按行业、市值、涨跌幅及财务指标等多条件过滤 | A 股、港股、美股 |
| 指数行情 | 沪深300、上证、S&P 500、纳斯达克、日经等主要股指 | A 股、全球主要市场 |
| 自选股管理 | 添加自选股，支持持仓成本与盈亏实时计算 | A 股、港股、美股 |

### 宏观经济数据

基于**世界银行**开放数据，覆盖 **189 个成员国、50 年以上**历史时间序列，涵盖 GDP、贸易、人口、贫困、教育、气候等数十类指标——无论是做跨国研究、行业报告还是政策分析，都能直接用自然语言调取。

| 功能类别 | 说明 |
|---|---|
| 核心宏观指标 | GDP、CPI、贸易额、失业率、外债等 |
| 长周期历史数据 | 单国数据最长可追溯 50 年以上 |
| 多国横向对比 | 支持同一指标跨国比较与排名 |
| 主题数据集 | 贫困线、教育入学率、碳排放、人口结构、能源结构等专题 |

### 金融数据示例

::: details 股价区间查询

```text
帮我查一下茅台 2025 年 12 月到 2026 年 3 月的每日收盘价，用表格列出来，告诉我最高价和最低价分别是哪天、最大涨跌幅是多少。
```

:::

::: details 财务报表分析

```text
帮我拉一下茅台 2024 年的资产负债表，和 2023 年做同比对比，用表格呈现关键指标的变化，并指出值得关注的异动项。
```

:::

::: details 公司基本面研究

```text
帮我查一下腾讯的主要股东结构，以及近三年净利润和营收的变化趋势。
```

:::

::: details 股票筛选

```text
在白酒板块里，筛选市值 500 亿以上的股票，列出名称和当前市值。
```

:::

::: details 全球市场行情

```text
美股三大指数今天表现怎么样，有什么值得关注的板块异动？
```

:::

::: details 宏观经济对比

```text
帮我查一下中国、印度、越南过去 20 年的 GDP 增速和人均 GDP 变化，做一个对比分析。
```

:::

::: details 主题数据研究

```text
全球主要经济体近 10 年的碳排放量变化趋势，以及各国可再生能源占比情况。
```

:::

## 企业数据

覆盖中国本土企业的工商注册、股权穿透、司法风险等信息，帮你在签合同、做尽调、排查合作方风险时快速拿到第一手数据，不用在多个平台间来回切换。

| 功能类别 | 说明 |
|---|---|
| 工商信息 | 注册资本、成立日期、法人代表、经营范围、参保人数等 |
| 股权结构 | 股东出资比例、对外投资、实际控制人穿透 |
| 法律风险 | 司法纠纷、失信被执行人、行政处罚、经营异常 |
| 关联图谱 | 关联企业、共同法人、疑似关联方识别 |

> 仅支持中国大陆境内企业数据。

::: details 企业尽调

```text
帮我查一下比亚迪股份有限公司的工商信息、主要股东结构和对外投资情况。
```

:::

::: details 合作方风险排查

```text
帮我查一下 XX 科技有限公司有没有司法纠纷、失信被执行记录和行政处罚。
```

:::

::: details 股权穿透

```text
帮我看一下这家公司的实际控制人是谁，以及关联企业有哪些。
```

:::

## 学术数据

整合多个主流学术数据库，覆盖物理、数学、计算机科学、金融、经济等领域**百万量级**论文，支持文献检索、引用查询和最新预印本获取——无论是做综述、找参考文献，还是追踪某个方向的最新进展，直接描述需求就能拿到结果。

| 功能类别 | 说明 |
|---|---|
| 文献检索 | 按关键词、作者、研究主题精准搜索 |
| 高引文献查询 | 快速定位特定领域的经典与高影响力论文 |
| 预印本获取 | 第一时间访问尚未正式发表的最新研究成果 |
| 跨学科覆盖 | 理工、人文、经济、金融、计算机、气候科学等 |

::: details 文献检索

```text
帮我找一下近五年关于财务舞弊识别的经典学术论文，重点看异常应计利润相关的模型。
```

:::

::: details 前沿研究追踪

```text
最近有哪些关于大语言模型推理能力的重要研究，主要结论是什么？
```

:::

::: details 预印本查询

```text
帮我看一下最新的量化金融和机器学习结合的预印本论文，有哪些值得关注的方向。
```

:::

::: details 高引文献分析

```text
强化学习从人类反馈（RLHF）领域最有影响力的论文有哪些，主要作者是谁？
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

- 插件查询按次计费，每次调用会消耗账户额度。调用成功后，可在控制台**使用记录 › 请求记录**中看到调用类型为 **Data Source** 的条目。
- 本插件为只读查询，不提供任何交易或写入功能。
- 技术指标（MACD、KDJ 等）及实时行情仅在交易时段内可用，收盘后请改问"今天收盘怎么样"获取收盘摘要。
- AI 输出内容仅供参考，不构成任何投资或商业决策建议。

## 下一步

- [自定义插件](./plugins.md) — 了解如何安装、卸载与配置自己的插件
- [Skills](./skills.md) — 了解 skill 的调用方式与目录结构

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
