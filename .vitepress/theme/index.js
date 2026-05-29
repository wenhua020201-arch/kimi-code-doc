import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Banner from './Banner.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(Banner)
    })
  }
}
