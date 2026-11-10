---
title: Ranglar
description: Primitivlar va semantik ranglar — Storybook Design System / Colors kabi.
---

# Ranglar

Tuzilma Storybook’da **Design System → Colors** sahifasi bilan mos (**Primitives And Semantics** hikoyasi).

## Preview

<DsPrimitivesPalette />

## Qavatlar

Ranglarni **corporate** skini beradi (`src/skins/corporate/`): komponentlarning o‘z uslubi yo‘q, o‘zgaruvchilar `[data-vl-skin~='corporate']` da e’lon qilingan va faqat skin yoqilganda ishlaydi.

1. **Primitivlar** (`src/skins/corporate/primitives.css`) — `neutral-*`, `blue-*` kabi paletalar, UI rollarisiz shkala.
2. **Semantik tokenlar** (`src/skins/corporate/tokens.css`) — **`--bg-*`**, **`--text-*`**, **`--primary-*`** kabi o‘zgaruvchilar; yorug‘ sxemada `var(...)` orqali primitivlarga bog‘lanadi.

Qorong‘i sxema — xuddi shu fayldagi alohida blok: o‘zgaruvchi nomlari bir xil, primitivlarga bog‘lanish boshqacha. U skin ildizida **`data-vl-scheme="dark"`** (uni `<html>` ga `ThemeProvider` qo‘yadi) yoki `data-theme="dark"` turganda, shuningdek `data-theme="dark"` li konteyner ichida ishlaydi ([Tokenlar](/uz/guide/design-system/semantic-tokens) ga qarang).

## Storybook’da nima ko‘rish kerak

To‘liq swatch panjarasi va mavzuni almashtirish — **Storybook → Design System → Colors**.

## Skin va ilova CSS ida

Sahifa/karta foni: `background: var(--bg-weak-50)`, asosiy matn: `color: var(--text-strong-950)`, aksent: `var(--primary-base)`, xatolar: tokenlardan **`--error-*`** palitrasi.

Variant palitralari — **`src/skins/corporate/palettes.css`**: `[data-color='<name>']` selektori `--pal-*` o‘zgaruvchilarini beradi (`--pal-base`, `--pal-hover`, `--pal-active`, `--pal-bg-hover`, `--pal-bg-active`). `data-color` atributini komponentlar (Button, Badge, Tag, Toast) `color` propidan o‘zlari qo‘yadi; o‘z belgilashingizda (skin ichida) palitra xuddi shu atribut bilan yoqiladi, masalan `<div data-color="success">`. Batafsil — [Mavzulash](/uz/guide/theming), repozitoriydagi `docs/architecture/styling.md` va [Tokenlar](/uz/guide/design-system/semantic-tokens).
