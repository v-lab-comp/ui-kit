import { defineContract } from '../contract'

export const appSwitcherContract = defineContract({
  name: 'app-switcher',
  attributes: {},
  parts: [
    'trigger',
    'trigger-info',
    'trigger-labels',
    'trigger-name',
    'trigger-description',
    'trigger-divider',
    'trigger-grid',
    'promo',
    'promo-title',
    'promo-subtitle',
    'dropdown',
    'grid',
    'item',
    'item-label',
    'icon-wrap',
    'icon-img',
    'icon-initial',
    'icon-node',
    'active-dot',
    'badge',
    'soon-label',
  ],
})
