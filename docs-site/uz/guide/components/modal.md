---
title: Modal
description: Portal, fokus va bir nechta dialog stacki (ModalProvider) bilan modal oyna.
---

# Modal

**`Modal`** — qorong‘i fon bilan to‘liq ekran dialog: kontent **`FloatingPortal`** da, **`body`** skroll bloklash, fokus boshqaruvi. Ochish **`ref`** orqali (**`ModalHandle.open()`** / **`close()`**) yoki boshqariladigan rejimda (**`open`** + **`onOpenChange`**).

Quyida to‘liq modal preview va **qismlarning ko‘rinishli misollari** (sarlavha — alohida modallar; tanasi va pastki qism — statik panel «kesmalari» va bitta skroll misoli).

## Preview

<ComponentDocsPreview name="modal" />

## Modal nimadan iborat

### Ildiz — `Modal` komponenti

**`Modal`** — dialog qobig‘i: butun «holat ekrani» emas, **`children`** qo‘yadigan **konteyner**. U infratuzilma uchun javobgar:

| Qism                    | Nima qiladi                                                                                                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Portal**              | **`FloatingPortal`** orqali **`document.body`** ga render — dialog ilova ustida                                                                                                  |
| **Backdrop**            | Qorong‘ilangan fon; **`closeOnBackdropClick`** da bosish bilan yopish (standart yoqilgan)                                                                                        |
| **Panel**               | Kontent oynasi: **`width`** / **`maxHeight`**, **`size`** presets (**`MODAL_SIZES`**), **`animation`** (**`MODAL_ANIMATIONS`**), **`className`** / **`panelClassName`** sinflari |
| **Fokus va klaviatura** | **`FloatingFocusManager`** — ochilganda fokus modal ichida qoladi                                                                                                                |
| **Oynalar stacki**      | **`ModalProvider`** da: bir nechta modal ortacha **z-index** oladi, yopish tartibi va ochiq dialoglar hisobi                                                                     |

**`ModalProvider`** siz bitta modal uchun hammasi ishlaydi; **ustma-ust** bir nechta dialog uchun provayder kerak.

### Odatdagi kontent (`children`)

Tavsiya etilgan «uch qavat» yig‘inish — sarlavha, tana, pastki qism (har qanday blokni tashlab yuborish yoki o‘z razmetkangiz bilan almashtirish mumkin):

```text
Modal                          ← qobiq: backdrop + panel + fokus
├── ModalHeader                ← sarlavha, pastki sarlavha, X / faqat yopish rejimi
├── ModalBody                  ← asosiy matn, forma, to‘sqinlikda skroll
└── ModalFooter                ← panel pastidagi harakatlar qatori
    └── …                      ← tayyor pastki bloklar quyida
```

### Tayyor sarlavha va tana bloklari

| Komponent         | Rol                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **`ModalHeader`** | Sarlavha (**`title`**), pastki sarlavha (**`subtitle`**), yopish tugmasi; faqat yopish ikonkasi varianti bor (**`ModalHeaderProps`** ga qarang) |
| **`ModalBody`**   | Kontent maydoni; **`align`** orqali tekislash (**`start`** \| **`center`**)                                                                     |

### Pastki qism va ichki bloklar

**`ModalFooter`** — pastki yo‘lak o‘ramasi. Ichiga o‘z JSX yoki quyidagi tayyor bloklardan birini qo‘ying:

| Komponent                       | Qachon ishlatiladi                                                                       |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| **`ModalFooterConfirmActions`** | Ikki tugma: «Bekor qilish» va tasdiq (**`cancelText`** / **`confirmText`**, callbacklar) |
| **`ModalFooterInfo`**           | Izoh matni yoki ikkinchi darajali harakat bitta qatorda                                  |
| **`ModalFooterStepDots`**       | Bosqichli ssenariy: **`total`** / **`activeIndex`** nuqtalari                            |
| **`ModalFooterLinkButton`**     | Havola-tugma (masalan «Batafsil»)                                                        |
| **`ModalFooterSwitch`**         | Pastki qismda almashtirgich                                                              |

### Butunlay alohida «ekran» modallari

Oddiy **`Modal`** ichidagi **`children`** emas, xuddi shu stack asosidagi tayyor kompozitsiyalar:

| Komponent          | Vazifa                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **`ConfirmModal`** | Oldindan sozlangan razmetka bilan tasdiq dialogi — [ConfirmModal](/uz/guide/components/confirm-modal) |
| **`ModalStatus`**  | Holat ekrani (ikonka + matn, **`success`** / **`error`** va boshqalar), alohida layout                |

Manbalar papkalarga bo‘lingan: **`Modal.tsx`**, **`ModalHeader/`**, **`ModalBody/`**, **`ModalFooter/`** (slotlar bilan), **`ConfirmModal/`**, **`ModalStatus/`**, **`ModalProvider.tsx`**.

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

## Misol

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
        Ochish
      </button>
      <Modal ref={modalRef} width={480}>
        <ModalHeader title="Sarlavha" subtitle="Pastki sarlavha" />
        <ModalBody>
          <p>Kontent</p>
        </ModalBody>
        <ModalFooter>
          <ModalFooterConfirmActions
            cancelText="Bekor qilish"
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

Qo‘shimcha ssenariylar (sarlavhada ikonka, **`ConfirmModal`**, **`ModalStatus`**) — Storybook **Overlays/Modal** da.

### Eksportlar jadvali

**`@v-lab/ui-kit`** dan import qilinadigan qisqacha ro‘yxat:

| Eksport                                                                                                                                 | Rol                                               |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **`ModalHeader`**, **`ModalBody`**, **`ModalFooter`**                                                                                   | Panel ichidagi uch zona                           |
| **`ModalFooterConfirmActions`**, **`ModalFooterInfo`**, **`ModalFooterStepDots`**, **`ModalFooterLinkButton`**, **`ModalFooterSwitch`** | **`ModalFooter`** toʻldirish variantlari          |
| **`ModalStatus`**, **`ConfirmModal`**                                                                                                   | Butunlay tayyor kompozitsiyalar                   |
| **`ModalProvider`**                                                                                                                     | Bir nechta **`Modal`** uchun stack va **z-index** |

**`MODAL_SIZES`**, **`MODAL_ANIMATIONS`** konstantalari — **`Modal`** dagi **`size`** va **`animation`** uchun.

## Asosiy proplar (Modal)

| Prop                   | Tip                        | Tavsif                               |
| ---------------------- | -------------------------- | ------------------------------------ |
| `width` / `maxHeight`  | son yoki CSS               | Panel o‘lchami                       |
| `closeOnBackdropClick` | `boolean`                  | Fon bosilganda yopish, standart true |
| `size`                 | **`MODAL_SIZES`** dan      | Oldindan belgilangan kenglik         |
| `animation`            | **`MODAL_ANIMATIONS`** dan | Paydo bo‘lish animatsiyasi           |

## Galereya

Har bir tugma o‘z modal variantini ochadi. Storybook **Overlays/Modal** va **`src/docs/ModalGalleryPage.tsx`** dagi ssenariylar kabi.

<ComponentDocsPreview name="modalGallery" />

Manbalar: `src/components/overlays/Modal/`.
