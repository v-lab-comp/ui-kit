---
title: Colors
description: Primitives and semantic colors — like Storybook Design System / Colors.
---

# Colors

Structure matches the **Design System → Colors** page in Storybook (**Primitives And Semantics** story).

## Preview

<DsPrimitivesPalette />

## Levels

Colors come from the **corporate** skin (`src/skins/corporate/`): components carry no styles of their own; the variables are declared on `[data-vl-skin~='corporate']` and apply only while the skin is on.

1. **Primitives** (`src/skins/corporate/primitives.css`) — palettes like `neutral-*`, `blue-*`, scales without a fixed UI role.
2. **Semantic tokens** (`src/skins/corporate/tokens.css`) — variables such as **`--bg-*`**, **`--text-*`**, **`--primary-*`**, which in the light scheme point at primitives via `var(...)`.

The dark scheme is a separate block in the same file: same variable names, different primitive mappings. It applies when the skin root has **`data-vl-scheme="dark"`** (`ThemeProvider` sets it on `<html>`) or `data-theme="dark"`, and inside a container with `data-theme="dark"` (see [Tokens](./semantic-tokens)).

## What to see in Storybook

Full swatch grid and theme toggle — **Storybook → Design System → Colors**.

## In skin and app CSS

Page/card background: `background: var(--bg-weak-50)`, primary text: `color: var(--text-strong-950)`, accent: `var(--primary-base)`, errors: **`--error-*`** palette from tokens.

Variant palettes — **`src/skins/corporate/palettes.css`**: the `[data-color='<name>']` selector sets the `--pal-*` variables (`--pal-base`, `--pal-hover`, `--pal-active`, `--pal-bg-hover`, `--pal-bg-active`). Components (Button, Badge, Tag, Toast) set `data-color` themselves from the `color` prop; in your own markup (inside the skin) the same attribute turns a palette on, e.g. `<div data-color="success">`. More in [Theming](/en/guide/theming), `docs/architecture/styling.md` in the repo and [Tokens](./semantic-tokens).
