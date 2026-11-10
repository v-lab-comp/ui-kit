---
title: Комментарии
description: CommentRichInput и CommentsSection — как в Storybook Components / Comments.
---

# Комментарии

Исходники: **`src/components/Comments/`**. В Storybook раздел **Components → Comments** совпадает по именам:

| Storybook            | Документация                                                           |
| -------------------- | ---------------------------------------------------------------------- |
| **CommentRichInput** | [CommentRichInput](./comment-rich-input) — только rich-поле и отправка |
| **CommentsSection**  | [CommentsSection](./comments-section) — лента + поле ввода             |

Готовая интеграция с EDOC API (создание / правка / soft-delete, маппинг ответа): [Комментарии: интеграция с EDOC API](./comments-edoc-api).

**Enter** отправляет комментарий, **Shift+Enter** — новая строка в поле.

Импорт из основного пакета:

```tsx
import {
  CommentRichInput,
  CommentsSection,
  mergeCommentsSectionStringsFromJson,
} from '@v-lab/ui-kit'
```

Интерактивные контролы и все варианты историй — в **`npm run storybook`**.
