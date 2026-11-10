import { defineContract } from '../contract'

export const calendarHeaderContract = defineContract({
  name: 'calendar-header',
  attributes: {},
  /** clickable — на части label, когда заголовок — кнопка */
  states: ['clickable'],
  parts: ['nav-btn', 'label'],
})
