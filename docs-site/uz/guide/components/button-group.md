---
title: ButtonGroup
description: Umumiy o‘lchamli tugma guruhi — Components/ButtonGroup.
---

# ButtonGroup

[**Button**](/uz/guide/components/button) larni guruhlaydi; **`size`** guruhdan bir marta beriladi.

## Preview

<ComponentDocsPreview name="buttonGroup" />

## Import

```tsx
import { ButtonGroup, Button } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { ButtonGroup, Button } from '@v-lab/ui-kit'

export function ToolbarButtons() {
  return (
    <ButtonGroup size="small">
      <Button variant="stroke" color="neutral">
        Orqaga
      </Button>
      <Button variant="stroke" color="neutral">
        Oldinga
      </Button>
      <Button variant="filled" color="primary">
        Tayyor
      </Button>
    </ButtonGroup>
  )
}
```

## Asosiy proplar

| Prop       | Tip                                             | Tavsif                                                 |
| ---------- | ----------------------------------------------- | ------------------------------------------------------ |
| `children` | `ReactNode`                                     | Bolalar **`Button`** — guruhdan **`size`** meros oladi |
| `size`     | **Button** dagi kabi (guruhda standart `small`) | Ichidagi barcha tugmalar uchun yagona o‘lcham          |

Qo‘shimcha o‘rama **`HTMLDivElement`** atributlari (**`className`**, **`style`**, **`role`** …).

To‘liq tip — **`ButtonGroupProps`**.

Manbalar: `src/components/ButtonGroup/`.
