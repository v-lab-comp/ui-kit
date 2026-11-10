---
title: Drawer
description: Панель, выезжающая с края экрана — с фокус-ловушкой, стеком оверлеев и мобильным bottom-sheet.
---

# Drawer

**`Drawer`** — панель, выезжающая с любого края экрана. Инфраструктура та же, что у `Modal`: портал в `body`, фокус-ловушка (`FloatingFocusManager`), закрытие по Escape и клику на бэкдроп, блокировка скролла, стек оверлеев через `ModalProvider`.

Открытие через **`ref`** (`DrawerHandle.open()` / `close()`) или контролируемо (`open` + `onOpenChange`). На мобильных (≤640 px) при `mobileBottom` (по умолчанию включён) панель всегда выезжает снизу независимо от `side`.

```text
Drawer                 ← backdrop + панель + фокус-ловушка
├── DrawerHeader       ← заголовок, подзаголовок, иконка, крестик
├── DrawerBody         ← прокручиваемый контент
└── DrawerFooter       ← кнопки действий; startContent — слот слева
```

## Превью

<ComponentDocsPreview name="drawer" />

## Импорт

```tsx
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, type DrawerHandle } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useRef } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  type DrawerHandle,
} from '@v-lab/ui-kit'

export function InviteDrawer() {
  const ref = useRef<DrawerHandle>(null)

  return (
    <>
      <Button onClick={() => ref.current?.open()}>Пригласить</Button>

      <Drawer ref={ref} size="md">
        <DrawerHeader title="Новый пользователь" subtitle="Заполните данные" />
        <DrawerBody>{/* форма */}</DrawerBody>
        <DrawerFooter>
          <Button
            variant="stroke"
            color="neutral"
            size="small"
            onClick={() => ref.current?.close()}
          >
            Отмена
          </Button>
          <Button size="small">Пригласить</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
```

Контролируемый вариант (`open` + `onOpenChange`) — для случаев когда состояние живёт в сторе или роутере:

```tsx
const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Открыть</Button>
<Drawer open={open} onOpenChange={setOpen} side="right" size="lg">
  ...
</Drawer>
```

## `DrawerHeader`

<ComponentDocsPreview name="drawerHeader" />

| Проп                  | Тип         | Описание                             |
| --------------------- | ----------- | ------------------------------------ |
| **`title`**           | `ReactNode` | Заголовок                            |
| **`subtitle`**        | `ReactNode` | Подзаголовок под заголовком          |
| **`icon`**            | `ReactNode` | Слот 40×40 слева                     |
| **`hideCloseButton`** | `boolean`   | Скрыть кнопку «✕»                    |
| **`closeOnly`**       | `true`      | Только кнопка закрытия без заголовка |

## `DrawerFooter`

<ComponentDocsPreview name="drawerFooter" />

| Проп               | Тип         | Описание                                          |
| ------------------ | ----------- | ------------------------------------------------- |
| **`children`**     | `ReactNode` | Кнопки справа                                     |
| **`startContent`** | `ReactNode` | Слот слева: дата, счётчик, деструктивное действие |
| **`fullWidth`**    | `boolean`   | Растянуть кнопки на всю ширину поровну            |

## `DrawerBody`

Прокручиваемая область между `DrawerHeader` и `DrawerFooter`.

| Проп            | Тип                              | Описание                                       |
| --------------- | -------------------------------- | ---------------------------------------------- |
| **`noPadding`** | `boolean`                        | Убрать стандартный padding (контент «к краям») |
| `...divProps`   | `HTMLAttributes<HTMLDivElement>` | Все атрибуты `div`                             |

## Размеры и стороны

<ComponentDocsPreview name="drawerSizes" />

| `side`             | Поведение                                  |
| ------------------ | ------------------------------------------ |
| `'left'` (default) | Выезжает слева, ширина = `size` / `width`  |
| `'right'`          | Выезжает справа                            |
| `'top'`            | Выезжает сверху, высота = `size` / `width` |
| `'bottom'`         | Выезжает снизу, скруглённые верхние углы   |

| `size`           | Ширина |
| ---------------- | ------ |
| `'sm'`           | 360px  |
| `'md'` (default) | 440px  |
| `'lg'`           | 560px  |
| `'xl'`           | 720px  |

Кастомный размер — `width={600}` или `width="50%"` (имеет приоритет над `size`).

## Пропсы `Drawer`

| Проп                                   | Тип                                      | По умолч. | Описание                               |
| -------------------------------------- | ---------------------------------------- | --------- | -------------------------------------- |
| **`open`**                             | `boolean`                                | —         | Контролируемое состояние               |
| **`onOpenChange`**                     | `(open: boolean) => void`                | —         | Вызывается при закрытии/открытии       |
| **`side`**                             | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'`  | С какого края выезжает                 |
| **`mobileBottom`**                     | `boolean`                                | `true`    | На ≤640 px всегда bottom-sheet         |
| **`size`**                             | `'sm' \| 'md' \| 'lg' \| 'xl'`           | `'md'`    | Пресет размера                         |
| **`width`**                            | `number \| string`                       | —         | Кастомный размер, приоритет над `size` |
| **`closeOnBackdropClick`**             | `boolean`                                | `true`    | Закрывать по клику на бэкдроп          |
| **`hideBackdrop`**                     | `boolean`                                | `false`   | Скрыть затемнение                      |
| **`animationDuration`**                | `number`                                 | `280`     | Длительность анимации, мс              |
| **`ariaLabel`**                        | `string`                                 | —         | Когда нет `DrawerHeader` с заголовком  |
| **`className`** / **`panelClassName`** | `string`                                 | —         | Классы корня и панели                  |
| **`zIndex`**                           | `number`                                 | —         | Явный z-index (без `ModalProvider`)    |

## ref API (`DrawerHandle`)

```tsx
const ref = useRef<DrawerHandle>(null)
ref.current?.open() // открыть
ref.current?.close() // закрыть
```

## Стек оверлеев

`Drawer` разделяет стек с `Modal` через `ModalProvider`. При нескольких открытых оверлеях только верхний реагирует на Escape / клик мимо.

```tsx
import { ModalProvider } from '@v-lab/ui-kit'

function App() {
  return (
    <ModalProvider>
      <YourApp /> {/* Modal и Drawer можно открывать поверх друг друга */}
    </ModalProvider>
  )
}
```

Исходники: `src/components/layout/Drawer/`
