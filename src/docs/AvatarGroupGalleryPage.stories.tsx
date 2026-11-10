import type { Meta, StoryObj } from '@storybook/react'
import { AvatarGroupGalleryPage } from './AvatarGroupGalleryPage'

const meta: Meta<typeof AvatarGroupGalleryPage> = {
  component: AvatarGroupGalleryPage,
  title: 'Gallery/AvatarGroup',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta
type Story = StoryObj<typeof AvatarGroupGalleryPage>

export const Gallery: Story = {}
