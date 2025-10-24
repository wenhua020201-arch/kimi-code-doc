import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "https://cdn.kimi.com/coding/docs/",
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

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/MoonshotAI/kimi-cli',
      }
    ],
    search: {
      provider: 'local',
    },

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
  },
  transformHtml(code, id, ctx) {
    // 这里是 https:/ 而不是 https:// ，这是 vitepress 的 bug
    const cdnHtmlUrlPattern = /https:\/cdn\.kimi\.com\/coding\/docs\/([\w\-\/\.]+?\.html)/g;
    // console.log(id, cdnHtmlUrlPattern.test(code))
    return code.replace(cdnHtmlUrlPattern, (_match, path) => {
      // console.log(_match, path)
      return `/coding/docs/${path}`;
    });
  },
})
