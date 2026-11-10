import type {
  DialogHeaderCloseOnlyProps,
  DialogHeaderDefaultProps,
  DialogHeaderProps,
} from '../../dialog/DialogHeader'

/** Обычная шапка: заголовок (Label/Small), подзаголовок (Paragraph/X Small), иконка 40×40 слева */
export type ModalHeaderDefaultProps = DialogHeaderDefaultProps

/** Только кнопка закрытия — заголовок в `ModalBody` (см. `useModalContext().titleId`) */
export type ModalHeaderCloseOnlyProps = DialogHeaderCloseOnlyProps

export type ModalHeaderProps = DialogHeaderProps
