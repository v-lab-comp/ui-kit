import { forwardRef, type CSSProperties } from 'react'
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import clsx from 'clsx'
import { formatSize } from '@/utils/formatSize'
import { useOverlayDialog } from '@/components/overlays/Modal/dialog/useOverlayDialog'
import { Box } from '../../Box'
import { DrawerContext } from './DrawerContext'
import { DRAWER_SIZES } from './Drawer.constants'
import { contractPart } from '@/theme/contract'
import { drawerContract } from '@/theme/contracts/drawer'
import type { DrawerHandle, DrawerProps } from './Drawer.types'

export const Drawer = forwardRef<DrawerHandle, DrawerProps>(function Drawer(
  {
    children,
    open: controlledOpen,
    onOpenChange,
    side = 'left',
    mobileBottom = true,
    size = 'md',
    width,
    closeOnBackdropClick = true,
    hideBackdrop = false,
    ariaLabel,
    animationDuration = 280,
    className,
    panelClassName,
    zIndex,
    style,
  },
  ref
) {
  const { isMounted, status, stackZIndex, context, panelRef, getPanelProps, contextValue } =
    useOverlayDialog({
      open: controlledOpen,
      onOpenChange,
      closeOnBackdropClick,
      ariaLabel,
      animationDuration,
      handleRef: ref,
    })

  if (!isMounted) return null

  const resolvedSize = width ?? DRAWER_SIZES[size]
  const panelStyle: CSSProperties = {
    '--drawer-size': formatSize(resolvedSize),
    '--drawer-animation-duration': `${animationDuration}ms`,
  } as CSSProperties

  return (
    <FloatingPortal>
      <DrawerContext.Provider value={contextValue}>
        <Box
          role="presentation"
          className={clsx(drawerContract.className, className)}
          style={{ ...style, zIndex: stackZIndex ?? zIndex }}
        >
          {!hideBackdrop && (
            <Box
              className={contractPart(drawerContract, 'backdrop')}
              data-status={status}
              aria-hidden
            />
          )}

          <FloatingFocusManager context={context} returnFocus modal>
            <Box
              ref={panelRef}
              {...getPanelProps()}
              data-side={side}
              data-mobile-bottom={mobileBottom ? 'true' : undefined}
              data-status={status}
              className={clsx(contractPart(drawerContract, 'panel'), panelClassName)}
              style={panelStyle}
            >
              {children}
            </Box>
          </FloatingFocusManager>
        </Box>
      </DrawerContext.Provider>
    </FloatingPortal>
  )
})

Drawer.displayName = 'Drawer'
