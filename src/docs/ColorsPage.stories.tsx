import type { Meta, StoryObj } from '@storybook/react'
import { ColorsPage } from './ColorsPage'

const meta: Meta<typeof ColorsPage> = {
  component: ColorsPage,
  title: 'Design System/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof ColorsPage>

export const PrimitivesAndSemantics: Story = {}
