import { useDialogContext, DialogContext, type DialogContextValue } from './dialog/DialogContext'

export type ModalContextValue = DialogContextValue

/** Контекст модалки — общий с Drawer (`DialogContext`), чтобы шапки и статус-блоки работали в обоих. */
export const ModalContext = DialogContext

export function useModalContext() {
  const ctx = useDialogContext()
  if (!ctx) {
    throw new Error(
      'Компоненты ModalHeader и связанные с модалкой должны рендериться внутри Modal.'
    )
  }
  return ctx
}
