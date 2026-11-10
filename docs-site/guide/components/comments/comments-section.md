---
title: CommentsSection
description: Лента комментариев и поле ввода — данные и строки задаёт приложение.
---

# CommentsSection

Лента (сортировка по **`createdAt`** по убыванию — новые сверху), разделители «Today» / «Yesterday», состояния загрузки и ошибки, inline-редактирование и удаление через ConfirmModal. Строки UI — **`strings`** или **`mergeCommentsSectionStringsFromJson`** для ответа API.

## Превью

Полная секция с начальными комментариями и отправкой новых карточек. Тексты — **дефолты пакета на английском**.

<ComponentDocsPreview name="commentsSection" />

## Импорт

```tsx
import {
  CommentsSection,
  mergeCommentsSectionStringsFromJson,
  type CommentThreadItem,
} from '@v-lab/ui-kit'
```

## Пример: только отправка

```tsx
import { useCallback, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

export function CommentsBlock({ items }: { items: CommentThreadItem[] }) {
  const [comments, setComments] = useState(items)

  const onSendComment = useCallback(async (html: string) => {
    await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ html }) })
    // обновите список с сервера или добавьте локально
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

## Редактирование и удаление

Передайте `onEditComment(id, html)` и `onDeleteComment(id)` — в карточках с `canEdit` / `canDelete` появится меню «**…**».

- «Редактировать» открывает inline-редактор прямо в карточке (CommentRichInput с `submitLabel` / `secondaryAction`). После успешного `onEditComment` редактор закрывается.
- «Удалить» открывает встроенный `ConfirmModal` со строками из `strings`. Реальный запрос делает приложение в `onDeleteComment`.
- Поле `isEdited: true` рисует пометку «edited ·» рядом со временем.
- Поле `isDeleted: true` рисует серую карточку-плейсхолдер без меню и контента (используется для админ-режима, когда сервер возвращает soft-deleted элементы).
- Поле `deletedWithContent: true` (вместе с `isDeleted: true`) сохраняет «удалённый» вид (приглушённый фон, без меню), но **показывает `contentHtml`** и пометку «deleted ·» рядом со временем — для админ-режима / аудита, когда бэкенд всё ещё отдаёт текст.

Флаги `canEdit` / `canDelete` берите из ответа API — обычно это «свой комментарий» либо у админа.

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

Готовый пример обвязки с EDOC-бэкендом: [Комментарии: интеграция с EDOC API](./comments-edoc-api).

## Лимит длины

Проп `maxLength?: number` пробрасывается в **`CommentRichInput`** (и в инпут отправки, и в inline-редактор правки). Когда задан — в футере поля появляется счётчик `current / max`. Длина считается по `textContent` (без HTML-тегов). Ввод сверх лимита блокируется через `beforeInput`, вставка из буфера обрезается до остатка. При превышении счётчик подсвечивается красным и кнопка отправки недоступна.

```tsx
<CommentsSection comments={comments} onSendComment={onSendComment} maxLength={500} />
```

## Сворачивание длинных комментариев

Проп `collapseAfterLines?: number` сворачивает тело комментария до N строк. Кнопка **«Показать больше» / «Показать меньше»** (`showMore` / `showLess` в `strings`) появляется только при реальном переполнении. `0` / `undefined` — без ограничения.

- Состояние «развёрнут» привязано к `id` комментария и переживает рефетч ленты (например поллинг): новый массив с тем же контентом не схлопывает раскрытый комментарий.
- Кламп применяется к отрендеренному `contentHtml` (в т.ч. к `deletedWithContent`), но не к inline-редактору правки и не к плейсхолдеру удалённого.
- Высота считается автоматически (по `line-height`), пересчитывается при ресайзе контейнера и после сохранения правки. Кнопка — нативная `<button aria-expanded>`, доступна с клавиатуры.

```tsx
<CommentsSection comments={comments} onSendComment={onSendComment} collapseAfterLines={5} />
```

## Ручки вёрстки

Секция рендерит стабильные классы контракта: корень `vl-comments-section`, части `vl-comments-section__<part>` (`__list`, `__comment-card` и др., список — `src/theme/contracts/comments-section.ts`); оформление задаёт скин. Помимо них есть пропсы для вёрстки:

- **`inputPlacement?: 'top' | 'bottom'`** — где рендерить поле ввода относительно ленты (по умолчанию `top`).
- **`toolbarStartSlot?: ReactNode`** — слот слева от тулбара поля ввода (например аватар автора). Пробрасывается в `CommentRichInput`.
- **`classNames?: Partial<Record<'root' | 'list' | 'card' | 'input', string>>`** — ваши классы на внутренние части секции (корень, лента, карточка, поле ввода); добавляются к классам контракта. Прежний `className` сохранён (мёржится в `root`).
- **`avatarSize?: AvatarSize`** — размер аватара в карточках (значения `20…80`, по умолчанию `40`).

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

## Основные пропсы

Полный тип — **`CommentsSectionProps`**: **`comments`** (`CommentThreadItem[]`), **`onSendComment`**, опциональные **`onEditComment`** / **`onDeleteComment`**, **`strings`** / **`inputAriaLabels`**, **`isLoading`**, **`isError`**, **`onRetry`**, **`isSendPending`**, **`sendInputDisabled`**, **`dayDividerDateLocale`**, **`maxLength`**, **`collapseAfterLines`**, **`inputPlacement`**, **`toolbarStartSlot`**, **`classNames`**, **`avatarSize`**, **`className`**.

В `CommentThreadItem` для меню действий и пометок используются опциональные **`canEdit`**, **`canDelete`**, **`isEdited`**, **`isDeleted`**, **`deletedWithContent`** (см. таблицу полей в гайде [интеграции с EDOC API](./comments-edoc-api)).

Исходники: `src/components/Comments/CommentsSection/` · `commentsSection.types.ts`.
