# Table

Таблица с колонками, пагинацией и кликабельными строками. Рассчитана на пагинацию по API: в `data` передаётся только текущая страница, в `totalItems` — общее число записей с сервера.

---

## API

### TableProps\<T\>

| Проп                 | Тип                           | По умолчанию         | Описание                                                                                                                     |
| -------------------- | ----------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `columns`            | `TableColumn<T>[]`            | —                    | Описание колонок                                                                                                             |
| `data`               | `T[]`                         | —                    | **Данные текущей страницы.** При пагинации по API — только слайс, который вернул бэкенд                                      |
| `totalItems`         | `number`                      | —                    | Общее число элементов (с сервера). Если задано — показывается пагинация. Число страниц = `ceil(totalItems / pageSize)`       |
| `pageSize`           | `number`                      | `20`                 | Записей на странице                                                                                                          |
| `pageSizeOptions`    | `number[]`                    | `[20, 50, 100, 200]` | Варианты в селекте «N / страница»                                                                                            |
| `page`               | `number`                      | —                    | Текущая страница (1-based). Контролируемый режим: передаёшь из state, при клике получаешь новый номер через `onPageChange`   |
| `onPageChange`       | `(page: number) => void`      | —                    | Вызывается при клике по странице и при первом появлении пагинации (с `page=1`), чтобы родитель мог загрузить данные          |
| `onPageSizeChange`   | `(size: number) => void`      | —                    | Вызывается при смене размера страницы в селекте. Обычно сбрасываешь страницу в 1                                             |
| `onRowClick`         | `(row: T) => void`            | —                    | Клик по строке                                                                                                               |
| `maxHeight`          | `number \| string`            | —                    | Макс. высота области таблицы. Если задана — включается нативный скролл (верт. + гориз.) и шапка становится sticky (`top: 0`) |
| `hideHeader`         | `boolean`                     | `false`              | Скрыть строку заголовка (`thead`). Удобно для списков в сайдбаре и т.п.                                                      |
| `paginationPosition` | `'top' \| 'bottom'`           | `'top'`              | Где рендерить пагинацию относительно таблицы (порядок в DOM)                                                                 |
| `activeRowIndex`     | `number`                      | —                    | Индекс активной строки (0-based) в текущем `data`: строка получает `data-active`, подсветку рисует скин                      |
| `sort`               | `SortState[]`                 | —                    | Контролируемое состояние сортировки. Multi-sort: порядок в массиве = приоритет                                               |
| `defaultSort`        | `SortState[]`                 | `[]`                 | Начальное состояние сортировки (неконтролируемый режим)                                                                      |
| `onSortChange`       | `(sort: SortState[]) => void` | —                    | Вызывается при изменении сортировки                                                                                          |
| `reorder`            | `{ storageKey: string }`      | —                    | Включает drag-and-drop переупорядочивания колонок за заголовок; порядок сохраняется в `localStorage` по ключу `storageKey`   |

### TableColumn\<T\>

| Проп        | Тип                             | Описание                                                                                                                                      |
| ----------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`       | `keyof T \| string`             | Ключ поля в строке данных                                                                                                                     |
| `label`     | `string`                        | Заголовок колонки                                                                                                                             |
| `width`     | `number \| string`              | Ширина (число → px)                                                                                                                           |
| `minWidth`  | `number \| string`              | Минимальная ширина                                                                                                                            |
| `maxWidth`  | `number \| string`              | Максимальная ширина                                                                                                                           |
| `align`     | `'left' \| 'center' \| 'right'` | Выравнивание. По умолчанию `left`                                                                                                             |
| `strong`    | `boolean`                       | Жирный текст в ячейках колонки                                                                                                                |
| `render`    | `(row: T) => ReactNode`         | Кастомный рендер ячейки                                                                                                                       |
| `sortable`  | `boolean`                       | Заголовок колонки становится кнопкой сортировки (см. «Сортировка»)                                                                            |
| `sortField` | `string`                        | Поле сортировки, которое уходит в `onSortChange`. По умолчанию — `String(key)`                                                                |
| `sticky`    | `'left'`                        | Закрепляет колонку при горизонтальном скролле. Требует `maxHeight` на таблице и обязательный `width` у колонки (из него считается left-офсет) |

---

## Пагинация по API: как считается и как отдаётся страница

- **Количество страниц:** `totalPages = Math.ceil(totalItems / pageSize)`.
- **Текущая страница** родитель хранит в state и передаёт в таблицу через `page`. При клике по пагинации таблица вызывает `onPageChange(newPage)` — родитель делает `setPage(newPage)`, запрашивает данные для новой страницы и передаёт их в `data`.
- **Первый показ:** при монте с `totalItems` и `onPageChange` (и без переданного `page`) таблица один раз вызывает `onPageChange(1)`, чтобы родитель мог загрузить первую страницу.

---

## Сортировка

`SortState` — `{ field: string; direction: 'asc' | 'desc' }` (объявлен в `Table.types.ts`; из пакета экспортируются только `TableProps` и `TableColumn`, поэтому снаружи тип берут как `NonNullable<TableProps<Row>['sort']>`). Таблица данные не сортирует: она только хранит и отдаёт состояние сортировки, а сортировку (обычно на сервере) и сериализацию в query делает потребитель.

- **Клик** по заголовку `sortable`-колонки: нет сортировки → `asc` → `desc` → колонка убирается из сортировки. Остальные колонки не сбрасываются — так собирается multi-sort.
- **Shift+Click** — оставить сортировку только по этой колонке (`asc`).
- **Контролируемый режим:** `sort` + `onSortChange`. **Неконтролируемый:** `defaultSort`, `onSortChange` — для уведомлений.
- Активное направление отражается в `aria-sort` у заголовка.

```tsx
const [sort, setSort] = useState<NonNullable<TableProps<Row>['sort']>>([])

<Table
  columns={[
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Название', sortable: true },
  ]}
  data={items}
  sort={sort}
  onSortChange={setSort}
/>
// sort → query: sort.map((s) => (s.direction === 'desc' ? '-' : '') + s.field).join(',')
```

---

## Использование

### Без пагинации

Все данные локальные, таблица просто их отображает.

```tsx
<Table
  columns={[
    { key: 'id', label: 'ID', width: 80, align: 'center' },
    { key: 'name', label: 'Название', strong: true },
    { key: 'status', label: 'Статус', align: 'right' },
  ]}
  data={localRows}
/>
```

### С пагинацией по API (контролируемый режим)

Родитель держит `page` и `pageSize` в state. При смене страницы или размера страницы обновляет state и подставляет в таблицу новые `data` и при необходимости `totalItems`.

```tsx
const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(50)
const { items, total } = useApiList({ page, pageSize }) // запрос: page, pageSize

<Table
  columns={columns}
  data={items}
  totalItems={total}
  page={page}
  pageSize={pageSize}
  pageSizeOptions={[20, 50, 100, 200]}
  onPageChange={(p) => setPage(p)}
  onPageSizeChange={(s) => {
    setPageSize(s)
    setPage(1)
  }}
/>
```

**Что происходит при клике на 5-ю страницу:**

1. Таблица вызывает `onPageChange(5)`.
2. Родитель выполняет `setPage(5)` → state: `page=5`, `pageSize` без изменений.
3. Перезапускается запрос `useApiList({ page: 5, pageSize: 50 })`.
4. В `data` приходят элементы 5-й страницы.
5. Таблица получает `data={items}` и `page={5}` и отображает 5-ю страницу с правильной подсветкой в пагинации.

Важно передавать **`page={page}`** в таблицу, чтобы активная кнопка страницы в пагинации соответствовала твоему state.

### Смена размера страницы

При выборе другого значения в селекте «N / страница» вызывается `onPageSizeChange(size)`. Обычно делают: обновить `pageSize` и сбросить страницу в 1, затем запросить данные заново (как в примере выше).

---

## Сториз

- **Playground** — интерактивный пример с контролами.
- **Default** — таблица без пагинации.
- **WithPagination** — пагинация (неконтролируемый режим, без `page`/`onPageChange`).
- **ControlledPagination** — полный пример с `page`, `pageSize` в state и имитацией API: видно, как при клике по странице обновляется state и подставляются «данные страницы».
- **ClickableRows** — клик по строке через `onRowClick`.
- **WithoutHeader** — без заголовка (`hideHeader`).
- **PaginationBelowTable** — пагинация снизу (`paginationPosition="bottom"`).
- **ActiveRow** — активная строка (`activeRowIndex`).
- **ColumnAlignment** — выравнивание колонок (left / center / right) и ширина.
- **CustomRender** — колонка с кастомным `render`.
- **Sortable** — сортировка по нескольким колонкам и пример сериализации в query.
- **Reorderable** — переупорядочивание колонок drag-and-drop с сохранением в `localStorage`.
- **StickyHeaderAndColumn** — sticky-шапка и sticky-колонки (`maxHeight` + `sticky: 'left'`).

---

## Файлы

```
Table/
├── Table.types.ts   # TableColumn<T>, TableProps<T>, SortState
├── Table.tsx        # компонент, пагинация, Remix icons
├── (контракт — src/theme/contracts/table.ts, стили — src/skins/corporate/components/table.css)
├── index.ts
├── Table.stories.tsx
└── README.md
```
