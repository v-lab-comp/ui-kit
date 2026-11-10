import clsx from 'clsx'
import { useSidebar } from '../SidebarContext'
import { SidebarHeaderCard } from '../HeaderCard'
import { SidebarTrigger } from '../Sidebar'
import { contractAttrs, contractPart } from '@/theme/contract'
import { sidebarHeaderContract } from '@/theme/contracts/sidebar-header'
import type { SidebarHeaderProps } from './Header.types'

export type { SidebarHeaderProps } from './Header.types'

export function SidebarHeader({
  divider = false,
  trigger,
  className,
  ...cardProps
}: SidebarHeaderProps) {
  const { collapsed } = useSidebar(cardProps.collapsed)
  const resolvedTrigger = trigger === undefined ? <SidebarTrigger /> : trigger
  return (
    <div
      className={clsx(sidebarHeaderContract.className, className)}
      {...contractAttrs(sidebarHeaderContract, { collapsed })}
    >
      <SidebarHeaderCard {...cardProps} collapsed={collapsed} bordered={false} />
      {divider && <div className={contractPart(sidebarHeaderContract, 'divider')} aria-hidden />}
      {resolvedTrigger != null && (
        <div className={contractPart(sidebarHeaderContract, 'trigger')}>{resolvedTrigger}</div>
      )}
    </div>
  )
}

SidebarHeader.displayName = 'SidebarHeader'
