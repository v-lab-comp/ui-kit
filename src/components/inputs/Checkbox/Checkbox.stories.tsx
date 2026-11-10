import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { CHECKBOX_SIZE_OPTIONS } from './Checkbox.types'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Inputs/Checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: [...CHECKBOX_SIZE_OPTIONS],
      table: { type: { summary: "'medium' | 'small'" }, defaultValue: { summary: "'medium'" } },
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Playground: Story = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs()
    return (
      <Checkbox
        {...args}
        checked={!!checked}
        onChange={(e) => updateArgs({ checked: e.target.checked })}
      />
    )
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: 'medium',
  },
}

export const Gallery: Story = {
  name: '📋 Gallery',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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
          Medium
        </p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Checkbox />
          <Checkbox defaultChecked />
          <Checkbox indeterminate />
          <Checkbox disabled />
          <Checkbox disabled defaultChecked />
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
          Small
        </p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Checkbox size="small" />
          <Checkbox size="small" defaultChecked />
          <Checkbox size="small" indeterminate />
          <Checkbox size="small" disabled />
          <Checkbox size="small" disabled defaultChecked />
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
        code: `<Checkbox />
<Checkbox defaultChecked />
<Checkbox indeterminate />
<Checkbox disabled />
<Checkbox size="small" />`,
      },
    },
  },
}

export const Unchecked: Story = { args: {} }
export const Checked: Story = { args: { defaultChecked: true } }
export const Indeterminate: Story = { args: { indeterminate: true } }
export const Disabled: Story = { args: { disabled: true } }
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } }
export const Small: Story = { args: { size: 'small' } }
export const SmallChecked: Story = { args: { size: 'small', defaultChecked: true } }
