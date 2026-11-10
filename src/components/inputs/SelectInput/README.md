# SelectInput

Выпадающий список: `variant` **`full`** (InputField с label / hint / error) и компактные **`compact`** / **`compact-label`** / **`inline`**; плоские `options` или `groups`; `mode="multiple"`; поиск при длинном списке; ленивая отрисовка страницами.

Документация для пользователей — `docs-site/guide/components/select-input.md` и Storybook **Inputs/SelectInput**. Здесь — устройство компонента и части для переиспользования.

## API в двух словах

```tsx
<SelectInput label="Страна" options={OPTIONS} value={value} onChange={(value, option) => setValue(value)} />
<SelectInput variant="compact-label" aria-label="Валюта" options={CURRENCIES} name="currency" />
<SelectInput mode="multiple" label="Поля" options={OPTIONS} onChange={(values, options) => …} />
```

- `onChange(value, option)` — значение и опция (`''` и `null` при очистке); в `multiple` — `(values, options)`. Повторный выбор того же пункта `onChange` не вызывает.
- `ref` — кнопка-триггер (`HTMLButtonElement`). Остальные стандартные атрибуты (`onFocus`, `onBlur`, `aria-describedby`, `data-*`…) тоже уходят на неё.
- `name` → скрытые `<input type="hidden">` (в `multiple` — по одному на значение), `form` — id формы.
- Компактные варианты требуют `aria-label` или `aria-labelledby` (проверяет TypeScript).

## Клавиатура

| Где                     | Клавиши                          | Действие                                                       |
| ----------------------- | -------------------------------- | -------------------------------------------------------------- |
| Триггер, список закрыт  | ↓ ↑ Enter Space                  | Открыть (активен выбранный пункт, иначе первый / последний)    |
|                         | Home / End                       | Открыть на первом / последнем пункте                           |
|                         | Символы (без поиска)             | Открыть и подсветить совпадение (typeahead)                    |
|                         | Delete / Backspace               | Очистить значение                                              |
| Триггер или поле поиска | ↓ ↑ Home End PageUp PageDown     | Сменить активный пункт (`aria-activedescendant`)               |
|                         | Enter, Space (не в поиске)       | Выбрать; в `multiple` — переключить, список остаётся открытым  |
|                         | Escape                           | Закрыть, фокус на триггер; событие не всплывает (модалка цела) |
|                         | Tab / уход фокуса / клик снаружи | Закрыть без выбора                                             |

С полем поиска фокус при открытии уходит в него (оно становится `combobox` с `aria-controls` / `aria-activedescendant`) и возвращается на триггер при закрытии. Home / End в поле поиска двигают курсор.

## Устройство

| Файл                           | Что делает                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------- |
| `SelectInput.tsx`              | Разбирает пропсы, связывает хуки и части, рендерит `full` / компактный вариант               |
| `useSelectValue.ts`            | Значение: контролируемое / внутреннее (`@/utils/useControllableState`), single / multiple    |
| `useSelectList.ts`             | Поиск, группы, ленивая отрисовка страницами                                                  |
| `useSelectInteractions.ts`     | floating-ui: `useClick`, `useDismiss`, `useRole`, `useListNavigation`, `useTypeahead`, фокус |
| `useLoadMoreSentinel.ts`       | IntersectionObserver «сторожа» в конце списка                                                |
| `useSelectDropdownFloating.ts` | Позиционирование панели (offset / flip / shift / ширина)                                     |
| `SelectTrigger.tsx`            | Кнопка-триггер всех вариантов                                                                |
| `SelectSuffix.tsx`             | Кнопка очистки + шеврон (`full`), `SelectChevron`                                            |
| `SelectDropdownPanel.tsx`      | Портал, панель, поле поиска, контейнер прокрутки                                             |
| `SelectOptionList.tsx`         | `<ul role="listbox">` + сторож; `SelectListStatus` — статус в `role="status"`                |
| `SelectOptionRow.tsx`          | Пункт (single / multiple), строка плейсхолдера, заголовок группы                             |
| `SelectInputListbox.tsx`       | Содержимое панели SelectInput (группы, плейсхолдер, статус пустого списка)                   |
| `SelectFormFields.tsx`         | Скрытые поля формы                                                                           |
| `selectOptions.ts`             | Чистые функции: фильтр, строки списка, короткая подпись, поворот шеврона                     |

Классы и `data-*` атрибуты — из контракта `@/theme/contracts/select-input`; скин выбирает по ним, менять их нельзя.

## Части для других полей (`./parts`)

Импорт: `import { … } from '../SelectInput/parts'` (в `src/index.ts` не экспортируются).

### `useSelectInteractions(options)`

Опции: `disabled`, `multiple`, `closeOnSelect`, `placement`, `variant`, `dropdownWidth`, `itemCount` (пункты навигации, включая недорисованные), `typeaheadLabels` (`null` — без typeahead, например при поиске), `hasSearch`, `selectedIndex`, `onSelectIndex(index)`, `onClear?` (Delete / Backspace), `onOpenChange?(open)`, `onActiveIndexChange?(index)`.

Возвращает: `open`, `activeIndex`, `setActiveIndex`, `close()`, `focusTrigger()`, `listboxId`, `getOptionId(index)`, `floatingStyles`, `basePlacement`; ref-ы `triggerRef` (кнопка), `positionRef` (якорь позиционирования — корень поля), `floatingRef` (портальная обёртка); геттеры `getTriggerProps(userProps)`, `getFloatingProps()`, `getListboxProps()`, `getOptionProps(index, selected)`, `getSearchProps()`.

Результат хука нужно деструктурировать: линтер React Compiler считает весь объект ref-ом из-за полей `*Ref`.

### Разметка

- `SelectTrigger` — `variant`, `open`, `placement`, `size`, `text`, `isPlaceholder`, `icon?`, `error?`, `filled?`, `completed?`, `completedColor?` + атрибуты кнопки (`getTriggerProps()`).
- `SelectSuffix` — `open`, `placement`, `showClear`, `disabled?`, `onClear`; `SelectChevron` — `open`, `placement`, `size`.
- `SelectDropdownPanel` — `open`, `floatingRef`, `floatingProps`, `floatingStyles`, `dropdownPortalZIndex?`, `basePlacement`, `dropdownWidth?`, `dropdownMaxHeight?`, `search?: { value, onChange(value), placeholder, disabled?, inputProps? }` (`inputProps` — `getSearchProps()`), `listScrollRef?`, `onListScroll?`.
- `SelectOptionList` — атрибуты `<ul>` (`getListboxProps()`), `busy?` (`aria-busy`), `loadMoreRef?` (рисует сторож).
- `SelectOptionRow` — `option`, `multiple?`, `selected`, `active`, `wrap?` + `getOptionProps(index, selected)` (в том числе `ref`).
- `SelectListStatus` — `message?`, `error?`, `part?: 'empty-state' | 'async-footer-message'`.
- `SelectFormFields` — `name?`, `values`, `form?`.

### Пример: поле с удалённым списком

```tsx
const { open, activeIndex, triggerRef, positionRef, floatingRef, floatingStyles, basePlacement,
  getTriggerProps, getFloatingProps, getListboxProps, getOptionProps, getSearchProps } =
  useSelectInteractions({
    closeOnSelect: true, placement, variant: 'full', itemCount: options.length,
    typeaheadLabels: null, hasSearch: true, selectedIndex, onSelectIndex: (i) => pick(options[i]),
  })

<SelectDropdownPanel open={open} floatingRef={floatingRef} floatingProps={getFloatingProps()} …
  search={{ value: query, onChange: setQuery, placeholder, inputProps: getSearchProps() }}>
  <SelectOptionList {...getListboxProps()} busy={loading}>
    {options.map((o, i) => (
      <SelectOptionRow key={o.value} {...getOptionProps(i, o.value === value)} option={o}
        selected={o.value === value} active={activeIndex === i} />
    ))}
  </SelectOptionList>
  <SelectListStatus message={loading ? 'Loading…' : undefined} />
</SelectDropdownPanel>
```
