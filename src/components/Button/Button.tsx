import clsx from 'clsx'
import { useButtonGroup } from '@/components/ButtonGroup/ButtonGroupContext'
import { customPaletteStyle } from '@/utils/customPalette'
import { contractAttrs } from '@/theme/contract'
import { buttonContract } from '@/theme/contracts/button'
import { useAccessibleNameWarning } from './useAccessibleNameWarning'
import type { ButtonProps } from './Button.types'

export type {
  ButtonProps,
  ButtonBaseProps,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
  ButtonShape,
} from './Button.types'

export const Button = ({
  children,
  variant = 'filled',
  color = 'primary',
  customColor,
  size,
  shape = 'rounded',
  leftNode,
  rightNode,
  className,
  style,
  // По умолчанию не submit: кнопка внутри <form> не должна неявно отправлять форму.
  type = 'button',
  ...props
}: ButtonProps) => {
  useAccessibleNameWarning('Button', { children, ...props })
  const groupCtx = useButtonGroup()
  const resolvedSize = size ?? groupCtx?.size ?? 'medium'

  // customColor побеждает color: data-color снимается, `--pal-*` приходят инлайном.
  // Невалидный hex → customPaletteStyle вернёт undefined, и остаётся семантический color.
  const customVars = customColor ? customPaletteStyle(customColor) : undefined

  return (
    <button
      type={type}
      className={clsx(buttonContract.className, className)}
      {...contractAttrs(buttonContract, {
        variant,
        color: customVars ? undefined : color,
        size: resolvedSize,
        shape,
        'custom-color': Boolean(customVars),
      })}
      style={{ ...customVars, ...style }}
      {...props}
    >
      {leftNode}
      {children}
      {rightNode}
    </button>
  )
}

Button.displayName = 'Button'
