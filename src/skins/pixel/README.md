# Скин `pixel`

Скин `pixel` — 8-битный облик V-Lab UI Kit в духе старых консолей: рамки со ступенчатыми углами, жёсткие тени без размытия, ограниченная палитра, дизеринг вместо полупрозрачности, пиксельные шрифты. Компоненты те же — меняется только CSS.

`pixel` **расширяет** `corporate`: раскладка (размеры, отступы, флекс, позиционирование, анимации) приходит из `corporate`, а `pixel` переопределяет поверх только вид — токены, рамки, тени, шрифты. Общая модель скинов — в [`docs/architecture/theming.md`](../../../docs/architecture/theming.md), устройство базового скина — в [`../corporate/README.md`](../corporate/README.md).

## Подключение

```tsx
// Порядок важен: сначала corporate, потом pixel
import '@v-lab/ui-kit/skins/corporate.css'
import '@v-lab/ui-kit/skins/pixel.css'
// Шрифты — забота приложения (см. ниже)
import '@fontsource/press-start-2p/400.css'
import '@fontsource/tiny5/400.css'

import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { pixelSkin } from '@v-lab/ui-kit/skins/pixel'
;<ThemeProvider skins={[corporateSkin, pixelSkin]} defaultSkin="pixel">
  <App />
</ThemeProvider>
```

- **Манифест** `pixelSkin = defineSkin({ name: 'pixel', schemes: ['light', 'dark'], extends: corporateSkin })`. Провайдер ставит на `<html>` цепочку `data-vl-skin="corporate pixel"`: селекторы `[data-vl-skin~='corporate']` и `[data-vl-skin~='pixel']` срабатывают оба. Без провайдера — `<html data-vl-skin="corporate pixel" data-vl-scheme="light">`, для SSR — `themeHtmlAttributes(pixelSkin, 'light')`.
- **Нужны оба CSS-файла.** `pixel.css` содержит только правила pixel — стилей corporate в нём нет.
- **`pixel.css` — строго после `corporate.css`.** У правил обоих скинов одинаковый нулевой вес префикса `:where([data-vl-skin~='…'])`, у токенов — одинаковые селекторы (0,1,0). При равной специфичности побеждает правило, которое идёт позже, поэтому pixel перекрывает corporate только порядком подключения. Подключите наоборот — останется облик corporate.
- **Ленивая загрузка.** Можно не грузить `pixel.css` сразу, а отдать его в `load` своего манифеста, как в примере `brandSkin` в [`theming.md`](../../../docs/architecture/theming.md). Порядок сохраняется: ленивый `<link>` или `<style>` встаёт в конец `<head>`, то есть после `corporate.css`.
- **Фон страницы** скин не задаёт, как и corporate. Для «бумаги» из макета приложение ставит `background: var(--bg-weak-50)` и `color: var(--text-strong-950)` на свой корень.

### Шрифты

| Шрифт            | Где                                                                            | Токен            |
| ---------------- | ------------------------------------------------------------------------------ | ---------------- |
| `Press Start 2P` | Заголовки, кнопки, бейджи, шапки таблиц, вкладки, лейблы — мелкие кегли 7–12px | `--font-display` |
| `Tiny5`          | Основной текст, поля ввода, подсказки — 13–20px                                | `--font-sans`    |

Скин шрифты не подключает: файлов шрифтов в пакете нет. Приложение берёт их из `@fontsource/press-start-2p` и `@fontsource/tiny5` (файлы `400.css` уже содержат латиницу и кириллицу) или из Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Tiny5&display=swap"
  rel="stylesheet"
/>
```

Без шрифтов текст рисуется запасным `monospace`. На корне скина сглаживание выключено (`-webkit-font-smoothing: none`, действует на macOS) — пиксельный шрифт остаётся с чёткими краями.

## Что в папке

| Файл                                  | Роль                                                                                                                                                                 |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.ts`                            | Манифест `pixelSkin` (`extends: corporateSkin`). Импортирует `index.css`, чтобы сборка выпустила `dist/skins/pixel.css`. Публикуется как `@v-lab/ui-kit/skins/pixel` |
| `index.css`                           | Подключает файлы скина в порядке каскада. Единственный файл с `@import`. Публикуется как `@v-lab/ui-kit/skins/pixel.css`                                             |
| `tokens.css`                          | Переопределение семантических токенов corporate для светлой и тёмной схемы, шрифты, радиусы `0`, затемнение. Собственные токены `--font-display` и `--pixel-*`       |
| `shadows.css`                         | Те же `--shadow-*`, что у corporate, но жёсткие: сдвиг без размытия. Едва заметные `x-small` — пустые                                                                |
| `palettes.css`                        | `--pal-*` для 11 палитр `[data-color]` + свои `--pal-text` и `--pal-on-base`                                                                                         |
| `halo.css`                            | Выключает hover-ореол corporate: мягкое свечение — не 8-битный приём                                                                                                 |
| `components/<name>.css`               | Вид компонента поверх `corporate/components/<name>.css`. Имена файлов — те же, что у corporate                                                                       |
| `components/base-input.variables.css` | Переменные поля ввода `--base-input-*` (файл токенов, явный селектор)                                                                                                |
| `components/ui-kit-root.css`          | База под `.vl-ui-kit-root`: corporate включает там сглаживание `antialiased`, pixel его выключает                                                                    |
| `README.md`                           | Этот файл                                                                                                                                                            |

Сборка — как у любого скина: `vite.config.ts` сам находит `src/skins/pixel/index.ts` и выпускает `dist/skins/pixel.{js,css,d.ts}`. `pixel.js` импортирует `./corporate.js` (манифест базового скина, без CSS).

## Порядок каскада в `index.css`

1. `tokens.css`, `shadows.css`, `palettes.css`, `components/base-input.variables.css` — переменные; от порядка не зависят.
2. `halo.css` — до компонентов, чтобы файл компонента при равном весе мог переопределить `::after` своей кнопки.
3. Файлы компонентов — **в том же порядке, что в `corporate/index.css`**: правила pixel с равным весом разрешаются так же, как у corporate. Новый файл компонента добавляется строкой `@import` на то же место, что у corporate.

Все файлы pixel идут после всех файлов corporate (отдельный CSS-файл), поэтому любое правило pixel перекрывает правило corporate с тем же весом.

## Как писать файл компонента

Правила те же, что у corporate ([`../corporate/README.md`](../corporate/README.md#как-написан-файл-компонента)): один блок `:where([data-vl-skin~='pixel']) { … }` на файл, нативная вложенность, значения только через токены, без `!important`.

`@keyframes` — после блока и **со своим именем** `vl-<компонент>-pixel-<имя>`. Имена `@keyframes` глобальны и префиксом скина не ограничены: анимация pixel с именем из corporate заменила бы её и в corporate.

Что ещё важно для скина-наследника:

- **Переопределяйте только вид.** Раскладку (display, flex, размеры, отступы между частями, позиционирование) corporate уже задал — повторять её не нужно. Менять размер стоит, только когда этого требует 8-битный приём (например, место под рамку).
- **Тот же селектор — тот же вес.** Чтобы перекрыть правило corporate, напишите в pixel такой же внутренний селектор (`.vl-button`, `:where(.vl-button)[data-variant='filled']`, `.vl-button:hover:not(:disabled)`). Более слабый селектор не перекроет более сильный из corporate, даже если идёт позже.
- **Рамка вместо `border`.** Ступенчатая рамка рисуется тенью снаружи элемента. Если у corporate у элемента есть `border`, уберите его (`border-color: transparent` или `border: 0` — смотрите, держит ли рамка размер), а рамку рисуйте `box-shadow: var(--pixel-frame)`.
- **Цвет рамки — переменной на элементе:** `.vl-input-field__wrapper[data-error] { --pixel-frame-color: var(--error-base); }`. `--pixel-frame` и `--pixel-drop` пересчитываются на каждом элементе кита, четыре тени перечислять не нужно.
- **Фокус** — только `:focus-visible`: `outline: var(--pixel-focus-outline); outline-offset: var(--pixel-focus-offset);`.
- **Тайминги, на которые завязан JS, не менять.** Длительность анимации выхода тоста должна совпадать с `useToastQueue.ts` (см. комментарий в `corporate/components/toast.css`).
- **Атрибуты для стилей** берутся из контракта (`src/theme/contracts/<name>.ts`) и из CSS corporate. Если для приёма не хватает хука (атрибута или части), компонент не правят — задача записывается отдельно.

## Токены

### Что переопределено

| Группа                                                            | Светлая схема                                                 | Тёмная схема                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `--font-sans`                                                     | `'Tiny5', monospace`                                          | —                                                                       |
| `--radius-*`, включая `--radius-full`                             | `0`                                                           | —                                                                       |
| `--bg-white-0` / `--bg-weak-50`                                   | панель `#fffdf5` / бумага `#f4f1e6`                           | панель `#1f1f2e` / фон `#14141f`                                        |
| `--text-strong-950` / `--text-sub-600` / `--text-soft-400`        | `#1b1b2f` / `#55536a` / `#6e6b82`                             | `#ecead9` / `#a9a7bd` / `#9896ae`                                       |
| `--stroke-strong-950`                                             | чернила `#1b1b2f`                                             | `#ecead9`                                                               |
| `--primary-base` / `--primary-dark`                               | `#2b4fd9` / `#1b3bb3` (ссылки)                                | `#3a5bef` / `#8fa6ff` (ссылки)                                          |
| `--primary-alpha-10` / `-16`                                      | сплошные `#eef1ff` / `#dfe6ff`                                | `#232a4d` / `#2a3366`                                                   |
| Состояния `--{warning,error,success,…}-{dark,base,light,lighter}` | base — заливка, dark — текст на светлом, light/lighter — фоны | base — та же заливка, dark — светлый текст, light/lighter — тёмные фоны |
| `--shadow-*`                                                      | жёсткие, `rgba(27, 27, 47, .28)`                              | `rgba(0, 0, 0, .55)`                                                    |
| `--overlay-overlay-gray`, `--overlay-bg`                          | `rgba(27, 27, 47, .45)`                                       | `rgba(0, 0, 0, .6)`                                                     |

Не переопределены и приходят из corporate: `--z-*`, `--motion-*`, `--halo-*`, примитивы (`--blue-500` и др.).

**Контраст.** Текст — от 4,5:1 на своих фонах: `--text-*` на панели и бумаге, `--X-dark` на `--X-lighter`, белый на `--X-base`. Исключения: `--warning-base` и `--away-base` — жёлтые заливки, текст на них чернилами (`--static-black`, 9:1), а как цвет текста они не годятся — для этого `--X-dark`. `--text-disabled-300` — только для неактивных элементов (WCAG их не нормирует).

### Свои токены скина

| Токен                                                                   | Что это                                                                                         | Как применять                                                                                     |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `--font-display`                                                        | `'Press Start 2P', monospace`                                                                   | `font-family: var(--font-display)` у кнопок, бейджей, заголовков, лейблов                         |
| `--pixel-unit`, `--pixel-unit-sm`                                       | Толщина «пикселя» рамки: `4px` и `2px`                                                          | `margin: var(--pixel-unit)` — место под рамку                                                     |
| `--pixel-frame-color`                                                   | Цвет рамки, по умолчанию `--stroke-strong-950`                                                  | Переопределяется на элементе                                                                      |
| `--pixel-frame`, `--pixel-frame-sm`                                     | Ступенчатая рамка 4px / 2px (четыре тени)                                                       | `box-shadow: var(--pixel-frame), var(--pixel-bevel)`                                              |
| `--pixel-frame-disabled`                                                | Серая рамка неактивного элемента                                                                | вместе с `background: var(--pixel-dither)`                                                        |
| `--pixel-bevel`, `--pixel-bevel-sm`                                     | Объём цветной кнопки: свет сверху-слева, тень снизу-справа                                      | после рамки в `box-shadow`                                                                        |
| `--pixel-bevel-pressed`, `--pixel-press-shift`                          | Нажатие: тень внутрь и сдвиг `translate(2px, 2px)`                                              | `box-shadow: var(--pixel-frame), var(--pixel-bevel-pressed); transform: var(--pixel-press-shift)` |
| `--pixel-bevel-panel`, `--pixel-shade`                                  | Объём светлой кнопки без заливки (ButtonGroup, SegmentedControl)                                | `box-shadow: var(--pixel-frame), var(--pixel-bevel-panel)`                                        |
| `--pixel-inset`, `--pixel-inset-color`                                  | Утопленное поле ввода                                                                           | `box-shadow: var(--pixel-frame), var(--pixel-inset)`                                              |
| `--pixel-drop`, `--pixel-drop-lg`, `--pixel-shadow-color`               | Жёсткая тень `8px 8px` / `10px 10px` с разносом под рамку                                       | после рамки: `box-shadow: var(--pixel-frame), var(--pixel-drop)`                                  |
| `--pixel-dither`                                                        | Шахматка 4×4 — фон неактивного элемента                                                         | `background: var(--pixel-dither)` (шорткат с размером)                                            |
| `--pixel-dither-hover`                                                  | Шахматка с прозрачными клетками — hover у ghost и иконочных кнопок                              | `background: var(--pixel-dither-hover)`                                                           |
| `--pixel-scrim`                                                         | Дизеринг-затемнение под модалкой и шторкой                                                      | `background: var(--pixel-scrim)`                                                                  |
| `--pixel-divider`, `--pixel-divider-color`                              | Пунктирный разделитель 4px                                                                      | `border-top: var(--pixel-divider)`                                                                |
| `--pixel-focus-outline`, `--pixel-focus-offset`, `--pixel-focus-color`  | Фокус: пунктир 4px с отступом 6px — чернилами в светлой схеме (≥ 3:1 к бумаге), жёлтый в тёмной | в `:focus-visible`                                                                                |
| `--pixel-cursor-shape`, `--pixel-cursor-width`, `--pixel-cursor-height` | Курсор «▶» как в RPG (`clip-path`, 8×14)                                                        | `::before { background: currentColor; clip-path: var(--pixel-cursor-shape) }`                     |
| `--pixel-selected-row`                                                  | Жёлтая подсветка выбранной строки таблицы                                                       | `background-color`                                                                                |
| `--pixel-primary-light`                                                 | Фон primary на нажатии у lighter / stroke / ghost                                               | палитра `primary` → `--pal-bg-active`                                                             |

Из цветов `--pixel-bevel-light` / `-dark`, `--pixel-dither-a` / `-b`, `--pixel-dither-hover-color`, `--pixel-scrim-a` / `-b`, `--pixel-disabled-frame-color`, `--pixel-shadow-strong-color` собраны составные токены; у каждой схемы они свои.

Составные токены (`--pixel-frame`, `--pixel-dither`, тени и др.) объявлены на корне и на вложенных `[data-theme]`: значение `var()` вычисляется там, где объявлено, и без этого во вложенном тёмном контейнере осталась бы светлая рамка. `--pixel-frame`, `--pixel-frame-sm`, `--pixel-frame-disabled`, `--pixel-drop` и `--pixel-drop-lg` дополнительно пересчитываются на каждом элементе кита (`[class*='vl-']`, вес 0) — поэтому рамку можно перекрасить или утончить переменной прямо на элементе.

### Палитры `[data-color]`

`palettes.css` выставляет те же пять переменных, что corporate (`--pal-base`, `--pal-hover`, `--pal-active`, `--pal-bg-hover`, `--pal-bg-active`), и две свои:

| Переменная      | Назначение                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| `--pal-text`    | Читаемый текст цвета палитры на панели и на `--pal-bg-hover`: текст и рамка `stroke`, текст `lighter` и `ghost` |
| `--pal-on-base` | Текст на заливке `filled`: белый; у `warning` и `away` — чернила; у `neutral` — цвет, обратный заливке          |

Нейтральная заливка — чернила (в тёмной схеме — светлая). 8-битный hover у `filled` — `filter: brightness(1.15)` на той же заливке, нажатие — `--pixel-bevel-pressed` и сдвиг; `--pal-hover` / `--pal-active` оставлены для правил corporate, которые pixel не перекрыл.

## Приёмы

Источник вида — согласованные макеты (обзор, кнопки, поля, выбор, оверлеи, данные, экран приложения, контент, тёмная схема).

- **Ступенчатые углы.** Вместо `border` + `border-radius` — четыре тени без размытия (`--pixel-frame`): углы остаются пустыми.
- **Жёсткие тени.** Сдвиг без размытия, разнос под рамку (`--pixel-drop`).
- **Объём и нажатие.** Свет сверху-слева, тень снизу-справа (`--pixel-bevel`); нажатая кнопка сдвигается на 2px, тень уходит внутрь.
- **Дизеринг.** Шахматка 4×4 вместо полупрозрачности: фон неактивных элементов, hover прозрачных кнопок, затемнение под модалкой.
- **Курсор «▶».** На подсвеченной опции списка, пункте меню, активном пункте навигации.
- **Фокус.** Жёлтый пунктир 4px с отступом — заметен и на светлой, и на тёмной схеме.
- **Без скруглений и без мягких теней.** Все радиусы — `0`, hover-ореол corporate выключен.

## Проверки

- `npm run build` → `postbuild` (`scripts/check-dist-css.mjs`) проверяет и `dist/skins/pixel.css`: нет висячих `@import`, базовое правило ореола не объявляет `--halo-*`.
- В `dist/skins/pixel.css` не должно быть правил corporate (`data-vl-skin~=corporate`) — манифест `pixel` импортирует только манифест `corporate`, без его CSS.
- Storybook: тулбар «Скин» → `pixel`, «Схема» → `light` / `dark`.
