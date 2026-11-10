import { defineContract } from '../contract'

/** FileUpload: FileUploadField / FileDropZone / FileUploadItem — общий корня нет, всё в parts. */
export const fileUploadContract = defineContract({
  name: 'file-upload',
  attributes: {
    size: ['default', 'compact'],
  },
  states: ['dragging'],
  parts: [
    'file-icon',
    'file-icon-ext',
    'file-item',
    'file-item-content',
    'file-item-download-btn',
    'file-item-text',
    'file-item-name',
    'file-item-meta',
    'file-item-size',
    'file-item-dot',
    'file-item-status',
    'file-item-action',
    'progress-track',
    'progress-fill',
    'spinning',
    'drop-zone-wrapper',
    'drop-zone-label',
    'drop-zone-required',
    'drop-zone',
    'drop-zone-compact',
    'drop-zone-icon',
    'drop-zone-btn',
    'drop-zone-text',
    'drop-zone-title',
    'drop-zone-subtitle',
    'upload-field',
    'upload-field-list',
  ],
})
