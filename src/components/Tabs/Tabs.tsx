import type { ReactNode } from 'react'
import { Children, isValidElement, useId, useMemo, useState } from 'react'
import { TabsContext, useTabsContext } from './TabsContext'
import type { TabsContextValue } from './TabsContext'
import { contractPart } from '@/theme/contract'
import { tabsContract } from '@/theme/contracts/tabs'

export type { TabsContextValue } from './TabsContext'

export interface TabsProps {
  children: ReactNode
  /** Значение по умолчанию (неконтролируемый режим) */
  defaultValue?: string
  /** Контролируемый режим */
  value?: string
  onChange?: (value: string) => void
}

function TabsRoot({
  children,
  defaultValue,
  value: controlledValue,
  onChange: controlledOnChange,
}: TabsProps) {
  const instanceId = useId()
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '')

  const values = useMemo(() => {
    const vals: string[] = []
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === TabsTab && child.props.value) {
        vals.push(child.props.value)
      }
    })
    return vals
  }, [children])

  const fallback = defaultValue ?? values[0] ?? ''
  const isControlled = controlledValue !== undefined && controlledOnChange !== undefined
  const value = isControlled ? controlledValue! : uncontrolledValue
  const resolvedValue = value && values.includes(value) ? value : fallback

  const onChange = isControlled ? controlledOnChange! : (v: string) => setUncontrolledValue(v)

  const contextValue: TabsContextValue = {
    value: resolvedValue,
    onChange,
    values,
    id: instanceId,
  }

  const tabs: ReactNode[] = []
  const panels: ReactNode[] = []
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === TabsPanel) {
      panels.push(child)
    } else {
      tabs.push(child)
    }
  })

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={tabsContract.className}>
        <div className={contractPart(tabsContract, 'list')} role="tablist">
          {tabs}
        </div>
        <div className={contractPart(tabsContract, 'separator')} aria-hidden />
      </div>
      {panels}
    </TabsContext.Provider>
  )
}

export interface TabsTabProps {
  value: string
  children: ReactNode
}

function TabsTab({ value, children }: TabsTabProps) {
  const { value: activeValue, onChange, id } = useTabsContext()

  return (
    <button
      type="button"
      role="tab"
      id={`${id}-tab-${value}`}
      aria-selected={activeValue === value}
      aria-controls={`${id}-panel-${value}`}
      className={contractPart(tabsContract, 'tab')}
      data-active={activeValue === value || undefined}
      onClick={() => onChange(value)}
    >
      {children}
    </button>
  )
}

export interface TabsPanelProps {
  value: string
  children: ReactNode
}

function TabsPanel({ value, children }: TabsPanelProps) {
  const { value: activeValue, id } = useTabsContext()
  return (
    <div
      id={`${id}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${id}-tab-${value}`}
      tabIndex={0}
      hidden={activeValue !== value}
    >
      {children}
    </div>
  )
}

TabsRoot.displayName = 'Tabs'
TabsTab.displayName = 'Tabs.Tab'
TabsPanel.displayName = 'Tabs.Panel'

export const Tabs = Object.assign(TabsRoot, {
  Tab: TabsTab,
  Panel: TabsPanel,
})
