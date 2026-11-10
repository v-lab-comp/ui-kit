import { defineContract } from '../contract'

export const checkboxFieldContract = defineContract({
  name: 'checkbox-field',
  attributes: {},
  /** flip — чекбокс справа; на части `label` при этом стоит `data-flipped` */
  states: ['flip'],
  parts: ['label', 'label-content', 'description', 'link', 'hint', 'error'],
})
