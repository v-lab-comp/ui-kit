import { defineContract } from '../contract'

export const searchInputContract = defineContract({
  name: 'search-input',
  attributes: {},
  parts: ['input-inner', 'shortcut'],
})
