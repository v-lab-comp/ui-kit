import { defineContract } from '../contract'

export const checkboxFieldContract = defineContract({
  name: 'checkbox-field',
  attributes: {},
  /**
   * flip — чекбокс справа; на части `label` при этом стоит `data-flipped`.
   * error — показан текст ошибки (`error`).
   */
  states: ['flip', 'error'],
  parts: ['label', 'label-content', 'description', 'link', 'hint', 'error'],
})
