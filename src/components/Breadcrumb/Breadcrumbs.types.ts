import type { HTMLAttributes, ReactNode } from 'react'

const BREADCRUMBS_SEPARATOR_OPTIONS = ['chevron', 'slash', 'dot'] as const
export type BreadcrumbsSeparator = (typeof BREADCRUMBS_SEPARATOR_OPTIONS)[number]
export { BREADCRUMBS_SEPARATOR_OPTIONS }

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  separator?: BreadcrumbsSeparator
  children: ReactNode
}
