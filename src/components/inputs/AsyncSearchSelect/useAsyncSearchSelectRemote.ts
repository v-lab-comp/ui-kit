/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { SelectOption } from '../SelectInput'
import type { AsyncSearchSelectProps } from './AsyncSearchSelect.types'
import { normalizeAsyncSearchLoadResult } from './normalizeLoadResult'

/** Сколько пикселей до низа списка запускает дозагрузку следующей страницы */
const LOAD_MORE_THRESHOLD_PX = 56

export type AsyncSearchSelectRemoteOptions = {
  loadOptions: AsyncSearchSelectProps['loadOptions']
  debounceMs: number
  onSearchQueryChange?: AsyncSearchSelectProps['onSearchQueryChange']
  /** Поле отключено: запросы не идут, текущий отменяется */
  disabled: boolean
  /**
   * Первая страница сменилась: `null` — грузится новая (прежние опции убраны),
   * массив — пришёл ответ. По нему поле выставляет активный пункт.
   */
  onFirstPage?: (options: SelectOption[] | null) => void
}

/**
 * Опции AsyncSearchSelect с сервера: строка поиска с debounce, первая страница при открытии
 * и при новом запросе, дозагрузка при прокрутке к низу, отмена запросов через `AbortSignal`.
 * Открытием управляет поле (`useSelectInteractions`) — через `setActive(open)`.
 */
export function useAsyncSearchSelectRemote({
  loadOptions,
  debounceMs,
  onSearchQueryChange,
  disabled,
  onFirstPage,
}: AsyncSearchSelectRemoteOptions) {
  const listScrollRef = useRef<HTMLDivElement>(null)
  const fetchGenRef = useRef(0)
  const loadedPageRef = useRef(-1)
  const loadMoreAbortRef = useRef<AbortController | null>(null)
  const loadMoreInFlightRef = useRef(false)
  const onFirstPageRef = useRef(onFirstPage)

  useLayoutEffect(() => {
    onFirstPageRef.current = onFirstPage
  })

  const [active, setActiveState] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  // Поле отключили на открытом списке: useSelectInteractions закрывает его без onOpenChange.
  // Иначе после включения первая страница загрузилась бы при закрытом списке.
  if (disabled && active) setActiveState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setQuery(filterText), debounceMs)
    return () => window.clearTimeout(t)
  }, [filterText, debounceMs])

  useEffect(() => {
    onSearchQueryChange?.(query)
  }, [query, onSearchQueryChange])

  /**
   * Открытие / закрытие списка: пустой поиск, нет опций, дозагрузка отменена.
   * При открытии сразу «загрузка» — первая страница запросится в эффекте.
   */
  const setActive = useCallback((nextActive: boolean) => {
    loadMoreAbortRef.current?.abort()
    loadMoreAbortRef.current = null
    loadMoreInFlightRef.current = false
    loadedPageRef.current = -1
    setActiveState(nextActive)
    setFilterText('')
    setQuery('')
    setOptions([])
    setLoading(nextActive)
    setLoadingMore(false)
    setLoadError(false)
    setHasMore(false)
  }, [])

  /** Первая страница: открытие или новый debounced `query`. */
  useEffect(() => {
    if (!active || disabled) return
    loadMoreAbortRef.current?.abort()
    loadMoreAbortRef.current = null
    loadMoreInFlightRef.current = false

    const gen = ++fetchGenRef.current
    const ctrl = new AbortController()
    /** Запрос отменён (закрытие, отключение, новый запрос) — его ответ не применяем */
    let cancelled = false
    const isStale = () => cancelled || gen !== fetchGenRef.current
    setLoading(true)
    setLoadingMore(false)
    setLoadError(false)
    setOptions([])
    setHasMore(false)
    loadedPageRef.current = -1
    onFirstPageRef.current?.(null)

    requestAnimationFrame(() => {
      if (listScrollRef.current) listScrollRef.current.scrollTop = 0
    })

    loadOptions({ query, signal: ctrl.signal, page: 0 })
      .then((raw) => {
        if (isStale()) return
        const { options: rows, hasMore: more } = normalizeAsyncSearchLoadResult(raw)
        loadedPageRef.current = 0
        setOptions(rows)
        setHasMore(more)
        setLoading(false)
        onFirstPageRef.current?.(rows)
      })
      .catch(() => {
        if (isStale()) return
        setLoadError(true)
        setLoading(false)
        setHasMore(false)
      })

    return () => {
      cancelled = true
      ctrl.abort()
    }
  }, [active, disabled, query, loadOptions])

  const handleListScroll = useCallback(() => {
    const el = listScrollRef.current
    if (!el || !active || loading || loadError || !hasMore || loadMoreInFlightRef.current) return
    if (el.scrollHeight - el.scrollTop - el.clientHeight > LOAD_MORE_THRESHOLD_PX) return

    loadMoreInFlightRef.current = true
    setLoadingMore(true)
    const startGen = fetchGenRef.current
    const nextPage = loadedPageRef.current + 1
    const ctrl = new AbortController()
    loadMoreAbortRef.current = ctrl
    const querySnapshot = query

    loadOptions({ query: querySnapshot, signal: ctrl.signal, page: nextPage })
      .then((raw) => {
        loadMoreInFlightRef.current = false
        loadMoreAbortRef.current = null
        if (startGen !== fetchGenRef.current) return
        const { options: rows, hasMore: more } = normalizeAsyncSearchLoadResult(raw)
        setLoadingMore(false)
        if (rows.length === 0 && nextPage > 0) {
          setHasMore(false)
          return
        }
        loadedPageRef.current = nextPage
        setOptions((prev) => {
          const seen = new Set(prev.map((o) => o.value))
          const appended = rows.filter((o) => !seen.has(o.value))
          return appended.length ? [...prev, ...appended] : [...prev]
        })
        setHasMore(more)
      })
      .catch(() => {
        loadMoreInFlightRef.current = false
        loadMoreAbortRef.current = null
        if (startGen !== fetchGenRef.current) return
        setLoadingMore(false)
        setHasMore(false)
      })
  }, [active, loading, loadError, hasMore, query, loadOptions])

  return {
    listScrollRef,
    setActive,
    filterText,
    setFilterText,
    options,
    loading,
    loadingMore,
    loadError,
    handleListScroll,
  }
}
