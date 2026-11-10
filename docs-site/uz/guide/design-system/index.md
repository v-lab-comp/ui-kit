---
title: Dizayn tizimi
description: Tokenlar, ranglar, tipografika va V-Lab UI Kit vizual tili asoslari — Storybook’dagi tartib bilan bir xil.
---

# Dizayn tizimi

Bu yerda **asoslar** jamlangan — ma’nosi bo‘yicha Storybook’dagi **Design System** bo‘limiga mos: ranglar, semantik o‘zgaruvchilar, radiuslar, soyalar, ikonkalar va bayroqlar.

**Ranglar**, **Semantik tokenlar**, **Radiuslar** va **Soyalar** sahifalarida **`primitives.css`**, **`tokens.css`**, **`shadows.css`** (va TypeScript’dagi akslari) ma’lumotlariga asoslangan previewlar bor. **[Ikonkalar](/uz/guide/design-system/icons)** va **[Mamlakat bayroqlari](/uz/guide/design-system/flags)** galereyalari qidiruv bilan Storybook (**Design System → Icons / Country Flags**) bilan mos; to‘liq ekran ko‘rish uchun hali ham **`npm run storybook`** qulay.

Kit komponentlarining o‘z uslubi yo‘q — tokenlar va bezakni **corporate** skini beradi (`src/skins/corporate/`). Uning o‘zgaruvchilari skin ildizi `[data-vl-skin~='corporate']` da e’lon qilingan (yorug‘ sxema); qorong‘i sxema `<html>` dagi `data-vl-scheme="dark"` yoki `data-theme="dark"` atributi bilan, alohida konteyner uchun esa shu konteynerdagi `data-theme="dark"` / `data-theme="light"` bilan yoqiladi.

Skin fayllari repozitoriyda:

| Fayl                                                      | Vazifasi                                                                                                            |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `src/skins/corporate/index.ts`                            | `corporateSkin` manifesti (`defineSkin`); paketda — `@v-lab/ui-kit/skins/corporate`                                 |
| `src/skins/corporate/index.css`                           | Skinning barcha fayllarini kaskad tartibida ulaydi; paketda — `@v-lab/ui-kit/skins/corporate.css`                   |
| `src/skins/corporate/primitives.css`                      | Xom shkalalar (neytral, ko‘k va hokazo); `src/colors/primitives.ts` shundan generatsiya qilinadi                    |
| `src/skins/corporate/tokens.css`                          | Light / dark semantikasi: shrift, radiuslar, primary, fon, matn, chiziq, ikonkalar, holatlar, `--z-*`, `--motion-*` |
| `src/skins/corporate/shadows.css`                         | Semantik soyalar                                                                                                    |
| `src/skins/corporate/palettes.css`                        | `[data-color='…']` bo‘yicha variant palitralari (`--pal-*` o‘zgaruvchilari)                                         |
| `src/skins/corporate/halo.css`                            | Interaktiv tugmalarning hover-oreoli (`--halo-*` o‘zgaruvchilari)                                                   |
| `src/skins/corporate/components/*.css`                    | `vl-*` sinflari va kontrakt data-atributlari bo‘yicha komponent uslublari                                           |
| `src/skins/corporate/components/base-input.variables.css` | Kiritish maydonlarining balandligi, chekinishlari, chegarasi va radiuslari (`--base-input-*`)                       |
| `src/colors/semantic.ts`                                  | Token va primitivlarning mosligi (JS tomonda)                                                                       |

## Bo‘limlar (Storybook bilan)

| Storybook                           | Hujjat                                                               |
| ----------------------------------- | -------------------------------------------------------------------- |
| **Design System / Colors**          | [Ranglar](/uz/guide/design-system/colors) — primitivlar va semantika |
| **Design System / Semantic Tokens** | [Semantik tokenlar](/uz/guide/design-system/semantic-tokens)         |
| **Design System / Radius**          | [Radiuslar](/uz/guide/design-system/radius)                          |
| **Design System / Shadows**         | [Soyalar](/uz/guide/design-system/shadows)                           |
| **Design System / Icons**           | [Ikonkalar](/uz/guide/design-system/icons)                           |
| **Design System / Country Flags**   | [Mamlakat bayroqlari](/uz/guide/design-system/flags)                 |

Ilovada ulash: skin CSS i **`@v-lab/ui-kit/skins/corporate.css`** (birinchi, ilova uslublaridan oldin import qiling) va `@v-lab/ui-kit/skins/corporate` dagi `corporateSkin` bilan **`ThemeProvider`** — u `<html>` ga `data-vl-skin` va `data-vl-scheme` atributlarini qo‘yadi hamda yorug‘/qorong‘i sxemani almashtiradi. Provayder bo‘lmasa, `<html data-vl-skin="corporate" data-vl-scheme="light">` yetarli; SSR uchun xuddi shu atributlarni server `<html>` iga `@v-lab/ui-kit` dagi `themeHtmlAttributes(corporateSkin, 'light')` beradi ([O‘rnatish](/uz/guide/installation) va [Mavzulash](/uz/guide/theming) ga qarang).
