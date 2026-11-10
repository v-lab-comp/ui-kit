import { fireEvent, render } from '@testing-library/react'
import { useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useClickOutside } from './useClickOutside'

type Props = { onClickOutside: (event: MouseEvent) => void; enabled?: boolean }

function Harness({ onClickOutside, enabled }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClickOutside, enabled)
  return (
    <div>
      <div ref={ref} data-testid="inside">
        inside
      </div>
      <div data-testid="outside">outside</div>
    </div>
  )
}

describe('useClickOutside', () => {
  it('calls the callback only for clicks outside the element', () => {
    const cb = vi.fn()
    const { getByTestId } = render(<Harness onClickOutside={cb} />)
    fireEvent.click(getByTestId('inside'))
    expect(cb).not.toHaveBeenCalled()
    fireEvent.click(getByTestId('outside'))
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('calls the latest callback after a rerender without re-subscribing', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const first = vi.fn()
    const second = vi.fn()
    const { getByTestId, rerender } = render(<Harness onClickOutside={first} />)
    const subscriptions = addSpy.mock.calls.filter(([type]) => type === 'click').length
    rerender(<Harness onClickOutside={second} />)
    expect(addSpy.mock.calls.filter(([type]) => type === 'click').length).toBe(subscriptions)
    fireEvent.click(getByTestId('outside'))
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
    addSpy.mockRestore()
  })

  it('does nothing while disabled', () => {
    const cb = vi.fn()
    const { getByTestId } = render(<Harness onClickOutside={cb} enabled={false} />)
    fireEvent.click(getByTestId('outside'))
    expect(cb).not.toHaveBeenCalled()
  })
})
