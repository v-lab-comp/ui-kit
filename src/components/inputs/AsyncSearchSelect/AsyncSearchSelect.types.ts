import type { SelectInputFullFieldProps, SelectOption } from '../SelectInput'

/** Ответ **`loadOptions`**: массив — как раньше (одна порция, без дозагрузки); объект — постраничная подгрузка при скролле. */
export type AsyncSearchSelectLoadResult =
  | SelectOption[]
  | { options: SelectOption[]; hasMore: boolean }

export type AsyncSearchSelectProps = SelectInputFullFieldProps & {
  /**
   * Подгрузка опций: **`query`** — после **`debounceMs`**; **`page`** — 0 при новом запросе (открытие,
   * смена текста поиска), далее 1, 2, … при прокрутке списка к низу, пока вы вернёте **`hasMore: true`**.
   * **`signal`** — отмена при закрытии, смене **`query`** или новой первой странице.
   */
  loadOptions: (args: {
    query: string
    signal: AbortSignal
    page: number
  }) => Promise<AsyncSearchSelectLoadResult>
  debounceMs?: number
  selectedOption?: SelectOption | null
  /**
   * Вызывается при каждом изменении строки поиска **после debounce** (совпадает с **`query`** в **`loadOptions`**).
   * Удобно для синхронизации с URL, аналитики и т.п.; сам запрос по-прежнему собирают в **`loadOptions`**.
   */
  onSearchQueryChange?: (query: string) => void
}
