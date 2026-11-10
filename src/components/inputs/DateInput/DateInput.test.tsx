import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DateInput } from './DateInput'
import { calendarLocales } from '../../Calendar'
import { formatDayLabel } from '../../Calendar/calendarUtils'

const en = calendarLocales.en
const dayName = (y: number, m: number, d: number) => formatDayLabel(new Date(y, m, d), en)

describe('DateInput: календарь-диалог', () => {
  it('кнопка: aria-haspopup/aria-expanded, имя из label; фокус на выбранный день и возврат', async () => {
    const user = userEvent.setup()
    render(<DateInput label="Birthday" />)
    const toggle = screen.getByRole('button', { name: 'Birthday' })
    expect(toggle).toHaveAttribute('aria-haspopup', 'dialog')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    const dialog = await screen.findByRole('dialog', { name: 'Birthday' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-controls', dialog.id)
    await waitFor(() => expect(document.activeElement).toHaveAttribute('tabindex', '0'))
    expect(document.activeElement).toHaveAttribute('role', 'gridcell')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => expect(toggle).toHaveFocus())
  })

  it('Alt+↓ из поля открывает, Enter выбирает дату и возвращает фокус в поле', async () => {
    const user = userEvent.setup()
    const onAccept = vi.fn()
    render(<DateInput label="Date" value="2025-03-10" valueFormat="iso" onAccept={onAccept} />)
    const input = screen.getByRole('textbox', { name: 'Date' })
    input.focus()
    await user.keyboard('{Alt>}{ArrowDown}{/Alt}')
    await screen.findByRole('dialog')
    await waitFor(() =>
      expect(screen.getByRole('gridcell', { name: dayName(2025, 2, 10) })).toHaveFocus()
    )
    await user.keyboard('{ArrowRight}{Enter}')
    expect(onAccept).toHaveBeenLastCalledWith('2025-03-11')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => expect(input).toHaveFocus())
  })

  it('клик по полю открывает календарь, не забирая фокус; calendarButtonLabel именует кнопку', async () => {
    const user = userEvent.setup()
    render(<DateInput calendarButtonLabel="Pick" />)
    const input = screen.getByRole('textbox')
    await user.click(input)
    expect(await screen.findByRole('dialog', { name: 'Pick' })).toBeInTheDocument()
    expect(input).toHaveFocus()
    expect(screen.getByRole('button', { name: 'Pick' })).toHaveAttribute('aria-expanded', 'true')
  })
})
