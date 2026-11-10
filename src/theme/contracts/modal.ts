import { defineContract } from '../contract'

export const modalContract = defineContract({
  name: 'modal',
  attributes: {
    animation: ['scale', 'slide', 'fade', 'none'],
  },
  parts: ['backdrop', 'center', 'panel'],
})
