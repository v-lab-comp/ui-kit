# Обзор архитектуры

## Слои `src/`

```
src/
├── components/
│   ├── inputs/        — формы: примитивы (base/), готовые поля, composite-инпуты
│   ├── overlays/      — Modal, Popover, Tooltip на @floating-ui/react
│   ├── layout/        — PageHeader (Header/), Sidebar, SidebarInset, LayoutRoot, Drawer
│   └── <остальные>/   — отдельные компоненты (Button, Badge, Table, Toast, Calendar, …)
├── adapters/rhf/      — обёртки для react-hook-form через createRHFAdapter
├── hooks/             — публичные хуки (dom/, tabs/)
├── theme/             — ThemeProvider / useTheme, defineSkin, контракты компонентов (contracts/)
├── skins/            — скины, по папке на скин (сейчас один — corporate/): манифест index.ts, токены, палитры,
│                        halo, components/*.css, index.css в порядке каскада; сборка → dist/skins/<name>.{js,css}
├── colors/            — сгенерированный из CSS модуль primitives.ts
├── types/             — Color, COLOR_OPTIONS
├── stories/           — общие хелперы для Storybook
├── utils/             — formatSize, scrollLock, customPalette
├── docs/              — демо-страницы Storybook и превью для VitePress (vitepress/); в пакет не входят
└── index.ts, date.ts, phone.ts, pdf.ts, markdown.ts, icons.ts, flags.ts, adapters/index.ts, skins/<name>/index.ts
                       — публичные entry points (папки скинов с index.ts находятся сборкой автоматически)
```

Каждый компонент в `components/` лежит в собственной папке: `Component.tsx`, `Component.types.ts`, `Component.stories.tsx`, `index.ts`. Стилей рядом с компонентом нет: контракт — `src/theme/contracts/<name>.ts`, стили — `src/skins/corporate/components/<name>.css`. Тесты `Component.test.tsx` — только там, где есть нетривиальная логика.

Демо-страницы в `src/docs/` (галереи для Storybook и VitePress) используют CSS Modules — это не часть пакета, и правило «компоненты без CSS» на них не распространяется.

## Правила зависимостей

```
потребитель пакета
    ↓
src/index.ts (и sub-entry: date.ts / phone.ts / pdf.ts / markdown.ts / icons.ts / flags.ts / adapters/index.ts)
    ↓
adapters/ (обёртки над готовыми компонентами)
    ↓
components/* (включая inputs/, overlays/, layout/)
    ↓
hooks/, base/, utils/
    ↓
theme/ (контракты), colors/, types/

skins/<name>/ (entry skins/<name>/index.ts) → theme/skin.ts + CSS скина (отдельный dist/skins/<name>.css)
```

- **Компоненты не зависят друг от друга «по горизонтали».** Если двум компонентам нужна общая логика — она выносится в `hooks/`, `utils/` или в `base/` соответствующей группы (`inputs/base/`, `overlays/Modal/ModalProvider/`, и т.д.).
- **`base/` — внутреннее API группы.** `inputs/base/BaseInput`, `inputs/base/InputField` и подобные не предназначены для прямого использования потребителем; они уже подразумеваются внутри готовых компонентов (TextInput, EmailInput, и т.д.).
- **Компоненты не импортируют CSS и скины.** Связь компонента со скином — только контракт (`src/theme/contracts/<name>.ts`): класс `vl-<name>`, части `vl-<name>__<part>`, data-атрибуты. Скин — только CSS плюс манифест `defineSkin`; логики в скине нет. Подробно — в [`theming.md`](theming.md).

## Стек

| Слой          | Технология                                      | Назначение                                                                                                                                 |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Runtime       | React 18                                        | UI-framework                                                                                                                               |
| Язык          | TypeScript (strict)                             | Тип-чек по всему пакету                                                                                                                    |
| Сборка        | Vite + Rollup                                   | Несколько entry points, только ESM, `preserveModules`                                                                                      |
| Стили         | Unstyled-компоненты + скины (`src/skins/`)      | Компоненты рендерят классы `vl-*` и data-атрибуты из контракта; оформление — в CSS скина `corporate` (`@v-lab/ui-kit/skins/corporate.css`) |
| Темы          | `ThemeProvider` (`src/theme/`)                  | Скин и цветовая схема (`light` / `dark` / `system`) через `data-vl-skin` / `data-vl-scheme` на `<html>`                                    |
| Дизайн-токены | CSS Custom Properties                           | `--bg-*`, `--text-*`, `--stroke-*`, `--primary-*`, `--radius-*`, `--shadow-*`, `--z-*`                                                     |
| Оверлеи       | `@floating-ui/react`                            | Позиционирование, focus trap, dismiss                                                                                                      |
| Иконки        | `@remixicon/react`                              | Внутреннее использование + sub-entry `./icons`                                                                                             |
| Маски ввода   | `imask` / `react-imask`                         | `DateInput`, `PhoneInput` (опциональные peer)                                                                                              |
| Телефоны      | `libphonenumber-js`, `react-phone-number-input` | `PhoneInput` (опциональные peer)                                                                                                           |
| PDF           | `react-pdf` + `pdfjs-dist`                      | `PdfPreview` (опциональные peer)                                                                                                           |
| Документация  | Storybook 8, VitePress                          | Среда разработки + публичный сайт                                                                                                          |
| Тесты         | Vitest + React Testing Library, Playwright      | Unit + e2e                                                                                                                                 |

Подробно про peer-зависимости и sub-entry — в [`bundling.md`](bundling.md) и [`../reference/subpath-exports.md`](../reference/subpath-exports.md).

## Группы компонентов

| Группа       | Где живёт                  | Паттерн                                                          |
| ------------ | -------------------------- | ---------------------------------------------------------------- |
| Inputs       | `src/components/inputs/`   | См. [`inputs.md`](inputs.md)                                     |
| Overlays     | `src/components/overlays/` | См. [`overlays.md`](overlays.md)                                 |
| Layout       | `src/components/layout/`   | См. [`layout.md`](layout.md)                                     |
| Отдельные UI | `src/components/<Name>/`   | `forwardRef` + `displayName` + контракт + стили в скине (токены) |

Каталог всех компонентов с entry points и ссылками на страницы VitePress — в [`../reference/components.md`](../reference/components.md).
