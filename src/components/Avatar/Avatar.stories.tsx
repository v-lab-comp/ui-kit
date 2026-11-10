import type { Meta, StoryObj } from '@storybook/react'
import { RiUserLine } from '@remixicon/react'
import { Avatar } from './Avatar'
import { AVATAR_SIZE_OPTIONS, AVATAR_COLOR_OPTIONS } from './Avatar.types'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Components/Avatar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    src: { control: 'text', description: 'Image URL' },
    alt: { control: 'text' },
    text: { control: 'text', description: 'Initials (1–2 chars) when no image' },
    icon: { description: 'Icon when no image/text', control: false },
    size: {
      options: AVATAR_SIZE_OPTIONS,
      control: 'select',
      description: 'Figma Design system Main: 20, 24, 32, 40, 48, 56, 64, 72, 80',
    },
    color: {
      options: AVATAR_COLOR_OPTIONS,
      control: 'select',
      description: 'Цвет из палитры (фон пастельный, текст/иконка — акцент)',
    },
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

const imageUrl =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face'

export const Playground: Story = {
  name: 'Playground',
  args: {
    src: imageUrl,
    alt: 'User',
    size: 40,
    text: '',
    color: 'primary',
  },
}

export const WithImage: Story = {
  args: {
    src: imageUrl,
    alt: 'User',
    size: 56,
  },
}

export const DefaultPlaceholder: Story = {
  name: 'Дефолт (человечек, когда нет src/text/icon)',
  args: {
    size: 56,
  },
}

export const WithColor: Story = {
  name: 'С цветом из палитры',
  args: {
    text: 'JB',
    size: 56,
    color: 'primary',
  },
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 320 }}>
      {AVATAR_COLOR_OPTIONS.map((color) => (
        <Avatar key={color} text="A" size={40} color={color} />
      ))}
    </div>
  ),
}

export const ColorsDefaultIcon: Story = {
  name: 'Цвета — дефолтная иконка человечка',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 320 }}>
      {AVATAR_COLOR_OPTIONS.map((color) => (
        <Avatar key={color} size={40} color={color} />
      ))}
    </div>
  ),
}

export const WithText: Story = {
  args: {
    text: 'JB',
    size: 56,
  },
}

export const WithIcon: Story = {
  args: {
    icon: <RiUserLine size={28} />,
    size: 56,
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
      {AVATAR_SIZE_OPTIONS.map((size) => (
        <Avatar key={size} text="A" size={size} />
      ))}
    </div>
  ),
}
