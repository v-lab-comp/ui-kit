import {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type HTMLProps,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import {
  useClick,
  useDismiss,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
  type ElementProps,
  type OpenChangeReason,
} from '@floating-ui/react'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { useSelectDropdownFloating } from './useSelectDropdownFloating'
import type { SelectPlacement, SelectVariant } from './SelectInput.types'

/** Шаг PageUp / PageDown */
const PAGE_JUMP = 10
/** Отключённых пунктов нет: недорисованные (ленивая подгрузка) тоже доступны навигации */
const NO_DISABLED_INDICES: number[] = []

type AnyProps = Record<string, unknown>
type UserProps = HTMLProps<HTMLElement>

export type UseSelectInteractionsOptions = {
  disabled?: boolean
  /** `aria-multiselectable` у listbox */
  multiple?: boolean
  /** Закрывать список после выбора (одиночный режим) */
  closeOnSelect: boolean
  placement: SelectPlacement
  variant: SelectVariant
  dropdownWidth?: number
  /** Сколько пунктов доступно навигации (после фильтра, включая ещё не отрисованные) */
  itemCount: number
  /** Подписи пунктов для typeahead; `null` — typeahead выключен (в панели есть поиск) */
  typeaheadLabels: readonly string[] | null
  /** В панели есть поле поиска: при открытии фокус уходит в него, оно становится combobox */
  hasSearch: boolean
  /** Выбранный пункт — с него начинается навигация при открытии */
  selectedIndex: number | null
  /** Выбор пункта: Enter / Space / клик */
  onSelectIndex: (index: number) => void
  /** Delete / Backspace на триггере очищают значение; `undefined` — очищать нечего */
  onClear?: () => void
  /** Открытие / закрытие (сброс поиска, ленивой отрисовки) */
  onOpenChange?: (open: boolean) => void
  /** Активный пункт сменился — отрисовать его, если он ещё за пределами ленивой страницы */
  onActiveIndexChange?: (index: number) => void
}

/**
 * Поведение селекта на хуках floating-ui: открытие по клику (`useClick`), закрытие по Escape,
 * клику снаружи (`useDismiss`, Escape не всплывает к модалке), Tab и уходу фокуса;
 * навигация стрелками / Home / End с виртуальным фокусом (`useListNavigation`,
 * `aria-activedescendant` на элементе с фокусом), typeahead (`useTypeahead`) и роли (`useRole`).
 * Слушателей на document нет: клавиши обрабатывает триггер или поле поиска.
 *
 * Фокус: без поиска остаётся на триггере; с поиском при открытии уходит в поле поиска
 * и при закрытии возвращается на триггер.
 */
export function useSelectInteractions({
  disabled = false,
  multiple = false,
  closeOnSelect,
  placement,
  variant,
  dropdownWidth,
  itemCount,
  typeaheadLabels,
  hasSearch,
  selectedIndex,
  onSelectIndex,
  onClear,
  onOpenChange,
  onActiveIndexChange,
}: UseSelectInteractionsOptions) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndexState] = useState<number | null>(null)
  const listboxId = useId()
  const listRef = useRef<Array<HTMLElement | null>>([])
  const labelsRef = useRef<Array<string | null>>([])
  const triggerNodeRef = useRef<HTMLElement | null>(null)
  const floatingNodeRef = useRef<HTMLElement | null>(null)
  const searchNodeRef = useRef<HTMLInputElement | null>(null)
  /** Пункт, который станет активным при следующем открытии (typeahead, Home / End) */
  const pendingActiveIndexRef = useRef<number | null>(null)
  const typingRef = useRef(false)
  /** Space выбрал пункт на keydown — гасим keyup, иначе кнопка снова «кликнет» */
  const spaceHandledRef = useRef(false)

  const getOptionId = useCallback((index: number) => `${listboxId}-option-${index}`, [listboxId])

  const setActiveIndex = useCallback(
    (index: number | null) => {
      setActiveIndexState(index)
      if (index !== null) onActiveIndexChange?.(index)
    },
    [onActiveIndexChange]
  )

  // Отключили поле на открытом списке — закрываем (корректировка состояния при рендере)
  if (disabled && open) {
    setOpen(false)
    setActiveIndexState(null)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen === open) return
    if (nextOpen) {
      if (disabled) return
      // Сначала сброс поиска / ленивой отрисовки, затем активный пункт: он может быть
      // за пределами первой страницы и должен остаться отрисованным
      onOpenChange?.(true)
      const initialIndex = pendingActiveIndexRef.current ?? selectedIndex
      pendingActiveIndexRef.current = null
      setActiveIndex(initialIndex)
      setOpen(true)
      return
    }
    // Фокус в панели (поле поиска) пропадёт вместе с ней — возвращаем его на триггер
    const floatingNode = floatingNodeRef.current
    if (floatingNode?.contains(floatingNode.ownerDocument.activeElement)) {
      triggerNodeRef.current?.focus({ preventScroll: true })
    }
    setActiveIndexState(null)
    setOpen(false)
    onOpenChange?.(false)
  }

  const floating = useSelectDropdownFloating({
    open,
    onOpenChange: handleOpenChange,
    placement,
    variant,
    dropdownWidth,
  })
  const { context } = floating

  const changeOpen = (nextOpen: boolean, reason?: OpenChangeReason) =>
    context.onOpenChange(nextOpen, undefined, reason)

  // Длина списка навигации — все пункты, в том числе ещё не отрисованные. Эффект объявлен
  // до useListNavigation, чтобы её эффекты видели актуальную длину.
  useLayoutEffect(() => {
    listRef.current.length = itemCount
  }, [itemCount])

  useLayoutEffect(() => {
    labelsRef.current = typeaheadLabels ? [...typeaheadLabels] : []
  }, [typeaheadLabels])

  const click = useClick(context, { enabled: !disabled, stickIfOpen: false })
  // Escape не всплывает дальше селекта: модалка вокруг него не закрывается
  const dismiss = useDismiss(context, { enabled: !disabled, bubbles: { escapeKey: false } })
  const role = useRole(context, { role: 'listbox' })
  const navigation = useListNavigation(context, {
    enabled: !disabled,
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: false,
    disabledIndices: NO_DISABLED_INDICES,
  })
  // useTypeahead сбрасывает набранную строку при открытии списка. Первый символ сам открывает
  // список (APG), поэтому для typeahead список «всегда открыт» — иначе «ky» искало бы только «y».
  // Строка по-прежнему сбрасывается по таймауту после паузы в наборе.
  const typeaheadContext = useMemo(() => ({ ...context, open: true }), [context])
  const typeahead = useTypeahead(typeaheadContext, {
    enabled: !disabled && typeaheadLabels !== null,
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: (index) => {
      if (open) {
        setActiveIndex(index)
        return
      }
      // APG: символ на закрытом списке открывает его и подсвечивает совпадение
      pendingActiveIndexRef.current = index
      changeOpen(true)
    },
    onTypingChange: (typing) => {
      typingRef.current = typing
    },
  })

  const selectIndex = (index: number) => {
    onSelectIndex(index)
    if (closeOnSelect) changeOpen(false)
  }

  const isInsideWidget = (node: EventTarget | null) =>
    node instanceof Node &&
    (node === searchNodeRef.current ||
      !!triggerNodeRef.current?.contains(node) ||
      !!floatingNodeRef.current?.contains(node))

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const fromSearch = event.target === searchNodeRef.current
    if (event.key === 'Tab') {
      if (!open) return
      // Браузер переведёт фокус к следующему элементу уже от триггера
      if (fromSearch) triggerNodeRef.current?.focus({ preventScroll: true })
      changeOpen(false, 'focus-out')
      return
    }
    if (!fromSearch && (event.key === 'Delete' || event.key === 'Backspace') && onClear) {
      event.preventDefault()
      onClear()
      return
    }
    if (!open) {
      if ((event.key === 'Home' || event.key === 'End') && itemCount > 0) {
        event.preventDefault()
        pendingActiveIndexRef.current = event.key === 'Home' ? 0 : itemCount - 1
        changeOpen(true, 'list-navigation')
      }
      return
    }
    switch (event.key) {
      case 'PageDown':
      case 'PageUp': {
        event.preventDefault()
        if (itemCount === 0) return
        const step = event.key === 'PageDown' ? PAGE_JUMP : -PAGE_JUMP
        const from = activeIndex ?? (step > 0 ? -1 : itemCount)
        setActiveIndex(Math.min(itemCount - 1, Math.max(0, from + step)))
        return
      }
      case 'Enter':
        event.preventDefault()
        if (activeIndex === null) changeOpen(false)
        else selectIndex(activeIndex)
        return
      case ' ':
        // В поле поиска пробел — это символ; во время typeahead — часть строки
        if (fromSearch || typingRef.current) return
        event.preventDefault()
        spaceHandledRef.current = true
        if (activeIndex === null) changeOpen(false)
        else selectIndex(activeIndex)
        return
    }
  }

  const handleFocusOut = (event: FocusEvent<HTMLElement>) => {
    if (!open) return
    const next = event.relatedTarget
    // null — окно потеряло фокус или клик в пустое место (его закрывает useDismiss)
    if (next === null || isInsideWidget(next)) return
    changeOpen(false, 'focus-out')
  }

  const keyboard: ElementProps = {
    reference: {
      onKeyDown: handleKeyDown,
      onKeyUp: (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === ' ' && spaceHandledRef.current) {
          spaceHandledRef.current = false
          event.preventDefault()
        }
      },
      onBlur: handleFocusOut,
    },
    floating: {
      onKeyDown: handleKeyDown,
      onBlur: handleFocusOut,
      // Клик по пункту не забирает фокус у триггера / поля поиска
      onMouseDown: (event: MouseEvent<HTMLElement>) => {
        if (event.target !== searchNodeRef.current) event.preventDefault()
      },
    },
  }

  // Свои обработчики первыми: Enter / Space гасятся до нативного клика кнопки (useClick)
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    keyboard,
    { reference: role.reference },
    click,
    dismiss,
    navigation,
    typeahead,
  ])

  // Поле поиска появляется вместе с панелью — переводим фокус в него, когда панель смонтирована
  useLayoutEffect(() => {
    if (open && hasSearch && floating.elements.floating) {
      searchNodeRef.current?.focus({ preventScroll: true })
    }
  }, [open, hasSearch, floating.elements.floating])

  // При открытии мышью floating-ui не прокручивает к выбранному пункту — делаем это сами,
  // когда панель уже на своём месте (иначе прокрутится страница)
  const activeIndexRef = useRef(activeIndex)
  useLayoutEffect(() => {
    activeIndexRef.current = activeIndex
  })
  useLayoutEffect(() => {
    if (!open || !floating.isPositioned) return
    const index = activeIndexRef.current
    const node = index === null ? null : listRef.current[index]
    node?.scrollIntoView?.({ block: 'nearest' })
  }, [open, floating.isPositioned])

  const triggerRef = useMergeRefs<HTMLElement>([floating.refs.setReference, triggerNodeRef])
  const floatingRef = useMergeRefs<HTMLElement>([floating.refs.setFloating, floatingNodeRef])
  const activeOptionId = open && activeIndex !== null ? getOptionId(activeIndex) : undefined

  return {
    open,
    activeIndex,
    listboxId,
    getOptionId,
    floatingStyles: floating.floatingStyles,
    basePlacement: floating.basePlacement,
    /** ref кнопки-триггера: элемент взаимодействия и возврата фокуса */
    triggerRef,
    /** ref якоря позиционирования (корень поля): от него считаются отступ и ширина панели */
    positionRef: floating.refs.setPositionReference,
    /** ref floating-элемента (портальная обёртка панели) */
    floatingRef,
    close: () => changeOpen(false),
    setActiveIndex,
    focusTrigger: () => triggerNodeRef.current?.focus({ preventScroll: true }),
    /** Пропсы триггера: роль combobox, aria-expanded / controls / activedescendant, обработчики */
    getTriggerProps: (userProps?: UserProps): AnyProps =>
      getReferenceProps({
        ...userProps,
        'aria-controls': open ? listboxId : undefined,
        'aria-activedescendant': hasSearch ? undefined : activeOptionId,
      }),
    /** Пропсы портальной обёртки панели: обработчики клавиатуры, Escape, ухода фокуса */
    getFloatingProps: (userProps?: UserProps): AnyProps =>
      getFloatingProps({
        ...userProps,
        // Роль и активный пункт — у listbox и combobox, а не у обёртки
        'aria-activedescendant': undefined,
        'aria-orientation': undefined,
      }),
    getListboxProps: () => ({
      id: listboxId,
      role: 'listbox',
      'aria-multiselectable': multiple || undefined,
    }),
    /** Пропсы пункта списка с индексом навигации `index` */
    getOptionProps: (index: number, selected: boolean) => ({
      ...getItemProps({
        id: getOptionId(index),
        role: 'option',
        'aria-selected': selected,
        onClick: () => selectIndex(index),
      }),
      ref: (node: HTMLElement | null) => {
        listRef.current[index] = node
      },
    }),
    /** Пропсы `<input>` поиска: он — combobox, пока список открыт */
    getSearchProps: () => ({
      ref: searchNodeRef,
      role: 'combobox',
      'aria-expanded': true,
      'aria-controls': listboxId,
      'aria-activedescendant': activeOptionId,
      'aria-autocomplete': 'list' as const,
      // Home / End двигают курсор в поле, а не активный пункт
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Home' || event.key === 'End') event.stopPropagation()
      },
    }),
  }
}

export type SelectInteractions = ReturnType<typeof useSelectInteractions>
