import type { CSSProperties } from 'react'
import { Typography } from '@/components/Typography'
import {
  TITLE_SIZES,
  LABEL_SIZES,
  PARAGRAPH_SIZES,
  SUBHEADING_SIZES,
  DOCS_SIZES,
} from '@/components/Typography/Typography.types'
import type {
  TitleSize,
  LabelSize,
  ParagraphSize,
  SubheadingSize,
  DocsSize,
} from '@/components/Typography/Typography.types'

const TEXT = 'The quick brown fox jumps over the lazy dog.'

const titleMeta: Record<TitleSize, string> = {
  h1: '56 / 64 · −1%',
  h2: '48 / 56 · −1%',
  h3: '40 / 48 · −1%',
  h4: '32 / 40 · −0.5%',
  h5: '24 / 32 · 0%',
  h6: '20 / 28 · 0%',
}

const labelMeta: Record<LabelSize, string> = {
  'x-large': '24 / 32 · −1.5%',
  large: '18 / 24 · −1.5%',
  medium: '16 / 24 · −1.1%',
  small: '14 / 20 · −0.6%',
  'x-small': '12 / 16 · 0%',
}

const paragraphMeta: Record<ParagraphSize, string> = {
  'x-large': '24 / 32 · −1.5%',
  large: '18 / 24 · −1.5%',
  medium: '16 / 24 · −1.1%',
  small: '14 / 20 · −0.6%',
  'x-small': '12 / 16 · 0%',
}

const subheadingMeta: Record<SubheadingSize, string> = {
  medium: '16 / 24 · 6%',
  small: '14 / 20 · 6%',
  'x-small': '12 / 16 · 4%',
  '2x-small': '11 / 12 · 2%',
}

const docsMeta: Record<DocsSize, string> = {
  label: '18 / 32 · −1.5% (500)',
  paragraph: '18 / 32 · −1.5% (400)',
}

const caption: CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.08em',
  color: 'var(--text-soft-400, #99a0ae)',
  textTransform: 'uppercase',
}

const captionMuted: CSSProperties = {
  ...caption,
  color: 'var(--text-sub-600, #525866)',
}

const sectionTitle: CSSProperties = {
  ...caption,
  color: 'var(--text-soft-400, #99a0ae)',
  letterSpacing: '0.1em',
  marginBottom: 24,
}

/** Верхнее превью — несколько вариантов, как в примере из доки */
export function TypographyDocsDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 480,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <Typography variant="title" size="h3">
        Заголовок секции
      </Typography>
      <Typography variant="paragraph" size="medium">
        Основной текст абзаца по дизайн-системе — типичный параграф для интерфейса.
      </Typography>
      <Typography variant="label" size="small">
        Подпись к полю
      </Typography>
      <Typography variant="subheading" size="small">
        подзаголовок блока
      </Typography>
    </div>
  )
}

/** Галерея всех размеров — как Storybook Gallery → Typography */
export function TypographyGalleryDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
        maxWidth: 720,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
    >
      <section>
        <p style={sectionTitle}>Title — Google Sans 500</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {TITLE_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={captionMuted}>
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
        <p style={sectionTitle}>Label — Google Sans 500</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {LABEL_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={captionMuted}>
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
        <p style={sectionTitle}>Paragraph — Google Sans 400</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {PARAGRAPH_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={captionMuted}>
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
        <p style={sectionTitle}>Subheading — Google Sans 500, uppercase</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {SUBHEADING_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={captionMuted}>
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
        <p style={sectionTitle}>Docs — Label 500, Paragraph 400</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {DOCS_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={captionMuted}>
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
  )
}
