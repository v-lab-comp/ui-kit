import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RiDashboardLine, RiBankCardLine, RiSettings3Line } from '@remixicon/react'
import { PageHeader, PageHeaderDemoContent } from './Header'
import { SidebarInset, SidebarInsetContent } from './Inset'
import { LayoutRoot } from './LayoutRoot'
import {
  Sidebar,
  SidebarContent,
  SidebarSection,
  SidebarItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from './Sidebar'

const SIDEBAR_WIDTH = 272
const SIDEBAR_WIDTH_COLLAPSED = 80

const ApexIcon = () => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 999,
      background: 'var(--primary-base)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 18,
      fontWeight: 600,
    }}
  >
    A
  </div>
)

const ITEMS = [
  { id: 'dashboard', icon: RiDashboardLine, label: 'Dashboard' },
  { id: 'cards', icon: RiBankCardLine, label: 'My Cards' },
  { id: 'settings', icon: RiSettings3Line, label: 'Settings' },
] as const

function FullPageStory() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeId, setActiveId] = useState('dashboard')
  const marginLeft = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH

  return (
    <LayoutRoot>
      <Sidebar collapsed={collapsed}>
        <SidebarHeader
          icon={<ApexIcon />}
          title="Apex"
          subtitle="Finance & Banking"
          divider
          collapsed={collapsed}
          trigger={
            <SidebarTrigger collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
          }
        />
        <SidebarContent>
          <SidebarSection label="MAIN" collapsed={collapsed}>
            {ITEMS.map(({ id, icon: Icon, label }) => (
              <SidebarItem
                key={id}
                leftNode={<Icon />}
                active={activeId === id}
                collapsed={collapsed}
                onClick={() => setActiveId(id)}
              >
                {label}
              </SidebarItem>
            ))}
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter
          src="https://i.pravatar.cc/80?img=12"
          alt="User"
          title="Arthur Taylor"
          description="arthur@example.com"
          divider
          collapsed={collapsed}
        />
      </Sidebar>
      <SidebarInset insetLeft={marginLeft}>
        <PageHeader>
          <PageHeaderDemoContent />
        </PageHeader>
        <SidebarInsetContent>
          <span
            style={{
              color: 'var(--text-sub-600)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Main content area
          </span>
        </SidebarInsetContent>
      </SidebarInset>
    </LayoutRoot>
  )
}

const meta: Meta = {
  title: 'Layout/Full Page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Страница с сайдбаром и хедером: Sidebar + PageHeader + контент. Отступ области контента зависит от свёрнутого состояния сайдбара.',
      },
    },
  },
}

export default meta

type Story = StoryObj

/** Сайдбар и хедер страницы вместе. */
export const Default: Story = {
  render: () => <FullPageStory />,
}

function FullPageWithScrollStory() {
  const [collapsed, setCollapsed] = useState(false)
  const marginLeft = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH
  return (
    <LayoutRoot>
      <Sidebar collapsed={collapsed}>
        <SidebarHeader
          icon={<ApexIcon />}
          title="Apex"
          subtitle="Finance & Banking"
          divider
          collapsed={collapsed}
          trigger={
            <SidebarTrigger collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
          }
        />
        <SidebarContent>
          <SidebarSection label="MAIN" collapsed={collapsed}>
            {ITEMS.map(({ id, icon: Icon, label }) => (
              <SidebarItem
                key={id}
                leftNode={<Icon />}
                active={id === 'dashboard'}
                collapsed={collapsed}
                onClick={() => {}}
              >
                {label}
              </SidebarItem>
            ))}
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter
          src="https://i.pravatar.cc/80?img=12"
          alt="User"
          title="Arthur Taylor"
          description="arthur@example.com"
          divider
          collapsed={collapsed}
        />
      </Sidebar>
      <SidebarInset insetLeft={marginLeft}>
        <PageHeader>
          <PageHeaderDemoContent />
        </PageHeader>
        <SidebarInsetContent>
          <div style={{ padding: 24 }}>
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i} style={{ margin: '12px 0', color: 'var(--text-sub-600)' }}>
                Строка контента {i + 1}. Прокрутите вниз — хедер остаётся на месте (88px, sticky).
              </p>
            ))}
          </div>
        </SidebarInsetContent>
      </SidebarInset>
    </LayoutRoot>
  )
}

/** Длинный контент: скролл только в области контента, хедер 88px остаётся сверху (sticky + overflow в Inset). */
export const WithScrollableContent: Story = {
  render: () => <FullPageWithScrollStory />,
}
