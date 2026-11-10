import { useLayoutEffect, useState, type RefObject } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react'

/**
 * Попап календаря DateInput: позиционирование, роль dialog, закрытие по Escape / клику вне.
 * `focusInside` — открыт с клавиатуры или кнопкой: фокус уходит в календарь (модальный диалог);
 * открыт кликом по полю — фокус остаётся в поле, чтобы можно было печатать.
 */
export function useCalendarPopover(anchorRef: RefObject<HTMLElement | null>, disabled?: boolean) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusInside, setFocusInside] = useState(false)

  // flip (если снизу не помещается) + shift (держит в пределах вьюпорта по горизонтали).
  // Портал в body, поэтому не обрезается контейнерами со скроллом.
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    strategy: 'fixed',
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  })

  // Клик вне учитывает порталённый календарь как «свой»; Escape закрывает.
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role])

  useLayoutEffect(() => {
    if (isOpen) refs.setReference(anchorRef.current)
  }, [isOpen, refs, anchorRef])

  const open = (withFocus: boolean) => {
    if (disabled) return
    setFocusInside(withFocus)
    setIsOpen(true)
  }

  const toggle = () => {
    if (isOpen) setIsOpen(false)
    else open(true)
  }

  return {
    isOpen,
    focusInside,
    open,
    toggle,
    close: () => setIsOpen(false),
    context,
    floatingStyles,
    setFloating: refs.setFloating,
    /** aria-haspopup / aria-expanded / aria-controls — на кнопку календаря. */
    getToggleProps: getReferenceProps,
    getFloatingProps,
  }
}
