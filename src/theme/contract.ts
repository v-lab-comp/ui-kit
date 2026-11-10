/**
 * Контракт компонента — публичный API для скинов.
 *
 * Компонент рендерит стабильный класс `vl-<name>` и data-атрибуты из контракта;
 * скин стилизует только их. Типы пропсов компонента выводятся из контракта,
 * поэтому компонент и скины не могут разойтись.
 */

export type ContractDefinition = {
  /** kebab-case имя: `button` → класс `vl-button` */
  readonly name: string
  /** Перечислимые варианты → `data-<key>="<value>"` */
  readonly attributes: Readonly<Record<string, readonly string[]>>
  /** Булевы состояния → `data-<state>` (есть / нет) */
  readonly states?: readonly string[]
  /** Именованные внутренние элементы → класс `vl-<name>__<part>` */
  readonly parts?: readonly string[]
}

export type Contract<D extends ContractDefinition = ContractDefinition> = D & {
  readonly className: `vl-${D['name']}`
}

export const defineContract = <const D extends ContractDefinition>(definition: D): Contract<D> => ({
  ...definition,
  className: `vl-${definition.name}` as `vl-${D['name']}`,
})

/** Значения атрибута контракта: `ContractValue<typeof buttonContract, 'size'>` */
export type ContractValue<
  C extends ContractDefinition,
  K extends keyof C['attributes'],
> = C['attributes'][K][number]

type StateName<C extends ContractDefinition> = C['states'] extends readonly string[]
  ? C['states'][number]
  : never

type PartName<C extends ContractDefinition> = C['parts'] extends readonly string[]
  ? C['parts'][number]
  : never

export type ContractInput<C extends ContractDefinition> = {
  [K in keyof C['attributes']]?: ContractValue<C, K>
} & { [S in StateName<C>]?: boolean }

/** data-атрибуты для корня компонента: `{ 'data-size': 'small', 'data-disabled': '' }` */
export const contractAttrs = <C extends Contract>(
  contract: C,
  input: ContractInput<C>
): Record<`data-${string}`, string> => {
  const values = input as Record<string, string | boolean | undefined>
  const attrs: Record<`data-${string}`, string> = {}
  for (const key of Object.keys(contract.attributes)) {
    const value = values[key]
    if (typeof value === 'string') attrs[`data-${key}`] = value
  }
  for (const state of contract.states ?? []) {
    if (values[state] === true) attrs[`data-${state}`] = ''
  }
  return attrs
}

/** Класс внутренней части: `contractPart(modalContract, 'header')` → `vl-modal__header` */
export const contractPart = <C extends Contract>(contract: C, part: PartName<C>): string =>
  `${contract.className}__${part}`

/** CSS-селектор для скинов и тестов: `.vl-button[data-size='small'][data-disabled]` */
export const contractSelector = <C extends Contract>(
  contract: C,
  input: ContractInput<C> = {} as ContractInput<C>
): string =>
  `.${contract.className}` +
  Object.entries(contractAttrs(contract, input))
    .map(([attr, value]) => (value === '' ? `[${attr}]` : `[${attr}='${value}']`))
    .join('')
