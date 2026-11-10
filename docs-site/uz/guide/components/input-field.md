---
title: InputField
description: Maydon o‘rami — yorliq, hint/xato, prefiks/suffiks, start/end bloklar; children (id) => kontrol sifatida.
---

# InputField

Bir qatorli yoki murakkab har qanday kontrol uchun o‘rama: **`label`**, **`hint`** / **`error`**, **`prefix`** / **`suffix`**, **`startBlock`** / **`endBlock`**, **`size`** o‘lchami. Ichida odatda **`BaseInput`**, **`SelectInput`** yoki o‘z razmetkangiz.

Tayyor maydonlar (**`TextInput`**, **`EmailInput`**, …) allaqachon **`InputField`** + primitivni yig‘adi — bu sahifa **o‘z** maydoningizni shu shartnoma bo‘yicha yozsangiz kerak.

Bitta qiymatning bir nechta qismi — [**useCompositeInput**](/uz/guide/hooks/use-composite-input) hooki; batafsil — repozitoriydagi **`src/components/inputs/base/COMPOSITE_INPUTS.md`**.

## Import

```tsx
import { InputField } from '@v-lab/ui-kit'
import type { InputFieldProps } from '@v-lab/ui-kit'
```

Ochiq tip **`InputFieldProps`** asosiy entry dan eksport qilinadi (**`src/components/inputs`** orqali).

## BaseInput bilan misol

**`children`** — **`ReactNode`** yoki **`(id: string) => ReactNode`** funksiyasi. Funksiya ichki kontrol uchun **`label`** ↔ **`htmlFor`** bog‘lash **`id`** ni oladi.

```tsx
import { forwardRef } from 'react'
import { InputField, BaseInput } from '@v-lab/ui-kit'

type Props = {
  label: string
  hint?: string
  error?: string
}

export const MyField = forwardRef<
  HTMLInputElement,
  Props & React.ComponentPropsWithoutRef<'input'>
>(({ label, hint, error, ...inputProps }, ref) => (
  <InputField label={label} hint={hint} error={error}>
    {(fieldId) => <BaseInput ref={ref} id={fieldId} hasError={!!error} {...inputProps} />}
  </InputField>
))
MyField.displayName = 'MyField'
```

Repozitoriy **`CLAUDE.md`** dagi shablon shu naqsh bilan mos.

## «To‘ldirilgan» holat (`completed`) {#input-completed}

**`completed`** — o‘rama **1px** chegarasini **primary** rangga bo‘yaydi (standart **`--primary-base`** / hoverda **`--primary-dark`**). **`completedColor`** — qisqa presetlar: **`"success"`**, **`"error"`**, **`"warning"`**, **`"primary"`**, **`"information"`**, **`"faded"`**, **`"feature"`**, **`"verified"`**, **`"away"`**, **`"highlighted"`** (**`var(--*-base)`**), yoki **`#hex`**, **`rgb()`**, **`var(--…)`**.

**`error`** yoki **`disabled`** bo‘lsa, accent qo‘llanmaydi.

Tayyor maydonlar (**`TextInput`**, **`EmailInput`**, **`TagInput`**, **`SelectInput`** **`full`**, **`AsyncSearchSelect`**, …) bu proplarni **`InputFieldProps`** dan oladi. **`SelectInput`** uchun **`compact`** / **`compact-label`** / **`inline`** — chegara tugma-tririgger atrofida. **`PhoneInput`** va **`SiteInput`** **`startBlock`** ichidagi **`SelectInput`** ga ham shu qiymatlarni uzatadi.

Select variantlari — [**SelectInput**](/uz/guide/components/select-input#completed-state).

### Preview

<ComponentDocsPreview name="inputCompleted" />

Storybook: **Inputs/TextInput** — **Completed**, **CompletedCustomColor**; **Inputs/SelectInput**; **Inputs/TagInput**, **Inputs/AsyncSearchSelect**.

## Proplar (`InputFieldProps`)

| Prop                 | Tip                                        | Tavsif                                                                             |
| -------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| **`children`**       | `ReactNode \| ((id: string) => ReactNode)` | Maydon kontenti yoki **`id`** li render-funksiya (**`label`** / **`input`** uchun) |
| **`label`**          | `string`                                   | Maydon ustidagi yorliq                                                             |
| **`required`**       | `boolean`                                  | Majburiy belgisi (yorliq yonida `*`)                                               |
| **`optional`**       | `boolean \| string`                        | «Ixtiyoriy» yoki o‘z matningiz                                                     |
| **`labelTooltip`**   | `ReactNode`                                | Yorliq o‘ngidagi tugun (maslahat ikonkasi)                                         |
| **`hint`**           | `string`                                   | Maydon ostidagi matn; **`error`** berilsa yashirinadi                              |
| **`error`**          | `string`                                   | Xato; **`hint`** ni almashtiradi, o‘rama chizig‘i                                  |
| **`completed`**      | `boolean`                                  | Accent chegara (standart primary); **`error`** / **`disabled`** bilan emas         |
| **`completedColor`** | `string`                                   | **`success`**, **`error`**, … presetlar yoki hex / **`var(--…)`**                  |
| **`prefix`**         | `ReactNode`                                | Chiziq ichida chap slot                                                            |
| **`suffix`**         | `ReactNode`                                | Chiziq ichida o‘ng slot                                                            |
| **`startBlock`**     | `ReactNode`                                | Chapdagi alohida blok (murakkab maydonlar)                                         |
| **`endBlock`**       | `ReactNode`                                | O‘ngdagi alohida blok                                                              |
| **`size`**           | `'big' \| 'medium' \| 'small'`             | O‘rama balandligi (standart **`medium`**)                                          |
| **`disabled`**       | `boolean`                                  | Faolsiz holat                                                                      |
| **`id`**             | `string`                                   | Aniq **`id`**; bo‘lmasa **`useId`** bilan yaratiladi                               |
| **`className`**      | `string`                                   | Maydon ildiz **`div`** sinfi                                                       |

Yorliqsiz kontrolning jonli preview’i — [**BaseInput**](/uz/guide/components/base-input); inputlar to‘liq galereyasi — [**Umumiy va galereya**](/uz/guide/components/inputs/).

Manbalar: **`src/components/inputs/base/InputField/`** · **`InputField.types.ts`**.
