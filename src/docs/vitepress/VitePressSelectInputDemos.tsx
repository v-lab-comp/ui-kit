import { useState } from 'react'
import { SelectInput } from '@/components/inputs'
import type { SelectOptionGroup } from '@/components/inputs'

const OPTIONS = [
  { value: 'uz', label: 'Узбекистан' },
  { value: 'kz', label: 'Казахстан' },
  { value: 'kg', label: 'Кыргызстан' },
  { value: 'tj', label: 'Таджикистан' },
]

const MULTI_FIELD_OPTIONS = [
  { value: 'docDate', label: 'Дата документа', description: 'Входящий' },
  { value: 'correspondent', label: 'Корреспондент', description: 'Входящий' },
  { value: 'delivery', label: 'Вид доставки', description: 'Входящий' },
  { value: 'incomingNo', label: 'Входящий номер', description: 'Входящий' },
]

const GROUPED_DEMO: SelectOptionGroup[] = [
  {
    label: 'Фрукты',
    options: [
      { value: 'apple', label: 'Яблоко' },
      { value: 'banana', label: 'Банан' },
      { value: 'blueberry', label: 'Черника' },
    ],
  },
  {
    label: 'Овощи',
    options: [
      { value: 'carrot', label: 'Морковь' },
      { value: 'broccoli', label: 'Брокколи' },
      { value: 'spinach', label: 'Шпинат' },
    ],
  },
]

export function SelectInputDocsDemo() {
  const [value, setValue] = useState('')

  return (
    <div
      style={{
        width: 320,
        paddingBottom: 220,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <SelectInput
        label="Страна"
        placeholder="Выберите страну…"
        hint="Подсказка под полем; выпадающий список может выходить за рамку превью — прокрутите блок при необходимости."
        options={OPTIONS}
        value={value}
        onChange={(next) => setValue(next)}
      />
    </div>
  )
}

export function SelectInputGroupedDocsDemo() {
  const [value, setValue] = useState('')

  return (
    <div
      style={{
        width: 320,
        paddingBottom: 220,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <SelectInput
        label="Продукт"
        placeholder="Выберите пункт…"
        hint="Список с секциями через **`groups`** (как SelectGroup в shadcn/ui)."
        groups={GROUPED_DEMO}
        value={value}
        onChange={(next) => setValue(next)}
      />
    </div>
  )
}

export function SelectInputMultipleDocsDemo() {
  const [value, setValue] = useState<string[]>(['delivery', 'incomingNo'])

  return (
    <div
      style={{
        width: 360,
        paddingBottom: 260,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <SelectInput
        mode="multiple"
        label="Ещё поля"
        placeholder="Выберите поля…"
        hint="Подсказка под полем (скрывается, если задан error)."
        options={MULTI_FIELD_OPTIONS}
        value={value}
        onChange={(next) => setValue(next)}
        searchPlaceholder="Поиск поля"
        multipleSummaryLabel="Изменить выбор"
      />
    </div>
  )
}
