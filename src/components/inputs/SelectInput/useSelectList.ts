import { useCallback, useMemo, useState } from 'react'
import { buildSelectList, limitSelectRows } from './selectOptions'
import type { SelectListRow } from './selectOptions'
import type { SelectOption, SelectOptionGroup } from './SelectInput.types'

export type SelectListState = {
  query: string
  /** Новая строка поиска; ленивая отрисовка начинается заново */
  setQuery: (query: string) => void
  /** Отфильтрованные опции по порядку навигации */
  items: SelectOption[]
  /** Строки для отрисовки — только первые `visibleCount` опций */
  rows: SelectListRow[]
  /** Отрисованы не все опции */
  hasMore: boolean
  /** Отрисовать следующую страницу */
  showMore: () => void
  /** Отрисовать страницы до опции `index` включительно (клавиатура ушла дальше отрисованного) */
  reveal: (index: number) => void
  /** Сброс поиска и ленивой отрисовки (открытие / закрытие списка) */
  reset: () => void
}

/** Клиентский список: фильтр по поиску, группы и ленивая отрисовка страницами по `pageSize` */
export function useSelectList({
  options,
  groups,
  pageSize,
}: {
  options: readonly SelectOption[] | undefined
  groups: readonly SelectOptionGroup[] | undefined
  pageSize: number
}): SelectListState {
  const [query, setQueryState] = useState('')
  const [visibleCount, setVisibleCount] = useState(pageSize)

  const list = useMemo(() => buildSelectList(options, groups, query), [options, groups, query])
  const rows = useMemo(() => limitSelectRows(list.rows, visibleCount), [list.rows, visibleCount])

  const setQuery = useCallback(
    (next: string) => {
      setQueryState(next)
      setVisibleCount(pageSize)
    },
    [pageSize]
  )

  const showMore = useCallback(() => setVisibleCount((count) => count + pageSize), [pageSize])

  const reveal = useCallback(
    (index: number) =>
      setVisibleCount((count) =>
        index < count ? count : (Math.floor(index / pageSize) + 1) * pageSize
      ),
    [pageSize]
  )

  const reset = useCallback(() => {
    setQueryState('')
    setVisibleCount(pageSize)
  }, [pageSize])

  return {
    query,
    setQuery,
    items: list.items,
    rows,
    hasMore: list.items.length > visibleCount,
    showMore,
    reveal,
    reset,
  }
}
