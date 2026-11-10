import type { Meta, StoryObj } from '@storybook/react'
import { AccordionGalleryPage } from './AccordionGalleryPage'

const meta: Meta<typeof AccordionGalleryPage> = {
  component: AccordionGalleryPage,
  title: 'Gallery/Accordion',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export default meta

type Story = StoryObj<typeof AccordionGalleryPage>

export const Gallery: Story = {}
