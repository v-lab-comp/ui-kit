import { defineContract } from '../contract'

/**
 * SelectInput: корень — контейнер. Триггеры (`compact-trigger` / `inline-trigger` / `trigger`)
 * несут `data-size` / `data-open` / `data-filled` / `data-completed` / `data-error`.
 * Модификаторы частей: option `data-wrap` / `data-multi` / `data-highlighted` / `data-selected`,
 * option-text `data-wrap`, option-group-label `data-sep`, option-primary / option-description
 * `data-ellipsis`, empty-state / async-footer-message `data-error`.
 */
export const selectInputContract = defineContract({
  name: 'select-input',
  attributes: {},
  parts: [
    'hidden-select',
    'trigger',
    'trigger-text',
    'suffix-group',
    'clear-btn',
    'chevron',
    'compact-trigger',
    'compact-icon',
    'compact-text',
    'inline-trigger',
    'dropdown-portal',
    'dropdown',
    'dropdown-search-field',
    'options-scroll',
    'options-list',
    'option-group-label',
    'option',
    'option-icon',
    'option-text',
    'option-checkbox',
    'option-text-stack',
    'option-primary',
    'option-description',
    'load-more-sentinel',
    'empty-state',
    'async-footer-message',
  ],
})
