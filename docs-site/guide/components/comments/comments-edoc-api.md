---
title: 'Комментарии: интеграция с EDOC API'
description: Маппинг ответов EDOC backend в CommentThreadItem, отправка / правка / soft-delete.
---

# Комментарии: интеграция с EDOC API

Готовая обвязка `CommentsSection` под бэкенд EDOC (`/edocapp/api/edoc/v1/documents/{document_id}/comments`). Кит не делает запросов — только UI; всё ниже выполняется на стороне приложения.

## Маппинг ответа

EDOC возвращает `{ data: { comments: [...] } }` для списка и `{ data: { comment: {...} } }` для одного объекта. Каждый комментарий — `DocumentCommentAPI`:

| Поле API            | Тип      | Поле `CommentThreadItem`                                                                   |
| ------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `id`                | `string` | `id`                                                                                       |
| `content`           | `string` | `contentHtml`                                                                              |
| `created_at`        | `string` | `createdAt`                                                                                |
| `modified`          | `string` | используется для `timeLabel` / `fullDateTimeLabel`, либо для `edited_at` сравнения         |
| `is_edited`         | `bool`   | `isEdited`                                                                                 |
| `edited_at`         | `string` | подсказка для `editedMark` (опционально, формирует приложение)                             |
| `is_deleted`        | `bool`   | `isDeleted` (приходит только админу — обычный пользователь не получает удалённые элементы) |
| `can_edit`          | `bool`   | `canEdit`                                                                                  |
| `can_delete`        | `bool`   | `canDelete`                                                                                |
| `author.full_name`  | `string` | `author`                                                                                   |
| `author.avatar_url` | `string` | `avatarUrl`                                                                                |

> **Правило:** на фронте не дублируйте проверку ролей. Кнопки «Редактировать» / «Удалить» рисуем строго по `can_edit` / `can_delete` с бэкенда.

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

const LOCALE = 'ru-RU'
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

## Клиент API

Cookie-сессия Frappe (`credentials: 'include'`); формат ошибок — обычный HTTP-статус.

```ts
const BASE = '/edocapp/api/edoc/v1'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })
  if (!res.ok) {
    // 401 — не залогинен, 403 — нет прав, 404 — не найден / удалён (у обычного юзера),
    // 422 — пустой текст или PATCH/DELETE по уже удалённому
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

## Привязка к `CommentsSection`

Списком управляет приложение: после POST/PATCH добавляем / заменяем элемент в `useState`; после DELETE удаляем (для обычного пользователя) либо помечаем `isDeleted` (для админа). Лента сама сортирует по `createdAt`.

```tsx
import { useCallback, useEffect, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

const RU_STRINGS = {
  today: 'Сегодня',
  yesterday: 'Вчера',
  emptyList: 'Комментариев пока нет',
  loadErrorPrefix: 'Не удалось загрузить комментарии.',
  retry: 'Повторить',
  inputPlaceholder: 'Оставьте комментарий…',
  editAction: 'Редактировать',
  deleteAction: 'Удалить',
  editedMark: 'изменено',
  editSaveLabel: 'Сохранить',
  editCancelLabel: 'Отмена',
  deletedPlaceholder: 'Комментарий удалён',
  confirmDeleteTitle: 'Удалить комментарий?',
  confirmDeleteBody: 'Это действие нельзя отменить.',
  confirmDeleteConfirm: 'Удалить',
  confirmDeleteCancel: 'Отмена',
  commentActionsAriaLabel: 'Действия с комментарием',
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
      // Обычный пользователь больше не получает удалённый элемент в GET — убираем из стейта.
      // Админ: при следующем GET элемент придёт с is_deleted: true. Для немедленного UI
      // достаточно пометить isDeleted локально:
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
      strings={RU_STRINGS}
      comments={comments}
      isLoading={isLoading}
      isError={isError}
      onRetry={load}
      onSendComment={onSendComment}
      onEditComment={onEditComment}
      onDeleteComment={onDeleteComment}
      isSendPending={sendPending}
      dayDividerDateLocale="ru-RU"
    />
  )
}
```

## Обработка ошибок

| Код | Когда                                                    | UI-ответ                                                                                                                                 |
| --- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 401 | сессия истекла                                           | редирект на логин (общий перехватчик `fetch`)                                                                                            |
| 403 | пользователь не автор и не админ                         | в UI кнопок «Редактировать» / «Удалить» **не было** (т.к. `can_edit` = `false`) — это double-check от бэкенда; показать toast «Нет прав» |
| 404 | документ удалён / комментарий уже soft-deleted (обычный) | удалить элемент из стейта молча                                                                                                          |
| 422 | пустой текст / `is_deleted` для admin PATCH/DELETE       | показать ошибку; в случае DELETE по уже удалённому — обновить локально на `isDeleted`                                                    |

`DELETE` идемпотентен: повторный запрос возвращает `{ deleted: true }` — не блокируйте кнопку «Удалить» отдельным флагом.

## Санитизация HTML

`content` приходит как HTML «как в Desk». Кит рендерит через `dangerouslySetInnerHTML` — **санитизацию обязан выполнить бэкенд или приложение** (например `DOMPurify.sanitize(api.content)` перед `setComments`). Кит вырезает только `<script>` из исходящего HTML при отправке через `CommentRichInput`.

## Связанные

- [CommentsSection](./comments-section) — пропсы и общая структура
- [CommentRichInput](./comment-rich-input) — rich-поле, форматирование, режим редактирования
