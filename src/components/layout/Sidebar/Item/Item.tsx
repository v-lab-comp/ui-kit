import { forwardRef, useId } from 'react'
import type { ButtonHTMLAttributes, ElementType, Ref } from 'react'
import clsx from 'clsx'
import { useSidebar } from '../SidebarContext'
import { contractAttrs, contractPart } from '@/theme/contract'
import { sidebarItemContract } from '@/theme/contracts/sidebar-item'
import type { SidebarItemComponent, SidebarItemProps } from './Item.types'

export type {
  SidebarItemProps,
  SidebarItemButtonProps,
  SidebarItemLinkProps,
  SidebarItemComponent,
} from './Item.types'

/**
 * Пункт сайдбара: с `href` — ссылка `<a>` (или компонент из `as`, например Link роутера),
 * без — кнопка. ref — на ссылку/кнопку.
 *
 * @example
 * <SidebarItem as={Link} href="/projects" active>Проекты</SidebarItem>
 */
export const SidebarItem = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  SidebarItemProps<ElementType>
>(
  (
    {
      as,
      leftNode,
      children,
      rightNode,
      active = false,
      collapsed: propCollapsed,
      className,
      ...props
    },
    ref
  ) => {
    const { collapsed } = useSidebar(propCollapsed)
    const labelId = useId()
    // В свёрнутом виде подпись скрыта скином (display: none), но aria-labelledby
    // берёт имя и у скрытого элемента — иконка-кнопка не остаётся без имени
    const labelledBy =
      collapsed && children != null && props['aria-label'] == null
        ? (props['aria-labelledby'] ?? labelId)
        : props['aria-labelledby']

    const LinkTag = (as ?? 'a') as ElementType
    const itemProps = {
      className: contractPart(sidebarItemContract, 'item'),
      'data-active': active || undefined,
      'data-collapsed': collapsed || undefined,
      'aria-current': active ? ('page' as const) : undefined,
    }
    const content = (
      <>
        {leftNode && <span className={contractPart(sidebarItemContract, 'left')}>{leftNode}</span>}
        {children != null && (
          <span id={labelId} className={contractPart(sidebarItemContract, 'label')}>
            {children}
          </span>
        )}
        {!collapsed && rightNode != null && (
          <span className={contractPart(sidebarItemContract, 'right')}>{rightNode}</span>
        )}
      </>
    )

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
        {props.href !== undefined ? (
          <LinkTag ref={ref} {...itemProps} {...props} aria-labelledby={labelledBy}>
            {content}
          </LinkTag>
        ) : (
          <button
            ref={ref as Ref<HTMLButtonElement>}
            type="button"
            {...itemProps}
            {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
            aria-labelledby={labelledBy}
          >
            {content}
          </button>
        )}
      </div>
    )
  }
) as SidebarItemComponent

SidebarItem.displayName = 'SidebarItem'
