import { defineContract } from '../contract'

/** right-button получает data-open, пока открыт dropdown. */
export const sidebarHeaderCardContract = defineContract({
  name: 'sidebar-header-card',
  attributes: {},
  parts: [
    'right-button',
    'wrapper',
    'dropdown',
    'dropdown-item',
    'dropdown-item-icon',
    'dropdown-item-content',
    'dropdown-item-label',
    'dropdown-item-subtitle',
  ],
})
