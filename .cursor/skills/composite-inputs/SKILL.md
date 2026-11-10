---
name: composite-inputs
description: Builds composite input components where one value is composed of multiple parts (protocol+path, countryCode+phone, domain+tld). Use when creating inputs with startBlock/endBlock, split/join value logic, or when the user mentions composite inputs, SiteInput, ShareLinkInput, protocol selector, domain zone selector.
---

# Composite inputs (v-lab-ui-kit)

## When to use this skill

- User asks for an input with multiple visual parts (protocol selector + path, domain + TLD, country code + phone)
- User mentions startBlock, endBlock, composite input, split/join
- User wants to extend SiteInput, ShareLinkInput, or build a similar component
- User asks how form data is submitted when value has multiple parts

---

## What is a composite input

A composite input shows **one value** as **several visual parts**, but stores and submits **one string**.

**Examples:**

- URL: `https://` (left) + `example.com` (center) → value: `"https://example.com"`
- Domain: `example` (center) + `.com` (right) → value: `"example.com"`
- Phone: `+998` (left) + `901234567` (center) → value: `"+998 901234567"`

The user sees parts separately (selector on the left, text field in the middle, suffix on the right), but the component exposes a single value to the parent and to the form.

---

## How it works (5 principles)

1. **One string is the source of truth.** The full value (`"https://example.com"`) is stored. Parts are never stored separately.

2. **Parts are computed on each render.** `split("https://example.com")` → `["https://", "example.com"]`. Parts come from the string, not from separate state. This avoids desync (e.g. protocol from one URL and path from another).

3. **Updates go through `notifyParts`.** User changes path → call `notifyParts([currentProtocol, newPath])`. The hook joins parts, updates the value, and notifies the parent. Never update state manually.

4. **Form gets full value + optional parts.** The hook renders hidden `<input type="hidden">`: one with the full string (`name="website"`), others per part (`name="protocol"`, etc.) if `formNames` is set.

5. **Parent uses a single string.** From outside, the component behaves like a normal input: `value` and `onChange` work with the full string. Internal parts and hidden inputs are implementation details.

---

## Visual layout

```
┌─────────────────────────────────────────────────────────┐
│  startBlock    │     BaseInput (main part)    │ endBlock │
│  (protocol)    │     (path / domain name)     │  (tld)   │
│  Select or     │     editable text           │  Select  │
│  static text   │                             │  or text │
└─────────────────────────────────────────────────────────┘
```

- **startBlock** — left section (protocol, country code). Can be static text or `<SelectInput variant="inline" />`.
- **BaseInput** — main editable area (path, domain name, phone number).
- **endBlock** — right section (TLD, suffix). Same options as startBlock.

---

## Step-by-step: building a composite input

### Step 1. Define the value structure

Decide how the value splits. Examples:

- URL: `[protocol, path]` e.g. `["https://", "example.com"]`
- Domain: `[name, tld]` e.g. `["example", ".com"]`
- Phone: `[countryCode, number]` e.g. `["+998", "901234567"]`
- Full URL: `[protocol, name, tld]` e.g. `["https://", "example", ".com"]`

### Step 2. Write `split`

`split(str) => [part0, part1, ...]`

- For valid input: parse by meaning (regex, string methods).
- For invalid/empty: return sensible fallbacks (e.g. default protocol + user input as path).

```ts
// Example: URL
function splitProtocol(url: string, fallback: string): [string, string] {
  const match = url.match(/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//)
  if (match) return [match[0], url.slice(match[0].length)]
  return [fallback, url]
}

// Example: domain + TLD
function splitDomain(domain: string, fallbackTld: string): [string, string] {
  const match = domain.match(/\.(com|uz|ru)$/i)
  if (match) {
    const tld = '.' + match[1].toLowerCase()
    return [domain.slice(0, -match[0].length), tld]
  }
  return [domain, fallbackTld]
}
```

### Step 3. Write `join`

`join([part0, part1, ...]) => string`

Must be the inverse of split: `join(split(str)) === str`.

```ts
join: ([proto, path]) => proto + path
join: ([name, tld]) => name + tld
join: ([proto, name, tld]) => proto + name + tld
```

### Step 4. Call `useCompositeInput`

```tsx
const { parts, notifyParts, hiddenInputs } = useCompositeInput({
  value, // or defaultValue for uncontrolled
  onChange,
  name, // form field name
  split: (str) => splitMyValue(str, fallback),
  join: (parts) => parts.join(''),
  formNames: ['protocol'], // optional: parts[0] → name="protocol"
})
```

### Step 5. Render

1. Put `{hiddenInputs}` first (required when `name` is set).
2. Use `InputField` with `startBlock` and/or `endBlock` and the contract root class.
3. Pass `children` as a function: `(fieldId) => <BaseInput id={fieldId} ... />` with the `input-inner` part class (see [Required contract and CSS](#required-contract-and-css)).
4. In `onChange` of any part (input or Select), call `notifyParts([...])` with the full array.

```tsx
const [part0, part1] = parts

return (
  <>
    {hiddenInputs}
    <InputField
      label={label}
      hint={hint}
      startBlock={part0}
      endBlock={part2} // if 3 parts
      className={clsx(myInputContract.className, className)}
    >
      {(fieldId) => (
        <BaseInput
          id={fieldId}
          value={part1}
          onChange={(e) => notifyParts([part0, e.target.value, part2])}
          className={contractPart(myInputContract, 'input-inner')}
        />
      )}
    </InputField>
  </>
)
```

### Step 6. Never update state manually

Always use `notifyParts([...])`. The hook handles:

- Joining parts
- Updating internal state (if uncontrolled)
- Calling parent `onChange`
- Updating hidden inputs

---

## useCompositeInput API

| Prop           | Type                     | Purpose                                    |
| -------------- | ------------------------ | ------------------------------------------ |
| `value`        | string                   | Controlled: full composed value            |
| `defaultValue` | string                   | Uncontrolled: initial full value           |
| `onChange`     | (e: ChangeEvent) => void | `e.target.value` is the full string        |
| `name`         | string                   | Form field name; enables hidden inputs     |
| `split`        | (str) => T[]             | Parse string into parts                    |
| `join`         | (parts: T[]) => string   | Reassemble parts into string               |
| `formNames`    | (string \| undefined)[]  | Per-part form names; index matches `parts` |

**Returned:**

- `parts` — array of parts (from `split(composedValue)`)
- `notifyParts(newParts)` — update value by providing new parts
- `hiddenInputs` — React node with hidden inputs (render when `name` is set)

---

## Static vs dynamic blocks

### Static text (e.g. fixed protocol)

```tsx
const startBlock = parts[0]  // or <span>{parts[0]}</span>
<InputField startBlock={startBlock} ...>
```

### Dynamic: Select in block

Use `SelectInput` with `variant="inline"` and `placement="bottom"`:

```tsx
const startBlock = (
  <SelectInput
    variant="inline"
    options={PROTOCOL_OPTIONS}
    value={parts[0]}
    onChange={(e) => notifyParts([e.target.value, parts[1]])}
    size={size}
    placement="bottom"
  />
)
```

For endBlock with Select:

```tsx
const endBlock = (
  <SelectInput
    variant="inline"
    options={TLD_OPTIONS}
    value={parts[1]}
    onChange={(e) => notifyParts([parts[0], e.target.value])}
    size={size}
    placement="bottom"
  />
)
```

**Important:** `value` must be the current part from `parts`. `onChange` must call `notifyParts` with the updated part and the rest unchanged.

---

## Form submission

### Main field

`name` → full composed string (e.g. `website="https://example.com"`).

### Per-part fields (formNames)

`formNames[i]` is the form field name for `parts[i]`. Use `undefined` to skip a part.

```tsx
formNames: ['protocol'] // parts[0] → name="protocol"
formNames: [undefined, 'tld'] // parts[1] → name="tld"
formNames: ['protocol', undefined, 'tld'] // 3 parts
```

On submit: `website`, `protocol`, `tld` (etc.) in form data. Backend does not need to parse.

---

## External API (how parent uses the component)

- Pass **one string** as `value` or `defaultValue`. Never pass parts separately.
- `onChange` receives the full string in `e.target.value`.
- Props like `protocol` (in SiteInput) are **defaults for invalid/empty input**, not the current value. The component derives the current protocol from the full string via `split`.

---

## Required contract and CSS

Components are unstyled: no CSS imports in `.tsx`. The composite input gets a contract `src/theme/contracts/<name>.ts` with the part `input-inner` (same as `site-input.ts`), registered in `src/theme/contracts/index.ts` (export + `themeContracts`):

```ts
import { defineContract } from '../contract'

export const myInputContract = defineContract({
  name: 'my-input',
  attributes: {},
  parts: ['input-inner'],
})
```

The root class goes on `InputField` (`className={clsx(myInputContract.className, className)}`), the part class on the bare `BaseInput` (`className={contractPart(myInputContract, 'input-inner')}`).

BaseInput inside InputField must be "bare" (no border, padding). Styles live in the skin file `src/skins/corporate/components/<name>.css` (add `@import './components/<name>.css';` to `src/skins/corporate/index.css`); `input.vl-…__input-inner` (0,1,1) beats `.vl-base-input` (0,1,0) without `!important`. All rules of the file go inside **one** `:where([data-vl-skin~='corporate']) { … }` block written once (native CSS nesting, `@keyframes` outside the block) — same as `site-input.css`:

```css
/* src/skins/corporate/components/my-input.css */
:where([data-vl-skin~='corporate']) {
  input.vl-my-input__input-inner {
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

The build flattens the block to `:where([data-vl-skin~='corporate']) input.vl-my-input__input-inner`; `:where` adds no specificity. Rules for writing a skin: `docs/architecture/theming.md`.

---

## Common mistakes

1. **Storing parts in state** — parts come from `split(composedValue)`. Don't store them separately.
2. **Updating parts directly** — always use `notifyParts([...])`, never `setState` on parts.
3. **Passing parts as props** — parent passes `value` (full string). Parts are internal.
4. **Forgetting `{hiddenInputs}`** — when `name` is set, form needs hidden inputs. Render them.
5. **Wrong `formNames` order** — `formNames[i]` corresponds to `parts[i]`.
6. **Styling in the component** — no CSS imports or inline styles in `.tsx`; use the contract part `input-inner` and put the CSS in the skin file.

---

## Full example: URL with protocol Select

```tsx
const { parts, notifyParts, hiddenInputs } = useCompositeInput({
  value, defaultValue, onChange, name,
  split: (url) => splitProtocol(url, 'https://'),
  join: ([proto, path]) => proto + path,
  formNames: ['protocol'],
})
const [currentProtocol, currentPath] = parts

const startBlock = (
  <SelectInput
    variant="inline"
    options={PROTOCOL_OPTIONS}
    value={currentProtocol}
    onChange={(e) => notifyParts([e.target.value, currentPath])}
    size={size}
    placement="bottom"
  />
)

return (
  <>
    {hiddenInputs}
    <InputField
      startBlock={startBlock}
      label={label}
      hint={hint}
      className={clsx(siteInputContract.className, className)}
      ...
    >
      {(id) => (
        <BaseInput
          id={id}
          value={currentPath}
          onChange={(e) => notifyParts([currentProtocol, e.target.value])}
          className={contractPart(siteInputContract, 'input-inner')}
        />
      )}
    </InputField>
  </>
)
```

---

## Reference

- Full docs: `src/components/inputs/base/COMPOSITE_INPUTS.md`
- Hook: `src/components/inputs/base/useCompositeInput.ts`
- Examples: `SiteInput`, `ShareLinkInput`, `src/docs/CompositeInputsGuide.tsx`
- Contract + skin: `src/theme/contracts/site-input.ts`, `src/skins/corporate/components/site-input.css`
- New component step-by-step: `docs/guides/new-component.md`
- For 3+ parts, formFields, RHF: [reference.md](reference.md)
