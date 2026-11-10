---
title: Радиусы
description: Шкала border-radius из токенов — как Design System / Radius в Storybook.
---

# Радиусы

Соответствует **Design System → Radius** в Storybook (история **Tokens**).

## Превью

<DsRadiusScale />

Переменные объявлены в **`src/skins/corporate/tokens.css`** (скин corporate) в блоке **Radius**:

| Токен                        | Типичное использование                         |
| ---------------------------- | ---------------------------------------------- |
| `--radius-0` … `--radius-28` | От острых углов до крупных скруглений карточек |
| `--radius-full`              | Круглые аватары, «пилюля»                      |

В CSS скина и в своих стилях используйте **`border-radius: var(--radius-8)`** и т.п., без произвольных px, чтобы оставаться в шкале дизайн-системы.

Визуальная шкала всех значений — в Storybook на странице **Radius**.
