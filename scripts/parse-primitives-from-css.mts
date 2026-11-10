/**
 * Парсит primitives.css и генерирует primitives.ts.
 * Источник правды — src/skins/corporate/primitives.css. После правок запусти: npm run gen:primitives
 */
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const cssPath = join(__dirname, '../src/skins/corporate/primitives.css')
const outPath = join(__dirname, '../src/colors/primitives.ts')

let css = readFileSync(cssPath, 'utf8')
// Убираем комментарии, чтобы не парсить закомментированные переменные
css = css.replace(/\/\*[\s\S]*?\*\//g, '')

// Строки вида: --name-step: value;  или  --name-alpha-step: value;
const lineRe = /^\s*--([^:]+):\s*([^;]+);/gm
const colors = Object.create(null) as Record<string, Record<string, string>>
const alpha = Object.create(null) as Record<string, Record<string, string>>

let m
while ((m = lineRe.exec(css)) !== null) {
  const key = m[1].trim()
  const value = m[2].trim()
  const alphaMatch = key.match(/^(.+)-alpha-(\d+)$/)
  if (alphaMatch) {
    const [, name, step] = alphaMatch
    if (!alpha[name]) alpha[name] = {}
    alpha[name][step] = value
  } else {
    const colorMatch = key.match(/^(.+)-(-?\d+)$/)
    if (colorMatch) {
      const [, name, step] = colorMatch
      if (!colors[name]) colors[name] = {}
      colors[name][step] = value
    }
  }
}

function stringifyObj(obj: Record<string, Record<string, string>>, indent: string): string {
  const lines: string[] = []
  for (const [name, scale] of Object.entries(obj)) {
    const sorted = Object.entries(scale).sort((a, b) => {
      const na = Number(a[0])
      const nb = Number(b[0])
      if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb
      return String(a[0]).localeCompare(String(b[0]))
    })
    lines.push(`${indent}${name}: {`)
    for (const [step, value] of sorted) {
      lines.push(`${indent}  ${step}: '${value}',`)
    }
    lines.push(`${indent}},`)
  }
  return lines.join('\n')
}

const tsContent = `/**
 * Primitive color scale — сгенерировано из src/skins/corporate/primitives.css.
 * Не редактировать вручную. После правок в primitives.css запусти: npm run gen:primitives
 */

export const colors = {
${stringifyObj(colors, '  ')}
} as const

/** Alpha-переменные для оверлеев (dark mode и т.д.) */
export const alpha = {
${stringifyObj(alpha, '  ')}
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
`

writeFileSync(outPath, tsContent, 'utf8')
console.log('Written:', outPath)
console.log(
  'Colors:',
  Object.keys(colors).length,
  'scales, Alpha:',
  Object.keys(alpha).length,
  'scales'
)
