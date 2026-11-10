import { defineContract } from '../contract'

export const siteInputContract = defineContract({
  name: 'site-input',
  attributes: {},
  parts: ['input-inner'],
})
