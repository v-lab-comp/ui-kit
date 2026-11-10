import { defineContract } from '../contract'

export const checkboxLabelRowContract = defineContract({
  name: 'checkbox-label-row',
  attributes: {},
  parts: ['label-text', 'sublabel-text', 'tag-wrapper', 'description'],
})
