# Публикация новой версии

Только для мейнтейнера пакета. Описывает весь цикл: подготовка → версия → сборка → выпуск → пост-релиз.

Стек версионирования — **SemVer**. Репозиторий — [github.com/v-lab-comp/ui-kit](https://github.com/v-lab-comp/ui-kit).

## Текущее состояние

- **Registry не выбран, публикация не настроена.** В `package.json` нет `publishConfig`, в репозитории нет `.npmrc`. Варианты registry, их ограничения и что нужно настроить — в [`../tech-debt/package-registry.md`](../tech-debt/package-registry.md). Версии до `0.15.0` включительно (под прежним именем пакета в scope `@ui-kit`) публиковались в GitLab Package Registry — это история, она описана в [`../changes/`](../changes/README.md).
- **CI — только проверки.** `.github/workflows/ci.yml` (GitHub Actions) на push и PR в `main` / `dev` гоняет `npm ci`, `typecheck`, `lint`, `test:run`, `build`, `build-storybook`, `docs:build`. Публикации по тегу и деплоя док-сайта нет.
- **До выбора registry выпуск — это** версия, changelog, тег `vX.Y.Z` и tarball пакета (`npm pack`), который потребители ставят локально: `npm install /path/to/v-lab-ui-kit-<version>.tgz`.

## Подготовка

- [ ] Все фичи из текущей итерации замерджены в `dev`.
- [ ] `npm run typecheck` — без ошибок.
- [ ] `npm run lint` — без ошибок.
- [ ] `npm run test:run` — все тесты проходят.
- [ ] `npm run build` — сборка без ошибок (`prebuild` запустит `format:check`, `postbuild` — `scripts/check-dist-css.mjs`: висячие `@import` в `dist/**/*.css` и базовое правило ореола).
- [ ] `npm run docs:build` — публичный сайт собирается без ошибок (включая dead-link-чек VitePress).
- [ ] `npm run storybook` — визуальная проверка новых компонентов.
- [ ] `npx pnpm@9 install --frozen-lockfile --lockfile-only` — `pnpm-lock.yaml` синхронен с `package.json` (см. ниже).

## Два лок-файла

В репозитории их два, и они обслуживают разные вещи:

| Файл                | Кто использует                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `package-lock.json` | локальная разработка и сборка пакета, CI (`npm ci` в `.github/workflows/ci.yml`)          |
| `pnpm-lock.yaml`    | сборка образа док-сайта — `docs-site/docker/Dockerfile`, `pnpm install --frozen-lockfile` |

**Любое изменение зависимостей в `package.json` требует обновления обоих.** Если обновить только npm-овский, сборка образа док-сайта падает с `ERR_PNPM_OUTDATED_LOCKFILE` — `--frozen-lockfile` отказывается ставить зависимости при расхождении.

Перегенерировать pnpm-овский нужно **девятой версией** — той же, что в Dockerfile (`corepack prepare pnpm@9 --activate`):

```bash
npx pnpm@9 install --lockfile-only            # перегенерировать
npx pnpm@9 install --frozen-lockfile --lockfile-only   # проверить так же, как сборка образа
```

Версию фиксировать обязательно: `npx pnpm` подтянет последнюю мажорную, а она **не читает поле `pnpm.overrides`** из `package.json` — пины (сейчас `acorn: 8.10.0`) молча исчезают из лок-файла, плюс переписываются peer-резолюции по всему дереву. Признак того, что взялся не тот pnpm: диф на сотни строк вместо десятка при добавлении одного пакета, и предупреждение `The "pnpm" field in package.json is no longer read by pnpm`.

## Выбор версии

| Тип релиза | Когда                                                                                 | Команда             |
| ---------- | ------------------------------------------------------------------------------------- | ------------------- |
| `patch`    | Только багфиксы, никакого нового API, нет breaking changes                            | `npm version patch` |
| `minor`    | Новые компоненты, новые пропы, новые экспортные имена (backward-compat)               | `npm version minor` |
| `major`    | Любой breaking change в публичном API (удаление, переименование, изменение поведения) | `npm version major` |

`npm version` обновляет `package.json` и `package-lock.json` и создаёт git-тег `vX.Y.Z`.

> В `dev` и `main` изменения попадают только через PR. Поэтому релиз готовится на отдельной ветке (например `release/X.Y.Z`, ответвлённой от актуального `dev`). Версионный коммит и changelog делаются на этой ветке.

## Changelog

Публичный changelog (для потребителей) ведётся по [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) в `docs-site/`. Внутренний гранулярный лог — в [`../changes/`](../changes/README.md) (файлы дня, заполняются по ходу работы).

- [ ] В `docs-site/guide/changelog.md` переименовать `## [Unreleased]` → `## [X.Y.Z] — YYYY-MM-DD`, сверху добавить новый пустой `## [Unreleased]`.
- [ ] То же — в локализациях `docs-site/en/guide/changelog.md`, `docs-site/uz/guide/changelog.md`.
- [ ] Убедиться, что изменения релиза отражены в [`../changes/`](../changes/README.md) (файлы дня за период релиза).

Секции changelog — `Added`, `Changed`, `Fixed`, `Removed`, `Deprecated`, `Security`, `Infrastructure`, `Docs`.

## Breaking changes

Если в релизе есть breaking changes:

- [ ] В [`migrations.md`](migrations.md) добавлена секция `X.0 → Y.0`: что изменилось, как мигрировать, какие импорты переходят на sub-entry.
- [ ] В публичном changelog соответствующие пункты в `Removed` / `Changed` помечены явно.

## Сборка и tarball

Публикации в registry пока нет: собранный пакет передаётся потребителям файлом. На релизной ветке, после version- и changelog-коммитов:

```bash
npm run build              # собирает dist/ (ESM + типы + CSS скинов dist/skins/<name>.css)
npm pack --dry-run         # показать, что попадёт в пакет, ничего не создавая
npm pack                   # → v-lab-ui-kit-<version>.tgz в корне репозитория (не коммитить)
```

В пакет попадают только `dist/` (поле `files` в `package.json`), `package.json` и `README.md`. В выводе `npm pack --dry-run` проверить: есть `dist/index.js`, `dist/index.d.ts`, файлы всех entry (`date`, `phone`, `pdf`, `markdown`, `adapters`, `icons`, `flags`), `dist/skins/<name>.js` и `dist/skins/<name>.css`; нет исходников `src/` и лишних файлов. `npm pack` сам `dist/` не собирает — без `npm run build` в tarball уйдёт старая сборка.

Тег — в origin:

```bash
git push origin HEAD:release/X.Y.Z   # ветка с changelog- и version-коммитами
git push origin vX.Y.Z               # тег версии
```

Тег сейчас ничего не запускает: workflow публикации по тегу не настроен ([`../tech-debt/package-registry.md`](../tech-debt/package-registry.md)).

### Док-сайт

Образ док-сайта (VitePress + Storybook за nginx) собирается из `docs-site/docker/Dockerfile`; локально — `npm run docs:docker`. Автоматической сборки и деплоя сейчас нет — образ собирается и разворачивается вручную (см. `docs-site/docker/README.md`).

## После релиза

Тег и релизная ветка уже в origin; в `dev` и `main` коммиты попадают только через PR:

- [ ] Открыть PR `release/X.Y.Z` → **`dev`** и смержить.
- [ ] Открыть PR `dev` → **`main`** и смержить — `main` обновляется только при релизе.
- [ ] Проверить, что `package.json` на `origin/main` уже на новой версии и тег `vX.Y.Z` в её истории.
- [ ] Передать tarball `v-lab-ui-kit-X.Y.Z.tgz` командам-потребителям и уведомить их об апдейте (в первую очередь — если есть breaking changes).

## Что не делать

- Не запускать `npm publish`, пока registry не выбран: без `publishConfig` и `.npmrc` npm отправит пакет в registry по умолчанию (обычно public npm, `registry.npmjs.org`).
- Не пушить напрямую в `dev` / `main` — только через PR.
- Не выпускать с `dev`-ветки без merge в `main`.
- Не переиспользовать номер уже выпущенной версии. Если что-то сломалось — выпускать новый патч.
- Не пропускать `format:check` через `--no-verify` или `--ignore-scripts`. Если хук валится — исправлять проблему, а не обходить хук (см. [`../CONTRIBUTING.md`](../CONTRIBUTING.md)).
