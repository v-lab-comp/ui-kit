---
title: Country flags
description: SVG flags for locale selects — like Design System / Country Flags in Storybook.
---

# Country flags

Matches **Design System → Country Flags** in Storybook (**Flags Gallery** story).

## Gallery

Search by component name (**`Flag…`**) or country name from the manifest — same as Storybook.

<ComponentDocsPreview name="flagsGallery" />

## Import

Separate package entry:

```tsx
import { FlagUz } from '@v-lab/ui-kit/flags'
```

Full component list depends on the set in **`src`** in the repo; the build exports **`dist/flags`**.

Used in **`PhoneInput`** and any form that needs a visual country code next to text.
