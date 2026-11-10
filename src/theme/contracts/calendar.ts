import { defineContract } from '../contract'

export const calendarContract = defineContract({
  name: 'calendar',
  attributes: {},
  /** active — на части option (выбранный месяц / год) */
  states: ['active'],
  parts: ['option-grid', 'option'],
})
