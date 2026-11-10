import { defineContract } from '../contract'

/** Часть bar-slot получает data-active; часть item — data-active и data-collapsed. */
export const sidebarItemContract = defineContract({
  name: 'sidebar-item',
  attributes: {},
  states: ['collapsed'],
  parts: ['bar-slot', 'item', 'left', 'label', 'right'],
})
