import { useCallback, useSyncExternalStore } from 'react'

const canMatchMedia = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function'

/**
 * Подписка на media query: одна подписка на `change`, значение обновляется при смене
 * условия. На сервере (и без `matchMedia`) возвращает `serverValue`.
 */
export function useMediaQuery(query: string, serverValue: boolean): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!canMatchMedia()) return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener?.('change', onChange)
      return () => mql.removeEventListener?.('change', onChange)
    },
    [query]
  )
  const getSnapshot = () => (canMatchMedia() ? window.matchMedia(query).matches : serverValue)
  const getServerSnapshot = () => serverValue
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
