import type {
  SelectAccessibleName,
  SelectInputFullFieldProps,
  SelectOption,
  SelectOptionalAccessibleName,
} from '../SelectInput'

/** Ответ **`loadOptions`**: массив — как раньше (одна порция, без дозагрузки); объект — постраничная подгрузка при скролле. */
export type AsyncSearchSelectLoadResult =
  | SelectOption[]
  | { options: SelectOption[]; hasMore: boolean }

/**
 * Пропсы поля как у `SelectInput` **full**, кроме того, чего у удалённого списка нет:
 * `variant` (всегда full), `searchThreshold` (поиск есть всегда), `lazyLoadPageSize`
 * (страницы отдаёт `loadOptions`). Имя триггера — в `AsyncSearchSelectAccessibleName`.
 */
type AsyncSearchSelectFieldProps = Omit<
  SelectInputFullFieldProps,
  'variant' | 'searchThreshold' | 'lazyLoadPageSize' | 'label' | 'aria-label' | 'aria-labelledby'
>

/**
 * Доступное имя триггера: видимый **`label`** или, без него, обязательный
 * **`aria-label`** / **`aria-labelledby`** (проверяет TypeScript).
 */
export type AsyncSearchSelectAccessibleName =
  | ({ label: string } & SelectOptionalAccessibleName)
  | ({ label?: undefined } & SelectAccessibleName)

export type AsyncSearchSelectProps = AsyncSearchSelectFieldProps &
  AsyncSearchSelectAccessibleName & {
    /** Значение — `value` выбранной опции, `''` — ничего не выбрано */
    value?: string
    defaultValue?: string
    /**
     * Новое значение и выбранная опция (`''` и `null` — значение очищено).
     * Не вызывается при повторном выборе уже выбранной опции.
     */
    onChange?: (value: string, option: SelectOption | null) => void
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
    /** Подпись выбранного значения, пока его опции нет в последнем ответе `loadOptions` */
    selectedOption?: SelectOption | null
    /**
     * Вызывается при каждом изменении строки поиска **после debounce** (совпадает с **`query`** в **`loadOptions`**).
     * Удобно для синхронизации с URL, аналитики и т.п.; сам запрос по-прежнему собирают в **`loadOptions`**.
     */
    onSearchQueryChange?: (query: string) => void
  }
