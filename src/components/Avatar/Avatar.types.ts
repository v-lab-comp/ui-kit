import type { HTMLAttributes, ReactNode } from 'react'
import type { Color } from '@/types/colors'
import { avatarContract } from '@/theme/contracts/avatar'

const AVATAR_SIZE_OPTIONS = [20, 24, 32, 40, 48, 56, 64, 72, 80] as const
export type AvatarSize = (typeof AVATAR_SIZE_OPTIONS)[number]
export { AVATAR_SIZE_OPTIONS }

export type AvatarColor = Color
export const AVATAR_COLOR_OPTIONS = avatarContract.attributes.color

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  src?: string | null
  /** Доступное имя (имя человека). Для фото — `alt` у `<img>`, для инициалов/иконки — `aria-label` корня. Пусто — декоративный. */
  alt?: string
  text?: ReactNode
  icon?: ReactNode
  size?: AvatarSize
  color?: AvatarColor
  className?: string
}
