---
title: AvatarCard
description: Строка профиля — аватар слева, заголовок и подзаголовок; опционально слот справа.
---

# AvatarCard

Горизонтальная карточка: слева **[Avatar](./avatar)** (**`avatarSize`** по умолчанию 64), справа от него **`title`** и **`subtitle`**. Те же пропсы аватара (**`src`**, **`text`**, **`icon`**, **`color`**) пробрасываются во внутренний **`Avatar`**.

## Превью

<ComponentDocsPreview name="avatarCard" />

## Импорт

```tsx
import { AvatarCard } from '@v-lab/ui-kit'
```

## Пример

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

С **`rightSlot`** можно вставить кнопку или меню:

```tsx
<AvatarCard title="User" subtitle="Role" rightSlot={<button type="button">⋯</button>} />
```

## Основные пропсы

| Проп                                  | Тип           | Описание                           |
| ------------------------------------- | ------------- | ---------------------------------- |
| `title`                               | `ReactNode`   | Основная строка                    |
| `subtitle`                            | `ReactNode`   | Вторая строка (роль, email и т.д.) |
| `src`, `alt`, `text`, `icon`, `color` | —             | Как у **Avatar**                   |
| `avatarSize`                          | размер Avatar | По умолчанию **64**                |
| `rightSlot`                           | `ReactNode`   | Контент справа                     |

Исходники: `src/components/AvatarCard/`.
