---
title: UiKitRoot
description: Interfeys «oroli» uchun mahalliy CSS-reset va asosiy tipografika.
---

# UiKitRoot

**`vl-ui-kit-root`** sinfli o‘rama: chekinishlarni normallashtirish, `box-sizing`, shu tugunda formalarning va tipografikaning bazaviy uslublari — ularni skin beradi (`src/skins/corporate/components/ui-kit-root.css`). Global **`body`** uslublarini almashtirmaydi — ilova ildizini yoki izolyatsiya blokini (preview, vidjet) o‘rang.

## Preview

<ComponentDocsPreview name="uikitRoot" />

## Import

```tsx
import { UiKitRoot } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { UiKitRoot } from '@v-lab/ui-kit'

export function AppShell({ children }: { children: React.ReactNode }) {
  return <UiKitRoot>{children}</UiKitRoot>
}
```

## Asosiy proplar

To‘liq tip — **`UiKitRootProps`**: **`HTMLAttributes<HTMLDivElement>`** + **`children`** — `vl-ui-kit-root` sinfli ildiz **`div`**.

Manbalar: `src/components/UiKitRoot/` · `UiKitRoot.types.ts`.
