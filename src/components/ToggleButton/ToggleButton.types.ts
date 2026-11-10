import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { ButtonSize, ButtonShape } from '@/components/Button'
import type { AccessibleNameProps } from '@/components/Button/Button.types'

export type ToggleButtonSize = ButtonSize
export type ToggleButtonShape = ButtonShape

/** Пропсы ToggleButton без требования доступного имени. */
export interface ToggleButtonBaseProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'children' | 'aria-label' | 'aria-labelledby'
> {
  /**
   * Controlled pressed state.
   */
  pressed?: boolean
  /**
   * Initial pressed state for uncontrolled usage.
   */
  defaultPressed?: boolean
  /**
   * Called when pressed state changes.
   */
  onPressedChange?: (pressed: boolean) => void
  /**
   * Value used to identify the button inside a ToggleGroup.
   */
  value?: string
  size?: ToggleButtonSize
  shape?: ToggleButtonShape
  leftNode?: ReactNode
  rightNode?: ReactNode
}

/** Пропсы ToggleButton. Без `children` (кнопка-иконка) обязателен `aria-label` или `aria-labelledby`. */
export type ToggleButtonProps = ToggleButtonBaseProps & AccessibleNameProps
