---
title: Design system
description: Tokens, colors, typography, and foundations of the V-Lab UI Kit visual language — same order as in Storybook.
---

# Design system

Here you’ll find the **foundations** that match the **Design System** section in Storybook: colors, semantic variables, radii, shadows, icons, and flags.

On **Colors**, **Semantic tokens**, **Radii**, and **Shadows**, previews are driven by **`primitives.css`**, **`tokens.css`**, **`shadows.css`** (and mirrored TypeScript). **[Icons](./icons)** and **[Country flags](./flags)** galleries with search match Storybook (**Design System → Icons / Country Flags**); full-screen browsing is still most convenient via **`npm run storybook`**.

Kit components carry no styles of their own — tokens and styling come from the **corporate** skin (`src/skins/corporate/`). Its variables are declared on the skin root `[data-vl-skin~='corporate']` (light scheme); the dark scheme is turned on by `data-vl-scheme="dark"` or `data-theme="dark"` on `<html>`, and for a single container by `data-theme="dark"` / `data-theme="light"` on that container.

Skin files in the repository:

| File                                                      | Purpose                                                                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `src/skins/corporate/index.ts`                            | `corporateSkin` manifest (`defineSkin`); in the package — `@v-lab/ui-kit/skins/corporate`                    |
| `src/skins/corporate/index.css`                           | Imports all skin files in cascade order; in the package — `@v-lab/ui-kit/skins/corporate.css`                |
| `src/skins/corporate/primitives.css`                      | Raw scales (neutral, blue, etc.); `src/colors/primitives.ts` is generated from it                            |
| `src/skins/corporate/tokens.css`                          | Light / dark semantics: font, radii, primary, background, text, stroke, icons, states, `--z-*`, `--motion-*` |
| `src/skins/corporate/shadows.css`                         | Semantic shadows                                                                                             |
| `src/skins/corporate/palettes.css`                        | Variant palettes by `[data-color='…']` (`--pal-*` variables)                                                 |
| `src/skins/corporate/halo.css`                            | Hover halo of interactive buttons (`--halo-*` variables)                                                     |
| `src/skins/corporate/components/*.css`                    | Component styles by `vl-*` classes and contract data attributes                                              |
| `src/skins/corporate/components/base-input.variables.css` | Input heights, paddings, border and radii (`--base-input-*`)                                                 |
| `src/colors/semantic.ts`                                  | Token ↔ primitive mapping (as JS)                                                                            |

## Sections (as in Storybook)

| In Storybook                        | Documentation                                 |
| ----------------------------------- | --------------------------------------------- |
| **Design System / Colors**          | [Colors](./colors) — primitives and semantics |
| **Design System / Semantic Tokens** | [Semantic tokens](./semantic-tokens)          |
| **Design System / Radius**          | [Radii](./radius)                             |
| **Design System / Shadows**         | [Shadows](./shadows)                          |
| **Design System / Icons**           | [Icons](./icons)                              |
| **Design System / Country Flags**   | [Country flags](./flags)                      |

Consumption in apps: the skin CSS **`@v-lab/ui-kit/skins/corporate.css`** (import it first, before app styles) plus **`ThemeProvider`** with `corporateSkin` from `@v-lab/ui-kit/skins/corporate` — it sets the `data-vl-skin` and `data-vl-scheme` attributes on `<html>` and switches light/dark. Without the provider, `<html data-vl-skin="corporate" data-vl-scheme="light">` is enough; for SSR, `themeHtmlAttributes(corporateSkin, 'light')` from `@v-lab/ui-kit` returns the same attributes for the server `<html>` (see [Installation](/en/guide/installation) and [Theming](/en/guide/theming)).
