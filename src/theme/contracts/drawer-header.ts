import { defineContract } from '../contract'

export const drawerHeaderContract = defineContract({
  name: 'drawer-header',
  attributes: {},
  states: ['close-only'],
  parts: ['icon-slot', 'text-column', 'title', 'subtitle'],
})
