import clsx from 'clsx'
import { contractPart } from '@/theme/contract'
import { breadcrumbsContract } from '@/theme/contracts/breadcrumbs'
import type { BreadcrumbsProps, BreadcrumbsSeparator } from './Breadcrumbs.types'

export type { BreadcrumbsProps, BreadcrumbsSeparator } from './Breadcrumbs.types'

const SEPARATOR_CHAR: Record<BreadcrumbsSeparator, string> = {
  chevron: '>',
  slash: '/',
  dot: '•',
}

export const Breadcrumbs = ({
  separator = 'chevron',
  children,
  className,
  ...props
}: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="breadcrumb"
      className={clsx(breadcrumbsContract.className, className)}
      {...props}
    >
      <ol
        className={contractPart(breadcrumbsContract, 'list')}
        style={{ '--breadcrumb-sep': `'${SEPARATOR_CHAR[separator]}'` } as React.CSSProperties}
      >
        {children}
      </ol>
    </nav>
  )
}

Breadcrumbs.displayName = 'Breadcrumbs'
