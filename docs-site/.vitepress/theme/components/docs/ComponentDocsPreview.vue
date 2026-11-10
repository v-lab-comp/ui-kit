<script setup lang="ts">
import type { ComponentDocsName } from '@/docs/vitepress/componentDocsRegistry'
import { componentDocsLoaders } from '@/docs/vitepress/componentDocsRegistry'
import { useData } from 'vitepress'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { ComponentType } from 'react'

const props = defineProps<{
  name: ComponentDocsName
}>()

const { isDark } = useData()

/** По умолчанию и при смене темы сайта — как у VitePress (светлая / тёмная). Ручной выбор кнопок перезаписывается при следующей смене темы VP. */
const previewTheme = ref<'light' | 'dark'>('light')

function syncPreviewThemeFromVitePress() {
  previewTheme.value = isDark.value ? 'dark' : 'light'
}

watch(isDark, syncPreviewThemeFromVitePress, { immediate: true })

const host = ref<HTMLDivElement | null>(null)
let reactRoot: import('react-dom/client').Root | null = null

async function mountReactPreview() {
  syncPreviewThemeFromVitePress()
  const [{ createRoot }, React] = await Promise.all([import('react-dom/client'), import('react')])
  const loader = componentDocsLoaders[props.name]
  const Comp = (await loader()) as ComponentType<object>
  if (!host.value) return
  reactRoot?.unmount()
  reactRoot = createRoot(host.value)
  reactRoot.render(React.createElement(Comp))
}

onMounted(() => {
  void mountReactPreview()
})

/** При SPA-переходах между страницами гайда экземпляр может не размонтироваться — пересобираем превью. */
watch(
  () => props.name,
  () => {
    void mountReactPreview()
  }
)

onUnmounted(() => {
  reactRoot?.unmount()
  reactRoot = null
})
</script>

<template>
  <div class="component-docs-preview">
    <div
      class="component-docs-preview__toolbar"
      role="toolbar"
      aria-label="Component preview theme"
    >
      <span class="component-docs-preview__toolbar-label">Theme</span>
      <button
        type="button"
        class="component-docs-preview__btn"
        :class="{ 'component-docs-preview__btn--active': previewTheme === 'light' }"
        :aria-pressed="previewTheme === 'light'"
        @click="previewTheme = 'light'"
      >
        Light
      </button>
      <button
        type="button"
        class="component-docs-preview__btn"
        :class="{ 'component-docs-preview__btn--active': previewTheme === 'dark' }"
        :aria-pressed="previewTheme === 'dark'"
        @click="previewTheme = 'dark'"
      >
        Dark
      </button>
    </div>
    <!-- Изоляция: семантические переменные из tokens.css переключаются через data-theme (как в приложении) -->
    <div class="component-docs-preview__themed" :data-theme="previewTheme">
      <div ref="host" class="component-docs-preview__mount" />
    </div>
  </div>
</template>

<style scoped>
.component-docs-preview {
  margin: 1rem 0 1.5rem;
  padding: 1rem 1.25rem 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.component-docs-preview__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.component-docs-preview__toolbar-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-right: 0.25rem;
}

.component-docs-preview__btn {
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.component-docs-preview__btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}

.component-docs-preview__btn--active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

/* Общая оболочка: фон из семантики UI-kit на этом узле с data-theme */
.component-docs-preview__themed {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 6px;
  padding: 1rem;
  /* Обрезать превью по рамке: fixed Sidebar не перекрывает следующие блоки страницы. */
  overflow: hidden;
  background: var(--bg-white-0);
  /*
    Новый контекст позиционирования: иначе Sidebar (position: fixed) и слои layout
    цепляются к viewport и «уезжают» из рамки превью.
  */
  transform: translateZ(0);
}

/*
  Цвет текста — примитивы с :root, без var(--text-strong-950):
  иначе возможна путаница каскада (:root vs [data-theme]) и наследование от body (--vp-c-text-*),
  из-за чего при одной комбинации VP + превью текст «пропадает» (светлый на светлом / тёмный на тёмном).
*/
.component-docs-preview__themed[data-theme='light'] {
  color-scheme: light;
  color: var(--neutral-950);
}

.component-docs-preview__themed[data-theme='dark'] {
  color-scheme: dark;
  color: var(--neutral-0);
}

.component-docs-preview__mount {
  width: 100%;
  min-width: 0;
  min-height: 1rem;
  box-sizing: border-box;
  color: inherit;
}

/*
  VitePress типографика (.vp-doc и наследование от article) иногда перебивает CSS Modules
  внутри React-mount по порядку/специфичности — визуально «ничего не меняется» после правок в .module.css.
  Якоря data-uikit-ph-* задаются в PageHeaderDemoContent.
*/
.component-docs-preview__mount :deep([data-uikit-ph-demo]) {
  font-size: 14px !important;
  line-height: 20px !important;
}

.component-docs-preview__mount :deep([data-uikit-ph-row]) {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) auto !important;
  grid-template-rows: 40px !important;
  align-items: center !important;
  column-gap: 12px !important;
  min-width: 0 !important;
}

.component-docs-preview__mount :deep([data-uikit-ph-title-block]) {
  display: flex !important;
  align-items: center !important;
  height: 100% !important;
  min-width: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

.component-docs-preview__mount :deep([data-uikit-ph-title]) {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  line-height: 20px !important;
}

.component-docs-preview__mount :deep(header:has([data-uikit-ph-demo])) {
  display: flex !important;
  align-items: center !important;
  box-sizing: border-box !important;
}
</style>
