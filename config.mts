import { defineAdditionalConfig } from "vitepress";

export default defineAdditionalConfig({
  lang: 'zh-Hans',
  description: 'Kimi Code 文档',
  themeConfig: {
    sidebar: [
      {
        text: 'Kimi Code',
        items: [
          { text: '产品概览', link: '/' },
          { text: '常见问题', link: '/kimi-code/faq' },
        ],
      },
      {
        text: 'Kimi Code CLI',
        items: [
          { text: '快速开始', link: '/kimi-code-cli/getting-started' },
          { text: '核心操作', link: '/kimi-code-cli/core-operations' },
          {
            text: '配置',
            collapsed: false,
            items: [
              { text: '配置文件', link: '/kimi-code-cli/configuration/configuration-files' },
              { text: '环境变量', link: '/kimi-code-cli/configuration/environment-variables' },
              { text: '平台与模型', link: '/kimi-code-cli/configuration/providers-and-models' },
              { text: '数据路径', link: '/kimi-code-cli/configuration/data-locations' },
              { text: '配置覆盖', link: '/kimi-code-cli/configuration/overrides-and-precedence' },
            ],
          },
          {
            text: '定制化',
            collapsed: false,
            items: [
              { text: 'MCP', link: '/kimi-code-cli/customization/mcp' },
              { text: 'Hooks (Beta)', link: '/kimi-code-cli/customization/hooks' },
              { text: '插件 (Beta)', link: '/kimi-code-cli/customization/plugins' },
              { text: 'Skills', link: '/kimi-code-cli/customization/skills' },
              { text: 'Agent 与子 Agent', link: '/kimi-code-cli/customization/sub-agents' },
              { text: 'Wire 协议', link: '/kimi-code-cli/customization/wire-protocol' },
            ],
          },
          {
            text: '参考手册',
            collapsed: true,
            items: [
              { text: 'kimi 命令', link: '/kimi-code-cli/reference/kimi-command' },
              { text: 'kimi acp 子命令', link: '/kimi-code-cli/reference/kimi-acp' },
              { text: 'kimi info 子命令', link: '/kimi-code-cli/reference/kimi-info' },
              { text: 'kimi mcp 子命令', link: '/kimi-code-cli/reference/kimi-mcp' },
              { text: 'kimi term 子命令', link: '/kimi-code-cli/reference/kimi-term' },
              { text: 'kimi vis 子命令', link: '/kimi-code-cli/reference/kimi-vis' },
              { text: 'Web UI', link: '/kimi-code-cli/reference/kimi-web' },
              { text: '斜杠命令速查', link: '/kimi-code-cli/reference/slash-commands' },
              { text: '键盘快捷键速查', link: '/kimi-code-cli/reference/keyboard-shortcuts' },
            ],
          },
        ],
      },
      {
        text: 'Kimi Code for VS Code',
        items: [
          { text: '快速开始', link: '/kimi-code-for-vscode/getting-started' },
          { text: '基础操作', link: '/kimi-code-for-vscode/core-operations' },
          { text: '配置', link: '/kimi-code-for-vscode/configuration' },
          { text: '定制化', link: '/kimi-code-for-vscode/customization' },
        ],
      },
      {
        text: '在第三方工具中使用',
        items: [
          { text: 'JetBrains', link: '/third-party-tools/jetbrains' },
          { text: 'Zed', link: '/third-party-tools/zed' },
          { text: 'Zsh', link: '/third-party-tools/zsh' },
          { text: '在第三方 Coding Agent 中使用', link: '/third-party-tools/other-coding-agents' },
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
      label: '页面导航'
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
