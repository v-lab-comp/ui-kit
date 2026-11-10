# [2026-09-17] `release:publish`: `prepare` без `node_modules`

### Что изменено

**Infrastructure**

- **`package.json`: `"prepare": "husky || true"`** (было `"husky"`). Первый запуск `release:publish` на теге `v0.15.0` упал до публикации:

  ```
  > @v-lab/ui-kit@0.15.0 prepare
  > husky
  sh: 1: husky: not found
  npm error code 127
  ```

- `.gitlab-ci.yml`: комментарий у `npm publish` с причиной.

### Почему

В publish-job'е нет `node_modules` — только `dist/` из артефакта `release:verify`. Флаг `--ignore-scripts` должен был пропустить `prepare`, но **npm 10** (в образе `node:22-bookworm-slim`) запускает `prepare` при `npm publish` несмотря на флаг; в npm 11 это исправлено. `HUSKY=0` не помогает: до husky дело не доходит, падает сам поиск бинарника. Решение из [`2026-09-17-release-pipeline.md`](2026-09-17-release-pipeline.md) («`--ignore-scripts` при публикации») на npm 10 не работало.

`husky || true` — стандартный вариант из документации husky для окружений без devDependencies. Локально (`npm install` / `npm ci`) хуки ставятся как раньше; потребителей пакета не касается — `prepare` при установке из registry не выполняется.

### Проверено

- `npx npm@10 publish --dry-run --ignore-scripts` в каталоге с `package.json` тега и без `node_modules`, скрипты через `sh`-совместимый shell: с `"husky"` — `husky: command not found`, `npm error code 127` (как в CI); с `"husky || true"` — доходит до `Publishing to … (dry-run)`. npm 11 `prepare` при публикации не запускает.

### Затронутые файлы

- `package.json`
- `.gitlab-ci.yml`

### Как вернуть

`git revert <commit>`.
