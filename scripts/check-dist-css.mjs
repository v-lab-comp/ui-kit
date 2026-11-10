/**
 * Проверка собранного CSS перед публикацией.
 *
 * Ловит висячие `@import` в `dist/**\/*.css`: если импортируемого файла нет в пакете,
 * у потребителя падает и dev, и build (postcss-import → ENOENT). Именно так сломалась
 * 0.13.0 — `interactions.module.css` попадает в сборку только через `composes`, и его
 * `@import './tokens.css'` не заинлайнился, а всплыл в `dist/style.css`.
 *
 * Ни typecheck, ни lint, ни тесты, ни сам `vite build` этого не видят — проблема
 * проявляется только на стороне потребителя. Отсюда отдельная проверка в `postbuild`.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'

const DIST = resolve(process.cwd(), 'dist')

/** Рекурсивно собирает все .css в dist */
function collectCssFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...collectCssFiles(full))
    else if (entry.endsWith('.css')) out.push(full)
  }
  return out
}

if (!existsSync(DIST)) {
  console.error('check-dist-css: каталога dist нет — сначала запустите build')
  process.exit(1)
}

const IMPORT_RE = /@import\s*(?:url\()?\s*["']([^"']+)["']/g
const problems = []

for (const file of collectCssFiles(DIST)) {
  const css = readFileSync(file, 'utf8')
  for (const [, spec] of css.matchAll(IMPORT_RE)) {
    // Внешние ссылки (CDN, шрифты) оставляем как есть — они разрешаются в рантайме
    if (/^(https?:)?\/\//.test(spec)) continue
    const target = resolve(dirname(file), spec)
    if (!existsSync(target)) {
      problems.push({ file: file.slice(DIST.length + 1), spec })
    }
  }
}

/**
 * Вторая проверка: базовое правило ореола (`:is(…)` в `src/skins/corporate/halo.css`)
 * не должно объявлять `--halo-*`.
 *
 * Правило ореола и варианты (`[data-variant='filled']`, `'lighter'`) имеют равную специфичность
 * (0,1,0), а ореол попадает в собранный CSS сильно позже вариантов — при равной
 * специфичности она побеждает, и переменные вариантов молча теряются. Так сломалась
 * 0.13.1. Дефолты должны жить только в `var(…, fallback)` внутри `::after`.
 */
const HALO_BASE_RE = /:is\([^(){}]*\.vl-button[^(){}]*\)\{([^}]*)\}/g
let haloRules = 0

for (const file of collectCssFiles(DIST)) {
  const css = readFileSync(file, 'utf8')
  for (const [, body] of css.matchAll(HALO_BASE_RE)) {
    haloRules++
    const declared = [...body.matchAll(/(--halo-[a-z-]+)\s*:/g)].map((m) => m[1])
    if (declared.length > 0) {
      problems.push({
        file: file.slice(DIST.length + 1),
        halo: [...new Set(declared)].join(', '),
      })
    }
  }
}

if (haloRules === 0) {
  console.error(
    'check-dist-css: базовое правило ореола (:is(…, .vl-button, …)) в dist не найдено — проверка не сработала бы'
  )
  process.exit(1)
}

if (problems.some((p) => p.halo)) {
  console.error('\ncheck-dist-css: базовое правило ореола объявляет --halo-* переменные\n')
  for (const { file, halo } of problems.filter((p) => p.halo)) {
    console.error(`  dist/${file} → ${halo}`)
  }
  console.error(
    '\nПри равной специфичности (0,1,0) утилита идёт в бандле позже вариантов\n' +
      'и затирает их переменные — у filled/lighter пропадает аура (см. 0.13.1 → 0.13.2).\n' +
      'Дефолты задавайте фолбэком: var(--halo-ring-size, 1px) внутри ::after правила ореола.\n'
  )
  process.exit(1)
}

if (problems.length > 0) {
  console.error('\ncheck-dist-css: висячие @import в собранном CSS\n')
  for (const { file, spec } of problems) {
    console.error(`  dist/${file} → @import "${spec}" (файла в пакете нет)`)
  }
  console.error(
    '\nУ потребителя это ломает dev и build (ENOENT).\n' +
      'Обычная причина: `@import` в CSS скина, который Vite не инлайнит (например, `./tokens.css`\n' +
      'рядом с файлом). Уберите его: токены подключаются из src/skins/corporate/index.css.\n'
  )
  process.exit(1)
}

console.log('check-dist-css: висячих @import нет')
