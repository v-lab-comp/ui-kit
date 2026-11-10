---
title: CommentsSection
description: Izohlar lentasi va kiritish maydoni — ma’lumot va qatorlarni ilova beradi.
---

# CommentsSection

Lenta (**`createdAt`** bo‘yicha kamayish — yangilari yuqorida), «Today» / «Yesterday» ajratgichlari, yuklash va xato holatlari, kartochka ichidagi inline tahrirlash hamda o‘rnatilgan `ConfirmModal` orqali o‘chirish. UI qatorlari — **`strings`** yoki API javobi uchun **`mergeCommentsSectionStringsFromJson`**.

## Preview

Dastlabki izohlar va yangi kartochkalarni yuborish bilan to‘liq bo‘lim. Matnlar — **paketning inglizcha standartlari**.

<ComponentDocsPreview name="commentsSection" />

## Import

```tsx
import {
  CommentsSection,
  mergeCommentsSectionStringsFromJson,
  type CommentThreadItem,
} from '@v-lab/ui-kit'
```

## Misol: faqat yuborish

```tsx
import { useCallback, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

export function CommentsBlock({ items }: { items: CommentThreadItem[] }) {
  const [comments, setComments] = useState(items)

  const onSendComment = useCallback(async (html: string) => {
    await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ html }) })
    // ro‘yxatni serverdan yangilang yoki mahalliy qo‘shing
  }, [])

  return (
    <CommentsSection
      comments={comments}
      onSendComment={onSendComment}
      dayDividerDateLocale="en-US"
    />
  )
}
```

## Tahrirlash va o‘chirish

`onEditComment(id, html)` va `onDeleteComment(id)` ni bering — `canEdit` / `canDelete` ga ega kartochkalarda «**…**» menyusi paydo bo‘ladi.

- «Tahrirlash» kartochka ichida inline muharrirni ochadi (CommentRichInput `submitLabel` / `secondaryAction` bilan). `onEditComment` muvaffaqiyat bilan tugagach yopiladi.
- «O‘chirish» o‘rnatilgan `ConfirmModal` ni `strings` matnlari bilan ochadi. Haqiqiy so‘rovni ilova `onDeleteComment` ichida amalga oshiradi.
- `isEdited: true` vaqt yonida «edited ·» belgisini chiqaradi.
- `isDeleted: true` menyusiz va kontentsiz kulrang plejsxolderni chizadi (admin rejimi: server soft-deleted yozuvlarni qaytarsa).
- `deletedWithContent: true` (`isDeleted: true` bilan birga) kartochkaning «o‘chirilgan» ko‘rinishini saqlaydi (so‘ngan fon, menyusiz), ammo plejsxolder o‘rniga **`contentHtml`** ni va vaqt yonida «deleted ·» belgisini chiqaradi — backend matnni qaytarib bersa, admin / audit rejimi uchun.

`canEdit` / `canDelete` ni API javobidan oling — odatda foydalanuvchining o‘z izohi yoki admin uchun ixtiyoriy izoh.

```tsx
<CommentsSection
  comments={comments}
  onSendComment={onSendComment}
  onEditComment={async (id, html) => {
    await api.editComment(id, { html })
  }}
  onDeleteComment={async (id) => {
    await api.deleteComment(id)
  }}
/>
```

EDOC backend bilan to‘liq misol: [Izohlar: EDOC API integratsiyasi](./comments-edoc-api).

## Uzunlik chegarasi

`maxLength?: number` propi **`CommentRichInput`** ga (asosiy kiritish maydoniga ham, kartochka ichidagi inline muharrirga ham) uzatiladi. Berilganda futerda `current / max` hisoblagichi paydo bo‘ladi. Uzunlik `textContent` bo‘yicha (HTML teglarisiz) hisoblanadi. Chegaradan ortiq kiritish `beforeInput` orqali bloklanadi, buferdan qo‘yish qolgan joyga moslab qisqartiriladi. Chegaradan oshganda hisoblagich qizil rangga o‘zgaradi va yuborish tugmasi faolsizlanadi.

```tsx
<CommentsSection comments={comments} onSendComment={onSendComment} maxLength={500} />
```

## Uzun izohlarni yig‘ish

`collapseAfterLines?: number` propi izoh tanasini N qatorgacha yig‘adi. **Ko‘proq ko‘rsatish / Kamroq ko‘rsatish** tugmasi (`strings` dagi `showMore` / `showLess`) faqat haqiqiy to‘lib ketishda paydo bo‘ladi. `0` / `undefined` — cheklovsiz.

- «Yoyilgan» holat izoh `id` siga bog‘lanadi va qayta yuklashda (masalan, polling) saqlanadi: bir xil kontentli yangi massiv yoyilgan izohni yig‘ib qo‘ymaydi.
- Yig‘ish faqat render qilingan `contentHtml` ga (shu jumladan `deletedWithContent`) qo‘llanadi, inline muharrirga va o‘chirilgan izoh pleysxolderiga qo‘llanmaydi.
- Balandlik avtomatik (`line-height` bo‘yicha) o‘lchanadi, konteyner o‘lchami o‘zgarganda va tahrir saqlangandan so‘ng qayta hisoblanadi. Tugma — native `<button aria-expanded>`, klaviaturadan foydalanish mumkin.

```tsx
<CommentsSection comments={comments} onSendComment={onSendComment} collapseAfterLines={5} />
```

## Vyorstka uchun dastaklari

Bo‘lim kontraktning barqaror sinflarini render qiladi: ildiz `vl-comments-section`, qismlar `vl-comments-section__<part>` (`__list`, `__comment-card` va boshqalar; to‘liq ro‘yxat — `src/theme/contracts/comments-section.ts`); bezakni skin beradi. Ulardan tashqari vyorstka uchun proplar bor:

- **`inputPlacement?: 'top' | 'bottom'`** — kiritish maydoni lentaga nisbatan qayerda render qilinadi (standart `top`).
- **`toolbarStartSlot?: ReactNode`** — kiritish maydoni asboblar panelidan oldingi slot (masalan, muallif avatari). `CommentRichInput` ga uzatiladi.
- **`classNames?: Partial<Record<'root' | 'list' | 'card' | 'input', string>>`** — ichki qismlar uchun sizning sinflaringiz (root, lenta, kartochka, kiritish maydoni); kontrakt sinflariga qo‘shiladi. Mavjud `className` saqlanadi (`root` ga qo‘shiladi).
- **`avatarSize?: AvatarSize`** — kartochkalardagi avatar o‘lchami (qiymatlar `20…80`, standart `40`).

```tsx
<CommentsSection
  comments={comments}
  onSendComment={onSendComment}
  inputPlacement="bottom"
  avatarSize={32}
  classNames={{ card: 'my-comment-card' }}
  toolbarStartSlot={<AuthorAvatar />}
/>
```

## Asosiy proplar

To‘liq tip — **`CommentsSectionProps`**: **`comments`** (`CommentThreadItem[]`), **`onSendComment`**, ixtiyoriy **`onEditComment`** / **`onDeleteComment`**, **`strings`** / **`inputAriaLabels`**, **`isLoading`**, **`isError`**, **`onRetry`**, **`isSendPending`**, **`sendInputDisabled`**, **`dayDividerDateLocale`**, **`maxLength`**, **`collapseAfterLines`**, **`inputPlacement`**, **`toolbarStartSlot`**, **`classNames`**, **`avatarSize`**, **`className`**.

`CommentThreadItem` da amallar menyusi va belgilar uchun ixtiyoriy **`canEdit`**, **`canDelete`**, **`isEdited`**, **`isDeleted`**, **`deletedWithContent`** mavjud (maydonlar jadvalini [EDOC API integratsiyasi qo‘llanmasi](./comments-edoc-api) da ko‘ring).

Manbalar: `src/components/Comments/CommentsSection/` · `commentsSection.types.ts`.
