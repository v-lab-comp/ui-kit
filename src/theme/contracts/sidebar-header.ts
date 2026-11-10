import { defineContract } from '../contract'

export const sidebarHeaderContract = defineContract({
  name: 'sidebar-header',
  attributes: {},
  states: ['collapsed'],
  parts: ['divider', 'trigger'],
})
