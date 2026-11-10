import { forwardRef } from 'react'
import type { ForwardedRef } from 'react'
import { FloatingFocusManager } from '@floating-ui/react'
import { RiExpandUpDownLine } from '@remixicon/react'
import { useDropdownMenu } from '@/components/overlays/Menu'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { useSidebar } from '../SidebarContext'
import { SidebarCard } from '../Card'
import { contractPart } from '@/theme/contract'
import { sidebarCardContract } from '@/theme/contracts/sidebar-card'
import { sidebarHeaderCardContract } from '@/theme/contracts/sidebar-header-card'
import type { SidebarHeaderCardOption, SidebarHeaderCardProps } from './HeaderCard.types'

export type { SidebarHeaderCardProps, SidebarHeaderCardOption } from './HeaderCard.types'

type CardProps = Omit<SidebarHeaderCardProps, 'options' | 'selectedValue' | 'onSelect'>

type ForwardedCardProps<P> = P & { forwardedRef: ForwardedRef<HTMLElement> }

function Card({
  icon,
  title,
  subtitle,
  rightSlot,
  collapsed: propCollapsed,
  bordered = true,
  className,
  forwardedRef,
  ...props
}: ForwardedCardProps<CardProps>) {
  const { collapsed } = useSidebar(propCollapsed)
  return (
    <SidebarCard
      ref={forwardedRef as ForwardedRef<HTMLButtonElement | HTMLDivElement>}
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
  forwardedRef,
  ...rest
}: ForwardedCardProps<SidebarHeaderCardProps & { options: SidebarHeaderCardOption[] }>) {
  const { collapsed } = useSidebar(propCollapsed)
  const selectedIndex = options.findIndex((opt) => opt.value === selectedValue)
  const {
    open,
    context,
    setReference,
    setFloating,
    getReferenceProps,
    getMenuProps,
    getItemProps,
  } = useDropdownMenu({
    labels: options.map((opt) => opt.label),
    selectedIndex: selectedIndex >= 0 ? selectedIndex : null,
  })
  const triggerRef = useMergeRefs<HTMLElement>([setReference, forwardedRef])

  return (
    <div className={contractPart(sidebarHeaderCardContract, 'wrapper')}>
      <SidebarCard
        ref={triggerRef}
        leftSlot={icon}
        rightSlot={
          <span
            className={contractPart(sidebarHeaderCardContract, 'right-button')}
            data-open={open || undefined}
          >
            <RiExpandUpDownLine />
          </span>
        }
        collapsed={collapsed}
        bordered={bordered}
        className={className}
        {...getReferenceProps(rest)}
      >
        <>
          <span className={contractPart(sidebarCardContract, 'title')}>{title}</span>
          {subtitle != null && (
            <span className={contractPart(sidebarCardContract, 'subtitle')}>{subtitle}</span>
          )}
        </>
      </SidebarCard>
      {open && (
        <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
          <div
            ref={setFloating}
            className={contractPart(sidebarHeaderCardContract, 'dropdown')}
            {...getMenuProps()}
          >
            {options.map((opt, index) => (
              <button
                key={opt.value}
                type="button"
                role="menuitemradio"
                aria-checked={selectedValue === opt.value}
                className={contractPart(sidebarHeaderCardContract, 'dropdown-item')}
                {...getItemProps(index, { onClick: () => onSelect?.(opt.value) })}
              >
                {opt.icon != null && (
                  <span
                    className={contractPart(sidebarHeaderCardContract, 'dropdown-item-icon')}
                    aria-hidden
                  >
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
        </FloatingFocusManager>
      )}
    </div>
  )
}

/**
 * Карточка заголовка сайдбара. При переданных options — кнопка меню (APG menu button):
 * пункты — menuitemradio, выбранный отмечен aria-checked. ref — на кнопку-триггер.
 */
export const SidebarHeaderCard = forwardRef<HTMLElement, SidebarHeaderCardProps>((props, ref) => {
  if (props.options?.length) {
    return <WithDropdown {...props} options={props.options} forwardedRef={ref} />
  }
  // options/selectedValue/onSelect не должны попасть в DOM-атрибуты кнопки
  const cardProps: SidebarHeaderCardProps = { ...props }
  delete cardProps.options
  delete cardProps.selectedValue
  delete cardProps.onSelect
  return <Card {...cardProps} forwardedRef={ref} />
})

SidebarHeaderCard.displayName = 'SidebarHeaderCard'
