---
title: Changelog
description: '@v-lab/ui-kit versiyalari tarixi'
outline: deep
---

# O‘zgarishlar tarixi {changelog}

Bu paketni **ulayotgan** jamoalar uchun ommaviy changelog. Paketni **yurituvchi** jamoa uchun batafsil ichki o‘zgarishlar jurnali repozitoriydagi `docs/changes/` katalogida. Har bir user-visible o‘zgarishda ikkala joy ham to‘ldiriladi.

Format [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) ga asoslangan, versiyalar [Semantic Versioning](https://semver.org/spec/v2.0.0.html) bo‘yicha.

::: tip Oxirgi barqaror reliz
**0.15.0** — 2026-09-17 · Ommaviy API o‘zgarmadi: `PhoneInput` xulqi tuzatildi (mamlakat kodi bilan raqamni qo‘yish, tashqi `value` dan mamlakat, E.164 bo‘lmagan qiymatlar); bu reliz GitLab CI orqali chiqarilgan. **0.13.0 va 0.13.1 dan foydalanmang** (0.13.0 yig‘ilmaydi, 0.13.1 da oreol noto‘g‘ri qo‘llanadi).
:::

---

## [Unreleased]

### Added

- **`ThemeProvider` / `useTheme`** — skin va rang sxemasi (`light` / `dark` / `system`) ilova ildizida beriladi va hamma joyda, portallarda ham qo‘llanadi: provayder `<html>` ga `data-vl-skin`, `data-vl-scheme` va `color-scheme` qo‘yadi. Controlled va uncontrolled rejimlar bor, tanlovni eslab qolish mumkin (`storageKey`); bitta sahifada bir nechta provayder qo‘llab-quvvatlanadi — [Mavzulash](./theming).
- **`corporate` skini** — kitning avvalgi ko‘rinishi, endi alohida skin sifatida: stillar — `@v-lab/ui-kit/skins/corporate.css`, `corporateSkin` manifesti — `@v-lab/ui-kit/skins/corporate`. Har bir skinning CSS i o‘z fayliga yig‘iladi: ilova bandliga faqat ulangan skinlar tushadi.
- **Skinlar va kontraktlar:** o‘z skiningiz uchun `defineSkin` (`extends` orqali meros, `load` orqali CSS ni dangasa yuklash) va komponent kontraktlari (`defineContract`, `contractAttrs`, `contractPart`, `contractSelector`, `themeContracts` reyestri) — har bir komponent qaysi `vl-*` klasslari va data-atributlarni chiqarishi. Masalan, `Button` `vl-button` va `data-variant` / `data-color` / `data-size` / `data-shape` ni chiqaradi.
- **`themeHtmlAttributes(skin, scheme)`** — SSR da serverdagi `<html>` uchun skin va sxema atributlari: skin stillari birinchi kadrdanoq, gidratsiyadan oldin ishlaydi. Next.js App Router uchun misol — [O‘rnatish → SSR va Next.js](./installation#ssr).
- **Kiritish maydonlari uchun foydalanish qulayligi.** `InputField` maydonni maslahat va xato matni bilan bog‘laydi (`aria-describedby`) hamda xato va majburiylikni bildiradi (`aria-invalid`, `aria-required`) — kitdagi barcha maydonlarda. `InputField` asosidagi o‘z maydonlaringiz uchun render-funksiya shu atributlar bilan ikkinchi `control` argumentini oladi; `inputFieldLabelId(id)` — `aria-labelledby` uchun label id, `splitInputFieldProps(props)` — maydon va kontrol prop’larini ajratish.
- **`ThemeProvider onSkinLoadError`** — skin CSS ni yuklash (`load`) xatosi endi yo‘qolmaydi: oldingi skin qoladi, xato ishlov beruvchiga yoki `console.error` ga boradi.
- **`pixel` skini (8-bit)** — retro ko‘rinish: zinapoya burchakli ramkalar, qattiq soyalar, piksel shriftlar, yorug‘ va qorong‘i sxema. `corporate` ni meros oladi (`extends`): `@v-lab/ui-kit/skins/corporate.css`, so‘ng `@v-lab/ui-kit/skins/pixel.css` ni ulang va `ThemeProvider skins={[corporateSkin, pixelSkin]}`. Shriftlarni (Press Start 2P, Tiny5) ilova ulaydi.
- **`arena` skini** — jonli auksionlar va o‘yin interfeyslari uchun to‘q premium shisha: to‘q matnli laym aksent, yumshoq chuqur soyalar, suzuvchi qatlamlarda (modallar, pardalar, toastlar, ro‘yxatlar) yaltiroq qirrali shisha, noyoblik tokenlari `--arena-rarity-*`; asosiy sxema — qorong‘i, yorug‘ sxema ham bor. `corporate` ni meros oladi: `@v-lab/ui-kit/skins/corporate.css`, so‘ng `@v-lab/ui-kit/skins/arena.css` ni ulang va `ThemeProvider skins={[corporateSkin, arenaSkin]}`. Shriftlarni (Unbounded, Onest) ilova ulaydi. `backdrop-filter` qo‘llab-quvvatlanmasa yoki «shaffoflikni kamaytirish» yoqilgan bo‘lsa, shisha shaffof bo‘lmay qoladi.

### Changed

- **Paket qayta nomlandi:** endi `@v-lab/ui-kit`, scope `@ui-kit` → `@v-lab`.
- **Komponentlar uslubsiz, bezak — `corporate` skinida.** Komponentlar kontraktlardan barqaror `vl-<name>` / `vl-<name>__<part>` klasslari va data-atributlarni chiqaradi; CSS Modules va xeshlangan klasslar olib tashlandi. `@v-lab/ui-kit/style.css` o‘rniga `@v-lab/ui-kit/skins/corporate.css` ni ulang va skinni yoqing: ilovani `ThemeProvider skins={[corporateSkin]}` ga o‘rang yoki `<html data-vl-skin="corporate">` qo‘ying — [O‘rnatish](./installation). Global `.color-*` klasslari `data-color` atributi bilan almashtirildi. Tashqi ko‘rinish o‘zgarmadi.
- **React 19.** Kit React 19.3 da ishlab chiqiladi va sinovdan o‘tkaziladi. `react` / `react-dom` peer diapazoni — `^18.2.0 || ^19.0.0` (avval `>=17` edi, lekin kit React 17 da ishlamagan: komponentlar React 18 dagi `useId` dan foydalanadi). React 18.2+ dagi ilovalar o‘zgarishsiz ishlayveradi.
- **`Button` sukut bo‘yicha `type="button"`** — `<form>` ichidagi tugma endi formani yubormaydi. Yuborish uchun `type="submit"` bering.
- **Faqat ikonkali tugmalarga ochiq nom kerak:** `children` siz `Button`, `ToggleButton` va `SegmentedControl.Item` uchun TypeScript `aria-label` yoki `aria-labelledby` talab qiladi; dev rejimida nomsiz tugma ogohlantirish chiqaradi. O‘ramlar uchun bu qoidasiz turlar: `ButtonBaseProps`, `ToggleButtonBaseProps`, `SegmentedControlItemBaseProps`.
- **`SelectInput`, `AsyncSearchSelect`, `LanguageSwitcher`: yangi API.** `onChange` soxta hodisa o‘rniga qiymatni oladi — `(value, option)`, `multiple` rejimida `(values, options)`; `ref` yashirin `<select>` emas, trigger-tugmani ko‘rsatadi; `triggerAriaLabel` o‘rniga standart `aria-label` / `aria-labelledby` — `compact`, `compact-label`, `inline` variantlarida va `label` siz `AsyncSearchSelect` da majburiy. Forma qiymatni yashirin `<input name>` orqali oladi. Ishlatilmagan `multipleDisplay` prop’i olib tashlandi. Batafsil — migratsiya qo‘llanmasida.
- **Ochiladigan ro‘yxatlarda klaviatura WAI-ARIA combobox naqshi bo‘yicha:** ochilganda qidiruv maydoni fokus oladi, Escape faqat ro‘yxatni yopadi (atrofdagi modalni emas), Tab va tashqariga bosish yopadi, birinchi harflar bo‘yicha qidiruv, Home / End / PageUp / PageDown, Delete / Backspace qiymatni tozalaydi, «Hech narsa topilmadi» va yuklanish ekran o‘quvchiga e’lon qilinadi. `TagInput`: Enter ajratilgan taklifni qo‘shadi.
- **Maydonlar:** `ShareLinkInput` — `onCopy` → `onCopied` (nativ `onCopy` endi `<input>` ga boradi); `DateInput` dagi kalendar ikonkasi — tugma (nomi `calendarButtonLabel` yoki maydon yorlig‘idan); `CheckboxField` — tavsif, maslahat va xato `<label>` dan tashqarida (ularni bosish endi almashtirmaydi); react-hook-form adapterlari — turlar fabrikadan chiqariladi, `createRHFAdapter` mapperi `name` / `ref` / `onChange` / `onBlur` ni o‘zi uzatadi.
- **Oynalar va joylashuv:** `setBodyScrollLocked(locked)` → bo‘shatish funksiyasini qaytaruvchi `lockBodyScroll()` (bloklar sanaladi); `ModalHeader` / `DrawerHeader` / `ModalFooter` — umumiy dialog sarlavhasi; `ModalStatus` ikonkasi rangi skin’dan `data-variant` bo‘yicha; `SidebarContent` — `<nav>`, `href` li `SidebarItem` — `<a>` havola; `AppSwitcher` va `SidebarHeaderCard` menyulari — menyu naqshi, `href` li `AppSwitcher` bandlari — haqiqiy havolalar.
- **Vidjetlar va ma’lumotlar:** `SegmentedControl` — bitta tab stop bilan `radiogroup`; `Tabs` — `onChange` siz `value` komponentni boshqariladigan qiladi, `Tabs.List` qo‘shildi; `Accordion` — `role="region"` faqat `region` prop’i bilan; `Table` — `pageSize` boshqariladigan (boshqarilmaydigan: `defaultPageSize`, `defaultPage`), o‘rnatilganda `onPageChange(1)` chaqirilmaydi; `Tag` o‘chirish tugmasining nomi — `dismissLabel` + teg matni.
- **Kontent:** `FileUploadField` — `initialFiles` → `files` / `defaultFiles` va `newFileStatus`, soxta yuklash olib tashlandi (progress va holat `files` dan); `SvgIcon` sukut bo‘yicha dekorativ, nomi `title` / `aria-label` orqali; bayroqlar `title` qabul qiladi.
- Deyarli barcha komponentlar `ref` ni uzatadi (`forwardRef`).
- **`onChange` qiymatni uzatadi** — `PhoneInput` (E.164 yoki `''`), `SiteInput` (protokol + yo‘l), `DateInput` (`valueFormat` formatida) va `useCompositeInput` asosidagi maydonlarda — `SelectInput` dagi kabi. `DateInput` kalendarda sana tanlanganda ham `onChange` ni chaqiradi. Avval `onChange={(e) => set(e.target.value)}` — endi `onChange={set}`; react-hook-form’ning `field.onChange` ini to‘g‘ridan-to‘g‘ri berish mumkin.
- **`SidebarItem` va `AppSwitcher` havolalari `as` qabul qiladi** — router havola komponenti: `<SidebarItem as={Link} href="/projects">`.

### Fixed

- **`PdfPreview` import qilinganda endi SSR ni yiqitmaydi.** `react-pdf` (pdf.js) dangasa, faqat brauzerda yuklanadi: avval statik import modul yuklanayotgandayoq DOM ga murojaat qilardi. Ilova o‘zining `pdfjs.GlobalWorkerOptions.workerSrc` ini bergan bo‘lsa, u saqlanadi; aks holda unpkg dagi worker URL ishlatiladi.
- **Tozalash funksiyasini qaytaradigan callback-ref (React 19)** — `Checkbox` / `BaseCheckbox`, `SearchInput`, `ShareLinkInput`, `RichInput`, `DateInput`, `PhoneInput` va `Popover` da: ref qaytargan funksiya ajratilganda chaqiriladi. Avval komponentlar ref ni qo‘lda uzatgan — tozalash yo‘qolgan, ref esa `null` olgan.
- **`AppSwitcher`: `icon` da bo‘sh satr** nomning birinchi harfi bilan plitkani ko‘rsatadi. React 19 da uning o‘rniga bo‘sh `<img>` qolardi: React 19 `src=""` qo‘ymaydi va zaxira variant ishlamasdi.
- **Kiritish maydonlari: forma tiklangandan keyin `data-filled`.** `form.reset()`, `type="reset"` tugmasi yoki React 19 dagi formani avtomatik tiklash (`<form action>`) dan keyin boshqarilmaydigan maydon endi to‘ldirilgan deb belgilangan holda qolmaydi.
- **`InputField` prop’lari endi `<input>` ga tushmaydi:** `EmailInput`, `PasswordInput`, `SearchInput`, `DateInput` va boshqa maydonlardagi `startBlock`, `endBlock`, `filled`, `wrapperClassName`, `wrapperStyle` avval DOM elementga tushib, ishlamas edi — endi qo‘llanadi.
- **`RichInput` / `MarkdownInput`:** muharrir nomini `label` dan oladi.
- **`ThemeProvider`:** tizim sxemasiga obuna endi har renderda qayta yaratilmaydi; dangasa yuklanadigan skinga o‘tishda yuklash tugaguncha oldingi skin qoladi. **`useClickOutside`** qayta renderdan keyin dolzarb callback ni chaqiradi.
- **Foydalanish qulayligi va klaviatura (refaktoring, 2–5-bosqichlar):** `RichInput` / `MarkdownInput` / `CommentRichInput` formatlash paneli — `role="toolbar"`, strelkalar, tugmalar klaviaturadan ishlaydi; `PasswordInput` va `ShareLinkInput` tugmalari yana Tab tartibida; `Calendar` — APG to‘ri (strelkalar, PageUp / PageDown, kun nomida to‘liq sana), `DateInput` qalqib chiquvchi kalendari — fokus boshqaruvli dialog; `Modal` / `Drawer` o‘chirilganda skroll blokini bo‘shatadi va stekdan chiqadi, `ConfirmModal` — `alertdialog`; `Tooltip` fokusda ham ochiladi; `Toast` — bitta muloyim e’lon, yashirin toastlar fokus olmaydi, avtoyopish kursor va fokusda to‘xtaydi; `ToggleGroup`, `SegmentedControl`, `Tabs` — strelkalar va bitta tab stop; yopiq `Accordion` paneli fokus olmaydi; `Table` aylantirish sohasi va qatorlari klaviaturadan ishlaydi; izohlar lentasi — `feed` / `article`, tahrir va o‘chirishdan keyin fokus qaytadi; bayroq va ikonkalarda takroriy id yo‘q.
- **`SelectInput` / `AsyncSearchSelect`:** tanlangan qiymat plaseholder rangida emas, oddiy matn rangida ko‘rsatiladi (`data-placeholder` faqat ko‘rinadigan maslahatda turadi).

### Removed

- **CommonJS yig‘masi `dist/cjs/`** — paket faqat ESM sifatida yetkaziladi. Node 20.19+ / 22.12+ da `require('@v-lab/ui-kit')` ESM versiyasini yuklaydi.
- **`./style.css` eksporti** (`@v-lab/ui-kit/style.css`) — stillar endi skin bilan yetkaziladi: `@v-lab/ui-kit/skins/corporate.css`.
- **GitLab npm reyestriga chiqarish** — `package.json` dan GitLab Package Registry ga ishora qilgan `publishConfig` olib tashlandi. Keyingi reliz uchun reyestr alohida e’lon qilinadi; ungacha paket mahalliy arxivdan o‘rnatiladi — [O‘rnatish](./installation). Manba kodi GitHub’ga ko‘chdi: [v-lab-comp/ui-kit](https://github.com/v-lab-comp/ui-kit).

## [0.15.0] — 2026-09-17

### Fixed

- **`PhoneInput`: mamlakat kodi bilan raqamni qo‘yish.** `+998 90 123 45 67` yoki `998901234567` jimgina `+998998901234` ga aylanardi. Endi qo‘yilgan to‘liq raqam maydonni butunlay almashtiradi, boshqa mamlakat raqami (`+7 912 345 67 89`) esa, mamlakat `countries` ro‘yxatida bo‘lsa, selektni almashtiradi. Brauzer avtoto‘ldirishi va mobil klaviaturadan qo‘yish uchun ham xuddi shunday.
- **`PhoneInput`: mamlakat tashqi `value` ga ergashadi.** Forma `reset` qilinganda yoki boshqa yozuv uchun qayta ochilganda mamlakat yangi raqamdan olinadi — avval o‘zgarmay qolardi, konsolda xato chiqardi, tahrir esa raqamni begona kodga yopishtirardi. Bo‘sh qiymat mamlakatni tashlab yubormaydi.
- **`PhoneInput`: to‘liq raqamni belgilab, qaytadan terish mumkin** — belgilangan matn ustiga raqam kiritish endi bloklanmaydi.
- **`PhoneInput`: E.164 bo‘lmagan `value`** (`901234567`, `+998-901234567`, `+998 90 123-45-67`) `onChange` chaqirilmasdan to‘g‘ri ko‘rsatiladi — forma dirty bo‘lmaydi. Tahlil qilib bo‘lmaydigan qiymat — konsolda xatosiz bo‘sh maydon.

### Infrastructure

- **Paketni GitLab CI orqali chiqarish.** Reliz `vX.Y.Z` tegi bo‘yicha pipeline’da chiqariladi: `typecheck` / `lint` / testlar / build, teg `package.json` dagi versiyaga mos kelishi va changelog bo‘limi borligi tekshiriladi, so‘ng GitLab Package Registry ga `npm publish` va GitLab Release. `release/*` shoxobchalarida `release:bump` tugmasi bor (`BUMP` = `patch` / `minor` / `major`) — versiyani ko‘taradi va tegni push qiladi. Tartib: [`docs/guides/publishing.md`](https://github.com/v-lab-comp/ui-kit/blob/main/docs/guides/publishing.md).

## [0.14.0] — 2026-08-08

### Added

- **`RichInput`** — formalar uchun ko‘p qatorli formatlangan matn maydoni. `InputField` asosidagi odatiy maydon (`label`, `required`, `hint` / `error`, `completed`, `size`, `disabled`), faqat `<input>` o‘rniga tulbarli `contenteditable`. Qiymat — HTML qatori: `value` + `onChange` yoki `defaultValue`. Tugmalar to‘plami (`tools`: `bold`, `italic`, `underline`, `strikethrough`, `bulletList`, `orderedList`, `clear`; `tools={[]}` — tulbarsiz) va uning joylashuvi (`toolbarPlacement`) sozlanadi. Shuningdek `maxLength` (hisoblagich va qo‘yishni qirqish), `minRows` / `maxRows`, `readOnly` hamda `FormData` orqali nativ yuborish uchun `name`. **Enter** — yangi qator; maydon formani yubormaydi. Izohlar lentasi uchun `CommentRichInput` qoladi.
- **`MarkdownInput`** — `RichInput` bilan bir xil muharrir, faqat tashqi qiymat HTML emas, **Markdown**. Yangi `@v-lab/ui-kit/markdown` kirish nuqtasidan import qilinadi; `marked` va `turndown` peer-bog‘liqliklari kerak (asosiy bundle ularni tortmaydi, `RichInput` avvalgidek HTML bilan ishlaydi). `name` berilsa `FormData` ga Markdown tushadi. O‘sha kirish nuqtasidan `markdownToHtml` / `htmlToMarkdown` konverterlari ham eksport qilinadi — masalan, ko‘rish rejimi uchun. Standart tulbarda `underline` yo‘q: CommonMark da tag chizish mavjud emas, yoqilsa u inline `<u>…</u>` HTML sifatida saqlanadi.

### Changed

- **`CommentRichInput`** umumiy ichki `richText` qatlamiga o‘tkazildi (`RichInput` bilan bir xil `contenteditable` mexanikasi). Ommaviy API va xulq-atvor o‘zgarmadi; aralash tanlovda tulbar tugmalarining faol holati aniqroq ko‘rsatiladi.

## [0.13.2] — 2026-07-29

### Fixed

- **`filled` va `lighter` da hover-oreol.** Keng aura (3px + yorug‘lik) o‘rniga bazaviy 1px chekka qo‘llanardi: `.halo` utilitasi va variant sinflari bir xil spetsifiklikka ega (0,1,0), yig‘ilgan `style.css` da esa utilita variantlardan keyin tushadi — tenglikda u g‘olib chiqib, ularning o‘zgaruvchilarini jimgina qoplab ketardi. `variant="filled" color="primary"` da computed `::after` `rgb(51,92,255) 0 0 0 1px` edi. Endi `.halo` `--halo-*` ni umuman e’lon qilmaydi: standart qiymatlar `::after` ichidagi `var(--halo-ring-size, 1px)` folbeklarida yashaydi, o‘zgaruvchini e’lon qiluvchi yo‘q va qoidalar tartibi hech narsani hal qilmay qo‘ydi. Jonli Chromium da tekshirildi: `filled` — 3px halqa + yorug‘lik, `lighter` — 3px, `stroke` / `ghost` — 1px, neytral — `--halo-neutral` da 1px.

### Changed

- **`--halo-*` endi `:root` dan qayta belgilanadi.** Xuddi shu tuzatishning yon ta’siri: avval elementning o‘zidagi e’lon meros qilib olingan qiymatni yengardi va ilovadan halqa rangi yoki qalinligini o‘zgartirib bo‘lmasdi. Endi oddiy `:root { --halo-ring-color: … }` ishlaydi.

### Infrastructure

- **`postbuild`** — tekshiruv kengaytirildi: agar bazaviy `.halo` qoidasi yana `--halo-*` e’lon qila boshlasa, build yiqiladi.
- **`npm run verify:halo`** — yig‘ilgan `dist/` ga qarshi jonli Chromium (Playwright) da oreolni tekshirish: haqiqiy `style.css` va haqiqiy xeshlangan sinflar, tugmaga kursor olib borish va computed `::after` ni solishtirish.

## [0.13.1] — 2026-07-29

### Fixed

- **Iste’molchilarda yig‘ilish.** 0.13.0 da `dist/style.css` `@import "./tokens.css"` bilan boshlanardi, holbuki `dist/tokens.css` paketga tushmagan edi — iste’molchilarda dev ham, build ham yiqilardi (`postcss-import` → `ENOENT`). Import osilib qolgan edi: `src/styles/interactions.module.css` komponentlarga faqat `composes` orqali ulanadi, bunday modullardagi `@import` ni esa Vite inlayn qilmaydi va u umumiy bandlga chiqib ketadi. Import olib tashlandi — bu o‘zgaruvchilarga ta’sir qilmaydi: `.halo` ularni faqat o‘qiydi, tokenlarning o‘zi esa `style.css` bilan birga `:root` ga keladi. 0.13.0 dan to‘g‘ridan-to‘g‘ri 0.13.1 ga yangilang; API o‘zgarishlari yo‘q.

### Infrastructure

- **`postbuild`** — `scripts/check-dist-css.mjs` tekshiruvi: agar `dist/**/*.css` da paketda yo‘q faylga `@import` qolsa, build yiqiladi. Bunday nosozlikni na typecheck, na lint, na testlar, na `vite build` ning o‘zi ko‘radi — u faqat iste’molchi tomonida namoyon bo‘ladi, shuning uchun alohida qadam.

## [0.13.0] — 2026-07-29

### Added

- **Tugmalar — hover-oreol.** Kursor olib borilganda tugma atrofida palitra rangidagi halqa ochiladi. Geometriya va o‘lcham o‘zgarmaydi: halqa psevdoelementda yashaydi va layoutga ta’sir qilmaydi (`scale` ham, `padding` ham, qo‘shnilarning siljishi ham yo‘q). Talqin variantga bog‘liq: `filled` / `lighter` uchun — och keng aura, `stroke` / `ghost` uchun — urg‘u rangidagi ingichka 1px chekka. Tayming assimetrik (paydo bo‘lishi 130 ms, ketishi 280 ms, bosilishi 60 ms). `prefers-reduced-motion` hurmat qilinadi: holat saqlanadi, faqat animatsiya yo‘qoladi. `Button` dan tashqari kitning ikonkali tugmalariga ulangan: `Modal` va `Toast` yopish, `Tag` (krestcha), `Calendar` va `PdfPreview` navigatsiyasi, `Table` paginatsiyasi, `SelectInput` / `AsyncSearchSelect` tozalash, `PasswordInput` ko‘z, `ShareLinkInput` nusxalash, `DateInput` taqvimi, `CommentRichInput` asboblar paneli, `CommentsSection` menyusi, `FileUpload` amali, `Sidebar` triggeri, `AppSwitcher`.
- **`Button`** — `customColor?: string` propi: semantik palitra o‘rniga ixtiyoriy hex (`#rgb` / `#rrggbb` / `#rrggbbaa`). U `color` ni qoplaydi, hover / active / fon tuslari avtomatik chiqariladi, hover-oreol ham shu rangni oladi. Yaroqsiz qiymat e’tiborga olinmaydi — `color` amalda qoladi. Xuddi shu prop `Badge` va `Tag` da allaqachon bor edi.
- **Tokenlar** — motion: `--motion-duration-fast`, `--motion-ease-standard`, `--motion-duration-halo-in` / `-out` / `-press`, shuningdek `--halo-neutral` (neytral tugmalar va palitra sinfisiz tugmalar uchun halqa rangi). Avval davomiyliklar komponentlar ichida qat’iy yozilgan edi.

### Changed

- **`Button`** — o‘tishlar qat’iy yozilgan `0.15s ease` dan tokenlarga ko‘chirildi (`--motion-duration-fast`, `--motion-ease-standard`); qiymat o‘zgarmadi, shuning uchun kitning qolgan qismi bilan mos. Komponentda yetishmayotgan `prefers-reduced-motion` bloki qo‘shildi.

## [0.12.0] — 2026-07-29

### Added

- **`CommentsSection`** — `collapseAfterLines?: number` propi. Izoh tanasini N qatorgacha yig‘adi; pastda **Ko‘proq ko‘rsatish** / **Kamroq ko‘rsatish** tugmasi paydo bo‘ladi. `0` / `undefined` — cheklovsiz (standart xatti-harakat). Tugma faqat haqiqiy to‘lib ketishda ko‘rinadi; «yoyilgan» holat izoh `id` siga bog‘lanadi va lenta qayta yuklanganda (masalan polling) saqlanadi. Yig‘ish render qilingan `contentHtml` ga (shu jumladan `deletedWithContent`) qo‘llanadi, lekin inline muharrirga va o‘chirilgan pleysxolderga qo‘llanmaydi. Yangi satr kalitlari `showMore` / `showLess` (EN standart `Show more` / `Show less`) `CommentsSectionStringKey` / `COMMENTS_SECTION_STRING_KEYS` da.
- **`CommentsSection`** — CSS-modul sinf nomlariga bog‘lanmaydigan vyorstka dastaklari: `inputPlacement?: 'top' | 'bottom'` (kiritish maydoni holati, standart `top`), `toolbarStartSlot?: ReactNode` (kiritish maydoni asboblar panelidan oldingi slot, masalan muallif avatari), `classNames?: Partial<Record<'root' | 'list' | 'card' | 'input', string>>` (ichki qismlar sinflari) va `avatarSize?: AvatarSize` (avatar o‘lchami, standart 40).

### Changed

- **`CommentRichInput`** — standartdan qat’iy `min-height: 116px` va `opacity: 0.8` (faolsiz maydon) olib tashlandi: maydon balandligi kontentdan o‘sadi va endi `disabled` ko‘rinmaydi. Avvalgi xatti-harakat `--comment-input-min-height` va `--comment-input-opacity` CSS-o‘zgaruvchilari orqali qaytariladi.

## [0.11.0] — 2026-06-18

### Added

- **`Table`** — `maxHeight` propi jadval ichida tabiiy skrollni (vertikal + gorizontal) yoqadi va vertikal skrollda sarlavhani qotiradi (sticky `top: 0`).
- **`TableColumn`** — `sticky: 'left'` ustunni gorizontal skrollda qotiradi (`maxHeight` va ustun `width` talab qilinadi). Oxirgi yopishqoq ustunda ajratuvchi soya.

### Fixed

- **`DateInput`** — ochiluvchi taqvim endi ekran chetidan chiqib ketmaydi: pozitsiyalash `@floating-ui/react` ga ko‘chirildi (`flip` + `shift` + `body` ga portal), taqvim har doim qirqilishsiz va gorizontal skrollsiz to‘liq ko‘rinadi.
- **Sana tanlash taqvimlari** — joriy kun endi vizual ajratiladi (halqa + primary rang), bugungi sanani tez topish uchun.

## [0.10.0] — 2026-06-17

### Added

- **Kiritish maydonlari** — qiymati bor maydon `--blue-400` chegara rangini oladi va placeholder’li bo‘sh maydondan farqlanadi. Ierarxiya: bo‘sh (kulrang) → qiymat bor (`--blue-400`) → fokus (`--primary-base` + primary halqa) → xato (qizil). Matnli maydonlar (`TextInput`, `EmailInput`, `PasswordInput`, `SearchInput`, `SiteInput`, `ShareLinkInput`), `DateInput`, `PhoneInput`, `SelectInput` (full + compact), `AsyncSearchSelect`, `TagInput` uchun ishlaydi.
- **`InputField`** — oddiy `<input>` bo‘lmagan kontrollar uchun `filled?: boolean` propi (Select va boshqalar). Matnli maydonlarda avtomatik aniqlanadi: `BaseInput` `data-filled` ni o‘rnatadi.
- **`required` belgisi** — label’li barcha maydonlarda `requiredMarker?: ReactNode` propi (standart `*`): `InputField`, `TextInput`, `EmailInput`, `PasswordInput`, `SearchInput`, `SiteInput`, `ShareLinkInput`, `DateInput`, `PhoneInput`, `SelectInput`, `AsyncSearchSelect`, `TagInput`. Rang `--input-required-color` CSS o‘zgaruvchisi orqali qayta belgilanadi.
- **`FileUploadField` / `FileDropZone` / `FileUploadItem`** — `texts?: FileUploadTexts` propi barcha ko‘rinadigan matnlarni ko‘p tillilik uchun tashqariga chiqaradi (`title`, `subtitle`, `button`, `uploading`, `done`, `error`, `download`, `remove`, `ofLabel`); standart qiymatlar — `DEFAULT_FILE_UPLOAD_TEXTS`. Yangi `maxSize?: number` propi (baytlarda): limitdan oshgan fayl `error` statusi bilan belgilanadi. `accept` ruxsat etilgan fayl turlarini belgilaydi.

### Changed

- **Maydon fokusi** — chegara va fokus halqasi rangi `--stroke-strong-950` / `--neutral-alpha-16` dan `--primary-base` / `--primary-alpha-16` ga o‘zgartirildi.
- **`required` belgisi** — yulduzcha standart rangi `--primary-base` (ko‘k) dan `--error-base` (qizil) ga o‘zgartirildi; `FileUpload` belgisi ham endi qizil.
- **Palitra** — primitivlar dizayn-tokenga moslashtirildi: `slate-200` `#eaecf0`, `blue-400` `#4c82ff`, `green-100` `#d6f5e8`, `purple-500` `#7d52f4`, `pink-400` `#ff68b3`, `neutral-500` `#7a7a7a`.

---

## [0.9.1] — 2026-05-20

**Comments** — uzunlik hisoblagichi va admin uchun «o‘chirilgan, lekin kontent ko‘rinadi» rejimi.

### Added

- **`CommentRichInput`** — yangi `maxLength?: number` propi. Berilganda futerda `current / max` hisoblagichi (`tabular-nums`) paydo bo‘ladi; chegaradan ortiq kiritish `beforeInput` orqali bloklanadi, buferdan qo‘yish qolgan joyga moslab qisqartiriladi. Chegaradan oshganda hisoblagich `--error-base` ga o‘zgaradi va yuborish tugmasi faolsizlanadi.
- **`CommentsSection`** — yangi `maxLength?: number` propi asosiy kiritish maydoniga ham, kartochka ichidagi inline muharrirga ham uzatiladi.
- **`CommentThreadItem`** — yangi `deletedWithContent?: boolean` bayrog‘i. `isDeleted: true` bilan birga kartochkaning «o‘chirilgan» ko‘rinishini (so‘ngan fon, menyusiz) saqlaydi, lekin plejsxolder o‘rniga `contentHtml` va vaqt yonida «deleted ·» belgisini chiqaradi (admin / audit rejimlari).
- **`DEFAULT_COMMENTS_SECTION_STRINGS`** — yangi `deletedMark` kaliti (`'deleted'`); mavjudlar kabi `mergeCommentsSectionStringsFromJson` tomonidan o‘qib olinadi.

---

## [0.9.0] — 2026-05-20

**Comments** — kartochka ichida inline tahrirlash va o‘rnatilgan `ConfirmModal` orqali soft-delete; EDOC API integratsiyasi uchun to‘liq qo‘llanma. **Accordion** — kartochka foni hover / open paytida o‘zgarmaydi.

### Added

- **`CommentsSection`** — inline tahrirlash va o‘chirish. Yangi proplar `onEditComment(id, html)` / `onDeleteComment(id)`; `CommentThreadItem` da ixtiyoriy `canEdit`, `canDelete`, `isEdited`, `isDeleted`. `canEdit` / `canDelete` ga ega kartochkalarda «**…**» Popover menyusi paydo bo‘ladi: «Tahrirlash» kartochka ichida muharrirni ochadi, «O‘chirish» o‘rnatilgan `ConfirmModal` ni `strings` matnlari bilan ochadi. `isEdited` vaqt yonida «edited ·» belgisini chiqaradi; `isDeleted` menyusiz va kontentsiz kulrang plejsxolderni chizadi (admin rejimi).
- **`CommentRichInput`** — tahrirlash rejimi: `initialHtml`, `submitLabel` (ikonka o‘rniga matnli tugma), `secondaryAction` (Save ning chap tomonida, odatda Bekor qilish), `resetOnSubmit` (yaratish uchun standart `true`, `initialHtml` bo‘lsa `false`).
- **`DEFAULT_COMMENTS_SECTION_STRINGS`** — yangi kalitlar: `editAction`, `deleteAction`, `editedMark`, `editSaveLabel`, `editCancelLabel`, `deletedPlaceholder`, `confirmDeleteTitle`, `confirmDeleteBody`, `confirmDeleteConfirm`, `confirmDeleteCancel`, `commentActionsAriaLabel`. `mergeCommentsSectionStringsFromJson` ularni avvalgilari kabi qabul qiladi.
- EDOC API integratsiyasi qo‘llanmasi (`/edocapp/api/edoc/v1/documents/.../comments`) — javobni `CommentThreadItem` ga mapping, fetch klient va 401/403/404/422 ni qayta ishlash — [`comments-edoc-api`](/uz/guide/components/comments/comments-edoc-api) (+ RU / EN).

### Fixed

- **`Accordion`** — kartochka foni endi hover yoki ochilishda kulrang bo‘lmaydi. `var(--bg-white-0)` (yoki iste’molchi bergan CSS o‘zgaruvchisi) saqlanadi. Soya (`--shadow-regular-x-small`) hover / open da olib tashlanishi davom etadi.

---

## [0.6.3] — 2026-05-06

**InputField**: **`completed`**, **`completedColor`**; **SelectInput**, **AsyncSearchSelect**; **PhoneInput** / **SiteInput** ichidagi select. **BaseInput** **`read-only`** va **`completed`** hover — oq fon. VitePress + Storybook.

### Added

- **InputField** — **`completed`**: ramka standart bo‘yicha **primary**; **`completedColor`** — rang (**hex**, **`rgb()`**, **`var(--…)`** token yoki primitivlar). **`error`** / **`disabled`** da ishlamaydi. **SelectInput** variantlari va **AsyncSearchSelect**. **PhoneInput** / **SiteInput** — **`startBlock`** ichidagi **SelectInput** ham bir xil accent.
- Hujjatlar: **InputField** sahifasi (**`inputCompleted`** preview), boshqa inputlar bilan havolalar; Storybook **Completed** storilari.

### Changed

- **`completedColor`** uchun **`success`**, **`error`**, **`warning`**, **`primary`**, … presetlar (**`var(--*-base)`**); ixtiyoriy CSS ham ishlaydi.
- **BaseInput** **`read-only`**: oq fon; **InputField** **`completed`**: hoverda kulrang yo‘q.

---

## [0.6.2] — 2026-05-07

**BaseInput** / **DateInput** — bo‘sh **`autoComplete`** → **`off`**. **TagInput** — kamroq avtomatik toʻldirish shovi.

### Fixed

- **BaseInput** — **`autoComplete=""`** → **`off`**.
- **TagInput** — **`autoCapitalize`** / **`autoCorrect`**, **`data-*`** — kamroq avtomatik toʻldirish shovi.
- **DateInput** — maskada **`autoComplete=""`** → **`off`**.

---

## [0.6.1] — 2026-05-06

**SelectInput** — guruhlar va ko‘p tanlash; **TagInput** — tavsiyalar ro‘yxati; **`autoComplete`**; **InputField** / **SelectInput** — **`--text-sub-600`** va leybel **1 px**; **Button** fokusi; hujjatlar.

### Added

- **SelectInput** — **`groups`**: bo‘lim sarlavhalari va ajratgichlar, yashirin select ichida **`<optgroup>`**; turlar **`SelectOptionGroup`**, **`SelectInputOptionsProp`**; **`options`** yoki **`groups`**. **SelectInput** hujjatlari (**ru / en / uz**), **`selectInputGrouped`** ko‘rinishi, Storybook **Grouped options**.
- **SelectInput** — **`mode="multiple"`**, checkboxlar, triggerda qisqa natija, **`SelectOption.description`**, **`optionTextWrap`**; turlar **`FullVariantMultipleProps`**, **`SelectInputMultipleChangeEvent`**, **`SelectInputMultipleDisplay`**. Hujjatlar va demolar (**ru / en / uz**).
- **TagInput** — **`suggestionsExcludeSelected`** (tanlanganlarni ro‘yxatdan yashirish); standartda tanlangan qatorlar belgi bilan qoladi; qayta tanlash tegni olib tashlaydi.

### Changed

- **InputField** — **hint** rangi (**`--text-sub-600`**), leybel qatorida **1 px** bo‘shliq.
- **SelectInput** — ikkilamchi matn (placeholder, guruhlar, bo‘sh ro‘yxat, async footer) — **`--text-sub-600`**.
- **TagInput** — tavsiyalar filtri va teglar bilan moslash yangi standart ro‘yxat xatti-harakatiga moslashtirildi.

### Fixed

- **BaseInput** — standartda **`autoComplete="off"`**.
- **EmailInput** / **PasswordInput** / **PhoneInput** — mantiqiy **`autoComplete`** standartlari.
- **DateInput** — maskali maydon uchun standartda **`autoComplete="off"`**.
- **Button** — **`outline`** ortiqcha animatsiyasiz fokus halqasi.

### Documentation

- **Inputs (obzor)** — **`autoComplete`** bo‘limi (**ru / en / uz**), **BaseInput** da izoh.
- **SelectInput** — komponent qo‘llanmasida **`groups`**, saytda ko‘rinish, Storybook tavsifi kengaytirildi.
- **CLAUDE.md** — iste’molchilar uchun o‘zgarishlarda **`CHANGELOG.md`** va ushbu bo‘limni sinxronlashtirish qoidasi.

---

## [0.6.0] — 2026-05-05

**TagInput**, **Tag**, **AsyncSearchSelect** (sahifalash), **DateInput**, **`vite/client`**.

### Added

- **TagInput** — chip-maydon va ixtiyoriy tavsiyalar (**`onSuggestionsQueryChange`**, **`server`** / mahalliy filtr), **`{ id, label }`**, **`tagsAreaMaxHeight`**, kengaytirilgan proplar (**`allowCustomTags`**, yuklash / bo‘sh ro‘yxat, **`validateTag`**, **`getOptionDisabled`**, **`maxTagCount`**, **`renderTag`**), **`TagInputTagValue[]`**, **`tagLabel`**; **Storybook**, **`RHFTagInput`**, VitePress **ru / en / uz**.
- **AsyncSearchSelect** — **`loadOptions`** da sahifalash, javob **`{ options, hasMore }`** yoki massiv, cheksiz skroll, modul bo‘linishi, **`AsyncSearchSelectLoadResult`** turi; Storybook va hujjatlar yangilandi.

### Changed

- **Tag** — bosiladigan zona va **`suffix`** / **`prefixRounded`**, yopish tugmasi bilan markup; avatar klasteri **2 px**. Saytdagi **Tag** hujjatlari.
- **TagInput** — modul tuzilishi: **`index.tsx`**, **`hooks/controller`**, **`ui`**, **`model`**, **`types`**, **`styles.module.css`**.

### Fixed

- **DateInput** — sana tanlangach taqvim yopiladi (**`stopPropagation`** panelda); **DateInput** hujjat sahifalari yangilandi.

### Tooling

- **`tsconfig`**: CSS Modules uchun **`vite/client`** turlari.

---

## [0.5.8] — 2026-05-04

**AsyncSearchSelect**, **SelectInput** uchun umumiy tushadigan panel, hujjatlar va TypeScript **`noEmit`**.

### Added

- **AsyncSearchSelect** — qidiruvli async select: **`loadOptions({ query, signal })`**, ixtiyoriy **`onSearchQueryChange`**, panelda **`SearchInput`**, standart bo‘yicha **`autoFocus`** yo‘q; **`@v-lab/ui-kit`** dan eksport.
- Storybook: **`Inputs/AsyncSearchSelect`**.
- VitePress: **ru / en / uz** sahifalar, **`componentDocsRegistry`** dagi demo.

### Changed

- **SelectInput**: faqat sinxron **`options`**; umumiy **`SelectDropdownPanel`** va **`useSelectDropdownFloating`**; tushadigan ro‘yxat va qidiruv qatori tuzilishi.

### Tooling

- **TypeScript**: **`noEmit: true`**, **`npm run typecheck`** → **`tsc`**.

---

## [0.5.7] — 2026-04-28

Iste’molchi uchun hujjatlar, hujjatlar saytini **GitLab Pages** ga chiqarish va GitLab Pages uchun **`base`**.

### Added

- **GitLab CI** (`.gitlab-ci.yml`): **`docs:build`** job, artefakt **`docs-site/.vitepress/dist/`**; **`pages`** job → **`public/`**; **`DOCS_BASE="/${CI_PROJECT_NAME}/"`**; **`pages`** muhiti **`url: $CI_PAGES_URL`** bilan; **`interruptible: true`**.
- Statik hujjatlar uchun **Docker**: **`docs-site/docker/`** (`Dockerfile`, nginx, `entrypoint.sh`).
- **`.dockerignore`**.

### Changed

- **VitePress**: **`base`** **`DOCS_BASE`** dan; mahalliy ravishda o‘zgaruvchisiz — **`/`**.

### Documentation

- **README**, **INSTALLATION_DEVELOPER**, **ru / en / uz** o‘rnatish: minimal to‘plamga **`@floating-ui/react`**; to‘liq o‘rnatishda **`react-pdf`** va **`pdfjs-dist`**.

---

## [0.5.6] — 2026-04-27

**SelectInput** hotfix (`compact` / `compact-label` tushishi, jumladan **LanguageSwitcher**) va Storybook’ga qarshi e2e.

### Fixed

- **SelectInput** (`bottom`/`top` razmetkasi, `dropdownWidth` siz): `variant="full"` — ro‘yxatning minimal kengligi = maydon kengligi, ro‘yxat `max-content` bo‘yicha kengroq bo‘lishi mumkin; `compact` / `compact-label` / `inline` — anchordan `minWidth` yo‘q, kenglik opsiyalar uzunligiga qarab; `.dropdown` panel `max-content`, ortiqcha «bo‘sh» kengliksiz (jumladan **LanguageSwitcher**). Kenglik chegara: `min(100vw − 16px, 32rem)`.

### Added

- **`npm run test:e2e`** skripti (Playwright): Storybook duman testi, **LanguageSwitcher** tushish kengligi tekshiruvi; dev-bog‘liqlik **`@playwright/test`**, **`playwright.config.ts`**, **`e2e/storybook.spec.ts`**.
- **`.gitignore`**: Playwright artefaktlari (`test-results`, `playwright-report`, `blob-report`, `playwright/.auth`).

---

## [0.5.5] — 2026-04-24

### Added

- **Comments**: `CommentRichInput` (rich `contenteditable`, formatlash paneli), `CommentsSection` (kiritish maydoni + kunlar bo‘yicha ajratgichli lenta, loading / error / empty holatlari).
- Qator yordamchilari: `DEFAULT_COMMENTS_SECTION_STRINGS`, `COMMENTS_SECTION_STRING_KEYS`, `mergeCommentsSectionStrings`, `mergeCommentsSectionStringsFromJson`; `formatCommentDayDivider` utilitasi.
- Hujjatlar: `Comments.md`; repozitoriy indekslari yangilandi (`docs/components/`, `docs/MAP.md`, `docs/MAIN_CONTEXT.md`).

### Changed

- **CommentRichInput**: **Enter** bilan yuborish; **Shift+Enter** — yangi qator (oldingi yuborish Ctrl/Cmd+Enter edi).
- **CommentsSection**: `createdAt` bo‘yicha kamayish tartibida ko‘rsatish (**yangilari yuqorida**); `comments` propidagi elementlar tartibi muhim emas.

### Documentation

- Storybook: `CommentsSection` uchun Playground; interaktiv historiyalar uchun Docs’dagi «Kodni ko‘rsatish» panelida `@v-lab/ui-kit` dan `CommentsSection` import qilgan misollar.

---

## [0.5.4] — 2026-04-13

**0.5.3** ning qayta nashri — avvalgi build o‘zgarishlarsiz edi.

---

## [0.5.3] — 2026-04-13

**SelectInput** hotfix: pozitsiyalash va tushadigan ro‘yxat kengligi.

### Fixed

- **SelectInput**: dropdown triggerning chap chetiga tekislangan holda pastda ochiladi (`bottom-start`), markazga emas.
- **SelectInput**: dropdown kengligi aniq input kengligiga teng — uzun opsiyalar qatorlarga o‘raladi, ro‘yxatni cho‘zmaydi.
- **SelectInput**: `flip` qarama-qarshi o‘qqa cheklangan (bottom ↔ top, left ↔ right) — dropdown yon tomonga uchib ketmaydi.
- **SelectInput**: `optionTextWrap` — opsiya matni 2 qator va ellipsis bilan cheklanadi; tabular tooltip faqat kesilganda.

---

## [0.5.2] — 2026-04-03

**0.5.1** dan keyingi hotfix: **DateInput** (masked) va **FileUpload** (multipart).

### Fixed

- **DateInput**: `valueFormat: 'masked'` bilan boshqariladigan rejim — to‘g‘ri ko‘rinish va sana tanlash (maska qiymati `formatIsoToMasked` dan o‘tmaydi); `internalMasked` ni formatni hisobga olgan holda ishga tushirish.
- **FileUpload**: `onFilesChange(uploadFiles, nativeFiles)` va `uploadFilesToNativeFiles` utilitasi — `FormData` / backend ga tayyor `File`, `UploadFile` obyekti emas (aks holda `[object Object]` qatori).

### Added

- **`uploadFilesToNativeFiles`** eksporti, **`FileUploadFilesChangeHandler`** tipi.

---

## [0.5.0] — 2026-04-03

### Added

- `DateInput` (`@v-lab/ui-kit/date`): `valueFormat?: 'masked' | 'iso'` — `'iso'` da `onChange` / `onAccept` `YYYY-MM-DD` qaytaradi; `formatMaskedToIso`, `formatIsoToMasked`, `parseMaskedDateString`, `formatDateToMasked` utilitalari eksport qilinadi
- `SelectInput`: optional prop `dropdownPortalZIndex` to override portal stacking (e.g. select inside a modal)
- `Table`: `hideHeader`, `paginationPosition` (`'top' | 'bottom'`), `activeRowIndex` — without hacks with `column-reverse` and without targeting internal classes in the app
- `SelectInput`: `dropdownMaxHeight`, `optionTextWrap` — list height and long labels wrapping via props (CSS variable `--select-dropdown-max-height` in dropdown)
- `Box` — minimal `div` wrapper with `forwardRef` and `HTMLAttributes<HTMLDivElement>`
- `FileUpload`: `FileDropZone`, `FileUploadItem`, `FileUploadField`, `formatFileSize` / `fileToUploadFile` / `filesSignature` utilities (port from edoc-front-v2, CSS Modules + tokens)

### Fixed

- `SelectInput` portal no longer uses inline `z-index: 9999`; stacking uses `--z-dropdown` (below sticky `PageHeader`). Token `--z-dropdown` set to `5` (below `--z-sticky: 10`)

### Changed

- **Storybook**: kustom kod misoli bo‘lgan historiyalarda Docs uchun **`parameters.docs.source.type: 'code'`** va **`language: 'tsx'`** qo‘shildi — Code panelida berilgan parcha ko‘rinadi, butun `render` emas (Modal, inputlar, Breadcrumb, ButtonGroup, RHF va boshqalar).
- **`.storybook` / Vite**: **`server.watch.ignored`** ga **`storybook-static/`** qo‘shildi — **`build-storybook`** dan keyin dev-server ortiqcha qayta yuklanmasin.
- **Uslublar**: **DateInput**, **HeaderCard**, **Table** da inline-stillar CSS Modulga ko‘chirildi; **Avatar** va **Sidebar** da qattiqlashtirilgan ranglar tokenlarga almashtirildi (**`--bg-white-0`**, **`--shadow-regular-x-small`**).
- **Kod sifati**: ESLint qoidalari kengaytirildi (**`no-console`**, **`prefer-const`**, **`no-var`**, **`consistent-type-imports`**, **`no-explicit-any`**), Vitest qamrovi chegaralari belgilandi.
- **Repozitoriy hujjatlari**: **`docs/`** kataloglari qo‘shildi/tuzildi (arxitektura, chek-listlar, qo‘llanmalar), **`CHANGELOG`**, kerak bo‘lsa **`REVIEW_FINDINGS.md`** ga ham qarang.

### Infratuzilma

- **CI**: **`.github/workflows/ci.yml`** workflow (push/MR da yig‘ish va tekshiruvlar).
- **Yig‘ish**: **`vite.config.ts`**, **`vitest.config.ts`** yangilandi; PdfPreview storis uchun ixtiyoriy **`sample.pdf`**; **`prepublishOnly`** (`npm run build`), GitLab npm uchun **`publish:registry`** skriptlari; **`.env.example`** va **`.env*`** ignore mahalliy tokenlar uchun.

### Refaktor va sifat (refactor / merge branch dan)

- **`forwardRef`** va **`displayName`** bir qator ochiq komponentlarda; **`docs/`** qayta tuzildi (arxitektura, GAPS, bog‘liqliklar).
- **Inputlar**: **`queueMicrotask`** bilan «hak»lar o‘rniga qiymat va maskani sinxronlashning aniq naqshlari.
- **`feat(build)`**: **`/date`** ostyo‘llar, **`preserveModules`** bilan alohida ESM/CJS, yangi bundl bo‘lishi (merge dan keyingi yakuniy relizga kiradi).

---

## [0.5.1] — 2026-04-04

**0.5.0** dan keyingi patch: varaqlarni query bilan sinxronlashtirish hooki va `hooks/` papka tuzilishi.

### Added

- **`useTabsSearchParam`**: query (`?…=`) bilan bog‘lash hooki — **`value`**, **`setTab`**, **`onChange`** (alias), **`getTabFromUrl`**, **`popstate`** obunasi; **`Tabs`** komponenti URL siz; **`defaultValue`**, **`replace`**, **`validValues`** opsiyalari. **`UseTabsSearchParamResult`** tipi.
- **`tabsSearchParams`** utilitalari (`readSearchParam` / `writeSearchParam`) va testlar.

### Changed

- **`hooks`**: **`useClickOutside`** endi **`src/hooks/dom/`** da; varaqlar va URL — **`src/hooks/tabs/`** da; umumiy qayta eksport **`src/hooks/index.ts`**; **`HeaderCard`** importi **`@/hooks`** dan.

---

## [0.4.1] — 2026-03-17

### Fixed

- Matn to‘sqinligi: **`SidebarCard`**, **`HeaderCard`**, **`UserProfileCard`** — kartochka chegarasidan chiqmasdan to‘g‘ri kesish/o‘rash.

---

## [0.4.0] — 2026-03-17

### Added

- **`Table`** — sahifalash bilan jadval va Storybook’da holat galereyasi.
- **`Tabs`** — compound komponent (`Tabs.Tab`, `Tabs.Panel` va ARIA bog‘lanishi).
- **Layout**: **header balandligi 88px**, **sticky** xulq-atvor, **`LayoutRoot`**, saydbar **`z-index`** ning qolgan sarlavha bilan moslashuvi.

### Fixed

- **Sidebar**: opsiyalar bo‘lmasa dropdown ikonkasi ko‘rinmaydi; dropdown yo‘q bo‘lsa sarlavhadagi yig‘ish triggeri; **`SidebarCard`** da `as="div"` uchun **TS** tuzatish (tugma/`div` alohida render).

### Changed

- **Hujjatlar**: **o‘rnatish va nashr** qo‘llanmalari (`MAINTAINER`, `DEVELOPER`), **README** da iste’molchi bog‘liqliklari va to‘liq o‘rnatish buyrug‘i.

---

## [0.3.0] — 2026-03-11

### Changed

- **Bundl samaradorligi**: artefakt hajmini optimallashtirish — `dist` da taxminan **~6.9 MB → ~1.8 MB**, **main** kirish **~528 KB → ~84 KB** (modul daraxti va chunk bo‘lishi).

---

## [0.2.0] — 2026-03-11

### Added

- `DateInput` separate subpath export (`/date`) — optional peer `react-imask`
- `PhoneInput` separate subpath export (`/phone`) — optional peer `react-phone-number-input`
- `preserveModules: true` for both ESM and CJS output — full tree-shaking support
- `sourcemap: true` for easier debugging of library consumers
- z-index token scale in tokens.css: `--z-base`, `--z-raised`, `--z-sticky`, `--z-sidebar`, `--z-dropdown`, `--z-overlay`, `--z-toast`
- `displayName` on all 28+ public components for React DevTools
- **SidebarContext** — `collapsed` saydbar holati kontekst orqali, qo‘lda `collapsed` prop drilling siz
- Tabs: ARIA accessibility (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls`, `aria-labelledby`, `useId`)

### Fixed

- ButtonGroup: removed `!important`, replaced with `--btn-radius` CSS custom property
- Badge: removed `line-height: 14px !important` — child elements now inherit line-height
- AvatarGroup: React keys now use `child.key` when available instead of always using array index
- Toast actions: React keys now use `action.key` when available

### Changed

- `minify: true` in production build (was accidentally disabled)
- z-index values replaced with semantic tokens in all 6 layout/overlay files

---

## [0.1.0] — initial

Birinchi qisqichning qisqacha mazmuni; hozirgi API ga mos **Table** va **Tabs** tarkibi **[0.4.0]** da qayd etilgan.

### Added

- Button, ButtonGroup, Badge, Typography
- Accordion, Avatar, AvatarCard, AvatarGroup
- Breadcrumb, ContentDivider
- Toast, ToastSlot, ToastAction
- Tabs (compound: Tabs.Tab, Tabs.Panel)
- Table with pagination
- Sidebar system: Sidebar, SidebarLayout, SidebarHeader, SidebarHeaderCard, SidebarFooter, SidebarItem, SidebarCard, SidebarUserProfileCard, SidebarSection
- TextInput, EmailInput, DateInput, SelectInput, SiteInput, ShareLinkInput, PhoneInput
- Checkbox, CheckboxField
- Calendar
- PageHeader
- RHF adapters: RHFCheckbox
- CSS design tokens, shadow tokens, color palette
- Storybook 7 with autodocs
- Vitest + React Testing Library setup
