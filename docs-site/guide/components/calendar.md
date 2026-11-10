---
title: Calendar
description: Календарная сетка месяца — выбор даты, локали, опциональные точки на днях.
---

# Calendar

Компонент **`Calendar`** отображает один месяц с навигацией, подсветкой выбранного дня и опциональными маркерами (**`getDotDays`**). Текущий день всегда визуально выделен (кольцо-обводка + primary-цвет), чтобы быстро находить сегодняшнюю дату. Локали задаются объектом **`CalendarLocale`**; в пакете есть **`calendarLocales`** (например **`en`**, **`ru`**, **`uz`**).

Клик по заголовку открывает сетку выбора месяца, повторный клик — сетку выбора года (страницы по 12 лет, листаются стрелками). Режим **`mode="range"`** включает выбор диапазона.

## Превью

<ComponentDocsPreview name="calendar" />

## Импорт

```tsx
import { Calendar, calendarLocales } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useState } from 'react'
import { Calendar, calendarLocales } from '@v-lab/ui-kit'

export function MonthPicker() {
  const [value, setValue] = useState<Date | null>(null)

  return <Calendar value={value} onChange={(date) => setValue(date)} locale={calendarLocales.ru} />
}
```

Низкоуровневые части (**`CalendarHeader`**, **`CalendarGrid`**, **`CalendarDay`**) экспортируются отдельно, если нужна кастомная вёрстка.

## Выбор диапазона

При **`mode="range"`** первый клик задаёт начало диапазона, второй — конец; при наведении показывается превью. **`value`** и **`onChange`** работают с объектом **`DateRange`** — `{ start: Date | null; end: Date | null }`.

```tsx
import { useState } from 'react'
import { Calendar, calendarLocales } from '@v-lab/ui-kit'
import type { DateRange } from '@v-lab/ui-kit'

export function RangePicker() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null })

  return <Calendar mode="range" value={range} onChange={setRange} locale={calendarLocales.ru} />
}
```

## Основные пропсы

| Проп         | Тип                                                                     | Описание                                     |
| ------------ | ----------------------------------------------------------------------- | -------------------------------------------- |
| `mode`       | `'single' \| 'range'` (по умолчанию `single`)                           | Одиночный выбор или выбор диапазона          |
| `value`      | `single`: `Date \| null`; `range`: `DateRange`                          | Выбранная дата или диапазон `{ start, end }` |
| `onChange`   | `single`: `(date: Date) => void`; `range`: `(range: DateRange) => void` | Клик по дню месяца                           |
| `locale`     | `CalendarLocale`                                                        | Подписи дней недели, месяца, кнопки «назад»  |
| `getDotDays` | `(date: Date) => boolean` (optional)                                    | Показать точку под числом                    |

## Субкомпоненты

Все части экспортируются отдельно для кастомной композиции:

| Экспорт              | Роль                           | Основные пропсы                                                        |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| **`CalendarHeader`** | Шапка: «Май 2026» + кнопки ‹ › | `month`, `year`, `locale`, `title`, `onLabelClick`, `onPrev`, `onNext` |
| **`CalendarGrid`**   | Сетка недель с ячейками дней   | `year`, `month`, `selectedDate`, `onSelect`, `getDotDays`, `locale`    |
| **`CalendarDay`**    | Одна ячейка числа              | `day`, `isSelected`, `isToday`, `hasDot`, `disabled`, `onClick`        |

### Кастомная сборка

```tsx
import { CalendarHeader, CalendarGrid, calendarLocales } from '@v-lab/ui-kit'
import { useState } from 'react'

export function CustomCalendar() {
  const [date, setDate] = useState(new Date())
  const locale = calendarLocales.ru

  const handlePrev = () => setDate((d) => new Date(d.getFullYear(), d.getMonth() - 1))
  const handleNext = () => setDate((d) => new Date(d.getFullYear(), d.getMonth() + 1))

  return (
    <div>
      <CalendarHeader
        month={date.getMonth()}
        year={date.getFullYear()}
        locale={locale}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <CalendarGrid
        year={date.getFullYear()}
        month={date.getMonth()}
        selectedDate={date}
        onSelect={(d) => setDate(d)}
        locale={locale}
      />
    </div>
  )
}
```

## Локали

```tsx
import { calendarLocales, defaultLocale } from '@v-lab/ui-kit'
// calendarLocales.ru | calendarLocales.en | calendarLocales.uz
// defaultLocale — русская локаль
```

`CalendarLocale` включает: `monthNames`, `dayNamesShort`, `prevLabel`, `nextLabel`.

Исходники: `src/components/Calendar/`.
