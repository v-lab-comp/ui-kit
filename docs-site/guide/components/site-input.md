---
title: SiteInput
description: Составное поле URL — протокол и путь, скрытые поля формы через useCompositeInput.
---

# SiteInput

Селектор протокола (**`protocolOptions`** + **`SelectInput variant="inline"`**) и строка пути; значение для формы — полная строка URL.

**`completed`** / **`completedColor`** дублируются на селектор протокола и на основную оболочку — см. **[InputField](./input-field#input-completed)**.

## Превью

<ComponentDocsPreview name="siteInput" />

## Импорт

```tsx
import { SiteInput } from '@v-lab/ui-kit'
```

## Пример

Полное значение в форме — строка **`https://…`** (протокол + путь); при **`protocolOptions`** показывается выбор схемы.

```tsx
import { useState } from 'react'
import { SiteInput } from '@v-lab/ui-kit'

const PROTOCOL_OPTIONS = [
  { value: 'https://', shortLabel: 'https://', label: 'HTTPS' },
  { value: 'http://', shortLabel: 'http://', label: 'HTTP' },
]

export function WebsiteField() {
  const [value, setValue] = useState('https://')
  return (
    <SiteInput
      label="Сайт"
      protocolOptions={PROTOCOL_OPTIONS}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="www.example.com"
    />
  )
}
```

## Устройство пропсов

Составное поле URL: протокол + путь в одной строке значения для формы. Внутри используется **[useCompositeInput](/guide/hooks/use-composite-input)** (скрытые поля при необходимости).

| Проп                    | Описание                                                                                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`protocol`**          | Статичный префикс протокола (по умолчанию **`https://`**). Игнорируется, если задан **`protocolOptions`**                                                                                                          |
| **`protocolOptions`**   | Список **`SelectOptionWithShortLabel`**: выбор схемы через **`SelectInput variant="inline"`** в начале поля; каждый **`value`** — строка протокола (**`https://`**, **`http://`**, …), **`shortLabel`** обязателен |
| **`protocolAriaLabel`** | Доступное имя селектора протокола. По умолчанию — **`label`** поля (через **`aria-labelledby`**), без **`label`** — **`label`** выбранной опции                                                                    |

Остальное — как у **[TextInput](./text-input)**: **[InputField](./input-field)** без слота **`startBlock`** (занят под протокол; **`endBlock`**, **`wrapperClassName`**, **`wrapperStyle`** уходят в оболочку) + атрибуты пути в **`BaseInput`**. Селектор протокола — **combobox** с клавиатурой как у **[SelectInput](./select-input#клавиатура-и-доступность)**.

### Полный тип

**`SiteInputProps`** — **`SiteInput.types.ts`**.

Исходники: `src/components/inputs/SiteInput/`.
