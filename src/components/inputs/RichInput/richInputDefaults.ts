import type { RichInputAriaLabels, RichInputTool } from './RichInput.types'

/** Набор кнопок тулбара по умолчанию. */
export const DEFAULT_RICH_INPUT_TOOLS = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'bulletList',
  'orderedList',
] as const satisfies readonly RichInputTool[]

/**
 * Англоязычные `aria-label` кнопок тулбара.
 *
 * @example Переопределить часть подписей
 * ```tsx
 * ariaLabels={{ ...DEFAULT_RICH_INPUT_ARIA_EN, bold: 'Жирный' }}
 * ```
 */
export const DEFAULT_RICH_INPUT_ARIA_EN = {
  toolbar: 'Text formatting',
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikethrough: 'Strikethrough',
  bulletList: 'Bulleted list',
  orderedList: 'Numbered list',
  clear: 'Clear formatting',
} as const satisfies Required<RichInputAriaLabels>
