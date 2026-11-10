import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { EmailInput } from './EmailInput'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { InfoIcon } from '@/stories/helpers'

// ── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof EmailInput> = {
  component: EmailInput,
  title: 'Inputs/EmailInput',
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
    validationMessage: { control: 'text' },
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
  },
}

export default meta

type Story = StoryObj<typeof EmailInput>

// ── Playground ────────────────────────────────────────────────────────────

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<EmailInput
  label="Email address"
  required
  placeholder="you@example.com"
  hint="This is a hint text to help user."
/>`,
        format: true,
      },
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <EmailInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    label: 'Email address',
    required: true,
    optional: false,
    hint: 'This is a hint text to help user.',
    placeholder: 'you@example.com',
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
      <EmailInput
        label="Email address"
        required
        labelTooltip={<InfoIcon />}
        placeholder="you@example.com"
        hint="This is a hint text to help user."
      />
      <EmailInput
        label="Email address"
        required
        labelTooltip={<InfoIcon />}
        defaultValue="user@example.com"
        hint="This is a hint text to help user."
      />
      <EmailInput
        label="Email address"
        required
        labelTooltip={<InfoIcon />}
        placeholder="you@example.com"
        hint="This is a hint text to help user."
        disabled
      />
      <EmailInput
        label="Email address"
        required
        labelTooltip={<InfoIcon />}
        defaultValue="not-an-email"
        error="Enter a valid email address"
      />
    </>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<EmailInput
  label="Email address"
  required
  placeholder="you@example.com"
  hint="This is a hint text to help user."
/>`,
      },
    },
  },
}

// ── Individual stories ────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: 'This is a hint text to help user.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email address',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address',
  },
}

export const ValidationOnBlur: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <EmailInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: 'Type an invalid email and click away to see validation.',
  },
}

export const Required: Story = {
  args: {
    label: 'Email address',
    required: true,
    placeholder: 'you@example.com',
    hint: 'We will send a confirmation to this address',
  },
}

export const Optional: Story = {
  args: {
    label: 'Recovery email',
    optional: true,
    placeholder: 'you@example.com',
  },
}

export const WithLabelTooltip: Story = {
  render: (args) => <EmailInput {...args} labelTooltip={<InfoIcon />} />,
  args: {
    label: 'Work email',
    required: true,
    placeholder: 'you@company.com',
    hint: 'Must be a company domain',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: 'This field is unavailable',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: 'Helper text',
    size: 'small',
  },
}
