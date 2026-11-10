# Скин `corporate`

Скин `corporate` — внешний вид V-Lab UI Kit по умолчанию (прежний облик кита): токены, палитры и стили всех компонентов. Пока это единственный скин кита.

Компоненты кита стилей не содержат. Каждый рендерит стабильный класс `vl-<name>`, части `vl-<name>__<part>` и data-атрибуты из своего контракта (`src/theme/contracts/<name>.ts`). Скин стилизует только их — ничего другого о компонентах ему знать не нужно.

Общая модель (скины, цветовые схемы, `ThemeProvider`, контракты) и правила написания скина описаны в [`docs/architecture/theming.md`](../../../docs/architecture/theming.md). Здесь — как устроен именно этот скин и как его править.

## Подключение

```tsx
import '@v-lab/ui-kit/skins/corporate.css' // первым, до стилей приложения
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
;<ThemeProvider skins={[corporateSkin]} defaultColorScheme="system">
  <App />
</ThemeProvider>
```

CSS и манифест подключаются по отдельности: `@v-lab/ui-kit/skins/corporate.css` — стили скина, `@v-lab/ui-kit/skins/corporate` — манифест `corporateSkin` для `ThemeProvider`. Манифест CSS за собой не тянет.

Без провайдера скин включается атрибутами на `<html>`: `<html data-vl-skin="corporate" data-vl-scheme="light">`, тёмная схема — `data-vl-scheme="dark"`. Без `data-vl-skin` компоненты остаются без оформления. Для SSR атрибуты рендерятся на серверном `<html>` хелпером `themeHtmlAttributes(corporateSkin, 'light')` из `@v-lab/ui-kit` — подробнее в [`theming.md`](../../../docs/architecture/theming.md).

## Что в папке

| Файл                                  | Роль                                                                                                                                                                                                                        |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.ts`                            | Манифест: `corporateSkin = defineSkin({ name: 'corporate', schemes: ['light', 'dark'] })`. Импортирует `index.css`, чтобы сборка выпустила CSS скина. Публикуется как `@v-lab/ui-kit/skins/corporate`                       |
| `index.css`                           | Подключает все файлы скина в порядке каскада. Единственный файл с `@import`. Публикуется как `@v-lab/ui-kit/skins/corporate.css`                                                                                            |
| `primitives.css`                      | Сырая шкала цветов (`--neutral-*`, `--blue-*`, `--blue-alpha-*`, …). Источник для `src/colors/primitives.ts`                                                                                                                |
| `tokens.css`                          | Семантические токены: шрифт, радиусы, `--bg-*`, `--text-*`, `--stroke-*`, `--icon-*`, `--primary-*`, цвета состояний (`--error-*`, `--success-*`, …), шкала `--z-*`, `--motion-*`, `--halo-neutral`. Светлая и тёмная схема |
| `shadows.css`                         | Семантические тени: `--shadow-regular-*`, `--shadow-colored-*`, `--shadow-card-*` и др.                                                                                                                                     |
| `palettes.css`                        | 11 палитр по `[data-color='<name>']` → переменные `--pal-*`                                                                                                                                                                 |
| `halo.css`                            | Hover-ореол интерактивных кнопок: кольцо на `::after`, список элементов в `:is(...)`, параметры — переменные `--halo-*`                                                                                                     |
| `components/<name>.css`               | Стили компонента. Как правило, один файл на контракт, имя файла = `name` контракта                                                                                                                                          |
| `components/base-input.variables.css` | Высоты, отступы, рамка и радиусы поля (`--base-input-*`) — общие для `BaseInput` и обёрток (`TextInput` и др.)                                                                                                              |
| `components/ui-kit-root.css`          | Базовый сброс (box-sizing, отступы, типографика, медиа, формы) под `.vl-ui-kit-root` — `UiKitRoot` и панель `Modal`                                                                                                         |
| `components/page-header-demo.css`     | Демо-содержимое хедера `PageHeaderDemoContent` для сторис и сайта документации                                                                                                                                              |
| `README.md`                           | Этот файл                                                                                                                                                                                                                   |

`primitives.ts` генерируется командой `npm run gen:primitives` и руками не правится — подробнее в [`docs/architecture/styling.md`](../../../docs/architecture/styling.md).

## Сборка

`vite.config.ts` сам находит каждую папку `src/skins/<name>/` с `index.ts` и собирает её как отдельный скин. Для `corporate` `npm run build` выпускает:

| Файл                       | Что внутри                                                                         | Импорт в приложении                 |
| -------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------- |
| `dist/skins/corporate.js`  | Манифест `corporateSkin` (+ `corporate.d.ts`)                                      | `@v-lab/ui-kit/skins/corporate`     |
| `dist/skins/corporate.css` | Весь CSS этого скина — и только его (`build.cssCodeSplit`), вложенность развёрнута | `@v-lab/ui-kit/skins/corporate.css` |

В `package.json` за это отвечают экспорты `"./skins/*.css"` (CSS) и `"./skins/*"` (манифест и типы). Общего `style.css` у пакета нет: в бандл приложения попадают только те скины, которые оно импортирует. Второй скин можно загружать лениво через `load` в его манифесте — см. [`theming.md`](../../../docs/architecture/theming.md).

## Порядок каскада в `index.css`

`index.css` подключает файлы **в том же порядке, в каком CSS шёл в прежнем бандле**. Обёртка `:where([data-vl-skin~='corporate'])` и якорь `:where(.vl-<name>)` веса не добавляют, поэтому правила с равной специфичностью разрешаются так же, как раньше: при переносе в скин внешний вид не изменился (сверено скриншотами и вычисленными стилями — см. [`theming.md`](../../../docs/architecture/theming.md)).

Что из этого следует:

- **Порядок не переставлять.** При равной специфичности побеждает правило из файла, подключённого позже.
- **`halo.css` идёт почти в самом конце** — после файлов компонентов. Поэтому базовые правила ореола не объявляют `--halo-*`: при равной специфичности они затёрли бы переменные вариантов (`filled`, `lighter`). Дефолты живут только в фолбэках `var(--halo-ring-size, 1px)` внутри `::after`. Подробности — в комментарии в начале `halo.css`.
- **`tokens.css`, `primitives.css`, `shadows.css` от порядка не зависят:** они объявляют переменные (`tokens.css` — ещё и `font-family`) на корне скина и на вложенных `[data-theme]`, а компоненты эти переменные только читают.
- **`@import` — только в `index.css`.** Файлы скина не импортируют друг друга: весь порядок задаёт `index.css`. Висячий относительный `@import` в собранном CSS ломает приложение (так сломалась 0.13.0) — его ловит `scripts/check-dist-css.mjs` в `postbuild`.
- **Новый файл компонента** добавляется строкой `@import './components/<name>.css';` в `index.css`. Если его правила конкурируют с другим файлом при равной специфичности, место в списке нужно выбрать осознанно.

## Как написан файл компонента

Все правила файла лежат в **одном блоке**, который пишется один раз, — через нативную вложенность CSS. Сокращённо из `components/button.css`:

```css
:where([data-vl-skin~='corporate']) {
  .vl-button {
    display: inline-flex;
    border-radius: var(--btn-radius, var(--radius-10));
    /* … */
  }

  @media (prefers-reduced-motion: reduce) {
    .vl-button {
      transition: none;
    }
  }

  :where(.vl-button)[data-size='small'] {
    padding: 7px 8px;
  }

  .vl-button:disabled {
    cursor: not-allowed;
    /* … */
  }

  :where(.vl-button)[data-variant='filled'] {
    background-color: var(--pal-base);
    border-color: var(--pal-base);
  }
}
```

`@keyframes` внутри правила писать нельзя, поэтому анимации объявляются **после блока**, на верхнем уровне файла, с именем `vl-<name>-…` (`components/tooltip.css`):

```css
:where([data-vl-skin~='corporate']) {
  .vl-tooltip {
    animation: vl-tooltip-tooltipIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) both;
  }
}

@keyframes vl-tooltip-tooltipIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

Сборка (Vite/esbuild) разворачивает вложенность: в `dist/skins/corporate.css` правило выглядит как `:where([data-vl-skin~='corporate']) .vl-button { … }`, а `@media` — как `@media (…) { :where([data-vl-skin~='corporate']) .vl-button { … } }`.

**Почему так:**

- **У `:where()` нулевая специфичность.** Правило скина весит ровно столько, сколько его внутренний селектор: `.vl-button` — 0,1,0. Класс приложения того же веса перебивает его, если CSS приложения подключён после скина — поэтому скин импортируется первым.
- **`~=` ищет целое слово.** `data-vl-skin` хранит цепочку скинов через пробел (`"corporate brand"`, когда `brand` расширяет `corporate`), поэтому применяются правила и базового, и дочернего скина.
- **Блок пишется один раз** — во внутренних селекторах префикса нет, и его невозможно забыть в отдельном правиле. Так же устроены `palettes.css` и `halo.css`.
- **Файлы токенов** (`tokens.css`, `shadows.css`, `primitives.css`, `components/base-input.variables.css`) — исключение: переменные объявляются на самом элементе с `data-vl-skin`, а вложенное правило выбирает только потомков. Поэтому там явные селекторы — см. [«Светлая и тёмная схема»](#светлая-и-тёмная-схема).

### Внутренние селекторы

| Что стилизуем                       | Селектор внутри блока                                                                                | Вес   |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- | ----- |
| Корень компонента                   | `.vl-button`                                                                                         | 0,1,0 |
| Часть                               | `.vl-modal__panel`                                                                                   | 0,1,0 |
| Вариант (атрибут контракта)         | `:where(.vl-button)[data-variant='filled']`                                                          | 0,1,0 |
| Булево состояние контракта          | `:where(.vl-tabs__tab)[data-active]`                                                                 | 0,1,0 |
| Нативное состояние (не в контракте) | `.vl-button:disabled`, `.vl-button:focus-visible`, `.vl-app-switcher__trigger[aria-expanded='true']` | 0,2,0 |
| Палитра                             | `[data-color='primary']` — только в `palettes.css`, см. ниже                                         | 0,1,0 |

- **Якорь `:where(.vl-<name>)`** — когда элемент задаётся атрибутом, а класс нужен только для привязки. Так у `[data-variant='filled']` остаётся вес 0,1,0 и варианты разрешаются порядком, как раньше.
- **Значения — только через токены** (`var(--…)`): цвета, радиусы, тени, z-index (`--z-*`). На семантических токенах тёмная схема работает сама.
- **Анимации** — с отключением в `@media (prefers-reduced-motion: reduce)` внутри блока.
- **Интерактивную кнопку с ореолом** добавляют классом во все списки `:is(...)` в `halo.css`.
- **Атрибуты на частях.** Часть data-атрибутов стоит на частях (`data-highlighted` у опции `SelectInput`, `data-exiting` у тоста и др.) и в контрактах пока не описана — их видно только в CSS скина и коде компонентов. Задача — [`docs/tech-debt/contract-part-modifiers.md`](../../../docs/tech-debt/contract-part-modifiers.md).

## Палитры `[data-color]`

`palettes.css` объявляет 11 палитр: `primary`, `neutral`, `error`, `information`, `warning`, `success`, `away`, `feature`, `verified`, `highlighted`, `stable`. Каждая выставляет пять переменных:

| Переменная        | Назначение                                                    |
| ----------------- | ------------------------------------------------------------- |
| `--pal-base`      | Основной цвет: фон `filled`, обводка и текст `stroke`         |
| `--pal-hover`     | Темнее — hover у `filled`                                     |
| `--pal-active`    | Ещё темнее — active у `filled`                                |
| `--pal-bg-hover`  | Полупрозрачный фон: фон `lighter`, hover у `stroke` / `ghost` |
| `--pal-bg-active` | Полупрозрачный фон темнее — active у `stroke` / `ghost`       |

Все палитры лежат в одном блоке и ссылаются на семантические токены, поэтому тёмная схема подхватывается автоматически:

```css
:where([data-vl-skin~='corporate']) {
  [data-color='primary'] {
    --pal-base: var(--primary-base);
    --pal-hover: var(--primary-dark);
    --pal-active: var(--primary-darker);
    --pal-bg-hover: var(--primary-alpha-10);
    --pal-bg-active: var(--primary-alpha-16);
  }

  /* … ещё 10 палитр */
}
```

### Откуда у компонента `data-color`

Из контракта. У Button, Badge, Tag и Avatar атрибут `color` берёт список из `COLOR_OPTIONS` ([`src/types/colors.ts`](../../types/colors.ts)):

```ts
// src/theme/contracts/button.ts
export const buttonContract = defineContract({
  name: 'button',
  attributes: {
    variant: ['filled', 'stroke', 'lighter', 'ghost'],
    color: COLOR_OPTIONS,
    // …
  },
  states: ['custom-color'],
})
```

Компонент передаёт значение в `contractAttrs()`, и на элементе появляется `data-color="primary"`:

```tsx
<button
  className={clsx(buttonContract.className, className)}
  {...contractAttrs(buttonContract, { variant, color: customVars ? undefined : color /* … */ })}
/>
```

CSS вариантов читает только `--pal-*` и о конкретных цветах не знает:

```css
:where([data-vl-skin~='corporate']) {
  :where(.vl-button)[data-variant='filled'] {
    background-color: var(--pal-base);
    border-color: var(--pal-base);
  }
}
```

Особые случаи:

- **`customColor`** (Button, Badge, Tag) — произвольный hex. Тогда `data-color` не ставится, появляется состояние `data-custom-color`, а `--pal-*` приходят инлайн-стилем из `customPaletteStyle()` ([`src/utils/customPalette.ts`](../../utils/customPalette.ts)). Невалидный hex игнорируется — остаётся семантический `color`.
- **Toast** — свой список цветов в контракте (`error`, `warning`, `success`, `information`, `neutral`); проп `color="info"` рендерит `data-color="information"`.
- **Avatar** получает `data-color` из `COLOR_OPTIONS`, но `--pal-*` не читает: фон и текст для каждого цвета заданы в `components/avatar.css`.
- **Ореол** (`halo.css`) берёт цвет кольца из `--pal-base`; у элементов без палитры — `--halo-neutral`.

### Как добавить цвет палитры

1. **Токены.** Добавь `--mycolor-dark`, `--mycolor-base`, `--mycolor-light`, `--mycolor-lighter` в светлый блок `tokens.css`, а если в тёмной схеме оттенок другой — и в тёмный. Нужна новая шкала примитивов — добавь её в `primitives.css` и запусти `npm run gen:primitives`.
2. **Палитра.** Добавь правило в блок `palettes.css`:

   ```css
   :where([data-vl-skin~='corporate']) {
     /* … */

     [data-color='mycolor'] {
       --pal-base: var(--mycolor-base);
       --pal-hover: var(--mycolor-dark);
       --pal-active: var(--mycolor-dark);
       --pal-bg-hover: var(--mycolor-lighter);
       --pal-bg-active: var(--mycolor-light);
     }
   }
   ```

3. **Список цветов.** Добавь `'mycolor'` в `COLOR_OPTIONS` в [`src/types/colors.ts`](../../types/colors.ts). Контракты Button, Badge, Tag и Avatar берут список оттуда — тип пропа `color` и значения `data-color` расширятся сами, галереи в Storybook и на сайте документации тоже: они перебирают `*_COLOR_OPTIONS`.
4. **Avatar.** Добавь правило `.vl-avatar[data-color='mycolor']` в блок `components/avatar.css` — иначе аватар останется серым по умолчанию. Toast новый цвет не получит: у него свой список.
5. **Changelog.** Новое значение в контракте — публичный API (minor), нужна запись по правилам [`docs/CONTRIBUTING.md`](../../../docs/CONTRIBUTING.md).

### Исключение для пары «цвет + вариант»

Иногда один цвет в конкретном варианте ведёт себя иначе. Например, `neutral` + `stroke` у кнопки показывает нейтральную обводку вместо цветной. Исключение пишется в блоке файла компонента — комбинацией двух атрибутов (`components/button.css`):

```css
:where([data-vl-skin~='corporate']) {
  /* … */

  /* neutral + stroke: нейтральная обводка вместо цветной (исключение из общего правила). */
  :where(.vl-button)[data-color='neutral'][data-variant='stroke'] {
    border-color: var(--stroke-soft-200);
    color: var(--text-sub-600);
  }
}
```

Вес у исключения 0,2,0, у общего правила `:where(.vl-button)[data-variant='stroke']` — 0,1,0, так что исключение побеждает независимо от порядка. Hover и active вариантов (`[data-variant='stroke']:hover:not(:disabled)`, 0,3,0) продолжают работать поверх него.

Другие формы того же приёма:

- **Переопределить переменную палитры** для пары — `components/badge.css`:

  ```css
  :where(.vl-badge)[data-color='neutral'][data-variant='filled'] {
    --pal-base: var(--faded-base);
    color: var(--text-white-0);
  }
  ```

- **Исключение для цвета во всех вариантах** — `components/button.css` задаёт нейтральным кнопкам свой ореол: `.vl-button[data-color='neutral'] { --halo-ring-color: var(--halo-neutral); … }` (0,2,0 — перекрывает переменные ореола у вариантов).

## Светлая и тёмная схема

Токены объявлены в двух блоках `tokens.css` — явными селекторами, без общей обёртки:

```css
/* Светлая — на корне скина и во вложенном светлом контейнере */
[data-vl-skin~='corporate'],
:where([data-vl-skin~='corporate']) [data-theme='light'] {
  --bg-white-0: var(--neutral-0);
  /* … */
}

/* Тёмная — на корне со схемой dark и во вложенном тёмном контейнере */
:where([data-vl-skin~='corporate'])[data-vl-scheme='dark'],
:where([data-vl-skin~='corporate'])[data-theme='dark'],
:where([data-vl-skin~='corporate']) [data-theme='dark'] {
  --bg-white-0: var(--neutral-950);
  /* … */
}
```

- **Все ветки весят 0,1,0.** Тёмный блок бьёт светлый порядком в файле, а переопределение токена на `:root` в CSS приложения (подключённом после скина) выигрывает в обеих схемах документа.
- **Светлый блок** — полный набор: шрифт, радиусы, цвета, `--z-*`, `--motion-*`. `shadows.css` объявлен с теми же селекторами, что светлый блок, `primitives.css` и `components/base-input.variables.css` — только на `[data-vl-skin~='corporate']`; в тёмной схеме они не переопределяются.
- **Тёмный блок** переопределяет только то, что меняется: `--bg-*`, `--text-*`, `--stroke-*`, `--icon-*`, цвета состояний и `--halo-neutral`. Новый токен, у которого в тёмной схеме другое значение, добавляется в оба блока.
- **Схема всего документа** — `data-vl-scheme` на `<html>`, его ставит `ThemeProvider`. Провайдер дублирует схему в `data-theme` на `<html>` как переходный алиас; тёмный блок принимает оба атрибута на корне скина.
- **Вложенный контейнер** с `data-theme="light"` или `data-theme="dark"` внутри скина переключает токены для своего поддерева. Порталы (Modal, Toast, выпадающие списки) рендерятся в `body` и следуют схеме `<html>`, а не контейнера.
- **В CSS компонентов** используются семантические токены (`--bg-white-0`, `--text-sub-600`), а не примитивы (`--neutral-0`): только тогда компонент сам переключается между схемами. Атрибуты схемы файлы компонентов не читают.

Полный список токенов — [`docs/reference/tokens.md`](../../../docs/reference/tokens.md).

## Проверки

- `npm run build` → `postbuild` запускает `scripts/check-dist-css.mjs`: в собранном CSS (`dist/**/*.css`, в том числе `dist/skins/corporate.css`) не должно быть висячих `@import`, а базовое правило ореола не должно объявлять `--halo-*`.
- `npm run verify:halo` — после сборки проверяет ореол кнопок в Chromium на реальном `dist/skins/corporate.css` и разметке по контракту (`vl-button` + data-атрибуты).
