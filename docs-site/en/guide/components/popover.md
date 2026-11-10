---
title: Popover
description: Floating panel anchored to an element (Floating UI), portal to document.body.
---

# Popover

**`Popover`** positions arbitrary **`children`** relative to an anchor (**`anchorRef`**). Open/close is controlled externally (**`open`**); the component only renders the layer in a portal when **`open === true`**.

## Preview

<ComponentDocsPreview name="popover" />

## Import

```tsx
import { Popover } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useRef, useState } from 'react'
import { Popover } from '@v-lab/ui-kit'

export function AnchoredMenu() {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button ref={anchorRef} type="button" onClick={() => setOpen((v) => !v)}>
        Menu
      </button>
      <Popover open={open} anchorRef={anchorRef} placement="bottom" offset={8}>
        <div>Popover content</div>
      </Popover>
    </div>
  )
}
```

Outside click, Escape, and focus management should be wired in the app (or wrap with a layer using **`useDismiss`**).

## Props (`PopoverProps`)

Positioning uses Floating UI; **`placement`** accepts the full **`Placement`** type (e.g. **`bottom-start`**, **`top-end`**, …).

| Prop            | Type                             | Description                                      |
| --------------- | -------------------------------- | ------------------------------------------------ |
| **`open`**      | `boolean`                        | Panel mounts only when **`true`**                |
| **`anchorRef`** | **`RefObject<Element \| null>`** | DOM anchor element                               |
| **`placement`** | **`Placement`** (optional)       | Relative placement                               |
| **`offset`**    | `number` (optional)              | Gap between anchor and panel (px), default **6** |
| **`children`**  | **`ReactNode`**                  | Panel content                                    |
| **`className`** | `string` (optional)              | Root class on the floating layer                 |
| **`style`**     | **`CSSProperties`** (optional)   | Inline styles on the panel                       |
| **`zIndex`**    | `number` (optional)              | Override stacking                                |

Sources: `src/components/overlays/Popover/` · `Popover.types.ts`.
