import { defineContract } from '../contract'

export const modalStatusContract = defineContract({
  name: 'modal-status',
  attributes: {},
  parts: ['status-icon', 'status-center', 'status-title-center', 'status-desc-center'],
})
