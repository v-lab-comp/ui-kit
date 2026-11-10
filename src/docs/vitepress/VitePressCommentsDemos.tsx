import type { CSSProperties } from 'react'
import { useCallback, useState } from 'react'
import { CommentRichInput, CommentsSection } from '@/components/Comments'
import type { CommentThreadItem } from '@/components/Comments'

const wrap: CSSProperties = {
  maxWidth: 520,
  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
}

const note: CSSProperties = {
  margin: '14px 0 0',
  fontSize: 12,
  lineHeight: 1.45,
  color: 'var(--text-soft-400)',
}

const richRoot: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  maxWidth: 480,
  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
}

const richHint: CSSProperties = {
  margin: 0,
  fontSize: 13,
  lineHeight: 1.45,
  color: 'var(--text-sub-600)',
}

const richPre: CSSProperties = {
  fontSize: 12,
  margin: 0,
  whiteSpace: 'pre-wrap',
}

const richEmpty: CSSProperties = {
  margin: 0,
  fontSize: 12,
  color: 'var(--text-soft-400)',
}

/**
 * Storybook «Components / Comments / CommentRichInput» — только редактор + отладочный HTML лога.
 * Строки — английские дефолты пакета.
 */
export function CommentRichInputDocsDemo() {
  const [log, setLog] = useState<string[]>([])
  return (
    <div style={richRoot}>
      <CommentRichInput
        placeholder="Write a comment…"
        onSend={async (html) => setLog((l) => [...l, html])}
      />
      <p style={richHint}>
        Below — raw HTML for each send (separator <code>---</code>). Full thread with avatars and
        day dividers: <strong>CommentsSection</strong>.
      </p>
      {log.length > 0 ? (
        <pre style={richPre}>{log.join('\n---\n')}</pre>
      ) : (
        <p style={richEmpty}>Send a comment to see HTML here.</p>
      )}
    </div>
  )
}

/** Seed thread: yesterday + today → day chips «Yesterday» / «Today» (locale en-US). */
function createSeedComments(): CommentThreadItem[] {
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

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
  const timeOnly = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return [
    {
      id: 'seed-1',
      author: 'Alex Morgan',
      contentHtml: '<p>Yesterday we aligned on <strong>deadlines</strong> and the spec link.</p>',
      createdAt: y(14, 2),
      timeLabel: timeOnly(y(14, 2)),
      fullDateTimeLabel: fmt(y(14, 2)),
    },
    {
      id: 'seed-2',
      author: 'Maria K.',
      contentHtml: '<p>Morning update: wording looks good.</p>',
      createdAt: t(10, 15),
      timeLabel: timeOnly(t(10, 15)),
      fullDateTimeLabel: fmt(t(10, 15)),
    },
    {
      id: 'seed-3',
      author: 'Dmitri S.',
      contentHtml: '<p>Afternoon note — replies appear below each card.</p>',
      createdAt: t(14, 40),
      timeLabel: timeOnly(t(14, 40)),
      fullDateTimeLabel: fmt(t(14, 40)),
    },
  ]
}

/**
 * Full CommentsSection: seeded thread + send adds a card (English defaults from the package —
 * no `strings` override so labels match shipped copy).
 */
export function CommentsSectionDocsDemo() {
  const [comments, setComments] = useState<CommentThreadItem[]>(createSeedComments)
  const [pending, setPending] = useState(false)

  const onSendComment = useCallback(async (html: string) => {
    setPending(true)
    try {
      await new Promise((r) => setTimeout(r, 280))
      const now = new Date()
      const iso = now.toISOString()
      setComments((prev) => [
        {
          id: crypto.randomUUID(),
          author: 'You',
          contentHtml: html,
          createdAt: iso,
          timeLabel: new Date(iso).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          }),
          fullDateTimeLabel: new Date(iso).toLocaleString('en-US'),
        },
        ...prev,
      ])
    } finally {
      setPending(false)
    }
  }, [])

  return (
    <div style={wrap}>
      <CommentsSection
        comments={comments}
        onSendComment={onSendComment}
        isSendPending={pending}
        dayDividerDateLocale="en-US"
      />
      <p style={note}>
        UI strings use the kit defaults (English). Pass <code>strings</code> /{' '}
        <code>inputAriaLabels</code> from your app i18n when needed.
      </p>
    </div>
  )
}
