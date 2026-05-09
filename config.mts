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
          { text: '社区倡议', link: '/kimi-code/community-guidelines' },
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
              { text: '配置覆盖', link: '/kimi-code-cli/configuration/overrides-and-precedence' },
              { text: '环境变量', link: '/kimi-code-cli/configuration/environment-variables' },
              { text: '平台与模型', link: '/kimi-code-cli/configuration/providers-and-models' },
              { text: '数据路径', link: '/kimi-code-cli/configuration/data-locations' },
            ],
          },
          {
            text: '定制化',
            collapsed: false,
            items: [
              { text: '官方插件 <span style="background:#3451b2;color:#fff;font-size:11px;padding:1px 6px;border-radius:4px;margin-left:6px">NEW</span>', link: '/kimi-code-cli/customization/official plugins' },
              { text: 'MCP', link: '/kimi-code-cli/customization/mcp' },
              { text: 'Hooks (Beta)', link: '/kimi-code-cli/customization/hooks' },
              { text: 'Skills', link: '/kimi-code-cli/customization/skills' },
              { text: '自定义插件 (Beta)', link: '/kimi-code-cli/customization/plugins' },
              { text: 'Agents 和 Subagents', link: '/kimi-code-cli/customization/sub-agents' },
              { text: 'Wire Protocol', link: '/kimi-code-cli/customization/wire-protocol' },
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
              { text: '快捷键速查', link: '/kimi-code-cli/reference/keyboard-shortcuts' },
            ],
          },
        ],
      },
      {
        text: 'Kimi Code for VS Code',
        items: [
          { text: '快速开始', link: '/kimi-code-for-vscode/getting-started' },
          { text: '核心操作', link: '/kimi-code-for-vscode/core-operations' },
          { text: '配置', link: '/kimi-code-for-vscode/configuration' },
          { text: '定制化', link: '/kimi-code-for-vscode/customization' },
        ],
      },
      {
        text: '在更多第三方工具中使用',
        items: [
          { text: 'JetBrains', link: '/third-party-tools/jetbrains' },
          { text: 'Zed', link: '/third-party-tools/zed' },
          { text: 'Zsh', link: '/third-party-tools/zsh' },
          { text: '在其他 coding agent 中使用', link: '/third-party-tools/other-coding-agents' },
        ],
      },
    ],
  },
});
