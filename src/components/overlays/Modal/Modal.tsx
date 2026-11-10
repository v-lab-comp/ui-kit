import { forwardRef, useMemo, type CSSProperties } from 'react'
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import clsx from 'clsx'
import { contractAttrs, contractPart } from '@/theme/contract'
import { modalContract } from '@/theme/contracts/modal'
import { uiKitRootContract } from '@/theme/contracts/ui-kit-root'
import { formatSize } from '@/utils/formatSize'
import { MODAL_SIZES } from './Modal.constants'
import { ModalContext } from './ModalContext'
import { useOverlayDialog } from './dialog/useOverlayDialog'
import type { ModalProps, ModalHandle } from './Modal.types'

export const Modal = forwardRef<ModalHandle, ModalProps>(
  (
    {
      children,
      width,
      maxHeight,
      closeOnBackdropClick = true,
      className,
      panelClassName,
      zIndex,
      style,
      ariaLabel,
      open: controlledOpen,
      onOpenChange,
      size,
      animation = 'scale',
      animationDuration = 280,
      role = 'dialog',
      initialFocus,
    },
    ref
  ) => {
    const { isOpen, stackZIndex, context, panelRef, getPanelProps, contextValue } =
      useOverlayDialog({
        open: controlledOpen,
        onOpenChange,
        closeOnBackdropClick,
        ariaLabel,
        role,
        animationDuration,
        handleRef: ref,
      })

    // Resolve width from explicit prop or size preset
    const sizePreset = size ? MODAL_SIZES[size] : undefined
    const resolvedWidth = width ?? sizePreset?.width
    const resolvedMaxWidth =
      sizePreset != null && 'maxWidth' in sizePreset ? sizePreset.maxWidth : undefined

    const formattedWidth = formatSize(resolvedWidth)
    const panelStyle: CSSProperties = useMemo(
      () => ({
        width: formattedWidth,
        maxWidth: resolvedMaxWidth ?? formattedWidth,
        minWidth: 0,
        maxHeight: formatSize(maxHeight),
        '--modal-animation-duration': `${animationDuration}ms`,
      }),
      [formattedWidth, resolvedMaxWidth, maxHeight, animationDuration]
    ) as CSSProperties

    if (!isOpen || typeof document === 'undefined') return null

    return (
      <FloatingPortal>
        <ModalContext.Provider value={contextValue}>
          <div
            className={clsx(modalContract.className, className)}
            {...contractAttrs(modalContract, {})}
            style={{ ...style, zIndex: stackZIndex ?? zIndex }}
            role="presentation"
          >
            <div className={contractPart(modalContract, 'backdrop')} aria-hidden />
            <div className={contractPart(modalContract, 'center')}>
              <FloatingFocusManager context={context} returnFocus initialFocus={initialFocus}>
                <div
                  ref={panelRef}
                  className={clsx(
                    contractPart(modalContract, 'panel'),
                    uiKitRootContract.className,
                    panelClassName
                  )}
                  style={panelStyle}
                  data-animation={animation}
                  {...getPanelProps()}
                >
                  {children}
                </div>
              </FloatingFocusManager>
            </div>
          </div>
        </ModalContext.Provider>
      </FloatingPortal>
    )
  }
)

Modal.displayName = 'Modal'
