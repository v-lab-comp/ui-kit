---
title: About this documentation
description: Why this site exists and how it differs from Storybook and from the docs/ catalog in the repository.
---

# About this documentation

The library ships with **three** tiers of material. Keep the split in mind: the public face is **this site** (VitePress); day‑to‑day component development happens in **Storybook**; internal team notes live as **markdown in git**.

The docs are published in **three languages**: Russian (site root), English (**`/en/`**), and Uzbek (**`/uz/`**). Switch languages from the VitePress navbar.

## This site (VitePress)

**Purpose:** single entry point for teams **integrating** `@v-lab/ui-kit` into products.

Here you’ll find what consumers need:

- [Installation](./installation) of the package, skin CSS and `ThemeProvider` setup (light/dark scheme), SSR and Next.js, optional entry points (`date`, `phone`, `pdf`, `markdown`, `adapters`).
- [Theming](./theming): unstyled components and skins, overriding styles and tokens, writing your own skin.
- Component pages with a **short description**, **imports**, **one example**, and **live preview** where wired — without copying every Storybook story.
- [Design system](./design-system/): tokens, colors, radii, shadows, icons, and flags — same intent as the Storybook **Design System** section, but as readable guides.

Copy and structure are meant to work as **official** product documentation.

## Storybook

**Purpose:** local environment for **developing** the ui-kit, browsing **all** variants, and regression checks.

Run from the repo root: **`npm run storybook`** (details: [Storybook](./storybook)).

Open Storybook when you need:

- full **galleries** across sizes and states (**Gallery/**);
- rare prop combinations and **internal** stories (sidebar pieces, modals, calendar, etc.);
- **Docs** panels with interactive controls for a specific story.

This site **does not replace** the full Storybook catalog; we deliberately do not mirror every story one‑to‑one.

## Documentation in the repository

The **`docs/`** folder in git holds outlines, product context, checklists, and deep notes for **maintainers**. It is not built into VitePress automatically — see [Repository documentation](./repository-docs).

## Where to look

| Task                                                | Where                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------- |
| Install package, peers, styles and skin             | [Installation](./installation)                                             |
| Light/dark scheme, overriding styles, your own skin | [Theming](./theming)                                                       |
| Component description, import, one preview scenario | [Components](./components/)                                                |
| Tokens, palette, icons                              | [Design system](./design-system/)                                          |
| `react-hook-form` and `Controller` wrappers         | [RHF adapters](./adapters)                                                 |
| All UI variants in one place, galleries             | Storybook locally — [instructions](./storybook)                            |
| Internal team guides                                | [Repository](./repository-docs), files under **`docs/`** in the repository |
