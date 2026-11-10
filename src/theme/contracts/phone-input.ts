import { defineContract } from '../contract'

export const phoneInputContract = defineContract({
  name: 'phone-input',
  attributes: {},
  parts: ['phone-country-select', 'phone-input', 'phone-input-field'],
})
