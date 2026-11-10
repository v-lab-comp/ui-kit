import { defineContract } from '../contract'

export const baseInputContract = defineContract({
  name: 'base-input',
  attributes: {
    size: ['big', 'medium', 'small'],
  },
  states: ['error', 'filled'],
})
