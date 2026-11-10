/**
 * MarkdownInput — редактор `RichInput`, у которого значение хранится в Markdown.
 *   import { MarkdownInput } from '@v-lab/ui-kit/markdown'
 *
 * Требует peer-зависимостей: marked, turndown.
 *
 * Конвертеры `markdownToHtml` / `htmlToMarkdown` экспортируются отдельно — например,
 * чтобы отрендерить сохранённый Markdown в режиме просмотра.
 */
export { MarkdownInput, DEFAULT_MARKDOWN_INPUT_TOOLS } from './components/inputs/MarkdownInput'
export { htmlToMarkdown, markdownToHtml } from './components/inputs/MarkdownInput'
export type { MarkdownInputProps } from './components/inputs/MarkdownInput'
