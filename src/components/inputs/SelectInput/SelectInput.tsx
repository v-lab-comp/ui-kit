import { forwardRef, useMemo, useRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { selectInputContract } from '@/theme/contracts/select-input'
import { InputField } from '../base/InputField'
import { SelectDropdownPanel } from './SelectDropdownPanel'
import { SelectFormFields } from './SelectFormFields'
import { SelectInputListbox } from './SelectInputListbox'
import { SelectSuffix } from './SelectSuffix'
import { SelectTrigger } from './SelectTrigger'
import { buildSelectList, getAllSelectOptions, getSelectShortLabel } from './selectOptions'
import { useLoadMoreSentinel } from './useLoadMoreSentinel'
import { useSelectInteractions } from './useSelectInteractions'
import { useSelectList } from './useSelectList'
import { useSelectValue } from './useSelectValue'
import type { SelectInputProps } from './SelectInput.types'

const SEARCH_THRESHOLD = 20
const LAZY_LOAD_PAGE_SIZE = 50

/** id через пробел без пустых значений */
const joinIds = (...ids: Array<string | undefined>) => ids.filter(Boolean).join(' ') || undefined

export const SelectInput = forwardRef<HTMLButtonElement, SelectInputProps>((props, ref) => {
  const {
    variant = 'full',
    mode,
    value,
    defaultValue,
    onChange,
    multipleSummaryLabel,
    multipleSummaryRender,
    options,
    groups,
    // InputField — только у variant="full"
    label,
    required,
    requiredMarker,
    optional,
    labelTooltip,
    hint,
    suffix,
    startBlock,
    endBlock,
    wrapperClassName,
    wrapperStyle,
    // Общее
    size = 'medium',
    placeholder,
    prefix,
    searchThreshold = SEARCH_THRESHOLD,
    searchPlaceholder = 'Search...',
    lazyLoadPageSize = LAZY_LOAD_PAGE_SIZE,
    placement = 'bottom',
    dropdownWidth,
    dropdownPortalZIndex,
    dropdownMaxHeight,
    optionTextWrap = false,
    completed,
    completedColor,
    error,
    disabled = false,
    name,
    form,
    id,
    className,
    'aria-describedby': ariaDescribedBy,
    // Остальное (aria-label, обработчики, data-*) — на кнопку-триггер
    ...triggerProps
  } = props

  const multiple = mode === 'multiple'
  const allOptions = useMemo(() => getAllSelectOptions(options, groups), [options, groups])
  const selection = useSelectValue(
    mode === 'multiple'
      ? { multiple: true, value, defaultValue, onChange }
      : { multiple: false, value, defaultValue, onChange },
    allOptions
  )
  const list = useSelectList({ options, groups, pageSize: lazyLoadPageSize })
  const hasSearch = multiple ? allOptions.length > 1 : allOptions.length > searchThreshold

  /** Выбранный пункт в отфильтрованном списке (`multiple` — первый выбранный) */
  const findSelectedIndex = (items: readonly { value: string }[]) => {
    const index = items.findIndex((option) => selection.isSelected(option.value))
    return index === -1 ? null : index
  }

  const typeaheadLabels = useMemo(
    () => (hasSearch ? null : list.items.map((option) => option.label)),
    [hasSearch, list.items]
  )

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
    multiple,
    closeOnSelect: !multiple,
    placement,
    variant,
    dropdownWidth,
    itemCount: list.items.length,
    typeaheadLabels,
    hasSearch,
    selectedIndex: findSelectedIndex(list.items),
    onSelectIndex: (index) => {
      const option = list.items[index]
      if (option) selection.pick(option)
    },
    onClear: selection.hasValue && !disabled ? selection.clear : undefined,
    onOpenChange: list.reset,
    onActiveIndexChange: list.reveal,
  })

  const handleSearchChange = (query: string) => {
    list.setQuery(query)
    // Новый фильтр: активен выбранный пункт, если он остался, иначе первый
    const items = buildSelectList(options, groups, query).items
    setActiveIndex(findSelectedIndex(items) ?? (items.length > 0 ? 0 : null))
  }

  const listScrollRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useLoadMoreSentinel({
    enabled: open && list.hasMore,
    rootRef: listScrollRef,
    onLoadMore: list.showMore,
    loadedCount: list.rows.length,
  })

  const triggerRef = useMergeRefs<HTMLButtonElement>([ref, interactionTriggerRef])

  const selectedOption = selection.selectedOptions[0]
  const effectivePrefix = selectedOption?.icon ?? prefix
  const showCompletedChrome = !!(completed && !error && !disabled)

  const handleClear = () => {
    selection.clear()
    // Кнопка очистки исчезнет вместе со значением — фокус на триггер
    focusTrigger()
  }

  let triggerText: ReactNode
  if (variant !== 'full') {
    triggerText = selectedOption ? getSelectShortLabel(selectedOption) : (placeholder ?? '')
  } else if (!multiple) {
    triggerText = selectedOption ? selectedOption.label : (placeholder ?? '')
  } else if (!selection.hasValue) {
    triggerText = placeholder ?? ''
  } else {
    triggerText = multipleSummaryRender
      ? multipleSummaryRender({
          count: selection.values.length,
          selectedValues: selection.values,
          selectedOptions: selection.selectedOptions,
        })
      : `${multipleSummaryLabel ?? 'Change selection'} (${selection.values.length})`
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
      search={
        hasSearch
          ? {
              value: list.query,
              onChange: handleSearchChange,
              placeholder: searchPlaceholder,
              disabled,
              inputProps: getSearchProps(),
            }
          : undefined
      }
      listScrollRef={listScrollRef}
    >
      <SelectInputListbox
        activeIndex={activeIndex}
        getListboxProps={getListboxProps}
        getOptionProps={getOptionProps}
        rows={list.rows}
        multiple={multiple}
        isSelected={selection.isSelected}
        placeholder={placeholder}
        hasValue={selection.hasValue}
        optionTextWrap={optionTextWrap}
        loadMoreRef={list.hasMore ? loadMoreRef : undefined}
        emptyMessage={list.query ? 'No results' : 'No options'}
      />
    </SelectDropdownPanel>
  )

  const formFields = (
    <SelectFormFields
      name={name}
      form={form}
      values={multiple ? selection.values : [selection.values[0] ?? '']}
    />
  )

  if (variant !== 'full') {
    return (
      <div ref={positionRef} className={clsx(selectInputContract.className, className)}>
        {formFields}
        <SelectTrigger
          ref={triggerRef}
          {...getTriggerProps({
            ...triggerProps,
            id,
            'aria-describedby': ariaDescribedBy,
            'aria-invalid': error ? true : undefined,
          })}
          variant={variant}
          open={open}
          placement={placement}
          size={size}
          disabled={disabled}
          text={triggerText}
          isPlaceholder={!selectedOption}
          icon={effectivePrefix}
          error={!!error}
          filled={selection.hasValue}
          completed={showCompletedChrome}
          completedColor={completedColor}
        />
        {panel}
      </div>
    )
  }

  return (
    <div ref={positionRef} className={selectInputContract.className}>
      {formFields}
      <InputField
        label={label}
        required={required}
        requiredMarker={requiredMarker}
        optional={optional}
        labelTooltip={labelTooltip}
        hint={hint}
        error={error}
        completed={completed}
        completedColor={completedColor}
        filled={selection.hasValue}
        prefix={effectivePrefix}
        suffix={
          suffix ?? (
            <SelectSuffix
              open={open}
              placement={placement}
              showClear={selection.hasValue}
              disabled={disabled}
              onClear={handleClear}
            />
          )
        }
        startBlock={startBlock}
        endBlock={endBlock}
        size={size}
        disabled={disabled}
        className={className}
        wrapperClassName={wrapperClassName}
        wrapperStyle={wrapperStyle}
        id={id}
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
            text={triggerText}
            isPlaceholder={(multiple ? !selection.hasValue : !selectedOption) && !!placeholder}
            error={!!error}
          />
        )}
      </InputField>
      {panel}
    </div>
  )
})

SelectInput.displayName = 'SelectInput'
