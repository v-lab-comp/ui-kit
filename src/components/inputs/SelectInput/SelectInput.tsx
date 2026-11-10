import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import clsx from 'clsx'
import { RiArrowDownSLine, RiCloseLine } from '@remixicon/react'
import { formatSize } from '@/utils/formatSize'
import { BaseCheckbox } from '../base/BaseCheckbox'
import { InputField } from '../base/InputField'
import { resolveCompletedBorderColor } from '../base/InputField/resolveCompletedBorderColor'
import { contractPart } from '@/theme/contract'
import { selectInputContract } from '@/theme/contracts/select-input'
import { SelectDropdownPanel } from './SelectDropdownPanel'
import { useSelectDropdownFloating } from './useSelectDropdownFloating'
import type {
  FullVariantMultipleProps,
  SelectInputProps,
  SelectOption,
  SelectOptionGroup,
  SelectOptionWithShortLabel,
} from './SelectInput.types'

const SEARCH_THRESHOLD = 20
const LAZY_LOAD_PAGE_SIZE = 50

function filterOptions(options: SelectOption[], query: string): SelectOption[] {
  if (!query.trim()) return options
  const q = query.trim().toLowerCase()
  return options.filter(
    (o) =>
      o.label.toLowerCase().includes(q) ||
      o.value.toLowerCase().includes(q) ||
      o.description?.toLowerCase().includes(q) ||
      o.searchKeywords?.some((kw) => kw.toLowerCase().includes(q))
  )
}

function flattenGroups(groups: SelectOptionGroup[]): SelectOption[] {
  return groups.flatMap((g) => g.options)
}

function filterGroups(groups: SelectOptionGroup[], query: string): SelectOptionGroup[] {
  if (!query.trim()) return groups
  return groups
    .map((g) => ({ ...g, options: filterOptions(g.options, query) }))
    .filter((g) => g.options.length > 0)
}

function getFilteredFlat(
  groupsProp: SelectOptionGroup[] | undefined,
  optionsProp: SelectOption[] | undefined,
  query: string
): SelectOption[] {
  if (groupsProp !== undefined) return flattenGroups(filterGroups(groupsProp, query))
  return filterOptions(optionsProp ?? [], query)
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>((props, ref) => {
  const isMultiple = 'mode' in props && props.mode === 'multiple'

  /** Если задан `groups` (даже `[]`), плоский `options` не используется — см. union в типах и merge args в Storybook. */
  const groupsMaybe = (props as { groups?: SelectOptionGroup[] }).groups
  const optionsMaybe = (props as { options?: SelectOption[] }).options
  const groupsProp = groupsMaybe !== undefined ? groupsMaybe : undefined
  const optionsProp = groupsProp !== undefined ? undefined : optionsMaybe

  const flatOptions = useMemo(
    () => (groupsProp !== undefined ? flattenGroups(groupsProp) : (optionsProp ?? [])),
    [groupsProp, optionsProp]
  )

  const {
    variant = 'full',
    size = 'medium',
    disabled,
    placeholder,
    name,
    prefix,
    searchThreshold = SEARCH_THRESHOLD,
    searchPlaceholder = 'Search...',
    lazyLoadPageSize = LAZY_LOAD_PAGE_SIZE,
    placement = 'bottom',
    dropdownWidth,
    dropdownPortalZIndex,
    dropdownMaxHeight,
    optionTextWrap = false,
    triggerAriaLabel,
  } = props

  const compactContainerClassName =
    variant !== 'full' ? (props as SelectInputProps).className : undefined

  const label =
    variant === 'full'
      ? (props as Extract<SelectInputProps, { variant?: 'full' }>).label
      : undefined
  const required =
    variant === 'full'
      ? (props as Extract<SelectInputProps, { variant?: 'full' }>).required
      : undefined
  const requiredMarker =
    variant === 'full'
      ? (props as Extract<SelectInputProps, { variant?: 'full' }>).requiredMarker
      : undefined
  const optional =
    variant === 'full'
      ? (props as Extract<SelectInputProps, { variant?: 'full' }>).optional
      : undefined
  const labelTooltip =
    variant === 'full'
      ? (props as Extract<SelectInputProps, { variant?: 'full' }>).labelTooltip
      : undefined
  const hint =
    variant === 'full' ? (props as Extract<SelectInputProps, { variant?: 'full' }>).hint : undefined
  const suffix =
    variant === 'full'
      ? (props as Extract<SelectInputProps, { variant?: 'full' }>).suffix
      : undefined
  const id =
    variant === 'full' ? (props as Extract<SelectInputProps, { variant?: 'full' }>).id : undefined
  const className =
    variant === 'full'
      ? (props as Extract<SelectInputProps, { variant?: 'full' }>).className
      : undefined
  const error = 'error' in props ? props.error : undefined
  const completed = props.completed
  const completedColor = props.completedColor
  const showCompletedChrome = !!(completed && !error && !disabled)
  const compactCompletedStyle =
    showCompletedChrome && completedColor
      ? ({
          ['--input-completed-border']: resolveCompletedBorderColor(completedColor),
        } as CSSProperties)
      : undefined

  const isCompact = variant === 'compact' || variant === 'compact-label' || variant === 'inline'
  const showLabel = variant === 'compact-label' || variant === 'inline'
  const compactTriggerClass =
    variant === 'inline'
      ? contractPart(selectInputContract, 'inline-trigger')
      : contractPart(selectInputContract, 'compact-trigger')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hiddenSelectRef = useRef<HTMLSelectElement>(null)
  const listScrollRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLLIElement>(null)
  const listboxId = useId()

  const [internalSingle, setInternalSingle] = useState(() =>
    isMultiple ? '' : String((props as { defaultValue?: string }).defaultValue ?? '')
  )
  const [internalMulti, setInternalMulti] = useState<string[]>(() =>
    isMultiple ? ((props as FullVariantMultipleProps).defaultValue ?? []) : []
  )

  const isControlledSingle = !isMultiple && props.value !== undefined
  const singleValue = !isMultiple
    ? isControlledSingle
      ? String(props.value ?? '')
      : internalSingle
    : ''

  const multiValueProp = isMultiple ? (props as FullVariantMultipleProps).value : undefined
  const isControlledMulti = isMultiple && multiValueProp !== undefined
  const multiValues = useMemo((): string[] => {
    if (!isMultiple) return []
    if (multiValueProp !== undefined) return multiValueProp
    return internalMulti
  }, [isMultiple, multiValueProp, internalMulti])

  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(lazyLoadPageSize)

  const showSearch = isMultiple ? flatOptions.length > 1 : flatOptions.length > searchThreshold

  const filteredPreparedGroups = useMemo(() => {
    if (groupsProp === undefined) return null
    return filterGroups(groupsProp, searchQuery)
  }, [groupsProp, searchQuery])

  const filteredFlat = useMemo(
    () => getFilteredFlat(groupsProp, optionsProp, searchQuery),
    [groupsProp, optionsProp, searchQuery]
  )

  const displayOptions = useMemo<SelectOption[]>(() => {
    if (isMultiple) return filteredFlat
    return placeholder !== undefined
      ? [{ value: '', label: placeholder }, ...filteredFlat]
      : filteredFlat
  }, [isMultiple, placeholder, filteredFlat])

  const hasMore = displayOptions.length > visibleCount
  const visibleOptions = displayOptions.slice(0, visibleCount)

  const selectedOption = !isMultiple ? flatOptions.find((o) => o.value === singleValue) : undefined
  const displayText = selectedOption ? selectedOption.label : (placeholder ?? '')
  const compactDisplayText = selectedOption
    ? ((selectedOption as SelectOptionWithShortLabel).shortLabel ?? selectedOption.label)
    : (placeholder ?? '')

  const selectedMultiOptions = useMemo(
    () =>
      multiValues
        .map((v) => flatOptions.find((o) => o.value === v))
        .filter((o): o is SelectOption => o != null),
    [multiValues, flatOptions]
  )

  const multiSummaryLabel = isMultiple
    ? (props as FullVariantMultipleProps).multipleSummaryLabel
    : undefined
  const multiSummaryRender = isMultiple
    ? (props as FullVariantMultipleProps).multipleSummaryRender
    : undefined

  const multiTriggerDisplay: ReactNode = useMemo(() => {
    if (!isMultiple) return displayText
    const count = multiValues.length
    if (count === 0) return placeholder ?? ''
    if (multiSummaryRender) {
      return multiSummaryRender({
        count,
        selectedValues: multiValues,
        selectedOptions: selectedMultiOptions,
      })
    }
    const summaryLabel = multiSummaryLabel ?? 'Change selection'
    return `${summaryLabel} (${count})`
  }, [
    isMultiple,
    multiValues,
    selectedMultiOptions,
    placeholder,
    displayText,
    multiSummaryRender,
    multiSummaryLabel,
  ])

  const { refs, floatingStyles, basePlacement } = useSelectDropdownFloating({
    open: isOpen,
    placement,
    variant,
    dropdownWidth,
  })

  useImperativeHandle(ref, () => hiddenSelectRef.current!)

  const notifySingleChange = useCallback(
    (newValue: string) => {
      if (!isControlledSingle) setInternalSingle(newValue)
      const p = props as { onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }
      p.onChange?.({
        target: { value: newValue, name: name ?? '' },
      } as React.ChangeEvent<HTMLSelectElement>)
    },
    [isControlledSingle, props, name]
  )

  const notifyMultiChange = useCallback(
    (next: string[]) => {
      if (!isControlledMulti) setInternalMulti(next)
      ;(props as FullVariantMultipleProps).onChange?.({
        target: { value: next, name: name ?? '' },
      })
    },
    [isControlledMulti, props, name]
  )

  const closeDropdown = useCallback(() => {
    setIsOpen(false)
    setHighlightedIndex(-1)
  }, [])

  const openDropdown = useCallback(() => {
    setSearchQuery('')
    setVisibleCount(lazyLoadPageSize)
    if (isMultiple) {
      const list = getFilteredFlat(groupsProp, optionsProp, '')
      const idx = list.findIndex((o) => multiValues.includes(o.value))
      setHighlightedIndex(idx >= 0 ? idx : 0)
    } else {
      const base = getFilteredFlat(groupsProp, optionsProp, '')
      const opts = placeholder !== undefined ? [{ value: '', label: placeholder }, ...base] : base
      const idx = opts.findIndex((o) => o.value === singleValue)
      setHighlightedIndex(idx >= 0 ? idx : 0)
    }
    setIsOpen(true)
  }, [lazyLoadPageSize, placeholder, groupsProp, optionsProp, singleValue, multiValues, isMultiple])

  const selectOption = useCallback(
    (opt: SelectOption) => {
      if (opt.value === '' && placeholder !== undefined) return
      notifySingleChange(opt.value)
      closeDropdown()
      setSearchQuery('')
      setVisibleCount(lazyLoadPageSize)
    },
    [notifySingleChange, placeholder, lazyLoadPageSize, closeDropdown]
  )

  const toggleMultiOption = useCallback(
    (opt: SelectOption) => {
      const next = multiValues.includes(opt.value)
        ? multiValues.filter((v) => v !== opt.value)
        : [...multiValues, opt.value]
      notifyMultiChange(next)
    },
    [multiValues, notifyMultiChange]
  )

  useEffect(() => {
    if (!isOpen || displayOptions.length === 0) return
    if (isMultiple) {
      const idx = displayOptions.findIndex((o) => multiValues.includes(o.value))
      const next = idx >= 0 ? idx : 0
      setHighlightedIndex((prev) => (prev !== next ? next : prev))
      return
    }
    const idx = displayOptions.findIndex((o) => o.value === singleValue)
    const next = idx >= 0 ? idx : 0
    setHighlightedIndex((prev) => (prev !== next ? next : prev))
  }, [isOpen, singleValue, multiValues, displayOptions, isMultiple])

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return
    const el = document.getElementById(`${listboxId}-option-${highlightedIndex}`)
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [isOpen, highlightedIndex, listboxId])

  useEffect(() => {
    if (!isOpen || !hasMore) return
    const sentinel = loadMoreRef.current
    const scrollRoot = listScrollRef.current
    if (!sentinel || !scrollRoot) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((n) => n + lazyLoadPageSize)
        }
      },
      { root: scrollRoot, rootMargin: '100px', threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [isOpen, hasMore, lazyLoadPageSize])

  const handleOptionsScroll = useCallback(() => {
    if (!hasMore) return
    const el = listScrollRef.current
    if (!el) return
    const { scrollTop, clientHeight, scrollHeight } = el
    if (scrollTop + clientHeight >= scrollHeight - 40) {
      setVisibleCount((n) => n + lazyLoadPageSize)
    }
  }, [hasMore, lazyLoadPageSize])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target) || refs.floating.current?.contains(target)) {
        return
      }
      closeDropdown()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, closeDropdown])

  useEffect(() => {
    if (!isOpen) return
    const PAGE_SIZE = 10
    const lastIdx = displayOptions.length - 1
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = Math.min(highlightedIndex + 1, lastIdx)
        if (next >= visibleCount && hasMore) {
          setVisibleCount((n) => n + lazyLoadPageSize)
        }
        setHighlightedIndex(next)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((i) => Math.max(i - 1, 0))
        return
      }
      if (e.key === 'Home') {
        e.preventDefault()
        setHighlightedIndex(0)
        return
      }
      if (e.key === 'End') {
        e.preventDefault()
        if (lastIdx >= visibleCount && hasMore) {
          setVisibleCount(displayOptions.length)
        }
        setHighlightedIndex(lastIdx)
        return
      }
      if (e.key === 'PageDown') {
        e.preventDefault()
        const next = Math.min(highlightedIndex + PAGE_SIZE, lastIdx)
        if (next >= visibleCount && hasMore) {
          setVisibleCount((n) => Math.max(n, next + 1))
        }
        setHighlightedIndex(next)
        return
      }
      if (e.key === 'PageUp') {
        e.preventDefault()
        setHighlightedIndex((i) => Math.max(i - PAGE_SIZE, 0))
        return
      }
      if (e.key === ' ' && isMultiple) {
        e.preventDefault()
        const opt = displayOptions[highlightedIndex]
        if (opt) toggleMultiOption(opt)
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const opt = displayOptions[highlightedIndex]
        if (!opt) return
        if (isMultiple) toggleMultiOption(opt)
        else selectOption(opt)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [
    isOpen,
    highlightedIndex,
    displayOptions,
    selectOption,
    toggleMultiOption,
    visibleCount,
    hasMore,
    lazyLoadPageSize,
    closeDropdown,
    isMultiple,
  ])

  const hasSelection = isMultiple ? multiValues.length > 0 : !!singleValue

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (disabled) return
      if (isMultiple) notifyMultiChange([])
      else notifySingleChange('')
    },
    [disabled, isMultiple, notifyMultiChange, notifySingleChange]
  )

  const effectivePrefix = isMultiple
    ? (selectedMultiOptions[0]?.icon ?? prefix)
    : (selectedOption?.icon ?? prefix)

  const chevronTransform = isOpen
    ? placement === 'top'
      ? undefined
      : 'rotate(180deg)'
    : placement === 'top'
      ? 'rotate(180deg)'
      : undefined

  const defaultSuffix = (
    <span className={contractPart(selectInputContract, 'suffix-group')}>
      {hasSelection && (
        <button
          type="button"
          className={contractPart(selectInputContract, 'clear-btn')}
          onClick={handleClear}
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

  const dropdownMaxHeightStyle =
    dropdownMaxHeight !== undefined
      ? { ['--select-dropdown-max-height' as string]: formatSize(dropdownMaxHeight) }
      : undefined

  const dropdownInnerStyle = {
    ...(dropdownWidth ? { width: dropdownWidth } : {}),
    ...dropdownMaxHeightStyle,
  }

  const showGroupedList = Boolean(filteredPreparedGroups && filteredPreparedGroups.length > 0)

  const renderOptionRow = (opt: SelectOption, idx: number, rowKey: string) => {
    const isSelected = isMultiple ? multiValues.includes(opt.value) : opt.value === singleValue
    const isPlaceholder = !isMultiple && opt.value === '' && placeholder !== undefined
    const isHighlighted = highlightedIndex === idx

    if (isMultiple) {
      return (
        <li
          key={rowKey}
          id={`${listboxId}-option-${idx}`}
          role="option"
          aria-selected={isSelected}
          className={contractPart(selectInputContract, 'option')}
          data-multi
          data-wrap={optionTextWrap || undefined}
          data-selected={isSelected || undefined}
          data-highlighted={isHighlighted || undefined}
          onClick={() => toggleMultiOption(opt)}
          onMouseEnter={() => setHighlightedIndex(idx)}
        >
          <BaseCheckbox
            readOnly
            checked={isSelected}
            tabIndex={-1}
            size="small"
            aria-hidden
            className={contractPart(selectInputContract, 'option-checkbox')}
          />
          {opt.icon && (
            <span className={contractPart(selectInputContract, 'option-icon')}>{opt.icon}</span>
          )}
          <span className={contractPart(selectInputContract, 'option-text-stack')}>
            <span
              className={contractPart(selectInputContract, 'option-primary')}
              data-ellipsis={!opt.description || undefined}
              title={opt.description ? undefined : opt.label}
            >
              {opt.label}
            </span>
            {opt.description ? (
              <span
                className={contractPart(selectInputContract, 'option-description')}
                data-ellipsis
              >
                {opt.description}
              </span>
            ) : null}
          </span>
        </li>
      )
    }

    return (
      <li
        key={rowKey}
        id={`${listboxId}-option-${idx}`}
        role="option"
        aria-selected={isSelected}
        className={contractPart(selectInputContract, 'option')}
        data-wrap={optionTextWrap || undefined}
        data-selected={isSelected || undefined}
        data-highlighted={isHighlighted || undefined}
        data-placeholder={isPlaceholder || undefined}
        onClick={() => selectOption(opt)}
        onMouseEnter={() => setHighlightedIndex(idx)}
      >
        {opt.icon && (
          <span className={contractPart(selectInputContract, 'option-icon')}>{opt.icon}</span>
        )}
        <span
          className={contractPart(selectInputContract, 'option-text')}
          data-wrap={optionTextWrap || undefined}
          onMouseEnter={
            optionTextWrap
              ? (e) => {
                  const el = e.currentTarget
                  el.title = el.scrollHeight > el.clientHeight ? opt.label : ''
                }
              : undefined
          }
        >
          {opt.label}
        </span>
      </li>
    )
  }

  const groupedOptionRows = (): ReactNode[] => {
    if (!filteredPreparedGroups || filteredPreparedGroups.length === 0) return []

    const maxIdx = Math.min(visibleCount, displayOptions.length)
    const rows: ReactNode[] = []
    const phOffset = !isMultiple && placeholder !== undefined ? 1 : 0

    if (phOffset === 1 && maxIdx > 0) {
      rows.push(renderOptionRow(displayOptions[0], 0, 'placeholder'))
    }

    let flatIdx = phOffset
    let finishedGroups = 0

    for (const g of filteredPreparedGroups) {
      let headerEmitted = false
      for (const o of g.options) {
        if (flatIdx >= maxIdx) break
        const cur = displayOptions[flatIdx]
        if (cur.value !== o.value) break
        if (!headerEmitted) {
          rows.push(
            <li
              key={`group-${g.label}-${finishedGroups}`}
              role="presentation"
              className={contractPart(selectInputContract, 'option-group-label')}
              data-sep={finishedGroups > 0 || undefined}
            >
              {g.label}
            </li>
          )
          headerEmitted = true
          finishedGroups += 1
        }
        rows.push(renderOptionRow(cur, flatIdx, `${listboxId}-opt-${flatIdx}-${cur.value}`))
        flatIdx += 1
      }
    }

    return rows
  }

  const listBody =
    displayOptions.length === 0 ? (
      <div className={contractPart(selectInputContract, 'empty-state')}>
        {searchQuery ? 'No results' : 'No options'}
      </div>
    ) : (
      <ul
        id={listboxId}
        role="listbox"
        aria-multiselectable={isMultiple || undefined}
        className={contractPart(selectInputContract, 'options-list')}
        onMouseLeave={() => setHighlightedIndex(-1)}
      >
        {showGroupedList
          ? groupedOptionRows()
          : visibleOptions.map((opt, idx) =>
              renderOptionRow(opt, idx, opt.value || `placeholder-${idx}`)
            )}
        {hasMore && (
          <li
            ref={loadMoreRef}
            className={contractPart(selectInputContract, 'load-more-sentinel')}
            aria-hidden
          />
        )}
      </ul>
    )

  const dropdown = (
    <SelectDropdownPanel
      open={isOpen}
      setFloatingRef={refs.setFloating}
      floatingStyles={floatingStyles}
      dropdownPortalZIndex={dropdownPortalZIndex}
      basePlacement={basePlacement}
      dropdownInnerStyle={dropdownInnerStyle}
      showSearch={showSearch}
      searchPlaceholder={searchPlaceholder}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchDisabled={disabled}
      listScrollRef={listScrollRef}
      onListScroll={handleOptionsScroll}
    >
      {listBody}
    </SelectDropdownPanel>
  )

  const toggleDropdown = () => {
    if (!disabled) {
      if (isOpen) closeDropdown()
      else openDropdown()
    }
  }

  const nativeGroupedOrFlatOptions =
    groupsProp !== undefined
      ? groupsProp.map((g, gi) => (
          <optgroup key={`og-${gi}-${g.label}`} label={g.label}>
            {g.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
        ))
      : (optionsProp ?? []).map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))

  if (isCompact) {
    return (
      <div
        ref={(el) => {
          if (el) {
            refs.setReference(el)
          }
        }}
        className={clsx(selectInputContract.className, compactContainerClassName)}
      >
        <select
          ref={hiddenSelectRef}
          tabIndex={-1}
          aria-hidden
          className={contractPart(selectInputContract, 'hidden-select')}
          value={singleValue}
          onChange={() => {}}
          {...(name && { name })}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {nativeGroupedOrFlatOptions}
        </select>

        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-label={triggerAriaLabel}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? listboxId : undefined}
          disabled={disabled}
          data-size={size}
          data-error={!!error || undefined}
          data-open={isOpen || undefined}
          data-filled={hasSelection || undefined}
          data-completed={showCompletedChrome ? true : undefined}
          data-custom-completed-border={showCompletedChrome && completedColor ? true : undefined}
          style={compactCompletedStyle}
          className={compactTriggerClass}
          onClick={toggleDropdown}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
              e.preventDefault()
              if (!disabled && !isOpen) openDropdown()
            }
          }}
        >
          {effectivePrefix ? (
            <>
              <span className={contractPart(selectInputContract, 'compact-icon')}>
                {effectivePrefix}
              </span>
              {showLabel && (
                <span
                  className={contractPart(selectInputContract, 'compact-text')}
                  data-placeholder={!selectedOption || undefined}
                >
                  {compactDisplayText}
                </span>
              )}
            </>
          ) : (
            <span
              className={contractPart(selectInputContract, 'compact-text')}
              data-placeholder={!selectedOption || undefined}
            >
              {compactDisplayText}
            </span>
          )}
          <RiArrowDownSLine
            size={14}
            className={contractPart(selectInputContract, 'chevron')}
            style={{ transform: chevronTransform }}
          />
        </button>

        {dropdown}
      </div>
    )
  }

  return (
    <div
      ref={(el) => {
        if (el) {
          refs.setReference(el)
        }
      }}
      className={selectInputContract.className}
    >
      {isMultiple ? (
        <select
          ref={hiddenSelectRef}
          tabIndex={-1}
          aria-hidden
          multiple
          className={contractPart(selectInputContract, 'hidden-select')}
          value={multiValues}
          onChange={() => {}}
          {...(name && { name })}
        >
          {nativeGroupedOrFlatOptions}
        </select>
      ) : (
        <select
          ref={hiddenSelectRef}
          tabIndex={-1}
          aria-hidden
          className={contractPart(selectInputContract, 'hidden-select')}
          value={singleValue}
          onChange={() => {}}
          {...(name && { name })}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {nativeGroupedOrFlatOptions}
        </select>
      )}

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
        filled={hasSelection}
        prefix={effectivePrefix}
        suffix={suffix ?? defaultSuffix}
        size={size}
        disabled={disabled}
        className={className}
        id={id}
      >
        {(_fieldId, control) => (
          <button
            ref={triggerRef}
            type="button"
            {...control}
            role="combobox"
            aria-label={triggerAriaLabel}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={isOpen ? listboxId : undefined}
            aria-activedescendant={
              highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined
            }
            disabled={disabled}
            data-error={!!error || undefined}
            className={contractPart(selectInputContract, 'trigger')}
            onClick={() => {
              if (!disabled) {
                if (isOpen) closeDropdown()
                else openDropdown()
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                if (!disabled) {
                  if (!isOpen) openDropdown()
                  else if (!isMultiple) closeDropdown()
                }
              }
              if (e.key === 'ArrowDown' && !isOpen) {
                e.preventDefault()
                if (!disabled) openDropdown()
              }
            }}
          >
            <span
              className={contractPart(selectInputContract, 'trigger-text')}
              data-placeholder={
                isMultiple
                  ? multiValues.length === 0 && !!placeholder
                  : !selectedOption && !!placeholder
              }
            >
              {isMultiple ? multiTriggerDisplay : displayText}
            </span>
          </button>
        )}
      </InputField>

      {dropdown}
    </div>
  )
})

SelectInput.displayName = 'SelectInput'
