import { useCallback, useRef, useState } from 'react'
import { RiExpandUpDownLine } from '@remixicon/react'
import { useClickOutside } from '@/hooks'
import { useSidebar } from '../SidebarContext'
import { SidebarCard } from '../Card'
import { contractPart } from '@/theme/contract'
import { sidebarCardContract } from '@/theme/contracts/sidebar-card'
import { sidebarHeaderCardContract } from '@/theme/contracts/sidebar-header-card'
import type { SidebarHeaderCardOption, SidebarHeaderCardProps } from './HeaderCard.types'

export type { SidebarHeaderCardProps, SidebarHeaderCardOption } from './HeaderCard.types'

type CardProps = Omit<SidebarHeaderCardProps, 'options' | 'selectedValue' | 'onSelect'>

function Card({
  icon,
  title,
  subtitle,
  rightSlot,
  collapsed: propCollapsed,
  bordered = true,
  className,
  ...props
}: CardProps) {
  const { collapsed } = useSidebar(propCollapsed)
  return (
    <SidebarCard
      leftSlot={icon}
      rightSlot={
        rightSlot != null ? (
          <span className={contractPart(sidebarHeaderCardContract, 'right-button')}>
            {rightSlot}
          </span>
        ) : undefined
      }
      collapsed={collapsed}
      bordered={bordered}
      className={className}
      as={rightSlot != null ? 'div' : 'button'}
      {...props}
    >
      <>
        <span className={contractPart(sidebarCardContract, 'title')}>{title}</span>
        {subtitle != null && (
          <span className={contractPart(sidebarCardContract, 'subtitle')}>{subtitle}</span>
        )}
      </>
    </SidebarCard>
  )
}

function WithDropdown({
  options,
  selectedValue,
  onSelect,
  icon,
  title,
  subtitle,
  collapsed: propCollapsed,
  bordered = true,
  className,
  ...rest
}: SidebarHeaderCardProps & { options: SidebarHeaderCardOption[] }) {
  const { collapsed } = useSidebar(propCollapsed)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])
  useClickOutside(wrapperRef, close, isOpen)

  return (
    <div ref={wrapperRef} className={contractPart(sidebarHeaderCardContract, 'wrapper')}>
      <SidebarCard
        {...rest}
        leftSlot={icon}
        rightSlot={
          <span
            className={contractPart(sidebarHeaderCardContract, 'right-button')}
            data-open={isOpen || undefined}
          >
            <RiExpandUpDownLine />
          </span>
        }
        collapsed={collapsed}
        bordered={bordered}
        className={className}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <>
          <span className={contractPart(sidebarCardContract, 'title')}>{title}</span>
          {subtitle != null && (
            <span className={contractPart(sidebarCardContract, 'subtitle')}>{subtitle}</span>
          )}
        </>
      </SidebarCard>
      {isOpen && (
        <div className={contractPart(sidebarHeaderCardContract, 'dropdown')} role="listbox">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={selectedValue === opt.value}
              className={contractPart(sidebarHeaderCardContract, 'dropdown-item')}
              onClick={() => {
                onSelect?.(opt.value)
                close()
              }}
            >
              {opt.icon != null && (
                <span className={contractPart(sidebarHeaderCardContract, 'dropdown-item-icon')}>
                  {opt.icon}
                </span>
              )}
              <span className={contractPart(sidebarHeaderCardContract, 'dropdown-item-content')}>
                <span className={contractPart(sidebarHeaderCardContract, 'dropdown-item-label')}>
                  {opt.label}
                </span>
                {opt.subtitle != null && (
                  <span
                    className={contractPart(sidebarHeaderCardContract, 'dropdown-item-subtitle')}
                  >
                    {opt.subtitle}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/** Карточка заголовка сайдбара. Dropdown только при передаче options. */
export function SidebarHeaderCard(props: SidebarHeaderCardProps) {
  if (props.options?.length) {
    return <WithDropdown {...props} options={props.options} />
  }
  return <Card {...props} />
}

SidebarHeaderCard.displayName = 'SidebarHeaderCard'
