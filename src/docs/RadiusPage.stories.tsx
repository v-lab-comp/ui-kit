import type { Meta, StoryObj } from '@storybook/react'
import { RadiusPage } from './RadiusPage'

const meta: Meta<typeof RadiusPage> = {
  component: RadiusPage,
  title: 'Design System/Radius',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof RadiusPage>

export const Tokens: Story = {}
