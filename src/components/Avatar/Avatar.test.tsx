import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from './Avatar'
import { AvatarGroup } from '@/components/AvatarGroup'
import { AvatarCard } from '@/components/AvatarCard'

describe('Avatar', () => {
  it('фото: имя только у img, без role на корне', () => {
    const { container } = render(<Avatar src="a.png" alt="Ann Lee" />)
    expect(screen.getAllByRole('img', { name: 'Ann Lee' })).toHaveLength(1)
    expect(container.firstElementChild).not.toHaveAttribute('role')
  })

  it('инициалы с alt получают role=img и имя', () => {
    render(<Avatar text="AL" alt="Ann Lee" />)
    expect(screen.getByRole('img', { name: 'Ann Lee' })).toHaveTextContent('AL')
  })

  it('без alt инициалы декоративны', () => {
    render(<Avatar text="AL" />)
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('AvatarGroup: счётчик переполнения озвучивается', () => {
    render(
      <AvatarGroup max={1}>
        <Avatar text="A" alt="A" />
        <Avatar text="B" alt="B" />
        <Avatar text="C" alt="C" />
      </AvatarGroup>
    )
    expect(screen.getByRole('img', { name: '+2' })).toBeInTheDocument()
  })

  it('AvatarCard: аватар не дублирует видимый title', () => {
    render(<AvatarCard src="a.png" title="Ann Lee" />)
    expect(screen.queryByRole('img', { name: 'Ann Lee' })).toBeNull()
    expect(screen.getByText('Ann Lee')).toBeInTheDocument()
  })
})
