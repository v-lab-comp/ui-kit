import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react'
import { toastContract } from '@/theme/contracts/toast'
import { toastProviderContract } from '@/theme/contracts/toast-provider'

export const TOAST_COLOR_OPTIONS = ['error', 'warning', 'success', 'info', 'neutral'] as const
export type ToastColor = (typeof TOAST_COLOR_OPTIONS)[number]

export const TOAST_VARIANT_OPTIONS = toastContract.attributes.variant
export type ToastVariant = (typeof TOAST_VARIANT_OPTIONS)[number]

export const TOAST_POSITION_OPTIONS = toastProviderContract.attributes.position
export type ToastPosition = (typeof TOAST_POSITION_OPTIONS)[number]

/** X-Small 32px, Small 36px — без описания, одна кнопка в одну строку с заголовком. Large — описание и кнопки снизу. */
export const TOAST_SIZE_OPTIONS = toastContract.attributes.size
export type ToastSize = (typeof TOAST_SIZE_OPTIONS)[number]

export interface ToastConfig {
  position?: ToastPosition
  /** Время до автоматического закрытия (ms). 0 = не закрывать. */
  duration?: number
  /** Отступ от края экрана (px) */
  offset?: number
  /** Расстояние между тостами (px) */
  gap?: number
  /** Максимальное количество видимых тостов */
  maxToasts?: number
  /** Пауза авто-dismiss при наведении */
  pauseOnHover?: boolean
  /** Собирать тосты в стопку (раскрываются при наведении). По умолчанию true. */
  stacking?: boolean
}

export interface ToastActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

/**
 * Phantom brand — уникальный символ только для типовой проверки, не существует в рантайме.
 * Делает ToastActionElement номинальным типом: TypeScript не допустит туда
 * произвольные элементы (<div>, <span>, строки и т.д.) — только <ToastAction>.
 */
declare const _toastActionBrand: unique symbol

/**
 * Тип элемента <ToastAction>.
 * Передавай только <ToastAction> в проп `actions` — другие элементы не пройдут типовую проверку.
 */
export type ToastActionElement = ReactElement<ToastActionProps> & {
  readonly [_toastActionBrand]?: never
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: ToastVariant
  color?: ToastColor
  /** x-small (32px) / small (36px) — одна строка, без описания, одна кнопка рядом с заголовком; large — как сейчас */
  size?: ToastSize
  title: ReactNode
  /** Дополнительный текст под заголовком */
  description?: ReactNode
  /**
   * Кнопки действий — только элементы `<ToastAction>`.
   * Разделитель «·» и перенос строки добавляются автоматически.
   * @example
   * actions={[
   *   <ToastAction key="1" onClick={upgrade}>Upgrade</ToastAction>,
   *   <ToastAction key="2" onClick={learnMore}>Learn More</ToastAction>,
   * ]}
   */
  actions?: ToastActionElement[]
  onClose?: () => void
  /** Своя иконка слева; по умолчанию — иконка по варианту */
  icon?: ReactNode
}
