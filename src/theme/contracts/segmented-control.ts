import { defineContract } from '../contract'

export const segmentedControlContract = defineContract({
  name: 'segmented-control',
  attributes: {
    size: ['medium', 'small', 'x-small'],
  },
  states: ['disabled'],
  /** item — `SegmentedControl.Item`; выбранный пункт помечен `data-selected="true"` */
  parts: ['thumb', 'item'],
})
