import { defineContract } from '../contract'

/** Части: backdrop (data-status), panel (data-side, data-status, data-mobile-bottom). */
export const drawerContract = defineContract({
  name: 'drawer',
  attributes: {},
  parts: ['backdrop', 'panel'],
})
