import type { TagInputSuggestion, TagInputSuggestionsMatch, TagInputTagValue } from './types'
import { tagLabel } from './types'

export const DEFAULT_TAG_INPUT_SPLIT = /[,;\n]+/

export type NormalizedSuggestion = {
  id: string
  label: string
  /** Строковый пункт списка → в value попадает string; объект → `{ id, label }`. */
  source: 'string' | 'object'
}

export function normalizeSuggestion(item: TagInputSuggestion): NormalizedSuggestion {
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
  suggestionsDefined: boolean
  normalized: NormalizedSuggestion[]
  draft: string
  tags: TagInputTagValue[]
  allowDuplicates: boolean
  /** `true` — убрать уже выбранные из выпадающего списка (старое поведение). */
  excludeSelectedFromList: boolean
  suggestionsMatch: TagInputSuggestionsMatch
  suggestionsLimit: number
}): NormalizedSuggestion[] {
  const {
    suggestionsDefined,
    normalized,
    draft,
    tags,
    allowDuplicates,
    excludeSelectedFromList,
    suggestionsMatch,
    suggestionsLimit,
  } = params
  if (!suggestionsDefined || normalized.length === 0) return []
  const q = draft.trim().toLowerCase()
  let pool = excludeSelectedFromList
    ? normalized.filter((row) => allowDuplicates || !tags.some((t) => tagLabel(t) === row.label))
    : [...normalized]
  if (suggestionsMatch === 'contains' && q) {
    pool = pool.filter((row) => row.label.toLowerCase().includes(q))
  } else if (suggestionsMatch === 'startsWith' && q) {
    pool = pool.filter((row) => row.label.toLowerCase().startsWith(q))
  }
  return pool.slice(0, suggestionsLimit)
}

export function computePanelOpen(params: {
  suggestionsDefined: boolean
  focused: boolean
  suppressList: boolean
  disabled: boolean
  filteredLength: number
  suggestionsLoading: boolean
  queryNonEmpty: boolean
}): boolean {
  const {
    suggestionsDefined,
    focused,
    suppressList,
    disabled,
    filteredLength,
    suggestionsLoading,
    queryNonEmpty,
  } = params
  return (
    suggestionsDefined &&
    focused &&
    !suppressList &&
    !disabled &&
    (filteredLength > 0 ||
      suggestionsLoading ||
      (queryNonEmpty && !suggestionsLoading && filteredLength === 0))
  )
}

export function findSuggestionByCommitLabel(
  normalized: NormalizedSuggestion[],
  raw: string
): NormalizedSuggestion | undefined {
  const q = raw.trim().toLowerCase()
  if (!q) return undefined
  return normalized.find((r) => r.label.toLowerCase() === q)
}
