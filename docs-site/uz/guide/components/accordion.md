---
title: Accordion
description: Yoyiladigan panel — sarlavha, kontent, ikonkalar va flipIcon rejimi.
---

# Accordion

Bosqichli bitta akkordeon: tugma-sarlavha va animatsiyalangan kontent paneli. Sarlavha chapidan ixtiyoriy ikonka va **`flipIcon`** rejimi qo‘llab-quvvatlanadi — «plus/minus» almashtirgichi chapga ko‘chadi.

## Preview

<ComponentDocsPreview name="accordion" />

## Import

```tsx
import { Accordion } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { RiQuestionLine } from '@remixicon/react'
import { Accordion } from '@v-lab/ui-kit'

export function FaqBlock() {
  return (
    <Accordion title="Sarlavha" leftIcon={<RiQuestionLine size={20} />} defaultOpen={false}>
      Javob matni yoki har qanday React-kontent.
    </Accordion>
  )
}
```

## Asosiy proplar

| Prop           | Tip                       | Tavsif                                                                                    |
| -------------- | ------------------------- | ----------------------------------------------------------------------------------------- |
| `title`        | `ReactNode`               | Tugma sarlavhasi                                                                          |
| `children`     | `ReactNode`               | Panel kontenti                                                                            |
| `defaultOpen`  | `boolean`                 | Dastlabki yoyilgan holat                                                                  |
| `open`         | `boolean`                 | Boshqariladigan rejim (`onOpenChange` bilan birga)                                        |
| `onOpenChange` | `(open: boolean) => void` | Holat o‘zgarishi                                                                          |
| `disabled`     | `boolean`                 | Yoyishni o‘chirish                                                                        |
| `leftIcon`     | `ReactNode`               | Sarlavha chapidagi ikonka (`flipIcon === false` da)                                       |
| `flipIcon`     | `boolean`                 | `true` — «plus/minus» chapda; `false` — o‘ngda (`leftIcon` bo‘lsa tartib dizayn bo‘yicha) |
| `region`       | `boolean`                 | Panelga sarlavha nomi bilan `role="region"` (standart — o‘chiq)                           |

To‘liq tip — paket manbasidagi **`AccordionProps`**.

## Galereya

Chap ikonka / flip, holatlar va disabled — Storybook **Gallery/Accordion** kabi.

<ComponentDocsPreview name="accordionGallery" />

Manbalar: `src/components/Accordion/`.
