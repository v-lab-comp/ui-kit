import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { HTMLProps, KeyboardEvent, KeyboardEventHandler } from 'react'
import {
  useDismiss,
  useFloatingRootContext,
  useInteractions,
  useListNavigation,
  useRole,
  type OpenChangeReason,
} from '@floating-ui/react'
import type {
  TagInputSuggestion,
  TagInputSuggestionObject,
  TagInputSuggestionsMatch,
  TagInputTagValue,
} from '../types'
import {
  computeFilteredSuggestions,
  findSuggestionByCommitLabel,
  normalizeSuggestionsArray,
  tagMatchesSuggestion,
  type NormalizedSuggestion,
} from '../model'

export type UseSuggestionsListboxParams = {
  /** `undefined` — список выключен: поле остаётся обычным textbox. */
  suggestions: readonly TagInputSuggestion[] | undefined
  /** Текст в поле — фильтр списка. */
  query: string
  tags: readonly TagInputTagValue[]
  allowDuplicates: boolean
  match: TagInputSuggestionsMatch
  limit: number
  excludeSelected: boolean
  loading: boolean
  disabled: boolean
  getOptionDisabled: ((row: TagInputSuggestionObject) => boolean) | undefined
  onQueryChange: ((query: string) => void) | undefined
}

export type SuggestionsListbox = {
  /** Есть `suggestions` — поле работает как combobox. */
  enabled: boolean
  /** Попап открыт (список, загрузка или «нет совпадений»). */
  open: boolean
  /** В попапе отрисован listbox с пунктами. */
  listVisible: boolean
  loading: boolean
  options: NormalizedSuggestion[]
  /** Пункт, к которому перешли стрелками (`null` — фокус в поле, пункт не выбран). */
  activeIndex: number | null
  activeOption: NormalizedSuggestion | undefined
  /** Выбранные пункты остаются в списке с галочкой, выбор работает как toggle. */
  showCheckmarks: boolean
  listId: string
  optionId: (index: number) => string
  /** Регистрация DOM-узла пункта для навигации стрелками. */
  setOptionElement: (index: number, el: HTMLElement | null) => void
  setReference: (el: HTMLElement | null) => void
  setListbox: (el: HTMLElement | null) => void
  isOptionDisabled: (row: NormalizedSuggestion) => boolean
  isOptionSelected: (row: NormalizedSuggestion) => boolean
  /** Доступный пункт с точно такой подписью (без учёта регистра) — для `allowCustomTags={false}`. */
  findOptionByLabel: (label: string) => NormalizedSuggestion | undefined
  setFocused: (focused: boolean) => void
  /** Снова показать список, скрытый по Esc или клику снаружи. */
  reopen: () => void
  /** Скрыть список, не убирая фокус с поля. */
  dismiss: () => void
  /**
   * Пропсы поля ввода: роль combobox и ARIA-состояние.
   * Навигация стрелками и Esc выполняются, только если `onKeyDown` из `userProps` не вызвал `preventDefault()`.
   */
  getComboboxProps: (userProps: HTMLProps<HTMLInputElement>) => Record<string, unknown>
  getListboxProps: (userProps: HTMLProps<HTMLElement>) => Record<string, unknown>
}

/**
 * Список подсказок по паттерну WAI-ARIA combobox + listbox: фокус остаётся в поле,
 * активный пункт передаётся через `aria-activedescendant`. Клавиатура и закрытие — хуки floating-ui.
 */
export function useSuggestionsListbox({
  suggestions,
  query,
  tags,
  allowDuplicates,
  match,
  limit,
  excludeSelected,
  loading,
  disabled,
  getOptionDisabled,
  onQueryChange,
}: UseSuggestionsListboxParams): SuggestionsListbox {
  const enabled = suggestions != null
  const listId = useId()
  const optionRefs = useRef<Array<HTMLElement | null>>([])
  const [reference, setReference] = useState<HTMLElement | null>(null)
  const [listbox, setListbox] = useState<HTMLElement | null>(null)
  const [focused, setFocusedState] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    onQueryChange?.(query)
  }, [query, onQueryChange])

  const normalized = useMemo(() => normalizeSuggestionsArray(suggestions), [suggestions])
  const options = useMemo(
    () =>
      computeFilteredSuggestions({
        normalized,
        query,
        tags,
        allowDuplicates,
        excludeSelectedFromList: excludeSelected,
        suggestionsMatch: match,
        suggestionsLimit: limit,
      }),
    [allowDuplicates, excludeSelected, limit, match, normalized, query, tags]
  )

  const isOptionDisabled = (row: NormalizedSuggestion) =>
    getOptionDisabled?.({ id: row.id, label: row.label }) ?? false

  const open =
    enabled &&
    focused &&
    !dismissed &&
    !disabled &&
    (options.length > 0 || loading || query.trim() !== '')
  const listVisible = open && !loading && options.length > 0

  /* Активный пункт привязан к набору пунктов и запросу: новый ввод или другой список сбрасывают
     подсветку, и Enter снова добавляет набранный текст. */
  const listKey = `${query}\u0000${options.map((row) => row.id).join('\u0000')}`
  const [active, setActive] = useState<{ index: number | null; listKey: string }>({
    index: null,
    listKey,
  })
  const activeIndex = listVisible && active.listKey === listKey ? active.index : null
  const setActiveIndex = (index: number | null) => setActive({ index, listKey })

  const candidate = activeIndex != null ? options[activeIndex] : undefined
  const activeOption = candidate && !isOptionDisabled(candidate) ? candidate : undefined

  const edgeIndex = (fromEnd: boolean): number | null => {
    const indices = options.map((_, i) => i).filter((i) => !isOptionDisabled(options[i]))
    const index = fromEnd ? indices[indices.length - 1] : indices[0]
    return index ?? null
  }

  const context = useFloatingRootContext({
    open,
    onOpenChange: (nextOpen: boolean, event?: Event, reason?: OpenChangeReason) => {
      if (!nextOpen) {
        setDismissed(true)
        return
      }
      setDismissed(false)
      // Список закрыт и нажата стрелка: открываем сразу с первым (↓) или последним (↑) пунктом
      if (reason === 'list-navigation') {
        const key = (event as { key?: string } | undefined)?.key
        setActiveIndex(edgeIndex(key === 'ArrowUp'))
      }
    },
    elements: { reference, floating: listbox },
  })

  const listNavigation = useListNavigation(context, {
    enabled,
    listRef: optionRefs,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
    // Подсветку даёт только навигация стрелками: иначе Enter выбирал бы пункт вместо набранного текста
    focusItemOnOpen: false,
    // Наведение мышью не двигает подсветку — как и раньше, у пункта только :hover
    focusItemOnHover: false,
  })
  const dismiss = useDismiss(context, { enabled })
  const role = useRole(context, { enabled, role: 'combobox' })
  const { getReferenceProps, getFloatingProps } = useInteractions([listNavigation, dismiss, role])

  const optionId = (index: number) => `${listId}-opt-${index}`

  return {
    enabled,
    open,
    listVisible,
    loading,
    options,
    activeIndex,
    activeOption,
    showCheckmarks: !excludeSelected,
    listId,
    optionId,
    setOptionElement: (index, el) => {
      optionRefs.current[index] = el
    },
    setReference,
    setListbox,
    isOptionDisabled,
    isOptionSelected: (row) => tags.some((t) => tagMatchesSuggestion(t, row)),
    findOptionByLabel: (label) => {
      const row = findSuggestionByCommitLabel(normalized, label)
      return row && !isOptionDisabled(row) ? row : undefined
    },
    setFocused: (next) => {
      setFocusedState(next)
      setDismissed(false)
    },
    reopen: () => setDismissed(false),
    dismiss: () => setDismissed(true),
    getComboboxProps: ({ onKeyDown, ...userProps }) => {
      const props = getReferenceProps(userProps)
      const interactionKeyDown = props.onKeyDown as
        | KeyboardEventHandler<HTMLInputElement>
        | undefined
      if (!enabled) return { ...props, onKeyDown }
      return {
        ...props,
        'aria-expanded': listVisible,
        'aria-controls': listVisible ? listId : undefined,
        'aria-activedescendant':
          activeOption && activeIndex != null ? optionId(activeIndex) : undefined,
        onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
          onKeyDown?.(e)
          if (!e.defaultPrevented) interactionKeyDown?.(e)
        },
      }
    },
    getListboxProps: (userProps) =>
      getFloatingProps({
        ...userProps,
        id: listId,
        'aria-multiselectable': !excludeSelected || undefined,
      }),
  }
}
