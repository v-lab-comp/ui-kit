import type { ReactNode } from 'react'
import type { ModalProps } from '../../Modal.types'
import type { ConfirmModalColor } from '../ModalFooter/ModalFooter.types'

export type ConfirmModalProps = Omit<ModalProps, 'children' | 'ariaLabel'> & {
  /** Заголовок модала */
  title: string

  /** Подзаголовок (опционально) */
  subtitle?: string

  /** Контент модала (опционально) */
  children?: ReactNode

  /** Callback при подтверждении (может быть async) */
  onConfirm: () => void | Promise<void>

  /** Callback при отмене (опционально) */
  onCancel?: () => void

  /** Текст кнопки подтверждения */
  confirmText?: string

  /** Текст кнопки отмены */
  cancelText?: string

  /** Цвет кнопки подтверждения */
  confirmColor?: ConfirmModalColor

  /** true если это деструктивное действие (Delete, Remove) */
  isDestructive?: boolean

  /** Callback on onConfirm() rejection. If provided, error is caught; otherwise re-thrown */
  onError?: (error: unknown) => void
}
