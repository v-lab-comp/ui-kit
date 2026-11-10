# [2026-09-17] Релизный пайплайн в GitLab CI

### Что изменено

**Infrastructure**

- **`.gitlab-ci.yml`: stages `verify` → `publish` → `release`** поверх существующего `docs`. Триггер публикации — тег `vX.Y.Z`.
- **`release:verify`** — `npm ci`, `typecheck`, `lint`, `test:run`, `build`; перед прогоном сверяет тег с `version` в `package.json` и наличие секции `## [X.Y.Z]` в `docs-site/guide/changelog.md`. Отдаёт `dist/` артефактом. На ветках `release/*` доступен вручную — репетиция релиза без публикации.
- **`release:publish`** — `npm publish --ignore-scripts` в GitLab Package Registry, авторизация через `CI_JOB_TOKEN` (внешние токены не нужны), `interruptible: false`. Release-ссылка на changelog ведёт на тег, а не на `main`, — на момент публикации MR в `main` ещё не смержен.
- **`release:gitlab`** — GitLab Release по тегу через Releases API, `allow_failure: true`.
- **`release:bump`** — manual job на ветках `release/*` с переменной `BUMP` (`patch` / `minor` / `major`): поднимает версию, коммитит, пушит коммит и тег; проверка changelog — общий хелпер `require_changelog` из `.node`, тот же, что в `release:verify`. Требует CI/CD-переменную `RELEASE_PUSH_TOKEN` (project access token, scope `write_repository`).
- **`.gitignore`**: `.ci-home/` — HOME node-контейнера в CI (кэш npm, временный `.npmrc` с токеном).

**Docs**

- [`docs/guides/publishing.md`](../../guides/publishing.md) — публикация через CI как основной путь (кнопка `release:bump` либо пуш тега), локальный `npm publish` оставлен запасным; в «Одноразовой настройке» — `RELEASE_PUSH_TOKEN`.

### Решения по реализации

- **Тег как триггер, а не ветка.** Совпадает с уже описанным в `publishing.md` циклом (релизная ветка → `npm version` → тег) и делает публикацию явным действием: пересборка `dev` пакет не выкатывает.
- **Node гоняется в контейнере, а не на хосте.** Runner shell'овый и Node на нём нет (в истории CI был fallback со скачиванием тарбола). Хелпер `node_run` из `.node` запускает `node:22-bookworm-slim` с примонтированным workspace, `-u $(id -u):$(id -g)` — чтобы артефакты не оставались root-owned, `HOME=/w/.ci-home` — чтобы кэш npm и `.npmrc` с токеном лежали в workspace, который runner чистит сам.
- **`CI_JOB_TOKEN` вместо отдельного npm-токена.** Registry берётся из `publishConfig` в `package.json`, из него же строится строка авторизации — адрес токена гарантированно совпадает с тем, куда публикует npm.
- **`--ignore-scripts` при публикации.** В publish-job'е нет `node_modules` (нужен только `dist/` из артефактов), а `prepare: husky` без них падает. `HUSKY=0` и `CI=true` выставлены во всех node-командах: первый гасит установку хуков, второй — тяжёлый postinstall `storybook-mcp`.
- **Manual-правила с `allow_failure: true`.** Без него manual-job переводит пайплайн ветки `release/*` в `blocked`, и при «Pipelines must succeed» MR `release/*` → `dev` не смержить.
- **Changelog проверяется до коммита версии.** В `release:bump` сначала `npm version --no-git-tag-version`, затем проверка секции `## [X.Y.Z]`, и только потом commit + tag — при забытом changelog job падает, не наплодив коммитов и тегов.

### Затронутые файлы

- `.gitlab-ci.yml`
- `.gitignore`
- `docs/guides/publishing.md`
- `docs/CONTRIBUTING.md`
