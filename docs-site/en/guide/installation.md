# Installation

The source code of the **`@v-lab/ui-kit`** package is on GitHub: [v-lab-comp/ui-kit](https://github.com/v-lab-comp/ui-kit). Below is the minimal path; full instructions live in the repo at `docs/guides/installation.md`.

## Package registry

The registry the package will be published to has not been chosen yet. Once it is, its address and access setup will appear here; the decision is tracked in the repository at `docs/tech-debt/package-registry.md`.

Until then, install the package only from a local tarball (below): by the name `@v-lab/ui-kit`, npm would look for it on npmjs.com, and the kit is not published there.

## Installing dependencies

Build the tarball in a clone of the kit repository:

```bash
npm install
npm run build
npm pack
```

`npm pack` puts `v-lab-ui-kit-<version>.tgz` with the built `dist/` in the repository root. In the app, install the tarball together with the required peers:

```bash
npm install /path/to/v-lab-ui-kit-<version>.tgz react react-dom @remixicon/react clsx @floating-ui/react
```

npm records the tarball path (`file:…`) in the app’s `package.json`. To update the kit, build a new tarball and install it the same way.

Required peers for the main entry: **react**, **react-dom**, **@remixicon/react**, **clsx**, **@floating-ui/react** (overlays, Select, positioning).

Optional entry points (`date`, `phone`, `pdf`, `markdown`, `adapters`) require extra peer dependencies — see exports and `peerDependencies` in the package’s `package.json`. For **`adapters`** and **`react-hook-form`**, see [React Hook Form adapters](./adapters).

## Styles

Import the skin CSS **before** your own styles and wrap the app in `ThemeProvider`:

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

Components carry no styling of their own — a skin provides it. `@v-lab/ui-kit/skins/corporate.css` holds the **corporate** skin styles (tokens, palettes and every component); `@v-lab/ui-kit/skins/corporate` is its manifest `corporateSkin`. `ThemeProvider` turns the skin on (sets `data-vl-skin` and `data-vl-scheme` on `<html>`) and switches light/dark (`useTheme`). Without the provider, attributes on `<html>` are enough:

```html
<html data-vl-skin="corporate" data-vl-scheme="light"></html>
```

Dark scheme: `data-vl-scheme="dark"`. Without the skin CSS or without `data-vl-skin`, components stay unstyled.

Provider props, scheme switching, overriding styles and writing your own skin are covered in [Theming](./theming).

Optionally add the **Google Sans** variable font (`@fontsource/google-sans`) — see Storybook and repo guides.

## Importing components

```tsx
import { Button, TextInput } from '@v-lab/ui-kit'
```

Separate entry points: `@v-lab/ui-kit/date`, `phone`, `pdf`, `adapters`, etc. Short note on **`adapters`**: [React Hook Form adapters](./adapters).

## SSR and Next.js {#ssr}

The kit’s components render on the server (SSR). `ThemeProvider` sets the `<html>` attributes only in a client-side effect, so with SSR render them on the server `<html>` yourself using the `themeHtmlAttributes(skin, scheme = 'light')` helper from `@v-lab/ui-kit`. It returns the same attributes the provider sets: `data-vl-skin`, `data-vl-scheme`, `data-theme` and `style.colorScheme`. Skin styles then apply from the first frame, before hydration.

Example for the **Next.js App Router**:

```tsx
// app/ui-kit.ts
'use client'
export * from '@v-lab/ui-kit'
```

```tsx
// app/layout.tsx — a server component
import type { ReactNode } from 'react'
import '@v-lab/ui-kit/skins/corporate.css'
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { ThemeProvider } from './ui-kit'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" {...themeHtmlAttributes(corporateSkin, 'light')}>
      <body>
        <ThemeProvider skins={[corporateSkin]}>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

- **`'use client'`.** The built package has no `'use client'` directives yet, so in the App Router import kit components not from `@v-lab/ui-kit` directly but from your own `'use client'` file (`app/ui-kit.ts` above); for a sub-entry, use the same kind of file, e.g. `export * from '@v-lab/ui-kit/pdf'`. `themeHtmlAttributes` and `corporateSkin` are a plain function and object: import them from the package directly — a function imported through a `'use client'` file cannot be called on the server. A skin with `load` (a function) cannot be passed to `ThemeProvider` from a server component — move the provider into your own client component then. The task is tracked in the repository’s tech debt: `docs/tech-debt/use-client-directive.md`.
- **Stored or system scheme.** The server sees neither `localStorage` nor the OS setting, so with `storageKey` or `defaultColorScheme="system"` the first frame is light and the right scheme is applied after hydration (`docs/tech-debt/ssr-color-scheme-flash.md`).
- **`PdfPreview`** (`@v-lab/ui-kit/pdf`) works with SSR: `react-pdf` is loaded lazily, in the browser only. If the app has already set `pdfjs.GlobalWorkerOptions.workerSrc`, it is kept; otherwise the unpkg worker URL is used (`getPdfWorkerUrl`).

Attributes without the provider and scheme details are covered in [Theming](./theming).
