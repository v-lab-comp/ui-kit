import { defineContract } from '../contract'

export const avatarGroupContract = defineContract({
  name: 'avatar-group',
  attributes: {
    mode: ['default', 'compact'],
    /** Только для mode="compact" */
    'compact-style': ['default', 'stroke'],
  },
  parts: ['item', 'avatars-block', 'compact-item', 'overflow-text'],
})
