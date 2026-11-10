import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateInput } from './DateInput'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { InfoIcon } from '@/stories/helpers'

// ── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof DateInput> = {
  component: DateInput,
  title: 'Inputs/DateInput',
  tags: ['autodocs'],
  args: {
    hint: 'This is a hint text to help user.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 368, paddingBottom: 480 }}>
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
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
    valueFormat: {
      control: 'select',
      options: ['masked', 'iso'],
      description: 'masked: onChange/onAccept как «DD / MM / YYYY». iso: YYYY-MM-DD для API.',
    },
  },
}

export default meta

type Story = StoryObj<typeof DateInput>

// ── Playground ────────────────────────────────────────────────────────────

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<DateInput
  label="Date"
  required
  hint="This is a hint text to help user."
/>`,
        format: true,
      },
    },
  },
  args: {
    label: 'Date',
    required: true,
    optional: false,
    hint: 'This is a hint text to help user.',
    error: '',
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
      <DateInput
        label="Date"
        required
        optional
        labelTooltip={<InfoIcon />}
        hint="This is a hint text to help user."
      />
      <DateInput
        label="Date"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="2024-03-15"
        hint="This is a hint text to help user."
      />
      <DateInput
        label="Date"
        required
        optional
        labelTooltip={<InfoIcon />}
        hint="This is a hint text to help user."
        disabled
      />
      <DateInput
        label="Date"
        required
        optional
        labelTooltip={<InfoIcon />}
        error="Please select a valid date."
      />
    </>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<DateInput
  label="Date"
  required
  hint="This is a hint text to help user."
/>`,
      },
    },
  },
}

// ── Individual stories ────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Date',
    hint: 'This is a hint text to help user.',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Date',
    defaultValue: '2024-03-15',
    hint: 'This is a hint text to help user.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Date',
    defaultValue: '2020-01-01',
    error: 'Please select a date in the future.',
  },
}

export const Required: Story = {
  args: {
    label: 'Date of birth',
    required: true,
    hint: 'Used to verify your identity',
  },
}

/** Контролируемое значение в формате ISO для отправки в API */
export const IsoValueFormat: Story = {
  name: 'ISO value (API)',
  render: function Render() {
    const [iso, setIso] = useState('')
    return (
      <div>
        <DateInput
          label="Document date"
          required
          valueFormat="iso"
          value={iso}
          onChange={(next) => setIso(next)}
          hint="onChange получает YYYY-MM-DD"
        />
        <pre style={{ marginTop: 12, fontSize: 12, opacity: 0.85 }}>
          Значение для API: {iso || '—'}
        </pre>
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
  },
}

export const Optional: Story = {
  args: {
    label: 'End date',
    optional: true,
    hint: 'Leave blank for no end date',
  },
}

export const WithLabelTooltip: Story = {
  render: (args) => <DateInput {...args} labelTooltip={<InfoIcon />} />,
  args: {
    label: 'Date',
    required: true,
    hint: 'Select a date',
  },
}

export const WithMinMax: Story = {
  args: {
    label: 'Appointment date',
    required: true,
    hint: 'Available dates: next 30 days',
    min: new Date().toISOString().split('T')[0],
    max: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
}

export const Disabled: Story = {
  args: {
    label: 'Date',
    hint: 'This field is unavailable',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    label: 'Date',
    hint: 'Helper text',
    size: 'small',
  },
}
