import type { RichInputProps } from '../RichInput'

/**
 * `RichInput`, у которого значение — **Markdown**, а не HTML. Внутри тот же редактор:
 * входящий Markdown разворачивается в HTML, результат правки сворачивается обратно.
 *
 * @remarks
 * - Живёт за sub-entry `@v-lab/ui-kit/markdown` — нужны peer-зависимости `marked` и `turndown`.
 * - **Подчёркивание** Markdown не выражает. По умолчанию кнопки `underline` нет; если добавить её
 *   в `tools`, формат сохранится как inline-HTML `<u>…</u>` внутри Markdown.
 * - `maxLength` считает **видимый текст**, а не длину Markdown-разметки.
 * - Остальные пропы — как у {@link RichInputProps}.
 */
export type MarkdownInputProps = Omit<RichInputProps, 'value' | 'defaultValue' | 'onChange'> & {
  /** Markdown-значение (контролируемый режим). */
  value?: string
  /** Начальный Markdown (неконтролируемый режим). */
  defaultValue?: string
  /** Новое Markdown-значение после каждого изменения. */
  onChange?: (markdown: string) => void
}
