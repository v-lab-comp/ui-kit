---
title: Темизация
description: Компоненты без стилей и скины — подключение скина, ThemeProvider, светлая и тёмная схема, SSR, переопределение стилей, токены и собственный скин.
---

# Темизация

Компоненты **V-Lab UI Kit** не несут собственного CSS. Весь внешний вид даёт **скин** — набор стилей, который включается атрибутом на `<html>`. Ниже: как подключить скин и переключать схему, как рендерить тему на сервере, как перекрасить компоненты под продукт и как написать свой скин.

## Компоненты без стилей и скины

- **Компонент** рендерит только стабильный класс `vl-<name>`, классы частей `vl-<name>__<part>` и data-атрибуты из своего **контракта**. Никаких хешированных классов и CSS внутри JS.
- **Скин** стилизует эти классы и атрибуты. В пакете один скин — **`corporate`** (прежний внешний вид кита). Скин публикуется двумя файлами: `@v-lab/ui-kit/skins/corporate.css` — его CSS, `@v-lab/ui-kit/skins/corporate` — манифест `corporateSkin`. В бандл приложения попадают только те скины, которые оно импортирует.
- Две независимые оси: **скин** (форма, размеры, шрифты, палитра) и **цветовая схема** (`light` / `dark`). Каждый скин поддерживает обе схемы.
- Скин включается атрибутом `data-vl-skin` на `<html>`. Без него компоненты остаются без оформления — это и есть «unstyled».

Что получает скин на примере кнопки:

```tsx
<Button size="small">Сохранить</Button>
```

```html
<button
  class="vl-button"
  data-variant="filled"
  data-color="primary"
  data-size="small"
  data-shape="rounded"
>
  Сохранить
</button>
```

## Подключение через ThemeProvider

```tsx
import '@v-lab/ui-kit/skins/corporate.css' // первым, до стилей приложения
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

root.render(
  <ThemeProvider skins={[corporateSkin]} defaultColorScheme="system" storageKey="app-theme">
    <App />
  </ThemeProvider>
)
```

Нужны оба импорта. `@v-lab/ui-kit/skins/corporate` — только манифест (имя скина и его схемы), CSS он не подключает. Стили приходят из `@v-lab/ui-kit/skins/corporate.css`. Подключайте его **до** своих стилей: ваши правила с тем же селектором весят столько же, сколько правила скина, и побеждают порядком (см. [Переопределение стилей](#overriding-styles)).

### Пропсы `ThemeProvider`

| Проп                  | Тип                                       | По умолчанию    | Назначение                                                          |
| --------------------- | ----------------------------------------- | --------------- | ------------------------------------------------------------------- |
| `skins`               | `readonly Skin[]` (**обязательный**)      | —               | Доступные скины; первый — скин по умолчанию. Пустой массив — ошибка |
| `skin`                | имя одного из `skins`                     | —               | Controlled: активный скин                                           |
| `defaultSkin`         | имя одного из `skins`                     | `skins[0].name` | Uncontrolled: стартовый скин                                        |
| `onSkinChange`        | `(name) => void`                          | —               | Вызывается из `setSkin`                                             |
| `colorScheme`         | `'light' \| 'dark' \| 'system'`           | —               | Controlled: схема                                                   |
| `defaultColorScheme`  | `'light' \| 'dark' \| 'system'`           | `'light'`       | Uncontrolled: стартовая схема                                       |
| `onColorSchemeChange` | `(scheme: ColorSchemePreference) => void` | —               | Вызывается из `setColorScheme`                                      |
| `storageKey`          | `string`                                  | —               | Ключ `localStorage`, под которым запоминается выбор пользователя    |
| `children`            | `ReactNode`                               | —               | Приложение                                                          |

Как это работает:

- **Controlled / uncontrolled.** Если передан `skin` (или `colorScheme`), провайдер не меняет значение сам: `setSkin` / `setColorScheme` только вызывают `onSkinChange` / `onColorSchemeChange`, а новое значение передаёте вы. Без них работают `defaultSkin` / `defaultColorScheme`.
- **`storageKey`.** Выбор хранится в `localStorage` как JSON `{ skin, colorScheme }` и при следующем запуске побеждает `defaultSkin` / `defaultColorScheme`. Запись идёт, только когда и скин, и схема uncontrolled.
- **`'system'`** следует `prefers-color-scheme` и переключается вместе с настройкой ОС, без перезагрузки.
- **Скин с `load`** (ленивый CSS, см. [ниже](#define-skin)) применяется только после того, как выполнились `load()` всех скинов его цепочки; до этого атрибуты нового скина на `<html>` не ставятся.

Что провайдер ставит на `<html>`:

| Атрибут / свойство | Значение                                                                            |
| ------------------ | ----------------------------------------------------------------------------------- |
| `data-vl-skin`     | Цепочка `extends` через пробел: `corporate`, для скина-наследника `corporate brand` |
| `data-vl-scheme`   | Фактическая схема: `light` или `dark`                                               |
| `data-theme`       | То же, что `data-vl-scheme` — переходный алиас, не опирайтесь на него               |
| `color-scheme`     | Инлайн-стиль `color-scheme: light \| dark` — для нативных контролов и скроллбаров   |

Атрибуты именно на `<html>`, чтобы тема доходила до порталов: модалки, тосты и выпадающие списки рендерятся в `body`. При размонтировании провайдер возвращает `<html>` прежние значения.

### `useTheme()`

Хук работает только внутри `ThemeProvider` (снаружи бросает ошибку) и возвращает:

| Поле                  | Тип                                       | Назначение                                        |
| --------------------- | ----------------------------------------- | ------------------------------------------------- |
| `skin`                | `string`                                  | Имя активного скина                               |
| `setSkin`             | `(name: string) => void`                  | Сменить скин; имя не из `skins` — ошибка          |
| `skins`               | `string[]`                                | Имена доступных скинов                            |
| `colorScheme`         | `'light' \| 'dark' \| 'system'`           | Выбор пользователя                                |
| `resolvedColorScheme` | `'light' \| 'dark'`                       | Фактическая схема после учёта системной настройки |
| `setColorScheme`      | `(scheme: ColorSchemePreference) => void` | Сменить схему                                     |

Переключатель светлой / тёмной / системной схемы:

```tsx
import { Button, useTheme, type ColorSchemePreference } from '@v-lab/ui-kit'

const SCHEMES: { value: ColorSchemePreference; label: string }[] = [
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Тёмная' },
  { value: 'system', label: 'Как в системе' },
]

export function ColorSchemeSwitcher() {
  const { colorScheme, resolvedColorScheme, setColorScheme } = useTheme()

  return (
    <div>
      {SCHEMES.map(({ value, label }) => (
        <Button
          key={value}
          size="small"
          color="neutral"
          variant={colorScheme === value ? 'filled' : 'stroke'}
          onClick={() => setColorScheme(value)}
        >
          {label}
        </Button>
      ))}
      <span>Сейчас: {resolvedColorScheme}</span>
    </div>
  )
}
```

## Без React-провайдера

Провайдер только ставит атрибуты — их можно задать и самостоятельно (статичная страница, приложение не на React):

```html
<html data-vl-skin="corporate" data-vl-scheme="dark" style="color-scheme: dark"></html>
```

- `data-vl-skin` обязателен: без него скин не применится. Для скина-наследника — вся цепочка: `data-vl-skin="corporate brand"`.
- `data-vl-scheme="dark"` включает тёмную схему; без атрибута (или с `light`) — светлая.
- CSS скина подключается так же: `@v-lab/ui-kit/skins/corporate.css`.

Переключение из JS:

```ts
const root = document.documentElement
root.dataset.vlSkin = 'corporate'
root.dataset.vlScheme = 'dark' // или 'light'
root.style.colorScheme = 'dark'
```

`useTheme()` без провайдера недоступен — схему в таком случае переключайте атрибутами.

## Вложенные контейнеры: `data-theme`

Чтобы часть страницы была в другой схеме, поставьте на контейнер `data-theme="dark"` (или `data-theme="light"` внутри тёмной страницы):

```tsx
<section className="promo" data-theme="dark">
  <Button>Кнопка в тёмном блоке</Button>
</section>
```

- Работает только внутри элемента с `data-vl-skin`: скин переопределяет токены для поддерева `[data-theme='light' | 'dark']`.
- Атрибут меняет только токены. Фон и цвет текста самого контейнера задайте токенами: `background: var(--bg-white-0); color: var(--text-strong-950)`.
- Порталы (модалки, тосты, выпадающие списки) рендерятся в `body` и берут схему с `<html>`, а не с контейнера.
- Нативные контролы и скроллбары следуют CSS-свойству `color-scheme`, а провайдер ставит его только на `<html>`. Для контейнера добавьте его сами: `[data-theme='dark'] { color-scheme: dark; }`.

## Несколько провайдеров на странице

Несколько `ThemeProvider` на одной странице поддерживаются: например, несколько React-корней или виджет со своим провайдером внутри приложения.

- Все провайдеры пишут в один и тот же `<html>`, и действует **последний применённый** — тот, что смонтировался позже, или тот, у которого последним сменились скин или схема.
- Когда провайдер размонтируется, на `<html>` возвращается состояние следующего живого провайдера. Исходные атрибуты `<html>` восстанавливаются, только когда размонтируется последний.
- У каждого провайдера своё состояние: `useTheme()` возвращает значения ближайшего провайдера, а `setColorScheme` в одном не меняет схему другого. Если провайдеры должны показывать одно и то же, передавайте им одинаковые значения через controlled-пропсы `skin` / `colorScheme`.

## SSR

Кит рендерится на сервере (`renderToString`), но `ThemeProvider` ставит атрибуты на `<html>` только в эффекте на клиенте. Без атрибутов в серверном HTML страница до гидрации остаётся без оформления. Поэтому отрендерите их на серверном `<html>` хелпером `themeHtmlAttributes(skin, scheme = 'light')` из `@v-lab/ui-kit`:

```tsx
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

themeHtmlAttributes(corporateSkin, 'light')
// {
//   'data-vl-skin': 'corporate',
//   'data-vl-scheme': 'light',
//   'data-theme': 'light',
//   style: { colorScheme: 'light' },
// }
```

Это ровно те атрибуты, которые ставит провайдер (он пишет их через тот же хелпер). Для скина-наследника `data-vl-skin` — вся цепочка: `themeHtmlAttributes(brandSkin)` → `'corporate brand'`. После гидрации провайдер перезаписывает атрибуты актуальными значениями. Значения — обычные строки, их можно написать и вручную: `<html data-vl-skin="corporate" data-vl-scheme="light" data-theme="light" style="color-scheme: light">`.

### Next.js App Router

В собранном пакете пока нет директив `'use client'`. Серверные компоненты App Router не могут использовать хуки и контекст, поэтому компоненты кита импортируйте не напрямую, а через свой файл с `'use client'` и именованным реэкспортом (`export *` в файле с `'use client'` Next.js не поддерживает):

```ts
// app/ui-kit.ts
'use client'
export { Button, SelectInput, useTheme } from '@v-lab/ui-kit'
```

Провайдер — тоже в клиентском файле. Скин с `load` — это функция, а функции нельзя передать пропсом из серверного компонента в клиентский:

```tsx
// app/providers.tsx
'use client'
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider skins={[corporateSkin]}>{children}</ThemeProvider>
}
```

```tsx
// app/layout.tsx — серверный компонент
import '@v-lab/ui-kit/skins/corporate.css'
import './globals.css'
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" {...themeHtmlAttributes(corporateSkin, 'light')}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

Как только директивы появятся в сборке, файл-прослойка станет не нужен. Задача описана в репозитории: `docs/tech-debt/use-client-directive.md`.

### Первый кадр со `storageKey` и `'system'`

Сервер не видит ни `localStorage`, ни настройку ОС. Поэтому серверный HTML приходит в той схеме, которую вы передали в `themeHtmlAttributes` (обычно `light`), а сохранённую или системную тёмную схему провайдер включает только после гидрации — у пользователя с тёмной схемой страница на мгновение мигает светлой. Это известное ограничение; варианты решения (инлайн-скрипт в `<head>`, который ставит схему до первой отрисовки, или cookie) разобраны в `docs/tech-debt/ssr-color-scheme-flash.md`.

- Если выбор пользователя хранится там, где его видит сервер (например, в cookie), передайте его и в `themeHtmlAttributes`, и в провайдер controlled-пропом `colorScheme` — тогда первый кадр сразу в нужной схеме.
- По той же причине разметка, которая зависит от `colorScheme` / `resolvedColorScheme` (например, переключатель выше), может не совпасть с серверной: `localStorage` и системную настройку провайдер читает уже в первом клиентском рендере. Такой UI показывайте после монтирования.

## Переопределение стилей {#overriding-styles}

### Классы `vl-*`

В CSS скина все правила компонента лежат в одном блоке `:where([data-vl-skin~='corporate']) { … }`, а в собранном `skins/corporate.css` каждое правило выглядит как `:where([data-vl-skin~='corporate']) .vl-button`. У приставки `:where(...)` **нулевая специфичность**, поэтому вес правила скина равен весу его внутреннего селектора: у `.vl-button` — один класс. Тот же селектор (или ваш класс того же веса) побеждает, если ваш CSS подключён **после** CSS скина:

```css
/* app.css — подключён после @v-lab/ui-kit/skins/corporate.css */
.vl-button {
  font-weight: 600;
}

.checkout-button {
  min-width: 160px;
}
```

```tsx
<Button className="checkout-button">Оплатить</Button>
```

Правила вариантов в скине весят столько же, сколько корень: корень в них обёрнут в `:where()`, и `:where(.vl-button)[data-shape='circle']` — это один атрибут. Поэтому ваше правило на `.vl-button`, подключённое позже, перебьёт и их для того же свойства.

Правила с псевдоклассами тяжелее: например, hover у `filled` — `:where(.vl-button)[data-variant='filled']:hover:not(:disabled)`. Чтобы перебить такое правило, повторите те же data-атрибуты и псевдоклассы:

```css
.checkout-button[data-variant='filled']:hover:not(:disabled) {
  background-color: var(--primary-darker);
}
```

Атрибуты, части и состояния каждого компонента описаны в его контракте — см. [Контракты](#contracts).

### CSS-переменные (токены)

Компоненты читают цвета, радиусы и тени из токенов (`var(--…)`), поэтому перекрашивать удобнее через них. Глобально — на `:root`, в CSS после CSS скина:

```css
/* app.css — подключён после @v-lab/ui-kit/skins/corporate.css */
:root {
  --primary-base: var(--purple-500);
  --primary-dark: var(--purple-800);
  --primary-darker: var(--purple-700);
  --primary-alpha-10: var(--purple-alpha-10);
  --primary-alpha-16: var(--purple-alpha-16);
}
```

Почему это работает в обеих схемах: светлые токены скин объявляет на `[data-vl-skin~='corporate']`, тёмные — на `:where([data-vl-skin~='corporate'])[data-vl-scheme='dark']`. Оба селектора весят как один атрибут, столько же, сколько `:root`, и ваш блок, подключённый позже, побеждает.

`--primary-*` одинаковы в обеих схемах, поэтому хватает одного блока. Если токен отличается по схемам (`--bg-*`, `--text-*`, `--stroke-*` и др.), задайте оба значения — тёмный блок после светлого:

```css
/* светлая схема: <html> и вложенные светлые контейнеры */
:root,
[data-theme='light'] {
  --bg-weak-50: var(--purple-50);
}

/* тёмная схема: <html> и вложенные тёмные контейнеры */
[data-vl-scheme='dark'],
[data-theme='dark'] {
  --bg-weak-50: var(--purple-950);
}
```

Вложенные контейнеры `[data-theme]` скин переобъявляет заново, поэтому одного `:root` для них мало — отсюда `[data-theme='…']` в селекторах. Для токенов, одинаковых в обеих схемах, достаточно `:root, [data-theme]`.

Локально — на любом контейнере: значения наследуются вниз по дереву.

```css
.promo {
  --primary-base: var(--purple-500);
  --primary-dark: var(--purple-800);
}
```

Внутри контейнера переопределяйте **семантические** токены (`--primary-base`), а не примитивы (`--blue-500`): семантический токен вычисляется там, где объявлен (на `<html>`), и смена примитива внутри контейнера на него уже не влияет.

Кроме общих токенов, у некоторых компонентов есть свои переменные: например, кнопка читает `var(--btn-radius, var(--radius-10))`, а размеры полей ввода заданы переменными `--base-input-*` в `src/skins/corporate/components/base-input.variables.css`. Полный список токенов — в разделе [Дизайн-система](./design-system/), в частности [Семантические токены](./design-system/semantic-tokens).

### Палитры `data-color`

Варианты цвета (`primary`, `neutral`, `error`, `information`, `warning`, `success`, `away`, `feature`, `verified`, `highlighted`, `stable`) выбираются атрибутом `data-color`, а палитра выставляет переменные `--pal-base`, `--pal-hover`, `--pal-active`, `--pal-bg-hover`, `--pal-bg-active`. Это работает на любом элементе внутри скина, в том числе на вашем:

```tsx
<div className="note" data-color="warning">
  Проверьте реквизиты
</div>
```

```css
.note {
  border-left: 2px solid var(--pal-base);
  background: var(--pal-bg-hover);
}
```

Для одной кнопки произвольного цвета есть проп `customColor` (hex): он задаёт `--pal-*` инлайном и снимает `data-color`.

## Собственный скин

Скин — это CSS плюс манифест. Своему скину не нужно жить в ките: в приложении это обычный CSS-файл, подключённый после CSS базового скина, и манифест `defineSkin`. Проще всего начать с наследника `corporate`: он берёт все стили базового скина и переопределяет поверх токены и отдельные правила.

### Манифест: `defineSkin` {#define-skin}

```ts
// brand-skin.ts
import { defineSkin } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

export const brandSkin = defineSkin({
  name: 'brand',
  schemes: ['light', 'dark'],
  extends: corporateSkin,
  load: () => import('./brand.css'),
})
```

| Поле      | Тип                      | Назначение                                                                      |
| --------- | ------------------------ | ------------------------------------------------------------------------------- |
| `name`    | `string`                 | Имя скина — значение в `data-vl-skin` и в селекторах `[data-vl-skin~='<name>']` |
| `schemes` | `['light', 'dark']`      | Обязательно обе схемы                                                           |
| `extends` | `Skin`                   | Базовый скин: его стили применяются, этот скин переопределяет поверх            |
| `load`    | `() => Promise<unknown>` | Ленивая загрузка CSS скина; провайдер применит скин только после неё            |

```tsx
import '@v-lab/ui-kit/skins/corporate.css'
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { brandSkin } from './brand-skin'

root.render(
  <ThemeProvider skins={[corporateSkin, brandSkin]} defaultSkin="brand" storageKey="app-theme">
    <App />
  </ThemeProvider>
)
```

- **`extends` и цепочка.** Провайдер разворачивает цепочку `extends` (`skinChain(brandSkin)` → `[corporateSkin, brandSkin]`) и ставит `data-vl-skin="corporate brand"`. `corporateSkin` в `skins` нужен, только чтобы на него можно было переключиться: для цепочки провайдер берёт базовый скин из `extends`.
- **Почему `~=`.** Селектор `[data-vl-skin~='corporate']` совпадает с целым словом в списке через пробел, поэтому при `data-vl-skin="corporate brand"` срабатывают правила и `corporate`, и `brand`. С `=` правила базового скина у наследника бы отключились.
- **`load`.** Провайдер вызывает `load()` у каждого скина цепочки, где он есть, и применяет скин после того, как все они выполнились. У `corporateSkin` `load` нет — его CSS подключается обычным импортом. Без `load` CSS наследника тоже можно подключить статически — после `@v-lab/ui-kit/skins/corporate.css`.

Скин без `extends` должен сам стилизовать все компоненты, которые вы используете, и объявить свои токены. Правила и токены `corporate` на него не действуют: они ограничены `[data-vl-skin~='corporate']`.

### CSS скина

Правила компонентов пишутся в **одном** блоке с приставкой скина, на нативной вложенности CSS. Токены — отдельно, явными селекторами: вложенное правило выбирает потомков элемента со скином, а токены объявляются на самом `<html>` и на вложенных контейнерах `[data-theme]`.

`brand.css`:

```css
/* Токены: светлая схема + вложенные светлые контейнеры */
[data-vl-skin~='brand'],
:where([data-vl-skin~='brand']) [data-theme='light'] {
  --primary-base: var(--purple-500);
  --primary-dark: var(--purple-800);
  --primary-darker: var(--purple-700);
  --primary-alpha-10: var(--purple-alpha-10);
  --primary-alpha-16: var(--purple-alpha-16);
}

/* Токены: тёмная схема + вложенные тёмные контейнеры */
:where([data-vl-skin~='brand'])[data-vl-scheme='dark'],
:where([data-vl-skin~='brand'])[data-theme='dark'],
:where([data-vl-skin~='brand']) [data-theme='dark'] {
  --primary-base: var(--purple-400);
}

/* Компоненты: один блок; внутри — корень, вариант, часть, состояние */
:where([data-vl-skin~='brand']) {
  .vl-button {
    font-weight: 600;
  }

  :where(.vl-button)[data-variant='ghost'] {
    color: var(--text-strong-950);
  }

  .vl-modal__panel {
    border-radius: var(--radius-24);
  }

  :where(.vl-tabs__tab)[data-active] {
    color: var(--primary-base);
    animation: vl-brand-tab-in var(--motion-duration-fast) var(--motion-ease-standard);
  }

  @media (prefers-reduced-motion: reduce) {
    :where(.vl-tabs__tab)[data-active] {
      animation: none;
    }
  }
}

/* @keyframes — вне блока: внутри правила они не допускаются */
@keyframes vl-brand-tab-in {
  from {
    opacity: 0.6;
  }
}
```

Правила:

- **Один блок `:where([data-vl-skin~='<name>']) { … }`** на файл. Приставка написана один раз и веса не добавляет: правило `.vl-button` внутри блока весит как один класс. Сборка разворачивает вложенность в `:where([data-vl-skin~='brand']) .vl-button`. В ките это делает Vite (esbuild); в своём проекте убедитесь, что вложенность разворачивает ваш сборщик или её поддерживают целевые браузеры. Без вложенности то же самое пишется приставкой у каждого правила: `:where([data-vl-skin~='brand']) .vl-button { … }`.
- **Селекторы внутри блока:** корень — `.vl-<name>`, часть — `.vl-<name>__<part>`, вариант — `[data-<attr>='<value>']`, булево состояние — `[data-<state>]`. Чтобы правило варианта весило как один атрибут (так сделано в `corporate`), корень оборачивается в `:where()`: `:where(.vl-button)[data-variant='ghost']`.
- **Нативные состояния** не дублируются в контракте: используйте `:disabled`, `:focus-visible`, `[aria-expanded]` и т.п.
- **Цвета и размеры** — через семантические токены: тогда тёмная схема работает без отдельных правил.
- **Токены** — явными селекторами, как в примере: светлые на `[data-vl-skin~='<name>']` и `:where([data-vl-skin~='<name>']) [data-theme='light']`, тёмные — на трёх ветках с `:where(...)`. Все весят как один атрибут, поэтому тёмный блок побеждает светлый порядком, а `:root` в CSS приложения, подключённом после скина, — оба.
- **`@keyframes`** — вне блока; имя с приставкой скина, чтобы не столкнуться с чужими анимациями.
- **Порядок.** Правила наследника весят столько же, сколько правила базового скина, и побеждают порядком: CSS наследника должен идти после `@v-lab/ui-kit/skins/corporate.css`. Правило на корне (`.vl-button`) перебьёт и правила вариантов базового скина с тем же свойством (`:where(.vl-button)[data-shape='circle']`) — переопределяйте свойство на том же уровне, где его задаёт базовый скин.
- **Токены по схемам.** Светлый блок наследника идёт позже тёмного блока базового скина и при равном весе перебьёт его. Если наследник меняет токен, который у базового скина отличается в тёмной схеме (`--bg-*`, `--text-*`, `--stroke-*` и др.), задайте его и в тёмном блоке.

Примитивы (`--purple-500`, …) объявлены скином `corporate`, поэтому наследник может на них ссылаться.

### Скин внутри кита

Скин, который публикуется вместе с китом, — папка `src/skins/<name>/`: `index.ts` (манифест `defineSkin(...)`, импортирует `./index.css`), `index.css` (подключает файлы скина в порядке каскада), файлы токенов и `components/*.css`. Сборка находит каждую такую папку с `index.ts` сама и собирает `dist/skins/<name>.js` (манифест) и `dist/skins/<name>.css` (CSS только этого скина). В пакете они доступны как `@v-lab/ui-kit/skins/<name>` и `@v-lab/ui-kit/skins/<name>.css`; второй скин кита приложение может грузить лениво через `load: () => import('@v-lab/ui-kit/skins/<name>.css')`.

Правила написания скина — в репозитории: `docs/architecture/theming.md`; устройство `corporate` (порядок файлов, токены, палитры, ореол наведения) — `src/skins/corporate/README.md`.

### Контракты {#contracts}

Контракт — публичный API компонента для скинов: имя (→ класс `vl-<name>`), перечислимые атрибуты, булевы состояния и части. Типы пропсов компонента выводятся из контракта, поэтому компонент и скины не могут разойтись. Контракт кнопки (`src/theme/contracts/button.ts`):

```ts
import { COLOR_OPTIONS } from '@/types/colors'
import { defineContract } from '../contract'

export const buttonContract = defineContract({
  name: 'button',
  attributes: {
    variant: ['filled', 'stroke', 'lighter', 'ghost'],
    color: COLOR_OPTIONS,
    size: ['medium', 'small', 'x-small', '2x-small'],
    shape: ['rounded', 'circle', 'square'],
  },
  /** custom-color: цвет задан через `customColor` (инлайн `--pal-*`), `data-color` нет */
  states: ['custom-color'],
})
```

Что из этого стилизует скин:

| Селектор                                                      | Откуда                               |
| ------------------------------------------------------------- | ------------------------------------ |
| `.vl-button`                                                  | `name: 'button'`                     |
| `[data-variant='filled' \| 'stroke' \| 'lighter' \| 'ghost']` | `attributes.variant`                 |
| `[data-color='primary' \| 'neutral' \| …]`                    | `attributes.color` (`COLOR_OPTIONS`) |
| `[data-size='medium' \| 'small' \| 'x-small' \| '2x-small']`  | `attributes.size`                    |
| `[data-shape='rounded' \| 'circle' \| 'square']`              | `attributes.shape`                   |
| `[data-custom-color]`                                         | `states: ['custom-color']`           |

Хелперы из `@v-lab/ui-kit` собирают селекторы и классы из контракта — для тестов, `querySelector` и проверки скина:

```ts
import { buttonContract, contractPart, contractSelector, themeContracts } from '@v-lab/ui-kit'

contractSelector(buttonContract, { variant: 'ghost', size: 'small' })
// ".vl-button[data-variant='ghost'][data-size='small']"

contractSelector(buttonContract, { 'custom-color': true })
// ".vl-button[data-custom-color]"

contractPart(themeContracts.modal, 'panel')
// "vl-modal__panel"
```

`themeContracts` — реестр контрактов всех компонентов (77 штук; ключи в camelCase: `button`, `modal`, `tabs`, …). По нему удобно проверить, что скин покрывает все классы, атрибуты и части:

```ts
for (const contract of Object.values(themeContracts)) {
  console.log(contract.className, contract.attributes, contract.states ?? [], contract.parts ?? [])
}
```

Значения из контракта доступны и как типы: `ContractValue<typeof buttonContract, 'size'>` → `'medium' | 'small' | 'x-small' | '2x-small'`.

Контракт стабилен: удаление или переименование значения — breaking change, добавление — minor-версия.
