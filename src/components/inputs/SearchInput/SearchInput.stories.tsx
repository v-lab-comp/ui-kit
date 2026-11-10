import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from './SearchInput'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { InfoIcon } from '@/stories/helpers'

const SHORTCUT_DEFAULT = { key: 'k', mac: 'cmd' as const, win: 'ctrl+shift' as const }

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  title: 'Inputs/SearchInput',
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
    shortcut: { table: { disable: true } },
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
type Story = StoryObj<typeof SearchInput>

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <SearchInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: {
    label: 'Search',
    required: true,
    optional: false,
    hint: 'This is a hint text to help user.',
    error: '',
    placeholder: 'Search...',
    shortcut: SHORTCUT_DEFAULT,
    disabled: false,
    size: 'medium',
  },
}

const SHORTCUT_1 = { key: '1', mac: 'cmd' as const, win: 'ctrl+shift' as const }

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
      <SearchInput
        label="Search"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Search..."
        shortcut={SHORTCUT_1}
        hint="This is a hint text to help user."
      />
      <SearchInput
        label="Search"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="react components"
        shortcut={SHORTCUT_1}
        hint="This is a hint text to help user."
      />
      <SearchInput
        label="Search"
        required
        optional
        labelTooltip={<InfoIcon />}
        placeholder="Search..."
        shortcut={SHORTCUT_1}
        hint="This is a hint text to help user."
        disabled
      />
      <SearchInput
        label="Search"
        required
        optional
        labelTooltip={<InfoIcon />}
        defaultValue="bad query"
        shortcut={SHORTCUT_1}
        error="This is a hint text to help user."
      />
    </>
  ),
  parameters: { controls: { disable: true } },
}

export const Default: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    hint: 'This is a hint text to help user.',
  },
}

export const WithShortcut: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    // Mac: ⌘K, Windows/Linux: ⇧Ctrl K (avoids Chrome's Ctrl+K conflict)
    shortcut: SHORTCUT_DEFAULT,
    hint: 'This is a hint text to help user.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Search',
    defaultValue: 'no results',
    shortcut: SHORTCUT_DEFAULT,
    error: 'No results found.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    shortcut: SHORTCUT_DEFAULT,
    hint: 'Search is unavailable.',
    disabled: true,
  },
}
