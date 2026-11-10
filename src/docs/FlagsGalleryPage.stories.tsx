import type { Meta, StoryObj } from '@storybook/react'
import { FlagsGalleryPage } from './FlagsGalleryPage'

const meta: Meta<typeof FlagsGalleryPage> = {
  component: FlagsGalleryPage,
  title: 'Design System/Country Flags',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof FlagsGalleryPage>

export const FlagsGallery: Story = {}
