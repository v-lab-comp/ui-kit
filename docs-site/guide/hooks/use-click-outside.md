---
title: useClickOutside
description: Обработка кликов вне указанного DOM-узла — как на reactuse.org, упрощённый API (ref + callback).
---

# useClickOutside

Обрабатывает клики **вне** целевого элемента: подписка на **`document`** в фазе всплытия (`click`). Если **`event.target`** не содержится в **`ref.current`**, вызывается колбэк. Подходит для выпадающих меню и вспомогательного закрытия без [`useDismiss`](https://floating-ui.com/docs/useDismiss) из Floating UI.

По смыслу близко к [useClickOutside из ReactUse](https://reactuse.org/functions/hooks/useClickOutside), но API однообразный: всегда **`ref`**, затем **`callback`** и опционально **`enabled`**. Колбэк хранится в **`useRef`**, чтобы не снимать слушатель при каждом рендере.

## Installation

Хук входит в основной пакет — отдельной установки не нужно (как подключить кит: [Установка](../installation)).

```tsx
import { useClickOutside } from '@v-lab/ui-kit'
```

## Usage

Минимальный вызов:

```tsx
const ref = useRef<HTMLDivElement>(null)

useClickOutside(ref, (event) => {
  console.log('click outside', event)
})
```

Частый паттерн — закрывать оверлей только когда он открыт (третий аргумент **`enabled`**):

```tsx
useClickOutside(ref, () => setOpen(false), open)
```

## Demo

Интерактивное превью (тот же механизм, что и у компонентов в доке):

<ComponentDocsPreview name="hookClickOutside" />

## API

### Parameters

| Name             | Type                          | Default | Description                                                                           |
| ---------------- | ----------------------------- | ------- | ------------------------------------------------------------------------------------- |
| `ref`            | `RefObject<T \| null>`        | —       | Корневой элемент: клики **внутри** не считаются «снаружи» (`Element.contains`).       |
| `onClickOutside` | `(event: MouseEvent) => void` | —       | Вызывается, если клик произошёл вне `ref.current`.                                    |
| `enabled`        | `boolean`                     | `true`  | Если `false`, слушатель на `document` не вешается (удобно, когда панель уже закрыта). |

### Returns

`void`

### Поведение

- Событие: только **`click`** на **`document`** (не `mousedown`).
- Цель сравнивается с **`ref.current`** на момент события; **`capture`** не используется.

## Исходный код

Реализация в репозитории: `src/hooks/dom/useClickOutside.ts`.
