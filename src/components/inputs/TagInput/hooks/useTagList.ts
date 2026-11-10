import { useState } from 'react'
import type { TagInputTagValue } from '../types'
import { appendTags, type TagListRules } from '../model'

export type UseTagListParams = TagListRules & {
  value: TagInputTagValue[] | undefined
  defaultValue: TagInputTagValue[] | undefined
  onChange: ((tags: TagInputTagValue[]) => void) | undefined
  disabled: boolean
}

export type TagList = {
  tags: TagInputTagValue[]
  /** Добавить теги по правилам поля; `false` — хотя бы один отклонён `validateTag` или `maxTags`. */
  addTags: (items: readonly TagInputTagValue[]) => boolean
  removeAt: (index: number) => void
  removeWhere: (predicate: (tag: TagInputTagValue) => boolean) => void
}

/** Список тегов: controlled / uncontrolled значение и его изменения. */
export function useTagList({
  value,
  defaultValue,
  onChange,
  disabled,
  maxTags,
  allowDuplicates,
  validateTag,
}: UseTagListParams): TagList {
  const [internalTags, setInternalTags] = useState<TagInputTagValue[]>(() => defaultValue ?? [])
  const isControlled = value !== undefined
  const tags = value ?? internalTags

  const commit = (next: TagInputTagValue[]) => {
    if (!isControlled) setInternalTags(next)
    onChange?.(next)
  }

  return {
    tags,
    addTags: (items) => {
      if (disabled) return false
      const { next, rejected } = appendTags(tags, items, { maxTags, allowDuplicates, validateTag })
      if (next !== tags) commit(next)
      return rejected === 0
    },
    removeAt: (index) => {
      if (disabled || index < 0 || index >= tags.length) return
      commit(tags.filter((_, i) => i !== index))
    },
    removeWhere: (predicate) => {
      if (disabled) return
      const next = tags.filter((t) => !predicate(t))
      if (next.length !== tags.length) commit(next)
    },
  }
}
