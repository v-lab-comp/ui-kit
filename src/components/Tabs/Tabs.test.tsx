import { createRef, type ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Tabs } from './Tabs'

// Обёртка вокруг вкладки: раньше ломала список значений (поиск по child.type)
const Wrapped = ({ children }: { children: ReactNode }) => <>{children}</>

describe('Tabs (APG)', () => {
  const tabStops = () =>
    screen.getAllByRole('tab').filter((el) => el.getAttribute('tabindex') === '0')

  it('связывает tablist/tab/tabpanel и держит один tab stop на активной вкладке', () => {
    render(
      <Tabs defaultValue="b" aria-label="Настройки">
        <Tabs.Tab value="a">A</Tabs.Tab>
        <Tabs.Tab value="b">B</Tabs.Tab>
        <Tabs.Panel value="a">Панель A</Tabs.Panel>
        <Tabs.Panel value="b">Панель B</Tabs.Panel>
      </Tabs>
    )
    expect(screen.getByRole('tablist', { name: 'Настройки' })).toBeInTheDocument()
    const b = screen.getByRole('tab', { name: 'B' })
    expect(b).toHaveAttribute('aria-selected', 'true')
    expect(b).toHaveAttribute('data-active')
    expect(tabStops()).toEqual([b])
    const panel = screen.getByRole('tabpanel', { name: 'B' })
    expect(b).toHaveAttribute('aria-controls', panel.id)
    expect(screen.getByText('Панель A')).not.toBeVisible()
  })

  it('стрелки и Home/End переводят фокус и активируют вкладку', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Tabs defaultValue="a" onChange={onChange}>
        <Tabs.List aria-label="Разделы">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Wrapped>
            <Tabs.Tab value="b">B</Tabs.Tab>
          </Wrapped>
          <Tabs.Tab value="c">C</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a">Панель A</Tabs.Panel>
        <Tabs.Panel value="b">Панель B</Tabs.Panel>
        <Tabs.Panel value="c">Панель C</Tabs.Panel>
      </Tabs>
    )
    await user.tab()
    const [a, b, c] = ['A', 'B', 'C'].map((name) => screen.getByRole('tab', { name }))
    expect(a).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(b).toHaveFocus()
    expect(b).toHaveAttribute('aria-selected', 'true')
    expect(onChange).toHaveBeenLastCalledWith('b')
    expect(screen.getByText('Панель B')).toBeVisible()
    await user.keyboard('{End}')
    expect(c).toHaveFocus()
    expect(c).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{ArrowRight}')
    expect(a).toHaveFocus()
    await user.keyboard('{End}{Home}')
    expect(a).toHaveAttribute('aria-selected', 'true')
    expect(tabStops()).toEqual([a])
  })

  it('без defaultValue активна первая вкладка; value без onChange — контролируемый режим', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <Tabs>
        <Tabs.Tab value="a">A</Tabs.Tab>
        <Tabs.Tab value="b">B</Tabs.Tab>
      </Tabs>
    )
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true')
    rerender(
      <Tabs value="b">
        <Tabs.Tab value="a">A</Tabs.Tab>
        <Tabs.Tab value="b">B</Tabs.Tab>
      </Tabs>
    )
    await user.click(screen.getByRole('tab', { name: 'A' }))
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true')
  })

  it('пробрасывает ref и className в части', () => {
    const listRef = createRef<HTMLDivElement>()
    const tabRef = createRef<HTMLButtonElement>()
    const panelRef = createRef<HTMLDivElement>()
    render(
      <Tabs defaultValue="a">
        <Tabs.List ref={listRef} aria-label="Разделы" className="x">
          <Tabs.Tab value="a" ref={tabRef}>
            A
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a" ref={panelRef}>
          Панель
        </Tabs.Panel>
      </Tabs>
    )
    expect(listRef.current).toBe(screen.getByRole('tablist'))
    expect(listRef.current).toHaveClass('vl-tabs__list', 'x')
    expect(tabRef.current).toBe(screen.getByRole('tab'))
    expect(panelRef.current).toBe(screen.getByRole('tabpanel'))
  })
})
