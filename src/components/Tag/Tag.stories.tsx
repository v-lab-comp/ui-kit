import type { Meta, StoryObj } from '@storybook/react'
import { RiVerifiedBadgeFill } from '@remixicon/react'
import {
  Tag,
  TAG_COLOR_OPTIONS,
  TAG_VARIANT_OPTIONS,
  TAG_SIZE_OPTIONS,
  TAG_SHAPE_OPTIONS,
} from './Tag'
import { PersonIcon } from '@/stories/helpers'

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'Components/Tag',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { canvas: { sourceState: 'shown' } },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'Tag',
    variant: 'stroke',
    size: 'medium',
    shape: 'rounded',
  },
  argTypes: {
    variant: { control: 'select', options: [...TAG_VARIANT_OPTIONS] },
    size: { control: 'select', options: [...TAG_SIZE_OPTIONS] },
    shape: { control: 'select', options: [...TAG_SHAPE_OPTIONS] },
    color: { control: 'select', options: [...TAG_COLOR_OPTIONS] },
    customColor: { control: 'text', description: 'Hex (#rgb/#rrggbb). Перекрывает `color`.' },
    sublabel: { control: 'text' },
    dismissLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    prefixRounded: { control: 'boolean' },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } },
    onDismiss: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Playground: Story = {
  args: { children: 'Tag', variant: 'stroke', sublabel: '(4)' },
}

export const Stroke: Story = { args: { children: 'Tag', variant: 'stroke' } }
export const Gray: Story = { args: { children: 'Tag', variant: 'gray' } }
export const Filled: Story = { args: { children: 'Tag', variant: 'filled', color: 'primary' } }
export const Light: Story = { args: { children: 'Tag', variant: 'light', color: 'success' } }

export const SizeSmall: Story = { args: { children: 'Tag', size: 'small' } }
export const SizeLarge: Story = { args: { children: 'Tag', size: 'large' } }
export const ShapePill: Story = { args: { children: 'Tag', shape: 'pill', color: 'primary' } }

export const WithSublabel: Story = {
  args: { children: 'Inbox', sublabel: '(12)', variant: 'gray', color: 'primary' },
}

export const WithDismiss: Story = {
  args: { children: 'Tag', variant: 'stroke', onDismiss: () => {} },
}

export const WithPrefix: Story = {
  args: { children: 'User', variant: 'stroke', prefix: <PersonIcon /> },
}

export const Clickable: Story = {
  args: { children: 'Open filter', variant: 'stroke', onClick: () => {} },
}

export const CustomHex: Story = {
  name: 'customColor (#hex)',
  args: { children: 'Custom', variant: 'filled', customColor: '#7c3aed' },
}

export const ComplexAvatarDismiss: Story = {
  name: 'Complex — avatar + suffix + dismiss',
  args: {
    children: 'Jane Cooper',
    variant: 'stroke',
    color: 'information',
    sublabel: '(Admin)',
    prefix: <img src="https://i.pravatar.cc/64?img=32" alt="" width={16} height={16} />,
    suffix: <RiVerifiedBadgeFill size={16} aria-hidden />,
    onDismiss: () => {},
    onClick: () => {},
  },
}

export const Disabled: Story = {
  args: { children: 'Tag', variant: 'stroke', disabled: true, onDismiss: () => {} },
}

export const Gallery: Story = {
  name: '📋 Gallery — All states',
  parameters: { controls: { disable: true } },
  render: () => {
    const title = {
      margin: '0 0 8px',
      fontSize: 12,
      color: 'var(--text-sub-600)',
      fontWeight: 500,
    } as const
    const row = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' } as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <div>
          <p style={title}>Variants × neutral</p>
          <div style={row}>
            {TAG_VARIANT_OPTIONS.map((v) => (
              <Tag key={v} variant={v}>
                {v}
              </Tag>
            ))}
          </div>
        </div>
        <div>
          <p style={title}>Variants × color (primary)</p>
          <div style={row}>
            {TAG_VARIANT_OPTIONS.map((v) => (
              <Tag key={v} variant={v} color="primary">
                {v}
              </Tag>
            ))}
          </div>
        </div>
        <div>
          <p style={title}>Sizes</p>
          <div style={row}>
            {TAG_SIZE_OPTIONS.map((s) => (
              <Tag key={s} size={s} variant="gray" color="primary">
                {s}
              </Tag>
            ))}
          </div>
        </div>
        <div>
          <p style={title}>Shapes</p>
          <div style={row}>
            <Tag shape="rounded" color="primary">
              rounded
            </Tag>
            <Tag shape="pill" color="primary">
              pill
            </Tag>
            <Tag shape="pill" variant="filled" color="primary">
              pill filled
            </Tag>
          </div>
        </div>
        <div>
          <p style={title}>Colors (light)</p>
          <div style={row}>
            {TAG_COLOR_OPTIONS.map((c) => (
              <Tag key={c} variant="light" color={c}>
                {c}
              </Tag>
            ))}
          </div>
        </div>
        <div>
          <p style={title}>customColor</p>
          <div style={row}>
            <Tag variant="stroke" customColor="#7c3aed">
              stroke
            </Tag>
            <Tag variant="gray" customColor="#7c3aed">
              gray
            </Tag>
            <Tag variant="filled" customColor="#7c3aed">
              filled
            </Tag>
            <Tag variant="light" customColor="#7c3aed">
              light
            </Tag>
            <Tag variant="light" customColor="#0ea5e9" sublabel="(12)">
              with sublabel
            </Tag>
          </div>
        </div>
        <div>
          <p style={title}>With prefix / suffix / dismiss</p>
          <div style={row}>
            <Tag variant="stroke" prefix={<PersonIcon />}>
              Label
            </Tag>
            <Tag variant="gray" onDismiss={() => {}}>
              Tag
            </Tag>
            <Tag
              variant="stroke"
              color="information"
              prefix={<img src="https://i.pravatar.cc/64?img=32" alt="" width={16} height={16} />}
              suffix={<RiVerifiedBadgeFill size={16} aria-hidden />}
              onDismiss={() => {}}
              onClick={() => {}}
            >
              Jane Cooper
            </Tag>
          </div>
        </div>
        <div>
          <p style={title}>Disabled</p>
          <div style={row}>
            <Tag variant="stroke" disabled>
              Tag
            </Tag>
            <Tag variant="gray" disabled>
              Tag
            </Tag>
            <Tag variant="filled" color="primary" disabled>
              Tag
            </Tag>
            <Tag variant="stroke" disabled onDismiss={() => {}}>
              Tag
            </Tag>
          </div>
        </div>
        <div>
          <p style={title}>CSS variables override</p>
          <div style={row}>
            <Tag
              variant="filled"
              color="primary"
              style={{
                ['--tag-height' as never]: '32px',
                ['--tag-padding-x' as never]: '14px',
                ['--tag-font-size' as never]: '14px',
                ['--tag-radius' as never]: '12px',
              }}
            >
              custom
            </Tag>
          </div>
        </div>
      </div>
    )
  },
}
