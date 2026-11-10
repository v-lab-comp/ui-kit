import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { existsSync, readdirSync, renameSync } from 'fs'
import { resolve } from 'path'

/** Storybook подмешивает этот конфиг; dts/api-extractor ждёт уже собранный dist/index.d.ts — в Docker собираем только сторибук без lib build. */
const storybookNoDts = process.env.STORYBOOK_DISABLE_DTS === '1'

const mainEntries = {
  index: resolve(__dirname, 'src/index.ts'),
  icons: resolve(__dirname, 'src/icons.ts'),
  flags: resolve(__dirname, 'src/flags.ts'),
  phone: resolve(__dirname, 'src/phone.ts'),
  date: resolve(__dirname, 'src/date.ts'),
  pdf: resolve(__dirname, 'src/pdf.ts'),
  markdown: resolve(__dirname, 'src/markdown.ts'),
  adapters: resolve(__dirname, 'src/adapters/index.ts'),
}

/** Каждая папка `src/skins/<name>/` с `index.ts` — отдельный скин: `dist/skins/<name>.{js,css,d.ts}`. */
const skinNames = readdirSync(resolve(__dirname, 'src/skins'), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(resolve(__dirname, 'src/skins', d.name, 'index.ts')))
  .map((d) => d.name)

for (const name of skinNames) {
  // Свёрнутые типы скина временно ложатся в dist/<name>.d.ts (см. afterBuild) — имя не должно
  // совпадать с основной точкой входа, иначе файлы типов перезапишут друг друга.
  if (name in mainEntries) throw new Error(`Скин «${name}» совпадает с точкой входа dist/${name}`)
}

const skinEntries = Object.fromEntries(
  skinNames.map((name) => [`skins/${name}`, resolve(__dirname, 'src/skins', name, 'index.ts')])
)

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    ...(storybookNoDts
      ? []
      : [
          dts({
            include: ['src'],
            rollupTypes: true,
            // Для вложенной точки входа `skins/<name>` rollupTypes кладёт свёрнутые типы в корень
            // (dist/<name>.d.ts), а в dist/skins/<name>.d.ts оставляет обёртку на несуществующий
            // ./<name>/index — у потребителя `corporateSkin` «не экспортируется». Переносим на место.
            afterBuild: () => {
              for (const name of skinNames) {
                const rolled = resolve(__dirname, 'dist', `${name}.d.ts`)
                if (existsSync(rolled)) {
                  renameSync(rolled, resolve(__dirname, 'dist/skins', `${name}.d.ts`))
                }
              }
            },
          }),
        ]),
  ],
  build: {
    // public/ (sample.pdf, robots.txt) нужен только Storybook — он раздаёт его сам через staticDirs.
    copyPublicDir: false,
    minify: true,
    cssMinify: true,
    // CSS — отдельным файлом на каждый скин (а не один общий): приложение подключает только свой скин.
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      // Только ESM. Без явного formats Vite в lib-режиме собирает ['es', 'cjs'] и применяет
      // rollupOptions.output к обоим — CJS перезаписал бы ESM в dist/.
      formats: ['es'],
      entry: {
        ...mainEntries,
        ...skinEntries,
      },
    },
    rollupOptions: {
      external: [
        /^react/,
        'react-hook-form',
        '@remixicon/react',
        'clsx',
        /^imask/,
        /^react-imask/,
        /^libphonenumber-js/,
        /^react-phone-number-input/,
        /^@floating-ui/,
        /^react-pdf/,
        /^pdfjs-dist/,
        /^marked/,
        /^turndown/,
      ],
      // CJS-сборки нет (пакет "type": "module"; Node 20.19+/22.12+ умеет require(esm)).
      output: {
        format: 'es',
        dir: 'dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        // CSS скина: skins/<name>/index.css → skins/<name>.css (рядом с манифестом skins/<name>.js).
        assetFileNames: (asset) => {
          const skin = asset.name?.match(/^skins\/([^/]+)\/index\.css$/)
          return skin ? `skins/${skin[1]}.css` : '[name][extname]'
        },
      },
    },
  },
})
