---
title: Modal
description: Modal dialog with portal, focus stack for multiple dialogs (ModalProvider).
---

# Modal

**`Modal`** — full-viewport dialog with backdrop: content in **`FloatingPortal`**, **`body`** scroll lock, focus management. Open via **`ref`** (**`ModalHandle.open()`** / **`close()`**) or controlled (**`open`** + **`onOpenChange`**).

Below: full modal preview and **section previews** (header in separate modals; body and footer are static “slices” of the panel plus one scroll example).

## Preview

<ComponentDocsPreview name="modal" />

## What the modal is built from

### Root — `Modal` component

**`Modal`** is the dialog shell: not a whole “status screen” by itself, but a **container** for your **`children`**. It handles:

| Part                 | What it does                                                                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Portal**           | Renders to **`document.body`** via **`FloatingPortal`** so the dialog sits above the app                                                                                |
| **Backdrop**         | Dimmed background; closes on click when **`closeOnBackdropClick`** (default on)                                                                                         |
| **Panel**            | Content window: **`width`** / **`maxHeight`**, **`size`** presets (**`MODAL_SIZES`**), **`animation`** (**`MODAL_ANIMATIONS`**), **`className`** / **`panelClassName`** |
| **Focus & keyboard** | **`FloatingFocusManager`** — focus stays inside while open                                                                                                              |
| **Stack**            | With **`ModalProvider`**: multiple modals get increasing **z-index**, correct close order, shared open count                                                            |

Without **`ModalProvider`** a single modal still works; for **stacked** dialogs the provider is required.

### Typical `children` layout

Recommended three-part layout — header, body, footer (any block can be omitted or replaced):

```text
Modal                          ← shell: backdrop + panel + focus
├── ModalHeader                ← title, subtitle, close / icon-only close
├── ModalBody                  ← main copy, form, scroll on overflow
└── ModalFooter                ← action row at bottom
    └── …                      ← ready-made footer blocks below
```

### Ready header and body blocks

| Component         | Role                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| **`ModalHeader`** | Title (**`title`**), subtitle (**`subtitle`**), close button; icon-only close variant (see **`ModalHeaderProps`**) |
| **`ModalBody`**   | Content region; alignment via **`align`** (**`start`** \| **`center`**)                                            |

### Footer and nested blocks

**`ModalFooter`** wraps the bottom action row. Put custom JSX inside, or one of:

| Component                       | When to use                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------- |
| **`ModalFooterConfirmActions`** | Two buttons: Cancel and confirm (**`cancelText`** / **`confirmText`**, callbacks) |
| **`ModalFooterInfo`**           | One-line hint or secondary action                                                 |
| **`ModalFooterStepDots`**       | Step flow: **`total`** / **`activeIndex`**                                        |
| **`ModalFooterLinkButton`**     | Link-style button (e.g. “Learn more”)                                             |
| **`ModalFooterSwitch`**         | Toggle in the footer                                                              |

### Full-screen style compositions

Not arbitrary **`children` inside `Modal`**, but full layouts on the same stack:

| Component          | Purpose                                                                         |
| ------------------ | ------------------------------------------------------------------------------- |
| **`ConfirmModal`** | Confirmation dialog with preset layout — [ConfirmModal](./confirm-modal)        |
| **`ModalStatus`**  | Status screen (icon + text, **`success`** / **`error`**, etc.), separate layout |

Sources: **`Modal.tsx`**, **`ModalHeader/`**, **`ModalBody/`**, **`ModalFooter/`** (slots), **`ConfirmModal/`**, **`ModalStatus/`**, **`ModalProvider.tsx`**.

## Import

```tsx
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalFooterConfirmActions,
  type ModalHandle,
} from '@v-lab/ui-kit'
```

## Example

```tsx
import { useRef } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalFooterConfirmActions,
  type ModalHandle,
} from '@v-lab/ui-kit'

export function SaveDialog() {
  const modalRef = useRef<ModalHandle>(null)

  return (
    <>
      <button type="button" onClick={() => modalRef.current?.open()}>
        Open
      </button>
      <Modal ref={modalRef} width={480}>
        <ModalHeader title="Title" subtitle="Subtitle" />
        <ModalBody>
          <p>Content</p>
        </ModalBody>
        <ModalFooter>
          <ModalFooterConfirmActions
            cancelText="Cancel"
            confirmText="OK"
            onCancel={() => modalRef.current?.close()}
            onConfirm={() => modalRef.current?.close()}
          />
        </ModalFooter>
      </Modal>
    </>
  )
}
```

More scenarios (icon header, **`ConfirmModal`**, **`ModalStatus`**) — Storybook **Overlays/Modal**.

### Export cheat sheet

Same pieces as a list (import from **`@v-lab/ui-kit`**):

| Export                                                                                                                                  | Role                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **`ModalHeader`**, **`ModalBody`**, **`ModalFooter`**                                                                                   | Three content zones inside the panel                     |
| **`ModalFooterConfirmActions`**, **`ModalFooterInfo`**, **`ModalFooterStepDots`**, **`ModalFooterLinkButton`**, **`ModalFooterSwitch`** | **`ModalFooter`** variants                               |
| **`ModalStatus`**, **`ConfirmModal`**                                                                                                   | Full compositions                                        |
| **`ModalProvider`**                                                                                                                     | Stack and **z-index** for multiple **`Modal`** instances |

Constants **`MODAL_SIZES`**, **`MODAL_ANIMATIONS`** — for **`Modal`** **`size`** and **`animation`**.

## Main props (Modal)

| Prop                   | Type                          | Description                                        |
| ---------------------- | ----------------------------- | -------------------------------------------------- |
| `width` / `maxHeight`  | number or CSS                 | Panel size                                         |
| `closeOnBackdropClick` | `boolean`                     | Close on backdrop click, default true              |
| `size`                 | **`MODAL_SIZES`**             | Preset width                                       |
| `animation`            | **`MODAL_ANIMATIONS`**        | Enter animation                                    |
| `role`                 | `'dialog'` \| `'alertdialog'` | Panel role; `alertdialog` for urgent confirmations |
| `initialFocus`         | index or ref                  | Element focused on open                            |

## Gallery

Each button opens a modal variant. Like Storybook **Overlays/Modal** and **`src/docs/ModalGalleryPage.tsx`**.

<ComponentDocsPreview name="modalGallery" />

Sources: `src/components/overlays/Modal/`.
