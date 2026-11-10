---
title: Comments
description: CommentRichInput and CommentsSection — like Storybook Components / Comments.
---

# Comments

Sources: **`src/components/Comments/`**. Storybook **Components → Comments** matches by name:

| Storybook            | Documentation                                                         |
| -------------------- | --------------------------------------------------------------------- |
| **CommentRichInput** | [CommentRichInput](./comment-rich-input) — rich field and submit only |
| **CommentsSection**  | [CommentsSection](./comments-section) — thread + input                |

End-to-end EDOC API wiring (create / edit / soft-delete, response mapping): [Comments: EDOC API integration](./comments-edoc-api).

**Enter** sends a comment, **Shift+Enter** inserts a new line in the field.

Import from the main package:

```tsx
import {
  CommentRichInput,
  CommentsSection,
  mergeCommentsSectionStringsFromJson,
} from '@v-lab/ui-kit'
```

Interactive controls and all story variants — **`npm run storybook`**.
