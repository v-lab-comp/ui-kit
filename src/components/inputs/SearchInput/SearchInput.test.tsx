import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SearchInput } from './SearchInput'

// jsdom: не mac и не mobile → Ctrl+Shift по умолчанию
const pressShortcut = () =>
  fireEvent.keyDown(document, { code: 'KeyK', key: 'K', ctrlKey: true, shiftKey: true })

describe('SearchInput shortcut', () => {
  it('exposes aria-keyshortcuts and hides the visual badge from AT', () => {
    render(<SearchInput aria-label="Search" shortcut={{ key: 'k' }} />)
    expect(screen.getByLabelText('Search')).toHaveAttribute('aria-keyshortcuts', 'Control+Shift+K')
    expect(document.querySelector('kbd')).toHaveAttribute('aria-hidden', 'true')
  })

  it('does not lose the registration when an equal-priority sibling unmounts', () => {
    const { rerender } = render(
      <>
        <SearchInput aria-label="A" shortcut={{ key: 'k' }} />
        <SearchInput aria-label="B" shortcut={{ key: 'k' }} />
      </>
    )
    // равный приоритет — фокус получает первый зарегистрированный
    pressShortcut()
    expect(screen.getByLabelText('A')).toHaveFocus()

    rerender(
      <>
        <SearchInput aria-label="B" shortcut={{ key: 'k' }} key="b" />
      </>
    )
    ;(document.activeElement as HTMLElement | null)?.blur()
    pressShortcut()
    expect(screen.getByLabelText('B')).toHaveFocus()
  })

  it('focuses the highest priority input', () => {
    render(
      <>
        <SearchInput aria-label="Low" shortcut={{ key: 'k' }} />
        <SearchInput aria-label="High" shortcut={{ key: 'k' }} shortcutPriority={5} />
      </>
    )
    pressShortcut()
    expect(screen.getByLabelText('High')).toHaveFocus()
  })
})
