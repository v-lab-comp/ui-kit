import type { CSSProperties } from 'react'
import { Badge } from '@/components/Badge'
import { BADGE_COLOR_OPTIONS, BADGE_VARIANT_OPTIONS } from '@/components/Badge/Badge.types'

const section: CSSProperties = {
  marginBottom: 20,
}

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

export function BadgeDocsDemo() {
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 560 }}>
      <section style={section}>
        <p style={label}>Варианты (filled, primary)</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {BADGE_VARIANT_OPTIONS.map((variant) => (
            <Badge key={variant} variant={variant} color="primary">
              {variant}
            </Badge>
          ))}
        </div>
      </section>
      <section style={section}>
        <p style={label}>Цвета (filled)</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {BADGE_COLOR_OPTIONS.map((color) => (
            <Badge key={color} variant="filled" color={color}>
              {color}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  )
}
