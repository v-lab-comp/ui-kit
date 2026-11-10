import { defineContract } from '../contract'

export const dateInputContract = defineContract({
  name: 'date-input',
  attributes: {},
  /** calendar-btn: `data-disabled`; поле ввода дополнительно носит класс `vl-base-input` */
  parts: ['input-inner', 'calendar-btn', 'popover'],
})
