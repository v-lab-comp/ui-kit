# Registry и публикация пакета не настроены

**Статус:** открыто · **Приоритет:** высокий — до первой публикации · **Заведено:** 2026-11-10

## Текущая ситуация

Репозиторий переехал с GitLab на GitHub: [github.com/v-lab-comp/ui-kit](https://github.com/v-lab-comp/ui-kit). Версии до `0.15.0` включительно публиковались под прежним именем в scope `@ui-kit` в GitLab Package Registry пайплайном GitLab CI. При переезде из репозитория удалено всё, что было завязано на GitLab:

- `publishConfig` в `package.json` (GitLab npm registry);
- `.npmrc` (scope `@v-lab` → GitLab registry) и `.npmrc.example`;
- `.gitlab-ci.yml`: проверки → `npm publish` → GitLab Release по тегу `vX.Y.Z`, кнопка `release:bump`, сборка и деплой док-сайта;
- `.ssh-config` (SSH-хост GitLab).

Что есть сейчас:

- **Registry не выбран.** `@v-lab/ui-kit` не опубликован ни в одном registry; `npm install @v-lab/ui-kit` падает с `E404`. Потребители ставят пакет из локального tarball: `npm run build && npm pack` в ките → `npm install /path/to/v-lab-ui-kit-<version>.tgz` в приложении.
- **`npm publish` опасен.** Без `publishConfig` и `.npmrc` npm отправит пакет в registry по умолчанию (public npm).
- **CI — только проверки.** `.github/workflows/ci.yml` (GitHub Actions) на push и PR в `main` / `dev`: `npm ci`, `typecheck`, `lint`, `test:run`, `build`, `build-storybook`, `docs:build`. Публикации по тегу, GitHub Release и деплоя док-сайта нет; тег `vX.Y.Z` ничего не запускает.
- **Док-сайт собирается вручную.** Образ (VitePress + Storybook за nginx) — `docs-site/docker/Dockerfile` с `pnpm install --frozen-lockfile`; сборка и перезапуск контейнера на сервере — руками (`docs-site/docker/README.md`).

## Целевое состояние

- Выбран registry. В `package.json` — `publishConfig` с адресом registry (для public npm — ещё `"access": "public"`), в корне репозитория — `.npmrc` со строкой `scope → registry` без токенов.
- GitHub Actions:
  - **verify** — уже есть (`.github/workflows/ci.yml`);
  - **publish по тегу `vX.Y.Z`** — те же проверки, сверка тега с `version` в `package.json` и наличия секции `## [X.Y.Z]` в `docs-site/guide/changelog.md`, `npm publish` с токеном из секретов репозитория, GitHub Release;
  - **docs** — сборка док-сайта и Storybook и деплой туда, где сайт будет жить.
- Потребитель ставит пакет обычным `npm install` по гайду установки, без tarball.

## Trade-offs

| Вариант                                | Имя пакета                                                                                               | Установка у потребителя                                                                                               | Что нужно настроить                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| GitHub Packages (`npm.pkg.github.com`) | scope обязан совпадать с владельцем репозитория → `@v-lab-comp/ui-kit`: переименование пакета и импортов | токен GitHub даже для чтения (personal access token (classic) со scope `read:packages`) + `.npmrc` с адресом registry | `publishConfig`, `.npmrc`; публикация из Actions — `GITHUB_TOKEN` с правом `packages: write`          |
| Public npm (npmjs.com)                 | `@v-lab/ui-kit` сохраняется, если создать на npmjs.com организацию `v-lab` (имя должно быть свободно)    | без токена и без `.npmrc`, если пакет публичный                                                                       | организация `v-lab`, `publishConfig.access: "public"`, npm-токен в секретах Actions; пакет виден всем |
| Другой приватный registry              | `@v-lab/ui-kit` сохраняется                                                                              | токен и `.npmrc` по правилам registry                                                                                 | registry, доступный из GitHub Actions; его хостинг и поддержка                                        |
| Остаться на tarball                    | сохраняется                                                                                              | файл `.tgz` по пути `file:…` в `package.json` приложения                                                              | ничего; но нет semver-диапазонов и `npm update`, tarball передаётся и хранится вручную                |

- **GitHub Packages:** registry рядом с кодом, публикация из Actions без отдельных секретов. Минус — второе переименование подряд (прежнее имя в scope `@ui-kit` → `@v-lab/ui-kit` → `@v-lab-comp/ui-kit`) и токен у каждого разработчика и в CI каждого приложения-потребителя. Переименовать дешевле до первой публикации: `@v-lab/ui-kit` ещё нигде не опубликован, потребители 0.15 всё равно меняют имя в импортах.
- **Public npm:** проще всего для потребителя, имя сохраняется. Минус — пакет (собранный `dist/` с source maps) становится публичным; приватный пакет на npmjs.com требует платного тарифа организации.
- **Другой приватный registry:** имя и закрытость сохраняются, но registry кто-то должен поднять и поддерживать, а токен для него — завести в секретах Actions.

## Сценарий миграции

- Шаг 1: решение владельца — registry (для GitHub Packages — и новое имя `@v-lab-comp/ui-kit`).
- Шаг 2: `package.json` → `publishConfig` (`registry`; для public npm — `"access": "public"`), `.npmrc` в корне со строкой `@<scope>:registry=<адрес>` без токена. Для GitHub Packages — переименовать пакет: `name`, импорты в `src/`, `.storybook/`, `docs/`, `docs-site/`, `README.md`, `CLAUDE.md`; секция в `docs/guides/migrations.md`.
- Шаг 3: GitHub Actions — workflow публикации по тегу `vX.Y.Z` (проверки как в `.github/workflows/ci.yml`, сверка тега с версией и секции changelog, `npm publish`, GitHub Release); токен публикации — в секретах репозитория. Прорепетировать на pre-release-версии.
- Шаг 4: сборка и деплой док-сайта из Actions: образ `docs-site/docker/Dockerfile` (или `docs:build` + `build-storybook`) → выбранный хостинг; `DOCS_BASE`, если сайт живёт не в корне домена.
- Шаг 5: документация — `docs/guides/installation.md` (registry, токен, если нужен, `.npmrc` потребителя), `docs/guides/publishing.md` (публикация по тегу вместо tarball), `docs/CONTRIBUTING.md` (раздел «Релиз»), `docs-site/guide/installation.md` и её копии в `docs-site/en/` и `docs-site/uz/`, `README.md`, `docs-site/docker/README.md` (деплой); запись в `docs/changes/` и в публичный changelog.
- Откат: удалить `publishConfig`, `.npmrc` и workflow публикации — установка снова из tarball; уже опубликованные версии остаются в registry.

## Метрики успеха

- Пуш тега `vX.Y.Z` публикует пакет без ручных шагов; `npm view <имя пакета> version` возвращает эту версию.
- В чистом приложении пакет ставится по гайду установки (`npm install` из registry, без tarball), сборка приложения проходит.
- Док-сайт обновляется из GitHub Actions без ручной сборки образа.
