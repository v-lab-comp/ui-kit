---
title: Shadows
description: Semantic box-shadow tokens — like Design System / Shadows in Storybook.
---

# Shadows

Matches **Design System → Shadows** in Storybook (**Gallery** story).

## Preview

<DsShadowsGallery />

**`src/skins/corporate/shadows.css`** is part of the corporate skin and is included from **`src/skins/corporate/index.css`** along with the rest of the skin files. The variables are declared on the skin root `[data-vl-skin~='corporate']` and are not redefined in the dark scheme. Shadows are grouped by role:

- **Regular Shadow** — e.g. `--shadow-regular-small`, `--shadow-dropdown`
- **Custom Shadow** — multi-layer **`--shadow-small`**, **`--shadow-medium`**, **`--shadow-large`** and inner variants
- **Colored Shadows** — composite tinted shadows (`--shadow-colored-gray`, `--shadow-colored-primary`, …)
- **Card Shadow** — for card surfaces when needed

In skin CSS and your own styles use **only these variables** (`box-shadow: var(--shadow-medium)`), not arbitrary values — see project rules for semantic shadows.

Preview of all steps — Storybook **Design System → Shadows**.
