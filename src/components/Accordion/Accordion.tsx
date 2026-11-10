import { useState, useId, useRef, useLayoutEffect } from 'react'
import clsx from 'clsx'
import { RiAddLine, RiSubtractLine } from '@remixicon/react'
import { contractAttrs, contractPart } from '@/theme/contract'
import { accordionContract } from '@/theme/contracts/accordion'
import type { AccordionProps } from './Accordion.types'

export function Accordion({
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
  ...props
}: AccordionProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  function handleToggle() {
    const next = !open
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  const fallbackId = useId()
  const rootId = propsId ?? fallbackId
  const triggerId = `${rootId}-trigger`
  const panelId = `${rootId}-panel`

  const ExpandIcon = open ? RiSubtractLine : RiAddLine
  const iconLeft = flipIcon ? (
    <ExpandIcon className={contractPart(accordionContract, 'toggle-icon')} size={20} aria-hidden />
  ) : (
    leftIcon
  )
  const iconRight = flipIcon ? null : (
    <ExpandIcon className={contractPart(accordionContract, 'toggle-icon')} size={20} aria-hidden />
  )

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
        onClick={handleToggle}
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
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
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
}

Accordion.displayName = 'Accordion'
