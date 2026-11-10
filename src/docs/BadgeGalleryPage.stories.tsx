import type { Meta, StoryObj } from '@storybook/react'
import { BadgeGalleryPage } from './BadgeGalleryPage'

const meta: Meta<typeof BadgeGalleryPage> = {
  component: BadgeGalleryPage,
  title: 'Gallery/Badge',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof BadgeGalleryPage>

export const Gallery: Story = {}
