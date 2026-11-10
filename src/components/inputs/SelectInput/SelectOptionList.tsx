import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { contractPart } from '@/theme/contract'
import { selectInputContract } from '@/theme/contracts/select-input'

export type SelectOptionListProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
  /** Пункты: `SelectOptionRow`, `SelectGroupLabel`, `SelectPlaceholderRow` */
  children?: ReactNode
  /** Идёт загрузка — `aria-busy` */
  busy?: boolean
  /** ref «сторожа» ленивой подгрузки; задан — сторож рисуется в конце списка */
  loadMoreRef?: Ref<HTMLLIElement>
}

/**
 * `<ul role="listbox">` выпадающего списка. Рисуется всегда, даже пустой, — чтобы `aria-controls`
 * триггера / поля поиска указывал на существующий элемент. id / role / aria-multiselectable —
 * из `getListboxProps()`.
 */
export function SelectOptionList({
  children,
  busy,
  loadMoreRef,
  ...listboxProps
}: SelectOptionListProps) {
  return (
    <ul
      {...listboxProps}
      aria-busy={busy || undefined}
      className={contractPart(selectInputContract, 'options-list')}
    >
      {children}
      {loadMoreRef && (
        <li
          ref={loadMoreRef}
          className={contractPart(selectInputContract, 'load-more-sentinel')}
          aria-hidden
        />
      )}
    </ul>
  )
}

export type SelectListStatusProps = {
  /** Текст статуса; `undefined` / `null` — статуса нет */
  message?: ReactNode
  /** Оформление ошибки (`data-error`) */
  error?: boolean
  /** `empty-state` — вместо пунктов; `async-footer-message` — подпись под пунктами */
  part?: 'empty-state' | 'async-footer-message'
}

/**
 * Статус списка («Нет результатов», «Загрузка…», ошибка) в живой области `role="status"`.
 * Сама область рисуется всегда и без оформления, чтобы скринридер объявлял смену текста.
 */
export function SelectListStatus({ message, error, part = 'empty-state' }: SelectListStatusProps) {
  return (
    <div role="status">
      {message != null && (
        <div className={contractPart(selectInputContract, part)} data-error={error || undefined}>
          {message}
        </div>
      )}
    </div>
  )
}
