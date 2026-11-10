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
  useTransitionStatus,
} from '@floating-ui/react'
import clsx from 'clsx'
import { setBodyScrollLocked } from '@/utils/scrollLock'
import { formatSize } from '@/utils/formatSize'
import { useModalStack } from '@/components/overlays/Modal/useModalStack'
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
  const titleId = useId()
  const stack = useModalStack()
  const stackIdRef = useRef<string | null>(null)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const [stackZIndex, setStackZIndex] = useState<number | null>(null)

  const isControlled = controlledOpen !== undefined
  const openState = isControlled ? controlledOpen! : uncontrolledOpen

  // Регистрация в общем стеке оверлеев (разделяется с Modal через ModalProvider)
  useLayoutEffect(() => {
    if (!stack) return

    if (!openState) {
      if (stackIdRef.current) {
        stack.unregister(stackIdRef.current)
        stackIdRef.current = null
      }
      setStackZIndex(null)
      return
    }

    if (!stackIdRef.current) {
      stackIdRef.current = titleId
      setStackZIndex(stack.register(titleId))
    }
  }, [openState, stack, titleId])

  // Скролл-лок — только если нет ModalProvider (иначе им управляет провайдер)
  useEffect(() => {
    if (stack) return
    setBodyScrollLocked(openState)
  }, [openState, stack])

  const closeDrawer = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false)
    onOpenChange?.(false)
  }, [isControlled, onOpenChange])

  const openDrawer = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(true)
    onOpenChange?.(true)
  }, [isControlled, onOpenChange])

  useImperativeHandle(ref, () => ({ open: openDrawer, close: closeDrawer }), [
    openDrawer,
    closeDrawer,
  ])

  const { refs, context } = useFloating({
    open: openState,
    onOpenChange: (next) => {
      if (!next) closeDrawer()
    },
  })

  /** Без стека — Drawer всегда «верхний». Со стеком — только верхний реагирует
   * на Escape / outsidePress, иначе клик по верхней панели закрыл бы нижние. */
  const isTop = useMemo(() => {
    if (!stack) return true
    if (!openState) return false
    const ids = stack.stackIds
    return ids.length > 0 && ids[ids.length - 1] === titleId
  }, [stack, openState, titleId])

  const dismiss = useDismiss(context, {
    escapeKey: isTop,
    outsidePress: closeOnBackdropClick && isTop,
    outsidePressEvent: 'pointerdown',
  })

  const { getFloatingProps } = useInteractions([dismiss])

  const { isMounted, status } = useTransitionStatus(context, {
    duration: animationDuration,
  })

  const ctxValue = useMemo(() => ({ titleId, onClose: closeDrawer }), [titleId, closeDrawer])

  if (!isMounted) return null

  const resolvedSize = width ?? DRAWER_SIZES[size]
  const panelStyle: CSSProperties = {
    '--drawer-size': formatSize(resolvedSize),
    '--drawer-animation-duration': `${animationDuration}ms`,
  } as CSSProperties

  const ariaAttrs = ariaLabel ? { 'aria-label': ariaLabel } : { 'aria-labelledby': titleId }

  return (
    <FloatingPortal>
      <DrawerContext.Provider value={ctxValue}>
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
              // eslint-disable-next-line react-hooks/refs -- setFloating is a stable callback ref from useFloating
              ref={refs.setFloating}
              {...getFloatingProps({
                role: 'dialog',
                'aria-modal': true,
                ...ariaAttrs,
                tabIndex: -1,
              })}
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
