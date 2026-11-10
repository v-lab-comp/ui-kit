import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PasswordInput } from './PasswordInput'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { InfoIcon } from '@/stories/helpers'

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  title: 'Inputs/PasswordInput',
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
      source: { excludeStories: ['Gallery'] },
    },
  },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
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
type Story = StoryObj<typeof PasswordInput>

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <PasswordInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    label: 'Password',
    required: true,
    optional: false,
    hint: 'This is a hint text to help user.',
    error: '',
    placeholder: '············',
    disabled: false,
    size: 'medium',
  },
}

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
      <PasswordInput
        label="Password"
        required
        optional
        labelTooltip={<InfoIcon />}
        hint="This is a hint text to help user."
      />
      <PasswordInput
        label="Password"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="mysecretpassword"
        hint="This is a hint text to help user."
      />
      <PasswordInput
        label="Password"
        required
        optional
        labelTooltip={<InfoIcon />}
        hint="This is a hint text to help user."
        disabled
      />
      <PasswordInput
        label="Password"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="wrongpassword"
        error="This is a hint text to help user."
      />
    </>
  ),
  parameters: { controls: { disable: true } },
}

export const Default: Story = {
  args: {
    label: 'Password',
    hint: 'This is a hint text to help user.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    defaultValue: 'wrongpassword',
    error: 'Password is incorrect.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Password',
    hint: 'This field is unavailable.',
    disabled: true,
  },
}
