import { defineContract } from '../contract'

export const modalFooterContract = defineContract({
  name: 'modal-footer',
  attributes: {},
  /** full-width — и на корне, и на части actions */
  states: ['with-start', 'full-width'],
  parts: ['start', 'actions', 'action-button', 'spinning'],
})
