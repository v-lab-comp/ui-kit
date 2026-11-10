import { defineContract } from '../contract'

export const sidebarFooterContract = defineContract({
  name: 'sidebar-footer',
  attributes: {},
  states: ['collapsed'],
  parts: ['divider'],
})
