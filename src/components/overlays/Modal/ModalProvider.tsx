import { useCallback, useMemo, useRef, useState } from 'react'
import { setBodyScrollLocked } from '@/utils/scrollLock'
import { ModalStackContext } from './useModalStack'
import type { ModalProviderProps } from './ModalProvider.types'

/**
 * ModalProvider manages a stack of open modals for proper z-index and body scroll lock management.
 *
 * - Auto-generates z-index for each modal (baseZIndex + count * 100)
 * - Coordinates body scroll lock: only locked when first modal opens, unlocked when last closes
 * - Prevents focus trap conflicts between nested modals
 *
 * Usage:
 * ```tsx
 * <ModalProvider baseZIndex={1000}>
 *   <App />
 * </ModalProvider>
 * ```
 *
 * Without ModalProvider, modals work in standalone mode (existing behavior).
 */
export function ModalProvider({ children, baseZIndex = 1000 }: ModalProviderProps) {
  const stackRef = useRef<string[]>([])
  const [stackIds, setStackIds] = useState<string[]>([])

  const register = useCallback(
    (id: string) => {
      stackRef.current.push(id)
      const next = [...stackRef.current]
      setStackIds(next)

      if (next.length === 1) {
        setBodyScrollLocked(true)
      }

      return baseZIndex + next.length * 100
    },
    [baseZIndex]
  )

  const unregister = useCallback((id: string) => {
    stackRef.current = stackRef.current.filter((modalId) => modalId !== id)
    const next = [...stackRef.current]
    setStackIds(next)

    if (next.length === 0) {
      setBodyScrollLocked(false)
    }
  }, [])

  const contextValue = useMemo(
    () => ({ register, unregister, count: stackIds.length, stackIds }),
    [register, unregister, stackIds]
  )

  return <ModalStackContext.Provider value={contextValue}>{children}</ModalStackContext.Provider>
}

ModalProvider.displayName = 'ModalProvider'
