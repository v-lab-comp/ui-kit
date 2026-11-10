# Composite inputs — reference

## Three or more parts

Example: full URL = protocol + domain name + TLD.

```tsx
split: (url) => {
  const [proto, rest] = splitProtocol(url, 'https://')
  const [namePart, tld] = splitDomain(rest || 'example', '.com')
  return [proto, namePart, tld]
},
join: ([proto, namePart, tld]) => proto + namePart + tld,
formNames: ['protocol', undefined, 'tld'],

// Render
const [protocol, namePart, tld] = parts
const startBlock = <SelectInput variant="inline" ... value={protocol} onChange={...} />
const endBlock = <SelectInput variant="inline" ... value={tld} onChange={...} />
// BaseInput: value={namePart}, onChange with notifyParts([protocol, newName, tld])
```

## formFields (simple alternative)

For cases without split/join (e.g. precomputed values):

```tsx
import { formFields } from '@/components/inputs/base/useCompositeInput'

{
  formFields({ phone: '+998 901234567', countryCode: '+998' })
}
```

Renders hidden inputs. No hook, no composite logic.

## React Hook Form

Use `value`/`onChange` with the full string. RHF adapter works like a normal input. Hidden inputs are for native form submit; with RHF, `control` + `name` handle the composed value.

## InputField children

InputField expects `children` as a **function** `(fieldId: string) => ReactNode`. Pass `fieldId` to `BaseInput` as `id` for label association.

## Block styling

- `blockStart` / `blockEnd` have `background: var(--bg-weak-50)`, divider border.
- When block contains `button` (SelectInput): `padding: 0 10px` via `:has(button)`.
- Select dropdown is portaled to `document.body` — does not affect layout.
