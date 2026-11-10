import { defineContract } from '../contract'

export const toastProviderContract = defineContract({
  name: 'toast-provider',
  attributes: {
    position: [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ],
  },
})
