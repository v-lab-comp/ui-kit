# Storybook

Barcha komponentlar va galereyalarning interaktiv namoyishi.

## Mahalliy ishga tushirish

Repozitoriy ildizidan:

```bash
npm ci
npm run storybook
```

Dev-server ochiladi; standart port **6006** (aniq URL ni `npm run storybook` chiqishidan oling).

## Statik yig‘ish

Deploy yoki oflayn ko‘rish uchun:

```bash
npm run build-storybook
```

Natija — **`storybook-static/`** katalogi. Uni istalgan statik hosting orqali berish mumkin.

## Ushbu sayt bilan bog‘lanish

- **VitePress** (`docs-site/`) — qo‘llanmalar va komponent sahifalari; **Komponentlar** bo‘limida chap menyu Storybook papkalarini takrorlaydi (**Calendar**, **Components**, **Inputs**, **Layout**, **Overlays**).
- **Storybook** — barcha hikoyalar katalogi, variantlar va Docs paneli (**Gallery/**, **Design System/**, **Sidebar/** va boshqalar faqat shu yerda).

Storybook statik yig‘ishini joylashtirganda, ilova domenning ildizida bo‘lmasa, to‘g‘ri **base path** ni belgilang.
