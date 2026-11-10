---
title: Radius
description: Border-radius scale from tokens — like Design System / Radius in Storybook.
---

# Radius

Matches **Design System → Radius** in Storybook (**Tokens** story).

## Preview

<DsRadiusScale />

Variables are declared in **`src/skins/corporate/tokens.css`** (corporate skin) under **Radius**:

| Token                        | Typical use                               |
| ---------------------------- | ----------------------------------------- |
| `--radius-0` … `--radius-28` | From sharp corners to large card rounding |
| `--radius-full`              | Circular avatars, “pill” shapes           |

In skin CSS and your own styles use **`border-radius: var(--radius-8)`** etc., avoid arbitrary px to stay on the design scale.

Visual scale of all values — Storybook **Radius** page.
