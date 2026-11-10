import type { Meta, StoryObj } from '@storybook/react'
import { SidebarUserProfileCard } from './UserProfileCard'

const meta: Meta<typeof SidebarUserProfileCard> = {
  component: SidebarUserProfileCard,
  title: 'Sidebar/UserProfileCard',
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
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
          minHeight: 120,
        }}
      >
        <div style={{ width: 280 }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof SidebarUserProfileCard>

/** Default — аватар по src, имя, описание, стрелка вправо (по Figma 3802:11038) */
export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/80?img=47',
    alt: 'Sophia Williams',
    title: 'Sophia Williams',
    description: 'sophia@alignui.com',
  },
}

/** Без описания */
export const WithoutDescription: Story = {
  args: {
    ...Default.args,
    description: undefined,
  },
}

/** Hover */
export const Hover: Story = {
  args: Default.args,
  parameters: {
    pseudo: { hover: true },
  },
}

/** Свёрнутый вид — только Avatar */
export const Collapsed: Story = {
  args: {
    ...Default.args,
    collapsed: true,
  },
}

/** Без рамки (как в сайдбаре) */
export const Unbordered: Story = {
  args: {
    ...Default.args,
    bordered: false,
  },
}
