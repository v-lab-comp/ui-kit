const COLOR_OPTIONS = [
  'primary',
  'neutral',
  'error',
  'information',
  'warning',
  'success',
  'away',
  'feature',
  'verified',
  'highlighted',
  'stable',
] as const

export type Color = (typeof COLOR_OPTIONS)[number]
export { COLOR_OPTIONS }
