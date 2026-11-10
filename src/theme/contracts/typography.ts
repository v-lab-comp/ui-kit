import { defineContract } from '../contract'

/** Стиль задаёт пара `data-variant` + `data-size`; `data-weight` не рендерится у `docs`. */
export const typographyContract = defineContract({
  name: 'typography',
  attributes: {
    variant: ['title', 'label', 'paragraph', 'subheading', 'docs'],
    size: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'x-large',
      'large',
      'medium',
      'small',
      'x-small',
      '2x-small',
      'label',
      'paragraph',
    ],
    weight: [
      'thin',
      'extralight',
      'light',
      'regular',
      'medium',
      'semibold',
      'bold',
      'extrabold',
      'black',
    ],
  },
})
