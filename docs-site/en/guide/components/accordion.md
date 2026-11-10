---
title: Accordion
description: Expandable panel — header, content, icons, and flipIcon mode.
---

# Accordion

Single-level accordion: header button and animated content panel. Optional icon left of the title and **`flipIcon`** mode, where the plus/minus affordance moves to the left.

## Preview

<ComponentDocsPreview name="accordion" />

## Import

```tsx
import { Accordion } from '@v-lab/ui-kit'
```

## Example

```tsx
import { RiQuestionLine } from '@remixicon/react'
import { Accordion } from '@v-lab/ui-kit'

export function FaqBlock() {
  return (
    <Accordion title="Title" leftIcon={<RiQuestionLine size={20} />} defaultOpen={false}>
      Answer text or any React content.
    </Accordion>
  )
}
```

## Main props

| Prop           | Type                      | Description                                                                                  |
| -------------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| `title`        | `ReactNode`               | Button label                                                                                 |
| `children`     | `ReactNode`               | Panel content                                                                                |
| `defaultOpen`  | `boolean`                 | Initial open state                                                                           |
| `open`         | `boolean`                 | Controlled mode (with `onOpenChange`)                                                        |
| `onOpenChange` | `(open: boolean) => void` | State change                                                                                 |
| `disabled`     | `boolean`                 | Disable expand                                                                               |
| `leftIcon`     | `ReactNode`               | Icon left of title when `flipIcon === false`                                                 |
| `flipIcon`     | `boolean`                 | `true` — plus/minus on the left; `false` — on the right (with `leftIcon` — order per design) |
| `region`       | `boolean`                 | Panel gets `role="region"` named by the title (off by default)                               |

Full type — **`AccordionProps`** in package sources.

## Gallery

Left icon / flip, states, and disabled — like **Gallery/Accordion** in Storybook.

<ComponentDocsPreview name="accordionGallery" />

Sources: `src/components/Accordion/`.
