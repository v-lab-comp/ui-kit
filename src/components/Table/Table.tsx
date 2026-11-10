import { useState, useEffect, useRef, useMemo } from 'react'
import {
  RiSkipBackLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSkipForwardLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from '@remixicon/react'
import { formatSize } from '@/utils/formatSize'
import { contractPart } from '@/theme/contract'
import { tableContract } from '@/theme/contracts/table'
import type { TableProps, SortState, TableColumn } from './Table.types'

function getSortField<T extends object>(col: TableColumn<T>): string {
  return col.sortField ?? String(col.key)
}

function nextSort(current: SortState[], field: string, replace: boolean): SortState[] {
  if (replace) return [{ field, direction: 'asc' }]

  const idx = current.findIndex((s) => s.field === field)
  if (idx === -1) return [...current, { field, direction: 'asc' }]

  const next = [...current]
  if (next[idx].direction === 'asc') {
    next[idx] = { field, direction: 'desc' }
    return next
  }
  next.splice(idx, 1)
  return next
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = []
  const add = (p: number) => {
    if (!pages.includes(p)) pages.push(p)
  }
  add(1)
  if (current > 3) pages.push('...')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) add(i)
  if (current < total - 2) pages.push('...')
  add(total)
  return pages
}

export function Table<T extends object>({
  columns,
  data,
  totalItems,
  pageSize = 20,
  page: pageProp,
  onPageChange,
  maxHeight,
  pageSizeOptions = [20, 50, 100, 200],
  onPageSizeChange,
  onRowClick,
  hideHeader = false,
  paginationPosition = 'top',
  activeRowIndex,
  sort: sortProp,
  defaultSort,
  onSortChange,
  reorder,
}: TableProps<T>) {
  const [internalPage, setInternalPage] = useState(1)
  const [internalPageSize, setInternalPageSize] = useState(pageSize)
  const [internalSort, setInternalSort] = useState<SortState[]>(defaultSort ?? [])
  const sort = sortProp ?? internalSort

  const reorderEnabled = !!reorder
  const storageKey = reorder?.storageKey
  const [order, setOrder] = useState<string[]>(() => {
    if (!reorderEnabled || !storageKey || typeof window === 'undefined') return []
    try {
      const saved = window.localStorage.getItem(storageKey)
      if (!saved) return []
      const parsed = JSON.parse(saved)
      return Array.isArray(parsed) ? parsed.filter((k): k is string => typeof k === 'string') : []
    } catch {
      return []
    }
  })

  const orderedColumns = useMemo(() => {
    if (!reorderEnabled || order.length === 0) return columns
    const byKey = new Map(columns.map((c) => [String(c.key), c]))
    const used = new Set<string>()
    const result: TableColumn<T>[] = []
    for (const k of order) {
      const c = byKey.get(k)
      if (c) {
        result.push(c)
        used.add(k)
      }
    }
    for (const c of columns) {
      if (!used.has(String(c.key))) result.push(c)
    }
    return result
  }, [columns, order, reorderEnabled])

  // Left-офсеты sticky-колонок: накопленная ширина предыдущих sticky-колонок.
  // last === true у крайней sticky-колонки — на ней рисуется тень-разделитель.
  const stickyInfo = useMemo(() => {
    const map = new Map<string, { left: number; last: boolean }>()
    let offset = 0
    let lastKey: string | null = null
    for (const col of orderedColumns) {
      if (col.sticky !== 'left') continue
      const key = String(col.key)
      map.set(key, { left: offset, last: false })
      offset += parseFloat(String(col.width)) || 0
      lastKey = key
    }
    if (lastKey) map.get(lastKey)!.last = true
    return map
  }, [orderedColumns])

  const dragKeyRef = useRef<string | null>(null)
  const [dragOverKey, setDragOverKey] = useState<string | null>(null)

  const handleDragStart = (key: string) => (e: React.DragEvent<HTMLTableCellElement>) => {
    if (!reorderEnabled) return
    dragKeyRef.current = key
    e.dataTransfer.effectAllowed = 'move'
    try {
      e.dataTransfer.setData('text/plain', key)
    } catch {
      /* ignore */
    }
  }

  const handleDragOver = (key: string) => (e: React.DragEvent<HTMLTableCellElement>) => {
    if (!reorderEnabled || dragKeyRef.current === null || dragKeyRef.current === key) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dragOverKey !== key) setDragOverKey(key)
  }

  const handleDragLeave = (key: string) => () => {
    if (dragOverKey === key) setDragOverKey(null)
  }

  const handleDrop = (key: string) => (e: React.DragEvent<HTMLTableCellElement>) => {
    if (!reorderEnabled) return
    e.preventDefault()
    const from = dragKeyRef.current
    dragKeyRef.current = null
    setDragOverKey(null)
    if (!from || from === key) return
    const current = orderedColumns.map((c) => String(c.key))
    const fromIdx = current.indexOf(from)
    const toIdx = current.indexOf(key)
    if (fromIdx < 0 || toIdx < 0) return
    const next = [...current]
    next.splice(fromIdx, 1)
    next.splice(toIdx, 0, from)
    setOrder(next)
    if (storageKey && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        /* ignore */
      }
    }
  }

  const handleDragEnd = () => {
    dragKeyRef.current = null
    setDragOverKey(null)
  }

  const handleSortClick = (field: string, replace: boolean) => {
    const next = nextSort(sort, field, replace)
    if (sortProp === undefined) setInternalSort(next)
    onSortChange?.(next)
  }

  const hasPagination = totalItems !== undefined
  const currentPage = pageProp ?? internalPage
  const currentPageSize = internalPageSize
  const totalPages = hasPagination ? Math.max(1, Math.ceil(totalItems / currentPageSize)) : 1

  const didNotifyInitialPage = useRef(false)
  useEffect(() => {
    if (hasPagination && onPageChange && pageProp === undefined && !didNotifyInitialPage.current) {
      didNotifyInitialPage.current = true
      onPageChange(1)
    }
  }, [hasPagination, onPageChange, pageProp])

  const handlePage = (p: number) => {
    if (p < 1 || p > totalPages) return
    if (onPageChange) onPageChange(p)
    else setInternalPage(p)
  }

  const handlePageSize = (size: number) => {
    setInternalPageSize(size)
    onPageSizeChange?.(size)
    handlePage(1)
  }

  const paginationBlock = hasPagination ? (
    <div className={contractPart(tableContract, 'pagination')}>
      <div className={contractPart(tableContract, 'pagination-left')}>
        <span className={contractPart(tableContract, 'pagination-info')}>
          Страница {currentPage} из {totalPages}
        </span>
      </div>
      <div className={contractPart(tableContract, 'pagination-center')}>
        <div className={contractPart(tableContract, 'btn-group')}>
          <button
            type="button"
            className={contractPart(tableContract, 'page-btn')}
            disabled={currentPage === 1}
            onClick={() => handlePage(1)}
            aria-label="Первая страница"
          >
            <RiSkipBackLine size={16} aria-hidden />
          </button>
          <button
            type="button"
            className={contractPart(tableContract, 'page-btn')}
            disabled={currentPage === 1}
            onClick={() => handlePage(currentPage - 1)}
            aria-label="Предыдущая страница"
          >
            <RiArrowLeftSLine size={16} aria-hidden />
          </button>
          {getPageNumbers(currentPage, totalPages).map((p, i) =>
            p === '...' ? (
              <span key={`e-${i}`} className={contractPart(tableContract, 'ellipsis')}>
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                className={contractPart(tableContract, 'page-btn')}
                data-active={p === currentPage || undefined}
                onClick={() => handlePage(p)}
              >
                {p}
              </button>
            )
          )}
          <button
            type="button"
            className={contractPart(tableContract, 'page-btn')}
            disabled={currentPage === totalPages}
            onClick={() => handlePage(currentPage + 1)}
            aria-label="Следующая страница"
          >
            <RiArrowRightSLine size={16} aria-hidden />
          </button>
          <button
            type="button"
            className={contractPart(tableContract, 'page-btn')}
            disabled={currentPage === totalPages}
            onClick={() => handlePage(totalPages)}
            aria-label="Последняя страница"
          >
            <RiSkipForwardLine size={16} aria-hidden />
          </button>
        </div>
      </div>
      <div className={contractPart(tableContract, 'pagination-right')}>
        <div className={contractPart(tableContract, 'compact-select')}>
          {currentPageSize} / страница
          <RiArrowDownSLine size={16} aria-hidden />
          <select
            aria-label="Строк на странице"
            className={contractPart(tableContract, 'select-overlay')}
            value={currentPageSize}
            onChange={(e) => handlePageSize(Number(e.target.value))}
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>
                {s} / страница
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  ) : null

  return (
    <div className={tableContract.className}>
      {paginationPosition === 'top' && paginationBlock}

      <div
        className={contractPart(tableContract, 'root')}
        data-scroll={maxHeight !== undefined || undefined}
        style={maxHeight !== undefined ? { maxHeight: formatSize(maxHeight) } : undefined}
      >
        <table className={contractPart(tableContract, 'table')}>
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
                  const field = getSortField(col)
                  const active = col.sortable ? (sort.find((s) => s.field === field) ?? null) : null
                  const align = col.align ?? 'left'
                  const key = String(col.key)
                  const st = stickyInfo.get(key)
                  return (
                    <th
                      key={key}
                      className={contractPart(tableContract, 'th')}
                      data-sortable={col.sortable || undefined}
                      data-reorderable={reorderEnabled || undefined}
                      data-drag-over={dragOverKey === key || undefined}
                      data-sticky-left={st ? true : undefined}
                      data-sticky-left-last={st?.last || undefined}
                      style={{ textAlign: align, left: st ? st.left : undefined }}
                      aria-sort={
                        active
                          ? active.direction === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : undefined
                      }
                      draggable={reorderEnabled}
                      onDragStart={handleDragStart(key)}
                      onDragOver={handleDragOver(key)}
                      onDragLeave={handleDragLeave(key)}
                      onDrop={handleDrop(key)}
                      onDragEnd={handleDragEnd}
                    >
                      {col.sortable ? (
                        <button
                          type="button"
                          className={contractPart(tableContract, 'sort-btn')}
                          data-align={align}
                          onClick={(e) => handleSortClick(field, e.shiftKey)}
                        >
                          <span className={contractPart(tableContract, 'sort-label')}>
                            {col.label}
                          </span>
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
                        col.label
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className={contractPart(tableContract, 'tr')}
                data-clickable={onRowClick ? true : undefined}
                data-active={activeRowIndex === i ? true : undefined}
                onClick={() => onRowClick?.(row)}
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
                      style={{ textAlign: col.align ?? 'left', left: st ? st.left : undefined }}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key as string] ?? '')}
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

Table.displayName = 'Table'
