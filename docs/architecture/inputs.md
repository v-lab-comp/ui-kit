# Inputs

Все поля ввода построены из двух примитивов:

- **`BaseInput`** — `<input>` с состояниями (`size`, `hasError`, `disabled`) через `data-*` атрибуты контракта `base-input` (класс `vl-base-input`). Лежит в `src/components/inputs/base/BaseInput/`.
- **`InputField`** — обёртка: label, required/optional, prefix/suffix, hint/error, label-tooltip, `startBlock`/`endBlock` для составных полей. Лежит в `src/components/inputs/base/InputField/`.

Готовый компонент — это `forwardRef`, который собирает `InputField + BaseInput` (или свой примитив) и пробрасывает наружу всё нужное API.

## Структура группы

```
src/components/inputs/
├── base/
│   ├── BaseInput/         <input> + размеры + state через data-*
│   ├── BaseCheckbox/      <input type="checkbox"> с indeterminate через callback ref
│   ├── InputField/        label / required / hint / error / prefix-suffix / startBlock-endBlock
│   ├── useCompositeInput.ts    хук для составных полей (см. ниже)
│   ├── COMPOSITE_INPUTS.md     детальное описание useCompositeInput
│   └── richText/          useRichTextEditor + утилиты HTML-как-текст (см. ниже)
├── TextInput/, EmailInput/, PasswordInput/, SearchInput/, TagInput/
├── RichInput/             contenteditable + тулбар над InputField (форматированный текст)
├── DateInput/             IMask + скрытый <input type="date"> — sub-entry `/date`
├── PhoneInput/            react-phone-number-input + селект страны — sub-entry `/phone` (правила значения — README.md рядом)
├── SelectInput/           кастомный dropdown через @floating-ui/react; 4 варианта (full/compact/compact-label/inline)
├── AsyncSearchSelect/     SelectInput + debounce loadOptions + AbortSignal
├── Checkbox/
│   ├── CheckboxField/
│   └── CheckboxCard/
├── SiteInput/             composite: протокол + путь
└── ShareLinkInput/        TextInput + кнопка «копировать»
```

## Пятислойный паттерн

```
MyInput                 ← публичный компонент (forwardRef)
  └── InputField         ← label, hint, error, prefix/suffix, начальный id через children-render
        └── BaseInput    ← <input> + размеры + state
```

- `BaseInput` не знает про label/hint/error.
- `InputField` не знает, какой именно элемент внутри. Принимает `children: (id: string) => ReactNode`, чтобы передать сгенерированный `useId()` одновременно в `<label htmlFor>` и в `<input id>`.
- Готовый компонент (`TextInput`, `EmailInput`, …) — это «клей»: пробрасывает label-пропсы в `InputField`, остальные — в `BaseInput`, и вешает на `<input>` часть `input-inner` своего контракта (`vl-text-input__input-inner`). Скин обнуляет на ней стили `BaseInput` селектором `input.vl-<name>__input-inner` — специфичность `(0,1,1)` против `(0,1,0)` у `.vl-base-input`.

Минимальный шаблон компонента и стилей — в [`../guides/new-component.md`](../guides/new-component.md). Полный шаблон в коде — `TextInput.tsx`.

## InputField — что задаёт обёртка

| Проп                                            | Поведение                                                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `label`, `required`, `optional`, `labelTooltip` | Текст и значки над полем                                                                               |
| `hint`, `error`                                 | Текст под полем; `error` перекрывает `hint` и подсвечивает рамку                                       |
| `prefix`, `suffix`                              | Иконка/элемент внутри обёртки, слева или справа от инпута                                              |
| `startBlock`, `endBlock`                        | Внешние секции по бокам инпута (для composite-полей; CSS `:has(button)` убирает паддинг автоматически) |
| `size`                                          | `big` / `medium` / `small` — высоты 40 / 36 / 32 px через CSS-переменные `--base-input-*`              |
| `completed`, `completedColor`                   | Акцентная рамка по примеру «успешно заполнено»; пресеты + произвольный цвет                            |
| `disabled`                                      | `data-disabled` на wrapper; цвета берут из переменных                                                  |
| `id`                                            | Если не передан — генерируется через `useId()`. Один id уходит в `<label htmlFor>` и в `children(id)`  |

`InputField` единолично владеет визуальной логикой обёртки. Не дублировать разметку label/hint/error в готовых компонентах.

## BaseInput — что задаёт примитив

- Размер задаётся пропом `size`; в DOM попадает `data-size` (значения — из контракта `src/theme/contracts/base-input.ts`). Отдельных классов на размер нет — скин стилизует `[data-size='…']`.
- Ошибочное состояние — проп `hasError` → атрибут `data-error`; непустое значение → `data-filled`. Никаких отдельных классов для состояний.
- Высота, padding, радиус, transition — через CSS-переменные из `src/skins/corporate/components/base-input.variables.css`. В своих обёртках использовать те же переменные, а не дублировать значения.

## Чекбоксы

- **`BaseCheckbox`** — `<input type="checkbox">` с пропом `indeterminate`. Это DOM-свойство, не атрибут: оно устанавливается через **callback ref** (`node.indeterminate = indeterminate ?? false`), а не через `useEffect`.
- **`CheckboxField`** и **`CheckboxCard`** делят общую разметку `CheckboxLabelRow` (label / sublabel / tag). Не копировать её в новые варианты — добавлять в `CheckboxLabelRow`.
- Disabled-цвет текста в чекбоксах задаётся CSS-переменной `--_checkbox-disabled-color` на родителе через `:has(input:disabled)`.

## Composite-инпуты

Поле, где значение собирается из нескольких частей (протокол + путь, код страны + телефон, домен + tld), строится на хуке **`useCompositeInput`**. Контракт:

- `value` / `onChange` снаружи работают **только со склеенной строкой**. Потребитель про части не знает.
- Хук получает `split` (строка → массив частей) и `join` (массив частей → строка); сам хранит части и эмитит склеенное значение.
- `formNames` маппит индексы частей на имена полей `<input type="hidden">`. `undefined` — пропустить часть.
- Готовый JSX скрытых инпутов возвращается из хука — вручную `<input type="hidden">` писать нельзя.
- Визуальные переключатели частей кладутся в `startBlock` / `endBlock` `InputField` — обычно `SelectInput variant="inline"`.

API хука с параметрами и примером — в [`../reference/hooks.md`](../reference/hooks.md). Эталонная реализация — `SiteInput` (`src/components/inputs/SiteInput/SiteInput.tsx`). Полное описание поведения, включая edge cases — `src/components/inputs/base/COMPOSITE_INPUTS.md`.

## Rich-text поля

Поля с форматированием строятся не на `<input>`, а на `contenteditable`. Общая механика вынесена в **`base/richText/`** и не дублируется по компонентам:

- **`useRichTextEditor`** — `editorRef`, флаг пустоты, длина текста, активные форматы (`queryCommandState`), лимит длины (блокировка ввода + обрезка вставки), вставка только plain text, выполнение команд (`execCommand`). Возвращает готовый `editorProps` для навешивания на редактируемый узел.
- **`htmlText.ts`** — `isHtmlEffectivelyEmpty`, `getHtmlTextLength`, `stripScriptsFromHtml`. HTML рассматривается как текст; в SSR возвращают безопасные значения.

На этом слое два компонента с **разными сценариями**, поэтому они не объединены:

| Компонент          | Сценарий             | `Enter`      | Оболочка                            |
| ------------------ | -------------------- | ------------ | ----------------------------------- |
| `RichInput`        | поле формы           | новая строка | `InputField` (label / hint / error) |
| `CommentRichInput` | композер комментария | отправка     | собственная карточка + кнопка send  |

**`MarkdownInput`** — тот же `RichInput`, но значение снаружи хранится в Markdown. Конвертация требует `marked` и `turndown`, поэтому компонент живёт за sub-entry `/markdown`, а основной bundle остаётся без этих зависимостей.

Ключевая деталь реализации — **мост Markdown ↔ HTML**. Родитель возвращает наш же Markdown обратно в `value`; если конвертировать его заново, полученный HTML не совпадёт с тем, что в DOM (`<b>` против `<strong>`, переносы), `RichInput` перепишет содержимое и каретка прыгнет в начало. Поэтому `MarkdownInput` запоминает пару «последний отданный Markdown → HTML, из которого он получен» и на эхо отдаёт сохранённый HTML; конвертирует только по-настоящему новое значение (сброс формы, загрузка с бэка).

`RichInput` кладёт тулбар, текст и счётчик внутрь того же `wrapper` `InputField`, что и обычный `<input>` — фокус, `error`, `completed`, `disabled`, `filled` работают без дублирования. Высота задаётся в строках: `minRows` / `maxRows` уходят CSS-переменными, `min-height` / `max-height` считаются через `calc()` от `line-height` и паддингов размера.

Контролируемое значение пишется в DOM **только при расхождении** с `innerHTML` — иначе ререндер после каждого ввода переставлял бы каретку в начало.

## Когда не нужен `InputField`

Если у поля своя оболочка (не label + hint + error):

- Рендерить **`BaseInput`** напрямую, передавая `size`, `hasError`, `disabled`, `className`.
- Использовать переменные `--base-input-*` из `src/skins/corporate/components/base-input.variables.css` (файл уже подключён в скине) и при необходимости часть `input-inner` своего контракта, чтобы визуально совпадать с остальными полями.
- `id` для `<label htmlFor>` генерировать самому (`useId()`).
