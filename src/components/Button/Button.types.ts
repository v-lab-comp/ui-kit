import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonContract } from '@/theme/contracts/button'
import type { ContractValue } from '@/theme/contract'

// Варианты — из контракта скинов (src/theme/contracts/button.ts): пропсы и скины не расходятся.
type Values<K extends keyof typeof buttonContract.attributes> = ContractValue<
  typeof buttonContract,
  K
>

export type ButtonVariant = Values<'variant'>
export type ButtonColor = Values<'color'>
export type ButtonSize = Values<'size'>
export type ButtonShape = Values<'shape'>

export const BUTTON_COLOR_OPTIONS = buttonContract.attributes.color
export const BUTTON_SIZE_OPTIONS = buttonContract.attributes.size
export const BUTTON_SHAPE_OPTIONS = buttonContract.attributes.shape

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  color?: ButtonColor
  /**
   * Собственный цвет в формате **hex** (`#rgb`, `#rrggbb`, `#rrggbbaa`). Задаёт `--pal-*`
   * на корне кнопки; если указан вместе с `color`, побеждает **customColor**.
   * Работает во всех вариантах (`filled` / `stroke` / `lighter` / `ghost`) и подхватывается
   * hover-ореолом. Невалидное значение игнорируется — остаётся `color`.
   */
  customColor?: string
  size?: ButtonSize
  /** rounded — скруглённые углы (по умолчанию), circle — круглые, square — прямые углы */
  shape?: ButtonShape
  leftNode?: ReactNode
  rightNode?: ReactNode
}
