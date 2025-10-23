import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/coding/docs/",
  title: "Kimi CLI 与 Coding 权益",
  description: "Kimi Coding Plan 文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      {
        text: '权益说明',
        items: [
          { text: '计费方式', link: '/plan/billing' },
          { text: '使用条款', link: '/plan/terms-of-service' },
        ]
      },
      {
        text: '在 Coding Agent 中使用',
        items: [
          { text: 'Kimi CLI', link: '/agent/kimi-cli' },
          { text: 'Claude Code', link: '/agent/claude-code' },
          { text: 'Roo Code', link: '/agent/roo-code' },
        ]
      }
    ]
  }
})
