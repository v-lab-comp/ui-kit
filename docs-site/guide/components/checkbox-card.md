---
title: CheckboxCard
description: Крупная карточка-чекбокс с описанием и слотами prefix / tag.
---

# CheckboxCard

Вариант для списков опций с дополнительным текстом и иконкой (**`prefix`**).

## Превью

<ComponentDocsPreview name="checkboxCard" />

## Импорт

```tsx
import { CheckboxCard } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { RiUserLine } from '@remixicon/react'
import { CheckboxCard } from '@v-lab/ui-kit'

export function PlanCard() {
  return (
    <CheckboxCard
      label="Тариф Pro"
      description="Расширенные функции и поддержка."
      prefix={<RiUserLine size={24} aria-hidden />}
    />
  )
}
```

## Основные пропсы

Полный тип — **`CheckboxCardProps`**: **`Checkbox`** + **`prefix`**, **`label`**, **`description`**, **`tag`**, **`sublabel`**, …

Исходники: `src/components/inputs/Checkbox/CheckboxCard/` · `Checkbox.types.ts`.
