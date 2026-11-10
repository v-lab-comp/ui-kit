---
title: Toast
description: Bildirishnoma plitkasi — ranglar, o‘lchamlar, harakatlar; navbat uchun ToastProvider kerak.
---

# Toast

**`Toast`** va **`ToastAction`** vizual komponentlari. **`useToast()`** va bildirishnomalar navbati uchun ilovani **`ToastProvider`** bilan o‘rang (Storybook va API tavsifiga qarang).

## Preview

«Toast ko‘rsatish» tugmasi (**`ToastProvider`** ichidagi **`useToast`**) va pastdagi misoldagi kabi bitta statik plitka.

<ComponentDocsPreview name="toast" />

## Import

```tsx
import { Toast, ToastAction, ToastProvider, useToast } from '@v-lab/ui-kit'
```

## Misol

Statik plitka (hujjat preview’ida):

```tsx
import { Toast, ToastAction } from '@v-lab/ui-kit'

export function InlineToast() {
  return (
    <Toast
      color="success"
      variant="light"
      size="large"
      title="Saqlandi"
      description="O‘zgarishlar qo‘llandi."
      onClose={() => {}}
      actions={[
        <ToastAction key="undo" onClick={() => {}}>
          Bekor qilish
        </ToastAction>,
      ]}
    />
  )
}
```

Ilovada bildirishnomalar navbati — **`ToastProvider`** va **`useToast()`**:

```tsx
import { ToastProvider, ToastAction, useToast } from '@v-lab/ui-kit'

function App() {
  return (
    <ToastProvider position="top-right" duration={5000}>
      <Page />
    </ToastProvider>
  )
}

function Page() {
  const toast = useToast()
  return (
    <button
      type="button"
      onClick={() =>
        toast.add('success', {
          title: 'Tayyor',
          description: 'Amaliyot bajarildi.',
          actions: [<ToastAction key="ok">OK</ToastAction>],
        })
      }
    >
      Toast ko‘rsatish
    </button>
  )
}
```

## Asosiy proplar

### `Toast` (bitta plitka)

| Prop          | Tip                                                      | Tavsif                                            |
| ------------- | -------------------------------------------------------- | ------------------------------------------------- |
| `title`       | `ReactNode`                                              | Sarlavha (majburiy)                               |
| `description` | `ReactNode`                                              | Pastki sarlavha                                   |
| `color`       | `error` \| `warning` \| `success` \| `info` \| `neutral` | Semantik rang                                     |
| `variant`     | `filled` \| `light` \| `lighter` \| `stroke`             | To‘ldirish varianti                               |
| `size`        | `x-small` \| `small` \| `large`                          | Tavsifsiz ixcham o‘lchamlar yoki to‘liq kartochka |
| `actions`     | **`<ToastAction>`** massivi                              | Harakat tugmalari                                 |
| `onClose`     | `() => void`                                             | X tugmasi bilan yopish                            |
| `icon`        | `ReactNode`                                              | Chapda o‘z ikonkasi                               |

Qo‘shimcha komponent **`title`** bilan to‘qnashmasdan **`HTMLAttributes<HTMLDivElement>`**. Tip — **`ToastProps`**.

### `ToastProvider`

| Prop           | Tip                 | Standart    | Tavsif                                   |
| -------------- | ------------------- | ----------- | ---------------------------------------- |
| `position`     | **`ToastPosition`** | `top-right` | Stack uchun ekran burchagi               |
| `duration`     | `number`            | `5000`      | Avto yopilish (ms), **0** = o‘chirmaslik |
| `offset`       | `number`            | `24`        | Chetdan chekinish (px)                   |
| `gap`          | `number`            | `12`        | Toastlar orasidagi masofa                |
| `maxToasts`    | `number`            | `5`         | Ko‘rinadiganlar maksimumi                |
| `pauseOnHover` | `boolean`           | `true`      | Hoverda taymer pauzasi                   |
| `stacking`     | `boolean`           | `true`      | Hoverda yoyiladigan stack                |

**`ToastConfig`** turlari / provayder **`ToastProvider`** da birlashgan.

### `useToast()` → `toast.add(color, options)`

Ikkinchi argument **`ToastAddOptions`**: **`title`**, **`description`**, **`variant`**, **`size`**, **`actions`**, **`icon`**, **`duration`** (bitta toast uchun ustuvor).

To‘liq turlar — **`ToastProps`**, **`ToastAddOptions`**, **`ToastContextValue`**.

## Galereya

**`ToastGalleryPage`** va Storybook **Components → Toast** dagi to‘liq historiyalar kabi: o‘lchamlar, **4 variant × 5 rang** panjarasi (harakatlar bilan, harakatsiz, faqat sarlavha), variantlar bo‘yicha «ko‘p tugma» bloki va **`ToastProvider`** bilan jonli demo.

<ComponentDocsPreview name="toastGallery" />

Manbalar: `src/components/Toast/`.
