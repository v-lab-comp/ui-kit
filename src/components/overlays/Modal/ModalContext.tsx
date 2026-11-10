import { createContext, useContext } from 'react'

export type ModalContextValue = {
  titleId: string
  onClose: () => void
}

export const ModalContext = createContext<ModalContextValue | null>(null)

export function useModalContext() {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error(
      'Компоненты ModalHeader и связанные с модалкой должны рендериться внутри Modal.'
    )
  }
  return ctx
}
