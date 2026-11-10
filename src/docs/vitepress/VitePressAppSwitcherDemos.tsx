import { useState } from 'react'
import type { CSSProperties } from 'react'
import { AppSwitcher } from '@/components/AppSwitcher'
import type { AppItem } from '@/components/AppSwitcher'

/** Inline SVG data URI — работает без сети, не зависит от внешних CDN. */
function svgIcon(letter: string, bg: string, radius = 10): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
    <rect width="44" height="44" rx="${radius}" fill="${bg}"/>
    <text x="22" y="29" text-anchor="middle" font-family="system-ui,sans-serif"
      font-size="17" font-weight="700" fill="#fff">${letter}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const label: CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-sub-600)',
}

const section: CSSProperties = {
  marginBottom: 24,
}

const BASE_APPS: AppItem[] = [
  { id: 'hrm', label: 'HRM', description: 'HR система', isActive: true, badge: 3, href: '#hrm' },
  { id: 'crm', label: 'CRM', description: 'Клиенты', href: '#crm' },
  { id: 'erp', label: 'ERP', description: 'Финансы', href: '#erp' },
  { id: 'docs', label: 'Docs', href: '#docs' },
  { id: 'tasks', label: 'Tasks', href: '#tasks', badge: 12 },
  { id: 'analytics', label: 'Analytics', href: '#analytics', disabled: true },
]

export function AppSwitcherDocsDemo() {
  const [apps, setApps] = useState<AppItem[]>(BASE_APPS)

  function activate(id: string) {
    setApps((prev) =>
      prev.map((a) => ({ ...a, isActive: a.id === id, badge: a.id === id ? undefined : a.badge }))
    )
  }

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 220,
      }}
    >
      <section style={section}>
        <p style={{ ...label, textAlign: 'center' }}>Кликни на приложение чтобы переключить</p>
        <AppSwitcher
          apps={apps.map((a) => ({ ...a, onClick: a.disabled ? undefined : () => activate(a.id) }))}
          promo={{ title: 'Все продукты компании', subtitle: 'Один аккаунт — единый рабочий стол' }}
        />
      </section>
    </div>
  )
}

export function AppSwitcherGalleryDemo() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        paddingBottom: 220,
      }}
    >
      <section style={section}>
        <p style={label}>Дефолтный промо-баннер (primary)</p>
        <AppSwitcher apps={BASE_APPS} />
      </section>

      <section style={section}>
        <p style={label}>Кастомный градиент</p>
        <AppSwitcher
          apps={BASE_APPS}
          promo={{
            title: 'Новые возможности',
            subtitle: 'Обновление платформы доступно',
            gradient:
              'linear-gradient(135deg, var(--success-base, #12b76a), var(--information-base, #2e90fa), var(--success-base, #12b76a))',
          }}
        />
      </section>

      <section style={section}>
        <p style={label}>Без баннера (promo={'{null}'})</p>
        <AppSwitcher apps={BASE_APPS} promo={null} />
      </section>

      <section style={section}>
        <p style={label}>С иконками (SVG data URI)</p>
        <AppSwitcher
          apps={[
            {
              id: 'hrm',
              label: 'HRM',
              description: 'HR система',
              icon: svgIcon('H', '#0b5fff'),
              isActive: true,
            },
            {
              id: 'crm',
              label: 'CRM',
              icon: svgIcon('C', '#7839ee'),
            },
            {
              id: 'erp',
              label: 'ERP',
              icon: svgIcon('E', '#12b76a'),
              disabled: true,
            },
          ]}
        />
      </section>

      <section style={section}>
        <p style={label}>Много приложений (2 ряда)</p>
        <AppSwitcher
          apps={[
            { id: 'hrm', label: 'HRM', isActive: true },
            { id: 'crm', label: 'CRM' },
            { id: 'erp', label: 'ERP' },
            { id: 'docs', label: 'Docs' },
            { id: 'tasks', label: 'Tasks', badge: 5 },
            { id: 'chat', label: 'Chat', badge: 101 },
            { id: 'analytics', label: 'Analytics', disabled: true },
            { id: 'finance', label: 'Finance' },
          ]}
        />
      </section>
    </div>
  )
}
