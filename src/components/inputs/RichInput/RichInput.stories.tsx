import { useState, type FormEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RichInput } from './RichInput'
import { BASE_INPUT_SIZE_OPTIONS } from '../base/BaseInput'
import { Button } from '../../Button'

// ── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof RichInput> = {
  component: RichInput,
  title: 'Inputs/RichInput',
  tags: ['autodocs'],
  args: {
    label: 'Description',
    placeholder: 'Describe the task…',
    hint: 'Bold / italic / lists are available in the toolbar.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 460 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      source: { excludeStories: ['Gallery'] },
    },
  },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    maxLength: { control: 'number' },
    minRows: { control: 'number' },
    maxRows: { control: 'number' },
    toolbarPlacement: { control: 'inline-radio', options: ['top', 'bottom'] },
    tools: {
      control: 'check',
      options: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'bulletList',
        'orderedList',
        'clear',
      ],
    },
    size: {
      control: 'select',
      options: [...BASE_INPUT_SIZE_OPTIONS],
      table: {
        type: { summary: "'big' | 'medium' | 'small'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof RichInput>

// ── Playground ────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <RichInput {...args} value={value} onChange={setValue} />
  },
}

// ── Сценарий: поле формы с валидацией ─────────────────────────────────────

/** Обязательное поле: ошибка снимается, как только появился текст. */
export const InForm: Story = {
  parameters: { controls: { exclude: ['value', 'error'] } },
  render: function Render(args) {
    const [value, setValue] = useState('')
    const [submitted, setSubmitted] = useState<string | null>(null)
    const [touched, setTouched] = useState(false)
    const isEmpty = value.replace(/<[^>]*>/g, '').trim() === ''

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      setTouched(true)
      if (!isEmpty) setSubmitted(value)
    }

    return (
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <RichInput
          {...args}
          required
          value={value}
          onChange={setValue}
          error={touched && isEmpty ? 'Description is required' : undefined}
        />
        <Button type="submit" variant="filled">
          Submit
        </Button>
        {submitted ? (
          <pre style={{ margin: 0, fontSize: 12, whiteSpace: 'pre-wrap' }}>{submitted}</pre>
        ) : null}
      </form>
    )
  },
}

// ── Сценарий: лимит длины ─────────────────────────────────────────────────

/** `maxLength` считает текст без тегов: ввод сверх лимита блокируется, вставка обрезается. */
export const WithMaxLength: Story = {
  args: { maxLength: 120, hint: undefined },
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <RichInput {...args} value={value} onChange={setValue} />
  },
}

// ── Сценарий: нативная отправка формы ─────────────────────────────────────

/** С `name` рендерится скрытый input — значение уходит в `FormData` без контроля из React. */
export const UncontrolledWithName: Story = {
  args: { defaultValue: '<b>Draft</b> text', hint: 'Uncontrolled: defaultValue + name' },
  render: function Render(args) {
    const [sent, setSent] = useState<string | null>(null)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSent(String(new FormData(e.currentTarget).get('description') ?? ''))
        }}
        style={{ display: 'grid', gap: 12 }}
      >
        <RichInput {...args} name="description" />
        <Button type="submit" variant="filled">
          Submit
        </Button>
        {sent ? (
          <pre style={{ margin: 0, fontSize: 12, whiteSpace: 'pre-wrap' }}>{sent}</pre>
        ) : null}
      </form>
    )
  },
}

// ── Сценарий: компактный вариант ──────────────────────────────────────────

/** Минимум инструментов, тулбар снизу, ограничение по высоте. */
export const Compact: Story = {
  args: {
    label: 'Note',
    hint: undefined,
    size: 'small',
    tools: ['bold', 'italic', 'clear'],
    toolbarPlacement: 'bottom',
    minRows: 2,
    maxRows: 4,
  },
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <RichInput {...args} value={value} onChange={setValue} />
  },
}

// ── Gallery ───────────────────────────────────────────────────────────────

export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gap: 20, width: 460 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <RichInput label="Empty" placeholder="Describe the task…" />
      <RichInput label="Filled" defaultValue="<b>Bold</b> and <i>italic</i> text" />
      <RichInput label="With error" defaultValue="Too short" error="At least 20 characters" />
      <RichInput label="Completed" defaultValue="Reviewed" completed />
      <RichInput label="Read only" defaultValue="<ul><li>First</li><li>Second</li></ul>" readOnly />
      <RichInput label="Disabled" defaultValue="Locked content" disabled />
      <RichInput label="No toolbar" placeholder="Plain multiline…" tools={[]} />
    </>
  ),
}
