import { useState } from 'react'
import type { CSSProperties } from 'react'
import {
  RiTableLine,
  RiNodeTree,
  RiLayoutGridLine,
  RiListCheck,
  RiBarChartLine,
} from '@remixicon/react'
import { SegmentedControl } from '@/components/SegmentedControl/SegmentedControl'

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

const section: CSSProperties = { marginBottom: 20 }
const stack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  alignItems: 'flex-start',
}

export function SegmentedControlDocsDemo() {
  const [view, setView] = useState('tree')
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <SegmentedControl value={view} onValueChange={setView}>
        <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
          Таблица
        </SegmentedControl.Item>
        <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
          Дерево
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  )
}

export function SegmentedControlGalleryDemo() {
  const [view, setView] = useState('list')

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 560 }}>
      <section style={section}>
        <p style={label}>Базовое использование</p>
        <SegmentedControl defaultValue="tree">
          <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
            Таблица
          </SegmentedControl.Item>
          <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
            Дерево
          </SegmentedControl.Item>
        </SegmentedControl>
      </section>

      <section style={section}>
        <p style={label}>Три опции</p>
        <SegmentedControl value={view} onValueChange={setView}>
          <SegmentedControl.Item value="grid" leftNode={<RiLayoutGridLine size={16} />}>
            Grid
          </SegmentedControl.Item>
          <SegmentedControl.Item value="list" leftNode={<RiListCheck size={16} />}>
            List
          </SegmentedControl.Item>
          <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />}>
            Chart
          </SegmentedControl.Item>
        </SegmentedControl>
      </section>

      <section style={section}>
        <p style={label}>Только иконки</p>
        <SegmentedControl defaultValue="grid">
          <SegmentedControl.Item value="grid" leftNode={<RiLayoutGridLine size={16} />} />
          <SegmentedControl.Item value="list" leftNode={<RiListCheck size={16} />} />
          <SegmentedControl.Item value="chart" leftNode={<RiBarChartLine size={16} />} />
        </SegmentedControl>
      </section>

      <section style={section}>
        <p style={label}>Размеры</p>
        <div style={stack}>
          {(['medium', 'small', 'x-small'] as const).map((s) => (
            <SegmentedControl key={s} defaultValue="table" size={s}>
              <SegmentedControl.Item value="table" leftNode={<RiTableLine size={14} />}>
                Таблица
              </SegmentedControl.Item>
              <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={14} />}>
                Дерево
              </SegmentedControl.Item>
            </SegmentedControl>
          ))}
        </div>
      </section>

      <section>
        <p style={label}>Disabled</p>
        <SegmentedControl defaultValue="table" disabled>
          <SegmentedControl.Item value="table" leftNode={<RiTableLine size={16} />}>
            Таблица
          </SegmentedControl.Item>
          <SegmentedControl.Item value="tree" leftNode={<RiNodeTree size={16} />}>
            Дерево
          </SegmentedControl.Item>
        </SegmentedControl>
      </section>
    </div>
  )
}
