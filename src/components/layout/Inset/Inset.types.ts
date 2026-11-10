import type { ComponentProps, ReactNode } from 'react'

export interface SidebarInsetProps extends Omit<ComponentProps<'main'>, 'children'> {
  /** Отступ слева (например, ширина сайдбара). */
  insetLeft: number
  children?: ReactNode
  className?: string
}

export interface SidebarInsetContentProps extends ComponentProps<'div'> {
  children?: ReactNode
}
