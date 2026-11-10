import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MarkdownInput } from './MarkdownInput'
import { markdownToHtml } from './markdownCodec'

const meta: Meta<typeof MarkdownInput> = {
  component: MarkdownInput,
  title: 'Inputs/MarkdownInput',
  tags: ['autodocs'],
  args: {
    label: 'Description',
    placeholder: 'Describe the task…',
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
      description: {
        component:
          'Импорт из `@v-lab/ui-kit/markdown` — нужны peer-зависимости `marked` и `turndown`. ' +
          'Значение — Markdown; внутри тот же редактор, что у `RichInput`.',
      },
      canvas: { sourceState: 'shown' },
      source: { excludeStories: ['Gallery'] },
    },
  },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    maxLength: { control: 'number' },
    minRows: { control: 'number' },
    maxRows: { control: 'number' },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof MarkdownInput>

const codeBox = {
  margin: 0,
  padding: 8,
  fontSize: 12,
  whiteSpace: 'pre-wrap' as const,
  background: 'var(--bg-weak-50)',
  borderRadius: 8,
  minHeight: 60,
}

/** Значение поля — Markdown; справа виден результат каждой правки. */
export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('**Bold** start\n\n- one\n- two')
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <MarkdownInput {...args} value={value} onChange={setValue} />
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--text-sub-600)' }}>
            Значение (Markdown)
          </p>
          <pre style={codeBox}>{value || '—'}</pre>
        </div>
      </div>
    )
  },
}

/** Неконтролируемый режим: `defaultValue` в Markdown, `name` кладёт Markdown в `FormData`. */
export const InForm: Story = {
  args: { defaultValue: '# Заголовок\n\nТекст с *курсивом*.' },
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
        <MarkdownInput {...args} name="description" />
        <button type="submit">Submit</button>
        {sent ? <pre style={codeBox}>{sent}</pre> : null}
      </form>
    )
  },
}

/** `markdownToHtml` доступен отдельно — для режима просмотра сохранённого текста. */
export const ViewMode: Story = {
  args: { label: 'Условия', defaultValue: 'Оплата — **5 дней**.\n\n- возврат 14 дней\n- без НДС' },
  render: function Render(args) {
    const [value, setValue] = useState(String(args.defaultValue ?? ''))
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <MarkdownInput {...args} onChange={setValue} />
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 12, color: 'var(--text-sub-600)' }}>
            Просмотр (markdownToHtml)
          </p>
          <div style={codeBox} dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }} />
        </div>
      </div>
    )
  },
}
