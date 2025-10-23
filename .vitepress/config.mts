import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/coding/docs/",
  lang: "zh-CN",
  title: "Kimi For Coding",
  description: "Kimi For Coding 会员权益说明",
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
    ],

    outline: {
      label: "页面导航"
    },

    // 文章翻页
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 移动端 - 外观
    darkModeSwitchLabel: '外观',

    // 移动端 - 返回顶部
    returnToTopLabel: '返回顶部',

    // 移动端 - menu
    sidebarMenuLabel: '菜单',
  }
})
