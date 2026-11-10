---
title: useToast
description: Toast queue API inside ToastProvider — add, dismiss.
---

# useToast

Returns the notifications context: **`add(color, options)`** and **`dismiss(id)`**. Works only inside **`ToastProvider`** (usually at the app root).

For colors and option fields see **`ToastColor`**, **`ToastAddOptions`** ([Toast component](/en/guide/components/toast)).

## Preview

<ComponentDocsPreview name="hookToast" />

## Import

```tsx
import { ToastProvider, useToast } from '@v-lab/ui-kit'
```

## App shell example

```tsx
import { ToastProvider } from '@v-lab/ui-kit'

export function App({ children }: { children: React.ReactNode }) {
  return <ToastProvider position="bottom-center">{children}</ToastProvider>
}
```

## Usage example

```tsx
import { useToast } from '@v-lab/ui-kit'

export function SaveButton() {
  const toast = useToast()

  return (
    <button
      type="button"
      onClick={() =>
        toast.add('success', {
          title: 'Saved',
          description: 'Your changes have been applied.',
        })
      }
    >
      Save
    </button>
  )
}
```

Source: `src/components/Toast/hooks/useToast.ts`.
