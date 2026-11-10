# История изменений

Гранулярный лог изменений репозитория — для агентов и разработчиков, **ведущих** пакет. Заменяет прежний корневой `CHANGELOG.md`.

Публичный changelog для команд, **подключающих** пакет, — [`docs-site/guide/changelog.md`](../../docs-site/guide/changelog.md) (рендерится на сайте VitePress).

## Как устроено

- Новые изменения — отдельным файлом дня `YYYY-MM/YYYY-MM-DD.md`; ссылка на него добавляется в `README.md` месяца. Шаблон и правила — в [`../CONTRIBUTING.md`](../CONTRIBUTING.md).
- История версий **до** внедрения этого подхода хранится посекционно (по версиям, формат Keep a Changelog) внутри `README.md` соответствующего месяца — её не переписываем в файлы дня.

## Месяцы

| Месяц                        | Содержание                                                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [2026-11](2026-11/README.md) | Переименование в `@v-lab/ui-kit`; только ESM (CJS-сборка удалена); чистка мёртвого кода; компоненты без стилей, скин `corporate`, `ThemeProvider`; переезд на GitHub           |
| [2026-09](2026-09/README.md) | Релизный пайплайн в GitLab CI: публикация по тегу `vX.Y.Z`, кнопка `release:bump`                                                                                              |
| [2026-08](2026-08/README.md) | `RichInput` — форматированный текст в форме; общий слой `richText` для contenteditable-редакторов                                                                              |
| [2026-07](2026-07/README.md) | `CommentsSection`: сворачивание длинных комментариев + ручки вёрстки; кнопки: hover-ореол, motion-токены, `customColor` у `Button`                                             |
| [2026-06](2026-06/README.md) | Состояния рамки инпутов (filled, primary-фокус), красный маркер `required`, фикс палитры                                                                                       |
| [2026-05](2026-05/README.md) | Comments (inline edit, soft-delete, `maxLength`), Table sort/reorder, Badge/Tag, Drawer/AppSwitcher/Toggle/Segmented, `completed`, `autoComplete`, SelectInput groups/multiple |
| [2026-04](2026-04/README.md) | AsyncSearchSelect, Comments (rich input), хотфиксы SelectInput, `useTabsSearchParam`, деплой док-сайта на GitLab Pages                                                         |
| [2026-03](2026-03/README.md) | Table, Tabs, Layout, subpath exports (`/date`, `/phone`), оптимизация бандла, первый срез `0.1.0`                                                                              |
