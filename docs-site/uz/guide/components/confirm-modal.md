---
title: ConfirmModal
description: async onConfirm va tugmada yuklanish holati bilan tayyor tasdiq oynasi.
---

# ConfirmModal

**`Modal`** + **`ModalHeader`** + **`ModalBody`** + **`ModalFooterConfirmActions`** o‘ramasi: sarlavha (**`title`**), ixtiyoriy qisqa ikkinchi qator (**`subtitle`**), asosiy matn **`children`** da, «Bekor qilish» va tasdiq tugmalari. **`subtitle`** sarlavha ostidagi bitta q‘shtima qator uchun; keng tushuntirish odatda tanada qoladi, sarlavhada takrorlanmaydi. **`onConfirm`** **`async`** bo‘lishi mumkin — promise bajarilguncha harakat tugmasida **loading** ko‘rinadi.

Vayronkor harakatlar uchun **`isDestructive`** bering (asosiy **`Modal`** da fon bosish bilan yopish o‘chadi).

## Preview

<ComponentDocsPreview name="confirmModal" />

## Import

```tsx
import { ConfirmModal } from '@v-lab/ui-kit'
import type { ModalHandle } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useRef } from 'react'
import { Button, ConfirmModal, type ModalHandle } from '@v-lab/ui-kit'

export function DeleteGate() {
  const ref = useRef<ModalHandle>(null)

  return (
    <>
      <Button type="button" onClick={() => ref.current?.open()}>
        O‘chirish
      </Button>
      <ConfirmModal
        ref={ref}
        title="Yozuvni o‘chirasizmi?"
        confirmText="O‘chirish"
        cancelText="Bekor qilish"
        confirmColor="error"
        isDestructive
        onCancel={() => ref.current?.close()}
        onConfirm={async () => {
          // serverda o‘chirish usulini kuting
          ref.current?.close()
        }}
      >
        <p>Bu amalni qaytarib bo‘lmaydi.</p>
      </ConfirmModal>
    </>
  )
}
```

ConfirmModal siz oddiy modal yig‘inish — [Modal](/uz/guide/components/modal) bo‘limida.

## Asosiy proplar

To‘liq tip — **`ConfirmModalProps`**: barcha **`Modal`** maydonlari, **`children`** / **`ariaLabel`** bundan mustasna, qo‘shimcha majburiy **`title`**, **`onConfirm`**, ixtiyoriy **`subtitle`**, **`children`**, **`onCancel`**, **`confirmText`**, **`cancelText`**, **`confirmColor`**, **`isDestructive`**, **`onError`**. Qarang **`ConfirmModal.types.ts`** va asosiy **`ModalProps`**.

## Galereya

Tasdiq misollari: oddiy dialog, vayronkor o‘chirish, **`confirmColor="success"`**, keng panel, tugmada loading bilan async, bir nechta mustaqil **`ConfirmModal`**. Storybook **Overlays/ConfirmModal** va **`src/docs/ConfirmModalGalleryPage.tsx`** kabi.

<ComponentDocsPreview name="confirmModalGallery" />

Manbalar: `src/components/overlays/Modal/components/ConfirmModal/`.
