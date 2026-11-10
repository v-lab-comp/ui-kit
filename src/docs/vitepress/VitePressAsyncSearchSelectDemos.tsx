import { useCallback, useState } from 'react'
import { AsyncSearchSelect } from '@/components/inputs'
import type { SelectOption } from '@/components/inputs'

const OPTIONS: SelectOption[] = [
  { value: 'uz', label: 'Узбекистан' },
  { value: 'kz', label: 'Казахстан' },
  { value: 'kg', label: 'Кыргызстан' },
  { value: 'tj', label: 'Таджикистан' },
  ...Array.from({ length: 14 }, (_, i) => ({
    value: `demo-${i}`,
    label: `Пункт ${i + 1}`,
  })),
]

const DOCS_PAGE_SIZE = 5

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const t = window.setTimeout(resolve, ms)
    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(t)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true }
    )
  })
}

export function AsyncSearchSelectDocsDemo() {
  const [value, setValue] = useState('')

  const loadOptions = useCallback(
    async ({ query, signal, page }: { query: string; signal: AbortSignal; page: number }) => {
      await delay(250, signal)
      const q = query.trim().toLowerCase()
      const pool = !q
        ? OPTIONS
        : OPTIONS.filter((o) => o.label.toLowerCase().includes(q) || o.value.includes(q))
      const start = page * DOCS_PAGE_SIZE
      const slice = pool.slice(start, start + DOCS_PAGE_SIZE)
      return { options: slice, hasMore: start + slice.length < pool.length }
    },
    []
  )

  return (
    <div
      style={{
        width: 320,
        paddingBottom: 220,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <AsyncSearchSelect
        label="Страна"
        placeholder="Выберите страну…"
        hint="Поиск с debounce; список порциями — прокрутите выпадашку вниз для дозагрузки. Превью может обрезать портал."
        searchPlaceholder="Поиск…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        loadOptions={loadOptions}
      />
    </div>
  )
}
