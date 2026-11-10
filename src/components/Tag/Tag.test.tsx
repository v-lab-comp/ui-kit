import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Tag } from './Tag'

describe('Tag', () => {
  it('имя кнопки удаления включает текст тега', () => {
    render(<Tag onDismiss={() => {}}>Design</Tag>)
    expect(screen.getByRole('button', { name: 'Remove Design' })).toBeInTheDocument()
  })

  it('dismissLabel сохраняется как начало имени', () => {
    render(
      <Tag onDismiss={() => {}} dismissLabel="Удалить">
        <b>Дизайн</b>
      </Tag>
    )
    expect(screen.getByRole('button', { name: 'Удалить Дизайн' })).toBeInTheDocument()
  })

  it('onClick + onDismiss: основная часть — нативная кнопка, Enter её активирует', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const onDismiss = vi.fn()
    render(
      <Tag onClick={onClick} onDismiss={onDismiss}>
        Design
      </Tag>
    )
    const main = screen.getByRole('button', { name: 'Design' })
    expect(main.tagName).toBe('BUTTON')
    main.focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
    await user.click(screen.getByRole('button', { name: 'Remove Design' }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('disabled: обе кнопки недоступны', () => {
    render(
      <Tag onClick={() => {}} onDismiss={() => {}} disabled>
        Design
      </Tag>
    )
    expect(screen.getByRole('button', { name: 'Design' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Remove Design' })).toBeDisabled()
  })

  it('onKeyDown доходит до статичного тега с крестиком', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    render(
      <Tag onDismiss={() => {}} onKeyDown={onKeyDown}>
        Design
      </Tag>
    )
    screen.getByRole('button', { name: 'Remove Design' }).focus()
    await user.keyboard('a')
    expect(onKeyDown).toHaveBeenCalled()
  })

  it('пробрасывает ref на корень', () => {
    const ref = createRef<HTMLElement>()
    render(<Tag ref={ref}>Design</Tag>)
    expect(ref.current).toHaveClass('vl-tag')
  })
})
