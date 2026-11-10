import { defineContract } from '../contract'

export const pageHeaderContract = defineContract({
  name: 'page-header',
  attributes: {},
  /** title-block / title / description — для типового контента хедера */
  parts: ['title-block', 'title', 'description'],
})
