import { forwardRef } from 'react'
import clsx from 'clsx'
import { sidebarInsetContentContract, sidebarInsetContract } from '@/theme/contracts/sidebar-inset'
import type { SidebarInsetProps, SidebarInsetContentProps } from './Inset.types'

/**
 * Область контента рядом с сайдбаром (как в shadcn — рендерится как <main>).
 * Задаётся `insetLeft`, внутри обычно идут `PageHeader` и `SidebarInsetContent`.
 */
export function SidebarInset({
  insetLeft,
  className,
  children,
  style,
  ...props
}: SidebarInsetProps) {
  return (
    <main
      className={clsx(sidebarInsetContract.className, className)}
      style={{ ...style, marginLeft: insetLeft }}
      {...props}
    >
      {children}
    </main>
  )
}

/**
 * Прокручиваемая область под хедером внутри `SidebarInset`. flex: 1, min-height: 0.
 * Фокусируема с клавиатуры (`tabIndex={0}`), чтобы её можно было прокручивать стрелками.
 * С `aria-label` / `aria-labelledby` становится landmark `role="region"`.
 */
export const SidebarInsetContent = forwardRef<HTMLDivElement, SidebarInsetContentProps>(
  ({ className, children, tabIndex = 0, ...props }, ref) => {
    const isNamed = props['aria-label'] != null || props['aria-labelledby'] != null
    return (
      <div
        ref={ref}
        role={isNamed ? 'region' : undefined}
        tabIndex={tabIndex}
        className={clsx(sidebarInsetContentContract.className, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SidebarInset.displayName = 'SidebarInset'
SidebarInsetContent.displayName = 'SidebarInsetContent'
