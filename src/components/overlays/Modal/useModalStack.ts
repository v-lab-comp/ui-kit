import { createContext, useContext } from 'react'

export type ModalStackContextValue = {
  register: (id: string) => number // returns z-index for this modal
  unregister: (id: string) => void
  count: number
  /** z-index нижнего слоя: оверлей на позиции i получает baseZIndex + (i + 1) * 100 */
  baseZIndex: number
  /** Порядок открытых модалок (снизу вверх). Нужен, чтобы только верхняя реагировала на Escape / outsidePress. */
  stackIds: string[]
}

const ModalStackContext = createContext<ModalStackContextValue | null>(null)

export function useModalStack() {
  return useContext(ModalStackContext)
}

export { ModalStackContext }
