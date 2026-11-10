---
title: Цвета
description: Примитивы и семантические цвета — как в Storybook Design System / Colors.
---

# Цвета

Структура совпадает со страницей **Design System → Colors** в Storybook (история **Primitives And Semantics**).

## Превью

<DsPrimitivesPalette />

## Уровни

Цвета задаёт скин **corporate** (`src/skins/corporate/`): компоненты сами стилей не содержат, переменные объявлены на `[data-vl-skin~='corporate']` и действуют, только когда скин включён.

1. **Примитивы** (`src/skins/corporate/primitives.css`) — палитры вроде `neutral-*`, `blue-*`, шкалы без привязки к роли в UI.
2. **Семантические токены** (`src/skins/corporate/tokens.css`) — переменные вида **`--bg-*`**, **`--text-*`**, **`--primary-*`**, которые в светлой схеме ссылаются на примитивы через `var(...)`.

Тёмная схема — отдельный блок в том же файле: те же имена переменных, другие привязки к примитивам. Он действует, когда на корне скина стоит **`data-vl-scheme="dark"`** (на `<html>` его ставит `ThemeProvider`) или `data-theme="dark"`, а также внутри контейнера с `data-theme="dark"` (см. [Токены](./semantic-tokens)).

## Что смотреть в Storybook

Полную сетку свотчей и переключение тем — в **Storybook → Design System → Colors**.

## В CSS скина и приложения

Фон страницы/карточки: `background: var(--bg-weak-50)`, текст основной: `color: var(--text-strong-950)`, акцент: `var(--primary-base)`, ошибки: палитра **`--error-*`** из токенов.

Палитры вариантов — **`src/skins/corporate/palettes.css`**: селектор `[data-color='<name>']` задаёт переменные `--pal-*` (`--pal-base`, `--pal-hover`, `--pal-active`, `--pal-bg-hover`, `--pal-bg-active`). Атрибут `data-color` компоненты (Button, Badge, Tag, Toast) ставят сами из пропа `color`; в своей разметке (внутри скина) палитра включается тем же атрибутом, например `<div data-color="success">`. Подробнее — [Темизация](/guide/theming), `docs/architecture/styling.md` в репозитории и [Токены](./semantic-tokens).
