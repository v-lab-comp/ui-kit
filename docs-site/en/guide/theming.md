---
title: Theming
description: Unstyled components and skins — enabling a skin, ThemeProvider, light and dark schemes, SSR, overriding styles, tokens and writing your own skin.
---

# Theming

**V-Lab UI Kit** components ship no CSS of their own. All of the look comes from a **skin** — a set of styles switched on by an attribute on `<html>`. Below: how to enable a skin and switch the scheme, how to render the theme on the server, how to restyle components for your product, and how to write your own skin.

## Unstyled components and skins

- A **component** renders only a stable class `vl-<name>`, part classes `vl-<name>__<part>` and data attributes from its **contract**. No hashed classes and no CSS in JS.
- A **skin** styles those classes and attributes. The package ships one skin — **`corporate`** (the kit’s previous look). A skin is published as two files: `@v-lab/ui-kit/skins/corporate.css` — its CSS, `@v-lab/ui-kit/skins/corporate` — the `corporateSkin` manifest. Only the skins an app imports end up in its bundle.
- Two independent axes: the **skin** (shape, sizes, fonts, palette) and the **color scheme** (`light` / `dark`). Every skin supports both schemes.
- A skin is switched on by the `data-vl-skin` attribute on `<html>`. Without it, components stay unstyled — that is what “unstyled” means.

What a skin receives, using a button as an example:

```tsx
<Button size="small">Save</Button>
```

```html
<button
  class="vl-button"
  data-variant="filled"
  data-color="primary"
  data-size="small"
  data-shape="rounded"
>
  Save
</button>
```

## Setup with ThemeProvider

```tsx
import '@v-lab/ui-kit/skins/corporate.css' // first, before your app styles
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

root.render(
  <ThemeProvider skins={[corporateSkin]} defaultColorScheme="system" storageKey="app-theme">
    <App />
  </ThemeProvider>
)
```

Both imports are needed. `@v-lab/ui-kit/skins/corporate` is only the manifest (the skin’s name and schemes); it does not load any CSS. The styles come from `@v-lab/ui-kit/skins/corporate.css`. Load it **before** your own styles: your rules with the same selector weigh as much as the skin’s rules and win by order (see [Overriding styles](#overriding-styles)).

### `ThemeProvider` props

| Prop                  | Type                                      | Default         | Purpose                                                              |
| --------------------- | ----------------------------------------- | --------------- | -------------------------------------------------------------------- |
| `skins`               | `readonly Skin[]` (**required**)          | —               | Available skins; the first one is the default. An empty array throws |
| `skin`                | name of one of `skins`                    | —               | Controlled: active skin                                              |
| `defaultSkin`         | name of one of `skins`                    | `skins[0].name` | Uncontrolled: initial skin                                           |
| `onSkinChange`        | `(name) => void`                          | —               | Called from `setSkin`                                                |
| `colorScheme`         | `'light' \| 'dark' \| 'system'`           | —               | Controlled: scheme                                                   |
| `defaultColorScheme`  | `'light' \| 'dark' \| 'system'`           | `'light'`       | Uncontrolled: initial scheme                                         |
| `onColorSchemeChange` | `(scheme: ColorSchemePreference) => void` | —               | Called from `setColorScheme`                                         |
| `storageKey`          | `string`                                  | —               | `localStorage` key under which the user’s choice is remembered       |
| `children`            | `ReactNode`                               | —               | Your app                                                             |

How it works:

- **Controlled / uncontrolled.** If you pass `skin` (or `colorScheme`), the provider does not change the value itself: `setSkin` / `setColorScheme` only call `onSkinChange` / `onColorSchemeChange`, and you pass the new value back. Without them, `defaultSkin` / `defaultColorScheme` apply.
- **`storageKey`.** The choice is stored in `localStorage` as JSON `{ skin, colorScheme }` and on the next start takes precedence over `defaultSkin` / `defaultColorScheme`. It is written only when both the skin and the scheme are uncontrolled.
- **`'system'`** follows `prefers-color-scheme` and switches together with the OS setting, without a reload.
- **A skin with `load`** (lazy CSS, see [below](#define-skin)) is applied only after the `load()` of every skin in its chain has resolved; until then the new skin’s attributes are not put on `<html>`.

What the provider puts on `<html>`:

| Attribute / property | Value                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| `data-vl-skin`       | The `extends` chain, space-separated: `corporate`, for a derived skin `corporate brand` |
| `data-vl-scheme`     | The resolved scheme: `light` or `dark`                                                  |
| `data-theme`         | Same as `data-vl-scheme` — a transitional alias, do not rely on it                      |
| `color-scheme`       | Inline style `color-scheme: light \| dark` — for native controls and scrollbars         |

The attributes live on `<html>` so the theme reaches portals: modals, toasts and dropdowns render into `body`. On unmount, the provider restores the previous values of `<html>`.

### `useTheme()`

The hook works only inside `ThemeProvider` (it throws outside of it) and returns:

| Field                 | Type                                      | Purpose                                              |
| --------------------- | ----------------------------------------- | ---------------------------------------------------- |
| `skin`                | `string`                                  | Name of the active skin                              |
| `setSkin`             | `(name: string) => void`                  | Change the skin; a name not in `skins` throws        |
| `skins`               | `string[]`                                | Names of the available skins                         |
| `colorScheme`         | `'light' \| 'dark' \| 'system'`           | The user’s choice                                    |
| `resolvedColorScheme` | `'light' \| 'dark'`                       | The actual scheme after resolving the system setting |
| `setColorScheme`      | `(scheme: ColorSchemePreference) => void` | Change the scheme                                    |

A light / dark / system switcher:

```tsx
import { Button, useTheme, type ColorSchemePreference } from '@v-lab/ui-kit'

const SCHEMES: { value: ColorSchemePreference; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
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
      <span>Now: {resolvedColorScheme}</span>
    </div>
  )
}
```

## Without the React provider

The provider only sets attributes — you can set them yourself (a static page, a non-React app):

```html
<html data-vl-skin="corporate" data-vl-scheme="dark" style="color-scheme: dark"></html>
```

- `data-vl-skin` is required: without it the skin does not apply. For a derived skin, use the whole chain: `data-vl-skin="corporate brand"`.
- `data-vl-scheme="dark"` turns on the dark scheme; without the attribute (or with `light`) the scheme is light.
- The skin’s CSS is loaded the same way: `@v-lab/ui-kit/skins/corporate.css`.

Switching from JS:

```ts
const root = document.documentElement
root.dataset.vlSkin = 'corporate'
root.dataset.vlScheme = 'dark' // or 'light'
root.style.colorScheme = 'dark'
```

`useTheme()` is not available without the provider — in that case switch the scheme through the attributes.

## Nested containers: `data-theme`

To render part of the page in a different scheme, put `data-theme="dark"` on a container (or `data-theme="light"` inside a dark page):

```tsx
<section className="promo" data-theme="dark">
  <Button>Button in a dark block</Button>
</section>
```

- It works only inside an element with `data-vl-skin`: the skin redefines tokens for the `[data-theme='light' | 'dark']` subtree.
- The attribute changes tokens only. Set the container’s own background and text color with tokens: `background: var(--bg-white-0); color: var(--text-strong-950)`.
- Portals (modals, toasts, dropdowns) render into `body` and take the scheme from `<html>`, not from the container.
- Native controls and scrollbars follow the CSS `color-scheme` property, and the provider sets it only on `<html>`. Add it for the container yourself: `[data-theme='dark'] { color-scheme: dark; }`.

## Several providers on a page

Several `ThemeProvider`s on one page are supported: for example, several React roots or a widget with its own provider inside an app.

- All providers write to the same `<html>`, and the **last applied** one is in effect — the one mounted last, or the one whose skin or scheme changed last.
- When a provider unmounts, `<html>` gets the state of the next live provider. The original attributes of `<html>` are restored only when the last one unmounts.
- Each provider has its own state: `useTheme()` returns the values of the nearest provider, and `setColorScheme` in one does not change the scheme of another. If the providers should show the same thing, pass them the same values through the controlled `skin` / `colorScheme` props.

## SSR

The kit renders on the server (`renderToString`), but `ThemeProvider` puts the attributes on `<html>` only in an effect on the client. Without the attributes in the server HTML, the page stays unstyled until hydration. So render them on the server `<html>` with the `themeHtmlAttributes(skin, scheme = 'light')` helper from `@v-lab/ui-kit`:

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

These are exactly the attributes the provider sets (it writes them through the same helper). For a derived skin `data-vl-skin` is the whole chain: `themeHtmlAttributes(brandSkin)` → `'corporate brand'`. After hydration the provider overwrites the attributes with the current values. The values are plain strings, so you can also write them by hand: `<html data-vl-skin="corporate" data-vl-scheme="light" data-theme="light" style="color-scheme: light">`.

### Next.js App Router

The built package has no `'use client'` directives yet. App Router server components cannot use hooks and context, so do not import kit components directly — go through your own file with `'use client'` and named re-exports (Next.js does not support `export *` in a `'use client'` file):

```ts
// app/ui-kit.ts
'use client'
export { Button, SelectInput, useTheme } from '@v-lab/ui-kit'
```

The provider goes into a client file too. A skin with `load` is a function, and functions cannot be passed as props from a server component to a client one:

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
// app/layout.tsx — a server component
import '@v-lab/ui-kit/skins/corporate.css'
import './globals.css'
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...themeHtmlAttributes(corporateSkin, 'light')}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

Once the directives are in the build, the wrapper file will no longer be needed. The task is described in the repository: `docs/tech-debt/use-client-directive.md`.

### The first frame with `storageKey` and `'system'`

The server sees neither `localStorage` nor the OS setting. So the server HTML arrives in the scheme you passed to `themeHtmlAttributes` (usually `light`), and the provider turns on the saved or system dark scheme only after hydration — for a user with the dark scheme the page briefly flashes light. This is a known limitation; possible solutions (an inline script in `<head>` that sets the scheme before the first paint, or a cookie) are discussed in `docs/tech-debt/ssr-color-scheme-flash.md`.

- If the user’s choice is stored where the server can see it (for example, in a cookie), pass it both to `themeHtmlAttributes` and to the provider through the controlled `colorScheme` prop — then the first frame is in the right scheme right away.
- For the same reason, markup that depends on `colorScheme` / `resolvedColorScheme` (for example, the switcher above) may not match the server markup: the provider reads `localStorage` and the system setting already in the first client render. Show such UI after mount.

## Overriding styles {#overriding-styles}

### `vl-*` classes

In the skin’s CSS all of a component’s rules live in one block `:where([data-vl-skin~='corporate']) { … }`, and in the built `skins/corporate.css` every rule looks like `:where([data-vl-skin~='corporate']) .vl-button`. The `:where(...)` prefix has **zero specificity**, so a skin rule weighs as much as its inner selector: `.vl-button` is a single class. The same selector (or your class of the same weight) wins if your CSS is loaded **after** the skin’s CSS:

```css
/* app.css — loaded after @v-lab/ui-kit/skins/corporate.css */
.vl-button {
  font-weight: 600;
}

.checkout-button {
  min-width: 160px;
}
```

```tsx
<Button className="checkout-button">Pay</Button>
```

Variant rules in the skin weigh as much as the root: the root in them is wrapped in `:where()`, and `:where(.vl-button)[data-shape='circle']` is a single attribute. So your rule on `.vl-button`, loaded later, overrides them too for the same property.

Rules with pseudo-classes are heavier: for example, the `filled` hover is `:where(.vl-button)[data-variant='filled']:hover:not(:disabled)`. To beat such a rule, repeat the same data attributes and pseudo-classes:

```css
.checkout-button[data-variant='filled']:hover:not(:disabled) {
  background-color: var(--primary-darker);
}
```

The attributes, parts and states of every component are described in its contract — see [Contracts](#contracts).

### CSS variables (tokens)

Components read colors, radii and shadows from tokens (`var(--…)`), so recoloring through them is easiest. Globally — on `:root`, in CSS loaded after the skin’s CSS:

```css
/* app.css — loaded after @v-lab/ui-kit/skins/corporate.css */
:root {
  --primary-base: var(--purple-500);
  --primary-dark: var(--purple-800);
  --primary-darker: var(--purple-700);
  --primary-alpha-10: var(--purple-alpha-10);
  --primary-alpha-16: var(--purple-alpha-16);
}
```

Why this works in both schemes: the skin declares the light tokens on `[data-vl-skin~='corporate']` and the dark ones on `:where([data-vl-skin~='corporate'])[data-vl-scheme='dark']`. Both selectors weigh as a single attribute, the same as `:root`, and your block, loaded later, wins.

`--primary-*` are the same in both schemes, so one block is enough. If a token differs between the schemes (`--bg-*`, `--text-*`, `--stroke-*` and others), set both values — the dark block after the light one:

```css
/* light scheme: <html> and nested light containers */
:root,
[data-theme='light'] {
  --bg-weak-50: var(--purple-50);
}

/* dark scheme: <html> and nested dark containers */
[data-vl-scheme='dark'],
[data-theme='dark'] {
  --bg-weak-50: var(--purple-950);
}
```

The skin redeclares tokens on nested `[data-theme]` containers, so `:root` alone is not enough for them — hence `[data-theme='…']` in the selectors. For tokens that are the same in both schemes, `:root, [data-theme]` is enough.

Locally — on any container: values inherit down the tree.

```css
.promo {
  --primary-base: var(--purple-500);
  --primary-dark: var(--purple-800);
}
```

Inside a container, override **semantic** tokens (`--primary-base`), not primitives (`--blue-500`): a semantic token is computed where it is declared (on `<html>`), so changing a primitive inside a container no longer affects it.

Besides the shared tokens, some components have their own variables: for example, the button reads `var(--btn-radius, var(--radius-10))`, and input sizes are set by the `--base-input-*` variables in `src/skins/corporate/components/base-input.variables.css`. The full token list is in [Design system](./design-system/), in particular [Semantic tokens](./design-system/semantic-tokens).

### `data-color` palettes

Color variants (`primary`, `neutral`, `error`, `information`, `warning`, `success`, `away`, `feature`, `verified`, `highlighted`, `stable`) are selected by the `data-color` attribute, and the palette sets the `--pal-base`, `--pal-hover`, `--pal-active`, `--pal-bg-hover`, `--pal-bg-active` variables. This works on any element inside the skin, including your own:

```tsx
<div className="note" data-color="warning">
  Check the payment details
</div>
```

```css
.note {
  border-left: 2px solid var(--pal-base);
  background: var(--pal-bg-hover);
}
```

For a single button in an arbitrary color there is the `customColor` prop (hex): it sets `--pal-*` inline and drops `data-color`.

## Writing your own skin

A skin is CSS plus a manifest. Your skin does not have to live in the kit: in an app it is a plain CSS file loaded after the base skin’s CSS, plus a `defineSkin` manifest. The easiest start is a skin derived from `corporate`: it takes all the styles of the base skin and overrides tokens and individual rules on top.

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

| Field     | Type                     | Purpose                                                                             |
| --------- | ------------------------ | ----------------------------------------------------------------------------------- |
| `name`    | `string`                 | Skin name — the value in `data-vl-skin` and in `[data-vl-skin~='<name>']` selectors |
| `schemes` | `['light', 'dark']`      | Both schemes are required                                                           |
| `extends` | `Skin`                   | Base skin: its styles apply, and this skin overrides on top                         |
| `load`    | `() => Promise<unknown>` | Lazy loading of the skin’s CSS; the provider applies the skin only after it         |

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

- **`extends` and the chain.** The provider unfolds the `extends` chain (`skinChain(brandSkin)` → `[corporateSkin, brandSkin]`) and sets `data-vl-skin="corporate brand"`. `corporateSkin` is needed in `skins` only so that users can switch to it: for the chain, the provider takes the base skin from `extends`.
- **Why `~=`.** The `[data-vl-skin~='corporate']` selector matches a whole word in a space-separated list, so with `data-vl-skin="corporate brand"` the rules of both `corporate` and `brand` apply. With `=` the base skin’s rules would switch off for the derived skin.
- **`load`.** The provider calls `load()` on every skin in the chain that has it and applies the skin after all of them have resolved. `corporateSkin` has no `load` — its CSS is loaded with a regular import. Without `load`, the derived skin’s CSS can be imported statically as well — after `@v-lab/ui-kit/skins/corporate.css`.

A skin without `extends` has to style every component you use and declare its own tokens. The `corporate` rules and tokens do not affect it: they are scoped to `[data-vl-skin~='corporate']`.

### Skin CSS

Component rules go into **one** block with the skin prefix, using native CSS nesting. Tokens go separately, with explicit selectors: a nested rule selects descendants of the skin element, while tokens are declared on `<html>` itself and on nested `[data-theme]` containers.

`brand.css`:

```css
/* Tokens: light scheme + nested light containers */
[data-vl-skin~='brand'],
:where([data-vl-skin~='brand']) [data-theme='light'] {
  --primary-base: var(--purple-500);
  --primary-dark: var(--purple-800);
  --primary-darker: var(--purple-700);
  --primary-alpha-10: var(--purple-alpha-10);
  --primary-alpha-16: var(--purple-alpha-16);
}

/* Tokens: dark scheme + nested dark containers */
:where([data-vl-skin~='brand'])[data-vl-scheme='dark'],
:where([data-vl-skin~='brand'])[data-theme='dark'],
:where([data-vl-skin~='brand']) [data-theme='dark'] {
  --primary-base: var(--purple-400);
}

/* Components: one block; inside — root, variant, part, state */
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

/* @keyframes — outside the block: they are not allowed inside a rule */
@keyframes vl-brand-tab-in {
  from {
    opacity: 0.6;
  }
}
```

Rules:

- **One `:where([data-vl-skin~='<name>']) { … }` block** per file. The prefix is written once and adds no weight: a `.vl-button` rule inside the block weighs as a single class. The build flattens the nesting into `:where([data-vl-skin~='brand']) .vl-button`. In the kit Vite (esbuild) does this; in your own project make sure your bundler flattens nesting or your target browsers support it. Without nesting, the same thing is written with the prefix on every rule: `:where([data-vl-skin~='brand']) .vl-button { … }`.
- **Selectors inside the block:** root — `.vl-<name>`, part — `.vl-<name>__<part>`, variant — `[data-<attr>='<value>']`, boolean state — `[data-<state>]`. To make a variant rule weigh as a single attribute (as `corporate` does), wrap the root in `:where()`: `:where(.vl-button)[data-variant='ghost']`.
- **Native states** are not duplicated in the contract: use `:disabled`, `:focus-visible`, `[aria-expanded]` and so on.
- **Colors and sizes** — through semantic tokens: then the dark scheme works without separate rules.
- **Tokens** — with explicit selectors, as in the example: light ones on `[data-vl-skin~='<name>']` and `:where([data-vl-skin~='<name>']) [data-theme='light']`, dark ones on the three `:where(...)` branches. All of them weigh as a single attribute, so the dark block beats the light one by order, and `:root` in app CSS loaded after the skin beats both.
- **`@keyframes`** — outside the block; prefix the name with the skin name so it does not collide with other animations.
- **Order.** A derived skin’s rules weigh the same as the base skin’s rules and win by order: the derived skin’s CSS must come after `@v-lab/ui-kit/skins/corporate.css`. A rule on the root (`.vl-button`) also overrides the base skin’s variant rules for the same property (`:where(.vl-button)[data-shape='circle']`) — override a property at the same level where the base skin sets it.
- **Tokens per scheme.** The derived skin’s light block comes after the base skin’s dark block and, at equal weight, overrides it. If the derived skin changes a token that differs in the base skin’s dark scheme (`--bg-*`, `--text-*`, `--stroke-*` and others), set it in the dark block too.

Primitives (`--purple-500`, …) are declared by the `corporate` skin, so a derived skin can reference them.

### A skin inside the kit

A skin published together with the kit is a folder `src/skins/<name>/`: `index.ts` (the `defineSkin(...)` manifest, imports `./index.css`), `index.css` (imports the skin’s files in cascade order), token files and `components/*.css`. The build finds every such folder with `index.ts` on its own and builds `dist/skins/<name>.js` (manifest) and `dist/skins/<name>.css` (CSS of this skin only). In the package they are available as `@v-lab/ui-kit/skins/<name>` and `@v-lab/ui-kit/skins/<name>.css`; an app can lazy-load a second kit skin with `load: () => import('@v-lab/ui-kit/skins/<name>.css')`.

The rules for writing a skin are in the repository: `docs/architecture/theming.md`; how `corporate` is built (file order, tokens, palettes, hover halo) — `src/skins/corporate/README.md`.

### Contracts {#contracts}

A contract is a component’s public API for skins: a name (→ class `vl-<name>`), enumerated attributes, boolean states and parts. Component prop types are derived from the contract, so the component and the skins cannot drift apart. The button contract (`src/theme/contracts/button.ts`):

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

What a skin styles from it:

| Selector                                                      | Comes from                           |
| ------------------------------------------------------------- | ------------------------------------ |
| `.vl-button`                                                  | `name: 'button'`                     |
| `[data-variant='filled' \| 'stroke' \| 'lighter' \| 'ghost']` | `attributes.variant`                 |
| `[data-color='primary' \| 'neutral' \| …]`                    | `attributes.color` (`COLOR_OPTIONS`) |
| `[data-size='medium' \| 'small' \| 'x-small' \| '2x-small']`  | `attributes.size`                    |
| `[data-shape='rounded' \| 'circle' \| 'square']`              | `attributes.shape`                   |
| `[data-custom-color]`                                         | `states: ['custom-color']`           |

Helpers from `@v-lab/ui-kit` build selectors and classes from a contract — for tests, `querySelector` and checking a skin:

```ts
import { buttonContract, contractPart, contractSelector, themeContracts } from '@v-lab/ui-kit'

contractSelector(buttonContract, { variant: 'ghost', size: 'small' })
// ".vl-button[data-variant='ghost'][data-size='small']"

contractSelector(buttonContract, { 'custom-color': true })
// ".vl-button[data-custom-color]"

contractPart(themeContracts.modal, 'panel')
// "vl-modal__panel"
```

`themeContracts` is the registry of all component contracts (77 of them; keys in camelCase: `button`, `modal`, `tabs`, …). Use it to check that a skin covers all classes, attributes and parts:

```ts
for (const contract of Object.values(themeContracts)) {
  console.log(contract.className, contract.attributes, contract.states ?? [], contract.parts ?? [])
}
```

Contract values are available as types too: `ContractValue<typeof buttonContract, 'size'>` → `'medium' | 'small' | 'x-small' | '2x-small'`.

Contracts are stable: removing or renaming a value is a breaking change, adding one is a minor release.
