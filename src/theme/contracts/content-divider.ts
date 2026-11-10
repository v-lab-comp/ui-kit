import { defineContract } from '../contract'

export const contentDividerContract = defineContract({
  name: 'content-divider',
  attributes: {
    variant: ['line', 'lineSpacing', 'textAndLine', 'text', 'solidText', 'withSlot'],
  },
  parts: ['line', 'text-and-line-label', 'text-label'],
})
