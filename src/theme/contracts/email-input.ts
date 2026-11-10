import { defineContract } from '../contract'

export const emailInputContract = defineContract({
  name: 'email-input',
  attributes: {},
  parts: ['input-inner'],
})
