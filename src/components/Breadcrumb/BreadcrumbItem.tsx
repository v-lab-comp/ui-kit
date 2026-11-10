import clsx from 'clsx'
import type { ElementType } from 'react'
import { contractPart } from '@/theme/contract'
import {
  breadcrumbItemContract,
  breadcrumbLinkContract,
  breadcrumbPageContract,
} from '@/theme/contracts/breadcrumb-item'
import type {
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
} from './BreadcrumbItem.types'

export type {
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
} from './BreadcrumbItem.types'

/** <li> обёртка */
export const BreadcrumbItem = ({ children, className, ...props }: BreadcrumbItemProps) => (
  <li className={clsx(breadcrumbItemContract.className, className)} {...props}>
    {children}
  </li>
)

/**
 * Кликабельный элемент хлебной крошки.
 *
 * По умолчанию рендерит <a>. Для роутеров используй проп `as`:
 * @example
 * // React Router DOM
 * <BreadcrumbLink as={Link} to="/home" icon={icon}>Главная</BreadcrumbLink>
 *
 * // Next.js
 * <BreadcrumbLink as={NextLink} href="/home" icon={icon}>Главная</BreadcrumbLink>
 *
 * // Нативная ссылка
 * <BreadcrumbLink href="/home" icon={icon}>Главная</BreadcrumbLink>
 */
export const BreadcrumbLink = <T extends ElementType = 'a'>({
  as,
  icon,
  children,
  className,
  ...props
}: BreadcrumbLinkProps<T>) => {
  const Tag = (as ?? 'a') as ElementType
  return (
    <Tag
      className={clsx(
        contractPart(breadcrumbItemContract, 'inner'),
        breadcrumbLinkContract.className,
        className
      )}
      {...props}
    >
      {icon && (
        <span className={contractPart(breadcrumbItemContract, 'icon')} aria-hidden>
          {icon}
        </span>
      )}
      <span className={contractPart(breadcrumbItemContract, 'label')}>{children}</span>
    </Tag>
  )
}

/** Текущая страница — последний элемент, не ссылка (aria-current="page") */
export const BreadcrumbPage = ({ icon, children, className, ...props }: BreadcrumbPageProps) => (
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={clsx(
      contractPart(breadcrumbItemContract, 'inner'),
      breadcrumbPageContract.className,
      className
    )}
    {...props}
  >
    {icon && (
      <span className={contractPart(breadcrumbItemContract, 'icon')} aria-hidden>
        {icon}
      </span>
    )}
    <span className={contractPart(breadcrumbItemContract, 'label')}>{children}</span>
  </span>
)

BreadcrumbItem.displayName = 'BreadcrumbItem'
BreadcrumbLink.displayName = 'BreadcrumbLink'
BreadcrumbPage.displayName = 'BreadcrumbPage'
