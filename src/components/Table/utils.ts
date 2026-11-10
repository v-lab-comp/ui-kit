import type { SortState, TableColumn } from './Table.types'

/** Поле сортировки колонки: `sortField` или строковый `key`. */
export function getSortField<T extends object>(col: TableColumn<T>): string {
  return col.sortField ?? String(col.key)
}

/**
 * Следующее состояние сортировки по клику на колонку.
 * `replace` (клик без Shift) — сортировка только по этому полю; иначе multi-sort:
 * нет поля → asc, asc → desc, desc → поле убирается.
 */
export function nextSort(current: SortState[], field: string, replace: boolean): SortState[] {
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

/** Номера страниц для пагинации: не больше 7 кнопок, пропуски — `'...'`. */
export function getPageNumbers(current: number, total: number): (number | '...')[] {
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

export interface StickyInfo {
  left: number
  /** Крайняя sticky-колонка — на ней скин рисует тень-разделитель */
  last: boolean
}

/** Left-офсеты sticky-колонок: накопленная ширина предыдущих sticky-колонок. */
export function getStickyInfo<T extends object>(
  columns: TableColumn<T>[]
): Map<string, StickyInfo> {
  const map = new Map<string, StickyInfo>()
  let offset = 0
  let lastKey: string | null = null
  for (const col of columns) {
    if (col.sticky !== 'left') continue
    const key = String(col.key)
    map.set(key, { left: offset, last: false })
    offset += parseFloat(String(col.width)) || 0
    lastKey = key
  }
  if (lastKey) map.get(lastKey)!.last = true
  return map
}

/** Перенос элемента `from` на место `to` (оба — значения из `list`). */
export function moveItem(list: string[], from: string, to: string): string[] | null {
  const fromIdx = list.indexOf(from)
  const toIdx = list.indexOf(to)
  if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return null
  const next = [...list]
  next.splice(fromIdx, 1)
  next.splice(toIdx, 0, from)
  return next
}
