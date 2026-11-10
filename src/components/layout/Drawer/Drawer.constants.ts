export const DRAWER_SIDES = ['left', 'right', 'top', 'bottom'] as const
export type DrawerSide = (typeof DRAWER_SIDES)[number]

export const DRAWER_SIZES = {
  sm: 360,
  md: 440,
  lg: 560,
  xl: 720,
} as const

export type DrawerSize = keyof typeof DRAWER_SIZES
