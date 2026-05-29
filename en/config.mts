import { defineAdditionalConfig } from "vitepress";

export default defineAdditionalConfig({
  lang: 'en-US',
  description: 'Kimi Code Documentation',
  themeConfig: {
    sidebar: [
      {
        text: 'Kimi Code',
        items: [
          { text: 'Overview', link: '/en/' },
          { text: 'Community Guidelines', link: '/en/kimi-code/community-guidelines' },
          { text: 'FAQ', link: '/en/kimi-code/faq' },
          { text: 'Error Reference', link: '/en/kimi-code/error-reference' },
        ],
      },
      {
        text: 'Kimi Code CLI',
        items: [
          { text: '📢 Version Upgrade', link: '/en/kimi-code-cli/cli-migration' },
          { text: 'Quick Start', link: '/en/kimi-code-cli/getting-started' },
          { text: 'Core Operations', link: '/en/kimi-code-cli/core-operations' },
          {
            text: 'Configuration',
            collapsed: false,
            items: [
              { text: 'Config Files', link: '/en/kimi-code-cli/configuration/configuration-files' },
              { text: 'Environment Variables', link: '/en/kimi-code-cli/configuration/environment-variables' },
              { text: 'Providers and Models', link: '/en/kimi-code-cli/configuration/providers-and-models' },
              { text: 'Data Locations', link: '/en/kimi-code-cli/configuration/data-locations' },
              { text: 'Config Overrides', link: '/en/kimi-code-cli/configuration/overrides-and-precedence' },
            ],
          },
          {
            text: 'Customization',
            collapsed: false,
            items: [
              { text: 'Official Plugins', link: '/en/kimi-code-cli/customization/official plugins' },
              { text: 'MCP', link: '/en/kimi-code-cli/customization/mcp' },
              { text: 'Hooks (Beta)', link: '/en/kimi-code-cli/customization/hooks' },
              { text: 'Skills', link: '/en/kimi-code-cli/customization/skills' },
              { text: 'Custom Plugins (Beta)', link: '/en/kimi-code-cli/customization/plugins' },
              { text: 'Agents and Subagents', link: '/en/kimi-code-cli/customization/sub-agents' },
              { text: 'Wire Protocol', link: '/en/kimi-code-cli/customization/wire-protocol' },
            ],
          },
          {
            text: 'Reference',
            collapsed: true,
            items: [
              { text: 'kimi Command', link: '/en/kimi-code-cli/reference/kimi-command' },
              { text: 'kimi acp subcommand', link: '/en/kimi-code-cli/reference/kimi-acp' },
              { text: 'kimi info subcommand', link: '/en/kimi-code-cli/reference/kimi-info' },
              { text: 'kimi mcp subcommand', link: '/en/kimi-code-cli/reference/kimi-mcp' },
              { text: 'kimi term subcommand', link: '/en/kimi-code-cli/reference/kimi-term' },
              { text: 'kimi vis subcommand', link: '/en/kimi-code-cli/reference/kimi-vis' },
              { text: 'Web UI', link: '/en/kimi-code-cli/reference/kimi-web' },
              { text: 'Slash Commands Quick Reference', link: '/en/kimi-code-cli/reference/slash-commands' },
              { text: 'Keyboard Shortcuts Quick Reference', link: '/en/kimi-code-cli/reference/keyboard-shortcuts' },
            ],
          },
        ],
      },
      {
        text: 'Kimi Code for VS Code',
        items: [
          { text: 'Quick Start', link: '/en/kimi-code-for-vscode/getting-started' },
          { text: 'Core Operations', link: '/en/kimi-code-for-vscode/core-operations' },
          { text: 'Configuration', link: '/en/kimi-code-for-vscode/configuration' },
          { text: 'Customization', link: '/en/kimi-code-for-vscode/customization' },
        ],
      },
      {
        text: 'Use in Third-Party Tools',
        items: [
          { text: 'JetBrains', link: '/en/third-party-tools/jetbrains' },
          { text: 'Zed', link: '/en/third-party-tools/zed' },
          { text: 'Zsh', link: '/en/third-party-tools/zsh' },
          { text: 'Using in Third-Party Coding Agents', link: '/en/third-party-tools/other-coding-agents' },
        ],
      },
    ],

    search: {
      options: {
        placeholder: 'Search',
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          },
          modal: {
            displayDetails: 'Display details',
            resetButtonTitle: 'Clear search',
            backButtonTitle: 'Back',
            noResultsText: 'No results for',
            footer: {
              selectText: 'Select',
              selectKeyAriaLabel: 'Enter key',
              navigateText: 'Switch',
              navigateUpKeyAriaLabel: 'Up arrow',
              navigateDownKeyAriaLabel: 'Down arrow',
              closeText: 'Close',
              closeKeyAriaLabel: 'ESC key',
            }
          }
        }
      }
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    outline: {
      level: 'deep',
      label: 'On this page'
    },
    notFound: {
      title: 'PAGE NOT FOUND',
      quote: "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
      linkLabel: 'go to home',
      linkText: 'Take me home'
    },
    langMenuLabel: 'Languages',
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light mode',
    darkModeSwitchTitle: 'Switch to dark mode',
    skipToContentLabel: 'Skip to content',
  }
})
