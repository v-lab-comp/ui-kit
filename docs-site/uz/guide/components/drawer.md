---
title: Drawer
description: Ekranning istalgan chetidan chiqadigan panel — fokus tutqich, overlay stek va mobil bottom-sheet bilan.
---

# Drawer

**`Drawer`** — ekranning istalgan chetidan chiqadigan panel. `Modal` bilan bir xil infratuzilma: `body`da portal, fokus tutqich (`FloatingFocusManager`), Escape / backdrop yopish, scroll blokirovka, `ModalProvider` orqali overlay stek.

**`ref`** (`DrawerHandle.open()` / `close()`) yoki boshqariladigan rejim (`open` + `onOpenChange`) orqali oching. Mobil qurilmalarda (≤ 640 px) `mobileBottom` yoniq bo'lsa (standart) panel `side` qiymatidan qat'iy nazar pastdan chiqadi.

```text
Drawer                 ← backdrop + panel + fokus tutqich
├── DrawerHeader       ← sarlavha, taglavha, belgi, yopish tugmasi
├── DrawerBody         ← aylantiriladigan kontent
└── DrawerFooter       ← harakat tugmalari; startContent — chap joy
```

## Ko'rinish

<ComponentDocsPreview name="drawer" />

## Import

```tsx
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, type DrawerHandle } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useRef } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  type DrawerHandle,
} from '@v-lab/ui-kit'

export function InviteUserDrawer() {
  const drawerRef = useRef<DrawerHandle>(null)

  return (
    <>
      <Button onClick={() => drawerRef.current?.open()}>Foydalanuvchi qo'shish</Button>

      <Drawer ref={drawerRef} size="md">
        <DrawerHeader title="Yangi foydalanuvchi" subtitle="Ma'lumotlarni to'ldiring" />
        <DrawerBody>{/* kontent */}</DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => drawerRef.current?.close()}>
            Bekor qilish
          </Button>
          <Button>Saqlash</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
```

## Boshqariladigan rejim

```tsx
const [open, setOpen] = useState(false)

<Drawer open={open} onOpenChange={setOpen} side="right">
  {/* ... */}
</Drawer>
```

## Drawer proplari

| Prop                   | Tur                                      | Standart | Tavsif                                                  |
| ---------------------- | ---------------------------------------- | -------- | ------------------------------------------------------- |
| `side`                 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Panel qaysi chetdan chiqadi                             |
| `mobileBottom`         | `boolean`                                | `true`   | ≤ 640 px da har doim pastdan chiqadi                    |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl'`           | `'md'`   | Oldindan belgilangan o'lcham (360 / 440 / 560 / 720 px) |
| `width`                | `number \| string`                       | —        | Maxsus kenglik/balandlik (`size` ni bekor qiladi)       |
| `open`                 | `boolean`                                | —        | Boshqariladigan ochiq holat                             |
| `onOpenChange`         | `(open: boolean) => void`                | —        | Ochiq holat o'zgarganda chaqiriladi                     |
| `closeOnBackdropClick` | `boolean`                                | `true`   | Backdrop bosilganda yopish                              |
| `hideBackdrop`         | `boolean`                                | `false`  | Backdrop qoplamani yashirish                            |
| `animationDuration`    | `number`                                 | `280`    | Animatsiya davomiyligi ms da                            |
| `zIndex`               | `number`                                 | —        | Qo'lda z-index (o'rniga `ModalProvider` ishlating)      |
| `ariaLabel`            | `string`                                 | —        | Panel uchun `aria-label` (sarlavha bo'lmasa)            |

## DrawerHandle (ref)

```tsx
const ref = useRef<DrawerHandle>(null)
ref.current?.open()
ref.current?.close()
```
