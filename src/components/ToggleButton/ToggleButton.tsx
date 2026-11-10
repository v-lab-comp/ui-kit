import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { useToggleGroupContext } from './ToggleGroupContext'
import { contractAttrs } from '@/theme/contract'
import { toggleButtonContract } from '@/theme/contracts/toggle-button'
import type { ToggleButtonProps } from './ToggleButton.types'

export const ToggleButton = ({
  children,
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  value,
  size,
  shape = 'rounded',
  leftNode,
  rightNode,
  disabled,
  className,
  onClick,
  onFocus,
  tabIndex: tabIndexProp,
  ...props
}: ToggleButtonProps) => {
  const groupCtx = useToggleGroupContext()

  const isInsideGroup = groupCtx !== null && value !== undefined

  // ---- Pressed state ----
  const groupPressed = isInsideGroup ? groupCtx.pressedValues.has(value) : undefined
  const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed)
  const isControlled = pressedProp !== undefined
  const resolvedPressed = isInsideGroup
    ? groupPressed!
    : isControlled
      ? pressedProp
      : uncontrolledPressed

  // ---- Inherited group props ----
  const resolvedSize = size ?? groupCtx?.size ?? 'medium'
  const resolvedShape = shape ?? groupCtx?.shape ?? 'rounded'
  const resolvedDisabled = disabled ?? groupCtx?.disabled

  // ---- Roving tabindex ----
  // When inside a group with rovingFocus: only the rover item gets tabIndex=0.
  // The initial rover is the first pressed item or the first item (ToggleGroup picks it).
  // Falls back to tabIndexProp when not in a group.
  let tabIndex: number | undefined = tabIndexProp
  if (isInsideGroup && groupCtx.rovingFocus) {
    tabIndex = groupCtx.rovingValue === value ? 0 : -1
  }

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isInsideGroup) {
        groupCtx.toggle(value)
        // Keep rover on the clicked item
        groupCtx.setRovingValue(value)
      } else {
        const next = !resolvedPressed
        if (!isControlled) setUncontrolledPressed(next)
        onPressedChange?.(next)
      }
      onClick?.(e)
    },
    [isInsideGroup, groupCtx, value, resolvedPressed, isControlled, onPressedChange, onClick]
  )

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLButtonElement>) => {
      // When an item receives focus (e.g. by clicking or programmatic focus),
      // update the rover so tabIndex stays correct after re-render.
      if (isInsideGroup && value !== undefined) {
        groupCtx.setRovingValue(value)
      }
      onFocus?.(e)
    },
    [isInsideGroup, groupCtx, value, onFocus]
  )

  return (
    <button
      type="button"
      aria-pressed={resolvedPressed}
      data-state={resolvedPressed ? 'on' : 'off'}
      data-toggle-item=""
      data-toggle-value={value}
      disabled={resolvedDisabled}
      tabIndex={tabIndex}
      className={clsx(toggleButtonContract.className, className)}
      {...contractAttrs(toggleButtonContract, { size: resolvedSize, shape: resolvedShape })}
      onClick={handleClick}
      onFocus={handleFocus}
      {...props}
    >
      {leftNode}
      {children}
      {rightNode}
    </button>
  )
}

ToggleButton.displayName = 'ToggleButton'
