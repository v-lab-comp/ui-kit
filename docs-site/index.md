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
      link: /guide/installation
    - theme: alt
      text: Components
      link: /guide/components/
    - theme: alt
      text: Storybook
      link: /guide/storybook

features:
  - title: Назначение
    details: Компоненты и токены для продуктов V-Lab. Единый стиль интерфейса и сокращение сроков разработки типовых экранов.
    link: /guide/components/
    linkText: Компоненты
    icon:
      src: /icons/features/docs.svg
      alt: ''
      width: 26
      height: 26

  - title: Подключение
    details: CSS скина — одним импортом, включает его ThemeProvider. Работает и с SSR. Документация здесь; интерактив — в Storybook. Входы date, phone, pdf, markdown и adapters — опционально.
    link: /guide/installation
    linkText: Установка
    icon:
      src: /icons/features/layout.svg
      alt: ''
      width: 26
      height: 26

  - title: Ключевые возможности
    details: Элементы ввода, оверлеи, каркас layout. Компоненты без собственных стилей — оформление дают скины на токенах, со светлой и тёмной схемой. Хуки и адаптеры react-hook-form. Регрессии проверяются в Storybook.
    link: /guide/design-system/
    linkText: Дизайн-система
    icon:
      src: /icons/features/spark.svg
      alt: ''
      width: 26
      height: 26
---

## О библиотеке

**V-Lab UI Kit** — React-компоненты: формы, оверлеи, таблицы, layout. Компоненты не несут собственного CSS: они рендерят стабильные классы `vl-*` и data-атрибуты, а оформление даёт скин на дизайн-токенах — сейчас это **corporate** со светлой и тёмной схемой (подключение — в [Установке](/guide/installation)). Префикс скина `:where(…)` не добавляет селекторам веса, поэтому стили скина легко переопределить в приложении. Документация на этом сайте; интерактивная проверка — в Storybook. Публичный API и тексты документации могут меняться до выхода стабильного релиза (**beta**).

::: tip Сборка этого сайта

Статическая сборка VitePress: **`npm run docs:build`**. Результат — каталог **`docs-site/.vitepress/dist`** (его можно отдавать любым статическим хостингом или CDN).

:::
