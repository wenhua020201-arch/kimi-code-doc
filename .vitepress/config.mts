import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/code/docs/",
  title: "Kimi Code Docs",
  head: [
    ['style', {}, `
      /* ── 品牌色 ── */
      :root {
        --vp-c-brand-1: #1a6bff;
        --vp-c-brand-2: #1457d9;
        --vp-c-brand-3: #c8d9ff;
        --vp-c-brand-soft: rgba(26, 107, 255, 0.12);

        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: linear-gradient(135deg, #1a6bff 0%, #7c3aed 100%);
        --vp-home-hero-image-background-image: linear-gradient(135deg, #1a6bff22 0%, #7c3aed22 100%);
        --vp-home-hero-image-filter: blur(56px);
      }
      html.dark {
        --vp-c-brand-1: #4f8eff;
        --vp-c-brand-2: #3a7aff;
        --vp-c-brand-3: #1a3a6b;
        --vp-c-brand-soft: rgba(79, 142, 255, 0.12);
      }

      /* ── Hero 区域间距 ── */
      .VPHero .name { letter-spacing: -0.5px; }
      .VPHero .tagline { max-width: 480px; }

      /* ── Features 卡片 ── */
      .VPFeature { border-radius: 12px !important; transition: box-shadow 0.2s; }
      .VPFeature:hover { box-shadow: 0 4px 24px rgba(26,107,255,0.10); }

      /* ── 首页正文区域 ── */
      .home-content {
        max-width: 960px;
        margin: 0 auto;
        padding: 48px 24px 64px;
      }
      .home-content h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 40px 0 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--vp-c-divider);
      }

      /* ── 文档页细节 ── */
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

      /* ── 简洁高亮块 ── */
      .vp-doc .custom-block.danger,
      .vp-doc .custom-block.tip,
      .vp-doc .custom-block.info {
        border: 1px solid var(--vp-c-divider);
        border-radius: 8px;
        background: var(--vp-c-bg-soft);
      }
      .vp-doc .custom-block .custom-block-title {
        font-weight: 600;
      }
      /* 隐藏自定义容器的默认英文标题 */
      .vp-doc .custom-block.danger .custom-block-title,
      .vp-doc .custom-block.tip .custom-block-title,
      .vp-doc .custom-block.info .custom-block-title {
        display: none;
      }
    `]
  ],
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
