import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { HTMLProps } from 'react'
import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react'
import type { FloatingContext } from '@floating-ui/react'
import { useControllableState } from '@/utils/useControllableState'

export interface UseDropdownMenuOptions {
  /** Подписи пунктов по порядку — для поиска по первым буквам (typeahead) */
  labels: ReadonlyArray<string | null>
  /** Контролируемое открытие; `undefined` — состояние хранится внутри */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Индекс выбранного пункта: на него ставится фокус при открытии */
  selectedIndex?: number | null
  /**
   * Какие стрелки двигают фокус: `vertical` — ↑/↓ (как в APG menu),
   * `both` — ещё и ←/→ (для меню-сетки, где пункты идут в несколько колонок)
   */
  orientation?: 'vertical' | 'both'
}

export interface UseDropdownMenuResult {
  open: boolean
  setOpen: (open: boolean) => void
  /** Контекст для `FloatingFocusManager` (фокус внутрь при открытии и назад на триггер) */
  context: FloatingContext
  setReference: (node: HTMLElement | null) => void
  setFloating: (node: HTMLElement | null) => void
  getReferenceProps: (props?: HTMLProps<Element>) => Record<string, unknown>
  /** Пропсы элемента с role="menu" */
  getMenuProps: (props?: HTMLProps<HTMLElement>) => Record<string, unknown>
  /** Пропсы пункта: roving tabindex, ref для навигации и закрытие меню после выбора */
  getItemProps: (index: number, props?: HTMLProps<HTMLElement>) => Record<string, unknown>
}

/**
 * Общая логика выпадающего меню по WAI-ARIA APG (menu button):
 * клик/↓/↑ по триггеру открывает, ↑/↓/Home/End и первые буквы двигают фокус,
 * Escape и клик снаружи закрывают, фокус возвращается на триггер.
 * Положение меню задаёт скин (CSS), поэтому floatingStyles не используются.
 * Внутренний примитив для AppSwitcher и SidebarHeaderCard.
 */
export function useDropdownMenu({
  labels,
  open: openProp,
  onOpenChange,
  selectedIndex = null,
  orientation = 'vertical',
}: UseDropdownMenuOptions): UseDropdownMenuResult {
  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: false,
    onChange: onOpenChange,
  })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef<Array<HTMLElement | null>>([])
  // Ref обновляется на каждом рендере: typeahead читает подписи в обработчике клавиш
  const labelsRef = useRef<Array<string | null>>([...labels])
  useLayoutEffect(() => {
    labelsRef.current = [...labels]
  }, [labels])

  const { refs, context } = useFloating<HTMLElement>({ open, onOpenChange: setOpen })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
    focusItemOnOpen: true,
    orientation,
  })
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: open ? setActiveIndex : undefined,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
    typeahead,
  ])

  const getMenuItemProps = useCallback(
    (index: number, props: HTMLProps<HTMLElement> = {}) =>
      getItemProps({
        ...props,
        ref: (node: HTMLElement | null) => {
          listRef.current[index] = node
        },
        onClick: (event) => {
          props.onClick?.(event)
          setOpen(false)
        },
      }),
    [getItemProps, setOpen]
  )

  return {
    open,
    setOpen,
    context,
    setReference: refs.setReference,
    setFloating: refs.setFloating,
    getReferenceProps,
    getMenuProps: getFloatingProps,
    getItemProps: getMenuItemProps,
  }
}
