---
title: DateInput
description: Дата с маской и календарём — отдельный entry @v-lab/ui-kit/date.
---

# DateInput

Требует peer-зависимостей **`imask`** и **`react-imask`**. Импорт из **`@v-lab/ui-kit/date`**. Для REST/API удобно **`valueFormat="iso"`** (`YYYY-MM-DD` в **`onChange`** / **`onAccept`**).

Календарь открывается по клику в области поля или по иконке календаря в префиксе. После выбора даты панель закрывается; также закрытие срабатывает по клавише **Escape** и по клику вне компонента. Позиция подстраивается под экран: если снизу не помещается — открывается вверх, у краёв сдвигается внутрь видимой области, поэтому отображается целиком без обрезания и горизонтального скролла. В сетке подсвечен сегодняшний день.

Пустое поле показывает серый placeholder (по умолчанию `DD / MM / YYYY`), как у обычных текстовых полей; символы маски появляются по мере ввода. Текст задаётся пропом **`placeholder`**.

## Превью

<ComponentDocsPreview name="dateInput" />

## Импорт

```tsx
import { DateInput } from '@v-lab/ui-kit/date'
```

Подробности peers — в [Установке](/guide/installation).

## Пример

Для отправки на API удобно **`valueFormat="iso"`** — в **`onChange`** / **`onAccept`** приходит **`YYYY-MM-DD`**.

```tsx
import { useState } from 'react'
import { DateInput } from '@v-lab/ui-kit/date'

export function BirthDateField() {
  const [value, setValue] = useState('')
  return (
    <DateInput
      label="Дата рождения"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      valueFormat="iso"
      placeholder="ДД.ММ.ГГГГ"
    />
  )
}
```

## Устройство пропсов

База — **[InputField](./input-field)** и маскированный ввод с календарём (peer **`imask`** / **`react-imask`**). Импорт только из **`@v-lab/ui-kit/date`**.

### Значение и формат

| Проп                      | Описание                                                                                                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`value`**               | Контролируемое значение: при **`valueFormat: 'iso'`** — строка **`YYYY-MM-DD`** или **`''`**; внутри поля по-прежнему маска «ДД / ММ / ГГГГ»                                                              |
| **`valueFormat`**         | **`masked`** (по умолчанию) — в **`onChange`** строка как в маске; **`iso`** — в **`onChange`** / при полной дате **`YYYY-MM-DD`** для форм и API                                                         |
| **`onChange`**            | Нативный **`ChangeEvent`**; смысл **`event.target.value`** зависит от **`valueFormat`** (см. JSDoc в типах)                                                                                               |
| **`onAccept`**            | Вызывается, когда маска приняла полное значение или дата выбрана в календаре; формат строки — по **`valueFormat`**                                                                                        |
| **`locale`**              | Локаль календаря (**`CalendarLocale`**)                                                                                                                                                                   |
| **`getDotDays`**          | Подсветка точками дней в сетке: **`(date: Date) => boolean`**                                                                                                                                             |
| **`calendarButtonLabel`** | Доступное имя кнопки календаря (и диалога, если нет **`label`**); по умолчанию — подпись поля. Кнопка открывает диалог с фокусом на дне, **Alt+↓** в поле — тоже; **Escape** закрывает и возвращает фокус |

Остальное — поля **InputField** (**`label`**, **`hint`**, **`error`**, **`size`**, …) и атрибуты ввода по типу.

### Полный тип

**`DateInputProps`**, **`DateInputValueFormat`** — **`DateInput.types.ts`**.

Исходники: `src/components/inputs/DateInput/`.
