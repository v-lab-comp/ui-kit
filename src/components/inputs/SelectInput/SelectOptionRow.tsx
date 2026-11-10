import { forwardRef, type LiHTMLAttributes, type MouseEvent } from 'react'
import { contractPart } from '@/theme/contract'
import { selectInputContract } from '@/theme/contracts/select-input'
import { BaseCheckbox } from '../base/BaseCheckbox'
import type { SelectOption } from './SelectInput.types'

export type SelectOptionRowProps = Omit<LiHTMLAttributes<HTMLLIElement>, 'children'> & {
  option: SelectOption
  /** Чекбокс и подпись в две строки (`mode="multiple"`) */
  multiple?: boolean
  selected: boolean
  /** Активный пункт (виртуальный фокус клавиатуры / наведение) */
  active: boolean
  /** Перенос длинной подписи вместо ellipsis */
  wrap?: boolean
}

/** Длинная подпись с переносом обрезана — показываем её целиком в title */
function syncClampedTitle(event: MouseEvent<HTMLSpanElement>, label: string) {
  const node = event.currentTarget
  node.title = node.scrollHeight > node.clientHeight ? label : ''
}

/**
 * Пункт выпадающего списка. Роль, id, aria-selected и обработчики приходят из `getOptionProps()`.
 */
export const SelectOptionRow = forwardRef<HTMLLIElement, SelectOptionRowProps>(
  ({ option, multiple = false, selected, active, wrap = false, ...itemProps }, ref) => {
    const icon = option.icon ? (
      <span className={contractPart(selectInputContract, 'option-icon')}>{option.icon}</span>
    ) : null

    if (multiple) {
      return (
        <li
          ref={ref}
          {...itemProps}
          className={contractPart(selectInputContract, 'option')}
          data-multi
          data-wrap={wrap || undefined}
          data-selected={selected || undefined}
          data-highlighted={active || undefined}
        >
          <BaseCheckbox
            readOnly
            checked={selected}
            tabIndex={-1}
            size="small"
            aria-hidden
            className={contractPart(selectInputContract, 'option-checkbox')}
          />
          {icon}
          <span className={contractPart(selectInputContract, 'option-text-stack')}>
            <span
              className={contractPart(selectInputContract, 'option-primary')}
              data-ellipsis={!option.description || undefined}
              title={option.description ? undefined : option.label}
            >
              {option.label}
            </span>
            {option.description ? (
              <span
                className={contractPart(selectInputContract, 'option-description')}
                data-ellipsis
              >
                {option.description}
              </span>
            ) : null}
          </span>
        </li>
      )
    }

    return (
      <li
        ref={ref}
        {...itemProps}
        className={contractPart(selectInputContract, 'option')}
        data-wrap={wrap || undefined}
        data-selected={selected || undefined}
        data-highlighted={active || undefined}
      >
        {icon}
        <span
          className={contractPart(selectInputContract, 'option-text')}
          data-wrap={wrap || undefined}
          onMouseEnter={wrap ? (event) => syncClampedTitle(event, option.label) : undefined}
        >
          {option.label}
        </span>
      </li>
    )
  }
)

SelectOptionRow.displayName = 'SelectOptionRow'

/**
 * Строка плейсхолдера в начале списка одиночного выбора. Только оформление:
 * не опция listbox, скрыта от скринридера и клавиатурной навигации.
 */
export function SelectPlaceholderRow({
  label,
  selected,
  wrap = false,
}: {
  label: string
  /** Значение не выбрано */
  selected: boolean
  wrap?: boolean
}) {
  return (
    <li
      role="presentation"
      aria-hidden
      className={contractPart(selectInputContract, 'option')}
      data-wrap={wrap || undefined}
      data-selected={selected || undefined}
      data-placeholder
    >
      <span
        className={contractPart(selectInputContract, 'option-text')}
        data-wrap={wrap || undefined}
      >
        {label}
      </span>
    </li>
  )
}

/** Заголовок группы опций (не выбирается) */
export function SelectGroupLabel({ label, separated }: { label: string; separated: boolean }) {
  return (
    <li
      role="presentation"
      className={contractPart(selectInputContract, 'option-group-label')}
      data-sep={separated || undefined}
    >
      {label}
    </li>
  )
}
