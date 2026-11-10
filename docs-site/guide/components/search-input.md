---
title: SearchInput
description: Поле поиска с иконкой в префиксе.
---

# SearchInput

Текстовое поле со стилем поиска (**иконка слева** по умолчанию).

## Превью

<ComponentDocsPreview name="searchInput" />

## Импорт

```tsx
import { SearchInput } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useState } from 'react'
import { SearchInput } from '@v-lab/ui-kit'

export function SearchField() {
  const [value, setValue] = useState('')
  return (
    <SearchInput
      label="Поиск"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Запрос…"
    />
  )
}
```

## Устройство пропсов

Как у **[TextInput](./text-input)**: **[InputField](./input-field)** + поле поиска с иконкой по умолчанию.

### Горячая клавиша фокуса

| Проп                   | Тип                  | Описание                                                                                                                                                                                                                         |
| ---------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`shortcut`**         | **`ShortcutConfig`** | **`key`** — символ клавиши (например **`"k"`**); **`mac`** — модификатор на macOS (**`cmd`** \| **`cmd+shift`**); **`win`** — на Win/Linux (**`ctrl`** \| **`ctrl+shift`**). По умолчанию на Mac: ⌘+key, на остальных: ⇧Ctrl+key |
| **`shortcutPriority`** | `number`             | Если несколько **`SearchInput`** делят одну комбинацию — фокус получает поле с **большим** приоритетом (по умолчанию **0**)                                                                                                      |

Без **`shortcut`** поле ведёт себя как обычное текстовое с префиксом поиска.

### Полный тип

**`SearchInputProps`** — **`SearchInput.types.ts`**.

Исходники: `src/components/inputs/SearchInput/`.
