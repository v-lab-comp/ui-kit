---
title: EmailInput
description: Поле email с иконкой и проверкой формата при blur.
---

# EmailInput

Связка **`InputField`** + **`BaseInput`**, префикс почты и валидация по умолчанию (**`validationMessage`**).

## Превью

<ComponentDocsPreview name="emailInput" />

## Импорт

```tsx
import { EmailInput } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useState } from 'react'
import { EmailInput } from '@v-lab/ui-kit'

export function EmailField() {
  const [value, setValue] = useState('')
  return (
    <EmailInput
      label="Email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="name@example.com"
      hint="Проверка формата при потере фокуса."
    />
  )
}
```

## Устройство пропсов

Как у **[TextInput](./text-input)**: **[InputField](./input-field)** + **[BaseInput](./base-input)** с тем же исключением полей в типе.

### Специфика EmailInput

| Проп                    | Тип                 | Описание                                                                                                                      |
| ----------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **`validationMessage`** | `string` (optional) | Текст ошибки под полем при невалидном email **на blur**. Если не задан — используется сообщение по умолчанию из кода (англ.). |

Остальные пропсы — как у текстового поля: подпись, **`hint`**, **`error`**, префиксы, атрибуты **`<input>`** (`value`, `onChange`, `placeholder`, `name`, `autoComplete` …).

### Полный тип

**`EmailInputProps`** — **`EmailInput.types.ts`**.

Исходники: `src/components/inputs/EmailInput/`.
