import type { CSSProperties } from 'react'
import { Tooltip } from '@/components/overlays/Tooltip'

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

const trigger: CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: '1px solid var(--stroke-sub-300)',
  background: 'var(--bg-white-0)',
  color: 'var(--text-strong-950)',
  cursor: 'default',
  fontSize: 14,
}

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gap: '48px 64px',
  padding: '24px 8px',
  justifyContent: 'start',
}

export function TooltipDocsDemo() {
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <section style={{ marginBottom: 28 }}>
        <p style={label}>По умолчанию (placement: top)</p>
        <div style={{ padding: '8px 0' }}>
          <Tooltip content="Подсказка при наведении">
            <button type="button" style={trigger}>
              Наведите курсор
            </button>
          </Tooltip>
        </div>
      </section>
      <section>
        <p style={label}>Разные стороны</p>
        <div style={grid}>
          {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
            <Tooltip key={placement} content={`Tooltip — ${placement}`} placement={placement}>
              <button type="button" style={trigger}>
                {placement}
              </button>
            </Tooltip>
          ))}
        </div>
      </section>
    </div>
  )
}
