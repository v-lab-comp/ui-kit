import type { Meta, StoryObj } from '@storybook/react'
import { SemanticTokensPage } from './SemanticTokensPage'

const meta: Meta<typeof SemanticTokensPage> = {
  component: SemanticTokensPage,
  title: 'Design System/Semantic Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof SemanticTokensPage>

export const Tokens: Story = {}
