---
title: Box
description: Universial konteyner — Storybook Components/Box kabi.
---

# Box

O‘z bezagi bo‘lmagan neytral `<div>` o‘rami: `Box` da `vl-*` sinfi va skin uslublari yo‘q — chekinishlar, fon va tipografikani sizning `className` / `style` ingiz beradi (dizayn tizimi tokenlari orqali).

## Preview

<ComponentDocsPreview name="box" />

## Import

```tsx
import { Box } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { Box } from '@v-lab/ui-kit'

export function CardLikeBox() {
  return (
    <Box>
      <p>Box ichidagi ixtiyoriy kontent.</p>
    </Box>
  )
}
```

## Asosiy proplar

**`BoxProps`** **`HTMLAttributes<HTMLDivElement>`** bilan mos: `<div>` uchun yaroqli har qanday proplar — **`children`**, **`className`**, **`style`**, **`onClick`**, **`role`**, **`aria-*`**, **`data-*`** va boshqalar.

To‘liq tip — **`BoxProps`**.

Manbalar: `src/components/Box/`.
