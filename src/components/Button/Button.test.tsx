import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies primary variant class by default', () => {
    render(<Button>Btn</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'filled')
  })

  it('applies stroke variant class', () => {
    render(<Button variant="stroke">Btn</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'stroke')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Click
      </Button>
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards extra props to button element', () => {
    render(<Button aria-label="custom label">Btn</Button>)
    expect(screen.getByRole('button', { name: 'custom label' })).toBeInTheDocument()
  })
})
