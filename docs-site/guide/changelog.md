---
title: Changelog
description: История версий @v-lab/ui-kit
outline: deep
---

# История изменений {changelog}

Это публичный changelog для команд, **подключающих** пакет. Гранулярный внутренний лог изменений (для команды, ведущей пакет) — в каталоге `docs/changes/` репозитория. При user-visible изменении заполняются оба места.

Формат основан на [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), версии по [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

::: tip Последний стабильный релиз
**0.15.0** — 2026-09-17 · Публичное API не менялось: исправлено поведение `PhoneInput` (вставка номера с кодом страны, страна из внешнего `value`, значения не в E.164); этот релиз опубликован через GitLab CI. **0.13.0 и 0.13.1 использовать не стоит** (в 0.13.0 не собирается пакет, в 0.13.1 ореол применялся неверно).
:::

---

## [Unreleased]

### Added

- **`ThemeProvider` / `useTheme`** — скин и цветовая схема (`light` / `dark` / `system`) задаются в корне приложения и применяются везде, включая порталы: провайдер ставит `data-vl-skin`, `data-vl-scheme` и `color-scheme` на `<html>`. Есть controlled и uncontrolled режимы, выбор можно запоминать (`storageKey`); несколько провайдеров на одной странице поддерживаются — [Темизация](./theming).
- **Скин `corporate`** — прежний вид кита, теперь отдельным скином: стили — `@v-lab/ui-kit/skins/corporate.css`, манифест `corporateSkin` — `@v-lab/ui-kit/skins/corporate`. CSS каждого скина собирается в свой файл: в бандл приложения попадают только подключённые скины.
- **Скины и контракты:** `defineSkin` для собственного скина (наследование `extends`, ленивая загрузка CSS через `load`) и контракты компонентов (`defineContract`, `contractAttrs`, `contractPart`, `contractSelector`, реестр `themeContracts`) — какие классы `vl-*` и data-атрибуты рендерит каждый компонент. Например, `Button` рендерит `vl-button` и `data-variant` / `data-color` / `data-size` / `data-shape`.
- **`themeHtmlAttributes(skin, scheme)`** — атрибуты скина и схемы для серверного `<html>` при SSR: стили скина действуют с первого кадра, до гидрации. Пример для Next.js App Router — [Установка → SSR и Next.js](./installation#ssr).

### Changed

- **Пакет переименован** в `@v-lab/ui-kit`, scope `@ui-kit` → `@v-lab`.
- **Компоненты без стилей, оформление — в скине `corporate`.** Компоненты рендерят стабильные классы `vl-<name>` / `vl-<name>__<part>` и data-атрибуты из контрактов; CSS Modules и хешированные классы убраны. Вместо `@v-lab/ui-kit/style.css` подключите `@v-lab/ui-kit/skins/corporate.css` и включите скин: оберните приложение в `ThemeProvider skins={[corporateSkin]}` или поставьте `<html data-vl-skin="corporate">` — [Установка](./installation). Глобальные классы `.color-*` заменены атрибутом `data-color`. Внешний вид не изменился.

### Fixed

- **`PdfPreview` больше не роняет SSR при импорте.** `react-pdf` (pdf.js) загружается лениво, только в браузере: раньше статический импорт обращался к DOM ещё при загрузке модуля. Если приложение задало свой `pdfjs.GlobalWorkerOptions.workerSrc`, он сохраняется; иначе используется URL воркера с unpkg.

### Removed

- **CommonJS-сборка `dist/cjs/`** — пакет поставляется только как ESM. `require('@v-lab/ui-kit')` в Node 20.19+ / 22.12+ загружает ESM-версию.
- **Экспорт `./style.css`** (`@v-lab/ui-kit/style.css`) — стили теперь поставляются скином: `@v-lab/ui-kit/skins/corporate.css`.
- **Публикация в npm-реестр GitLab corporate** — из `package.json` убран `publishConfig`, который указывал на GitLab Package Registry. Реестр для следующего релиза объявим отдельно; до тех пор пакет ставится из локального архива — [Установка](./installation). Исходный код переехал на GitHub: [v-lab-comp/ui-kit](https://github.com/v-lab-comp/ui-kit).

## [0.15.0] — 2026-09-17

### Fixed

- **`PhoneInput`: вставка номера с кодом страны.** `+998 90 123 45 67` или `998901234567` молча превращались в `+998998901234`. Теперь вставленный полный номер заменяет поле целиком, а номер другой страны (`+7 912 345 67 89`) переключает селект, если страна есть в `countries`. То же — для автозаполнения браузера и вставки с мобильной клавиатуры.
- **`PhoneInput`: страна следует за внешним `value`.** После `reset` формы или при переоткрытии формы для другой записи страна берётся из нового номера — раньше оставалась прежней, в консоли была ошибка, а правка склеивала номер с чужим кодом. Пустое значение страну не сбрасывает.
- **`PhoneInput`: полный номер можно выделить и набрать заново** — ввод цифры при выделении больше не блокируется.
- **`PhoneInput`: `value` не в E.164** (`901234567`, `+998-901234567`, `+998 90 123-45-67`) отображается корректно без вызова `onChange` — форма не становится dirty. Неразбираемое значение — пустое поле без ошибок в консоли.

### Infrastructure

- **Публикация пакета через GitLab CI.** Релиз выпускается пайплайном по тегу `vX.Y.Z`: прогон `typecheck` / `lint` / тестов / сборки, сверка тега с версией в `package.json` и наличия секции changelog, затем `npm publish` в GitLab Package Registry и GitLab Release. На ветках `release/*` есть кнопка `release:bump` (`BUMP` = `patch` / `minor` / `major`), которая сама поднимает версию и пушит тег. Порядок — в [`docs/guides/publishing.md`](https://github.com/v-lab-comp/ui-kit/blob/main/docs/guides/publishing.md).

## [0.14.0] — 2026-08-08

### Added

- **`RichInput`** — многострочное поле форматированного текста для форм. Обычное поле на базе `InputField` (`label`, `required`, `hint` / `error`, `completed`, `size`, `disabled`), только вместо `<input>` внутри `contenteditable` с тулбаром. Значение — HTML-строка: `value` + `onChange` либо `defaultValue`. Настраивается набор кнопок (`tools`: `bold`, `italic`, `underline`, `strikethrough`, `bulletList`, `orderedList`, `clear`; `tools={[]}` — без тулбара) и его положение (`toolbarPlacement`). Есть `maxLength` со счётчиком и обрезкой вставки, `minRows` / `maxRows`, `readOnly` и `name` для нативной отправки формы через `FormData`. **Enter** — новая строка; форму поле не отправляет. Для ленты комментариев по-прежнему используется `CommentRichInput`.
- **`MarkdownInput`** — тот же редактор, что `RichInput`, но значение снаружи хранится в **Markdown**, а не в HTML. Импорт из новой точки входа `@v-lab/ui-kit/markdown`; нужны peer-зависимости `marked` и `turndown` (основной bundle их не тянет, `RichInput` работает с HTML как раньше). С `name` в `FormData` уходит Markdown. Оттуда же экспортируются конвертеры `markdownToHtml` / `htmlToMarkdown` — например, для режима просмотра. Кнопки `underline` в наборе по умолчанию нет: в CommonMark подчёркивания не существует, и при включении оно сохраняется как inline-HTML `<u>…</u>`.

### Changed

- **`CommentRichInput`** переведён на общий внутренний слой `richText` (та же механика `contenteditable`, что и у `RichInput`). Публичное API и поведение не изменились; подсветка активных кнопок тулбара стала точнее при выделении разнородного текста.

## [0.13.2] — 2026-07-29

### Fixed

- **Hover-ореол у `filled` и `lighter`.** Вместо широкой ауры (3px + свечение) применялась базовая кромка 1px: утилита `.halo` и классы вариантов имеют одинаковую специфичность (0,1,0), а в собранном `style.css` утилита оказывается позже вариантов — при равной специфичности она побеждала и затирала их переменные. На `variant="filled" color="primary"` computed `::after` был `rgb(51,92,255) 0 0 0 1px`. Теперь `.halo` не объявляет `--halo-*` вовсе: дефолты заданы фолбэками `var(--halo-ring-size, 1px)` внутри `::after`, объявлять переменную некому, и порядок правил перестал что-либо решать. Проверено в живом Chromium: `filled` — кольцо 3px + свечение, `lighter` — 3px, `stroke` / `ghost` — 1px, нейтральные — 1px в `--halo-neutral`.

### Changed

- **`--halo-*` теперь переопределяются из `:root`.** Побочный эффект того же исправления: раньше объявление на самом элементе било унаследованное значение, и переопределить цвет или толщину кольца из приложения было нельзя — требовалась специфичность выше `.halo`. Теперь работает обычное `:root { --halo-ring-color: … }`.

### Infrastructure

- **`postbuild`** — проверка расширена: сборка падает, если базовое правило `.halo` снова начнёт объявлять `--halo-*`.
- **`npm run verify:halo`** — проверка ореола в живом Chromium (Playwright) против собранного `dist/`: реальный `style.css` и реальные хешированные классы, наведение на кнопку и сверка computed `::after`. Ловит то, что не видят ни линтер, ни типы, ни юнит-тесты.

## [0.13.1] — 2026-07-29

### Fixed

- **Сборка у потребителей.** `dist/style.css` в 0.13.0 начинался с `@import "./tokens.css"`, при том что `dist/tokens.css` в пакет не попадал — у потребителей падали и dev, и build (`postcss-import` → `ENOENT`). Импорт был висячим: файл `src/styles/interactions.module.css` подключается к компонентам только через `composes`, а `@import` в таких модулях Vite не инлайнит, и он всплывает в общий бандл. Импорт убран — на переменные это не влияет: `.halo` их только читает, а сами токены приезжают в `:root` вместе с `style.css`. Обновляться с 0.13.0 нужно сразу на 0.13.1; изменений в API нет.

### Infrastructure

- **`postbuild`** — проверка `scripts/check-dist-css.mjs`: сборка падает, если в `dist/**/*.css` остался `@import` на файл, которого нет в пакете. Такую поломку не видят ни typecheck, ни lint, ни тесты, ни сам `vite build` — она проявляется только у потребителя, поэтому вынесена в отдельный шаг.

## [0.13.0] — 2026-07-29

### Added

- **Кнопки — hover-ореол.** При наведении вокруг кнопки раскрывается кольцо в цвет палитры. Геометрия и размер не меняются: кольцо живёт на псевдоэлементе и не влияет на layout (ни `scale`, ни `padding`, ни сдвига соседей). Трактовка зависит от варианта: у `filled` / `lighter` — бледная широкая аура, у `stroke` / `ghost` — тонкая кромка 1px в акцентном цвете. Тайминг асимметричный (появление 130 мс, уход 280 мс, нажатие 60 мс). Уважает `prefers-reduced-motion`: состояние остаётся, исчезает только анимация. Кроме `Button` подключено к иконочным кнопкам кита: закрытие `Modal` и `Toast`, `Tag` (крестик), навигация `Calendar` и `PdfPreview`, пагинация `Table`, очистка `SelectInput` / `AsyncSearchSelect`, глаз `PasswordInput`, копирование `ShareLinkInput`, календарь `DateInput`, тулбар `CommentRichInput`, меню `CommentsSection`, действие `FileUpload`, триггер `Sidebar`, `AppSwitcher`.
- **`Button`** — проп `customColor?: string`: произвольный hex (`#rgb` / `#rrggbb` / `#rrggbbaa`) вместо семантической палитры. Перекрывает `color`, оттенки hover / active / фона выводятся автоматически, hover-ореол тоже берёт этот цвет. Невалидное значение игнорируется — остаётся `color`. Такой же проп уже был у `Badge` и `Tag`.
- **Токены** — motion: `--motion-duration-fast`, `--motion-ease-standard`, `--motion-duration-halo-in` / `-out` / `-press`, а также `--halo-neutral` (цвет кольца для нейтральных кнопок и кнопок без класса палитры). Раньше длительности были захардкожены в компонентах.

### Changed

- **`Button`** — переходы переведены с захардкоженного `0.15s ease` на токены (`--motion-duration-fast`, `--motion-ease-standard`); значение сохранено, чтобы совпадать с остальным китом. Добавлен блок `prefers-reduced-motion`, которого у компонента не было.

## [0.12.0] — 2026-07-29

### Added

- **`CommentsSection`** — проп `collapseAfterLines?: number`. Сворачивает тело комментария до N строк; ниже появляется кнопка «Показать больше» / «Показать меньше». `0` / `undefined` — без ограничения (поведение по умолчанию). Кнопка показывается только при реальном переполнении; состояние «развёрнут» привязано к `id` комментария и переживает рефетч ленты. Кламп применяется к отрендеренному `contentHtml` (в т.ч. `deletedWithContent`), но не к inline-редактору и не к плейсхолдеру удалённого. Новые строковые ключи `showMore` / `showLess` (EN-дефолты `Show more` / `Show less`) в `CommentsSectionStringKey` / `COMMENTS_SECTION_STRING_KEYS`.
- **`CommentsSection`** — ручки вёрстки без завязки на классы CSS-модулей: `inputPlacement?: 'top' | 'bottom'` (позиция поля ввода, по умолчанию `top`), `toolbarStartSlot?: ReactNode` (слот слева от тулбара поля ввода, например аватар автора), `classNames?: Partial<Record<'root' | 'list' | 'card' | 'input', string>>` (классы на внутренние части) и `avatarSize?: AvatarSize` (размер аватара, по умолчанию 40).

### Changed

- **`CommentRichInput`** — из дефолта убраны фиксированная `min-height: 116px` и `opacity: 0.8` неактивного поля: высота растёт от контента, полупрозрачность не создаёт ложного впечатления `disabled`. При необходимости прежнее поведение возвращается CSS-переменными `--comment-input-min-height` и `--comment-input-opacity`.

## [0.11.0] — 2026-06-18

### Added

- **`Table`** — проп `maxHeight` включает нативный скролл (вертикальный + горизонтальный) внутри таблицы и закрепляет шапку (sticky `top: 0`) при вертикальном скролле.
- **`TableColumn`** — поле `sticky: 'left'` закрепляет колонку при горизонтальном скролле (требует `maxHeight` и `width` у колонки). У крайней sticky-колонки — тень-разделитель.

### Fixed

- **`DateInput`** — выпадающий календарь больше не выходит за пределы экрана: позиционирование на `@floating-ui/react` (`flip` + `shift` + портал в `body`), календарь всегда виден целиком без обрезания и горизонтального скролла.
- **Календари выбора даты** — текущий день теперь визуально подсвечивается (кольцо + primary-цвет), чтобы быстро находить сегодняшнюю дату.

## [0.10.0] — 2026-06-17

### Added

- **`Calendar`** — быстрый выбор месяца и года: клик по заголовку открывает сетку месяцев, повторный клик — сетку годов (страницы по 12 лет). Раньше была только помесячная навигация.
- **`Calendar`** — режим выбора диапазона `mode="range"` с превью при наведении; `value` / `onChange` работают с `{ start, end }` (тип `DateRange`).
- **Поля ввода** — рамка заполненного поля (есть значение) окрашивается в `--blue-400`, отличая его от пустого с placeholder. Иерархия: пусто (серый) → есть значение (`--blue-400`) → фокус (`--primary-base` + primary-кольцо) → ошибка (красный). Работает для текстовых полей (`TextInput`, `EmailInput`, `PasswordInput`, `SearchInput`, `SiteInput`, `ShareLinkInput`), `DateInput`, `PhoneInput`, `SelectInput` (full + compact), `AsyncSearchSelect`, `TagInput`.
- **`InputField`** — проп `filled?: boolean` для контролов без обычного `<input>` (Select и др.). Для текстовых полей определяется автоматически: `BaseInput` выставляет `data-filled`.
- **Маркер `required`** — проп `requiredMarker?: ReactNode` (по умолчанию `*`) на всех полях с label (`InputField`, `TextInput`, `EmailInput`, `PasswordInput`, `SearchInput`, `SiteInput`, `ShareLinkInput`, `DateInput`, `PhoneInput`, `SelectInput`, `AsyncSearchSelect`, `TagInput`). Цвет переопределяется CSS-переменной `--input-required-color`.
- **`FileUploadField` / `FileDropZone` / `FileUploadItem`** — проп `texts?: FileUploadTexts` выносит все видимые строки наружу под мультиязычность (`title`, `subtitle`, `button`, `uploading`, `done`, `error`, `download`, `remove`, `ofLabel`); дефолты — `DEFAULT_FILE_UPLOAD_TEXTS`. Новый проп `maxSize?: number` (байты): файл сверх лимита помечается статусом `error`. `accept` задаёт допустимые типы файлов.

### Changed

- **`DateInput`** — пустое поле показывает серый placeholder `DD / MM / YYYY` (как у обычных текстовых полей) вместо постоянно видимых символов маски; текст задаётся пропом `placeholder`.
- **Фокус полей ввода** — цвет рамки и фокус-кольца переведён со `--stroke-strong-950` / `--neutral-alpha-16` на `--primary-base` / `--primary-alpha-16`.
- **Маркер `required`** — цвет звезды по умолчанию изменён с `--primary-base` (синий) на `--error-base` (красный); в `FileUpload` маркер также переведён на красный.
- **Палитра** — примитивы приведены в соответствие с дизайн-токеном: `slate-200` `#eaecf0`, `blue-400` `#4c82ff`, `green-100` `#d6f5e8`, `purple-500` `#7d52f4`, `pink-400` `#ff68b3`, `neutral-500` `#7a7a7a`.

---

## [0.9.1] — 2026-05-20

**Comments** — счётчик длины и режим «удалено, но контент виден» для админ-режима.

### Added

- **`CommentRichInput`** — проп `maxLength?: number`. Когда задан, в футере появляется счётчик `current / max` (`tabular-nums`); ввод сверх лимита блокируется через `beforeInput`, вставка из буфера обрезается до остатка. При превышении счётчик подсвечивается `--error-base`, отправка отключена.
- **`CommentsSection`** — проп `maxLength?: number` пробрасывается и в основной инпут, и в inline-редактор правки.
- **`CommentThreadItem`** — флаг `deletedWithContent?: boolean`. При `isDeleted: true` + `deletedWithContent: true` карточка остаётся в «удалённом» состоянии (приглушённый фон, без меню), но вместо плейсхолдера показывает `contentHtml` и пометку «deleted ·» рядом со временем (для админ-режима / аудита).
- **`DEFAULT_COMMENTS_SECTION_STRINGS`** — новый ключ `deletedMark` (`'deleted'`); подхватывается `mergeCommentsSectionStringsFromJson` как и прежние.

---

## [0.9.0] — 2026-05-20

**Comments** — inline-редактирование и soft-delete с встроенным `ConfirmModal`; гайд по интеграции с EDOC API. **Accordion** — фон карточки не меняется на hover / open.

### Added

- **`CommentsSection`** — inline-редактирование и удаление комментариев. Новые пропсы `onEditComment(id, html)` / `onDeleteComment(id)`; в `CommentThreadItem` — опциональные `canEdit`, `canDelete`, `isEdited`, `isDeleted`. У карточек с `canEdit` / `canDelete` появляется меню «**…**» (Popover): «Редактировать» открывает inline-редактор прямо в карточке, «Удалить» — встроенный `ConfirmModal` (тексты в `strings`). `isEdited` рисует пометку «edited ·» рядом со временем; `isDeleted` — серую карточку-плейсхолдер без меню и контента (для админ-режима).
- **`CommentRichInput`** — режим редактирования: `initialHtml`, `submitLabel` (текстовая кнопка вместо иконки «самолётик»), `secondaryAction` (кнопка слева от Save, обычно «Отмена»), `resetOnSubmit` (по умолчанию `true` для создания, `false` при `initialHtml`).
- **`DEFAULT_COMMENTS_SECTION_STRINGS`** — новые ключи: `editAction`, `deleteAction`, `editedMark`, `editSaveLabel`, `editCancelLabel`, `deletedPlaceholder`, `confirmDeleteTitle`, `confirmDeleteBody`, `confirmDeleteConfirm`, `confirmDeleteCancel`, `commentActionsAriaLabel`. `mergeCommentsSectionStringsFromJson` подхватывает их как и прежние.
- Гайд по интеграции с EDOC API (`/edocapp/api/edoc/v1/documents/.../comments`) с маппингом ответа в `CommentThreadItem`, fetch-клиентом и обработкой 401/403/404/422 — [`comments-edoc-api`](/guide/components/comments/comments-edoc-api) (+ EN / UZ).

### Fixed

- **`Accordion`** — фон карточки больше не сереет при hover и при раскрытии. Остаётся `var(--bg-white-0)` (или CSS-переменная, заданная потребителем). Тень (`--shadow-regular-x-small`) по-прежнему убирается при hover / open, как и было.

---

## [0.8.0] — 2026-05-19

**Table** — сортировка и drag-and-drop reorder колонок. **Badge** и **Tag** — расширенная кастомизация: `customColor`, новые размеры, формы, варианты, CSS-переменные на корне.

### Added

- **`Table`** — сортировка колонок. На колонке: `sortable: true` (опционально `sortField` для подмены имени поля). На таблице: `sort` / `defaultSort` (`SortState[]`) и `onSortChange(sort)`. Клик по заголовку — цикл `asc → desc → none` для этой колонки (multi-sort собирается естественно, остальные колонки не сбрасываются). **Shift+Click** — оставить только эту колонку (быстрый сброс к single-sort). Сериализация в query — на стороне потребителя.
- **`Table`** — переупорядочивание колонок drag-and-drop за заголовок. Включается prop `reorder: { storageKey: string }`; порядок сохраняется в `localStorage` по указанному ключу. Если prop не задан — фича выключена и DnD игнорируется. Клик по заголовку (sortable) продолжает работать как сортировка — drag запускается только при удержании и перемещении.
- **`Badge`** — `customColor` (произвольный hex как у `Tag`), новые размеры `xsmall` и `large`, `dot` (точка-индикатор 6px перед содержимым), `onClick` (рендер `<button>` с hover/active-анимацией + `focus-visible`). Размеры/паддинги/радиус выведены в CSS-переменные `--badge-height`, `--badge-padding-x`, `--badge-font-size`, `--badge-radius` — переопределяются через `style`. Экспортированы `BADGE_VARIANT_OPTIONS`, `BADGE_COLOR_OPTIONS`, `BADGE_SIZE_OPTIONS`, `BADGE_SHAPE_OPTIONS`.
- **`Tag`** — `size: 'small' | 'medium' | 'large'` (20 / 24 / 28px), `shape: 'rounded' | 'pill'`, варианты `filled` и `light` (в дополнение к `stroke` и `gray`). CSS-переменные `--tag-height`, `--tag-padding-x`, `--tag-font-size`, `--tag-radius` для оверрайда через `style`. Экспортированы `TAG_SIZE_OPTIONS`, `TAG_SHAPE_OPTIONS`.

### Changed

- **`Tag`** — `sublabel` теперь использует `color-mix(currentColor, transparent)` вместо фиксированного `--text-soft-400`, поэтому корректно перекрашивается во всех вариантах и при `customColor`.
- Общая утилита **`src/utils/customPalette.ts`** (`isHexColor`, `customPaletteStyle`) — используется и в `Tag`, и в `Badge`. Удалён `src/components/Tag/tagPalette.ts` (внутренний модуль, не экспортировался наружу).

---

## [0.7.0] — 2026-05-14

**Drawer**, **AppSwitcher**, **ToggleButton** / **ToggleGroup**, **SegmentedControl**, новые компоненты (**Box**, **FileUpload**), улучшения **DateInput**, **SelectInput**, **Table**, масштабная документация Storybook и VitePress, инфраструктурные улучшения.

### Added

- **`Drawer`** — layout-компонент с compound-частями `DrawerHeader` / `DrawerBody` / `DrawerFooter`. Пропы: `side: 'left' | 'right' | 'top' | 'bottom'`, `mobileBottom`, `size`, `open` / `onOpenChange`. Закрытие по Escape и клику на бэкдроп, блокировка скролла, анимация выезда. Императивный API через `ref` (`DrawerHandle`). Страница документации `/guide/components/drawer` (ru / en / uz).
- **`Box`** — универсальный контейнер с `as`-пропом и `forwardRef`.
- **`FileUpload`** — `FileDropZone`, `FileUploadItem`, `FileUploadField`; утилиты `formatFileSize`, `fileToUploadFile`, `filesSignature`, `uploadFilesToNativeFiles`.
- **`AppSwitcher`** — переключатель приложений в header; сетка приложений, иконки URL / ReactNode / авто-инициал; `promo` с градиентом или `null`.
- **`ToggleButton`** / **`ToggleGroup`** — on/off и группы single/multiple, roving tabindex.
- **`SegmentedControl`** — single-select со скользящим ползунком.
- **`DateInput`**: `valueFormat: 'iso'` — `onChange` / `onAccept` отдают `YYYY-MM-DD`; утилиты `formatMaskedToIso`, `formatIsoToMasked`.
- **`SelectInput`**: `dropdownPortalZIndex`, `dropdownMaxHeight`, `optionTextWrap`.
- **`Table`**: `hideHeader`, `paginationPosition: 'top' | 'bottom'`, `activeRowIndex`.

### Fixed

- **`SelectInput`** portal: убран inline `z-index: 9999`, стекинг через `--z-dropdown`.

### Changed

- **Стили**: инлайн-стили вынесены в CSS Modules у DateInput / HeaderCard / Table; хардкод цветов в Avatar / Sidebar заменён токенами.
- **ESLint**: добавлены правила `no-console`, `prefer-const`, `no-var`, `consistent-type-imports`, `no-explicit-any`.
- **Vitest**: пороги покрытия branches 60 %, functions / lines / statements 70 %.
- **`displayName`** и **`forwardRef`** на всех публичных компонентах без них.

### Infrastructure

- **CI**: workflow `.github/workflows/ci.yml` — typecheck + lint + test + build.
- **Сборка**: `prepublishOnly`, `publish:registry`, `.env.example`.

### Docs

- **Storybook**: `Playground` stories добавлены ко всем компонентам без интерактивного рендера (15+ компонентов); создан `InputField.stories.tsx`; `RHFCheckbox.stories.tsx` + `RHFTagInput.stories.tsx`; Gallery у Badge и Drawer; новые сторис **AppSwitcher**, **ToggleButton**, **SegmentedControl**.
- **VitePress**: новые страницы `drawer.md` (en / uz), `optional-entries.md`, `app-switcher.md`, `toggle-button.md`, `segmented-control.md`; расширены `checkbox-field.md`, `uikit-root.md`, `calendar.md`, `box.md`, `page-header.md`, `inputs-gallery.md` (исправлены dead links), `components/index.md`.
- **`docs/`**: `CONTRIBUTING.md`; гайды `OVERLAYS_DEVELOPMENT`, `LAYOUT_DEVELOPMENT`, `ACCESSIBILITY`, `MIGRATIONS`, `RELEASE_CHECKLIST`; справочники `SUBPATH_EXPORTS`, `HOOKS`; обновлены `CLAUDE.md`, архитектурные файлы, `QUALITY_SUMMARY.md`.

---

## [0.6.3] — 2026-05-06

**InputField** — **`completed`** и **`completedColor`** (пресеты и произвольный цвет); без серой заливки у **`read-only`** и при hover **`completed`**. VitePress и Storybook.

### Added

- **InputField** — **`completed`**: рамка по умолчанию **primary**; **`completedColor`** — hex / **`var(--…)`** (токены или примитивы). Не при **`error`** / **`disabled`**. Те же поля и **SelectInput** (все варианты), **AsyncSearchSelect**. **PhoneInput** / **SiteInput** — тот же акцент на вложенном **SelectInput** в **`startBlock`**.
- Документация: страница **InputField** (превью **`inputCompleted`**), ссылки с полей ввода; Storybook-истории **Completed** у **TextInput**, **SelectInput**, **TagInput**, **AsyncSearchSelect**.

### Changed

- **`completedColor`**: пресеты **`success`**, **`error`**, **`warning`**, **`primary`** и др. → **`var(--*-base)`** (как и раньше — произвольный CSS).
- **BaseInput** **`read-only`**: белый фон; **InputField** **`completed`**: hover без серой заливки.

---

## [0.6.2] — 2026-05-07

**BaseInput** / **DateInput** — **`autoComplete=""`** как **`off`**. **TagInput** — меньше шума автозаполнения (**`autoCapitalize`**, **`autoCorrect`**, **`data-*`**).

### Fixed

- **BaseInput** — **`autoComplete=""`** → **`off`**.
- **TagInput** — **`autoCapitalize`** / **`autoCorrect`**, **`data-*`** для меньшего шума автозаполнения.
- **DateInput** — **`autoComplete=""`** → **`off`** у маски.

---

## [0.6.1] — 2026-05-06

**SelectInput** — группы и множественный выбор; **TagInput** — список подсказок; **`autoComplete`** у полей; **InputField** / **SelectInput** — **`--text-sub-600`** и зазор лейбла **1px**; **Button** — фокус; документация.

### Added

- **SelectInput** — **`groups`**: группы с заголовком и разделителем, **`<optgroup>`** в скрытом select; типы **`SelectOptionGroup`**, **`SelectInputOptionsProp`**; либо **`options`**, либо **`groups`**. Страницы **SelectInput** (**ru / en / uz**), превью **`selectInputGrouped`**, сторибук **Grouped options**.
- **SelectInput** — **`mode="multiple"`**, чекбоксы, сводка в триггере, **`SelectOption.description`**, **`optionTextWrap`**; типы **`FullVariantMultipleProps`**, **`SelectInputMultipleChangeEvent`**, **`SelectInputMultipleDisplay`**. Доки и демо **SelectInput** (**ru / en / uz**).
- **TagInput** — **`suggestionsExcludeSelected`** (скрывать уже выбранные в списке); по умолчанию выбранные видны с галочкой, повторный выбор снимает тег.

### Changed

- **InputField** — цвет **hint** (**`--text-sub-600`**), зазор **1px** в ряду лейбла.
- **SelectInput** — вторичный текст (плейсхолдер, группы, пустой список, async-футер) — **`--text-sub-600`**.
- **TagInput** — фильтрация подсказок и совпадение с тегами под новое поведение списка.

### Fixed

- **BaseInput** — **`autoComplete="off"`** по умолчанию.
- **EmailInput** / **PasswordInput** / **PhoneInput** — осмысленный **`autoComplete`** по умолчанию.
- **DateInput** — **`autoComplete="off"`** для маски по умолчанию.
- **Button** — фокус-кольцо без лишней анимации **`outline`**.

### Documentation

- **Inputs (обзор)** — секция **`autoComplete`** (**ru / en / uz**), уточнение у **BaseInput**.
- **SelectInput** — раздел **`groups`** в руководстве по компоненту, превью на сайте, описание в Storybook.
- **CLAUDE.md** — правило синхронизации **`CHANGELOG.md`** и этого раздела при изменениях для потребителей.

---

## [0.6.0] — 2026-05-05

**TagInput**, **Tag**, **AsyncSearchSelect** (пагинация), **DateInput**, **`vite/client`**.

### Added

- **TagInput** — чипы и опциональные подсказки (**`onSuggestionsQueryChange`**, **`server`** / локальный фильтр), **`{ id, label }`**, **`tagsAreaMaxHeight`**, расширенные пропсы (**`allowCustomTags`**, загрузка / пустой список, **`validateTag`**, **`getOptionDisabled`**, **`maxTagCount`**, **`renderTag`**), **`TagInputTagValue[]`**, **`tagLabel`**; **Storybook**, **`RHFTagInput`**, VitePress **ru / en / uz**.
- **AsyncSearchSelect** — пагинация в **`loadOptions`**, ответ **`{ options, hasMore }`** или массив, бесконечный скролл, рефакторинг модулей, тип **`AsyncSearchSelectLoadResult`**; Storybook и доки обновлены.

### Changed

- **Tag** — кликабельная зона и **`suffix`** / **`prefixRounded`**, разметка под закрытие чипа; кластер **2 px**. Доки **Tag** на сайте.
- **TagInput** — модульная папка: **`index.tsx`**, **`hooks/controller`**, **`ui`**, **`model`**, **`types`**, **`styles.module.css`**.

### Fixed

- **DateInput** — календарь закрывается после выбора даты (**`stopPropagation`** у панели); страницы **DateInput** в доке.

### Tooling

- **`tsconfig`**: типы **`vite/client`** для CSS Modules.

---

## [0.5.8] — 2026-05-04

**AsyncSearchSelect**, общая панель выпадающего списка для **SelectInput**, документация и **`noEmit`** для TypeScript.

### Added

- **AsyncSearchSelect** — асинхронный select с поиском: **`loadOptions({ query, signal })`**, опционально **`onSearchQueryChange`**, **`SearchInput`** в панели без **`autoFocus`** по умолчанию; экспорт из **`@v-lab/ui-kit`**.
- Storybook: **`Inputs/AsyncSearchSelect`**.
- VitePress: страницы **ru / en / uz**, демо в **`componentDocsRegistry`**.

### Changed

- **SelectInput**: синхронные **`options`**; общие **`SelectDropdownPanel`** и **`useSelectDropdownFloating`**; правки выпадающего списка и строки поиска.

### Tooling

- **TypeScript**: **`noEmit: true`**, **`npm run typecheck`** → **`tsc`**.

---

## [0.5.7] — 2026-04-28

Документация для потребителей пакета, деплой док-сайта на **GitLab Pages** и сборка **`base`** под не-корневой URL.

### Added

- **GitLab CI** (`.gitlab-ci.yml`): job **`docs:build`**, артефакт **`docs-site/.vitepress/dist/`**; job **`pages`** → **`public/`** для GitLab Pages; **`DOCS_BASE="/${CI_PROJECT_NAME}/"`**; окружение **`pages`** с **`url: $CI_PAGES_URL`**; **`interruptible: true`**.
- **Docker** статики док-сайта: **`docs-site/docker/`** (`Dockerfile`, nginx, `entrypoint.sh`).
- **`.dockerignore`**.

### Changed

- **VitePress**: **`base`** из **`DOCS_BASE`**; локально без переменной — **`/`**.

### Documentation

- **README**, **INSTALLATION_DEVELOPER**, установка **ru / en / uz**: в минимальный набор добавлен **`@floating-ui/react`**; в полной установке — **`react-pdf`** и **`pdfjs-dist`**.

---

## [0.5.6] — 2026-04-27

Хотфикс **SelectInput** (выпадение `compact` / `compact-label`, в т.ч. **LanguageSwitcher**) и e2e против Storybook.

### Fixed

- **SelectInput** (расклад `bottom`/`top` без `dropdownWidth`): `variant="full"` — минимальная ширина списка = ширина поля, список может шире по `max-content`; `compact` / `compact-label` / `inline` — без `minWidth` по якорю, ширина по длине опций; панель `.dropdown` с `max-content`, без лишней «пустой» ширины (в т.ч. **LanguageSwitcher**). Предел ширины: `min(100vw − 16px, 32rem)`.

### Added

- Скрипт **`npm run test:e2e`** (Playwright): дымовой тест Storybook, проверка ширины выпадения **LanguageSwitcher**; dev-зависимость **`@playwright/test`**, **`playwright.config.ts`**, **`e2e/storybook.spec.ts`**.
- **`.gitignore`**: артефакты Playwright (`test-results`, `playwright-report`, `blob-report`, `playwright/.auth`).

---

## [0.5.5] — 2026-04-24

### Added

- **Comments**: `CommentRichInput` (rich `contenteditable`, тулбар форматирования), `CommentsSection` (поле ввода + лента с разделителями календарных дней, состояния loading / error / empty).
- Хелперы строк: `DEFAULT_COMMENTS_SECTION_STRINGS`, `COMMENTS_SECTION_STRING_KEYS`, `mergeCommentsSectionStrings`, `mergeCommentsSectionStringsFromJson`; утилита `formatCommentDayDivider`.
- Документация: `Comments.md`; обновлены индексы в репозитории (`docs/components/`, `docs/MAP.md`, `docs/MAIN_CONTEXT.md`).

### Changed

- **CommentRichInput**: отправка по **Enter**; **Shift+Enter** — новая строка (ранее отправка была по Ctrl/Cmd+Enter).
- **CommentsSection**: отображение комментариев по убыванию `createdAt` (**новые сверху**); порядок элементов в пропе `comments` не важен.

### Documentation

- Storybook: Playground для `CommentsSection`; в панели «Показать код» для интерактивных сториз — примеры с импортом `CommentsSection` из `@v-lab/ui-kit`.

---

## [0.5.4] — 2026-04-13

Повторная публикация **0.5.3** — предыдущий билд не содержал изменений.

---

## [0.5.3] — 2026-04-13

Хотфикс **SelectInput**: позиционирование и ширина выпадающего списка.

### Fixed

- **SelectInput**: dropdown открывается снизу с выравниванием по левому краю триггера (`bottom-start`), а не по центру.
- **SelectInput**: ширина dropdown строго равна ширине input — длинные опции переносятся, а не растягивают список.
- **SelectInput**: `flip` ограничен противоположной осью (bottom ↔ top, left ↔ right) — dropdown больше не улетает вбок.
- **SelectInput**: `optionTextWrap` — текст опций ограничен 2 строками с троеточием; нативный tooltip показывается только при обрезке.

---

## [0.5.2] — 2026-04-03

Хотфикс после **0.5.1**: **DateInput** (masked) и **FileUpload** (multipart).

### Fixed

- **DateInput**: контролируемый режим с `valueFormat: 'masked'` — корректное отображение и выбор даты (значение маски не прогоняется через `formatIsoToMasked`); инициализация `internalMasked` с учётом формата.
- **FileUpload**: `onFilesChange(uploadFiles, nativeFiles)` и утилита `uploadFilesToNativeFiles` — в `FormData` / на бэк передавать нативные `File`, не объект `UploadFile` (иначе строка `[object Object]`).

### Added

- Экспорт **`uploadFilesToNativeFiles`**, тип **`FileUploadFilesChangeHandler`**.

---

## [0.5.0] — 2026-04-03

### Added

- `DateInput` (`@v-lab/ui-kit/date`): `valueFormat?: 'masked' | 'iso'` — при `'iso'` колбэки `onChange` / `onAccept` отдают `YYYY-MM-DD`; экспорт утилит `formatMaskedToIso`, `formatIsoToMasked`, `parseMaskedDateString`, `formatDateToMasked`
- `SelectInput`: optional prop `dropdownPortalZIndex` to override portal stacking (e.g. select inside a modal)
- `Table`: `hideHeader`, `paginationPosition` (`'top' | 'bottom'`), `activeRowIndex` — без хаков с `column-reverse` и без таргетинга внутренних классов в приложении
- `SelectInput`: `dropdownMaxHeight`, `optionTextWrap` — высота списка и перенос длинных подписей через пропсы (CSS-переменная `--select-dropdown-max-height` в выпадашке)
- `Box` — минимальная обёртка над `div` с `forwardRef` и `HTMLAttributes<HTMLDivElement>`
- `FileUpload`: `FileDropZone`, `FileUploadItem`, `FileUploadField`, утилиты `formatFileSize` / `fileToUploadFile` / `filesSignature` (порт с edoc-front-v2, CSS Modules + токены)

### Fixed

- `SelectInput` portal no longer uses inline `z-index: 9999`; stacking uses `--z-dropdown` (below sticky `PageHeader`). Token `--z-dropdown` set to `5` (below `--z-sticky: 10`)

### Changed

- **Storybook**: в историях с кастомным примером кода в Docs добавлены **`parameters.docs.source.type: 'code'`** и **`language: 'tsx'`**, чтобы в панели Code показывался заданный фрагмент, а не весь `render` (Modal, инпуты, Breadcrumb, ButtonGroup, RHF и др.).
- **`.storybook` / Vite**: в **`server.watch.ignored`** добавлена папка **`storybook-static/`**, чтобы после **`build-storybook`** dev-сервер не уходил в лишние перезагрузки.
- **Стили**: инлайн-стили вынесены в CSS Modules у **DateInput**, **HeaderCard**, **Table**; в **Avatar** и **Sidebar** хардкод цветов заменён на токены (**`--bg-white-0`**, **`--shadow-regular-x-small`**).
- **Качество кода**: расширены правила ESLint (**`no-console`**, **`prefer-const`**, **`no-var`**, **`consistent-type-imports`**, **`no-explicit-any`**), заданы пороги покрытия в **Vitest**.
- **Документация в репозитории**: добавлены/структурированы каталоги **`docs/`** (архитектура, чеклисты, гайды), **`CHANGELOG`**, при необходимости см. также **`REVIEW_FINDINGS.md`**.

### Инфраструктура

- **CI**: workflow **`.github/workflows/ci.yml`** (сборка и проверки при push/MR).
- **Сборка**: актуализированы **`vite.config.ts`**, **`vitest.config.ts`**; опциональный **`sample.pdf`** для сторис PdfPreview; скрипты **`prepublishOnly`** (`npm run build`), **`publish:registry`** для публикации в GitLab npm; **`.env.example`** и игнор **`.env*`** для локальных токенов.

### Рефакторинг и качество (из ветки refactor / merge)

- **`forwardRef`** и **`displayName`** на ряде публичных компонентов; реструктуризация **`docs/`** (архитектура, GAPS, зависимости).
- **Инпуты**: вместо хаков с **`queueMicrotask`** — явные паттерны синхронизации значения и маски.
- **`feat(build)`**: подпути **`/date`**, раздельные ESM/CJS с **`preserveModules`**, актуальная нарезка бандла (входит в итоговый релиз после merge).

---

## [0.5.1] — 2026-04-04

Патч после **0.5.0**: хук синхронизации вкладок с query и структура папки `hooks/`.

### Added

- **`useTabsSearchParam`**: хук для связки с query (`?…=`) — **`value`**, **`setTab`**, **`onChange`** (алиас), **`getTabFromUrl`**, подписка на **`popstate`**; компонент **`Tabs`** без URL; опции **`defaultValue`**, **`replace`**, **`validValues`**. Тип **`UseTabsSearchParamResult`**.
- Утилиты **`tabsSearchParams`** (`readSearchParam` / `writeSearchParam`) и тесты.

### Changed

- **`hooks`**: **`useClickOutside`** в **`src/hooks/dom/`**; табы и URL — в **`src/hooks/tabs/`**; общий реэкспорт **`src/hooks/index.ts`**; импорт **`HeaderCard`** из **`@/hooks`**.

---

## [0.4.1] — 2026-03-17

### Fixed

- Переполнение текста: **`SidebarCard`**, **`HeaderCard`**, **`UserProfileCard`** — корректное обрезание/перенос без вылезания за границы карточек.

---

## [0.4.0] — 2026-03-17

### Added

- **`Table`** — таблица с **пагинацией** и галереей состояний в Storybook.
- **`Tabs`** — compound-компонент (`Tabs.Tab`, `Tabs.Panel` и связка с ARIA).
- **Layout**: высота **header 88px**, **sticky**-поведение, **`LayoutRoot`**, согласование **z-index** сайдбара с остальной шапкой.

### Fixed

- **Sidebar**: иконка дропдауна не показывается, если нет опций; триггер сворачивания в шапке при отсутствии дропдауна; исправление **TS** при `as="div"` у **`SidebarCard`** (раздельный рендер кнопки/`div`).

### Changed

- **Документация**: гайды **установки и публикации** (`MAINTAINER`, `DEVELOPER`), в **README** — зависимости потребителя и полная команда установки.

---

## [0.3.0] — 2026-03-11

### Changed

- **Производительность бандла**: оптимизация размера артефактов — порядка **~6.9 MB → ~1.8 MB** в `dist`, точка входа **main** **~528 KB → ~84 KB** (дерево модулей и разбиение чанков).

---

## [0.2.0] — 2026-03-11

### Added

- `DateInput` separate subpath export (`/date`) — optional peer `react-imask`
- `PhoneInput` separate subpath export (`/phone`) — optional peer `react-phone-number-input`
- `preserveModules: true` for both ESM and CJS output — full tree-shaking support
- `sourcemap: true` for easier debugging of library consumers
- z-index token scale in tokens.css: `--z-base`, `--z-raised`, `--z-sticky`, `--z-sidebar`, `--z-dropdown`, `--z-overlay`, `--z-toast`
- `displayName` on all 28+ public components for React DevTools
- **SidebarContext** — состояние свёрнутого сайдбара через контекст, без ручного prop drilling `collapsed`
- Tabs: ARIA accessibility (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls`, `aria-labelledby`, `useId`)

### Fixed

- ButtonGroup: removed `!important`, replaced with `--btn-radius` CSS custom property
- Badge: removed `line-height: 14px !important` — child elements now inherit line-height
- AvatarGroup: React keys now use `child.key` when available instead of always using array index
- Toast actions: React keys now use `action.key` when available

### Changed

- `minify: true` in production build (was accidentally disabled)
- z-index values replaced with semantic tokens in all 6 layout/overlay files

---

## [0.1.0] — initial

Сводка первого среза; **Table** и **Tabs** в составе, соответствующем текущему API, зафиксированы в **[0.4.0]**.

### Added

- Button, ButtonGroup, Badge, Typography
- Accordion, Avatar, AvatarCard, AvatarGroup
- Breadcrumb, ContentDivider
- Toast, ToastSlot, ToastAction
- Tabs (compound: Tabs.Tab, Tabs.Panel)
- Table with pagination
- Sidebar system: Sidebar, SidebarLayout, SidebarHeader, SidebarHeaderCard, SidebarFooter, SidebarItem, SidebarCard, SidebarUserProfileCard, SidebarSection
- TextInput, EmailInput, DateInput, SelectInput, SiteInput, ShareLinkInput, PhoneInput
- Checkbox, CheckboxField
- Calendar
- PageHeader
- RHF adapters: RHFCheckbox
- CSS design tokens, shadow tokens, color palette
- Storybook 7 with autodocs
- Vitest + React Testing Library setup
