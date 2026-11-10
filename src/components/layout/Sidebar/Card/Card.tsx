import type { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { useSidebar } from '../SidebarContext'
import { contractAttrs, contractPart } from '@/theme/contract'
import { sidebarCardContract } from '@/theme/contracts/sidebar-card'
import type { SidebarCardProps } from './Card.types'

export type { SidebarCardProps } from './Card.types'

const cardClassName = (className?: string) => clsx(sidebarCardContract.className, className)

const cardAttrs = (bordered: boolean, collapsed: boolean) =>
  contractAttrs(sidebarCardContract, { unbordered: !bordered, collapsed })

/** Базовая карточка сайдбара: левый слот (иконка/аватар), контент, правый слот. Рамка и collapsed общие для HeaderCard и UserProfileCard. */
export function SidebarCard({
  leftSlot,
  children,
  rightSlot,
  collapsed: propCollapsed,
  bordered = true,
  className,
  as = 'button',
  ...props
}: SidebarCardProps) {
  const { collapsed } = useSidebar(propCollapsed)
  const content = (
    <>
      <span className={contractPart(sidebarCardContract, 'left-slot')}>{leftSlot}</span>
      {!collapsed && (
        <>
          <div className={contractPart(sidebarCardContract, 'content')}>{children}</div>
          {rightSlot != null ? (
            <span className={contractPart(sidebarCardContract, 'right')} aria-hidden>
              {rightSlot}
            </span>
          ) : null}
        </>
      )}
    </>
  )
  if (as === 'div') {
    return (
      <div
        className={cardClassName(className)}
        {...cardAttrs(bordered, collapsed)}
        {...(props as HTMLAttributes<HTMLDivElement>)}
      >
        {content}
      </div>
    )
  }
  return (
    <button
      type="button"
      className={cardClassName(className)}
      {...cardAttrs(bordered, collapsed)}
      {...props}
    >
      {content}
    </button>
  )
}

SidebarCard.displayName = 'SidebarCard'
