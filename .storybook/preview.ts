import type { Preview } from '@storybook/react'
import { createElement } from 'react'
import { ThemeProvider } from '../src/theme'
import { corporateSkin } from '../src/skins/corporate'
// Google Sans для Storybook (потребители подключают шрифт самостоятельно)
import '@fontsource/google-sans/latin-400.css'
import '@fontsource/google-sans/latin-500.css'
import '@fontsource/google-sans/cyrillic-400.css'
import '@fontsource/google-sans/cyrillic-500.css'
// Скин corporate: токены, палитры и стили компонентов (компоненты сами стилей не подключают)
import '../src/skins/corporate/index.css'

/**
 * Storybook 8 + React 18/19 в режиме Docs генерирует ложные предупреждения act:
 * - при IS_REACT_ACT_ENVIRONMENT=true React требует оборачивать все setState в act();
 * - без флага — «testing environment is not configured to support act».
 * Это баг/ограничение addon-docs (ZoomElement, SyntaxHighlighter, async-сторис).
 * Не трогаем globalThis — только глушим известный текст в консоли превью.
 * @see https://github.com/storybookjs/storybook/issues/30356
 */
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

function joinConsoleArgs(args: unknown[]): string {
  return args
    .map((a) => {
      if (typeof a === 'string') return a
      if (a instanceof Error) return a.message
      return ''
    })
    .join(' ')
}

function storybookActNoise(text: string): boolean {
  return (
    /not wrapped in act/i.test(text) ||
    /inside a test was not wrapped in act/i.test(text) ||
    /testing environment is not configured to support act/i.test(text)
  )
}

console.error = (...args: unknown[]) => {
  const text = joinConsoleArgs(args)
  if (storybookActNoise(text)) return
  originalConsoleError.apply(console, args as Parameters<typeof console.error>)
}
console.warn = (...args: unknown[]) => {
  const text = joinConsoleArgs(args)
  if (storybookActNoise(text)) return
  originalConsoleWarn.apply(console, args as Parameters<typeof console.warn>)
}

const SKINS = [corporateSkin] as const

/**
 * «Без скина»: история рендерится без ThemeProvider, на `<html>` нет `data-vl-skin`.
 * CSS скина подключён, но все его правила висят под `[data-vl-skin~='…']` и не срабатывают —
 * видно, что компонент рендерит сам (классы `vl-*`, data-атрибуты), без оформления.
 */
const NO_SKIN = 'none'

const preview: Preview = {
  globalTypes: {
    skin: {
      description: 'Скин',
      toolbar: {
        title: 'Скин',
        icon: 'paintbrush',
        items: [
          ...SKINS.map((s) => ({ value: s.name, title: s.name })),
          { value: NO_SKIN, title: 'Без скина' },
        ],
        dynamicTitle: true,
      },
    },
    colorScheme: {
      description: 'Цветовая схема',
      toolbar: { title: 'Схема', icon: 'mirror', items: ['light', 'dark'], dynamicTitle: true },
    },
  },
  initialGlobals: { skin: 'corporate', colorScheme: 'light' },
  decorators: [
    (Story, context) =>
      context.globals.skin === NO_SKIN
        ? createElement(Story)
        : createElement(
            ThemeProvider,
            { skins: SKINS, skin: context.globals.skin, colorScheme: context.globals.colorScheme },
            createElement(Story)
          ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
