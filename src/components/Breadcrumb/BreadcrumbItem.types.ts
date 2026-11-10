import type { ElementType, HTMLAttributes, ReactNode, ComponentPropsWithoutRef } from 'react'

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode
}

// Полиморфный тип: по умолчанию <a>, но можно передать Link из react-router-dom, next/link и т.д.
export type BreadcrumbLinkProps<T extends ElementType = 'a'> = {
  as?: T
  icon?: ReactNode
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'icon' | 'children'>

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
  icon?: ReactNode
  children: ReactNode
}
