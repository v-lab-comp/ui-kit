---
title: ShareLinkInput
description: Поле ссылки с действием копирования в суффиксе.
---

# ShareLinkInput

Готовый **`endBlock`** с копированием в буфер; колбэк **`onCopy`** при необходимости.

## Превью

<ComponentDocsPreview name="shareLinkInput" />

## Импорт

```tsx
import { ShareLinkInput } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useState } from 'react'
import { ShareLinkInput } from '@v-lab/ui-kit'

export function ShareField() {
  const [value, setValue] = useState('')
  return (
    <ShareLinkInput
      label="Ссылка"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="www.example.com/path"
    />
  )
}
```

## Устройство пропсов

Как у **[TextInput](./text-input)**, плюс блок копирования в **`endBlock`** / суффиксе (реализация в компоненте).

| Проп         | Тип                           | Описание                                                                                                     |
| ------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **`onCopy`** | **`(value: string) => void`** | Вызывается после **успешного** копирования текущего значения в буфер обмена; аргумент — скопированная строка |

Без **`onCopy`** кнопка копирования по-прежнему работает, но без дополнительной логики (тосты и т.д.).

### Полный тип

**`ShareLinkInputProps`** — **`ShareLinkInput.types.ts`**.

Исходники: `src/components/inputs/ShareLinkInput/`.
