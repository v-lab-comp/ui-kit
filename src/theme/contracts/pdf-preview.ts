import { defineContract } from '../contract'

export const pdfPreviewContract = defineContract({
  name: 'pdf-preview',
  attributes: {},
  parts: [
    'nav-button',
    'canvas-wrapper',
    'canvas',
    'filename-badge',
    'filename-badge-icon',
    'filename-badge-text',
    'page-counter',
  ],
})
