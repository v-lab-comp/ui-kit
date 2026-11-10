import type { Meta, StoryObj } from '@storybook/react'
import { InputsGalleryPage } from './InputsGalleryPage'

const meta: Meta<typeof InputsGalleryPage> = {
  component: InputsGalleryPage,
  title: 'Gallery/Inputs',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof InputsGalleryPage>

export const Gallery: Story = {}
