---
title: MarkdownInput
description: Qiymati Markdown ko‘rinishida saqlanadigan RichInput — /markdown sub-entry.
---

# MarkdownInput

**[RichInput](./rich-input)** bilan bir xil muharrir, faqat tashqi qiymat — HTML emas, **Markdown**. Kiruvchi Markdown muharrir uchun HTML ga yoyiladi, tahrir natijasi esa qaytadan Markdown ga yig‘iladi.

Alohida kirish nuqtasida yashaydi, chunki konvertatsiya ikkita bog‘liqlikni talab qiladi:

```bash
npm install marked turndown
```

Asosiy bundle dagi `RichInput` HTML bilan ishlaydi va bu paketlarni **talab qilmaydi**.

## Import

```tsx
import { MarkdownInput } from '@v-lab/ui-kit/markdown'
import type { MarkdownInputProps } from '@v-lab/ui-kit/markdown'
```

## Nazorat qilinadigan maydon

```tsx
import { useState } from 'react'
import { MarkdownInput } from '@v-lab/ui-kit/markdown'

export function DescriptionField() {
  const [value, setValue] = useState('**Muhim:** oxirigacha o‘qing.')
  return <MarkdownInput label="Tavsif" required value={value} onChange={setValue} />
}
```

**`name`** berilsa, yashirin input ichida **Markdown** bo‘ladi — `FormData` ga ham o‘sha tushadi.

## Ko‘rish rejimi

Konverterlar alohida eksport qilinadi — saqlangan Markdown ni chizish uchun:

```tsx
import { markdownToHtml } from '@v-lab/ui-kit/markdown'
;<div dangerouslySetInnerHTML={{ __html: markdownToHtml(saved) }} />
```

::: warning Sanitizatsiya
`markdownToHtml` natijani **tozalamaydi**: Markdown xom HTML ga ruxsat beradi. `dangerouslySetInnerHTML` dan oldin ilova sanitayzeridan (masalan `DOMPurify`) o‘tkazing yoki backend da tozalang. Muharrir `<script>` ni olib tashlaydi, lekin bu to‘liq himoya emas.
:::

## `RichInput` dan farqlari

| Nima                 | Xulq-atvor                                               |
| -------------------- | -------------------------------------------------------- |
| `value` / `onChange` | HTML o‘rniga **Markdown** qatori                         |
| `name`               | Yashirin input da Markdown                               |
| standart `tools`     | **`underline`** siz — pastga qarang                      |
| `maxLength`          | Markdown razmetkasi emas, **ko‘rinadigan matn** sanaladi |

Qolgan proplar **[RichInput](./rich-input)** dagidek.

### Tag chizish (underline)

CommonMark da tag chizish yo‘q, shuning uchun `DEFAULT_MARKDOWN_INPUT_TOOLS` da bu tugma yo‘q. Qo‘shsangiz format yo‘qolmaydi, lekin Markdown ichida inline HTML (`<u>…</u>`) sifatida saqlanadi. O‘chirilgan matn esa `~~matn~~` ko‘rinishida to‘g‘ridan-to‘g‘ri ifodalanadi va standart to‘plamda bor.

To‘liq tavsif: **[MarkdownInput (RU)](/guide/components/markdown-input)**.

## Storybook

**Inputs/MarkdownInput** — `Playground`, `InForm`, `ViewMode`.
