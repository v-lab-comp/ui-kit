---
title: ButtonGroup
description: Группа кнопок с общим размером — Components/ButtonGroup.
---

# ButtonGroup

Группирует **[Button](./button)**; **`size`** задаётся один раз на группу.

## Превью

<ComponentDocsPreview name="buttonGroup" />

## Импорт

```tsx
import { ButtonGroup, Button } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { ButtonGroup, Button } from '@v-lab/ui-kit'

export function ToolbarButtons() {
  return (
    <ButtonGroup size="small">
      <Button variant="stroke" color="neutral">
        Назад
      </Button>
      <Button variant="stroke" color="neutral">
        Дальше
      </Button>
      <Button variant="filled" color="primary">
        Готово
      </Button>
    </ButtonGroup>
  )
}
```

## Основные пропсы

| Проп       | Тип                                              | Описание                                                    |
| ---------- | ------------------------------------------------ | ----------------------------------------------------------- |
| `children` | `ReactNode`                                      | Дочерние **`Button`** — им наследуется **`size`** от группы |
| `size`     | как у **Button** (`small` по умолчанию у группы) | Единый размер для всех кнопок внутри                        |

Плюс атрибуты обёртки **`HTMLDivElement`** (**`className`**, **`style`**, **`role`** …).

Полный тип — **`ButtonGroupProps`**.

Исходники: `src/components/ButtonGroup/`.
