import { defineContract } from '../contract'

export const passwordInputContract = defineContract({
  name: 'password-input',
  attributes: {},
  parts: ['input-inner', 'eye-btn'],
})
