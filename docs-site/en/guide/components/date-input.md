---
title: DateInput
description: Date with mask and calendar — separate entry @v-lab/ui-kit/date.
---

# DateInput

Requires peer dependencies **`imask`** and **`react-imask`**. Import from **`@v-lab/ui-kit/date`**. For REST/API use **`valueFormat="iso"`** (`YYYY-MM-DD` in **`onChange`** / **`onAccept`**).

The calendar opens when you click the field area or the calendar icon in the prefix. After you pick a date, the panel closes; it also closes on **Escape** and on click outside the component. Its position adapts to the screen: if there's no room below it opens upward, and near edges it shifts into the visible area, so it always shows in full without clipping or horizontal scroll. The current day is highlighted in the grid.

## Preview

<ComponentDocsPreview name="dateInput" />

## Import

```tsx
import { DateInput } from '@v-lab/ui-kit/date'
```

Peer details — [Installation](/en/guide/installation).

## Example

For API submission **`valueFormat="iso"`** is convenient — **`onChange`** / **`onAccept`** receive **`YYYY-MM-DD`**.

```tsx
import { useState } from 'react'
import { DateInput } from '@v-lab/ui-kit/date'

export function BirthDateField() {
  const [value, setValue] = useState('')
  return (
    <DateInput
      label="Date of birth"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      valueFormat="iso"
      placeholder="DD.MM.YYYY"
    />
  )
}
```

## Props layout

Base — **[InputField](./input-field)** and masked input with calendar. Import from **`@v-lab/ui-kit/date`** only.

### Value and format

| Prop                      | Description                                                                                                                                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`value`**               | Controlled value: with **`valueFormat: 'iso'`** — **`YYYY-MM-DD`** or **`''`**; the visible mask stays **DD / MM / YYYY**                                                                                                               |
| **`valueFormat`**         | **`masked`** (default) — **`onChange`** matches mask string; **`iso`** — **`YYYY-MM-DD`** in **`onChange`** / **`onAccept`** for APIs                                                                                                   |
| **`onChange`**            | Native change event; meaning of **`target.value`** depends on **`valueFormat`**                                                                                                                                                         |
| **`onAccept`**            | Fires when the mask accepts a full value or a date is picked in the calendar                                                                                                                                                            |
| **`locale`**              | **`CalendarLocale`** for the calendar                                                                                                                                                                                                   |
| **`getDotDays`**          | **`(date: Date) => boolean`** — dot markers on days                                                                                                                                                                                     |
| **`calendarButtonLabel`** | Accessible name of the calendar button (and of the dialog when there is no **`label`**); defaults to the field label. The button and **Alt+↓** in the field open the dialog with focus on a day; **Escape** closes it and returns focus |

Plus **InputField** props and attributes from the type.

### Full type

**`DateInputProps`**, **`DateInputValueFormat`** — **`DateInput.types.ts`**.

Sources: `src/components/inputs/DateInput/`.
