---
title: Toast
description: Плашка уведомления — цвета, размеры, действия; для стека нужен ToastProvider.
---

# Toast

Визуальный компонент **`Toast`** и **`ToastAction`**. Для **`useToast()`** и очереди уведомлений оберните приложение в **`ToastProvider`** (см. Storybook и описание API).

## Превью

Кнопка «Показать тост» (**`useToast`** внутри **`ToastProvider`**) и одна статичная плашка, как в примере ниже.

<ComponentDocsPreview name="toast" />

## Импорт

```tsx
import { Toast, ToastAction, ToastProvider, useToast } from '@v-lab/ui-kit'
```

## Пример

Статичная плашка (как в превью доки):

```tsx
import { Toast, ToastAction } from '@v-lab/ui-kit'

export function InlineToast() {
  return (
    <Toast
      color="success"
      variant="light"
      size="large"
      title="Сохранено"
      description="Изменения применены."
      onClose={() => {}}
      actions={[
        <ToastAction key="undo" onClick={() => {}}>
          Отменить
        </ToastAction>,
      ]}
    />
  )
}
```

Очередь уведомлений в приложении — **`ToastProvider`** и **`useToast()`**:

```tsx
import { ToastProvider, ToastAction, useToast } from '@v-lab/ui-kit'

function App() {
  return (
    <ToastProvider position="top-right" duration={5000}>
      <Page />
    </ToastProvider>
  )
}

function Page() {
  const toast = useToast()
  return (
    <button
      type="button"
      onClick={() =>
        toast.add('success', {
          title: 'Готово',
          description: 'Операция выполнена.',
          actions: [<ToastAction key="ok">OK</ToastAction>],
        })
      }
    >
      Показать toast
    </button>
  )
}
```

## Основные пропсы

### `Toast` (одна плашка)

| Проп          | Тип                                                      | Описание                                           |
| ------------- | -------------------------------------------------------- | -------------------------------------------------- |
| `title`       | `ReactNode`                                              | Заголовок (обязателен)                             |
| `description` | `ReactNode`                                              | Подзаголовок                                       |
| `color`       | `error` \| `warning` \| `success` \| `info` \| `neutral` | Семантический цвет                                 |
| `variant`     | `filled` \| `light` \| `lighter` \| `stroke`             | Вариант заливки                                    |
| `size`        | `x-small` \| `small` \| `large`                          | Компактные размеры без описания vs полная карточка |
| `actions`     | массив **`<ToastAction>`**                               | Кнопки действий                                    |
| `onClose`     | `() => void`                                             | Закрытие по крестику                               |
| `icon`        | `ReactNode`                                              | Своя иконка слева                                  |

Плюс **`HTMLAttributes<HTMLDivElement>`** без конфликта с **`title`** (он перегружен смыслом компонента). Тип — **`ToastProps`**.

### `ToastProvider`

| Проп           | Тип                 | По умолчанию | Описание                              |
| -------------- | ------------------- | ------------ | ------------------------------------- |
| `position`     | **`ToastPosition`** | `top-right`  | Угол экрана для стека                 |
| `duration`     | `number`            | `5000`       | Авто-закрытие (ms), **0** = не гасить |
| `offset`       | `number`            | `24`         | Отступ от края (px)                   |
| `gap`          | `number`            | `12`         | Расстояние между тостами              |
| `maxToasts`    | `number`            | `5`          | Максимум видимых                      |
| `pauseOnHover` | `boolean`           | `true`       | Пауза таймера при наведении           |
| `stacking`     | `boolean`           | `true`       | Стопка с раскрытием по hover          |

Типы **`ToastConfig`** / провайдер объединены в **`ToastProvider`**.

### `useToast()` → `toast.add(color, options)`

Второй аргумент **`ToastAddOptions`**: **`title`**, **`description`**, **`variant`**, **`size`**, **`actions`**, **`icon`**, **`duration`** (переопределение для одного тоста).

Полные типы — **`ToastProps`**, **`ToastAddOptions`**, **`ToastContextValue`**.

## Галерея

Как **`ToastGalleryPage`** и полный набор историй в Storybook **Components → Toast**: размеры, сетки **4 варианта × 5 цветов** (с действиями, без действий, только заголовок), блок «много кнопок» по вариантам и живой демо с **`ToastProvider`**.

<ComponentDocsPreview name="toastGallery" />

Исходники: `src/components/Toast/`.
