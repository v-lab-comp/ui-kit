import type { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { COLOR_OPTIONS } from '@/types/colors'
import type { Color } from '@/types/colors'
import { badgeContract } from '@/theme/contracts/badge'

// Варианты — из контракта скинов (src/theme/contracts/badge.ts).
const BADGE_VARIANT_OPTIONS = badgeContract.attributes.variant
export type BadgeVariant = (typeof BADGE_VARIANT_OPTIONS)[number]
export { BADGE_VARIANT_OPTIONS }

const BADGE_SIZE_OPTIONS = badgeContract.attributes.size
export type BadgeSize = (typeof BADGE_SIZE_OPTIONS)[number]
export { BADGE_SIZE_OPTIONS }

export type BadgeColor = Color
export { COLOR_OPTIONS as BADGE_COLOR_OPTIONS }

const BADGE_SHAPE_OPTIONS = badgeContract.attributes.shape
export type BadgeShape = (typeof BADGE_SHAPE_OPTIONS)[number]
export { BADGE_SHAPE_OPTIONS }

type CommonProps = {
  variant?: BadgeVariant
  color?: BadgeColor
  /** Произвольный hex (`#rgb`, `#rrggbb`, `#rrggbbaa`) — перекрывает `color`. */
  customColor?: string
  size?: BadgeSize
  shape?: BadgeShape
  leftNode?: ReactNode
  rightNode?: ReactNode
  /** Маленький круглый индикатор слева (6px, текущий цвет). */
  dot?: boolean
  disabled?: boolean
  children?: ReactNode
}

/**
 * Если задан `onClick`, корень рендерится как `<button type="button">`
 * с cursor pointer и hover/active-анимацией.
 */
export type BadgeProps = CommonProps &
  (
    | (Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> & { onClick?: undefined })
    | (Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'> & {
        onClick: MouseEventHandler<HTMLButtonElement>
      })
  )
