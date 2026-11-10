import { defineContract } from '../contract'

/** Используется и SidebarHeaderCard / SidebarUserProfileCard (части title / subtitle). */
export const sidebarCardContract = defineContract({
  name: 'sidebar-card',
  attributes: {},
  states: ['unbordered', 'collapsed'],
  parts: ['left-slot', 'content', 'right', 'title', 'subtitle'],
})
