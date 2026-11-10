---
title: Ushbu hujjatlar haqida
description: Nima uchun bu sayt bor va Storybook hamda repozitoriydagi docs/ katalogidan qanday farq qiladi.
---

# Ushbu hujjatlar haqida

Kutubxona **uch qavatda** materiallar bilan chiqadi. Ajratmani esda tuting: ochiq yuz — **ushbu sayt** (VitePress); komponent ustida kundalik ish — **Storybook**; ichki qaydlar — **git’dagi markdown**.

Hujjatlar **uch tilda**: ruscha (sayt ildizi), inglizcha (**`/en/`**) va o‘zbekcha (**`/uz/`**). Tilni VitePress navbaridagi menyudan tanlang.

## Ushbu sayt (VitePress)

**Maqsad:** `@v-lab/ui-kit` ni mahsulotlarga **ulab** qo‘yadigan jamoalar uchun yagona kirish nuqtasi.

Mijozga kerak bo‘lgan narsalar:

- Paketni [o‘rnatish](/uz/guide/installation), skin CSS i va `ThemeProvider` ni ulash (yorug‘/qorong‘i sxema), SSR va Next.js, ixtiyoriy entry (`date`, `phone`, `pdf`, `markdown`, `adapters`).
- [Mavzulash](/uz/guide/theming): uslubsiz komponentlar va skinlar, uslub va tokenlarni qayta belgilash, o‘z skiningiz.
- Komponent sahifalari — **qisqa tavsif**, **importlar**, **bitta misol** va — bo‘lsa — **jonli preview**; Storybook’dagi har bir hikoyani takrorlamaymiz.
- [Dizayn tizimi](/uz/guide/design-system/): tokenlar, ranglar, radiuslar, soyalar, ikonkalar va bayroqlar — Storybook’dagi **Design System** ma’nosi bilan, lekin o‘qiladigan qo‘llanma shaklida.

Matn va tuzilma **rasmiy** mahsulot hujjatlari sifatida ulashish uchun mo‘ljallangan.

## Storybook

**Maqsad:** ui-kit ni **ishlab chiqish**, **barcha** variantlarni ko‘rish va regressiya tekshiruvlari uchun mahalliy muhit.

Repozitoriy ildizidan ishga tushirish: **`npm run storybook`** (batafsil: [Storybook](/uz/guide/storybook)).

Storybook oching, agar kerak bo‘lsa:

- o‘lcham va holatlar bo‘yicha to‘liq **galereyalar** (**Gallery/**);
- noyob prop kombinatsiyalari va **ichki** hikoyalar (saydbar qismlari, modallar, taqvim va hokazo);
- ma’lum hikoya uchun interaktiv boshqaruvlar bilan **Docs** paneli.

Bu sayt Storybook katalogini **almashtirmaydi**; har bir hikoyani birma‑bir ko‘chirishdan vos kechamiz.

## Repozitoriydagi hujjatlar

Git’dagi **`docs/`** papkasida kontur, mahsulot konteksti, chek-listlar va **maintainerlar** uchun chuqur qaydlar bor. Ular avtomatik ravishda VitePressga yig‘ilmaydi — [Repozitoriy hujjatlari](/uz/guide/repository-docs).

## Qayerga qarash

| Vazifa                                                           | Qayerda                                                                        |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Paket, peer’lar, stillar va skin                                 | [O‘rnatish](/uz/guide/installation)                                            |
| Yorug‘/qorong‘i sxema, uslublarni qayta belgilash, o‘z skiningiz | [Mavzulash](/uz/guide/theming)                                                 |
| Komponent tavsifi, import, bitta preview ssenariysi              | [Komponentlar](/uz/guide/components/)                                          |
| Tokenlar, palitra, ikonkalar                                     | [Dizayn tizimi](/uz/guide/design-system/)                                      |
| `react-hook-form` va `Controller` o‘ramlari                      | [RHF adapterlari](/uz/guide/adapters)                                          |
| Barcha UI variantlari bir joyda, galereyalar                     | Mahalliy Storybook — [ko‘rsatma](/uz/guide/storybook)                          |
| Ichki jamoa qo‘llanmalari                                        | [Repozitoriy](/uz/guide/repository-docs), repozitoriydagi **`docs/`** fayllari |
