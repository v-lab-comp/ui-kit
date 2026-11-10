import { COLOR_OPTIONS } from '@/types/colors'
import { defineContract } from '../contract'

export const badgeContract = defineContract({
  name: 'badge',
  attributes: {
    variant: ['filled', 'light', 'lighter', 'stroke'],
    color: COLOR_OPTIONS,
    size: ['xsmall', 'small', 'medium', 'large'],
    shape: ['pill', 'rounded', 'circle'],
  },
  /** interactive: есть onClick и не disabled; custom-color: цвет задан через `customColor` */
  states: ['has-left-node', 'has-right-node', 'interactive', 'disabled', 'custom-color'],
  parts: ['node', 'dot'],
})
