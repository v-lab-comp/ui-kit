import { forwardRef, useState } from 'react'
import { selectInputContract } from '@/theme/contracts/select-input'
import { useControllableState } from '@/utils/useControllableState'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { InputField, splitInputFieldProps } from '../base/InputField'
import {
  SelectDropdownPanel,
  SelectFormFields,
  SelectListStatus,
  SelectOptionList,
  SelectOptionRow,
  SelectSuffix,
  SelectTrigger,
  useSelectInteractions,
} from '../SelectInput/parts'
import type { SelectListStatusProps } from '../SelectInput/parts'
import type { SelectOption } from '../SelectInput'
import type { AsyncSearchSelectProps } from './AsyncSearchSelect.types'
import { ASYNC_SEARCH_SELECT_DEBOUNCE_MS } from './constants'
import { useAsyncSearchSelectRemote } from './useAsyncSearchSelectRemote'

/** id через пробел без пустых значений */
const joinIds = (...ids: Array<string | undefined>) => ids.filter(Boolean).join(' ') || undefined

/** Индекс опции со значением `value`; нет такой — `null` */
const findValueIndex = (options: readonly SelectOption[], value: string) => {
  const index = value ? options.findIndex((option) => option.value === value) : -1
  return index === -1 ? null : index
}

/** Статус списка: загрузка, ошибка, пустой ответ или дозагрузка следующей страницы */
function getListStatus(state: {
  loading: boolean
  loadingMore: boolean
  loadError: boolean
  empty: boolean
}): SelectListStatusProps {
  if (state.loading) return { message: 'Loading…' }
  if (state.loadError) return { message: 'Failed to load', error: true }
  if (state.empty) return { message: 'No results' }
  if (state.loadingMore) return { message: 'Loading…', part: 'async-footer-message' }
  return {}
}

export const AsyncSearchSelect = forwardRef<HTMLButtonElement, AsyncSearchSelectProps>(
  (props, ref) => {
    const [field, rest] = splitInputFieldProps(props)
    const {
      value: valueProp,
      defaultValue,
      onChange,
      loadOptions,
      debounceMs = ASYNC_SEARCH_SELECT_DEBOUNCE_MS,
      onSearchQueryChange,
      selectedOption: selectedOptionProp,
      placeholder,
      searchPlaceholder = 'Search...',
      placement = 'bottom',
      dropdownWidth,
      dropdownPortalZIndex,
      dropdownMaxHeight,
      optionTextWrap = false,
      name,
      form,
      'aria-describedby': ariaDescribedBy,
      // Остальное (aria-label, обработчики, data-*) — на кнопку-триггер
      ...triggerProps
    } = rest
    const { error } = field
    const size = field.size ?? 'medium'
    const disabled = field.disabled ?? false

    const [rawValue, setValue] = useControllableState<string, [SelectOption | null]>({
      value: valueProp,
      defaultValue: defaultValue ?? '',
      onChange,
    })
    // JS-код и формы могут передать null — это «не выбрано»
    const value = rawValue == null ? '' : String(rawValue)
    /** Последняя выбранная опция: её подпись остаётся в триггере, когда список закрыт */
    const [picked, setPicked] = useState<SelectOption | null>(null)

    const {
      listScrollRef,
      setActive,
      filterText,
      setFilterText,
      options,
      loading,
      loadingMore,
      loadError,
      handleListScroll,
    } = useAsyncSearchSelectRemote({
      loadOptions,
      debounceMs,
      onSearchQueryChange,
      disabled,
      // Пришла первая страница — активен выбранный пункт, если он есть, иначе первый
      onFirstPage: (rows) =>
        setActiveIndex(
          rows === null ? null : (findValueIndex(rows, value) ?? (rows.length > 0 ? 0 : null))
        ),
    })

    const commit = (nextValue: string, option: SelectOption | null) => {
      setPicked(option)
      setValue(nextValue, option)
    }

    const navigable = !loading && !loadError

    const {
      open,
      activeIndex,
      setActiveIndex,
      focusTrigger,
      triggerRef: interactionTriggerRef,
      positionRef,
      floatingRef,
      floatingStyles,
      basePlacement,
      getTriggerProps,
      getFloatingProps,
      getListboxProps,
      getOptionProps,
      getSearchProps,
    } = useSelectInteractions({
      disabled,
      closeOnSelect: true,
      placement,
      variant: 'full',
      dropdownWidth,
      itemCount: navigable ? options.length : 0,
      // Поиск есть всегда: набор символов уходит в поле поиска, typeahead не нужен
      typeaheadLabels: null,
      hasSearch: true,
      selectedIndex: findValueIndex(options, value),
      onSelectIndex: (index) => {
        const option = options[index]
        // Как у нативного <select>: повторный выбор того же пункта не меняет значение
        if (option && option.value !== value) commit(option.value, option)
      },
      onClear: value && !disabled ? () => commit('', null) : undefined,
      onOpenChange: setActive,
    })

    const triggerRef = useMergeRefs<HTMLButtonElement>([ref, interactionTriggerRef])

    const selected: SelectOption | null = !value
      ? null
      : picked?.value === value
        ? picked
        : selectedOptionProp?.value === value
          ? selectedOptionProp
          : (options.find((option) => option.value === value) ?? { value, label: value })

    const handleClear = () => {
      commit('', null)
      // Кнопка очистки исчезнет вместе со значением — фокус на триггер
      focusTrigger()
    }

    const panel = (
      <SelectDropdownPanel
        open={open}
        floatingRef={floatingRef}
        floatingProps={getFloatingProps()}
        floatingStyles={floatingStyles}
        dropdownPortalZIndex={dropdownPortalZIndex}
        basePlacement={basePlacement}
        dropdownWidth={dropdownWidth}
        dropdownMaxHeight={dropdownMaxHeight}
        search={{
          value: filterText,
          onChange: setFilterText,
          placeholder: searchPlaceholder,
          disabled,
          inputProps: getSearchProps(),
        }}
        listScrollRef={listScrollRef}
        onListScroll={handleListScroll}
      >
        <SelectOptionList {...getListboxProps()} busy={loading || loadingMore}>
          {navigable &&
            options.map((option, index) => {
              const isSelected = option.value === value
              return (
                <SelectOptionRow
                  key={option.value}
                  {...getOptionProps(index, isSelected)}
                  option={option}
                  selected={isSelected}
                  active={activeIndex === index}
                  wrap={optionTextWrap}
                />
              )
            })}
        </SelectOptionList>
        <SelectListStatus
          {...getListStatus({ loading, loadingMore, loadError, empty: options.length === 0 })}
        />
      </SelectDropdownPanel>
    )

    return (
      <div ref={positionRef} className={selectInputContract.className}>
        <SelectFormFields name={name} form={form} values={[value]} />
        <InputField
          {...field}
          size={size}
          filled={value !== ''}
          prefix={selected?.icon ?? field.prefix}
          suffix={
            field.suffix ?? (
              <SelectSuffix
                open={open}
                placement={placement}
                showClear={value !== ''}
                disabled={disabled}
                onClear={handleClear}
              />
            )
          }
        >
          {(_fieldId, control) => (
            <SelectTrigger
              ref={triggerRef}
              {...getTriggerProps({
                ...triggerProps,
                ...control,
                'aria-describedby': joinIds(control['aria-describedby'], ariaDescribedBy),
              })}
              variant="full"
              open={open}
              placement={placement}
              size={size}
              disabled={disabled}
              text={selected ? selected.label : (placeholder ?? '')}
              isPlaceholder={!selected && !!placeholder}
              error={!!error}
            />
          )}
        </InputField>
        {panel}
      </div>
    )
  }
)

AsyncSearchSelect.displayName = 'AsyncSearchSelect'
