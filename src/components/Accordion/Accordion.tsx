import { forwardRef, useId, useRef, useLayoutEffect, useState, version } from 'react'
import clsx from 'clsx'
import { RiAddLine, RiSubtractLine } from '@remixicon/react'
import { contractAttrs, contractPart } from '@/theme/contract'
import { accordionContract } from '@/theme/contracts/accordion'
import { useControllableState } from '@/utils/useControllableState'
import type { AccordionProps } from './Accordion.types'

// inert: React 19 ждёт boolean, React 18 не знает проп и пишет строку как есть ('' — атрибут включён)
const INERT = (Number.parseInt(version, 10) >= 19 ? true : '') as unknown as boolean

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    title,
    children,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    disabled = false,
    leftIcon,
    flipIcon = false,
    className,
    id: propsId,
    region = false,
    ...props
  },
  ref
) {
  const [open, setOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const fallbackId = useId()
  const rootId = propsId ?? fallbackId
  const triggerId = `${rootId}-trigger`
  const panelId = `${rootId}-panel`

  const ExpandIcon = open ? RiSubtractLine : RiAddLine
  const toggleIcon = (
    <ExpandIcon className={contractPart(accordionContract, 'toggle-icon')} size={20} aria-hidden />
  )
  const iconLeft = flipIcon ? toggleIcon : leftIcon
  const iconRight = flipIcon ? null : toggleIcon

  const hasLeftIcon = !flipIcon && leftIcon != null

  // Measure actual content height for smooth CSS height transition (Radix-style approach)
  const innerRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number>(0)

  useLayoutEffect(() => {
    const el = innerRef.current
    if (!el) return
    const update = () => setContentHeight(el.scrollHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={clsx(accordionContract.className, className)}
      data-state={open ? 'open' : 'closed'}
      id={rootId}
      {...contractAttrs(accordionContract, {
        open,
        disabled,
        'has-left-icon': hasLeftIcon,
      })}
      {...props}
    >
      <button
        type="button"
        className={contractPart(accordionContract, 'trigger')}
        onClick={() => setOpen(!open)}
        disabled={disabled}
        aria-expanded={open}
        aria-controls={panelId}
        id={triggerId}
      >
        {iconLeft != null && (
          <span
            className={contractPart(accordionContract, 'left-icon')}
            data-toggle={flipIcon || undefined}
          >
            {iconLeft}
          </span>
        )}
        <span className={contractPart(accordionContract, 'title')}>{title}</span>
        {iconRight != null && (
          <span className={contractPart(accordionContract, 'right-icon')} data-toggle>
            {iconRight}
          </span>
        )}
      </button>
      <div
        id={panelId}
        // region — только по запросу: десятки аккордеонов не должны плодить ориентиры
        role={region ? 'region' : undefined}
        aria-labelledby={region ? triggerId : undefined}
        // Закрытая панель вне порядка Tab и дерева доступности; высота 0 и анимация — как раньше
        inert={open ? undefined : INERT}
        className={contractPart(accordionContract, 'content')}
        data-state={open ? 'open' : 'closed'}
        style={{ height: open ? contentHeight : 0 }}
      >
        <div ref={innerRef} className={contractPart(accordionContract, 'content-inner')}>
          {children}
        </div>
      </div>
    </div>
  )
})

Accordion.displayName = 'Accordion'
