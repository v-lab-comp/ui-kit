import { type RefObject, useEffect, useRef } from 'react'

/**
 * Вызов callback при клике вне элемента.
 * Как useClickOutside из reactuse, упрощённо: только ref + callback.
 */
export function useClickOutside<T extends Element>(
  ref: RefObject<T | null>,
  onClickOutside: (event: MouseEvent) => void,
  enabled = true
): void {
  const callbackRef = useRef(onClickOutside)

  useEffect(() => {
    if (!enabled) return
    callbackRef.current = onClickOutside

    const handler = (event: MouseEvent) => {
      const el = ref.current
      if (!el || el.contains(event.target as Node)) return
      callbackRef.current(event)
    }

    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
    // ref is stable; callback stored in ref to avoid re-subscribing
  }, [enabled]) // eslint-disable-line react-hooks/exhaustive-deps
}
