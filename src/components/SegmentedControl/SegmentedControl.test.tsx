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
