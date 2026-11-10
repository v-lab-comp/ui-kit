---
title: Box
description: Generic container — like Components/Box in Storybook.
---

# Box

A neutral `<div>` wrapper with no styling of its own: `Box` has no `vl-*` class and no skin styles — spacing, background and typography come from your `className` / `style` (using design-system tokens).

## Preview

<ComponentDocsPreview name="box" />

## Import

```tsx
import { Box } from '@v-lab/ui-kit'
```

## Example

```tsx
import { Box } from '@v-lab/ui-kit'

export function CardLikeBox() {
  return (
    <Box>
      <p>Arbitrary content inside Box.</p>
    </Box>
  )
}
```

## Main props

**`BoxProps`** matches **`HTMLAttributes<HTMLDivElement>`**: any valid `<div>` props — **`children`**, **`className`**, **`style`**, **`onClick`**, **`role`**, **`aria-*`**, **`data-*`**, etc.

Full type — **`BoxProps`**.

Sources: `src/components/Box/`.
