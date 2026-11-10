---
title: 'Comments: EDOC API integration'
description: Mapping EDOC backend responses into CommentThreadItem; send / edit / soft-delete wiring.
---

# Comments: EDOC API integration

End-to-end wiring of `CommentsSection` against the EDOC backend (`/edocapp/api/edoc/v1/documents/{document_id}/comments`). The kit issues no requests — everything below lives in the application.

## Response mapping

The EDOC API returns `{ data: { comments: [...] } }` for lists and `{ data: { comment: {...} } }` for a single object. Each item is a `DocumentCommentAPI`:

| API field           | Type     | `CommentThreadItem` field                                               |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `id`                | `string` | `id`                                                                    |
| `content`           | `string` | `contentHtml`                                                           |
| `created_at`        | `string` | `createdAt`                                                             |
| `modified`          | `string` | feeds `timeLabel` / `fullDateTimeLabel`, or `edited_at` comparisons     |
| `is_edited`         | `bool`   | `isEdited`                                                              |
| `edited_at`         | `string` | optional hint for `editedMark` (formatted by the app)                   |
| `is_deleted`        | `bool`   | `isDeleted` (admin only — regular users never see soft-deleted entries) |
| `can_edit`          | `bool`   | `canEdit`                                                               |
| `can_delete`        | `bool`   | `canDelete`                                                             |
| `author.full_name`  | `string` | `author`                                                                |
| `author.avatar_url` | `string` | `avatarUrl`                                                             |

> **Rule:** do not duplicate role checks on the frontend. Render the Edit / Delete actions strictly from `can_edit` / `can_delete` returned by the backend.

```ts
import type { CommentThreadItem } from '@v-lab/ui-kit'

type ApiAuthor = { full_name: string; avatar_url?: string | null }
type ApiComment = {
  id: string
  content: string
  created_at: string
  modified: string
  is_edited: boolean
  edited_at: string | null
  is_deleted: boolean
  can_edit: boolean
  can_delete: boolean
  author: ApiAuthor
}

const LOCALE = 'en-US'
const TIME_FMT: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }

export function mapApiToItem(api: ApiComment): CommentThreadItem {
  const createdAt = new Date(api.created_at)
  return {
    id: api.id,
    author: api.author.full_name,
    avatarUrl: api.author.avatar_url ?? null,
    contentHtml: api.is_deleted ? '' : api.content,
    createdAt: api.created_at,
    timeLabel: createdAt.toLocaleTimeString(LOCALE, TIME_FMT),
    fullDateTimeLabel: createdAt.toLocaleString(LOCALE),
    canEdit: api.can_edit,
    canDelete: api.can_delete,
    isEdited: api.is_edited,
    isDeleted: api.is_deleted,
  }
}
```

## API client

Frappe cookie session (`credentials: 'include'`); errors are plain HTTP statuses.

```ts
const BASE = '/edocapp/api/edoc/v1'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })
  if (!res.ok) {
    // 401 — not logged in, 403 — no permission, 404 — not found / deleted (regular user),
    // 422 — empty body or PATCH/DELETE on already-deleted comment
    throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status })
  }
  return (await res.json()) as T
}

export const commentsApi = {
  list: (documentId: string) =>
    request<{ data: { comments: ApiComment[] } }>(
      `/documents/${documentId}/comments?order=asc&limit=500`
    ).then((r) => r.data.comments),

  create: (documentId: string, content: string) =>
    request<{ data: { comment: ApiComment } }>(`/documents/${documentId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }).then((r) => r.data.comment),

  update: (documentId: string, commentId: string, content: string) =>
    request<{ data: { comment: ApiComment } }>(`/documents/${documentId}/comments/${commentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }).then((r) => r.data.comment),

  remove: (documentId: string, commentId: string) =>
    request<{ data: { deleted: true } }>(`/documents/${documentId}/comments/${commentId}`, {
      method: 'DELETE',
    }),
}
```

## Wiring it into `CommentsSection`

The app owns the list: after POST/PATCH replace / append; after DELETE either drop the item (regular user) or mark it `isDeleted` (admin). `CommentsSection` sorts by `createdAt` itself.

```tsx
import { useCallback, useEffect, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

const EN_STRINGS = {
  today: 'Today',
  yesterday: 'Yesterday',
  emptyList: 'No comments yet.',
  loadErrorPrefix: 'Could not load comments.',
  retry: 'Retry',
  inputPlaceholder: 'Write a comment…',
  editAction: 'Edit',
  deleteAction: 'Delete',
  editedMark: 'edited',
  editSaveLabel: 'Save',
  editCancelLabel: 'Cancel',
  deletedPlaceholder: 'Comment deleted',
  confirmDeleteTitle: 'Delete comment?',
  confirmDeleteBody: 'This action cannot be undone.',
  confirmDeleteConfirm: 'Delete',
  confirmDeleteCancel: 'Cancel',
  commentActionsAriaLabel: 'Comment actions',
} as const

export function DocumentComments({
  documentId,
  isAdmin,
}: {
  documentId: string
  isAdmin: boolean
}) {
  const [comments, setComments] = useState<CommentThreadItem[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [sendPending, setSendPending] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const list = await commentsApi.list(documentId)
      setComments(list.map(mapApiToItem))
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [documentId])

  useEffect(() => void load(), [load])

  const onSendComment = useCallback(
    async (html: string) => {
      setSendPending(true)
      try {
        const created = await commentsApi.create(documentId, html)
        setComments((prev) => [...prev, mapApiToItem(created)])
      } finally {
        setSendPending(false)
      }
    },
    [documentId]
  )

  const onEditComment = useCallback(
    async (id: string, html: string) => {
      const updated = await commentsApi.update(documentId, id, html)
      const next = mapApiToItem(updated)
      setComments((prev) => prev.map((c) => (c.id === id ? next : c)))
    },
    [documentId]
  )

  const onDeleteComment = useCallback(
    async (id: string) => {
      await commentsApi.remove(documentId, id)
      // A regular user no longer receives the deleted item from GET — drop it locally.
      // An admin will get is_deleted: true on the next GET. For an immediate UI update
      // mark the item as deleted locally:
      setComments((prev) =>
        isAdmin
          ? prev.map((c) =>
              c.id === id
                ? { ...c, isDeleted: true, canEdit: false, canDelete: false, contentHtml: '' }
                : c
            )
          : prev.filter((c) => c.id !== id)
      )
    },
    [documentId, isAdmin]
  )

  return (
    <CommentsSection
      strings={EN_STRINGS}
      comments={comments}
      isLoading={isLoading}
      isError={isError}
      onRetry={load}
      onSendComment={onSendComment}
      onEditComment={onEditComment}
      onDeleteComment={onDeleteComment}
      isSendPending={sendPending}
      dayDividerDateLocale="en-US"
    />
  )
}
```

## Error handling

| Code | When                                                           | UI response                                                                                                                |
| ---- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 401  | session expired                                                | redirect to login (shared `fetch` interceptor)                                                                             |
| 403  | user is neither author nor admin                               | no Edit/Delete buttons should have been shown anyway (because `can_edit` was `false`) — backend double-check; show a toast |
| 404  | document removed / comment already soft-deleted (regular user) | silently drop the item from state                                                                                          |
| 422  | empty content / admin PATCH/DELETE on already-deleted entry    | show an error; for DELETE-on-deleted reconcile locally to `isDeleted`                                                      |

`DELETE` is idempotent — a second call still returns `{ deleted: true }`. Don’t gate the Delete button behind an extra in-flight flag.

## HTML sanitisation

`content` arrives as Desk-style HTML. The kit renders through `dangerouslySetInnerHTML` — **sanitisation is the backend’s or the application’s job** (e.g. `DOMPurify.sanitize(api.content)` before `setComments`). The kit only strips `<script>` from outgoing HTML inside `CommentRichInput`.

## Related

- [CommentsSection](./comments-section) — props and overall structure
- [CommentRichInput](./comment-rich-input) — rich field, formatting, edit mode
