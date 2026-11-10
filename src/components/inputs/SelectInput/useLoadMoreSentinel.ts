import { useEffect, useState, type RefObject } from 'react'

/**
 * Ленивая подгрузка: `onLoadMore`, когда «сторож» в конце списка виден в контейнере прокрутки.
 * Возвращает callback-ref для сторожа. `loadedCount` — сколько пунктов уже отрисовано: при его
 * смене наблюдатель пересоздаётся, поэтому если сторож всё ещё виден (список короче контейнера),
 * следующая страница подгрузится сразу.
 */
export function useLoadMoreSentinel({
  enabled,
  rootRef,
  onLoadMore,
  loadedCount,
  rootMargin = '100px',
}: {
  enabled: boolean
  /** Контейнер прокрутки списка */
  rootRef: RefObject<HTMLElement | null>
  onLoadMore: () => void
  loadedCount: number
  rootMargin?: string
}): (node: HTMLElement | null) => void {
  const [sentinel, setSentinel] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!enabled || !sentinel || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) onLoadMore()
      },
      { root: rootRef.current, rootMargin, threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [enabled, sentinel, rootRef, onLoadMore, loadedCount, rootMargin])

  return setSentinel
}
