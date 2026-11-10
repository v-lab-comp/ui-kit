import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'
import {
  TITLE_SIZES,
  LABEL_SIZES,
  PARAGRAPH_SIZES,
  SUBHEADING_SIZES,
  DOCS_SIZES,
} from './Typography.types'
import type {
  TitleSize,
  LabelSize,
  ParagraphSize,
  SubheadingSize,
  DocsSize,
} from './Typography.types'

const TEXT = 'The quick brown fox jumps over the lazy dog.'

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Gallery/Typography',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
}

export default meta
type Story = StoryObj<typeof Typography>

// ─── Title ───────────────────────────────────────────────────────────────────

const titleMeta: Record<TitleSize, string> = {
  h1: '56 / 64 · −1%',
  h2: '48 / 56 · −1%',
  h3: '40 / 48 · −1%',
  h4: '32 / 40 · −0.5%',
  h5: '24 / 32 · 0%',
  h6: '20 / 28 · 0%',
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.08em',
  color: '#999',
  textTransform: 'uppercase',
}

export const TitleGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {TITLE_SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={labelStyle}>
            Title / {size.toUpperCase()} · {titleMeta[size]}
          </span>
          <Typography variant="title" size={size}>
            {TEXT}
          </Typography>
        </div>
      ))}
    </div>
  ),
}

// ─── Label ───────────────────────────────────────────────────────────────────

const labelMeta: Record<LabelSize, string> = {
  'x-large': '24 / 32 · −1.5%',
  large: '18 / 24 · −1.5%',
  medium: '16 / 24 · −1.1%',
  small: '14 / 20 · −0.6%',
  'x-small': '12 / 16 · 0%',
}

export const LabelGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {LABEL_SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={labelStyle}>
            Label / {size} · {labelMeta[size]}
          </span>
          <Typography variant="label" size={size}>
            {TEXT}
          </Typography>
        </div>
      ))}
    </div>
  ),
}

// ─── Paragraph ────────────────────────────────────────────────────────────────

const paragraphMeta: Record<ParagraphSize, string> = {
  'x-large': '24 / 32 · −1.5%',
  large: '18 / 24 · −1.5%',
  medium: '16 / 24 · −1.1%',
  small: '14 / 20 · −0.6%',
  'x-small': '12 / 16 · 0%',
}

export const ParagraphGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {PARAGRAPH_SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={labelStyle}>
            Paragraph / {size} · {paragraphMeta[size]}
          </span>
          <Typography variant="paragraph" size={size}>
            {TEXT}
          </Typography>
        </div>
      ))}
    </div>
  ),
}

// ─── Subheading ───────────────────────────────────────────────────────────────

const subheadingMeta: Record<SubheadingSize, string> = {
  medium: '16 / 24 · 6%',
  small: '14 / 20 · 6%',
  'x-small': '12 / 16 · 4%',
  '2x-small': '11 / 12 · 2%',
}

export const SubheadingGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SUBHEADING_SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={labelStyle}>
            Subheading / {size} · {subheadingMeta[size]}
          </span>
          <Typography variant="subheading" size={size}>
            {TEXT}
          </Typography>
        </div>
      ))}
    </div>
  ),
}

// ─── Docs ───────────────────────────────────────────────────────────────────

const docsMeta: Record<DocsSize, string> = {
  label: '18 / 32 · −1.5% (500)',
  paragraph: '18 / 32 · −1.5% (400)',
}

export const DocsGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {DOCS_SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={labelStyle}>
            Docs / {size} · {docsMeta[size]}
          </span>
          <Typography variant="docs" size={size}>
            {TEXT}
          </Typography>
        </div>
      ))}
    </div>
  ),
}

// ─── All ─────────────────────────────────────────────────────────────────────

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <section>
        <p style={{ ...labelStyle, color: '#aaa', letterSpacing: '0.1em', marginBottom: 32 }}>
          Title — Google Sans 500
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {TITLE_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ ...labelStyle, color: '#bbb' }}>
                {size.toUpperCase()} · {titleMeta[size]}
              </span>
              <Typography variant="title" size={size}>
                {TEXT}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p style={{ ...labelStyle, color: '#aaa', letterSpacing: '0.1em', marginBottom: 32 }}>
          Label — Google Sans 500
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {LABEL_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ ...labelStyle, color: '#bbb' }}>
                {size} · {labelMeta[size]}
              </span>
              <Typography variant="label" size={size}>
                {TEXT}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p style={{ ...labelStyle, color: '#aaa', letterSpacing: '0.1em', marginBottom: 32 }}>
          Paragraph — Google Sans 400
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {PARAGRAPH_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ ...labelStyle, color: '#bbb' }}>
                {size} · {paragraphMeta[size]}
              </span>
              <Typography variant="paragraph" size={size}>
                {TEXT}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p style={{ ...labelStyle, color: '#aaa', letterSpacing: '0.1em', marginBottom: 32 }}>
          Subheading — Google Sans 500, uppercase
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {SUBHEADING_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ ...labelStyle, color: '#bbb' }}>
                {size} · {subheadingMeta[size]}
              </span>
              <Typography variant="subheading" size={size}>
                {TEXT}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p style={{ ...labelStyle, color: '#aaa', letterSpacing: '0.1em', marginBottom: 32 }}>
          Docs — Label 500, Paragraph 400
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {DOCS_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ ...labelStyle, color: '#bbb' }}>
                {size} · {docsMeta[size]}
              </span>
              <Typography variant="docs" size={size}>
                {TEXT}
              </Typography>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}
