# ModalFooter

Footer section for `Modal`: an optional start slot on the left and any actions on the right.

## Overview

The footer is split into a **layout** component and **ready-made content**:

- `ModalFooter` — the footer row: `startContent` on the left, `children` (buttons) on the right.
- `ModalFooterConfirmActions` — the classic "Cancel / primary action" button pair, with loading state.
- Slots for the left side: `ModalFooterInfo`, `ModalFooterStepDots`, `ModalFooterLinkButton`, `ModalFooterSwitch`.

## Usage

### Basic Confirmation

```tsx
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalFooterConfirmActions,
  type ModalHandle,
} from '@v-lab/ui-kit'
import { useRef } from 'react'

export function MyModal() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <Modal ref={modalRef}>
      <ModalHeader title="Confirm?" />
      <ModalBody>
        <p>Are you sure?</p>
      </ModalBody>
      <ModalFooter>
        <ModalFooterConfirmActions
          onCancel={() => modalRef.current?.close()}
          onConfirm={() => {
            // do something
            modalRef.current?.close()
          }}
        />
      </ModalFooter>
    </Modal>
  )
}
```

### With Start Content

```tsx
<ModalFooter startContent={<ModalFooterSwitch label="Don't show again" />}>
  <ModalFooterConfirmActions onCancel={...} onConfirm={...} />
</ModalFooter>
```

### Delete Action (Red Button)

```tsx
<ModalFooter>
  <ModalFooterConfirmActions confirmColor="error" confirmText="Delete" onCancel={...} onConfirm={...} />
</ModalFooter>
```

For destructive confirmations prefer `ConfirmModal` with `isDestructive` — it also blocks closing on backdrop click.

### Full Width Buttons

```tsx
<ModalFooter fullWidth>
  <ModalFooterConfirmActions onCancel={...} onConfirm={...} />
</ModalFooter>
```

### Custom Buttons

`children` accepts any buttons — `ModalFooterConfirmActions` is just a shortcut:

```tsx
<ModalFooter startContent={<ModalFooterStepDots total={3} activeIndex={1} />}>
  <Button variant="stroke" color="neutral" size="small" onClick={goBack}>
    Back
  </Button>
  <Button size="small" onClick={goNext}>
    Next
  </Button>
</ModalFooter>
```

## Props

### `ModalFooter`

| Prop           | Type      | Default | Description                                     |
| -------------- | --------- | ------- | ----------------------------------------------- |
| `startContent` | ReactNode | -       | Content on the left (switch, info, link, dots)  |
| `children`     | ReactNode | -       | Actions on the right                            |
| `fullWidth`    | boolean   | false   | Stretch the actions to share the footer equally |
| `className`    | string    | -       | Extra class on the footer root                  |

### `ModalFooterConfirmActions`

| Prop           | Type                              | Default    | Description                                 |
| -------------- | --------------------------------- | ---------- | ------------------------------------------- |
| `onCancel`     | () => void                        | -          | **Required** — cancel button click handler  |
| `onConfirm`    | () => void                        | -          | **Required** — confirm button click handler |
| `cancelText`   | string                            | 'Cancel'   | Cancel button text                          |
| `confirmText`  | string                            | 'Continue' | Confirm button text                         |
| `confirmColor` | 'primary' \| 'error' \| 'success' | 'primary'  | Confirm button color                        |
| `loading`      | boolean                           | false      | Disable both buttons and show a spinner     |
| `disabled`     | boolean                           | false      | Disable both buttons                        |

## Layout

```
┌──────────────────────────────────────────────┐
│  [startContent]             [Cancel] [Confirm] │
│                               (min-height: 68px) │
└──────────────────────────────────────────────┘
```

- Left: optional `startContent`; without it the actions align to the right
- Min height: 68px (a 36px button row + padding)
- Padding: 16px vertical, `--modal-padding-inline` (20px) horizontal — same as the header and body
- Gap between items: 12px
- Border top: 1px solid `var(--stroke-soft-200)`

## Color Variants

| Color             | Use Case               | Example                        |
| ----------------- | ---------------------- | ------------------------------ |
| `primary` (blue)  | General confirmations  | "Continue", "Save", "Submit"   |
| `error` (red)     | Destructive actions    | "Delete", "Remove", "Reset"    |
| `success` (green) | Positive confirmations | "Approve", "Confirm", "Accept" |

## Async Operation

```tsx
const [loading, setLoading] = useState(false)

const handleConfirm = async () => {
  setLoading(true)
  try {
    await api.save()
  } finally {
    setLoading(false)
    modalRef.current?.close()
  }
}

;<ModalFooter>
  <ModalFooterConfirmActions
    loading={loading}
    onCancel={() => modalRef.current?.close()}
    onConfirm={handleConfirm}
  />
</ModalFooter>
```

## Implementation

- Buttons are the kit's `Button` (`size="small"`)
- Flexbox row; the actions block is pushed to the right
- Border-top separator, min height 68px
