import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CommentRichInput } from './CommentRichInput'

const meta: Meta<typeof CommentRichInput> = {
  component: CommentRichInput,
  title: 'Components/Comments/CommentRichInput',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Только rich-поле и кнопка «Отправить». **Enter** — отправить, **Shift+Enter** — новая строка. Лента — в **CommentsSection**, сториз **«Прототип: лента в useState»**.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CommentRichInput>

export const Playground: Story = {
  args: {
    placeholder: 'Оставьте комментарий…',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Блок под полем — это **не лента комментариев**, а отладочный вывод HTML после каждого «Отправить». Интерактивная лента целиком: меню **Comments / CommentsSection → «Прототип: лента в useState»**.',
      },
    },
  },
  render: function Render(args) {
    const [log, setLog] = useState<string[]>([])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <CommentRichInput {...args} onSend={async (html) => setLog((l) => [...l, html])} />
        <p
          style={{ margin: 0, fontSize: 13, lineHeight: 1.45, color: 'var(--text-sub-600, #666)' }}
        >
          Ниже — сырой HTML каждой отправки (разделитель <code>---</code>). Лента с аватарами и
          днями: <strong>CommentsSection</strong> → «Прототип: лента в useState».
        </p>
        {log.length > 0 ? (
          <pre style={{ fontSize: 12, margin: 0, whiteSpace: 'pre-wrap' }}>
            {log.join('\n---\n')}
          </pre>
        ) : (
          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-soft-400, #999)' }}>
            Нажмите «Отправить», чтобы увидеть HTML здесь.
          </p>
        )}
      </div>
    )
  },
}

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Оставьте комментарий…',
    maxLength: 120,
  },
  parameters: {
    docs: {
      description: {
        story:
          'С `maxLength` в футере появляется счётчик `current / max`. Ввод сверх лимита блокируется (вставка из буфера обрезается), при превышении счётчик подсвечивается и кнопка отправки недоступна.',
      },
    },
  },
  render: function Render(args) {
    return <CommentRichInput {...args} onSend={async () => {}} />
  },
}
