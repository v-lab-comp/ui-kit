---
title: AsyncSearchSelect
description: Поле выбора с асинхронной подгрузкой опций по поисковому запросу (Floating UI).
---

# AsyncSearchSelect

Вариант выпадающего списка для **удалённых данных**: при открытии и при каждом новом debounced **`query`** вызывается **`loadOptions({ query, signal, page: 0 })`**; при прокрутке списка к низу — **`page`** 1, 2, … пока вы возвращаете **`hasMore: true`**. Запросы с **`AbortSignal`** отменяются при закрытии, смене поиска или новой «первой странице». **`debounceMs`** по умолчанию 300 мс. Визуально и по пропсам поля совместим с **`SelectInput`** **`full`**, массива **`options`** в пропах нет.

Строка поиска внутри панели — тот же компонент **`SearchInput`** (`medium`). При открытии фокус сразу уходит в неё (см. [клавиатуру](#keyboard)), при закрытии возвращается на триггер.

Рамка «заполнено»: **`completed`** и **`completedColor`** — как у **[InputField](./input-field#input-completed)** (см. Storybook **Inputs/AsyncSearchSelect → Completed**).

## Превью

<ComponentDocsPreview name="asyncSearchSelect" />

## Импорт

```tsx
import { AsyncSearchSelect } from '@v-lab/ui-kit'
import type {
  AsyncSearchSelectLoadResult,
  AsyncSearchSelectProps,
  SelectOption,
} from '@v-lab/ui-kit'
```

## Пример

```tsx
import { useCallback, useState } from 'react'
import { AsyncSearchSelect } from '@v-lab/ui-kit'
import type { SelectOption } from '@v-lab/ui-kit'

async function fetchPage(
  query: string,
  page: number,
  signal: AbortSignal
): Promise<{ items: SelectOption[]; hasMore: boolean }> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    pageSize: '20',
  })
  const res = await fetch(`/api/items?${params}`, { signal })
  return res.json()
}

export function RemoteSelect() {
  const [value, setValue] = useState('')
  const loadOptions = useCallback(
    async ({
      query,
      signal,
      page,
    }: {
      query: string
      signal: AbortSignal
      page: number
    }): Promise<AsyncSearchSelectLoadResult> => {
      const { items, hasMore } = await fetchPage(query, page, signal)
      return { options: items, hasMore }
    },
    []
  )
  return (
    <AsyncSearchSelect
      label="Элемент"
      placeholder="Выберите…"
      value={value}
      onChange={(next) => setValue(next)}
      loadOptions={loadOptions}
    />
  )
}
```

Ошибки загрузки показываются в выпадающем списке; состояния **loading** / **пустой результат** — встроенные (тексты на английском в текущей версии компонента) и объявляются скринридером через **`role="status"`**. Дополнительные сценарии — в Storybook **Inputs/AsyncSearchSelect**.

Если вернуть из **`loadOptions`** обычный **`SelectOption[]`** (как раньше), компонент считает, что **пагинации нет** — вызывается только **`page === 0`**.

## Значение, `ref` и форма

- **`onChange(value, option)`** получает новое значение и выбранную опцию; при очистке — **`''`** и **`null`**. Повторный выбор уже выбранного пункта **`onChange`** не вызывает.
- **`ref`** указывает на кнопку-триггер (**`HTMLButtonElement`**): **`ref.current.focus()`** переводит фокус на поле.
- Стандартные атрибуты кнопки (**`onFocus`**, **`onBlur`**, **`aria-describedby`**, **`data-*`**…) уходят на триггер.
- С **`name`** значение отправляется в форму скрытым **`<input type="hidden">`**; пустое значение — пустой строкой. **`form`** — id формы, если поле вне неё.

## Клавиатура и доступность {#keyboard}

Поле — **combobox** со списком **listbox** (WAI-ARIA APG), поведение общее с **[SelectInput](./select-input#клавиатура-и-доступность)**:

| Клавиши                                         | Действие                                                    |
| ----------------------------------------------- | ----------------------------------------------------------- |
| **↓** / **↑** / **Enter** / **Space** (триггер) | Открыть список, фокус уходит в поле поиска                  |
| Ввод в поиске                                   | Новый **`query`** (после **`debounceMs`**)                  |
| **↓** / **↑** / **PageUp** / **PageDown**       | Сменить активный пункт (**`aria-activedescendant`** поиска) |
| **Enter**                                       | Выбрать активный пункт и закрыть список                     |
| **Escape**                                      | Закрыть список; внутри **Modal** закрывается только список  |
| **Tab** / клик снаружи                          | Закрыть без выбора                                          |
| **Delete** / **Backspace** (триггер)            | Очистить значение                                           |

Поле поиска — **combobox** (**`aria-controls`** на listbox, **`aria-autocomplete="list"`**); после ответа **`loadOptions`** активен выбранный пункт, иначе первый. Пока идёт загрузка, у listbox **`aria-busy="true"`**. «Loading…», «No results» и «Failed to load» объявляются через **`role="status"`**.

Без видимого **`label`** обязательны **`aria-label`** или **`aria-labelledby`** (проверяет TypeScript):

```tsx
<AsyncSearchSelect aria-label="Компания" loadOptions={loadOptions} />
```

## Пагинация и сброс при вводе

**`page`** всегда начинается с **0** при открытии списка и **при каждой смене** debounced **`query`** (новый ввод в поиске сбрасывает номер страницы и список). Дальнейшие страницы запрашиваются автоматически, когда пользователь прокручивает контейнер опций почти до низа. Ответ с **`hasMore: false`** останавливает дозагрузку до следующего нового **`query`**.

## Строка поиска и запрос к API

Параметр **`query`** в **`loadOptions`** — это та же строка, что пользователь ввёл в поле поиска, после задержки **`debounceMs`**. Её нужно подставлять в URL или тело запроса (как в примере выше с **`encodeURIComponent(query)`**).

Если родителю нужно знать это значение **вне** **`loadOptions`** (синхронизация с адресной строкой, аналитика), используйте опциональный колбэк **`onSearchQueryChange(query)`** — он вызывается при каждом изменении уже «debounced» **`query`** (совпадает с тем, что передаётся в **`loadOptions`**).

## Пропсы

| Проп                                     | Описание                                                                                                                            |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`loadOptions`**                        | Обязательно: `(args: { query; signal; page }) => Promise<SelectOption[] \| { options; hasMore }>` — см. пагинацию выше              |
| **`debounceMs`**                         | Задержка перед вызовом **`loadOptions`** после ввода (по умолчанию **300**)                                                         |
| **`onSearchQueryChange`**                | Опционально: `(query: string) => void` — то же **`query`**, что уходит в **`loadOptions`**, после debounce                          |
| **`selectedOption`**                     | Если **`value`** задан снаружи, можно передать **`{ value, label, icon? }`** для подписи в триггере до появления опции в ответе API |
| **`searchPlaceholder`**                  | Плейсхолдер (и доступное имя) поля поиска внутри выпадашки (по умолчанию `'Search...'`)                                             |
| **`value`** / **`defaultValue`**         | `string` — **`value`** выбранной опции, **`''`** — ничего не выбрано                                                                |
| **`onChange`**                           | `(value: string, option: SelectOption \| null) => void`                                                                             |
| **`aria-label`** / **`aria-labelledby`** | Имя триггера; обязательно одно из них, если нет **`label`**                                                                         |

Остальное — как у **`SelectInput`** **`full`**: **`label`**, **`hint`**, **`error`**, **`placement`**, **`dropdownMaxHeight`**, **`optionTextWrap`**, **`prefix`**, **`name`** / **`form`** (скрытое поле формы), **`forwardRef`** на кнопку-триггер. Пропсов **`variant`**, **`searchThreshold`** и **`lazyLoadPageSize`** нет: поле всегда **`full`**, поиск всегда показан, страницы отдаёт **`loadOptions`**.

Тип **`AsyncSearchSelectProps`** — **`AsyncSearchSelect.types.ts`**. Исходники: **`src/components/inputs/AsyncSearchSelect/`**.
