---
title: CommentRichInput
description: Panel va yuborish tugmasi bilan rich-izoh maydoni — lintasiz.
---

# CommentRichInput

Faqat muharrir va **`onSend(html)`**. Avatarlar va kunlar bo‘yicha ajratgichli lenta — [**CommentsSection**](/uz/guide/components/comments/comments-section).

## Preview

Interfeys qatorlari — **paketning inglizcha standartlari**; ilovada **`placeholder`** va kerak bo‘lsa **`ariaLabels`** bering.

<ComponentDocsPreview name="commentRichInput" />

## Import

```tsx
import { CommentRichInput } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { CommentRichInput } from '@v-lab/ui-kit'

export function EditorOnly() {
  return (
    <CommentRichInput
      placeholder="Write a comment…"
      onSend={async (html) => {
        await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ html }) })
      }}
    />
  )
}
```

## Asosiy proplar

To‘liq tip — **`CommentRichInputProps`**: majburiy **`onSend`**, **`placeholder`**; ixtiyoriy **`isPending`**, **`disabled`**, **`ariaLabels`**, **`toolbarStartSlot`**, **`className`** / **`rootClassName`**. Yuborish — **Enter**, yangi qator — **Shift+Enter**.

**`ariaLabels`** kalitlari: **`input`** — kiritish maydonining nomi (standart — `placeholder`), **`toolbar`** — formatlash paneli nomi (`role="toolbar"`, standartda berilmagan), shuningdek **`bold`**, **`italic`**, **`underline`**, **`strikethrough`**, **`align`**, **`send`** — tugmalar nomlari.

## Balandlik va shaffoflik

Standart holatda maydon balandligi kontentdan o‘sadi, faolsiz maydon esa **xiralashtirilmaydi** (avval standartda `min-height: 116px` va `opacity: 0.8` qat’iy yozilgan edi). Zarur bo‘lsa, avvalgi xatti-harakat CSS-o‘zgaruvchilari orqali qaytariladi:

- `--comment-input-min-height` (standart `0`) — qat’iy minimal balandlik;
- `--comment-input-opacity` (standart `1`) — maydon shaffofligi.

Manbalar: `src/components/Comments/CommentRichInput/` · `CommentRichInput.types.ts`.
