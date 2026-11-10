import { describe, expect, it } from 'vitest'
import { computeToastLayout, type ToastLayoutItem } from './toastLayout'
import { STACK_PEEK } from './toastConstants'

const item = (id: number, extra: Partial<ToastLayoutItem> = {}): ToastLayoutItem => ({
  id,
  mounted: true,
  exiting: false,
  ...extra,
})
const heights = { 1: 50, 2: 60, 3: 70 }
const base = { stackEnabled: true, expanded: false, gap: 10, isBottom: false }

describe('computeToastLayout', () => {
  it('в стопке: передний активен, остальные inactive, высота — передний + выглядывающие', () => {
    const { slots, containerHeight } = computeToastLayout(
      [item(3), item(2), item(1)],
      heights,
      base
    )
    expect(slots[3]).toMatchObject({ inactive: false, style: { top: '0px', opacity: 1 } })
    expect(slots[2].inactive).toBe(true)
    expect(slots[2].style.top).toBe(`${STACK_PEEK}px`)
    expect(slots[2].style.pointerEvents).toBe('none')
    expect(containerHeight).toBe(70 + 2 * STACK_PEEK)
  })

  it('раскрытая стопка — список с зазорами, все активны', () => {
    const { slots, containerHeight } = computeToastLayout([item(3), item(2), item(1)], heights, {
      ...base,
      expanded: true,
    })
    expect(slots[2]).toMatchObject({ inactive: false, style: { top: '80px' } })
    expect(slots[1].style.top).toBe('150px')
    expect(containerHeight).toBe(70 + 60 + 50 + 2 * 10)
  })

  it('снизу якорит bottom; входящий тост не inactive, уходящий — inactive', () => {
    const { slots } = computeToastLayout(
      [item(3, { mounted: false }), item(2, { exiting: true }), item(1)],
      heights,
      { ...base, isBottom: true }
    )
    expect(slots[3]).toMatchObject({
      inactive: false,
      style: { bottom: '0px', pointerEvents: 'none' },
    })
    expect(slots[2].inactive).toBe(true)
    expect(slots[1].style.bottom).toBeDefined()
  })

  it('пустой список — высота не задаётся', () => {
    expect(computeToastLayout([], {}, base).containerHeight).toBeUndefined()
  })
})
