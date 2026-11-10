import type { ReactNode } from 'react'
import { RiCheckLine } from '@remixicon/react'
import { Popover } from '../../../overlays/Popover'
import type { PopoverProps } from '../../../overlays/Popover/Popover.types'
import type { NormalizedSuggestion } from '../model'
import { contractPart } from '@/theme/contract'
import { tagInputContract } from '@/theme/contracts/tag-input'

export type SuggestionsPopoverProps = {
  open: boolean
  anchorRef: PopoverProps['anchorRef']
  popoverMinWidth: number | undefined
  suggestionsListId: string
  suggestionsLoading: boolean
  suggestionsLoadingText: ReactNode
  suggestionsEmptyText: ReactNode
  filtered: NormalizedSuggestion[]
  highlightIndex: number
  isOptionDisabled: (row: NormalizedSuggestion) => boolean
  /** Галочка справа и пункты не исчезают после выбора. */
  showCheckmarks: boolean
  isRowSelected: (row: NormalizedSuggestion) => boolean
  onPick: (row: NormalizedSuggestion) => void
}

export function SuggestionsPopover({
  open,
  anchorRef,
  popoverMinWidth,
  suggestionsListId,
  suggestionsLoading,
  suggestionsLoadingText,
  suggestionsEmptyText,
  filtered,
  highlightIndex,
  isOptionDisabled,
  showCheckmarks,
  isRowSelected,
  onPick,
}: SuggestionsPopoverProps) {
  return (
    <Popover
      open={open}
      anchorRef={anchorRef}
      placement="bottom-start"
      offset={4}
      className={contractPart(tagInputContract, 'suggestions-popover')}
      style={popoverMinWidth != null ? { minWidth: popoverMinWidth } : undefined}
    >
      {suggestionsLoading ? (
        <div className={contractPart(tagInputContract, 'suggestions-message')} role="status">
          {suggestionsLoadingText}
        </div>
      ) : filtered.length === 0 ? (
        <div className={contractPart(tagInputContract, 'suggestions-message')} role="status">
          {suggestionsEmptyText}
        </div>
      ) : (
        <ul
          id={suggestionsListId}
          role="listbox"
          className={contractPart(tagInputContract, 'suggestions-list')}
        >
          {filtered.map((row, i) => {
            const optDisabled = isOptionDisabled(row)
            const selected = isRowSelected(row)
            return (
              <li key={row.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  id={`${suggestionsListId}-opt-${i}`}
                  aria-selected={selected}
                  aria-disabled={optDisabled ? true : undefined}
                  disabled={optDisabled}
                  data-active={i === highlightIndex ? 'true' : undefined}
                  data-with-check={showCheckmarks || undefined}
                  data-disabled={optDisabled || undefined}
                  className={contractPart(tagInputContract, 'suggestion-btn')}
                  onMouseDown={(ev) => ev.preventDefault()}
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
