import type { Meta, StoryObj } from '@storybook/react'
import { CompositeInputsGuide, CompositeInputsPlayground } from './CompositeInputsGuide'

const meta: Meta<typeof CompositeInputsGuide> = {
  component: CompositeInputsGuide,
  title: 'Docs/Composite Inputs (startBlock, endBlock)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Пошаговый гайд: как собрать составной инпут с startBlock, с endBlock и с обоими блоками.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof CompositeInputsGuide>

export const Guide: Story = {
  render: () => <CompositeInputsGuide />,
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
}

export const Playground: Story = {
  name: 'Playground — Отправить и посмотреть данные',
  render: () => <CompositeInputsPlayground />,
  parameters: {
    docs: {
      description: {
        story:
          'Заполни поля (сайт с протоколом и домен с зоной), нажми «Отправить» — в alert отобразится объект с полями website, protocol, domain, tld.',
      },
      source: { type: 'code' },
    },
  },
}
