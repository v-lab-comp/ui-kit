---
title: ButtonGroup
description: Button group with shared size — Components/ButtonGroup.
---

# ButtonGroup

Groups **[Button](./button)**; **`size`** is set once on the group.

## Preview

<ComponentDocsPreview name="buttonGroup" />

## Import

```tsx
import { ButtonGroup, Button } from '@v-lab/ui-kit'
```

## Example

```tsx
import { ButtonGroup, Button } from '@v-lab/ui-kit'

export function ToolbarButtons() {
  return (
    <ButtonGroup size="small">
      <Button variant="stroke" color="neutral">
        Back
      </Button>
      <Button variant="stroke" color="neutral">
        Next
      </Button>
      <Button variant="filled" color="primary">
        Done
      </Button>
    </ButtonGroup>
  )
}
```

## Main props

| Prop       | Type                                               | Description                                                   |
| ---------- | -------------------------------------------------- | ------------------------------------------------------------- |
| `children` | `ReactNode`                                        | Child **`Button`** elements inherit **`size`** from the group |
| `size`     | same as **Button** (`small` default for the group) | Single size for all buttons inside                            |

Plus wrapper **`HTMLDivElement`** attributes (**`className`**, **`style`**, **`role`**, …).

Full type — **`ButtonGroupProps`**.

Sources: `src/components/ButtonGroup/`.
