import { useState, useRef, useLayoutEffect, useCallback, useMemo, useId } from 'react'
import clsx from 'clsx'
import { SegmentedControlContext } from './SegmentedControlContext'
import { SegmentedControlItem } from './SegmentedControlItem'
import { contractAttrs, contractPart } from '@/theme/contract'
import { segmentedControlContract } from '@/theme/contracts/segmented-control'
import type { SegmentedControlProps } from './SegmentedControl.types'

const ITEM_SELECTOR = '[data-seg-item]'

export const SegmentedControl = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  size = 'medium',
  disabled,
  className,
  children,
  ...props
}: SegmentedControlProps) => {
  const rootId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  // True after the first measurement — enables CSS transition on subsequent moves.
  const mountedRef = useRef(false)

  // ---- Selection state ----
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const isControlled = valueProp !== undefined
  const selectedValue = isControlled ? valueProp : uncontrolled

  const select = useCallback(
    (value: string) => {
      if (!isControlled) setUncontrolled(value)
      onValueChange?.(value)
    },
    [isControlled, onValueChange]
  )

  // ---- Thumb position (direct DOM update — no setState, no cascading render) ----
  const moveThumb = useCallback(() => {
    const container = containerRef.current
    const thumb = thumbRef.current
    if (!container || !thumb) return

    const items = Array.from(container.querySelectorAll<HTMLElement>(ITEM_SELECTOR))
    const selected = items.find((el) => el.dataset.segValue === selectedValue)

    if (!selected) {
      thumb.style.opacity = '0'
      return
    }

    // First mount: disable transition so the thumb appears instantly.
    if (!mountedRef.current) {
      thumb.style.transition = 'none'
      mountedRef.current = true
    } else {
      thumb.style.transition = ''
    }

    thumb.style.left = `${selected.offsetLeft}px`
    thumb.style.width = `${selected.offsetWidth}px`
    thumb.style.opacity = '1'
  }, [selectedValue])

  useLayoutEffect(() => {
    moveThumb()
  }, [moveThumb])

  // Items call this on mount so the thumb positions correctly once they're in the DOM.
  const notifyMount = useCallback(() => {
    moveThumb()
  }, [moveThumb])

  const ctx = useMemo(
    () => ({ selectedValue, select, size, disabled, notifyMount }),
    [selectedValue, select, size, disabled, notifyMount]
  )

  return (
    <SegmentedControlContext.Provider value={ctx}>
      <div
        ref={containerRef}
        role="group"
        aria-label={props['aria-label']}
        data-seg-root={rootId}
        className={clsx(segmentedControlContract.className, className)}
        {...contractAttrs(segmentedControlContract, { size, disabled })}
        {...props}
      >
        {/* Thumb is always in the DOM; opacity=0 when nothing is selected */}
        <span
          ref={thumbRef}
          aria-hidden
          className={contractPart(segmentedControlContract, 'thumb')}
          style={{ opacity: 0 }}
        />
        {children}
      </div>
    </SegmentedControlContext.Provider>
  )
}

SegmentedControl.displayName = 'SegmentedControl'
SegmentedControl.Item = SegmentedControlItem
