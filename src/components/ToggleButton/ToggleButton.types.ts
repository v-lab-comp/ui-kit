import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { ButtonSize, ButtonShape } from '@/components/Button'

export type ToggleButtonSize = ButtonSize
export type ToggleButtonShape = ButtonShape

export interface ToggleButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
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
