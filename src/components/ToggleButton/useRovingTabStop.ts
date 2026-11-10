import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'

/** Маркер элемента roving-группы: по нему индекс в DOM совпадает с индексом Composite из floating-ui. */
export const ROVING_ITEM_ATTR = 'data-roving-item'

const ITEM_SELECTOR = `[${ROVING_ITEM_ATTR}]`

function isEnabled(el: HTMLElement) {
  return !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true'
}

export interface UseRovingTabStopOptions {
  /** CSS-селектор выбранного элемента (`[aria-pressed="true"]`, `[aria-checked="true"]` …). */
  selectedSelector: string
  /**
   * true — tab stop всегда на выбранном элементе, пока фокус вне группы (Tabs, radiogroup).
   * false — tab stop остаётся там, где пользователь был в последний раз (ToggleGroup).
   */
  followSelection?: boolean
  /** Фокус переведён с клавиатуры (стрелки, Home/End) — для автоматической активации. */
  onKeyboardNavigate?: (item: HTMLElement) => void
}

/**
 * Roving tabindex поверх `Composite` из `@floating-ui/react`: стрелки и пропуск disabled
 * делает Composite, хук управляет его `activeIndex` и добавляет Home/End.
 *
 * Гарантия: в группе всегда ровно один tab stop — текущий элемент, если он есть и доступен,
 * иначе первый выбранный доступный, иначе первый доступный.
 * Элементы помечаются атрибутом {@link ROVING_ITEM_ATTR}.
 */
export function useRovingTabStop<T extends HTMLElement>({
  selectedSelector,
  followSelection = false,
  onKeyboardNavigate,
}: UseRovingTabStopOptions) {
  const containerRef = useRef<T>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const initializedRef = useRef(false)
  // Навигация пришла с клавиатуры: Composite сначала вызывает onNavigate, затем focus().
  const keyboardRef = useRef(false)

  const getItems = useCallback(
    () => Array.from(containerRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? []),
    []
  )

  // После каждого рендера чиним tab stop: элементы могли добавиться, исчезнуть или стать disabled.
  // Состояние берётся из DOM, поэтому эффект без зависимостей; setState — только при расхождении.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const items = getItems()
    if (items.length === 0) return
    const selected = items.findIndex((el) => el.matches(selectedSelector) && isEnabled(el))
    const focusInside = containerRef.current?.contains(document.activeElement) ?? false
    const preferSelected = !initializedRef.current || (followSelection && !focusInside)
    initializedRef.current = true

    const current = items[activeIndex]
    let next = activeIndex
    if (preferSelected && selected !== -1) next = selected
    else if (!current || !isEnabled(current))
      next = selected !== -1 ? selected : items.findIndex(isEnabled)
    if (next !== -1 && next !== activeIndex) setActiveIndex(next)
  })

  const onNavigate = useCallback(
    (index: number) => {
      setActiveIndex(index)
      if (!keyboardRef.current) return
      keyboardRef.current = false
      const item = getItems()[index]
      if (item) onKeyboardNavigate?.(item)
    },
    [getItems, onKeyboardNavigate]
  )

  /** Вешается на корень Composite: отмечает клавиатурную навигацию и обрабатывает Home/End. */
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      keyboardRef.current = true
      // Флаг живёт только в пределах этого keydown (Composite обрабатывает его синхронно)
      queueMicrotask(() => {
        keyboardRef.current = false
      })
      if (e.key !== 'Home' && e.key !== 'End') return
      const items = getItems()
      const enabled = items.filter(isEnabled)
      const target = e.key === 'Home' ? enabled[0] : enabled[enabled.length - 1]
      if (!target) return
      e.preventDefault()
      onNavigate(items.indexOf(target))
      target.focus()
    },
    [getItems, onNavigate]
  )

  return { containerRef, activeIndex, onNavigate, onKeyDown }
}
