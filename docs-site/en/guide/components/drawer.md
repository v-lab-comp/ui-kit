---
title: Drawer
description: Slide-in panel from any screen edge — with focus trap, overlay stack and mobile bottom-sheet.
---

# Drawer

**`Drawer`** — a panel that slides in from any screen edge. Same infrastructure as `Modal`: portal in `body`, focus trap (`FloatingFocusManager`), Escape / backdrop close, scroll lock, overlay stack via `ModalProvider`.

Open via **`ref`** (`DrawerHandle.open()` / `close()`) or controlled mode (`open` + `onOpenChange`). On mobile (≤ 640 px) with `mobileBottom` enabled (default) the panel always slides up from the bottom regardless of `side`.

```text
Drawer                 ← backdrop + panel + focus trap
├── DrawerHeader       ← title, subtitle, icon, close button
├── DrawerBody         ← scrollable content area
└── DrawerFooter       ← action buttons; startContent — left slot
```

## Preview

<ComponentDocsPreview name="drawer" />

## Import

```tsx
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, type DrawerHandle } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useRef } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  type DrawerHandle,
} from '@v-lab/ui-kit'

export function InviteUserDrawer() {
  const drawerRef = useRef<DrawerHandle>(null)

  return (
    <>
      <Button onClick={() => drawerRef.current?.open()}>Invite user</Button>

      <Drawer ref={drawerRef} size="md">
        <DrawerHeader title="New user" subtitle="Fill in the details" />
        <DrawerBody>{/* content */}</DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => drawerRef.current?.close()}>
            Cancel
          </Button>
          <Button>Save</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
```

## Controlled mode

```tsx
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen} side="right">
  {/* ... */}
</Drawer>
```

## Drawer props

| Prop                   | Type                                     | Default  | Description                                  |
| ---------------------- | ---------------------------------------- | -------- | -------------------------------------------- |
| `side`                 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Which edge the panel slides in from          |
| `mobileBottom`         | `boolean`                                | `true`   | On ≤ 640 px always slide up from the bottom  |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl'`           | `'md'`   | Preset size (360 / 440 / 560 / 720 px)       |
| `width`                | `number \| string`                       | —        | Custom width/height (overrides `size`)       |
| `open`                 | `boolean`                                | —        | Controlled open state                        |
| `onOpenChange`         | `(open: boolean) => void`                | —        | Called when open state changes               |
| `closeOnBackdropClick` | `boolean`                                | `true`   | Close on backdrop click                      |
| `hideBackdrop`         | `boolean`                                | `false`  | Hide the backdrop overlay                    |
| `animationDuration`    | `number`                                 | `280`    | Animation duration in ms                     |
| `zIndex`               | `number`                                 | —        | Manual z-index (use `ModalProvider` instead) |
| `ariaLabel`            | `string`                                 | —        | `aria-label` for the panel (when no title)   |

## DrawerHeader props

| Prop              | Type        | Default | Description                              |
| ----------------- | ----------- | ------- | ---------------------------------------- |
| `title`           | `string`    | —       | Main heading                             |
| `subtitle`        | `string`    | —       | Secondary line below title               |
| `icon`            | `ReactNode` | —       | Icon to the left of title                |
| `hideCloseButton` | `boolean`   | `false` | Hide the × button                        |
| `closeOnly`       | `boolean`   | `false` | Render only the × button (no title area) |

## DrawerFooter props

| Prop           | Type        | Default | Description                              |
| -------------- | ----------- | ------- | ---------------------------------------- |
| `children`     | `ReactNode` | —       | Right-aligned action buttons             |
| `startContent` | `ReactNode` | —       | Left-aligned slot (e.g. "Delete" button) |
| `fullWidth`    | `boolean`   | `false` | Stretch buttons to full width            |

## DrawerHandle (ref)

```tsx
const ref = useRef<DrawerHandle>(null)
ref.current?.open()
ref.current?.close()
```

## Overlay stack

With **`ModalProvider`** multiple drawers and modals get increasing z-index and correct Escape order. Without it a single drawer still works fine.

```tsx
import { ModalProvider } from '@v-lab/ui-kit'
;<ModalProvider>
  <App />
</ModalProvider>
```
