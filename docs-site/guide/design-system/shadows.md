---
title: Тени
description: Семантические box-shadow токены — как Design System / Shadows в Storybook.
---

# Тени

Соответствует **Design System → Shadows** в Storybook (история **Gallery**).

## Превью

<DsShadowsGallery />

Файл **`src/skins/corporate/shadows.css`** входит в скин corporate и подключается в **`src/skins/corporate/index.css`** вместе с остальными файлами скина. Переменные объявлены на корне скина `[data-vl-skin~='corporate']` и в тёмной схеме не переопределяются. Тени сгруппированы по смыслу:

- **Regular Shadow** — например `--shadow-regular-small`, `--shadow-dropdown`
- **Custom Shadow** — многослойные **`--shadow-small`**, **`--shadow-medium`**, **`--shadow-large`** и inner-варианты
- **Colored Shadows** — составные цветные тени (`--shadow-colored-gray`, `--shadow-colored-primary`, …)
- **Card Shadow** — при необходимости для карточных поверхностей

В CSS скина и в своих стилях используйте **только эти переменные** (`box-shadow: var(--shadow-medium)`), а не произвольные значения — см. правила проекта для семантических теней.

Превью всех ступеней — в Storybook **Design System → Shadows**.
