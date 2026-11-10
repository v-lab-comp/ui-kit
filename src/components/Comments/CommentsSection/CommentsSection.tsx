import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import clsx from 'clsx'
import { ConfirmModal } from '../../overlays/Modal/components/ConfirmModal'
import { Typography } from '../../Typography'
import { CommentRichInput } from '../CommentRichInput'
import { sameCalendarDay, sortCommentsNewestFirst } from '../lib/commentFeed'
import { mergeCommentsSectionStrings } from '../lib/commentsSectionDefaults'
import { formatCommentDayDivider } from '../lib/formatCommentDayDivider'
import { contractPart } from '@/theme/contract'
import { commentsSectionContract as c } from '@/theme/contracts/comments-section'
import { CommentCard } from './CommentCard'
import type { CommentThreadItem, CommentsSectionProps } from './commentsSection.types'

/** Куда вернуть фокус после смены режима карточки */
type FocusRequest = { id: string; target: 'editor' | 'menu' | 'card' }

const MENU_TRIGGER_SELECTOR = `.${contractPart(c, 'menu-trigger')}`
const EDITOR_SELECTOR = '[contenteditable="true"]'

function isEditableTarget(target: EventTarget): boolean {
  return target instanceof HTMLElement && (target.isContentEditable || target.tagName === 'INPUT')
}

/**
 * Перенос фокуса после правки / удаления, когда исходный элемент размонтирован.
 * Выполняется микрозадачей: после того как Floating UI вернёт фокус закрытого меню /
 * модалки (он делает это тоже в микрозадаче) — иначе он перебил бы наш фокус.
 */
function useCardFocusRestore(orderedComments: CommentThreadItem[]) {
  const cardRefs = useRef(new Map<string, HTMLElement>())
  const feedRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<FocusRequest | null>(null)
  const orderRef = useRef<string[]>([])

  useEffect(() => {
    orderRef.current = orderedComments.map((comment) => comment.id)
  }, [orderedComments])

  // Без массива зависимостей: запрос всегда идёт вместе со сменой состояния (рендером)
  useEffect(() => {
    const request = requestRef.current
    if (!request) return
    requestRef.current = null
    queueMicrotask(() => {
      const card = cardRefs.current.get(request.id)
      if (!card) {
        // Карточка исчезла из ленты — фокус на соседнюю или на саму ленту
        const order = orderRef.current
        const neighbour = order.map((id) => cardRefs.current.get(id)).find(Boolean)
        ;(neighbour ?? feedRef.current)?.focus()
        return
      }
      const selector = request.target === 'editor' ? EDITOR_SELECTOR : MENU_TRIGGER_SELECTOR
      const inner = request.target === 'card' ? null : card.querySelector<HTMLElement>(selector)
      ;(inner ?? card).focus()
    })
  })

  const registerCard = useCallback(
    (id: string) => (node: HTMLElement | null) => {
      if (node) cardRefs.current.set(id, node)
      else cardRefs.current.delete(id)
    },
    []
  )

  const requestFocus = useCallback((request: FocusRequest) => {
    requestRef.current = request
  }, [])

  return { feedRef, registerCard, requestFocus }
}

/** Навигация по ленте (APG Feed): PageDown / PageUp — следующая / предыдущая карточка */
function handleFeedKeyDown(event: KeyboardEvent<HTMLDivElement>) {
  if (event.key !== 'PageDown' && event.key !== 'PageUp') return
  if (isEditableTarget(event.target)) return
  const articles = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('article'))
  const current = (event.target as HTMLElement).closest('article')
  const index = current ? articles.indexOf(current) : -1
  const next = articles[event.key === 'PageDown' ? index + 1 : Math.max(0, index - 1)]
  if (!next) return
  event.preventDefault()
  next.focus()
}

function useExpandedIds() {
  // Развёрнутые комментарии по `id`: переживают рефетч ленты (поллинг раз в 5 с)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set())
  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])
  return [expandedIds, toggleExpanded] as const
}

export const CommentsSection = forwardRef<HTMLDivElement, CommentsSectionProps>(
  function CommentsSection(
    {
      comments,
      isLoading = false,
      isError = false,
      onRetry,
      strings,
      inputAriaLabels,
      onSendComment,
      isSendPending = false,
      sendInputDisabled = false,
      onEditComment,
      onDeleteComment,
      className,
      classNames,
      dayDividerDateLocale,
      maxLength,
      collapseAfterLines,
      inputPlacement = 'top',
      toolbarStartSlot,
      avatarSize = 40,
    },
    ref
  ) {
    const copy = useMemo(() => mergeCommentsSectionStrings(strings), [strings])
    const dayOptions = {
      today: copy.today,
      yesterday: copy.yesterday,
      dateLocale: dayDividerDateLocale,
    }

    const [editingId, setEditingId] = useState<string | null>(null)
    const [editPending, setEditPending] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
    const [expandedIds, toggleExpanded] = useExpandedIds()

    const collapseLines =
      typeof collapseAfterLines === 'number' && collapseAfterLines > 0 ? collapseAfterLines : 0
    const orderedComments = useMemo(() => sortCommentsNewestFirst(comments), [comments])
    const { feedRef, registerCard, requestFocus } = useCardFocusRestore(orderedComments)

    const startEdit = (id: string) => {
      requestFocus({ id, target: 'editor' })
      setEditingId(id)
    }

    const finishEdit = (id: string) => {
      requestFocus({ id, target: 'menu' })
      setEditingId(null)
    }

    const handleEditSubmit = async (html: string) => {
      if (!onEditComment || !editingId) return
      const id = editingId
      setEditPending(true)
      try {
        await onEditComment(id, html)
        finishEdit(id)
      } finally {
        setEditPending(false)
      }
    }

    const handleConfirmDelete = async () => {
      if (!onDeleteComment || !confirmDeleteId) return
      const id = confirmDeleteId
      try {
        await onDeleteComment(id)
      } finally {
        // Кнопка меню у удалённого комментария пропадает — фокус на саму карточку
        requestFocus({ id, target: 'card' })
        setConfirmDeleteId(null)
      }
    }

    const mainInput = (
      <CommentRichInput
        onSend={onSendComment}
        isPending={isSendPending}
        disabled={sendInputDisabled}
        placeholder={copy.inputPlaceholder}
        ariaLabels={inputAriaLabels}
        maxLength={maxLength}
        toolbarStartSlot={toolbarStartSlot}
        rootClassName={classNames?.input}
      />
    )

    const showFeed = !isLoading && !isError && orderedComments.length > 0

    return (
      <div ref={ref} className={clsx(c.className, classNames?.root, className)}>
        {inputPlacement === 'top' ? mainInput : null}

        {isLoading && (
          <div className={contractPart(c, 'skeleton-stack')} aria-busy="true">
            <div className={contractPart(c, 'skeleton-card')} />
            <div className={contractPart(c, 'skeleton-card')} />
          </div>
        )}

        {isError && (
          <Typography
            component="div"
            variant="paragraph"
            size="small"
            className={contractPart(c, 'error-row')}
            role="alert"
          >
            {copy.loadErrorPrefix}{' '}
            {onRetry ? (
              <button
                type="button"
                className={contractPart(c, 'retry-button')}
                onClick={() => void onRetry()}
              >
                {copy.retry}
              </button>
            ) : null}
          </Typography>
        )}

        {!isLoading && !isError && comments.length === 0 && (
          <Typography
            variant="paragraph"
            size="small"
            className={contractPart(c, 'empty-centered')}
            role="status"
          >
            {copy.emptyList}
          </Typography>
        )}

        {showFeed && (
          <div
            ref={feedRef}
            role="feed"
            tabIndex={-1}
            aria-busy={editPending || undefined}
            className={clsx(contractPart(c, 'list'), classNames?.list)}
            onKeyDown={handleFeedKeyDown}
          >
            {orderedComments.map((comment, index) => {
              const showDayDivider =
                index === 0 ||
                !sameCalendarDay(orderedComments[index - 1]!.createdAt, comment.createdAt)
              return (
                <Fragment key={comment.id}>
                  {showDayDivider && (
                    <div className={contractPart(c, 'day-divider-row')}>
                      <div className={contractPart(c, 'day-chip')}>
                        {formatCommentDayDivider(comment.createdAt, dayOptions)}
                      </div>
                    </div>
                  )}
                  <CommentCard
                    ref={registerCard(comment.id)}
                    comment={comment}
                    copy={copy}
                    posInSet={index + 1}
                    setSize={orderedComments.length}
                    canEdit={
                      Boolean(onEditComment) && comment.canEdit === true && !comment.isDeleted
                    }
                    canDelete={
                      Boolean(onDeleteComment) && comment.canDelete === true && !comment.isDeleted
                    }
                    isEditing={editingId === comment.id}
                    editPending={editPending}
                    expanded={expandedIds.has(comment.id)}
                    collapseAfterLines={collapseLines}
                    avatarSize={avatarSize}
                    maxLength={maxLength}
                    inputAriaLabels={inputAriaLabels}
                    className={classNames?.card}
                    onToggleExpanded={() => toggleExpanded(comment.id)}
                    onStartEdit={() => startEdit(comment.id)}
                    onCancelEdit={() => finishEdit(comment.id)}
                    onSubmitEdit={handleEditSubmit}
                    onRequestDelete={() => setConfirmDeleteId(comment.id)}
                  />
                </Fragment>
              )
            })}
          </div>
        )}

        {inputPlacement === 'bottom' ? mainInput : null}

        {onDeleteComment ? (
          <ConfirmModal
            open={confirmDeleteId !== null}
            onOpenChange={(next) => {
              if (!next) setConfirmDeleteId(null)
            }}
            title={copy.confirmDeleteTitle}
            confirmText={copy.confirmDeleteConfirm}
            cancelText={copy.confirmDeleteCancel}
            confirmColor="error"
            isDestructive
            onConfirm={handleConfirmDelete}
          >
            <Typography variant="paragraph" size="small">
              {copy.confirmDeleteBody}
            </Typography>
          </ConfirmModal>
        ) : null}
      </div>
    )
  }
)

CommentsSection.displayName = 'CommentsSection'
