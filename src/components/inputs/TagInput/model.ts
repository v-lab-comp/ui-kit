import type { TagInputSuggestion, TagInputSuggestionsMatch, TagInputTagValue } from './types'
import { tagLabel } from './types'

export const DEFAULT_TAG_INPUT_SPLIT = /[,;\n]+/

/** Разделители, при которых вставка из буфера всегда разбивается на теги. */
const PASTE_SEPARATORS = /[,;\n]/

export type NormalizedSuggestion = {
  id: string
  label: string
  /** Строковый пункт списка → в value попадает string; объект → `{ id, label }`. */
  source: 'string' | 'object'
}

function normalizeSuggestion(item: TagInputSuggestion): NormalizedSuggestion {
  return typeof item === 'string'
    ? { id: item, label: item, source: 'string' }
    : { id: item.id, label: item.label, source: 'object' }
}

export function normalizeSuggestionsArray(
  suggestions: readonly TagInputSuggestion[] | undefined
): NormalizedSuggestion[] {
  if (suggestions == null || suggestions.length === 0) return []
  return suggestions.map(normalizeSuggestion)
}

export function tagValueFromSuggestionRow(row: NormalizedSuggestion): TagInputTagValue {
  return row.source === 'object' ? { id: row.id, label: row.label } : row.label
}

export function chipKey(tag: TagInputTagValue, index: number): string {
  return `${typeof tag === 'string' ? tag : tag.id}-${index}`
}

/** Совпадение тега из **`value`** с пунктом подсказки (для галочки и toggle в списке). */
export function tagMatchesSuggestion(tag: TagInputTagValue, row: NormalizedSuggestion): boolean {
  if (row.source === 'object') {
    return typeof tag === 'object' && tag.id === row.id
  }
  return typeof tag === 'string' && tag === row.label
}

export function computeFilteredSuggestions(params: {
  normalized: NormalizedSuggestion[]
  query: string
  tags: readonly TagInputTagValue[]
  allowDuplicates: boolean
  /** `true` — убрать уже выбранные из выпадающего списка (старое поведение). */
  excludeSelectedFromList: boolean
  suggestionsMatch: TagInputSuggestionsMatch
  suggestionsLimit: number
}): NormalizedSuggestion[] {
  const {
    normalized,
    query,
    tags,
    allowDuplicates,
    excludeSelectedFromList,
    suggestionsMatch,
    suggestionsLimit,
  } = params
  if (normalized.length === 0) return []
  const q = query.trim().toLowerCase()
  let pool = excludeSelectedFromList
    ? normalized.filter((row) => allowDuplicates || !tags.some((t) => tagLabel(t) === row.label))
    : normalized
  if (suggestionsMatch === 'contains' && q) {
    pool = pool.filter((row) => row.label.toLowerCase().includes(q))
  } else if (suggestionsMatch === 'startsWith' && q) {
    pool = pool.filter((row) => row.label.toLowerCase().startsWith(q))
  }
  return pool.slice(0, suggestionsLimit)
}

export function findSuggestionByCommitLabel(
  normalized: NormalizedSuggestion[],
  raw: string
): NormalizedSuggestion | undefined {
  const q = raw.trim().toLowerCase()
  if (!q) return undefined
  return normalized.find((r) => r.label.toLowerCase() === q)
}

/** Текст → непустые подписи тегов по разделителям. */
export function splitTagLabels(text: string, pattern: RegExp): string[] {
  return text
    .split(pattern)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Вставку разбиваем на теги, если в ней несколько токенов или есть стандартный разделитель. */
export function isMultiTagPaste(text: string, parts: readonly string[]): boolean {
  return parts.length > 1 || PASTE_SEPARATORS.test(text)
}

export type TagListRules = {
  maxTags: number | undefined
  allowDuplicates: boolean
  validateTag: ((label: string) => boolean) | undefined
}

/**
 * Добавляет теги по правилам поля за один проход (одно `onChange` на действие пользователя).
 * Пустые подписи и дубли пропускаются молча; `rejected` — сколько отклонили `validateTag` или `maxTags`.
 */
export function appendTags(
  base: TagInputTagValue[],
  items: readonly TagInputTagValue[],
  rules: TagListRules
): { next: TagInputTagValue[]; rejected: number } {
  let next = base
  let rejected = 0
  for (const item of items) {
    const label = tagLabel(item).trim()
    if (!label) continue
    if (rules.validateTag && !rules.validateTag(label)) {
      rejected++
      continue
    }
    if (rules.maxTags != null && next.length >= rules.maxTags) {
      rejected++
      continue
    }
    if (!rules.allowDuplicates && next.some((t) => tagLabel(t) === label)) continue
    next = [...next, item]
  }
  return { next, rejected }
}

/** Инлайн-стиль области тегов из пропа `tagsAreaMaxHeight` (по умолчанию лимит задаёт скин). */
export function tagsAreaStyle(
  maxHeight: number | string | undefined
): { maxHeight: string } | undefined {
  if (maxHeight === undefined) return undefined
  return { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }
}
