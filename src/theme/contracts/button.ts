import { COLOR_OPTIONS } from '@/types/colors'
import { defineContract } from '../contract'

export const buttonContract = defineContract({
  name: 'button',
  attributes: {
    variant: ['filled', 'stroke', 'lighter', 'ghost'],
    color: COLOR_OPTIONS,
    size: ['medium', 'small', 'x-small', '2x-small'],
    shape: ['rounded', 'circle', 'square'],
  },
  /** custom-color: цвет задан через `customColor` (инлайн `--pal-*`), `data-color` нет */
  states: ['custom-color'],
})
