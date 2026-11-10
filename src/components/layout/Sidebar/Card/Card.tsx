import { forwardRef, useId } from 'react'
import type { HTMLAttributes, Ref } from 'react'
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
export const SidebarCard = forwardRef<HTMLButtonElement | HTMLDivElement, SidebarCardProps>(
  (
    {
      leftSlot,
      children,
      rightSlot,
      collapsed: propCollapsed,
      bordered = true,
      className,
      as = 'button',
      ...props
    },
    ref
  ) => {
    const { collapsed } = useSidebar(propCollapsed)
    const hiddenLabelId = useId()
    // В свёрнутом виде контент не виден, но остаётся именем карточки:
    // aria-labelledby читает текст и у скрытого (hidden) элемента
    const labelledBy =
      collapsed && props['aria-label'] == null && props['aria-labelledby'] == null
        ? hiddenLabelId
        : props['aria-labelledby']
    const content = (
      <>
        <span className={contractPart(sidebarCardContract, 'left-slot')}>{leftSlot}</span>
        {collapsed ? (
          <span id={hiddenLabelId} hidden>
            {children}
          </span>
        ) : (
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
          ref={ref as Ref<HTMLDivElement>}
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
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        className={cardClassName(className)}
        {...cardAttrs(bordered, collapsed)}
        {...props}
        aria-labelledby={labelledBy}
      >
        {content}
      </button>
    )
  }
)

SidebarCard.displayName = 'SidebarCard'
