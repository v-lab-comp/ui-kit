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
      onChange={(next) => setValue(next)}
    />
  )
}
```

Opsiyalarda ikonkalar, **`variant="inline"`**, uzun ro‘yxatlar — Storybook **Inputs/SelectInput** (**Grouped options**, **Multiple (summary)**).

## Qiymat, `ref` va forma

- **`onChange(value, option)`** yangi qiymat va tanlangan opsiyani oladi; tozalanganda — **`''`** va **`null`**. Allaqachon tanlangan punktni qayta tanlash **`onChange`** ni chaqirmaydi.
- **`ref`** trigger tugmasiga (**`HTMLButtonElement`**) ishora qiladi: **`ref.current.focus()`** maydonga fokus beradi.
- Tugmaning standart atributlari (**`onFocus`**, **`onBlur`**, **`aria-describedby`**, **`data-*`**…) triggerga o‘tadi.
- **`name`** bilan qiymat formaga yashirin **`<input type="hidden">`** orqali yuboriladi; **`form`** — forma id si.

## Klaviatura va accessibility

Maydon WAI-ARIA APG bo‘yicha **combobox** + **listbox**: fokus triggerda qoladi, faol punkt **`aria-activedescendant`** orqali e’lon qilinadi.

| Tugmalar                                       | Amal                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| **↓** / **↑** / **Enter** / **Space**          | Ro‘yxatni ochish; ochiq bo‘lsa — faol punktni almashtirish / tanlash |
| **Home** / **End** / **PageUp** / **PageDown** | Birinchi / oxirgi punkt, 10 qadam                                    |
| Harflar                                        | Boshlang‘ich harflar bo‘yicha punktga o‘tish (qidiruv bo‘lmasa)      |
| **Escape**                                     | Ro‘yxatni yopish; **Modal** ichida faqat ro‘yxat yopiladi            |
| **Tab**                                        | Ro‘yxatni yopib, keyingi elementga o‘tish                            |
| **Delete** / **Backspace**                     | Qiymatni tozalash                                                    |

Qidiruv maydoni bo‘lsa, ochilganda fokus unga o‘tadi va yopilganda triggerga qaytadi. Ro‘yxat tashqariga bosilganda yoki fokus chiqib ketganda ham yopiladi. «No results» / «No options» **`role="status"`** orqali e’lon qilinadi.

**`compact`** / **`compact-label`** / **`inline`** da ko‘rinadigan yorliq yo‘q, shuning uchun **`aria-label`** yoki **`aria-labelledby`** majburiy (TypeScript tekshiradi):

```tsx
<SelectInput variant="compact-label" aria-label="Valyuta" options={CURRENCIES} />
```

## `completed` holati {#completed-state}

**`completed`** va **`completedColor`** — **[InputField](/uz/guide/components/input-field#input-completed)** bilan bir xil:

- **`variant="full"`** — matn maydoni bilan bir xil o‘rama.
- **`compact`** / **`compact-label`** — trigger tugma atrofida; **`completedColor`** **`--input-completed-border`** ni beradi.
- **`inline`** — triggerda **1px** chegara (standartda shaffof).

**`error`** yoki **`disabled`** bo‘lsa — accent yo‘q. Preview: **[InputField](/uz/guide/components/input-field#input-completed)** yoki Storybook **Completed** storilari.

## Guruhlar (`groups`)

**`options`** o‘rniga **`groups`**: **`{ label, options }[]`**. Sarlavha tanlanmaydi; bo‘limlar ajratilgan. Tiplarda **`options`** yoki **`groups`** (**`SelectInputOptionsProp`**). Agar ikkalasi ham bo‘lsa (masalan, spread), ustunlik **`groups`** da.

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
      onChange={(next) => setValue(next)}
    />
  )
}
```

Qidiruv punktlarni filtrlashi mumkin; bo‘sh guruhlar yashirinadi.

## `mode="multiple"`

Faqat **`variant="full"`**: qiymat **`string[]`**, **`onChange(value, options)`** — yangi massiv va tanlangan opsiyalar. Ro‘yxat ochiq qoladi; **`description`** — ikkinchi qator; **`name`** bilan har bir qiymat formaga alohida yashirin maydon sifatida yuboriladi.

```tsx
import { useState } from 'react'
import { SelectInput } from '@v-lab/ui-kit'

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
      onChange={(next) => setValue(next)}
      multipleSummaryLabel="Tanlovni o‘zgartirish"
      searchPlaceholder="Qidirish"
    />
  )
}
```

## Tur va tiplar

**`SelectOption`** — **`value`**, **`label`**, ixtiyoriy **`description`**, **`icon`**, **`searchKeywords`**. **`SelectOptionWithShortLabel`** — qo‘shimcha majburiy **`shortLabel`**. **`SelectOptionGroup`** — **`label`**, **`options`**.

## Asosiy proplar

**`options`** yoki **`groups`**, qolganlari barcha variantlar uchun mos (**`SelectInput.types.ts`**): **`SelectInputProps`**, **`SelectInputOptionsProp`**, **`FullVariantMultipleProps`**, **`SelectInputSingleValueProps`**, **`SelectInputMultipleValueProps`**, **`SelectAccessibleName`**, **`SelectVariant`**.

Compact variantlarda **`aria-label`** / **`aria-labelledby`** majburiy (avvalgi **`triggerAriaLabel`** o‘rniga). **`name`** / **`form`** — yashirin forma maydonlari; boshqa tugma atributlari triggerga o‘tadi (**`SelectTriggerNativeProps`**).

Manbalar: `src/components/inputs/SelectInput/`.
