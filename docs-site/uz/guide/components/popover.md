---
title: Popover
description: Ancor element yonida suzuvchi panel (Floating UI), document.body ga portal.
---

# Popover

**`Popover`** **`children`** ni ancor element (**`anchorRef`**) nisbatan joylashtiradi. Ochilish-yopilish tashqaridan boshqariladi (**`open`**); komponent faqat **`open === true`** bo‘lganda portaldagi qatlamni chizadi.

## Preview

<ComponentDocsPreview name="popover" />

## Import

```tsx
import { Popover } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { useRef, useState } from 'react'
import { Popover } from '@v-lab/ui-kit'

export function AnchoredMenu() {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button ref={anchorRef} type="button" onClick={() => setOpen((v) => !v)}>
        Menyu
      </button>
      <Popover open={open} anchorRef={anchorRef} placement="bottom" offset={8}>
        <div>Popover kontenti</div>
      </Popover>
    </div>
  )
}
```

**`onOpenChange`** berilsa, panel Escape va panel/ancordan tashqariga bosishda yopiladi (**`useDismiss`**); **`dismissible={false}`** bilan o‘chiriladi. Fokusni ilova boshqaradi. Ildiz **`data-placement`** oladi — flip/shift dan keyingi yakuniy joylashuv (skinlar uchun).

## Asosiy proplar

| Prop           | Tip                                                                         | Tavsif                                             |
| -------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| `open`         | `boolean`                                                                   | Panel ko‘rinadimi                                  |
| `anchorRef`    | `RefObject<Element \| null>`                                                | Joylashish uchun ancor                             |
| `placement`    | `'top' \| 'bottom' \| 'left' \| 'right'`                                    | Ancor tomoni                                       |
| `offset`       | `number`                                                                    | Ancordan chekinish (px), standart 6                |
| `zIndex`       | `number` (ixtiyoriy)                                                        | Suzuvchi qatlam z-index                            |
| `onOpenChange` | `(open: boolean) => void` (ixtiyoriy)                                       | Yopilish so‘rovi (Escape, tashqariga bosish)       |
| `dismissible`  | `boolean` (ixtiyoriy)                                                       | Escape / tashqariga bosishda yopish, standart true |
| `role`         | `'dialog' \| 'alertdialog' \| 'menu' \| 'listbox' \| 'tooltip'` (ixtiyoriy) | Panelning ARIA roli                                |

Manbalar: `src/components/overlays/Popover/`.
