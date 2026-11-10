---
title: CheckboxCard
description: Large checkbox card with description and prefix / tag slots.
---

# CheckboxCard

For option lists with extra text and an icon (**`prefix`**).

## Preview

<ComponentDocsPreview name="checkboxCard" />

## Import

```tsx
import { CheckboxCard } from '@v-lab/ui-kit'
```

## Example

```tsx
import { RiUserLine } from '@remixicon/react'
import { CheckboxCard } from '@v-lab/ui-kit'

export function PlanCard() {
  return (
    <CheckboxCard
      label="Pro plan"
      description="Advanced features and support."
      prefix={<RiUserLine size={24} aria-hidden />}
    />
  )
}
```

## Main props

Full type — **`CheckboxCardProps`**: **`Checkbox`** + **`prefix`**, **`label`**, **`description`**, **`tag`**, **`sublabel`**, …

Sources: `src/components/inputs/Checkbox/CheckboxCard/` · `Checkbox.types.ts`.
