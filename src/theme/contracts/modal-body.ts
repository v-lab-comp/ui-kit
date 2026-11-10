import { defineContract } from '../contract'

export const modalBodyContract = defineContract({
  name: 'modal-body',
  attributes: {
    align: ['start', 'center'],
  },
  states: ['compact-top'],
})
