import { defineContract } from '../contract'

export const shareLinkInputContract = defineContract({
  name: 'share-link-input',
  attributes: {},
  parts: ['input-inner', 'copy-button', 'copy-icon', 'copy-label'],
})
