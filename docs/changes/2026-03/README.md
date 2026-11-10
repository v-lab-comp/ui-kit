# Март 2026

История версий до внедрения файлов дня — посекционно (формат Keep a Changelog). Сюда же отнесён первый срез `0.1.0` (без точной даты).

| Версия | Дата       | Кратко                                               |
| ------ | ---------- | ---------------------------------------------------- |
| 0.4.1  | 2026-03-17 | Фикс переполнения текста в карточках                 |
| 0.4.0  | 2026-03-17 | Table (пагинация), Tabs, Layout (sticky header)      |
| 0.3.0  | 2026-03-11 | Оптимизация размера бандла                           |
| 0.2.0  | 2026-03-11 | Subpath exports `/date`, `/phone`; `preserveModules` |
| 0.1.0  | initial    | Первый срез компонентов                              |

---

## [0.4.1] — 2026-03-17

### Fixed

- Переполнение текста: **`SidebarCard`**, **`HeaderCard`**, **`UserProfileCard`** — корректное обрезание/перенос без вылезания за границы карточек.

---

## [0.4.0] — 2026-03-17

### Added

- **`Table`** — таблица с **пагинацией** и галереей состояний в Storybook.
- **`Tabs`** — compound-компонент (`Tabs.Tab`, `Tabs.Panel` и связка с ARIA).
- **Layout**: высота **header 88px**, **sticky**-поведение, **`LayoutRoot`**, согласование **z-index** сайдбара с остальной шапкой.

### Fixed

- **Sidebar**: иконка дропдауна не показывается, если нет опций; триггер сворачивания в шапке при отсутствии дропдауна; исправление **TS** при `as="div"` у **`SidebarCard`** (раздельный рендер кнопки/`div`).

### Changed

- **Документация**: гайды **установки и публикации** (`MAINTAINER`, `DEVELOPER`), в **README** — зависимости потребителя и полная команда установки.

---

## [0.3.0] — 2026-03-11

### Changed

- **Производительность бандла**: оптимизация размера артефактов — порядка **~6.9 MB → ~1.8 MB** в `dist`, точка входа **main** **~528 KB → ~84 KB** (дерево модулей и разбиение чанков).

---

## [0.2.0] — 2026-03-11

### Added

- `DateInput` separate subpath export (`/date`) — optional peer `react-imask`
- `PhoneInput` separate subpath export (`/phone`) — optional peer `react-phone-number-input`
- `preserveModules: true` for both ESM and CJS output — full tree-shaking support
- `sourcemap: true` for easier debugging of library consumers
- z-index token scale in tokens.css: `--z-base`, `--z-raised`, `--z-sticky`, `--z-sidebar`, `--z-dropdown`, `--z-overlay`, `--z-toast`
- `displayName` on all 28+ public components for React DevTools
- **SidebarContext** — состояние свёрнутого сайдбара через контекст, без ручного prop drilling `collapsed`
- Tabs: ARIA accessibility (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls`, `aria-labelledby`, `useId`)

### Fixed

- ButtonGroup: removed `!important`, replaced with `--btn-radius` CSS custom property
- Badge: removed `line-height: 14px !important` — child elements now inherit line-height
- AvatarGroup: React keys now use `child.key` when available instead of always using array index
- Toast actions: React keys now use `action.key` when available

### Changed

- `minify: true` in production build (was accidentally disabled)
- z-index values replaced with semantic tokens in all 6 layout/overlay files

---

## [0.1.0] — initial

Сводка первого среза; **Table** и **Tabs** в составе, соответствующем текущему API, зафиксированы в **[0.4.0]**.

### Added

- Button, ButtonGroup, Badge, Typography
- Accordion, Avatar, AvatarCard, AvatarGroup
- Breadcrumb, ContentDivider
- Toast, ToastSlot, ToastAction
- Tabs (compound: Tabs.Tab, Tabs.Panel)
- Table with pagination
- Sidebar system: Sidebar, SidebarLayout, SidebarHeader, SidebarHeaderCard, SidebarFooter, SidebarItem, SidebarCard, SidebarUserProfileCard, SidebarSection
- TextInput, EmailInput, DateInput, SelectInput, SiteInput, ShareLinkInput, PhoneInput
- Checkbox, CheckboxField
- Calendar
- PageHeader
- RHF adapters: RHFCheckbox
- CSS design tokens, shadow tokens, color palette
- Storybook 7 with autodocs
- Vitest + React Testing Library setup
