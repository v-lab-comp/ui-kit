import { contractPart } from '@/theme/contract'
import { selectInputContract } from '@/theme/contracts/select-input'
import type { SelectOption } from '../SelectInput'

export type AsyncSearchSelectOptionsBodyProps = {
  listboxId: string
  loading: boolean
  loadingMore: boolean
  loadError: boolean
  options: SelectOption[]
  value: string
  hi: number
  optionTextWrap: boolean
  onHighlightLeave: () => void
  onPick: (opt: SelectOption) => void
  onOptionHover: (index: number) => void
}

export function AsyncSearchSelectOptionsBody({
  listboxId,
  loading,
  loadingMore,
  loadError,
  options,
  value,
  hi,
  optionTextWrap,
  onHighlightLeave,
  onPick,
  onOptionHover,
}: AsyncSearchSelectOptionsBodyProps) {
  if (loading) {
    return <div className={contractPart(selectInputContract, 'empty-state')}>Loading…</div>
  }
  if (loadError) {
    return (
      <div className={contractPart(selectInputContract, 'empty-state')} data-error>
        Failed to load
      </div>
    )
  }
  if (options.length === 0) {
    return <div className={contractPart(selectInputContract, 'empty-state')}>No results</div>
  }
  return (
    <>
      <ul
        id={listboxId}
        role="listbox"
        className={contractPart(selectInputContract, 'options-list')}
        onMouseLeave={onHighlightLeave}
      >
        {options.map((opt, idx) => (
          <li
            key={opt.value}
            id={`${listboxId}-option-${idx}`}
            role="option"
            aria-selected={opt.value === value}
            className={contractPart(selectInputContract, 'option')}
            data-wrap={optionTextWrap || undefined}
            data-selected={opt.value === value || undefined}
            data-highlighted={hi === idx || undefined}
            onClick={() => onPick(opt)}
            onMouseEnter={() => onOptionHover(idx)}
          >
            {opt.icon && (
              <span className={contractPart(selectInputContract, 'option-icon')}>{opt.icon}</span>
            )}
            <span
              className={contractPart(selectInputContract, 'option-text')}
              data-wrap={optionTextWrap || undefined}
            >
              {opt.label}
            </span>
          </li>
        ))}
      </ul>
      {loadingMore ? (
        <div className={contractPart(selectInputContract, 'async-footer-message')}>Loading…</div>
      ) : null}
    </>
  )
}
