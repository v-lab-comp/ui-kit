import { defineContract } from '../contract'

/** `inner` / `icon` / `label` — общая разметка BreadcrumbLink и BreadcrumbPage */
export const breadcrumbItemContract = defineContract({
  name: 'breadcrumb-item',
  attributes: {},
  parts: ['inner', 'icon', 'label'],
})

export const breadcrumbLinkContract = defineContract({
  name: 'breadcrumb-link',
  attributes: {},
})

export const breadcrumbPageContract = defineContract({
  name: 'breadcrumb-page',
  attributes: {},
})
