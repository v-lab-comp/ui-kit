import type { Meta, StoryObj } from '@storybook/react'
import { AvatarGalleryPage } from './AvatarGalleryPage'

const meta: Meta<typeof AvatarGalleryPage> = {
  component: AvatarGalleryPage,
  title: 'Gallery/Avatar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof AvatarGalleryPage>

export const Gallery: Story = {}
