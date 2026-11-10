import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'

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
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SidebarItemOwnProps> & {
    href?: undefined
    as?: undefined
  }

/**
 * Пункт-навигация: при `href` рендерится как `<a>`, а с `as` — переданным компонентом
 * (Link из роутера и т.п.), который получает `href` и остальные пропсы ссылки.
 */
export type SidebarItemLinkProps<T extends ElementType = 'a'> = SidebarItemOwnProps & {
  as?: T
  href: string
} & Omit<ComponentPropsWithoutRef<T>, keyof SidebarItemOwnProps | 'as' | 'href'>

export type SidebarItemProps<T extends ElementType = 'a'> =
  | SidebarItemButtonProps
  | SidebarItemLinkProps<T>

/** Сигнатура SidebarItem: полиморфная ссылка или кнопка; ref — на ссылку/кнопку */
export interface SidebarItemComponent {
  <T extends ElementType = 'a'>(
    props: SidebarItemLinkProps<T> & { ref?: Ref<HTMLAnchorElement | HTMLButtonElement> }
  ): ReactElement | null
  (props: SidebarItemButtonProps & { ref?: Ref<HTMLButtonElement> }): ReactElement | null
  displayName?: string
}
