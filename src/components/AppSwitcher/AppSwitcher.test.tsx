import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppSwitcher } from './AppSwitcher'

describe('AppSwitcher', () => {
  it('shows the initial-letter tile for an empty icon string', () => {
    const { container } = render(
      <AppSwitcher apps={[{ id: 'crm', label: 'CRM', icon: '', isActive: true }]} promo={null} />
    )
    // нет <img> без src: пустая строка — как отсутствие иконки
    expect(container.querySelector('img')).toBeNull()
    expect(container.textContent).toContain('C')
  })
})
