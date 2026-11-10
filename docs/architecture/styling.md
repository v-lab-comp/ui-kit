# Стили

Три правила, которые не меняются:

1. **Компоненты без CSS, стили — в скине.** Компонент рендерит только класс `vl-<name>`, части `vl-<name>__<part>` и data-атрибуты из своего контракта (`src/theme/contracts/`). Все стили лежат в скине: `src/skins/corporate/components/<name>.css`. CSS Modules не используются. Как устроены скины, контракты и `ThemeProvider` — [`theming.md`](theming.md).
2. **Все значения цвета, радиуса, тени, z-index, размера — через CSS Custom Properties.** Никаких хардкод-цветов, никаких чисел `8px` в стилях компонента. Если значения нет в токенах — оно туда добавляется.
3. **Никакого Tailwind, никаких styled-components, никаких inline-стилей.** `clsx` используется только для условного склеивания классов.

`!important` запрещён в новых стилях. Старые исключения постепенно выводятся через CSS-переменные (так уже сделано с `--btn-radius` в `ButtonGroup`).

## Слои стилей

```
src/skins/corporate/
├── index.ts             — манифест corporateSkin = defineSkin(...); импортирует index.css
├── index.css            — подключает все файлы скина в порядке каскада (порядок важен; единственный файл с @import)
├── tokens.css           — семантические токены (--bg-*, --text-*, --stroke-*, --primary-*, --radius-*, --z-*, --motion-*), светлая и тёмная схема
├── shadows.css          — семантические тени (--shadow-regular-x-small, --shadow-regular-medium, …)
├── palettes.css         — палитры вариантов по [data-color='…'] (см. ниже)
├── halo.css             — hover-ореол интерактивных элементов
├── primitives.css       — сырые цвета палитры (--slate-500, --blue-alpha-16, …) — источник для primitives.ts
├── components/*.css     — стили компонентов, как правило один файл на контракт
├── components/base-input.variables.css — переменные --base-input-* для BaseInput и обёрток
└── README.md            — устройство скина и правила его правки

src/colors/
├── primitives.ts        — сгенерированный из primitives.css модуль (объекты colors, alpha + утилиты)
└── semantic.ts          — типы и константы для семантических цветов

src/types/
└── colors.ts            — Color, COLOR_OPTIONS — единый список цветов для Button / Badge / Tag / Toast
```

Файл компонента (а также `palettes.css` и `halo.css`) оборачивает все свои правила в **один** блок `:where([data-vl-skin~='corporate']) { … }`, написанный один раз; правила внутри — на нативной вложенности CSS. Сборка разворачивает её в `:where([data-vl-skin~='corporate']) .vl-button`. У `:where()` нулевая специфичность: каждое правило весит столько же, сколько его внутренний селектор, и стили скина перебиваются потребителем обычным классом. `@keyframes` пишутся вне блока. Файлы токенов (`tokens.css`, `shadows.css`, `primitives.css`, `components/base-input.variables.css`) объявляют переменные на самом элементе со скином и используют явные селекторы. Полные правила — в [`theming.md`](theming.md).

## Палитра примитивов: `primitives.css` → `primitives.ts`

Источник правды — **CSS** (`src/skins/corporate/primitives.css`). TypeScript-объекты в `src/colors/primitives.ts` генерируются скриптом.

```bash
npm run gen:primitives
```

Скрипт `scripts/parse-primitives-from-css.mts` парсит строки вида `--slate-500: #...;` и `--blue-alpha-16: #...;`, собирает объекты `colors` и `alpha` и записывает `src/colors/primitives.ts`. Комментарии в `primitives.css` игнорируются — можно временно закомментировать палитру и перегенерировать, чтобы исключить её из TS-модуля.

`primitives.ts` руками не правят: он перезаписывается при следующей генерации.

## Палитры `[data-color]`: общие варианты для Button / Badge / Tag / Toast

`palettes.css` объявляет 11 палитр (`primary`, `neutral`, `error`, `information`, `warning`, `success`, `away`, `feature`, `verified`, `highlighted`, `stable`) по селектору `[data-color='<name>']`. Каждая выставляет 5 CSS-переменных:

| Переменная        | Где применяется                                             |
| ----------------- | ----------------------------------------------------------- |
| `--pal-base`      | Основной цвет (фон у `filled`, обводка/текст у `stroke`)    |
| `--pal-hover`     | Тёмный оттенок — hover у `filled`                           |
| `--pal-active`    | Ещё темнее — active у `filled`                              |
| `--pal-bg-hover`  | Полупрозрачный фон — hover у `stroke` / `lighter` / `ghost` |
| `--pal-bg-active` | Полупрозрачный фон темнее — active у `stroke` / `ghost`     |

Компонент получает атрибут `data-color` из контракта (`color` в `attributes`) и читает `--pal-*` из палитры. Список цветов хранится в `src/types/colors.ts` (`COLOR_OPTIONS`).

Исключение для конкретной пары «цвет + вариант» пишется в файле компонента, внутри его блока (`components/button.css`):

```css
:where([data-vl-skin~='corporate']) {
  /* … */
  :where(.vl-button)[data-color='neutral'][data-variant='stroke'] {
    border-color: var(--stroke-soft-200);
    color: var(--text-sub-600);
  }
}
```

## CSS скина для потребителя

При сборке каждый скин получает свой файл: `dist/skins/<name>.css` (для corporate — `dist/skins/corporate.css`, токены, палитры и стили всех компонентов). Общего `style.css` нет. Потребитель подключает CSS скина один раз, до своих стилей, и включает скин через `ThemeProvider` (или атрибут `data-vl-skin="corporate"` на `<html>`):

```tsx
import '@v-lab/ui-kit/skins/corporate.css'
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
;<ThemeProvider skins={[corporateSkin]}>{/* приложение */}</ThemeProvider>
```

В JS-бандл стили не встраиваются: без `skins/corporate.css` или без скина на `<html>` компоненты останутся без оформления. Как CSS разбивается по скинам — в [`bundling.md`](bundling.md).

## Специфичность в инпутах

`InputField` оборачивает поле и задаёт паддинги/рамку. Голый `<input>` внутри получает часть `input-inner` контракта конкретного компонента и обнуляет ему собственные стили `BaseInput`. Для этого нужен селектор с повышенной специфичностью — `input.vl-<name>__input-inner` (0,1,1 против 0,1,0 у `.vl-base-input`):

```css
:where([data-vl-skin~='corporate']) {
  input.vl-text-input__input-inner {
    flex: 1;
    min-width: 0;
    min-height: 0;
    height: auto;
    padding: 0;
    border: none;
    background: transparent;
    outline: none;
  }
}
```

Это единственное место, где обёрткам разрешено перебивать стили `BaseInput`.

## Анимации и `prefers-reduced-motion`

Любая CSS-анимация в скине отключается в media-query — внутри того же блока файла компонента; `@keyframes` (имя `vl-<компонент>-<имя>`) — вне блока:

```css
:where([data-vl-skin~='corporate']) {
  .vl-my-component {
    animation: vl-my-component-fadeIn var(--motion-duration-fast) var(--motion-ease-standard);
  }

  @media (prefers-reduced-motion: reduce) {
    .vl-my-component {
      animation: none;
      transition: none;
    }
  }
}

@keyframes vl-my-component-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

Это требование accessibility — см. [`../guides/accessibility.md`](../guides/accessibility.md).

## Список токенов

Полный справочник по дизайн-токенам — в [`../reference/tokens.md`](../reference/tokens.md).
