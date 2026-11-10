import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  RiFilter3Line,
  RiLayoutGridLine,
  RiListCheck,
  RiBold,
  RiItalic,
  RiUnderline,
} from '@remixicon/react'
import { ToggleButton } from './ToggleButton'
import { ToggleGroup } from './ToggleGroup'
import { BUTTON_SIZE_OPTIONS } from '@/components/Button'

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  title: 'Components/ToggleButton',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
      description: {
        component:
          'Кнопка-переключатель с состоянием on/off. Поддерживает одиночное использование (controlled/uncontrolled) и групповое через `ToggleGroup` с режимами `single` и `multiple`.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [...BUTTON_SIZE_OPTIONS],
      table: {
        type: { summary: "'medium' | 'small' | 'x-small' | '2x-small'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    shape: {
      control: 'select',
      options: ['rounded', 'circle', 'square'],
    },
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ToggleButton>

export const Playground: Story = {
  render: function Render(args) {
    const [pressed, setPressed] = useState(false)
    return (
      <ToggleButton {...args} pressed={pressed} onPressedChange={setPressed}>
        Toggle
      </ToggleButton>
    )
  },
  args: { size: 'medium', shape: 'rounded', disabled: false },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const [pressed, setPressed] = useState(false)

<ToggleButton pressed={pressed} onPressedChange={setPressed}>
  Toggle
</ToggleButton>`,
      },
    },
  },
}

export const WithIcon: Story = {
  name: 'С иконкой (как FilterToggleButton)',
  render: function Render() {
    const [pressed, setPressed] = useState(false)
    return (
      <ToggleButton
        pressed={pressed}
        onPressedChange={setPressed}
        size="small"
        leftNode={<RiFilter3Line size={16} />}
      >
        Фильтры
      </ToggleButton>
    )
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const [pressed, setPressed] = useState(false)

<ToggleButton
  pressed={pressed}
  onPressedChange={setPressed}
  size="small"
  leftNode={<RiFilter3Line size={16} />}
>
  Фильтры
</ToggleButton>`,
      },
    },
  },
}

export const Sizes: Story = {
  name: 'Все размеры',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {BUTTON_SIZE_OPTIONS.map((size) => (
        <ToggleButton key={size} size={size} defaultPressed={size === 'small'}>
          {size}
        </ToggleButton>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<ToggleButton size="medium">medium</ToggleButton>
<ToggleButton size="small">small</ToggleButton>
<ToggleButton size="x-small">x-small</ToggleButton>
<ToggleButton size="2x-small">2x-small</ToggleButton>`,
      },
    },
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <ToggleButton disabled>Off + disabled</ToggleButton>
      <ToggleButton disabled defaultPressed>
        On + disabled
      </ToggleButton>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<ToggleButton disabled>Off + disabled</ToggleButton>
<ToggleButton disabled defaultPressed>On + disabled</ToggleButton>`,
      },
    },
  },
}

export const GroupSingle: Story = {
  name: 'ToggleGroup — single (radio)',
  render: function Render() {
    const [value, setValue] = useState<string | undefined>('grid')
    return (
      <ToggleGroup type="single" value={value} onValueChange={setValue} size="small">
        <ToggleButton value="grid" leftNode={<RiLayoutGridLine size={16} />}>
          Grid
        </ToggleButton>
        <ToggleButton value="list" leftNode={<RiListCheck size={16} />}>
          List
        </ToggleButton>
      </ToggleGroup>
    )
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const [value, setValue] = useState('grid')

<ToggleGroup type="single" value={value} onValueChange={setValue} size="small">
  <ToggleButton value="grid" leftNode={<RiLayoutGridLine size={16} />}>Grid</ToggleButton>
  <ToggleButton value="list" leftNode={<RiListCheck size={16} />}>List</ToggleButton>
</ToggleGroup>`,
      },
    },
  },
}

export const GroupMultiple: Story = {
  name: 'ToggleGroup — multiple (multi-select)',
  render: function Render() {
    const [values, setValues] = useState<string[]>(['bold'])
    return (
      <ToggleGroup type="multiple" value={values} onValueChange={setValues} size="small">
        <ToggleButton value="bold" leftNode={<RiBold size={16} />} />
        <ToggleButton value="italic" leftNode={<RiItalic size={16} />} />
        <ToggleButton value="underline" leftNode={<RiUnderline size={16} />} />
      </ToggleGroup>
    )
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `const [values, setValues] = useState(['bold'])

<ToggleGroup type="multiple" value={values} onValueChange={setValues} size="small">
  <ToggleButton value="bold" leftNode={<RiBold size={16} />} />
  <ToggleButton value="italic" leftNode={<RiItalic size={16} />} />
  <ToggleButton value="underline" leftNode={<RiUnderline size={16} />} />
</ToggleGroup>`,
      },
    },
  },
}

export const Gallery: Story = {
  name: '📋 Gallery — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <ToggleButton>Idle (off)</ToggleButton>
        <ToggleButton defaultPressed>Pressed (on)</ToggleButton>
        <ToggleButton disabled>Disabled off</ToggleButton>
        <ToggleButton disabled defaultPressed>
          Disabled on
        </ToggleButton>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <ToggleButton size="medium">medium</ToggleButton>
        <ToggleButton size="small">small</ToggleButton>
        <ToggleButton size="x-small">x-small</ToggleButton>
        <ToggleButton size="2x-small">2x-small</ToggleButton>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <ToggleButton leftNode={<RiFilter3Line size={16} />} size="small">
          Фильтры
        </ToggleButton>
        <ToggleButton leftNode={<RiFilter3Line size={16} />} size="small" defaultPressed>
          Фильтры (on)
        </ToggleButton>
      </div>
      <ToggleGroup type="single" defaultValue="grid" size="small">
        <ToggleButton value="grid" leftNode={<RiLayoutGridLine size={16} />}>
          Grid
        </ToggleButton>
        <ToggleButton value="list" leftNode={<RiListCheck size={16} />}>
          List
        </ToggleButton>
      </ToggleGroup>
      <ToggleGroup type="multiple" defaultValue={['bold', 'italic']} size="small">
        <ToggleButton value="bold" leftNode={<RiBold size={16} />} />
        <ToggleButton value="italic" leftNode={<RiItalic size={16} />} />
        <ToggleButton value="underline" leftNode={<RiUnderline size={16} />} />
      </ToggleGroup>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `{/* Состояния */}
<ToggleButton>Idle (off)</ToggleButton>
<ToggleButton defaultPressed>Pressed (on)</ToggleButton>
<ToggleButton disabled>Disabled off</ToggleButton>
<ToggleButton disabled defaultPressed>Disabled on</ToggleButton>

{/* Размеры */}
<ToggleButton size="medium">medium</ToggleButton>
<ToggleButton size="small">small</ToggleButton>
<ToggleButton size="x-small">x-small</ToggleButton>
<ToggleButton size="2x-small">2x-small</ToggleButton>

{/* С иконкой */}
<ToggleButton leftNode={<RiFilter3Line size={16} />} size="small">Фильтры</ToggleButton>
<ToggleButton leftNode={<RiFilter3Line size={16} />} size="small" defaultPressed>Фильтры (on)</ToggleButton>

{/* ToggleGroup single */}
<ToggleGroup type="single" defaultValue="grid" size="small">
  <ToggleButton value="grid" leftNode={<RiLayoutGridLine size={16} />}>Grid</ToggleButton>
  <ToggleButton value="list" leftNode={<RiListCheck size={16} />}>List</ToggleButton>
</ToggleGroup>

{/* ToggleGroup multiple */}
<ToggleGroup type="multiple" defaultValue={['bold', 'italic']} size="small">
  <ToggleButton value="bold"      leftNode={<RiBold size={16} />} />
  <ToggleButton value="italic"    leftNode={<RiItalic size={16} />} />
  <ToggleButton value="underline" leftNode={<RiUnderline size={16} />} />
</ToggleGroup>`,
      },
    },
  },
}
