---
title: SelectInput
description: Qidiruvli select, guruhlangan opsiyalar — full / compact / inline; multiple rejimi.
---

# SelectInput

Tanlash **`options`** (tekis ro‘yxat) yoki **`groups`** (bo‘lim sarlavhasi + punktlar, shadcn **SelectGroup** ga o‘xshash). **`label`** / **`hint`**, ko‘p punktlarda qidiruv, **placement**. **`mode="multiple"`** — checkboxlar va triggarda qisqa xabar.

## Preview

<ComponentDocsPreview name="selectInput" />

### Guruhlar (`groups`)

<ComponentDocsPreview name="selectInputGrouped" />

### Bir nechta tanlov (`mode="multiple"`)

<ComponentDocsPreview name="selectInputMultiple" />

## Import

```tsx
import { SelectInput } from '@v-lab/ui-kit'
import type {
  SelectInputProps,
  SelectInputMultipleChangeEvent,
  SelectInputOptionsProp,
  SelectOption,
  SelectOptionGroup,
} from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'

const OPTIONS = [
  { value: 'a', label: 'Birinchi' },
  { value: 'b', label: 'Ikkinchi' },
]

export function RegionSelect() {
  const [value, setValue] = useState('')
  return (
    <SelectInput
      label="Hudud"
      options={OPTIONS}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

Opsiyalarda ikonkalar, **`variant="inline"`**, uzun ro‘yxatlar — Storybook **Inputs/SelectInput** (**Grouped options**, **Multiple (summary)**).

## `completed` holati {#completed-state}

**`completed`** va **`completedColor`** — **[InputField](/uz/guide/components/input-field#input-completed)** bilan bir xil:

- **`variant="full"`** — matn maydoni bilan bir xil o‘rama.
- **`compact`** / **`compact-label`** — trigger tugma atrofida; **`completedColor`** **`--input-completed-border`** ni beradi.
- **`inline`** — triggerda **1px** chegara (standartda shaffof).

**`error`** yoki **`disabled`** bo‘lsa — accent yo‘q. Preview: **[InputField](/uz/guide/components/input-field#input-completed)** yoki Storybook **Completed** storilari.

## Guruhlar (`groups`)

**`options`** o‘rniga **`groups`**: **`{ label, options }[]`**. Sarlavha tanlanmaydi; bo‘limlar ajratilgan. Yashirin **`<select>`** ichida **`<optgroup>`**. Tiplarda **`options`** yoki **`groups`** (**`SelectInputOptionsProp`**). Agar ikkalasi ham bo‘lsa (masalan, spread), ustunlik **`groups`** da.

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'
import type { SelectOptionGroup } from '@v-lab/ui-kit'

const GROUPS: SelectOptionGroup[] = [
  {
    label: 'Mevalar',
    options: [
      { value: 'apple', label: 'Olma' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  { label: 'Sabzavotlar', options: [{ value: 'carrot', label: 'Sabzi' }] },
]

export function Demo() {
  const [value, setValue] = useState('')
  return (
    <SelectInput
      label="Tur"
      placeholder="Tanlang…"
      groups={GROUPS}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

Qidiruv punktlarni filtrlashi mumkin; bo‘sh guruhlar yashirinadi.

## `mode="multiple"`

Faqat **`variant="full"`**: qiymat **`string[]`**, **`onChange`** — **`SelectInputMultipleChangeEvent`** (**`e.target.value`**). Ro‘yxat ochiq qoladi; **`description`** — ikkinchi qator; yashirin **`<select multiple>`** forma uchun.

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'
import type { SelectInputMultipleChangeEvent } from '@v-lab/ui-kit'

export function Demo() {
  const [value, setValue] = useState<string[]>([])
  return (
    <SelectInput
      mode="multiple"
      label="Qo‘shimcha maydonlar"
      placeholder="Tanlang…"
      options={[
        { value: 'a', label: 'Maydon A', description: 'Tur' },
        { value: 'b', label: 'Maydon B', description: 'Tur' },
      ]}
      value={value}
      onChange={(e: SelectInputMultipleChangeEvent) => setValue(e.target.value)}
      multipleSummaryLabel="Tanlovni o‘zgartirish"
      searchPlaceholder="Qidirish"
    />
  )
}
```

## Tur va tiplar

**`SelectOption`** — **`value`**, **`label`**, ixtiyoriy **`description`**, **`icon`**, **`searchKeywords`**. **`SelectOptionWithShortLabel`** — qo‘shimcha majburiy **`shortLabel`**. **`SelectOptionGroup`** — **`label`**, **`options`**.

## Asosiy proplar

**`options`** yoki **`groups`**, qolganlari barcha variantlar uchun mos (**`SelectInput.types.ts`**): **`SelectInputProps`**, **`SelectInputOptionsProp`**, **`FullVariantMultipleProps`**, **`SelectInputMultipleChangeEvent`**, **`SelectVariant`**.

Manbalar: `src/components/inputs/SelectInput/`.
