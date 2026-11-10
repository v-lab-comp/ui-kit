import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { RiMore2Fill, RiPencilLine, RiDeleteBinLine } from '@remixicon/react'
import { Avatar } from '../../Avatar'
import { Popover } from '../../overlays/Popover'
import { ConfirmModal } from '../../overlays/Modal/components/ConfirmModal'
import { Typography } from '../../Typography'
import { CommentRichInput } from '../CommentRichInput'
import { mergeCommentsSectionStrings } from '../lib/commentsSectionDefaults'
import { formatCommentDayDivider } from '../lib/formatCommentDayDivider'
import { contractPart } from '@/theme/contract'
import { commentsSectionContract as c } from '@/theme/contracts/comments-section'
import type { CommentThreadItem, CommentsSectionProps } from './commentsSection.types'

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function sameCalendarDay(isoA: string, isoB: string): boolean {
  const a = new Date(isoA)
  const b = new Date(isoB)
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function createdAtMs(iso: string): number {
  const t = new Date(iso).getTime()
  return Number.isNaN(t) ? 0 : t
}

/** Лента: новые сверху; порядок в `comments` может быть любым. */
function sortCommentsNewestFirst(items: CommentThreadItem[]): CommentThreadItem[] {
  return [...items].sort((a, b) => {
    const d = createdAtMs(b.createdAt) - createdAtMs(a.createdAt)
    return d !== 0 ? d : a.id.localeCompare(b.id)
  })
}

type ActionsMenuProps = {
  triggerAriaLabel: string
  editLabel?: string
  deleteLabel?: string
  onEdit?: () => void
  onDelete?: () => void
  disabled?: boolean
}

function CommentActionsMenu({
  triggerAriaLabel,
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
  disabled,
}: ActionsMenuProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handlePointer = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (triggerRef.current?.contains(target)) return
      if (popoverRef.current?.contains(target)) return
      setOpen(false)
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const handleSelect = useCallback((action?: () => void) => {
    if (!action) return
    setOpen(false)
    action()
  }, [])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={triggerAriaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={disabled}
        className={contractPart(c, 'menu-trigger')}
        onClick={() => setOpen((v) => !v)}
      >
        <RiMore2Fill size={18} aria-hidden />
      </button>
      <Popover open={open} anchorRef={triggerRef} placement="bottom-end" ref={popoverRef}>
        <ul role="menu" className={contractPart(c, 'menu-list')}>
          {onEdit && editLabel ? (
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className={contractPart(c, 'menu-item')}
                onClick={() => handleSelect(onEdit)}
              >
                <RiPencilLine size={16} aria-hidden />
                <span>{editLabel}</span>
              </button>
            </li>
          ) : null}
          {onDelete && deleteLabel ? (
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className={contractPart(c, 'menu-item')}
                data-danger
                onClick={() => handleSelect(onDelete)}
              >
                <RiDeleteBinLine size={16} aria-hidden />
                <span>{deleteLabel}</span>
              </button>
            </li>
          ) : null}
        </ul>
      </Popover>
    </>
  )
}

type CollapsibleCommentHtmlProps = {
  html: string
  /** > 0 включает сворачивание; 0 — контент рендерится целиком без кнопки */
  collapseAfterLines: number
  expanded: boolean
  onToggle: () => void
  showMoreLabel: string
  showLessLabel: string
}

/**
 * Рендерит `contentHtml` и, при переполнении, сворачивает его до `collapseAfterLines` строк.
 * Кламп задаётся вычисленным пиксельным `max-height` (единый источник для клипа и детекта
 * переполнения), поэтому работает и с вложенными блочными элементами из `execCommand`.
 */
function CollapsibleCommentHtml({
  html,
  collapseAfterLines,
  expanded,
  onToggle,
  showMoreLabel,
  showLessLabel,
}: CollapsibleCommentHtmlProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [overflowing, setOverflowing] = useState(false)
  const enabled = collapseAfterLines > 0

  useLayoutEffect(() => {
    const el = contentRef.current
    // Когда сворачивание выключено, `enabled` уже подавляет клип и кнопку в разметке,
    // поэтому сбрасывать `overflowing` синхронно не нужно.
    if (!el || !enabled) return

    let raf = 0
    const measure = () => {
      const cs = window.getComputedStyle(el)
      let lineHeight = Number.parseFloat(cs.lineHeight)
      if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
        // line-height: normal — считаем от размера шрифта
        const fontSize = Number.parseFloat(cs.fontSize) || 14
        lineHeight = fontSize * 1.4
      }
      const clampPx = Math.round(lineHeight * collapseAfterLines)
      el.style.setProperty('--comment-clamp-max', `${clampPx}px`)
      // scrollHeight — полная высота контента в любом состоянии (клип на неё не влияет)
      setOverflowing(el.scrollHeight > clampPx + 1)
    }

    // Мерить после вставки контента, иначе scrollHeight = 0
    raf = requestAnimationFrame(measure)

    // Пересчёт при ресайзе контейнера (резиновая панель детали) и после смены контента (правка)
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    })
    ro.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [html, collapseAfterLines, enabled])

  const isClamped = enabled && overflowing && !expanded

  return (
    <>
      <div
        ref={contentRef}
        className={contractPart(c, 'comment-html')}
        data-clamped={isClamped || undefined}
        // HTML должен быть санитизирован приложением / на бэкенде
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {enabled && overflowing ? (
        <button
          type="button"
          className={contractPart(c, 'show-more-button')}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          {expanded ? showLessLabel : showMoreLabel}
        </button>
      ) : null}
    </>
  )
}

export function CommentsSection({
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
}: CommentsSectionProps) {
  const copy = useMemo(() => mergeCommentsSectionStrings(strings), [strings])

  const dayOptions = {
    today: copy.today,
    yesterday: copy.yesterday,
    dateLocale: dayDividerDateLocale,
  }

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editPending, setEditPending] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const collapseLines =
    typeof collapseAfterLines === 'number' && collapseAfterLines > 0 ? collapseAfterLines : 0

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

  const handleSend = useCallback(
    async (html: string) => {
      await onSendComment(html)
    },
    [onSendComment]
  )

  const handleEditSubmit = useCallback(
    async (html: string) => {
      if (!onEditComment || !editingId) return
      setEditPending(true)
      try {
        await onEditComment(editingId, html)
        setEditingId(null)
      } finally {
        setEditPending(false)
      }
    },
    [onEditComment, editingId]
  )

  const handleConfirmDelete = useCallback(async () => {
    if (!onDeleteComment || !confirmDeleteId) return
    try {
      await onDeleteComment(confirmDeleteId)
    } finally {
      setConfirmDeleteId(null)
    }
  }, [onDeleteComment, confirmDeleteId])

  const orderedComments = useMemo(() => sortCommentsNewestFirst(comments), [comments])

  const mainInput = (
    <CommentRichInput
      onSend={handleSend}
      isPending={isSendPending}
      disabled={sendInputDisabled}
      placeholder={copy.inputPlaceholder}
      ariaLabels={inputAriaLabels}
      maxLength={maxLength}
      toolbarStartSlot={toolbarStartSlot}
      rootClassName={classNames?.input}
    />
  )

  return (
    <div className={clsx(c.className, classNames?.root, className)}>
      {inputPlacement === 'top' ? mainInput : null}

      {isLoading && (
        <div className={contractPart(c, 'skeleton-stack')} aria-busy="true" aria-live="polite">
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
        <Typography variant="paragraph" size="small" className={contractPart(c, 'empty-centered')}>
          {copy.emptyList}
        </Typography>
      )}

      {!isLoading && !isError && orderedComments.length > 0 && (
        <div className={clsx(contractPart(c, 'list'), classNames?.list)}>
          {orderedComments.map((comment: CommentThreadItem, index: number) => {
            const showDayDivider =
              index === 0 ||
              !sameCalendarDay(orderedComments[index - 1]!.createdAt, comment.createdAt)
            const dayLabel = formatCommentDayDivider(comment.createdAt, dayOptions)
            const isEditing = editingId === comment.id
            const showEdit =
              Boolean(onEditComment) && comment.canEdit === true && !comment.isDeleted
            const showDelete =
              Boolean(onDeleteComment) && comment.canDelete === true && !comment.isDeleted
            const showMenu = !isEditing && (showEdit || showDelete)
            const showDeletedContent =
              comment.isDeleted === true && comment.deletedWithContent === true

            return (
              <Fragment key={comment.id}>
                {showDayDivider && (
                  <div className={contractPart(c, 'day-divider-row')}>
                    <div className={contractPart(c, 'day-chip')}>{dayLabel}</div>
                  </div>
                )}

                <div
                  className={clsx(contractPart(c, 'comment-card'), classNames?.card)}
                  data-deleted={comment.isDeleted || undefined}
                >
                  <div className={contractPart(c, 'avatar-slot')}>
                    <Avatar
                      text={getInitials(comment.author)}
                      src={comment.avatarUrl ?? undefined}
                      size={avatarSize}
                      color="information"
                    />
                  </div>
                  <div className={contractPart(c, 'body')}>
                    <div className={contractPart(c, 'author-row')}>
                      <span className={contractPart(c, 'author-name')}>{comment.author}</span>
                    </div>

                    {comment.isDeleted && !showDeletedContent ? (
                      <span className={contractPart(c, 'deleted-placeholder')}>
                        {copy.deletedPlaceholder}
                      </span>
                    ) : isEditing ? (
                      <CommentRichInput
                        onSend={handleEditSubmit}
                        isPending={editPending}
                        placeholder={copy.inputPlaceholder}
                        ariaLabels={inputAriaLabels}
                        initialHtml={comment.contentHtml}
                        submitLabel={copy.editSaveLabel}
                        secondaryAction={{
                          label: copy.editCancelLabel,
                          onClick: () => setEditingId(null),
                        }}
                        rootClassName={contractPart(c, 'edit-input-root')}
                        maxLength={maxLength}
                      />
                    ) : comment.contentHtml ? (
                      <CollapsibleCommentHtml
                        html={comment.contentHtml}
                        collapseAfterLines={collapseLines}
                        expanded={expandedIds.has(comment.id)}
                        onToggle={() => toggleExpanded(comment.id)}
                        showMoreLabel={copy.showMore}
                        showLessLabel={copy.showLess}
                      />
                    ) : null}
                  </div>

                  {!isEditing && (!comment.isDeleted || showDeletedContent) ? (
                    <span
                      className={contractPart(c, 'time-meta')}
                      title={comment.fullDateTimeLabel}
                    >
                      {showDeletedContent ? (
                        <span className={contractPart(c, 'deleted-mark')}>
                          {copy.deletedMark} ·{' '}
                        </span>
                      ) : comment.isEdited ? (
                        <span className={contractPart(c, 'edited-mark')}>{copy.editedMark} · </span>
                      ) : null}
                      {comment.timeLabel}
                    </span>
                  ) : null}

                  {showMenu ? (
                    <CommentActionsMenu
                      triggerAriaLabel={copy.commentActionsAriaLabel}
                      editLabel={showEdit ? copy.editAction : undefined}
                      deleteLabel={showDelete ? copy.deleteAction : undefined}
                      onEdit={
                        showEdit
                          ? () => {
                              setEditingId(comment.id)
                            }
                          : undefined
                      }
                      onDelete={
                        showDelete
                          ? () => {
                              setConfirmDeleteId(comment.id)
                            }
                          : undefined
                      }
                    />
                  ) : null}
                </div>
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

CommentsSection.displayName = 'CommentsSection'
