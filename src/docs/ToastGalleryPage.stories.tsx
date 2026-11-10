import type { Meta, StoryObj } from '@storybook/react'
import { ToastGalleryPage } from './ToastGalleryPage'

const meta: Meta<typeof ToastGalleryPage> = {
  component: ToastGalleryPage,
  title: 'Gallery/Toast',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof ToastGalleryPage>

export const Gallery: Story = {}
