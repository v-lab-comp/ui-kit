---
title: RichInput
description: Formalar uchun ko‘p qatorli formatlangan matn maydoni — label, hint/error, tulbar va uzunlik chegarasi.
---

# RichInput

**[InputField](/uz/guide/components/input-field)** asosidagi formatlangan matn maydoni: odatdagi forma maydoni (**`label`**, **`hint`** / **`error`**, **`required`**, o‘lchamlar), faqat `<input>` o‘rniga ichida tulbarli `contenteditable`.

Qiymat — **HTML qatori**. Izohlar lentasi uchun (**Enter** bilan yuborish, «samolyot» tugmasi) **[CommentRichInput](./comments/comment-rich-input)** ishlatiladi.

## Preview

<ComponentDocsPreview name="richInput" />

## Import

```tsx
import { RichInput } from '@v-lab/ui-kit'
import type { RichInputProps, RichInputTool } from '@v-lab/ui-kit'
```

## Nazorat qilinadigan maydon

```tsx
import { useState } from 'react'
import { RichInput } from '@v-lab/ui-kit'

export function DescriptionField() {
  const [value, setValue] = useState('')
  return (
    <RichInput
      label="Tavsif"
      required
      placeholder="Vazifani tasvirlang…"
      value={value}
      onChange={setValue}
    />
  )
}
```

Validatsiya forma zimmasida — teglarsiz matnni tekshirish qulay:

```tsx
const isEmpty = value.replace(/<[^>]*>/g, '').trim() === ''
```

## Uzunlik chegarasi

**`maxLength`** **teglarsiz matnni** sanaydi: maydon ostida hisoblagich chiqadi, chegaradan ortiq kiritish bloklanadi, qo‘yilgan matn qirqiladi.

## Tulbar

**`tools`** tugmalar to‘plami va tartibini beradi: **`bold`**, **`italic`**, **`underline`**, **`strikethrough`**, **`bulletList`**, **`orderedList`**, **`clear`**. Bo‘sh massiv tulbarni olib tashlaydi; **`toolbarPlacement`** uni matn ostiga ko‘chiradi.

## Formani nativ yuborish

**`name`** berilsa yashirin `<input>` render qilinadi va qiymat **`FormData`** ga tushadi:

```tsx
<RichInput label="Tavsif" name="description" defaultValue="<b>Qoralama</b>" />
```

## Xulq-atvor

- **Enter** — yangi qator; maydon formani yubormaydi.
- Buferdan qo‘yish — faqat **plain text**.
- Kiruvchi **`value`** / **`defaultValue`** dan **`<script>`** olib tashlanadi. To‘liq sanitizatsiya — ilova / backend zimmasida.
- **`readOnly`** — matn nusxalanadi, tulbar yashirin; **`disabled`** — maydon nofaol.

To‘liq proplar jadvali: **[RichInput (RU)](/guide/components/rich-input)**.

## Storybook

**Inputs/RichInput** — `Playground`, `InForm`, `WithMaxLength`, `UncontrolledWithName`, `Compact` va holatlar galereyasi.
