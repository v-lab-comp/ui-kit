import type { Meta, StoryObj } from '@storybook/react'
import { TableGalleryPage } from './TableGalleryPage'

const meta: Meta<typeof TableGalleryPage> = {
  component: TableGalleryPage,
  title: 'Gallery/Table',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof TableGalleryPage>

export const Gallery: Story = {}
