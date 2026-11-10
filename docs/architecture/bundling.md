# Сборка и зависимости

Пакет публикуется как npm-библиотека. Принципов пять:

1. **React, и почти всё «не наше», в bundle не попадает.** Перечень — в `peerDependencies` + `rollupOptions.external` в `vite.config.ts`.
2. **ESM собирается с `preserveModules`** — каждый компонент остаётся отдельным файлом в `dist/`, чтобы у потребителя работал tree-shaking.
3. **Тяжёлые опциональные зависимости вынесены в отдельные entry points.** Основной bundle не тянет `imask`, `libphonenumber-js`, `react-pdf`, `react-hook-form`.
4. **Только ESM, CommonJS-сборки нет.** Все потребители — бандлеры (Vite, Next.js, Webpack 5), они берут ESM; Node 20.19+ / 22.12+ загружает ESM и через `require()`. Вторая (CJS) копия пакета грозила бы двумя экземплярами React-контекстов (`ModalProvider`, `ToastProvider`, …) в одном приложении. В `exports` у каждого JS-entry — условия `types` и `default` (у CSS скинов — просто путь к файлу).
5. **CSS — отдельным файлом на каждый скин.** Компоненты CSS не импортируют; стили приходят только из скинов. Каждая папка `src/skins/<name>/` с `index.ts` находится автоматически (`skinEntries` в `vite.config.ts`) и становится entry `skins/<name>`: манифест собирается в `dist/skins/<name>.js`, а CSS, который импортирует `index.ts` (`index.css`), — в `dist/skins/<name>.css` (`build.cssCodeSplit: true`, имя задаёт `assetFileNames`: `skins/<name>/index.css` → `skins/<name>.css`). Общего `style.css` нет. В JS скина остаётся только манифест (`corporateSkin`) — CSS потребитель подключает отдельно, `import '@v-lab/ui-kit/skins/corporate.css'`, и в бандл приложения попадают только импортированные скины. Стили применяются только под `data-vl-skin` на `<html>` (см. [`theming.md`](theming.md)).

## Output

```
dist/
├── index.js              ESM main entry (preserveModules)
├── index.d.ts            типы
├── date.js     / date.d.ts      — DateInput
├── phone.js    / phone.d.ts     — PhoneInput
├── pdf.js      / pdf.d.ts       — PdfPreview
├── markdown.js / markdown.d.ts  — MarkdownInput
├── adapters.js / adapters.d.ts  — RHF
├── icons.js    / icons.d.ts     — переэкспорт @remixicon/react
├── flags.js    / flags.d.ts     — SVG-флаги стран
├── skins/corporate.js / skins/corporate.d.ts — corporateSkin (манифест скина, без CSS)
├── skins/corporate.css            — CSS скина corporate: токены, палитры, стили всех компонентов
└── ...                          — остальные модули из src/components (preserveModules)
```

`sourcemap: true`, `minify: true` для prod — оба значения зафиксированы в `vite.config.ts` после ранней регрессии с накопленным размером бандла.

## Sub-entry points

Каждый sub-entry — это отдельный файл (`src/<name>.ts`, а также `src/adapters/index.ts`), заявленный в `lib.entry` в `vite.config.ts` и в `exports` `package.json`. Он подключает только то, что нужно для своего компонента, плюс свои peer-зависимости.

Скины в `lib.entry` по одному не перечисляются: `skinEntries` в `vite.config.ts` добавляет entry `skins/<name>` для каждой папки `src/skins/<name>/` с `index.ts`. В `exports` на все скины — два шаблона:

```json
"./skins/*.css": "./dist/skins/*.css",
"./skins/*": {
  "types": "./dist/skins/*.d.ts",
  "default": "./dist/skins/*.js"
}
```

`@v-lab/ui-kit/skins/corporate.css` → CSS скина, `@v-lab/ui-kit/skins/corporate` → манифест: шаблон `./skins/*.css` специфичнее `./skins/*`, поэтому `.css` резолвится в CSS, а не в `corporate.css.js`. Новый скин не требует правок ни в `vite.config.ts`, ни в `package.json`.

Полная таблица (импорт → содержимое → peer deps) — в [`../reference/subpath-exports.md`](../reference/subpath-exports.md). Здесь — почему именно так.

### Зачем разделять

`imask` и `libphonenumber-js` — это >200 KB сырого размера. Если потребитель не использует `DateInput` / `PhoneInput`, эти зависимости вообще не появляются в его графе. На практике размеры сейчас:

| Файл                       | Размер ESM                                            |
| -------------------------- | ----------------------------------------------------- |
| `dist/index.js`            | ≈ 12 KB (re-export barrel — tree-shake у потребителя) |
| `dist/phone.js`            | ≈ 0.5 KB (вся работа — у пользователя, через peer)    |
| `dist/date.js`             | малый                                                 |
| `dist/skins/corporate.css` | ≈ 190 KB, ≈ 24 KB gzip (весь скин corporate)          |

### Регулярка для `libphonenumber-js`

Пакет `libphonenumber-js` экспортирует много подпутей (`/core`, `/min`, `/max`). В `rollupOptions.external` он добавлен как regex `/^libphonenumber-js/`, иначе Rollup пытается резолвить каждый подпуть отдельно и часть утечек попадает в bundle.

То же — для `react-phone-number-input` (есть подпути с дополнительными словарями стран).

## Peer dependencies

| Тип                             | Пакеты                                                                                                                        | Почему так                                                          |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `peerDependencies` обязательные | `react`, `react-dom` (`^18.2.0 \|\| ^19.0.0`), `clsx`, `@remixicon/react`, `@floating-ui/react`                               | Одна копия в приложении; совместимость версий                       |
| `peerDependencies` опциональные | `react-hook-form`, `imask`, `react-imask`, `libphonenumber-js`, `react-phone-number-input`, `react-pdf`, `marked`, `turndown` | Нужны только при использовании соответствующего sub-entry           |
| `dependencies`                  | —                                                                                                                             | Любая `dependency` рискует превратиться в дубль в графе потребителя |

Каждый опциональный peer продублирован в `devDependencies`: npm (7+) опциональные peer-зависимости не ставит, и без дубля после `npm ci` падают `typecheck`, тесты и `docs:build` — в том числе в CI (`.github/workflows/ci.yml`). Добавляя новый опциональный peer, добавляйте его и в `devDependencies` (оба lock-файла).

`@floating-ui/react` — **обязательный** peer. Без него не работают `Modal`, `Popover`, `Tooltip`, `Drawer`, выпадающий список `SelectInput`.

## Никаких циклов

Компоненты не импортируют друг друга «по горизонтали». Общая логика — в `hooks/`, `utils/` или `base/` своей группы. Это формальное правило архитектуры (см. [`overview.md`](overview.md)), а из него прямое следствие — отсутствие циклических зависимостей при сборке.

Перед добавлением новой записи в `dependencies` или нового пакета в `peerDependencies` — обсуждение в команде. Каждый пакет увеличивает риск дублей в графе потребителя и расхождений по версиям.

## Что куда смотреть

| Вопрос                                              | Куда                                                                 |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| Какие entry points есть и какие peer-зависимости    | [`../reference/subpath-exports.md`](../reference/subpath-exports.md) |
| Как переключиться на новый entry point при апгрейде | [`../guides/migrations.md`](../guides/migrations.md)                 |
| Как опубликовать новую версию                       | [`../guides/publishing.md`](../guides/publishing.md)                 |
