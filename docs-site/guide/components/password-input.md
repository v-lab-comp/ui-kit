---
title: PasswordInput
description: Поле пароля с переключателем видимости.
---

# PasswordInput

Настраиваемые **`prefix`** / **`suffix`**; по умолчанию суффикс показывает/скрывает пароль.

## Превью

<ComponentDocsPreview name="passwordInput" />

## Импорт

```tsx
import { PasswordInput } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useState } from 'react'
import { PasswordInput } from '@v-lab/ui-kit'

export function PasswordField() {
  const [value, setValue] = useState('')
  return (
    <PasswordInput
      label="Пароль"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Введите пароль"
    />
  )
}
```

## Устройство пропсов

Как у **[TextInput](./text-input)**: **[InputField](./input-field)** + **[BaseInput](./base-input)**.

### Специфика PasswordInput

| Особенность           | Описание                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| **`type`**            | Зафиксирован как **`password`** внутри компонента; проп **`type`** из типа **исключён**             |
| **Префикс / суффикс** | По умолчанию суффикс переключает видимость пароля; можно переопределить **`prefix`** / **`suffix`** |

Наследуются **`label`**, **`hint`**, **`error`**, **`size`**, **`disabled`**, **`startBlock`**, **`endBlock`** и атрибуты ввода (**`value`**, **`onChange`**, **`placeholder`**, **`name`**, **`autoComplete="current-password"`** и т.д.).

### Полный тип

**`PasswordInputProps`** — **`PasswordInput.types.ts`**.

Исходники: `src/components/inputs/PasswordInput/`.
