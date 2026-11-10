import { defineContract } from '../contract'

export const baseCheckboxContract = defineContract({
  name: 'base-checkbox',
  attributes: {
    size: ['medium', 'small'],
  },
})
