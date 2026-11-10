---
title: useToast
description: API очереди тостов внутри ToastProvider — add, dismiss.
---

# useToast

Возвращает контекст уведомлений: **`add(color, options)`** и **`dismiss(id)`**. Работает только внутри **`ToastProvider`** (обычно у корня приложения).

Цвета и поля опций — см. типы **`ToastColor`**, **`ToastAddOptions`** ([компонент Toast](/guide/components/toast)).

## Превью

<ComponentDocsPreview name="hookToast" />

## Импорт

```tsx
import { ToastProvider, useToast } from '@v-lab/ui-kit'
```

## Пример разметки приложения

```tsx
import { ToastProvider } from '@v-lab/ui-kit'

export function App({ children }: { children: React.ReactNode }) {
  return <ToastProvider position="bottom-center">{children}</ToastProvider>
}
```

## Пример вызова

```tsx
import { useToast } from '@v-lab/ui-kit'

export function SaveButton() {
  const toast = useToast()

  return (
    <button
      type="button"
      onClick={() =>
        toast.add('success', {
          title: 'Сохранено',
          description: 'Изменения применены.',
        })
      }
    >
      Сохранить
    </button>
  )
}
```

Исходник: `src/components/Toast/hooks/useToast.ts`.
