import { useState, type ChangeEvent } from 'react'
import { SelectInput, TextInput } from '@/components/inputs'

const COUNTRY_OPTIONS = [
  { value: 'uz', label: 'Узбекистан' },
  { value: 'kz', label: 'Казахстан' },
]

/** Единое превью: TextInput + SelectInput (full / compact) с completed / completedColor */
export function InputCompletedDocsDemo() {
  const [selFull, setSelFull] = useState('uz')
  const [selCompact, setSelCompact] = useState('uz')

  return (
    <div
      style={{
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingBottom: 240,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <TextInput
        label="Шаг выполнен (primary)"
        completed
        defaultValue="Значение заполнено"
        readOnly
        hint="Только **`completed`** — рамка **`--primary-base`**."
      />
      <TextInput
        label="Свой цвет рамки"
        completed
        completedColor="success"
        defaultValue="Успех"
        readOnly
        hint="Коротко: **`success`**, **`error`**, **`warning`**… или **`var(--success-base)`**, hex."
      />
      <SelectInput
        label="Select full + completed"
        completed
        placeholder="Страна…"
        options={COUNTRY_OPTIONS}
        value={selFull}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelFull(e.target.value)}
        hint="Те же пропы, что у **InputField**."
      />
      <SelectInput
        variant="compact"
        completed
        completedColor="var(--orange-500)"
        options={COUNTRY_OPTIONS}
        value={selCompact}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelCompact(e.target.value)}
        triggerAriaLabel="Регион (compact)"
      />
    </div>
  )
}
