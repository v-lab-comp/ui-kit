# Апрель 2026

История версий до внедрения файлов дня — посекционно (формат Keep a Changelog).

| Версия | Дата       | Кратко                                                          |
| ------ | ---------- | --------------------------------------------------------------- |
| 0.5.7  | 2026-04-28 | Документация для потребителей, деплой док-сайта на GitLab Pages |
| 0.5.6  | 2026-04-27 | Хотфикс SelectInput (compact/compact-label) + e2e Storybook     |
| 0.5.5  | 2026-04-24 | Comments — `CommentRichInput`, `CommentsSection`                |
| 0.5.4  | 2026-04-13 | Повторная публикация 0.5.3                                      |
| 0.5.3  | 2026-04-13 | Хотфикс SelectInput — позиционирование и ширина списка          |
| 0.5.2  | 2026-04-03 | Хотфикс DateInput (masked) и FileUpload (multipart)             |
| 0.5.1  | 2026-04-04 | `useTabsSearchParam`, структура `hooks/`                        |

---

## [0.5.7] — 2026-04-28

Документация для потребителей пакета, деплой док-сайта на **GitLab Pages** и сборка **`base`** под не-корневой URL.

### Added

- **GitLab CI** (`.gitlab-ci.yml`): job **`docs:build`** (`pnpm install`, `pnpm run docs:build`), артефакт `docs-site/.vitepress/dist/`; job **`pages`** — копирование в **`public/`** для GitLab Pages; переменная **`DOCS_BASE="/${CI_PROJECT_NAME}/"`**; окружение **`pages`** с **`url: $CI_PAGES_URL`**; **`interruptible: true`** для default.
- **Docker** статики док-сайта: **`docs-site/docker/`** (`Dockerfile`, `nginx` `default.conf`, `entrypoint.sh`).
- **`.dockerignore`** для контекста сборки образа.

### Changed

- **VitePress** (`docs-site/.vitepress/config.ts`): опция **`base`** из переменной окружения **`DOCS_BASE`** (нормализация слешей); локально без переменной — **`/`**; в CI префикс совпадает с типичным путём GitLab Pages.

### Documentation

- **README.md**, гайд установки разработчика, страницы установки **ru / en / uz**: минимальный **`npm install`** дополнен **`@floating-ui/react`**; уточнены обязательные peer-зависимости основного входа; в примере «полной» установки — **`react-pdf`** и **`pdfjs-dist`** для entry **`pdf`**.

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

## [0.5.1] — 2026-04-04

Патч после **0.5.0**: хук синхронизации вкладок с query и структура папки `hooks/`.

### Added

- **`useTabsSearchParam`**: хук для связки с query (`?…=`) — **`value`**, **`setTab`**, **`onChange`** (алиас), **`getTabFromUrl`**, подписка на **`popstate`**; компонент **`Tabs`** без URL; опции **`defaultValue`**, **`replace`**, **`validValues`**. Тип **`UseTabsSearchParamResult`**.
- Утилиты **`tabsSearchParams`** (`readSearchParam` / `writeSearchParam`) и тесты.

### Changed

- **`hooks`**: **`useClickOutside`** в **`src/hooks/dom/`**; табы и URL — в **`src/hooks/tabs/`**; общий реэкспорт **`src/hooks/index.ts`**; импорт **`HeaderCard`** из **`@/hooks`**.
