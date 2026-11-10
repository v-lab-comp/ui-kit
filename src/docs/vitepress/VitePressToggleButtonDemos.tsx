import { useState } from 'react'
import type { CSSProperties } from 'react'
import {
  RiFilter3Line,
  RiLayoutGridLine,
  RiListCheck,
  RiBold,
  RiItalic,
  RiUnderline,
} from '@remixicon/react'
import { ToggleButton } from '@/components/ToggleButton/ToggleButton'
import { ToggleGroup } from '@/components/ToggleButton/ToggleGroup'

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

const section: CSSProperties = {
  marginBottom: 20,
}

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'wrap',
}

export function ToggleButtonDocsDemo() {
  const [pressed, setPressed] = useState(false)
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 560 }}>
      <ToggleButton
        pressed={pressed}
        onPressedChange={setPressed}
        size="small"
        leftNode={<RiFilter3Line size={16} />}
      >
        Фильтры
      </ToggleButton>
    </div>
  )
}

export function ToggleButtonGalleryDemo() {
  const [view, setView] = useState<string | undefined>('grid')
  const [formats, setFormats] = useState<string[]>(['bold'])

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 560 }}>
      <section style={section}>
        <p style={label}>Одиночный (on / off)</p>
        <div style={row}>
          <ToggleButton size="small" leftNode={<RiFilter3Line size={16} />}>
            Фильтры (off)
          </ToggleButton>
          <ToggleButton size="small" defaultPressed leftNode={<RiFilter3Line size={16} />}>
            Фильтры (on)
          </ToggleButton>
        </div>
      </section>

      <section style={section}>
        <p style={label}>ToggleGroup — single (radio-переключатель)</p>
        <ToggleGroup type="single" value={view} onValueChange={setView} size="small">
          <ToggleButton value="grid" leftNode={<RiLayoutGridLine size={16} />}>
            Grid
          </ToggleButton>
          <ToggleButton value="list" leftNode={<RiListCheck size={16} />}>
            List
          </ToggleButton>
        </ToggleGroup>
      </section>

      <section style={section}>
        <p style={label}>ToggleGroup — multiple (форматирование)</p>
        <ToggleGroup type="multiple" value={formats} onValueChange={setFormats} size="small">
          <ToggleButton value="bold" aria-label="Жирный" leftNode={<RiBold size={16} />} />
          <ToggleButton value="italic" aria-label="Курсив" leftNode={<RiItalic size={16} />} />
          <ToggleButton
            value="underline"
            aria-label="Подчёркнутый"
            leftNode={<RiUnderline size={16} />}
          />
        </ToggleGroup>
      </section>

      <section style={section}>
        <p style={label}>Размеры</p>
        <div style={row}>
          {(['medium', 'small', 'x-small', '2x-small'] as const).map((s) => (
            <ToggleButton key={s} size={s}>
              {s}
            </ToggleButton>
          ))}
        </div>
      </section>

      <section>
        <p style={label}>Disabled</p>
        <div style={row}>
          <ToggleButton size="small" disabled leftNode={<RiFilter3Line size={16} />}>
            Отключён
          </ToggleButton>
          <ToggleButton size="small" disabled defaultPressed leftNode={<RiFilter3Line size={16} />}>
            Отключён (on)
          </ToggleButton>
        </div>
      </section>
    </div>
  )
}
