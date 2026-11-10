---
title: BaseCheckbox
description: Pastki darajali input type="checkbox" — Checkbox va maxsus maydonlar uchun blok.
---

# BaseCheckbox

Uslublangan **`input type="checkbox"`**, **`indeterminate`** qo‘llab-quvvatlanadi. Odatda [**Checkbox**](./checkbox) (xuddi shu komponent) yoki [**CheckboxField**](./checkbox-field) / [**CheckboxCard**](./checkbox-card) orqali ishlatiladi.

## Ko‘rinish

<ComponentDocsPreview name="baseCheckbox" />

## Import

```tsx
import { BaseCheckbox, BASE_CHECKBOX_SIZE_OPTIONS } from '@v-lab/ui-kit'
```

## Misol

Ilovalarda ko‘pincha [**Checkbox**](./checkbox) import qilinadi; bu yerda yorliq yonida maxsus razmetka uchun **`BaseCheckbox`**.

```tsx
import { BaseCheckbox } from '@v-lab/ui-kit'

export function InlineConsent() {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <BaseCheckbox defaultChecked aria-label="Rozilik" />
      <span>Ma’lumotlarni qayta ishlashga rozilik</span>
    </label>
  )
}
```

**`indeterminate`** — daraxt yoki jadvalda qisman tanlov:

```tsx
<BaseCheckbox indeterminate aria-label="Qisman tanlov" />
```

## Asosiy prop lar

To‘liq tip — **`BaseCheckboxProps`**: **`input type="checkbox"`** uchun **`HTMLInputElement`** atributlari, qo‘shimcha **`size`** (**`medium`** \| **`small`**), **`indeterminate`**, **`className`**.

Manbalar: `src/components/inputs/base/BaseCheckbox/` · `BaseCheckbox.types.ts`.
