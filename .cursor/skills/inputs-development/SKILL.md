---
name: inputs-development
description: Implements or extends input components (TextInput, EmailInput, NumberInput, etc.) in the v-lab-ui-kit. Use when adding a new input type, wrapping inputs with label/hint/error, integrating inputs with react-hook-form, or when the user asks how to build or refactor inputs in this codebase.
---

# Inputs development (v-lab-ui-kit)

## When to use this skill

- User asks to add a new input (EmailInput, PasswordInput, NumberInput, CurrencyInput, etc.)
- User asks how inputs are structured or how to build an input
- User asks to connect an input to react-hook-form
- User asks to refactor or fix input components in this project

## Architecture (short)

- **Unstyled components + skin.** Components import no CSS. Each renders a stable root class `vl-<name>`, parts `vl-<name>__<part>` and data-attributes from its contract (`src/theme/contracts/<name>.ts`). All styles live in the skin: `src/skins/corporate/components/<name>.css`, all rules of the file inside **one** `:where([data-vl-skin~='corporate']) { … }` block written once (native CSS nesting; `@keyframes` go outside the block). The build flattens it to `:where([data-vl-skin~='corporate']) .vl-<name>` — `:where` has zero specificity, so each rule keeps the specificity of its inner selector. Rules: `docs/architecture/theming.md`.
- **BaseInput** — primitive `<input>` (`vl-base-input`). Contract `src/theme/contracts/base-input.ts`: attribute `size` (`big` / `medium` / `small`) → `data-size`, states `error` / `filled` → `data-error` / `data-filled`, rendered via `contractAttrs(baseInputContract, { size, error: hasError, filled })`. Disabled is the native `:disabled`, not a contract state.
- **InputField** — wrapper (`vl-input-field`): label, required/optional, prefix/suffix, startBlock/endBlock, hint/error. **Children must be a function** `(id: string) => ReactNode` so the same `id` is used for `<label htmlFor>` and `<input id>`. InputField generates `id` via `useId()` if not provided.
- **Concrete input** (e.g. TextInput) = InputField + BaseInput (or custom primitive). Its own contract usually has just the part `input-inner`; the root class goes on `InputField`, the part class on the bare `BaseInput`. No `useId` in the concrete component — id comes from InputField.

## Adding a new input (label + hint + error)

1. **Create folder** `src/components/inputs/NewInput/` with: `NewInput.tsx`, `NewInput.types.ts`, `NewInput.stories.tsx`, `NewInput.test.tsx`, `index.ts`. No CSS file next to the component — styles go to the skin (step 5).

2. **Contract** — `src/theme/contracts/new-input.ts` (same shape as `text-input.ts`):

```ts
import { defineContract } from '../contract'

export const newInputContract = defineContract({
  name: 'new-input',
  attributes: {},
  parts: ['input-inner'],
})
```

Register it in `src/theme/contracts/index.ts`: import, add to the `export { … }` list and to `themeContracts` (`newInput: newInputContract`). If the input has its own variants, put them in `attributes` / `states` and derive the prop types from the contract with `ContractValue<typeof newInputContract, 'key'>` (pattern: `src/components/Button/Button.types.ts`).

3. **Types** — extend InputField (without `children`) and BaseInput (omit keys that the wrapper controls):

```ts
// NewInput.types.ts
import type { InputFieldProps } from '../base/InputField'
import type { BaseInputProps } from '../base/BaseInput'

export type NewInputProps = Omit<InputFieldProps, 'children'> &
  Omit<BaseInputProps, 'prefix' | 'size' | 'id' | 'disabled' | 'className'>
```

4. **Component** — forwardRef + displayName; pass all field props to InputField with `className={clsx(newInputContract.className, className)}`; pass **children as function** `(fieldId) => <BaseInput id={fieldId} ... />` with the `input-inner` part class; do not call useId in this component. Full code: `src/components/inputs/TextInput/TextInput.tsx`.

```tsx
import clsx from 'clsx'
import { contractPart } from '@/theme/contract'
import { newInputContract } from '@/theme/contracts/new-input'

<InputField label={...} hint={...} error={...} size={size} disabled={disabled} id={id} className={clsx(newInputContract.className, className)} ...>
  {(fieldId) => (
    <BaseInput ref={ref} id={fieldId} size={size} hasError={!!error} disabled={disabled} className={contractPart(newInputContract, 'input-inner')} {...inputProps} />
  )}
</InputField>
```

5. **Skin CSS** — `src/skins/corporate/components/new-input.css`. For a BaseInput inside InputField, only override the inner input to be “bare” (flex, no border/padding), same as `text-input.css`. `input.vl-…__input-inner` (0,1,1) beats `.vl-base-input` (0,1,0) without `!important`:

```css
/* src/skins/corporate/components/new-input.css */
:where([data-vl-skin~='corporate']) {
  input.vl-new-input__input-inner {
    flex: 1;
    min-width: 0;
    min-height: 0;
    height: auto;
    padding: 0;
    border: none;
    background: transparent;
    outline: none;
  }
}
```

Every further rule of the input (variants, states, parts, `@media`) goes inside the same block; `@keyframes` after it.

Add `@import './components/new-input.css';` to `src/skins/corporate/index.css` — otherwise the styles reach neither Storybook nor the built skin CSS `dist/skins/corporate.css` (what apps import as `@v-lab/ui-kit/skins/corporate.css`).

6. **Tests** — `NewInput.test.tsx`: assert the contract class (`vl-new-input` on the field root, `vl-new-input__input-inner` on the `<input>`) and BaseInput data-attributes (`data-size`, `data-error` when `error` is set).

7. **Export** — from `NewInput/index.ts`, from `src/components/inputs/index.ts` and from `src/index.ts`. Inputs that pull an optional peer go to their sub-entry instead (`src/date.ts`, `src/phone.ts`, `src/markdown.ts`).

## Rules (do not break)

- **No CSS in components** — no CSS imports in `.tsx`. Markup only via `<contract>.className`, `contractAttrs`, `contractPart`; styles only in `src/skins/corporate/components/*.css`, inside the file's single `:where([data-vl-skin~='corporate']) { … }` block.
- **No useEffect for DOM-only props** — e.g. checkbox `indeterminate` must be set in a **callback ref** when the node is attached: `ref={(node) => { if (node) node.indeterminate = indeterminate ?? false; /* forward ref */ }}`.
- **Sizes** — a contract attribute (`size: [...]`) rendered as `data-size` via `contractAttrs`; the skin styles `[data-size='…']`. No per-size classes or `size === 'big' && …` conditionals.
- **Error/disabled in CSS** — error is the contract state `data-error`, disabled is the native `:disabled` (do not duplicate native states in a contract). Style with `[data-error]`, `:disabled` and the variables from `src/skins/corporate/components/base-input.variables.css` (`--base-input-border-error`, `--base-input-bg-disabled`, etc.). Do not duplicate these values in new CSS.
- **Checkbox label block** — use shared `CheckboxLabelRow` (`src/components/inputs/Checkbox/CheckboxLabelRow.tsx`, skin file `src/skins/corporate/components/checkbox-label-row.css`) for label/sublabel/tag; do not duplicate that markup or styles in new checkbox variants.

## React Hook Form adapter

Use **createRHFAdapter** from `src/adapters/rhf/createRHFAdapter.tsx`:

```tsx
import { createRHFAdapter } from './createRHFAdapter'
import { NewInput } from '@/components/inputs/NewInput'
import type { NewInputProps } from '@/components/inputs/NewInput'

export const RHFNewInput = createRHFAdapter<NewInputProps>(
  NewInput,
  (field, fieldState) => ({ value: field.value ?? '', error: fieldState.error?.message }),
  'RHFNewInput'
)
```

Export the adapter from `src/adapters/rhf/index.ts`.

## Checklist before finishing

- [ ] Contract `src/theme/contracts/new-input.ts` (part `input-inner`) registered in `src/theme/contracts/index.ts` (export + `themeContracts`)
- [ ] Types: `Omit<InputFieldProps,'children'> & Omit<BaseInputProps, ...>` (and custom props if any; variants derived from the contract)
- [ ] Component: forwardRef + displayName; InputField with the contract class and `children={(fieldId) => <BaseInput id={fieldId} ... />}`; no useId in this component
- [ ] Skin file `src/skins/corporate/components/new-input.css` — all rules in one `:where([data-vl-skin~='corporate']) { … }` block (`@keyframes` outside), imported in `src/skins/corporate/index.css`
- [ ] Sizes/error via props and data-attributes; no extra conditional classes
- [ ] Test asserts `vl-` classes and data-attributes
- [ ] If RHF: adapter via createRHFAdapter; export from adapters/rhf
- [ ] Stories: prefer shared helpers from `src/stories/helpers.tsx` (icons, MockTag, etc.)

## Full reference

Step-by-step guide: `docs/guides/new-component.md`. Input architecture (InputField + BaseInput, composite inputs): `docs/architecture/inputs.md`. Contracts and skin selector rules: `docs/architecture/theming.md`.
