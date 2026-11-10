import type { CSSProperties } from 'react'
import { Button } from '@/components/Button'
import { ButtonGroup } from '@/components/ButtonGroup'
import { BUTTON_SIZE_OPTIONS } from '@/components/Button'

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

const stack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  alignItems: 'flex-start',
}

export function ButtonGroupDocsDemo() {
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 560 }}>
      <section style={{ marginBottom: 20 }}>
        <p style={label}>Stroke (default)</p>
        <ButtonGroup>
          <Button variant="stroke" color="neutral">
            Button
          </Button>
          <Button variant="stroke" color="neutral">
            Button
          </Button>
          <Button variant="stroke" color="neutral">
            Button
          </Button>
        </ButtonGroup>
      </section>
      <section style={{ marginBottom: 20 }}>
        <p style={label}>Filled primary</p>
        <ButtonGroup>
          <Button variant="filled" color="primary">
            Button
          </Button>
          <Button variant="filled" color="primary">
            Button
          </Button>
          <Button variant="filled" color="primary">
            Button
          </Button>
        </ButtonGroup>
      </section>
      <section>
        <p style={label}>Размеры (size на группе)</p>
        <div style={stack}>
          {BUTTON_SIZE_OPTIONS.map((size) => (
            <ButtonGroup key={size} size={size}>
              <Button variant="stroke" color="neutral">
                {size}
              </Button>
              <Button variant="stroke" color="neutral">
                Button
              </Button>
              <Button variant="stroke" color="neutral">
                Button
              </Button>
            </ButtonGroup>
          ))}
        </div>
      </section>
    </div>
  )
}
