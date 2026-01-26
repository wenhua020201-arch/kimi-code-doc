import { defineAdditionalConfig } from "vitepress";
import kimiCliSidebar from "./kimi-cli/sidebar.json";

export default defineAdditionalConfig({
  lang: 'zh-Hans',
  description: 'Kimi Code 会员权益说明',
  themeConfig: {
    sidebar: [
      {
        text: 'Kimi Code',
        items: [
          { text: 'Kimi Code 会员权益', link: '/' },
          { text: '权益说明', link: '/benefits' },
        ],
      },
      {
        text: 'Kimi CLI 使用指南',
        items: [
          ...kimiCliSidebar.zh.items,
          {
            text: '定制化和更多参考',
            link: 'https://moonshotai.github.io/kimi-cli/zh/customization/mcp.html',
            target: '_blank',
          },
        ],
      },
      {
        text: 'Kimi Code for VS Code 指南',
        items: [
          { text: 'Getting Started', link: '/zh/kimi-code-for-vscode/guides/getting-started' },
        ],
      },
      {
        text: '更多',
        items: [
          { text: '在第三方 Coding Agent 中使用', link: '/more/third-party-agents' },
        ],
      },
    ],

    search: {
      options: {
        placeholder: '搜索',
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '展开详情',
            resetButtonTitle: '清除搜索词',
            backButtonTitle: '返回',
            noResultsText: '没有找到',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: 'Enter 键',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上箭头',
              navigateDownKeyAriaLabel: '向下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc 键',
            }
          }
        }
      }
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      label: "页面导航"
    },
    notFound: {
      title: '页面未找到',
      quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
  }
})
