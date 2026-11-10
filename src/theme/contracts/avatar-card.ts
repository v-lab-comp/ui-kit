import { defineContract } from '../contract'

export const avatarCardContract = defineContract({
  name: 'avatar-card',
  attributes: {
    'avatar-size': ['20', '24', '32', '40', '48', '56', '64', '72', '80'],
  },
  parts: ['content', 'title', 'subtitle', 'right'],
})
