import type { HTMLAttributes, ReactNode } from 'react'
import { tagContract } from '@/theme/contracts/tag'
import type { ContractValue } from '@/theme/contract'

// Варианты — из контракта скинов (src/theme/contracts/tag.ts): пропсы и скины не расходятся.
type Values<K extends keyof typeof tagContract.attributes> = ContractValue<typeof tagContract, K>

export const TAG_VARIANT_OPTIONS = tagContract.attributes.variant
export type TagVariant = Values<'variant'>

export const TAG_SIZE_OPTIONS = tagContract.attributes.size
export type TagSize = Values<'size'>

export const TAG_SHAPE_OPTIONS = tagContract.attributes.shape
export type TagShape = Values<'shape'>

export type TagColor = Values<'color'>
export const TAG_COLOR_OPTIONS = tagContract.attributes.color

/**
 * Корневой элемент — **`span`** или **`button`** (только **`onClick`** без **`onDismiss`**).
 * С **`onDismiss`** крестик изолирован; **`onClick`** обрабатывает клик по основной части (prefix + текст + suffix).
 */
export interface TagProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children' | 'prefix' | 'suffix'
> {
  children: ReactNode
  variant?: TagVariant
  size?: TagSize
  shape?: TagShape
  /** Семантический цвет палитры (как у Badge/Button). Без `color` и `customColor` — нейтральный вид Figma. */
  color?: TagColor
  /**
   * Собственный цвет в формате **hex** (`#rgb`, `#rrggbb`, `#rrggbbaa`). Задаёт `--pal-*` на корне;
   * если указан вместе с `color`, побеждает **customColor**.
   */
  customColor?: string
  /** Вторичная подпись справа от основного текста (как «(4)» в макете). */
  sublabel?: ReactNode
  /** Левая ячейка: иконка, аватар, флаг и т.п. (16×16, как в Figma). */
  prefix?: ReactNode
  /** Скруглить область prefix под аватар (круг 16px). Для квадратной иконки задайте `false`. */
  prefixRounded?: boolean
  /** Иконка или узел справа от подписи, до крестика (gap 2px к тексту, как в макете). */
  suffix?: ReactNode
  /** Показать крестик удаления; по клику вызывается этот колбэк. */
  onDismiss?: () => void
  /** `aria-label` для кнопки удаления. */
  dismissLabel?: string
  disabled?: boolean
}
