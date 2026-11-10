import { defineContract } from '../contract'

export const commentsSectionContract = defineContract({
  name: 'comments-section',
  attributes: {},
  parts: [
    'skeleton-stack',
    'skeleton-card',
    'error-row',
    'retry-button',
    'empty-centered',
    'list',
    'day-divider-row',
    'day-chip',
    /** `data-deleted` — комментарий удалён */
    'comment-card',
    'avatar-slot',
    'body',
    'author-row',
    'author-name',
    /** `data-clamped` — тело свёрнуто */
    'comment-html',
    'show-more-button',
    'time-meta',
    'edited-mark',
    'deleted-mark',
    'deleted-placeholder',
    /** На корне вложенного CommentRichInput в режиме правки */
    'edit-input-root',
    'menu-trigger',
    'menu-list',
    /** `data-danger` — деструктивный пункт */
    'menu-item',
  ],
})
