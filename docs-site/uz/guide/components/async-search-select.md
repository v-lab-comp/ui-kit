---
title: AsyncSearchSelect
description: Masofaviy ro‘yxat — qidiruv qatori bo‘yicha opsiyalarni asinxron yuklash (Floating UI).
---

# AsyncSearchSelect

**Masofaviy ma’lumot** uchun tushadigan tanlov: ochilganda va har yangi debounced **`query`** da **`loadOptions({ query, signal, page: 0 })`**; ro‘yxatni pastga surilganda **`page`** 1, 2, … (**`hasMore: true`** bo‘lsa). **`AbortSignal`** yopish, qidiruv o‘zgarishi yoki yangi birinchi sahifa bilan bekor qilinadi. **`debounceMs`** standart **300** ms. **`SelectInput`** **`full`** bilan mos, **`options`** propi yo‘q.

Panel ichidagi qidiruv — **`SearchInput`** komponenti (`medium`), **`autoFocus`** yo‘q: ochilganda fokus triggerda qoladi, foydalanuvchi qidiruvga o‘tmaguncha.

**`completed`** / **`completedColor`** — **[InputField](/uz/guide/components/input-field#input-completed)** bilan bir xil (Storybook **Inputs/AsyncSearchSelect → Completed**).

## Preview

<ComponentDocsPreview name="asyncSearchSelect" />

## Import

```tsx
import { AsyncSearchSelect } from '@v-lab/ui-kit'
import type {
  AsyncSearchSelectLoadResult,
  AsyncSearchSelectProps,
  SelectOption,
} from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useCallback, useState } from 'react'
import { AsyncSearchSelect } from '@v-lab/ui-kit'
import type { SelectOption } from '@v-lab/ui-kit'

async function fetchPage(
  query: string,
  page: number,
  signal: AbortSignal
): Promise<{ items: SelectOption[]; hasMore: boolean }> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    pageSize: '20',
  })
  const res = await fetch(`/api/items?${params}`, { signal })
  return res.json()
}

export function RemoteSelect() {
  const [value, setValue] = useState('')
  const loadOptions = useCallback(
    async ({
      query,
      signal,
      page,
    }: {
      query: string
      signal: AbortSignal
      page: number
    }): Promise<AsyncSearchSelectLoadResult> => {
      const { items, hasMore } = await fetchPage(query, page, signal)
      return { options: items, hasMore }
    },
    []
  )
  return (
    <AsyncSearchSelect
      label="Element"
      placeholder="Tanlang…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      loadOptions={loadOptions}
    />
  )
}
```

Yuklash xatolari dropdown ichida ko‘rinadi; **loading** / **bo‘sh** holatlar komponentda (hozirgi matnlar inglizcha). Batafsil ssenariylar — Storybook **Inputs/AsyncSearchSelect**.

Agar **`loadOptions`** oddiy **`SelectOption[]`** qaytarsa (oldingi shakl), komponent **pagination yo‘q** deb oladi — faqat **`page === 0`** chaqiriladi.

## Pagination (lazy load)

**`page`** har doim **0** dan boshlanadi: ro‘yxat ochilganda va debounced **`query`** har o‘zgarganda (qidiruvdagi yangi yozuv sahifani va ro‘yxatni qayta boshlaydi). Keyingi sahifalar foydalanuvchi opsiyalar konteynerini pastga surganida avtomatik so‘raladi. **`hasMore: false`** qo‘shimcha yuklashni keyingi **`query`** o‘zgarishigacha to‘xtatadi.

## Qidiruv va API

**`loadOptions`** dagi **`query`** — foydalanuvchi qidiruvga yozgan qator, **`debounceMs`** dan keyin. Uni URL yoki so‘rovda ishlating (**`encodeURIComponent(query)`** misolidagi kabi).

**`loadOptions`** tashqarida ham shu qiymat kerak bo‘lsa (URL, analitika), ixtiyoriy **`onSearchQueryChange(query)`** bering — chaqiruv **`loadOptions`** bilan bir xil «debounced» **`query`** uchun.

## Proplar

| Prop                      | Tavsif                                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **`loadOptions`**         | Majburiy: `(args: { query; signal; page }) => Promise<SelectOption[] \| { options; hasMore }>` — pagination yuqorida          |
| **`debounceMs`**          | Yozuvdan keyin **`loadOptions`** chaqirilishidan oldin kechikish (standart **300**)                                           |
| **`onSearchQueryChange`** | Ixtiyoriy: `(query: string) => void` — **`loadOptions`** ga tushadigan debounced **`query`**                                  |
| **`selectedOption`**      | **`value`** tashqaridan berilganda, API javobida punkt paydo bo‘lmaguncha triggerda yozuv uchun **`{ value, label, icon? }`** |
| **`searchPlaceholder`**   | Panel ichidagi qidiruv maydoni placeholder (standart **`'Search...'`**)                                                       |

Qolganlari **`SelectInput`** **`full`** kabi: **`label`**, **`hint`**, **`error`**, **`placement`**, **`dropdownMaxHeight`**, **`optionTextWrap`**, **`prefix`**, forma uchun yashirin **`<select>`**, **`forwardRef`**.

Tip — **`AsyncSearchSelect.types.ts`**. Manba: **`src/components/inputs/AsyncSearchSelect/`**.
