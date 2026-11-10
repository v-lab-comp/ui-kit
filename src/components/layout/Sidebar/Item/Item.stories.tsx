import type { Meta, StoryObj } from '@storybook/react'
import { forwardRef, useState, type AnchorHTMLAttributes } from 'react'
import {
  RiDashboardLine,
  RiArrowRightSLine,
  RiCalendarLine,
  RiTimeLine,
  RiFolderLine,
  RiTeamLine,
  RiPlugLine,
  RiGiftLine,
  RiFileTextLine,
} from '@remixicon/react'
import { SidebarItem } from './Item'

const ITEMS = [
  { id: 'dashboard', icon: RiDashboardLine, label: 'Dashboard' },
  { id: 'calendar', icon: RiCalendarLine, label: 'Calendar' },
  { id: 'timeoff', icon: RiTimeLine, label: 'Time Off' },
  { id: 'projects', icon: RiFolderLine, label: 'Projects' },
  { id: 'teams', icon: RiTeamLine, label: 'Teams' },
  { id: 'integrations', icon: RiPlugLine, label: 'Integrations' },
  { id: 'benefits', icon: RiGiftLine, label: 'Benefits' },
  { id: 'documents', icon: RiFileTextLine, label: 'Documents' },
] as const

function MultipleItemsInteractive({ collapsed = false }: { collapsed?: boolean }) {
  const [activeId, setActiveId] = useState<string>(ITEMS[0].id)
  return (
    <div style={{ width: collapsed ? undefined : 280 }}>
      <div
        style={{
          padding: '8px 16px 4px',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: 0,
          color: 'var(--text-sub-600)',
          textTransform: 'uppercase',
        }}
      >
        MAIN
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
      </div>
    </div>
  )
}

const meta: Meta<typeof SidebarItem> = {
  component: SidebarItem,
  title: 'Sidebar/Item',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}
      >
        <div style={{ width: 280 }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof SidebarItem>

/** Default state */
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

/** Ссылка роутера: `as={Link}` рендерит переданный компонент с `href` и пропсами ссылки */
export const WithRouterLink: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        code: `import { Link } from 'react-router-dom' // или next/link

<SidebarItem as={Link} href="/projects" leftNode={<RiFolderLine />} active>
  Projects
</SidebarItem>`,
      },
    },
  },
  render: () => (
    <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <SidebarItem as={FakeLink} href="#dashboard" leftNode={<RiDashboardLine />}>
        Dashboard
      </SidebarItem>
      <SidebarItem as={FakeLink} href="#projects" leftNode={<RiFolderLine />} active>
        Projects
      </SidebarItem>
    </div>
  ),
}

export const Default: Story = {
  args: {
    leftNode: <RiDashboardLine />,
    rightNode: <RiArrowRightSLine />,
    children: 'Dashboard',
  },
}

/** Hover state (визуально при наведении) */
export const Hover: Story = {
  args: {
    leftNode: <RiDashboardLine />,
    rightNode: <RiArrowRightSLine />,
    children: 'Dashboard',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

/** Active state — синяя полоска слева, primary цвет */
export const Active: Story = {
  args: {
    leftNode: <RiDashboardLine />,
    rightNode: <RiArrowRightSLine />,
    children: 'Dashboard',
    active: true,
  },
}

/** Collapsed — только иконка 36×36 */
export const Collapsed: Story = {
  args: {
    leftNode: <RiDashboardLine />,
    children: 'Dashboard',
    collapsed: true,
  },
}

/** Collapsed + Active */
export const CollapsedActive: Story = {
  args: {
    leftNode: <RiDashboardLine />,
    children: 'Dashboard',
    collapsed: true,
    active: true,
  },
}

/** Все три состояния в ряд (как в Figma) */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SidebarItem leftNode={<RiDashboardLine />}>Dashboard</SidebarItem>
      <SidebarItem leftNode={<RiDashboardLine />}>Dashboard</SidebarItem>
      <SidebarItem leftNode={<RiDashboardLine />} active>
        Dashboard
      </SidebarItem>
    </div>
  ),
}

/** Несколько пунктов меню */
export const MultipleItems: Story = {
  render: () => <MultipleItemsInteractive />,
  decorators: [
    (Story) => (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}
      >
        <Story />
      </div>
    ),
  ],
}

/** Несколько пунктов в закрытом (свёрнутом) состоянии */
export const MultipleItemsCollapsed: Story = {
  render: () => <MultipleItemsInteractive collapsed />,
  decorators: [
    (Story) => (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}
      >
        <Story />
      </div>
    ),
  ],
}

/** Навигация: с `href` пункт — ссылка `<a>`, активный получает `aria-current="page"`.
 *  Для ссылок роутера — свой `onClick` с `preventDefault()` и переходом роутера. */
export const AsLinks: Story = {
  render: function Render() {
    const [activeId, setActiveId] = useState<string>(ITEMS[0].id)
    return (
      <nav
        aria-label="Sidebar"
        style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        {ITEMS.slice(0, 4).map(({ id, icon: Icon, label }) => (
          <SidebarItem
            key={id}
            href={`#${id}`}
            leftNode={<Icon />}
            active={activeId === id}
            onClick={(e) => {
              e.preventDefault()
              setActiveId(id)
            }}
          >
            {label}
          </SidebarItem>
        ))}
      </nav>
    )
  },
}
