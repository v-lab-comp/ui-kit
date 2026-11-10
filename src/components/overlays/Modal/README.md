# Modal Component Documentation

Complete documentation for the Modal dialog component in V-Lab UI Kit.

## 📚 Documentation Files

### For Users / Developers

1. **[MODAL.md](./MODAL.md)** — Complete user guide
   - Overview and features
   - Usage examples
   - Props reference
   - Structure and sub-components
   - Accessibility features
   - Styling and customization
   - Common issues and solutions

2. **[EXAMPLES.tsx](./EXAMPLES.tsx)** — Copy-paste code examples
   - Simple modal
   - Confirmation dialog
   - Form modal with error handling
   - Advanced modal with subtitle/icon
   - Conditional opening
   - Multi-state modal
   - Multiple modals
   - Anti-patterns (what NOT to do)

### For AI Systems / Code Generators

3. **[MODAL_AI.md](./MODAL_AI.md)** — AI-specific guide
   - Architecture overview for LLMs
   - Why imperative pattern is used
   - How to generate Modal code correctly
   - Common mistakes and fixes
   - Design patterns for code generation
   - Summary table for quick reference

### For Testing

4. **[TESTING.md](./TESTING.md)** — Testing patterns
   - Basic test structure
   - Opening/closing tests
   - Dismiss behavior tests
   - Accessibility tests
   - Body overflow management tests
   - Focus management tests
   - Props testing
   - Async operation testing
   - Common assertions
   - Cleanup patterns

## ⚡ Quick Start

### Basic Usage

```tsx
import { useRef } from 'react'
import { Modal, ModalHeader, ModalBody, type ModalHandle } from '@v-lab/ui-kit'

export function MyComponent() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Open Modal</button>

      <Modal ref={modalRef}>
        <ModalHeader title="Title" />
        <ModalBody>
          <p>Your content here</p>
          <button onClick={() => modalRef.current?.close()}>Close</button>
        </ModalBody>
      </Modal>
    </>
  )
}
```

## 🎯 Key Concepts

### Two Control Modes

Modal supports **imperative** control via ref methods (primary pattern):

```tsx
modalRef.current?.open() // Open modal
modalRef.current?.close() // Close modal
```

…or **controlled** mode via the `open` prop + `onOpenChange` callback, when the open state lives in React state:

```tsx
const [open, setOpen] = useState(false)
<Modal open={open} onOpenChange={setOpen} />
```

There is no `onClose` prop — use `onOpenChange`.

### No useEffect Control

Modal opening is event-driven, not effect-driven:

```tsx
// ✅ Correct
;<button onClick={() => modalRef.current?.open()}>Open</button>

// ❌ Wrong
useEffect(() => {
  if (condition) modalRef.current?.open()
}, [condition])
```

If opening depends on state, use controlled mode (`open` prop) instead.

### Automatic Body Overflow

Modal manages `document.body.style.overflow` automatically:

```tsx
modalRef.current?.open() // Sets overflow: 'hidden'
modalRef.current?.close() // Restores overflow: ''
```

Inside `ModalProvider` the lock is coordinated across the stack: it is set when the first modal opens and released when the last one closes.

### Built-in Accessibility

Modal includes proper ARIA attributes and focus management:

```tsx
// Automatically handled:
// - role="dialog"
// - aria-modal="true"
// - aria-labelledby (linked to title)
// - focus trap
// - return focus on close
```

## 📋 Component Hierarchy

```
Modal (main component)
├─ ModalContext (provides titleId, onClose)
│  └─ useFloating (Floating UI positioning)
│     ├─ useDismiss (Escape, backdrop click)
│     ├─ useInteractions (combines interactions)
│     └─ FloatingFocusManager (focus trap)
│
├─ ModalHeader (optional)
│  ├─ title: string
│  ├─ subtitle?: string
│  ├─ icon?: ReactNode
│  └─ hideCloseButton?: boolean
│
├─ ModalBody (optional)
│  ├─ children: ReactNode
│  ├─ align?: 'left' | 'center'
│  └─ compactTop?: boolean
│
└─ ModalFooter (optional) — action buttons, see components/ModalFooter/README.md

ModalStatus — a separate status modal (wraps Modal itself, not a child of it)
├─ variant: 'error' | 'warning' | 'info' | 'success'
├─ title: ReactNode
├─ subtitle?: ReactNode
├─ layout?: 'left' | 'center'
└─ footer?: ReactNode
```

## 🚀 Common Patterns

### Confirmation Dialog

```tsx
<Modal ref={modalRef} closeOnBackdropClick={false}>
  <ModalHeader title="Confirm?" />
  <ModalBody>
    <div style={{ display: 'flex', gap: 12 }}>
      <button onClick={() => modalRef.current?.close()}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  </ModalBody>
</Modal>
```

### Form Modal

```tsx
<Modal ref={modalRef} width={500}>
  <ModalHeader title="Edit" />
  <ModalBody>
    <form onSubmit={handleSubmit}>{/* Form fields */}</form>
    {error && <p role="alert">{error}</p>}
  </ModalBody>
</Modal>
```

### Status Modal

`ModalStatus` is its own modal with an icon, title and subtitle. It takes the same ref / `open` + `onOpenChange` API as `Modal`:

```tsx
const statusRef = useRef<ModalHandle>(null)

<ModalStatus
  ref={statusRef}
  variant="error"
  title="Could not save"
  subtitle="Check the connection and try again"
/>

statusRef.current?.open()
```

### Error Handling

```tsx
const handleAction = async () => {
  try {
    await api.doSomething()
    modalRef.current?.close()
  } catch (error) {
    setError(error.message)
    // Modal stays open, shows error
  }
}
```

## 🔧 Props Reference

| Prop                   | Type                      | Default  | Notes                                                                 |
| ---------------------- | ------------------------- | -------- | --------------------------------------------------------------------- |
| `children`             | ReactNode                 | -        | Modal content                                                         |
| `open`                 | boolean                   | -        | Controlled open state                                                 |
| `onOpenChange`         | (open) => void            | -        | Fires on open / close                                                 |
| `size`                 | ModalSize                 | -        | 'small' \| 'medium' \| 'large' \| 'fullWidth'                         |
| `width`                | number \| string          | -        | 500 → '500px', '80vw' → as-is                                         |
| `maxHeight`            | number \| string          | -        | Limits modal height                                                   |
| `closeOnBackdropClick` | boolean                   | true     | Allow dismissing via backdrop                                         |
| `className`            | string                    | -        | Custom root class                                                     |
| `panelClassName`       | string                    | -        | Custom modal panel class                                              |
| `zIndex`               | number                    | -        | Z-index override                                                      |
| `style`                | CSSProperties             | -        | Inline styles for root                                                |
| `ariaLabel`            | string                    | -        | A11y label (fallback if no title)                                     |
| `animation`            | ModalAnimation            | 'scale'  | 'scale' \| 'slide' \| 'fade' \| 'none'                                |
| `animationDuration`    | number                    | 280      | Milliseconds                                                          |
| `role`                 | 'dialog' \| 'alertdialog' | 'dialog' | `alertdialog` for urgent confirmations (ConfirmModal `isDestructive`) |
| `initialFocus`         | number \| ref             | -        | Element focused on open (FloatingFocusManager)                        |

## 🎨 Styling

Modal ships no CSS. It renders stable classes from its contract (`src/theme/contracts/modal.ts`), and the skin styles them (`src/skins/corporate/components/modal.css`):

- `.vl-modal` — Outer container
- `.vl-modal__backdrop` — Overlay behind modal
- `.vl-modal__center` — Centering container
- `.vl-modal__panel` — Modal dialog element (also gets `vl-ui-kit-root` and `data-animation`)

All skin rules sit in one `:where([data-vl-skin~='corporate']) { … }` block, which adds no specificity: `.vl-modal__panel` weighs exactly one class (0,1,0). Override with `className` and `panelClassName` props — your class wins when your CSS is loaded after the skin CSS (`@v-lab/ui-kit/skins/corporate.css` is imported first):

```tsx
<Modal className="my-root" panelClassName="my-panel" />
```

## 🧪 Testing

See [TESTING.md](./TESTING.md) for comprehensive testing guide including:

- Opening/closing tests
- Dismiss behavior (Escape, backdrop)
- Accessibility assertions
- Body overflow verification
- Focus management tests
- Props validation

## ♿ Accessibility

Modal includes full a11y support:

- ✅ `role="dialog"` for semantics
- ✅ `aria-modal="true"` announces it's a modal
- ✅ `aria-labelledby` links to title (auto via ModalHeader)
- ✅ `aria-label` fallback if no title provided
- ✅ Focus trap (FloatingFocusManager)
- ✅ Return focus on close
- ✅ Keyboard navigation (Escape to close)
- ✅ ARIA-compliant (per WAI-ARIA dialog pattern)

## 🚨 Common Mistakes

### ❌ Mistake 1: `onClose` Instead of `onOpenChange`

```tsx
// Wrong - Modal has no onClose prop; the state never resets
<Modal open={isOpen} onClose={() => setIsOpen(false)} />
```

### ✅ Fix

```tsx
// Correct - controlled mode
<Modal open={isOpen} onOpenChange={setIsOpen} />

// …or imperative
const modalRef = useRef<ModalHandle>(null)
<Modal ref={modalRef} />
modalRef.current?.open()
```

---

### ❌ Mistake 2: useEffect Control

```tsx
// Wrong - don't control from effects
useEffect(() => {
  if (shouldOpen) modalRef.current?.open()
}, [shouldOpen])
```

### ✅ Fix

```tsx
// Correct - control from event handlers
const handleClick = () => {
  modalRef.current?.open()
}
;<button onClick={handleClick}>Open</button>
```

---

### ❌ Mistake 3: Manual Overflow Management

```tsx
// Wrong - Modal handles this
useEffect(() => {
  document.body.style.overflow = 'hidden'
  return () => {
    document.body.style.overflow = ''
  }
}, [])
```

### ✅ Fix

```tsx
// Correct - let Modal handle it
modalRef.current?.open() // Auto sets overflow
modalRef.current?.close() // Auto restores overflow
```

## 🔍 Debugging

### Modal Won't Open

```tsx
// Check:
console.log(modalRef.current) // Should exist
modalRef.current?.open() // Try in console
```

### Body Scrolling Not Blocked

```tsx
// Check DevTools:
// <body style="overflow: hidden;">

// Verify Modal.open() was called:
const body = document.body
console.log(body.style.overflow) // Should be 'hidden'
```

### Focus Not Trapped

```tsx
// Check:
// 1. Modal is in FloatingPortal
// 2. No tabIndex="0" outside modal
// 3. returnFocus prop is set (auto)
```

## 📝 Type Definitions

```tsx
import type { ModalHandle, ModalProps } from '@v-lab/ui-kit'

type ModalHandle = {
  open: () => void
  close: () => void
}

type ModalProps = {
  children: ReactNode
  width?: number | string
  maxHeight?: number | string
  closeOnBackdropClick?: boolean
  className?: string
  panelClassName?: string
  zIndex?: number
  style?: CSSProperties
  ariaLabel?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  size?: ModalSize // 'small' | 'medium' | 'large' | 'fullWidth'
  animation?: ModalAnimation // 'scale' | 'slide' | 'fade' | 'none'
  animationDuration?: number
  role?: 'dialog' | 'alertdialog'
  initialFocus?: number | MutableRefObject<HTMLElement | null>
}
```

## 🔗 Related Components

- **ModalHeader** — Title with close button
- **ModalBody** — Content container
- **ModalFooter** — Action buttons and footer slots
- **ModalStatus** — Status modal (error / warning / info / success)
- **ConfirmModal** — Ready-made confirmation dialog
- **ModalProvider** — Modal stack: z-index, Escape / backdrop only for the top modal, shared scroll lock
- **ModalContext** — Internal context (provides titleId)

## 📚 Further Reading

- [Floating UI Documentation](https://floating-ui.com/)
- [WAI-ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/)
- [React Refs Documentation](https://react.dev/reference/react/useRef)

## 🎓 For AI Systems

See **[MODAL_AI.md](./MODAL_AI.md)** for detailed guidance on:

- Why imperative pattern
- How to generate correct Modal code
- Common AI mistakes and fixes
- Design patterns for LLMs
- Quick reference table

---

**Last updated:** 2026-11-10  
**Component status:** Stable ✅  
**Dependencies:** @floating-ui/react, React 18.2+ or 19
