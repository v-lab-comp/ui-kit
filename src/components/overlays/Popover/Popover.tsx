import { forwardRef, useLayoutEffect } from 'react'
import {
  useFloating,
  useDismiss,
  useInteractions,
  useRole,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  FloatingPortal,
} from '@floating-ui/react'
import clsx from 'clsx'
import { contractAttrs } from '@/theme/contract'
import { popoverContract } from '@/theme/contracts/popover'
import { useMergeRefs } from '@/utils/useMergeRefs'
import type { PopoverProps } from './Popover.types'

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      open,
      onOpenChange,
      dismissible = true,
      role,
      anchorRef,
      placement = 'bottom',
      offset = 6,
      children,
      className,
      style,
      zIndex,
      ...rest
    },
    ref
  ) => {
    const {
      refs,
      floatingStyles,
      context,
      placement: finalPlacement,
    } = useFloating({
      open,
      onOpenChange: (next) => onOpenChange?.(next),
      placement,
      strategy: 'fixed',
      middleware: [offsetMiddleware(offset), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
    })

    // Escape и клик снаружи закрывают слой через onOpenChange(false); без onOpenChange закрывать нечем
    const dismiss = useDismiss(context, { enabled: dismissible && onOpenChange !== undefined })
    const roleInteraction = useRole(context, {
      role: role ?? 'dialog',
      enabled: role !== undefined,
    })
    const { getFloatingProps } = useInteractions([dismiss, roleInteraction])

    /* После коммита DOM — без чтения anchorRef.current во время render (eslint react-hooks/refs). */
    useLayoutEffect(() => {
      if (open) {
        refs.setReference(anchorRef.current)
      }
    }, [open, anchorRef, refs])

    const floatingRef = useMergeRefs<HTMLDivElement>([refs.setFloating, ref])

    if (!open) return null

    return (
      <FloatingPortal>
        <div
          ref={floatingRef}
          {...getFloatingProps(rest)}
          className={clsx(popoverContract.className, className)}
          {...contractAttrs(popoverContract, {})}
          data-placement={finalPlacement}
          style={{
            ...floatingStyles,
            ...(zIndex !== undefined ? { zIndex } : {}),
            ...style,
          }}
        >
          {children}
        </div>
      </FloatingPortal>
    )
  }
)

Popover.displayName = 'Popover'
