import { useLayoutEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { RiCheckLine } from '@remixicon/react'
import { Popover } from '../../../overlays/Popover'
import type { PopoverProps } from '../../../overlays/Popover/Popover.types'
import type { NormalizedSuggestion } from '../model'
import type { SuggestionsListbox } from '../hooks/useSuggestionsListbox'
import { contractPart } from '@/theme/contract'
import { tagInputContract } from '@/theme/contracts/tag-input'

export type SuggestionsPopoverProps = {
  listbox: SuggestionsListbox
  /** Callback-ref listbox: элемент нужен floating-ui для навигации и закрытия по клику снаружи. */
  listboxRef: (el: HTMLElement | null) => void
  anchorRef: PopoverProps['anchorRef']
  loadingText: ReactNode
  emptyText: ReactNode
  /** Доступное имя listbox — id подписи поля. */
  labelledBy: string | undefined
  /** Доступное имя listbox, если у поля нет видимой подписи (`aria-label` поля). */
  ariaLabel: string | undefined
  onPick: (row: NormalizedSuggestion) => void
}

/** Список и пункты не забирают фокус у поля — иначе blur закрыл бы список до click. */
const keepInputFocus = (e: { preventDefault: () => void }) => e.preventDefault()

export function SuggestionsPopover({
  listbox,
  listboxRef,
  anchorRef,
  loadingText,
  emptyText,
  labelledBy,
  ariaLabel,
  onPick,
}: SuggestionsPopoverProps) {
  const { open, loading, options, activeIndex, showCheckmarks } = listbox
  const [minWidth, setMinWidth] = useState<number>()

  // Ширина попапа — не меньше области тегов
  useLayoutEffect(() => {
    if (open && anchorRef.current instanceof HTMLElement) {
      setMinWidth(anchorRef.current.offsetWidth)
    }
  }, [open, anchorRef])

  return (
    <Popover
      open={open}
      anchorRef={anchorRef}
      placement="bottom-start"
      offset={4}
      className={contractPart(tagInputContract, 'suggestions-popover')}
      style={minWidth != null ? { minWidth } : undefined}
    >
      {loading ? (
        <div className={contractPart(tagInputContract, 'suggestions-message')} role="status">
          {loadingText}
        </div>
      ) : options.length === 0 ? (
        <div className={contractPart(tagInputContract, 'suggestions-message')} role="status">
          {emptyText}
        </div>
      ) : (
        <ul
          ref={listboxRef}
          {...listbox.getListboxProps({
            className: contractPart(tagInputContract, 'suggestions-list'),
            'aria-labelledby': labelledBy,
            'aria-label': labelledBy ? undefined : ariaLabel,
            onMouseDown: keepInputFocus,
          })}
        >
          {options.map((row, i) => {
            const disabled = listbox.isOptionDisabled(row)
            const selected = listbox.isOptionSelected(row)
            const active = i === activeIndex
            return (
              <li key={row.id} role="presentation">
                <button
                  ref={(node) => listbox.setOptionElement(i, node)}
                  type="button"
                  role="option"
                  id={listbox.optionId(i)}
                  tabIndex={-1}
                  // Мультивыбор (галочки) — состояние выбора; иначе выбранным считается подсвеченный пункт
                  aria-selected={showCheckmarks ? selected : active}
                  aria-disabled={disabled || undefined}
                  disabled={disabled}
                  data-active={active ? 'true' : undefined}
                  data-with-check={showCheckmarks || undefined}
                  data-disabled={disabled || undefined}
                  className={contractPart(tagInputContract, 'suggestion-btn')}
                  onMouseDown={keepInputFocus}
                  onClick={() => onPick(row)}
                >
                  <span className={contractPart(tagInputContract, 'suggestion-btn-label')}>
                    {row.label}
                  </span>
                  {showCheckmarks ? (
                    <span
                      className={contractPart(tagInputContract, 'suggestion-btn-check-slot')}
                      aria-hidden
                    >
                      {selected ? (
                        <RiCheckLine
                          size={16}
                          className={contractPart(tagInputContract, 'suggestion-check-icon')}
                        />
                      ) : null}
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </Popover>
  )
}
