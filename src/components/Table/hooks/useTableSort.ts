import { useControllableState } from '@/utils/useControllableState'
import type { SortState } from '../Table.types'
import { nextSort } from '../utils'

const NO_SORT: SortState[] = []

/** Состояние сортировки (контролируемое через `sort` или внутреннее) и обработчик клика. */
export function useTableSort(
  sort: SortState[] | undefined,
  defaultSort: SortState[] | undefined,
  onSortChange: ((sort: SortState[]) => void) | undefined
) {
  const [current, setSort] = useControllableState({
    value: sort,
    defaultValue: defaultSort ?? NO_SORT,
    onChange: onSortChange,
  })

  const toggleSort = (field: string, replace: boolean) => setSort(nextSort(current, field, replace))

  return { sort: current, toggleSort }
}
