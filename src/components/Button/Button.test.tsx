import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
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

  it('defaults to type="button" so it does not submit forms implicitly', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button>Btn</Button>
      </form>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
    await userEvent.click(button)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('keeps an explicit type="submit"', () => {
    render(<Button type="submit">Send</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  describe('icon-only', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('is named by aria-label', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      render(<Button leftNode={<svg />} aria-label="Добавить" />)
      expect(screen.getByRole('button', { name: 'Добавить' })).toBeInTheDocument()
      expect(warn).not.toHaveBeenCalled()
    })

    it('warns in dev when it has no accessible name', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      // @ts-expect-error — типы требуют aria-label / aria-labelledby у кнопки без children
      render(<Button leftNode={<svg />} />)
      expect(warn).toHaveBeenCalledOnce()
      expect(warn.mock.calls[0][0]).toContain('[Button]')
    })

    it('does not warn when title is provided', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      // @ts-expect-error — title не считается подписью на уровне типов, но предупреждение глушит
      render(<Button leftNode={<svg />} title="Добавить" />)
      expect(warn).not.toHaveBeenCalled()
    })
  })
})

describe('Button ref', () => {
  it('пробрасывает ref на <button>', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Сохранить</Button>)
    expect(ref.current).toBe(screen.getByRole('button', { name: 'Сохранить' }))
  })
})
