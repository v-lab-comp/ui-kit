import { useEffect } from 'react'
import clsx from 'clsx'
import { useSegmentedControlContext } from './SegmentedControlContext'
import { contractPart } from '@/theme/contract'
import { segmentedControlContract } from '@/theme/contracts/segmented-control'
import { useAccessibleNameWarning } from '@/components/Button/useAccessibleNameWarning'
import type { SegmentedControlItemProps } from './SegmentedControl.types'

export const SegmentedControlItem = ({
  value,
  leftNode,
  rightNode,
  disabled,
  className,
  onClick,
  children,
  ...props
}: SegmentedControlItemProps) => {
  useAccessibleNameWarning('SegmentedControl.Item', { children, ...props })
  const ctx = useSegmentedControlContext()
  const isSelected = ctx.selectedValue === value
  const isDisabled = disabled ?? ctx.disabled

  // Tell the root to remeasure once this item mounts into the DOM.
  useEffect(() => {
    ctx.notifyMount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      data-seg-item=""
      data-seg-value={value}
      data-selected={isSelected}
      disabled={isDisabled}
      className={clsx(contractPart(segmentedControlContract, 'item'), className)}
      onClick={(e) => {
        if (!isSelected) ctx.select(value)
        onClick?.(e)
      }}
      {...props}
    >
      {leftNode}
      {children}
      {rightNode}
    </button>
  )
}

SegmentedControlItem.displayName = 'SegmentedControlItem'
