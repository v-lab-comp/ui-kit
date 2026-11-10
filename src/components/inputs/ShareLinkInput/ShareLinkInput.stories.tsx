import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ShareLinkInput } from './ShareLinkInput'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { InfoIcon } from '@/stories/helpers'

const meta: Meta<typeof ShareLinkInput> = {
  component: ShareLinkInput,
  title: 'Inputs/ShareLinkInput',
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
    endBlock: { table: { disable: true } },
    labelTooltip: { table: { disable: true } },
    onCopy: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof ShareLinkInput>

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')
    return (
      <ShareLinkInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onCopy={fn()}
      />
    )
  },
  args: {
    label: 'Share Link',
    required: true,
    optional: true,
    labelTooltip: <InfoIcon />,
    placeholder: 'www.example.com',
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
      <ShareLinkInput
        label="Share Link"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="www.example.com"
        hint="This is a hint text to help user."
      />
      <ShareLinkInput
        label="Share Link"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="www.example.com"
        hint="This is a hint text to help user."
      />
      <ShareLinkInput
        label="Share Link"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="www.example.com"
        hint="This is a hint text to help user."
        disabled
      />
      <ShareLinkInput
        label="Share Link"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="www.example.com"
        error="This is a hint text to help user."
      />
    </>
  ),
  parameters: { controls: { disable: true } },
}

export const Default: Story = {
  args: {
    label: 'Share Link',
    required: true,
    optional: true,
    labelTooltip: <InfoIcon />,
    placeholder: 'www.example.com',
    hint: 'This is a hint text to help user.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Share Link',
    required: true,
    optional: true,
    defaultValue: 'invalid',
    error: 'Enter a valid URL',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Share Link',
    required: true,
    optional: true,
    placeholder: 'www.example.com',
    hint: 'This field is unavailable',
    disabled: true,
  },
}
