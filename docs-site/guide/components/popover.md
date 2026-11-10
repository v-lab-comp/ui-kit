---
title: Popover
description: Плавающая панель у якорного элемента (Floating UI), портал в document.body.
---

# Popover

**`Popover`** позиционирует произвольный **`children`** относительно элемента-якоря (**`anchorRef`**). Открытие и закрытие управляются снаружи (**`open`**); компонент только рендерит слой в портале при **`open === true`**.

## Превью

<ComponentDocsPreview name="popover" />

## Импорт

```tsx
import { Popover } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useRef, useState } from 'react'
import { Popover } from '@v-lab/ui-kit'

export function AnchoredMenu() {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button ref={anchorRef} type="button" onClick={() => setOpen((v) => !v)}>
        Меню
      </button>
      <Popover open={open} anchorRef={anchorRef} placement="bottom" offset={8}>
        <div>Содержимое поповера</div>
      </Popover>
    </div>
  )
}
```

С **`onOpenChange`** панель закрывается по Escape и клику вне панели и якоря (**`useDismiss`**); отключается **`dismissible={false}`**. Фокусом управляет приложение. Корень получает **`data-placement`** — итоговое положение после flip/shift (для скинов).

## Пропсы (`PopoverProps`)

Позиционирование — **Floating UI**; **`placement`** принимает полный тип **`Placement`** (включая **`bottom-start`**, **`top-end`** и т.д.) — см. `@floating-ui/react`.

| Проп               | Тип                                                                        | Описание                                                  |
| ------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------- |
| **`open`**         | `boolean`                                                                  | Панель в DOM только при **`true`**                        |
| **`onOpenChange`** | `(open: boolean) => void` (optional)                                       | Запрос закрыться (Escape, клик снаружи)                   |
| **`dismissible`**  | `boolean` (optional)                                                       | Закрытие по Escape / клику снаружи, по умолчанию **true** |
| **`role`**         | `'dialog' \| 'alertdialog' \| 'menu' \| 'listbox' \| 'tooltip'` (optional) | ARIA-роль панели                                          |
| **`anchorRef`**    | **`RefObject<Element \| null>`**                                           | DOM-элемент-якорь (кнопка и т.п.)                         |
| **`placement`**    | **`Placement`** (optional)                                                 | Положение относительно якоря                              |
| **`offset`**       | `number` (optional)                                                        | Зазор между якорём и панелью (px), по умолчанию **6**     |
| **`children`**     | **`ReactNode`**                                                            | Содержимое панели                                         |
| **`className`**    | `string` (optional)                                                        | Класс корня плавающего слоя                               |
| **`style`**        | **`CSSProperties`** (optional)                                             | Инлайн-стили панели                                       |
| **`zIndex`**       | `number` (optional)                                                        | Переопределение **`z-index`** (иначе из CSS-токенов)      |

Исходники: `src/components/overlays/Popover/` · `Popover.types.ts`.
