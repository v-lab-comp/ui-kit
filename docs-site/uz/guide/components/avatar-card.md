---
title: AvatarCard
description: Profil qatori — chapda avatar, sarlavha va pastki sarlavha; ixtiyoriy o‘ng slot.
---

# AvatarCard

Gorizontal kartochka: chapda [**Avatar**](/uz/guide/components/avatar) (standart **`avatarSize`** 64), undan o‘ngda **`title`** va **`subtitle`**. Avatar uchun xuddi shu proplar (**`src`**, **`text`**, **`icon`**, **`color`**) ichki **`Avatar`** ga uzatiladi.

## Preview

<ComponentDocsPreview name="avatarCard" />

## Import

```tsx
import { AvatarCard } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { AvatarCard } from '@v-lab/ui-kit'

export function ProfileRow() {
  return (
    <AvatarCard
      src="https://example.com/photo.jpg"
      alt="Jane Doe"
      title="Jane Doe"
      subtitle="Product Manager"
    />
  )
}
```

**`rightSlot`** bilan tugma yoki menyu qo‘shish mumkin:

```tsx
<AvatarCard title="User" subtitle="Role" rightSlot={<button type="button">⋯</button>} />
```

## Asosiy proplar

| Prop                                  | Tip             | Tavsif                                |
| ------------------------------------- | --------------- | ------------------------------------- |
| `title`                               | `ReactNode`     | Asosiy qator                          |
| `subtitle`                            | `ReactNode`     | Ikkinchi qator (rol, email va hokazo) |
| `src`, `alt`, `text`, `icon`, `color` | —               | **Avatar** dagi kabi                  |
| `avatarSize`                          | Avatar o‘lchami | Standart **64**                       |
| `rightSlot`                           | `ReactNode`     | O‘ngdagi kontent                      |

Manbalar: `src/components/AvatarCard/`.
