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

/** Контент, который даёт кнопке видимую подпись: `undefined` / `null` означают «подписи нет». */
type ButtonContent = Exclude<ReactNode, null | undefined>

/**
 * Требование доступного имени для кнопок. Если `children` нет (кнопка-иконка),
 * обязателен `aria-label` или `aria-labelledby` — иначе скринридер озвучит просто «кнопка».
 * Общий для Button, ToggleButton и SegmentedControl.Item.
 */
export type AccessibleNameProps =
  | {
      children: ButtonContent
      'aria-label'?: string
      'aria-labelledby'?: string
    }
  | {
      children?: null
      'aria-label'?: string
      'aria-labelledby': string
    }
  | {
      children?: null
      'aria-label': string
      'aria-labelledby'?: string
    }

/** Пропсы Button без требования доступного имени (для обёрток и вычисления типов). */
export interface ButtonBaseProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label' | 'aria-labelledby'
> {
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

/**
 * Пропсы Button. Без `children` (кнопка-иконка) обязателен `aria-label` или `aria-labelledby`.
 * `type` по умолчанию — `"button"`: для отправки формы передайте `type="submit"` явно.
 */
export type ButtonProps = ButtonBaseProps & AccessibleNameProps
