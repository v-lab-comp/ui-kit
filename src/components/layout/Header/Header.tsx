import clsx from 'clsx'
import { pageHeaderContract } from '@/theme/contracts/page-header'
import type { PageHeaderProps } from './Header.types'

export type { PageHeaderProps } from './Header.types'

/** Хедер страницы — верхняя полоса области основного контента. В проекте сюда прокидывается свой контент (breadcrumbs, поиск, профиль и т.д.). */
export function PageHeader({ className, children, ...props }: PageHeaderProps) {
  return (
    <header className={clsx(pageHeaderContract.className, className)} {...props}>
      {children}
    </header>
  )
}

PageHeader.displayName = 'PageHeader'
