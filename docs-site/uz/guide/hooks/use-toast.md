---
title: useToast
description: ToastProvider ichidagi toast navbati API — add, dismiss.
---

# useToast

Bildirishnomalar kontekstini qaytaradi: **`add(color, options)`** va **`dismiss(id)`**. Faqat **`ToastProvider`** ichida ishlaydi (odatda ilova ildizida).

Ranglar va parametr maydonlari — **`ToastColor`**, **`ToastAddOptions`** turlariga qarang ([Toast komponenti](/uz/guide/components/toast)).

## Preview

<ComponentDocsPreview name="hookToast" />

## Import

```tsx
import { ToastProvider, useToast } from '@v-lab/ui-kit'
```

## Ilova razmetkasi misoli

```tsx
import { ToastProvider } from '@v-lab/ui-kit'

export function App({ children }: { children: React.ReactNode }) {
  return <ToastProvider position="bottom-center">{children}</ToastProvider>
}
```

## Chaqiruv misoli

```tsx
import { useToast } from '@v-lab/ui-kit'

export function SaveButton() {
  const toast = useToast()

  return (
    <button
      type="button"
      onClick={() =>
        toast.add('success', {
          title: 'Saqlandi',
          description: 'O‘zgarishlar qo‘llandi.',
        })
      }
    >
      Saqlash
    </button>
  )
}
```

Manba: `src/components/Toast/hooks/useToast.ts`.
