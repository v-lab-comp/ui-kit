import { forwardRef, useRef, useLayoutEffect, useCallback, useMemo, useId } from 'react'
import { Composite } from '@floating-ui/react'
import clsx from 'clsx'
import { SegmentedControlContext } from './SegmentedControlContext'
import { SegmentedControlItem } from './SegmentedControlItem'
import { contractAttrs, contractPart } from '@/theme/contract'
import { segmentedControlContract } from '@/theme/contracts/segmented-control'
import { useRovingTabStop } from '@/components/ToggleButton/useRovingTabStop'
import { useControllableState } from '@/utils/useControllableState'
import { useMergeRefs } from '@/utils/useMergeRefs'
import type { SegmentedControlProps } from './SegmentedControl.types'

const ITEM_SELECTOR = '[data-seg-item]'

const SegmentedControlRoot = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      size = 'medium',
      disabled,
      className,
      children,
      onKeyDown,
      ...props
    },
    ref
  ) {
    const rootId = useId()
    const thumbRef = useRef<HTMLSpanElement>(null)
    // True after the first measurement — enables CSS transition on subsequent moves.
    const mountedRef = useRef(false)

    // ---- Selection state ----
    const [selectedValue, setSelectedValue] = useControllableState<string | undefined, []>({
      value: valueProp,
      defaultValue,
      onChange: onValueChange as ((value: string | undefined) => void) | undefined,
    })
    const select = useCallback((value: string) => setSelectedValue(value), [setSelectedValue])

    // ---- Roving tabindex (APG radio group): стрелки переводят фокус и сразу выбирают ----
    const {
      containerRef,
      activeIndex,
      onNavigate,
      onKeyDown: onRovingKeyDown,
    } = useRovingTabStop<HTMLDivElement>({
      selectedSelector: '[aria-checked="true"]',
      followSelection: true,
      onKeyboardNavigate: (item) => {
        const value = item.dataset.segValue
        if (value !== undefined && value !== selectedValue) select(value)
      },
    })
    const mergedRef = useMergeRefs([containerRef, ref])

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
    }, [containerRef, selectedValue])

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
        <Composite
          // APG radio group: ←/↑ — предыдущий, →/↓ — следующий
          orientation="both"
          activeIndex={activeIndex}
          onNavigate={onNavigate}
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            onKeyDown?.(e as React.KeyboardEvent<HTMLDivElement>)
            onRovingKeyDown(e)
          }}
          render={(htmlProps) => (
            <div
              {...htmlProps}
              ref={mergedRef}
              role="radiogroup"
              aria-disabled={disabled || undefined}
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
          )}
        />
      </SegmentedControlContext.Provider>
    )
  }
)

SegmentedControlRoot.displayName = 'SegmentedControl'

export const SegmentedControl = Object.assign(SegmentedControlRoot, { Item: SegmentedControlItem })
