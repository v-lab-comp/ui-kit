import type { Meta, StoryObj } from '@storybook/react'
import { RiArrowLeftSLine, RiArrowRightSLine, RiAddLine, RiDeleteBinLine } from '@remixicon/react'
import { Button } from './Button'
import { BUTTON_COLOR_OPTIONS, BUTTON_SIZE_OPTIONS, BUTTON_SHAPE_OPTIONS } from './Button.types'

const iconMap = {
  none: undefined,
  'arrow-left': <RiArrowLeftSLine size={16} />,
  'arrow-right': <RiArrowRightSLine size={16} />,
  add: <RiAddLine size={16} />,
  delete: <RiDeleteBinLine size={16} />,
}

const childrenMap = {
  Button: 'Button',
  'arrow-left': <RiArrowLeftSLine size={20} />,
  'arrow-right': <RiArrowRightSLine size={20} />,
  add: <RiAddLine size={20} />,
  delete: <RiDeleteBinLine size={20} />,
}

type IconKey = keyof typeof iconMap

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'stroke', 'lighter', 'ghost'],
    },
    color: {
      control: 'select',
      options: [...BUTTON_COLOR_OPTIONS],
    },
    size: {
      control: 'select',
      options: [...BUTTON_SIZE_OPTIONS],
    },
    shape: {
      control: 'select',
      options: [...BUTTON_SHAPE_OPTIONS],
    },
    disabled: { control: 'boolean' },
    children: {
      control: 'select',
      options: Object.keys(childrenMap),
      mapping: childrenMap,
    },
    leftNode: {
      control: 'select',
      options: Object.keys(iconMap) as IconKey[],
      mapping: iconMap,
    },
    rightNode: {
      control: 'select',
      options: Object.keys(iconMap) as IconKey[],
      mapping: iconMap,
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Playground: Story = {
  name: 'Playground',
  args: {
    children: 'Button',
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    disabled: false,
  },
}

export const Gallery: Story = {
  name: '📋 Gallery — All States',
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      {/* Variants */}
      <div>
        <p
          style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--text-sub-600)', fontWeight: 500 }}
        >
          Variants
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="filled">Filled</Button>
          <Button variant="stroke">Stroke</Button>
          <Button variant="lighter">Lighter</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      {/* Sizes */}
      <div>
        <p
          style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--text-sub-600)', fontWeight: 500 }}
        >
          Sizes
        </p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="medium">Medium</Button>
          <Button size="small">Small</Button>
          <Button size="x-small">X-Small</Button>
          <Button size="2x-small">2X-Small</Button>
        </div>
      </div>
      {/* Colors */}
      <div>
        <p
          style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--text-sub-600)', fontWeight: 500 }}
        >
          Colors
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button color="primary">Primary</Button>
          <Button color="neutral">Neutral</Button>
          <Button color="error">Error</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
        </div>
      </div>
      {/* Icons */}
      <div>
        <p
          style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--text-sub-600)', fontWeight: 500 }}
        >
          With Icons
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button leftNode={<RiAddLine size={16} />}>Add item</Button>
          <Button rightNode={<RiArrowRightSLine size={16} />}>Next</Button>
          <Button
            leftNode={<RiArrowLeftSLine size={16} />}
            rightNode={<RiArrowRightSLine size={16} />}
          >
            Both
          </Button>
          <Button leftNode={<RiAddLine size={20} />} shape="square" aria-label="Add" />
          <Button leftNode={<RiAddLine size={20} />} shape="circle" aria-label="Add" />
        </div>
      </div>
      {/* States */}
      <div>
        <p
          style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--text-sub-600)', fontWeight: 500 }}
        >
          States
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </>
  ),
}

export const Filled: Story = {
  args: {
    children: 'Filled Button',
    variant: 'filled',
  },
}

export const Stroke: Story = {
  args: {
    children: 'Stroke Button',
    variant: 'stroke',
  },
}

export const Lighter: Story = {
  args: {
    children: 'Lighter Button',
    variant: 'lighter',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
}

/**
 * `customColor` — произвольный hex вместо семантической палитры. Перекрывает `color`,
 * раскрывается в тот же набор `--pal-*`, поэтому работает во всех вариантах и
 * подхватывается hover-ореолом. Невалидный hex игнорируется — остаётся `color`.
 */
export const CustomColor: Story = {
  name: 'Кастомный цвет (customColor)',
  parameters: {
    docs: {
      description: {
        story:
          'Передайте `customColor="#7d52f4"` — кит сам выведет hover / active / фоновые оттенки через `color-mix`. Полезно для брендовых цветов, которых нет в палитре кита. Наведите курсор: кольцо ореола тоже берёт этот цвет.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {['#7d52f4', '#ff68b3', '#0f9d58'].map((hex) => (
        <div key={hex} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <code style={{ width: 80, fontSize: 12 }}>{hex}</code>
          <Button customColor={hex} variant="filled">
            Filled
          </Button>
          <Button customColor={hex} variant="stroke">
            Stroke
          </Button>
          <Button customColor={hex} variant="lighter">
            Lighter
          </Button>
          <Button customColor={hex} variant="ghost">
            Ghost
          </Button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <code style={{ width: 80, fontSize: 12 }}>мусор</code>
        <Button customColor="не-цвет" variant="filled">
          Фолбэк на color=primary
        </Button>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
    leftNode: iconMap['arrow-left'],
    rightNode: iconMap['arrow-right'],
  },
}

export const IconOnly: Story = {
  args: {
    variant: 'filled',
    leftNode: iconMap['add'],
    'aria-label': 'Add',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'filled',
    disabled: true,
  },
}
