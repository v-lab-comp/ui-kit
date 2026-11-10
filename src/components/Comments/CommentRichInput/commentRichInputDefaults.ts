import type { CommentRichInputAriaLabels } from './CommentRichInput.types'

/**
 * Англоязычные `aria-label` для тулбара rich input.
 *
 * @example Переопределить часть подписей
 * ```tsx
 * ariaLabels={{
 *   ...DEFAULT_COMMENT_RICH_INPUT_ARIA_EN,
 *   send: 'Отправить',
 * }}
 * ```
 */
export const DEFAULT_COMMENT_RICH_INPUT_ARIA_EN = {
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikethrough: 'Strikethrough',
  align: 'Align text',
  send: 'Send comment',
} as const satisfies CommentRichInputAriaLabels
