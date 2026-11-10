---
title: Toast
description: Toast notification — colors, sizes, actions; stack requires ToastProvider.
---

# Toast

Visual **`Toast`** and **`ToastAction`**. For **`useToast()`** and the queue, wrap the app in **`ToastProvider`** (Storybook and API docs).

## Preview

“Show toast” button (**`useToast`** inside **`ToastProvider`**) and one static toast like the example below.

<ComponentDocsPreview name="toast" />

## Import

```tsx
import { Toast, ToastAction, ToastProvider, useToast } from '@v-lab/ui-kit'
```

## Example

Static toast (as in docs preview):

```tsx
import { Toast, ToastAction } from '@v-lab/ui-kit'

export function InlineToast() {
  return (
    <Toast
      color="success"
      variant="light"
      size="large"
      title="Saved"
      description="Your changes have been applied."
      onClose={() => {}}
      actions={[
        <ToastAction key="undo" onClick={() => {}}>
          Undo
        </ToastAction>,
      ]}
    />
  )
}
```

In-app queue — **`ToastProvider`** and **`useToast()`**:

```tsx
import { ToastProvider, ToastAction, useToast } from '@v-lab/ui-kit'

function App() {
  return (
    <ToastProvider position="top-right" duration={5000}>
      <Page />
    </ToastProvider>
  )
}

function Page() {
  const toast = useToast()
  return (
    <button
      type="button"
      onClick={() =>
        toast.add('success', {
          title: 'Done',
          description: 'Operation completed.',
          actions: [<ToastAction key="ok">OK</ToastAction>],
        })
      }
    >
      Show toast
    </button>
  )
}
```

## Main props

### `Toast` (single toast)

| Prop          | Type                                                     | Description               |
| ------------- | -------------------------------------------------------- | ------------------------- |
| `title`       | `ReactNode`                                              | Title (required)          |
| `description` | `ReactNode`                                              | Subtitle                  |
| `color`       | `error` \| `warning` \| `success` \| `info` \| `neutral` | Semantic color            |
| `variant`     | `filled` \| `light` \| `lighter` \| `stroke`             | Fill style                |
| `size`        | `x-small` \| `small` \| `large`                          | Compact vs full card      |
| `actions`     | array of **`<ToastAction>`**                             | Action buttons            |
| `onClose`     | `() => void`                                             | Close via dismiss control |
| `icon`        | `ReactNode`                                              | Custom left icon          |

Plus **`HTMLAttributes<HTMLDivElement>`** without conflicting **`title`**. Type — **`ToastProps`**.

### `ToastProvider`

| Prop           | Type                | Default     | Description                              |
| -------------- | ------------------- | ----------- | ---------------------------------------- |
| `position`     | **`ToastPosition`** | `top-right` | Stack corner                             |
| `duration`     | `number`            | `5000`      | Auto-dismiss (ms), **0** = no auto-close |
| `offset`       | `number`            | `24`        | Edge offset (px)                         |
| `gap`          | `number`            | `12`        | Space between toasts                     |
| `maxToasts`    | `number`            | `5`         | Max visible                              |
| `pauseOnHover` | `boolean`           | `true`      | Pause timer on hover                     |
| `stacking`     | `boolean`           | `true`      | Stack with expand on hover               |

Types **`ToastConfig`** / provider are part of **`ToastProvider`**.

### `useToast()` → `toast.add(color, options)`

Second argument **`ToastAddOptions`**: **`title`**, **`description`**, **`variant`**, **`size`**, **`actions`**, **`icon`**, **`duration`** (override per toast).

Full types — **`ToastProps`**, **`ToastAddOptions`**, **`ToastContextValue`**.

## Gallery

Like **`ToastGalleryPage`** and Storybook **Components → Toast**: sizes, grids **4 variants × 5 colors** (with actions, without, title only), “many buttons” block, and live demo with **`ToastProvider`**.

<ComponentDocsPreview name="toastGallery" />

Sources: `src/components/Toast/`.
