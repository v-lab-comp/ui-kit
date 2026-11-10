import type { CSSProperties } from 'react'
import { formatSize } from '@/utils/formatSize'
import {
  SLOT_TRANSITION,
  STACK_MAX_VISIBLE,
  STACK_OPACITY_STEP,
  STACK_PEEK,
  STACK_SCALE_STEP,
} from './toastConstants'

export type ToastLayoutItem = {
  id: number
  mounted: boolean
  exiting: boolean
}

export type ToastLayoutOptions = {
  /** Стопка разрешена (stacking + устройство с hover) */
  stackEnabled: boolean
  /** Стопка раскрыта (наведение или фокус внутри) */
  expanded: boolean
  gap: number
  isBottom: boolean
}

export type ToastSlotLayout = {
  style: CSSProperties
  /**
   * Тост спрятан в стопке или уходит: скрыт от скринридеров и фокуса (inert).
   * Входящий тост (ещё не mounted) не помечается — его должна озвучить live-область.
   */
  inactive: boolean
}

export type ToastLayout = {
  slots: Record<number, ToastSlotLayout>
  /** Высота контейнера, px; undefined — нет видимых тостов */
  containerHeight: number | undefined
}

function anchorStyle(isBottom: boolean, value: number): CSSProperties {
  const v = formatSize(value)
  return isBottom ? { bottom: v } : { top: v }
}

function baseSlotStyle(isBottom: boolean, zIndex: number, pointerEvents?: 'none'): CSSProperties {
  const style: CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    ...anchorStyle(isBottom, 0),
    zIndex,
  }
  if (pointerEvents !== undefined) style.pointerEvents = pointerEvents
  return style
}

const heightOf = (heights: Record<number, number>, id: number | undefined) =>
  (id !== undefined && heights[id]) || 0

/** Высота контейнера: стопка — передний тост + «выглядывающие»; список — сумма с зазорами. */
function computeContainerHeight(
  visible: ToastLayoutItem[],
  heights: Record<number, number>,
  shouldStack: boolean,
  gap: number
): number | undefined {
  if (visible.length === 0) return undefined
  if (shouldStack) {
    const peekCount = Math.min(visible.length, STACK_MAX_VISIBLE) - 1
    return heightOf(heights, visible[0]?.id) + Math.max(0, peekCount) * STACK_PEEK
  }
  return visible.reduce((sum, t, i) => sum + heightOf(heights, t.id) + (i > 0 ? gap : 0), 0)
}

/**
 * Раскладка тостов (чистая функция): стиль слота для каждого id и высота контейнера.
 * `displayToasts` — от новых к старым (передний — первый).
 */
export function computeToastLayout(
  displayToasts: ToastLayoutItem[],
  heights: Record<number, number>,
  { stackEnabled, expanded, gap, isBottom }: ToastLayoutOptions
): ToastLayout {
  const visible = displayToasts.filter((t) => t.mounted)
  const total = visible.length
  const shouldStack = stackEnabled && !expanded && total > 1
  const slots: Record<number, ToastSlotLayout> = {}

  let offset = 0
  const offsets = new Map<number, number>()
  visible.forEach((t) => {
    offsets.set(t.id, offset)
    offset += heightOf(heights, t.id) + gap
  })

  displayToasts.forEach((t) => {
    const vi = visible.findIndex((v) => v.id === t.id)

    if ((!t.mounted && !t.exiting) || vi < 0) {
      slots[t.id] = {
        style: baseSlotStyle(isBottom, vi < 0 ? 0 : total + 1, 'none'),
        inactive: t.exiting,
      }
      return
    }

    const y = shouldStack ? vi * STACK_PEEK : (offsets.get(t.id) ?? 0)
    const scale = shouldStack && vi > 0 ? Math.max(1 - vi * STACK_SCALE_STEP, 0.85) : 1
    const hidden = shouldStack && vi >= STACK_MAX_VISIBLE
    const opacity = hidden ? 0 : shouldStack && vi > 0 ? 1 - vi * STACK_OPACITY_STEP : 1
    const interactive = !t.exiting && (vi === 0 || expanded)

    slots[t.id] = {
      style: {
        ...baseSlotStyle(isBottom, total - vi, interactive ? undefined : 'none'),
        ...anchorStyle(isBottom, y),
        zIndex: total - vi,
        transform: `scale(${scale})`,
        transformOrigin: isBottom ? 'bottom center' : 'top center',
        opacity,
        transition: SLOT_TRANSITION,
      },
      inactive: t.exiting || (shouldStack && vi > 0),
    }
  })

  return { slots, containerHeight: computeContainerHeight(visible, heights, shouldStack, gap) }
}
