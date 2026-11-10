/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { SelectOption } from '../SelectInput'
import type { AsyncSearchSelectProps } from './AsyncSearchSelect.types'
import { normalizeAsyncSearchLoadResult } from './normalizeLoadResult'

type LoadOptions = AsyncSearchSelectProps['loadOptions']

export function useAsyncSearchSelectRemote(
  loadOptions: LoadOptions,
  debounceMs: number,
  onSearchQueryChange: AsyncSearchSelectProps['onSearchQueryChange'],
  selectedValue: string
) {
  const listScrollRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const fetchGenRef = useRef(0)
  const loadedPageRef = useRef(-1)
  const loadMoreAbortRef = useRef<AbortController | null>(null)
  const loadMoreInFlightRef = useRef(false)

  const [open, setOpen] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [hi, setHi] = useState(-1)

  useEffect(() => {
    const t = window.setTimeout(() => setQuery(filterText), debounceMs)
    return () => window.clearTimeout(t)
  }, [filterText, debounceMs])

  useEffect(() => {
    onSearchQueryChange?.(query)
  }, [query, onSearchQueryChange])

  const close = useCallback(() => {
    loadMoreAbortRef.current?.abort()
    loadMoreAbortRef.current = null
    loadMoreInFlightRef.current = false
    setOpen(false)
    setHi(-1)
    setFilterText('')
    setQuery('')
    setOptions([])
    setLoading(false)
    setLoadingMore(false)
    setLoadError(false)
    setHasMore(false)
    loadedPageRef.current = -1
  }, [])

  const openDropdown = useCallback(() => {
    setFilterText('')
    setQuery('')
    setOptions([])
    setLoadError(false)
    setHi(-1)
    setOpen(true)
  }, [])

  /** Первая страница: открытие или новый debounced `query`. */
  useEffect(() => {
    if (!open) return
    loadMoreAbortRef.current?.abort()
    loadMoreAbortRef.current = null
    loadMoreInFlightRef.current = false

    const gen = ++fetchGenRef.current
    const ctrl = new AbortController()
    setLoading(true)
    setLoadingMore(false)
    setLoadError(false)
    setOptions([])
    setHasMore(false)
    loadedPageRef.current = -1

    requestAnimationFrame(() => {
      if (listScrollRef.current) listScrollRef.current.scrollTop = 0
    })

    loadOptions({ query, signal: ctrl.signal, page: 0 })
      .then((raw) => {
        if (gen !== fetchGenRef.current) return
        const { options: rows, hasMore: more } = normalizeAsyncSearchLoadResult(raw)
        loadedPageRef.current = 0
        setOptions(rows)
        setHasMore(more)
        setLoading(false)
      })
      .catch(() => {
        if (gen !== fetchGenRef.current) return
        setLoadError(true)
        setLoading(false)
        setHasMore(false)
      })

    return () => ctrl.abort()
  }, [open, query, loadOptions])

  const handleListScroll = useCallback(() => {
    const el = listScrollRef.current
    if (!el || !open || loading || loadError || !hasMore || loadMoreInFlightRef.current) return
    const thresholdPx = 56
    if (el.scrollHeight - el.scrollTop - el.clientHeight > thresholdPx) return

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
  }, [open, loading, loadError, hasMore, query, loadOptions])

  useEffect(() => {
    if (!open || options.length === 0) return
    const idx = options.findIndex((o) => o.value === selectedValue)
    setHi(idx >= 0 ? idx : 0)
  }, [open, selectedValue, options])

  return {
    listboxId,
    listScrollRef,
    open,
    openDropdown,
    close,
    filterText,
    setFilterText,
    options,
    loading,
    loadingMore,
    loadError,
    hasMore,
    hi,
    setHi,
    handleListScroll,
  }
}
