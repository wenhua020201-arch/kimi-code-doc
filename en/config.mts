import { defineAdditionalConfig } from "vitepress";

export default defineAdditionalConfig({
  lang: 'en-US',
  description: 'Kimi For Coding Membership Benefits',
  themeConfig: {
    sidebar: [
      {
        text: 'Benefit Description',
        link: '/en/benefits',
      },
      {
        text: 'Kimi CLI Guide',
        link: '/en/kimi-cli',
      },
      {
        text: 'Use in Third-Party Coding Agents',
        link: '/en/third-party-agents',
      }
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
