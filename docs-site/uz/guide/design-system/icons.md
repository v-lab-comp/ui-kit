---
title: Ikonkalar
description: Remix Icon va qayta eksport — Storybook Design System / Icons kabi.
---

# Ikonkalar

Storybook’da **Design System → Icons** bilan mos (**Remix Icon Gallery** hikoyasi).

## Galereya

Storybook’dagi bilan bir xil qidiruv va nomlar panjarasi — chapdagi **Mavzu** almashtirgichi tokenlar uchun yorug‘/qorong‘i fonni belgilaydi.

<ComponentDocsPreview name="iconsGallery" />

## Kutubxona

Komponentlar va storisda **`@remixicon/react`** ishlatiladi: nom bo‘yicha aniq belgini import qilish, maydon va tugmalardagi inline ikonlar uchun odatda **`16`** o‘lcham.

```tsx
import { RiMailLine } from '@remixicon/react'

export function Example() {
  return <RiMailLine size={16} />
}
```

## Paketdan qayta eksport

**`@v-lab/ui-kit/icons`** kirish nuqtasi — ilovalar uchun ikonlarning barrel fayli, agar bitta joydan ui-kit orqali import qilish kerak bo‘lsa.

## Storis uchun umumiy ikonlar

Repozitoriyda **`src/stories/helpers.tsx`** — hujjatlar uchun qayta ishlatiladigan o‘ramlar; mahsulot kodida xom SVG ni takrorlamang.
