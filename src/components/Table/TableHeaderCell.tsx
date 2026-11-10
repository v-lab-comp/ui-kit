import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react'
import { contractPart } from '@/theme/contract'
import { tableContract } from '@/theme/contracts/table'
import type { SortState, TableColumn } from './Table.types'
import type { ColumnOrderHeaderProps } from './hooks/useColumnOrder'
import type { StickyInfo } from './utils'
import { getSortField } from './utils'

export interface TableHeaderCellProps<T extends object> {
  column: TableColumn<T>
  sort: SortState[]
  sticky: StickyInfo | undefined
  dragOver: boolean
  /** Пропсы переупорядочивания; `null` — переупорядочивание выключено */
  reorderProps: ColumnOrderHeaderProps | null
  onSort: (field: string, replace: boolean) => void
}

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const

/** Заголовок колонки: кнопка сортировки и (опционально) перетаскивание. */
export function TableHeaderCell<T extends object>({
  column,
  sort,
  sticky,
  dragOver,
  reorderProps,
  onSort,
}: TableHeaderCellProps<T>) {
  const field = getSortField(column)
  const active = column.sortable ? sort.find((s) => s.field === field) : undefined
  const align = column.align ?? 'left'

  return (
    <th
      className={contractPart(tableContract, 'th')}
      data-sortable={column.sortable || undefined}
      data-reorderable={reorderProps ? true : undefined}
      data-drag-over={dragOver || undefined}
      data-sticky-left={sticky ? true : undefined}
      data-sticky-left-last={sticky?.last || undefined}
      style={{ textAlign: align, left: sticky?.left }}
      aria-sort={active ? ARIA_SORT[active.direction] : undefined}
      // Без кнопки сортировки сам заголовок принимает фокус для переноса с клавиатуры
      tabIndex={reorderProps && !column.sortable ? 0 : undefined}
      {...reorderProps}
    >
      {column.sortable ? (
        <button
          type="button"
          className={contractPart(tableContract, 'sort-btn')}
          data-align={align}
          onClick={(e) => onSort(field, e.shiftKey)}
        >
          <span className={contractPart(tableContract, 'sort-label')}>{column.label}</span>
          <span className={contractPart(tableContract, 'sort-icons')} aria-hidden>
            <RiArrowUpSLine
              size={12}
              className={contractPart(tableContract, 'sort-icon')}
              data-active={active?.direction === 'asc' || undefined}
            />
            <RiArrowDownSLine
              size={12}
              className={contractPart(tableContract, 'sort-icon')}
              data-active={active?.direction === 'desc' || undefined}
            />
          </span>
        </button>
      ) : (
        column.label
      )}
    </th>
  )
}
