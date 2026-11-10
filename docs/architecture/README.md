# Архитектура

Как устроен код пакета: слои, правила зависимостей, паттерны по группам компонентов, стилизация и сборка.

| Файл                         | Что внутри                                                                                                                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [`overview.md`](overview.md) | Слои `src/`, правила зависимостей, стек                                                                                    |
| [`inputs.md`](inputs.md)     | Паттерн `InputField` + `BaseInput`, чекбоксы, composite-инпуты                                                             |
| [`overlays.md`](overlays.md) | Floating UI, `ModalProvider`, scroll lock, паттерн Modal/Drawer/Popover/Tooltip                                            |
| [`layout.md`](layout.md)     | Каркас приложения: `LayoutRoot`, `Sidebar`, `Header`, `PageHeader`, `Drawer`                                               |
| [`styling.md`](styling.md)   | Компоненты без CSS, скин `corporate`, токены, палитры `[data-color]`, CSS скина для потребителя, генерация `primitives.ts` |
| [`theming.md`](theming.md)   | Скины × цветовые схемы, `ThemeProvider`, SSR (`themeHtmlAttributes`), контракты, правила написания скина                   |
| [`bundling.md`](bundling.md) | Vite + Rollup, ESM, external, sub-entry points, отдельный CSS на скин                                                      |
| [`adapters.md`](adapters.md) | `createRHFAdapter`, паттерн адаптеров для `react-hook-form`                                                                |
