import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SidebarHeaderCard } from './HeaderCard'
import type { SidebarHeaderCardOption } from './HeaderCard.types'

const meta: Meta<typeof SidebarHeaderCard> = {
  component: SidebarHeaderCard,
  title: 'Sidebar/SidebarHeaderCard',
  tags: ['autodocs'],
  args: { options: undefined },
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

type Story = StoryObj<typeof SidebarHeaderCard>

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

/** Без dropdown — иконка, название, подзаголовок */
export const Default: Story = {
  args: {
    icon: <ApexIcon />,
    title: 'Apex',
    subtitle: 'Finance & Banking',
  },
}

/** Hover (визуально при наведении) */
export const Hover: Story = {
  args: {
    icon: <ApexIcon />,
    title: 'Apex',
    subtitle: 'Finance & Banking',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

/** Collapsed — только иконка 64×64 */
export const Collapsed: Story = {
  args: {
    icon: <ApexIcon />,
    title: 'Apex',
    subtitle: 'Finance & Banking',
    collapsed: true,
  },
}

/** Dropdown — по клику открывается список, выбор пункта обновляет карточку */
export const Dropdown: Story = {
  render: function DropdownStory() {
    const [selected, setSelected] = useState<string>('apex')
    const current = DROPDOWN_OPTIONS.find((o) => o.value === selected) ?? DROPDOWN_OPTIONS[0]
    return (
      <SidebarHeaderCard
        icon={current.icon}
        title={current.label}
        subtitle={current.subtitle}
        options={DROPDOWN_OPTIONS}
        selectedValue={selected}
        onSelect={setSelected}
      />
    )
  },
}
