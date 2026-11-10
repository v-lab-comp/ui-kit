import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface SidebarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Иконка слева (например, RiDashboardLine) */
  leftNode?: ReactNode
  /** Текст пункта меню */
  children?: ReactNode
  /** Опциональная иконка справа (например, шеврон) */
  rightNode?: ReactNode
  /** Активный пункт (синяя полоска слева, primary цвет) */
  active?: boolean
  /** Свёрнутый режим — только иконка 36×36 */
  collapsed?: boolean
}
