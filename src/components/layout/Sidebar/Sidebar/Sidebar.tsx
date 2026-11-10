import { forwardRef, useCallback, useId, useState } from 'react'
import clsx from 'clsx'
import { RiArrowLeftSLine } from '@remixicon/react'
import { contractAttrs, contractPart } from '@/theme/contract'
import {
  sidebarContentContract,
  sidebarContract,
  sidebarLayoutContract,
  sidebarMainContract,
  sidebarSectionContract,
  sidebarTriggerContract,
} from '@/theme/contracts/sidebar'
import { SidebarContext, useSidebar } from '../SidebarContext'
import type {
  SidebarContentProps,
  SidebarLayoutProps,
  SidebarMainProps,
  SidebarProps,
  SidebarSectionProps,
  SidebarTriggerProps,
} from './Sidebar.types'

export type {
  SidebarProps,
  SidebarLayoutProps,
  SidebarMainProps,
  SidebarContentProps,
  SidebarSectionProps,
  SidebarTriggerProps,
} from './Sidebar.types'

/** Обёртка layout + провайдер состояния collapsed. Оборачивает Sidebar + SidebarMain. */
export function SidebarLayout({
  defaultCollapsed = false,
  className,
  children,
  ...props
}: SidebarLayoutProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const toggle = useCallback(() => setCollapsed((v: boolean) => !v), [])

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      <div className={clsx(sidebarLayoutContract.className, className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

/** Основная область контента рядом с сайдбаром. Автоматически сдвигается при collapsed. */
export function SidebarMain({
  collapsed: propCollapsed,
  className,
  children,
  ...props
}: SidebarMainProps) {
  const { collapsed } = useSidebar(propCollapsed)
  return (
    <div
      className={clsx(sidebarMainContract.className, className)}
      {...contractAttrs(sidebarMainContract, { collapsed })}
      {...props}
    >
      {children}
    </div>
  )
}

/** Кнопка сворачивания/разворачивания сайдбара. Позиционируется снаружи. */
export function SidebarTrigger({
  collapsed: propCollapsed,
  onToggle,
  className,
  ...props
}: SidebarTriggerProps) {
  const { collapsed, toggle } = useSidebar(propCollapsed)
  const handleClick = onToggle ?? toggle

  return (
    <button
      type="button"
      className={clsx(sidebarTriggerContract.className, className)}
      onClick={handleClick}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!collapsed}
      {...props}
    >
      <RiArrowLeftSLine
        className={contractPart(sidebarTriggerContract, 'icon')}
        data-collapsed={collapsed || undefined}
      />
    </button>
  )
}

/** Корневой контейнер сайдбара (`<aside>`): layout (колонка, ширина, высота, бордер). */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed: propCollapsed, className, children, ...props }, ref) => {
    const { collapsed } = useSidebar(propCollapsed)
    return (
      <aside
        ref={ref}
        className={clsx(sidebarContract.className, className)}
        data-collapsed={collapsed}
        {...props}
      >
        {children}
      </aside>
    )
  }
)

/**
 * Прокручиваемая область навигации (между header и footer) — landmark `<nav>`.
 * Имя landmark задаётся через `aria-label` / `aria-labelledby`, если навигаций на странице несколько.
 */
export const SidebarContent = forwardRef<HTMLElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => (
    <nav ref={ref} className={clsx(sidebarContentContract.className, className)} {...props}>
      {children}
    </nav>
  )
)

/** Секция навигации с опциональным заголовком: `role="group"`, имя группы — её заголовок. */
export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ label, collapsed: _collapsed, className, children, ...props }, ref) => {
    const labelId = useId()
    const hasLabel = label != null
    return (
      <div
        ref={ref}
        role={hasLabel ? 'group' : undefined}
        aria-labelledby={hasLabel ? labelId : undefined}
        className={clsx(sidebarSectionContract.className, className)}
        {...props}
      >
        {hasLabel && (
          <div id={labelId} className={contractPart(sidebarSectionContract, 'label')}>
            {label}
          </div>
        )}
        <div className={contractPart(sidebarSectionContract, 'items')}>{children}</div>
      </div>
    )
  }
)

SidebarLayout.displayName = 'SidebarLayout'
SidebarMain.displayName = 'SidebarMain'
SidebarTrigger.displayName = 'SidebarTrigger'
Sidebar.displayName = 'Sidebar'
SidebarContent.displayName = 'SidebarContent'
SidebarSection.displayName = 'SidebarSection'
