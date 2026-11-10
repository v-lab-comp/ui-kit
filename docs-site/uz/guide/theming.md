---
title: Mavzulash
description: Uslubsiz komponentlar va skinlar — skinni ulash, ThemeProvider, yorug‘ va qorong‘i sxema, SSR, uslublarni qayta belgilash, tokenlar va o‘z skiningiz.
---

# Mavzulash

**V-Lab UI Kit** komponentlarida o‘z CSS i yo‘q. Butun tashqi ko‘rinishni **skin** beradi — `<html>` dagi atribut bilan yoqiladigan uslublar to‘plami. Quyida: skinni qanday ulash va sxemani almashtirish, mavzuni serverda qanday render qilish, komponentlarni mahsulotingizga moslab qanday qayta bo‘yash va o‘z skiningizni qanday yozish.

## Uslubsiz komponentlar va skinlar

- **Komponent** faqat barqaror `vl-<name>` sinfini, `vl-<name>__<part>` qism sinflarini va o‘z **kontrakti**dagi data-atributlarni chiqaradi. Hash qilingan sinflar ham, JS ichidagi CSS ham yo‘q.
- **Skin** shu sinf va atributlarni uslublaydi. Paketda bitta skin bor — **`corporate`** (kitning avvalgi tashqi ko‘rinishi). Skin ikki fayl bilan nashr qilinadi: `@v-lab/ui-kit/skins/corporate.css` — uning CSS i, `@v-lab/ui-kit/skins/corporate` — `corporateSkin` manifesti. Ilova bandliga faqat u import qilgan skinlar tushadi.
- Ikki mustaqil o‘q: **skin** (shakl, o‘lchamlar, shriftlar, palitra) va **rang sxemasi** (`light` / `dark`). Har bir skin ikkala sxemani qo‘llab-quvvatlaydi.
- Skin `<html>` dagi `data-vl-skin` atributi bilan yoqiladi. Usiz komponentlar uslubsiz qoladi — «unstyled» degani shu.

Skin nimani oladi — tugma misolida:

```tsx
<Button size="small">Saqlash</Button>
```

```html
<button
  class="vl-button"
  data-variant="filled"
  data-color="primary"
  data-size="small"
  data-shape="rounded"
>
  Saqlash
</button>
```

## ThemeProvider orqali ulash

```tsx
import '@v-lab/ui-kit/skins/corporate.css' // birinchi bo‘lib, ilova uslublaridan oldin
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

root.render(
  <ThemeProvider skins={[corporateSkin]} defaultColorScheme="system" storageKey="app-theme">
    <App />
  </ThemeProvider>
)
```

Ikkala import ham kerak. `@v-lab/ui-kit/skins/corporate` — faqat manifest (skin nomi va sxemalari), u CSS ulamaydi. Uslublar `@v-lab/ui-kit/skins/corporate.css` dan keladi. Uni o‘z uslublaringizdan **oldin** ulang: xuddi shu selektordagi qoidalaringiz skin qoidalari bilan bir xil og‘irlikda va tartib bo‘yicha g‘olib chiqadi ([Uslublarni qayta belgilash](#overriding-styles) ga qarang).

### `ThemeProvider` proplari

| Prop                  | Tur                                       | Standart        | Vazifasi                                                        |
| --------------------- | ----------------------------------------- | --------------- | --------------------------------------------------------------- |
| `skins`               | `readonly Skin[]` (**majburiy**)          | —               | Mavjud skinlar; birinchisi — standart skin. Bo‘sh massiv — xato |
| `skin`                | `skins` dagilardan birining nomi          | —               | Controlled: faol skin                                           |
| `defaultSkin`         | `skins` dagilardan birining nomi          | `skins[0].name` | Uncontrolled: boshlang‘ich skin                                 |
| `onSkinChange`        | `(name) => void`                          | —               | `setSkin` dan chaqiriladi                                       |
| `colorScheme`         | `'light' \| 'dark' \| 'system'`           | —               | Controlled: sxema                                               |
| `defaultColorScheme`  | `'light' \| 'dark' \| 'system'`           | `'light'`       | Uncontrolled: boshlang‘ich sxema                                |
| `onColorSchemeChange` | `(scheme: ColorSchemePreference) => void` | —               | `setColorScheme` dan chaqiriladi                                |
| `storageKey`          | `string`                                  | —               | Foydalanuvchi tanlovi eslab qolinadigan `localStorage` kaliti   |
| `children`            | `ReactNode`                               | —               | Ilova                                                           |

Qanday ishlaydi:

- **Controlled / uncontrolled.** `skin` (yoki `colorScheme`) berilsa, provayder qiymatni o‘zi o‘zgartirmaydi: `setSkin` / `setColorScheme` faqat `onSkinChange` / `onColorSchemeChange` ni chaqiradi, yangi qiymatni esa siz uzatasiz. Ular bo‘lmasa, `defaultSkin` / `defaultColorScheme` ishlaydi.
- **`storageKey`.** Tanlov `localStorage` da JSON `{ skin, colorScheme }` ko‘rinishida saqlanadi va keyingi ishga tushirishda `defaultSkin` / `defaultColorScheme` dan ustun turadi. Yozuv faqat skin ham, sxema ham uncontrolled bo‘lganda bajariladi.
- **`'system'`** `prefers-color-scheme` ga ergashadi va OT sozlamasi bilan birga, sahifani qayta yuklamasdan almashadi.
- **`load` li skin** (dangasa CSS, [quyiga](#define-skin) qarang) faqat uning zanjiridagi barcha skinlarning `load()` lari bajarilgandan keyin qo‘llanadi; ungacha yangi skin atributlari `<html>` ga qo‘yilmaydi.

Provayder `<html>` ga nimalarni qo‘yadi:

| Atribut / xossa  | Qiymat                                                                              |
| ---------------- | ----------------------------------------------------------------------------------- |
| `data-vl-skin`   | `extends` zanjiri bo‘sh joy bilan: `corporate`, voris skin uchun `corporate brand`  |
| `data-vl-scheme` | Haqiqiy sxema: `light` yoki `dark`                                                  |
| `data-theme`     | `data-vl-scheme` bilan bir xil — o‘tish davri aliasi, unga tayanmang                |
| `color-scheme`   | Inline uslub `color-scheme: light \| dark` — nativ kontrollar va skrollbarlar uchun |

Atributlar aynan `<html>` da, shunda mavzu portallarga ham yetib boradi: modallar, toastlar va ochiladigan ro‘yxatlar `body` ga render qilinadi. Unmount bo‘lganda provayder `<html>` ga avvalgi qiymatlarni qaytaradi.

### `useTheme()`

Hook faqat `ThemeProvider` ichida ishlaydi (tashqarida xato tashlaydi) va quyidagini qaytaradi:

| Maydon                | Tur                                       | Vazifasi                                                 |
| --------------------- | ----------------------------------------- | -------------------------------------------------------- |
| `skin`                | `string`                                  | Faol skin nomi                                           |
| `setSkin`             | `(name: string) => void`                  | Skinni almashtirish; `skins` da yo‘q nom — xato          |
| `skins`               | `string[]`                                | Mavjud skinlar nomlari                                   |
| `colorScheme`         | `'light' \| 'dark' \| 'system'`           | Foydalanuvchi tanlovi                                    |
| `resolvedColorScheme` | `'light' \| 'dark'`                       | Tizim sozlamasi hisobga olingandan keyingi haqiqiy sxema |
| `setColorScheme`      | `(scheme: ColorSchemePreference) => void` | Sxemani almashtirish                                     |

Yorug‘ / qorong‘i / tizim sxemasi almashtirgichi:

```tsx
import { Button, useTheme, type ColorSchemePreference } from '@v-lab/ui-kit'

const SCHEMES: { value: ColorSchemePreference; label: string }[] = [
  { value: 'light', label: 'Yorug‘' },
  { value: 'dark', label: 'Qorong‘i' },
  { value: 'system', label: 'Tizimdagidek' },
]

export function ColorSchemeSwitcher() {
  const { colorScheme, resolvedColorScheme, setColorScheme } = useTheme()

  return (
    <div>
      {SCHEMES.map(({ value, label }) => (
        <Button
          key={value}
          size="small"
          color="neutral"
          variant={colorScheme === value ? 'filled' : 'stroke'}
          onClick={() => setColorScheme(value)}
        >
          {label}
        </Button>
      ))}
      <span>Hozir: {resolvedColorScheme}</span>
    </div>
  )
}
```

## React provayderisiz

Provayder faqat atributlarni qo‘yadi — ularni o‘zingiz ham berishingiz mumkin (statik sahifa, React bo‘lmagan ilova):

```html
<html data-vl-skin="corporate" data-vl-scheme="dark" style="color-scheme: dark"></html>
```

- `data-vl-skin` majburiy: usiz skin qo‘llanmaydi. Voris skin uchun — butun zanjir: `data-vl-skin="corporate brand"`.
- `data-vl-scheme="dark"` qorong‘i sxemani yoqadi; atribut bo‘lmasa (yoki `light` bo‘lsa) — yorug‘.
- Skin CSS i xuddi shunday ulanadi: `@v-lab/ui-kit/skins/corporate.css`.

JS dan almashtirish:

```ts
const root = document.documentElement
root.dataset.vlSkin = 'corporate'
root.dataset.vlScheme = 'dark' // yoki 'light'
root.style.colorScheme = 'dark'
```

Provaydersiz `useTheme()` mavjud emas — bunday holda sxemani atributlar orqali almashtiring.

## Ichki konteynerlar: `data-theme`

Sahifaning bir qismini boshqa sxemada ko‘rsatish uchun konteynerga `data-theme="dark"` qo‘ying (yoki qorong‘i sahifa ichida `data-theme="light"`):

```tsx
<section className="promo" data-theme="dark">
  <Button>Qorong‘i blokdagi tugma</Button>
</section>
```

- Faqat `data-vl-skin` li element ichida ishlaydi: skin `[data-theme='light' | 'dark']` ostidagi daraxt uchun tokenlarni qayta belgilaydi.
- Atribut faqat tokenlarni o‘zgartiradi. Konteynerning o‘z foni va matn rangini tokenlar bilan bering: `background: var(--bg-white-0); color: var(--text-strong-950)`.
- Portallar (modallar, toastlar, ochiladigan ro‘yxatlar) `body` ga render qilinadi va sxemani konteynerdan emas, `<html>` dan oladi.
- Nativ kontrollar va skrollbarlar CSS `color-scheme` xossasiga ergashadi, provayder esa uni faqat `<html>` ga qo‘yadi. Konteyner uchun uni o‘zingiz qo‘shing: `[data-theme='dark'] { color-scheme: dark; }`.

## Sahifada bir nechta provayder

Bitta sahifada bir nechta `ThemeProvider` qo‘llab-quvvatlanadi: masalan, bir nechta React-ildiz yoki ilova ichida o‘z provayderiga ega vidjet.

- Barcha provayderlar bitta `<html>` ga yozadi, va **oxirgi qo‘llangani** amal qiladi — keyinroq mount bo‘lgani yoki skini yoki sxemasi oxirgi bo‘lib o‘zgargani.
- Provayder unmount bo‘lganda `<html>` ga keyingi tirik provayderning holati qaytadi. `<html>` ning dastlabki atributlari faqat oxirgi provayder unmount bo‘lganda tiklanadi.
- Har bir provayderning o‘z holati bor: `useTheme()` eng yaqin provayderning qiymatlarini qaytaradi, biridagi `setColorScheme` boshqasining sxemasini o‘zgartirmaydi. Agar provayderlar bir xil narsani ko‘rsatishi kerak bo‘lsa, ularga controlled `skin` / `colorScheme` proplari orqali bir xil qiymatlarni bering.

## SSR

Kit serverda render qilinadi (`renderToString`), lekin `ThemeProvider` atributlarni `<html>` ga faqat klientdagi effektda qo‘yadi. Server HTML ida atributlar bo‘lmasa, sahifa gidratsiyagacha uslubsiz qoladi. Shuning uchun ularni server `<html>` ida `@v-lab/ui-kit` dagi `themeHtmlAttributes(skin, scheme = 'light')` yordamchisi bilan render qiling:

```tsx
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

themeHtmlAttributes(corporateSkin, 'light')
// {
//   'data-vl-skin': 'corporate',
//   'data-vl-scheme': 'light',
//   'data-theme': 'light',
//   style: { colorScheme: 'light' },
// }
```

Bu aynan provayder qo‘yadigan atributlar (u ularni xuddi shu yordamchi orqali yozadi). Voris skin uchun `data-vl-skin` — butun zanjir: `themeHtmlAttributes(brandSkin)` → `'corporate brand'`. Gidratsiyadan keyin provayder atributlarni joriy qiymatlar bilan qayta yozadi. Qiymatlar — oddiy satrlar, ularni qo‘lda ham yozish mumkin: `<html data-vl-skin="corporate" data-vl-scheme="light" data-theme="light" style="color-scheme: light">`.

### Next.js App Router

Yig‘ilgan paketda hozircha `'use client'` direktivalari yo‘q. App Router server komponentlari hook va kontekstdan foydalana olmaydi, shuning uchun kit komponentlarini to‘g‘ridan-to‘g‘ri emas, `'use client'` li o‘z faylingiz orqali nomli reeksport bilan import qiling (`'use client'` li faylda `export *` ni Next.js qo‘llab-quvvatlamaydi):

```ts
// app/ui-kit.ts
'use client'
export { Button, SelectInput, useTheme } from '@v-lab/ui-kit'
```

Provayder ham klient faylida. `load` li skin — bu funksiya, funksiyalarni esa server komponentidan klient komponentiga prop sifatida uzatib bo‘lmaydi:

```tsx
// app/providers.tsx
'use client'
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider skins={[corporateSkin]}>{children}</ThemeProvider>
}
```

```tsx
// app/layout.tsx — server komponenti
import '@v-lab/ui-kit/skins/corporate.css'
import './globals.css'
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" {...themeHtmlAttributes(corporateSkin, 'light')}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

Direktivalar yig‘ilmaga qo‘shilgach, oraliq fayl kerak bo‘lmaydi. Vazifa repozitoriyda tasvirlangan: `docs/tech-debt/use-client-directive.md`.

### `storageKey` va `'system'` bilan birinchi kadr

Server `localStorage` ni ham, OT sozlamasini ham ko‘rmaydi. Shuning uchun server HTML i siz `themeHtmlAttributes` ga bergan sxemada keladi (odatda `light`), saqlangan yoki tizimdagi qorong‘i sxemani esa provayder faqat gidratsiyadan keyin yoqadi — qorong‘i sxemali foydalanuvchida sahifa bir lahza yorug‘ bo‘lib miltillaydi. Bu ma’lum cheklov; yechim variantlari (birinchi chizishdan oldin sxemani qo‘yadigan `<head>` dagi inline-skript yoki cookie) `docs/tech-debt/ssr-color-scheme-flash.md` da ko‘rib chiqilgan.

- Agar foydalanuvchi tanlovi server ko‘radigan joyda saqlansa (masalan, cookie da), uni ham `themeHtmlAttributes` ga, ham provayderga controlled `colorScheme` propi orqali bering — shunda birinchi kadr darhol kerakli sxemada bo‘ladi.
- Shu sababli `colorScheme` / `resolvedColorScheme` ga bog‘liq belgilash (masalan, yuqoridagi almashtirgich) server belgilashiga mos kelmasligi mumkin: provayder `localStorage` va tizim sozlamasini birinchi klient renderidayoq o‘qiydi. Bunday UI ni mount dan keyin ko‘rsating.

## Uslublarni qayta belgilash {#overriding-styles}

### `vl-*` sinflari

Skin CSS ida komponentning barcha qoidalari bitta `:where([data-vl-skin~='corporate']) { … }` blokida turadi, yig‘ilgan `skins/corporate.css` da esa har bir qoida `:where([data-vl-skin~='corporate']) .vl-button` ko‘rinishida bo‘ladi. `:where(...)` prefiksining **specificity si nolga teng**, shuning uchun skin qoidasining og‘irligi uning ichki selektoriga teng: `.vl-button` da — bitta sinf. Agar CSS ingiz skin CSS idan **keyin** ulangan bo‘lsa, xuddi shu selektor (yoki shu og‘irlikdagi sinfingiz) g‘olib chiqadi:

```css
/* app.css — @v-lab/ui-kit/skins/corporate.css dan keyin ulangan */
.vl-button {
  font-weight: 600;
}

.checkout-button {
  min-width: 160px;
}
```

```tsx
<Button className="checkout-button">To‘lash</Button>
```

Skindagi variant qoidalari ildiz bilan bir xil og‘irlikda: ulardagi ildiz `:where()` ga o‘ralgan, va `:where(.vl-button)[data-shape='circle']` — bitta atribut. Shuning uchun keyinroq ulangan `.vl-button` dagi qoidangiz shu xossa uchun ularni ham yengadi.

Psevdo-sinfli qoidalar og‘irroq: masalan, `filled` dagi hover — `:where(.vl-button)[data-variant='filled']:hover:not(:disabled)`. Bunday qoidani yengish uchun o‘sha data-atributlar va psevdo-sinflarni takrorlang:

```css
.checkout-button[data-variant='filled']:hover:not(:disabled) {
  background-color: var(--primary-darker);
}
```

Har bir komponentning atributlari, qismlari va holatlari uning kontraktida tasvirlangan — [Kontraktlar](#contracts) ga qarang.

### CSS o‘zgaruvchilari (tokenlar)

Komponentlar ranglar, radiuslar va soyalarni tokenlardan (`var(--…)`) o‘qiydi, shuning uchun ular orqali qayta bo‘yash qulayroq. Global — `:root` da, skin CSS idan keyingi CSS da:

```css
/* app.css — @v-lab/ui-kit/skins/corporate.css dan keyin ulangan */
:root {
  --primary-base: var(--purple-500);
  --primary-dark: var(--purple-800);
  --primary-darker: var(--purple-700);
  --primary-alpha-10: var(--purple-alpha-10);
  --primary-alpha-16: var(--purple-alpha-16);
}
```

Nega bu ikkala sxemada ishlaydi: yorug‘ tokenlarni skin `[data-vl-skin~='corporate']` da, qorong‘ilarini — `:where([data-vl-skin~='corporate'])[data-vl-scheme='dark']` da e’lon qiladi. Ikkala selektor bitta atributdek og‘irlikda, `:root` bilan bir xil, va keyinroq ulangan blokingiz g‘olib chiqadi.

`--primary-*` ikkala sxemada bir xil, shuning uchun bitta blok yetarli. Agar token sxemalar bo‘yicha farq qilsa (`--bg-*`, `--text-*`, `--stroke-*` va boshqalar), ikkala qiymatni bering — qorong‘i blok yorug‘idan keyin:

```css
/* yorug‘ sxema: <html> va ichki yorug‘ konteynerlar */
:root,
[data-theme='light'] {
  --bg-weak-50: var(--purple-50);
}

/* qorong‘i sxema: <html> va ichki qorong‘i konteynerlar */
[data-vl-scheme='dark'],
[data-theme='dark'] {
  --bg-weak-50: var(--purple-950);
}
```

Ichki `[data-theme]` konteynerlarida skin tokenlarni qaytadan e’lon qiladi, shuning uchun ular uchun bitta `:root` yetmaydi — selektorlardagi `[data-theme='…']` shundan. Ikkala sxemada bir xil tokenlar uchun `:root, [data-theme]` yetarli.

Lokal — istalgan konteynerda: qiymatlar daraxt bo‘ylab pastga meros qilinadi.

```css
.promo {
  --primary-base: var(--purple-500);
  --primary-dark: var(--purple-800);
}
```

Konteyner ichida primitivlarni (`--blue-500`) emas, **semantik** tokenlarni (`--primary-base`) qayta belgilang: semantik token e’lon qilingan joyda (`<html>` da) hisoblanadi, va konteyner ichida primitivni o‘zgartirish unga endi ta’sir qilmaydi.

Umumiy tokenlardan tashqari ba’zi komponentlarning o‘z o‘zgaruvchilari bor: masalan, tugma `var(--btn-radius, var(--radius-10))` ni o‘qiydi, kiritish maydonlarining o‘lchamlari esa `src/skins/corporate/components/base-input.variables.css` dagi `--base-input-*` o‘zgaruvchilari bilan berilgan. Tokenlarning to‘liq ro‘yxati — [Dizayn tizimi](/uz/guide/design-system/) bo‘limida, xususan [Semantik tokenlar](/uz/guide/design-system/semantic-tokens).

### `data-color` palitralari

Rang variantlari (`primary`, `neutral`, `error`, `information`, `warning`, `success`, `away`, `feature`, `verified`, `highlighted`, `stable`) `data-color` atributi bilan tanlanadi, palitra esa `--pal-base`, `--pal-hover`, `--pal-active`, `--pal-bg-hover`, `--pal-bg-active` o‘zgaruvchilarini o‘rnatadi. Bu skin ichidagi istalgan elementda ishlaydi, jumladan sizning elementingizda ham:

```tsx
<div className="note" data-color="warning">
  Rekvizitlarni tekshiring
</div>
```

```css
.note {
  border-left: 2px solid var(--pal-base);
  background: var(--pal-bg-hover);
}
```

Ixtiyoriy rangdagi bitta tugma uchun `customColor` propi (hex) bor: u `--pal-*` ni inline beradi va `data-color` ni olib tashlaydi.

## O‘z skiningiz

Skin — bu CSS va manifest. O‘z skiningiz kit ichida yashashi shart emas: ilovada bu bazaviy skin CSS idan keyin ulanadigan oddiy CSS fayli va `defineSkin` manifesti. Eng oson boshlash — `corporate` vorisi: u bazaviy skinning barcha uslublarini oladi va ustidan tokenlar hamda alohida qoidalarni qayta belgilaydi.

### Manifest: `defineSkin` {#define-skin}

```ts
// brand-skin.ts
import { defineSkin } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

export const brandSkin = defineSkin({
  name: 'brand',
  schemes: ['light', 'dark'],
  extends: corporateSkin,
  load: () => import('./brand.css'),
})
```

| Maydon    | Tur                      | Vazifasi                                                                              |
| --------- | ------------------------ | ------------------------------------------------------------------------------------- |
| `name`    | `string`                 | Skin nomi — `data-vl-skin` dagi va `[data-vl-skin~='<name>']` selektorlaridagi qiymat |
| `schemes` | `['light', 'dark']`      | Ikkala sxema majburiy                                                                 |
| `extends` | `Skin`                   | Bazaviy skin: uning uslublari qo‘llanadi, bu skin esa ustidan qayta belgilaydi        |
| `load`    | `() => Promise<unknown>` | Skin CSS ini dangasa yuklash; provayder skinni faqat undan keyin qo‘llaydi            |

```tsx
import '@v-lab/ui-kit/skins/corporate.css'
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { brandSkin } from './brand-skin'

root.render(
  <ThemeProvider skins={[corporateSkin, brandSkin]} defaultSkin="brand" storageKey="app-theme">
    <App />
  </ThemeProvider>
)
```

- **`extends` va zanjir.** Provayder `extends` zanjirini yoyadi (`skinChain(brandSkin)` → `[corporateSkin, brandSkin]`) va `data-vl-skin="corporate brand"` ni qo‘yadi. `skins` dagi `corporateSkin` faqat unga almashish mumkin bo‘lishi uchun kerak: zanjir uchun provayder bazaviy skinni `extends` dan oladi.
- **Nega `~=`.** `[data-vl-skin~='corporate']` selektori bo‘sh joy bilan ajratilgan ro‘yxatdagi butun so‘z bilan mos keladi, shuning uchun `data-vl-skin="corporate brand"` da `corporate` qoidalari ham, `brand` qoidalari ham ishlaydi. `=` bilan bazaviy skin qoidalari vorisda o‘chib qolardi.
- **`load`.** Provayder zanjirdagi `load` i bor har bir skinda `load()` ni chaqiradi va ularning barchasi bajarilgandan keyin skinni qo‘llaydi. `corporateSkin` da `load` yo‘q — uning CSS i oddiy import bilan ulanadi. `load` siz voris CSS ini ham statik ulash mumkin — `@v-lab/ui-kit/skins/corporate.css` dan keyin.

`extends` siz skin siz foydalanadigan barcha komponentlarni o‘zi uslublashi va o‘z tokenlarini e’lon qilishi kerak. `corporate` qoidalari va tokenlari unga ta’sir qilmaydi: ular `[data-vl-skin~='corporate']` bilan cheklangan.

### Skin CSS i

Komponent qoidalari skin prefiksi bilan **bitta** blokda, nativ CSS ichma-ichligi (nesting) bilan yoziladi. Tokenlar — alohida, aniq selektorlar bilan: ichki qoida skinli elementning avlodlarini tanlaydi, tokenlar esa `<html>` ning o‘zida va ichki `[data-theme]` konteynerlarida e’lon qilinadi.

`brand.css`:

```css
/* Tokenlar: yorug‘ sxema + ichki yorug‘ konteynerlar */
[data-vl-skin~='brand'],
:where([data-vl-skin~='brand']) [data-theme='light'] {
  --primary-base: var(--purple-500);
  --primary-dark: var(--purple-800);
  --primary-darker: var(--purple-700);
  --primary-alpha-10: var(--purple-alpha-10);
  --primary-alpha-16: var(--purple-alpha-16);
}

/* Tokenlar: qorong‘i sxema + ichki qorong‘i konteynerlar */
:where([data-vl-skin~='brand'])[data-vl-scheme='dark'],
:where([data-vl-skin~='brand'])[data-theme='dark'],
:where([data-vl-skin~='brand']) [data-theme='dark'] {
  --primary-base: var(--purple-400);
}

/* Komponentlar: bitta blok; ichida — ildiz, variant, qism, holat */
:where([data-vl-skin~='brand']) {
  .vl-button {
    font-weight: 600;
  }

  :where(.vl-button)[data-variant='ghost'] {
    color: var(--text-strong-950);
  }

  .vl-modal__panel {
    border-radius: var(--radius-24);
  }

  :where(.vl-tabs__tab)[data-active] {
    color: var(--primary-base);
    animation: vl-brand-tab-in var(--motion-duration-fast) var(--motion-ease-standard);
  }

  @media (prefers-reduced-motion: reduce) {
    :where(.vl-tabs__tab)[data-active] {
      animation: none;
    }
  }
}

/* @keyframes — blokdan tashqarida: qoida ichida ularga ruxsat yo‘q */
@keyframes vl-brand-tab-in {
  from {
    opacity: 0.6;
  }
}
```

Qoidalar:

- **Faylga bitta `:where([data-vl-skin~='<name>']) { … }` bloki.** Prefiks bir marta yoziladi va og‘irlik qo‘shmaydi: blok ichidagi `.vl-button` qoidasi bitta sinfdek og‘irlikda. Yig‘ilma ichma-ichlikni `:where([data-vl-skin~='brand']) .vl-button` ko‘rinishiga yoyadi. Kitda buni Vite (esbuild) qiladi; o‘z loyihangizda ichma-ichlikni bandleringiz yoyishiga yoki maqsadli brauzerlar uni qo‘llab-quvvatlashiga ishonch hosil qiling. Ichma-ichliksiz xuddi shu narsa har bir qoidadagi prefiks bilan yoziladi: `:where([data-vl-skin~='brand']) .vl-button { … }`.
- **Blok ichidagi selektorlar:** ildiz — `.vl-<name>`, qism — `.vl-<name>__<part>`, variant — `[data-<attr>='<value>']`, mantiqiy holat — `[data-<state>]`. Variant qoidasi bitta atributdek og‘irlikda bo‘lishi uchun (`corporate` da shunday), ildiz `:where()` ga o‘raladi: `:where(.vl-button)[data-variant='ghost']`.
- **Nativ holatlar** kontraktda takrorlanmaydi: `:disabled`, `:focus-visible`, `[aria-expanded]` va hokazolardan foydalaning.
- **Ranglar va o‘lchamlar** — semantik tokenlar orqali: shunda qorong‘i sxema alohida qoidalarsiz ishlaydi.
- **Tokenlar** — misoldagidek aniq selektorlar bilan: yorug‘lari — `[data-vl-skin~='<name>']` va `:where([data-vl-skin~='<name>']) [data-theme='light']` da, qorong‘ilari — `:where(...)` li uchta tarmoqda. Hammasi bitta atributdek og‘irlikda, shuning uchun qorong‘i blok yorug‘ini tartib bo‘yicha yengadi, skindan keyin ulangan ilova CSS idagi `:root` esa ikkalasini ham.
- **`@keyframes`** — blokdan tashqarida; boshqa animatsiyalar bilan to‘qnashmasligi uchun nomiga skin prefiksini qo‘shing.
- **Tartib.** Voris qoidalari bazaviy skin qoidalari bilan bir xil og‘irlikda va tartib bo‘yicha g‘olib chiqadi: voris CSS i `@v-lab/ui-kit/skins/corporate.css` dan keyin kelishi kerak. Ildizdagi qoida (`.vl-button`) bazaviy skinning shu xossali variant qoidalarini ham yengadi (`:where(.vl-button)[data-shape='circle']`) — xossani bazaviy skin uni bergan darajada qayta belgilang.
- **Sxemalar bo‘yicha tokenlar.** Vorisning yorug‘ bloki bazaviy skinning qorong‘i blokidan keyin keladi va teng og‘irlikda uni yengadi. Agar voris bazaviy skinda qorong‘i sxemada farq qiladigan tokenni o‘zgartirsa (`--bg-*`, `--text-*`, `--stroke-*` va boshqalar), uni qorong‘i blokda ham bering.

Primitivlar (`--purple-500`, …) `corporate` skinida e’lon qilingan, shuning uchun voris ularga murojaat qila oladi.

### Kit ichidagi skin

Kit bilan birga nashr qilinadigan skin — `src/skins/<name>/` papkasi: `index.ts` (`defineSkin(...)` manifesti, `./index.css` ni import qiladi), `index.css` (skin fayllarini kaskad tartibida ulaydi), token fayllari va `components/*.css`. Yig‘ilma `index.ts` li har bir shunday papkani o‘zi topadi va `dist/skins/<name>.js` (manifest) hamda `dist/skins/<name>.css` (faqat shu skinning CSS i) ni yig‘adi. Paketda ular `@v-lab/ui-kit/skins/<name>` va `@v-lab/ui-kit/skins/<name>.css` sifatida mavjud; ilova kitning ikkinchi skinini `load: () => import('@v-lab/ui-kit/skins/<name>.css')` orqali dangasa yuklashi mumkin.

Skin yozish qoidalari repozitoriyda: `docs/architecture/theming.md`; `corporate` qanday tuzilgani (fayllar tartibi, tokenlar, palitralar, hover-oreol) — `src/skins/corporate/README.md`.

### Kontraktlar {#contracts}

Kontrakt — komponentning skinlar uchun ommaviy API si: nom (→ `vl-<name>` sinfi), sanab o‘tiladigan atributlar, mantiqiy holatlar va qismlar. Komponent proplari turlari kontraktdan chiqariladi, shuning uchun komponent va skinlar bir-biridan ajralib keta olmaydi. Tugma kontrakti (`src/theme/contracts/button.ts`):

```ts
import { COLOR_OPTIONS } from '@/types/colors'
import { defineContract } from '../contract'

export const buttonContract = defineContract({
  name: 'button',
  attributes: {
    variant: ['filled', 'stroke', 'lighter', 'ghost'],
    color: COLOR_OPTIONS,
    size: ['medium', 'small', 'x-small', '2x-small'],
    shape: ['rounded', 'circle', 'square'],
  },
  /** custom-color: цвет задан через `customColor` (инлайн `--pal-*`), `data-color` нет */
  states: ['custom-color'],
})
```

Skin undan nimani uslublaydi:

| Selektor                                                      | Qayerdan                             |
| ------------------------------------------------------------- | ------------------------------------ |
| `.vl-button`                                                  | `name: 'button'`                     |
| `[data-variant='filled' \| 'stroke' \| 'lighter' \| 'ghost']` | `attributes.variant`                 |
| `[data-color='primary' \| 'neutral' \| …]`                    | `attributes.color` (`COLOR_OPTIONS`) |
| `[data-size='medium' \| 'small' \| 'x-small' \| '2x-small']`  | `attributes.size`                    |
| `[data-shape='rounded' \| 'circle' \| 'square']`              | `attributes.shape`                   |
| `[data-custom-color]`                                         | `states: ['custom-color']`           |

`@v-lab/ui-kit` dagi yordamchilar kontraktdan selektor va sinflarni yig‘adi — testlar, `querySelector` va skinni tekshirish uchun:

```ts
import { buttonContract, contractPart, contractSelector, themeContracts } from '@v-lab/ui-kit'

contractSelector(buttonContract, { variant: 'ghost', size: 'small' })
// ".vl-button[data-variant='ghost'][data-size='small']"

contractSelector(buttonContract, { 'custom-color': true })
// ".vl-button[data-custom-color]"

contractPart(themeContracts.modal, 'panel')
// "vl-modal__panel"
```

`themeContracts` — barcha komponentlar kontraktlari reyestri (77 ta; kalitlar camelCase da: `button`, `modal`, `tabs`, …). U orqali skin barcha sinflar, atributlar va qismlarni qamrab olganini tekshirish qulay:

```ts
for (const contract of Object.values(themeContracts)) {
  console.log(contract.className, contract.attributes, contract.states ?? [], contract.parts ?? [])
}
```

Kontrakt qiymatlari turlar sifatida ham mavjud: `ContractValue<typeof buttonContract, 'size'>` → `'medium' | 'small' | 'x-small' | '2x-small'`.

Kontrakt barqaror: qiymatni o‘chirish yoki qayta nomlash — breaking change, qo‘shish — minor versiya.
