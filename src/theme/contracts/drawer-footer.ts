import { defineContract } from '../contract'

/** Часть actions получает data-full-width при fullWidth. */
export const drawerFooterContract = defineContract({
  name: 'drawer-footer',
  attributes: {},
  states: ['with-start'],
  parts: ['start', 'actions'],
})
