import clsx from 'clsx'
import { useSidebar } from '../SidebarContext'
import { SidebarUserProfileCard } from '../UserProfileCard'
import { contractAttrs, contractPart } from '@/theme/contract'
import { sidebarFooterContract } from '@/theme/contracts/sidebar-footer'
import type { SidebarFooterProps } from './Footer.types'

export type { SidebarFooterProps } from './Footer.types'

/** Футер сайдбара с карточкой профиля пользователя (Figma: Sidebar Footer 3789:5341). */
export function SidebarFooter({ divider = false, className, ...cardProps }: SidebarFooterProps) {
  const { collapsed } = useSidebar(cardProps.collapsed)
  return (
    <div
      className={clsx(sidebarFooterContract.className, className)}
      {...contractAttrs(sidebarFooterContract, { collapsed })}
    >
      <SidebarUserProfileCard {...cardProps} collapsed={collapsed} bordered={false} />
      {divider && <div className={contractPart(sidebarFooterContract, 'divider')} aria-hidden />}
    </div>
  )
}

SidebarFooter.displayName = 'SidebarFooter'
