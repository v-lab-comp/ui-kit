---
title: Semantic tokens
description: Named CSS variables for background, text, stroke, and states — like Design System / Semantic Tokens in Storybook.
---

# Semantic tokens

This section matches **Design System → Semantic Tokens** in Storybook (**Tokens** story) — swatch tables for light and dark.

## Preview

<DsSemanticTokens />

## Principle

Names like **`--bg-strong-950`**, **`--text-sub-600`** do not set color directly: they reference a **primitive** (`neutral-950`, `neutral-600`, etc.). This aligns with Figma and **`src/colors/semantic.ts`** (`semanticLight`, `semanticDark`) — you can resolve hex programmatically via **`getPrimitiveHex`**.

## Groups (summary)

| Group      | Variable prefix                                                 | Role                |
| ---------- | --------------------------------------------------------------- | ------------------- |
| Primary    | `--primary-*`                                                   | Brand accent blue   |
| Background | `--bg-*`                                                        | Surface backgrounds |
| Text       | `--text-*`                                                      | Text hierarchy      |
| Stroke     | `--stroke-*`                                                    | Borders             |
| Icon       | `--icon-*`                                                      | Icon color          |
| States     | `--warning-*`, `--error-*`, `--success-*`, `--information-*`, … | Status semantics    |

Full name list and swatches — **`src/skins/corporate/tokens.css`** and **Storybook** full-page semantics.

## Dark theme

The scheme is switched by **`ThemeProvider`** (`colorScheme` / `defaultColorScheme`: `'light'`, `'dark'` or `'system'`; at runtime — `setColorScheme` from `useTheme()`). It sets **`data-vl-scheme="dark"`** on `<html>` (and mirrors the scheme into `data-theme`), and the values from the dark block of `tokens.css` apply — same `--bg-*` / `--text-*` names, different values. Without the provider, `data-vl-scheme="dark"` or `data-theme="dark"` on `<html>` next to `data-vl-skin="corporate"` has the same effect.

For a single container inside the page (e.g. a dark inset on a light background) — put **`data-theme="dark"`** or **`data-theme="light"`** on that container. Portals (Modal, Toast, dropdowns) render into `body` and follow the `<html>` scheme, not the container’s.

The dark block selectors weigh as much as the light root (0,1,0), so a token overridden on `:root` in CSS loaded after the skin applies in both document schemes — more in [Theming](/en/guide/theming).

For SSR, `themeHtmlAttributes(skin, scheme)` returns the scheme attributes for the server `<html>`. The server does not know a choice from `storageKey` or `'system'`, so the first frame is light until hydration — a known limitation (`docs/tech-debt/ssr-color-scheme-flash.md` in the repo).
