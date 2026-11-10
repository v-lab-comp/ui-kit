import type { Meta, StoryObj } from '@storybook/react'
import { RiUserLine } from '@remixicon/react'
import { AVATAR_COLOR_OPTIONS } from '@/components/Avatar'
import { AvatarCard } from './AvatarCard'

const meta: Meta<typeof AvatarCard> = {
  title: 'Components/AvatarCard',
  component: AvatarCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    text: { control: 'text' },
    icon: { control: false },
    color: { control: 'select', options: AVATAR_COLOR_OPTIONS },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    rightSlot: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof AvatarCard>

const photo = (seed: number) =>
  `https://images.unsplash.com/photo-${1472099645785 + seed}-5658abf4ff4e?w=128&h=128&fit=crop&crop=face`

export const Playground: Story = {
  name: 'Playground',
  args: {
    src: photo(0),
    alt: 'Nuray Aksoy',
    title: 'Nuray Aksoy',
    subtitle: 'Product Manager',
    avatarSize: 40,
  },
}

export const Default: Story = {
  args: {
    src: photo(0),
    alt: 'Nuray Aksoy',
    title: 'Nuray Aksoy',
    subtitle: 'Product Manager',
  },
}

export const WithInitials: Story = {
  name: 'Инициалы',
  args: {
    text: 'JB',
    color: 'primary',
    title: 'James Brown',
    subtitle: 'Marketing Manager',
  },
}

export const WithIcon: Story = {
  name: 'Иконка',
  args: {
    icon: <RiUserLine size={28} />,
    color: 'feature',
    title: 'Unknown User',
    subtitle: 'No photo',
  },
}

export const NoPhoto: Story = {
  name: 'Без фото (силуэт)',
  args: {
    title: 'Anna Smith',
    subtitle: 'UX Designer',
  },
}

export const LongText: Story = {
  name: 'Длинный текст',
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    text: 'LP',
    color: 'feature',
    title: 'Очень длинное имя пользователя которое не помещается',
    subtitle: 'Senior Product Designer, Design Systems Team',
  },
}

export const Gallery: Story = {
  name: 'Галерея',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 480 }}>
      <AvatarCard src={photo(0)} alt="Nuray Aksoy" title="Nuray Aksoy" subtitle="Product Manager" />
      <AvatarCard
        src={photo(1)}
        alt="James Brown"
        title="James Brown"
        subtitle="Marketing Manager"
      />
      <AvatarCard text="SW" color="away" title="Sarah Wilson" subtitle="UX Designer" />
      <AvatarCard text="AT" color="primary" title="Alex Thompson" subtitle="Frontend Engineer" />
      <AvatarCard title="No Photo" subtitle="Default silhouette" />
    </div>
  ),
}
