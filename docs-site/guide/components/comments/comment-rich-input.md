---
title: CommentRichInput
description: Rich-поле комментария с тулбаром и кнопкой отправки — без ленты.
---

# CommentRichInput

Только редактор и **`onSend(html)`**. Лента с аватарами и разделителями по дням — в [**CommentsSection**](./comments-section).

## Превью

Строки интерфейса — **английские дефолты пакета**; в приложении задайте **`placeholder`**, при необходимости **`ariaLabels`**.

<ComponentDocsPreview name="commentRichInput" />

## Импорт

```tsx
import { CommentRichInput } from '@v-lab/ui-kit'
```

## Пример

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

## Основные пропсы

Полный тип — **`CommentRichInputProps`**: обязательные **`onSend`**, **`placeholder`**; опционально **`isPending`**, **`disabled`**, **`ariaLabels`**, **`toolbarStartSlot`**, **`className`** / **`rootClassName`**. Отправка — **Enter**, новая строка — **Shift+Enter**.

## Высота и прозрачность

По умолчанию высота поля растёт от контента, а неактивное поле **не** приглушается (раньше в дефолте были зашиты `min-height: 116px` и `opacity: 0.8`). При необходимости прежнее поведение возвращается CSS-переменными:

- `--comment-input-min-height` (по умолчанию `0`) — фиксированная минимальная высота;
- `--comment-input-opacity` (по умолчанию `1`) — полупрозрачность поля.

Исходники: `src/components/Comments/CommentRichInput/` · `CommentRichInput.types.ts`.
