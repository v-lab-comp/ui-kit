import type { CSSProperties } from 'react'
import { useState } from 'react'
import { RichInput } from '@/components/inputs'

const section: CSSProperties = {
  marginBottom: 24,
}

const title: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

const wrap: CSSProperties = {
  maxWidth: 520,
  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
}

export function RichInputDocsDemo() {
  const [description, setDescription] = useState('')
  const [note, setNote] = useState('')

  return (
    <div style={wrap}>
      <section style={section}>
        <p style={title}>Поле формы</p>
        <RichInput
          label="Описание"
          required
          placeholder="Опишите задачу…"
          hint="Жирный / курсив / списки — в тулбаре."
          value={description}
          onChange={setDescription}
        />
      </section>

      <section style={section}>
        <p style={title}>Лимит длины и компактный набор инструментов</p>
        <RichInput
          label="Заметка"
          size="small"
          placeholder="Коротко…"
          tools={['bold', 'italic', 'clear']}
          toolbarPlacement="bottom"
          minRows={2}
          maxRows={4}
          maxLength={140}
          value={note}
          onChange={setNote}
        />
      </section>

      <section style={section}>
        <p style={title}>Только чтение</p>
        <RichInput
          label="Условия"
          readOnly
          defaultValue="<b>Важно:</b><ul><li>Оплата в течение 5 дней</li><li>Возврат — 14 дней</li></ul>"
        />
      </section>
    </div>
  )
}
