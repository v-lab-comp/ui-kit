import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { RiArrowDownSLine, RiCloseLine } from '@remixicon/react'
import { formatSize } from '@/utils/formatSize'
import { InputField } from '../base/InputField'
import { contractPart } from '@/theme/contract'
import { selectInputContract } from '@/theme/contracts/select-input'
import { SelectDropdownPanel } from '../SelectInput/SelectDropdownPanel'
import { useSelectDropdownFloating } from '../SelectInput/useSelectDropdownFloating'
import type { AsyncSearchSelectProps } from './AsyncSearchSelect.types'
import type { SelectOption } from '../SelectInput'
import { ASYNC_SEARCH_SELECT_DEBOUNCE_MS } from './constants'
import { AsyncSearchSelectOptionsBody } from './AsyncSearchSelectOptionsBody'
import { useAsyncSearchSelectDismiss } from './useAsyncSearchSelectDismiss'
import { useAsyncSearchSelectListboxKeyboard } from './useAsyncSearchSelectListboxKeyboard'
import { useAsyncSearchSelectRemote } from './useAsyncSearchSelectRemote'

export const AsyncSearchSelect = forwardRef<HTMLSelectElement, AsyncSearchSelectProps>(
  (props, ref) => {
    const {
      size = 'medium',
      disabled,
      placeholder,
      searchPlaceholder = 'Search...',
      debounceMs = ASYNC_SEARCH_SELECT_DEBOUNCE_MS,
      loadOptions,
      value: valueProp,
      defaultValue,
      onChange,
      name,
      prefix,
      selectedOption: selectedOptionProp,
      placement = 'bottom',
      dropdownWidth,
      dropdownPortalZIndex,
      dropdownMaxHeight,
      optionTextWrap = false,
      triggerAriaLabel,
      label,
      required,
      requiredMarker,
      optional,
      labelTooltip,
      hint,
      error,
      completed,
      completedColor,
      suffix,
      id: idProp,
      className,
      onSearchQueryChange,
    } = props

    const triggerRef = useRef<HTMLButtonElement>(null)
    const hiddenSelectRef = useRef<HTMLSelectElement>(null)

    const [internalValue, setInternalValue] = useState(() =>
      defaultValue == null ? '' : String(defaultValue)
    )
    const isControlled = valueProp !== undefined
    const raw = isControlled ? valueProp : internalValue
    const value = raw == null || raw === '' ? '' : String(raw)

    const [picked, setPicked] = useState<SelectOption | null>(null)

    const {
      listboxId,
      listScrollRef,
      open,
      openDropdown,
      close,
      filterText,
      setFilterText,
      options,
      loading,
      loadingMore,
      loadError,
      hi,
      setHi,
      handleListScroll,
    } = useAsyncSearchSelectRemote(loadOptions, debounceMs, onSearchQueryChange, value)

    const selected = useMemo((): SelectOption | null => {
      if (!value) return null
      if (picked?.value === value) return picked
      if (selectedOptionProp?.value === value) return selectedOptionProp
      const fromList = options.find((o) => o.value === value)
      return fromList ?? { value, label: value }
    }, [value, picked, selectedOptionProp, options])

    const { refs, floatingStyles, basePlacement } = useSelectDropdownFloating({
      open,
      placement,
      variant: 'full',
      dropdownWidth,
    })

    useImperativeHandle(ref, () => hiddenSelectRef.current!)

    const emit = useCallback(
      (v: string, opt: SelectOption | null) => {
        if (!isControlled) setInternalValue(v)
        setPicked(v && opt ? opt : null)
        onChange?.({
          target: { value: v, name: name ?? '' },
        } as ChangeEvent<HTMLSelectElement>)
      },
      [isControlled, onChange, name]
    )

    useAsyncSearchSelectDismiss(open, close, triggerRef, refs.floating)

    useAsyncSearchSelectListboxKeyboard({
      open,
      options,
      hi,
      setHi,
      loading,
      loadingMore,
      loadError,
      emit,
      close,
    })

    const pickOption = useCallback(
      (opt: SelectOption) => {
        emit(opt.value, opt)
        close()
      },
      [emit, close]
    )

    const chevronTransform = open
      ? placement === 'top'
        ? undefined
        : 'rotate(180deg)'
      : placement === 'top'
        ? 'rotate(180deg)'
        : undefined

    const dropdownMaxHeightStyle =
      dropdownMaxHeight !== undefined
        ? { ['--select-dropdown-max-height' as string]: formatSize(dropdownMaxHeight) }
        : undefined

    const dropdownInnerStyle = {
      ...(dropdownWidth ? { width: dropdownWidth } : {}),
      ...dropdownMaxHeightStyle,
    }

    const listBody = (
      <AsyncSearchSelectOptionsBody
        listboxId={listboxId}
        loading={loading}
        loadingMore={loadingMore}
        loadError={loadError}
        options={options}
        value={value}
        hi={hi}
        optionTextWrap={optionTextWrap}
        onHighlightLeave={() => setHi(-1)}
        onPick={pickOption}
        onOptionHover={setHi}
      />
    )

    const dropdown = (
      <SelectDropdownPanel
        open={open}
        setFloatingRef={refs.setFloating}
        floatingStyles={floatingStyles}
        dropdownPortalZIndex={dropdownPortalZIndex}
        basePlacement={basePlacement}
        dropdownInnerStyle={dropdownInnerStyle}
        showSearch
        searchPlaceholder={searchPlaceholder}
        searchValue={filterText}
        onSearchChange={setFilterText}
        searchDisabled={disabled}
        listScrollRef={listScrollRef}
        onListScroll={handleListScroll}
      >
        {listBody}
      </SelectDropdownPanel>
    )

    return (
      <div
        ref={(el) => {
          if (el) refs.setReference(el)
        }}
        className={selectInputContract.className}
      >
        <select
          ref={hiddenSelectRef}
          tabIndex={-1}
          aria-hidden
          className={contractPart(selectInputContract, 'hidden-select')}
          value={value}
          onChange={() => {}}
          {...(name && { name })}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {value !== '' && <option value={value}>{selected?.label ?? value}</option>}
        </select>

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
          filled={value !== ''}
          prefix={selected?.icon ?? prefix}
          suffix={
            suffix ?? (
              <span className={contractPart(selectInputContract, 'suffix-group')}>
                {value !== '' && (
                  <button
                    type="button"
                    className={contractPart(selectInputContract, 'clear-btn')}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!disabled) emit('', null)
                    }}
                    disabled={disabled}
                    aria-label="Clear selection"
                    tabIndex={-1}
                  >
                    <RiCloseLine size={20} />
                  </button>
                )}
                <RiArrowDownSLine
                  size={20}
                  className={contractPart(selectInputContract, 'chevron')}
                  style={{ transform: chevronTransform }}
                />
              </span>
            )
          }
          size={size}
          disabled={disabled}
          className={className}
          id={idProp}
        >
          {(_fieldId, control) => (
            <button
              ref={triggerRef}
              type="button"
              {...control}
              role="combobox"
              aria-label={triggerAriaLabel}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls={open ? listboxId : undefined}
              aria-activedescendant={hi >= 0 ? `${listboxId}-option-${hi}` : undefined}
              disabled={disabled}
              data-error={!!error || undefined}
              className={contractPart(selectInputContract, 'trigger')}
              onClick={() => {
                if (!disabled) (open ? close : openDropdown)()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (!disabled) (open ? close : openDropdown)()
                }
                if (e.key === 'ArrowDown' && !open) {
                  e.preventDefault()
                  if (!disabled) openDropdown()
                }
              }}
            >
              <span
                className={contractPart(selectInputContract, 'trigger-text')}
                data-placeholder={!selected && placeholder ? true : undefined}
              >
                {selected ? selected.label : (placeholder ?? '')}
              </span>
            </button>
          )}
        </InputField>

        {dropdown}
      </div>
    )
  }
)

AsyncSearchSelect.displayName = 'AsyncSearchSelect'
