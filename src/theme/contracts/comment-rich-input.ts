import { defineContract } from '../contract'

export const commentRichInputContract = defineContract({
  name: 'comment-rich-input',
  attributes: {},
  parts: [
    'body',
    'editable-wrap',
    'editable',
    'footer',
    'toolbar',
    'toolbar-start',
    'toolbar-divider',
    /** `data-active` — формат применён */
    'icon-button',
    'align-button',
    'submit-group',
    'send-button',
    'send-text-button',
    'secondary-button',
    'icon-shrink',
    /** `data-error` — превышен лимит */
    'counter',
  ],
})
