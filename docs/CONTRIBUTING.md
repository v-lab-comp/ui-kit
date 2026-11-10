# Контрибуция и ведение документации

Единый файл для тех, кто **ведёт** `@v-lab/ui-kit`: процесс работы (ветки, PR, релиз) и правила внутренней документации (`docs/`). Публичная документация для потребителей пакета живёт на сайте VitePress (см. [`docs-site/`](../docs-site/)).

Правила кода, паттерны компонентов и конвенции — в корневом [`CLAUDE.md`](../CLAUDE.md). Это единая точка правды; здесь они не дублируются.

## Перед началом

- **Node 20+** (ниже не запускается Vitest 4), **npm 9+**.
- Основная среда разработки — Storybook; публичный сайт — VitePress.

```bash
npm install
npm run storybook       # http://localhost:6006 — основная среда разработки
npm run docs:dev        # http://localhost:5173 — публичный сайт (VitePress)
```

Полный список команд (`build`, `test`, `lint`, `typecheck`, генераторы) — в [`CLAUDE.md`](../CLAUDE.md) и в блоке `scripts` файла `package.json`.

## Ветки и PR

| Тип             | Префикс ветки                |
| --------------- | ---------------------------- |
| Новый компонент | `feature/component-name`     |
| Фикс            | `fix/brief-description`      |
| Документация    | `docs/brief-description`     |
| Рефакторинг     | `refactor/brief-description` |

**Базовая ветка — `dev`**, не `main`. `main` обновляется только при релизе через merge из `dev` (см. [`guides/publishing.md`](guides/publishing.md)).

### Требования к PR

- [ ] Код соответствует правилам из [`CLAUDE.md`](../CLAUDE.md): `forwardRef`, `displayName`, контракт в `src/theme/contracts/` (класс `vl-<name>`, части `vl-<name>__<part>`, data-атрибуты), стили только в скине (`src/skins/corporate/components/<name>.css`, подключён в `src/skins/corporate/index.css`) и только через токены, `clsx` для условных классов.
- [ ] Новый компонент имеет Storybook stories: минимум `Playground` и `Gallery — All States`.
- [ ] Изменения экспортированы из `src/index.ts` (или из соответствующего sub-entry: `src/date.ts`, `src/phone.ts`, `src/pdf.ts`, `src/markdown.ts`, `src/adapters/index.ts`).
- [ ] `npm run build`, `npm run typecheck`, `npm run lint` проходят без ошибок. Эти проверки (плюс `test:run`, `build-storybook`, `docs:build`) на push и PR в `main` / `dev` гоняет CI — `.github/workflows/ci.yml` (GitHub Actions).
- [ ] Любое user-visible изменение записано: файл дня в [`changes/`](changes/README.md) (внутренний лог) **и** запись в [`docs-site/guide/changelog.md`](../docs-site/guide/changelog.md) (публичный changelog).
- [ ] Если добавлена страница VitePress — она зарегистрирована в `docs-site/.vitepress/sidebar.i18n.ts` и есть заглушки в `docs-site/en/` и `docs-site/uz/`.
- [ ] Если меняется устройство слоя — обновлён соответствующий файл в `docs/` (правила ниже).

## Что лежит в `docs/`, а что нет

| В `docs/`                                                  | Не в `docs/`                                                                            |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Архитектурные паттерны, правила зависимостей               | API компонентов — Storybook (`npm run storybook`)                                       |
| Гайды по процессам (релиз, миграции, новый компонент)      | Живые примеры компонентов — VitePress                                                   |
| Справочники по тому, что нельзя вывести из кода            | Описание дизайн-токенов для потребителя — VitePress                                     |
| Правила контрибуции и ведения документации (этот файл)     | Публичный changelog — [`docs-site/guide/changelog.md`](../docs-site/guide/changelog.md) |
| Внутренний лог изменений ([`changes/`](changes/README.md)) | Edge cases отдельного компонента — рядом с кодом (см. ниже)                             |
| Технический долг ([`tech-debt/`](tech-debt/README.md))     | Текущий статус работы, TODO — трекер задач                                              |

Документация — про _устройство_ и _процессы_. Если информация выводится из `git log`, `git blame` или из чтения файла — её не нужно дублировать сюда.

## Три уровня документации

Документация разнесена по трём уровням; каждый отвечает на свой вопрос. Чем выше уровень, тем меньше деталей — Уровень 1 экономит токены ИИ за счёт жёсткой компрессии, Уровень 3 хранит нюансы рядом с кодом.

### Уровень 1 — корневой диспетчер: [`../CLAUDE.md`](../CLAUDE.md)

«Свод законов и карта местности». Стек + архитектурный паттерн одной фразой + hard constraints + индекс навигации в `docs/`. **Без описания логики и без шаблонов кода.** Любой шаблонный код (TSX-каркас компонента, CSS-снippet, шаблон stories) лежит на Уровне 2.

### Уровень 2 — устройство слоёв: `docs/architecture/`, `docs/guides/`, `docs/reference/`

«Контракты взаимодействия и побочные эффекты». То, что общее для целого слоя: паттерн `InputField + BaseInput`, стек оверлеев `useModalStack`, правила peer-зависимостей, генерация `primitives.ts`. Здесь живут пошаговые гайды и справочные таблицы. Эта документация **не зависит от конкретного компонента** — если придёт новый input, паттерн в `architecture/inputs.md` уже его покрывает.

### Уровень 3 — поведение конкретного компонента

Нюансы отдельного компонента (edge cases, бизнес-правила, неочевидное поведение API) **не идут в `docs/`** — они живут рядом с кодом:

| Куда                                                 | Что туда                                                                                                                                                                                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parameters.docs.description` в `<Name>.stories.tsx` | Дефолт. Любое неочевидное поведение, edge case, ограничение, причина дизайн-решения. Видно и в Storybook, и в VitePress autodocs.                                                                                             |
| `parameters.docs.description.story` у истории        | Объяснение, зачем нужна эта вариация.                                                                                                                                                                                         |
| `<Name>.types.ts` — JSDoc над пропом                 | Описание пропа, диапазон значений, дефолт. Подхватывается Storybook autodocs и TS IntelliSense.                                                                                                                               |
| `src/components/<Group>/<Name>/README.md`            | Тяжёлые случаи: десятки edge cases, бизнес-правила, инвариант, который не помещается в JSDoc (например `src/components/inputs/README.md`, `src/skins/corporate/README.md`, `src/components/inputs/base/COMPOSITE_INPUTS.md`). |
| `docs-site/guide/components/<name>.md`               | Публичная сторона: один пример + prop-таблица + ссылки. Не дублировать сюда edge cases.                                                                                                                                       |

**Правило выбора места.** Поведение касается одного компонента — Уровень 3 (stories / JSDoc / локальный README). Поведение касается всей группы (всех инпутов, всех оверлеев) — Уровень 2 (`architecture/`).

## Структура

```
docs/
├── README.md            ← корень; ссылки только на дочерние README
├── CONTRIBUTING.md      ← этот файл (процесс + правила документации)
├── architecture/        ← как устроен код (текущее состояние)
│   ├── README.md        ← индекс ветки
│   ├── overview.md      ← слои, правила зависимостей, стек
│   ├── inputs.md        ← InputField + BaseInput, composite-инпуты
│   ├── overlays.md      ← Floating UI, ModalProvider, scroll lock
│   ├── layout.md        ← Header + Sidebar + Drawer + LayoutRoot
│   ├── styling.md       ← компоненты без CSS, скин corporate, токены, палитры [data-color], primitives.css → primitives.ts
│   ├── theming.md       ← скины × цветовые схемы, ThemeProvider, контракты компонентов
│   ├── bundling.md      ← Vite, ESM, external, subpath entries
│   └── adapters.md      ← createRHFAdapter и адаптеры для react-hook-form
├── guides/              ← как сделать что-то (процессы)
│   ├── README.md
│   ├── new-component.md      ← пошаговое создание нового компонента
│   ├── installation.md       ← для потребителя пакета
│   ├── publishing.md         ← для мейнтейнера (версия, changelog, проверки, tarball; registry пока не выбран)
│   ├── migrations.md         ← breaking changes per-версия + troubleshooting
│   └── accessibility.md
├── reference/           ← справочники
│   ├── README.md
│   ├── components.md         ← таблица всех компонентов
│   ├── subpath-exports.md    ← exports из package.json + peer deps
│   ├── hooks.md              ← публичные хуки
│   └── tokens.md             ← дизайн-токены и примитивы цветов
├── changes/             ← внутренний лог изменений (заменяет корневой CHANGELOG.md)
│   ├── README.md            ← индекс месяцев
│   └── YYYY-MM/             ← папка месяца
│       ├── README.md        ← индекс файлов дня (+ история версий до внедрения подхода)
│       └── YYYY-MM-DD.md    ← изменения за день
└── tech-debt/           ← технический долг: известные открытые проблемы
    ├── README.md            ← индекс задач (приоритет, дата)
    └── <задача>.md          ← одна задача: ситуация → цель → trade-offs → миграция → метрики
```

В корне репозитория остаются только [`README.md`](../README.md) (главная страница репо) и [`CLAUDE.md`](../CLAUDE.md) (Уровень 1). Журнал изменений и правила контрибуции живут внутри `docs/`.

## Правило связей — дерево

Ссылки между файлами идут **только сверху вниз**: родитель → ребёнок.

- `docs/README.md` ссылается на `CONTRIBUTING.md`, `architecture/README.md`, `guides/README.md`, `reference/README.md`, `changes/README.md`, `tech-debt/README.md`.
- `architecture/README.md` ссылается на свои `*.md`. Аналогично — `guides/README.md`, `reference/README.md`.
- `changes/README.md` ссылается на `YYYY-MM/README.md`; те — на файлы дня `YYYY-MM-DD.md`.
- `tech-debt/README.md` ссылается на файлы задач.

**Запрещено:**

- Обратные ссылки (ребёнок → родитель).
- Перекрёстные ссылки между соседями в одной ветке (`architecture/inputs.md` → `architecture/overlays.md`).
- Ссылки через уровни (корневой `README.md` → `architecture/inputs.md`, минуя `architecture/README.md`).

**Разрешено как исключение:**

- Любой файл может ссылаться на **код** (`../../src/...`), на корневой [`CLAUDE.md`](../CLAUDE.md), на корневой [`README.md`](../README.md) и на страницы [`docs-site/`](../docs-site/). Это внешние артефакты по отношению к дереву `docs/`.
- Гайд в `guides/` может ссылаться на конкретный файл `architecture/` или `reference/`, минуя их README, — если суть гайда именно в применении конкретного паттерна.
- Файл `architecture/` или `guides/` может ссылаться на конкретную задачу в `tech-debt/` там, где описывает ограничение, которое она снимает.

**Формат ссылок:** стандартный markdown `[текст](путь.md)`. Относительные пути, без wiki-links.

## Когда обновлять документацию

**Docs first.** Перед нетривиальной задачей открыть `docs/README.md` → пройти по ссылкам → прочитать нужный файл → потом читать код.

**Docs after.** После структурного изменения в той же задаче обновить соответствующий файл:

| Изменение в коде                                              | Что обновить                                                                                                                                              |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Новый компонент в `src/components/`                           | [`reference/components.md`](reference/components.md) + запись в [`changes/`](changes/README.md)                                                           |
| Новый input или изменение паттерна `InputField` / `BaseInput` | [`architecture/inputs.md`](architecture/inputs.md)                                                                                                        |
| Новый/изменённый overlay (Modal / Popover / Tooltip / Drawer) | [`architecture/overlays.md`](architecture/overlays.md)                                                                                                    |
| Новый layout-компонент или изменение каркаса                  | [`architecture/layout.md`](architecture/layout.md)                                                                                                        |
| Новый entry point в `package.json` (`./icons`, `./pdf`, …)    | [`reference/subpath-exports.md`](reference/subpath-exports.md), [`architecture/bundling.md`](architecture/bundling.md)                                    |
| Новый публичный хук                                           | [`reference/hooks.md`](reference/hooks.md)                                                                                                                |
| Изменение токенов, `primitives.css`, палитры                  | [`reference/tokens.md`](reference/tokens.md), [`architecture/styling.md`](architecture/styling.md)                                                        |
| Изменение контракта компонента, правил скина, `ThemeProvider` | [`architecture/theming.md`](architecture/theming.md); удаление / переименование значения контракта — ещё и [`guides/migrations.md`](guides/migrations.md) |
| Новый RHF-адаптер                                             | [`architecture/adapters.md`](architecture/adapters.md)                                                                                                    |
| Breaking change в API                                         | [`guides/migrations.md`](guides/migrations.md) + запись в `changes/`                                                                                      |
| Смена процесса релиза или публикации                          | [`guides/publishing.md`](guides/publishing.md)                                                                                                            |
| Найдена известная проблема, которую решаем не сейчас          | Новый файл в [`tech-debt/`](tech-debt/README.md) + строка в его `README.md`                                                                               |
| Задача техдолга решена                                        | Удалить её файл и строку из [`tech-debt/README.md`](tech-debt/README.md), решение — запись в `changes/`                                                   |

Мелкие фиксы, косметика, внутренний рефакторинг без изменения публичного API — отдельной записью в `docs/` не оформляются (но идут в `changes/` и в публичный changelog, если влияют на потребителя).

## Как добавить запись в `changes/`

Внутренний лог изменений (`changes/`) — гранулярная история для агентов и разработчиков. Публичный changelog для потребителей — отдельный файл [`docs-site/guide/changelog.md`](../docs-site/guide/changelog.md); при user-visible изменении заполняются **оба**.

### 1. Создать файл дня

Файл: `docs/changes/YYYY-MM/YYYY-MM-DD.md`. Если папки месяца нет — создать её с `README.md`.

```markdown
# [YYYY-MM-DD] Краткое описание

### Что изменено

- **Added / Changed / Fixed** — пункты по сути изменения.

### Затронутые файлы

- ...

### Как вернуть

`git revert <commit>` либо описание отката.
```

Если за день несколько изменений — объединить в один файл с разделителями `---`.

### 2. Добавить ссылку в README месяца

Файл: `docs/changes/YYYY-MM/README.md`.

```markdown
| Дата | Файл                           | Описание         |
| ---- | ------------------------------ | ---------------- |
| DD   | [YYYY-MM-DD.md](YYYY-MM-DD.md) | Краткое описание |
```

### 3. Если месяц новый — добавить в `changes/README.md`

```markdown
| [YYYY-MM](YYYY-MM/README.md) | Краткое содержание месяца |
```

История версий **до** внедрения этого подхода хранится посекционно (по версиям, формат Keep a Changelog) внутри `README.md` соответствующего месяца — её не переписываем в файлы дня.

## Как завести задачу в `tech-debt/`

Открытые известные проблемы — то, что нужно решить, но не прямо сейчас (обход на стороне потребителя, ограничение, недоделка), — живут в [`tech-debt/`](tech-debt/README.md).

1. **Один файл — одна задача:** `docs/tech-debt/<краткое-имя>.md`. В шапке — статус, приоритет, дата заведения; разделы — «Текущая ситуация», «Целевое состояние», «Trade-offs», «Сценарий миграции», «Метрики успеха» (образец — любой файл в папке).
2. **Строка в индексе** `docs/tech-debt/README.md`: задача, приоритет, дата.
3. **Ссылка из места, где ограничение видно:** гайд или архитектурный файл, описывающий обход, ссылается на файл задачи.
4. **Задача решена** — файл удаляется вместе со строкой индекса и ссылками на него; что сделано — запись в [`changes/`](changes/README.md) (и в публичный changelog, если изменение user-visible).

## Как добавить новый файл в `architecture/` / `guides/` / `reference/`

1. Определить ветку: `architecture/` (как устроено), `guides/` (как сделать), `reference/` (справочник).
2. Создать файл в выбранной ветке.
3. Добавить ссылку в `README.md` этой ветки.
4. **Не** добавлять ссылки из других файлов этой же ветки на новый файл (правило дерева).

## Правила оформления

- **Язык:** русский. Технические идентификаторы и имена файлов — как в коде.
- **Заголовок H1 — один на документ.** Дальше — H2/H3.
- **Без emoji в заголовках и в теле.** Markdown-таблицы и блоки кода — достаточно.
- **Примеры кода — рабочие.** Если показываешь импорт — пиши тот, что реально работает. Имена файлов в дереве — те, что реально лежат на диске.
- **Без сводок и FAQ в конце файла.** Если читателю нужны ссылки — они идут по делу в тексте, а не списком «см. также».
- **Без дат «последний апдейт» в теле документа.** Это видно из `git log`.
- **Без статистики проекта** («N компонентов», «X% покрытия»). Цифры устаревают быстрее, чем обновляется markdown.

## Что не документировать

- То, что выводится из кода (`git log`, `git blame`, чтение `*.tsx`).
- Текущий статус работы (in-progress, TODO, «когда-нибудь»). Это — задачи в трекере, а не документация.
- Списки «известных багов» вне `tech-debt/`. Известная проблема, которую решаем не сейчас, — отдельный файл в [`tech-debt/`](tech-debt/README.md) (см. «Как завести задачу в `tech-debt/`»), а не пункт в архитектурном файле или гайде.
- Дубликаты `CLAUDE.md`. Корневой `CLAUDE.md` — отдельная единица правды для AI-агентов; повторять его в `docs/` не нужно, ссылаться можно.
- API компонентов. Источник правды — Storybook + страницы VitePress.

## Релиз

Только мейнтейнер. Процесс целиком — в [`guides/publishing.md`](guides/publishing.md). Registry и публикация пакета пока не настроены — [`tech-debt/package-registry.md`](tech-debt/package-registry.md).
