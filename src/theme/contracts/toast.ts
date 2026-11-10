import { defineContract } from '../contract'

export const toastContract = defineContract({
  name: 'toast',
  attributes: {
    variant: ['filled', 'light', 'lighter', 'stroke'],
    /** Палитра: проп `color="info"` рендерит `data-color="information"` */
    color: ['error', 'warning', 'success', 'information', 'neutral'],
    size: ['x-small', 'small', 'large'],
  },
  parts: [
    'icon',
    'content',
    'title',
    'description',
    'actions',
    'action-item',
    'action-inline',
    'action',
    'close',
  ],
})
