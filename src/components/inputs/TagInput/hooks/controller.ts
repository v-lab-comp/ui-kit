import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type {
  ClipboardEvent,
  CSSProperties,
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  RefObject,
} from 'react'
import clsx from 'clsx'
import {
  tagLabel,
  type TagInputSuggestion,
  type TagInputSuggestionObject,
  type TagInputSuggestionsMatch,
  type TagInputTagValue,
} from '../types'
import {
  computeFilteredSuggestions,
  computePanelOpen,
  DEFAULT_TAG_INPUT_SPLIT,
  findSuggestionByCommitLabel,
  type NormalizedSuggestion,
  normalizeSuggestionsArray,
  tagMatchesSuggestion,
  tagValueFromSuggestionRow,
} from '../model'
import { tagInputContract } from '@/theme/contracts/tag-input'

export type UseTagInputControllerParams = {
  value: TagInputTagValue[] | undefined
  defaultValue: TagInputTagValue[] | undefined
  onChange: ((tags: TagInputTagValue[]) => void) | undefined
  disabled: boolean | undefined
  maxTags: number | undefined
  maxTagCount: number | undefined
  allowDuplicates: boolean
  allowCustomTags: boolean
  commitOnBlur: boolean
  splitPattern: RegExp | undefined
  validateTag: ((label: string) => boolean) | undefined
  suggestions: readonly TagInputSuggestion[] | undefined
  suggestionsMatch: TagInputSuggestionsMatch
  suggestionsLimit: number
  suggestionsExcludeSelected: boolean
  suggestionsLoading: boolean
  suggestionsLoadingText: ReactNode
  suggestionsEmptyText: ReactNode
  getOptionDisabled: ((row: TagInputSuggestionObject) => boolean) | undefined
  onSuggestionsQueryChange: ((query: string) => void) | undefined
  tagsAreaMaxHeight: number | string | 'none' | undefined
  wrapperClassName: string | undefined
  wrapperStyle: CSSProperties | undefined
  inputProps: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'size'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'prefix'
    | 'suffix'
    | 'disabled'
    | 'className'
    | 'children'
    | 'id'
  >
}

export type UseTagInputControllerReturn = {
  mergedWrapperClass: string
  mergedWrapperStyle: CSSProperties & { height: 'auto' }
  scrollAreaStyle: { maxHeight: string | 'none' } | undefined
  anchorRef: RefObject<HTMLDivElement>
  suggestionsListId: string
  draft: string
  panelOpen: boolean
  filtered: NormalizedSuggestion[]
  highlightIndex: number
  suggestionsLoading: boolean
  suggestionsLoadingText: ReactNode
  suggestionsEmptyText: ReactNode
  popoverMinWidth: number | undefined
  visibleTags: TagInputTagValue[]
  hiddenTagCount: number
  removeAt: (index: number) => void
  pickSuggestion: (row: NormalizedSuggestion) => void
  inputHandlers: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onFocus: (e: FocusEvent<HTMLInputElement>) => void
    onBlur: (e: FocusEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    onPaste: (e: ClipboardEvent<HTMLInputElement>) => void
  }
  comboboxAria: {
    role: 'combobox' | undefined
    ariaExpanded: boolean | undefined
    ariaControls: string | undefined
    ariaAutocomplete: 'list' | undefined
    ariaActiveDescendant: string | undefined
  }
  isOptionDisabled: (row: NormalizedSuggestion) => boolean
  isSuggestionSelected: (row: NormalizedSuggestion) => boolean
  suggestionsShowCheckmarks: boolean
}

export function useTagInputController(
  params: UseTagInputControllerParams
): UseTagInputControllerReturn {
  const {
    value,
    defaultValue,
    onChange,
    disabled = false,
    maxTags,
    maxTagCount,
    allowDuplicates,
    allowCustomTags,
    commitOnBlur,
    splitPattern,
    validateTag,
    suggestions,
    suggestionsMatch,
    suggestionsLimit,
    suggestionsExcludeSelected,
    suggestionsLoading,
    suggestionsLoadingText,
    suggestionsEmptyText,
    getOptionDisabled,
    onSuggestionsQueryChange,
    tagsAreaMaxHeight,
    wrapperClassName,
    wrapperStyle,
    inputProps,
  } = params

  const splitRegex = splitPattern ?? DEFAULT_TAG_INPUT_SPLIT
  const suggestionsDefined = suggestions != null
  const isControlled = value !== undefined
  const [internalTags, setInternalTags] = useState<TagInputTagValue[]>(() => defaultValue ?? [])
  const tags = useMemo(
    () => (isControlled ? (value ?? []) : internalTags),
    [isControlled, internalTags, value]
  )
  const tagsRef = useRef<TagInputTagValue[]>(tags)
  useLayoutEffect(() => {
    tagsRef.current = tags
  }, [tags])

  const normalizedSuggestions = useMemo(() => normalizeSuggestionsArray(suggestions), [suggestions])

  const isOptionDisabled = useCallback(
    (row: NormalizedSuggestion) => getOptionDisabled?.({ id: row.id, label: row.label }) ?? false,
    [getOptionDisabled]
  )

  const [draft, setDraft] = useState('')
  const draftRef = useRef(draft)
  useLayoutEffect(() => {
    draftRef.current = draft
  }, [draft])

  const [focused, setFocused] = useState(false)
  const [suppressList, setSuppressList] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [popoverMinWidth, setPopoverMinWidth] = useState<number>()
  const anchorRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const suggestionsListId = useId()

  useEffect(() => {
    onSuggestionsQueryChange?.(draft)
  }, [draft, onSuggestionsQueryChange])

  const tryAddTagValue = useCallback(
    (item: TagInputTagValue): boolean => {
      const lbl = tagLabel(item).trim()
      if (!lbl || disabled) return true
      if (validateTag && !validateTag(lbl)) return false
      const base = tagsRef.current
      if (maxTags != null && base.length >= maxTags) return false
      if (!allowDuplicates && base.some((t) => tagLabel(t) === lbl)) return true
      const next = [...base, item]
      if (!isControlled) setInternalTags(next)
      onChange?.(next)
      return true
    },
    [allowDuplicates, disabled, isControlled, maxTags, onChange, validateTag]
  )

  const commitLabelToTag = useCallback(
    (raw: string): boolean => {
      const t = raw.trim()
      if (!t) return true
      if (allowCustomTags) {
        return tryAddTagValue(t)
      }
      const row = findSuggestionByCommitLabel(normalizedSuggestions, t)
      if (!row || isOptionDisabled(row)) return false
      return tryAddTagValue(tagValueFromSuggestionRow(row))
    },
    [allowCustomTags, isOptionDisabled, normalizedSuggestions, tryAddTagValue]
  )

  const filtered = useMemo(
    () =>
      computeFilteredSuggestions({
        suggestionsDefined,
        normalized: normalizedSuggestions,
        draft,
        tags,
        allowDuplicates,
        excludeSelectedFromList: suggestionsExcludeSelected,
        suggestionsMatch,
        suggestionsLimit,
      }),
    [
      allowDuplicates,
      draft,
      normalizedSuggestions,
      suggestionsDefined,
      suggestionsExcludeSelected,
      suggestionsLimit,
      suggestionsMatch,
      tags,
    ]
  )

  const isSuggestionSelected = useCallback(
    (row: NormalizedSuggestion) => tags.some((t) => tagMatchesSuggestion(t, row)),
    [tags]
  )

  const suggestionsShowCheckmarks = !suggestionsExcludeSelected

  const queryNonEmpty = draft.trim().length > 0

  const panelOpen = computePanelOpen({
    suggestionsDefined,
    focused,
    suppressList,
    disabled,
    filteredLength: filtered.length,
    suggestionsLoading,
    queryNonEmpty,
  })

  const firstSelectableIndex = useMemo(() => {
    const i = filtered.findIndex((r) => !isOptionDisabled(r))
    return i >= 0 ? i : 0
  }, [filtered, isOptionDisabled])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- сброс подсветки при смене запроса или набора пунктов
    setHighlightIndex(firstSelectableIndex)
  }, [draft, firstSelectableIndex, filtered.length])

  useLayoutEffect(() => {
    if (!panelOpen || !anchorRef.current) return
    setPopoverMinWidth(anchorRef.current.offsetWidth)
  }, [panelOpen])

  useLayoutEffect(() => {
    if (!panelOpen || suggestionsLoading || filtered.length === 0) return
    document.getElementById(`${suggestionsListId}-opt-${highlightIndex}`)?.scrollIntoView({
      block: 'nearest',
    })
  }, [highlightIndex, panelOpen, suggestionsListId, suggestionsLoading, filtered.length])

  const commitDraft = useCallback(() => {
    const raw = draftRef.current.trim()
    if (!raw || disabled) return
    const parts = raw
      .split(splitRegex)
      .map((s) => s.trim())
      .filter(Boolean)
    const toAdd = parts.length ? parts : [raw]
    setDraft('')
    for (const p of toAdd) {
      if (maxTags != null && tagsRef.current.length >= maxTags) break
      commitLabelToTag(p)
    }
  }, [commitLabelToTag, disabled, maxTags, splitRegex])

  const addTagsFromPaste = useCallback(
    (parts: string[]) => {
      if (parts.length === 0 || disabled) return
      for (const p of parts) {
        if (maxTags != null && tagsRef.current.length >= maxTags) break
        commitLabelToTag(p)
      }
    },
    [commitLabelToTag, disabled, maxTags]
  )

  const pickSuggestion = useCallback(
    (row: NormalizedSuggestion) => {
      if (disabled || isOptionDisabled(row)) return

      if (suggestionsExcludeSelected) {
        if (maxTags != null && tagsRef.current.length >= maxTags) return
        if (!tryAddTagValue(tagValueFromSuggestionRow(row))) return
        setDraft('')
        setHighlightIndex(0)
        return
      }

      const selectedIdx = tagsRef.current.findIndex((t) => tagMatchesSuggestion(t, row))
      if (selectedIdx >= 0) {
        const next = tagsRef.current.filter((t) => !tagMatchesSuggestion(t, row))
        if (!isControlled) setInternalTags(next)
        onChange?.(next)
        return
      }

      if (maxTags != null && tagsRef.current.length >= maxTags) return
      tryAddTagValue(tagValueFromSuggestionRow(row))
      setDraft('')
      setHighlightIndex(0)
    },
    [
      disabled,
      isControlled,
      isOptionDisabled,
      maxTags,
      onChange,
      suggestionsExcludeSelected,
      tryAddTagValue,
    ]
  )

  const removeAt = useCallback(
    (index: number) => {
      if (disabled) return
      const base = tagsRef.current
      const next = base.filter((_, i) => i !== index)
      if (!isControlled) setInternalTags(next)
      onChange?.(next)
    },
    [disabled, isControlled, onChange]
  )

  const mergedWrapperClass = useMemo(
    () => clsx(tagInputContract.className, wrapperClassName),
    [wrapperClassName]
  )

  const scrollAreaStyle = useMemo(() => {
    if (tagsAreaMaxHeight === 'none') return { maxHeight: 'none' as const }
    if (tagsAreaMaxHeight === undefined) return undefined
    return {
      maxHeight:
        typeof tagsAreaMaxHeight === 'number' ? `${tagsAreaMaxHeight}px` : tagsAreaMaxHeight,
    }
  }, [tagsAreaMaxHeight])

  const mergedWrapperStyle = useMemo(
    () => ({ ...wrapperStyle, height: 'auto' as const }),
    [wrapperStyle]
  )

  const visibleTags = maxTagCount != null ? tags.slice(0, Math.max(0, maxTagCount)) : tags
  const hiddenTagCount = maxTagCount != null ? Math.max(0, tags.length - maxTagCount) : 0

  const moveHighlight = useCallback(
    (delta: 1 | -1) => {
      if (filtered.length === 0) return
      setHighlightIndex((i) => {
        let next = i
        for (let step = 0; step < filtered.length; step++) {
          next += delta
          if (next < 0) next = filtered.length - 1
          if (next >= filtered.length) next = 0
          if (!isOptionDisabled(filtered[next])) return next
        }
        return i
      })
    },
    [filtered, isOptionDisabled]
  )

  const highlightedRow = filtered[highlightIndex]
  const canPickHighlighted =
    !!highlightedRow && !isOptionDisabled(highlightedRow) && !suggestionsLoading

  const {
    onFocus: inputOnFocus,
    onBlur: inputOnBlur,
    onKeyDown: inputOnKeyDown,
    onPaste: inputOnPaste,
  } = inputProps

  const inputHandlers = useMemo(
    () => ({
      onChange: (e: ChangeEvent<HTMLInputElement>) => setDraft(e.target.value),
      onFocus: (e: FocusEvent<HTMLInputElement>) => {
        setFocused(true)
        setSuppressList(false)
        inputOnFocus?.(e)
      },
      onBlur: (e: FocusEvent<HTMLInputElement>) => {
        setFocused(false)
        setSuppressList(false)
        if (commitOnBlur) commitDraft()
        inputOnBlur?.(e)
      },
      onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
        inputOnKeyDown?.(e)
        if (e.defaultPrevented || disabled) return

        if (e.key === 'Escape') {
          if (suggestionsDefined && panelOpen) {
            e.preventDefault()
            setSuppressList(true)
          }
          return
        }

        if (e.key === 'ArrowDown') {
          if (!suggestionsDefined || filtered.length === 0 || suggestionsLoading) return
          e.preventDefault()
          setSuppressList(false)
          moveHighlight(1)
          return
        }

        if (e.key === 'ArrowUp') {
          if (!suggestionsDefined || filtered.length === 0 || suggestionsLoading) return
          e.preventDefault()
          setSuppressList(false)
          moveHighlight(-1)
          return
        }

        if (e.key === 'Tab' && !e.shiftKey) {
          if (suggestionsDefined && panelOpen && canPickHighlighted && highlightedRow) {
            e.preventDefault()
            pickSuggestion(highlightedRow)
            return
          }
        }

        if (e.key === 'Enter') {
          e.preventDefault()
          const trimmed = draftRef.current.trim()
          if (trimmed === '') {
            if (suggestionsDefined && panelOpen && canPickHighlighted && highlightedRow) {
              pickSuggestion(highlightedRow)
            }
            return
          }
          commitDraft()
          return
        }

        if (e.key === ',' || e.key === ';') {
          e.preventDefault()
          commitDraft()
          return
        }

        if (e.key === 'Backspace') {
          const el = e.currentTarget
          const currentTags = tagsRef.current
          if (
            draftRef.current === '' &&
            currentTags.length > 0 &&
            el.selectionStart === 0 &&
            el.selectionEnd === 0
          ) {
            e.preventDefault()
            removeAt(currentTags.length - 1)
          }
        }
      },
      onPaste: (e: ClipboardEvent<HTMLInputElement>) => {
        inputOnPaste?.(e)
        if (e.defaultPrevented || disabled) return
        const text = e.clipboardData.getData('text/plain')
        if (!text) return
        const parts = text
          .split(splitRegex)
          .map((s) => s.trim())
          .filter(Boolean)
        if (parts.length <= 1 && !/[,;\n]/.test(text)) return
        e.preventDefault()
        addTagsFromPaste(parts)
      },
    }),
    [
      addTagsFromPaste,
      canPickHighlighted,
      commitDraft,
      commitOnBlur,
      disabled,
      filtered.length,
      highlightedRow,
      inputOnBlur,
      inputOnFocus,
      inputOnKeyDown,
      inputOnPaste,
      moveHighlight,
      panelOpen,
      pickSuggestion,
      removeAt,
      splitRegex,
      suggestionsDefined,
      suggestionsLoading,
    ]
  )

  const comboboxAria = useMemo(
    () => ({
      role: suggestionsDefined ? ('combobox' as const) : undefined,
      ariaExpanded: suggestionsDefined ? panelOpen : undefined,
      ariaControls: suggestionsDefined ? suggestionsListId : undefined,
      ariaAutocomplete: suggestionsDefined ? ('list' as const) : undefined,
      ariaActiveDescendant:
        suggestionsDefined &&
        panelOpen &&
        !suggestionsLoading &&
        canPickHighlighted &&
        highlightedRow
          ? `${suggestionsListId}-opt-${highlightIndex}`
          : undefined,
    }),
    [
      canPickHighlighted,
      highlightIndex,
      highlightedRow,
      panelOpen,
      suggestionsDefined,
      suggestionsListId,
      suggestionsLoading,
    ]
  )

  return {
    mergedWrapperClass,
    mergedWrapperStyle,
    scrollAreaStyle,
    anchorRef,
    suggestionsListId,
    draft,
    panelOpen,
    filtered,
    highlightIndex,
    suggestionsLoading,
    suggestionsLoadingText,
    suggestionsEmptyText,
    popoverMinWidth,
    visibleTags,
    hiddenTagCount,
    removeAt,
    pickSuggestion,
    inputHandlers,
    comboboxAria,
    isOptionDisabled,
    isSuggestionSelected,
    suggestionsShowCheckmarks,
  }
}
