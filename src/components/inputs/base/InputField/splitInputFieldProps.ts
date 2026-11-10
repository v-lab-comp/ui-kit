import type { InputFieldProps } from './InputField.types'

/** Пропсы InputField без `children` — то, что поле ввода пересылает в обёртку */
export type InputFieldOwnProps = Omit<InputFieldProps, 'children'>

/** Единственный список пропсов InputField: TypeScript требует перечислить все ключи */
const FIELD_KEYS: Record<keyof InputFieldOwnProps, true> = {
  size: true,
  label: true,
  required: true,
  requiredMarker: true,
  optional: true,
  labelTooltip: true,
  hint: true,
  error: true,
  completed: true,
  completedColor: true,
  filled: true,
  prefix: true,
  suffix: true,
  startBlock: true,
  endBlock: true,
  disabled: true,
  id: true,
  className: true,
  wrapperClassName: true,
  wrapperStyle: true,
}

const isFieldKey = (key: string): key is keyof InputFieldOwnProps =>
  Object.prototype.hasOwnProperty.call(FIELD_KEYS, key)

/**
 * Делит пропсы поля ввода на пропсы InputField и остальные (для самого контрола).
 * Ни один проп InputField не протекает на `<input>`, и при добавлении пропа в InputField
 * его не нужно дописывать в каждое поле.
 */
export function splitInputFieldProps<P extends InputFieldOwnProps>(
  props: P
): [InputFieldOwnProps, Omit<P, keyof InputFieldOwnProps>] {
  const field: Record<string, unknown> = {}
  const rest: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(props)) {
    if (isFieldKey(key)) field[key] = value
    else rest[key] = value
  }
  return [field as InputFieldOwnProps, rest as Omit<P, keyof InputFieldOwnProps>]
}
