---
title: useClickOutside
description: Ko‘rsatilgan DOM tugundan tashqaridagi bosishlar — reactuse.org ga o‘xshash, soddalashtirilgan API (ref + callback).
---

# useClickOutside

Maqsad element **tashqarisidagi** bosishlarni qayta ishlaydi: **`document`** da (`click`) puflash fazasida obuna. Agar **`event.target`** **`ref.current`** ichida bo‘lmasa, callback chaqiriladi. Pastki menyular va Floating UI [`useDismiss`](https://floating-ui.com/docs/useDismiss) siz yordamchi yopish uchun mos.

Ma’noda [ReactUse useClickOutside](https://reactuse.org/functions/hooks/useClickOutside) ga yaqin, lekin API doimiy: avvalo **`ref`**, keyin **`callback`** va ixtiyoriy **`enabled`**. Callback **`useRef`** da saqlanadi — har renderda tinglovchini yozib o‘tmaslik uchun.

## O‘rnatish

Hook asosiy paket bilan keladi — alohida o‘rnatish shart emas (kitni qanday ulash: [O‘rnatish](../installation)).

```tsx
import { useClickOutside } from '@v-lab/ui-kit'
```

## Foydalanish

Minimal chaqiruv:

```tsx
const ref = useRef<HTMLDivElement>(null)

useClickOutside(ref, (event) => {
  console.log('click outside', event)
})
```

Tez-tez uchraydigan naqsh — overlay faqat ochiq bo‘lganda yopiladi (uchinchi argument **`enabled`**):

```tsx
useClickOutside(ref, () => setOpen(false), open)
```

## Demo

Interaktiv preview (hujjatdagi komponentlar bilan bir xil mexanizm):

<ComponentDocsPreview name="hookClickOutside" />

## API

### Parameters

| Name             | Type                          | Default | Description                                                                              |
| ---------------- | ----------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `ref`            | `RefObject<T \| null>`        | —       | Ildiz elementi: **ichkaridagi** bosishlar «tashqari» hisoblanmaydi (`Element.contains`). |
| `onClickOutside` | `(event: MouseEvent) => void` | —       | `ref.current` tashqarisida bosilganda chaqiriladi.                                       |
| `enabled`        | `boolean`                     | `true`  | `false` bo‘lsa, `document` ga tinglovchi qo‘yilmaydi (panel yopiq bo‘lganda qulay).      |

### Returns

`void`

### Xatti-harakat

- Hodisa: faqat **`document`** dagi **`click`** (`mousedown` emas).
- Maqsad hodisa paytida **`ref.current`** bilan solishtiriladi; **`capture`** ishlatilmaydi.

## Manba kodi

Repozitoriydagi amalga oshirish: `src/hooks/dom/useClickOutside.ts`.
