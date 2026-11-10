import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxField } from './CheckboxField'
import { CHECKBOX_SIZE_OPTIONS } from '../Checkbox.types'
import { MockTag } from '@/stories/helpers'

const mockTag = <MockTag />

const meta: Meta<typeof CheckboxField> = {
  component: CheckboxField,
  title: 'Inputs/CheckboxField',
  tags: ['autodocs'],
  parameters: {
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    flip: { control: 'boolean' },
    size: {
      control: 'select',
      options: [...CHECKBOX_SIZE_OPTIONS],
      table: { type: { summary: "'medium' | 'small'" }, defaultValue: { summary: "'medium'" } },
    },
  },
}

export default meta

type Story = StoryObj<typeof CheckboxField>

export const Playground: Story = {
  args: {
    label: 'Accept terms and conditions',
    hint: 'Helper text goes here',
    flip: false,
    disabled: false,
    size: 'medium',
  },
}

export const Gallery: Story = {
  name: '📋 Gallery',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <CheckboxField label="Default" />
      <CheckboxField label="Checked" defaultChecked />
      <CheckboxField label="Label" sublabel="(Sublabel)" />
      <CheckboxField label="Label" sublabel="(Sublabel)" tag={mockTag} />
      <CheckboxField label="With hint" hint="Helper text goes here" />
      <CheckboxField label="With description" description="Insert the checkbox description here." />
      <CheckboxField
        label="With description and link"
        description="Insert the checkbox description here."
        link={
          <a href="#" style={{ color: 'var(--primary-base)', textDecoration: 'none' }}>
            Link Button
          </a>
        }
      />
      <CheckboxField label="With error" error="This field is required" />
      <CheckboxField label="Disabled" hint="This option is unavailable" disabled />
      <CheckboxField
        label="Disabled checked"
        hint="This option is unavailable"
        disabled
        defaultChecked
      />
      <CheckboxField label="Small" size="small" hint="Helper text" />
      <div style={{ width: '100%', height: 1, background: '#eee' }} />
      <CheckboxField label="Label" sublabel="(Sublabel)" tag={mockTag} flip />
      <CheckboxField
        label="Label"
        sublabel="(Sublabel)"
        tag={mockTag}
        description="Insert the checkbox description here."
        flip
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<CheckboxField
  label="Label"
  sublabel="(Sublabel)"
  tag={<Badge>NEW</Badge>}
  description="Insert the checkbox description here."
  hint="Helper text goes here"
/>`,
      },
    },
  },
}

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Accept terms and conditions',
    hint: 'You must accept to continue',
  },
}

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    error: 'This field is required',
  },
}

export const WithSublabel: Story = {
  args: {
    label: 'Label',
    sublabel: '(Sublabel)',
  },
}

export const WithTag: Story = {
  render: (args) => <CheckboxField {...args} tag={mockTag} />,
  args: {
    label: 'Label',
    sublabel: '(Sublabel)',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<CheckboxField label="Label" sublabel="(Sublabel)" tag={<Badge>NEW</Badge>} />`,
      },
    },
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Label',
    sublabel: '(Sublabel)',
    description: 'Insert the checkbox description here.',
  },
}

export const WithDescriptionAndLink: Story = {
  render: (args) => (
    <CheckboxField
      {...args}
      link={
        <a href="#" style={{ color: 'var(--primary-base)', textDecoration: 'none' }}>
          Link Button
        </a>
      }
    />
  ),
  args: {
    label: 'Label',
    sublabel: '(Sublabel)',
    description: 'Insert the checkbox description here.',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<CheckboxField
  label="Label"
  sublabel="(Sublabel)"
  description="Insert the checkbox description here."
  link={<a href="/terms">Link Button</a>}
/>`,
      },
    },
  },
}

export const Flipped: Story = {
  args: {
    label: 'Label',
    sublabel: '(Sublabel)',
    flip: true,
  },
}

export const FlippedWithDescription: Story = {
  render: (args) => (
    <div style={{ width: 400 }}>
      <CheckboxField
        {...args}
        link={
          <a href="#" style={{ color: 'var(--primary-base)', textDecoration: 'none' }}>
            Link Button
          </a>
        }
      />
    </div>
  ),
  args: {
    label: 'Label',
    sublabel: '(Sublabel)',
    tag: mockTag,
    description: 'Insert the checkbox description here.',
    flip: true,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<CheckboxField
  label="Label"
  sublabel="(Sublabel)"
  tag={<Badge>NEW</Badge>}
  description="Insert the checkbox description here."
  link={<a href="/terms">Link Button</a>}
  flip
/>`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Accept terms and conditions',
    hint: 'This option is unavailable',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    label: 'Accept terms and conditions',
    hint: 'You must accept to continue',
    size: 'small',
  },
}
