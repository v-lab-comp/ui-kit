# Скин `arena`

Скин `arena` («Арена») — облик V-Lab UI Kit для молодёжных live-аукционов: тёмное премиальное стекло на плавающих слоях, сплошные поверхности под контентом, лаймовый призыв к ставке, шкала редкости CS2 как цвета данных, мягкое свечение за предметами. Компоненты те же — меняется только CSS.

`arena` **расширяет** `corporate`: раскладка (размеры, отступы, флекс, позиционирование, анимации) приходит из `corporate`, а `arena` переопределяет поверх только вид — токены, материалы, тени, шрифты. Общая модель скинов — в [`docs/architecture/theming.md`](../../../docs/architecture/theming.md), устройство базового скина — в [`../corporate/README.md`](../corporate/README.md), второй пример наследника — [`../pixel/README.md`](../pixel/README.md).

Источник вида — согласованные макеты [`docs/design/skin-mockups/arena/`](../../../docs/design/skin-mockups/arena/): обзор (`Main`), кнопки, поля, выбор, оверлеи, данные, экран приложения, контент — тёмная схема «Ночная арена»; доска `Dark.dc.html` — это **светлая** схема «Дневная арена».

## Подключение

```tsx
// Порядок важен: сначала corporate, потом arena
import '@v-lab/ui-kit/skins/corporate.css'
import '@v-lab/ui-kit/skins/arena.css'
// Шрифты — забота приложения (см. ниже)
import '@fontsource/unbounded/500.css'
import '@fontsource/unbounded/700.css'
import '@fontsource/unbounded/800.css'
import '@fontsource/onest/400.css'
import '@fontsource/onest/500.css'
import '@fontsource/onest/600.css'
import '@fontsource/onest/700.css'

import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { arenaSkin } from '@v-lab/ui-kit/skins/arena'
;<ThemeProvider skins={[corporateSkin, arenaSkin]} defaultSkin="arena" colorScheme="dark">
  <App />
</ThemeProvider>
```

- **Манифест** `arenaSkin = defineSkin({ name: 'arena', schemes: ['light', 'dark'], extends: corporateSkin })`. Провайдер ставит на `<html>` цепочку `data-vl-skin="corporate arena"`: селекторы `[data-vl-skin~='corporate']` и `[data-vl-skin~='arena']` срабатывают оба. Без провайдера — `<html data-vl-skin="corporate arena" data-vl-scheme="dark">`, для SSR — `themeHtmlAttributes(arenaSkin, 'dark')`.
- **Фирменная схема — тёмная.** Приложение аукциона выбирает `colorScheme="dark"` явно; светлая «Дневная арена» — те же компоненты с другими токенами.
- **Нужны оба CSS-файла.** `arena.css` содержит только правила arena — стилей corporate в нём нет.
- **`arena.css` — строго после `corporate.css`.** У правил обоих скинов одинаковый нулевой вес префикса `:where([data-vl-skin~='…'])`, у токенов — одинаковые селекторы (0,1,0). При равной специфичности побеждает правило, которое идёт позже, поэтому arena перекрывает corporate только порядком подключения.
- **Ленивая загрузка** — как у pixel: `load: () => import('@v-lab/ui-kit/skins/arena.css')` в своём манифесте (пример `brandSkin` в [`theming.md`](../../../docs/architecture/theming.md)); ленивый `<link>` встаёт в конец `<head>`, то есть после `corporate.css`.
- **Фон страницы** скин не задаёт, как и corporate. Для арены из макета приложение ставит `background: var(--bg-weak-50)` (`#07090f` / `#f3f4f8`) и `color: var(--text-strong-950)` на свой корень. Стекло без тёмного фона под ним не читается как стекло.

### Шрифты

| Шрифт       | Где                                                                                | Токен            | Начертания    |
| ----------- | ---------------------------------------------------------------------------------- | ---------------- | ------------- |
| `Unbounded` | Заголовки, кнопки, бейджи, вкладки, шапки таблиц, подзаголовки-капс, крупные суммы | `--font-display` | 500, 700, 800 |
| `Onest`     | Основной текст, поля ввода, подсказки, пункты меню                                 | `--font-sans`    | 400–700       |

Скин шрифты не подключает: файлов шрифтов в пакете нет. Приложение берёт их из `@fontsource/unbounded` и `@fontsource/onest` (файлы `<вес>.css` уже содержат латиницу и кириллицу) или из Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Onest:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Без шрифтов текст рисуется запасным `system-ui`. Цифры на корне скина табличные (`font-variant-numeric: tabular-nums`): ставки и таймеры не «прыгают» при обновлении.

## Что в папке

| Файл                                  | Роль                                                                                                                                                                 |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.ts`                            | Манифест `arenaSkin` (`extends: corporateSkin`). Импортирует `index.css`, чтобы сборка выпустила `dist/skins/arena.css`. Публикуется как `@v-lab/ui-kit/skins/arena` |
| `index.css`                           | Подключает файлы скина в порядке каскада. Единственный файл с `@import`. Публикуется как `@v-lab/ui-kit/skins/arena.css`                                             |
| `tokens.css`                          | Семантические токены corporate для светлой и тёмной схемы, шрифты, радиусы, затемнение; свои `--font-display` и `--arena-*`; запасной вид стекла                     |
| `shadows.css`                         | Те же `--shadow-*`, что у corporate, но мягкие, глубокие и тёмные; свои `--arena-shadow-surface`, `--arena-shadow-float`, `--arena-glass-shadow`                     |
| `palettes.css`                        | `--pal-*` для 11 палитр `[data-color]` + свои `--pal-text`, `--pal-on-base`, `--pal-border`, `--pal-glow`                                                            |
| `halo.css`                            | Hover-ореол corporate остаётся, но становится свечением: кольцо тинтом + размытие 36px без сдвига                                                                    |
| `components/<name>.css`               | Вид компонента поверх `corporate/components/<name>.css`. Имена файлов — те же, что у corporate                                                                       |
| `components/base-input.variables.css` | Переменные поля ввода `--base-input-*` и свои `--arena-input-*` (файл токенов, явный селектор)                                                                       |
| `components/ui-kit-root.css`          | База под `.vl-ui-kit-root`: табличные цифры и лаймовый `accent-color`                                                                                                |
| `components/typography.css`           | Типографика: заголовки и капс — Unbounded, текст — Onest                                                                                                             |
| `README.md`                           | Этот файл                                                                                                                                                            |

Сборка — как у любого скина: `vite.config.ts` сам находит `src/skins/arena/index.ts` и выпускает `dist/skins/arena.{js,css,d.ts}`. `arena.js` импортирует `./corporate.js` (манифест базового скина, без CSS). Проверка `scripts/check-dist-css.mjs` общая для всех CSS в `dist/`.

## Порядок каскада в `index.css`

1. `tokens.css`, `shadows.css`, `palettes.css`, `components/base-input.variables.css` — переменные; от порядка между файлами не зависят. Внутри `tokens.css` порядок важен: светлая схема → тёмная → составные токены → запасной вид стекла (`@supports not (backdrop-filter…)`, `prefers-reduced-transparency`).
2. `halo.css` — до компонентов, чтобы файл компонента при равном весе мог переопределить `::after` своей кнопки.
3. Файлы компонентов — **в том же порядке, что в `corporate/index.css`** (тот же список, что у pixel). Новый файл компонента добавляется строкой `@import` на то же место, что у corporate.

Все файлы arena идут после всех файлов corporate (отдельный CSS-файл), поэтому любое правило arena перекрывает правило corporate с тем же весом.

## Как писать файл компонента

Правила те же, что у corporate ([`../corporate/README.md`](../corporate/README.md#как-написан-файл-компонента)) и pixel: один блок `:where([data-vl-skin~='arena']) { … }` на файл, нативная вложенность, значения только через токены, без `!important`, без чисел в `z-index` (только `--z-*`).

`@keyframes` — после блока и **со своим именем** `vl-<компонент>-arena-<имя>`. Имена `@keyframes` глобальны: анимация arena с именем из corporate заменила бы её и в corporate.

Что ещё важно для скина-наследника:

- **Переопределяйте только вид.** Раскладку (display, flex, размеры, отступы между частями, позиционирование) corporate уже задал. Менять размер стоит, только когда этого требует приём макета.
- **Тот же селектор — тот же вес.** Чтобы перекрыть правило corporate, напишите такой же внутренний селектор (`.vl-button`, `:where(.vl-button)[data-variant='filled']`, `.vl-button:hover:not(:disabled)`).
- **Текст цвета палитры — только `--pal-text`**, текст на заливке — `--pal-on-base`. `--pal-base`, `--pal-hover`, `--pal-active` — заливки: лайм, розовый, янтарь как цвет текста на светлой схеме не читаются, а белый текст на лайме — 1,3:1.
- **Фокус** — только `:focus-visible`: `outline: var(--arena-focus-outline); outline-offset: var(--arena-focus-offset);` и **последним слоем** в `box-shadow` — `var(--arena-focus-ring)` (в светлой схеме он заливает зазор чернилами: контур + лайм, как в макете; в тёмной прозрачный). Если своих теней у элемента нет — `box-shadow: var(--arena-focus-ring)`.
- **Нажатие** заливных кнопок: `transform: var(--arena-press-transform); filter: var(--arena-press-filter); box-shadow: var(--arena-pressed-shadow);`, наведение — `filter: var(--arena-hover-filter)` + ореол (`--halo-glow-color: var(--pal-glow)`).
- **Тайминги, на которые завязан JS, не менять.** Длительность анимации выхода тоста должна совпадать с `useToastQueue.ts` (см. комментарий в `corporate/components/toast.css`).
- **Атрибуты для стилей** берутся из контракта (`src/theme/contracts/<name>.ts`) и из CSS corporate. Если для приёма не хватает хука, компонент не правят — задача записывается отдельно.

### Стекло — только на плавающих слоях

Стекло (`--arena-glass-*`) получают **только плавающие слои**: модалка (`modal`, `confirm-modal`), шторка (`drawer`), поповер, тост, тултип, выпадающие панели (список `select-input`, календарь `date-input`, меню `comments-section`), переключатель приложений. Контент — карточки, таблицы, панели вкладок, поля, аккордеон — лежит на **сплошной** поверхности `--bg-white-0` с волоском `--stroke-soft-200` и тенью `--arena-shadow-surface`.

В макете «Экран приложения» (`Layout.dc.html`) боковая панель и шапка тоже стеклянные (`regular`) — они там плавающие панели с отступом от края окна. Это допустимое исключение для оболочки (`sidebar`, `page-header`), если они парят над контентом; прибитые к краю — сплошные.

| Материал  | Токены                                                     | Где                                                                       |
| --------- | ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| `thin`    | `--arena-glass-thin-bg`, `--arena-glass-thin-filter`       | Мелочь поверх затемнённого медиа (таймер на карточке лота), крупный текст |
| `regular` | `--arena-glass-regular-bg`, `--arena-glass-regular-filter` | Тост, поповер, выпадающий список, плавающие сайдбар и шапка               |
| `thick`   | `--arena-glass-thick-bg`, `--arena-glass-thick-filter`     | Модалка, шторка, меню, тултип, переключатель приложений — много текста    |

Рецепт стеклянной поверхности (фрагмент файла компонента):

```css
:where([data-vl-skin~='arena']) {
  .vl-popover {
    position: relative; /* если corporate не задал позиционирование */
    isolation: isolate;
    background: var(--arena-glass-regular-bg);
    -webkit-backdrop-filter: var(--arena-glass-regular-filter);
    backdrop-filter: var(--arena-glass-regular-filter);
    border: 0;
    border-radius: var(--radius-16);
    box-shadow: var(--arena-glass-shadow);
  }

  /* Блик по кромке: градиентная рамка 1px, середина вырезана маской */
  .vl-popover::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: var(--z-raised);
    border-radius: inherit;
    padding: var(--arena-rim-width);
    background: var(--arena-rim);
    -webkit-mask: var(--arena-rim-mask);
    -webkit-mask-composite: xor;
    mask: var(--arena-rim-mask);
    mask-composite: exclude;
    pointer-events: none;
  }
}
```

- Запасной вид уже в токенах: без `backdrop-filter` (`@supports not`) и при `prefers-reduced-transparency: reduce` материалы становятся сплошными (`--arena-glass-solid-bg`), размытие — `none`. Файлу компонента ничего дописывать не нужно.
- `::before` занят бликом — если у элемента corporate уже использует `::before`/`::after`, проверьте, что не перетираете его (у кнопок `::after` — ореол).
- Поле внутри стекла (поиск в списке) — фон `--arena-glass-well`.
- Затемнение под модалкой: `background: var(--overlay-bg); backdrop-filter: var(--arena-scrim-filter);`.

## Токены

### Что переопределено

| Группа                                                            | Светлая «Дневная арена»                                             | Тёмная «Ночная арена»                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `--font-sans`                                                     | `'Onest', system-ui, -apple-system, sans-serif`                     | —                                                                          |
| `--radius-*`                                                      | мягче: 2→4, 4→6, 6→8, 8→12, 10→14, 12→14, 16→18, 20…28 — как есть   | —                                                                          |
| `--bg-weak-50` / `--bg-white-0`                                   | фон `#f3f4f8` / панель `#ffffff`                                    | фон `#07090f` / поверхность `#11151f`                                      |
| `--bg-soft-200` / `--bg-sub-300`                                  | `#e7e9ef` / `#dde1ea`                                               | `#1a2030` / `#232a3a`                                                      |
| `--text-strong-950` / `--text-sub-600` / `--text-soft-400`        | `#0b1220` / `#3e4a5e` / `#5d6778`                                   | `#f2f5fb` / `#a9b3c4` / `#8b95a8`                                          |
| `--stroke-sub-300` / `--stroke-soft-200`                          | `rgba(11,18,32,.48)` / `rgba(11,18,32,.12)`                         | `rgba(242,245,251,.42)` / `rgba(255,255,255,.07)`                          |
| `--primary-base` / `--primary-dark` / `--primary-darker`          | лайм `#c6f432` / олива `#3d5a00` / `#2c4200`                        | лайм `#c6f432` / `#c6f432` / `#e6ff9a`                                     |
| `--primary-alpha-10` / `-16`                                      | лайм 22% / 42%                                                      | лайм 10% / 16%                                                             |
| Состояния `--{warning,error,success,…}-{dark,base,light,lighter}` | base — заливка, dark — тёмный текст, light/lighter — сплошные тинты | base — заливка, dark — светлый текст, light/lighter — полупрозрачные тинты |
| `--static-black` / `--static-white`                               | `#0b1220` / `#fff`                                                  | `#07090f` / `#fff`                                                         |
| `--shadow-*`                                                      | лёгкие чернильные                                                   | глубокие чёрные (до 50%)                                                   |
| `--overlay-overlay-gray`, `--overlay-bg`                          | `rgba(11,18,32,.32)`                                                | `rgba(0,0,0,.5)`                                                           |
| `--halo-neutral`                                                  | `rgba(11,18,32,.22)`                                                | `rgba(255,255,255,.18)`                                                    |

Цвета состояний: warning — янтарь `#f5a524` (таймер), error — розовый `#ff4d8d` («ставку перебили»), success — `#9bd41c`, information и feature — синий `#3a63f0` (второстепенный акцент), away — золото `#e4ae39`, highlighted — фуксия `#d32ce6`, verified — голубой `#36c2f2`, stable — бирюза `#22c3a6`. Текст на заливках — чернила, кроме синих (белый).

Не переопределены и приходят из corporate: `--z-*`, `--motion-*`, примитивы (`--blue-500` и др.).

### Свои токены скина

| Токен                                                                                                                        | Что это                                                                                                                      | Как применять                                                                |
| ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--font-display`                                                                                                             | `'Unbounded', 'Onest', system-ui, sans-serif`                                                                                | `font-family` у кнопок, бейджей, заголовков, вкладок, шапок таблиц           |
| `--arena-glass-{thin,regular,thick}-bg`                                                                                      | Фон материала стекла                                                                                                         | `background` плавающего слоя                                                 |
| `--arena-glass-{thin,regular,thick}-filter`                                                                                  | `blur(…) saturate(…)`                                                                                                        | `backdrop-filter` и `-webkit-backdrop-filter`                                |
| `--arena-glass-solid-bg`                                                                                                     | Сплошной цвет стекла — запасной вид (подставляется сам)                                                                      | обычно не нужен напрямую                                                     |
| `--arena-glass-highlight`                                                                                                    | Верхний внутренний блик стекла                                                                                               | входит в `--arena-glass-shadow`                                              |
| `--arena-glass-shadow`                                                                                                       | Блик + плавающая тень                                                                                                        | `box-shadow` стекла                                                          |
| `--arena-glass-well`                                                                                                         | Поле внутри стекла                                                                                                           | `background` поиска в выпадающем списке                                      |
| `--arena-rim`, `--arena-rim-width`, `--arena-rim-mask`                                                                       | Блик по кромке: градиент, толщина, маска                                                                                     | `::before` по рецепту выше                                                   |
| `--arena-shadow-surface` / `--arena-shadow-float`                                                                            | Тень сплошной поверхности / плавающего слоя                                                                                  | `box-shadow`                                                                 |
| `--arena-highlight`, `--arena-highlight-soft`, `--arena-edge-bottom`                                                         | Блик сверху заливной кнопки (лайм / синий), нижняя кромка                                                                    | `box-shadow` filled-кнопки                                                   |
| `--arena-glow-primary`, `--arena-glow-primary-hover`                                                                         | Лаймовое свечение CTA («Ставка») в покое и при наведении                                                                     | после блика: `box-shadow: var(--arena-highlight), var(--arena-glow-primary)` |
| `--arena-glow-strength`                                                                                                      | Доля цвета в `--pal-glow` (40% / 28%)                                                                                        | через `--pal-glow`                                                           |
| `--arena-pressed-shadow`, `--arena-press-transform`, `--arena-press-filter`, `--arena-hover-filter`                          | Нажатие (тень внутрь, `scale(.98)`, `brightness(.9)`), наведение (`brightness(1.06)`)                                        | у filled-кнопок                                                              |
| `--arena-focus-outline`, `--arena-focus-offset`, `--arena-focus-ring`                                                        | Фокус: лайм 3px, отступ 3px (светлая — 2px + чернильный контур в зазоре)                                                     | в `:focus-visible`, см. «Как писать файл компонента»                         |
| `--arena-focus-color`, `--arena-focus-contour`, `--arena-focus-width`                                                        | Части фокуса                                                                                                                 | переопределяются на элементе, если нужно                                     |
| `--arena-field-bg`, `--arena-field-border`, `--arena-field-border-hover`, `--arena-field-inset`, `--arena-field-bg-disabled` | «Утопленное» поле: фон, кольцо, кольцо при наведении, внутренняя тень, неактивное                                            | поля, триггеры, редактор                                                     |
| `--arena-input-{bg,accent,error,error-glow,done,border-hover}`                                                               | То же для полей ввода (`base-input.variables.css`)                                                                           | `input-field.css`, `base-input.css`, `select-input.css`                      |
| `--arena-raised-bg`                                                                                                          | Приподнятая сплошная поверхность внутри панели (`#161b27`)                                                                   | триггер селекта, карточка выбора, лот                                        |
| `--arena-control-bg`, `--arena-control-bg-hover`                                                                             | Прозрачный «контрол»: мягкая нейтральная кнопка, трек сегмента, hover у ghost/иконок                                         | `background`                                                                 |
| `--arena-accent-text`                                                                                                        | Текст на лаймовом тинте (`#e6ff9a` / `#2c4200`)                                                                              | подсвеченная опция, активный пункт навигации                                 |
| `--arena-rarity-{common,rare,epic,legendary,collectible}`                                                                    | Шкала редкости CS2: Обычный `#4b69ff`, Редкий `#8847ff`, Эпический `#d32ce6`, Легендарный `#eb4b4b`, Коллекционный `#e4ae39` | полоса, свечение, заливка                                                    |
| `--arena-rarity-*-on`                                                                                                        | Текст на заливке редкости (тёмный; у Редкого — белый)                                                                        | `color` на `--arena-rarity-*`                                                |
| `--arena-rarity-*-tint`, `--arena-rarity-*-text`                                                                             | Тинт-пилюля и текст на ней                                                                                                   | Badge, Tag                                                                   |
| `--arena-rarity-*-glow`                                                                                                      | Цвет свечения за предметом                                                                                                   | `radial-gradient(closest-side, var(--arena-rarity-epic-glow), transparent)`  |
| `--arena-scrim-filter`                                                                                                       | Размытие под затемнением (`blur(8px)`, без стекла — `none`)                                                                  | `backdrop-filter` затемнения модалки / шторки                                |

Простые значения объявлены в блоках схем; составные (`--overlay-bg`, `--arena-focus-outline`, `--arena-focus-ring`, `--arena-rim-mask`, `--arena-glass-shadow`, цветные тени, кольца в `--shadow-*`, `--base-input-*`) — на корне и на вложенных `[data-theme]`: значение `var()` вычисляется там, где объявлено, и без этого во вложенном тёмном контейнере остались бы светлые значения.

### Палитры `[data-color]`

`palettes.css` выставляет те же пять переменных, что corporate, и четыре свои:

| Переменная                           | Назначение                                                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `--pal-base`                         | Заливка `filled`                                                                                               |
| `--pal-hover` / `--pal-active`       | Заливка при наведении / нажатии (`color-mix`): под тёмным текстом светлеет, под белым — темнеет. Не для текста |
| `--pal-bg-hover` / `--pal-bg-active` | Тинт: фон `lighter`, hover / active у `stroke` и `ghost`                                                       |
| `--pal-text`                         | Читаемый текст цвета палитры на поверхности и на тинте: `stroke`, `lighter`, `ghost`, тинт-бейдж, тег          |
| `--pal-on-base`                      | Текст на заливке: тёмный; у `information` и `feature` (синие) — белый; у `neutral` — обратный заливке          |
| `--pal-border`                       | Рамка `stroke` (`--pal-text` на 70%, ≥ 3:1)                                                                    |
| `--pal-glow`                         | Цвет свечения (`--pal-base` на 40% / 28%): `box-shadow: 0 0 14px var(--pal-glow)`                              |

Нейтральная заливка — светлая `#f2f5fb` в тёмной схеме и чернильная в светлой.

### Контраст

Посчитан по WCAG 2 (относительная яркость; полупрозрачные цвета смешаны с фоном под ними). Норма: текст ≥ 4,5:1, границы элементов управления и фокус ≥ 3:1. Все пары в норме. Отдельные оговорки:

- **Стекло.** Контраст текста на стекле зависит от того, что под ним. Над фоном страницы и сплошными поверхностями — с запасом; худший случай (сплошной яркий цвет за стеклом, без размытия) приведён в таблице. `regular` поднят с 55% макета до 60%, чтобы основной текст держал 4,5:1 даже над лаймом. Вторичный текст (`--text-sub-600`) и длинный текст — на `thick`; `thin` — только поверх затемнённого медиа и с крупным Unbounded 700.
- **Кольцо поля** (`--arena-field-border`, 10% / 16%) и волоски (`--stroke-soft-200`) — декоративные. Поле опознаётся фоном, внутренней тенью, подписью и плейсхолдером; рамки элементов, которые без неё не видны (чекбокс, stroke-кнопка), — `--stroke-sub-300` и `--pal-border`, ≥ 3:1.
- **Фокус в светлой схеме.** Лайм к белому — 1,3:1, поэтому кольцо — чернильный контур (18,7:1 к панели) + лайм (`--arena-focus-ring`).
- **Белый на лайме — 1,3:1.** На лайме текст всегда тёмный (`--pal-on-base`, `--static-black`).
- `--text-disabled-300` — только для неактивных элементов (WCAG 1.4.3 их не нормирует); текст неактивных кнопок и полей в макете читаемый — `--text-soft-400`.

Таблицу пересчитывает скрипт на `node` (формула WCAG 2.x: `L = 0,2126 R + 0,7152 G + 0,0722 B` по линеаризованным каналам, `(L1 + 0,05) / (L2 + 0,05)`).

| Схема   | Группа                        | Пара                                                          | Контраст | Норма |
| ------- | ----------------------------- | ------------------------------------------------------------- | -------- | ----- |
| Тёмная  | Текст                         | text-strong-950 / фон                                         | 18,23:1  | ≥ 4,5 |
| Тёмная  | Текст                         | text-strong-950 / поверхность                                 | 16,71:1  | ≥ 4,5 |
| Тёмная  | Текст                         | text-sub-600 / фон                                            | 9,41:1   | ≥ 4,5 |
| Тёмная  | Текст                         | text-sub-600 / поверхность                                    | 8,63:1   | ≥ 4,5 |
| Тёмная  | Текст                         | text-sub-600 / raised #161b27                                 | 8,14:1   | ≥ 4,5 |
| Тёмная  | Текст                         | text-soft-400 / поле #0b0e16                                  | 6,40:1   | ≥ 4,5 |
| Тёмная  | Текст                         | text-soft-400 / поверхность                                   | 6,05:1   | ≥ 4,5 |
| Тёмная  | Текст                         | text-soft-400 / неактивное #161b26                            | 5,71:1   | ≥ 4,5 |
| Тёмная  | Стекло                        | text-strong-950 / glass regular (над фоном)                   | 16,23:1  | ≥ 4,5 |
| Тёмная  | Стекло                        | text-sub-600 / glass regular (над фоном)                      | 8,38:1   | ≥ 4,5 |
| Тёмная  | Стекло                        | text-sub-600 / glass thick (над лаймом — худший случай)       | 4,61:1   | ≥ 4,5 |
| Тёмная  | Стекло                        | text-strong-950 / glass regular (над лаймом — худший случай)  | 4,64:1   | ≥ 4,5 |
| Тёмная  | Стекло                        | text-strong-950 / запасной #181c27                            | 15,58:1  | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / primary #c6f432                                | 15,53:1  | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / pal-hover primary                              | 15,88:1  | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / pal-active primary                             | 12,02:1  | ≥ 4,5 |
| Тёмная  | Заливки                       | static-white / feature, information #3a63f0                   | 4,97:1   | ≥ 4,5 |
| Тёмная  | Заливки                       | static-white / pal-hover #3a63f0                              | 5,61:1   | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / error #ff4d8d                                  | 6,35:1   | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / pal-active error                               | 5,07:1   | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / warning #f5a524                                | 9,75:1   | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / success #9bd41c                                | 11,21:1  | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / away #e4ae39                                   | 9,87:1   | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / highlighted #d32ce6                            | 5,00:1   | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / verified #36c2f2                               | 9,63:1   | ≥ 4,5 |
| Тёмная  | Заливки                       | static-black / stable #22c3a6                                 | 8,93:1   | ≥ 4,5 |
| Тёмная  | Заливки                       | text-white-0 / neutral #f2f5fb                                | 18,23:1  | ≥ 4,5 |
| Тёмная  | Заливки                       | text-soft-400 / disabled-кнопка #161b26                       | 5,71:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | primary / lighter на поверхности                              | 11,35:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | primary (darker на тинте) / lighter на поверхности            | 11,14:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | error / lighter на поверхности                                | 5,79:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | warning / lighter на поверхности                              | 8,64:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | success / lighter на поверхности                              | 9,03:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | information / lighter на поверхности                          | 7,83:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | feature / lighter на поверхности                              | 6,73:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | away / lighter на поверхности                                 | 8,83:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | highlighted / lighter на поверхности                          | 7,30:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | verified / lighter на поверхности                             | 9,29:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | stable / lighter на поверхности                               | 9,32:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | faded / lighter на поверхности                                | 9,34:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | primary / фон страницы                                        | 15,53:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | primary (darker на тинте) / фон страницы                      | 18,14:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | error / фон страницы                                          | 7,41:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | warning / фон страницы                                        | 12,04:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | success / фон страницы                                        | 12,85:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | information / фон страницы                                    | 10,13:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | feature / фон страницы                                        | 8,72:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | away / фон страницы                                           | 12,94:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | highlighted / фон страницы                                    | 9,22:1   | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | verified / фон страницы                                       | 13,03:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | stable / фон страницы                                         | 12,86:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | faded / фон страницы                                          | 12,18:1  | ≥ 4,5 |
| Тёмная  | Текст палитры (--pal-text)    | arena-accent-text / primary-alpha-16 на стекле thick          | 9,99:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | common: on / base                                             | 4,52:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | common: text / tint                                           | 6,94:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | rare: on / base                                               | 4,78:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | rare: text / tint                                             | 6,51:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | epic: on / base                                               | 5,00:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | epic: text / tint                                             | 6,88:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | legendary: on / base                                          | 5,35:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | legendary: text / tint                                        | 6,73:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | collectible: on / base                                        | 9,87:1   | ≥ 4,5 |
| Тёмная  | Редкость                      | collectible: text / tint                                      | 7,84:1   | ≥ 4,5 |
| Тёмная  | Границы (≥ 3:1)               | stroke-sub-300 / поверхность                                  | 3,85:1   | ≥ 3   |
| Тёмная  | Границы (≥ 3:1)               | stroke-sub-300 / фон                                          | 3,79:1   | ≥ 3   |
| Тёмная  | Границы (≥ 3:1)               | stroke-sub-300 / raised                                       | 3,81:1   | ≥ 3   |
| Тёмная  | Границы (≥ 3:1)               | focus #c6f432 / фон                                           | 15,53:1  | ≥ 3   |
| Тёмная  | Границы (≥ 3:1)               | focus #c6f432 / поверхность                                   | 14,24:1  | ≥ 3   |
| Тёмная  | Границы (≥ 3:1)               | pal-border primary (70%) / поверхность                        | 7,40:1   | ≥ 3   |
| Тёмная  | Границы (≥ 3:1)               | pal-border error (70% #ff6b9a) / поверхность                  | 3,88:1   | ≥ 3   |
| Тёмная  | Границы (≥ 3:1)               | pal-border feature (70% #8ea8ff) / поверхность                | 4,52:1   | ≥ 3   |
| Тёмная  | Границы (≥ 3:1)               | рамка ошибки поля #ff4d8d / поле                              | 6,15:1   | ≥ 3   |
| Тёмная  | Границы (≥ 3:1)               | рамка фокуса поля #c6f432 / поле                              | 15,05:1  | ≥ 3   |
| Тёмная  | Декоративные (не нормируются) | arena-field-border 10% / поверхность                          | 1,31:1   | —     |
| Тёмная  | Декоративные (не нормируются) | stroke-soft-200 7% / поверхность                              | 1,20:1   | —     |
| Светлая | Текст                         | text-strong-950 / фон                                         | 17,04:1  | ≥ 4,5 |
| Светлая | Текст                         | text-strong-950 / панель                                      | 18,72:1  | ≥ 4,5 |
| Светлая | Текст                         | text-sub-600 / фон                                            | 8,14:1   | ≥ 4,5 |
| Светлая | Текст                         | text-sub-600 / панель                                         | 8,95:1   | ≥ 4,5 |
| Светлая | Текст                         | text-soft-400 / панель                                        | 5,71:1   | ≥ 4,5 |
| Светлая | Текст                         | text-soft-400 / фон                                           | 5,20:1   | ≥ 4,5 |
| Светлая | Текст                         | text-soft-400 / неактивное #e7e9ef                            | 4,71:1   | ≥ 4,5 |
| Светлая | Стекло                        | text-strong-950 / glass regular (над фуксией — худший случай) | 10,46:1  | ≥ 4,5 |
| Светлая | Стекло                        | text-sub-600 / glass thick (над фуксией — худший случай)      | 6,35:1   | ≥ 4,5 |
| Светлая | Заливки                       | static-black / primary #c6f432                                | 14,61:1  | ≥ 4,5 |
| Светлая | Заливки                       | static-black / pal-active primary                             | 11,42:1  | ≥ 4,5 |
| Светлая | Заливки                       | static-white / #3a63f0                                        | 4,97:1   | ≥ 4,5 |
| Светлая | Заливки                       | static-black / error #ff4d8d                                  | 5,97:1   | ≥ 4,5 |
| Светлая | Заливки                       | static-black / pal-active error                               | 4,83:1   | ≥ 4,5 |
| Светлая | Заливки                       | static-black / warning #f5a524                                | 9,17:1   | ≥ 4,5 |
| Светлая | Заливки                       | static-black / success #9bd41c                                | 10,55:1  | ≥ 4,5 |
| Светлая | Заливки                       | static-black / away #e4ae39                                   | 9,28:1   | ≥ 4,5 |
| Светлая | Заливки                       | static-black / highlighted #d32ce6                            | 4,70:1   | ≥ 4,5 |
| Светлая | Заливки                       | static-black / verified #36c2f2                               | 9,05:1   | ≥ 4,5 |
| Светлая | Заливки                       | static-black / stable #22c3a6                                 | 8,40:1   | ≥ 4,5 |
| Светлая | Заливки                       | text-white-0 / neutral #0b1220                                | 18,72:1  | ≥ 4,5 |
| Светлая | Заливки                       | text-soft-400 / disabled-кнопка #e7e9ef                       | 4,71:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | primary / lighter                                             | 7,41:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | primary (darker на alpha-16) / lighter                        | 9,91:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | error / lighter                                               | 4,92:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | warning / lighter                                             | 5,25:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | success / lighter                                             | 7,02:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | information / lighter                                         | 6,25:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | feature / lighter                                             | 6,18:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | away / lighter                                                | 6,05:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | highlighted / lighter                                         | 5,57:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | verified / lighter                                            | 5,39:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | stable / lighter                                              | 5,43:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | faded / lighter                                               | 7,93:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | primary / фон страницы                                        | 7,18:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | primary (darker на alpha-16) / фон страницы                   | 10,13:1  | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | error / фон страницы                                          | 5,34:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | warning / фон страницы                                        | 5,39:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | success / фон страницы                                        | 7,18:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | information / фон страницы                                    | 6,72:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | feature / фон страницы                                        | 6,72:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | away / фон страницы                                           | 6,23:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | highlighted / фон страницы                                    | 6,19:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | verified / фон страницы                                       | 5,53:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | stable / фон страницы                                         | 5,62:1   | ≥ 4,5 |
| Светлая | Текст палитры (--pal-text)    | faded / фон страницы                                          | 8,14:1   | ≥ 4,5 |
| Светлая | Редкость                      | common: on / base                                             | 4,52:1   | ≥ 4,5 |
| Светлая | Редкость                      | common: text / tint                                           | 5,58:1   | ≥ 4,5 |
| Светлая | Редкость                      | rare: on / base                                               | 4,78:1   | ≥ 4,5 |
| Светлая | Редкость                      | rare: text / tint                                             | 5,78:1   | ≥ 4,5 |
| Светлая | Редкость                      | epic: on / base                                               | 4,70:1   | ≥ 4,5 |
| Светлая | Редкость                      | epic: text / tint                                             | 5,57:1   | ≥ 4,5 |
| Светлая | Редкость                      | legendary: on / base                                          | 5,03:1   | ≥ 4,5 |
| Светлая | Редкость                      | legendary: text / tint                                        | 5,49:1   | ≥ 4,5 |
| Светлая | Редкость                      | collectible: on / base                                        | 9,28:1   | ≥ 4,5 |
| Светлая | Редкость                      | collectible: text / tint                                      | 6,05:1   | ≥ 4,5 |
| Светлая | Границы (≥ 3:1)               | stroke-sub-300 / панель                                       | 3,32:1   | ≥ 3   |
| Светлая | Границы (≥ 3:1)               | stroke-sub-300 / фон                                          | 3,25:1   | ≥ 3   |
| Светлая | Границы (≥ 3:1)               | контур фокуса #0b1220 / панель                                | 18,72:1  | ≥ 3   |
| Светлая | Границы (≥ 3:1)               | лайм фокуса / контур #0b1220                                  | 14,61:1  | ≥ 3   |
| Светлая | Границы (≥ 3:1)               | pal-border primary (70% #3d5a00) / панель                     | 3,74:1   | ≥ 3   |
| Светлая | Границы (≥ 3:1)               | pal-border error (70% #c2185b) / панель                       | 3,64:1   | ≥ 3   |
| Светлая | Границы (≥ 3:1)               | pal-border feature (70% #2448c9) / панель                     | 3,75:1   | ≥ 3   |
| Светлая | Границы (≥ 3:1)               | рамка ошибки поля #c2185b / панель                            | 5,87:1   | ≥ 3   |
| Светлая | Границы (≥ 3:1)               | рамка фокуса поля #3d5a00 / панель                            | 7,89:1   | ≥ 3   |
| Светлая | Декоративные (не нормируются) | arena-field-border 16% / панель                               | 1,41:1   | —     |
| Светлая | Декоративные (не нормируются) | лайм фокуса / панель (без контура)                            | 1,28:1   | —     |

## Приёмы

- **Стекло с бликом по кромке** — только плавающие слои; `backdrop-filter: blur(28px) saturate(160%)`, градиентная рамка 1px через маску.
- **Сплошная поверхность** — контент: `#11151f`, волосок 7%, мягкая глубокая тень.
- **Лаймовый призыв** — CTA «Ставка»: лайм с тёмным текстом, блик сверху, свечение; при наведении свечение ярче (ореол), при нажатии — сжатие 2%.
- **Шкала редкости** — цвета данных: полоса снизу карточки, свечение за предметом, тинт-пилюля.
- **Пилюли и концентрические радиусы** — кнопки 999px, карточки 20px, меню 18px, поля 14px, опции 12px.
- **Фокус** — лаймовое кольцо 3px с отступом 3px (в светлой схеме — с чернильным контуром).

## Решения

1. **`arena` расширяет `corporate`.** Раскладка, поведение и анимации — общие; arena переопределяет токены и вид. Так скин не дублирует 70 файлов раскладки, а исправления corporate достаются ему бесплатно. Цена — строгий порядок CSS (`arena.css` после `corporate.css`) и необходимость повторять селектор corporate с тем же весом.
2. **Тёмная схема — фирменная.** Макеты сделаны для «Ночной арены»; приложение аукциона выбирает `colorScheme="dark"` само. Светлая «Дневная арена» поддерживается теми же компонентами, но её значения подобраны по одной доске (`Dark.dc.html`).
3. **Стекло — только на плавающих слоях**, запасной вид — на уровне токенов. Стекло над контентом съедает контраст и производительность (`backdrop-filter` дорог на больших площадях). Без поддержки `backdrop-filter` и при `prefers-reduced-transparency: reduce` материалы сами становятся сплошными — файлы компонентов фолбэков не пишут.
4. **Ореол corporate сохранён и перекрашен** (в отличие от pixel): hover-свечение кнопки в макете и есть ореол.
5. **Шрифты подключает приложение.** В пакете нет файлов шрифтов: приложение берёт `@fontsource/unbounded` и `@fontsource/onest` (или Google Fonts) и само решает про загрузку и подмножества.

## Проверки

- `npm run build` → `postbuild` (`scripts/check-dist-css.mjs`) проверяет и `dist/skins/arena.css`: нет висячих `@import`, базовое правило ореола не объявляет `--halo-*`.
- В `dist/skins/arena.css` не должно быть правил corporate (`data-vl-skin~=corporate`) — манифест `arena` импортирует только манифест `corporate`, без его CSS.
- Storybook: тулбар «Скин» → `arena`, «Схема» → `dark` (фирменная) / `light`.
