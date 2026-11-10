import { useState, useMemo, useCallback, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { formatSize } from '@/utils/formatSize'
import { ToastSlot } from './ui/ToastSlot'
import { useToastQueue } from './hooks/useToastQueue'
import { ToastContext } from './ToastContext'
import type { ToastAddOptions } from './ToastContext'
import type { ToastConfig, ToastColor } from './Toast.types'
import { contractAttrs } from '@/theme/contract'
import { toastProviderContract } from '@/theme/contracts/toast-provider'
import { useToastSlotHeights } from './hooks/useToastSlotHeights'
import { useSwipeDismiss } from './hooks/useSwipeDismiss'
import {
  STACK_PEEK,
  STACK_SCALE_STEP,
  STACK_OPACITY_STEP,
  STACK_MAX_VISIBLE,
  DURATION,
  EASE,
  SLOT_TRANSITION,
} from './toastConstants'

function anchorStyle(isBottom: boolean, value: number | string): React.CSSProperties {
  const v = formatSize(value)
  return isBottom ? { bottom: v } : { top: v }
}

function baseSlotStyle(
  isBottom: boolean,
  zIndex: number,
  pointerEvents?: 'none'
): React.CSSProperties {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    ...anchorStyle(isBottom, 0),
    zIndex,
  }
  if (pointerEvents !== undefined) style.pointerEvents = pointerEvents
  return style
}

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

  const [canHover] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia('(hover: hover)').matches
  )
  const stackEnabled = stacking && canHover
  const [expanded, setExpanded] = useState(false)

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
  const visibleToasts = useMemo(() => displayToasts.filter((t) => t.mounted), [displayToasts])
  const shouldStack = stackEnabled && !expanded && visibleToasts.length > 1

  const getSlotStyle = useCallback(
    (toastId: number, exiting: boolean, mounted: boolean): React.CSSProperties => {
      const vi = visibleToasts.findIndex((t) => t.id === toastId)
      const total = visibleToasts.length

      if ((!mounted && !exiting) || vi < 0) {
        return baseSlotStyle(isBottom, vi < 0 ? 0 : total + 1, 'none')
      }

      const y = shouldStack
        ? vi * STACK_PEEK
        : visibleToasts.slice(0, vi).reduce((sum, t) => sum + (heights[t.id] || 0) + gap, 0)

      const scale = shouldStack && vi > 0 ? Math.max(1 - vi * STACK_SCALE_STEP, 0.85) : 1
      const hidden = shouldStack && vi >= STACK_MAX_VISIBLE
      const opacity = hidden ? 0 : shouldStack && vi > 0 ? 1 - vi * STACK_OPACITY_STEP : 1
      const interactive = !exiting && (vi === 0 || expanded)

      return {
        ...baseSlotStyle(isBottom, total - vi, interactive ? undefined : 'none'),
        ...anchorStyle(isBottom, y),
        zIndex: total - vi,
        transform: `scale(${scale})`,
        transformOrigin: isBottom ? 'bottom center' : 'top center',
        opacity,
        transition: SLOT_TRANSITION,
      }
    },
    [visibleToasts, shouldStack, isBottom, heights, gap, expanded]
  )

  const containerHeight = useMemo(() => {
    if (visibleToasts.length === 0) return undefined
    if (shouldStack) {
      const frontH = heights[visibleToasts[0]?.id] || 0
      const peekCount = Math.min(visibleToasts.length, STACK_MAX_VISIBLE) - 1
      return frontH + Math.max(0, peekCount) * STACK_PEEK
    }
    return visibleToasts.reduce((sum, t, i) => sum + (heights[t.id] || 0) + (i > 0 ? gap : 0), 0)
  }, [shouldStack, visibleToasts, heights, gap])

  const handleMouseEnter = useCallback(() => {
    setExpanded(true)
    if (pauseOnHover) pauseAll()
  }, [pauseOnHover, pauseAll])

  const handleMouseLeave = useCallback(() => {
    setExpanded(false)
    if (pauseOnHover) resumeAll()
  }, [pauseOnHover, resumeAll])

  const container = (
    <div
      className={toastProviderContract.className}
      {...contractAttrs(toastProviderContract, { position })}
      style={
        {
          '--toast-offset': `${offset}px`,
          height: containerHeight != null ? `${containerHeight}px` : undefined,
          transition: `height ${DURATION} ${EASE}`,
        } as React.CSSProperties
      }
      role="region"
      aria-live="polite"
      aria-label="Notifications"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayToasts.map((t) => (
        <ToastSlot
          key={t.id}
          toast={t}
          position={position}
          slotStyle={getSlotStyle(t.id, t.exiting, t.mounted)}
          onRegisterSlot={registerSlot}
          onRegisterSwipe={registerSwipe}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onDismiss={dismiss}
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
