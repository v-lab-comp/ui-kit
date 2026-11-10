---
title: Semantik tokenlar
description: Fon, matn, chiziq va holatlar uchun nomlangan CSS o‘zgaruvchilari — Storybook Design System / Semantic Tokens kabi.
---

# Semantik tokenlar

Bo‘lim Storybook’da **Design System → Semantic Tokens** (**Tokens** hikoyasi) bilan mos — u yerda light va dark uchun swatch jadvali.

## Preview

<DsSemanticTokens />

## Tamoyil

**`--bg-strong-950`**, **`--text-sub-600`** kabi nomlar rangni bevosita bermaydi: ular **primitiv** ga ishora qiladi (`neutral-950`, `neutral-600` va hokazo). Bu Figma va **`src/colors/semantic.ts`** fayli (`semanticLight`, `semanticDark`) bilan sinxron — **`getPrimitiveHex`** orqali dasturiy ravishda hex olish mumkin.

## Guruhlar (qisqacha)

| Guruh      | O‘zgaruvchi prefiksi                                            | Vazifasi           |
| ---------- | --------------------------------------------------------------- | ------------------ |
| Primary    | `--primary-*`                                                   | Aksent brend ko‘ki |
| Background | `--bg-*`                                                        | Sirt fonlari       |
| Text       | `--text-*`                                                      | Matn ierarxiyasi   |
| Stroke     | `--stroke-*`                                                    | Chiziqlar          |
| Icon       | `--icon-*`                                                      | Ikonka ranglari    |
| Holatlar   | `--warning-*`, `--error-*`, `--success-*`, `--information-*`, … | Status semantikasi |

To‘liq nomlar ro‘yxati va swatchlar — **`src/skins/corporate/tokens.css`** va semantika bo‘yicha to‘liq ekran Storybook sahifasida.

## Qorong‘i mavzu

Sxemani **`ThemeProvider`** almashtiradi (`colorScheme` / `defaultColorScheme`: `'light'`, `'dark'` yoki `'system'`; ish vaqtida — `useTheme()` dagi `setColorScheme`). U `<html>` ga **`data-vl-scheme="dark"`** atributini qo‘yadi (sxemani `data-theme` da ham takrorlaydi) va `tokens.css` dagi qorong‘i blok qiymatlari ishlaydi — xuddi shu `--bg-*` / `--text-*` nomlari, boshqa qiymatlar. Provayder bo‘lmasa, `<html>` dagi `data-vl-skin="corporate"` yonida `data-vl-scheme="dark"` yoki `data-theme="dark"` xuddi shunday ishlaydi.

Sahifa ichidagi alohida konteyner uchun (masalan, yorug‘ fondagi qorong‘i blok) — shu konteynerga **`data-theme="dark"`** yoki **`data-theme="light"`** atributi. Portallar (Modal, Toast, ochiladigan ro‘yxatlar) `body` ga render qilinadi va konteyner emas, `<html>` sxemasiga ergashadi.

Qorong‘i blok selektorlari yorug‘ ildiz bilan bir xil og‘irlikda (0,1,0), shuning uchun skindan keyin ulangan CSS da `:root` da qayta belgilangan token hujjatning ikkala sxemasida ham ishlaydi — batafsil [Mavzulash](/uz/guide/theming) da.

SSR da sxema atributlarini server `<html>` i uchun `themeHtmlAttributes(skin, scheme)` beradi. `storageKey` yoki `'system'` dagi tanlovni server bilmaydi, shuning uchun gidratsiyagacha birinchi kadr yorug‘ — ma’lum cheklov (repozitoriydagi `docs/tech-debt/ssr-color-scheme-flash.md`).
