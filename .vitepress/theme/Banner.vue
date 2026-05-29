<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()
const isEn = computed(() => page.value.relativePath.startsWith('en/'))

const text = computed(() =>
  isEn.value
    ? 'Kimi Code CLI has been upgraded. Learn more →'
    : 'Kimi Code CLI 已完成版本升级，了解更多 →'
)
const link = computed(() =>
  isEn.value
    ? '/en/kimi-code-cli/cli-migration'
    : '/kimi-code-cli/cli-migration'
)
</script>

<template>
  <div class="site-banner">
    <a :href="link">{{ text }}</a>
  </div>
</template>

<style>
.site-banner {
  background: #3451b2;
  color: #fff;
  text-align: center;
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}
.site-banner a {
  color: #fff;
  text-decoration: none;
}
.site-banner a:hover {
  text-decoration: underline;
}
</style>
