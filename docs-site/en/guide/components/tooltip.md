---
title: Tooltip
description: Hover tooltip with positioning (Floating UI).
---

# Tooltip

**`Tooltip`** wraps a single child (**`children`**) and shows **`content`** on hover. Default delay **300** ms; position via **`placement`**.

The child must forward props/ref (native **`button`** or **`forwardRef`** element).

## Preview

<ComponentDocsPreview name="tooltip" />

## Import

```tsx
import { Tooltip } from '@v-lab/ui-kit'
```

## Example

```tsx
import { Tooltip } from '@v-lab/ui-kit'

export function HintButton() {
  return (
    <Tooltip content="Short hint text" placement="top">
      <button type="button">Hover me</button>
    </Tooltip>
  )
}
```

## Props (`TooltipProps`)

| Prop            | Type                       | Description                                                                                                            |
| --------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **`content`**   | **`ReactNode`**            | Tooltip body                                                                                                           |
| **`children`**  | **`ReactElement`**         | Exactly **one** trigger element; must accept **`ref`** and forwarded props (**`button`**, **`forwardRef`** components) |
| **`placement`** | **`Placement`** (optional) | Floating UI placement, default **`top`**                                                                               |
| **`delay`**     | `number` (optional)        | Show delay (ms), default **300**                                                                                       |
| **`zIndex`**    | `number` (optional)        | Layer **`z-index`** override                                                                                           |

Sources: `src/components/overlays/Tooltip/` · `Tooltip.types.ts`.
