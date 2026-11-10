---
title: Дизайн-система
description: Токены, цвета, типографика и основы визуального языка V-Lab UI Kit — в том же порядке, что в Storybook.
---

# Дизайн-система

Здесь собраны **основы**, которые совпадают по смыслу с разделом **Design System** в Storybook: цвета, семантические переменные, радиусы, тени, иконки и флаги.

На страницах **Цвета**, **Семантические токены**, **Радиусы** и **Тени** встроены превью по данным из **`primitives.css`**, **`tokens.css`**, **`shadows.css`** (и зеркал в TypeScript). Галереи **[Иконки](./icons)** и **[Флаги стран](./flags)** с поиском совпадают со Storybook (**Design System → Icons / Country Flags**); полноэкранный просмотр по-прежнему удобен в **`npm run storybook`**.

Компоненты кита сами стилей не содержат — токены и оформление даёт скин **corporate** (`src/skins/corporate/`). Его переменные объявлены на корне скина `[data-vl-skin~='corporate']` (светлая схема); тёмная включается атрибутом `data-vl-scheme="dark"` или `data-theme="dark"` на `<html>`, а для отдельного контейнера — `data-theme="dark"` / `data-theme="light"` на нём.

Файлы скина в репозитории:

| Файл                                                      | Назначение                                                                                                     |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `src/skins/corporate/index.ts`                            | Манифест `corporateSkin` (`defineSkin`), в пакете — `@v-lab/ui-kit/skins/corporate`                            |
| `src/skins/corporate/index.css`                           | Подключает все файлы скина в порядке каскада; в пакете — `@v-lab/ui-kit/skins/corporate.css`                   |
| `src/skins/corporate/primitives.css`                      | Сырые шкалы (нейтраль, синий и т.д.); из него генерируется `src/colors/primitives.ts`                          |
| `src/skins/corporate/tokens.css`                          | Семантика light / dark: шрифт, радиусы, primary, фон, текст, обводка, иконки, состояния, `--z-*`, `--motion-*` |
| `src/skins/corporate/shadows.css`                         | Семантические тени                                                                                             |
| `src/skins/corporate/palettes.css`                        | Палитры вариантов по `[data-color='…']` (переменные `--pal-*`)                                                 |
| `src/skins/corporate/halo.css`                            | Hover-ореол интерактивных кнопок (переменные `--halo-*`)                                                       |
| `src/skins/corporate/components/*.css`                    | Стили компонентов по классам `vl-*` и data-атрибутам контрактов                                                |
| `src/skins/corporate/components/base-input.variables.css` | Высоты, отступы, рамка и радиусы полей ввода (`--base-input-*`)                                                |
| `src/colors/semantic.ts`                                  | Соответствие токенов и примитивов (как в JS)                                                                   |

## Разделы (как в Storybook)

| В Storybook                         | Документация                              |
| ----------------------------------- | ----------------------------------------- |
| **Design System / Colors**          | [Цвета](./colors) — примитивы и семантика |
| **Design System / Semantic Tokens** | [Семантические токены](./semantic-tokens) |
| **Design System / Radius**          | [Радиусы](./radius)                       |
| **Design System / Shadows**         | [Тени](./shadows)                         |
| **Design System / Icons**           | [Иконки](./icons)                         |
| **Design System / Country Flags**   | [Флаги стран](./flags)                    |

Подключение в приложении: CSS скина **`@v-lab/ui-kit/skins/corporate.css`** (импортируйте первым, до стилей приложения) и **`ThemeProvider`** со скином `corporateSkin` из `@v-lab/ui-kit/skins/corporate` — он ставит на `<html>` атрибуты `data-vl-skin` и `data-vl-scheme` и переключает светлую/тёмную схему. Без провайдера достаточно `<html data-vl-skin="corporate" data-vl-scheme="light">`; для SSR те же атрибуты на серверный `<html>` отдаёт `themeHtmlAttributes(corporateSkin, 'light')` из `@v-lab/ui-kit` (см. [Установка](/guide/installation) и [Темизация](/guide/theming)).
