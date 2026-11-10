import { COLOR_OPTIONS } from '@/types/colors'
import { defineContract } from '../contract'

export const avatarContract = defineContract({
  name: 'avatar',
  attributes: {
    color: COLOR_OPTIONS,
  },
  parts: ['icon', 'default-icon', 'default-icon-head', 'default-icon-shoulders'],
})
