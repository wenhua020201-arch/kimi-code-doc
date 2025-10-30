import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/coding/docs/",
  title: "Kimi For Coding",
  rewrites: {
    'zh/:rest*': ':rest*'
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-Hans',
    },
    en: {
      label: 'English',
      lang: 'en-US',
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/MoonshotAI/kimi-cli',
      }
    ],
  },
})
