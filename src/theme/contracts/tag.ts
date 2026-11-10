import { COLOR_OPTIONS } from '@/types/colors'
import { defineContract } from '../contract'

export const tagContract = defineContract({
  name: 'tag',
  attributes: {
    variant: ['stroke', 'gray', 'filled', 'light'],
    color: COLOR_OPTIONS,
    size: ['small', 'medium', 'large'],
    shape: ['rounded', 'pill'],
  },
  /** custom-color: цвет задан через `customColor` (инлайн `--pal-*`), `data-color` нет */
  states: ['custom-color', 'with-dismiss', 'has-prefix', 'interactive', 'disabled'],
  /** prefix: `data-rounded` — скруглённая ячейка под аватар */
  parts: [
    'cluster',
    'main-hit',
    'main-static',
    'prefix',
    'suffix',
    'text-row',
    'label',
    'sublabel',
    'dismiss',
  ],
})
