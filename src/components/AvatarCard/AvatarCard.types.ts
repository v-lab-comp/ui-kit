import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { AvatarColor, AvatarSize } from '@/components/Avatar'

export interface AvatarCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  src?: string | null
  alt?: string
  text?: ReactNode
  icon?: ReactNode
  color?: AvatarColor
  title?: ReactNode
  subtitle?: ReactNode
  rightSlot?: ReactNode
  /** Размер аватара. По умолчанию 64. Влияет на размер шрифтов и отступы. */
  avatarSize?: AvatarSize
  style?: CSSProperties
  className?: string
}
