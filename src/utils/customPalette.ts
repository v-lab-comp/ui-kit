import type { CSSProperties } from 'react'

const HEX_COLOR_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

/** Возвращает `--pal-*` (как в color-palette.css) для произвольного hex. */
export function customPaletteStyle(hex: string): CSSProperties | undefined {
  const t = hex.trim()
  if (!HEX_COLOR_RE.test(t)) return undefined
  return {
    '--pal-base': t,
    '--pal-hover': `color-mix(in srgb, ${t} 82%, #000000)`,
    '--pal-active': `color-mix(in srgb, ${t} 68%, #000000)`,
    '--pal-bg-hover': `color-mix(in srgb, ${t} 16%, transparent)`,
    '--pal-bg-active': `color-mix(in srgb, ${t} 26%, transparent)`,
  } as CSSProperties
}
