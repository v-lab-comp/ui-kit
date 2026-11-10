import clsx from 'clsx'
import { customPaletteStyle } from '@/utils/customPalette'
import { contractAttrs, contractPart } from '@/theme/contract'
import { badgeContract } from '@/theme/contracts/badge'
import type { BadgeProps } from './Badge.types'

export type { BadgeProps, BadgeVariant, BadgeColor, BadgeSize, BadgeShape } from './Badge.types'
export {
  BADGE_VARIANT_OPTIONS,
  BADGE_COLOR_OPTIONS,
  BADGE_SIZE_OPTIONS,
  BADGE_SHAPE_OPTIONS,
} from './Badge.types'

export const Badge = ({
  children,
  variant = 'filled',
  color = 'primary',
  customColor,
  size = 'medium',
  shape = 'pill',
  leftNode,
  rightNode,
  dot,
  disabled,
  className,
  style,
  onClick,
  ...props
}: BadgeProps) => {
  const customVars = customColor ? customPaletteStyle(customColor) : undefined
  const mergedStyle = { ...customVars, ...style }

  const rootClass = clsx(badgeContract.className, className)
  const rootAttrs = contractAttrs(badgeContract, {
    variant,
    color: customVars ? undefined : color,
    size,
    shape,
    'has-left-node': Boolean(leftNode),
    'has-right-node': Boolean(rightNode),
    interactive: Boolean(onClick && !disabled),
    disabled: Boolean(disabled),
    'custom-color': Boolean(customVars),
  })

  const content = (
    <>
      {dot ? <span className={contractPart(badgeContract, 'dot')} aria-hidden /> : null}
      {leftNode ? <span className={contractPart(badgeContract, 'node')}>{leftNode}</span> : null}
      {children}
      {rightNode ? <span className={contractPart(badgeContract, 'node')}>{rightNode}</span> : null}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        className={rootClass}
        {...rootAttrs}
        style={mergedStyle}
        disabled={disabled}
        onClick={onClick}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }

  return (
    <span
      className={rootClass}
      {...rootAttrs}
      style={mergedStyle}
      {...(props as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {content}
    </span>
  )
}

Badge.displayName = 'Badge'
