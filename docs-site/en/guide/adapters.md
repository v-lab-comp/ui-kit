---
title: React Hook Form adapters
description: Entry @v-lab/ui-kit/adapters — RHFTextInput, RHFTagInput and RHFCheckbox on top of Controller.
---

# React Hook Form adapters

A separate entry **`@v-lab/ui-kit/adapters`** so apps without **`react-hook-form`** do not pull it in transitively from the main bundle.

## Peer dependency

You need **`react-hook-form`** (version — see **`peerDependencies`** in the package’s `package.json`). In **`peerDependenciesMeta`** it is marked **optional**: the main package installs without RHF; adapters are used only when **`react-hook-form`** is already in the project.

Install:

```bash
npm install react-hook-form
```

## Exports

| Component          | Wraps               | Purpose                                                                         |
| ------------------ | ------------------- | ------------------------------------------------------------------------------- |
| **`RHFTextInput`** | **`TextInput`**     | Text field: **`value`**, error from **`fieldState`**                            |
| **`RHFTagInput`**  | **`TagInput`**      | Tag array: **`value`** as **`TagInputTagValue[]`**, error from **`fieldState`** |
| **`RHFCheckbox`**  | **`CheckboxField`** | Checkbox with **`checked`** bound to field value                                |

Types: **`RHFTextInputProps<T>`**, **`RHFTagInputProps<T>`**, **`RHFCheckboxProps<T>`** — **`UseControllerProps<T>`** plus wrapped component props without conflicting fields (`value` / `name`, etc.; see sources).

## Import

```tsx
import { RHFTextInput, RHFTagInput, RHFCheckbox } from '@v-lab/ui-kit/adapters'
```

## Example

```tsx
import { useForm } from 'react-hook-form'
import { RHFTextInput } from '@v-lab/ui-kit/adapters'

type Form = { email: string }

export function LoginFields() {
  const { control } = useForm<Form>({ defaultValues: { email: '' } })
  return <RHFTextInput control={control} name="email" label="Email" />
}
```

Interactive demos and more scenarios — in Storybook: **`Adapters/RHFTextInput`**, **`Adapters/RHFCheckbox`**, **`Adapters/RHFTagInput`**.

The generic factory **`createRHFAdapter`** lives in **`src/adapters/rhf/createRHFAdapter.tsx`** (for extensions inside the monorepo / forks).
