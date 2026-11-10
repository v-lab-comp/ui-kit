import { defineContract } from '../contract'

export const modalHeaderContract = defineContract({
  name: 'modal-header',
  attributes: {},
  states: ['close-only'],
  parts: ['icon-slot', 'text-column', 'title', 'subtitle', 'close'],
})
