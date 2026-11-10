import { createRef } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { CommentRichInput } from './CommentRichInput'

// jsdom не реализует execCommand — проверяем вызов команды
beforeAll(() => {
  document.execCommand = vi.fn(() => true)
  document.queryCommandState = vi.fn(() => false)
})

describe('CommentRichInput', () => {
  it('forwards ref to the editable textbox', () => {
    const ref = createRef<HTMLDivElement>()
    render(<CommentRichInput ref={ref} onSend={() => {}} placeholder="Write a comment" />)
    expect(ref.current).toBe(screen.getByRole('textbox'))
  })

  it('names the textbox by placeholder (or ariaLabels.input) and exposes state', () => {
    const { rerender } = render(
      <CommentRichInput onSend={() => {}} placeholder="Write a comment" maxLength={10} disabled />
    )
    const editor = screen.getByRole('textbox', { name: 'Write a comment' })
    expect(editor).toHaveAttribute('aria-disabled', 'true')
    expect(editor).toHaveAccessibleDescription('0/10')
    expect(screen.getByText('0/10')).not.toHaveAttribute('aria-live')

    rerender(
      <CommentRichInput onSend={() => {}} placeholder="Write" ariaLabels={{ input: 'Comment' }} />
    )
    expect(screen.getByRole('textbox', { name: 'Comment' })).toBeInTheDocument()
  })

  it('toolbar buttons work from the keyboard with roving focus', async () => {
    const user = userEvent.setup()
    render(<CommentRichInput onSend={() => {}} placeholder="Write" />)
    expect(screen.getByRole('toolbar')).toBeInTheDocument()
    const bold = screen.getByRole('button', { name: 'Bold' })
    const italic = screen.getByRole('button', { name: 'Italic' })
    expect(italic).toHaveAttribute('tabindex', '-1')

    act(() => bold.focus())
    await user.keyboard('{ArrowRight}')
    expect(italic).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(document.execCommand).toHaveBeenCalledWith('italic', false)

    fireEvent.click(screen.getByRole('button', { name: 'Align text' }))
    expect(document.execCommand).toHaveBeenCalledWith('justifyLeft', false)
  })

  it('keeps data-active only for applied formats, not for the roving item', () => {
    vi.mocked(document.queryCommandState).mockImplementation((cmd) => cmd === 'italic')
    render(<CommentRichInput onSend={() => {}} placeholder="Write" />)
    fireEvent.click(screen.getByRole('button', { name: 'Bold' }))
    expect(screen.getByRole('button', { name: 'Bold' })).not.toHaveAttribute('data-active')
    expect(screen.getByRole('button', { name: 'Italic' })).toHaveAttribute('data-active')
    expect(screen.getByRole('button', { name: 'Italic' })).toHaveAttribute('aria-pressed', 'true')
    vi.mocked(document.queryCommandState).mockImplementation(() => false)
  })
})
