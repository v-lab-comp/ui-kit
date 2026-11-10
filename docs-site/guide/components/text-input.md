---
title: TextInput
description: Однострочное текстовое поле с подписью, подсказкой и ошибкой.
---

# TextInput

Стандартный инпут на связке **`InputField`** + **`BaseInput`**: **`label`**, **`hint`**, **`error`**, **`prefix`** / **`suffix`**, размеры **`size`**.

## Превью

<ComponentDocsPreview name="textInput" />

## Импорт

```tsx
import { TextInput } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useState } from 'react'
import { TextInput } from '@v-lab/ui-kit'

export function NameField() {
  const [value, setValue] = useState('')
  return (
    <TextInput
      label="Имя"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Введите имя"
    />
  )
}
```

## Устройство пропсов

**`TextInput`** собирает **[InputField](./input-field)** и **[BaseInput](./base-input)**. Публичный тип **`TextInputProps`** объединяет:

1. Пропсы **InputField**, кроме **`children`** (слот заполняется внутри компонента): **`label`**, **`hint`**, **`error`**, **`prefix`**, **`suffix`**, **`startBlock`**, **`endBlock`**, **`size`**, **`disabled`**, **`id`**, **`required`**, **`optional`**, **`labelTooltip`**, **`className`** — см. таблицу на странице InputField.
2. Атрибуты **`<input>`** (тип **`BaseInputProps`** с исключениями **`prefix`**, **`size`**, **`id`**, **`disabled`**, **`className`** — эти роли выполняет оболочка поля).

Внутри **`BaseInput`** автоматически передаются **`hasError`** (из **`error`**) и **`size`** / **`id`** / **`disabled`** согласованно с **`InputField`**.

Рамка «заполненного шага»: пропы **`completed`** и **`completedColor`** приходят из **[InputField](./input-field#input-completed)** (см. превью и таблицу там).

### Частые атрибуты ввода

| Атрибут                                                                                                          | Назначение                            |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **`value`** / **`defaultValue`**                                                                                 | Контролируемое или начальное значение |
| **`onChange`**                                                                                                   | Смена значения                        |
| **`placeholder`**                                                                                                | Текст в пустом поле                   |
| **`name`**                                                                                                       | Имя в форме                           |
| **`autoComplete`**, **`inputMode`**, **`maxLength`**, **`minLength`**, **`readOnly`**, **`pattern`**, **`step`** | Стандартное поведение HTML            |

Полный перечень — **`InputHTMLAttributes<HTMLInputElement>`** в типах (минус исключения выше).

### Полный тип

**`TextInputProps`** — **`TextInput.types.ts`**.

Исходники: `src/components/inputs/TextInput/`.
