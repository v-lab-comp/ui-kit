---
title: TextInput
description: Yorliq, maslahat va xato bilan bir qatorli matn maydoni.
---

# TextInput

Standart input **`InputField`** + **`BaseInput`** bog‘lanishida: **`label`**, **`hint`**, **`error`**, **`prefix`** / **`suffix`**, **`size`** o‘lchamlari.

## Preview

<ComponentDocsPreview name="textInput" />

## Import

```tsx
import { TextInput } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useState } from 'react'
import { TextInput } from '@v-lab/ui-kit'

export function NameField() {
  const [value, setValue] = useState('')
  return (
    <TextInput
      label="Ism"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Ismni kiriting"
    />
  )
}
```

## Proplar tuzilishi

**`TextInput`** **[InputField](/uz/guide/components/input-field)** va **[BaseInput](/uz/guide/components/base-input)** dan tashkil topadi. **`TextInputProps`**:

1. **`children`** bundan mustasno **InputField** proplari: **`label`**, **`hint`**, **`error`**, **`prefix`**, **`suffix`**, **`startBlock`**, **`endBlock`**, **`size`**, **`disabled`**, **`id`**, **`required`**, **`optional`**, **`labelTooltip`**, **`className`** — InputField jadvaliga qarang.
2. **`<input>`** atributlari (**`BaseInputProps`**, **`prefix`**, **`size`**, **`id`**, **`disabled`**, **`className`** istisnosi bilan).

**`hasError`**, **`size`**, **`id`**, **`disabled`** **`InputField`** bilan mos ravishda ulanadi.

**`completed`** va **`completedColor`** — **[InputField](/uz/guide/components/input-field#input-completed)** dan (preview va jadval u yerda).

### Tez-tez ishlatiladigan `<input>` atributlari

| Atribut                                                                                                          | Maqsad                                   |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **`value`** / **`defaultValue`**                                                                                 | Boshqariladigan yoki boshlang‘ich qiymat |
| **`onChange`**                                                                                                   | Qiymat o‘zgarishi                        |
| **`placeholder`**                                                                                                | Bo‘sh maydondagi matn                    |
| **`name`**                                                                                                       | Forma maydoni nomi                       |
| **`autoComplete`**, **`inputMode`**, **`maxLength`**, **`minLength`**, **`readOnly`**, **`pattern`**, **`step`** | HTML standart xatti-harakati             |

To‘liq ro‘yxat — tiplardagi **`InputHTMLAttributes<HTMLInputElement>`** (yuqoridagi istisnolar bilan).

### To‘liq tip

**`TextInputProps`** — **`TextInput.types.ts`**.

Manbalar: `src/components/inputs/TextInput/`.
