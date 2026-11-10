import { defineContract } from '../contract'

export const checkboxCardContract = defineContract({
  name: 'checkbox-card',
  attributes: {},
  parts: ['prefix', 'card-content'],
})
