import { defineAdditionalConfig } from "vitepress";
import kimiCliSidebar from "../kimi-cli/sidebar.json";

export default defineAdditionalConfig({
  lang: 'en-US',
  description: 'Kimi Code Membership Benefits',
  themeConfig: {
    sidebar: [
      {
        text: 'Kimi Code',
        items: [
          { text: 'Kimi Code Membership Benefits', link: '/en/' },
          { text: 'Benefit Description', link: '/en/benefits' },
        ],
      },
      {
        text: 'Kimi Code CLI Guide',
        items: [
          ...kimiCliSidebar.en.items,
          {
            text: 'Customization and More',
            link: 'https://moonshotai.github.io/kimi-cli/en/customization/mcp.html',
            target: '_blank',
          },
        ],
      },
      {
        text: 'Kimi Code for VS Code Guide',
        items: [
          { text: 'Getting Started', link: '/en/kimi-code-for-vscode/guides/getting-started' },
        ],
      },
      {
        text: 'More',
        items: [
          { text: 'Use in Third-Party Coding Agents', link: '/en/more/third-party-agents' },
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
      label: "On this page"
    },
    notFound: {
      title: 'PAGE NOT FOUND',
      quote: 'But if you don\'t change your direction, and if you keep looking, you may end up where you are heading.',
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
