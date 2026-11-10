import { defineContract } from '../contract'

export const calendarDayContract = defineContract({
  name: 'calendar-day',
  attributes: {},
  states: ['selected', 'today', 'active', 'in-range', 'outside-month', 'disabled'],
  parts: ['label', 'dot'],
})
