import { defineContract } from '../contract'

/** placement — фактическая сторона после flip/shift: скин может направить хвостик или анимацию */
export const tooltipContract = defineContract({
  name: 'tooltip',
  attributes: {
    placement: [
      'top',
      'top-start',
      'top-end',
      'right',
      'right-start',
      'right-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
    ],
  },
})
