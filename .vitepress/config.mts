import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/code/docs/",
  title: "Kimi Code Docs",
  head: [
    ['style', {}, `
      .vp-doc .custom-block.details {
        background-color: #ffffff;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        margin-bottom: 6px;
      }
      html.dark .vp-doc .custom-block.details {
        background-color: var(--vp-c-bg-soft);
        border-color: var(--vp-c-divider);
      }
      .vp-doc .custom-block.details .custom-block-title {
        font-size: 18px;
        font-weight: 600;
      }
      .vp-doc .step-num {
        font-size: 1.3em;
      }
    `]
  ],
  ignoreDeadLinks: true,
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
    outline: 'deep',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
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
