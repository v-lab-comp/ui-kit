---
title: Table
description: Ustunlar, ma’lumot va sahifalash bilan jadval.
---

# Table

Ma’lumot qatori bo‘yicha generic umumiy jadval: **`columns`**, **`data`**, ixtiyoriy **`totalItems`** / **`pageSize`**.

## Preview

<ComponentDocsPreview name="table" />

## Import

```tsx
import { Table } from '@v-lab/ui-kit'
import type { TableColumn } from '@v-lab/ui-kit'
```

## Misol

```tsx
import { Table } from '@v-lab/ui-kit'
import type { TableColumn } from '@v-lab/ui-kit'

type Row = { id: string; name: string; status: string }

const columns: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', width: 72 },
  { key: 'name', label: 'Nomi', strong: true },
  { key: 'status', label: 'Holat' },
]

const data: Row[] = [
  { id: '1', name: 'A pozitsiyasi', status: 'Faol' },
  { id: '2', name: 'B pozitsiyasi', status: 'Qoralama' },
]

export function ItemsTable() {
  return <Table columns={columns} data={data} />
}
```

Sahifalash bilan:

```tsx
<Table columns={columns} data={data} totalItems={120} pageSize={20} />
```

## Saralash

Ustunga `sortable: true` qo‘ying.

- **Sarlavhaga bosish** — tartib: `asc → desc → none`. Boshqa ustunlardagi saralashni o‘chirmaydi — multi-sort tabiiy ravishda yig‘iladi.
- **Shift+Click** — faqat shu ustunni qoldirish (single-sort’ga tezkor qaytarish).

Multi-sort’dagi ustuvorlik bosish tartibiga mos keladi va `onSortChange(sort)` / query orqali ko‘rinadi.

Komponent ma’lumotni o‘zi saralamaydi — holatni `onSortChange(sort)` orqali uzatadi. Query qatorini hosil qilish iste’molchining vazifasi.

```tsx
import type { SortState } from '@v-lab/ui-kit'

const [sort, setSort] = useState<SortState[]>([])

const cols: TableColumn<Row>[] = [
  { key: 'subject', label: 'Mavzu', sortable: true },
  { key: 'registration_date', label: 'Sana', sortable: true },
]

// `sort=-registration_date,subject`
const query = 'sort=' + sort.map((s) => (s.direction === 'desc' ? '-' : '') + s.field).join(',')

return <Table columns={cols} data={data} sort={sort} onSortChange={setSort} />
```

Boshqa formatlar uchun (`sort=field&order=desc`, `sort=field:desc`) faqat qatorni yig‘ish o‘zgaradi — `SortState[]` neytral qoladi.

Standart `field = String(column.key)`. API’dagi nom farq qilsa — ustunga `sortField` bering.

## Ustunlarni qayta tartiblash

Sarlavhadan drag-and-drop `reorder: { storageKey }` propi orqali yoqiladi. Tartib ko‘rsatilgan kalit bo‘yicha `localStorage` da saqlanadi va keyingi renderda tiklanadi. Prop berilmasa — imkoniyat o‘chirilgan.

- **Sortable sarlavhaga bosish** — saralash (kursor harakatlanmasa drag boshlanmaydi).
- **Sarlavhani ushlab tortish** — ustunlar tartibini o‘zgartiradi.
- `columns` da paydo bo‘lgan, lekin saqlangan tartibda bo‘lmagan yangi ustunlar oxiriga qo‘shiladi; olib tashlanganlari filtrlanadi.

```tsx
<Table columns={cols} data={data} reorder={{ storageKey: 'app:documents-table:order' }} />
```

`storageKey` har bir jadval uchun noyob bo‘lishi kerak — turli jadvallar tartibi aralashib ketmasligi uchun ekran nomini kalitga qo‘shing.

## Yopishqoq sarlavha va yopishqoq ustunlar

Katta hajmdagi maʼlumotlar uchun **`maxHeight`** ni bering — jadval oʻzining tabiiy skrollini (vertikal + gorizontal) oladi va vertikal skrollda sarlavha joyida qotib turadi. `maxHeight` boʻlmasa, xatti-harakat oldingidek (jadval kontentiga qarab oʻsadi).

Ustunni gorizontal skrollda joyida saqlash uchun **`sticky: 'left'`** ni qoʻshing. Yopishqoq ustun uchun **`width`** majburiy — undan chap ofset hisoblanadi (bir nechta yopishqoq ustun ketma-ket joylashadi). Oxirgi yopishqoq ustunda ajratuvchi soya chiziladi.

```tsx
const cols: TableColumn<Row>[] = [
  { key: 'id', label: 'ID', width: 80, sticky: 'left', strong: true },
  { key: 'name', label: 'Nomi', width: 220, sticky: 'left' },
  { key: 'status', label: 'Holat', width: 160 },
  // …keng ustunlar
]

<Table columns={cols} data={data} maxHeight={360} />
```

## Asosiy proplar (`Table`)

| Prop                             | Tip                              | Tavsif                                                                                                                 |
| -------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `columns`                        | **`TableColumn<T>[]`**           | Ustunlar: kalit, sarlavha, kenglik, **`render`**, tekislash, **`sortable`**                                            |
| `data`                           | **`T[]`**                        | Joriy sahifa qatorlari                                                                                                 |
| `totalItems`                     | `number`                         | Backend dan jami elementlar (sahifalashni yoqadi)                                                                      |
| `pageSize`                       | `number`                         | Sahifa hajmi (nazorat qilinadigan, **`onPageSizeChange`** bilan); nazoratsiz — **`defaultPageSize`** (standart **20**) |
| `page`                           | `number`                         | Joriy sahifa (1-based), **`onPageChange`** bilan; nazoratsiz — **`defaultPage`**                                       |
| `onPageChange`                   | `(page: number) => void`         | Sahifa almashtirish                                                                                                    |
| `pageSizeOptions`                | `number[]`                       | Sahifa hajmi selekt variantlari (standart `[20, 50, 100, 200]`)                                                        |
| `onPageSizeChange`               | `(size: number) => void`         | Sahifa hajmi o‘zgarishi                                                                                                |
| `onRowClick`                     | `(row: T) => void`               | Qator bosilganda; qator fokuslanadi va Enter/Space bilan ishlaydi                                                      |
| `getRowKey`                      | `(row: T, index: number) => Key` | Qatorning barqaror kaliti (standart — indeks)                                                                          |
| `aria-label` / `aria-labelledby` | `string`                         | Jadval nomi; `maxHeight` da fokuslanadigan aylantirish hududi nomi ham                                                 |
| `maxHeight`                      | `number` \| `string`             | Maks. balandlik: tabiiy skroll va yopishqoq sarlavhani yoqadi                                                          |
| `hideHeader`                     | `boolean`                        | Jadval sarlavhasini yashirish                                                                                          |
| `paginationPosition`             | `top` \| `bottom`                | Sahifalash qayerda ko‘rsatiladi                                                                                        |
| `activeRowIndex`                 | `number`                         | Chiroqlangan qator indeksi (**`data`** da 0-based)                                                                     |
| `sort`                           | `SortState[]`                    | Boshqariladigan saralash holati (multi-sort: massiv tartibi = ustuvorlik)                                              |
| `defaultSort`                    | `SortState[]`                    | Boshlang‘ich saralash holati (boshqarilmagan rejim)                                                                    |
| `onSortChange`                   | `(sort: SortState[]) => void`    | Saralash o‘zgarganda chaqiriladi                                                                                       |
| `reorder`                        | `{ storageKey: string }`         | Ustunlarni qayta tartiblash: DnD yoki sarlavhada Alt+Shift+←/→; tartib `localStorage[storageKey]` da                   |

### `TableColumn<T>` ustuni

| Maydon                            | Tip                           | Tavsif                                                              |
| --------------------------------- | ----------------------------- | ------------------------------------------------------------------- |
| `key`                             | `keyof T` \| `string`         | Qator may yoki ixtiyoriy kalit                                      |
| `label`                           | `string`                      | Ustun sarlavhasi                                                    |
| `width` / `minWidth` / `maxWidth` | `number` \| `string`          | Kenglik                                                             |
| `render`                          | `(row: T) => ReactNode`       | Maxsus kataksa                                                      |
| `strong`                          | `boolean`                     | Katakdagi qalin matn                                                |
| `sortable`                        | `boolean`                     | Ustun bosish bo‘yicha saralanadi                                    |
| `sortField`                       | `string`                      | `onSortChange` ga uzatiladigan maydon nomi (standart `String(key)`) |
| `align`                           | `left` \| `center` \| `right` | Tekislash                                                           |
| `sticky`                          | `'left'`                      | Ustunni gorizontal skrollda qotirish (`maxHeight` va `width` kerak) |

To‘liq tip — **`TableProps<T>`**.

## Galereya

Sahifalash, qator bosish, ustun kengliklari, maxsus render — Storybook **Gallery/Table** kabi.

<ComponentDocsPreview name="tableGallery" />

Manbalar: `src/components/Table/`.
