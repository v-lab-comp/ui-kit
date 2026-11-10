import { defineContract } from '../contract'

export const tabsContract = defineContract({
  name: 'tabs',
  attributes: {},
  /** active — на части `tab` */
  states: ['active'],
  parts: ['list', 'tab', 'separator'],
})
