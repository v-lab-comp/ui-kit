import type { Meta, StoryObj } from '@storybook/react'
import { PdfPreview } from './PdfPreview'

/** Тот же origin, что и Storybook — без CORS (внешние URL PDF ломаются в браузере). */
const SAMPLE_PDF_URL = '/sample.pdf'

/** Невалидные байты — ошибка парсинга без HTTP 404 в консоли сети. */
const INVALID_PDF_FILE = new File([new TextEncoder().encode('not a valid pdf')], 'invalid.pdf', {
  type: 'application/pdf',
})

const meta: Meta<typeof PdfPreview> = {
  component: PdfPreview,
  title: 'Components/PdfPreview',
  tags: ['autodocs'],
  /** Безопасный дефолт для Docs/Primary — внешние PDF без CORS в браузере не грузятся. */
  args: {
    fileUrl: SAMPLE_PDF_URL,
    fileName: 'sample.pdf',
  },
  parameters: {
    layout: 'centered',
    docs: {
      canvas: { sourceState: 'shown' },
      description: {
        component:
          'Превью PDF через `react-pdf` / pdf.js. В сторис используется `public/sample.pdf` (тот же origin), иначе внешние ссылки блокируются CORS.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 900, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PdfPreview>

export const Playground: Story = {
  name: 'Playground',
  args: {
    fileUrl: SAMPLE_PDF_URL,
    fileName: 'sample.pdf',
  },
  argTypes: {
    fileUrl: { control: 'text', description: 'URL to PDF file (same origin required)' },
    fileName: { control: 'text' },
    file: { table: { disable: true } },
  },
}

/**
 * PDF по URL с того же origin (`public/sample.pdf`).
 */
export const WithUrl: Story = {
  args: {
    fileUrl: SAMPLE_PDF_URL,
    fileName: 'sample.pdf',
  },
}

/**
 * Ошибка загрузки: битые данные в `file` (без лишнего GET/404 в Network).
 */
export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Демо ошибки через `file` с невалидным содержимым — так не дергается несуществующий URL и не засоряется консоль сети.',
      },
    },
  },
  render: () => <PdfPreview file={INVALID_PDF_FILE} fileName="invalid.pdf" />,
}

/**
 * Тот же источник, что и WithUrl; в приложении обычно передают `File` из input.
 */
export const WithFile: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'В проде чаще передают `file` из `<input type="file">`. Для демо в Canvas используется URL с `public/`.',
      },
    },
  },
  args: {
    fileUrl: SAMPLE_PDF_URL,
    fileName: 'document.pdf',
  },
}

/**
 * Как может выглядеть блок предпросмотра документа в экране приложения.
 * Обёртка только в Storybook — в ui-kit по-прежнему только `PdfPreview`.
 */
export const DocumentPreview: Story = {
  name: 'Предпросмотр в экране',
  args: {
    fileUrl: SAMPLE_PDF_URL,
    fileName: 'akt-sverki.pdf',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Пример вёрстки вокруг компонента: заголовок, подпись, затем превью. Стили обёртки — только в сторис.',
      },
    },
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      <header style={{ paddingBottom: 4 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.3,
            color: 'var(--text-strong-950)',
          }}
        >
          Акт сверки за период
        </h2>
        <p
          style={{ margin: '8px 0 0', fontSize: 13, lineHeight: 1.4, color: 'var(--text-sub-600)' }}
        >
          PDF-файл из <code style={{ fontSize: 12 }}>public/sample.pdf</code> — тот же origin, без
          CORS.
        </p>
      </header>
      <PdfPreview {...args} />
    </div>
  ),
}
