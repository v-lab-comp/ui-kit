---
title: Tooltip
description: Hover bo‘yicha chiqadigan maslahat, pozitsiyalash bilan (Floating UI).
---

# Tooltip

**`Tooltip`** bitta bola elementni (**`children`**) o‘raydi va **`content`** ni ko‘rsatadi. Standart kechikish **300** ms; **`placement`** bilan joylashuv beriladi.

Bola element proplar/ref uzatishni qo‘llab-quvvatlashi kerak (tabiiy **`button`** yoki **`forwardRef`** li element).

## Preview

<ComponentDocsPreview name="tooltip" />

## Import

```tsx
import { Tooltip } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { Tooltip } from '@v-lab/ui-kit'

export function HintButton() {
  return (
    <Tooltip content="Qisqa maslahat" placement="top">
      <button type="button">Kursorni olib keling</button>
    </Tooltip>
  )
}
```

## Asosiy proplar

| Prop        | Tip                                      | Tavsif                         |
| ----------- | ---------------------------------------- | ------------------------------ |
| `content`   | `ReactNode`                              | Maslahat matni yoki razmetka   |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | Element tomoni, standart `top` |
| `delay`     | `number`                                 | Ko‘rsatish kechikishi (ms)     |
| `zIndex`    | `number` (ixtiyoriy)                     | Maslahat qatlami z-index       |

Manbalar: `src/components/overlays/Tooltip/`.
