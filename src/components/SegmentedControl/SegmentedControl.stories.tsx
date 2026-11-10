import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  RiTableLine,
  RiNodeTree,
  RiLayoutGridLine,
  RiListCheck,
  RiBarChartLine,
} from '@remixicon/react'
import { SegmentedControl } from './SegmentedControl'

const meta: Meta<typeof SegmentedControl> = {
  component: SegmentedControl,
  title: 'Components/SegmentedControl',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
      description: {
        component:
          'Компонент выбора одного значения из набора. Плавный слайдер анимирует переход между опциями. Аналог `type="single"` `ToggleGroup`, но с визуальным индикатором-ползунком.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'small', 'x-small'],
    },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('tree')
    return (
      <SegmentedControl {...args} value={value} onValueChange={setValue}>
        <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
          Таблица
        </SegmentedControl.Item>
        <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
          Дерево
        </SegmentedControl.Item>
      </SegmentedControl>
    )
  },
  args: { size: 'medium' },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const [value, setValue] = useState('tree')

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
    Таблица
  </SegmentedControl.Item>
  <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
    Дерево
  </SegmentedControl.Item>
</SegmentedControl>`,
      },
    },
  },
}

export const WithIcons: Story = {
  name: 'С иконками',
  render: function Render() {
    const [value, setValue] = useState('grid')
    return (
      <SegmentedControl value={value} onValueChange={setValue}>
        <SegmentedControl.Item value="grid" leftNode={<RiLayoutGridLine size={16} />}>
          Grid
        </SegmentedControl.Item>
        <SegmentedControl.Item value="list" leftNode={<RiListCheck size={16} />}>
          List
        </SegmentedControl.Item>
        <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />}>
          Chart
        </SegmentedControl.Item>
      </SegmentedControl>
    )
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const [value, setValue] = useState('grid')

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControl.Item value="grid" leftNode={<RiLayoutGridLine size={16} />}>Grid</SegmentedControl.Item>
  <SegmentedControl.Item value="list" leftNode={<RiListCheck size={16} />}>List</SegmentedControl.Item>
  <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />}>Chart</SegmentedControl.Item>
</SegmentedControl>`,
      },
    },
  },
}

export const IconOnly: Story = {
  name: 'Только иконки',
  render: function Render() {
    const [value, setValue] = useState('grid')
    return (
      <SegmentedControl value={value} onValueChange={setValue}>
        <SegmentedControl.Item value="grid" leftNode={<RiLayoutGridLine size={16} />} />
        <SegmentedControl.Item value="list" leftNode={<RiListCheck size={16} />} />
        <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />} />
      </SegmentedControl>
    )
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const [value, setValue] = useState('grid')

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControl.Item value="grid"  leftNode={<RiLayoutGridLine size={16} />} />
  <SegmentedControl.Item value="list"  leftNode={<RiListCheck size={16} />} />
  <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />} />
</SegmentedControl>`,
      },
    },
  },
}

export const Disabled: Story = {
  render: () => (
    <SegmentedControl defaultValue="table" disabled>
      <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
        Таблица
      </SegmentedControl.Item>
      <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
        Дерево
      </SegmentedControl.Item>
    </SegmentedControl>
  ),
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<SegmentedControl defaultValue="table" disabled>
  <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
    Таблица
  </SegmentedControl.Item>
  <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
    Дерево
  </SegmentedControl.Item>
</SegmentedControl>`,
      },
    },
  },
}

export const Sizes: Story = {
  name: 'Все размеры',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {(['medium', 'small', 'x-small'] as const).map((size) => (
        <SegmentedControl key={size} defaultValue="table" size={size}>
          <SegmentedControl.Item value="table" leftNode={<RiTableLine size={14} />}>
            Таблица
          </SegmentedControl.Item>
          <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={14} />}>
            Дерево
          </SegmentedControl.Item>
        </SegmentedControl>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<SegmentedControl size="medium" defaultValue="table">...</SegmentedControl>
<SegmentedControl size="small"  defaultValue="table">...</SegmentedControl>
<SegmentedControl size="x-small" defaultValue="table">...</SegmentedControl>`,
      },
    },
  },
}

export const Gallery: Story = {
  name: '📋 Gallery — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <SegmentedControl defaultValue="table">
        <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
          Таблица
        </SegmentedControl.Item>
        <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
          Дерево
        </SegmentedControl.Item>
      </SegmentedControl>

      <SegmentedControl defaultValue="tree">
        <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
          Таблица
        </SegmentedControl.Item>
        <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
          Дерево
        </SegmentedControl.Item>
      </SegmentedControl>

      <SegmentedControl defaultValue="list">
        <SegmentedControl.Item value="grid" leftNode={<RiLayoutGridLine size={16} />}>
          Grid
        </SegmentedControl.Item>
        <SegmentedControl.Item value="list" leftNode={<RiListCheck size={16} />}>
          List
        </SegmentedControl.Item>
        <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />}>
          Chart
        </SegmentedControl.Item>
      </SegmentedControl>

      <SegmentedControl defaultValue="grid">
        <SegmentedControl.Item value="grid" leftNode={<RiLayoutGridLine size={16} />} />
        <SegmentedControl.Item value="list" leftNode={<RiListCheck size={16} />} />
        <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />} />
      </SegmentedControl>

      <SegmentedControl defaultValue="table" disabled>
        <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
          Таблица
        </SegmentedControl.Item>
        <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
          Дерево
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `{/* Первый выбран */}
<SegmentedControl defaultValue="table">
  <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>Таблица</SegmentedControl.Item>
  <SegmentedControl.Item value="tree"  leftNode={<RiNodeTree size={16} />}>Дерево</SegmentedControl.Item>
</SegmentedControl>

{/* Три опции */}
<SegmentedControl defaultValue="list">
  <SegmentedControl.Item value="grid"  leftNode={<RiLayoutGridLine size={16} />}>Grid</SegmentedControl.Item>
  <SegmentedControl.Item value="list"  leftNode={<RiListCheck size={16} />}>List</SegmentedControl.Item>
  <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />}>Chart</SegmentedControl.Item>
</SegmentedControl>

{/* Только иконки */}
<SegmentedControl defaultValue="grid">
  <SegmentedControl.Item value="grid"  leftNode={<RiLayoutGridLine size={16} />} />
  <SegmentedControl.Item value="list"  leftNode={<RiListCheck size={16} />} />
  <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />} />
</SegmentedControl>

{/* Disabled */}
<SegmentedControl defaultValue="table" disabled>
  <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>Таблица</SegmentedControl.Item>
  <SegmentedControl.Item value="tree"  leftNode={<RiNodeTree size={16} />}>Дерево</SegmentedControl.Item>
</SegmentedControl>`,
      },
    },
  },
}
