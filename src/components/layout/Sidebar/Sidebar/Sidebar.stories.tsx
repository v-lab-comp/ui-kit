import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  RiDashboardLine,
  RiBankCardLine,
  RiArrowLeftRightLine,
  RiTimeLine,
  RiFileListLine,
  RiExchangeLine,
  RiSettings3Line,
  RiCustomerService2Line,
} from '@remixicon/react'
import { Sidebar, SidebarLayout, SidebarMain, SidebarContent, SidebarSection } from './Sidebar'
import { SidebarHeader } from '../Header'
import type { SidebarHeaderCardOption } from '../HeaderCard/HeaderCard.types'
import { SidebarItem } from '../Item'
import { SidebarFooter } from '../Footer'

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

const OrgIcon = ({ letter }: { letter: string }) => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 999,
      background: 'var(--bg-weak-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-strong-950)',
      fontSize: 14,
      fontWeight: 600,
    }}
  >
    {letter}
  </div>
)

const DROPDOWN_OPTIONS: SidebarHeaderCardOption[] = [
  { value: 'apex', label: 'Apex', subtitle: 'Finance & Banking', icon: <ApexIcon /> },
  { value: 'beta', label: 'Beta Corp', subtitle: 'IT & Software', icon: <OrgIcon letter="B" /> },
  { value: 'gamma', label: 'Gamma', subtitle: 'Retail', icon: <OrgIcon letter="G" /> },
]

const MAIN_ITEMS = [
  { id: 'dashboard', icon: RiDashboardLine, label: 'Dashboard' },
  { id: 'cards', icon: RiBankCardLine, label: 'My Cards' },
  { id: 'transfer', icon: RiArrowLeftRightLine, label: 'Transfer' },
  { id: 'transactions', icon: RiTimeLine, label: 'Transactions' },
  { id: 'payments', icon: RiFileListLine, label: 'Payments' },
  { id: 'exchange', icon: RiExchangeLine, label: 'Exchange' },
] as const

const OTHER_ITEMS = [
  { id: 'settings', icon: RiSettings3Line, label: 'Settings' },
  { id: 'support', icon: RiCustomerService2Line, label: 'Support' },
] as const

function FullSidebar({
  defaultCollapsed = false,
  withDropdown = false,
}: {
  defaultCollapsed?: boolean
  withDropdown?: boolean
}) {
  const [activeId, setActiveId] = useState<string>('dashboard')
  const [selectedOrg, setSelectedOrg] = useState<string>('apex')

  const currentOrg = withDropdown
    ? (DROPDOWN_OPTIONS.find((o) => o.value === selectedOrg) ?? DROPDOWN_OPTIONS[0])
    : null

  const headerProps = withDropdown
    ? {
        icon: currentOrg?.icon ?? <ApexIcon />,
        title: currentOrg?.label ?? 'Apex',
        subtitle: currentOrg?.subtitle ?? 'Finance & Banking',
        options: DROPDOWN_OPTIONS,
        selectedValue: selectedOrg,
        onSelect: setSelectedOrg,
        divider: true,
      }
    : {
        icon: <ApexIcon />,
        title: 'Apex',
        subtitle: 'Finance & Banking',
        divider: true,
      }

  return (
    <SidebarLayout defaultCollapsed={defaultCollapsed}>
      <Sidebar>
        <SidebarHeader {...headerProps} />
        <SidebarContent>
          <SidebarSection label="MAIN">
            {MAIN_ITEMS.map(({ id, icon: Icon, label }) => (
              <SidebarItem
                key={id}
                leftNode={<Icon />}
                active={activeId === id}
                onClick={() => setActiveId(id)}
              >
                {label}
              </SidebarItem>
            ))}
          </SidebarSection>
          <SidebarSection label="OTHERS">
            {OTHER_ITEMS.map(({ id, icon: Icon, label }) => (
              <SidebarItem
                key={id}
                leftNode={<Icon />}
                active={activeId === id}
                onClick={() => setActiveId(id)}
              >
                {label}
              </SidebarItem>
            ))}
          </SidebarSection>
        </SidebarContent>
        <SidebarFooter
          src="https://i.pravatar.cc/80?img=12"
          alt="Arthur Taylor"
          title="Arthur Taylor"
          description="arthur@alignui.com"
          divider
        />
      </Sidebar>
      <SidebarMain>
        <div
          style={{
            flex: 1,
            padding: 24,
            background: 'var(--bg-weak-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-sub-600)',
            minHeight: '100vh',
          }}
        >
          Main content area
        </div>
      </SidebarMain>
    </SidebarLayout>
  )
}

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Sidebar/Sidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Sidebar>

/** Полный сайдбар по Figma 3802:11754 — Header (Apex), секции MAIN/OTHERS, Footer (профиль) */
export const Full: Story = {
  render: () => <FullSidebar />,
}

/** Dropdown выбора организации в хедере */
export const WithDropdown: Story = {
  render: () => <FullSidebar withDropdown />,
}

/** Свёрнутый сайдбар — только иконки */
export const Collapsed: Story = {
  render: () => <FullSidebar defaultCollapsed />,
}

/** Галерея: полный layout без dropdown */
export const Gallery: Story = {
  render: () => <FullSidebar />,
  parameters: {
    docs: {
      description: {
        story:
          'Полный layout: фиксированный сайдбар слева, справа — область приложения. collapsed управляется через SidebarContext автоматически.',
      },
    },
  },
}
