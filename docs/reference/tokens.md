# Дизайн-токены

Все значения цвета, фона, обводки, радиуса, тени, z-index — через CSS Custom Properties. Файлы лежат в скине `src/skins/corporate/` и попадают к потребителю в `@v-lab/ui-kit/skins/corporate.css`. Почему именно так — в [`../architecture/styling.md`](../architecture/styling.md).

Токены объявлены на элементе со скином: светлые — `[data-vl-skin~='corporate']` (и вложенный `[data-theme='light']`), тёмные — `:where([data-vl-skin~='corporate'])[data-vl-scheme='dark']`, `…[data-theme='dark']` на том же элементе или вложенный `[data-theme='dark']`. Все селекторы весят (0,1,0), поэтому переопределение на `:root` в CSS приложения, подключённом после скина, действует в обеих схемах (кроме вложенных контейнеров `[data-theme]` — на них токены объявлены заново):

```css
:root {
  --primary-base: #0b6bcb;
}
```

## Семантические токены — `src/skins/corporate/tokens.css`

### Фон

```
--bg-white-0      основной светлый фон поверх контента
--bg-weak-50      слабый фон поверх white-0 (зебра, кнопки-ghost hover)
--bg-soft-200     мягкая подложка (поля, теги без обводки)
--bg-sub-300      подложка чуть темнее (skeleton, неактивные блоки)
--bg-surface-800  тёмная поверхность (header в dark, overlay tint)
--bg-strong-950   максимально тёмный фон
```

### Текст

```
--text-strong-950    основной текст
--text-sub-600       вторичный текст (hint, метки)
--text-soft-400      приглушённый текст (placeholder)
--text-disabled-300  цвет disabled-текста
--text-white-0       текст на тёмном фоне
```

### Обводки

```
--stroke-strong-950   контрастная рамка
--stroke-sub-300      разделители таблиц, нижние границы
--stroke-soft-200     основная рамка инпутов и карточек
--stroke-white-0      рамка на тёмном фоне
```

### Primary

```
--primary-base      основной brand-цвет
--primary-dark      hover у filled
--primary-darker    active у filled
--primary-alpha-10  полупрозрачная подложка (hover у stroke / ghost)
--primary-alpha-16  чуть плотнее (active у stroke / ghost)
```

### Состояния

```
--error-base, --error-light, --error-lighter, --error-dark
--success-base
--warning-base
--information-base
```

(И аналогичные `lighter` / `dark` варианты — см. `tokens.css`.)

### Радиусы

```
--radius-0, --radius-2, --radius-4, --radius-6, --radius-8, --radius-10, --radius-12,
--radius-16, --radius-20, --radius-24, --radius-28, --radius-full
```

### Тени

В `src/skins/corporate/shadows.css` лежат семантические токены теней (например `--shadow-regular-x-small`, `--shadow-regular-small`, `--shadow-regular-medium`, и т.д.). В компонентах использовать **только** их, не писать `box-shadow` числами.

### Z-index

```
--z-base       контент страницы
--z-raised     локальное наложение соседей (ButtonGroup hover, sticky-колонка Table)
--z-dropdown   SelectInput, AppSwitcher
--z-sticky     PageHeader, sticky-шапка Table
--z-sidebar    Sidebar
--z-overlay    Popover, календарь DateInput, меню SidebarHeaderCard
--z-modal      Modal / Drawer (внутри ModalProvider — сдвиг по глубине стека)
--z-tooltip    Tooltip
--z-toast      Toast-уведомления
```

Магических чисел `z-index: 9999` в компонентах быть не должно.

### Высоты и переменные инпутов

В `src/skins/corporate/components/base-input.variables.css` объявлены переменные `--base-input-height-*`, `--base-input-padding-*`, `--base-input-radius-*`, `--base-input-border-error`, `--base-input-bg-disabled` и т.д. Файл подключается один раз в `src/skins/corporate/index.css`; обёртки инпутов используют те же переменные, а не дублируют значения.

## Палитры `[data-color='{name}']` — `src/skins/corporate/palettes.css`

Палитры для вариантов компонентов Button / Badge / Tag / Toast. Компонент получает атрибут `data-color` из контракта, палитра по селектору `[data-color='<name>']` выставляет 5 CSS-переменных:

```
--pal-base       основной цвет (фон filled, обводка/текст stroke)
--pal-hover      hover у filled
--pal-active     active у filled
--pal-bg-hover   полупрозрачный фон — hover у stroke / lighter / ghost
--pal-bg-active  полупрозрачный фон темнее — active у stroke / ghost
```

Список цветов и тип `Color` — в `src/types/colors.ts` (`COLOR_OPTIONS`): `primary`, `neutral`, `error`, `information`, `warning`, `success`, `away`, `feature`, `verified`, `highlighted`, `stable`.

Как палитры подключены к компонентам и как пишется исключение для пары «цвет + вариант» — в [`../architecture/styling.md`](../architecture/styling.md).

## Примитивы цветов — `src/skins/corporate/primitives.css`

Источник правды для палитры. CSS-переменные вида `--slate-500: #...;` и альфа-варианты `--blue-alpha-16: #...;`.

TypeScript-объекты (`src/colors/primitives.ts`) **генерируются** скриптом из `primitives.css`:

```bash
npm run gen:primitives
```

`primitives.ts` руками не редактируют — он перезаписывается. Скрипт парсит только не-закомментированные переменные, так что палитру можно временно сократить, закомментировав ненужные блоки.

Доступные шкалы — те, что объявлены в `primitives.css`. Из `primitives.ts` экспортируются объекты `colors`, `alpha` и утилита `getPrimitiveHex`.
