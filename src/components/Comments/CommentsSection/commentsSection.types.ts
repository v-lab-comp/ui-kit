import type { ReactNode } from 'react'
import type { AvatarSize } from '../../Avatar/Avatar.types'
import type { CommentRichInputAriaLabels } from '../CommentRichInput/CommentRichInput.types'

/**
 * Один комментарий в ленте. Поля `timeLabel` / `fullDateTimeLabel` формирует приложение
 * (например через `Intl.DateTimeFormat` или данные, которые подготовило приложение).
 */
export type CommentThreadItem = {
  id: string
  author: string
  avatarUrl?: string | null
  /** HTML для отображения; доверяйте только санитизированному контенту с бэка */
  contentHtml: string
  /** ISO или строка, парсящаяся в `Date`, для группировки по дням */
  createdAt: string
  timeLabel: string
  /** Подсказка при наведении на время */
  fullDateTimeLabel?: string
  /** Можно ли редактировать (с бэка: `can_edit`). Если `true` — в меню появляется «Редактировать» */
  canEdit?: boolean
  /** Можно ли удалить (с бэка: `can_delete`). Если `true` — в меню появляется «Удалить» */
  canDelete?: boolean
  /** Был ли комментарий отредактирован после создания (с бэка: `is_edited`) */
  isEdited?: boolean
  /**
   * Soft-deleted. Для админа — рендерим серую карточку-плейсхолдер без кнопок и контента.
   * Для обычного пользователя такие элементы обычно не приходят в массиве.
   */
  isDeleted?: boolean
  /**
   * Если `isDeleted: true` и бэкенд всё ещё возвращает `contentHtml` (например для админа /
   * аудита), включите этот флаг — карточка останется в «удалённом» состоянии (без меню действий),
   * но вместо плейсхолдера покажет контент и пометку «удалено» рядом со временем.
   */
  deletedWithContent?: boolean
}

/** Ключи всех текстовых строк секции (плейсхолдер инпута входит в тот же набор). */
export type CommentsSectionStringKey =
  | 'today'
  | 'yesterday'
  | 'emptyList'
  | 'loadErrorPrefix'
  | 'retry'
  | 'inputPlaceholder'
  | 'editAction'
  | 'deleteAction'
  | 'editedMark'
  | 'editSaveLabel'
  | 'editCancelLabel'
  | 'deletedPlaceholder'
  | 'deletedMark'
  | 'confirmDeleteTitle'
  | 'confirmDeleteBody'
  | 'confirmDeleteConfirm'
  | 'confirmDeleteCancel'
  | 'commentActionsAriaLabel'
  | 'showMore'
  | 'showLess'

/**
 * Частичный объект строк с клиента / из JSON: неизвестные ключи игнорируйте через
 * {@link mergeCommentsSectionStringsFromJson}, либо передавайте уже очищенный `Partial<…>`.
 */
export type CommentsSectionStringsOverride = Partial<Record<CommentsSectionStringKey, string>>

/** Подписи ленты без плейсхолдера поля ввода */
export type CommentsSectionLabels = {
  today: string
  yesterday: string
  emptyList: string
  loadErrorPrefix: string
  retry: string
}

/** Полный набор строк + опциональные ARIA для rich input (удобно держать рядом в конфиге приложения). */
export type CommentsSectionMessages = CommentsSectionLabels & {
  inputPlaceholder: string
  inputAriaLabels?: CommentRichInputAriaLabels
}

/**
 * Секция «комментарии»: ввод + лента. **Без запросов** — только UI.
 *
 * Лента: элементы сортируются по `createdAt` по убыванию (новые сверху), порядок в пропе `comments` не важен.
 *
 * Строки: встроенные английские дефолты; опционально `strings` (частичный объект) их переопределяет.
 */
export type CommentsSectionProps = {
  /**
   * Комментарии в любом порядке: в UI сортируются по `createdAt` **по убыванию** (новые сверху).
   */
  comments: CommentThreadItem[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  /**
   * Переопределение текстов; не указанные ключи берутся из `DEFAULT_COMMENTS_SECTION_STRINGS`.
   * С «сырой» JSON: `strings={mergeCommentsSectionStringsFromJson(await res.json())}`.
   */
  strings?: CommentsSectionStringsOverride
  /** Частичные ARIA для тулбара; сливаются с дефолтами внутри `CommentRichInput` */
  inputAriaLabels?: Partial<CommentRichInputAriaLabels>
  onSendComment: (html: string) => void | Promise<void>
  isSendPending?: boolean
  sendInputDisabled?: boolean
  /**
   * Сохранение правки комментария. Вызывается из inline-редактора в карточке.
   * Если не задан — пункт «Редактировать» в меню не показывается (даже при `canEdit: true`).
   */
  onEditComment?: (id: string, html: string) => void | Promise<void>
  /**
   * Soft-delete комментария. Запускается после подтверждения в `ConfirmModal`.
   * Если не задан — пункт «Удалить» не показывается (даже при `canDelete: true`).
   */
  onDeleteComment?: (id: string) => void | Promise<void>
  /**
   * Класс на корне секции. Мёржится вместе с `classNames.root`.
   * @deprecated предпочитайте {@link CommentsSectionProps.classNames} (`classNames.root`).
   */
  className?: string
  /**
   * Классы на внутренних частях секции — стабильная замена таргетингу по хеш-классам CSS-модулей.
   * - `root` — корневой контейнер (в дополнение к `className`);
   * - `list` — контейнер ленты;
   * - `card` — карточка каждого комментария;
   * - `input` — корень главного поля ввода (`CommentRichInput`).
   */
  classNames?: Partial<Record<'root' | 'list' | 'card' | 'input', string>>
  dayDividerDateLocale?: string
  /**
   * Лимит длины комментария (по тексту, без HTML). Если задан — под полем ввода
   * и под inline-редактором появляется счётчик `current / max`, ввод сверх лимита блокируется.
   */
  maxLength?: number
  /**
   * Сворачивать тело комментария до N строк, ниже — кнопка «Показать больше» / «Показать меньше».
   * `0` / `undefined` — без ограничения (поведение по умолчанию). Кнопка появляется только при
   * реальном переполнении. Кламп применяется к отрендеренному `contentHtml` (в т.ч. к
   * `deletedWithContent`), но не к inline-редактору и не к плейсхолдеру удалённого комментария.
   * Состояние «развёрнут» привязано к `id` комментария и переживает рефетч ленты.
   */
  collapseAfterLines?: number
  /**
   * Где рендерить главное поле ввода относительно ленты. По умолчанию `'top'`.
   */
  inputPlacement?: 'top' | 'bottom'
  /**
   * Слот слева от тулбара главного поля ввода (например аватар автора). Пробрасывается в
   * `CommentRichInput`; в inline-редактор правки не передаётся.
   */
  toolbarStartSlot?: ReactNode
  /**
   * Размер аватара в карточках. Значения — из набора {@link AvatarSize} (20…80). По умолчанию `40`.
   */
  avatarSize?: AvatarSize
}
