import type { Meta, StoryObj } from '@storybook/react'
import { RiCheckLine, RiStarFill } from '@remixicon/react'
import { Badge } from './Badge'
import {
  BADGE_COLOR_OPTIONS,
  BADGE_SIZE_OPTIONS,
  BADGE_VARIANT_OPTIONS,
  BADGE_SHAPE_OPTIONS,
} from './Badge.types'

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: [...BADGE_VARIANT_OPTIONS] },
    color: { control: 'select', options: [...BADGE_COLOR_OPTIONS] },
    size: { control: 'select', options: [...BADGE_SIZE_OPTIONS] },
    shape: { control: 'select', options: [...BADGE_SHAPE_OPTIONS] },
    customColor: { control: 'text', description: 'Hex (#rgb/#rrggbb). Перекрывает `color`.' },
    dot: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    shape: 'pill',
  },
}

export const Gallery: Story = {
  name: '📋 Gallery — All States',
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const sectionTitle = {
      margin: '0 0 8px',
      fontSize: 12,
      color: 'var(--text-sub-600)',
      fontWeight: 500,
    } as const
    return (
      <>
        <div>
          <p style={sectionTitle}>Variants</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {BADGE_VARIANT_OPTIONS.map((v) => (
              <Badge key={v} variant={v} color="primary">
                {v}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p style={sectionTitle}>Colors (filled)</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {BADGE_COLOR_OPTIONS.map((c) => (
              <Badge key={c} variant="filled" color={c}>
                {c}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p style={sectionTitle}>Sizes</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {BADGE_SIZE_OPTIONS.map((s) => (
              <Badge key={s} size={s} color="primary">
                {s}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p style={sectionTitle}>Shapes</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Badge shape="pill">pill</Badge>
            <Badge shape="rounded">rounded</Badge>
            <Badge shape="circle">42</Badge>
          </div>
        </div>
        <div>
          <p style={sectionTitle}>Dot indicator</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge variant="light" color="success" dot>
              Active
            </Badge>
            <Badge variant="light" color="warning" dot>
              Pending
            </Badge>
            <Badge variant="light" color="error" dot>
              Failed
            </Badge>
            <Badge variant="stroke" color="information" dot>
              Info
            </Badge>
          </div>
        </div>
        <div>
          <p style={sectionTitle}>Custom color (hex)</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge variant="filled" customColor="#7c3aed">
              #7c3aed
            </Badge>
            <Badge variant="light" customColor="#7c3aed">
              light
            </Badge>
            <Badge variant="stroke" customColor="#7c3aed">
              stroke
            </Badge>
            <Badge variant="filled" customColor="#0ea5e9" dot>
              dot
            </Badge>
          </div>
        </div>
        <div>
          <p style={sectionTitle}>Clickable</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge variant="filled" color="primary" onClick={() => {}}>
              filled
            </Badge>
            <Badge variant="light" color="success" onClick={() => {}}>
              light
            </Badge>
            <Badge variant="stroke" color="error" onClick={() => {}}>
              stroke
            </Badge>
            <Badge variant="filled" color="primary" disabled onClick={() => {}}>
              disabled
            </Badge>
          </div>
        </div>
        <div>
          <p style={sectionTitle}>With nodes</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge variant="light" color="success" leftNode={<RiCheckLine size={12} />}>
              done
            </Badge>
            <Badge variant="filled" color="warning" rightNode={<RiStarFill size={12} />}>
              new
            </Badge>
          </div>
        </div>
        <div>
          <p style={sectionTitle}>CSS variables override</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Badge
              variant="filled"
              color="primary"
              style={{
                ['--badge-height' as never]: '28px',
                ['--badge-padding-x' as never]: '12px',
                ['--badge-font-size' as never]: '14px',
                ['--badge-radius' as never]: '8px',
              }}
            >
              custom
            </Badge>
          </div>
        </div>
      </>
    )
  },
}

export const CustomColor: Story = {
  name: 'customColor (#hex)',
  args: { children: 'Custom', variant: 'filled', customColor: '#7c3aed' },
}

export const WithDot: Story = {
  args: { children: 'Active', variant: 'light', color: 'success', dot: true },
}

export const Clickable: Story = {
  args: { children: 'Filter', variant: 'light', color: 'primary', onClick: () => {} },
}

export const Default: Story = {
  args: { children: 'Badge', variant: 'filled', color: 'primary', size: 'medium' },
}
