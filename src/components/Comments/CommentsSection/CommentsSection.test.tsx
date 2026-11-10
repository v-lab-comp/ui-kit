import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CommentsSection } from './CommentsSection'
import type { CommentThreadItem } from './commentsSection.types'

const comments: CommentThreadItem[] = [
  {
    id: 'a',
    author: 'Анна Иванова',
    contentHtml: '<p>Первый</p>',
    createdAt: '2024-05-02T10:00:00Z',
    timeLabel: '10:00',
    canEdit: true,
    canDelete: true,
  },
  {
    id: 'b',
    author: 'Борис Петров',
    contentHtml: '<p>Второй</p>',
    createdAt: '2024-05-01T10:00:00Z',
    timeLabel: '09:00',
  },
]

function setup(props: Partial<Parameters<typeof CommentsSection>[0]> = {}) {
  const user = userEvent.setup()
  const utils = render(
    <CommentsSection
      comments={comments}
      onSendComment={vi.fn()}
      onEditComment={vi.fn().mockResolvedValue(undefined)}
      onDeleteComment={vi.fn().mockResolvedValue(undefined)}
      {...props}
    />
  )
  return { user, ...utils }
}

describe('CommentsSection', () => {
  it('лента — role="feed" со статьями, названными автором', async () => {
    const { user } = setup()
    const feed = screen.getByRole('feed')
    const articles = within(feed).getAllByRole('article')
    expect(articles).toHaveLength(2)
    expect(articles[0]).toHaveAccessibleName('Анна Иванова')
    expect(articles[0]).toHaveAttribute('aria-setsize', '2')
    articles[0]!.focus()
    await user.keyboard('{PageDown}')
    expect(articles[1]).toHaveFocus()
  })

  it('ошибка загрузки — role="alert"', () => {
    setup({ isError: true })
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('меню действий: клавиатура по APG, Escape возвращает фокус', async () => {
    const { user } = setup()
    const trigger = screen.getByRole('button', { name: 'Comment actions' })
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    trigger.focus()
    await user.keyboard('{Enter}')
    const menu = await screen.findByRole('menu')
    const items = within(menu).getAllByRole('menuitem')
    await waitFor(() => expect(items[0]).toHaveFocus())
    expect(items[0]).toHaveAttribute('data-active')
    await user.keyboard('{ArrowDown}')
    expect(items[1]).toHaveFocus()
    expect(items[1]).toHaveAttribute('data-active')
    expect(items[0]).not.toHaveAttribute('data-active')
    await user.keyboard('{ArrowDown}')
    expect(items[0]).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).toBeNull()
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('правка: фокус в редактор, после отмены — на кнопку меню', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: 'Comment actions' }))
    await user.click(await screen.findByRole('menuitem', { name: 'Edit' }))
    const article = screen.getAllByRole('article')[0]!
    await waitFor(() => expect(article.querySelector('[contenteditable="true"]')).toHaveFocus())
    await user.click(within(article).getByRole('button', { name: 'Cancel' }))
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Comment actions' })).toHaveFocus()
    )
  })

  it('удаление: после подтверждения фокус на карточке', async () => {
    const onDeleteComment = vi.fn().mockResolvedValue(undefined)
    const { user, rerender } = setup({ onDeleteComment })
    await user.click(screen.getByRole('button', { name: 'Comment actions' }))
    await user.click(await screen.findByRole('menuitem', { name: 'Delete' }))
    const dialog = await screen.findByRole('alertdialog')
    await user.click(within(dialog).getByRole('button', { name: 'Delete' }))
    expect(onDeleteComment).toHaveBeenCalledWith('a')
    rerender(
      <CommentsSection
        comments={[{ ...comments[0]!, isDeleted: true }, comments[1]!]}
        onSendComment={vi.fn()}
        onDeleteComment={onDeleteComment}
      />
    )
    await waitFor(() => expect(screen.getAllByRole('article')[0]).toHaveFocus())
  })
})
