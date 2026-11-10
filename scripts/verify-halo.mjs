/**
 * Проверка hover-ореола в живом Chromium против собранного dist/.
 * Берём реальный dist/skins/corporate.css и разметку по контракту кнопки (`vl-button` + data-атрибуты)
 * под скином corporate — ровно то, что получает потребитель.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = process.cwd()
// Резолвим playwright от package.json проекта
const { chromium } = createRequire(`${ROOT}/package.json`)('playwright')
const css = readFileSync(resolve(ROOT, 'dist/skins/corporate.css'), 'utf8')

const CASES = [
  { id: 'filled-primary', variant: 'filled', color: 'primary' },
  { id: 'stroke-primary', variant: 'stroke', color: 'primary' },
  { id: 'lighter-primary', variant: 'lighter', color: 'primary' },
  { id: 'ghost-primary', variant: 'ghost', color: 'primary' },
  { id: 'filled-neutral', variant: 'filled', color: 'neutral' },
  { id: 'ghost-neutral', variant: 'ghost', color: 'neutral' },
]

const html = `<!doctype html><html data-vl-skin="corporate" data-vl-scheme="light"><head><style>${css}</style>
<style>body{background:#f7f7f7;padding:40px;display:flex;gap:24px;flex-wrap:wrap}</style>
</head><body>
${CASES.map(
  (c) =>
    `<button id="${c.id}" class="vl-button" data-variant="${c.variant}" data-color="${c.color}" data-size="medium">${c.id}</button>`
).join('\n')}
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent(html)

const results = []
for (const c of CASES) {
  const el = page.locator(`#${c.id}`)
  await el.hover()
  await page.waitForTimeout(400) // дождаться конца перехода (in = 130ms)
  const shadow = await page.evaluate(
    (id) => getComputedStyle(document.getElementById(id), '::after').boxShadow,
    c.id
  )
  const opacity = await page.evaluate(
    (id) => getComputedStyle(document.getElementById(id), '::after').opacity,
    c.id
  )
  results.push({ ...c, shadow, opacity })
}

// Увести курсор и проверить, что ореол гаснет
await page.mouse.move(0, 0)
await page.waitForTimeout(500)
const offHover = await page.evaluate(
  (id) => getComputedStyle(document.getElementById(id), '::after').opacity,
  'filled-primary'
)

await browser.close()

console.log('\n=== computed ::after при наведении ===\n')
for (const r of results) {
  const ring = r.shadow.match(/0px 0px 0px (\d+px)/)
  console.log(`${r.id.padEnd(16)} opacity=${r.opacity}  кольцо=${ring ? ring[1] : '?'}`)
  console.log(`${''.padEnd(16)} ${r.shadow}`)
}
console.log(`\nпосле увода курсора filled-primary opacity = ${offHover} (ожидаем 0)`)

// Проверки
let failed = 0
const check = (name, cond, detail) => {
  console.log(`${cond ? 'OK  ' : 'FAIL'} ${name}${cond ? '' : ' — ' + detail}`)
  if (!cond) failed++
}

const byId = Object.fromEntries(results.map((r) => [r.id, r]))
check(
  'filled/primary — аура 3px',
  /0px 0px 0px 3px/.test(byId['filled-primary'].shadow),
  byId['filled-primary'].shadow
)
check(
  'filled/primary — есть свечение (вторая тень)',
  byId['filled-primary'].shadow.split(',').length > 1 ||
    /10px -3px/.test(byId['filled-primary'].shadow),
  'второй тени нет'
)
check(
  'lighter/primary — аура 3px',
  /0px 0px 0px 3px/.test(byId['lighter-primary'].shadow),
  byId['lighter-primary'].shadow
)
check(
  'stroke/primary — кромка 1px',
  /0px 0px 0px 1px/.test(byId['stroke-primary'].shadow),
  byId['stroke-primary'].shadow
)
check(
  'ghost/primary — кромка 1px',
  /0px 0px 0px 1px/.test(byId['ghost-primary'].shadow),
  byId['ghost-primary'].shadow
)
check(
  'filled/neutral — кромка 1px (исключение палитры)',
  /0px 0px 0px 1px/.test(byId['filled-neutral'].shadow),
  byId['filled-neutral'].shadow
)
check(
  'filled/neutral — кольцо не сливается с фоном #f7f7f7',
  !/247, 247, 247/.test(byId['filled-neutral'].shadow),
  byId['filled-neutral'].shadow
)
check('ореол виден при hover', byId['filled-primary'].opacity === '1', 'opacity != 1')
check('ореол гаснет после увода', offHover === '0', `opacity = ${offHover}`)

console.log(failed === 0 ? '\nВСЁ ПРОШЛО' : `\nПРОВАЛОВ: ${failed}`)
process.exit(failed === 0 ? 0 : 1)
