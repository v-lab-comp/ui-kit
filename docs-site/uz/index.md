---
layout: home

hero:
  name: 'V-Lab UI Kit <span class="vp-home-beta" role="status">Beta</span>'
  text: Dasturchilar hujjatlari
  tagline: React, TypeScript, unstyled komponentlar, skinlar, Storybook
  image:
    src: /assets/logo.png
    alt: V-Lab UI Kit
  actions:
    - theme: brand
      text: O‘rnatish
      link: /uz/guide/installation
    - theme: alt
      text: Komponentlar
      link: /uz/guide/components/
    - theme: alt
      text: Storybook
      link: /uz/guide/storybook

features:
  - title: Maqsad
    details: V-Lab mahsulotlari uchun komponentlar va tokenlar. Bir xil interfeys va tipik ekranlarni tezroq topshirish.
    link: /uz/guide/components/
    linkText: Komponentlar
    icon:
      src: /icons/features/docs.svg
      alt: ''
      width: 26
      height: 26

  - title: Ulanish
    details: Skin CSS i bitta import bilan, uni ThemeProvider yoqadi. SSR bilan ham ishlaydi. Hujjatlar bu yerda; interaktiv tekshiruv Storybook’da. date, phone, pdf, markdown, adapters — ixtiyoriy entry.
    link: /uz/guide/installation
    linkText: O‘rnatish
    icon:
      src: /icons/features/layout.svg
      alt: ''
      width: 26
      height: 26

  - title: Asosiy imkoniyatlar
    details: Maydonlar, overlaylar, layout qobig‘i. Komponentlarning o‘z uslubi yo‘q — ko‘rinishni tokenlarga asoslangan skinlar beradi, yorug‘ va qorong‘i sxema bilan. Hooklar va react-hook-form adapterlari. Regressiyalar Storybook’da tekshiriladi.
    link: /uz/guide/design-system/
    linkText: Dizayn tizimi
    icon:
      src: /icons/features/spark.svg
      alt: ''
      width: 26
      height: 26
---

## Kutubxona haqida

**V-Lab UI Kit** — React komponentlari kutubxonasi: formalarda, overlaylarda, jadvallarda, layoutda ishlatiladi. Komponentlarning o‘z CSS’i yo‘q: ular barqaror `vl-*` klasslari va data-atributlarni chiqaradi, ko‘rinishni esa dizayn tokenlariga asoslangan skin beradi — hozircha bu yorug‘ va qorong‘i sxemali **corporate** (ulash — [O‘rnatish](/uz/guide/installation) sahifasida). Skinning `:where(…)` prefiksi selektorlarga og‘irlik qo‘shmaydi, shuning uchun skin stillarini ilovada oson qayta belgilash mumkin. Hujjatlar ushbu saytda; interaktiv ko‘rib chiqish Storybook’da. Barqaror relizgacha ochiq API va matnlar **beta** rejimida o‘zgarishi mumkin.

::: tip Saytni yig‘ish

VitePress statik build: **`npm run docs:build`**. Natija — **`docs-site/.vitepress/dist`** (har qanday statik hosting yoki CDN orqali beriladi).

:::
