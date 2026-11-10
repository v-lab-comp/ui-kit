import type { CommentThreadItem } from '../CommentsSection/commentsSection.types'

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function sameCalendarDay(isoA: string, isoB: string): boolean {
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
export function sortCommentsNewestFirst(items: CommentThreadItem[]): CommentThreadItem[] {
  return [...items].sort((a, b) => {
    const d = createdAtMs(b.createdAt) - createdAtMs(a.createdAt)
    return d !== 0 ? d : a.id.localeCompare(b.id)
  })
}
