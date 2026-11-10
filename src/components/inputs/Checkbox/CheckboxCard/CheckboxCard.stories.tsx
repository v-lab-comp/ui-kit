import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxCard } from './CheckboxCard'
import { MockTag, MockAvatar } from '@/stories/helpers'

const mockTag = <MockTag />
const mockAvatar = <MockAvatar />

const meta: Meta<typeof CheckboxCard> = {
  component: CheckboxCard,
  title: 'Inputs/CheckboxCard',
  tags: ['autodocs'],
  parameters: {
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof CheckboxCard>

const fullArgs = {
  prefix: mockAvatar,
  label: 'Label',
  sublabel: '(Sublabel)',
  tag: mockTag,
  description: 'Insert the checkbox description here.',
}

export const Gallery: Story = {
  name: '📋 Gallery',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <CheckboxCard {...fullArgs} />
      <CheckboxCard {...fullArgs} defaultChecked />
      <CheckboxCard {...fullArgs} disabled />
      <CheckboxCard {...fullArgs} disabled defaultChecked />
      <CheckboxCard
        label="Label"
        sublabel="(Sublabel)"
        tag={mockTag}
        description="Without prefix."
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<CheckboxCard
  prefix={<Avatar src="/photo.jpg" />}
  label="Label"
  sublabel="(Sublabel)"
  tag={<Badge>NEW</Badge>}
  description="Insert the checkbox description here."
/>`,
      },
    },
  },
}

const sourceCode = `<CheckboxCard
  prefix={<Avatar src="/photo.jpg" />}
  label="Label"
  sublabel="(Sublabel)"
  tag={<Badge>NEW</Badge>}
  description="Insert the checkbox description here."
/>`

export const Default: Story = {
  args: { ...fullArgs },
  parameters: { docs: { source: { type: 'code', language: 'tsx', code: sourceCode } } },
}

export const Checked: Story = {
  args: { ...fullArgs, defaultChecked: true },
  parameters: {
    docs: { source: { type: 'code', language: 'tsx', code: sourceCode + '\n// defaultChecked' } },
  },
}

export const Disabled: Story = {
  args: { ...fullArgs, disabled: true },
  parameters: {
    docs: {
      source: { type: 'code', language: 'tsx', code: sourceCode.replace('/>', '\n  disabled\n/>') },
    },
  },
}

export const DisabledChecked: Story = {
  args: { ...fullArgs, disabled: true, defaultChecked: true },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: sourceCode.replace('/>', '\n  disabled\n  defaultChecked\n/>'),
      },
    },
  },
}

export const WithoutPrefix: Story = {
  args: {
    label: 'Label',
    sublabel: '(Sublabel)',
    tag: mockTag,
    description: 'Insert the checkbox description here.',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<CheckboxCard
  label="Label"
  sublabel="(Sublabel)"
  tag={<Badge>NEW</Badge>}
  description="Insert the checkbox description here."
/>`,
      },
    },
  },
}
