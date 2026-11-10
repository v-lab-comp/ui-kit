import type { ReactNode } from 'react'

export const CONFIRM_MODAL_COLORS = ['primary', 'error', 'success'] as const
export type ConfirmModalColor = (typeof CONFIRM_MODAL_COLORS)[number]

/** Базовый футер: слева опционально `startContent`, справа любые кнопки через `children`. */
export type ModalFooterProps = {
  /** Слот слева (чекбокс, ссылка, текст и т.д.) */
  startContent?: ReactNode
  /** Кнопки справа — сколько угодно (`Button` и др.) */
  children?: ReactNode
  /** Растянуть кнопки по ширине футера поровну */
  fullWidth?: boolean
  className?: string
}

/** Готовая пара «отмена / основное действие» для Confirm и похожих модалок. */
export type ModalFooterConfirmActionsProps = {
  cancelText?: string
  confirmText?: string
  confirmColor?: ConfirmModalColor
  loading?: boolean
  disabled?: boolean
  onCancel: () => void
  onConfirm: () => void
}
