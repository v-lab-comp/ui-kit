import type { Meta, StoryObj } from '@storybook/react'
import { ShadowsPage } from './ShadowsPage'

const meta: Meta<typeof ShadowsPage> = {
  component: ShadowsPage,
  title: 'Design System/Shadows',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof ShadowsPage>

export const Gallery: Story = {}
