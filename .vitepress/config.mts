import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/code/docs/",
  title: "Kimi Code Docs",
  rewrites: {
    'zh/:rest*': ':rest*'
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-Hans',
      title: 'Kimi Code 文档',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Kimi Code Docs',
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
