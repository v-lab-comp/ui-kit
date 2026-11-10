import type { CSSProperties } from 'react'
import { RiAddLine } from '@remixicon/react'
import { Button } from '@/components/Button'

const row: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  alignItems: 'center',
}

/** Верхнее превью — коротко, как блок «Пример» в доке */
export function ButtonDocsDemo() {
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', maxWidth: 480 }}>
      <div style={row}>
        <Button variant="filled" color="primary">
          Сохранить
        </Button>
        <Button variant="stroke" color="neutral" leftNode={<RiAddLine size={16} />}>
          Добавить
        </Button>
        <Button variant="ghost" disabled>
          Отмена
        </Button>
      </div>
    </div>
  )
}
