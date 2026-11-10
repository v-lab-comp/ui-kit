# Modal Component

Modal dialog with focus trap, Escape/backdrop dismiss, and Floating UI positioning.

## Overview

The Modal supports both **imperative** and **declarative** (controlled) usage patterns.

- **Imperative** (ref-based): `modalRef.current?.open()` / `.close()` — useful when the trigger and the modal are far apart in the component tree.
- **Declarative** (controlled): `open` prop + `onOpenChange` callback — the React-idiomatic approach for state-driven UIs.

### Key Features

- ✅ Floating UI-based positioning; z-index managed by `ModalProvider` when present
- ✅ Focus trap (FloatingFocusManager)
- ✅ Escape key dismiss
- ✅ Backdrop click dismiss (configurable)
- ✅ Automatic body overflow management (`overflow: hidden` on open)
- ✅ SSR safe (checks for `document`)
- ✅ Accessible (proper ARIA attributes)

## Usage

### Control Modes

Modal supports **two control patterns** — choose the one that fits your needs:

#### 1. Declarative Control (Recommended) — React Idiomatic

```tsx
import { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from '@v-lab/ui-kit'

export function MyPage() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalHeader title="Confirmation" />
        <ModalBody>
          <p>Are you sure?</p>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button>Confirm</button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}
```

**Pros:** Predictable state flow, testable, matches React conventions.

#### 2. Imperative Control (Fire-and-Forget) — Backward Compatible

```tsx
import { useRef } from 'react'
import { Modal, ModalHeader, ModalBody, ModalHandle } from '@v-lab/ui-kit'

export function MyPage() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Open Modal</button>

      <Modal ref={modalRef}>
        <ModalHeader title="Confirmation" />
        <ModalBody>
          <p>Are you sure?</p>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button onClick={() => modalRef.current?.close()}>Cancel</button>
            <button>Confirm</button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}
```

**Pros:** Simple, no parent state needed, useful for AI-generated interactions.

---

### API Reference

#### Imperative (ref-based)

```tsx
const modalRef = useRef<ModalHandle>(null)

// Open the modal
modalRef.current?.open()

// Close the modal
modalRef.current?.close()
```

## Props

| Prop                   | Type                      | Default   | Description                                                                                                                                             |
| ---------------------- | ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Control**            |                           |           |                                                                                                                                                         |
| `open`                 | `boolean`                 | -         | **(NEW)** Controlled open state. Pair with `onOpenChange`                                                                                               |
| `onOpenChange`         | `(open: boolean)` => void | -         | **(NEW)** Fires on open/close in both controlled and uncontrolled                                                                                       |
| **Sizing**             |                           |           |                                                                                                                                                         |
| `size`                 | `ModalSize`               | -         | **(NEW)** Preset: `'small'` (400px), `'medium'` (520px), `'large'` (720px), `'fullWidth'`. Without `size` / `width` the panel width comes from the skin |
| `width`                | `number \| string`        | -         | Modal width. Overrides `size` preset if provided                                                                                                        |
| `maxHeight`            | `number \| string`        | -         | Modal max height                                                                                                                                        |
| **Animation**          |                           |           |                                                                                                                                                         |
| `animation`            | `ModalAnimation`          | `'scale'` | **(NEW)** Variant: `'scale'`, `'slide'`, `'fade'`, `'none'`                                                                                             |
| `animationDuration`    | `number`                  | `280`     | **(NEW)** Duration in milliseconds                                                                                                                      |
| **Behavior**           |                           |           |                                                                                                                                                         |
| `closeOnBackdropClick` | `boolean`                 | `true`    | Allow closing on backdrop click                                                                                                                         |
| `className`            | `string`                  | -         | CSS class for root container                                                                                                                            |
| `panelClassName`       | `string`                  | -         | CSS class for modal panel                                                                                                                               |
| `zIndex`               | `number`                  | -         | Z-index (auto-managed by ModalProvider if available)                                                                                                    |
| `style`                | `CSSProperties`           | -         | Inline styles for root                                                                                                                                  |
| `ariaLabel`            | `string`                  | -         | Screen reader label (fallback if no ModalHeader title)                                                                                                  |

## Structure

```tsx
<Modal ref={modalRef}>
  {/* ModalContext.Provider wraps these */}
  <ModalHeader title="Title" /> {/* Uses titleId from context */}
  <ModalBody>Content</ModalBody>
  <ModalFooter>{/* action buttons */}</ModalFooter>
</Modal>
```

### ModalHeader

Renders a title with optional close button, icon, and subtitle.

```tsx
<ModalHeader
  title="Dialog Title"
  subtitle="Optional subtitle"
  icon={<RiInfoLine />}
  hideCloseButton={false}
/>
```

Automatically uses `titleId` from ModalContext for `aria-labelledby` linking.

### ModalBody

Wrapper for modal content. No required props.

```tsx
<ModalBody>
  <p>Your content here</p>
</ModalBody>
```

### ModalStatus

A separate status modal (`error`, `warning`, `info`, `success`) — it renders `Modal` itself, so it is not placed inside another `Modal`. Accepts the same ref / `open` + `onOpenChange` / sizing props as `Modal`, plus `title`, `subtitle`, `layout` (`'left'` | `'center'`) and `footer`.

```tsx
const statusRef = useRef<ModalHandle>(null)

<ModalStatus ref={statusRef} variant="error" title="Something went wrong" />
<ModalStatus open={saved} onOpenChange={setSaved} variant="success" layout="center" title="Saved successfully" />
```

## Implementation Details

### State Management

- Uncontrolled: internal `useState`; controlled: `open` prop (`onOpenChange` fires in both modes)
- Inside `ModalProvider` the modal registers in the stack (`useLayoutEffect`) and gets its z-index from it
- Body scroll lock: without `ModalProvider` — an effect calls `setBodyScrollLocked(open)`; with it — the provider locks on the first modal and unlocks after the last

### Event Flow

1. User calls `modalRef.current?.open()` (or the parent sets `open`)
2. State updates → component renders in `FloatingPortal`
3. Body scroll is locked (`overflow: hidden`)
4. User presses Escape or clicks backdrop
5. `useDismiss` calls `onOpenChange(false)` → `closeModal()` → `onOpenChange?.(false)`
6. State updates → modal unmounts, scroll lock is released

### Floating UI Integration

```tsx
const { refs, context } = useFloating({
  open: openState,
  onOpenChange: (nextOpen) => {
    if (!nextOpen) closeModal()
  },
})

// isTopModal: always true without ModalProvider; with it — only the top modal of the stack
const dismiss = useDismiss(context, {
  escapeKey: isTopModal,
  outsidePress: closeOnBackdropClick && isTopModal,
  outsidePressEvent: 'pointerdown',
})

const { getFloatingProps } = useInteractions([dismiss])
```

- `useFloating`: Manages positioning context
- `useDismiss`: Handles Escape and outside clicks
- `useInteractions`: Combines interaction handlers
- `FloatingFocusManager`: Traps focus inside modal

## Size Utility

The component uses `formatSize()` utility to convert sizes:

```tsx
formatSize(500) // '500px'
formatSize('2rem') // '2rem'
formatSize(undefined) // undefined
```

This utility (`src/utils/formatSize`) is shared across Modal, Table, ToastProvider, SelectInput, Drawer and others to avoid duplication.

## Accessibility

- ✅ `role="dialog"`
- ✅ `aria-modal="true"`
- ✅ `aria-labelledby` linked to ModalHeader title
- ✅ `aria-label` fallback if no title
- ✅ Focus trap (focus stays inside modal)
- ✅ Return focus on close
- ✅ Keyboard navigation (Tab cycles, Escape closes)

## TypeScript

```tsx
import type { ModalHandle, ModalProps } from '@v-lab/ui-kit'

const modalRef = useRef<ModalHandle>(null) // ✅ Typed ref

type ModalHandle = {
  open: () => void
  close: () => void
}
```

## Size Presets

Instead of manually specifying widths, use presets:

```tsx
// Use preset
<Modal size="small">    {/* 400px */}
<Modal size="large">    {/* 720px */}

// Or combine with explicit width
<Modal size="large" width={600}>  {/* Uses 600px, overrides preset */}

// Available sizes
import { MODAL_SIZES } from '@v-lab/ui-kit'
// MODAL_SIZES: {
//   small: { width: 400 },
//   medium: { width: 520 },
//   large: { width: 720 },
//   fullWidth: { width: '100%', maxWidth: 'calc(100vw - 40px)' },
// }
```

---

## Animation Variants

Control modal entrance animation:

```tsx
// Scale animation (default, scale up + fade)
<Modal animation="scale" animationDuration={280}>

// Slide animation (slide up + fade)
<Modal animation="slide" animationDuration={300}>

// Fade animation (fade only, no scale)
<Modal animation="fade">

// No animation
<Modal animation="none">
```

The `animation` prop is rendered as `data-animation` on `.vl-modal__panel`, and `animationDuration` sets the CSS `--modal-animation-duration` variable; the keyframes live in the skin (`src/skins/corporate/components/modal.css`). Animations respect the `prefers-reduced-motion` media query and are disabled automatically.

---

## Multi-Modal Support

Use `ModalProvider` to properly manage multiple modals (auto z-index, coordinated scroll lock):

```tsx
import { ModalProvider } from '@v-lab/ui-kit'

function App() {
  return (
    <ModalProvider baseZIndex={1000}>
      <YourApp />
    </ModalProvider>
  )
}

// Now multiple modals auto-coordinate:
// - Each new modal gets z-index: baseZIndex + (count * 100)
// - Body scroll lock is coordinated (lock on first, unlock on last)
// - Escape and backdrop click close only the top modal
```

Without `ModalProvider`, modals work in standalone mode (existing behavior).

---

## Examples

### Confirmation Dialog

```tsx
const modalRef = useRef<ModalHandle>(null)
const statusRef = useRef<ModalHandle>(null)
const [loading, setLoading] = useState(false)

const handleConfirm = async () => {
  setLoading(true)
  try {
    await deleteItem()
    modalRef.current?.close()
  } catch (error) {
    statusRef.current?.open() // Error shown via a separate ModalStatus
  } finally {
    setLoading(false)
  }
}

return (
  <>
    <Modal ref={modalRef} closeOnBackdropClick={false}>
      <ModalHeader title="Delete Item?" />
      <ModalBody>
        <p>This action cannot be undone.</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button onClick={() => modalRef.current?.close()} disabled={loading}>
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </ModalBody>
    </Modal>
    <ModalStatus ref={statusRef} variant="error" title="Could not delete the item" />
  </>
)
```

### Form Modal

```tsx
const modalRef = useRef<ModalHandle>(null)

const handleSubmit = (data) => {
  saveForm(data)
  modalRef.current?.close()
}

return (
  <Modal ref={modalRef} width={500}>
    <ModalHeader title="Edit Profile" />
    <ModalBody>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => modalRef.current?.close()}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </ModalBody>
  </Modal>
)
```

## Styling

The Modal ships no CSS. It renders stable classes from its contract (`src/theme/contracts/modal.ts`); the look comes from the skin (`src/skins/corporate/components/modal.css`):

- `.vl-modal` — Outer container (fixed, full-screen)
- `.vl-modal__backdrop` — Semi-transparent overlay
- `.vl-modal__center` — Centers modal vertically/horizontally
- `.vl-modal__panel` — Modal dialog (white, rounded, shadow); also gets `vl-ui-kit-root` and `data-animation`

All skin rules sit in one `:where([data-vl-skin~='corporate']) { … }` block, which adds no specificity: after the build each rule weighs exactly its inner selector, e.g. `.vl-modal__panel` — one class (0,1,0). Add your own classes with `className` (root) and `panelClassName` (panel); one class of yours wins when your CSS is loaded after the skin CSS (`@v-lab/ui-kit/skins/corporate.css` is imported first):

```tsx
<Modal className="my-modal" panelClassName="my-modal-panel">
  {/* content */}
</Modal>
```

## Common Issues

### "Modal won't close"

Make sure you're calling `modalRef.current?.close()` in click handlers.

### "Body overflow not restored"

Modal automatically restores `overflow` on close. If it's not working, check:

- Is close being called?
- Are there nested modals? Wrap the app in `ModalProvider` — without it each modal toggles `overflow` on its own, and closing one releases the lock while another is still open

### "Focus not trapped"

FloatingFocusManager handles this automatically. If tabbing escapes:

- Check that Modal is the last thing in the DOM
- Ensure no `tabIndex={0}` outside the modal steals focus

## Future Improvements

- [x] Nested modal support (coordinated scroll lock via `ModalProvider`)
- [ ] Custom backdrop component
- [x] Animation/transition support (`animation`, `animationDuration`)
- [x] Modal stacking (`ModalProvider`); queuing — not yet
- [x] Preset sizes (`size`: small, medium, large, fullWidth)
