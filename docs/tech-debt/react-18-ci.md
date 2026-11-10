# React 18 не проверяется в CI

**Статус:** открыто · **Приоритет:** средний — до первого потребителя на React 18 · **Заведено:** 2026-11-10

## Текущая ситуация

Peer `react` / `react-dom` — `^18.2.0 || ^19.0.0`, но разработка, тесты и CI (`.github/workflows/ci.yml`) идут только на React 19 (devDependencies). Совместимость с React 18 проверена вручную 2026-11-10 (см. [`../changes/2026-11/2026-11-10.md`](../changes/2026-11/2026-11-10.md), раздел «React 19»): unit-тесты кита и `tsc` на React 18.2.0 / `@types/react` 18.2.79, приложение-потребитель из tarball. Дальше любая правка может незаметно сломать React 18: например, API только React 19 (ref как обычный проп без `forwardRef`, `use`, `<Context>` как провайдер) пройдёт typecheck на `@types/react` 19 и тесты на React 19.

## Целевое состояние

В CI есть job на React 18.2: те же `npm run typecheck` и `npm run test:run`, но с `react` / `react-dom` 18.2.0 и `@types/react` / `@types/react-dom` 18.2. Тесты, завязанные на поведение React 19, пропускаются по версии (`it.runIf(REACT_19)`), как уже сделано в `useMergeRefs.test.tsx` и `refForwarding.test.tsx`.

## Trade-offs

- **Выигрываем:** обещание peer-диапазона проверяется на каждом PR.
- **Риски:** `npm install react@18 --no-save` в дереве с React 19 упирается в конфликты peer-зависимостей (Storybook), а `--legacy-peer-deps` вычищает автоматически поставленные peer-пакеты (`@remixicon/react` и др.) — так делать нельзя. Рабочий способ: после `npm ci` подменить в `node_modules` только `react`, `react-dom` (+ вложенный `scheduler` 0.23), `@types/react`, `@types/react-dom` (+ `@types/prop-types`) из `npm pack`. Плюс ~1–2 минуты CI.

## Сценарий миграции

- Шаг 1: скрипт `scripts/use-react-18.mjs`, который после `npm ci` подменяет пакеты React на 18.2 (как в проверке 2026-11-10).
- Шаг 2: job `react-18` в `.github/workflows/ci.yml`: `npm ci` → скрипт → `npm run typecheck` → `npm run test:run`.
- Шаг 3: сводка в CONTRIBUTING: новый тест, который проверяет поведение только React 19, помечается `runIf(REACT_19)`.
- Откат: удалить job.

## Метрики успеха

- Job `react-18` зелёный на каждом PR; падение ловит API только React 19 до релиза.
