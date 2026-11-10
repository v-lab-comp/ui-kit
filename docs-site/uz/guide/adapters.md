---
title: react-hook-form adapterlari
description: Entry @v-lab/ui-kit/adapters — RHFTextInput, RHFTagInput va RHFCheckbox Controller ustida.
---

# react-hook-form adapterlari

Alohida entry **`@v-lab/ui-kit/adapters`**: **`react-hook-form`** bo‘lmagan ilovalar asosiy bundlda uni tranzitiv tortmasin.

## Peer-bog‘liqlik

**`react-hook-form`** kerak (versiya — paket `package.json` faylidagi **`peerDependencies`** qismiga qarang). **`peerDependenciesMeta`** da u **ixtiyoriy** deb belgilanadi: asosiy paket RHF siz o‘rnatiladi, adapterlar esa loyihada **`react-hook-form`** allaqachon bo‘lganda.

O‘rnatish:

```bash
npm install react-hook-form
```

## Eksport

| Komponent          | Nimani o‘raydi      | Vazifasi                                                                          |
| ------------------ | ------------------- | --------------------------------------------------------------------------------- |
| **`RHFTextInput`** | **`TextInput`**     | Matn maydoni: **`value`**, **`fieldState`** dan xato                              |
| **`RHFTagInput`**  | **`TagInput`**      | Teglar massivi: **`value`** — **`TagInputTagValue[]`**, xato **`fieldState`** dan |
| **`RHFCheckbox`**  | **`CheckboxField`** | **`checked`** maydon qiymatidan kelib chiqadigan belgilash qutisi                 |

Turlar: **`RHFTextInputProps<T>`**, **`RHFTagInputProps<T>`**, **`RHFCheckboxProps<T>`** — **`UseControllerProps<T>`** va o‘ralgan komponentning to‘qnashuvchi maydonlari bo‘lmagan proplari (`value` / `name` va hokazo, manbalarga qarang).

## Import

```tsx
import { RHFTextInput, RHFTagInput, RHFCheckbox } from '@v-lab/ui-kit/adapters'
```

## Misol

```tsx
import { useForm } from 'react-hook-form'
import { RHFTextInput } from '@v-lab/ui-kit/adapters'

type Form = { email: string }

export function LoginFields() {
  const { control } = useForm<Form>({ defaultValues: { email: '' } })
  return <RHFTextInput control={control} name="email" label="Email" />
}
```

Interaktivlik va qo‘shimcha ssenariylar — Storybook’da: **`Adapters/RHFTextInput`**, **`Adapters/RHFCheckbox`**, **`Adapters/RHFTagInput`**.

Umumiy o‘rama fabrikasi — **`createRHFAdapter`** (**`src/adapters/rhf/createRHFAdapter.tsx`**) — monorepo / fork ichida kengaytirish uchun.
