import { defineContract } from '../contract'

export const pageHeaderDemoContract = defineContract({
  name: 'page-header-demo',
  attributes: {},
  parts: [
    'row',
    'title-block',
    'title',
    'actions',
    'topbar-btn',
    'notification-wrap',
    'notification-dot',
    'btn-group',
    'secondary-btn',
    'primary-btn',
  ],
})
