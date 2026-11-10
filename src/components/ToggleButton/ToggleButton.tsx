import { forwardRef, useState } from 'react'
import { CompositeItem } from '@floating-ui/react'
import clsx from 'clsx'
import { useToggleGroupContext } from './ToggleGroupContext'
import { contractAttrs } from '@/theme/contract'
import { toggleButtonContract } from '@/theme/contracts/toggle-button'
import { useAccessibleNameWarning } from '@/components/Button/useAccessibleNameWarning'
import { ROVING_ITEM_ATTR } from './useRovingTabStop'
import type { ToggleButtonProps } from './ToggleButton.types'

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(function ToggleButton(
  {
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
  },
  ref
) {
  useAccessibleNameWarning('ToggleButton', { children, ...props })
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isInsideGroup) {
      groupCtx.toggle(value)
    } else {
      const next = !resolvedPressed
      if (!isControlled) setUncontrolledPressed(next)
      onPressedChange?.(next)
    }
    onClick?.(e)
  }

  const buttonProps = {
    type: 'button' as const,
    'aria-pressed': resolvedPressed,
    'data-state': resolvedPressed ? 'on' : 'off',
    'data-toggle-item': '',
    'data-toggle-value': value,
    disabled: resolvedDisabled,
    className: clsx(toggleButtonContract.className, className),
    ...contractAttrs(toggleButtonContract, { size: resolvedSize, shape: resolvedShape }),
    ...props,
    onClick: handleClick,
  }
  const content = (
    <>
      {leftNode}
      {children}
      {rightNode}
    </>
  )

  // В группе с roving focus tabIndex и фокус ведёт CompositeItem из floating-ui
  if (isInsideGroup && groupCtx.rovingFocus) {
    return (
      <CompositeItem
        ref={ref as React.Ref<HTMLElement>}
        onFocus={onFocus as React.FocusEventHandler<HTMLElement> | undefined}
        render={(htmlProps) => (
          <button
            {...htmlProps}
            {...buttonProps}
            {...{ [ROVING_ITEM_ATTR]: '' }}
            // data-active от CompositeItem скином не используется
            data-active={undefined}
          >
            {content}
          </button>
        )}
      />
    )
  }

  return (
    <button {...buttonProps} ref={ref} tabIndex={tabIndexProp} onFocus={onFocus}>
      {content}
    </button>
  )
})

ToggleButton.displayName = 'ToggleButton'
