import clsx from 'clsx'
import { useSidebar } from '../SidebarContext'
import { contractAttrs, contractPart } from '@/theme/contract'
import { sidebarItemContract } from '@/theme/contracts/sidebar-item'
import type { SidebarItemProps } from './Item.types'

export type { SidebarItemProps } from './Item.types'

export function SidebarItem({
  leftNode,
  children,
  rightNode,
  active = false,
  collapsed: propCollapsed,
  className,
  ...props
}: SidebarItemProps) {
  const { collapsed } = useSidebar(propCollapsed)
  return (
    <div
      className={clsx(sidebarItemContract.className, className)}
      {...contractAttrs(sidebarItemContract, { collapsed })}
    >
      <span
        className={contractPart(sidebarItemContract, 'bar-slot')}
        data-active={active || undefined}
        aria-hidden
      />
      <button
        type="button"
        className={contractPart(sidebarItemContract, 'item')}
        data-active={active || undefined}
        data-collapsed={collapsed || undefined}
        aria-current={active ? 'page' : undefined}
        {...props}
      >
        {leftNode && <span className={contractPart(sidebarItemContract, 'left')}>{leftNode}</span>}
        {children != null && (
          <span className={contractPart(sidebarItemContract, 'label')}>{children}</span>
        )}
        {!collapsed && rightNode != null && (
          <span className={contractPart(sidebarItemContract, 'right')}>{rightNode}</span>
        )}
      </button>
    </div>
  )
}

SidebarItem.displayName = 'SidebarItem'
