import { defineContract } from '../contract'

export const accordionContract = defineContract({
  name: 'accordion',
  attributes: {},
  states: ['open', 'disabled', 'has-left-icon'],
  /** left-icon / right-icon: `data-toggle` — обёртка иконки +/− */
  parts: ['trigger', 'left-icon', 'right-icon', 'toggle-icon', 'title', 'content', 'content-inner'],
})
