import type { ReactNode } from 'react'

export type ModalProviderProps = {
  /** React children to wrap with modal stack management */
  children: ReactNode
  /** Base z-index for modals. Each new modal gets baseZIndex + (index * 100). Default: 1000 */
  baseZIndex?: number
}
