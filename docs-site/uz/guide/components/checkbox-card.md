---
title: CheckboxCard
description: Tavsif va prefix / tag slotlari bilan katta kartochka-belgilash qutisi.
---

# CheckboxCard

Qo‘shimcha matn va ikonka (**`prefix`**) bilan opsiyalar ro‘yxati uchun variant.

## Preview

<ComponentDocsPreview name="checkboxCard" />

## Import

```tsx
import { CheckboxCard } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { RiUserLine } from '@remixicon/react'
import { CheckboxCard } from '@v-lab/ui-kit'

export function PlanCard() {
  return (
    <CheckboxCard
      label="Pro tarif"
      description="Kengaytirilgan funksiyalar va qo‘llab-quvvatlash."
      prefix={<RiUserLine size={24} aria-hidden />}
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`CheckboxCardProps`**: **`Checkbox`** + **`prefix`**, **`label`**, **`description`**, **`tag`**, **`sublabel`**, …

Manbalar: `src/components/inputs/Checkbox/CheckboxCard/` · `Checkbox.types.ts`.
