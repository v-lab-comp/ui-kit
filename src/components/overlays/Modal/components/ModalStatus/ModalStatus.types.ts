import type { ReactNode } from 'react'
import type { ModalProps } from '../../Modal.types'

export type ModalStatusVariant = 'error' | 'warning' | 'info' | 'success'

export type ModalStatusLayout = 'left' | 'center'

export type ModalStatusProps = Omit<ModalProps, 'children' | 'ariaLabel'> & {
  variant: ModalStatusVariant
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  hideCloseButton?: boolean
  /**
   * `left` — иконка слева, текст в шапке (как в `ModalHeader`).
   * `center` — иконка сверху по центру, заголовок и описание по центру в теле (как в макете статусных модалок).
   */
  layout?: ModalStatusLayout
  /** Слот под `ModalFooter` (кнопки и контент слева в футере) */
  footer?: ReactNode
}
