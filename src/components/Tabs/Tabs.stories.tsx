import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { useTabsSearchParam } from '@/hooks'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    defaultValue: { control: 'text', description: 'Initial tab (uncontrolled)' },
    value: { control: 'text', description: 'Active tab (controlled)' },
    onChange: { action: 'onChange', description: 'Called when tab changes (controlled)' },
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Playground: Story = {
  name: 'Playground',
  args: { defaultValue: 'tab1' },
  render: function Render(args) {
    const [active, setActive] = useState(args.value ?? args.defaultValue ?? 'tab1')
    return (
      <Tabs value={active} onChange={setActive}>
        <Tabs.Tab value="tab1">Overview</Tabs.Tab>
        <Tabs.Tab value="tab2">Details</Tabs.Tab>
        <Tabs.Tab value="tab3">History</Tabs.Tab>
        <Tabs.Tab value="tab4">Settings</Tabs.Tab>
        <Tabs.Panel value="tab1">Overview panel content.</Tabs.Panel>
        <Tabs.Panel value="tab2">Details panel content.</Tabs.Panel>
        <Tabs.Panel value="tab3">History panel content.</Tabs.Panel>
        <Tabs.Panel value="tab4">Disabled tab panel.</Tabs.Panel>
      </Tabs>
    )
  },
}

export const Default: Story = {
  args: {
    defaultValue: 'tab1',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.Tab value="tab1">Вкладка 1</Tabs.Tab>
      <Tabs.Tab value="tab2">Вкладка 2</Tabs.Tab>
      <Tabs.Tab value="tab3">Вкладка 3</Tabs.Tab>
      <Tabs.Panel value="tab1">Содержимое первой вкладки.</Tabs.Panel>
      <Tabs.Panel value="tab2">Содержимое второй вкладки.</Tabs.Panel>
      <Tabs.Panel value="tab3">Содержимое третьей вкладки.</Tabs.Panel>
    </Tabs>
  ),
}

export const Controlled: Story = {
  render: function ControlledStory() {
    const [active, setActive] = useState('tab2')
    return (
      <Tabs value={active} onChange={setActive}>
        <Tabs.Tab value="tab1">Первый</Tabs.Tab>
        <Tabs.Tab value="tab2">Второй</Tabs.Tab>
        <Tabs.Tab value="tab3">Третий</Tabs.Tab>
        <Tabs.Panel value="tab1">Панель 1</Tabs.Panel>
        <Tabs.Panel value="tab2">Панель 2</Tabs.Panel>
        <Tabs.Panel value="tab3">Панель 3</Tabs.Panel>
      </Tabs>
    )
  },
}

const TAB_VALUES = ['tab1', 'tab2', 'tab3'] as const

/** Хук (URL) + чистый `Tabs` (только UI). В Canvas смотрите query в URL iframe. */
export const WithSearchParam: Story = {
  name: 'Синхронизация с URL (useTabsSearchParam)',
  parameters: {
    docs: {
      description: {
        story:
          'Хук возвращает `value`, `setTab` / `onChange`, `getTabFromUrl`. Передайте в `<Tabs value={…} onChange={…}>`. Компонент Tabs не знает про URL.',
      },
    },
  },
  render: function WithSearchParamStory() {
    const tab = useTabsSearchParam('tab', {
      defaultValue: 'tab1',
      validValues: TAB_VALUES,
    })
    return (
      <div style={{ minWidth: 320 }}>
        <Tabs value={tab.value} onChange={tab.onChange}>
          <Tabs.Tab value="tab1">Вкладка 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Вкладка 2</Tabs.Tab>
          <Tabs.Tab value="tab3">Вкладка 3</Tabs.Tab>
          <Tabs.Panel value="tab1">
            Содержимое 1 — в URL будет <code>?tab=tab1</code>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">Содержимое 2</Tabs.Panel>
          <Tabs.Panel value="tab3">Содержимое 3</Tabs.Panel>
        </Tabs>
      </div>
    )
  },
}
