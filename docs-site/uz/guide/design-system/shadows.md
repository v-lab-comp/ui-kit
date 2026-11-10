---
title: Soyalar
description: Semantik box-shadow tokenlari — Storybook Design System / Shadows kabi.
---

# Soyalar

Storybook’da **Design System → Shadows** bilan mos (**Gallery** hikoyasi).

## Preview

<DsShadowsGallery />

**`src/skins/corporate/shadows.css`** fayli corporate skiniga kiradi va skinning boshqa fayllari bilan birga **`src/skins/corporate/index.css`** da ulanadi. O‘zgaruvchilar skin ildizi `[data-vl-skin~='corporate']` da e’lon qilingan va qorong‘i sxemada qayta belgilanmaydi. Soyalar ma’noga ko‘ra guruhlangan:

- **Regular Shadow** — masalan `--shadow-regular-small`, `--shadow-dropdown`
- **Custom Shadow** — ko‘p qatlamli **`--shadow-small`**, **`--shadow-medium`**, **`--shadow-large`** va ichki variantlar
- **Colored Shadows** — tarkibiy rangli soyalar (`--shadow-colored-gray`, `--shadow-colored-primary`, …)
- **Card Shadow** — kartochka sirtlari uchun kerak bo‘lganda

Skin CSS ida va o‘z uslublaringizda **faqat shu o‘zgaruvchilardan** foydalaning (`box-shadow: var(--shadow-medium)`), ixtiyoriy qiymatlar emas — semantik soyalar bo‘yicha loyiha qoidalariga qarang.

Barcha bosqichlarning preview’i — Storybook **Design System → Shadows**.
