import type { Ref } from 'react'
import { SelectListStatus, SelectOptionList } from './SelectOptionList'
import { SelectGroupLabel, SelectOptionRow, SelectPlaceholderRow } from './SelectOptionRow'
import type { SelectListRow } from './selectOptions'
import type { SelectInteractions } from './useSelectInteractions'

export type SelectInputListboxProps = Pick<
  SelectInteractions,
  'activeIndex' | 'getListboxProps' | 'getOptionProps'
> & {
  /** Строки списка (уже ограниченные ленивой отрисовкой) */
  rows: readonly SelectListRow[]
  multiple: boolean
  isSelected: (value: string) => boolean
  /** Плейсхолдер одиночного выбора — декоративная первая строка */
  placeholder?: string
  /** Значение выбрано (для оформления строки плейсхолдера) */
  hasValue: boolean
  optionTextWrap: boolean
  /** ref сторожа ленивой подгрузки, пока отрисованы не все пункты */
  loadMoreRef?: Ref<HTMLLIElement>
  /** Статус пустого списка */
  emptyMessage?: string
}

/** Содержимое панели SelectInput: listbox с группами и плейсхолдером + статус пустого списка */
export function SelectInputListbox({
  activeIndex,
  getListboxProps,
  getOptionProps,
  rows,
  multiple,
  isSelected,
  placeholder,
  hasValue,
  optionTextWrap,
  loadMoreRef,
  emptyMessage,
}: SelectInputListboxProps) {
  const hasOptions = rows.some((row) => row.kind === 'option')

  return (
    <>
      <SelectOptionList {...getListboxProps()} loadMoreRef={loadMoreRef}>
        {hasOptions && placeholder !== undefined && !multiple && (
          <SelectPlaceholderRow label={placeholder} selected={!hasValue} wrap={optionTextWrap} />
        )}
        {rows.map((row) => {
          if (row.kind === 'group') {
            return <SelectGroupLabel key={row.key} label={row.label} separated={row.separated} />
          }
          const selected = isSelected(row.option.value)
          return (
            <SelectOptionRow
              key={row.key}
              {...getOptionProps(row.index, selected)}
              option={row.option}
              multiple={multiple}
              selected={selected}
              active={activeIndex === row.index}
              wrap={optionTextWrap}
            />
          )
        })}
      </SelectOptionList>
      <SelectListStatus message={hasOptions ? undefined : emptyMessage} />
    </>
  )
}
