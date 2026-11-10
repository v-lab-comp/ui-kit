/**
 * Комментарии: только UI. Данные задаёт приложение; строки — встроенные английские дефолты
 * или переопределение через проп `strings` / `mergeCommentsSectionStringsFromJson`.
 *
 * - `CommentRichInput/` — rich-редактор
 * - `CommentsSection/` — лента + состояния
 * - `lib/` — дефолты строк, merge, `formatCommentDayDivider`
 */
export { CommentRichInput, DEFAULT_COMMENT_RICH_INPUT_ARIA_EN } from './CommentRichInput'
export type { CommentRichInputProps, CommentRichInputAriaLabels } from './CommentRichInput'

export {
  COMMENTS_SECTION_STRING_KEYS,
  DEFAULT_COMMENTS_SECTION_STRINGS,
  mergeCommentsSectionStrings,
  mergeCommentsSectionStringsFromJson,
} from './lib/commentsSectionDefaults'

export { CommentsSection } from './CommentsSection'
export type {
  CommentThreadItem,
  CommentsSectionLabels,
  CommentsSectionMessages,
  CommentsSectionProps,
  CommentsSectionStringKey,
  CommentsSectionStringsOverride,
} from './CommentsSection'

export { formatCommentDayDivider } from './lib/formatCommentDayDivider'
export type {
  FormatCommentDayDividerOptions,
  FormatCommentDayDividerLabels,
} from './lib/formatCommentDayDivider'
