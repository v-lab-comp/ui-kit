import { defineContract } from '../contract'

export const modalFooterSlotsContract = defineContract({
  name: 'modal-footer-slots',
  attributes: {},
  /** active — на части dot, anchor — на части link-button (рендер как <a>) */
  states: ['active', 'anchor'],
  parts: [
    'info',
    'info-icon',
    'info-text',
    'dots',
    'dot',
    'link-button',
    'switch-row',
    'switch-input',
    'switch-track',
    'switch-thumb',
    'switch-label',
  ],
})
