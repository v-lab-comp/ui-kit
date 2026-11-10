import { defineContract } from '../contract'

/** Корень рендерит data-collapsed="true" | "false" (исторически), поэтому вне states. */
export const sidebarContract = defineContract({
  name: 'sidebar',
  attributes: {},
})

export const sidebarContentContract = defineContract({
  name: 'sidebar-content',
  attributes: {},
})

export const sidebarSectionContract = defineContract({
  name: 'sidebar-section',
  attributes: {},
  parts: ['label', 'items'],
})

/** Часть icon получает data-collapsed. */
export const sidebarTriggerContract = defineContract({
  name: 'sidebar-trigger',
  attributes: {},
  parts: ['icon'],
})

export const sidebarLayoutContract = defineContract({
  name: 'sidebar-layout',
  attributes: {},
})

export const sidebarMainContract = defineContract({
  name: 'sidebar-main',
  attributes: {},
  states: ['collapsed'],
})
