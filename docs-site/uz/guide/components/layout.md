---
title: Layout
description: Ilova karkasi — saydbar, asosiy ustun, PageHeader; ikkita yig‘ish usuli.
---

# Layout

Razmetka bloklari **`@v-lab/ui-kit`** dan eksport qilinadi. Quyida ular **nimadan iborat** va **ikki odatiy ssenariy**: «soddaroq bog‘lanish» (**SidebarLayout** + kontent ustuni) va qat’iy sarlavha bilan «to‘liq sahifa» (**LayoutRoot** + **SidebarInset**).

**`useSidebar`** hooki **`SidebarLayout`** kontekstidan **`collapsed`** va **`toggle`** qaytaradi. Provayder bo‘lmasa, **`Sidebar`** / **`SidebarItem`** ga **`collapsed`** ni qo‘lda bering va **`SidebarTrigger`** ga **`onToggle`** qo‘ying (quyidagi preview kabi).

## Preview

Uch blok: **faqat saydbar** (**`SidebarLayout`** + **`Sidebar`** + **`SidebarMain`**), **faqat yuqori yo‘l** asosiy ustunda (**`PageHeader`** + ostidagi placeholder), keyin Storybook **Layout / Full Page** dagi kabi **to‘liq yig‘inish**.

Qat’iy saydbar hujjat preview ramkasi ichida qoladi — docs o‘ramasidagi joylashuv konteksti tufayli (**preview** blokida **`transform`** — bo‘lmasa ustun **`position: fixed`** brauzer oynasiga yopishardi).

### Faqat saydbar

**`SidebarLayout`** → **`Sidebar`** (kontekstdan **`SidebarTrigger`** li sarlavha, navigatsiya, **`SidebarFooter`**) → o‘ngda placeholder bilan **`SidebarMain`**. **`LayoutRoot`** va **`PageHeader`** yo‘q.

<ComponentDocsPreview name="layoutSidebar" />

### Faqat PageHeader

Asosiy ustunning yuqori yo‘lagi (**`PageHeader`** va **`PageHeaderDemoContent`**) va ostida shartli kontent bloki — saydbarsiz **`SidebarInset`** kabi.

<ComponentDocsPreview name="layoutHeader" />

### To‘liq sahifa

**`LayoutRoot`** → **`Sidebar`** → **`SidebarInset`** (**`PageHeader`** + **`SidebarInsetContent`**).

::: tip `insetLeft` kengliklari
Maketda saydbar **272px** yoyilgan va **80px** yig‘ilgan (CSS dagi **`Sidebar`** bilan mos). **`collapsed`** da **`insetLeft`** ni shu yo‘lak kengligi bilan belgilang — aks holda asosiy ustun saydbar bilan to‘g‘ri tushmaydi.
:::

<ComponentDocsPreview name="layout" />

## Layout tuzilmasi

### Sahifani ikki usulda yig‘ish

| Yondashuv                                               | Qachon                                                                                                                                                                                                                                  |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`SidebarLayout`** + **`Sidebar`** + **`SidebarMain`** | Sodda: saydbar va kontent yonma-yon bitta flex o‘ramada; **`SidebarMain`** **`collapsed`** paytida o‘zi suriladi (**`margin-left`** chekinishi). Alohida «ilovadagi» yuqori sahifa yo‘lagi yo‘q.                                        |
| **`LayoutRoot`** + **`Sidebar`** + **`SidebarInset`**   | To‘liq karkas: ildiz **`height`** va **`overflow`** beradi, **skroll faqat kontent zonasida**, **`PageHeader`** yuqorida qoladi. **`SidebarInset`** **`insetLeft`** oladi — saydbar ustuni kengligi px da (**`collapsed`** ga bog‘liq). |

**`Sidebar`** chapda vizual jihatdan qat’iy (ilovada — oyna chetiga). **`SidebarInset`** da odatda **`PageHeader`** (non do‘ppi, harakatlar) va **`SidebarInsetContent`** — sarlavha ostidagi skroll maydoni.

### Komponentlar daraxti (to‘liq karkas)

```text
LayoutRoot                         ← sahifa ildizi: flex, overflow, balandlik
├── Sidebar                        ← saydbar ustuni (ilovada qat’iy pozitsiya)
│   ├── SidebarHeader              ← brend + sarlavha; trigger slot → SidebarTrigger
│   ├── SidebarContent             ← faqat navigatsiya bo‘limlari skroll
│   │   └── SidebarSection
│   │       └── SidebarItem …
│   └── SidebarFooter              ← SidebarUserProfileCard ustidan o‘rama (+ divider)
│
└── SidebarInset                   ← main: insetLeft = saydbar kengligi
    ├── PageHeader                 ← asosiy zona yuqori yo‘lagi
    └── SidebarInsetContent      ← sahifaning asosiy skrolli
```

**`LayoutRoot`** / **`PageHeader`** siz soddalashtirilgan variant:

```text
SidebarLayout                      ← collapsed kontekst provayderi + flex o‘rama
├── Sidebar
│   ├── SidebarHeader
│   ├── SidebarContent → SidebarSection → SidebarItem …
│   └── SidebarFooter (ixtiyoriy)
└── SidebarMain                    ← o‘ngda kontent, saydbar kengligi bo‘yicha chekinish
```

### Saydbar komponentlari

| Komponent                    | Vazifasi                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **`SidebarLayout`**          | **`SidebarContext`** provayderi (**collapsed**, **toggle**) va **`Sidebar`** + **`SidebarMain`** uchun flex o‘rama.      |
| **`Sidebar`**                | Ustun ildizi: yoyilgan / yig‘ilgan kenglik, **`collapsed`**.                                                             |
| **`SidebarHeader`**          | Saydbar sarlavhasi; ichida **`SidebarHeaderCard`**; ixtiyoriy **`divider`**, **`trigger`** sloti (**`SidebarTrigger`**). |
| **`SidebarHeaderCard`**      | Brend / sarlavha kartochkasi (**`SidebarHeader`** ichida; maxsus razmetkada alohida).                                    |
| **`SidebarContent`**         | Sarlavha va pastki qism o‘rtasidagi skroll qismi.                                                                        |
| **`SidebarSection`**         | **`label`** bilan punktlar guruhi.                                                                                       |
| **`SidebarItem`**            | Menyu punkti: **`leftNode`** (ikonka), **`active`**, **`collapsed`**.                                                    |
| **`SidebarTrigger`**         | Yig‘ish tugmasi; **`SidebarLayout`** bo‘lmasa **`onToggle`** va **`collapsed`** bering.                                  |
| **`SidebarFooter`**          | **`SidebarUserProfileCard`** bilan pastki qism (avatar, ism, email).                                                     |
| **`SidebarUserProfileCard`** | Profil kartochkasi (**`SidebarFooter`** yoki alohida).                                                                   |
| **`SidebarCard`**            | Ustun ichidagi umumiy kartochka.                                                                                         |

### Asosiy zona va ildiz

| Komponent                 | Vazifasi                                                                                                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`LayoutRoot`**          | Saydbarli sahifa ildizi: **`height`**, **`overflow`**, shunda **`SidebarInsetContent`** **`PageHeader`** ostidagi yagona skroll bo‘lsin.                                                  |
| **`SidebarInset`**        | **`<main>`** tegi: **`insetLeft`** chapdan ustunni saydbar kengligicha suradi (**`collapsed`** ni hisobga oling).                                                                         |
| **`SidebarInsetContent`** | **`PageHeader`** ostidagi **`overflow-y: auto`** maydoni.                                                                                                                                 |
| **`PageHeader`**          | Asosiy ustunning yuqori yo‘lagi; **`children`** — har qanday razmetka. Storybook demo uchun **`PageHeaderDemoContent`**. Alohida sahifa — [PageHeader](/uz/guide/components/page-header). |
| **`SidebarMain`**         | **`SidebarLayout`** bilan **`SidebarInset`** o‘rniga: chapdan chekinishli oddiy kontent bloki.                                                                                            |

## Import

```tsx
import {
  LayoutRoot,
  Sidebar,
  SidebarLayout,
  SidebarMain,
  SidebarContent,
  SidebarSection,
  SidebarItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarInsetContent,
  PageHeader,
  useSidebar,
} from '@v-lab/ui-kit'
```

## Misol: SidebarLayout + SidebarMain

**`LayoutRoot`** va qat’iy **`PageHeader`** kerak bo‘lmasa:

```tsx
import {
  Sidebar,
  SidebarLayout,
  SidebarMain,
  SidebarContent,
  SidebarSection,
  SidebarItem,
  SidebarHeader,
} from '@v-lab/ui-kit'

function BrandIcon() {
  return (
    <span style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--primary-base)' }} />
  )
}

export function Shell() {
  return (
    <SidebarLayout>
      <Sidebar>
        <SidebarHeader icon={<BrandIcon />} title="Loyiha" subtitle="Muhit" divider />
        <SidebarContent>
          <SidebarSection label="Bo‘lim">
            {/* SidebarItem + @remixicon/react ikonkalari */}
          </SidebarSection>
        </SidebarContent>
      </Sidebar>
      <SidebarMain>
        <main>Sahifa kontenti</main>
      </SidebarMain>
    </SidebarLayout>
  )
}
```

**`LayoutRoot`**, **`SidebarInset`** va **`collapsed`** paytida **`insetLeft`** bilan to‘liq sahifa — yuqoridagi preview va Storybook **Layout / Full Page** da.

## Misol: to‘liq karkas (LayoutRoot + SidebarInset)

**`collapsed`** ni o‘zimiz boshqaramiz (preview va **`FullLayout.stories.tsx`** kabi): **`SidebarTrigger`** da **`onToggle`**, **`SidebarInset`** da joriy saydbar kengligidan **`insetLeft`**.

```tsx
import { useState } from 'react'
import { PageHeader } from '@v-lab/ui-kit'
import { SidebarInset, SidebarInsetContent } from '@v-lab/ui-kit'
import { LayoutRoot } from '@v-lab/ui-kit'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  SidebarTrigger,
} from '@v-lab/ui-kit'

const W = 272
const W_COLLAPSED = 80

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const insetLeft = collapsed ? W_COLLAPSED : W

  return (
    <LayoutRoot>
      <Sidebar collapsed={collapsed}>
        <SidebarHeader
          icon={<BrandIcon />}
          title="Loyiha"
          subtitle="Muhit"
          divider
          collapsed={collapsed}
          trigger={
            <SidebarTrigger collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
          }
        />
        <SidebarContent>{/* SidebarSection → SidebarItem … */}</SidebarContent>
        <SidebarFooter
          src={avatarUrl}
          alt=""
          title="Ism"
          description="email@…"
          divider
          collapsed={collapsed}
        />
      </Sidebar>

      <SidebarInset insetLeft={insetLeft}>
        <PageHeader>{/* non do‘ppi, harakatlar */}</PageHeader>
        <SidebarInsetContent>{/* sahifaning asosiy skrolli */}</SidebarInsetContent>
      </SidebarInset>
    </LayoutRoot>
  )
}
```

## Asosiy proplar

Bitta tip «hamma narsa uchun interfeys» yo‘q: **`SidebarLayout`**, **`Sidebar`**, **`SidebarInset`**, **`LayoutRoot`**, **`PageHeader`** uchun alohida **`*.types.ts`**. Eksport jamlanmasi — **`src/index.ts`** va **`src/components/layout/`**.

Manbalar: `src/components/layout/`.
