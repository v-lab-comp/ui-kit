# [2026-09-17] Опциональные peer-зависимости `/date` и `/phone` в `devDependencies`

### Что изменено

**Infrastructure**

- В `devDependencies` добавлены `imask`, `react-imask`, `libphonenumber-js`, `react-phone-number-input` — в тех же версиях, что уже стояли в `pnpm-lock.yaml` (7.6.1, 7.6.1, 1.12.39, 3.4.16). Остальные опциональные peers (`react-hook-form`, `react-pdf`, `marked`, `turndown`) там уже были.

**Docs**

- [`docs/architecture/bundling.md`](../../architecture/bundling.md) — правило: опциональный peer дублируется в `devDependencies`.

### Почему

npm (7+) не ставит опциональные peer-зависимости. После `npm ci` пакетов `/date` и `/phone` в `node_modules` не было: `npm run typecheck` падал на `Cannot find module 'imask'` / `'libphonenumber-js'`, тесты `PhoneInput` не запускались, `npm run docs:build` падал на `IMaskInput is not exported`. Это ломало бы job `release:verify` (`npm ci` → `typecheck` → `test:run`). Док-сайт в CI это не задевало: pnpm с `autoInstallPeers` ставил пакеты сам.

### Проверено

- `npm run typecheck` — без ошибок; `npm run test:run` — 87/87; `npm run docs:build` — собирается.
- `npx pnpm@9 install --frozen-lockfile --lockfile-only` — lock-файл синхронен; в `pnpm-lock.yaml` пакеты только переехали из автоустановленных peers в `devDependencies`, версии те же.

### Затронутые файлы

- `package.json`, `package-lock.json`, `pnpm-lock.yaml`
- `docs/architecture/bundling.md`

### Как вернуть

`git revert <commit>`.
