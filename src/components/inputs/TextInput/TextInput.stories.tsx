import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextInput } from './TextInput'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { PersonIcon, SearchIcon, InfoIcon } from '@/stories/helpers'

// ── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'Inputs/TextInput',
  tags: ['autodocs'],
  args: {
    hint: 'This is a hint text to help user.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      source: {
        excludeStories: ['Gallery'],
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    disabled: { control: 'boolean' },
    completed: {
      control: 'boolean',
      description: 'Акцентная рамка (primary). Не с error/disabled. См. сторис **Completed**.',
    },
    completedColor: {
      control: 'text',
      description: 'Пресеты: success, error, warning… или #hex, rgb(), var(--…).',
    },
    size: {
      control: 'select',
      options: [...BASE_INPUT_SIZE_OPTIONS],
      table: {
        type: { summary: "'big' | 'medium' | 'small'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } },
    labelTooltip: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof TextInput>

// ── Playground ────────────────────────────────────────────────────────────

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<TextInput
  label="Full name"
  required
  placeholder="Placeholder text..."
  hint="This is a hint text to help user."
/>`,
        format: true,
      },
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <TextInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    label: 'Full name',
    required: true,
    optional: false,
    hint: 'This is a hint text to help user.',
    error: '',
    placeholder: 'Placeholder text...',
    disabled: false,
    size: 'medium',
  },
}

// ── Gallery: all states from design ──────────────────────────────────────

export const Gallery: Story = {
  name: '📋 Gallery — All States',
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 300 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <TextInput
        label="Change Label"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Placeholder text..."
        hint="This is a hint text to help user."
        prefix={<PersonIcon />}
      />
      <TextInput
        label="Change Label"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="Placeholder text..."
        hint="This is a hint text to help user."
        prefix={<PersonIcon />}
      />
      <TextInput
        label="Change Label"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Placeholder text..."
        hint="This is a hint text to help user."
        prefix={<PersonIcon />}
        disabled
      />
      <TextInput
        label="Change Label"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Placeholder text..."
        error="This is a hint text to help user."
        prefix={<PersonIcon />}
      />
    </>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<TextInput
  label="Full name"
  required
  optional
  labelTooltip={<InfoIcon />}
  placeholder="Placeholder text..."
  hint="This is a hint text to help user."
  prefix={<PersonIcon />}
/>`,
      },
    },
  },
}

// ── Individual stories ────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Full name',
    placeholder: 'John Doe',
    hint: 'This is a hint text to help user.',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    hint: 'Choose a unique username.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    defaultValue: 'ab',
    error: 'Username must be at least 3 characters',
  },
}

export const Required: Story = {
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'John Doe',
    hint: 'As shown on your passport',
  },
}

export const Optional: Story = {
  args: {
    label: 'Middle name',
    optional: true,
    placeholder: 'Enter middle name',
  },
}

export const WithLabelTooltip: Story = {
  render: (args) => <TextInput {...args} labelTooltip={<InfoIcon />} />,
  args: {
    label: 'Tax ID',
    required: true,
    placeholder: '000-000-000',
    hint: 'Your 9-digit tax identification number',
  },
}

export const WithPrefix: Story = {
  render: (args) => <TextInput {...args} prefix={<PersonIcon />} />,
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    hint: 'Choose a unique username',
  },
}

export const WithSearch: Story = {
  render: (args) => <TextInput {...args} prefix={<SearchIcon />} />,
  args: {
    label: 'Search',
    placeholder: 'Search...',
  },
}

export const WithSuffix: Story = {
  render: (args) => (
    <TextInput
      {...args}
      suffix={
        <span style={{ fontSize: 12, color: 'var(--text-soft-400)', whiteSpace: 'nowrap' }}>
          kg
        </span>
      }
    />
  ),
  args: {
    label: 'Weight',
    placeholder: '0',
    hint: 'Enter your weight',
  },
}

export const WithPrefixAndError: Story = {
  render: (args) => <TextInput {...args} prefix={<PersonIcon />} />,
  args: {
    label: 'Username',
    defaultValue: 'inv@lid!',
    error: 'Only letters, numbers and underscores allowed',
  },
}

export const Disabled: Story = {
  render: (args) => <TextInput {...args} prefix={<PersonIcon />} />,
  args: {
    label: 'Username',
    placeholder: 'Placeholder text...',
    hint: 'This field is unavailable',
    disabled: true,
  },
}

export const Small: Story = {
  render: (args) => <TextInput {...args} prefix={<PersonIcon />} />,
  args: {
    label: 'Username',
    placeholder: 'Placeholder text...',
    hint: 'Helper text',
    size: 'small',
  },
}

export const WithStartBlock: Story = {
  render: (args) => <TextInput {...args} startBlock="https://" />,
  args: {
    label: 'Website',
    required: true,
    optional: true,
    placeholder: 'www.example.com',
    hint: 'This is a hint text to help user.',
  },
}

export const WithEndBlock: Story = {
  render: (args) => (
    <TextInput
      {...args}
      prefix={<span style={{ color: 'var(--text-sub-600)', fontSize: 14 }}>€</span>}
      endBlock={
        <span
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500 }}
        >
          EUR ↓
        </span>
      }
    />
  ),
  args: {
    label: 'Amount',
    required: true,
    optional: true,
    placeholder: '0.00',
    hint: 'This is a hint text to help user.',
  },
}

export const WithBothBlocks: Story = {
  render: (args) => <TextInput {...args} startBlock="https://" endBlock=".com" />,
  args: {
    label: 'Domain',
    placeholder: 'example',
    hint: 'Enter your domain name.',
  },
}

export const Completed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**`completed`** — рамка **`--primary-base`** (и **`--primary-dark`** при hover). Не показывается при **`error`** или **`disabled`**. То же проп доступен у всех полей на **InputField**.',
      },
    },
  },
  args: {
    label: 'Шаг выполнен',
    completed: true,
    defaultValue: 'Значение заполнено',
    readOnly: true,
    hint: 'Типичный кейс — шаг мастера или валидное поле формы.',
  },
}

export const CompletedCustomColor: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**`completedColor`**: коротко **`success`**, **`error`**, **`warning`**, **`primary`** → **`var(--*-base)`**; либо hex, **`rgb()`**, **`var(--…)`**.',
      },
    },
  },
  args: {
    label: 'Свой цвет рамки',
    completed: true,
    completedColor: 'success',
    defaultValue: 'OK',
    readOnly: true,
    hint: 'Пресеты из дизайн-системы или произвольный CSS color.',
  },
}
