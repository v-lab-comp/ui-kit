import { forwardRef, useLayoutEffect } from 'react'
import {
  useFloating,
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
    { open, anchorRef, placement = 'bottom', offset = 6, children, className, style, zIndex },
    ref
  ) => {
    const { refs, floatingStyles } = useFloating({
      open,
      placement,
      strategy: 'fixed',
      middleware: [offsetMiddleware(offset), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
    })

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
          className={clsx(popoverContract.className, className)}
          {...contractAttrs(popoverContract, {})}
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
