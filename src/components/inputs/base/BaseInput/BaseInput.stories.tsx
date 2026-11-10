import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import { BaseInput } from './BaseInput'
import { BASE_INPUT_SIZE_OPTIONS } from './BaseInput.types'

const meta: Meta<typeof BaseInput> = {
  component: BaseInput,
  title: 'Inputs/BaseInput',
  tags: ['autodocs'],
  // У голого поля нет подписи — имя для скринридера (axe: label)
  args: { 'aria-label': 'Input' },
  parameters: {
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    hasError: { control: 'boolean' },
    size: {
      control: 'select',
      options: [...BASE_INPUT_SIZE_OPTIONS],
      table: {
        type: { summary: "'big' | 'medium' | 'small'" },
        defaultValue: { summary: "'medium'" },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof BaseInput>

export const Playground: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()
    return (
      <BaseInput
        {...args}
        value={value ?? ''}
        onChange={(e) => updateArgs({ value: e.target.value })}
      />
    )
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<BaseInput placeholder="Placeholder" />`,
        format: true,
      },
    },
  },
  args: {
    value: '',
    placeholder: 'Placeholder',
    disabled: false,
    readOnly: false,
    hasError: false,
    size: 'medium',
  },
}

export const Gallery: Story = {
  name: '📋 Gallery',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <div>
        <p
          style={{
            fontSize: 11,
            color: '#888',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Big (40px)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <BaseInput aria-label="Big — Default" size="big" placeholder="Default" />
          <BaseInput aria-label="Big — With value" size="big" defaultValue="With value" />
          <BaseInput aria-label="Big — Error" size="big" placeholder="Error" hasError />
          <BaseInput aria-label="Big — Disabled" size="big" placeholder="Disabled" disabled />
          <BaseInput aria-label="Big — Read-only" size="big" defaultValue="Read-only" readOnly />
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 11,
            color: '#888',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Medium (36px)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <BaseInput aria-label="Medium — Default" placeholder="Default" />
          <BaseInput aria-label="Medium — With value" defaultValue="With value" />
          <BaseInput aria-label="Medium — Error" placeholder="Error" hasError />
          <BaseInput
            aria-label="Medium — Error with value"
            defaultValue="Error with value"
            hasError
          />
          <BaseInput aria-label="Medium — Disabled" placeholder="Disabled" disabled />
          <BaseInput
            aria-label="Medium — Disabled with value"
            defaultValue="Disabled with value"
            disabled
          />
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 11,
            color: '#888',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Small (32px)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <BaseInput aria-label="Small — Default" size="small" placeholder="Default" />
          <BaseInput aria-label="Small — With value" size="small" defaultValue="With value" />
          <BaseInput aria-label="Small — Error" size="small" placeholder="Error" hasError />
          <BaseInput aria-label="Small — Disabled" size="small" placeholder="Disabled" disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<BaseInput size="big" placeholder="Big (40px)" />
<BaseInput placeholder="Medium (36px)" />
<BaseInput size="small" placeholder="Small (32px)" />
<BaseInput placeholder="Error" hasError />
<BaseInput placeholder="Disabled" disabled />
<BaseInput placeholder="Read-only" readOnly defaultValue="Cannot edit" />`,
      },
    },
  },
}

export const Default: Story = { args: { placeholder: 'Placeholder' } }
export const WithValue: Story = { args: { defaultValue: 'Input value' } }
export const WithError: Story = { args: { placeholder: 'Placeholder', hasError: true } }
export const WithErrorValue: Story = { args: { defaultValue: 'Invalid value', hasError: true } }
export const Disabled: Story = { args: { placeholder: 'Placeholder', disabled: true } }
export const DisabledWithValue: Story = { args: { defaultValue: 'Input value', disabled: true } }
export const Big: Story = { args: { size: 'big', placeholder: 'Placeholder' } }
export const Small: Story = { args: { size: 'small', placeholder: 'Placeholder' } }
export const SmallWithError: Story = {
  args: { size: 'small', placeholder: 'Placeholder', hasError: true },
}
export const ReadOnly: Story = {
  args: { placeholder: 'Placeholder', readOnly: true, defaultValue: 'Read-only value' },
}
