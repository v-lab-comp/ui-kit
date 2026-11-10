import { useState, useCallback, useRef } from 'react'
import type { ToastColor } from '../Toast.types'

/** Длительность анимации выхода (ms) — должна совпадать с transition-duration в skins/corporate/components/toast.css */
export const TOAST_EXIT_DURATION = 220

export type ToastQueueItem<TExtra extends object = Record<string, never>> = {
  id: number
  color: ToastColor
  /** false → data-mounted="false" (начальное скрытое состояние); true → атрибут снят → transition в видимое */
  mounted: boolean
  /** true → transition в скрытое состояние перед удалением из DOM */
  exiting: boolean
} & TExtra

export interface ToastQueueOptions {
  maxToasts?: number
  defaultDuration?: number
}

type TimerEntry = {
  timer: ReturnType<typeof setTimeout>
  startedAt: number
  remaining: number
}

/**
 * Управляет очередью тостов с CSS-transition анимациями (enter + exit).
 *
 * @param options.maxToasts — максимум видимых тостов; при превышении самый старый вытесняется
 * @param options.defaultDuration — длительность по умолчанию (ms), если при add не задана; 0 = не закрывать
 *
 * @example
 * const { toasts, add, dismiss, pauseAll, resumeAll } = useToastQueue({ maxToasts: 5, defaultDuration: 5000 })
 * add('error', { title: 'Ошибка' })
 */
export function useToastQueue<TExtra extends object = Record<string, never>>(
  options: ToastQueueOptions = {}
) {
  const { maxToasts = Infinity, defaultDuration = 0 } = options
  type Item = ToastQueueItem<TExtra>

  const [toasts, setToasts] = useState<Item[]>([])
  const nextId = useRef(0)
  const timers = useRef<Map<number, TimerEntry>>(new Map())

  const dismiss = useCallback((id: number, skipAnimation = false) => {
    const entry = timers.current.get(id)
    if (entry) {
      clearTimeout(entry.timer)
      timers.current.delete(id)
    }
    if (skipAnimation) {
      setToasts((prev) => prev.filter((t) => t.id !== id))
      return
    }
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)))
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, TOAST_EXIT_DURATION)
  }, [])

  const add = useCallback(
    (color: ToastColor, extra: TExtra = {} as TExtra, durationMs?: number) => {
      const id = nextId.current++
      const duration = durationMs ?? defaultDuration

      setToasts((prev) => {
        const next = [...prev, { id, color, mounted: false, exiting: false, ...extra } as Item]
        if (next.filter((t) => !t.exiting).length > maxToasts) {
          const oldest = next.find((t) => !t.exiting)
          if (oldest) {
            setTimeout(() => dismiss(oldest.id, true), 0)
          }
        }
        return next
      })

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, mounted: true } : t)))
        })
      })

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration)
        timers.current.set(id, { timer, startedAt: Date.now(), remaining: duration })
      }

      return id
    },
    [dismiss, maxToasts, defaultDuration]
  )

  const pauseAll = useCallback(() => {
    timers.current.forEach((entry, id) => {
      clearTimeout(entry.timer)
      const elapsed = Date.now() - entry.startedAt
      timers.current.set(id, { ...entry, remaining: Math.max(0, entry.remaining - elapsed) })
    })
  }, [])

  const resumeAll = useCallback(() => {
    timers.current.forEach((entry, id) => {
      if (entry.remaining <= 0) {
        dismiss(id)
        return
      }
      const timer = setTimeout(() => dismiss(id), entry.remaining)
      timers.current.set(id, { timer, startedAt: Date.now(), remaining: entry.remaining })
    })
  }, [dismiss])

  return { toasts, add, dismiss, pauseAll, resumeAll }
}
