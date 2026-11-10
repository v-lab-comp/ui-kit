# ConfirmModal Component

Ready-to-use confirmation dialog for user actions.

## Overview

`ConfirmModal` is a high-level component built on top of `Modal` that handles common confirmation patterns:

- Confirmation dialogs
- Destructive action warnings
- Async operation handling (loading state)
- Cancel callbacks

## Usage

### Basic Example

```tsx
import { useRef } from 'react'
import { ConfirmModal, type ModalHandle } from '@v-lab/ui-kit'

export function MyComponent() {
  const confirmRef = useRef<ModalHandle>(null)

  const handleDelete = async () => {
    await api.delete(id)
    // Modal auto-closes after onConfirm
  }

  return (
    <>
      <button onClick={() => confirmRef.current?.open()}>Delete Item</button>

      <ConfirmModal
        ref={confirmRef}
        title="Delete item?"
        subtitle="This action cannot be undone"
        confirmText="Delete"
        confirmColor="error"
        isDestructive
        onConfirm={handleDelete}
      >
        <p>Are you sure?</p>
      </ConfirmModal>
    </>
  )
}
```

## Props

| Prop                   | Type                              | Default   | Description                                         |
| ---------------------- | --------------------------------- | --------- | --------------------------------------------------- |
| `title`                | string                            | -         | **Required** — modal title                          |
| `subtitle`             | string                            | -         | Optional subtitle                                   |
| `children`             | ReactNode                         | -         | Modal content                                       |
| `onConfirm`            | () => Promise<void> \| void       | -         | **Required** — callback on confirm (can be async)   |
| `onCancel`             | () => void                        | -         | Optional callback on cancel                         |
| `confirmText`          | string                            | 'Confirm' | Confirm button text                                 |
| `cancelText`           | string                            | 'Cancel'  | Cancel button text                                  |
| `confirmColor`         | 'primary' \| 'error' \| 'success' | 'primary' | Button color                                        |
| `isDestructive`        | boolean                           | false     | If true: blocks backdrop click, sets color to error |
| `closeOnBackdropClick` | boolean                           | -         | Override default (true unless isDestructive)        |
| `width`                | number \| string                  | -         | Modal width                                         |
| `maxHeight`            | number \| string                  | -         | Modal max height                                    |
| `zIndex`               | number                            | -         | Modal z-index                                       |
| `className`            | string                            | -         | Root custom class                                   |
| `panelClassName`       | string                            | -         | Panel custom class                                  |

## Patterns

### Destructive Action

```tsx
<ConfirmModal
  ref={confirmRef}
  title="Delete project?"
  subtitle="This cannot be undone. All data will be lost."
  confirmText="Delete"
  confirmColor="error"
  isDestructive // Blocks backdrop click
  onConfirm={handleDelete}
/>
```

### Async Operation

```tsx
const handleApprove = async () => {
  await api.approve()
  // Loading state (button shows "...") is handled automatically
}

;<ConfirmModal
  ref={confirmRef}
  title="Approve?"
  confirmText="Approve"
  confirmColor="success"
  onConfirm={handleApprove} // Can be async
/>
```

### With Cancel Callback

```tsx
<ConfirmModal
  ref={confirmRef}
  title="Continue?"
  onConfirm={handleConfirm}
  onCancel={() => console.log('User cancelled')}
/>
```

### Multiple Confirmations

```tsx
const deleteRef = useRef<ModalHandle>(null)
const archiveRef = useRef<ModalHandle>(null)

return (
  <>
    <button onClick={() => deleteRef.current?.open()}>Delete</button>
    <button onClick={() => archiveRef.current?.open()}>Archive</button>

    <ConfirmModal ref={deleteRef} title="Delete?" confirmColor="error" onConfirm={handleDelete} />
    <ConfirmModal ref={archiveRef} title="Archive?" onConfirm={handleArchive} />
  </>
)
```

## Features

- ✅ **Auto loading state** — button shows "..." during async operations
- ✅ **Auto close** — modal closes automatically after onConfirm completes
- ✅ **Destructive mode** — blocks backdrop click for dangerous actions
- ✅ **Color variants** — primary (blue), error (red), success (green)
- ✅ **Accessibility** — full ARIA support, focus trap
- ✅ **Ref control** — `modalRef.current?.open()` / `.close()`

## Color Variants

| Color             | Use Case                                        |
| ----------------- | ----------------------------------------------- |
| `primary` (blue)  | General confirmations                           |
| `error` (red)     | Destructive actions (delete, remove, reset)     |
| `success` (green) | Positive confirmations (approve, confirm, save) |

## When to Use

### Use ConfirmModal

- Delete/remove operations
- Publishing/publishing actions
- Significant state changes
- User confirmations

### Don't Use ConfirmModal

- Simple alerts/info (use ModalStatus instead)
- Forms (use Modal + custom content)
- Complex multi-step flows

## Styling

Buttons are styled with CSS and support dark mode automatically.

Override with:

```tsx
<ConfirmModal
  className="custom-root"
  panelClassName="custom-panel"
  // ...
/>
```

## Examples

See [EXAMPLES.tsx](./EXAMPLES.tsx) for 6 detailed usage patterns.

## Implementation Details

- Built with `forwardRef` for ref forwarding
- Uses internal `useState` for loading state
- Handles async onConfirm callbacks
- Auto-closes modal on success
- Preserves focus management via FloatingFocusManager
