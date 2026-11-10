import { forwardRef, useEffect } from 'react'
import { CompositeItem } from '@floating-ui/react'
import clsx from 'clsx'
import { useSegmentedControlContext } from './SegmentedControlContext'
import { contractPart } from '@/theme/contract'
import { segmentedControlContract } from '@/theme/contracts/segmented-control'
import { useAccessibleNameWarning } from '@/components/Button/useAccessibleNameWarning'
import { ROVING_ITEM_ATTR } from '@/components/ToggleButton/useRovingTabStop'
import type { SegmentedControlItemProps } from './SegmentedControl.types'

export const SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  function SegmentedControlItem(
    { value, leftNode, rightNode, disabled, className, onClick, onFocus, children, ...props },
    ref
  ) {
    useAccessibleNameWarning('SegmentedControl.Item', { children, ...props })
    const ctx = useSegmentedControlContext()
    const isSelected = ctx.selectedValue === value
    const isDisabled = disabled ?? ctx.disabled

    // Tell the root to remeasure once this item mounts into the DOM.
    useEffect(() => {
      ctx.notifyMount()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // tabIndex и фокус ведёт CompositeItem (roving tabindex корня)
    return (
      <CompositeItem
        ref={ref as React.Ref<HTMLElement>}
        onFocus={onFocus as React.FocusEventHandler<HTMLElement> | undefined}
        render={(htmlProps) => (
          <button
            {...htmlProps}
            type="button"
            role="radio"
            aria-checked={isSelected}
            data-seg-item=""
            data-seg-value={value}
            data-selected={isSelected}
            {...{ [ROVING_ITEM_ATTR]: '' }}
            // data-active от CompositeItem скином не используется
            data-active={undefined}
            disabled={isDisabled}
            className={clsx(contractPart(segmentedControlContract, 'item'), className)}
            {...props}
            onClick={(e) => {
              if (!isSelected) ctx.select(value)
              onClick?.(e)
            }}
          >
            {leftNode}
            {children}
            {rightNode}
          </button>
        )}
      />
    )
  }
)

SegmentedControlItem.displayName = 'SegmentedControlItem'
