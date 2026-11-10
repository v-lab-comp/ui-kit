import type { HTMLAttributes, ReactNode } from 'react'
import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import clsx from 'clsx'
import { Composite, CompositeItem } from '@floating-ui/react'
import { TabsContext, useTabsContext } from './TabsContext'
import type { TabsContextValue } from './TabsContext'
import { contractPart } from '@/theme/contract'
import { tabsContract } from '@/theme/contracts/tabs'
import { ROVING_ITEM_ATTR, useRovingTabStop } from '@/components/ToggleButton/useRovingTabStop'
import { useControllableState } from '@/utils/useControllableState'
import { useMergeRefs } from '@/utils/useMergeRefs'

export type { TabsContextValue } from './TabsContext'

export interface TabsProps {
  /**
   * `Tabs.List` с вкладками и `Tabs.Panel`. Без `Tabs.List` все дети, кроме `Tabs.Panel`,
   * автоматически оборачиваются в список вкладок (прежняя разметка).
   */
  children: ReactNode
  /** Значение по умолчанию (неконтролируемый режим) */
  defaultValue?: string
  /** Контролируемый режим: `value !== undefined` (смену получайте через `onChange`) */
  value?: string
  onChange?: (value: string) => void
  /** Доступное имя списка вкладок, когда `Tabs.List` не используется */
  'aria-label'?: string
  /** id элемента-подписи списка вкладок, когда `Tabs.List` не используется */
  'aria-labelledby'?: string
}

const tabId = (id: string, value: string) => `${id}-tab-${value}`
const panelId = (id: string, value: string) => `${id}-panel-${value}`

function TabsRoot({
  children,
  defaultValue,
  value: valueProp,
  onChange: onChangeProp,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: TabsProps) {
  const instanceId = useId()
  const [requested, setValue] = useControllableState<string>({
    value: valueProp,
    defaultValue: defaultValue ?? '',
    onChange: onChangeProp,
  })

  // Вкладки регистрируются через контекст — обёртки и фрагменты вокруг Tabs.Tab не мешают
  const [values, setValues] = useState<string[]>([])
  const register = useCallback((value: string) => {
    setValues((prev) => (prev.includes(value) ? prev : [...prev, value]))
    return () => setValues((prev) => prev.filter((v) => v !== value))
  }, [])

  // Пока вкладки не зарегистрированы (первый рендер, SSR) доверяем запрошенному значению
  const resolvedValue =
    values.length === 0 || values.includes(requested) ? requested : (values[0] ?? '')

  const contextValue: TabsContextValue = useMemo(
    () => ({ value: resolvedValue, onChange: setValue, values, register, id: instanceId }),
    [resolvedValue, setValue, values, register, instanceId]
  )

  const hasList = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === TabsList
  )

  let content: ReactNode = children
  if (!hasList) {
    // Прежняя разметка без Tabs.List: вкладки — в список, панели — после него
    const tabs: ReactNode[] = []
    const panels: ReactNode[] = []
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === TabsPanel) panels.push(child)
      else tabs.push(child)
    })
    content = (
      <>
        <TabsList aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
          {tabs}
        </TabsList>
        {panels}
      </>
    )
  }

  return <TabsContext.Provider value={contextValue}>{content}</TabsContext.Provider>
}

export type TabsListProps = HTMLAttributes<HTMLDivElement>

/**
 * Список вкладок (`role="tablist"`) — APG Tabs: один tab stop на активной вкладке,
 * ←/→ и Home/End переводят фокус и сразу активируют вкладку (automatic activation).
 */
const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { children, className, onKeyDown, ...props },
  ref
) {
  const { value, onChange } = useTabsContext()
  const roving = useRovingTabStop<HTMLDivElement>({
    selectedSelector: '[aria-selected="true"]',
    followSelection: true,
    onKeyboardNavigate: (item) => {
      const next = item.dataset.tabValue
      if (next !== undefined && next !== value) onChange(next)
    },
  })
  const mergedRef = useMergeRefs([roving.containerRef, ref])

  return (
    <div className={tabsContract.className}>
      <Composite
        orientation="horizontal"
        activeIndex={roving.activeIndex}
        onNavigate={roving.onNavigate}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
          onKeyDown?.(e as React.KeyboardEvent<HTMLDivElement>)
          roving.onKeyDown(e)
        }}
        render={(htmlProps) => (
          <div
            {...htmlProps}
            ref={mergedRef}
            role="tablist"
            className={clsx(contractPart(tabsContract, 'list'), className)}
            {...props}
          >
            {children}
          </div>
        )}
      />
      <div className={contractPart(tabsContract, 'separator')} aria-hidden />
    </div>
  )
})

export interface TabsTabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  value: string
  children: ReactNode
  disabled?: boolean
}

const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(function TabsTab(
  { value, children, className, onClick, onFocus, ...props },
  ref
) {
  const { value: activeValue, onChange, register, id } = useTabsContext()
  const selected = activeValue === value

  useLayoutEffect(() => register(value), [register, value])

  return (
    <CompositeItem
      ref={ref as React.Ref<HTMLElement>}
      onFocus={onFocus as React.FocusEventHandler<HTMLElement> | undefined}
      render={(htmlProps) => (
        <button
          {...htmlProps}
          type="button"
          role="tab"
          id={tabId(id, value)}
          aria-selected={selected}
          aria-controls={panelId(id, value)}
          className={clsx(contractPart(tabsContract, 'tab'), className)}
          {...{ [ROVING_ITEM_ATTR]: '' }}
          data-tab-value={value}
          // data-active — состояние контракта (активная вкладка), а не tab stop CompositeItem
          data-active={selected || undefined}
          {...props}
          onClick={(e) => {
            onChange(value)
            onClick?.(e)
          }}
        >
          {children}
        </button>
      )}
    />
  )
})

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  children: ReactNode
}

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { value, children, ...props },
  ref
) {
  const { value: activeValue, id } = useTabsContext()
  return (
    <div
      ref={ref}
      id={panelId(id, value)}
      role="tabpanel"
      aria-labelledby={tabId(id, value)}
      tabIndex={0}
      hidden={activeValue !== value}
      {...props}
    >
      {children}
    </div>
  )
})

TabsRoot.displayName = 'Tabs'
TabsList.displayName = 'Tabs.List'
TabsTab.displayName = 'Tabs.Tab'
TabsPanel.displayName = 'Tabs.Panel'

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
})
