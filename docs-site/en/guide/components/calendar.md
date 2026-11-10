---
title: Calendar
description: Month grid — date pick, locales, optional dots on days.
---

# Calendar

**`Calendar`** shows one month with navigation, selected-day highlight, and optional markers (**`getDotDays`**). Today is always visually highlighted (ring outline + primary color) so the current date is easy to spot. Locales use **`CalendarLocale`**; the package includes **`calendarLocales`** (e.g. **`en`**, **`ru`**, **`uz`**).

Clicking the header opens a month picker, clicking again opens a year picker (pages of 12 years, paged by the arrows). **`mode="range"`** enables range selection.

## Preview

<ComponentDocsPreview name="calendar" />

## Import

```tsx
import { Calendar, calendarLocales } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useState } from 'react'
import { Calendar, calendarLocales } from '@v-lab/ui-kit'

export function MonthPicker() {
  const [value, setValue] = useState<Date | null>(null)

  return <Calendar value={value} onChange={(date) => setValue(date)} locale={calendarLocales.en} />
}
```

Lower-level pieces (**`CalendarHeader`**, **`CalendarGrid`**, **`CalendarDay`**) are exported separately for custom layouts.

## Range selection

With **`mode="range"`** the first click sets the range start, the second sets the end; hovering shows a preview. **`value`** and **`onChange`** use a **`DateRange`** object — `{ start: Date | null; end: Date | null }`.

```tsx
import { useState } from 'react'
import { Calendar, calendarLocales } from '@v-lab/ui-kit'
import type { DateRange } from '@v-lab/ui-kit'

export function RangePicker() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null })

  return <Calendar mode="range" value={range} onChange={setRange} locale={calendarLocales.en} />
}
```

## Main props

| Prop         | Type                                                                    | Description                                                                                                                                            |
| ------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`       | `'single' \| 'range'` (default `single`)                                | Single date or date range                                                                                                                              |
| `value`      | `single`: `Date \| null`; `range`: `DateRange`                          | Selected date or `{ start, end }` range                                                                                                                |
| `onChange`   | `single`: `(date: Date) => void`; `range`: `(range: DateRange) => void` | Day click in the month                                                                                                                                 |
| `locale`     | `CalendarLocale`                                                        | Weekday/month labels, prev/next buttons                                                                                                                |
| `getDotDays` | `(date: Date) => boolean` (optional)                                    | Show a dot under the day number                                                                                                                        |
| `autoFocus`  | `boolean` (optional)                                                    | Focus a day (selected, else today) on mount. The grid is `role="grid"`: Arrows / Home / End / PageUp / PageDown (+Shift = year), Enter / Space selects |

## Lower-level pieces

The same module exports **`CalendarHeader`**, **`CalendarGrid`**, **`CalendarDay`** — for custom composition without the full **`Calendar`**. Locale values — **`calendarLocales`**, **`defaultLocale`**. Full layout — Storybook (**Calendar/**).

| Export               | Role               |
| -------------------- | ------------------ |
| **`CalendarHeader`** | Month header + nav |
| **`CalendarGrid`**   | Week/day grid      |
| **`CalendarDay`**    | Single day cell    |

Sources: `src/components/Calendar/`.
