import { useState } from 'react'
import { TextInput } from '@/components/inputs'

export function TextInputDocsDemo() {
  const [value, setValue] = useState('')

  return (
    <div style={{ width: 320, fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      <TextInput
        label="Название"
        placeholder="Введите текст…"
        hint="Стандартное однострочное поле на базе InputField + BaseInput."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
