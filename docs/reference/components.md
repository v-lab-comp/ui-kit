# Каталог компонентов

Все публичные компоненты пакета: имя экспорта, sub-entry для импорта, RHF-адаптер при наличии. Источник правды — `src/index.ts` (и `src/date.ts`, `src/phone.ts`, `src/pdf.ts`, `src/markdown.ts`, `src/adapters/index.ts`, `src/icons.ts`, `src/flags.ts`, `src/skins/corporate/index.ts`).

Компоненты без стилей: оформление даёт скин — `import '@v-lab/ui-kit/skins/corporate.css'` плюс `ThemeProvider skins={[corporateSkin]}` (или `data-vl-skin="corporate"` на `<html>`). У каждого компонента есть контракт в `src/theme/contracts/` (класс `vl-<name>`, части, data-атрибуты) и файл стилей `src/skins/corporate/components/<name>.css`.

API компонентов, пропы и примеры — в Storybook (`npm run storybook`) и на сайте VitePress (`npm run docs:dev`, `docs-site/guide/components/`).

## Inputs

| Компонент                                   | Импорт                   | RHF-адаптер    |
| ------------------------------------------- | ------------------------ | -------------- |
| `TextInput`                                 | `@v-lab/ui-kit`          | `RHFTextInput` |
| `EmailInput`                                | `@v-lab/ui-kit`          | —              |
| `PasswordInput`                             | `@v-lab/ui-kit`          | —              |
| `SearchInput`                               | `@v-lab/ui-kit`          | —              |
| `TagInput`                                  | `@v-lab/ui-kit`          | `RHFTagInput`  |
| `RichInput`                                 | `@v-lab/ui-kit`          | —              |
| `MarkdownInput`                             | `@v-lab/ui-kit/markdown` | —              |
| `DateInput`                                 | `@v-lab/ui-kit/date`     | —              |
| `PhoneInput`                                | `@v-lab/ui-kit/phone`    | —              |
| `SelectInput`                               | `@v-lab/ui-kit`          | —              |
| `AsyncSearchSelect`                         | `@v-lab/ui-kit`          | —              |
| `Checkbox`, `CheckboxField`, `CheckboxCard` | `@v-lab/ui-kit`          | `RHFCheckbox`  |
| `SiteInput`                                 | `@v-lab/ui-kit`          | —              |
| `ShareLinkInput`                            | `@v-lab/ui-kit`          | —              |

Внутренние примитивы тоже доступны для расширения: `BaseInput`, `BaseCheckbox`, `InputField`, хук `useCompositeInput`. Паттерн — в [`../architecture/inputs.md`](../architecture/inputs.md).

## Overlays

| Компонент                                                                                                                                                                              | Импорт          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Modal` + `ModalHeader` / `ModalBody` / `ModalFooter` (и варианты `ModalFooterConfirmActions`, `ModalFooterInfo`, `ModalFooterStepDots`, `ModalFooterLinkButton`, `ModalFooterSwitch`) | `@v-lab/ui-kit` |
| `ConfirmModal`, `ModalStatus`                                                                                                                                                          | `@v-lab/ui-kit` |
| `ModalProvider`                                                                                                                                                                        | `@v-lab/ui-kit` |
| `Popover`                                                                                                                                                                              | `@v-lab/ui-kit` |
| `Tooltip`                                                                                                                                                                              | `@v-lab/ui-kit` |

Drawer относится к layout-каркасу — см. ниже. Устройство всех оверлеев — в [`../architecture/overlays.md`](../architecture/overlays.md).

## Layout

| Компонент                                                                                                                                                                                                      | Импорт          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `LayoutRoot`                                                                                                                                                                                                   | `@v-lab/ui-kit` |
| `PageHeader`                                                                                                                                                                                                   | `@v-lab/ui-kit` |
| `Sidebar`, `SidebarLayout`, `SidebarMain`, `SidebarContent`, `SidebarSection`, `SidebarTrigger`, `SidebarItem`, `SidebarCard`, `SidebarHeader`, `SidebarHeaderCard`, `SidebarFooter`, `SidebarUserProfileCard` | `@v-lab/ui-kit` |
| `SidebarInset`, `SidebarInsetContent`                                                                                                                                                                          | `@v-lab/ui-kit` |
| `Drawer` + `DrawerHeader` / `DrawerBody` / `DrawerFooter`                                                                                                                                                      | `@v-lab/ui-kit` |

Паттерн сборки layout и подкомпонентов — в [`../architecture/layout.md`](../architecture/layout.md).

## Отдельные UI

| Компонент                                                            | Импорт              |
| -------------------------------------------------------------------- | ------------------- |
| `Button`, `ButtonGroup`                                              | `@v-lab/ui-kit`     |
| `Badge`                                                              | `@v-lab/ui-kit`     |
| `Tag`                                                                | `@v-lab/ui-kit`     |
| `Box`                                                                | `@v-lab/ui-kit`     |
| `UiKitRoot`                                                          | `@v-lab/ui-kit`     |
| `Typography`                                                         | `@v-lab/ui-kit`     |
| `Avatar`, `AvatarGroup`, `AvatarCard`                                | `@v-lab/ui-kit`     |
| `Breadcrumbs` + `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage` | `@v-lab/ui-kit`     |
| `Accordion`                                                          | `@v-lab/ui-kit`     |
| `Tabs`                                                               | `@v-lab/ui-kit`     |
| `Table`                                                              | `@v-lab/ui-kit`     |
| `Toast`, `ToastAction`, `ToastProvider`                              | `@v-lab/ui-kit`     |
| `ContentDivider`                                                     | `@v-lab/ui-kit`     |
| `Calendar` + `CalendarHeader`, `CalendarGrid`, `CalendarDay`         | `@v-lab/ui-kit`     |
| `FileUpload` (`FileUploadField`, `FileUploadItem`, `FileDropZone`)   | `@v-lab/ui-kit`     |
| `PdfPreview`                                                         | `@v-lab/ui-kit/pdf` |
| `CommentRichInput`, `CommentsSection`                                | `@v-lab/ui-kit`     |
| `AppSwitcher`                                                        | `@v-lab/ui-kit`     |
| `LanguageSwitcher`                                                   | `@v-lab/ui-kit`     |
| `SegmentedControl`, `SegmentedControlItem`                           | `@v-lab/ui-kit`     |
| `ToggleButton`, `ToggleGroup`                                        | `@v-lab/ui-kit`     |

## Темы и скины

| Имя                                                                                                                                                                                       | Откуда                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `ThemeProvider`, `useTheme`                                                                                                                                                               | `@v-lab/ui-kit`                     |
| `defineSkin`, `skinChain`, `themeHtmlAttributes` (атрибуты `<html>` для SSR)                                                                                                              | `@v-lab/ui-kit`                     |
| `defineContract`, `contractAttrs`, `contractPart`, `contractSelector`, `themeContracts`, `buttonContract`                                                                                 | `@v-lab/ui-kit`                     |
| Типы `ThemeProviderProps`, `ThemeContextValue`, `Skin`, `ColorScheme`, `ColorSchemePreference`, `ThemeHtmlAttributes`, `Contract`, `ContractDefinition`, `ContractValue`, `ContractInput` | `@v-lab/ui-kit`                     |
| `corporateSkin`                                                                                                                                                                           | `@v-lab/ui-kit/skins/corporate`     |
| CSS скина corporate                                                                                                                                                                       | `@v-lab/ui-kit/skins/corporate.css` |

Устройство — в [`../architecture/theming.md`](../architecture/theming.md).

## Хуки и константы

| Имя                                                                                                                                                                                                       | Откуда               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `useClickOutside`, `useTabsSearchParam`                                                                                                                                                                   | `@v-lab/ui-kit`      |
| `useTheme`                                                                                                                                                                                                | `@v-lab/ui-kit`      |
| `useSidebar`                                                                                                                                                                                              | `@v-lab/ui-kit`      |
| `useToast`                                                                                                                                                                                                | `@v-lab/ui-kit`      |
| `useCompositeInput`                                                                                                                                                                                       | `@v-lab/ui-kit`      |
| `COLOR_OPTIONS`, `Color`                                                                                                                                                                                  | `@v-lab/ui-kit`      |
| `formatFileSize`, `fileToUploadFile`, `uploadFilesToNativeFiles`                                                                                                                                          | `@v-lab/ui-kit`      |
| `formatCommentDayDivider`, `mergeCommentsSectionStrings`, `mergeCommentsSectionStringsFromJson`, `DEFAULT_COMMENTS_SECTION_STRINGS`, `COMMENTS_SECTION_STRING_KEYS`, `DEFAULT_COMMENT_RICH_INPUT_ARIA_EN` | `@v-lab/ui-kit`      |
| Утилиты `DateInput`: `formatMaskedToIso`, `formatIsoToMasked`, `parseMaskedDateString`, `formatDateToMasked`                                                                                              | `@v-lab/ui-kit/date` |
| `getPdfWorkerUrl`                                                                                                                                                                                         | `@v-lab/ui-kit/pdf`  |

Только публичные хуки описываются подробно — в [`hooks.md`](hooks.md).

## RHF-адаптеры

| Адаптер        | Обёртка над     |
| -------------- | --------------- |
| `RHFTextInput` | `TextInput`     |
| `RHFTagInput`  | `TagInput`      |
| `RHFCheckbox`  | `CheckboxField` |

Все — из `@v-lab/ui-kit/adapters`. Устройство и шаблон нового адаптера — в [`../architecture/adapters.md`](../architecture/adapters.md).
