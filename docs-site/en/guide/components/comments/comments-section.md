---
title: CommentsSection
description: Comment thread and input — app supplies data and strings.
---

# CommentsSection

Thread (sorted by **`createdAt`** descending — newest on top), “Today” / “Yesterday” dividers, loading and error states, inline editing and deletion through a built-in ConfirmModal. UI strings — **`strings`** or **`mergeCommentsSectionStringsFromJson`** for API responses.

## Preview

Full section with initial comments and new card submission. Copy uses **package English defaults**.

<ComponentDocsPreview name="commentsSection" />

## Import

```tsx
import {
  CommentsSection,
  mergeCommentsSectionStringsFromJson,
  type CommentThreadItem,
} from '@v-lab/ui-kit'
```

## Example: send only

```tsx
import { useCallback, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

export function CommentsBlock({ items }: { items: CommentThreadItem[] }) {
  const [comments, setComments] = useState(items)

  const onSendComment = useCallback(async (html: string) => {
    await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ html }) })
    // refresh from server or append locally
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

## Edit and delete

Pass `onEditComment(id, html)` and `onDeleteComment(id)` — cards with `canEdit` / `canDelete` will show a `…` menu.

- “Edit” opens an inline editor inside the card (CommentRichInput with `submitLabel` / `secondaryAction`). It closes after `onEditComment` resolves.
- “Delete” opens the built-in `ConfirmModal` with strings from `strings`. The actual request lives in `onDeleteComment`.
- `isEdited: true` renders an “edited ·” marker next to the timestamp.
- `isDeleted: true` renders a grey placeholder card without menu or content (use it for admin mode when the server returns soft-deleted entries).
- `deletedWithContent: true` (combined with `isDeleted: true`) keeps the deleted look (muted background, no menu) but **renders `contentHtml`** and a “deleted ·” marker next to the timestamp — for admin / audit views where the backend still returns the text.

Source `canEdit` / `canDelete` from the API — typically the user’s own comment or any comment for an admin.

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

End-to-end EDOC backend wiring: [Comments: EDOC API integration](./comments-edoc-api).

## Length limit

The `maxLength?: number` prop is forwarded to **`CommentRichInput`** (both the compose input and the inline edit editor). When set, a `current / max` counter appears in the footer. Length is measured against `textContent` (no HTML tags). Input above the limit is blocked through `beforeInput`, pasted text is truncated to the remaining room. When exceeded, the counter turns red and the send button is disabled.

```tsx
<CommentsSection comments={comments} onSendComment={onSendComment} maxLength={500} />
```

## Collapsing long comments

The `collapseAfterLines?: number` prop clamps a comment body to N lines. A **Show more / Show less** button (`showMore` / `showLess` in `strings`) appears only on real overflow. `0` / `undefined` — no limit.

- The expanded state is keyed by comment `id` and survives refetch (e.g. polling): a new array with the same content does not collapse an expanded comment.
- Clamping applies to the rendered `contentHtml` (including `deletedWithContent`), but not to the inline edit editor or the deleted placeholder.
- The height is measured automatically (from `line-height`), recomputed on container resize and after an edit is saved. The button is a native `<button aria-expanded>`, keyboard-accessible.

```tsx
<CommentsSection comments={comments} onSendComment={onSendComment} collapseAfterLines={5} />
```

## Layout handles

The section renders stable contract classes: root `vl-comments-section`, parts `vl-comments-section__<part>` (`__list`, `__comment-card`, etc.; full list in `src/theme/contracts/comments-section.ts`); styling comes from the skin. On top of that there are layout props:

- **`inputPlacement?: 'top' | 'bottom'`** — where the compose input renders relative to the list (default `top`).
- **`toolbarStartSlot?: ReactNode`** — a slot before the input toolbar (e.g. the author avatar). Forwarded to `CommentRichInput`.
- **`classNames?: Partial<Record<'root' | 'list' | 'card' | 'input', string>>`** — your classes for the inner parts (root, list, card, input); added next to the contract classes. The existing `className` is kept (merged into `root`).
- **`avatarSize?: AvatarSize`** — avatar size in cards (values `20…80`, default `40`).

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

## Main props

Full type — **`CommentsSectionProps`**: **`comments`** (`CommentThreadItem[]`), **`onSendComment`**, optional **`onEditComment`** / **`onDeleteComment`**, **`strings`** / **`inputAriaLabels`**, **`isLoading`**, **`isError`**, **`onRetry`**, **`isSendPending`**, **`sendInputDisabled`**, **`dayDividerDateLocale`**, **`maxLength`**, **`collapseAfterLines`**, **`inputPlacement`**, **`toolbarStartSlot`**, **`classNames`**, **`avatarSize`**, **`className`**.

`CommentThreadItem` has optional **`canEdit`**, **`canDelete`**, **`isEdited`**, **`isDeleted`**, **`deletedWithContent`** for the action menu and markers (see the field table in the [EDOC API integration guide](./comments-edoc-api)).

Sources: `src/components/Comments/CommentsSection/` · `commentsSection.types.ts`.
