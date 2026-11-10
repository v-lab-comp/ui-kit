import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type HeadConfig } from 'vitepress'
import { docsNav, docsSidebar } from './sidebar.i18n'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

const pkgPath = path.join(repoRoot, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as { name?: string; version: string }
const packageVersion = pkg.version

const sharedHead: HeadConfig[] = [
  ['meta', { name: 'robots', content: 'noindex, nofollow' }],
  // Скин и схема для живых демо — до рендера, как это делает ThemeProvider в приложении
  [
    'script',
    {},
    "document.documentElement.setAttribute('data-vl-skin','corporate');document.documentElement.setAttribute('data-vl-scheme','light')",
  ],
]

/** Статический хостинг в подкаталоге: не-корневой URL `…/<project>/`. Без DOCS_BASE — корень `/`. */
function normalizeDocsBase(raw: string | undefined): string {
  if (!raw?.trim() || raw === '/') return '/'
  const s = raw.trim()
  const withLeading = s.startsWith('/') ? s : `/${s}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

const docsBase = normalizeDocsBase(process.env.DOCS_BASE)

/** Публичный сайт документации (VitePress): локали ru (корень), /en/, /uz/. */
export default defineConfig({
  base: docsBase,

  /** Общие опции (markdown, vite). Язык и мета — в `locales`. */
  head: sharedHead,

  markdown: {
    lineNumbers: true,
  },

  vite: {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.join(repoRoot, 'src'),
        '@v-lab/ui-kit': path.join(repoRoot, 'src/index.ts'),
      },
    },
  },

  locales: {
    root: {
      label: 'Русский',
      lang: 'ru-RU',
      title: 'V-Lab UI Kit',
      description: 'React-компоненты без собственных стилей, скины, дизайн-токены',
      themeConfig: {
        nav: docsNav('ru'),
        sidebar: docsSidebar('ru'),
        outline: [2, 3],
        search: { provider: 'local' },
        siteVersion: packageVersion,
        footer: { message: 'V-Lab UI Kit' },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'V-Lab UI Kit',
      description: 'Unstyled React components, skins, design tokens',
      themeConfig: {
        nav: docsNav('en'),
        sidebar: docsSidebar('en'),
        outline: [2, 3],
        search: { provider: 'local' },
        siteVersion: packageVersion,
        footer: { message: 'V-Lab UI Kit' },
      },
    },
    uz: {
      label: "O'zbek",
      lang: 'uz-UZ',
      link: '/uz/',
      title: 'V-Lab UI Kit',
      description: 'Uslubsiz React komponentlari, skinlar, dizayn tokenlari',
      themeConfig: {
        nav: docsNav('uz'),
        sidebar: docsSidebar('uz'),
        outline: [2, 3],
        search: { provider: 'local' },
        siteVersion: packageVersion,
        footer: { message: 'V-Lab UI Kit' },
      },
    },
  },
})
