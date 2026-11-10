import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Calendar } from './Calendar'
import { calendarLocales } from '../calendarLocales'
import { formatDayLabel } from '../calendarUtils'
import type { DateRange } from './Calendar.types'

const en = calendarLocales.en
const dayName = (y: number, m: number, d: number) => formatDayLabel(new Date(y, m, d), en)
const cell = (y: number, m: number, d: number) =>
  screen.getByRole('gridcell', { name: dayName(y, m, d) })

describe('Calendar: сетка дней по APG', () => {
  it('grid/row/gridcell, aria-selected на gridcell, полное имя даты', () => {
    render(<Calendar value={new Date(2025, 2, 10)} />)
    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(7)
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1)
    expect(dayName(2025, 2, 10)).toMatch(/2025/)
    const selected = cell(2025, 2, 10)
    expect(selected).toHaveAttribute('aria-selected', 'true')
    expect(selected).toHaveAttribute('tabindex', '0')
    expect(cell(2025, 2, 11)).toHaveAttribute('aria-selected', 'false')
    expect(cell(2025, 2, 11)).toHaveAttribute('tabindex', '-1')
  })

  it('стрелки, Home/End, PageUp/PageDown (+Shift) двигают фокус и листают месяц', async () => {
    const user = userEvent.setup()
    render(<Calendar value={new Date(2025, 0, 31)} />)
    cell(2025, 0, 31).focus()

    await user.keyboard('{ArrowRight}')
    expect(cell(2025, 1, 1)).toHaveFocus()
    expect(screen.getByRole('button', { name: 'February 2025' })).toBeInTheDocument()

    await user.keyboard('{ArrowLeft}{ArrowUp}')
    expect(cell(2025, 0, 24)).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(cell(2025, 0, 31)).toHaveFocus()

    // 31 янв 2025 — пятница: Home → пн 27, End → вс 2 фев
    await user.keyboard('{Home}')
    expect(cell(2025, 0, 27)).toHaveFocus()
    await user.keyboard('{End}')
    expect(cell(2025, 1, 2)).toHaveFocus()

    await user.keyboard('{PageUp}')
    expect(cell(2025, 0, 2)).toHaveFocus()
    await user.keyboard('{Shift>}{PageDown}{/Shift}')
    expect(cell(2026, 0, 2)).toHaveFocus()
    await user.keyboard('{PageDown}')
    expect(cell(2026, 1, 2)).toHaveFocus()
  })

  it('Enter и Space выбирают день', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Calendar value={new Date(2025, 2, 10)} onChange={onChange} />)
    cell(2025, 2, 10).focus()
    await user.keyboard('{ArrowRight}{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(new Date(2025, 2, 11))
    await user.keyboard('{ArrowRight} ')
    expect(onChange).toHaveBeenLastCalledWith(new Date(2025, 2, 12))
  })

  it('autoFocus фокусирует выбранный день', () => {
    render(<Calendar value={new Date(2025, 2, 10)} autoFocus />)
    expect(cell(2025, 2, 10)).toHaveFocus()
  })

  it('диапазон: второй клик раньше начала меняет края местами', async () => {
    const user = userEvent.setup()
    const Range = () => {
      const [range, setRange] = useState<DateRange>({ start: new Date(2025, 2, 10), end: null })
      return <Calendar mode="range" value={range} onChange={setRange} />
    }
    render(<Range />)
    await user.click(cell(2025, 2, 5))
    expect(cell(2025, 2, 5)).toHaveAttribute('aria-selected', 'true')
    expect(cell(2025, 2, 10)).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('grid')).toHaveAttribute('aria-multiselectable', 'true')
  })

  it('вид следует за внешним value; месяц отмечен aria-pressed', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<Calendar value={new Date(2025, 2, 10)} />)
    rerender(<Calendar value={new Date(2024, 6, 1)} />)
    expect(cell(2024, 6, 1)).toHaveAttribute('aria-selected', 'true')
    await user.click(screen.getByRole('button', { name: 'July 2024' }))
    expect(screen.getByRole('button', { name: 'July' })).toHaveAttribute('aria-pressed', 'true')
  })
})
