import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { AppSwitcher } from './AppSwitcher'
import type { AppItem } from './AppSwitcher.types'

const apps: AppItem[] = [
  { id: 'crm', label: 'CRM', isActive: true },
  { id: 'docs', label: 'Docs', href: '/docs' },
  { id: 'hr', label: 'HR', disabled: true },
  { id: 'mail', label: 'Mail', onClick: vi.fn() },
]

describe('AppSwitcher', () => {
  it('shows the initial-letter tile for an empty icon string', () => {
    const { container } = render(
      <AppSwitcher apps={[{ id: 'crm', label: 'CRM', icon: '', isActive: true }]} promo={null} />
    )
    // нет <img> без src: пустая строка — как отсутствие иконки
    expect(container.querySelector('img')).toBeNull()
    expect(container.textContent).toContain('C')
  })

  it('icon image is decorative: the label is visible next to it', () => {
    render(<AppSwitcher apps={[{ id: 'a', label: 'CRM', icon: '/a.png' }]} promo={null} />)
    expect(document.querySelector('img')?.getAttribute('alt')).toBe('')
  })

  it('menu button: opens on click, focuses the active item, arrows/End/typeahead move focus', async () => {
    const user = userEvent.setup()
    render(<AppSwitcher apps={apps} />)
    const trigger = screen.getByRole('button', { name: 'App switcher' })
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const menu = screen.getByRole('menu')
    // промо вне меню
    expect(menu).not.toHaveTextContent('Все продукты компании')
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'CRM' })).toHaveFocus())
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Docs' })).toHaveFocus()
    // отключённый пункт пропускается
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Mail' })).toHaveFocus()
    await user.keyboard('{Home}')
    expect(screen.getByRole('menuitem', { name: 'CRM' })).toHaveFocus()
    await user.keyboard('d')
    expect(screen.getByRole('menuitem', { name: 'Docs' })).toHaveFocus()
  })

  it('Escape closes the menu and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<AppSwitcher apps={apps} />)
    const trigger = screen.getByRole('button', { name: 'App switcher' })
    await user.click(trigger)
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'CRM' })).toHaveFocus())
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).toBeNull()
    expect(trigger).toHaveFocus()
  })

  it('as: renders the given link component with href, linkProps and menuitem role', async () => {
    const user = userEvent.setup()
    const FakeLink = forwardRef<
      HTMLAnchorElement,
      AnchorHTMLAttributes<HTMLAnchorElement> & { replace?: boolean }
    >(({ replace, ...props }, ref) => (
      <a ref={ref} data-fake-link={replace ? 'replace' : ''} {...props} />
    ))
    FakeLink.displayName = 'FakeLink'
    render(
      <AppSwitcher
        apps={[
          {
            id: 'crm',
            label: 'CRM',
            href: '/crm',
            as: FakeLink,
            linkProps: { replace: true },
            isActive: true,
          },
          { id: 'docs', label: 'Docs', href: '/docs', as: FakeLink },
        ]}
        promo={null}
      />
    )
    await user.click(screen.getByRole('button', { name: 'App switcher' }))
    const crm = screen.getByRole('menuitem', { name: 'CRM' })
    expect(crm).toHaveAttribute('data-fake-link', 'replace')
    expect(crm).toHaveAttribute('href', '/crm')
    expect(crm).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('menuitem', { name: 'Docs' })).toHaveAttribute('data-fake-link', '')
  })

  it('href items are real links; disabled item is described by its status', async () => {
    const user = userEvent.setup()
    render(<AppSwitcher apps={apps} />)
    await user.click(screen.getByRole('button', { name: 'App switcher' }))
    const docs = screen.getByRole('menuitem', { name: 'Docs' })
    expect(docs.tagName).toBe('A')
    expect(docs).toHaveAttribute('href', '/docs')
    const hr = screen.getByRole('menuitem', { name: /HR/ })
    expect(hr).toBeDisabled()
    expect(hr).toHaveAccessibleDescription('Скоро')
  })

  it('selecting an item calls onClick and closes the menu', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<AppSwitcher apps={[{ id: 'mail', label: 'Mail', onClick }]} promo={null} />)
    await user.click(screen.getByRole('button', { name: 'App switcher' }))
    await user.click(screen.getByRole('menuitem', { name: 'Mail' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).toBeNull()
  })
})
