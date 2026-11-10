# Новый компонент

Пошаговый процесс добавления нового компонента в `src/components/`. Описывает _что и в каком порядке делать_; _почему именно так_ — в файлах `../architecture/`.

Коротко об устройстве: компоненты **unstyled** — они не подключают CSS. Компонент рендерит стабильный класс `vl-<name>`, части `vl-<name>__<part>` и data-атрибуты, описанные в его **контракте** (`src/theme/contracts/<name>.ts`). Все стили лежат в **скине**: `src/skins/corporate/components/<name>.css`, одним блоком `:where([data-vl-skin~='corporate']) { … }` на файл. Правила контрактов и написания скина — [`../architecture/theming.md`](../architecture/theming.md), токены и палитры — [`../architecture/styling.md`](../architecture/styling.md).

Перед началом полезно открыть похожий существующий компонент и скопировать его структуру. Эталоны:

| Тип компонента                  | Эталон                                                    |
| ------------------------------- | --------------------------------------------------------- |
| Display с вариантами и палитрой | `src/components/Button/` (контракт, типы, скин)           |
| Простой input                   | `src/components/inputs/TextInput/`                        |
| Composite input                 | `src/components/inputs/SiteInput/`                        |
| Inline вариант select           | `src/components/inputs/SelectInput/` (`variant="inline"`) |
| Overlay (Modal-подобный)        | `src/components/overlays/Modal/Modal.tsx`                 |
| Layout-панель                   | `src/components/layout/Drawer/Drawer.tsx`                 |
| Простой display                 | `src/components/Badge/` или `src/components/Tag/`         |
| Compound display                | `src/components/Tabs/` или `src/components/Table/`        |

`Button`, `Badge` и часть других старых компонентов написаны без `forwardRef` — в новом компоненте он обязателен (шаблоны ниже).

## 1. Определить место

| Что это                            | Куда положить                     |
| ---------------------------------- | --------------------------------- |
| Любое поле ввода                   | `src/components/inputs/<Name>/`   |
| Modal / Popover / Tooltip-подобное | `src/components/overlays/<Name>/` |
| Часть каркаса страницы             | `src/components/layout/<Name>/`   |
| Самостоятельный display-компонент  | `src/components/<Name>/`          |

Инпуты не делятся на «простые» и «сложные»: всё, что принимает ввод от пользователя — в `inputs/`. Подробнее про каждую группу — в `../architecture/`.

## 2. Файлы

```
src/components/<Group>/<Name>/
├── <Name>.tsx              — разметка: класс vl-<name>, data-атрибуты, части
├── <Name>.types.ts         — пропы; варианты выводятся из контракта
├── <Name>.stories.tsx
├── <Name>.test.tsx
└── index.ts

src/theme/contracts/<name>.ts               — контракт компонента
src/skins/corporate/components/<name>.css     — стили компонента в скине corporate
```

Имена: папка и компонент — PascalCase (`MyComponent`); имя контракта, файл контракта, файл скина и класс — kebab-case (`my-component` → `vl-my-component`); переменная контракта — `myComponentContract`, ключ в реестре `themeContracts` — `myComponent`.

Файлов стилей рядом с компонентом нет: компонент не импортирует никакой CSS, его оформление — только в файле скина.

## 3. Компонент

Обязательно для всех: `forwardRef`, `displayName`, `className` пропом для переопределения (склеивается с классом контракта через `clsx`). Разметка собирается только из контракта:

- `<contract>.className` — класс корня `vl-<name>`;
- `contractAttrs(contract, { … })` — data-атрибуты корня (варианты и состояния);
- `contractPart(contract, '<part>')` — класс внутренней части `vl-<name>__<part>`.

Никаких inline-стилей и хардкод-цветов — см. [`../architecture/styling.md`](../architecture/styling.md).

Шаблон **display** (устроен как `Button.tsx`; контракт и типы — в шагах 4–5):

```tsx
import clsx from 'clsx'
import { forwardRef } from 'react'
import { contractAttrs, contractPart } from '@/theme/contract'
import { myComponentContract } from '@/theme/contracts/my-component'
import type { MyComponentProps } from './MyComponent.types'

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  (
    { variant = 'filled', color = 'primary', size = 'medium', icon, className, children, ...rest },
    ref
  ) => (
    <div
      ref={ref}
      className={clsx(myComponentContract.className, className)}
      {...contractAttrs(myComponentContract, {
        variant,
        color,
        size,
        'has-icon': Boolean(icon),
      })}
      {...rest}
    >
      {icon ? <span className={contractPart(myComponentContract, 'icon')}>{icon}</span> : null}
      {children}
    </div>
  )
)

MyComponent.displayName = 'MyComponent'
```

`contractAttrs` выводит строковые значения как `data-<key>="<value>"`, а состояния — как `data-<state>=""` только когда они `true`. Значения `undefined` и `false` не попадают в разметку.

`contractAttrs` работает только для корня. Модификатор части (например, `data-disabled` у кнопки календаря в `DateInput.tsx`) пока ставится напрямую — `data-disabled={disabled || undefined}` — и в контракте не описан; это известный долг: [`../tech-debt/contract-part-modifiers.md`](../tech-debt/contract-part-modifiers.md).

Компонент должен рендериться на сервере (SSR): к `window`, `document`, `localStorage` обращаться только в эффектах и обработчиках или за проверкой `typeof window === 'undefined'` (как в `src/theme/ThemeProvider.tsx`). Директиву `'use client'` в файл компонента не добавлять: в `dist/` её пока нет ни в одном модуле, и приложения на Next.js App Router импортируют кит через свой `'use client'`-файл. Как это решить — [`../tech-debt/use-client-directive.md`](../tech-debt/use-client-directive.md).

Шаблон **input** (полный код — в `TextInput.tsx`). Класс контракта уходит на `InputField`, часть `input-inner` — на голый `BaseInput`:

```tsx
import clsx from 'clsx'
import { forwardRef } from 'react'
import { InputField } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { contractPart } from '@/theme/contract'
import { myInputContract } from '@/theme/contracts/my-input'
import type { MyInputProps } from './MyInput.types'

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
  (
    {
      label,
      required,
      requiredMarker,
      optional,
      labelTooltip,
      hint,
      error,
      completed,
      completedColor,
      prefix,
      suffix,
      startBlock,
      endBlock,
      id,
      size = 'medium',
      disabled,
      className,
      ...inputProps
    },
    ref
  ) => (
    <InputField
      label={label}
      required={required}
      requiredMarker={requiredMarker}
      optional={optional}
      labelTooltip={labelTooltip}
      hint={hint}
      error={error}
      completed={completed}
      completedColor={completedColor}
      prefix={prefix}
      suffix={suffix}
      startBlock={startBlock}
      endBlock={endBlock}
      size={size}
      disabled={disabled}
      className={clsx(myInputContract.className, className)}
      id={id}
    >
      {(fieldId) => (
        <BaseInput
          ref={ref}
          id={fieldId}
          size={size}
          hasError={!!error}
          disabled={disabled}
          className={contractPart(myInputContract, 'input-inner')}
          {...inputProps}
        />
      )}
    </InputField>
  )
)

MyInput.displayName = 'MyInput'
```

Что меняется по группам — см. [`../architecture/inputs.md`](../architecture/inputs.md), [`../architecture/overlays.md`](../architecture/overlays.md), [`../architecture/layout.md`](../architecture/layout.md).

## 4. Контракт

Контракт — публичный API компонента для скинов: что именно скин может стилизовать. Описывается через `defineContract` (`src/theme/contract.ts`):

| Поле         | Что это                         | В разметке                  |
| ------------ | ------------------------------- | --------------------------- |
| `name`       | kebab-case имя                  | класс `vl-<name>`           |
| `attributes` | перечислимые варианты           | `data-<key>="<value>"`      |
| `states`     | булевы состояния                | `data-<state>` (есть / нет) |
| `parts`      | именованные внутренние элементы | класс `vl-<name>__<part>`   |

```ts
// src/theme/contracts/my-component.ts
import { COLOR_OPTIONS } from '@/types/colors'
import { defineContract } from '../contract'

export const myComponentContract = defineContract({
  name: 'my-component',
  attributes: {
    variant: ['filled', 'stroke'],
    color: COLOR_OPTIONS,
    size: ['small', 'medium'],
  },
  /** has-icon: передан `icon` */
  states: ['has-icon'],
  parts: ['icon'],
})
```

Контракт инпута обычно состоит только из части `input-inner` (как `src/theme/contracts/text-input.ts`):

```ts
// src/theme/contracts/my-input.ts
import { defineContract } from '../contract'

export const myInputContract = defineContract({
  name: 'my-input',
  attributes: {},
  parts: ['input-inner'],
})
```

Правила:

- В контракт — только варианты, состояния и части. Нативные состояния не дублируются: скин использует `:disabled`, `:focus-visible`, `[aria-expanded]` и т. п.
- Если у компонента есть `color` — атрибут `color: COLOR_OPTIONS` (`src/types/colors.ts`). Корень получает `data-color`, а скин читает переменные `--pal-*` палитры из `palettes.css` (см. [`../architecture/styling.md`](../architecture/styling.md)).
- Контракт — публичный API: удалить или переименовать значение — breaking change, добавить — minor.

## 5. Типы из контракта

Варианты не пишутся вручную строковыми union-типами — они выводятся из контракта, как в `Button.types.ts`. Тогда пропы и скины не могут разойтись.

```ts
// MyComponent.types.ts
import type { HTMLAttributes, ReactNode } from 'react'
import { myComponentContract } from '@/theme/contracts/my-component'
import type { ContractValue } from '@/theme/contract'

// Варианты — из контракта скинов (src/theme/contracts/my-component.ts): пропсы и скины не расходятся.
type Values<K extends keyof typeof myComponentContract.attributes> = ContractValue<
  typeof myComponentContract,
  K
>

export type MyComponentVariant = Values<'variant'>
export type MyComponentColor = Values<'color'>
export type MyComponentSize = Values<'size'>

export const MY_COMPONENT_VARIANT_OPTIONS = myComponentContract.attributes.variant
export const MY_COMPONENT_COLOR_OPTIONS = myComponentContract.attributes.color
export const MY_COMPONENT_SIZE_OPTIONS = myComponentContract.attributes.size

export interface MyComponentProps extends HTMLAttributes<HTMLDivElement> {
  variant?: MyComponentVariant
  color?: MyComponentColor
  size?: MyComponentSize
  icon?: ReactNode
}
```

Массивы `*_OPTIONS` удобны в stories (контролы, галереи) и экспортируются наружу вместе с типами.

Для **input** — пропы выводятся из `InputField` + `BaseInput`:

```ts
import type { InputFieldProps } from '../base/InputField'
import type { BaseInputProps } from '../base/BaseInput'

export type MyInputProps = Omit<InputFieldProps, 'children'> &
  Omit<BaseInputProps, 'prefix' | 'size' | 'id' | 'disabled' | 'className'> & {
    /* свои пропы */
  }
```

## 6. Регистрация контракта

Контракт добавляется в `src/theme/contracts/index.ts` в трёх местах — импорт, общий `export { … }` и реестр `themeContracts` (по алфавиту, как соседние):

```ts
import { myComponentContract } from './my-component'

export {
  // …
  myComponentContract,
  // …
}

export const themeContracts = {
  // …
  myComponent: myComponentContract,
  // …
} as const
```

`themeContracts` — реестр контрактов всех компонентов (для проверки скинов и документации); он экспортируется из пакета вместе с `defineContract` / `contractAttrs` / `contractPart` / `contractSelector`.

## 7. Стили в скине

Файл `src/skins/corporate/components/<name>.css`. Образец — `src/skins/corporate/components/button.css`, правила написания скина целиком — [`../architecture/theming.md`](../architecture/theming.md).

**Один блок на файл.** Все правила компонента лежат внутри одного блока `:where([data-vl-skin~='corporate']) { … }`, который пишется один раз. Внутри — обычные селекторы на нативной вложенности CSS; префикс у каждого правила вручную не повторяется.

- Сборка (Vite / esbuild) разворачивает вложенность: `.vl-my-component` внутри блока превращается в `:where([data-vl-skin~='corporate']) .vl-my-component`. У `:where()` нулевая специфичность, поэтому правило весит ровно столько, сколько его внутренний селектор (`.vl-my-component` — 0,1,0), и приложение перебивает скин своим классом (CSS скина подключается раньше стилей приложения).
- `~=` совпадает с целым словом: в `data-vl-skin` лежит цепочка скинов через пробел (`"corporate brand"`, если `brand` расширяет `corporate`), поэтому правила базового и дочернего скина применяются вместе.
- Корень — `.vl-<name>`, часть — `.vl-<name>__<part>`, вариант — `[data-<attr>='<value>']`, состояние — `[data-<state>]`. Нативные состояния — псевдоклассами и ARIA: `:disabled`, `:focus-visible`, `[aria-expanded]`.
- Если элемент задаётся только атрибутом (вариант или состояние), класс подключается якорем `:where(.vl-<name>)` — он не добавляет веса: `:where(.vl-my-component)[data-variant='filled']` весит 0,1,0, и варианты разрешаются порядком правил.
- `@media` (в том числе `prefers-reduced-motion`) пишется **внутри** блока. `@keyframes` — **снаружи**, после блока: внутри правила они не допускаются. Имя анимации — с префиксом компонента, как в соседних файлах: `vl-<name>-<animation>` (`vl-tooltip-tooltipIn`, `vl-modal-panelEnter`).
- Цвета, радиусы, тени, z-index, длительности — только токены `var(--bg-*, --text-*, --stroke-*, --pal-*, --radius-*, --shadow-*, --z-*, --motion-*)`. Значения из `tokens.css` не дублируются в файле компонента. Семантические токены переопределены для тёмной схемы, поэтому отдельные dark-правила не нужны.
- В файле компонента нет `@import`: токены и палитры уже подключены в `index.css`.
- Нет `!important`.

```css
/* src/skins/corporate/components/my-component.css */

:where([data-vl-skin~='corporate']) {
  .vl-my-component {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border: 1px solid transparent;
    border-radius: var(--radius-8);
    font-family: inherit;
    transition:
      background-color var(--motion-duration-fast) var(--motion-ease-standard),
      border-color var(--motion-duration-fast) var(--motion-ease-standard),
      color var(--motion-duration-fast) var(--motion-ease-standard);
  }

  @media (prefers-reduced-motion: reduce) {
    .vl-my-component {
      transition: none;
    }
  }

  /* Варианты — только переменные палитры --pal-*; цвет задаёт [data-color] из palettes.css */
  :where(.vl-my-component)[data-variant='filled'] {
    background-color: var(--pal-base);
    border-color: var(--pal-base);
    color: var(--static-white);
  }

  :where(.vl-my-component)[data-variant='stroke'] {
    background-color: transparent;
    border-color: var(--pal-base);
    color: var(--pal-base);
  }

  /* Исключение для пары «цвет + вариант» */
  :where(.vl-my-component)[data-color='neutral'][data-variant='stroke'] {
    border-color: var(--stroke-soft-200);
    color: var(--text-sub-600);
  }

  /* Размер */
  :where(.vl-my-component)[data-size='small'] {
    border-radius: var(--radius-6);
  }

  /* Состояние */
  :where(.vl-my-component)[data-has-icon] {
    padding-inline-start: 6px;
  }

  /* Часть */
  .vl-my-component__icon {
    display: inline-flex;
  }
}
```

Если у компонента есть анимация — сама анимация и её отключение внутри блока, `@keyframes` после него (как в `tooltip.css`, `modal.css`):

```css
:where([data-vl-skin~='corporate']) {
  .vl-my-component__panel {
    animation: vl-my-component-fadeIn 0.2s var(--motion-ease-standard) both;
  }

  @media (prefers-reduced-motion: reduce) {
    .vl-my-component__panel {
      animation: none;
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

Для **input-компонента** — единственный override голого `<input>` (как `text-input.css`): селектор `input.vl-<name>__input-inner` весит 0,1,1 и перебивает `.vl-base-input` (0,1,0) без `!important`:

```css
/* src/skins/corporate/components/my-input.css */

:where([data-vl-skin~='corporate']) {
  input.vl-my-input__input-inner {
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

Файл подключается в `src/skins/corporate/index.css` — без этого стили не попадут ни в Storybook (`.storybook/preview.ts`), ни на сайт документации (`docs-site/.vitepress/theme/index.ts`), ни в собранный `dist/skins/corporate.css`:

```css
@import './components/my-component.css';
```

Порядок `@import` в `index.css` — это каскад при равной специфичности. Новый файл обычно ставится в конец списка, если ему не нужно уступать стилям другого компонента.

Файлы токенов (`tokens.css`, `shadows.css`, `primitives.css`, `components/base-input.variables.css`) устроены иначе. Вложенное правило без `&` выбирает только потомков элемента со скином, а переменные объявляются на самом `<html>` с `data-vl-skin` — поэтому там нет общего блока, а селекторы схем написаны явно. Токены в файл компонента не пишутся; если нескольким компонентам нужны общие переменные (как `--base-input-*`), образец — `components/base-input.variables.css`.

Ещё два места в скине, если они нужны:

- **Hover-ореол** для интерактивной кнопки — класс корня (или части) добавляется во все списки `:is(...)` в `src/skins/corporate/halo.css`.
- **Новый цвет палитры** — правило `[data-color='<name>']` с переменными `--pal-*` внутри общего блока `palettes.css` и значение в `COLOR_OPTIONS` (`src/types/colors.ts`).

Анимации отключаются в `@media (prefers-reduced-motion: reduce)` (см. [`accessibility.md`](accessibility.md)).

## 8. Тесты

`<Name>.test.tsx` рядом с компонентом. Минимум — проверка контракта: класс `vl-<name>` и data-атрибуты для заданных пропов (по образцу `Button contract` в `src/theme/theme.test.tsx`). Плюс тесты на нетривиальную логику, если она есть (внутреннее состояние, кастомные хуки).

```tsx
import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { contractPart } from '@/theme/contract'
import { myComponentContract } from '@/theme/contracts/my-component'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders contract class and data attributes', () => {
    render(<MyComponent data-testid="root" variant="stroke" size="small" color="error" />)
    const root = screen.getByTestId('root')
    expect(root).toHaveClass(myComponentContract.className)
    expect(root).toHaveAttribute('data-variant', 'stroke')
    expect(root).toHaveAttribute('data-size', 'small')
    expect(root).toHaveAttribute('data-color', 'error')
    expect(root).not.toHaveAttribute('data-has-icon')
  })

  it('renders icon part and has-icon state', () => {
    const { container } = render(<MyComponent data-testid="root" icon={<span />} />)
    expect(screen.getByTestId('root')).toHaveAttribute('data-has-icon', '')
    expect(container.querySelector(`.${contractPart(myComponentContract, 'icon')}`)).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<MyComponent ref={ref} />)
    expect(ref.current).toHaveClass('vl-my-component')
  })
})
```

Для поиска по селектору есть `contractSelector(contract, { … })` — он строит, например, `.vl-my-component[data-size='small'][data-has-icon]`.

Запуск: `npm run test:run -- src/components/<Group>/<Name>`.

## 9. Storybook

Минимум: `Playground` (интерактивный с локальным `useState`) и `Gallery — All States` (визуальный обзор). Шаблон — `src/components/inputs/TextInput/TextInput.stories.tsx`.

Ключевое:

- `tags: ['autodocs']` в `meta`.
- В `Playground` локальное состояние через `useState`, а не `useArgs` — `useArgs` ререндерит панель Controls на каждый ввод и подтормаживает.
- В `Gallery` — все визуальные состояния: empty, filled, disabled, error.
- Если в Storybook нужна иконка — она лежит в `src/stories/helpers.tsx` и переэкспортирует `@remixicon/react`. Сырых SVG в stories нет.
- Storybook оборачивает каждую story в `ThemeProvider` (`.storybook/preview.ts`); на панели инструментов есть переключатели «Скин» и «Схема». Компонент проверяется в обеих схемах — `light` и `dark`.

## 10. Экспорты

```ts
// src/components/<Group>/<Name>/index.ts
export { MyComponent } from './MyComponent'
export type {
  MyComponentProps,
  MyComponentVariant,
  MyComponentColor,
  MyComponentSize,
} from './MyComponent.types'
export {
  MY_COMPONENT_VARIANT_OPTIONS,
  MY_COMPONENT_COLOR_OPTIONS,
  MY_COMPONENT_SIZE_OPTIONS,
} from './MyComponent.types'
```

```ts
// src/components/<Group>/index.ts  (если группа пользуется barrel)
export * from './MyComponent'
```

```ts
// src/index.ts — добавить именованный экспорт компонента и его типов
export { MyComponent } from './components/<Group>/<Name>'
export type { MyComponentProps } from './components/<Group>/<Name>'
```

Исключения — компоненты, которые тянут опциональный peer (`imask`, `react-pdf`, `libphonenumber-js`, `marked` / `turndown`, `react-hook-form`). Они экспортируются **не из `src/index.ts`**, а из соответствующего sub-entry: `src/date.ts`, `src/phone.ts`, `src/pdf.ts`, `src/markdown.ts`, `src/adapters/index.ts`. Подробнее — в [`../architecture/bundling.md`](../architecture/bundling.md) и [`../reference/subpath-exports.md`](../reference/subpath-exports.md).

Стили отдельно не экспортируются: файл компонента попадает в CSS скина `dist/skins/corporate.css` через `src/skins/corporate/index.css`, а приложение подключает его одной строкой `import '@v-lab/ui-kit/skins/corporate.css'`.

## 11. RHF-адаптер (опционально)

Если у компонента есть `value`/`onChange` или `checked`/`onChange` пара — имеет смысл сделать обёртку через `createRHFAdapter`. Шаблон, маппер `value`/`checked`/`error` и куда экспортировать — в [`../architecture/adapters.md`](../architecture/adapters.md).

## 12. Документация на сайте

При публикации компонента наружу:

1. Markdown-страница в `docs-site/guide/components/<name>.md` с кратким описанием, импортом и одним живым примером. Интерактивное превью — `<ComponentDocsPreview name="<key>" />`: демо-компонент кладётся в `src/docs/vitepress/` и регистрируется под этим ключом в `componentDocsLoaders` (`src/docs/vitepress/componentDocsRegistry.ts`).
2. Та же страница на английском и узбекском — `docs-site/en/guide/components/<name>.md` и `docs-site/uz/guide/components/<name>.md`. Страницы ru/en/uz зеркалят друг друга: одинаковые разделы и примеры, переведённый текст.
3. Пункт в сайдбаре — `docs-site/.vitepress/sidebar.i18n.ts`. Сайдбар один на все локали (подписи на английском, префикс локали подставляется сам).
4. Строка в каталоге компонентов — [`../reference/components.md`](../reference/components.md).

VitePress не заменяет Storybook: туда выносится одно описание + один пример + prop-таблица, а не каждая story.

## 13. Запись в changelog

Любое изменение, заметное потребителю, фиксируется в двух местах: файлом дня `docs/changes/YYYY-MM/YYYY-MM-DD.md` со ссылкой в `README.md` месяца ([`../changes/`](../changes/README.md), внутренний лог) и пунктом в `docs-site/guide/changelog.md` под `## [Unreleased]` (публичный changelog). Правила — в [`../CONTRIBUTING.md`](../CONTRIBUTING.md).

## 14. Чек-лист перед PR

- [ ] `forwardRef` + `displayName`.
- [ ] Контракт `src/theme/contracts/<name>.ts` добавлен в `src/theme/contracts/index.ts` (импорт, `export`, `themeContracts`).
- [ ] Типы вариантов и `*_OPTIONS` выведены из контракта, а не продублированы вручную.
- [ ] Компонент не импортирует CSS; разметка — только `<contract>.className`, `contractAttrs`, `contractPart`.
- [ ] Стили — только в `src/skins/corporate/components/<name>.css`, внутри одного блока `:where([data-vl-skin~='corporate']) { … }` (`@keyframes` — снаружи); файл подключён в `src/skins/corporate/index.css`.
- [ ] Токены, не хардкод; нет `!important`; анимации под `prefers-reduced-motion`.
- [ ] Во время рендера нет обращений к `window` / `document` без проверки (SSR); `'use client'` не добавлен.
- [ ] Компонент проверен в схемах `light` и `dark`.
- [ ] Тест на класс `vl-<name>` и data-атрибуты.
- [ ] Storybook: минимум `Playground` + `Gallery`; `tags: ['autodocs']`.
- [ ] Экспорт из `src/index.ts` (или из sub-entry).
- [ ] `npm run build`, `npm run typecheck`, `npm run lint`, `npm run test:run` — без ошибок.
- [ ] Запись в [`../changes/`](../changes/README.md) (файл дня) + публичный changelog `docs-site/guide/changelog.md` → `[Unreleased]`.
- [ ] Если страница VitePress добавлена — она в `sidebar.i18n.ts` и есть в `en/`, `uz/`.
- [ ] Если меняется устройство слоя — обновлён соответствующий файл в `../architecture/` (правила в [`../CONTRIBUTING.md`](../CONTRIBUTING.md)).
