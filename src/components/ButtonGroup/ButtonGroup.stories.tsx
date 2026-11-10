import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup } from './ButtonGroup'
import { Button } from '@/components/Button'
import { BUTTON_SIZE_OPTIONS } from '@/components/Button'

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  title: 'Components/ButtonGroup',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [...BUTTON_SIZE_OPTIONS],
    },
  },
}

export default meta

type Story = StoryObj<typeof ButtonGroup>

export const Playground: Story = {
  name: 'Playground',
  args: { size: 'medium' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="stroke" color="neutral">
        First
      </Button>
      <Button variant="stroke" color="neutral">
        Second
      </Button>
      <Button variant="stroke" color="neutral">
        Third
      </Button>
    </ButtonGroup>
  ),
}

export const Default: Story = {
  name: 'Stroke (default)',
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="stroke" color="neutral">
        Button
      </Button>
      <Button variant="stroke" color="neutral">
        Button
      </Button>
      <Button variant="stroke" color="neutral">
        Button
      </Button>
      <Button variant="stroke" color="neutral">
        Button
      </Button>
      <Button variant="stroke" color="neutral">
        Button
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `// size передаётся один раз на группу, все кнопки наследуют
<ButtonGroup size="small">
  <Button variant="stroke" color="neutral">Button</Button>
  <Button variant="stroke" color="neutral">Button</Button>
  <Button variant="stroke" color="neutral">Button</Button>
</ButtonGroup>`,
      },
    },
  },
}

export const Filled: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="filled" color="primary">
        Button
      </Button>
      <Button variant="filled" color="primary">
        Button
      </Button>
      <Button variant="filled" color="primary">
        Button
      </Button>
    </ButtonGroup>
  ),
}

export const Sizes: Story = {
  name: 'Все размеры (size на группе)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {BUTTON_SIZE_OPTIONS.map((size) => (
        <ButtonGroup key={size} size={size}>
          <Button variant="stroke" color="neutral">
            Button
          </Button>
          <Button variant="stroke" color="neutral">
            Button
          </Button>
          <Button variant="stroke" color="neutral">
            Button
          </Button>
        </ButtonGroup>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<ButtonGroup size="medium">...</ButtonGroup>
<ButtonGroup size="small">...</ButtonGroup>
<ButtonGroup size="x-small">...</ButtonGroup>
<ButtonGroup size="2x-small">...</ButtonGroup>`,
      },
    },
  },
}

export const ManyButtons: Story = {
  name: 'Разное кол-во кнопок (как на Figma)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      {[6, 5, 4, 3, 2].map((count) => (
        <ButtonGroup key={count}>
          {Array.from({ length: count }, (_, i) => (
            <Button key={i} variant="stroke" color="neutral">
              Button
            </Button>
          ))}
        </ButtonGroup>
      ))}
    </div>
  ),
}
