# Modal Component Guide for AI Systems

This document explains how to work with the Modal component when generating, analyzing, or modifying code. Use this as reference for understanding the pattern.

## Architecture for AI

### Imperative First, Controlled When Needed

Modal supports two modes. **Imperative** (ref-based) is the primary one:

1. **Explicit intent** — `modalRef.current?.open()` clearly shows "open this modal now"
2. **Simpler state** — Modal manages its own state, no parent state needed
3. **Event-driven** — Natural for user interactions (button clicks)

**Controlled** (`open` + `onOpenChange`) is for when the open state already lives in React state. There is no `onClose` prop.

```tsx
// ✅ Imperative (ref-based)
const modalRef = useRef<ModalHandle>(null)
<Modal ref={modalRef} />
// modalRef.current?.open()

// ✅ Controlled (state-based)
const [open, setOpen] = useState(false)
<Modal open={open} onOpenChange={setOpen} />
```

### Key Pattern: No useEffect

**Important:** Modal has **NO useEffect for control**. Everything is imperative:

```tsx
// ✅ Correct
const modalRef = useRef(null)
<button onClick={() => modalRef.current?.open()}>Open</button>

// ❌ Wrong (don't do this)
useEffect(() => {
  if (shouldOpen) modalRef.current?.open()
}, [shouldOpen])
```

If opening depends on state, use controlled mode (`open` prop) instead of calling `ref.open()` from an effect.

## ModalHandle Interface

```typescript
type ModalHandle = {
  open: () => void // Opens modal, sets body overflow
  close: () => void // Closes modal, restores overflow
}
```

**What happens inside:**

```tsx
open: () => {
  document.body.style.overflow = 'hidden' // Prevent scrolling
  setOpen(true) // Render modal
}

close: () => {
  document.body.style.overflow = '' // Restore scrolling
  setOpen(false) // Hide modal
}
```

## Component Structure

```
<Modal ref={modalRef}>
  ├─ ModalContext.Provider (provides titleId, onClose)
  │  └─ FloatingPortal (renders to document.body)
  │     └─ div.root (flex container, z-index, custom styles)
  │        ├─ div.backdrop (semi-transparent overlay)
  │        └─ div.center (centers modal)
  │           └─ FloatingFocusManager (focus trap)
  │              └─ div.panel (the actual modal)
  │                 └─ children (ModalHeader, ModalBody, etc)
  └─ useFloating (position context)
     ├─ useDismiss (Escape, backdrop click)
     ├─ useInteractions (combines interactions)
     └─ FloatingFocusManager (focus management)
```

## How It Works

### 1. Opening Modal

```tsx
// User action
;<button onClick={() => modalRef.current?.open()}>Open</button>

// Inside Modal.open()
document.body.style.overflow = 'hidden' // Body won't scroll
setOpen(true) // Component renders

// useFloating gets new `open` value
// Modal appears on screen
// FloatingFocusManager traps focus inside
```

### 2. User Dismisses (Escape)

```tsx
// User presses Escape
// useDismiss hook detects it
// Calls onOpenChange(false)
// which triggers onClose()

const onClose = () => {
  document.body.style.overflow = '' // Restore scrolling
  setOpen(false) // Modal disappears
}
```

### 3. Backdrop Click

```tsx
// User clicks outside modal (on backdrop)
// useDismiss detects outsidePress: true
// Same as Escape: calls onClose()
// Modal closes

// Note: div.backdrop has no click handler
// Floating UI handles this via useInteractions
```

## Internal State vs Props

**The Modal has internal state:**

```tsx
const [open, setOpen] = useState(false)
```

This is **necessary** because:

1. React hooks like `useFloating` need reactive values
2. Conditional render `if (!open) return null` needs state
3. ref methods trigger state updates

**Cannot use refs alone** because React forbids accessing `ref.current` during render.

## How to Use in Different Scenarios

### Scenario 1: Simple Button Click

```tsx
const modalRef = useRef<ModalHandle>(null)

return (
  <>
    <button onClick={() => modalRef.current?.open()}>Open Modal</button>
    <Modal ref={modalRef}>
      <ModalHeader title="Hello" />
      <ModalBody>Content</ModalBody>
    </Modal>
  </>
)
```

**AI note:** Direct ref call, no state needed.

### Scenario 2: Form Submission

```tsx
const modalRef = useRef<ModalHandle>(null)
const [error, setError] = useState<string | null>(null)

const handleSubmit = async (data) => {
  try {
    await api.save(data)
    modalRef.current?.close() // Close on success
  } catch (err) {
    setError(err.message) // Show error in modal
  }
}

return (
  <Modal ref={modalRef}>
    <ModalHeader title="Save" />
    <ModalBody>
      <Form onSubmit={handleSubmit} />
      {error && <ModalStatus variant="error">{error}</ModalStatus>}
    </ModalBody>
  </Modal>
)
```

**AI note:**

- Use try/catch to close modal
- Errors managed in parent state
- No useEffect needed

### Scenario 3: Data Dependent Modal

```tsx
const modalRef = useRef<ModalHandle>(null)

useEffect(() => {
  // ❌ DON'T DO THIS
  if (user.needsConfirmation) {
    modalRef.current?.open() // Bad pattern
  }
}, [user.needsConfirmation])

// ✅ DO THIS INSTEAD
const handleUserAction = () => {
  if (user.needsConfirmation) {
    modalRef.current?.open() // Call in event handler
  }
}
```

**AI note:**

- Don't open modal from useEffect
- Trigger from user actions (clicks, submissions)
- If you must use effect, consider restructuring

## Common Mistakes for AI Systems

### ❌ Mistake 1: Adding useEffect Control

```tsx
// Wrong
useEffect(() => {
  setOpen(true)
}, [dependency])
```

### ✅ Fix: Use Event Handlers

```tsx
// Correct
<button onClick={() => modalRef.current?.open()}>Open</button>
```

---

### ❌ Mistake 2: Trying to Use Only Ref (No State)

```tsx
// Wrong
const isOpenRef = useRef(false)
<Modal open={isOpenRef.current} />  // React won't re-render
```

### ✅ Fix: Keep Internal State

```tsx
// Correct
const modalRef = useRef<ModalHandle>(null)
// Modal manages its own useState internally
```

---

### ❌ Mistake 3: Passing open Prop

```tsx
// Wrong
const [isOpen, setIsOpen] = useState(false)
<Modal open={isOpen} onClose={() => setIsOpen(false)} />
```

### ✅ Fix: Use Only Ref

```tsx
// Correct
const modalRef = useRef<ModalHandle>(null)
<Modal ref={modalRef} />
```

---

### ❌ Mistake 4: Manual Body Overflow Management

```tsx
// Wrong
useEffect(() => {
  document.body.style.overflow = 'hidden'
  return () => {
    document.body.style.overflow = ''
  }
}, [])
```

### ✅ Fix: Let Modal Handle It

```tsx
// Correct
// Modal.open() sets overflow: 'hidden'
// Modal.close() restores it automatically
```

## For Code Generation (Claude & Other AI)

When generating Modal usage:

1. **Always use ref pattern:**

   ```tsx
   const modalRef = useRef<ModalHandle>(null)
   <Modal ref={modalRef} />
   ```

2. **Open from event handlers, not effects:**

   ```tsx
   <button onClick={() => modalRef.current?.open()}>Open</button>
   ```

3. **Close from callbacks:**

   ```tsx
   modalRef.current?.close() // In handlers, not effects
   ```

4. **Include proper types:**

   ```tsx
   import type { ModalHandle } from '@v-lab/ui-kit'
   const modalRef = useRef<ModalHandle>(null)
   ```

5. **Use sub-components correctly:**
   ```tsx
   <Modal ref={modalRef}>
     <ModalHeader title="..." />      {/* Provides titleId */}
     <ModalBody>{...}</ModalBody>
     <ModalStatus variant="...">...</ModalStatus>
   </Modal>
   ```

## Debugging Tips

### "Modal doesn't open"

```tsx
// Check:
console.log(modalRef.current) // Should exist
modalRef.current?.open() // Try manually in console
```

### "Body scrolling not blocked"

```tsx
// Modal does this automatically:
document.body.style.overflow = 'hidden' // In open()
document.body.style.overflow = '' // In close()

// Check DevTools: <body style="overflow: hidden;">
```

### "Focus not trapped"

```tsx
// FloatingFocusManager handles this
// If broken:
// 1. Check modal is in FloatingPortal
// 2. Check no tabIndex="0" outside modal
// 3. Check returnFocus prop is set
```

### "Background scrolls when modal open"

```tsx
// This is body overflow issue
// Check that Modal.open() was called
// Not just setOpen(true)
```

## Summary for AI

| Aspect            | Rule                                         |
| ----------------- | -------------------------------------------- |
| **Control**       | Via ref methods only                         |
| **Props**         | Mostly styling (width, zIndex, className)    |
| **State**         | Managed internally (don't pass `open` prop)  |
| **Opening**       | `modalRef.current?.open()`                   |
| **Closing**       | `modalRef.current?.close()`                  |
| **Body Overflow** | Automatic, don't manage manually             |
| **useEffect**     | Don't use for modal control                  |
| **Nesting**       | Avoid (overflow management not nested-aware) |
| **SSR**           | Modal checks `typeof document` automatically |
| **Focus**         | FloatingFocusManager handles it              |
| **A11y**          | Built-in (role, aria-modal, aria-labelledby) |

This is the **canonical** pattern for this Modal. Follow these guidelines and you'll generate correct Modal usage every time.
