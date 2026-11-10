import { useCallback, useRef } from 'react'
import type { RefObject } from 'react'
import { TOAST_EXIT_DURATION } from './useToastQueue'
import { DURATION, EASE, SWIPE_THRESHOLD } from '../toastConstants'

type TouchState = { startX: number; startY: number; currentX: number; swiping: boolean }

const TRANSITION = `transform ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`

export function useSwipeDismiss(
  swipeElsRef: RefObject<Map<number, HTMLDivElement>>,
  dismiss: (id: number) => void
) {
  const touchDataRef = useRef<Map<number, TouchState>>(new Map())

  const onTouchStart = useCallback((id: number, e: React.TouchEvent) => {
    touchDataRef.current.set(id, {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      currentX: 0,
      swiping: false,
    })
  }, [])

  const onTouchMove = useCallback(
    (id: number, e: React.TouchEvent) => {
      const td = touchDataRef.current.get(id)
      if (!td) return

      const dx = e.touches[0].clientX - td.startX
      const dy = e.touches[0].clientY - td.startY

      if (!td.swiping) {
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) td.swiping = true
        else if (Math.abs(dy) > 10) {
          touchDataRef.current.delete(id)
          return
        } else return
      }

      td.currentX = dx
      const el = swipeElsRef.current?.get(id)
      if (el) {
        el.style.transform = `translateX(${dx}px)`
        el.style.opacity = `${Math.max(1 - Math.abs(dx) / 250, 0.2)}`
        el.style.transition = 'none'
      }
    },
    [swipeElsRef]
  )

  const onTouchEnd = useCallback(
    (id: number) => {
      const td = touchDataRef.current.get(id)
      if (!td) return

      const el = swipeElsRef.current?.get(id)
      if (el) {
        el.style.transition = TRANSITION
        if (td.swiping && Math.abs(td.currentX) > SWIPE_THRESHOLD) {
          const dir = td.currentX > 0 ? 1 : -1
          el.style.transform = `translateX(${dir * 500}px)`
          el.style.opacity = '0'
          setTimeout(() => dismiss(id), TOAST_EXIT_DURATION)
        } else {
          el.style.transform = ''
          el.style.opacity = ''
        }
      }

      touchDataRef.current.delete(id)
    },
    [dismiss, swipeElsRef]
  )

  return { onTouchStart, onTouchMove, onTouchEnd }
}
