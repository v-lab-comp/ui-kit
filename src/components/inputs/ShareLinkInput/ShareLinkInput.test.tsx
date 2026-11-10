import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ShareLinkInput } from './ShareLinkInput'

describe('ShareLinkInput', () => {
  it('copy button is reachable by Tab and calls onCopied with the value', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    const onCopied = vi.fn()
    render(<ShareLinkInput label="Link" value="https://x.dev" readOnly onCopied={onCopied} />)

    await user.click(screen.getByLabelText('Link'))
    await user.tab()
    const button = screen.getByRole('button', { name: 'Copy link' })
    expect(button).toHaveFocus()
    await user.keyboard('{Enter}')

    await waitFor(() => expect(onCopied).toHaveBeenCalledWith('https://x.dev'))
    expect(writeText).toHaveBeenCalledWith('https://x.dev')
    expect(screen.getByText('Copied!')).toHaveAttribute('aria-live', 'polite')
  })

  it('passes native onCopy to the input', () => {
    const onCopy = vi.fn()
    render(<ShareLinkInput label="Link" defaultValue="https://x.dev" onCopy={onCopy} />)
    fireEvent.copy(screen.getByLabelText('Link'))
    expect(onCopy).toHaveBeenCalledWith(expect.objectContaining({ type: 'copy' }))
  })
})
