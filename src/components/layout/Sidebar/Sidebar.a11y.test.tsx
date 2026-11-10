import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Sidebar, SidebarContent, SidebarSection } from './Sidebar'
import { SidebarItem } from './Item'
import { SidebarHeaderCard } from './HeaderCard'
import { SidebarUserProfileCard } from './UserProfileCard'
import { SidebarInsetContent } from '../Inset/Inset'

describe('Sidebar accessibility', () => {
  it('content is a nav landmark, section is a group named by its label', () => {
    render(
      <Sidebar>
        <SidebarContent aria-label="Main">
          <SidebarSection label="MAIN">
            <SidebarItem>Dashboard</SidebarItem>
          </SidebarSection>
        </SidebarContent>
      </Sidebar>
    )
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'MAIN' })).toBeInTheDocument()
  })

  it('item with as renders the given link component with href, link props and aria-current', () => {
    const FakeLink = forwardRef<
      HTMLAnchorElement,
      AnchorHTMLAttributes<HTMLAnchorElement> & { replace?: boolean }
    >(({ replace, ...props }, ref) => (
      <a ref={ref} data-fake-link={replace ? 'replace' : ''} {...props} />
    ))
    FakeLink.displayName = 'FakeLink'
    const ref = { current: null as HTMLAnchorElement | HTMLButtonElement | null }
    render(
      <SidebarItem as={FakeLink} href="/projects" replace active ref={ref}>
        Projects
      </SidebarItem>
    )
    const link = screen.getByRole('link', { name: 'Projects' })
    expect(link).toHaveAttribute('data-fake-link', 'replace')
    expect(link).toHaveAttribute('href', '/projects')
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(ref.current).toBe(link)
  })

  it('item renders a link with href and a button without it', () => {
    render(
      <>
        <SidebarItem href="/home" active>
          Home
        </SidebarItem>
        <SidebarItem onClick={vi.fn()}>Logout</SidebarItem>
      </>
    )
    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toHaveAttribute('href', '/home')
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument()
  })

  it('collapsed item and card keep their labels as accessible names', () => {
    render(
      <>
        <SidebarItem collapsed leftNode={<span />}>
          Dashboard
        </SidebarItem>
        <SidebarHeaderCard collapsed icon={<span />} title="Acme" />
      </>
    )
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Acme' })).toBeInTheDocument()
  })

  it('header card dropdown is an APG menu with radio items', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <SidebarHeaderCard
        icon={<span />}
        title="Acme"
        options={[
          { value: 'a', label: 'Acme' },
          { value: 'b', label: 'Beta' },
        ]}
        selectedValue="a"
        onSelect={onSelect}
      />
    )
    const trigger = screen.getByRole('button', { name: 'Acme' })
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    await user.click(trigger)
    const selected = screen.getByRole('menuitemradio', { name: 'Acme' })
    expect(selected).toHaveAttribute('aria-checked', 'true')
    await waitFor(() => expect(selected).toHaveFocus())
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitemradio', { name: 'Beta' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith('b')
    expect(screen.queryByRole('menu')).toBeNull()
    expect(trigger).toHaveFocus()
  })

  it('header card menu closes on Escape and returns focus', async () => {
    const user = userEvent.setup()
    render(
      <SidebarHeaderCard icon={<span />} title="Acme" options={[{ value: 'a', label: 'A' }]} />
    )
    const trigger = screen.getByRole('button', { name: 'Acme' })
    await user.click(trigger)
    await waitFor(() => expect(screen.getByRole('menuitemradio')).toHaveFocus())
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).toBeNull()
    expect(trigger).toHaveFocus()
  })

  it('expanded profile card avatar does not repeat the visible name', () => {
    const { rerender } = render(<SidebarUserProfileCard title="Jane Doe" src="/a.png" />)
    expect(screen.getByRole('button')).toHaveAccessibleName(expect.stringContaining('Jane Doe'))
    expect(screen.getByRole('button').textContent).toContain('Jane Doe')
    expect(document.querySelector('img')?.getAttribute('alt') ?? '').toBe('')
    rerender(<SidebarUserProfileCard title="Jane Doe" collapsed />)
    expect(screen.getByRole('button', { name: 'Jane Doe' })).toBeInTheDocument()
  })

  it('inset content is keyboard focusable and becomes a region when named', () => {
    const { rerender } = render(<SidebarInsetContent>Body</SidebarInsetContent>)
    expect(screen.getByText('Body')).toHaveAttribute('tabindex', '0')
    rerender(<SidebarInsetContent aria-label="Content">Body</SidebarInsetContent>)
    expect(screen.getByRole('region', { name: 'Content' })).toBeInTheDocument()
  })
})
