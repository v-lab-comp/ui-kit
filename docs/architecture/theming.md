# Темы: скины и цветовые схемы

Две независимые оси:

- **Скин** — весь внешний вид (форма, размеры, шрифты, палитра). Папка `src/skins/<name>/`.
- **Цветовая схема** — `light` / `dark`. Каждый скин обязан поддерживать обе (`schemes: ['light', 'dark']` в манифесте).

## Подключение в приложении

```tsx
import '@v-lab/ui-kit/skins/corporate.css' // первым, до стилей приложения
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
;<ThemeProvider skins={[corporateSkin]} defaultColorScheme="system" storageKey="vl-theme">
  <App />
</ThemeProvider>
```

Нужны оба импорта: `skins/corporate.css` — CSS скина, `skins/corporate` — только манифест `corporateSkin` (имя, схемы, `extends`, `load`). Компоненты без скина остаются без оформления.

`useTheme()` → `{ skin, setSkin, skins, colorScheme, resolvedColorScheme, setColorScheme }`. Вне провайдера хук бросает ошибку.

Провайдер ставит на `<html>` атрибуты `data-vl-skin` (цепочка `extends`: `"corporate brand"`) и `data-vl-scheme`, алиас `data-theme` (то же значение, что `data-vl-scheme`) и инлайн-стиль `color-scheme`. Атрибуты именно на `<html>`, чтобы тема доходила до порталов (Toast, Select, DateInput, Drawer рендерятся в `body`). При размонтировании провайдер возвращает `<html>` прежние значения.

Пропы controlled (`skin` / `colorScheme` + `on*Change`) или uncontrolled (`defaultSkin` / `defaultColorScheme`, по умолчанию `light`). `storageKey` запоминает выбор в `localStorage` — только когда и скин, и схема uncontrolled. `'system'` следует `prefers-color-scheme`. Скин с `load` применяется только после загрузки его CSS; пока грузится — остаётся предыдущий загруженный.

**Несколько провайдеров на странице** (несколько React-корней, виджет со своим провайдером) поддерживаются: на `<html>` действует последний применённый, а исходное состояние `<html>` восстанавливается, только когда размонтируется последний провайдер.

**Без провайдера** атрибуты ставятся вручную: `<html data-vl-skin="corporate" data-vl-scheme="light">`; тёмная схема — `data-vl-scheme="dark"`.

## SSR

Компоненты рендерятся на сервере, но `ThemeProvider` ставит атрибуты только в эффекте на клиенте. Чтобы стили скина работали с первого кадра, атрибуты рендерятся на серверном `<html>` хелпером `themeHtmlAttributes(skin, scheme = 'light')` из `@v-lab/ui-kit` (`src/theme/skin.ts`). Он возвращает `{ 'data-vl-skin', 'data-vl-scheme', 'data-theme', style: { colorScheme } }` — ровно то, что ставит провайдер (провайдер пишет атрибуты через тот же хелпер, разойтись им нельзя).

```tsx
// Next.js App Router, app/layout.tsx — серверный компонент
import type { ReactNode } from 'react'
import '@v-lab/ui-kit/skins/corporate.css'
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { ThemeProvider } from './ui-kit' // 'use client'; export * from '@v-lab/ui-kit'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" {...themeHtmlAttributes(corporateSkin, 'light')}>
      <body>
        <ThemeProvider skins={[corporateSkin]}>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

Ограничения, которые пока не решены:

- В `dist/` нет директив `'use client'`: в Next.js App Router компоненты кита импортируются из своего файла с `'use client'` (`app/ui-kit.ts`: `'use client'; export * from '@v-lab/ui-kit'`). `themeHtmlAttributes` и `corporateSkin` импортируются из пакета напрямую: функцию из `'use client'`-модуля на сервере не вызвать — [`../tech-debt/use-client-directive.md`](../tech-debt/use-client-directive.md).
- С `storageKey` или `'system'` первый серверный кадр светлый до гидрации — [`../tech-debt/ssr-color-scheme-flash.md`](../tech-debt/ssr-color-scheme-flash.md).

## Контракты компонентов

`src/theme/contracts/` — для каждого компонента: класс `vl-<name>`, перечислимые data-атрибуты, булевы состояния, части (`vl-<name>__<part>`). Хелперы — `src/theme/contract.ts` (`defineContract`, `contractAttrs`, `contractPart`, `contractSelector`), реестр всех контрактов — `themeContracts` в `src/theme/contracts/index.ts`. Типы пропсов выводятся из контракта (`ContractValue<typeof buttonContract, 'size'>`), разметка — через `contractAttrs()`. Эталон — `src/theme/contracts/button.ts` и `src/components/Button/Button.tsx`.

Правила:

- В контракт — только варианты, состояния и части. Нативные состояния не дублируются: скин использует `:disabled`, `:focus-visible`, `[aria-expanded]`.
- Контракт — публичный API: удалить / переименовать значение — breaking change; добавить — minor.
- Цвета и размеры в CSS скина — только через семантические токены, тогда тёмная схема работает автоматически.
- Модификаторы частей (data-атрибуты на `vl-<name>__<part>`) в контрактах пока не описаны — [`../tech-debt/contract-part-modifiers.md`](../tech-debt/contract-part-modifiers.md).

## Как устроен скин

Папка `src/skins/<name>/`: `index.ts` (манифест `defineSkin(...)`, импортирует `index.css`), `index.css` (подключает все файлы скина в порядке каскада), файлы токенов и `components/*.css`. Устройство скина `corporate` и правила его правки — `src/skins/corporate/README.md`.

### Файл компонента — один блок `:where(...)`

Все правила файла компонента лежат внутри **одного** блока, написанного один раз, на нативной вложенности CSS (фрагменты `src/skins/corporate/components/button.css` и `tooltip.css`):

```css
:where([data-vl-skin~='corporate']) {
  .vl-button {
    border-radius: var(--btn-radius, var(--radius-10));
  }

  :where(.vl-button)[data-variant='filled'] {
    background-color: var(--pal-base);
  }

  .vl-button:focus-visible {
    outline: 2px solid var(--pal-bg-hover);
  }

  @media (prefers-reduced-motion: reduce) {
    .vl-button {
      transition: none;
    }
  }
}

/* @keyframes — вне блока: внутри правила они не допускаются (пример — components/tooltip.css) */
@keyframes vl-tooltip-tooltipIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

- Сборка (Vite, esbuild) разворачивает вложенность в `:where([data-vl-skin~='corporate']) .vl-button`. У `:where()` нулевая специфичность, поэтому каждое правило весит ровно столько, сколько его внутренний селектор (`.vl-button` — 0,1,0), и приложение перебивает его своим классом.
- Внутри блока: корень — `.vl-<name>`, часть — `.vl-<name>__<part>`, вариант — `[data-<attr>='<value>']`, состояние — `[data-<state>]`; если элемент больше ничем не задан — якорь `:where(.vl-<name>)` (вариант остаётся 0,1,0 и разрешается порядком). Нативные состояния — `:disabled`, `:focus-visible`, `[aria-expanded]`.
- Вложенное правило без `&` — потомок элемента со скином. Сам `<html>` (элемент с `data-vl-skin`) так не выбрать — поэтому файлы токенов пишутся явными селекторами (ниже).
- `@keyframes` — вне блока, с именем `vl-<компонент>-<имя>`.
- `palettes.css` (`[data-color='<name>']` → переменные `--pal-*`) и `halo.css` (ореол наведения, список корней в `:is(...)`) — тоже одним блоком.

### Почему `~=`

`data-vl-skin` хранит цепочку через пробел: у скина `brand`, который `extends: corporateSkin`, на `<html>` стоит `data-vl-skin="corporate brand"`. `~=` ищет целое слово, поэтому применяются правила и базового скина, и наследника.

### Файлы токенов — явные селекторы

`tokens.css`, `shadows.css`, `primitives.css`, `components/base-input.variables.css` объявляют переменные на самом элементе со скином, поэтому пишутся без блока:

| Схема                         | Селектор                                                                                                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Светлая (корень)              | `[data-vl-skin~='corporate']`                                                                                                                                                     |
| Светлая (вложенный контейнер) | `:where([data-vl-skin~='corporate']) [data-theme='light']`                                                                                                                        |
| Тёмная (`tokens.css`)         | `:where([data-vl-skin~='corporate'])[data-vl-scheme='dark']`, `:where([data-vl-skin~='corporate'])[data-theme='dark']`, `:where([data-vl-skin~='corporate']) [data-theme='dark']` |

Все ветки весят (0,1,0): тёмный блок бьёт светлый порядком в файле, а переопределение токенов на `:root` в CSS приложения, подключённом после скина, выигрывает в обеих схемах. `data-theme='dark'` на `<html>` тоже включает тёмную схему. Тени, примитивы и переменные инпутов в тёмной схеме не переопределяются.

### Порядок и `@import`

- `index.css` подключает файлы **в порядке прежнего бандла** — при равной специфичности каскад не меняется. Новый файл компонента добавляется туда же, место выбирается осознанно.
- `@import` — только в `index.css`; файлы скина друг друга не импортируют. Висячие `@import` в `dist/**/*.css` ловит `postbuild` (`scripts/check-dist-css.mjs`); там же проверка, что базовое правило ореола не объявляет `--halo-*`.
- Без атрибута `data-vl-skin` на `<html>` (без `ThemeProvider` и без ручного атрибута) компоненты остаются без стилей — это и есть unstyled.

## Сборка скинов

- Каждая папка `src/skins/<name>/` с `index.ts` находится автоматически (`skinEntries` в `vite.config.ts`) и собирается в `dist/skins/<name>.js` (манифест) + `dist/skins/<name>.css` (CSS только этого скина, `build.cssCodeSplit: true`).
- `package.json` → `exports`: `"./skins/*.css"` → `./dist/skins/*.css`, `"./skins/*"` → манифест (`types` + `default`). Экспорта `./style.css` нет.
- В бандл приложения попадают только импортированные скины. Второй скин можно грузить лениво:

```ts
import { defineSkin } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

export const brandSkin = defineSkin({
  name: 'brand',
  schemes: ['light', 'dark'],
  extends: corporateSkin,
  load: () => import('@v-lab/ui-kit/skins/brand.css'),
})
```

Подробно про сборку — в [`bundling.md`](bundling.md).

## Статус перехода

Сделано: все компоненты unstyled (77 контрактов), стили перенесены в скин `corporate` без изменения вида (скриншоты и вычисленные стили в состояниях hover/focus/active сверены с прежней версией). Файлы скина переписаны на один блок `:where(...)` с вложенностью — собранный CSS эквивалентен прежнему; CSS собирается отдельным файлом на скин; для SSR есть `themeHtmlAttributes`.

Дальше: структурный `base.css` (минимум для работы без скина), слои `@layer`, проверка скинов по контрактам (`check:skin`), второй скин. Открытые задачи — в [`../tech-debt/`](../tech-debt/README.md).
