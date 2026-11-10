import { colors } from '@/colors/primitives'

/** Шаги шкалы от тёмного к светлому для отображения */
const SCALE_ORDER = [
  '950',
  '900',
  '800',
  '700',
  '600',
  '500',
  '400',
  '300',
  '200',
  '100',
  '50',
  '0',
] as const
const DARK_STEPS = new Set(['400', '500', '600', '700', '800', '900', '950'])

/** Человекочитаемые названия палитр */
const PALETTE_NAMES: Record<string, string> = {
  slate: 'Slate',
  blue: 'Blue',
  orange: 'Orange',
  red: 'Red',
  green: 'Green',
  yellow: 'Yellow',
  purple: 'Purple',
  sky: 'Sky',
  pink: 'Pink',
  teal: 'Teal',
  neutral: 'Neutral / Gray',
}

function getSteps(scale: Record<string, string>): string[] {
  return SCALE_ORDER.filter((step) => step in scale)
}

function isDark(step: string): boolean {
  return DARK_STEPS.has(step)
}

interface SwatchProps {
  step: string
  hex: string
  displayName: string
}

const SWATCH_WIDTH = 290
const SWATCH_HEIGHT = 180

function Swatch({ step, hex, displayName }: SwatchProps) {
  const dark = isDark(step)
  return (
    <div
      style={{
        width: SWATCH_WIDTH,
        height: SWATCH_HEIGHT,
        borderRadius: '16px',
        border: step === '0' ? '1px solid #E5E5E5' : '1px solid rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '24px',
        backgroundColor: hex,
        color: dark ? '#FFFFFF' : '#171717',
        textShadow: dark ? '0 1px 2px rgba(0,0,0,0.25)' : 'none',
        textAlign: 'left',
        lineHeight: 1.4,
        boxSizing: 'border-box',
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}>
        {displayName} [{step}]
      </span>
      <span
        style={{
          fontSize: '13px',
          fontWeight: 500,
          marginTop: '6px',
          opacity: dark ? 0.92 : 0.8,
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {hex}
      </span>
    </div>
  )
}

interface PaletteSectionProps {
  colorKey: string
  scale: Record<string, string>
}

function PaletteSection({ colorKey, scale }: PaletteSectionProps) {
  const steps = getSteps(scale)
  const displayName = PALETTE_NAMES[colorKey] ?? colorKey
  return (
    <section
      style={{
        marginBottom: '40px',
      }}
    >
      <h2
        style={{
          margin: '0 0 8px 0',
          fontSize: '22px',
          fontWeight: 700,
          color: '#171717',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}
      >
        {displayName}
      </h2>
      <p
        style={{
          margin: '0 0 24px 0',
          fontSize: '14px',
          color: '#5C5C5C',
          lineHeight: 1.5,
        }}
      >
        Primitive scale: <code style={{ fontSize: '13px' }}>{colorKey}-0</code> …{' '}
        <code style={{ fontSize: '13px' }}>{colorKey}-950</code>. Use via semantic tokens in
        components.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, ${SWATCH_WIDTH}px)`,
          justifyContent: 'start',
          gap: '16px',
          paddingTop: '20px',
          borderTop: '1px solid #EBEBEB',
        }}
      >
        {steps.map((step) => (
          <Swatch
            key={step}
            step={step}
            hex={(scale as Record<string, string>)[step] ?? ''}
            displayName={displayName}
          />
        ))}
      </div>
    </section>
  )
}

/** Порядок палитр: neutral первым, остальные как в primitives */
const PALETTE_ORDER = [
  'neutral',
  'slate',
  'blue',
  'orange',
  'red',
  'green',
  'yellow',
  'purple',
  'sky',
  'pink',
  'teal',
]

export function ColorsPage() {
  const palettes = PALETTE_ORDER.map(
    (key) => [key, colors[key as keyof typeof colors]] as const
  ).filter(([, scale]) => scale != null)
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        padding: '40px 24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: 700,
            color: '#171717',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Primitives
        </h1>
        <p
          style={{
            margin: '0 0 32px 0',
            fontSize: '14px',
            color: '#5C5C5C',
            lineHeight: 1.5,
          }}
        >
          All color scales from <code>src/colors/primitives.ts</code>. Only{' '}
          <strong>color + step</strong> — use semantic tokens in UI.
        </p>
        {palettes.map(([colorKey, scale]) => (
          <PaletteSection
            key={colorKey}
            colorKey={colorKey}
            scale={scale as Record<string, string>}
          />
        ))}
      </div>
    </div>
  )
}
