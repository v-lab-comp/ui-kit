import { marked } from 'marked'
import TurndownService from 'turndown'

/**
 * Конвертация Markdown ↔ HTML для `MarkdownInput`.
 * Требует peer-зависимостей `marked` и `turndown` — поэтому живёт за sub-entry `/markdown`.
 */

const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
})

// В CommonMark нет подчёркивания: сохраняем <u> как inline-HTML, иначе формат терялся бы молча
turndown.keep(['u'])

// Зачёркивание в core turndown не поддержано (правило живёт в GFM-плагине),
// а execCommand в браузерах отдаёт <strike> / <s> / <del> — покрываем все три
turndown.addRule('strikethrough', {
  filter: ['s', 'del', 'strike'] as unknown as TurndownService.Filter,
  replacement: (content) => `~~${content}~~`,
})

/** Markdown → HTML для редактора. `<script>` вырезает сам `RichInput` при записи в DOM. */
export function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true, breaks: true })
}

/** HTML редактора → Markdown. */
export function htmlToMarkdown(html: string): string {
  return turndown.turndown(html)
}
