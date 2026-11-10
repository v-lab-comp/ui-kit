import { createRef } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl.Item', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('icon-only item is named by aria-label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(
      <SegmentedControl defaultValue="grid">
        <SegmentedControl.Item value="grid" leftNode={<svg />} aria-label="Сетка" />
        <SegmentedControl.Item value="list" leftNode={<svg />} aria-label="Список" />
      </SegmentedControl>
    )
    expect(screen.getByRole('radio', { name: 'Сетка' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Список' })).toHaveAttribute('aria-checked', 'false')
    expect(warn).not.toHaveBeenCalled()
  })

  it('icon-only item can be named by aria-labelledby', () => {
    render(
      <>
        <span id="grid-label">Сетка</span>
        <SegmentedControl defaultValue="grid">
          <SegmentedControl.Item value="grid" leftNode={<svg />} aria-labelledby="grid-label" />
        </SegmentedControl>
      </>
    )
    expect(screen.getByRole('radio', { name: 'Сетка' })).toBeInTheDocument()
  })

  it('warns in dev when icon-only item has no accessible name', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(
      <SegmentedControl defaultValue="grid">
        {/* @ts-expect-error — типы требуют aria-label / aria-labelledby у элемента без children */}
        <SegmentedControl.Item value="grid" leftNode={<svg />} />
      </SegmentedControl>
    )
    expect(warn).toHaveBeenCalledOnce()
    expect(warn.mock.calls[0][0]).toContain('[SegmentedControl.Item]')
  })
})

describe('SegmentedControl keyboard (APG radio group)', () => {
  const tabStops = () =>
    screen.getAllByRole('radio').filter((el) => el.getAttribute('tabindex') === '0')

  it('radiogroup с одним tab stop на выбранном; стрелки и Home/End выбирают, пропуская disabled', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <SegmentedControl aria-label="Вид" defaultValue="b" onValueChange={onValueChange}>
        <SegmentedControl.Item value="a">A</SegmentedControl.Item>
        <SegmentedControl.Item value="b">B</SegmentedControl.Item>
        <SegmentedControl.Item value="c" disabled>
          C
        </SegmentedControl.Item>
        <SegmentedControl.Item value="d">D</SegmentedControl.Item>
      </SegmentedControl>
    )
    expect(screen.getByRole('radiogroup', { name: 'Вид' })).toBeInTheDocument()
    const [a, b, , d] = ['A', 'B', 'C', 'D'].map((name) => screen.getByRole('radio', { name }))
    expect(tabStops()).toEqual([b])
    await user.tab()
    expect(b).toHaveFocus()
    expect(onValueChange).not.toHaveBeenCalled()
    await user.keyboard('{ArrowRight}')
    expect(d).toHaveFocus()
    expect(d).toHaveAttribute('aria-checked', 'true')
    expect(onValueChange).toHaveBeenLastCalledWith('d')
    await user.keyboard('{Home}')
    expect(a).toHaveAttribute('aria-checked', 'true')
    await user.keyboard('{ArrowUp}')
    expect(d).toHaveFocus()
    expect(tabStops()).toEqual([d])
  })

  it('без значения tab stop на первом элементе, фокус Tab не выбирает', async () => {
    const user = userEvent.setup()
    render(
      <SegmentedControl aria-label="Вид">
        <SegmentedControl.Item value="a">A</SegmentedControl.Item>
        <SegmentedControl.Item value="b">B</SegmentedControl.Item>
      </SegmentedControl>
    )
    const a = screen.getByRole('radio', { name: 'A' })
    expect(tabStops()).toEqual([a])
    await user.tab()
    expect(a).toHaveFocus()
    expect(a).toHaveAttribute('aria-checked', 'false')
  })

  it('пробрасывает ref на корень и элемент', () => {
    const rootRef = createRef<HTMLDivElement>()
    const itemRef = createRef<HTMLButtonElement>()
    render(
      <SegmentedControl aria-label="Вид" ref={rootRef}>
        <SegmentedControl.Item value="a" ref={itemRef}>
          A
        </SegmentedControl.Item>
      </SegmentedControl>
    )
    expect(rootRef.current).toBe(screen.getByRole('radiogroup'))
    expect(itemRef.current).toBe(screen.getByRole('radio'))
  })
})
