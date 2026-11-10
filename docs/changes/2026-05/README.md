# Май 2026

История версий до внедрения файлов дня — посекционно (формат Keep a Changelog).

| Версия | Дата       | Кратко                                                           |
| ------ | ---------- | ---------------------------------------------------------------- |
| 0.9.1  | 2026-05-20 | Comments — счётчик длины + режим «удалено, но контент виден»     |
| 0.9.0  | 2026-05-20 | Comments — inline-редактирование и soft-delete; Accordion hover  |
| 0.8.0  | 2026-05-19 | Table sort + reorder; Badge/Tag — кастомизация                   |
| 0.7.0  | 2026-05-14 | Drawer, AppSwitcher, Toggle, SegmentedControl, Box, FileUpload   |
| 0.6.3  | 2026-05-06 | InputField `completed` / `completedColor`                        |
| 0.6.2  | 2026-05-06 | BaseInput/DateInput — пустой `autoComplete` = `off`              |
| 0.6.1  | 2026-05-06 | SelectInput `groups` и `mode="multiple"`; дефолты `autoComplete` |
| 0.6.0  | 2026-05-05 | TagInput; обновления Tag и AsyncSearchSelect                     |
| 0.5.8  | 2026-05-04 | AsyncSearchSelect; общая панель списка SelectInput               |

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
- Гайд по интеграции с EDOC API (`/edocapp/api/edoc/v1/documents/.../comments`) с маппингом ответа в `CommentThreadItem`, fetch-клиентом и обработкой 401/403/404/422 — `docs-site/guide/components/comments/comments-edoc-api.md` (+ EN / UZ).

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

#### Компоненты

- **`Drawer`** — layout-компонент с compound-частями **`DrawerHeader`** / **`DrawerBody`** / **`DrawerFooter`**. Пропы: `side: 'left' | 'right' | 'top' | 'bottom'` (default `'left'`), `mobileBottom` (на ≤640 px панель всегда снизу, default `true`), `size: 'sm' | 'md' | 'lg' | 'xl'` или кастомный `width`, controlled API через `open` / `onOpenChange`. Закрытие по Escape и клику на бэкдроп, блокировка скролла body, анимация выезда. Impеративный API через `ref` (`DrawerHandle`).
- **`Box`** — универсальный контейнер: `as`-проп для смены тега (`section`, `article`, `aside`, `main`, `span`), `forwardRef`, все `HTMLAttributes<HTMLDivElement>`.
- **`FileUpload`** — система загрузки файлов: `FileDropZone` (drag & drop зона), `FileUploadItem` (строка файла с прогрессом / статусом / действиями), `FileUploadField` (обёртка label + hint + error). Утилиты: `formatFileSize`, `fileToUploadFile`, `filesSignature`, `uploadFilesToNativeFiles`; тип `FileUploadFilesChangeHandler`.
- **`AppSwitcher`** — переключатель приложений для header'а. Trigger показывает активное приложение (иконка + название + описание), при клике открывается сетка 3×N с иконками всех приложений. Иконка: URL → `<img>`, `ReactNode` → рендерится как есть, `undefined` → авто-инициал со стабильным цветом по хешу от названия. Пропы: `apps: AppItem[]`, `promo?: AppSwitcherPromo | null` — промо-баннер сверху с анимированным градиентом (по умолчанию показывается с primary-градиентом, `null` — скрыть, `gradient` — кастомный CSS-градиент).
- **`ToggleButton`** + **`ToggleGroup`** — кнопка-переключатель с состоянием on/off. Поддерживает controlled (`pressed` / `onPressedChange`) и uncontrolled (`defaultPressed`) режимы, `size` и `shape` как у `Button`. `ToggleGroup` — `type="single"` / `type="multiple"`, roving tabindex (`rovingFocus`, `loop`, `orientation`). `aria-pressed` и `data-state="on|off"`.
- **`SegmentedControl`** + **`SegmentedControl.Item`** — переключатель режима с плавным ползунком (`transition: left + width`). Single-select, controlled/uncontrolled, размеры `medium` / `small` / `x-small`, icon-only; айтемы прозрачны, визуал только у thumb.

#### DateInput

- `valueFormat?: 'masked' | 'iso'` — при `'iso'` колбэки `onChange` / `onAccept` отдают `YYYY-MM-DD` (ISO 8601). Утилиты: `formatMaskedToIso`, `formatIsoToMasked`, `parseMaskedDateString`, `formatDateToMasked`.

#### SelectInput

- `dropdownPortalZIndex` — переопределить z-index портала (например, select внутри модалки).
- `dropdownMaxHeight` — максимальная высота выпадающего списка через проп.
- `optionTextWrap` — перенос длинных подписей в выпадашке (CSS-переменная `--select-dropdown-max-height`).

#### Table

- `hideHeader` — скрыть строку заголовков.
- `paginationPosition: 'top' | 'bottom'` — позиция пагинации.
- `activeRowIndex` — подсветка активной строки без таргетинга внутренних классов в приложении.

### Fixed

- **`SelectInput`** portal: убран inline `z-index: 9999`, стекинг через токен `--z-dropdown` (ниже `PageHeader` `--z-sticky: 10`).

### Changed

- **Стили**: инлайн-стили вынесены в CSS Modules у **DateInput**, **HeaderCard**, **Table**; хардкод цветов в **Avatar** и **Sidebar** заменён на токены (`--bg-white-0`, `--shadow-regular-x-small`).
- **Storybook**: в историях с кастомным кодом добавлены `parameters.docs.source.type: 'code'` и `language: 'tsx'`; в `server.watch.ignored` папка `storybook-static/`.
- **ESLint**: добавлены правила `no-console`, `prefer-const`, `no-var`, `consistent-type-imports`, `no-explicit-any`.
- **Vitest**: заданы пороги покрытия — branches 60 %, functions / lines / statements 70 %.
- **`forwardRef`** и **`displayName`** добавлены на все публичные компоненты где отсутствовали (28+ компонентов).

### Infrastructure

- **CI**: workflow `.github/workflows/ci.yml` — typecheck + lint + test + build на push / MR в `main` / `dev`.
- **Сборка**: обновлены `vite.config.ts`, `vitest.config.ts`; скрипты `prepublishOnly` (`npm run build`) и `publish:registry` (GitLab npm registry); `.env.example` для локальных токенов.

### Docs

#### Storybook

- Добавлены истории **`Playground`** ко всем компонентам без интерактивного рендера: **Accordion**, **Tabs**, **Toast** (переименован `Default` → `Playground`), **Breadcrumbs**, **Tooltip**, **Badge** (+`Gallery`), **ButtonGroup**, **ContentDivider**, **Avatar**, **AvatarCard**, **AvatarGroup**, **Box** (+`AsSection`), **Table**, **PdfPreview**.
- Создан **`InputField.stories.tsx`** — `Playground`, `Gallery` (8 состояний), `Sizes`, `WithPrefixAndSuffix`, `WithLabelTooltip`.
- Созданы **`RHFCheckbox.stories.tsx`** и **`RHFTagInput.stories.tsx`** (`Adapters/`).
- **`Typography.gallery.stories.tsx`**: добавлен `tags: ['autodocs']`.
- **`Drawer.stories.tsx`**: добавлена история `Gallery — All States` (все варианты `side`, `hideBackdrop`, `closeOnly`).
- **`Button.stories.tsx`**: добавлены `Playground` + `Gallery — All States`.
- **`AppSwitcher.stories.tsx`**, **`ToggleButton.stories.tsx`**, **`SegmentedControl.stories.tsx`**: новые истории с `parameters.docs.source` для корректного кода в autodocs.

#### VitePress

- Новые страницы: **`drawer.md`** (`en/` + `uz/`), **`optional-entries.md`** с инструкциями по установке peer-зависимостей.
- **`checkbox-field.md`**: полная prop-таблица, секция `CheckboxCard`, примеры состояний.
- **`uikit-root.md`**: секция сценариев, пример с `ModalProvider`, prop-таблица.
- **`calendar.md`**: секция «Субкомпоненты» (`CalendarHeader` / `CalendarGrid` / `CalendarDay`) с prop-таблицами, пример кастомной сборки, секция локалей.
- **`box.md`**: `as`-prop, `ref`, использование в layout, prop-таблица.
- **`page-header.md`**: три примера (breadcrumbs + кнопки; только заголовок; поиск + фильтр), prop-таблица.
- **`inputs-gallery.md`**: сводный обзор всех input-компонентов с entry points и архитектурой (вместо 7-строчного редиректа).
- **`components/index.md`**: сводная таблица всех компонентов по категориям с entry point и примечаниями.
- **`adapters.md`**: добавлены ссылки на `RHFCheckbox` и `RHFTagInput` в Storybook.
- **`sidebar.i18n.ts`**: добавлены `drawer` и `optional-entries` в навигацию.
- **`app-switcher.md`**, **`toggle-button.md`**, **`segmented-control.md`** — новые страницы компонентов с превью и prop-таблицами; Storybook-истории для **AppSwitcher**, **ToggleButton**, **SegmentedControl**.
- **`inputs-gallery.md`**: исправлены внутренние ссылки на страницы инпутов.

#### Внутренняя документация (`docs/`)

- **`CONTRIBUTING.md`** (root): ветки/PR, coding rules, Storybook, docs-процесс, релиз.
- Новые гайды: `OVERLAYS_DEVELOPMENT.md` (Floating UI, ModalProvider, scroll lock), `LAYOUT_DEVELOPMENT.md` (Header + Sidebar + Drawer), `ACCESSIBILITY.md` (ARIA, keyboard, contrast, `prefers-reduced-motion`), `MIGRATIONS.md` (breaking changes и troubleshooting), `RELEASE_CHECKLIST.md` (чеклист перед `npm publish`).
- Новые справочники: `reference/SUBPATH_EXPORTS.md` (все subpath exports), `reference/HOOKS.md` (публичные хуки).
- Обновлены: `CLAUDE.md`, `docs/architecture/00-overview.md`, `docs/architecture/03-dependencies.md`, `docs/README.md`.

---

## [0.6.3] — 2026-05-06

**InputField**: **`completed`** / **`completedColor`** (в т.ч. пресеты **`success`**, **`error`** и др.) на всех связанных полях и **SelectInput**; без серой заливки у **`read-only`** и при hover **`completed`**. Документация VitePress и Storybook.

### Added

- **InputField**: проп **`completed`** — акцентная рамка оболочки по умолчанию (**`--primary-base`**); **`completedColor`** — свой цвет рамки (hex, **`rgb()`**, **`var(--…)`** семантики из **`tokens.css`** или примитивов **`primitives.css`**). Игнорируется при **`error`** или **`disabled`**. Те же поля на базе **InputField** и **SelectInput** (**full** / **compact** / **compact-label** / **inline**), **AsyncSearchSelect**. У **PhoneInput** и **SiteInput** те же пропы дублируются на вложенный **SelectInput** в **`startBlock`** (при той же эффективной видимости completed).

### Changed

- **`completedColor`**: короткие пресеты **`success`**, **`error`**, **`warning`**, **`primary`**, **`information`**, **`faded`**, **`feature`**, **`verified`**, **`away`**, **`highlighted`** → **`var(--*-base)`** из **`tokens.css`** (по-прежнему можно передать hex, **`rgb()`**, **`var(--…)`**).
- **BaseInput**: **`read-only`** — фон **`--bg-white-0`** вместо **`--bg-weak-50`**. **InputField**: при **`completed`** hover без серой подложки (**`--bg-white-0`**).

### Docs

- VitePress: раздел **completed** на **InputField** (превью **`inputCompleted`**, `componentDocsRegistry`), перекрёстные ссылки с **TextInput**, **SelectInput**, **TagInput**, **AsyncSearchSelect**, **PhoneInput**, **SiteInput** (ru / en / uz). Storybook: сторис **Completed** / **CompletedCustomColor** (**TextInput**), **Completed (full)** / **Completed (compact)** (**SelectInput**), **Completed** (**TagInput**, **AsyncSearchSelect**).

---

## [0.6.2] — 2026-05-06

**BaseInput** / **DateInput**: пустой **`autoComplete`** трактуется как **`off`**. **TagInput**: **`autoCapitalize`**, **`autoCorrect`**, **`data-*`** — меньше ложных подсказок автозаполнения и менеджеров паролей (в т.ч. «чужие» значения с соседних полей).

### Fixed

- **BaseInput**: **`autoComplete=""`** приводится к **`off`** (пустая строка раньше могла включать эвристики автозаполнения в части браузеров).
- **TagInput**: по умолчанию **`autoCapitalize="none"`**, **`autoCorrect="off"`**, **`data-lpignore`** / **`data-1p-ignore`** / **`data-bwignore`** — снижают «чужие» подсказки браузера и менеджеров паролей в поле тегов (частый случай — даты с соседних полей).
- **DateInput**: **`autoComplete=""`** у маскированного поля трактуется как **`off`**.

---

## [0.6.1] — 2026-05-06

**SelectInput**: **`groups`** и **`mode="multiple"`**; **TagInput**: **`suggestionsExcludeSelected`** и новое поведение списка подсказок; дефолты **`autoComplete`** у полей ввода; вторичный текст **InputField** / **SelectInput** (**`--text-sub-600`**, зазор лейбла **1px**); **Button**: фокус через **`focus-visible`**; обновление документации и **CLAUDE.md**.

### Added

- **SelectInput**: **`groups`** — секции с заголовком и разделителем (как **SelectGroup** в shadcn/ui), скрытый **`<optgroup>`** при **`groups`**; типы **`SelectOptionGroup`**, **`SelectInputOptionsProp`**. Либо **`options`**, либо **`groups`** (в типах взаимоисключающе); при одновременной передаче в рантайме приоритет у **`groups`**. Стори **`Grouped options`**; страницы **SelectInput** на сайте документации (**ru / en / uz**) и превью **`selectInputGrouped`** в VitePress.
- **SelectInput** (variant **full**): **`mode="multiple"`** — множественный выбор с чекбоксами в выпадающем списке, скрытый **`<select multiple>`** для отправки формы; **`onChange`** с **`SelectInputMultipleChangeEvent`** (**`target.value: string[]`**); **`multipleSummaryLabel`**, **`multipleSummaryRender`**; **`multipleDisplay`** (**`tags`** пока отображается как сводка). У **`SelectOption`** — **`description`** (вторая строка в пункте списка); проп **`optionTextWrap`**. Экспорт типов **`FullVariantMultipleProps`**, **`SelectInputMultipleChangeEvent`**, **`SelectInputMultipleDisplay`**. Обновлены Storybook и страницы **SelectInput** на сайте **ru / en / uz**, демо в **`componentDocsRegistry`**.
- **TagInput**: **`suggestionsExcludeSelected`** — при **`true`** выбранные подсказки снова скрываются из списка (как раньше); по умолчанию **`false`**: выбранные пункты остаются в списке с отметкой, повторный выбор снимает тег.

### Changed

- **InputField**: цвет неошибочной подсказки (**`hint`**) — **`--text-sub-600`**; в ряду лейбла и внутри лейбла зазор **1px** между частями (как в макете **Select** в Figma).
- **SelectInput**: плейсхолдер в триггере (в т.ч. **compact**), плейсхолдер-опция, заголовки **groups**, пустой список и футер async — **`--text-sub-600`** вместо **`--text-soft-400`**.
- **TagInput**: логика списка подсказок и сопоставления с уже добавленными тегами (**`tagMatchesSuggestion`** и др.) под новое поведение по умолчанию.

### Fixed

- **BaseInput**: по умолчанию **`autoComplete="off"`**, чтобы браузер не подставлял автозаполнение в обычные текстовые поля без явного смысла.
- **EmailInput**, **PasswordInput**, **PhoneInput**: разумные значения **`autoComplete`** по умолчанию (**`email`**, **`current-password`**, **`tel`**) с возможностью переопределения.
- **DateInput**: для маскированного поля явно задаётся **`autoComplete`** по умолчанию **`off`** (если не передан свой).
- **Button**: кольцо фокуса через **`focus-visible`**, без лишней анимации **`outline`** и «вспышки» рамки при фокусе мышью.

### Documentation

- **Поля ввода (обзор, ru / en / uz)**: секция **`autoComplete`** — дефолты **BaseInput** / **EmailInput** / **PasswordInput** / **PhoneInput** / **DateInput**; **BaseInput** — ссылка на обзор.
- **SelectInput**: описание **`groups`**, демо **`selectInputGrouped`** (**`VitePressSelectInputDemos`**), расширено описание компонента в Storybook (**`parameters.docs.description`**).
- **CLAUDE.md**: в правила добавлено явное требование при пользовательских изменениях пакета заносить пункт в журнал изменений под **`[Unreleased]`** и дублировать его в **`docs-site/guide/changelog.md`**.

---

## [0.6.0] — 2026-05-05

**TagInput**, обновления **Tag** и **AsyncSearchSelect** (пагинация и модули), исправление календаря **DateInput**, типы **`vite/client`** для сборки.

### Added

- **TagInput** (`@v-lab/ui-kit`) — поле с чипами-тегами и опциональным списком подсказок: локальная фильтрация или режим **`suggestionsMatch: 'server'`** с **`onSuggestionsQueryChange`**; произвольный ввод и выбор из списка; элементы **`{ id, label }`** для стабильных ключей; **`tagsAreaMaxHeight`**, **`wrapperStyle`** / **`wrapperClassName`** у **InputField**; **`allowCustomTags`**, **`suggestionsLoading`** / пустое состояние списка, **`validateTag`**, **`getOptionDisabled`**, **`maxTagCount`** / **`renderTag`**, значение **`TagInputTagValue[]`** (**`string`** или **`{ id, label }`**); утилита **`tagLabel`**. Storybook **Inputs/TagInput**, адаптер **`RHFTagInput`** (`@v-lab/ui-kit/adapters`). Документация и демо VitePress **ru / en / uz**, правки страниц адаптеров.
- **AsyncSearchSelect**: постраничная загрузка — **`loadOptions`** получает **`page`**, ответ **`{ options, hasMore }`** или плоский массив; бесконечная прокрутка списка; при новом запросе после **`debounce`** снова страница **0**; вынесены константы, **`normalizeLoadResult`**, хуки remote / dismiss / keyboard, **`OptionsBody`**; экспорт **`AsyncSearchSelectLoadResult`**. Обновлены Storybook, VitePress **ru / en / uz**.

### Changed

- **Tag**: при **`onClick`** без закрытия корень — **`button`**; иначе **`span`** с **`role="button"`** для основной зоны и отдельное закрытие; слот **`suffix`**, **`prefixRounded`**; для кластера аватаров зазор **2 px** (макет). Обновлены Storybook и документация **Tag** на сайте **ru / en / uz**, **`componentDocsRegistry`**.
- **TagInput**: структура пакета — **`index.tsx`** как точка входа, **`types.ts`**, **`styles.module.css`**, **`model.ts`**, **`hooks/controller.ts`**, **`ui/TagChips`**, **`ui/SuggestionsPopover`** (без дублирования префикса в именах файлов).

### Fixed

- **DateInput**: календарь закрывается после выбора даты — клик по дню больше не всплывает до обёртки с **`onClick`**, из‑за которого панель тут же открывалась снова (**`stopPropagation`** на контейнере календаря). Обновлены страницы **DateInput** на сайте **ru / en / uz**.

### Tooling

- **TypeScript**: в **`tsconfig`** добавлены типы **`vite/client`** для корректного разрешения **`*.module.css`** и др.

---

## [0.5.8] — 2026-05-04

**AsyncSearchSelect**, общая панель выпадающего списка для **SelectInput**, документация и **`noEmit`** для TypeScript.

### Added

- **AsyncSearchSelect** — асинхронный select с поиском: **`loadOptions({ query, signal })`** (строка **`query`** после **`debounceMs`**, отмена запросов через **`AbortSignal`**), опционально **`onSearchQueryChange(query)`**; встроенные состояния загрузки / ошибки / пустого результата; в панели списка — **`SearchInput`** без **`autoFocus`** по умолчанию; экспорт из основного входа **`@v-lab/ui-kit`**.
- Storybook: **`Inputs/AsyncSearchSelect`**.
- VitePress: страницы компонента **ru / en / uz**, демо в **`componentDocsRegistry`**.

### Changed

- **SelectInput**: синхронные **`options`**; общие **`SelectDropdownPanel`** и **`useSelectDropdownFloating`** для синхронного и асинхронного сценариев; доработаны отступы и внешний вид выпадающего списка (в т.ч. строка поиска через **`SearchInput`** там, где нужен поиск).

### Tooling

- **TypeScript**: **`noEmit: true`** в **`tsconfig.json`** — проверка типов без генерации **`.js`** в **`src/`**; **`npm run typecheck`** вызывает **`tsc`**.
