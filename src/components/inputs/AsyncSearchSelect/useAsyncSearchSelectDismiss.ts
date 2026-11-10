import { type RefObject, useEffect } from 'react'

/** Закрытие выпадашки по клику вне триггера и плавающей панели. */
export function useAsyncSearchSelectDismiss(
  open: boolean,
  close: () => void,
  triggerRef: RefObject<HTMLElement | null>,
  floatingRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node
      if (!triggerRef.current?.contains(t) && !floatingRef.current?.contains(t)) close()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, close, triggerRef, floatingRef])
}
