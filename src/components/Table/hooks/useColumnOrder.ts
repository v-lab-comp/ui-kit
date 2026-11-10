import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { DragEvent, KeyboardEvent } from 'react'
import type { TableColumn } from '../Table.types'
import { moveItem } from '../utils'

function readOrder(storageKey: string | undefined): string[] {
  if (!storageKey || typeof window === 'undefined') return []
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return []
    const parsed: unknown = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed.filter((k): k is string => typeof k === 'string') : []
  } catch {
    return []
  }
}

function writeOrder(storageKey: string | undefined, order: string[]) {
  if (!storageKey || typeof window === 'undefined') return
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(order))
  } catch {
    /* хранилище недоступно (приватный режим, квота) — порядок живёт только в state */
  }
}

/** Колонки в сохранённом порядке; новые колонки (нет в сохранённом порядке) — в конце. */
function applyOrder<T extends object>(columns: TableColumn<T>[], order: string[]) {
  if (order.length === 0) return columns
  const byKey = new Map(columns.map((c) => [String(c.key), c]))
  const used = new Set<string>()
  const result: TableColumn<T>[] = []
  for (const k of order) {
    const c = byKey.get(k)
    if (c && !used.has(k)) {
      result.push(c)
      used.add(k)
    }
  }
  for (const c of columns) {
    if (!used.has(String(c.key))) result.push(c)
  }
  return result
}

/** Пропсы заголовка колонки для перетаскивания и переноса с клавиатуры. */
export interface ColumnOrderHeaderProps {
  ref: (el: HTMLTableCellElement | null) => void
  draggable: boolean
  onDragStart: (e: DragEvent<HTMLTableCellElement>) => void
  onDragOver: (e: DragEvent<HTMLTableCellElement>) => void
  onDragLeave: () => void
  onDrop: (e: DragEvent<HTMLTableCellElement>) => void
  onDragEnd: () => void
  onKeyDown: (e: KeyboardEvent<HTMLTableCellElement>) => void
}

/**
 * Порядок колонок с сохранением в localStorage: drag-and-drop за заголовок и
 * клавиатурная альтернатива — Alt+Shift+←/→ на заголовке (или его кнопке сортировки)
 * сдвигает колонку на одну позицию; фокус остаётся на перенесённом заголовке.
 */
export function useColumnOrder<T extends object>(
  columns: TableColumn<T>[],
  storageKey: string | undefined,
  enabled: boolean
) {
  const [order, setOrder] = useState<string[]>(() => (enabled ? readOrder(storageKey) : []))
  const [dragOverKey, setDragOverKey] = useState<string | null>(null)
  const dragKeyRef = useRef<string | null>(null)
  const headersRef = useRef(new Map<string, HTMLTableCellElement>())
  const focusKeyRef = useRef<string | null>(null)

  const orderedColumns = useMemo(
    () => (enabled ? applyOrder(columns, order) : columns),
    [columns, order, enabled]
  )

  // После переноса с клавиатуры возвращаем фокус: перестановка DOM-узлов может его сбросить
  useLayoutEffect(() => {
    const key = focusKeyRef.current
    if (key === null) return
    focusKeyRef.current = null
    const th = headersRef.current.get(key)
    if (!th || th.contains(document.activeElement)) return
    const target = th.tabIndex >= 0 ? th : th.querySelector<HTMLElement>('button')
    target?.focus()
  }, [orderedColumns])

  const commit = useCallback(
    (from: string, to: string) => {
      const next = moveItem(
        orderedColumns.map((c) => String(c.key)),
        from,
        to
      )
      if (!next) return false
      setOrder(next)
      writeOrder(storageKey, next)
      return true
    },
    [orderedColumns, storageKey]
  )

  const resetDrag = () => {
    dragKeyRef.current = null
    setDragOverKey(null)
  }

  const getHeaderProps = (key: string): ColumnOrderHeaderProps | null => {
    if (!enabled) return null
    return {
      ref: (el) => {
        if (el) headersRef.current.set(key, el)
        else headersRef.current.delete(key)
      },
      draggable: true,
      onDragStart: (e) => {
        dragKeyRef.current = key
        e.dataTransfer.effectAllowed = 'move'
        try {
          e.dataTransfer.setData('text/plain', key)
        } catch {
          /* часть браузеров запрещает setData — перенос работает и без него */
        }
      },
      onDragOver: (e) => {
        if (dragKeyRef.current === null || dragKeyRef.current === key) return
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setDragOverKey(key)
      },
      onDragLeave: () => setDragOverKey((cur) => (cur === key ? null : cur)),
      onDrop: (e) => {
        e.preventDefault()
        const from = dragKeyRef.current
        resetDrag()
        if (from) commit(from, key)
      },
      onDragEnd: resetDrag,
      onKeyDown: (e) => {
        if (!e.altKey || !e.shiftKey || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
        const keys = orderedColumns.map((c) => String(c.key))
        const neighbour = keys[keys.indexOf(key) + (e.key === 'ArrowLeft' ? -1 : 1)]
        if (neighbour === undefined) return
        e.preventDefault()
        focusKeyRef.current = key
        if (!commit(key, neighbour)) focusKeyRef.current = null
      },
    }
  }

  return { orderedColumns, dragOverKey, getHeaderProps }
}
