---
title: Checkbox
description: Pastki darajali belgilash qutisi — maydon yorlig‘isiz BaseCheckbox o‘ramasi.
---

# Checkbox

**`Checkbox`** eksporti — bu **`BaseCheckbox`**: bitta uslubli o‘lchamdagi **`input type="checkbox"`**. Primitiv uchun alohida sahifa — [**BaseCheckbox**](/uz/guide/components/base-checkbox). Yorliq va xatolar — [**CheckboxField**](/uz/guide/components/checkbox-field) yoki [**CheckboxCard**](/uz/guide/components/checkbox-card) kartochka variantida.

## Preview

<ComponentDocsPreview name="checkbox" />

## Import

```tsx
import { Checkbox } from '@v-lab/ui-kit'
```

Odatda **`CheckboxField`** / **`CheckboxCard`** qulayroq — [Kiritish maydonlari](/uz/guide/components/inputs/) bo‘limidagi qo‘shni sahifalarga qarang.

## Misol

Mavjudlik: **`aria-label`** bering yoki **`id`** orqali yorliq bilan bog‘lang.

```tsx
import { Checkbox } from '@v-lab/ui-kit'

export function RawCheckbox() {
  return <Checkbox defaultChecked aria-label="Ma’lumotlarni qayta ishlashga rozilik" />
}
```

## Asosiy proplar

To‘liq tip — **`CheckboxProps`** (= **`BaseCheckboxProps`**): **`input type="checkbox"`** atributlari, **`size`**, **`indeterminate`**, **`className`**, … Batafsil — [**BaseCheckbox**](/uz/guide/components/base-checkbox).

Manbalar: `src/components/inputs/Checkbox/Checkbox.tsx` · turlar — `Checkbox.types.ts`.
