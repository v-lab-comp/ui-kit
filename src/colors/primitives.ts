/**
 * Primitive color scale — сгенерировано из src/skins/corporate/primitives.css.
 * Не редактировать вручную. После правок в primitives.css запусти: npm run gen:primitives
 */

export const colors = {
  slate: {
    0: '#ffffff',
    50: '#f5f7fa',
    100: '#f2f5f8',
    200: '#eaecf0',
    300: '#cacfd8',
    400: '#99a0ae',
    500: '#717784',
    600: '#525866',
    700: '#2b303b',
    800: '#222530',
    900: '#181b25',
    950: '#0e121b',
  },
  blue: {
    50: '#ebf1ff',
    100: '#d5e2ff',
    200: '#c0d5ff',
    300: '#97baff',
    400: '#4c82ff',
    500: '#335cff',
    600: '#3559e9',
    700: '#2547d0',
    800: '#1f3bad',
    900: '#182f8b',
    950: '#122368',
  },
  orange: {
    50: '#fff3eb',
    100: '#ffe6d5',
    200: '#ffd9c0',
    300: '#ffc197',
    400: '#ffa468',
    500: '#fa7319',
    600: '#e16614',
    700: '#ce5e12',
    800: '#b75310',
    900: '#96440d',
    950: '#71330a',
  },
  red: {
    50: '#ffebec',
    100: '#ffd5d8',
    200: '#ffc0c5',
    300: '#ff97a0',
    400: '#ff6875',
    500: '#fb3748',
    600: '#e93544',
    700: '#d02533',
    800: '#ad1f2b',
    900: '#8b1822',
    950: '#681219',
  },
  green: {
    50: '#e3f7ec',
    100: '#d6f5e8',
    200: '#c2f5da',
    300: '#84ebb4',
    400: '#3ee089',
    500: '#1fc16b',
    600: '#1daf61',
    700: '#178c4e',
    800: '#1a7544',
    900: '#16643b',
    950: '#0b4627',
  },
  yellow: {
    50: '#fffaeb',
    100: '#ffefcc',
    200: '#ffecc0',
    300: '#ffe097',
    400: '#ffd268',
    500: '#f6b51e',
    600: '#e6a819',
    700: '#c99a2c',
    800: '#a78025',
    900: '#86661d',
    950: '#624c18',
  },
  purple: {
    50: '#efebff',
    100: '#dcd5ff',
    200: '#cac0ff',
    300: '#a897ff',
    400: '#8c71f6',
    500: '#7d52f4',
    600: '#693ee0',
    700: '#5b2cc9',
    800: '#4c25a7',
    900: '#3d1d86',
    950: '#351a75',
  },
  sky: {
    50: '#ebf8ff',
    100: '#d5f1ff',
    200: '#c0eaff',
    300: '#97dcff',
    400: '#68cdff',
    500: '#47c2ff',
    600: '#35ade9',
    700: '#2597d0',
    800: '#1f7ead',
    900: '#18658b',
    950: '#124b68',
  },
  pink: {
    50: '#ffebf4',
    100: '#ffd5ea',
    200: '#ffc0df',
    300: '#ff97cb',
    400: '#ff68b3',
    500: '#fb4ba3',
    600: '#e9358f',
    700: '#d0257a',
    800: '#ad1f66',
    900: '#8b1852',
    950: '#68123d',
  },
  teal: {
    50: '#e4fbf8',
    100: '#d0fbf5',
    200: '#c2f5ee',
    300: '#84ebdd',
    400: '#3fdec9',
    500: '#22d3bb',
    600: '#1daf9c',
    700: '#178c7d',
    800: '#1a7569',
    900: '#16645a',
    950: '#0b463e',
  },
  neutral: {
    0: '#ffffff',
    50: '#f7f7f7',
    100: '#f5f5f5',
    200: '#ebebeb',
    300: '#d1d1d1',
    400: '#a3a3a3',
    500: '#7a7a7a',
    600: '#5c5c5c',
    700: '#333333',
    800: '#262626',
    900: '#1c1c1c',
    950: '#171717',
  },
} as const

/** Alpha-переменные для оверлеев (dark mode и т.д.) */
export const alpha = {
  neutral: {
    10: '#99a0ae1a',
    16: '#99a0ae29',
    24: '#99a0ae3d',
  },
  blue: {
    10: '#476cff1a',
    16: '#476cff29',
    24: '#476cff3d',
  },
  orange: {
    10: '#fa73191a',
    16: '#fa731929',
    24: '#fa73193d',
  },
  red: {
    10: '#fb37481a',
    16: '#fb374829',
    24: '#fb37483d',
  },
  green: {
    10: '#1fc16b1a',
    16: '#1fc16b29',
    24: '#1fc16b3d',
  },
  yellow: {
    10: '#fbc64b1a',
    16: '#fbc64b29',
    24: '#fbc64b3d',
  },
  sky: {
    10: '#47c2ff1a',
    16: '#47c2ff29',
    24: '#47c2ff3d',
  },
  purple: {
    10: '#784def1a',
    16: '#784def29',
    24: '#784def3d',
  },
  pink: {
    10: '#fb4ba31a',
    16: '#fb4ba329',
    24: '#fb4ba33d',
  },
  teal: {
    10: '#22d3bb1a',
    16: '#22d3bb29',
    24: '#22d3bb3d',
  },
  white: {
    10: '#ffffff1a',
    16: '#ffffff29',
    24: '#ffffff3d',
  },
  black: {
    10: '#1717171a',
    16: '#17171729',
    24: '#1717173d',
  },
} as const

/** primitive ref (neutral-950, blue-alpha-16) → hex */
export function getPrimitiveHex(ref: string): string {
  const alphaMatch = ref.match(/^(.+)-alpha-(.+)$/)
  if (alphaMatch) {
    const [, name, step] = alphaMatch
    const a = (alpha as Record<string, Record<string, string>>)[name]
    return a?.[step] ?? ''
  }
  const [name, step] = ref.split('-')
  const scale = (colors as Record<string, Record<string, string>>)[name]
  return scale?.[step] ?? ''
}
