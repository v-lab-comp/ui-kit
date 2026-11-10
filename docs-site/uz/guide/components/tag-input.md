---
title: TagInput
description: Chip/teglar maydoni — erkin yozish va ixtiyoriy ro‘yxatdan tanlash (jumladan API dan).
---

# TagInput

**[InputField](/uz/guide/components/input-field)** va **[Tag](./tag)** asosida: qiymat **`string[]`**; **`suggestions`** berilsa — ochiladigan ro‘yxat (mahalliy yoki server filtri).

O‘rama accenti uchun **`completed`** va **`completedColor`** — **[InputField](/uz/guide/components/input-field#input-completed)** dagidek.

## Preview

<ComponentDocsPreview name="tagInput" />

## Import

```tsx
import { TagInput } from '@v-lab/ui-kit'
import type { TagInputProps, TagInputSuggestion, TagInputSuggestionsMatch } from '@v-lab/ui-kit'
```

**`suggestions`**: **`string[]`** yoki **`{ id, label }[]`** — **`id`** React **`key`**, **`label`** teg matni va ro‘yxatda ko‘rinadi.

## API dan takliflar

Ota-komponent **`suggestions`** ni state da saqlaydi va **`onSuggestionsQueryChange`** chaqirilganda yangilaydi (qo‘lda **`fetch`** bilan):

```tsx
import { useEffect, useState } from 'react'
import { TagInput } from '@v-lab/ui-kit'
import type { TagInputSuggestion } from '@v-lab/ui-kit'

const OPTIONS_FROM_BACKEND: TagInputSuggestion[] = [
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'vue', label: 'Vue' },
  { id: 'design', label: 'Design' },
  { id: 'qa', label: 'QA' },
]

export function TagsFromApiExample() {
  const [tags, setTags] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<TagInputSuggestion[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const q = query.trim().toLowerCase()
      setSuggestions(
        q
          ? OPTIONS_FROM_BACKEND.filter((s) => s.label.toLowerCase().includes(q))
          : [...OPTIONS_FROM_BACKEND]
      )
    }, 220)

    return () => window.clearTimeout(timer)
  }, [query])

  return (
    <TagInput
      label="Stack"
      placeholder="Qo‘llanma bo‘yicha qidirish…"
      value={tags}
      onChange={setTags}
      suggestions={suggestions}
      suggestionsMatch="server"
      onSuggestionsQueryChange={setQuery}
    />
  )
}
```

**`suggestionsMatch="server"`** — filtrlashni API bajaradi.

Standart holatda tanlangan punktlar ro‘yxatda **qoladi**, o‘ngda **belgi**; qayta bosish **tegni olib tashlaydi**. Eski usul (tanlanganlar ro‘yxatdan yo‘qoladi) — **`suggestionsExcludeSelected`**.

### Klaviatura (ro‘yxat ochiq bo‘lsa)

- **Enter** / vergul / **`;`** — maydon bo‘sh emas bo‘lsa, yozilgan matn teg sifatida qo‘shiladi.
- Belgili rejimda qator **toggle**; aks holda bir marta tanlash: sichqoncha, **Tab**, yoki **Enter** **bo‘sh** maydonda.
- **Esc** — ro‘yxatni yopadi.

### Balandlik

**`tagsAreaMaxHeight`** — teglar + input zonasi balandligi (son = px, CSS qatori yoki **`'none'`**).

To‘liq jadval va boshqa misollar: **[TagInput (RU)](/guide/components/tag-input)**.

## React Hook Form

**`RHFTagInput`** — **`@v-lab/ui-kit/adapters`**, maydon qiymati **`TagInputTagValue[]`**. **[Adapterlar](/uz/guide/adapters)**.

## Storybook

**Inputs/TagInput** — «remote suggestions» hikoyasida Docs varag‘ida to‘liq kod namunasi bor.
