import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'
import {
  TITLE_SIZES,
  LABEL_SIZES,
  PARAGRAPH_SIZES,
  SUBHEADING_SIZES,
  DOCS_SIZES,
  TYPOGRAPHY_WEIGHTS,
} from './Typography.types'
import type {
  TitleSize,
  LabelSize,
  ParagraphSize,
  SubheadingSize,
  DocsSize,
} from './Typography.types'

const TEXT = 'The quick brown fox jumps over the lazy dog.'

type ExtraArgs = {
  titleSize: TitleSize
  labelSize: LabelSize
  paragraphSize: ParagraphSize
  subheadingSize: SubheadingSize
  docsSize: DocsSize
}

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Components/Typography',
  tags: ['autodocs'],
  args: {
    variant: 'title',
    children: TEXT,
    ...({
      titleSize: 'h1',
      labelSize: 'medium',
      paragraphSize: 'medium',
      subheadingSize: 'medium',
      docsSize: 'label',
    } as Record<string, unknown>),
  },
  argTypes: {
    variant: { control: 'select', options: ['title', 'label', 'paragraph', 'subheading', 'docs'] },
    weight: { control: 'select', options: TYPOGRAPHY_WEIGHTS },
    size: { table: { disable: true } },
    ...({
      titleSize: {
        name: 'size',
        control: 'select',
        options: TITLE_SIZES,
        if: { arg: 'variant', eq: 'title' },
      },
      labelSize: {
        name: 'size',
        control: 'select',
        options: LABEL_SIZES,
        if: { arg: 'variant', eq: 'label' },
      },
      paragraphSize: {
        name: 'size',
        control: 'select',
        options: PARAGRAPH_SIZES,
        if: { arg: 'variant', eq: 'paragraph' },
      },
      subheadingSize: {
        name: 'size',
        control: 'select',
        options: SUBHEADING_SIZES,
        if: { arg: 'variant', eq: 'subheading' },
      },
      docsSize: {
        name: 'size',
        control: 'select',
        options: DOCS_SIZES,
        if: { arg: 'variant', eq: 'docs' },
      },
    } as Record<string, object>),
  },
  render: (args) => {
    const extra = args as unknown as ExtraArgs
    if (args.variant === 'title') {
      return (
        <Typography variant="title" size={extra.titleSize} weight={args.weight}>
          {args.children}
        </Typography>
      )
    }
    if (args.variant === 'paragraph') {
      return (
        <Typography variant="paragraph" size={extra.paragraphSize} weight={args.weight}>
          {args.children}
        </Typography>
      )
    }
    if (args.variant === 'subheading') {
      return (
        <Typography variant="subheading" size={extra.subheadingSize} weight={args.weight}>
          {args.children}
        </Typography>
      )
    }
    if (args.variant === 'docs') {
      return (
        <Typography variant="docs" size={extra.docsSize}>
          {args.children}
        </Typography>
      )
    }
    return (
      <Typography variant="label" size={extra.labelSize} weight={args.weight}>
        {args.children}
      </Typography>
    )
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {}

export const Title: Story = {
  args: {
    variant: 'title',
    ...({ titleSize: 'h1' } as Record<string, unknown>),
  },
}

export const Label: Story = {
  args: {
    variant: 'label',
    ...({ labelSize: 'medium' } as Record<string, unknown>),
  },
}

export const Paragraph: Story = {
  args: {
    variant: 'paragraph',
    ...({ paragraphSize: 'medium' } as Record<string, unknown>),
  },
}

export const Subheading: Story = {
  args: {
    variant: 'subheading',
    ...({ subheadingSize: 'medium' } as Record<string, unknown>),
  },
}

export const Docs: Story = {
  args: {
    variant: 'docs',
    ...({ docsSize: 'label' } as Record<string, unknown>),
  },
}
