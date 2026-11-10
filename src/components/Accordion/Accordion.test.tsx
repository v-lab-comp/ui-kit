import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeAll } from 'vitest'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  beforeAll(() => {
    // jsdom без ResizeObserver: Accordion меряет высоту контента для анимации
    globalThis.ResizeObserver ??= class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver
  })

  it('закрытая панель inert — её содержимое вне порядка Tab; открытая доступна', async () => {
    const user = userEvent.setup()
    render(
      <Accordion title="Вопрос">
        <a href="#x">Ссылка</a>
      </Accordion>
    )
    const trigger = screen.getByRole('button', { name: 'Вопрос' })
    const panel = document.getElementById(trigger.getAttribute('aria-controls')!)!
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(panel).toHaveAttribute('inert')
    expect(panel).not.toHaveAttribute('aria-hidden')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(panel).not.toHaveAttribute('inert')
    await user.tab()
    expect(screen.getByRole('link', { name: 'Ссылка' })).toHaveFocus()
  })

  it('role="region" только при region, имя — из заголовка', () => {
    const { rerender } = render(
      <Accordion title="Вопрос" defaultOpen>
        Ответ
      </Accordion>
    )
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
    rerender(
      <Accordion title="Вопрос" defaultOpen region>
        Ответ
      </Accordion>
    )
    expect(screen.getByRole('region', { name: 'Вопрос' })).toBeInTheDocument()
  })

  it('пробрасывает ref на корень', () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = render(
      <Accordion title="Вопрос" ref={ref}>
        Ответ
      </Accordion>
    )
    expect(ref.current).toBe(container.firstChild)
  })
})
