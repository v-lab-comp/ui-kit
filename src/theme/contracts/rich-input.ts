import { defineContract } from '../contract'

export const richInputContract = defineContract({
  name: 'rich-input',
  attributes: {},
  /** toolbar: `data-placement`; tool-button: `data-on`; counter: `data-error` */
  parts: ['wrapper', 'toolbar', 'tool-button', 'editable', 'footer', 'counter'],
})
