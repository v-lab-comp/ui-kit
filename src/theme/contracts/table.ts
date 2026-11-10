import { defineContract } from '../contract'

/** Атрибуты и состояния ставятся на внутренние части (root, th, td, tr, sort-btn, …). */
export const tableContract = defineContract({
  name: 'table',
  attributes: {
    /** sort-btn */
    align: ['left', 'center', 'right'],
  },
  states: [
    'scroll',
    'sticky-left',
    'sticky-left-last',
    'sortable',
    'reorderable',
    'drag-over',
    'clickable',
    'active',
    'strong',
  ],
  parts: [
    'root',
    'table',
    'th',
    'td',
    'tr',
    'sort-btn',
    'sort-label',
    'sort-icons',
    'sort-icon',
    'pagination',
    'pagination-left',
    'pagination-info',
    'pagination-center',
    'btn-group',
    'page-btn',
    'ellipsis',
    'pagination-right',
    'compact-select',
    'select-overlay',
  ],
})
