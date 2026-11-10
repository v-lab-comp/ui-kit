# [2026-08-08] `MarkdownInput` — значение `RichInput` в Markdown

### Что изменено

**Added**

- **`MarkdownInput`** (`src/components/inputs/MarkdownInput/`) — тот же редактор, что `RichInput`, но `value` / `defaultValue` / `onChange` работают с **Markdown**. Пропы наследуются от `RichInputProps`; `name` кладёт в скрытый `input` Markdown, а не HTML.
- **Sub-entry `@v-lab/ui-kit/markdown`** (`src/markdown.ts`) — компонент плюс конвертеры `markdownToHtml` / `htmlToMarkdown` (последние нужны и снаружи: отрисовать сохранённый текст в режиме просмотра).
- **Опциональные peer-зависимости `marked` (≥12) и `turndown` (≥7)** — в `peerDependenciesMeta` помечены `optional`, в `rollupOptions.external` добавлены как regex. Основной bundle их не тянет: `RichInput` по-прежнему работает с HTML и без зависимостей.

**Changed**

- **`RichInput.module.css`** — сброс внешних отступов у блочных тегов (`p`, `h1`–`h6`, `blockquote`, `pre`) внутри редактора. `marked` заворачивает текст в `<p>`, и браузерные margin'ы давали разрывы между абзацами.

### Решения по реализации

- **Отдельный компонент, а не проп `valueFormat="markdown"` у `RichInput`.** Изначально обсуждался проп по образцу `DateInput valueFormat="iso"`, но у `DateInput` парсер нужен всегда, поэтому компонент целиком живёт за `/date`. Здесь иначе: `RichInput` экспортируется из основного bundle и обязан работать без `marked` / `turndown`. Проп, который молча ничего не делает, пока не импортируешь другой модуль, — хуже отдельного компонента. `MarkdownInput` — тонкая обёртка (~60 строк), `RichInput` не изменился.
- **Мост Markdown ↔ HTML против прыжка каретки.** Главная сложность. Родитель возвращает наш же Markdown обратно в `value`; если конвертировать его заново, HTML не совпадёт с тем, что в DOM (`<b>` против `<strong>`, переносы, обёртка в `<p>`), `RichInput` увидит расхождение, перепишет содержимое — и каретка уедет в начало на каждом символе. Решение: помнить пару «последний отданный Markdown → HTML, из которого он получен» и на эхо отдавать сохранённый HTML; конвертировать только по-настоящему новое значение (сброс формы, загрузка с бэка). Проверено вживую: ввод в конец списка не сбивает позицию.
- **Подчёркивание вне набора по умолчанию.** В CommonMark его нет. Молча терять формат нельзя, поэтому `turndown.keep(['u'])` сохраняет его как inline-HTML внутри Markdown (round-trip не теряет), но из `DEFAULT_MARKDOWN_INPUT_TOOLS` кнопка убрана — по умолчанию значение остаётся чистым Markdown.
- **Своё правило зачёркивания.** В core `turndown` его нет — оно живёт в `turndown-plugin-gfm`. Тащить третью зависимость ради одного правила не стали: правило в три строки покрывает `<s>`, `<del>` и `<strike>` (браузеры отдают разные теги из `execCommand`). Обратно `~~x~~` разбирает сам `marked` — GFM у него включён по умолчанию.

### Затронутые файлы

- `src/components/inputs/MarkdownInput/` — **новый**: `MarkdownInput.tsx`, `MarkdownInput.types.ts`, `markdownCodec.ts`, `MarkdownInput.stories.tsx`, `MarkdownInput.test.tsx` (9 тестов), `index.ts`. В `src/components/inputs/index.ts` **не** экспортируется — иначе peer-зависимости утекли бы в основной bundle.
- `src/markdown.ts` — **новая** точка входа.
- `vite.config.ts` — entry `markdown`, externals `marked` / `turndown`.
- `package.json` — `exports["./markdown"]`, peer-зависимости + `peerDependenciesMeta`, devDependencies (`marked`, `turndown`, `@types/turndown`) для локального typecheck.
- `src/components/inputs/RichInput/RichInput.module.css` — сброс margin у блочных тегов.
- Доки — `docs-site/guide/components/markdown-input.md` (+ `en/`, `uz/`), сайдбар, `docs/reference/subpath-exports.md`, `docs/reference/components.md`, `docs/architecture/bundling.md`, `docs/architecture/inputs.md`, `CLAUDE.md`, публичный changelog.
