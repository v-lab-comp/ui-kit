---
title: Changelog
description: Version history of @v-lab/ui-kit
outline: deep
---

# Changelog {changelog}

This is the public changelog for teams **consuming** the package. The granular internal change log (for the team maintaining the package) lives in the `docs/changes/` directory. On any user-visible change, both places are updated.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

::: tip Latest stable release
**0.15.0** — 2026-09-17 · No public API changes: `PhoneInput` behavior fixes (pasting a number with the country code, country from an external `value`, non-E.164 values); this release was published via GitLab CI. **Avoid 0.13.0 and 0.13.1** (0.13.0 fails to build, 0.13.1 applies the halo incorrectly).
:::

---

## [Unreleased]

### Added

- **`ThemeProvider` / `useTheme`** — the skin and color scheme (`light` / `dark` / `system`) are set at the app root and apply everywhere, portals included: the provider sets `data-vl-skin`, `data-vl-scheme` and `color-scheme` on `<html>`. Controlled and uncontrolled modes, the choice can be remembered (`storageKey`); several providers on one page are supported — see [Theming](./theming).
- **The `corporate` skin** — the kit’s existing look, now as a separate skin: styles in `@v-lab/ui-kit/skins/corporate.css`, the `corporateSkin` manifest in `@v-lab/ui-kit/skins/corporate`. Each skin’s CSS is built into its own file, so an app bundle contains only the skins it imports.
- **Skins and contracts:** `defineSkin` for your own skin (inheritance via `extends`, lazy CSS loading via `load`) and component contracts (`defineContract`, `contractAttrs`, `contractPart`, `contractSelector`, the `themeContracts` registry) — which `vl-*` classes and data attributes each component renders. For example, `Button` renders `vl-button` and `data-variant` / `data-color` / `data-size` / `data-shape`.
- **`themeHtmlAttributes(skin, scheme)`** — skin and scheme attributes for the server `<html>` with SSR, so skin styles apply from the first frame, before hydration. Next.js App Router example: [Installation → SSR and Next.js](./installation#ssr).
- **Input accessibility.** `InputField` links the control to its hint and error (`aria-describedby`) and exposes the error and required state (`aria-invalid`, `aria-required`) — in every kit input. For your own fields built on `InputField`, the render function gets a second argument `control` with these attributes; `inputFieldLabelId(id)` gives the label id for `aria-labelledby`, `splitInputFieldProps(props)` splits field and control props.
- **`ThemeProvider onSkinLoadError`** — a failed skin CSS load (`load`) is no longer lost: the previous skin stays, the error goes to the handler or to `console.error`.

### Changed

- **The package is renamed** to `@v-lab/ui-kit`, scope `@ui-kit` → `@v-lab`.
- **Components are unstyled; styling lives in the `corporate` skin.** Components render stable `vl-<name>` / `vl-<name>__<part>` classes and data attributes from their contracts; CSS Modules and hashed class names are gone. Instead of `@v-lab/ui-kit/style.css`, import `@v-lab/ui-kit/skins/corporate.css` and turn the skin on: wrap the app in `ThemeProvider skins={[corporateSkin]}` or set `<html data-vl-skin="corporate">` — see [Installation](./installation). Global `.color-*` classes are replaced by the `data-color` attribute. The look is unchanged.
- **React 19.** The kit is developed and tested on React 19.3. The `react` / `react-dom` peer range is `^18.2.0 || ^19.0.0` (was `>=17`, but the kit never worked on React 17: components use `useId` from React 18). Apps on React 18.2+ keep working unchanged.
- **`Button` defaults to `type="button"`** — a button inside a `<form>` no longer submits it. Pass `type="submit"` to submit.
- **Icon-only buttons require an accessible name:** `Button`, `ToggleButton` and `SegmentedControl.Item` without `children` require `aria-label` or `aria-labelledby` in TypeScript; in dev mode a nameless one logs a warning. Wrappers can use the types without this rule: `ButtonBaseProps`, `ToggleButtonBaseProps`, `SegmentedControlItemBaseProps`.

### Fixed

- **`PdfPreview` no longer crashes SSR on import.** `react-pdf` (pdf.js) is loaded lazily, in the browser only: previously the static import touched the DOM while the module was loading. If the app has set its own `pdfjs.GlobalWorkerOptions.workerSrc`, it is kept; otherwise the unpkg worker URL is used.
- **Callback refs with a cleanup function (React 19)** on `Checkbox` / `BaseCheckbox`, `SearchInput`, `ShareLinkInput`, `RichInput`, `DateInput`, `PhoneInput` and `Popover`: the cleanup returned by the ref now runs on detach. These components used to forward the ref by hand, which dropped the cleanup and called the ref with `null`.
- **`AppSwitcher`: an empty `icon` string** shows the initial-letter tile. On React 19 an empty `<img>` stayed instead: React 19 does not set `src=""`, so the fallback never triggered.
- **Inputs: `data-filled` after a form reset.** After `form.reset()`, a `type="reset"` button or React 19’s automatic form reset (`<form action>`), an uncontrolled field no longer stays marked as filled (the “filled” border on an empty field).
- **`InputField` props no longer leak onto `<input>`:** `startBlock`, `endBlock`, `filled`, `wrapperClassName`, `wrapperStyle` on `EmailInput`, `PasswordInput`, `SearchInput`, `DateInput` and other fields used to land on the DOM element and do nothing — they now apply.
- **`RichInput` / `MarkdownInput`:** the editor takes its name from `label`.
- **`ThemeProvider`:** the system-scheme subscription is no longer recreated on every render; when switching to a lazily loaded skin, the previous skin stays until loading finishes. **`useClickOutside`** calls the latest callback after a re-render.

### Removed

- **The CommonJS build `dist/cjs/`** — the package ships as ESM only. `require('@v-lab/ui-kit')` on Node 20.19+ / 22.12+ loads the ESM build.
- **The `./style.css` export** (`@v-lab/ui-kit/style.css`) — styles now ship with the skin: `@v-lab/ui-kit/skins/corporate.css`.
- **Publishing to the GitLab npm registry** — `publishConfig`, which pointed to the GitLab Package Registry, is removed from `package.json`. The registry for the next release will be announced separately; until then, install the package from a local tarball — see [Installation](./installation). The source code has moved to GitHub: [v-lab-comp/ui-kit](https://github.com/v-lab-comp/ui-kit).

## [0.15.0] — 2026-09-17

### Fixed

- **`PhoneInput`: pasting a number with the country code.** `+998 90 123 45 67` or `998901234567` silently turned into `+998998901234`. A pasted full number now replaces the whole field, and a number of another country (`+7 912 345 67 89`) switches the select when that country is in `countries`. The same applies to browser autofill and inserts from a mobile keyboard.
- **`PhoneInput`: country follows an external `value`.** After a form `reset` or when a form is reopened for another record, the country is taken from the new number — previously it stayed the same, the console logged an error, and edits glued the number to the wrong code. An empty value does not reset the country.
- **`PhoneInput`: a full number can be selected and retyped** — typing a digit over a selection is no longer blocked.
- **`PhoneInput`: non-E.164 `value`** (`901234567`, `+998-901234567`, `+998 90 123-45-67`) is displayed correctly without calling `onChange`, so the form does not become dirty. An unparseable value shows an empty field with no console errors.

### Infrastructure

- **Package publishing via GitLab CI.** A release is cut by the pipeline on a `vX.Y.Z` tag: `typecheck` / `lint` / tests / build, a check that the tag matches the `package.json` version and that the changelog section exists, then `npm publish` to the GitLab Package Registry and a GitLab Release. Branches `release/*` expose a `release:bump` button (`BUMP` = `patch` / `minor` / `major`) that bumps the version and pushes the tag. See [`docs/guides/publishing.md`](https://github.com/v-lab-comp/ui-kit/blob/main/docs/guides/publishing.md).

## [0.14.0] — 2026-08-08

### Added

- **`RichInput`** — a multiline rich-text form field. A regular control built on `InputField` (`label`, `required`, `hint` / `error`, `completed`, `size`, `disabled`), with a `contenteditable` area and a toolbar instead of an `<input>`. The value is an HTML string: `value` + `onChange`, or `defaultValue`. The toolbar is configurable (`tools`: `bold`, `italic`, `underline`, `strikethrough`, `bulletList`, `orderedList`, `clear`; `tools={[]}` hides it) along with its position (`toolbarPlacement`). Also `maxLength` with a counter and paste trimming, `minRows` / `maxRows`, `readOnly`, and `name` for native `FormData` submission. **Enter** inserts a new line; the field never submits the form. Comment threads keep using `CommentRichInput`.
- **`MarkdownInput`** — the same editor as `RichInput`, but the outside value is **Markdown** instead of HTML. Imported from the new `@v-lab/ui-kit/markdown` entry point; requires the `marked` and `turndown` peer dependencies (the main bundle pulls neither, and `RichInput` keeps working with HTML). With `name`, `FormData` receives Markdown. The same entry exports the `markdownToHtml` / `htmlToMarkdown` converters, e.g. for a view mode. The default toolbar omits `underline`: CommonMark has no underline, and enabling it stores the formatting as inline `<u>…</u>` HTML.

### Changed

- **`CommentRichInput`** now runs on the shared internal `richText` layer (the same `contenteditable` mechanics as `RichInput`). Public API and behavior are unchanged; active toolbar buttons highlight more accurately across mixed selections.

## [0.13.2] — 2026-07-29

### Fixed

- **Hover halo on `filled` and `lighter`.** The base 1px hairline was applied instead of the wide aura (3px + glow): the `.halo` utility and the variant classes share the same specificity (0,1,0), and in the bundled `style.css` the utility lands after the variants — on a tie it won and silently overwrote their variables. On `variant="filled" color="primary"` the computed `::after` was `rgb(51,92,255) 0 0 0 1px`. `.halo` no longer declares `--halo-*` at all: the defaults now live in `var(--halo-ring-size, 1px)` fallbacks inside `::after`, so nothing declares the variable and rule order stopped mattering. Verified in a live Chromium: `filled` — 3px ring + glow, `lighter` — 3px, `stroke` / `ghost` — 1px, neutral — 1px in `--halo-neutral`.

### Changed

- **`--halo-*` can now be overridden from `:root`.** A side effect of the same fix: previously the declaration on the element itself beat the inherited value, so overriding the ring colour or width from an app was impossible without out-specifying `.halo`. Plain `:root { --halo-ring-color: … }` now works.

### Infrastructure

- **`postbuild`** — the check was extended: the build fails if the base `.halo` rule starts declaring `--halo-*` again.
- **`npm run verify:halo`** — halo verification in a live Chromium (Playwright) against the built `dist/`: the real `style.css` and the real hashed class names, hovering a button and asserting the computed `::after`. Catches what linters, types and unit tests cannot see.

## [0.13.1] — 2026-07-29

### Fixed

- **Consumer builds.** In 0.13.0 `dist/style.css` started with `@import "./tokens.css"` while `dist/tokens.css` was not shipped — both dev and build failed for consumers (`postcss-import` → `ENOENT`). The import was dangling: `src/styles/interactions.module.css` is pulled in only through `composes`, and Vite does not inline `@import` inside such modules, so it surfaced in the shared bundle. The import is removed — this does not affect the variables: `.halo` only reads them, and the tokens themselves arrive in `:root` together with `style.css`. Upgrade from 0.13.0 straight to 0.13.1; there are no API changes.

### Infrastructure

- **`postbuild`** — a `scripts/check-dist-css.mjs` check: the build fails if any `dist/**/*.css` still contains an `@import` pointing at a file that is not shipped. Neither typecheck, lint, tests nor `vite build` itself catch this — it only shows up on the consumer side, hence a dedicated step.

## [0.13.0] — 2026-07-29

### Added

- **Buttons — hover halo.** On hover a ring in the palette colour opens up around the button. Geometry and size stay unchanged: the ring lives on a pseudo-element and never affects layout (no `scale`, no `padding`, no neighbour shift). The treatment depends on the variant: `filled` / `lighter` get a soft wide aura, `stroke` / `ghost` get a crisp 1px accent hairline. Timing is asymmetric (130 ms in, 280 ms out, 60 ms press). Respects `prefers-reduced-motion`: the state remains, only the animation goes. Beyond `Button` it is wired into the kit's icon buttons: `Modal` and `Toast` close, `Tag` dismiss, `Calendar` and `PdfPreview` navigation, `Table` pagination, `SelectInput` / `AsyncSearchSelect` clear, `PasswordInput` eye, `ShareLinkInput` copy, `DateInput` calendar, `CommentRichInput` toolbar, `CommentsSection` menu, `FileUpload` action, `Sidebar` trigger, `AppSwitcher`.
- **`Button`** — `customColor?: string` prop: an arbitrary hex (`#rgb` / `#rrggbb` / `#rrggbbaa`) instead of the semantic palette. It overrides `color`, the hover / active / background shades are derived automatically, and the hover halo picks up the same colour. An invalid value is ignored — `color` stays in effect. `Badge` and `Tag` already had the same prop.
- **Tokens** — motion: `--motion-duration-fast`, `--motion-ease-standard`, `--motion-duration-halo-in` / `-out` / `-press`, plus `--halo-neutral` (ring colour for neutral buttons and buttons without a palette class). Durations used to be hardcoded inside components.

### Changed

- **`Button`** — transitions moved from the hardcoded `0.15s ease` to tokens (`--motion-duration-fast`, `--motion-ease-standard`); the value is unchanged so it still matches the rest of the kit. Added the `prefers-reduced-motion` block the component was missing.

## [0.12.0] — 2026-07-29

### Added

- **`CommentsSection`** — `collapseAfterLines?: number` prop. Clamps a comment body to N lines; a **Show more** / **Show less** button appears below. `0` / `undefined` — no limit (default behavior). The button shows only on real overflow; the expanded state is keyed by comment `id` and survives a list refetch (e.g. polling). Clamping applies to the rendered `contentHtml` (including `deletedWithContent`), but not to the inline edit editor or the deleted placeholder. New string keys `showMore` / `showLess` (EN defaults `Show more` / `Show less`) in `CommentsSectionStringKey` / `COMMENTS_SECTION_STRING_KEYS`.
- **`CommentsSection`** — layout handles without coupling to CSS-module class names: `inputPlacement?: 'top' | 'bottom'` (compose input position, default `top`), `toolbarStartSlot?: ReactNode` (slot before the input toolbar, e.g. the author avatar), `classNames?: Partial<Record<'root' | 'list' | 'card' | 'input', string>>` (classes for the inner parts) and `avatarSize?: AvatarSize` (avatar size, default 40).

### Changed

- **`CommentRichInput`** — the hardcoded `min-height: 116px` and `opacity: 0.8` (inactive field) defaults were removed: the field grows with its content and no longer looks `disabled`. The old behavior is restored via the `--comment-input-min-height` and `--comment-input-opacity` CSS variables.

## [0.11.0] — 2026-06-18

### Added

- **`Table`** — `maxHeight` prop enables native scrolling (vertical + horizontal) inside the table and pins the header (sticky `top: 0`) on vertical scroll.
- **`TableColumn`** — `sticky: 'left'` pins a column during horizontal scroll (requires `maxHeight` and the column's `width`). The last sticky column gets a divider shadow.

### Fixed

- **`DateInput`** — the dropdown calendar no longer overflows the screen: positioning moved to `@floating-ui/react` (`flip` + `shift` + portal into `body`), so the calendar is always fully visible without clipping or horizontal scroll.
- **Date pickers** — the current day is now visually highlighted (ring + primary color) so today's date is easy to spot.

## [0.10.0] — 2026-06-17

### Added

- **Input fields** — a filled field (with a value) gets a `--blue-400` border, distinguishing it from an empty field with a placeholder. Hierarchy: empty (grey) → filled (`--blue-400`) → focus (`--primary-base` + primary ring) → error (red). Works for text fields (`TextInput`, `EmailInput`, `PasswordInput`, `SearchInput`, `SiteInput`, `ShareLinkInput`), `DateInput`, `PhoneInput`, `SelectInput` (full + compact), `AsyncSearchSelect`, `TagInput`.
- **`InputField`** — `filled?: boolean` prop for controls without a regular `<input>` (Select, etc.). For text fields it is detected automatically: `BaseInput` sets `data-filled`.
- **`required` marker** — `requiredMarker?: ReactNode` prop (default `*`) on every labelled field (`InputField`, `TextInput`, `EmailInput`, `PasswordInput`, `SearchInput`, `SiteInput`, `ShareLinkInput`, `DateInput`, `PhoneInput`, `SelectInput`, `AsyncSearchSelect`, `TagInput`). The colour is overridable via the `--input-required-color` CSS variable.
- **`FileUploadField` / `FileDropZone` / `FileUploadItem`** — `texts?: FileUploadTexts` prop exposes every visible string for i18n (`title`, `subtitle`, `button`, `uploading`, `done`, `error`, `download`, `remove`, `ofLabel`); defaults live in `DEFAULT_FILE_UPLOAD_TEXTS`. New `maxSize?: number` prop (bytes): files over the limit are marked with `error` status. `accept` sets the allowed file types.

### Changed

- **Input focus** — border and focus-ring colour moved from `--stroke-strong-950` / `--neutral-alpha-16` to `--primary-base` / `--primary-alpha-16`.
- **`required` marker** — default asterisk colour changed from `--primary-base` (blue) to `--error-base` (red); the `FileUpload` marker is now red too.
- **Palette** — primitives aligned with the design token: `slate-200` `#eaecf0`, `blue-400` `#4c82ff`, `green-100` `#d6f5e8`, `purple-500` `#7d52f4`, `pink-400` `#ff68b3`, `neutral-500` `#7a7a7a`.

---

## [0.9.1] — 2026-05-20

**Comments** — length counter and admin “deleted but content visible” mode.

### Added

- **`CommentRichInput`** — new `maxLength?: number` prop. When set, a `current / max` counter (`tabular-nums`) appears in the footer; input above the limit is blocked via `beforeInput`, pasted text is truncated to the remaining room. When exceeded, the counter turns `--error-base` red and submit is disabled.
- **`CommentsSection`** — new `maxLength?: number` prop, forwarded to both the compose input and the inline edit editor.
- **`CommentThreadItem`** — new `deletedWithContent?: boolean` flag. Combined with `isDeleted: true`, keeps the deleted look (muted background, no menu) but renders `contentHtml` and a “deleted ·” marker next to the timestamp (admin / audit views).
- **`DEFAULT_COMMENTS_SECTION_STRINGS`** — new `deletedMark` key (`'deleted'`); picked up by `mergeCommentsSectionStringsFromJson` like the existing keys.

---

## [0.9.0] — 2026-05-20

**Comments** — inline editing and soft-delete with a built-in `ConfirmModal`; full EDOC API integration guide. **Accordion** — card background no longer changes on hover / open.

### Added

- **`CommentsSection`** — inline editing and deletion. New props `onEditComment(id, html)` / `onDeleteComment(id)`; `CommentThreadItem` gets optional `canEdit`, `canDelete`, `isEdited`, `isDeleted`. Cards with `canEdit` / `canDelete` expose a `…` Popover menu: “Edit” opens an inline editor inside the card, “Delete” opens the built-in `ConfirmModal` (strings from `strings`). `isEdited` renders an “edited ·” marker next to the timestamp; `isDeleted` renders a grey placeholder card without menu or content (admin mode).
- **`CommentRichInput`** — edit mode: `initialHtml`, `submitLabel` (text button instead of the paper-plane icon), `secondaryAction` (button left of Save, typically Cancel), `resetOnSubmit` (defaults to `true` for create, `false` when `initialHtml` is provided).
- **`DEFAULT_COMMENTS_SECTION_STRINGS`** — new keys: `editAction`, `deleteAction`, `editedMark`, `editSaveLabel`, `editCancelLabel`, `deletedPlaceholder`, `confirmDeleteTitle`, `confirmDeleteBody`, `confirmDeleteConfirm`, `confirmDeleteCancel`, `commentActionsAriaLabel`. `mergeCommentsSectionStringsFromJson` picks them up like the existing keys.
- EDOC API integration guide (`/edocapp/api/edoc/v1/documents/.../comments`) with response mapping into `CommentThreadItem`, a fetch client and 401/403/404/422 handling — [`comments-edoc-api`](/en/guide/components/comments/comments-edoc-api) (+ RU / UZ).

### Fixed

- **`Accordion`** — card background no longer turns grey on hover or when expanded. Stays at `var(--bg-white-0)` (or whichever CSS variable the consumer overrides). The shadow (`--shadow-regular-x-small`) still drops on hover / open as before.

---

## [0.6.3] — 2026-05-06

**InputField**: **`completed`**, **`completedColor`**; **SelectInput**, **AsyncSearchSelect**; nested select on **PhoneInput** / **SiteInput**. **BaseInput** **`read-only`** and **`completed`** hover — white background. VitePress + Storybook.

### Added

- **InputField** — **`completed`**: border defaults to **primary**; **`completedColor`** for a custom border (**hex**, **`rgb()`**, **`var(--…)`** semantic tokens or primitives). Disabled when **`error`** / **`disabled`**. Same wiring across listed inputs, **SelectInput** variants, **AsyncSearchSelect**. **PhoneInput** / **SiteInput** — same accent on the nested **SelectInput** in **`startBlock`**.
- Docs: **InputField** page (**`inputCompleted`** preview), cross-links from inputs; Storybook **Completed** stories on **TextInput**, **SelectInput**, **TagInput**, **AsyncSearchSelect**.

### Changed

- **`completedColor`** presets: **`success`**, **`error`**, **`warning`**, **`primary`**, … → **`var(--*-base)`**; arbitrary CSS still allowed.
- **BaseInput** **`read-only`**: white fill; **InputField** **`completed`**: hover stays white (no gray wash).

---

## [0.6.2] — 2026-05-07

**BaseInput** / **DateInput** — empty **`autoComplete`** → **`off`**. **TagInput** — less autofill noise (**`autoCapitalize`**, **`autoCorrect`**, **`data-*`**).

### Fixed

- **BaseInput** — **`autoComplete=""`** maps to **`off`**.
- **TagInput** — **`autoCapitalize`** / **`autoCorrect`**, **`data-*`** hints to reduce stray browser/password-manager suggestions.
- **DateInput** — masked input **`autoComplete=""`** → **`off`**.

---

## [0.6.1] — 2026-05-06

**SelectInput** — grouped options and multiple selection; **TagInput** — suggestion list behavior; **`autoComplete`** on inputs; **InputField** / **SelectInput** — **`--text-sub-600`** and **1px** label gap; **Button** focus; documentation.

### Added

- **SelectInput** — **`groups`**: section headers and dividers, **`<optgroup>`** in the hidden select; types **`SelectOptionGroup`**, **`SelectInputOptionsProp`**; either **`options`** or **`groups`**. **SelectInput** docs (**ru / en / uz**), **`selectInputGrouped`** preview, Storybook **Grouped options**.
- **SelectInput** — **`mode="multiple"`**, checkboxes, trigger summary, **`SelectOption.description`**, **`optionTextWrap`**; types **`FullVariantMultipleProps`**, **`SelectInputMultipleChangeEvent`**, **`SelectInputMultipleDisplay`**. Docs and demos (**ru / en / uz**).
- **TagInput** — **`suggestionsExcludeSelected`** (hide already selected in the list); by default selected rows stay visible with a checkmark; selecting again removes the tag.

### Changed

- **InputField** — hint color (**`--text-sub-600`**), **1px** gap in the label row.
- **SelectInput** — secondary copy (placeholder, groups, empty list, async footer) uses **`--text-sub-600`**.
- **TagInput** — suggestion filtering and matching to tags adjusted for the new default list behavior.

### Fixed

- **BaseInput** — **`autoComplete="off"`** by default.
- **EmailInput** / **PasswordInput** / **PhoneInput** — sensible **`autoComplete`** defaults.
- **DateInput** — **`autoComplete="off"`** for the masked field by default.
- **Button** — focus ring without extra **`outline`** animation.

### Documentation

- **Inputs overview** — **`autoComplete`** section (**ru / en / uz**), note on **BaseInput**.
- **SelectInput** — **`groups`** in the component guide, on-site preview, expanded Storybook description.
- **CLAUDE.md** — rule to keep **`CHANGELOG.md`** and this section in sync for consumer-facing changes.

---

## [0.6.0] — 2026-05-05

**TagInput**, **Tag**, **AsyncSearchSelect** (pagination), **DateInput**, **`vite/client`**.

### Added

- **TagInput** — chip field with optional suggestions (**`onSuggestionsQueryChange`**, **`server`** / local filter), **`{ id, label }`**, **`tagsAreaMaxHeight`**, extended props (**`allowCustomTags`**, loading / empty list, **`validateTag`**, **`getOptionDisabled`**, **`maxTagCount`**, **`renderTag`**), **`TagInputTagValue[]`**, **`tagLabel`**; **Storybook**, **`RHFTagInput`**, VitePress **ru / en / uz**.
- **AsyncSearchSelect** — pagination in **`loadOptions`**, response **`{ options, hasMore }`** or array, infinite scroll, module split, **`AsyncSearchSelectLoadResult`** type; Storybook and docs updated.

### Changed

- **Tag** — clickable region and **`suffix`** / **`prefixRounded`**, markup when dismiss is present; avatar cluster gap **2px**. Tag docs on the site updated.
- **TagInput** — package layout: **`index.tsx`**, **`hooks/controller`**, **`ui`**, **`model`**, **`types`**, **`styles.module.css`**.

### Fixed

- **DateInput** — calendar closes after selecting a date (**`stopPropagation`** on the popover); DateInput doc pages updated.

### Tooling

- **`tsconfig`**: **`vite/client`** types for CSS Modules resolution.

---

## [0.5.8] — 2026-05-04

**AsyncSearchSelect**, shared dropdown panel for **SelectInput**, docs, and TypeScript **`noEmit`**.

### Added

- **AsyncSearchSelect** — async select with search: **`loadOptions({ query, signal })`**, optional **`onSearchQueryChange`**, **`SearchInput`** in the panel with no **`autoFocus`** by default; exported from **`@v-lab/ui-kit`**.
- Storybook: **`Inputs/AsyncSearchSelect`**.
- VitePress: **ru / en / uz** pages, demo in **`componentDocsRegistry`**.

### Changed

- **SelectInput**: synchronous **`options`** only; shared **`SelectDropdownPanel`** and **`useSelectDropdownFloating`**; dropdown layout and search row tweaks.

### Tooling

- **TypeScript**: **`noEmit: true`**, **`npm run typecheck`** runs **`tsc`**.

---

## [0.5.7] — 2026-04-28

Consumer-facing docs, **GitLab Pages** deploy for the docs site, and VitePress **`base`** for non-root URLs.

### Added

- **GitLab CI** (`.gitlab-ci.yml`): **`docs:build`** job, artifact **`docs-site/.vitepress/dist/`**; **`pages`** job → **`public/`** for GitLab Pages; **`DOCS_BASE="/${CI_PROJECT_NAME}/"`**; **`pages`** environment with **`url: $CI_PAGES_URL`**; **`interruptible: true`**.
- **Docker** for static docs: **`docs-site/docker/`** (`Dockerfile`, nginx, `entrypoint.sh`).
- **`.dockerignore`**.

### Changed

- **VitePress**: **`base`** from **`DOCS_BASE`**; locally without the variable — **`/`**.

### Documentation

- **README**, **INSTALLATION_DEVELOPER**, **ru / en / uz** installation pages: minimal install includes **`@floating-ui/react`**; full install lists **`react-pdf`** and **`pdfjs-dist`**.

---

## [0.5.6] — 2026-04-27

Hotfix for **SelectInput** (`compact` / `compact-label` dropdown, including **LanguageSwitcher**) and e2e against Storybook.

### Fixed

- **SelectInput** (`bottom`/`top` layout without `dropdownWidth`): `variant="full"` — list min width equals field width, list can be wider via `max-content`; `compact` / `compact-label` / `inline` — no anchor `minWidth`, width from option length; `.dropdown` panel uses `max-content`, no extra “empty” width (including **LanguageSwitcher**). Width cap: `min(100vw − 16px, 32rem)`.

### Added

- **`npm run test:e2e`** (Playwright): smoke test for Storybook, **LanguageSwitcher** dropdown width check; dev dependency **`@playwright/test`**, **`playwright.config.ts`**, **`e2e/storybook.spec.ts`**.
- **`.gitignore`**: Playwright artifacts (`test-results`, `playwright-report`, `blob-report`, `playwright/.auth`).

---

## [0.5.5] — 2026-04-24

### Added

- **Comments**: `CommentRichInput` (rich `contenteditable`, formatting toolbar), `CommentsSection` (input + feed with calendar day dividers, loading / error / empty states).
- String helpers: `DEFAULT_COMMENTS_SECTION_STRINGS`, `COMMENTS_SECTION_STRING_KEYS`, `mergeCommentsSectionStrings`, `mergeCommentsSectionStringsFromJson`; utility `formatCommentDayDivider`.
- Documentation: `Comments.md`; repo indexes updated (`docs/components/`, `docs/MAP.md`, `docs/MAIN_CONTEXT.md`).

### Changed

- **CommentRichInput**: submit on **Enter**; **Shift+Enter** — new line (previously submit was Ctrl/Cmd+Enter).
- **CommentsSection**: comments shown by descending `createdAt` (**newest first**); order in the `comments` prop does not matter.

### Documentation

- Storybook: Playground for `CommentsSection`; “Show code” panel for interactive stories — examples importing `CommentsSection` from `@v-lab/ui-kit`.

---

## [0.5.4] — 2026-04-13

Re-publish of **0.5.3** — previous build did not include the changes.

---

## [0.5.3] — 2026-04-13

Hotfix **SelectInput**: dropdown position and width.

### Fixed

- **SelectInput**: dropdown opens below, aligned to trigger left edge (`bottom-start`), not centered.
- **SelectInput**: dropdown width strictly matches input width — long options wrap instead of stretching the list.
- **SelectInput**: `flip` limited to the opposite axis (bottom ↔ top, left ↔ right) — dropdown no longer jumps sideways.
- **SelectInput**: `optionTextWrap` — option text clamped to 2 lines with ellipsis; native tooltip only when truncated.

---

## [0.5.2] — 2026-04-03

Hotfix after **0.5.1**: **DateInput** (masked) and **FileUpload** (multipart).

### Fixed

- **DateInput**: controlled mode with `valueFormat: 'masked'` — correct display and date selection (mask value not passed through `formatIsoToMasked`); `internalMasked` init respects format.
- **FileUpload**: `onFilesChange(uploadFiles, nativeFiles)` and `uploadFilesToNativeFiles` — pass native `File` to `FormData` / backend, not `UploadFile` objects (otherwise `[object Object]` string).

### Added

- Export **`uploadFilesToNativeFiles`**, type **`FileUploadFilesChangeHandler`**.

---

## [0.5.0] — 2026-04-03

### Added

- `DateInput` (`@v-lab/ui-kit/date`): `valueFormat?: 'masked' | 'iso'` — with `'iso'`, `onChange` / `onAccept` return `YYYY-MM-DD`; utils `formatMaskedToIso`, `formatIsoToMasked`, `parseMaskedDateString`, `formatDateToMasked`
- `SelectInput`: optional prop `dropdownPortalZIndex` to override portal stacking (e.g. select inside a modal)
- `Table`: `hideHeader`, `paginationPosition` (`'top' | 'bottom'`), `activeRowIndex` — without `column-reverse` hacks or targeting internal classes in the app
- `SelectInput`: `dropdownMaxHeight`, `optionTextWrap` — list height and long labels via props (CSS variable `--select-dropdown-max-height` on the dropdown)
- `Box` — minimal `div` wrapper with `forwardRef` and `HTMLAttributes<HTMLDivElement>`
- `FileUpload`: `FileDropZone`, `FileUploadItem`, `FileUploadField`, utils `formatFileSize` / `fileToUploadFile` / `filesSignature` (ported from edoc-front-v2, CSS Modules + tokens)

### Fixed

- `SelectInput` portal no longer uses inline `z-index: 9999`; stacking uses `--z-dropdown` (below sticky `PageHeader`). Token `--z-dropdown` set to `5` (below `--z-sticky: 10`)

### Changed

- **Storybook**: stories with custom Docs code samples use **`parameters.docs.source.type: 'code'`** and **`language: 'tsx'`** so the Code panel shows the snippet, not the full `render` (Modal, inputs, Breadcrumb, ButtonGroup, RHF, etc.).
- **`.storybook` / Vite**: **`server.watch.ignored`** includes **`storybook-static/`** so after **`build-storybook`** the dev server does not reload unnecessarily.
- **Styles**: inline styles moved to CSS Modules for **DateInput**, **HeaderCard**, **Table**; **Avatar** and **Sidebar** hardcoded colors replaced with tokens (**`--bg-white-0`**, **`--shadow-regular-x-small`**).
- **Code quality**: ESLint rules expanded (**`no-console`**, **`prefer-const`**, **`no-var`**, **`consistent-type-imports`**, **`no-explicit-any`**), Vitest coverage thresholds set.
- **Repository docs**: **`docs/`** catalogs added/structured (architecture, checklists, guides), **`CHANGELOG`**; see **`REVIEW_FINDINGS.md`** when relevant.

### Infrastructure

- **CI**: workflow **`.github/workflows/ci.yml`** (build and checks on push/MR).
- **Build**: **`vite.config.ts`**, **`vitest.config.ts`** updated; optional **`sample.pdf`** for PdfPreview stories; **`prepublishOnly`** (`npm run build`), **`publish:registry`** for GitLab npm; **`.env.example`** and **`.env*`** ignore for local tokens.

### Refactor and quality (refactor branch / merge)

- **`forwardRef`** and **`displayName`** on several public components; **`docs/`** restructure (architecture, GAPS, dependencies).
- **Inputs**: explicit value/mask sync patterns instead of **`queueMicrotask`** hacks.
- **`feat(build)`**: subpaths **`/date`**, split ESM/CJS with **`preserveModules`**, current bundle split (lands in final release after merge).

---

## [0.5.1] — 2026-04-04

Patch after **0.5.0**: tab sync hook with query params and `hooks/` folder layout.

### Added

- **`useTabsSearchParam`**: hook for query (`?…=`) — **`value`**, **`setTab`**, **`onChange`** (alias), **`getTabFromUrl`**, **`popstate`** subscription; **`Tabs`** component stays URL-free; options **`defaultValue`**, **`replace`**, **`validValues`**. Type **`UseTabsSearchParamResult`**.
- Utilities **`tabsSearchParams`** (`readSearchParam` / `writeSearchParam`) and tests.

### Changed

- **`hooks`**: **`useClickOutside`** in **`src/hooks/dom/`**; tabs + URL in **`src/hooks/tabs/`**; shared re-export **`src/hooks/index.ts`**; **`HeaderCard`** import from **`@/hooks`**.

---

## [0.4.1] — 2026-03-17

### Fixed

- Text overflow: **`SidebarCard`**, **`HeaderCard`**, **`UserProfileCard`** — correct truncation/wrapping without spilling outside cards.

---

## [0.4.0] — 2026-03-17

### Added

- **`Table`** — table with **pagination** and state gallery in Storybook.
- **`Tabs`** — compound component (`Tabs.Tab`, `Tabs.Panel` and ARIA wiring).
- **Layout**: **header** height **88px**, **sticky** behavior, **`LayoutRoot`**, sidebar **z-index** aligned with the rest of the header.

### Fixed

- **Sidebar**: dropdown icon hidden when there are no options; collapse trigger in header when no dropdown; **TS** fix for **`SidebarCard`** with `as="div"` (separate button/`div` render).

### Changed

- **Documentation**: **installation and publishing** guides (`MAINTAINER`, `DEVELOPER`), **README** — consumer dependencies and full install command.

---

## [0.3.0] — 2026-03-11

### Changed

- **Bundle performance**: artifact size optimization — about **~6.9 MB → ~1.8 MB** in `dist`, **main** entry **~528 KB → ~84 KB** (module tree and chunk splitting).

---

## [0.2.0] — 2026-03-11

### Added

- `DateInput` separate subpath export (`/date`) — optional peer `react-imask`
- `PhoneInput` separate subpath export (`/phone`) — optional peer `react-phone-number-input`
- `preserveModules: true` for both ESM and CJS output — full tree-shaking support
- `sourcemap: true` for easier debugging of library consumers
- z-index token scale in tokens.css: `--z-base`, `--z-raised`, `--z-sticky`, `--z-sidebar`, `--z-dropdown`, `--z-overlay`, `--z-toast`
- `displayName` on all 28+ public components for React DevTools
- **SidebarContext** — collapsed sidebar state via context, no manual `collapsed` prop drilling
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

First snapshot summary; **Table** and **Tabs** as in current API are recorded under **[0.4.0]**.

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
