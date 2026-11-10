import type { Meta, StoryObj } from '@storybook/react'
import { IconsGalleryPage } from './IconsGalleryPage'

const meta: Meta<typeof IconsGalleryPage> = {
  component: IconsGalleryPage,
  title: 'Design System/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof IconsGalleryPage>

export const RemixIconGallery: Story = {}
