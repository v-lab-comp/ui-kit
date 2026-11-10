import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { ToggleButton } from './ToggleButton'
import { ToggleGroup } from './ToggleGroup'

describe('ToggleButton', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('toggles aria-pressed on click', async () => {
    render(<ToggleButton>Фильтры</ToggleButton>)
    const button = screen.getByRole('button', { name: 'Фильтры' })
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('icon-only item inside a group is named by aria-label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(
      <ToggleGroup type="multiple" defaultValue={['bold']}>
        <ToggleButton value="bold" leftNode={<svg />} aria-label="Жирный" />
        <ToggleButton value="italic" leftNode={<svg />} aria-label="Курсив" />
      </ToggleGroup>
    )
    expect(screen.getByRole('button', { name: 'Жирный' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Курсив' })).toHaveAttribute('aria-pressed', 'false')
    expect(warn).not.toHaveBeenCalled()
  })

  it('warns in dev when icon-only has no accessible name', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // @ts-expect-error — типы требуют aria-label / aria-labelledby у кнопки без children
    render(<ToggleButton leftNode={<svg />} />)
    expect(warn).toHaveBeenCalledOnce()
    expect(warn.mock.calls[0][0]).toContain('[ToggleButton]')
  })
})

describe('ToggleGroup roving tabindex', () => {
  const tabStops = () =>
    screen.getAllByRole('button').filter((el) => el.getAttribute('tabindex') === '0')

  it('без выбранного значения tab stop — первый доступный элемент', () => {
    render(
      <ToggleGroup type="single">
        <ToggleButton value="a" disabled>
          A
        </ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
        <ToggleButton value="c">C</ToggleButton>
      </ToggleGroup>
    )
    expect(tabStops()).toEqual([screen.getByRole('button', { name: 'B' })])
  })

  it('начальный tab stop — первый нажатый; стрелки, Home/End перемещают единственный tab stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button>до</button>
        <ToggleGroup type="multiple" defaultValue={['c']}>
          <ToggleButton value="a">A</ToggleButton>
          <ToggleButton value="b" disabled>
            B
          </ToggleButton>
          <ToggleButton value="c">C</ToggleButton>
        </ToggleGroup>
      </>
    )
    const [a, , c] = ['A', 'B', 'C'].map((name) => screen.getByRole('button', { name }))
    expect(tabStops()).toEqual([c])
    await user.click(screen.getByRole('button', { name: 'до' }))
    await user.tab()
    expect(c).toHaveFocus()
    await user.keyboard('{ArrowLeft}')
    expect(a).toHaveFocus()
    expect(tabStops()).toEqual([a])
    await user.keyboard('{End}')
    expect(c).toHaveFocus()
    await user.keyboard('{Home}')
    expect(a).toHaveFocus()
    // Навигация не меняет нажатость
    expect(a).toHaveAttribute('aria-pressed', 'false')
  })

  it('tab stop переходит на доступный элемент, если текущий стал disabled', () => {
    const { rerender } = render(
      <ToggleGroup type="single" defaultValue="a">
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleGroup>
    )
    rerender(
      <ToggleGroup type="single" defaultValue="a">
        <ToggleButton value="a" disabled>
          A
        </ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleGroup>
    )
    expect(tabStops()).toEqual([screen.getByRole('button', { name: 'B' })])
  })

  it('пробрасывает ref на кнопку и на корень группы', () => {
    const groupRef = createRef<HTMLDivElement>()
    const buttonRef = createRef<HTMLButtonElement>()
    render(
      <ToggleGroup type="single" ref={groupRef}>
        <ToggleButton value="a" ref={buttonRef}>
          A
        </ToggleButton>
      </ToggleGroup>
    )
    expect(groupRef.current).toBe(screen.getByRole('group'))
    expect(buttonRef.current).toBe(screen.getByRole('button', { name: 'A' }))
  })
})
