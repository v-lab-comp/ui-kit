---
layout: home

hero:
  name: 'V-Lab UI Kit <span class="vp-home-beta" role="status">Beta</span>'
  text: Developer documentation
  tagline: React, TypeScript, unstyled components, skins, Storybook
  image:
    src: /assets/logo.png
    alt: V-Lab UI Kit
  actions:
    - theme: brand
      text: Installation
      link: /en/guide/installation
    - theme: alt
      text: Components
      link: /en/guide/components/
    - theme: alt
      text: Storybook
      link: /en/guide/storybook

features:
  - title: Purpose
    details: Components and tokens for V-Lab products. Consistent UI and faster delivery of typical screens.
    link: /en/guide/components/
    linkText: Components
    icon:
      src: /icons/features/docs.svg
      alt: ''
      width: 26
      height: 26

  - title: Installation
    details: The skin CSS in one import, ThemeProvider turns it on. Works with SSR too. Docs here; interactive review in Storybook. Optional date, phone, pdf, markdown, and adapters entry points.
    link: /en/guide/installation
    linkText: Installation
    icon:
      src: /icons/features/layout.svg
      alt: ''
      width: 26
      height: 26

  - title: Highlights
    details: Inputs, overlays, layout shell. Components carry no styles of their own — token-based skins provide the look, with light and dark schemes. Hooks and react-hook-form adapters. Regressions checked in Storybook.
    link: /en/guide/design-system/
    linkText: Design system
    icon:
      src: /icons/features/spark.svg
      alt: ''
      width: 26
      height: 26
---

## About the library

**V-Lab UI Kit** is a React component library: forms, overlays, tables, layout. Components ship no CSS of their own: they render stable `vl-*` classes and data attributes, and a skin built on design tokens provides the look — currently **corporate**, with light and dark schemes (setup: [Installation](/en/guide/installation)). The skin’s `:where(…)` prefix adds no specificity, so skin styles are easy to override in your app. Documentation on this site; interactive exploration in Storybook. Public API and docs may change until a stable release (**beta**).

::: tip Building this site

Static VitePress build: **`npm run docs:build`**. Output goes to **`docs-site/.vitepress/dist`** (serve via any static host or CDN).

:::
