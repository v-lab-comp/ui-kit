import { useContext } from 'react'
import { ToastContext } from '../ToastContext'
import type { ToastContextValue } from '../ToastContext'

/**
 * Доступ к API тостов из любого компонента внутри `<ToastProvider>`.
 *
 * @example
 * const toast = useToast()
 * toast.add('success', { title: 'Сохранено!' })
 * toast.dismiss(id)
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast() must be used inside <ToastProvider>')
  }
  return ctx
}
