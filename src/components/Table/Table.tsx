import { forwardRef, useMemo } from 'react'
import type { KeyboardEvent, ReactElement, Ref } from 'react'
import { formatSize } from '@/utils/formatSize'
import { contractPart } from '@/theme/contract'
import { tableContract } from '@/theme/contracts/table'
import type { TableProps, TableColumn } from './Table.types'
import { useColumnOrder } from './hooks/useColumnOrder'
import { usePagination } from './hooks/usePagination'
import { useTableSort } from './hooks/useTableSort'
import { TableHeaderCell } from './TableHeaderCell'
import { TablePagination } from './TablePagination'
import { getStickyInfo } from './utils'

const DEFAULT_PAGE_SIZE_OPTIONS = [20, 50, 100, 200]

function renderCell<T extends object>(col: TableColumn<T>, row: T) {
  return col.render
    ? col.render(row)
    : String((row as Record<string, unknown>)[col.key as string] ?? '')
}

function TableInner<T extends object>(
  {
    columns,
    data,
    totalItems,
    pageSize,
    defaultPageSize = 20,
    page,
    defaultPage = 1,
    onPageChange,
    maxHeight,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    onPageSizeChange,
    onRowClick,
    getRowKey,
    hideHeader = false,
    paginationPosition = 'top',
    activeRowIndex,
    sort: sortProp,
    defaultSort,
    onSortChange,
    reorder,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  }: TableProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const { sort, toggleSort } = useTableSort(sortProp, defaultSort, onSortChange)
  const { orderedColumns, dragOverKey, getHeaderProps } = useColumnOrder(
    columns,
    reorder?.storageKey,
    Boolean(reorder)
  )
  const stickyInfo = useMemo(() => getStickyInfo(orderedColumns), [orderedColumns])
  const pagination = usePagination({
    totalItems,
    page,
    defaultPage,
    onPageChange,
    pageSize,
    defaultPageSize,
    onPageSizeChange,
  })

  const scrollable = maxHeight !== undefined

  const paginationBlock = pagination.enabled ? (
    <TablePagination
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      pageSize={pagination.pageSize}
      pageSizeOptions={pageSizeOptions}
      onPageChange={pagination.goToPage}
      onPageSizeChange={pagination.changePageSize}
    />
  ) : null

  // Enter/Space на самой строке (не на вложенных кнопках/ссылках) — как клик
  const handleRowKeyDown = (row: T) => (e: KeyboardEvent<HTMLTableRowElement>) => {
    if (e.target !== e.currentTarget || (e.key !== 'Enter' && e.key !== ' ')) return
    e.preventDefault()
    onRowClick?.(row)
  }

  return (
    <div ref={ref} className={tableContract.className}>
      {paginationPosition === 'top' && paginationBlock}

      <div
        className={contractPart(tableContract, 'root')}
        data-scroll={scrollable || undefined}
        style={scrollable ? { maxHeight: formatSize(maxHeight) } : undefined}
        // Прокручиваемая область должна быть доступна с клавиатуры (WCAG 2.1.1)
        role={scrollable ? 'region' : undefined}
        tabIndex={scrollable ? 0 : undefined}
        aria-label={scrollable ? ariaLabel : undefined}
        aria-labelledby={scrollable ? ariaLabelledBy : undefined}
      >
        <table
          className={contractPart(tableContract, 'table')}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        >
          <colgroup>
            {orderedColumns.map((col) => (
              <col
                key={String(col.key)}
                style={{
                  width: col.width ? formatSize(col.width) : undefined,
                  minWidth: col.minWidth ? formatSize(col.minWidth) : undefined,
                  maxWidth: col.maxWidth ? formatSize(col.maxWidth) : undefined,
                }}
              />
            ))}
          </colgroup>
          {!hideHeader && (
            <thead>
              <tr>
                {orderedColumns.map((col) => {
                  const key = String(col.key)
                  return (
                    <TableHeaderCell
                      key={key}
                      column={col}
                      sort={sort}
                      sticky={stickyInfo.get(key)}
                      dragOver={dragOverKey === key}
                      reorderProps={getHeaderProps(key)}
                      onSort={toggleSort}
                    />
                  )
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {data.map((row, i) => (
              <tr
                key={getRowKey ? getRowKey(row, i) : i}
                className={contractPart(tableContract, 'tr')}
                data-clickable={onRowClick ? true : undefined}
                data-active={activeRowIndex === i ? true : undefined}
                aria-current={activeRowIndex === i ? true : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                onKeyDown={onRowClick ? handleRowKeyDown(row) : undefined}
              >
                {orderedColumns.map((col) => {
                  const st = stickyInfo.get(String(col.key))
                  return (
                    <td
                      key={String(col.key)}
                      className={contractPart(tableContract, 'td')}
                      data-strong={col.strong || undefined}
                      data-sticky-left={st ? true : undefined}
                      data-sticky-left-last={st?.last || undefined}
                      style={{ textAlign: col.align ?? 'left', left: st?.left }}
                    >
                      {renderCell(col, row)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginationPosition === 'bottom' && paginationBlock}
    </div>
  )
}

const TableWithRef = forwardRef(TableInner)
TableWithRef.displayName = 'Table'

/** Таблица с сортировкой, пагинацией, sticky- и переупорядочиваемыми колонками. ref — на корневой div. */
export const Table = TableWithRef as <T extends object>(
  props: TableProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement | null
