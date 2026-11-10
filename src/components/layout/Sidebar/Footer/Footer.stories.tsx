import type { Meta, StoryObj } from '@storybook/react'
import { SidebarFooter } from './Footer'

const meta: Meta<typeof SidebarFooter> = {
  component: SidebarFooter,
  title: 'Sidebar/Footer',
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    bordered: { control: 'boolean' },
    divider: { control: 'boolean' },
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

type Story = StoryObj<typeof SidebarFooter>

/** Default — карточка профиля, по Figma 3789:5341 */
export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/80?img=47',
    alt: 'Sophia Williams',
    title: 'Sophia Williams',
    description: 'sophia@alignui.com',
  },
}

/** С разделителем сверху */
export const WithDivider: Story = {
  args: {
    ...Default.args,
    divider: true,
  },
}

/** Свёрнутый вид — только аватар */
export const Collapsed: Story = {
  args: {
    ...Default.args,
    collapsed: true,
  },
}

/** Свёрнутый + разделитель */
export const CollapsedWithDivider: Story = {
  args: {
    ...Default.args,
    collapsed: true,
    divider: true,
  },
}
