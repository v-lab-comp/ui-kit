import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

interface SidebarItemOwnProps {
  /** Иконка слева (например, RiDashboardLine) */
  leftNode?: ReactNode
  /** Текст пункта меню. В свёрнутом режиме не виден, но остаётся доступным именем пункта */
  children?: ReactNode
  /** Опциональная иконка справа (например, шеврон) */
  rightNode?: ReactNode
  /** Активный пункт (синяя полоска слева, primary цвет) */
  active?: boolean
  /** Свёрнутый режим — только иконка 36×36 */
  collapsed?: boolean
}

/** Пункт-действие: рендерится как `<button>` */
export type SidebarItemButtonProps = SidebarItemOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SidebarItemOwnProps> & { href?: undefined }

/** Пункт-навигация: при `href` рендерится как `<a>` */
export type SidebarItemLinkProps = SidebarItemOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SidebarItemOwnProps> & { href: string }

export type SidebarItemProps = SidebarItemButtonProps | SidebarItemLinkProps
