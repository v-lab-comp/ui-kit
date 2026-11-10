import { createContext } from 'react'
import type { ReactNode } from 'react'
import type { ToastColor, ToastVariant, ToastSize, ToastActionElement } from './Toast.types'

export interface ToastAddOptions {
  title: ReactNode
  description?: ReactNode
  variant?: ToastVariant
  /** x-small | small — компактный вид без описания, одна кнопка в строку; large — по умолчанию */
  size?: ToastSize
  actions?: ToastActionElement[]
  icon?: ReactNode
  /** Переопределение duration для этого тоста (ms). 0 = не закрывать. */
  duration?: number
}

export interface ToastContextValue {
  add: (color: ToastColor, options: ToastAddOptions) => number
  dismiss: (id: number) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
