import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react'
import clsx from 'clsx'
import { contractAttrs, contractPart } from '@/theme/contract'
import { modalContract } from '@/theme/contracts/modal'
import { uiKitRootContract } from '@/theme/contracts/ui-kit-root'
import { formatSize } from '@/utils/formatSize'
import { setBodyScrollLocked } from '@/utils/scrollLock'
import { MODAL_SIZES } from './Modal.constants'
import { ModalContext } from './ModalContext'
import { useModalStack } from './useModalStack'
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
    },
    ref
  ) => {
    const titleId = useId()
    const modalStackRef = useRef<string | null>(null)
    const stack = useModalStack()
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const [currentZIndex, setCurrentZIndex] = useState<number | null>(null)

    // Controlled/uncontrolled pattern from Accordion
    const isControlled = controlledOpen !== undefined
    const openState = isControlled ? controlledOpen : uncontrolledOpen

    // Регистрация в стеке до paint — чтобы isTopModal и useDismiss были согласованы
    useLayoutEffect(() => {
      if (!stack) return

      if (!openState) {
        if (modalStackRef.current) {
          stack.unregister(modalStackRef.current)
          modalStackRef.current = null
        }
        setCurrentZIndex(null)
        return
      }

      if (!modalStackRef.current) {
        const id = titleId
        modalStackRef.current = id
        const zIndex = stack.register(id)
        setCurrentZIndex(zIndex)
      }
    }, [openState, stack, titleId])

    // Effect: Manual scroll lock when no ModalProvider
    useEffect(() => {
      if (stack) return
      setBodyScrollLocked(openState)
    }, [openState, stack])

    const closeModal = useCallback(() => {
      if (!isControlled) setUncontrolledOpen(false)
      onOpenChange?.(false)
    }, [isControlled, onOpenChange])

    const openModal = useCallback(() => {
      if (!isControlled) setUncontrolledOpen(true)
      onOpenChange?.(true)
    }, [isControlled, onOpenChange])

    useImperativeHandle(
      ref,
      () => ({
        open: openModal,
        close: closeModal,
      }),
      [openModal, closeModal]
    )

    const { refs, context } = useFloating({
      open: openState,
      onOpenChange: (nextOpen) => {
        if (!nextOpen) closeModal()
      },
    })

    /** Без ModalProvider — как одна модалка. Со стеком: только верхняя ловит Escape/outsidePress,
     * иначе клик по верхней панели считается «снаружи» нижних floating-узлов и закрывает все. */
    const isTopModal = useMemo(() => {
      if (!stack) return true
      if (!openState) return false
      const ids = stack.stackIds
      return ids.length > 0 && ids[ids.length - 1] === titleId
    }, [stack, openState, titleId])

    const dismissOptions = useMemo(
      () => ({
        escapeKey: isTopModal,
        outsidePress: closeOnBackdropClick && isTopModal,
        outsidePressEvent: 'pointerdown' as const,
      }),
      [isTopModal, closeOnBackdropClick]
    )

    const dismiss = useDismiss(context, dismissOptions)

    const { getFloatingProps } = useInteractions([dismiss])

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

    const ariaAttrs = useMemo(
      () => (ariaLabel ? { 'aria-label': ariaLabel } : { 'aria-labelledby': titleId }),
      [ariaLabel, titleId]
    )

    if (!openState || typeof document === 'undefined') return null

    const floatingProps = getFloatingProps({
      role: 'dialog',
      'aria-modal': true,
      ...ariaAttrs,
      tabIndex: -1,
    })

    return (
      <FloatingPortal>
        <ModalContext.Provider value={{ titleId, onClose: closeModal }}>
          <div
            className={clsx(modalContract.className, className)}
            {...contractAttrs(modalContract, {})}
            style={{ ...style, zIndex: currentZIndex ?? zIndex }}
            role="presentation"
          >
            <div
              className={contractPart(modalContract, 'backdrop')}
              aria-hidden
              onClick={(e) => {
                if (closeOnBackdropClick) {
                  e.stopPropagation()
                  closeModal()
                }
              }}
            />
            <div
              className={contractPart(modalContract, 'center')}
              onClick={(e) => e.stopPropagation()}
            >
              <FloatingFocusManager context={context} returnFocus>
                <div
                  // eslint-disable-next-line react-hooks/refs -- setFloating ref from useFloating (same as Tooltip)
                  ref={refs.setFloating}
                  className={clsx(
                    contractPart(modalContract, 'panel'),
                    uiKitRootContract.className,
                    panelClassName
                  )}
                  style={panelStyle}
                  data-animation={animation}
                  onClick={(e) => e.stopPropagation()}
                  {...floatingProps}
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
