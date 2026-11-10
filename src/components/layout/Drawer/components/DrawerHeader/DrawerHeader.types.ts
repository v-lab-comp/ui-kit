import type { ReactNode } from 'react'

type DrawerHeaderBase = {
  /** Скрыть кнопку закрытия */
  hideCloseButton?: boolean
}

/** Обычная шапка: заголовок + опциональный подзаголовок и иконка слева */
export type DrawerHeaderDefaultProps = DrawerHeaderBase & {
  closeOnly?: false
  title: ReactNode
  subtitle?: ReactNode
  /** Слот 40×40 слева */
  icon?: ReactNode
}

/** Только кнопка закрытия — заголовок ставится отдельно (например, в DrawerBody) */
export type DrawerHeaderCloseOnlyProps = DrawerHeaderBase & {
  closeOnly: true
  title?: never
  subtitle?: never
  icon?: never
}

export type DrawerHeaderProps = DrawerHeaderDefaultProps | DrawerHeaderCloseOnlyProps
