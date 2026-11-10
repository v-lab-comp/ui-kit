import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Toast } from './ui/Toast'
import { ToastProvider } from './ToastProvider'
import { useToast } from './hooks/useToast'
import type { ToastColor } from './Toast.types'

beforeEach(() => {
  // jsdom без matchMedia: провайдер читает (hover: hover)
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: true, media: query }))
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    }
  )
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

function Trigger({ color }: { color: ToastColor }) {
  const toast = useToast()
  return (
    <button type="button" onClick={() => toast.add(color, { title: `Тост ${color}` })}>
      add {color}
    </button>
  )
}

describe('Toast / ToastProvider', () => {
  it('одна озвучка: status для info/success, alert для error; без live-области у контейнера', () => {
    const { rerender } = render(<Toast color="success" title="Ок" />)
    expect(screen.getByRole('status')).toHaveTextContent('Ок')
    rerender(<Toast color="error" title="Сбой" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Сбой')

    render(
      <ToastProvider>
        <span />
      </ToastProvider>
    )
    expect(screen.getByRole('region')).not.toHaveAttribute('aria-live')
  })

  it('автозакрытие стоит на паузе, пока фокус внутри области тостов', () => {
    vi.useFakeTimers()
    render(
      <ToastProvider duration={1000} pauseOnHover={false}>
        <Trigger color="info" />
      </ToastProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'add info' }))
    const close = screen.getByRole('button', { name: 'Close' })

    act(() => close.focus())
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByText('Тост info')).toBeInTheDocument()

    act(() => close.blur())
    act(() => {
      vi.advanceTimersByTime(1500)
    })
    expect(screen.queryByText('Тост info')).not.toBeInTheDocument()
  })
})
