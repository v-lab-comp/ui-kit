---
title: useClickOutside
description: Handle clicks outside a given DOM node — like reactuse.org, simplified API (ref + callback).
---

# useClickOutside

Handles clicks **outside** the target element: a **`document`** listener in the bubbling phase (`click`). If **`event.target`** is not contained in **`ref.current`**, the callback runs. Use it for dropdowns and auxiliary close behavior without [`useDismiss`](https://floating-ui.com/docs/useDismiss) from Floating UI.

Conceptually similar to [useClickOutside from ReactUse](https://reactuse.org/functions/hooks/useClickOutside), but the API is consistent: always **`ref`**, then **`callback`**, and optionally **`enabled`**. The callback is stored in **`useRef`** so the listener is not removed on every render.

## Installation

The hook ships with the main package — no separate install (how to add the kit: [Installation](../installation)).

```tsx
import { useClickOutside } from '@v-lab/ui-kit'
```

## Usage

Minimal usage:

```tsx
const ref = useRef<HTMLDivElement>(null)

useClickOutside(ref, (event) => {
  console.log('click outside', event)
})
```

A common pattern is closing an overlay only when it is open (third argument **`enabled`**):

```tsx
useClickOutside(ref, () => setOpen(false), open)
```

## Demo

Interactive preview (same mechanism as component docs):

<ComponentDocsPreview name="hookClickOutside" />

## API

### Parameters

| Name             | Type                          | Default | Description                                                                         |
| ---------------- | ----------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `ref`            | `RefObject<T \| null>`        | —       | Root element: clicks **inside** are not treated as outside (`Element.contains`).    |
| `onClickOutside` | `(event: MouseEvent) => void` | —       | Called when the click happens outside `ref.current`.                                |
| `enabled`        | `boolean`                     | `true`  | If `false`, no listener is attached on `document` (handy when the panel is closed). |

### Returns

`void`

### Behavior

- Event: **`click`** on **`document`** only (not `mousedown`).
- The target is compared to **`ref.current`** at event time; **`capture`** is not used.

## Source code

Implementation in the repo: `src/hooks/dom/useClickOutside.ts`.
