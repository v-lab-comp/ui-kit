import { useCallback, useMemo, useRef, useState } from 'react'
import { ModalStackContext } from './useModalStack'
import type { ModalProviderProps } from './ModalProvider.types'

/**
 * ModalProvider ведёт стек открытых модалок и Drawer для z-index и порядка закрытия.
 *
 * - z-index каждого оверлея: baseZIndex + позиция в стеке * 100
 * - Escape / клик снаружи обрабатывает только верхний оверлей
 * - Блокировку прокрутки body держит сам оверлей (счётчик ссылок в `lockBodyScroll`)
 *
 * Usage:
 * ```tsx
 * <ModalProvider baseZIndex={1000}>
 *   <App />
 * </ModalProvider>
 * ```
 *
 * Без ModalProvider оверлеи работают по одному (standalone).
 */
export function ModalProvider({ children, baseZIndex = 1000 }: ModalProviderProps) {
  const stackRef = useRef<string[]>([])
  const [stackIds, setStackIds] = useState<string[]>([])

  const register = useCallback(
    (id: string) => {
      if (!stackRef.current.includes(id)) stackRef.current.push(id)
      const next = [...stackRef.current]
      setStackIds(next)
      return baseZIndex + (next.indexOf(id) + 1) * 100
    },
    [baseZIndex]
  )

  const unregister = useCallback((id: string) => {
    stackRef.current = stackRef.current.filter((modalId) => modalId !== id)
    setStackIds([...stackRef.current])
  }, [])

  const contextValue = useMemo(
    () => ({ register, unregister, count: stackIds.length, stackIds, baseZIndex }),
    [register, unregister, stackIds, baseZIndex]
  )

  return <ModalStackContext.Provider value={contextValue}>{children}</ModalStackContext.Provider>
}

ModalProvider.displayName = 'ModalProvider'
