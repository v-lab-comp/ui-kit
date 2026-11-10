import { act, fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BaseInput } from './BaseInput'

afterEach(() => {
  vi.useRealTimers()
})

const resetForm = (input: HTMLInputElement) => {
  act(() => {
    input.form!.reset()
    vi.runAllTimers()
  })
}

describe('BaseInput', () => {
  it('forwards the ref to the <input>', () => {
    const ref = createRef<HTMLInputElement>()
    render(<BaseInput ref={ref} aria-label="field" />)
    expect(ref.current).toBe(screen.getByLabelText('field'))
  })

  it('drops data-filled when the form is reset (uncontrolled)', () => {
    vi.useFakeTimers()
    render(
      <form>
        <BaseInput aria-label="field" />
      </form>
    )
    const input = screen.getByLabelText<HTMLInputElement>('field')
    fireEvent.input(input, { target: { value: 'abc' } })
    expect(input).toHaveAttribute('data-filled')

    resetForm(input)
    expect(input.value).toBe('')
    expect(input).not.toHaveAttribute('data-filled')
  })

  it('restores data-filled when reset brings defaultValue back', () => {
    vi.useFakeTimers()
    render(
      <form>
        <BaseInput aria-label="field" defaultValue="x" />
      </form>
    )
    const input = screen.getByLabelText<HTMLInputElement>('field')
    fireEvent.input(input, { target: { value: '' } })
    expect(input).not.toHaveAttribute('data-filled')

    resetForm(input)
    expect(input.value).toBe('x')
    expect(input).toHaveAttribute('data-filled')
  })
})
