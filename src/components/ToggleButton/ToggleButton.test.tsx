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
