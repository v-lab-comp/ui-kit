---
title: BaseInput
description: Низкоуровневый input без подписи — строительный блок для своих полей.
---

# BaseInput

Только **`input`** с размерами и состояниями (**`hasError`**, **`disabled`**). Обычно оборачивают в **`InputField`** (см. [Поля ввода — обзор](./inputs/)) или используют готовые [**TextInput**](./text-input), [**EmailInput**](./email-input) и т.д.

## Превью

<ComponentDocsPreview name="baseInput" />

## Импорт

```tsx
import { BaseInput } from '@v-lab/ui-kit'
```

## Пример

В продакшене чаще используют [**TextInput**](./text-input) или обёртку **`InputField`** — здесь минимальный контролируемый ввод.

```tsx
import { useState } from 'react'
import { BaseInput } from '@v-lab/ui-kit'

export function PlainInput() {
  const [value, setValue] = useState('')
  return (
    <BaseInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Введите текст"
      aria-label="Демо без подписи"
      size="medium"
    />
  )
}
```

## Пропсы (`BaseInputProps`)

Расширяет **`InputHTMLAttributes<HTMLInputElement>`** с заменой **`size`**:

| Проп           | Тип                                      | Описание                                                               |
| -------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| **`size`**     | **`big`** \| **`medium`** \| **`small`** | Высота: **40** / **36** / **32** px (семантика токенов)                |
| **`hasError`** | `boolean`                                | Красная обводка (обычно из **`error`** родительского **`InputField`**) |

Все прочие атрибуты — как у нативного **`<input>`**: **`value`**, **`defaultValue`**, **`onChange`**, **`placeholder`**, **`name`**, **`type`**, **`disabled`**, **`readOnly`**, **`autoComplete`**, **`inputMode`**, **`maxLength`**, **`min`**, **`max`**, **`step`**, **`pattern`**, **`aria-*`**, …

Если **`autoComplete`** не передан, по умолчанию подставляется **`"off"`** (см. обзор [**Поля ввода → Автозаполнение**](./inputs/)).

С **`InputField`** используйте паттерн **`children={(id) => <BaseInput id={id} hasError={!!error} ... />}`** — см. [InputField](./input-field).

### Полный тип

**`BaseInputProps`**, **`BASE_INPUT_SIZE_OPTIONS`** — **`BaseInput.types.ts`**.

Исходники: `src/components/inputs/base/BaseInput/`.
