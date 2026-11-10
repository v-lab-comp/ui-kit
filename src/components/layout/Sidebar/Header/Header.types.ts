import type { ReactNode } from 'react'
import type { SidebarHeaderCardProps } from '../HeaderCard/HeaderCard.types'

export interface SidebarHeaderProps extends SidebarHeaderCardProps {
  /** Показывать разделитель под блоком (линия по макету Figma) */
  divider?: boolean
  /** Слот для SidebarTrigger (кнопка сворачивания). Позиционируется абсолютно по правому краю, по вертикали по центру header */
  trigger?: ReactNode
}
