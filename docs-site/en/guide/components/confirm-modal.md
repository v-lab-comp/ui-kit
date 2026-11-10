---
title: ConfirmModal
description: Ready confirmation dialog with async onConfirm and loading on the action button.
---

# ConfirmModal

Wraps **`Modal`** + **`ModalHeader`** + **`ModalBody`** + **`ModalFooterConfirmActions`**: title (**`title`**), optional short second line in the header (**`subtitle`**), main copy in **`children`**, Cancel and confirm buttons. **`subtitle`** is for one extra line under the title; longer explanations stay in the body only. **`onConfirm`** may be **`async`** — while the promise runs, the action button shows **loading**.

For destructive actions set **`isDestructive`** (backdrop click to close is disabled, like the base **`Modal`**).

## Preview

<ComponentDocsPreview name="confirmModal" />

## Import

```tsx
import { ConfirmModal } from '@v-lab/ui-kit'
import type { ModalHandle } from '@v-lab/ui-kit'
```

## Example

```tsx
import { useRef } from 'react'
import { Button, ConfirmModal, type ModalHandle } from '@v-lab/ui-kit'

export function DeleteGate() {
  const ref = useRef<ModalHandle>(null)

  return (
    <>
      <Button type="button" onClick={() => ref.current?.open()}>
        Delete
      </Button>
      <ConfirmModal
        ref={ref}
        title="Delete this item?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        isDestructive
        onCancel={() => ref.current?.close()}
        onConfirm={async () => {
          // await your server delete
          ref.current?.close()
        }}
      >
        <p>This action cannot be undone.</p>
      </ConfirmModal>
    </>
  )
}
```

Basic modal composition without ConfirmModal — [Modal](./modal).

## Props (`ConfirmModalProps`)

**`ConfirmModalProps`** = **`ModalProps`** without **`children`** / **`ariaLabel`** (title via **`title`**) plus:

| Prop                | Type                              | Description                                                       |
| ------------------- | --------------------------------- | ----------------------------------------------------------------- |
| **`title`**         | `string`                          | Header title (required)                                           |
| **`subtitle`**      | `string`                          | Second line in header                                             |
| **`children`**      | **`ReactNode`**                   | Body between header and footer                                    |
| **`onConfirm`**     | **`() => void \| Promise<void>`** | Confirm action; **async** shows loading on the button             |
| **`onCancel`**      | **`() => void`**                  | Cancel                                                            |
| **`confirmText`**   | `string`                          | Primary button label                                              |
| **`cancelText`**    | `string`                          | Cancel button label                                               |
| **`confirmColor`**  | **`ConfirmModalColor`**           | Primary button semantics                                          |
| **`isDestructive`** | `boolean`                         | Destructive flow (backdrop behaviour aligned with **`Modal`**)    |
| **`onError`**       | **`(error: unknown) => void`**    | If set, **`onConfirm`** rejections are caught; otherwise rethrown |

Panel size, **`width`**, **`animation`**, controlled **`open`**, **`ref`** (**`ModalHandle`**) — see **[Modal](./modal)** and **`Modal.types.ts`**.

### Full type

**`ConfirmModalProps`** — **`ConfirmModal.types.ts`**.

## Gallery

Examples: basic dialog, destructive delete, **`confirmColor="success"`**, wide panel, async with loading on the button, several independent **`ConfirmModal`** instances. Like Storybook **Overlays/ConfirmModal** and **`src/docs/ConfirmModalGalleryPage.tsx`**.

<ComponentDocsPreview name="confirmModalGallery" />

Sources: `src/components/overlays/Modal/components/ConfirmModal/`.
