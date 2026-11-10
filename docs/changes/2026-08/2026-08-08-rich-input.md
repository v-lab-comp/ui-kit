# [2026-08-08] `RichInput` — поле форматированного текста для форм

### Что изменено

**Added**

- **`RichInput`** (`src/components/inputs/RichInput/`) — многострочное поле форматированного текста как обычное поле формы: `InputField` (label / required / hint / error / completed / size / disabled) вокруг `contenteditable` с тулбаром. Значение — HTML-строка: контролируемый режим `value` + `onChange`, неконтролируемый `defaultValue`. Экспортируется из `src/index.ts` (опциональных peer-зависимостей нет, отдельная точка входа не нужна).
- **Тулбар настраивается.** `tools` задаёт набор и порядок кнопок (`bold`, `italic`, `underline`, `strikethrough`, `bulletList`, `orderedList`, `clear`); `tools={[]}` убирает тулбар, `toolbarPlacement="bottom"` переносит его под текст. Набор по умолчанию — `DEFAULT_RICH_INPUT_TOOLS`, англоязычные подписи — `DEFAULT_RICH_INPUT_ARIA_EN`.
- **Пропы под сценарии форм**: `maxLength` (счётчик + блокировка ввода и обрезка вставки), `minRows` / `maxRows` (высота в строках, дальше прокрутка), `readOnly`, `name` (скрытый `input` для нативного `FormData`), `placeholder`, `onFocus` / `onBlur`.
- **`src/components/inputs/base/richText/`** — общий слой для `contenteditable`-редакторов: `useRichTextEditor` (пустота, длина, активные форматы, лимит длины, вставка plain text, `execCommand`) и утилиты `isHtmlEffectivelyEmpty` / `getHtmlTextLength` / `stripScriptsFromHtml`. Внутренний, наружу не экспортируется.

**Changed**

- **`CommentRichInput`** переведён на `useRichTextEditor` — из компонента убраны локальные копии тех же helper'ов и обработчиков (`-90` строк). Публичное API и поведение не менялись; активные форматы после `execCommand` теперь перезапрашиваются через `queryCommandState`, а не переключаются вручную — состояние кнопок точнее при выделении разнородного текста.

### Решения по реализации

- **Отдельный компонент, а не проп у `CommentRichInput`.** Сценарии расходятся по поведению, а не по оформлению: в форме `Enter` — новая строка и значение живёт в состоянии формы, в комментариях `Enter` — отправка и поле само себя очищает. Сведение в один компонент дало бы взаимоисключающие ветки почти в каждом обработчике. Общая часть вынесена в хук, различия остались в компонентах.
- **Оболочку рисует `InputField`.** Тулбар, текст и счётчик кладутся в тот же `wrapper`, что и обычный `<input>`, а `wrapperClassName` переводит его в колонку. Поэтому фокус, ошибка, `completed`, `disabled` и `filled` работают ровно как у `TextInput` — без дублирования состояний рамки. Приём тот же, что у `TagInput` (высота `auto` вместо фиксированной высоты размера).
- **Высота в строках, а не в пикселях.** `minRows` / `maxRows` приходят CSS-переменными `--rich-input-min-rows` / `--rich-input-max-rows`, а `min-height` / `max-height` считаются через `calc()` от `line-height` и паддингов размера. Пиксели в JS не попадают, при смене `size` высота пересчитывается сама.
- **Контролируемое значение пишется в DOM только при расхождении** с `innerHTML`: иначе каждый ререндер после ввода переставлял бы каретку в начало.
- **Плейсхолдер снимается по структуре, а не только по тексту.** Кнопка списка на пустом поле создаёт `<ul><li></li></ul>` — текста нет, `data-empty` остаётся (поле и правда без содержимого: `filled` не включается, счётчик показывает 0), но плейсхолдер ложился поверх маркера списка. Гасится точечно правилом `.editable[data-empty]:has(li, img, table, hr)::before { content: none }` — без второго флага состояния и без изменения того, что считается «пустым» для формы.
- **`<script>` вырезается на входе** (`value` / `defaultValue`), вставка из буфера — только plain text. Полная санитизация перед выводом — на стороне приложения; в доках это указано явно.

### Затронутые файлы

- `src/components/inputs/RichInput/` — **новый**: `RichInput.tsx`, `RichInput.types.ts`, `richInputDefaults.ts`, `RichInput.module.css`, `RichInput.stories.tsx`, `RichInput.test.tsx` (10 тестов), `index.ts`.
- `src/components/inputs/base/richText/` — **новый**: `useRichTextEditor.ts`, `htmlText.ts`, `index.ts`.
- `src/components/Comments/CommentRichInput/CommentRichInput.tsx` — переход на общий хук.
- `src/components/inputs/index.ts`, `src/index.ts` — экспорты.
- `src/docs/vitepress/VitePressRichInputDemos.tsx` — **новый**; регистрация в `componentDocsRegistry.ts`.
- Доки — `docs-site/guide/components/rich-input.md` (+ `en/`, `uz/`), пункт в `docs-site/.vitepress/sidebar.i18n.ts`, публичный changelog, `docs/architecture/inputs.md`, `docs/reference/components.md`.
