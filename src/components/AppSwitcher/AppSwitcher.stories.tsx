import { forwardRef, type AnchorHTMLAttributes } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RiShieldCheckLine } from '@remixicon/react'
import { AppSwitcher } from './AppSwitcher'

const meta: Meta<typeof AppSwitcher> = {
  component: AppSwitcher,
  title: 'Components/AppSwitcher',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
      source: { excludeStories: [] },
      description: {
        component: `
**AppSwitcher** — переключатель приложений для header'а. Показывает активное приложение в trigger'е и сетку из всех доступных приложений в выпадающем меню.

Принимает массив \`apps: AppItem[]\`. Иконка: URL → \`<img>\`, \`ReactNode\` → рендерится как есть, \`undefined\` → авто-инициал с цветом по хешу от названия.
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: 16, paddingBottom: 180 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AppSwitcher>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `import { AppSwitcher } from '@v-lab/ui-kit'
import type { AppItem } from '@v-lab/ui-kit'

const apps: AppItem[] = [
  { id: 'hrm', label: 'HRM', description: 'HR система', isActive: true, badge: 3 },
  { id: 'crm', label: 'CRM', description: 'Клиенты', href: '/crm/' },
  { id: 'erp', label: 'ERP', description: 'Финансы', href: '/erp/' },
  { id: 'docs', label: 'Docs', href: '/docs/' },
  { id: 'tasks', label: 'Tasks', href: '/tasks/', badge: 12 },
  { id: 'analytics', label: 'Analytics', href: '/analytics/', disabled: true },
]

// Промо-баннер показывается по умолчанию.
// Передай promo={null} чтобы скрыть.
export function AppHeader() {
  const { t } = useTranslation()
  return (
    <AppSwitcher
      apps={apps}
      promo={{ title: t('nav.promo.title'), subtitle: t('nav.promo.subtitle') }}
    />
  )
}`,
      },
    },
  },
  render: () => (
    <AppSwitcher
      apps={[
        {
          id: 'hrm',
          label: 'HRM',
          description: 'HR система',
          isActive: true,
          badge: 3,
          href: '#hrm',
        },
        { id: 'crm', label: 'CRM', description: 'Клиенты', href: '#crm' },
        { id: 'erp', label: 'ERP', description: 'Финансы', href: '#erp' },
        { id: 'docs', label: 'Docs', href: '#docs' },
        { id: 'tasks', label: 'Tasks', href: '#tasks', badge: 12 },
        { id: 'analytics', label: 'Analytics', href: '#analytics', disabled: true },
      ]}
    />
  ),
}

export const WithIconUrl: Story = {
  name: 'С иконками (img)',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `import { AppSwitcher } from '@v-lab/ui-kit'

export function Example() {
  return (
    <AppSwitcher
      apps={[
        { id: 'hrm', label: 'HRM', description: 'HR система', icon: '/icons/hrm.svg', isActive: true },
        { id: 'crm', label: 'CRM', icon: '/icons/crm.svg' },
        { id: 'erp', label: 'ERP', icon: '/icons/erp.svg' },
      ]}
    />
  )
}`,
      },
    },
  },
  render: () => {
    function svgIcon(letter: string, bg: string): string {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44"><rect width="44" height="44" rx="10" fill="${bg}"/><text x="22" y="29" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#fff">${letter}</text></svg>`
      return `data:image/svg+xml,${encodeURIComponent(svg)}`
    }
    return (
      <AppSwitcher
        apps={[
          {
            id: 'hrm',
            label: 'HRM',
            description: 'HR система',
            icon: svgIcon('H', '#0b5fff'),
            isActive: true,
          },
          { id: 'crm', label: 'CRM', icon: svgIcon('C', '#7839ee') },
          { id: 'erp', label: 'ERP', icon: svgIcon('E', '#12b76a') },
        ]}
      />
    )
  },
}

export const WithReactNodeIcon: Story = {
  name: 'С ReactNode иконкой',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `import { RiShieldCheckLine } from '@remixicon/react'
import { AppSwitcher } from '@v-lab/ui-kit'

export function Example() {
  return (
    <AppSwitcher
      apps={[
        {
          id: 'security',
          label: 'Security',
          description: 'Безопасность',
          isActive: true,
          icon: (
            <span style={{ width: 30, height: 30, display: 'flex', alignItems: 'center',
              justifyContent: 'center', borderRadius: 8,
              background: 'var(--primary-alpha-16)', color: 'var(--primary-base)' }}>
              <RiShieldCheckLine size={18} />
            </span>
          ),
        },
        { id: 'crm', label: 'CRM', href: '/crm/' },
        { id: 'erp', label: 'ERP', href: '/erp/', disabled: true },
      ]}
    />
  )
}`,
      },
    },
  },
  render: () => (
    <AppSwitcher
      apps={[
        {
          id: 'security',
          label: 'Security',
          description: 'Безопасность',
          isActive: true,
          icon: (
            <span
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--primary-alpha-16)',
                color: 'var(--primary-base)',
              }}
            >
              <RiShieldCheckLine size={20} />
            </span>
          ),
        },
        { id: 'crm', label: 'CRM', href: '#crm' },
        { id: 'erp', label: 'ERP', href: '#erp', disabled: true },
      ]}
    />
  ),
}

export const WithoutPromo: Story = {
  name: 'Без промо-баннера (promo={null})',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<AppSwitcher apps={apps} promo={null} />`,
      },
    },
  },
  render: () => (
    <AppSwitcher
      apps={[
        { id: 'hrm', label: 'HRM', description: 'HR система', isActive: true },
        { id: 'crm', label: 'CRM' },
        { id: 'erp', label: 'ERP' },
      ]}
      promo={null}
    />
  ),
}

/** Имитация Link роутера: переход без перезагрузки страницы */
const FakeLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ onClick, ...props }, ref) => (
    <a
      ref={ref}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        event.preventDefault()
      }}
    />
  )
)
FakeLink.displayName = 'FakeLink'

export const WithRouterLink: Story = {
  name: 'Ссылки роутера (as)',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `import { Link } from 'react-router-dom' // или next/link

<AppSwitcher
  apps={[
    { id: 'hrm', label: 'HRM', href: '/hrm', as: Link, isActive: true },
    { id: 'crm', label: 'CRM', href: '/crm', as: Link },
  ]}
/>`,
      },
    },
  },
  render: () => (
    <AppSwitcher
      apps={[
        { id: 'hrm', label: 'HRM', href: '#hrm', as: FakeLink, isActive: true },
        { id: 'crm', label: 'CRM', href: '#crm', as: FakeLink },
        { id: 'docs', label: 'Docs', href: '#docs', as: FakeLink },
      ]}
    />
  ),
}

export const Minimal: Story = {
  name: 'Минимум (1 приложение)',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<AppSwitcher apps={[{ id: 'hrm', label: 'HRM', isActive: true }]} />`,
      },
    },
  },
  render: () => <AppSwitcher apps={[{ id: 'hrm', label: 'HRM', isActive: true }]} />,
}

export const WithPromo: Story = {
  name: 'С промо-баннером',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `import { AppSwitcher } from '@v-lab/ui-kit'

// Текст приходит из вашего i18n провайдера
const { t } = useTranslation()

<AppSwitcher
  apps={apps}
  promo={{
    title: t('appSwitcher.promo.title'),
    subtitle: t('appSwitcher.promo.subtitle'),
  }}
/>

// Кастомный градиент:
<AppSwitcher
  apps={apps}
  promo={{
    title: 'Все продукты компании',
    subtitle: 'Один аккаунт — единый рабочий стол',
    gradient: 'linear-gradient(135deg, var(--success-base), var(--information-base))',
  }}
/>`,
      },
    },
  },
  render: () => (
    <AppSwitcher
      apps={[
        {
          id: 'hrm',
          label: 'HRM',
          description: 'HR система',
          isActive: true,
          badge: 3,
          href: '#hrm',
        },
        { id: 'crm', label: 'CRM', description: 'Клиенты', href: '#crm' },
        { id: 'erp', label: 'ERP', description: 'Финансы', href: '#erp' },
        { id: 'docs', label: 'Docs', href: '#docs' },
        { id: 'tasks', label: 'Tasks', href: '#tasks', badge: 12 },
        { id: 'analytics', label: 'Analytics', href: '#analytics', disabled: true },
      ]}
      promo={{
        title: 'Все продукты компании',
        subtitle: 'Один аккаунт — единый рабочий стол',
      }}
    />
  ),
}

export const WithPromoCustomGradient: Story = {
  name: 'С промо: кастомный градиент',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<AppSwitcher
  apps={apps}
  promo={{
    title: 'Новые возможности',
    subtitle: 'Обновление платформы уже доступно',
    gradient: 'linear-gradient(135deg, var(--success-base), var(--information-base))',
  }}
/>`,
      },
    },
  },
  render: () => (
    <AppSwitcher
      apps={[
        { id: 'hrm', label: 'HRM', isActive: true },
        { id: 'crm', label: 'CRM' },
        { id: 'erp', label: 'ERP' },
      ]}
      promo={{
        title: 'Новые возможности',
        subtitle: 'Обновление платформы уже доступно',
        gradient: 'linear-gradient(135deg, var(--success-base), var(--information-base))',
      }}
    />
  ),
}

export const ManyApps: Story = {
  name: 'Много приложений (2 строки)',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `<AppSwitcher
  apps={[
    { id: 'hrm', label: 'HRM', isActive: true },
    { id: 'crm', label: 'CRM' },
    { id: 'erp', label: 'ERP' },
    { id: 'docs', label: 'Docs' },
    { id: 'tasks', label: 'Tasks', badge: 5 },
    { id: 'chat', label: 'Chat', badge: 101 },
    { id: 'analytics', label: 'Analytics', disabled: true },
    { id: 'finance', label: 'Finance' },
    { id: 'inventory', label: 'Inventory', disabled: true },
  ]}
/>`,
      },
    },
  },
  render: () => (
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
        { id: 'inventory', label: 'Inventory', disabled: true },
      ]}
    />
  ),
}
