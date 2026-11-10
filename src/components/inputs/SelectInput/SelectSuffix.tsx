import type { MouseEvent } from 'react'
import { RiArrowDownSLine, RiCloseLine } from '@remixicon/react'
import { contractPart } from '@/theme/contract'
import { selectInputContract } from '@/theme/contracts/select-input'
import { getSelectChevronTransform } from './selectOptions'
import type { SelectPlacement } from './SelectInput.types'

/** Шеврон триггера: поворачивается при открытии (с учётом `placement="top"`) */
export function SelectChevron({
  open,
  placement,
  size,
}: {
  open: boolean
  placement: SelectPlacement
  size: number
}) {
  return (
    <RiArrowDownSLine
      size={size}
      className={contractPart(selectInputContract, 'chevron')}
      style={{ transform: getSelectChevronTransform(open, placement) }}
    />
  )
}

export type SelectSuffixProps = {
  open: boolean
  placement: SelectPlacement
  /** Показать кнопку очистки (есть значение) */
  showClear: boolean
  disabled?: boolean
  onClear: () => void
}

/**
 * Суффикс `full`-поля: кнопка очистки + шеврон. Кнопка вне порядка Tab — с клавиатуры
 * значение очищают Delete / Backspace на триггере.
 */
export function SelectSuffix({ open, placement, showClear, disabled, onClear }: SelectSuffixProps) {
  return (
    <span className={contractPart(selectInputContract, 'suffix-group')}>
      {showClear && (
        <button
          type="button"
          className={contractPart(selectInputContract, 'clear-btn')}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation()
            if (!disabled) onClear()
          }}
          disabled={disabled}
          aria-label="Clear selection"
          tabIndex={-1}
        >
          <RiCloseLine size={20} />
        </button>
      )}
      <SelectChevron open={open} placement={placement} size={20} />
    </span>
  )
}
