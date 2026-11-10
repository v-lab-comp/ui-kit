/**
 * Скачивает флаги из Figma и генерирует React-компоненты.
 *
 * Требуется FIGMA_ACCESS_TOKEN (Personal Access Token из Figma → Settings → Account).
 *
 * Запуск: FIGMA_ACCESS_TOKEN=xxx npx tsx scripts/fetch-flags-from-figma.mts
 */
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const FLAGS_OUT = join(ROOT, 'src/icons/flags')

const FIGMA_FILE_KEY = 'DQ1EGa4WVyTvN6ZGZ4ooHg'

// nodeId -> name (из Figma Country Flags section)
const FIGMA_FLAGS: Array<{ nodeId: string; name: string }> = [
  { nodeId: '253:4773', name: 'Paraguay' },
  { nodeId: '253:4779', name: 'Senegal' },
  { nodeId: '253:4785', name: 'Democratic Republic of Congo' },
  { nodeId: '253:4792', name: 'Estonia' },
  { nodeId: '253:4796', name: 'Georgia' },
  { nodeId: '253:4804', name: 'Ghana' },
  { nodeId: '253:4809', name: 'Jersey' },
  { nodeId: '253:4814', name: 'Madagascar' },
  { nodeId: '253:4818', name: 'Malawi' },
  { nodeId: '253:4823', name: 'Mongolia' },
  { nodeId: '253:4836', name: 'China' },
  { nodeId: '253:4844', name: 'Nepal' },
  { nodeId: '253:4854', name: 'Samoa' },
  { nodeId: '253:4863', name: 'Haiti' },
  { nodeId: '253:4872', name: 'Isle of Man' },
  { nodeId: '253:4875', name: 'Ivory Coast' },
  { nodeId: '253:4879', name: 'Lesotho' },
  { nodeId: '253:4884', name: 'Rwanda' },
  { nodeId: '253:4889', name: 'Zimbabwe' },
  { nodeId: '253:4903', name: 'Equatorial Guinea' },
  { nodeId: '253:4911', name: 'Republic of The Congo' },
  { nodeId: '253:4915', name: 'Brazil' },
  { nodeId: '253:4922', name: 'Sri Lanka' },
  { nodeId: '253:4929', name: 'Swaziland' },
  { nodeId: '253:4944', name: 'Tajikistan' },
  { nodeId: '253:4957', name: 'Trinidad and Tobago' },
  { nodeId: '253:4963', name: 'French Polynesia' },
  { nodeId: '253:4974', name: 'Madeira' },
  { nodeId: '253:4981', name: 'Maldives' },
  { nodeId: '253:4985', name: 'Moldova' },
  { nodeId: '253:4992', name: 'Montenegro' },
  { nodeId: '253:5000', name: 'Papua New Guinea' },
  { nodeId: '253:5010', name: 'Mexico' },
  { nodeId: '253:5017', name: 'Tibet' },
  { nodeId: '253:5033', name: 'East Timor' },
  { nodeId: '253:5038', name: 'Libya' },
  { nodeId: '253:5045', name: 'Nato' },
  { nodeId: '253:5058', name: 'Republic of Macedonia' },
  { nodeId: '253:5071', name: 'Sahrawi Arab Democratic Republic' },
  { nodeId: '253:5079', name: 'Sudan' },
  { nodeId: '253:5084', name: 'Uzbekistan' },
  { nodeId: '253:5105', name: 'Yemen' },
  { nodeId: '253:5109', name: 'Liberia' },
  { nodeId: '253:5126', name: 'Russia' },
  { nodeId: '253:5130', name: 'Liechtenstein' },
  { nodeId: '253:5134', name: 'Northern Cyprus' },
  { nodeId: '253:5141', name: 'San Marino' },
  { nodeId: '253:5149', name: 'St. Barts' },
  { nodeId: '253:5158', name: 'Curacao' },
  { nodeId: '253:5166', name: 'Djibouti' },
  { nodeId: '253:5171', name: 'Eritrea' },
  { nodeId: '253:5176', name: 'Guinea Bissau' },
  { nodeId: '253:5183', name: 'Kyrgyzstan' },
  { nodeId: '253:5192', name: 'Mali' },
  { nodeId: '253:5196', name: 'India' },
  { nodeId: '253:5203', name: 'Marshall Island' },
  { nodeId: '253:5208', name: 'Micronesia' },
  { nodeId: '253:5215', name: 'Niger' },
  { nodeId: '253:5221', name: 'Norfolk Island' },
  { nodeId: '253:5227', name: 'Sao Tome and Prince' },
  { nodeId: '253:5235', name: 'Sardinia' },
  { nodeId: '253:5250', name: 'Bhutan' },
  { nodeId: '253:5255', name: 'Somalia' },
  { nodeId: '253:5258', name: 'Suriname' },
  { nodeId: '253:5265', name: 'Azores Islands' },
  { nodeId: '253:5279', name: 'Canada' },
  { nodeId: '253:5285', name: 'Bahamas' },
  { nodeId: '253:5291', name: 'Togo' },
  { nodeId: '253:5299', name: 'Turkmenistan' },
  { nodeId: '253:5327', name: 'Tuvalu' },
  { nodeId: '253:5349', name: 'Vatican City' },
  { nodeId: '253:5354', name: 'Austria' },
  { nodeId: '253:5359', name: 'Virgin Islands' },
  { nodeId: '253:5372', name: 'Falkland Islands' },
  { nodeId: '253:5386', name: 'Gabon' },
  { nodeId: '253:5390', name: 'Gibraltar' },
  { nodeId: '253:5396', name: 'Netherlands' },
  { nodeId: '253:5400', name: 'Greenland' },
  { nodeId: '253:5405', name: 'Grenada' },
  { nodeId: '253:5428', name: 'Guam' },
  { nodeId: '253:5439', name: 'Guernsey' },
  { nodeId: '253:5443', name: 'Guyana' },
  { nodeId: '253:5450', name: 'Kiribati' },
  { nodeId: '253:5461', name: 'Kuwait' },
  { nodeId: '253:5466', name: 'Mauritania' },
  { nodeId: '253:5471', name: 'Melilla' },
  { nodeId: '253:5490', name: 'Montserrat' },
  { nodeId: '253:5502', name: 'Thailand' },
  { nodeId: '253:5508', name: 'Nauru' },
  { nodeId: '253:5515', name: 'Northern Marianas Islands' },
  { nodeId: '253:5521', name: 'Ossetia' },
  { nodeId: '253:5525', name: 'Palestine' },
  { nodeId: '253:5530', name: 'Pitcairn Islands' },
  { nodeId: '253:5543', name: 'Saba Island' },
  { nodeId: '253:5552', name: 'Saint Kitts and Nevis' },
  { nodeId: '253:5560', name: 'Sint Eustatius' },
  { nodeId: '253:5575', name: 'Sint Maarten' },
  { nodeId: '253:5585', name: 'Portugal' },
  { nodeId: '253:5591', name: 'Solomon Islands' },
  { nodeId: '253:5601', name: 'Somaliland' },
  { nodeId: '253:5612', name: 'South Sudan' },
  { nodeId: '253:5619', name: 'St. Vincent and The Grenadines' },
  { nodeId: '253:5627', name: 'Gambia' },
  { nodeId: '253:5632', name: 'Tokelau' },
  { nodeId: '253:5640', name: 'Transnistria' },
  { nodeId: '253:5645', name: 'Turks and Caicos' },
  { nodeId: '253:5659', name: 'Orkney Islands' },
  { nodeId: '253:5667', name: 'Guinea' },
  { nodeId: '253:5671', name: 'Vietnam' },
  { nodeId: '253:5674', name: 'United Kingdom' },
  { nodeId: '253:5691', name: 'Kosovo' },
  { nodeId: '253:5701', name: 'Seychelles' },
  { nodeId: '253:5707', name: 'Sierra Leone' },
  { nodeId: '253:5711', name: 'Vanuatu' },
  { nodeId: '253:5737', name: 'Dominica' },
  { nodeId: '253:5767', name: 'Faroe Islands' },
  { nodeId: '253:5771', name: 'Fiji' },
  { nodeId: '253:5785', name: 'Macao' },
  { nodeId: '253:5797', name: 'Niue' },
  { nodeId: '253:5814', name: 'Palau' },
  { nodeId: '253:5817', name: 'England' },
  { nodeId: '253:5820', name: 'Rapa Nui' },
  { nodeId: '253:5823', name: 'St. Lucia' },
  { nodeId: '253:5828', name: 'Tonga' },
  { nodeId: '253:5833', name: 'Martinique' },
  { nodeId: '253:5845', name: 'Galapagos Islands' },
  { nodeId: '253:5849', name: 'Bulgaria' },
  { nodeId: '253:5853', name: 'Croatia' },
  { nodeId: '253:5878', name: 'Bolivia' },
  { nodeId: '253:5882', name: 'Cambodia' },
  { nodeId: '253:5888', name: 'Costa Rica' },
  { nodeId: '253:5894', name: 'Singapore' },
  { nodeId: '253:5904', name: 'Cuba' },
  { nodeId: '253:5913', name: 'Bangladesh' },
  { nodeId: '253:5916', name: 'Botswana' },
  { nodeId: '253:5922', name: 'Algeria' },
  { nodeId: '253:5928', name: 'Azerbaijan' },
  { nodeId: '253:5935', name: 'Angola' },
  { nodeId: '253:5942', name: 'British Columbia' },
  { nodeId: '253:5971', name: 'Afghanistan' },
  { nodeId: '253:5978', name: 'Armenia' },
  { nodeId: '253:5982', name: 'Basque Country' },
  { nodeId: '253:5995', name: 'Australia' },
  { nodeId: '253:6011', name: 'Burkina Faso' },
  { nodeId: '253:6015', name: 'Albania' },
  { nodeId: '253:6018', name: 'Bahrain' },
  { nodeId: '253:6021', name: 'Belize' },
  { nodeId: '253:6031', name: 'Bermuda' },
  { nodeId: '253:6047', name: 'Bosnia and Herzegovina' },
  { nodeId: '253:6053', name: 'British Virgin Islands' },
  { nodeId: '253:6075', name: 'Barbados' },
  { nodeId: '253:6081', name: 'Belarus' },
  { nodeId: '253:6092', name: 'Bonaire' },
  { nodeId: '253:6098', name: 'Turkey' },
  { nodeId: '253:6103', name: 'Brunei' },
  { nodeId: '253:6116', name: 'Cameroon' },
  { nodeId: '253:6121', name: 'Aland Islands' },
  { nodeId: '253:6129', name: 'Antigua and Barbuda' },
  { nodeId: '253:6137', name: 'Burundi' },
  { nodeId: '253:6150', name: 'Andorra' },
  { nodeId: '253:6158', name: 'Balearic Islands' },
  { nodeId: '253:6167', name: 'Abkhazia' },
  { nodeId: '253:6184', name: 'Aruba' },
  { nodeId: '253:6192', name: 'Benin' },
  { nodeId: '253:6196', name: 'Poland' },
  { nodeId: '253:6199', name: 'Cape Verde' },
  { nodeId: '253:6216', name: 'Chad' },
  { nodeId: '253:6224', name: 'British Indian Ocean Territory' },
  { nodeId: '253:6253', name: 'Cayman Islands' },
  { nodeId: '253:6272', name: 'Central African Republic' },
  { nodeId: '253:6287', name: 'Comoros' },
  { nodeId: '253:6299', name: 'Canary Islands' },
  { nodeId: '253:6303', name: 'Corsica' },
  { nodeId: '253:6307', name: 'Anguilla' },
  { nodeId: '253:6322', name: 'Switzerland' },
  { nodeId: '253:6325', name: 'American Samoa' },
  { nodeId: '253:6333', name: 'Ceuta' },
  { nodeId: '253:6356', name: 'Christmas Island' },
  { nodeId: '253:6368', name: 'Cocos Island' },
  { nodeId: '253:6380', name: 'Cook Islands' },
  { nodeId: '253:6398', name: 'Morocco' },
  { nodeId: '253:6401', name: 'Taiwan' },
  { nodeId: '253:6407', name: 'Egypt' },
  { nodeId: '253:6412', name: 'Indonesia' },
  { nodeId: '253:6415', name: 'United States' },
  { nodeId: '253:6423', name: 'Philippines' },
  { nodeId: '253:6432', name: 'South Africa' },
  { nodeId: '253:6439', name: 'Peru' },
  { nodeId: '253:6444', name: 'Sweden' },
  { nodeId: '253:6451', name: 'Denmark' },
  { nodeId: '253:6458', name: 'Greece' },
  { nodeId: '253:6466', name: 'Ireland' },
  { nodeId: '253:6470', name: 'Laos' },
  { nodeId: '253:6476', name: 'United Arab Emirates' },
  { nodeId: '253:6481', name: 'Hong Kong' },
  { nodeId: '253:6489', name: 'France' },
  { nodeId: '253:6493', name: 'Ukraine' },
  { nodeId: '253:6496', name: 'Argentina' },
  { nodeId: '253:6502', name: 'Iran' },
  { nodeId: '253:6507', name: 'Colombia' },
  { nodeId: '253:6511', name: 'Czech Republic' },
  { nodeId: '253:6515', name: 'Israel' },
  { nodeId: '253:6521', name: 'Saudi Arabia' },
  { nodeId: '253:6530', name: 'Norway' },
  { nodeId: '253:6538', name: 'Venezuela' },
  { nodeId: '253:6551', name: 'Malaysia' },
  { nodeId: '253:6562', name: 'Germany' },
  { nodeId: '253:6566', name: 'Belgium' },
  { nodeId: '253:6570', name: 'Hungary' },
  { nodeId: '253:6574', name: 'Finland' },
  { nodeId: '253:6577', name: 'Chile' },
  { nodeId: '253:6582', name: 'Romania' },
  { nodeId: '253:6586', name: 'Ecuador' },
  { nodeId: '253:6593', name: 'New Zealand' },
  { nodeId: '253:6606', name: 'Panama' },
  { nodeId: '253:6612', name: 'United Nations' },
  { nodeId: '253:6617', name: 'Slovakia' },
  { nodeId: '253:6625', name: 'South Korea' },
  { nodeId: '253:6647', name: 'Monaco' },
  { nodeId: '253:6650', name: 'Jordan' },
  { nodeId: '253:6656', name: 'Iceland' },
  { nodeId: '253:6664', name: 'Guatemala' },
  { nodeId: '253:6671', name: 'Syria' },
  { nodeId: '253:6678', name: 'Uruguay' },
  { nodeId: '253:6688', name: 'North Korea' },
  { nodeId: '253:6696', name: 'Scotland' },
  { nodeId: '253:6703', name: 'Serbia' },
  { nodeId: '253:6713', name: 'Kazakhstan' },
  { nodeId: '253:6718', name: 'Spain' },
  { nodeId: '253:6723', name: 'Latvia' },
  { nodeId: '253:6728', name: 'Pakistan' },
  { nodeId: '253:6736', name: 'Cyprus' },
  { nodeId: '253:6740', name: 'Kenya' },
  { nodeId: '253:6753', name: 'Myanmar' },
  { nodeId: '253:6758', name: 'Honduras' },
  { nodeId: '253:6768', name: 'Jamaica' },
  { nodeId: '253:6774', name: 'Lithuania' },
  { nodeId: '253:6778', name: 'Hawaii' },
  { nodeId: '253:6786', name: 'Luxembourg' },
  { nodeId: '253:6790', name: 'Japan' },
  { nodeId: '253:6793', name: 'Mauritius' },
  { nodeId: '253:6798', name: 'Namibia' },
  { nodeId: '253:6804', name: 'Qatar' },
  { nodeId: '253:6807', name: 'Dominican Republic' },
  { nodeId: '253:6816', name: 'Wales' },
  { nodeId: '253:6820', name: 'Zambia' },
  { nodeId: '253:6826', name: 'El Salvador' },
  { nodeId: '253:6834', name: 'Nicaragua' },
  { nodeId: '253:6843', name: 'Tunisia' },
  { nodeId: '253:6849', name: 'Malta' },
  { nodeId: '253:6853', name: 'European Union' },
  { nodeId: '253:6864', name: 'Nigeria' },
  { nodeId: '253:6869', name: 'Uganda' },
  { nodeId: '253:6877', name: 'Lebanon' },
  { nodeId: '253:6883', name: 'Iraq' },
  { nodeId: '253:6891', name: 'Mozambique' },
  { nodeId: '253:6900', name: 'Puerto Rico' },
  { nodeId: '253:6908', name: 'Slovenia' },
  { nodeId: '253:6913', name: 'Tanzania' },
  { nodeId: '253:6918', name: 'Oman' },
  { nodeId: '253:6926', name: 'Ethiopia' },
  { nodeId: '253:6934', name: 'Italy' },
]

function toComponentName(name: string): string {
  return 'Flag' + name.replace(/[^a-zA-Z0-9]/g, '').replace(/\s+/g, '')
}

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN
  if (!token) {
    console.error('Ошибка: задайте FIGMA_ACCESS_TOKEN')
    console.error('Получить: Figma → Settings → Account → Personal access tokens')
    process.exit(1)
  }

  await mkdir(FLAGS_OUT, { recursive: true })

  const BATCH_SIZE = 50
  const svgByNodeId: Record<string, string> = {}

  for (let i = 0; i < FIGMA_FLAGS.length; i += BATCH_SIZE) {
    const batch = FIGMA_FLAGS.slice(i, i + BATCH_SIZE)
    const ids = batch.map((f) => f.nodeId).join(',')
    const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg`

    const res = await fetch(url, {
      headers: { 'X-Figma-Token': token },
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Figma API error ${res.status}: ${text}`)
    }

    const data = (await res.json()) as { images?: Record<string, string>; err?: string }
    if (data.err) throw new Error(`Figma API: ${data.err}`)
    if (!data.images) throw new Error('No images in response')

    for (const [nodeId, imageUrl] of Object.entries(data.images)) {
      if (!imageUrl) continue
      const svgRes = await fetch(imageUrl)
      if (!svgRes.ok) throw new Error(`Failed to fetch SVG for ${nodeId}: ${svgRes.status}`)
      svgByNodeId[nodeId] = await svgRes.text()
    }

    console.log(
      `Fetched batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(FIGMA_FLAGS.length / BATCH_SIZE)}`
    )
  }

  const exports: string[] = []
  const flagEntries: string[] = []
  const flagCodes: string[] = []
  const seen = new Set<string>()

  for (const { nodeId, name } of FIGMA_FLAGS) {
    const componentName = toComponentName(name)
    if (seen.has(componentName)) continue
    seen.add(componentName)
    const svg = svgByNodeId[nodeId]
    if (!svg) {
      console.warn(`No SVG for ${name} (${nodeId})`)
      continue
    }

    const component = `import type { ComponentProps } from 'react'
import { SvgIcon } from '../SvgIcon'

const svg = ${JSON.stringify(svg)}

export function ${componentName}(props: Omit<ComponentProps<typeof SvgIcon>, 'svg' | 'title'>) {
  return <SvgIcon {...props} svg={svg} title="${name.replace(/"/g, '\\"')}" />
}
`

    const outPath = join(FLAGS_OUT, `${componentName}.tsx`)
    await writeFile(outPath, component)
    exports.push(`export { ${componentName} } from './${componentName}'`)
    flagEntries.push(`  '${componentName}': '${name.replace(/'/g, "\\'")}'`)
    flagCodes.push(`'${componentName}'`)
  }

  const indexContent = `/**
 * Флаги стран из Figma (Design System).
 * Источник: Figma — Country Flags
 *
 * @example
 * import { FlagUS, FlagRU, FlagUZ } from '@/icons/flags'
 * <FlagUS size={24} title="United States" />
 */

${exports.join('\n')}

export { FLAG_CODES, FLAG_TITLES } from './manifest'
export type { FlagCode } from './manifest'
`

  // Списки кодов и названий — в лёгком manifest.ts без импорта компонентов (его грузит галерея),
  // index.ts только реэкспортирует их, чтобы данные не дублировались.
  const manifestContent = `/**
 * Манифест флагов — лёгкий файл без импорта компонентов.
 * Используется галереей для отложенной загрузки.
 */

export const FLAG_CODES = [${flagCodes.join(', ')}] as const
export type FlagCode = (typeof FLAG_CODES)[number]

export const FLAG_TITLES: Record<string, string> = {
${flagEntries.join(',\n')}
}
`

  await writeFile(join(FLAGS_OUT, 'index.ts'), indexContent)
  await writeFile(join(FLAGS_OUT, 'manifest.ts'), manifestContent)

  console.log(`Done: ${FIGMA_FLAGS.length} flags from Figma → src/icons/flags/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
