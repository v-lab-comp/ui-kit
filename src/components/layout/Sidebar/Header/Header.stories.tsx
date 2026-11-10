import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SidebarHeader } from './Header'
import type { SidebarHeaderCardOption } from '../HeaderCard/HeaderCard.types'

const meta: Meta<typeof SidebarHeader> = {
  component: SidebarHeader,
  title: 'Sidebar/SidebarHeader',
  tags: ['autodocs'],
  args: { options: undefined },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 140,
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof SidebarHeader>

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

const OPTIONS: SidebarHeaderCardOption[] = [
  { value: 'apex', label: 'Apex', subtitle: 'Finance & Banking', icon: <ApexIcon /> },
  { value: 'beta', label: 'Beta Corp', subtitle: 'IT & Software', icon: <OrgIcon letter="B" /> },
  { value: 'gamma', label: 'Gamma', subtitle: 'Retail', icon: <OrgIcon letter="G" /> },
]

/** Без dropdown — карточка 248px + разделитель */
export const Default: Story = {
  args: {
    icon: <ApexIcon />,
    title: 'Apex',
    subtitle: 'Finance & Banking',
    divider: true,
  },
}

/** Свёрнутый вид: только иконка 64×64, ширина 80px */
export const Collapsed: Story = {
  args: {
    icon: <ApexIcon />,
    title: 'Apex',
    subtitle: 'Finance & Banking',
    collapsed: true,
    divider: true,
  },
}

/** С dropdown: по клику открывается список организаций */
export const WithDropdown: Story = {
  render: function WithDropdownStory() {
    const [selected, setSelected] = useState('apex')
    const current = OPTIONS.find((o) => o.value === selected) ?? OPTIONS[0]
    return (
      <SidebarHeader
        icon={current.icon}
        title={current.label}
        subtitle={current.subtitle}
        options={OPTIONS}
        selectedValue={selected}
        onSelect={setSelected}
        divider
      />
    )
  },
}
