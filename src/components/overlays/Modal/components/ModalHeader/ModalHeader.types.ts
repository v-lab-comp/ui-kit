import type { ReactNode } from 'react'

type ModalHeaderBase = {
  hideCloseButton?: boolean
}

/** Обычная шапка: заголовок, опционально подзаголовок и иконка 40×40 слева */
export type ModalHeaderDefaultProps = ModalHeaderBase & {
  closeOnly?: false
  /** Label/Small */
  title: ReactNode
  /** Paragraph/X Small */
  subtitle?: ReactNode
  /** Слот 40×40 слева (иконка или статус-круг) */
  icon?: ReactNode
}

/** Только кнопка закрытия — заголовок в `ModalBody` (см. `useModalContext().titleId`) */
export type ModalHeaderCloseOnlyProps = ModalHeaderBase & {
  closeOnly: true
  title?: never
  subtitle?: never
  icon?: never
}

export type ModalHeaderProps = ModalHeaderDefaultProps | ModalHeaderCloseOnlyProps
