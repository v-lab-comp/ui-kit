# O‘rnatish

**`@v-lab/ui-kit`** paketining manba kodi GitHub’da: [v-lab-comp/ui-kit](https://github.com/v-lab-comp/ui-kit). Quyida minimal yo‘l; to‘liq ko‘rsatmalar repozitoriyda `docs/guides/installation.md` faylida.

## Paketlar reyestri

Paket chiqariladigan reyestr hali tanlanmagan. Tanlangach, bu yerda reyestr manzili va kirishni sozlash paydo bo‘ladi; qaror holati repozitoriyda: `docs/tech-debt/package-registry.md`.

Ungacha paketni faqat mahalliy arxivdan o‘rnating (quyida): `@v-lab/ui-kit` nomi bo‘yicha npm uni npmjs.com da qidiradi, kit esa u yerda chiqarilmagan.

## Bog‘liqliklarni o‘rnatish

Arxivni kit repozitoriysining klonida yig‘ing:

```bash
npm install
npm run build
npm pack
```

`npm pack` repozitoriy ildiziga yig‘ilgan `dist/` bilan `v-lab-ui-kit-<versiya>.tgz` arxivini qo‘yadi. Ilovada arxivni majburiy peer-paketlar bilan birga o‘rnating:

```bash
npm install /yo‘l/v-lab-ui-kit-<versiya>.tgz react react-dom @remixicon/react clsx @floating-ui/react
```

npm arxiv yo‘lini (`file:…`) ilovaning `package.json` fayliga yozadi. Kitni yangilash uchun yangi arxiv yig‘ing va uni xuddi shunday o‘rnating.

Asosiy kirish uchun majburiy peer-paketlar: **react** va **react-dom** (18.2+ yoki 19), **@remixicon/react**, **clsx**, **@floating-ui/react** (overlaylar, Select va pozitsiyalash).

Ixtiyoriy entry nuqtalari (`date`, `phone`, `pdf`, `markdown`, `adapters`) qo‘shimcha peer-bog‘liqliklarni talab qiladi — paket `package.json` faylidagi eksportlar va `peerDependencies` ga qarang. **`adapters`** va **`react-hook-form`** uchun: [React Hook Form adapterlari](/uz/guide/adapters).

## Uslublar

Skin CSS ni o‘z stillaringizdan **oldin** ulang va ilovani `ThemeProvider` ga o‘rang:

```tsx
import '@v-lab/ui-kit/skins/corporate.css'
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

root.render(
  <ThemeProvider skins={[corporateSkin]} defaultColorScheme="system">
    <App />
  </ThemeProvider>
)
```

Komponentlarning o‘z uslubi yo‘q — uni skin beradi. `@v-lab/ui-kit/skins/corporate.css` — **corporate** skinining stillari (tokenlar, palitralar va barcha komponentlar), `@v-lab/ui-kit/skins/corporate` — uning manifesti `corporateSkin`. `ThemeProvider` skinni yoqadi (`<html>` ga `data-vl-skin` va `data-vl-scheme` qo‘yadi) va yorug‘/qorong‘i sxemani almashtiradi (`useTheme`). Provayder bo‘lmasa, `<html>` dagi atributlar yetarli:

```html
<html data-vl-skin="corporate" data-vl-scheme="light"></html>
```

Qorong‘i sxema — `data-vl-scheme="dark"`. Skin CSS i yoki `data-vl-skin` bo‘lmasa, komponentlar uslubsiz qoladi.

Provayder proplari, sxemani almashtirish, uslublarni qayta belgilash va o‘z skiningiz — [Mavzulash](/uz/guide/theming) bo‘limida.

Kerak bo‘lsa **Google Sans** var shriftini (`@fontsource/google-sans`) qo‘shing — Storybook va repozitoriy qo‘llanmalariga qarang.

## Komponentlarni import qilish

```tsx
import { Button, TextInput } from '@v-lab/ui-kit'
```

Alohida entry nuqtalari: `@v-lab/ui-kit/date`, `phone`, `pdf`, `adapters` va boshqalar. **`adapters`** haqida qisqacha: [React Hook Form adapterlari](/uz/guide/adapters).

## SSR va Next.js {#ssr}

Kit komponentlari serverda render qilinadi (SSR). `ThemeProvider` `<html>` atributlarini faqat klientdagi effektda qo‘yadi, shuning uchun SSR da ularni serverdagi `<html>` ga o‘zingiz render qiling — `@v-lab/ui-kit` dagi `themeHtmlAttributes(skin, scheme = 'light')` yordamchisi bilan. U provayder qo‘yadigan atributlarning aynan o‘zini qaytaradi: `data-vl-skin`, `data-vl-scheme`, `data-theme` va `style.colorScheme`. Shunda skin stillari birinchi kadrdanoq, gidratsiyadan oldin ishlaydi.

**Next.js App Router** uchun misol:

```tsx
// app/ui-kit.ts
'use client'
export * from '@v-lab/ui-kit'
```

```tsx
// app/layout.tsx — server komponenti
import type { ReactNode } from 'react'
import '@v-lab/ui-kit/skins/corporate.css'
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { ThemeProvider } from './ui-kit'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz" {...themeHtmlAttributes(corporateSkin, 'light')}>
      <body>
        <ThemeProvider skins={[corporateSkin]}>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

- **`'use client'`.** Yig‘ilgan paketda hozircha `'use client'` direktivalari yo‘q, shuning uchun App Router da kit komponentlarini to‘g‘ridan-to‘g‘ri `@v-lab/ui-kit` dan emas, `'use client'` li o‘z faylingizdan import qiling (yuqorida — `app/ui-kit.ts`); sub-entry uchun ham xuddi shunday fayl, masalan `export * from '@v-lab/ui-kit/pdf'`. `themeHtmlAttributes` va `corporateSkin` — oddiy funksiya va obyekt: ularni paketdan to‘g‘ridan-to‘g‘ri import qiling — `'use client'` fayli orqali olingan funksiyani serverda chaqirib bo‘lmaydi. `load` li (funksiyali) skinni server komponentidan `ThemeProvider` ga uzatib bo‘lmaydi — bunda provayderni o‘z klient komponentingizga chiqaring. Vazifa repozitoriyning texnik qarzida qayd etilgan: `docs/tech-debt/use-client-directive.md`.
- **Saqlangan yoki tizim sxemasi.** Server `localStorage` ni ham, OS sozlamasini ham ko‘rmaydi, shuning uchun `storageKey` yoki `defaultColorScheme="system"` bilan birinchi kadr yorug‘ bo‘ladi, kerakli sxema esa gidratsiyadan keyin qo‘yiladi (`docs/tech-debt/ssr-color-scheme-flash.md`).
- **`PdfPreview`** (`@v-lab/ui-kit/pdf`) SSR da ishlaydi: `react-pdf` dangasa, faqat brauzerda yuklanadi. Agar ilova `pdfjs.GlobalWorkerOptions.workerSrc` ni allaqachon bergan bo‘lsa, u saqlanadi; aks holda unpkg dagi worker URL ishlatiladi (`getPdfWorkerUrl`).

Provaydersiz atributlar va sxemalar haqida batafsil — [Mavzulash](/uz/guide/theming) bo‘limida.
