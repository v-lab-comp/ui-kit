import { defineContract } from '../contract'

export const inputFieldContract = defineContract({
  name: 'input-field',
  attributes: {},
  parts: [
    'label-row',
    'label',
    'required',
    'optional',
    'label-tooltip',
    'wrapper',
    'block-start',
    'block-end',
    'addon-start',
    'addon-end',
    'hint-row',
    'hint-icon',
    'hint-text',
  ],
})
