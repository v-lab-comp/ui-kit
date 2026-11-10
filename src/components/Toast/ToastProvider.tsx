import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  type FocusEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { ToastSlot } from './ui/ToastSlot'
import { useToastQueue } from './hooks/useToastQueue'
import { ToastContext } from './ToastContext'
import type { ToastAddOptions } from './ToastContext'
import type { ToastConfig, ToastColor } from './Toast.types'
import { contractAttrs } from '@/theme/contract'
import { toastProviderContract } from '@/theme/contracts/toast-provider'
import { useToastSlotHeights } from './hooks/useToastSlotHeights'
import { useSwipeDismiss } from './hooks/useSwipeDismiss'
import { useMediaQuery } from './hooks/useMediaQuery'
import { computeToastLayout } from './toastLayout'
import { DURATION, EASE } from './toastConstants'

interface ToastProviderProps extends ToastConfig {
  children: ReactNode
}

function ToastProvider({
  children,
  position = 'top-right',
  duration = 5000,
  offset = 24,
  gap = 12,
  maxToasts = 5,
  pauseOnHover = true,
  stacking = true,
}: ToastProviderProps) {
  const {
    toasts,
    add: queueAdd,
    dismiss,
    pauseAll,
    resumeAll,
  } = useToastQueue<ToastAddOptions>({
    maxToasts,
    defaultDuration: duration,
  })

  const canHover = useMediaQuery('(hover: hover)', true)
  const stackEnabled = stacking && canHover
  const [hovered, setHovered] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  // Раскрытие стопки — по наведению и по фокусу; пауза — по наведению (pauseOnHover)
  // и всегда по фокусу внутри (WCAG 2.2.1: клавиатурный пользователь не теряет тост)
  const expanded = hovered || focusWithin
  const paused = (pauseOnHover && hovered) || focusWithin

  const slotElsRef = useRef<Map<number, HTMLDivElement>>(new Map())
  const swipeElsRef = useRef<Map<number, HTMLDivElement>>(new Map())

  const heights = useToastSlotHeights(slotElsRef, toasts)
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeDismiss(swipeElsRef, dismiss)

  const registerSlot = useCallback((id: number, el: HTMLDivElement | null) => {
    if (el) slotElsRef.current.set(id, el)
    else slotElsRef.current.delete(id)
  }, [])

  const registerSwipe = useCallback((id: number, el: HTMLDivElement | null) => {
    if (el) swipeElsRef.current.set(id, el)
    else swipeElsRef.current.delete(id)
  }, [])

  const add = useCallback(
    (color: ToastColor, options: ToastAddOptions) => queueAdd(color, options, options.duration),
    [queueAdd]
  )

  const contextValue = useMemo(() => ({ add, dismiss }), [add, dismiss])

  const isBottom = position.startsWith('bottom')
  const displayToasts = useMemo(() => [...toasts].reverse(), [toasts])
  const layout = useMemo(
    () => computeToastLayout(displayToasts, heights, { stackEnabled, expanded, gap, isBottom }),
    [displayToasts, heights, stackEnabled, expanded, gap, isBottom]
  )

  useEffect(() => {
    if (!paused) return
    pauseAll()
    return resumeAll
  }, [paused, pauseAll, resumeAll])

  // Закрытие тоста с фокусом: focusout при удалении узла приходит не всегда — снимаем флаг сами
  const handleDismiss = useCallback(
    (id: number) => {
      const el = slotElsRef.current.get(id)
      if (el?.contains(el.ownerDocument.activeElement)) setFocusWithin(false)
      dismiss(id)
    },
    [dismiss]
  )

  const handleBlur = useCallback((e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false)
  }, [])

  const container = (
    <div
      className={toastProviderContract.className}
      {...contractAttrs(toastProviderContract, { position })}
      style={
        {
          '--toast-offset': `${offset}px`,
          height: layout.containerHeight != null ? `${layout.containerHeight}px` : undefined,
          transition: `height ${DURATION} ${EASE}`,
        } as React.CSSProperties
      }
      // Озвучивает каждый тост сам (role status / alert) — без вложенной live-области, без дублей
      role="region"
      aria-label="Notifications"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={handleBlur}
    >
      {displayToasts.map((t) => (
        <ToastSlot
          key={t.id}
          toast={t}
          position={position}
          slotStyle={layout.slots[t.id]?.style ?? {}}
          inactive={layout.slots[t.id]?.inactive ?? false}
          onRegisterSlot={registerSlot}
          onRegisterSwipe={registerSwipe}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined' ? createPortal(container, document.body) : null}
    </ToastContext.Provider>
  )
}

export { ToastProvider }
