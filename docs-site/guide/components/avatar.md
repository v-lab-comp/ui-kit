---
title: Avatar
description: Аватар пользователя — изображение, инициалы, иконка, размеры и семантические цвета.
---

# Avatar

Круглый аватар: **`src`** (картинка), **`text`** (инициалы), **`icon`** (например из **`@remixicon/react`**) или плейсхолдер-силуэт, если ничего не задано. Размеры и цвета соответствуют дизайн-системе (**`AVATAR_SIZE_OPTIONS`**, **`AVATAR_COLOR_OPTIONS`**).

## Превью

<ComponentDocsPreview name="avatar" />

## Импорт

```tsx
import { Avatar, AVATAR_SIZE_OPTIONS, AVATAR_COLOR_OPTIONS } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { RiUserLine } from '@remixicon/react'
import { Avatar } from '@v-lab/ui-kit'

export function UserAvatar() {
  return (
    <>
      <Avatar src="https://example.com/photo.jpg" alt="User" size={56} />
      <Avatar text="AB" size={48} color="primary" />
      <Avatar icon={<RiUserLine size={28} />} size={56} />
    </>
  )
}
```

## Основные пропсы

| Проп    | Тип            | Описание                                                                                                                       |
| ------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `src`   | `string`       | URL изображения                                                                                                                |
| `alt`   | `string`       | Доступное имя (имя человека): у фото — `alt` у `<img>`, у инициалов/иконки — `role="img"` + `aria-label`. Пусто — декоративный |
| `text`  | `ReactNode`    | Инициалы (обычно 1–2 символа)                                                                                                  |
| `icon`  | `ReactNode`    | Иконка, если нет фото и текста                                                                                                 |
| `size`  | число из шкалы | 20 … 80 (см. **`AVATAR_SIZE_OPTIONS`**)                                                                                        |
| `color` | из палитры     | См. **`AVATAR_COLOR_OPTIONS`**                                                                                                 |

## Галерея

Размеры, варианты, палитра, **AvatarGroup** в составе страницы — как **Gallery/Avatar** в Storybook.

<ComponentDocsPreview name="avatarGallery" />

Исходники: `src/components/Avatar/`.
