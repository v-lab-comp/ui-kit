import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
  it('show-password toggle is in the tab order and exposes state via aria-pressed', async () => {
    const user = userEvent.setup()
    render(<PasswordInput label="Password" />)
    const input = screen.getByLabelText('Password')
    const toggle = screen.getByRole('button', { name: 'Show password' })
    expect(toggle).toHaveAttribute('aria-controls', input.id)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await user.click(input)
    await user.tab()
    expect(toggle).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(input).toHaveAttribute('type', 'text')
  })
})
