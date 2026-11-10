import { forwardRef, useId } from 'react'
import clsx from 'clsx'
import { Avatar } from '../../Avatar'
import { CommentRichInput } from '../CommentRichInput'
import { getInitials } from '../lib/commentFeed'
import { contractPart } from '@/theme/contract'
import { commentsSectionContract as c } from '@/theme/contracts/comments-section'
import { CollapsibleCommentHtml } from './CollapsibleCommentHtml'
import { CommentActionsMenu } from './CommentActionsMenu'
import type {
  CommentThreadItem,
  CommentsSectionProps,
  CommentsSectionStringKey,
} from './commentsSection.types'

export type CommentCardProps = {
  comment: CommentThreadItem
  copy: Record<CommentsSectionStringKey, string>
  /** Позиция в ленте (с 1) и размер ленты — `aria-posinset` / `aria-setsize` */
  posInSet: number
  setSize: number
  canEdit: boolean
  canDelete: boolean
  isEditing: boolean
  editPending: boolean
  expanded: boolean
  collapseAfterLines: number
  avatarSize: NonNullable<CommentsSectionProps['avatarSize']>
  maxLength?: number
  inputAriaLabels?: CommentsSectionProps['inputAriaLabels']
  className?: string
  onToggleExpanded: () => void
  onStartEdit: () => void
  onCancelEdit: () => void
  onSubmitEdit: (html: string) => Promise<void>
  onRequestDelete: () => void
}

type CommentContentProps = Pick<
  CommentCardProps,
  | 'comment'
  | 'copy'
  | 'isEditing'
  | 'editPending'
  | 'expanded'
  | 'collapseAfterLines'
  | 'maxLength'
  | 'inputAriaLabels'
  | 'onToggleExpanded'
  | 'onCancelEdit'
  | 'onSubmitEdit'
> & { showDeletedContent: boolean }

/** Тело комментария: заглушка удалённого, редактор или HTML-контент */
function CommentContent({
  comment,
  copy,
  isEditing,
  editPending,
  expanded,
  collapseAfterLines,
  maxLength,
  inputAriaLabels,
  onToggleExpanded,
  onCancelEdit,
  onSubmitEdit,
  showDeletedContent,
}: CommentContentProps) {
  if (comment.isDeleted && !showDeletedContent) {
    return <span className={contractPart(c, 'deleted-placeholder')}>{copy.deletedPlaceholder}</span>
  }
  if (isEditing) {
    return (
      <CommentRichInput
        onSend={onSubmitEdit}
        isPending={editPending}
        placeholder={copy.inputPlaceholder}
        ariaLabels={inputAriaLabels}
        initialHtml={comment.contentHtml}
        submitLabel={copy.editSaveLabel}
        secondaryAction={{ label: copy.editCancelLabel, onClick: onCancelEdit }}
        rootClassName={contractPart(c, 'edit-input-root')}
        maxLength={maxLength}
      />
    )
  }
  if (!comment.contentHtml) return null
  return (
    <CollapsibleCommentHtml
      html={comment.contentHtml}
      collapseAfterLines={collapseAfterLines}
      expanded={expanded}
      onToggle={onToggleExpanded}
      showMoreLabel={copy.showMore}
      showLessLabel={copy.showLess}
    />
  )
}

/** Метка времени с пометкой «изменён» / «удалён» */
function CommentTimeMeta({
  id,
  comment,
  copy,
  showDeletedContent,
}: {
  id: string
  comment: CommentThreadItem
  copy: Record<CommentsSectionStringKey, string>
  showDeletedContent: boolean
}) {
  let mark = null
  if (showDeletedContent) {
    mark = <span className={contractPart(c, 'deleted-mark')}>{copy.deletedMark} · </span>
  } else if (comment.isEdited) {
    mark = <span className={contractPart(c, 'edited-mark')}>{copy.editedMark} · </span>
  }
  return (
    <span id={id} className={contractPart(c, 'time-meta')} title={comment.fullDateTimeLabel}>
      {mark}
      {comment.timeLabel}
    </span>
  )
}

/**
 * Карточка комментария — `<article>` ленты (`role="feed"`): имя из автора,
 * описание — время. Фокусируется программно (`tabIndex=-1`) при навигации по ленте
 * и для возврата фокуса после правки / удаления.
 */
export const CommentCard = forwardRef<HTMLElement, CommentCardProps>(function CommentCard(
  {
    comment,
    copy,
    posInSet,
    setSize,
    canEdit,
    canDelete,
    isEditing,
    className,
    avatarSize,
    onStartEdit,
    onRequestDelete,
    ...contentProps
  },
  ref
) {
  const uid = useId()
  const authorId = `${uid}-author`
  const timeId = `${uid}-time`
  const showDeletedContent = comment.isDeleted === true && comment.deletedWithContent === true
  const showTime = !isEditing && (!comment.isDeleted || showDeletedContent)
  const showMenu = !isEditing && (canEdit || canDelete)

  return (
    <article
      ref={ref}
      tabIndex={-1}
      aria-posinset={posInSet}
      aria-setsize={setSize}
      aria-labelledby={authorId}
      aria-describedby={showTime ? timeId : undefined}
      className={clsx(contractPart(c, 'comment-card'), className)}
      data-deleted={comment.isDeleted || undefined}
      data-comment-id={comment.id}
    >
      <div className={contractPart(c, 'avatar-slot')} aria-hidden="true">
        <Avatar
          text={getInitials(comment.author)}
          src={comment.avatarUrl ?? undefined}
          size={avatarSize}
          color="information"
        />
      </div>
      <div className={contractPart(c, 'body')}>
        <div className={contractPart(c, 'author-row')}>
          <span id={authorId} className={contractPart(c, 'author-name')}>
            {comment.author}
          </span>
        </div>
        <CommentContent
          comment={comment}
          copy={copy}
          isEditing={isEditing}
          showDeletedContent={showDeletedContent}
          {...contentProps}
        />
      </div>

      {showTime ? (
        <CommentTimeMeta
          id={timeId}
          comment={comment}
          copy={copy}
          showDeletedContent={showDeletedContent}
        />
      ) : null}

      {showMenu ? (
        <CommentActionsMenu
          triggerAriaLabel={copy.commentActionsAriaLabel}
          editLabel={canEdit ? copy.editAction : undefined}
          deleteLabel={canDelete ? copy.deleteAction : undefined}
          onEdit={canEdit ? onStartEdit : undefined}
          onDelete={canDelete ? onRequestDelete : undefined}
        />
      ) : null}
    </article>
  )
})

CommentCard.displayName = 'CommentCard'
