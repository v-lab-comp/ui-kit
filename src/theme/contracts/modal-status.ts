import { defineContract } from '../contract'

export const modalStatusContract = defineContract({
  name: 'modal-status',
  /** variant — на части status-icon: цвет плашки задаёт скин */
  attributes: {
    variant: ['error', 'warning', 'info', 'success'],
  },
  parts: ['status-icon', 'status-center', 'status-title-center', 'status-desc-center'],
})
