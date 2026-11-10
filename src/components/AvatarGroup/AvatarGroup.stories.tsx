import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@/components/Avatar'
import { AvatarGroup } from './AvatarGroup'

const image = (seed: number) =>
  `https://images.unsplash.com/photo-${1472099645785 + seed}-5658abf4ff4e?w=128&h=128&fit=crop&crop=face`

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: { control: 'select', options: ['default', 'compact'] },
    compactStyle: { control: 'select', options: ['default', 'stroke'] },
    size: { control: 'select', options: [20, 24, 32, 40, 48, 56, 64, 72, 80] },
    max: { control: 'number' },
    overlap: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

export const Playground: Story = {
  name: 'Playground',
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar src={image(0)} alt="James Brown" />
      <Avatar text="SW" color="away" />
      <Avatar text="AT" color="primary" />
      <Avatar text="EW" color="verified" />
      <Avatar text="MJ" color="feature" />
      <Avatar text="PK" color="highlighted" />
    </AvatarGroup>
  ),
  args: { size: 40, max: 4, overlap: 12, mode: 'compact', compactStyle: 'default' },
}

export const Default: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar src={image(0)} alt="James Brown" />
      <Avatar text="SW" color="away" />
      <Avatar text="AT" color="primary" />
      <Avatar text="EW" color="verified" />
      <Avatar text="MJ" color="feature" />
    </AvatarGroup>
  ),
  args: { size: 40, max: 4, overlap: 12 },
}

export const WithoutOverflow: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar src={image(0)} alt="James Brown" />
      <Avatar text="SW" color="away" />
      <Avatar text="AT" color="primary" />
      <Avatar text="EW" color="verified" />
    </AvatarGroup>
  ),
  args: { size: 40, max: 4, overlap: 12 },
}

export const Large: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar src={image(0)} alt="James Brown" />
      <Avatar text="SW" color="away" />
      <Avatar text="AT" color="primary" />
      <Avatar text="EW" color="verified" />
      <Avatar text="MJ" color="feature" />
    </AvatarGroup>
  ),
  args: { size: 56, max: 4, overlap: 16 },
}

export const Compact40: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar src={image(0)} alt="James" />
      <Avatar src={image(1)} alt="Sophia" />
      <Avatar src={image(2)} alt="Arthur" />
      <Avatar text="EW" color="verified" />
      <Avatar text="MJ" color="feature" />
      <Avatar text="LP" color="error" />
    </AvatarGroup>
  ),
  args: { mode: 'compact', size: 40, max: 3 },
}

export const Compact32: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar src={image(0)} alt="James" />
      <Avatar src={image(1)} alt="Sophia" />
      <Avatar src={image(2)} alt="Arthur" />
      <Avatar text="EW" color="verified" />
      <Avatar text="MJ" color="feature" />
    </AvatarGroup>
  ),
  args: { mode: 'compact', size: 32, max: 3 },
}

export const Compact24: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar src={image(0)} alt="James" />
      <Avatar src={image(1)} alt="Sophia" />
      <Avatar src={image(2)} alt="Arthur" />
      <Avatar text="EW" color="verified" />
      <Avatar text="MJ" color="feature" />
    </AvatarGroup>
  ),
  args: { mode: 'compact', size: 24, max: 3 },
}

export const CompactStroke: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar src={image(0)} alt="James" />
      <Avatar src={image(1)} alt="Sophia" />
      <Avatar src={image(2)} alt="Arthur" />
      <Avatar text="EW" color="verified" />
      <Avatar text="MJ" color="feature" />
    </AvatarGroup>
  ),
  args: { mode: 'compact', compactStyle: 'stroke', size: 40, max: 3 },
}
