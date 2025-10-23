import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/coding/docs/",
  lang: "zh-CN",
  title: "Kimi CLI 与 Coding 权益",
  description: "Kimi CLI 与 Coding 权益说明",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      {
        text: '权益说明',
        link: '/benefits',
      },
      {
        text: 'Kimi CLI 使用说明',
        link: '/kimi-cli',
      },
      {
        text: '在第三方 Coding Agent 中使用',
        link: '/third-party-agents',
      }
    ]
  }
})
