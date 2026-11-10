import { act, fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Tooltip } from './Tooltip'

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('Tooltip', () => {
  it('keeps the child ref and opens on hover', () => {
    vi.useFakeTimers()
    const consoleError = vi.spyOn(console, 'error')
    const ref = createRef<HTMLButtonElement>()

    render(
      <Tooltip content="Подсказка" delay={0}>
        <button ref={ref} type="button">
          Кнопка
        </button>
      </Tooltip>
    )

    const button = screen.getByRole('button', { name: 'Кнопка' })
    // ref ребёнка доходит до DOM-узла — и в React 18 (element.ref), и в 19 (props.ref)
    expect(ref.current).toBe(button)

    fireEvent.mouseEnter(button)
    act(() => {
      vi.runAllTimers()
    })
    expect(screen.getByText('Подсказка')).toBeInTheDocument()

    // React 19 предупреждает при чтении element.ref; Tooltip его не читает
    const refWarnings = consoleError.mock.calls.filter((args) =>
      String(args[0]).includes('element.ref')
    )
    expect(refWarnings).toEqual([])
  })
})
