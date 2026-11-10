# Сентябрь 2026

| Дата | Файл                                                                           | Описание                                                                                                                            |
| ---- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 17   | [2026-09-17-release-pipeline.md](2026-09-17-release-pipeline.md)               | Релизный пайплайн в GitLab CI: публикация пакета по тегу `vX.Y.Z`, кнопка `release:bump`                                            |
| 17   | [2026-09-17-phone-input-fixes.md](2026-09-17-phone-input-fixes.md)             | `PhoneInput`: вставка номера с кодом страны, страна из внешнего `value`, выделение, `value` не в E.164                              |
| 17   | [2026-09-17-optional-peers-dev-deps.md](2026-09-17-optional-peers-dev-deps.md) | Опциональные peer-зависимости `/date` и `/phone` продублированы в `devDependencies` — `npm ci` + `typecheck` / тесты / `docs:build` |
| 17   | [2026-09-17-release-publish-prepare.md](2026-09-17-release-publish-prepare.md) | `release:publish` падал на `husky: not found`: `prepare` → `husky \|\| true`                                                        |
