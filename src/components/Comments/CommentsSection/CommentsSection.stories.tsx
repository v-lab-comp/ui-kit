import { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DEFAULT_COMMENT_RICH_INPUT_ARIA_EN } from '../CommentRichInput/commentRichInputDefaults'
import { mergeCommentsSectionStringsFromJson } from '../lib/commentsSectionDefaults'
import { CommentsSection } from './CommentsSection'
import type {
  CommentThreadItem,
  CommentsSectionProps,
  CommentsSectionStringKey,
  CommentsSectionStringsOverride,
} from './commentsSection.types'

/**
 * Полный набор ключей `CommentsSection` на язык — в приложении то же самое приходит из JSON ресурсов
 * или собирается через `t('namespace.comments.today')` и т.д.
 */
const COMMENTS_STRINGS_BY_LOCALE: Record<'en' | 'uz', Record<CommentsSectionStringKey, string>> = {
  en: {
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
    deletedMark: 'deleted',
    confirmDeleteTitle: 'Delete comment?',
    confirmDeleteBody: 'This action cannot be undone.',
    confirmDeleteConfirm: 'Delete',
    confirmDeleteCancel: 'Cancel',
    commentActionsAriaLabel: 'Comment actions',
    showMore: 'Show more',
    showLess: 'Show less',
  },
  uz: {
    today: 'Bugun',
    yesterday: 'Kecha',
    emptyList: 'Hozircha izohlar yo‘q.',
    loadErrorPrefix: 'Izohlarni yuklab bo‘lmadi.',
    retry: 'Qayta urinib ko‘rish',
    inputPlaceholder: 'Izoh qoldiring…',
    editAction: 'Tahrirlash',
    deleteAction: 'O‘chirish',
    editedMark: 'tahrirlangan',
    editSaveLabel: 'Saqlash',
    editCancelLabel: 'Bekor qilish',
    deletedPlaceholder: 'Izoh o‘chirildi',
    deletedMark: 'o‘chirildi',
    confirmDeleteTitle: 'Izoh o‘chirilsinmi?',
    confirmDeleteBody: 'Bu amalni qaytarib bo‘lmaydi.',
    confirmDeleteConfirm: 'O‘chirish',
    confirmDeleteCancel: 'Bekor qilish',
    commentActionsAriaLabel: 'Izoh amallari',
    showMore: 'Ko‘proq ko‘rsatish',
    showLess: 'Kamroq ko‘rsatish',
  },
}

/** Имитация ARIA по локали (в приложении — те же ключи через `t` / общий словарь a11y). */
const COMMENTS_ARIA_BY_LOCALE = {
  en: {
    ...DEFAULT_COMMENT_RICH_INPUT_ARIA_EN,
    send: 'Send comment',
  },
  uz: {
    ...DEFAULT_COMMENT_RICH_INPUT_ARIA_EN,
    send: 'Yuborish',
    bold: 'Qalin',
    italic: 'Qiya',
  },
} as const

const RU_STRINGS = {
  today: 'Сегодня',
  yesterday: 'Вчера',
  emptyList: 'Комментариев пока нет',
  loadErrorPrefix: 'Не удалось загрузить комментарии.',
  retry: 'Повторить',
  inputPlaceholder: 'Оставьте комментарий…',
} satisfies CommentsSectionStringsOverride

const RU_ARIA = {
  ...DEFAULT_COMMENT_RICH_INPUT_ARIA_EN,
  send: 'Отправить',
  bold: 'Жирный',
  italic: 'Курсив',
}

/** Демо-лента: «вчера» + два за «сегодня» — в UI появятся чипы «Вчера» / «Сегодня». */
function createDemoComments(): CommentThreadItem[] {
  const now = new Date()
  const yesterday = new Date(now.getTime())
  yesterday.setDate(yesterday.getDate() - 1)

  const y = (h: number, m: number) =>
    new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate(),
      h,
      m,
      0,
      0
    ).toISOString()
  const t = (h: number, m: number) =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0).toISOString()

  const fullRu = (d: Date) => d.toLocaleString('ru-RU')

  return [
    {
      id: 'seed-1',
      author: 'Алексей Иванов',
      contentHtml: '<p>Вчера обсудили <strong>сроки</strong> и <a href="#">ссылку</a> на ТЗ.</p>',
      createdAt: y(14, 2),
      timeLabel: '14:02',
      fullDateTimeLabel: fullRu(new Date(y(14, 2))),
    },
    {
      id: 'seed-2',
      author: 'Мария К.',
      contentHtml: '<p>Сегодня утром: согласна с формулировкой.</p>',
      createdAt: t(10, 15),
      timeLabel: '10:15',
      fullDateTimeLabel: fullRu(new Date(t(10, 15))),
    },
    {
      id: 'seed-3',
      author: 'Дмитрий С.',
      contentHtml: '<p>Дневной комментарий — можно ответить снизу.</p>',
      createdAt: t(14, 40),
      timeLabel: '14:40',
      fullDateTimeLabel: fullRu(new Date(t(14, 40))),
    },
  ]
}

const MOCK = createDemoComments()

/**
 * Примеры для вкладки Docs → «Показать код»: только то, что подключают в приложении
 * (`CommentsSection` + состояние), без внутренних обёрток Storybook.
 */
const DOCS_SOURCE_PLAYGROUND = `import { useCallback, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

export function TaskCommentsPanel() {
  const [comments, setComments] = useState<CommentThreadItem[]>([])
  const [sendPending, setSendPending] = useState(false)

  const onSendComment = useCallback(async (html: string) => {
    setSendPending(true)
    try {
      // const created = await api.createComment({ html })
      const now = new Date()
      setComments((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          author: 'You',
          contentHtml: html,
          createdAt: now.toISOString(),
          timeLabel: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          fullDateTimeLabel: now.toLocaleString('en-US'),
        },
      ])
    } finally {
      setSendPending(false)
    }
  }, [])

  // Компонент кита — только CommentsSection; лента сортирует по createdAt (новые сверху).
  return (
    <CommentsSection
      comments={comments}
      onSendComment={onSendComment}
      isSendPending={sendPending}
      dayDividerDateLocale="en-US"
    />
  )
}
`

const DOCS_SOURCE_SECTION_WITH_DATA = `import { useCallback, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

const RU_STRINGS = {
  today: 'Сегодня',
  yesterday: 'Вчера',
  emptyList: 'Комментариев пока нет',
  loadErrorPrefix: 'Не удалось загрузить комментарии.',
  retry: 'Повторить',
  inputPlaceholder: 'Оставьте комментарий…',
} as const

export function TaskCommentsPanelRu() {
  const [comments, setComments] = useState<CommentThreadItem[]>([])
  const [sendPending, setSendPending] = useState(false)

  const onSendComment = useCallback(async (html: string) => {
    setSendPending(true)
    try {
      const now = new Date()
      setComments((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          author: 'Вы',
          contentHtml: html,
          createdAt: now.toISOString(),
          timeLabel: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          fullDateTimeLabel: now.toLocaleString('ru-RU'),
        },
      ])
    } finally {
      setSendPending(false)
    }
  }, [])

  // Компонент кита — CommentsSection; strings / inputAriaLabels — с вашей стороны.
  return (
    <CommentsSection
      strings={RU_STRINGS}
      inputAriaLabels={{ send: 'Отправить', bold: 'Жирный', italic: 'Курсив' }}
      comments={comments}
      onSendComment={onSendComment}
      isSendPending={sendPending}
      dayDividerDateLocale="ru-RU"
    />
  )
}
`

const DOCS_SOURCE_SECTION_STATE_PROTOTYPE = `import { useCallback, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

const RU_STRINGS = {
  today: 'Сегодня',
  yesterday: 'Вчера',
  emptyList: 'Комментариев пока нет',
  loadErrorPrefix: 'Не удалось загрузить комментарии.',
  retry: 'Повторить',
  inputPlaceholder: 'Оставьте комментарий…',
} as const

function loadInitialThread(): CommentThreadItem[] {
  // верните данные с API
  return []
}

export function TaskCommentsWithToolbar() {
  const [comments, setComments] = useState<CommentThreadItem[]>(loadInitialThread)
  const [sendPending, setSendPending] = useState(false)

  const onSendComment = useCallback(async (html: string) => {
    setSendPending(true)
    try {
      const now = new Date()
      setComments((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          author: 'Вы',
          contentHtml: html,
          createdAt: now.toISOString(),
          timeLabel: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          fullDateTimeLabel: now.toLocaleString('ru-RU'),
        },
      ])
    } finally {
      setSendPending(false)
    }
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <button type="button" onClick={() => setComments(loadInitialThread())}>
          Сбросить
        </button>
        <button type="button" onClick={() => setComments([])}>
          Очистить ленту
        </button>
      </div>
      {/* Компонент кита — CommentsSection */}
      <CommentsSection
        strings={RU_STRINGS}
        comments={comments}
        onSendComment={onSendComment}
        isSendPending={sendPending}
        dayDividerDateLocale="ru-RU"
      />
    </div>
  )
}
`

const DOCS_SOURCE_SECTION_LOCALE_SWITCH = `import { useCallback, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

/** Полные объекты по локали — из JSON / t('comments.*') */
const COMMENTS_STRINGS_BY_LOCALE = {
  en: {
    today: 'Today',
    yesterday: 'Yesterday',
    emptyList: 'No comments yet.',
    loadErrorPrefix: 'Could not load comments.',
    retry: 'Retry',
    inputPlaceholder: 'Write a comment…',
  },
  uz: {
    today: 'Bugun',
    yesterday: 'Kecha',
    emptyList: 'Hozircha izohlar yo‘q.',
    loadErrorPrefix: 'Izohlarni yuklab bo‘lmadi.',
    retry: 'Qayta urinib ko‘rish',
    inputPlaceholder: 'Izoh qoldiring…',
  },
} as const

export function LocalizedComments({ locale }: { locale: 'en' | 'uz' }) {
  const [comments, setComments] = useState<CommentThreadItem[]>([])
  const [sendPending, setSendPending] = useState(false)
  const strings = COMMENTS_STRINGS_BY_LOCALE[locale]

  const onSendComment = useCallback(
    async (html: string) => {
      setSendPending(true)
      try {
        const now = new Date()
        const timeLocale = locale === 'uz' ? 'uz-UZ' : 'en-US'
        setComments((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            author: locale === 'uz' ? 'Siz' : 'You',
            contentHtml: html,
            createdAt: now.toISOString(),
            timeLabel: now.toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit' }),
            fullDateTimeLabel: now.toLocaleString(timeLocale),
          },
        ])
      } finally {
        setSendPending(false)
      }
    },
    [locale]
  )

  // Компонент кита — CommentsSection; strings по текущей локали.
  return (
    <CommentsSection
      strings={strings}
      comments={comments}
      onSendComment={onSendComment}
      isSendPending={sendPending}
      dayDividerDateLocale={locale === 'uz' ? 'uz-UZ' : 'en-US'}
    />
  )
}
`

const meta: Meta<typeof CommentsSection> = {
  component: CommentsSection,
  title: 'Components/Comments/CommentsSection',
  tags: ['autodocs'],
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      description: {
        component:
          'Без API: `comments`, `onSendComment`. Лента **сортирует по `createdAt`**: новые сверху (порядок массива не важен). Тексты — английские дефолты кита; опционально `strings` (частичный объект) или `mergeCommentsSectionStringsFromJson` для JSON с лишними полями. `inputAriaLabels` — частичное переопределение ARIA. Вкладка **Docs** и сториз **Playground** — живая лента в `useState`. В панели **«Показать код»** для интерактивных сториз — пример с `CommentsSection` из приложения (без внутренних обёрток Storybook). См. **«Локали: один JSON на язык»** — смена языка (как с `t` + `i18next.language`).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CommentsSection>

type PlaygroundToolbarLabels = {
  reset: string
  clear: string
  countPrefix: string
}

const PLAYGROUND_TOOLBAR_EN: PlaygroundToolbarLabels = {
  reset: 'Reset demo',
  clear: 'Clear thread',
  countPrefix: 'Comments:',
}

const PLAYGROUND_TOOLBAR_RU: PlaygroundToolbarLabels = {
  reset: 'Сбросить демо-данные',
  clear: 'Очистить ленту',
  countPrefix: 'В ленте сейчас:',
}

function timeLocaleFromDivider(dayDividerDateLocale?: string): string {
  if (dayDividerDateLocale === 'ru-RU' || dayDividerDateLocale?.startsWith('ru')) return 'ru-RU'
  return 'en-US'
}

type InteractiveCommentsSectionDemoProps = Pick<
  CommentsSectionProps,
  'strings' | 'inputAriaLabels' | 'sendInputDisabled' | 'dayDividerDateLocale'
> & {
  showToolbar?: boolean
  toolbarLabels?: PlaygroundToolbarLabels
  newCommentAuthor?: string
  sendDelayMs?: number
}

/** Общая обвязка: лента в `useState`, отправка дописывает элементы (для Playground / Docs). */
function InteractiveCommentsSectionDemo({
  strings,
  inputAriaLabels,
  sendInputDisabled,
  dayDividerDateLocale = 'en-US',
  showToolbar = true,
  toolbarLabels,
  newCommentAuthor = 'You',
  sendDelayMs = 400,
}: InteractiveCommentsSectionDemoProps) {
  const [pending, setPending] = useState(false)
  const [items, setItems] = useState(() => createDemoComments())
  const timeLocale = timeLocaleFromDivider(dayDividerDateLocale)
  const tb = toolbarLabels ?? PLAYGROUND_TOOLBAR_EN

  const onSend = useCallback(
    async (html: string) => {
      setPending(true)
      await new Promise((r) => setTimeout(r, sendDelayMs))
      const now = new Date()
      setItems((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          author: newCommentAuthor,
          contentHtml: html,
          createdAt: now.toISOString(),
          timeLabel: now.toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit' }),
          fullDateTimeLabel: now.toLocaleString(timeLocale),
        },
      ])
      setPending(false)
    },
    [newCommentAuthor, sendDelayMs, timeLocale]
  )

  return (
    <div>
      {showToolbar ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 16,
            alignItems: 'center',
          }}
        >
          <button type="button" onClick={() => setItems(createDemoComments())}>
            {tb.reset}
          </button>
          <button type="button" onClick={() => setItems([])}>
            {tb.clear}
          </button>
          <span style={{ fontSize: 13, color: 'var(--text-sub-600, #666)' }}>
            {tb.countPrefix} {items.length}
          </span>
        </div>
      ) : null}
      <CommentsSection
        strings={strings}
        inputAriaLabels={inputAriaLabels}
        comments={items}
        onSendComment={onSend}
        isSendPending={pending}
        sendInputDisabled={sendInputDisabled}
        dayDividerDateLocale={dayDividerDateLocale}
      />
    </div>
  )
}

/** Первый сториз: живое состояние — в Docs после отправки комментарий появляется в списке. */
export const Playground: Story = {
  args: {
    sendInputDisabled: false,
  },
  argTypes: {
    sendInputDisabled: {
      control: 'boolean',
      description: 'Блокирует только поле ввода (лента остаётся).',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демо-данные и новые сообщения в одном `useState`. Панель сверху — только для Storybook. Управление: `sendInputDisabled` в Controls.',
      },
      source: {
        type: 'code',
        language: 'tsx',
        code: DOCS_SOURCE_PLAYGROUND,
        format: true,
      },
    },
  },
  render: function Render(args) {
    return (
      <InteractiveCommentsSectionDemo
        sendInputDisabled={args.sendInputDisabled}
        dayDividerDateLocale="en-US"
        newCommentAuthor="You"
        toolbarLabels={PLAYGROUND_TOOLBAR_EN}
        sendDelayMs={400}
      />
    )
  },
}

export const SectionDefaultsEn: Story = {
  name: 'Только дефолты (EN)',
  render: () => <CommentsSection comments={MOCK} onSendComment={async () => {}} />,
}

export const SectionWithData: Story = {
  name: 'С данными + RU strings',
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: DOCS_SOURCE_SECTION_WITH_DATA,
        format: true,
      },
    },
  },
  render: () => (
    <InteractiveCommentsSectionDemo
      strings={RU_STRINGS}
      inputAriaLabels={RU_ARIA}
      dayDividerDateLocale="ru-RU"
      newCommentAuthor="Вы"
      showToolbar={false}
      sendDelayMs={400}
    />
  ),
}

/**
 * Полный макет приложения: `comments` в `useState`, отправка дописывает в массив,
 * кнопки «Очистить» / «Сбросить демо» без бэкенда.
 */
export const SectionStatePrototype: Story = {
  name: 'Прототип: лента в useState',
  parameters: {
    docs: {
      description: {
        story:
          'Имитация страницы: начальные элементы из `createDemoComments()`, после отправки элемент попадает в массив (как `await createComment`). `CommentsSection` сам сортирует по `createdAt` — **новые сверху**. Очистка и сброс только меняют состояние в Storybook.',
      },
      source: {
        type: 'code',
        language: 'tsx',
        code: DOCS_SOURCE_SECTION_STATE_PROTOTYPE,
        format: true,
      },
    },
  },
  render: () => (
    <InteractiveCommentsSectionDemo
      strings={RU_STRINGS}
      inputAriaLabels={RU_ARIA}
      dayDividerDateLocale="ru-RU"
      newCommentAuthor="Вы"
      toolbarLabels={PLAYGROUND_TOOLBAR_RU}
      sendDelayMs={450}
    />
  ),
}

const MINIMAL_RU: CommentsSectionStringsOverride = {
  today: 'Сегодня',
  yesterday: 'Вчера',
  emptyList: 'Нет данных',
  loadErrorPrefix: 'Ошибка.',
  retry: 'Повторить',
  inputPlaceholder: 'Комментарий…',
}

const DOCS_SOURCE_SECTION_WITH_ACTIONS = `import { useCallback, useState } from 'react'
import { CommentsSection } from '@v-lab/ui-kit'
import type { CommentThreadItem } from '@v-lab/ui-kit'

export function TaskCommentsWithActions({
  initial,
}: {
  initial: CommentThreadItem[]
}) {
  const [comments, setComments] = useState<CommentThreadItem[]>(initial)

  const onSendComment = useCallback(async (html: string) => {
    // const created = await api.createComment({ html })
    // setComments((prev) => [...prev, mapApiToItem(created)])
  }, [])

  const onEditComment = useCallback(async (id: string, html: string) => {
    // const updated = await api.editComment(id, { html })
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, contentHtml: html, isEdited: true } : c
      )
    )
  }, [])

  const onDeleteComment = useCallback(async (id: string) => {
    // await api.deleteComment(id)
    setComments((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return (
    <CommentsSection
      comments={comments}
      onSendComment={onSendComment}
      onEditComment={onEditComment}
      onDeleteComment={onDeleteComment}
    />
  )
}
`

function createDemoCommentsWithFlags(): CommentThreadItem[] {
  const base = createDemoComments()
  return base.map((c, i) => ({
    ...c,
    canEdit: i === 1, // только средний — «свой»
    canDelete: i === 1,
    isEdited: i === 2,
  }))
}

function InteractiveCommentsWithActions({
  strings,
  inputAriaLabels,
  dayDividerDateLocale = 'ru-RU',
  newCommentAuthor = 'Вы',
}: Pick<CommentsSectionProps, 'strings' | 'inputAriaLabels' | 'dayDividerDateLocale'> & {
  newCommentAuthor?: string
}) {
  const [items, setItems] = useState(() => createDemoCommentsWithFlags())
  const [pending, setPending] = useState(false)
  const timeLocale = timeLocaleFromDivider(dayDividerDateLocale)

  const onSend = useCallback(
    async (html: string) => {
      setPending(true)
      await new Promise((r) => setTimeout(r, 300))
      const now = new Date()
      setItems((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          author: newCommentAuthor,
          contentHtml: html,
          createdAt: now.toISOString(),
          timeLabel: now.toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit' }),
          fullDateTimeLabel: now.toLocaleString(timeLocale),
          canEdit: true,
          canDelete: true,
        },
      ])
      setPending(false)
    },
    [newCommentAuthor, timeLocale]
  )

  const onEdit = useCallback(async (id: string, html: string) => {
    await new Promise((r) => setTimeout(r, 250))
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, contentHtml: html, isEdited: true } : c))
    )
  }, [])

  const onDelete = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 250))
    setItems((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return (
    <CommentsSection
      strings={strings}
      inputAriaLabels={inputAriaLabels}
      comments={items}
      onSendComment={onSend}
      onEditComment={onEdit}
      onDeleteComment={onDelete}
      isSendPending={pending}
      dayDividerDateLocale={dayDividerDateLocale}
    />
  )
}

export const SectionWithActions: Story = {
  name: 'С edit / delete (canEdit, canDelete)',
  parameters: {
    docs: {
      description: {
        story:
          'Передайте `onEditComment` и `onDeleteComment` — у комментариев с `canEdit` / `canDelete` появится меню «…». «Редактировать» открывает inline-редактор прямо в карточке; «Удалить» — ConfirmModal со строками из `strings`. Флаги `canEdit` / `canDelete` берите из ответа API (`can_edit` / `can_delete`).',
      },
      source: {
        type: 'code',
        language: 'tsx',
        code: DOCS_SOURCE_SECTION_WITH_ACTIONS,
        format: true,
      },
    },
  },
  render: () => (
    <InteractiveCommentsWithActions
      strings={RU_STRINGS}
      inputAriaLabels={RU_ARIA}
      dayDividerDateLocale="ru-RU"
      newCommentAuthor="Вы"
    />
  ),
}

export const SectionAdminWithDeleted: Story = {
  name: 'Админ: удалённый комментарий в ленте',
  parameters: {
    docs: {
      description: {
        story:
          'Для админа в ответе остаются soft-deleted комментарии с `is_deleted: true` — рендерим серую карточку-плейсхолдер без контента и без меню. Живые элементы — обычные, у них `can_edit` / `can_delete` от бэкенда.',
      },
    },
  },
  render: () => {
    const base = createDemoCommentsWithFlags()
    const items: CommentThreadItem[] = base.map((c, i) =>
      i === 0
        ? { ...c, isDeleted: true, contentHtml: '' }
        : { ...c, canEdit: true, canDelete: true }
    )
    return (
      <CommentsSection
        strings={RU_STRINGS}
        inputAriaLabels={RU_ARIA}
        comments={items}
        onSendComment={async () => {}}
        onEditComment={async () => {}}
        onDeleteComment={async () => {}}
        dayDividerDateLocale="ru-RU"
      />
    )
  },
}

export const SectionAdminDeletedWithContent: Story = {
  name: 'Админ: удалено, но контент виден (deletedWithContent)',
  parameters: {
    docs: {
      description: {
        story:
          'Бэкенд возвращает удалённый комментарий вместе с `contentHtml` (для аудита / админки). Передайте `isDeleted: true` + `deletedWithContent: true` — карточка останется в «удалённом» состоянии (приглушена, без меню), но вместо плейсхолдера покажет контент и пометку `deletedMark` рядом со временем.',
      },
    },
  },
  render: () => {
    const base = createDemoCommentsWithFlags()
    const items: CommentThreadItem[] = base.map((c, i) => {
      if (i === 0) {
        return {
          ...c,
          isDeleted: true,
          deletedWithContent: true,
          contentHtml:
            '<p>Этот текст уже <strong>удалили</strong>, но админ его всё ещё видит.</p>',
        }
      }
      if (i === 2) return { ...c, isDeleted: true, contentHtml: '' }
      return { ...c, canEdit: true, canDelete: true }
    })
    return (
      <CommentsSection
        strings={RU_STRINGS}
        inputAriaLabels={RU_ARIA}
        comments={items}
        onSendComment={async () => {}}
        onEditComment={async () => {}}
        onDeleteComment={async () => {}}
        dayDividerDateLocale="ru-RU"
      />
    )
  },
}

const LONG_HTML =
  '<p>Это длинный комментарий, который занимает несколько строк и должен быть свёрнут.</p>' +
  '<p>Второй абзац: подробное описание проблемы с воспроизведением, окружением и ожидаемым результатом.</p>' +
  '<p>Третий абзац: список шагов — открыть документ, перейти на вкладку «Комментарии», проверить перенос.</p>' +
  '<p>Четвёртый абзац добавлен, чтобы гарантированно выйти за пять строк и показать кнопку «Показать больше».</p>' +
  '<p>Пятый абзац: заключение и ссылка на <a href="#">ТЗ</a> для полноты картины.</p>'

/**
 * Демо `collapseAfterLines` + ручки вёрстки. Первый комментарий длинный — он сворачивается до
 * 5 строк, ниже появляется «Показать больше». Кнопка «Эмулировать поллинг» подменяет массив
 * новыми объектами с теми же `id` — развёрнутый комментарий **не** схлопывается.
 */
export const SectionCollapseAndLayout: Story = {
  name: 'Сворачивание длинных + ручки вёрстки',
  parameters: {
    docs: {
      description: {
        story:
          '`collapseAfterLines={5}` сворачивает переполненное тело; кнопка появляется только при реальном переполнении. Состояние «развёрнут» привязано к `id` и переживает рефетч (кнопка «Эмулировать поллинг»). Также: `inputPlacement="bottom"`, `avatarSize={32}`, `toolbarStartSlot` (аватар автора), `classNames` вместо таргетинга по CSS-модулям.',
      },
    },
  },
  render: function Render() {
    const [items, setItems] = useState<CommentThreadItem[]>(() => {
      const base = createDemoComments()
      base[0] = { ...base[0]!, contentHtml: LONG_HTML }
      return base
    })

    const onSend = useCallback(async (html: string) => {
      const now = new Date()
      setItems((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          author: 'Вы',
          contentHtml: html,
          createdAt: now.toISOString(),
          timeLabel: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          fullDateTimeLabel: now.toLocaleString('ru-RU'),
        },
      ])
    }, [])

    // Подмена массива теми же id — как ответ поллинга раз в 5 с
    const simulatePoll = useCallback(() => {
      setItems((prev) => prev.map((c) => ({ ...c })))
    }, [])

    return (
      <div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <button type="button" onClick={simulatePoll}>
            Эмулировать поллинг (тот же id)
          </button>
        </div>
        <CommentsSection
          strings={RU_STRINGS}
          inputAriaLabels={RU_ARIA}
          comments={items}
          onSendComment={onSend}
          collapseAfterLines={5}
          inputPlacement="bottom"
          avatarSize={32}
          toolbarStartSlot={
            <span
              aria-hidden
              style={{
                display: 'inline-flex',
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'var(--primary-alpha-16, #dde7ff)',
                color: 'var(--primary-base, #335cff)',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              Вы
            </span>
          }
          dayDividerDateLocale="ru-RU"
        />
      </div>
    )
  },
}

export const SectionLoading: Story = {
  name: 'Загрузка',
  render: () => (
    <CommentsSection strings={MINIMAL_RU} comments={[]} isLoading onSendComment={() => {}} />
  ),
}

export const SectionError: Story = {
  name: 'Ошибка',
  render: () => (
    <CommentsSection
      strings={MINIMAL_RU}
      comments={[]}
      isError
      onRetry={() => {}}
      onSendComment={() => {}}
    />
  ),
}

export const SectionEmpty: Story = {
  name: 'Пусто',
  render: () => <CommentsSection strings={MINIMAL_RU} comments={[]} onSendComment={() => {}} />,
}

/** Имитация JSON с лишним полем `foo` — подхватятся только известные ключи. */
export const SectionFromLooseJson: Story = {
  name: 'Из JSON (лишние ключи отбрасываются)',
  render: () => (
    <CommentsSection
      strings={mergeCommentsSectionStringsFromJson({
        foo: 1,
        today: 'Сегодня',
        retry: 'Ещё раз',
        emptyList: 'Пусто',
      })}
      comments={MOCK}
      onSendComment={async () => {}}
    />
  ),
}

/**
 * В приложении обычно:
 *
 * 1. В JSON ресурсах (или через `useMemo` от `t`) держите **полный** объект со всеми ключами
 *    `CommentsSectionStringKey` для каждой локали.
 * 2. Берёте текущую локаль из `i18next.language` / стора и подставляете:
 *    `strings={COMMENTS_STRINGS_BY_LOCALE[i18n.language] ?? COMMENTS_STRINGS_BY_LOCALE.en}`.
 * 3. При `i18n.on('languageChanged', …)` или смене локали в сторе компонент перерисуется с новым `strings`.
 *
 * Здесь то же без i18n: два полных объекта и переключатель EN / UZ.
 */
export const SectionLocaleSwitch: Story = {
  name: 'Локали: один JSON на язык (как с t)',
  parameters: {
    docs: {
      description: {
        story:
          'Над компонентом объявлены `COMMENTS_STRINGS_BY_LOCALE` и `COMMENTS_ARIA_BY_LOCALE` со **всеми** ключами. В реальном приложении значения собираются через `t` из одного namespace; при смене языка меняется только выбранный объект — `CommentsSection` остаётся «глупым».',
      },
      source: {
        type: 'code',
        language: 'tsx',
        code: DOCS_SOURCE_SECTION_LOCALE_SWITCH,
        format: true,
      },
    },
  },
  render: function Render() {
    const [locale, setLocale] = useState<'en' | 'uz'>('en')
    const [items, setItems] = useState(() => createDemoComments())
    const [pending, setPending] = useState(false)

    const timeLocale = locale === 'uz' ? 'uz-UZ' : 'en-US'
    const author = locale === 'uz' ? 'Siz' : 'You'

    const onSend = useCallback(
      async (html: string) => {
        setPending(true)
        await new Promise((r) => setTimeout(r, 400))
        const now = new Date()
        setItems((prev) => [
          ...prev,
          {
            id: `local-${Date.now()}`,
            author,
            contentHtml: html,
            createdAt: now.toISOString(),
            timeLabel: now.toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit' }),
            fullDateTimeLabel: now.toLocaleString(timeLocale),
          },
        ])
        setPending(false)
      },
      [author, timeLocale]
    )

    return (
      <div>
        <p
          style={{
            margin: '0 0 12px',
            fontSize: 13,
            color: 'var(--text-sub-600, #666)',
            lineHeight: 1.45,
          }}
        >
          Имитация <code>i18next</code>: переключите язык — подставляется другой полный JSON в{' '}
          <code>strings</code> / <code>inputAriaLabels</code>. Лента тоже в <code>useState</code> —
          отправка добавляет комментарий.
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => setLocale('en')}>
            English
          </button>
          <button type="button" onClick={() => setLocale('uz')}>
            O‘zbek
          </button>
          <button type="button" onClick={() => setItems(createDemoComments())}>
            Reset thread
          </button>
        </div>
        <CommentsSection
          strings={COMMENTS_STRINGS_BY_LOCALE[locale]}
          inputAriaLabels={COMMENTS_ARIA_BY_LOCALE[locale]}
          comments={items}
          onSendComment={onSend}
          isSendPending={pending}
          dayDividerDateLocale={locale === 'uz' ? 'uz-UZ' : 'en-US'}
        />
      </div>
    )
  },
}
