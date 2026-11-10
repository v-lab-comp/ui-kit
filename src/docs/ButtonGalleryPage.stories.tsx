import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGalleryPage } from './ButtonGalleryPage'

const meta: Meta<typeof ButtonGalleryPage> = {
  component: ButtonGalleryPage,
  title: 'Gallery/Button',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof ButtonGalleryPage>

export const Gallery: Story = {}
