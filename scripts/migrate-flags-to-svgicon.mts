/**
 * Миграция флагов на SvgIcon.
 * Запуск: npx tsx scripts/migrate-flags-to-svgicon.mts
 */
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { readdir } from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const FLAGS_DIR = join(__dirname, '..', 'src', 'icons', 'flags')

const NEW_TEMPLATE = (
  componentName: string,
  svg: string,
  title: string
) => `import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg = ${JSON.stringify(svg)}

export function ${componentName}({ svg: _svg, title: _title, ...props }: ComponentProps<typeof SvgIcon>) {
  return <SvgIcon {...props} svg={svg} title="${title.replace(/"/g, '\\"')}" />
}
`

async function migrate() {
  const files = await readdir(FLAGS_DIR)
  const flagFiles = files.filter((f) => f.startsWith('Flag') && f.endsWith('.tsx'))

  let migrated = 0
  let errors = 0

  for (const file of flagFiles) {
    const path = join(FLAGS_DIR, file)
    const content = await readFile(path, 'utf-8')

    const componentMatch = content.match(/export function (Flag\w+)/)
    const svgMatch = content.match(/const svg = (.*)\n/)
    const titleMatch = content.match(/title = ['"]([^'"]*)['"]/)

    if (!componentMatch || !svgMatch || !titleMatch) {
      console.warn(`Skip ${file}: cannot parse`)
      errors++
      continue
    }

    const componentName = componentMatch[1]
    const title = titleMatch[1]

    let svgValue: string
    try {
      svgValue = new Function('return ' + svgMatch[1].trim().replace(/;$/, ''))()
    } catch {
      console.warn(`Skip ${file}: invalid svg`)
      errors++
      continue
    }

    const newContent = NEW_TEMPLATE(componentName, svgValue, title)
    await writeFile(path, newContent)
    migrated++
  }

  console.log(`Migrated ${migrated} flags, ${errors} errors`)
}

migrate().catch((e) => {
  console.error(e)
  process.exit(1)
})
