import type { ReactNode } from 'react'
import type { SidebarCardProps } from '../Card'
import type { AvatarColor } from '@/components/Avatar'

export interface SidebarUserProfileCardProps extends Omit<
  SidebarCardProps,
  'leftSlot' | 'children' | 'title'
> {
  // Avatar props (size всегда 40)
  src?: string | null
  alt?: string
  text?: ReactNode
  icon?: ReactNode
  color?: AvatarColor
  /** Имя пользователя */
  title: ReactNode
  /** Подпись (email и т.п.) */
  description?: ReactNode
}
