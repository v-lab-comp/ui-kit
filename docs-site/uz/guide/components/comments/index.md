---
title: Izohlar
description: CommentRichInput va CommentsSection — Storybook Components / Comments dagi kabi.
---

# Izohlar

Manbalar: **`src/components/Comments/`**. Storybook **Components → Comments** bo‘limi nomlari bilan mos:

| Storybook            | Hujjat                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| **CommentRichInput** | [CommentRichInput](/uz/guide/components/comments/comment-rich-input) — faqat rich-maydon va yuborish |
| **CommentsSection**  | [CommentsSection](/uz/guide/components/comments/comments-section) — lenta + kiritish maydoni         |

EDOC API bilan to‘liq integratsiya (yaratish / tahrirlash / soft-delete, javobni mapping qilish): [Izohlar: EDOC API integratsiyasi](/uz/guide/components/comments/comments-edoc-api).

**Enter** izohni yuboradi, **Shift+Enter** — yangi qator.

Asosiy paketdan import:

```tsx
import {
  CommentRichInput,
  CommentsSection,
  mergeCommentsSectionStringsFromJson,
} from '@v-lab/ui-kit'
```

Interaktiv boshqaruvlar va barcha hikoya variantlari — **`npm run storybook`**.
