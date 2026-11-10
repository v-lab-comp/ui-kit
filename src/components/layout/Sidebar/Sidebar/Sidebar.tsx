import { useState, useCallback } from 'react'
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

/** Корневой контейнер сайдбара: layout (колонка, ширина, высота, бордер). */
export function Sidebar({ collapsed: propCollapsed, className, children, ...props }: SidebarProps) {
  const { collapsed } = useSidebar(propCollapsed)
  return (
    <aside
      className={clsx(sidebarContract.className, className)}
      data-collapsed={collapsed}
      {...props}
    >
      {children}
    </aside>
  )
}

/** Прокручиваемая область для навигации (между header и footer). */
export function SidebarContent({ className, children, ...props }: SidebarContentProps) {
  return (
    <div className={clsx(sidebarContentContract.className, className)} {...props}>
      {children}
    </div>
  )
}

/** Секция навигации с опциональным заголовком. */
export function SidebarSection({
  label,
  collapsed: _collapsed,
  className,
  children,
  ...props
}: SidebarSectionProps) {
  return (
    <div className={clsx(sidebarSectionContract.className, className)} {...props}>
      {label != null && (
        <div className={contractPart(sidebarSectionContract, 'label')} aria-hidden>
          {label}
        </div>
      )}
      <div className={contractPart(sidebarSectionContract, 'items')}>{children}</div>
    </div>
  )
}

SidebarLayout.displayName = 'SidebarLayout'
SidebarMain.displayName = 'SidebarMain'
SidebarTrigger.displayName = 'SidebarTrigger'
Sidebar.displayName = 'Sidebar'
SidebarContent.displayName = 'SidebarContent'
SidebarSection.displayName = 'SidebarSection'
