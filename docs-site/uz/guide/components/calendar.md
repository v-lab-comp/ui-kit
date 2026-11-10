---
title: Calendar
description: Oy taqvim panjarasi — sana tanlash, lokalizatsiyalar, kunlarda ixtiyoriy nuqtalar.
---

# Calendar

**`Calendar`** komponenti bitta oyni yo‘l-yo‘riq, tanlangan kun chiroqlanishi va ixtiyoriy belgilar (**`getDotDays`**) bilan ko‘rsatadi. Joriy kun har doim vizual ajratiladi (halqa-chegara + primary rang), shunda bugungi sanani tez topish mumkin. Lokalizatsiyalar **`CalendarLocale`** obyekti bilan; paketda **`calendarLocales`** bor (masalan **`en`**, **`ru`**, **`uz`**).

Sarlavhaga bosish oy tanlash panjarasini, qayta bosish yil tanlash panjarasini ochadi (12 yildan iborat sahifalar, strelkalar bilan varaqlanadi). **`mode="range"`** oraliq tanlashni yoqadi.

## Preview

<ComponentDocsPreview name="calendar" />

## Import

```tsx
import { Calendar, calendarLocales } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useState } from 'react'
import { Calendar, calendarLocales } from '@v-lab/ui-kit'

export function MonthPicker() {
  const [value, setValue] = useState<Date | null>(null)

  return <Calendar value={value} onChange={(date) => setValue(date)} locale={calendarLocales.ru} />
}
```

Pastki qismlar (**`CalendarHeader`**, **`CalendarGrid`**, **`CalendarDay`**) maxsus razmetka kerak bo‘lsa alohida eksport qilinadi.

## Oraliq tanlash

**`mode="range"`** bilan birinchi bosish oraliq boshini, ikkinchisi oxirini belgilaydi; kursorni olib borganda ko‘rib chiqish ko‘rsatiladi. **`value`** va **`onChange`** **`DateRange`** obyekti bilan ishlaydi — `{ start: Date | null; end: Date | null }`.

```tsx
import { useState } from 'react'
import { Calendar, calendarLocales } from '@v-lab/ui-kit'
import type { DateRange } from '@v-lab/ui-kit'

export function RangePicker() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null })

  return <Calendar mode="range" value={range} onChange={setRange} locale={calendarLocales.uz} />
}
```

## Asosiy proplar

| Prop         | Tip                                                                     | Tavsif                                                                                                                                                          |
| ------------ | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`       | `'single' \| 'range'` (standart `single`)                               | Yagona sana yoki oraliq tanlash                                                                                                                                 |
| `value`      | `single`: `Date \| null`; `range`: `DateRange`                          | Tanlangan sana yoki `{ start, end }` oralig‘i                                                                                                                   |
| `onChange`   | `single`: `(date: Date) => void`; `range`: `(range: DateRange) => void` | Oy kuniga bosish                                                                                                                                                |
| `locale`     | `CalendarLocale`                                                        | Hafta kuni, oy yozuvlari, «orqaga» tugmalari                                                                                                                    |
| `getDotDays` | `(date: Date) => boolean` (ixtiyoriy)                                   | Raqam ostida nuqta ko‘rsatish                                                                                                                                   |
| `autoFocus`  | `boolean` (ixtiyoriy)                                                   | Montajda kunni (tanlangan, aks holda bugun) fokuslash. Setka `role="grid"`: strelkalar / Home / End / PageUp / PageDown (+Shift — yil), Enter / Space — tanlash |

## Pastki darajali qismlar

Xuddi shu modul **`CalendarHeader`**, **`CalendarGrid`**, **`CalendarDay`** ni eksport qiladi — tayyor **`Calendar`** siz o‘z kompozitsiyangiz kerak bo‘lsa. Lokal qiymatlar — **`calendarLocales`**, **`defaultLocale`**. To‘liq razmetka va bog‘lanishlar Storybook’da (**Calendar/**).

| Eksport              | Rol                          |
| -------------------- | ---------------------------- |
| **`CalendarHeader`** | Oy sarlavhasi va navigatsiya |
| **`CalendarGrid`**   | Haftalar va kunlar panjarasi |
| **`CalendarDay`**    | Bitta kun kataksi            |

Manbalar: `src/components/Calendar/`.
