import '@fontsource/google-sans/latin-400.css'
import '@fontsource/google-sans/latin-500.css'
import '@fontsource/google-sans/cyrillic-400.css'
import '@fontsource/google-sans/cyrillic-500.css'
import './home-hero.css'

import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import Layout from './Layout.vue'
import DsPrimitivesPalette from './components/docs/DsPrimitivesPalette.vue'
import DsSemanticTokens from './components/docs/DsSemanticTokens.vue'
import DsRadiusScale from './components/docs/DsRadiusScale.vue'
import DsShadowsGallery from './components/docs/DsShadowsGallery.vue'
import ComponentDocsPreview from './components/docs/ComponentDocsPreview.vue'
// CSS скина corporate (живые демо) — последним: при равной специфичности он выигрывает
// у стилей VitePress (например, `.vp-doc p` внутри RichInput).
import '../../../src/skins/corporate/index.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('DsPrimitivesPalette', DsPrimitivesPalette)
    app.component('DsSemanticTokens', DsSemanticTokens)
    app.component('DsRadiusScale', DsRadiusScale)
    app.component('DsShadowsGallery', DsShadowsGallery)
    app.component('ComponentDocsPreview', ComponentDocsPreview)
  },
} satisfies Theme
