# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Pattern

**Composition-first React component library with multi-entry bundling.** Every input = `InputField` + `BaseInput` composition. Every overlay = `@floating-ui/react` + shared `ModalProvider` stack. Heavy optional peers (`imask`, `libphonenumber-js`, `react-pdf`, `marked` / `turndown`, `react-hook-form`) live behind separate Vite entry points, never the main bundle.

## Stack

| Layer    | Tech                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------- |
| Runtime  | React 19 (dev and tests); peer `react` `^18.2.0 \|\| ^19.0.0` — no React-19-only APIs in `src/` |
| Language | TypeScript (strict)                                                                             |
| Bundler  | Vite + Rollup; ESM only, `preserveModules`                                                      |
| Styling  | Unstyled components + skins (`src/skins/<skin>/`), CSS Custom Properties; `clsx`                |
| Overlays | `@floating-ui/react`                                                                            |
| Icons    | `@remixicon/react`                                                                              |
| Docs     | Storybook 8 (`tags: ['autodocs']`), VitePress (`docs-site/`)                                    |
| Tests    | Vitest + React Testing Library (unit), Playwright (e2e)                                         |

## Hard constraints

- `forwardRef<HTMLElement, Props>` + `displayName` on every public component.
- Components ship **no CSS**: root `vl-<name>` + data-attributes / parts from a contract (`src/theme/contracts/`), styles only in skins (`src/skins/corporate/components/*.css`). Each skin CSS file wraps **all** its rules in **one** `:where([data-vl-skin~='corporate']) { … }` block written once (native nesting; `@keyframes` outside the block); token files use explicit selectors — see `docs/architecture/theming.md`. **No** CSS Modules, Tailwind, styled-components, inline styles, `!important`.
- All colours / spacing / radii / shadows / z-index from tokens (`var(--…)`), never literals.
- Hardcoded `z-index` integers are banned — use `--z-base`, `--z-raised`, `--z-dropdown`, `--z-sticky`, `--z-sidebar`, `--z-overlay`, `--z-modal`, `--z-tooltip`, `--z-toast`.
- `clsx` for conditional classes. Nothing else for class composition.
- New icon components go to `src/stories/helpers.tsx`, not inside component files.
- Raw SVG in components or stories is banned — use `@remixicon/react`.
- All components exported from `src/index.ts`. Exception: components pulling optional peers — separate entry (`src/date.ts`, `src/phone.ts`, `src/pdf.ts`, `src/markdown.ts`, `src/adapters/index.ts`).
- Any user-visible change → a day-file entry in `docs/changes/` (internal log) AND an entry under `## [Unreleased]` in `docs-site/guide/changelog.md` (public changelog). Rules: `docs/CONTRIBUTING.md`.
- **Two lockfiles.** Touching `dependencies` / `devDependencies` / `peerDependencies` means updating **both** `package-lock.json` (npm: local dev and `npm ci` in `.github/workflows/ci.yml`) and `pnpm-lock.yaml` (docs Docker build). Regenerate the pnpm one with **pnpm 9** — `npx pnpm@9 install --lockfile-only` — matching `corepack prepare pnpm@9` in `docs-site/docker/Dockerfile`. Newer pnpm silently drops the `pnpm.overrides` pins from `package.json` and rewrites peer resolutions across the tree. Verify with `npx pnpm@9 install --frozen-lockfile --lockfile-only`: `docs-site/docker/Dockerfile` runs `pnpm install --frozen-lockfile`, so a stale `pnpm-lock.yaml` breaks the docs image build with `ERR_PNPM_OUTDATED_LOCKFILE`.
- Base every PR on `dev`. `main` is updated only by release merges. Branch prefixes: `feature/`, `fix/`, `docs/`, `refactor/`.

## Commands

```bash
npm install
npm run storybook         # Storybook on :6006 — primary dev surface
npm run dev               # vite build --watch
npm run build             # production build of dist/ (runs format:check via prebuild)
npm run typecheck         # tsc, no emit
npm run test              # vitest watch on src/
npm run test:run          # vitest run (CI mode)
npm run test:run -- src/components/inputs/TextInput   # single file/suite
npm run coverage          # vitest run --coverage (v8)
npm run test:e2e          # Playwright (component e2e)
npm run test:e2e:docs     # Playwright against docs site
npm run lint              # eslint .
npm run lint:fix
npm run format            # prettier --write
npm run format:check      # runs automatically before build via prebuild
npm run docs:dev          # VitePress on :5173
npm run docs:build
npm run gen:primitives    # regenerate src/colors/primitives.ts from src/skins/corporate/primitives.css
npm run gen:flags         # fetch flag SVGs from Figma (requires Figma token)
npm run gen:sample-pdf    # generate sample PDF for PdfPreview stories
```

## Big-picture architecture

- **Public surface = entry points, not files.** Main bundle is `src/index.ts`; `src/date.ts`, `src/phone.ts`, `src/pdf.ts`, `src/markdown.ts`, `src/adapters/index.ts`, `src/icons.ts`, `src/flags.ts` are separate Vite entry points so optional peers never leak. Every `src/skins/<name>/index.ts` is auto-discovered as entry `skins/<name>` → `dist/skins/<name>.js` (manifest) + `dist/skins/<name>.css` (`cssCodeSplit`); exports `./skins/*` and `./skins/*.css`, no `./style.css`. Consumers import `@v-lab/ui-kit/skins/corporate.css` + `ThemeProvider skins={[corporateSkin]}` (SSR: `themeHtmlAttributes`).
- **Inputs are composed, not bespoke.** Every input wraps `InputField` (label / hint / error / prefix-suffix / size) around `BaseInput` (the `<input>` primitive). Composite inputs (`protocol+path`, `countryCode+phone`) use `useCompositeInput`.
- **Overlays share a stack.** `Modal`, `Popover`, `Tooltip`, `Drawer` are built on `@floating-ui/react` and coordinate through `ModalProvider` / `useModalStack` — Escape and `outsidePress` only fire on the top overlay; z-index grows by stack depth.
- **Tokens are CSS variables, not JS objects.** `src/skins/corporate/tokens.css` (light on `[data-vl-skin~='corporate']`, dark on `:where([data-vl-skin~='corporate'])[data-vl-scheme='dark']` and `[data-theme='dark']`, all (0,1,0)), `shadows.css`, `primitives.css`, `components/base-input.variables.css`, `palettes.css` (`--pal-*` per `[data-color='…']`), `halo.css` (hover halo, `--halo-*`). JS code needing a primitive imports from `src/colors/primitives.ts`, which is **generated** from `primitives.css` via `npm run gen:primitives` — never hand-edit the `.ts`.
- **Three docs surfaces, kept in sync.** Storybook (component API + variants), VitePress under `docs-site/` (public site with live demos via `src/docs/vitepress/componentDocsRegistry.ts`), and changelog split across an internal log (`docs/changes/`, day-files) plus the public `docs-site/guide/changelog.md`. Adding a component means: story + VitePress page (`docs-site/guide/components/`) + stubs in `en/` and `uz/` + sidebar entry in `docs-site/.vitepress/sidebar.i18n.ts` + day-file in `docs/changes/` + entry in the public changelog.
- **Cursor skills under `.cursor/skills/`** (`composite-inputs`, `inputs-development`, `fix-checklist`, `use-semantic-shadows`) — consult before extending those areas.

## Where to read what

| Task                                                         | File                                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Step-by-step: create a new component                         | [`docs/guides/new-component.md`](docs/guides/new-component.md)           |
| Input architecture (`InputField + BaseInput`, composite)     | [`docs/architecture/inputs.md`](docs/architecture/inputs.md)             |
| Overlay architecture (Floating UI + ModalProvider)           | [`docs/architecture/overlays.md`](docs/architecture/overlays.md)         |
| Layout architecture (LayoutRoot / Sidebar / Header / Drawer) | [`docs/architecture/layout.md`](docs/architecture/layout.md)             |
| Styling, tokens, palettes                                    | [`docs/architecture/styling.md`](docs/architecture/styling.md)           |
| Skins, color schemes, ThemeProvider, component contracts     | [`docs/architecture/theming.md`](docs/architecture/theming.md)           |
| Vite build, peer deps, sub-entries                           | [`docs/architecture/bundling.md`](docs/architecture/bundling.md)         |
| `react-hook-form` adapter pattern                            | [`docs/architecture/adapters.md`](docs/architecture/adapters.md)         |
| Catalogue of all components + RHF adapters                   | [`docs/reference/components.md`](docs/reference/components.md)           |
| Sub-entry points + peer deps                                 | [`docs/reference/subpath-exports.md`](docs/reference/subpath-exports.md) |
| Public hooks                                                 | [`docs/reference/hooks.md`](docs/reference/hooks.md)                     |
| Design tokens (full list)                                    | [`docs/reference/tokens.md`](docs/reference/tokens.md)                   |
| Publish a new version                                        | [`docs/guides/publishing.md`](docs/guides/publishing.md)                 |
| Breaking changes between versions                            | [`docs/guides/migrations.md`](docs/guides/migrations.md)                 |
| Accessibility requirements                                   | [`docs/guides/accessibility.md`](docs/guides/accessibility.md)           |
| Component API + interactive examples                         | Storybook (`npm run storybook`) and `docs-site/guide/components/`        |
| How docs work and where to write what                        | [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md)                           |
| Known open problems / tech debt (one file per task)          | [`docs/tech-debt/README.md`](docs/tech-debt/README.md)                   |

## Directory layout

```
src/
├── components/
│   ├── inputs/        — base/ (BaseInput, BaseCheckbox, InputField, useCompositeInput)
│   │                    + готовые поля (TextInput, EmailInput, DateInput→/date, PhoneInput→/phone, SelectInput, …)
│   ├── overlays/      — Modal (+ ConfirmModal, ModalStatus, ModalProvider), Popover, Tooltip
│   ├── layout/        — LayoutRoot, Header (PageHeader), Sidebar, Inset, Drawer
│   └── <other>/       — Button, Badge, Tag, Avatar*, Tabs, Table, Toast, Calendar, FileUpload, PdfPreview→/pdf, Comments, AppSwitcher, …
├── adapters/rhf/      — react-hook-form, entry → /adapters
├── hooks/             — dom/useClickOutside, tabs/useTabsSearchParam
├── theme/             — ThemeProvider, useTheme, defineSkin, контракты компонентов (contracts/)
├── skins/             — one folder per skin; corporate/ — index.ts (manifest) + tokens (tokens/primitives/shadows/palettes/halo.css)
│                        + components/*.css, index.css in cascade order; each folder builds to dist/skins/<name>.{js,css}
│                        → entries /skins/<name> (manifest) and /skins/<name>.css
├── colors/            — generated primitives.ts (NEVER hand-edit) + semantic.ts
├── stories/           — helpers.tsx (shared Storybook icons)
├── utils/             — formatSize, scrollLock, customPalette
└── index.ts / date.ts / phone.ts / pdf.ts / markdown.ts / icons.ts / flags.ts / adapters/index.ts
```

Component placement is structural, not by complexity: input → `inputs/`, floating UI → `overlays/`, page-frame → `layout/`, anything else → `components/<Name>/`. Detailed rationale: [`docs/architecture/overview.md`](docs/architecture/overview.md).

## Optional dependencies and entry points

| Component       | Peer deps                                                    | Entry                    |
| --------------- | ------------------------------------------------------------ | ------------------------ |
| `DateInput`     | `imask`, `react-imask` (≥7)                                  | `@v-lab/ui-kit/date`     |
| `PhoneInput`    | `libphonenumber-js` (≥1.11), `react-phone-number-input` (≥3) | `@v-lab/ui-kit/phone`    |
| `PdfPreview`    | `react-pdf` (≥7), `pdfjs-dist`                               | `@v-lab/ui-kit/pdf`      |
| `MarkdownInput` | `marked` (≥12), `turndown` (≥7)                              | `@v-lab/ui-kit/markdown` |
| RHF adapters    | `react-hook-form` (≥7)                                       | `@v-lab/ui-kit/adapters` |

For REST / `react-hook-form` use `DateInput` with `valueFormat="iso"` — callbacks then return `YYYY-MM-DD`. Full table of entry points → peer deps: [`docs/reference/subpath-exports.md`](docs/reference/subpath-exports.md).
