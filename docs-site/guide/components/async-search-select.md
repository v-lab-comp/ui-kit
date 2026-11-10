---
title: AsyncSearchSelect
description: Поле выбора с асинхронной подгрузкой опций по поисковому запросу (Floating UI).
---

# AsyncSearchSelect

Вариант выпадающего списка для **удалённых данных**: при открытии и при каждом новом debounced **`query`** вызывается **`loadOptions({ query, signal, page: 0 })`**; при прокрутке списка к низу — **`page`** 1, 2, … пока вы возвращаете **`hasMore: true`**. Запросы с **`AbortSignal`** отменяются при закрытии, смене поиска или новой «первой странице». **`debounceMs`** по умолчанию 300 мс. Визуально и по пропсам поля совместим с **`SelectInput`** **`full`**, массива **`options`** в пропах нет.

Строка поиска внутри панели — тот же компонент **`SearchInput`** (`medium`), без **`autoFocus`**: при открытии выпадашки фокус остаётся на триггере, пока пользователь сам не перейдёт в поиск.

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
      onChange={(e) => setValue(e.target.value)}
      loadOptions={loadOptions}
    />
  )
}
```

Ошибки загрузки показываются в выпадающем списке; состояния **loading** / **пустой результат** — встроенные (тексты на английском в текущей версии компонента). Дополнительные сценарии — в Storybook **Inputs/AsyncSearchSelect**.

Если вернуть из **`loadOptions`** обычный **`SelectOption[]`** (как раньше), компонент считает, что **пагинации нет** — вызывается только **`page === 0`**.

## Пагинация и сброс при вводе

**`page`** всегда начинается с **0** при открытии списка и **при каждой смене** debounced **`query`** (новый ввод в поиске сбрасывает номер страницы и список). Дальнейшие страницы запрашиваются автоматически, когда пользователь прокручивает контейнер опций почти до низа. Ответ с **`hasMore: false`** останавливает дозагрузку до следующего нового **`query`**.

## Строка поиска и запрос к API

Параметр **`query`** в **`loadOptions`** — это та же строка, что пользователь ввёл в поле поиска, после задержки **`debounceMs`**. Её нужно подставлять в URL или тело запроса (как в примере выше с **`encodeURIComponent(query)`**).

Если родителю нужно знать это значение **вне** **`loadOptions`** (синхронизация с адресной строкой, аналитика), используйте опциональный колбэк **`onSearchQueryChange(query)`** — он вызывается при каждом изменении уже «debounced» **`query`** (совпадает с тем, что передаётся в **`loadOptions`**).

## Пропсы

| Проп                      | Описание                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`loadOptions`**         | Обязательно: `(args: { query; signal; page }) => Promise<SelectOption[] \| { options; hasMore }>` — см. пагинацию выше              |
| **`debounceMs`**          | Задержка перед вызовом **`loadOptions`** после ввода (по умолчанию **300**)                                                         |
| **`onSearchQueryChange`** | Опционально: `(query: string) => void` — то же **`query`**, что уходит в **`loadOptions`**, после debounce                          |
| **`selectedOption`**      | Если **`value`** задан снаружи, можно передать **`{ value, label, icon? }`** для подписи в триггере до появления опции в ответе API |
| **`searchPlaceholder`**   | Плейсхолдер поля поиска внутри выпадашки (по умолчанию `'Search...'`)                                                               |

Остальное — как у **`SelectInput`** **`full`**: **`label`**, **`hint`**, **`error`**, **`placement`**, **`dropdownMaxHeight`**, **`optionTextWrap`**, **`prefix`**, скрытый **`<select>`** для форм, **`forwardRef`** на него.

Тип **`AsyncSearchSelectProps`** — **`AsyncSearchSelect.types.ts`**. Исходники: **`src/components/inputs/AsyncSearchSelect/`**.
