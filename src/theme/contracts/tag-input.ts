import { defineContract } from '../contract'

/**
 * TagInput: корень — оболочка InputField (`data-size`).
 * suggestion-btn: `data-with-check`, `data-disabled`, `data-active`.
 */
export const tagInputContract = defineContract({
  name: 'tag-input',
  attributes: {},
  parts: [
    'tags-scroll-area',
    'tags-shell',
    'input-inner',
    'suggestions-popover',
    'suggestions-list',
    'suggestion-btn',
    'suggestion-btn-label',
    'suggestion-btn-check-slot',
    'suggestion-check-icon',
    'suggestions-message',
    'more-tags',
    'render-tag-wrap',
  ],
})
