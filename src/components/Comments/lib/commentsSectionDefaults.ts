import type { CommentsSectionStringKey } from '../CommentsSection/commentsSection.types'

/** Все ключи строк секции комментариев (для фильтрации JSON с сервера). */
export const COMMENTS_SECTION_STRING_KEYS = [
  'today',
  'yesterday',
  'emptyList',
  'loadErrorPrefix',
  'retry',
  'inputPlaceholder',
  'editAction',
  'deleteAction',
  'editedMark',
  'editSaveLabel',
  'editCancelLabel',
  'deletedPlaceholder',
  'deletedMark',
  'confirmDeleteTitle',
  'confirmDeleteBody',
  'confirmDeleteConfirm',
  'confirmDeleteCancel',
  'commentActionsAriaLabel',
  'showMore',
  'showLess',
] as const satisfies readonly CommentsSectionStringKey[]

/**
 * Встроенные строки (английский). Любой ключ можно переопределить через проп `strings` или JSON.
 */
export const DEFAULT_COMMENTS_SECTION_STRINGS: Record<CommentsSectionStringKey, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  emptyList: 'No comments yet.',
  loadErrorPrefix: 'Could not load comments.',
  retry: 'Retry',
  inputPlaceholder: 'Write a comment…',
  editAction: 'Edit',
  deleteAction: 'Delete',
  editedMark: 'edited',
  editSaveLabel: 'Save',
  editCancelLabel: 'Cancel',
  deletedPlaceholder: 'Comment deleted',
  deletedMark: 'deleted',
  confirmDeleteTitle: 'Delete comment?',
  confirmDeleteBody: 'This action cannot be undone.',
  confirmDeleteConfirm: 'Delete',
  confirmDeleteCancel: 'Cancel',
  commentActionsAriaLabel: 'Comment actions',
  showMore: 'Show more',
  showLess: 'Show less',
}

/**
 * Слияние: сначала дефолты кита, затем переданные строки (частичный объект с клиента / из JSON).
 */
export function mergeCommentsSectionStrings(
  partial?: Partial<Record<CommentsSectionStringKey, string>>
): Record<CommentsSectionStringKey, string> {
  return { ...DEFAULT_COMMENTS_SECTION_STRINGS, ...partial }
}

/**
 * Разбор «лобового» JSON: остаются только известные ключи со значениями типа string, затем merge с дефолтами.
 * Удобно, если объект приходит с API и может содержать лишние поля.
 */
export function mergeCommentsSectionStringsFromJson(
  json: unknown
): Record<CommentsSectionStringKey, string> {
  if (json == null || typeof json !== 'object' || Array.isArray(json)) {
    return { ...DEFAULT_COMMENTS_SECTION_STRINGS }
  }
  const raw = json as Record<string, unknown>
  const partial: Partial<Record<CommentsSectionStringKey, string>> = {}
  for (const key of COMMENTS_SECTION_STRING_KEYS) {
    const v = raw[key]
    if (typeof v === 'string') partial[key] = v
  }
  return mergeCommentsSectionStrings(partial)
}
