import {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
  type Ref,
} from 'react'
import { useDismiss, useFloating, useInteractions, useTransitionStatus } from '@floating-ui/react'
import { lockBodyScroll } from '@/utils/scrollLock'
import { useControllableState } from '@/utils/useControllableState'
import { useModalStack } from '../useModalStack'
import type { DialogContextValue, DialogPart } from './DialogContext'

export type OverlayDialogRole = 'dialog' | 'alertdialog'

export type OverlayDialogHandle = {
  open: () => void
  close: () => void
}

export type UseOverlayDialogParams = {
  /** Контролируемое состояние; `undefined` — неконтролируемый режим (через ref) */
  open: boolean | undefined
  onOpenChange?: (open: boolean) => void
  closeOnBackdropClick: boolean
  /** Явное доступное имя; иначе имя берётся из зарегистрированного заголовка */
  ariaLabel?: string
  role?: OverlayDialogRole
  /** Длительность анимации выхода (useTransitionStatus) */
  animationDuration: number
  /** ref компонента — получает { open, close } */
  handleRef: Ref<OverlayDialogHandle>
}

type PartCounts = Record<DialogPart, number>

const isDev = process.env.NODE_ENV !== 'production'

/**
 * Общая логика модальных оверлеев (Modal, Drawer): состояние открытия, регистрация в стеке
 * ModalProvider, блокировка прокрутки, закрытие по Escape / клику снаружи (только верхний
 * оверлей), доступное имя и описание. Все эффекты снимаются при размонтировании открытого
 * оверлея — стек и блокировка прокрутки не «утекают».
 */
export function useOverlayDialog({
  open,
  onOpenChange,
  closeOnBackdropClick,
  ariaLabel,
  role = 'dialog',
  animationDuration,
  handleRef,
}: UseOverlayDialogParams) {
  const titleId = useId()
  const descriptionId = `${titleId}-description`
  const stack = useModalStack()
  const register = stack?.register
  const unregister = stack?.unregister

  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: false,
    onChange: onOpenChange,
  })
  const openDialog = useCallback(() => setOpen(true), [setOpen])
  const closeDialog = useCallback(() => setOpen(false), [setOpen])
  useImperativeHandle(handleRef, () => ({ open: openDialog, close: closeDialog }), [
    openDialog,
    closeDialog,
  ])

  // Регистрация в стеке до paint — чтобы isTop и useDismiss были согласованы.
  // register / unregister стабильны, поэтому эффект не перезапускается при смене стека.
  useLayoutEffect(() => {
    if (!isOpen || !register || !unregister) return
    register(titleId)
    return () => unregister(titleId)
  }, [isOpen, register, unregister, titleId])

  // Блокировка прокрутки со счётчиком ссылок — снимается и при закрытии, и при размонтировании
  useEffect(() => {
    if (!isOpen) return
    return lockBodyScroll()
  }, [isOpen])

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (next) => {
      if (!next) closeDialog()
    },
  })

  /** Без стека оверлей всегда верхний. Со стеком на Escape / клик снаружи реагирует только
   * верхний, иначе клик по верхней панели считался бы «снаружи» нижних и закрывал все. */
  const stackIds = stack?.stackIds
  const isTop = !stackIds || stackIds[stackIds.length - 1] === titleId
  const stackIndex = stackIds?.indexOf(titleId) ?? -1
  const stackZIndex = stack && stackIndex >= 0 ? stack.baseZIndex + (stackIndex + 1) * 100 : null

  const dismiss = useDismiss(context, {
    escapeKey: isTop,
    outsidePress: closeOnBackdropClick && isTop,
    outsidePressEvent: 'pointerdown',
  })
  const { getFloatingProps } = useInteractions([dismiss])

  const { isMounted, status } = useTransitionStatus(context, { duration: animationDuration })

  // Имя / описание: части регистрируются через контекст, произвольная разметка
  // с titleId / descriptionId находится в DOM при монтировании панели.
  const [partCounts, setPartCounts] = useState<PartCounts>({ title: 0, description: 0 })
  const [domParts, setDomParts] = useState<Record<DialogPart, boolean>>({
    title: false,
    description: false,
  })
  const registerPart = useCallback((part: DialogPart) => {
    setPartCounts((prev) => ({ ...prev, [part]: prev[part] + 1 }))
    return () => {
      setPartCounts((prev) => ({ ...prev, [part]: prev[part] - 1 }))
      // Найденный при монтировании элемент — это и была ушедшая часть
      setDomParts((prev) => (prev[part] ? { ...prev, [part]: false } : prev))
    }
  }, [])

  const setFloating = refs.setFloating
  const panelRef = useCallback(
    (node: HTMLElement | null) => {
      setFloating(node)
      if (!node) return
      const doc = node.ownerDocument
      const title = node.contains(doc.getElementById(titleId))
      const description = node.contains(doc.getElementById(descriptionId))
      setDomParts((prev) =>
        prev.title === title && prev.description === description ? prev : { title, description }
      )
      if (isDev && !ariaLabel && !title) {
        console.warn(
          'Диалог без доступного имени: добавьте заголовок (ModalHeader / DrawerHeader) или ariaLabel.'
        )
      }
    },
    [setFloating, titleId, descriptionId, ariaLabel]
  )

  const hasTitle = partCounts.title > 0 || domParts.title
  const hasDescription = partCounts.description > 0 || domParts.description

  const getPanelProps = () =>
    getFloatingProps({
      role,
      'aria-modal': true,
      ...(ariaLabel
        ? { 'aria-label': ariaLabel }
        : hasTitle
          ? { 'aria-labelledby': titleId }
          : undefined),
      ...(hasDescription ? { 'aria-describedby': descriptionId } : undefined),
      tabIndex: -1,
    })

  const contextValue = useMemo<DialogContextValue>(
    () => ({ titleId, descriptionId, onClose: closeDialog, registerPart }),
    [titleId, descriptionId, closeDialog, registerPart]
  )

  return {
    isOpen,
    isMounted,
    status,
    stackZIndex,
    context,
    panelRef,
    getPanelProps,
    contextValue,
  }
}
