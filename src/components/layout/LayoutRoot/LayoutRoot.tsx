import clsx from 'clsx'
import { layoutRootContract } from '@/theme/contracts/layout-root'
import type { LayoutRootProps } from './LayoutRoot.types'

/**
 * Корневая обёртка для страницы с сайдбаром и контентом.
 * Обязательна для корректной работы: фиксированный хедер, скролл только в области контента.
 * Использование: <LayoutRoot><Sidebar /> <SidebarInset>...</SidebarInset></LayoutRoot>
 */
export function LayoutRoot({ className, children, ...props }: LayoutRootProps) {
  return (
    <div className={clsx(layoutRootContract.className, className)} {...props}>
      {children}
    </div>
  )
}
