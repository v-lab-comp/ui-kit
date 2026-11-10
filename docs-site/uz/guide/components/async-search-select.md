---
title: AsyncSearchSelect
description: Masofaviy ro‘yxat — qidiruv qatori bo‘yicha opsiyalarni asinxron yuklash (Floating UI).
---

# AsyncSearchSelect

**Masofaviy ma’lumot** uchun tushadigan tanlov: ochilganda va har yangi debounced **`query`** da **`loadOptions({ query, signal, page: 0 })`**; ro‘yxatni pastga surilganda **`page`** 1, 2, … (**`hasMore: true`** bo‘lsa). **`AbortSignal`** yopish, qidiruv o‘zgarishi yoki yangi birinchi sahifa bilan bekor qilinadi. **`debounceMs`** standart **300** ms. **`SelectInput`** **`full`** bilan mos, **`options`** propi yo‘q.

Panel ichidagi qidiruv — **`SearchInput`** komponenti (`medium`). Ochilganda fokus darhol unga o‘tadi ([klaviatura](#keyboard)), yopilganda triggerga qaytadi.

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
      onChange={(next) => setValue(next)}
      loadOptions={loadOptions}
    />
  )
}
```

Yuklash xatolari dropdown ichida ko‘rinadi; **loading** / **bo‘sh** holatlar komponentda (hozirgi matnlar inglizcha) va ekran o‘quvchiga **`role="status"`** orqali e’lon qilinadi. Batafsil ssenariylar — Storybook **Inputs/AsyncSearchSelect**.

Agar **`loadOptions`** oddiy **`SelectOption[]`** qaytarsa (oldingi shakl), komponent **pagination yo‘q** deb oladi — faqat **`page === 0`** chaqiriladi.

## Qiymat, `ref` va forma

- **`onChange(value, option)`** yangi qiymat va tanlangan opsiyani oladi; tozalanganda — **`''`** va **`null`**. Allaqachon tanlangan punktni qayta tanlash **`onChange`** ni chaqirmaydi.
- **`ref`** trigger tugmasiga (**`HTMLButtonElement`**) ishora qiladi: **`ref.current.focus()`** fokusni maydonga o‘tkazadi.
- Tugmaning standart atributlari (**`onFocus`**, **`onBlur`**, **`aria-describedby`**, **`data-*`**…) triggerga tushadi.
- **`name`** bilan qiymat formaga yashirin **`<input type="hidden">`** orqali yuboriladi; bo‘sh qiymat — bo‘sh qator. **`form`** — maydon formadan tashqarida bo‘lsa, forma id si.

## Klaviatura va foydalanish imkoniyati {#keyboard}

Maydon — **listbox** ro‘yxatli **combobox** (WAI-ARIA APG), xatti-harakat **[SelectInput](./select-input)** bilan umumiy:

| Tugmalar                                        | Amal                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| **↓** / **↑** / **Enter** / **Space** (trigger) | Ro‘yxatni ochish, fokus qidiruv maydoniga o‘tadi                    |
| Qidiruvga yozish                                | Yangi **`query`** (**`debounceMs`** dan keyin)                      |
| **↓** / **↑** / **PageUp** / **PageDown**       | Faol punktni almashtirish (qidiruvning **`aria-activedescendant`**) |
| **Enter**                                       | Faol punktni tanlash va yopish                                      |
| **Escape**                                      | Yopish; **Modal** ichida faqat ro‘yxat yopiladi                     |
| **Tab** / tashqariga bosish                     | Tanlovsiz yopish                                                    |
| **Delete** / **Backspace** (trigger)            | Qiymatni tozalash                                                   |

Qidiruv maydoni — **combobox** (**`aria-controls`** listbox ga, **`aria-autocomplete="list"`**); **`loadOptions`** javobidan keyin tanlangan punkt faol, aks holda birinchisi. Yuklanayotganda listbox da **`aria-busy="true"`**. «Loading…», «No results» va «Failed to load» **`role="status"`** orqali e’lon qilinadi.

Ko‘rinadigan **`label`** bo‘lmasa, **`aria-label`** yoki **`aria-labelledby`** majburiy (TypeScript tekshiradi):

```tsx
<AsyncSearchSelect aria-label="Kompaniya" loadOptions={loadOptions} />
```

## Pagination (lazy load)

**`page`** har doim **0** dan boshlanadi: ro‘yxat ochilganda va debounced **`query`** har o‘zgarganda (qidiruvdagi yangi yozuv sahifani va ro‘yxatni qayta boshlaydi). Keyingi sahifalar foydalanuvchi opsiyalar konteynerini pastga surganida avtomatik so‘raladi. **`hasMore: false`** qo‘shimcha yuklashni keyingi **`query`** o‘zgarishigacha to‘xtatadi.

## Qidiruv va API

**`loadOptions`** dagi **`query`** — foydalanuvchi qidiruvga yozgan qator, **`debounceMs`** dan keyin. Uni URL yoki so‘rovda ishlating (**`encodeURIComponent(query)`** misolidagi kabi).

**`loadOptions`** tashqarida ham shu qiymat kerak bo‘lsa (URL, analitika), ixtiyoriy **`onSearchQueryChange(query)`** bering — chaqiruv **`loadOptions`** bilan bir xil «debounced» **`query`** uchun.

## Proplar

| Prop                                     | Tavsif                                                                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **`loadOptions`**                        | Majburiy: `(args: { query; signal; page }) => Promise<SelectOption[] \| { options; hasMore }>` — pagination yuqorida          |
| **`debounceMs`**                         | Yozuvdan keyin **`loadOptions`** chaqirilishidan oldin kechikish (standart **300**)                                           |
| **`onSearchQueryChange`**                | Ixtiyoriy: `(query: string) => void` — **`loadOptions`** ga tushadigan debounced **`query`**                                  |
| **`selectedOption`**                     | **`value`** tashqaridan berilganda, API javobida punkt paydo bo‘lmaguncha triggerda yozuv uchun **`{ value, label, icon? }`** |
| **`searchPlaceholder`**                  | Panel ichidagi qidiruv maydoni placeholder (va nomi) (standart **`'Search...'`**)                                             |
| **`value`** / **`defaultValue`**         | `string` — tanlangan opsiyaning **`value`**, **`''`** — hech narsa tanlanmagan                                                |
| **`onChange`**                           | `(value: string, option: SelectOption \| null) => void`                                                                       |
| **`aria-label`** / **`aria-labelledby`** | Trigger nomi; **`label`** bo‘lmasa, ulardan biri majburiy                                                                     |

Qolganlari **`SelectInput`** **`full`** kabi: **`label`**, **`hint`**, **`error`**, **`placement`**, **`dropdownMaxHeight`**, **`optionTextWrap`**, **`prefix`**, **`name`** / **`form`** (formaning yashirin maydoni), trigger tugmasiga **`forwardRef`**. **`variant`**, **`searchThreshold`** va **`lazyLoadPageSize`** proplari yo‘q: maydon doim **`full`**, qidiruv doim ko‘rsatiladi, sahifalarni **`loadOptions`** beradi.

Tip — **`AsyncSearchSelect.types.ts`**. Manba: **`src/components/inputs/AsyncSearchSelect/`**.
