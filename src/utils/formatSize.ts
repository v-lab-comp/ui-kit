/**
 * Convert a size value to a CSS size string.
 * Numbers are converted to pixels, strings are returned as-is.
 *
 * @example
 * formatSize(16) // '16px'
 * formatSize('2rem') // '2rem'
 * formatSize(undefined) // undefined
 */
export function formatSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}
