import { useRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Popover } from './Popover'
import type { PopoverProps } from './Popover.types'

function Demo(props: Partial<PopoverProps>) {
  const anchorRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <button ref={anchorRef}>anchor</button>
      <button>outside</button>
      <Popover open anchorRef={anchorRef} {...props}>
        content
      </Popover>
    </>
  )
}

describe('Popover', () => {
  it('closes on Escape and outside press via onOpenChange', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<Demo onOpenChange={onOpenChange} />)
    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    onOpenChange.mockClear()
    await user.click(screen.getByText('outside'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('dismissible={false} disables dismiss', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<Demo onOpenChange={onOpenChange} dismissible={false} />)
    await user.keyboard('{Escape}')
    await user.click(screen.getByText('outside'))
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('applies role and exposes data-placement', () => {
    render(<Demo role="dialog" aria-label="Info" placement="top" />)
    const dialog = screen.getByRole('dialog', { name: 'Info' })
    expect(dialog).toHaveAttribute('data-placement', 'top')
  })
})
