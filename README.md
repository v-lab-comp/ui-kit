<div align="center">

# V-Lab UI Kit

**Unstyled React-компоненты со скинами.**
Компонент отвечает за структуру, поведение и доступность, скин — за внешний вид.
Светлая и тёмная схема — из коробки.

![version](https://img.shields.io/badge/version-0.15.0-335cff)
![react](https://img.shields.io/badge/React-%E2%89%A517-61dafb?logo=react&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![esm](https://img.shields.io/badge/ESM-only-f7df1e)

[Установка](#установка) · [Быстрый старт](#быстрый-старт) · [Темы и скины](#темы-и-скины) · [Компоненты](#компоненты) · [Документация](#документация) · [GitHub](https://github.com/v-lab-comp/ui-kit)

</div>

---

## Возможности

- **Unstyled + скины.** Компоненты не содержат CSS: они рендерят стабильные классы `vl-<name>`, части `vl-<name>__<part>` и data-атрибуты. Всё оформление — в скине. В комплекте скин **corporate**.
- **Светлая и тёмная схема.** `light`, `dark` или `system`; выбор переключается в рантайме и может запоминаться.
- **Типизированные контракты.** Варианты, состояния и части каждого компонента описаны контрактом. По нему пишется скин, из него же выводятся типы пропсов.
- **Всё на токенах.** Цвета, отступы, радиусы, тени и `z-index` задаются CSS-переменными. Литералов в стилях компонентов нет.
- **Composition-first.** Каждое поле — это `InputField` (label, hint, error, prefix/suffix) вокруг примитива `BaseInput`. Составные поля строятся на `useCompositeInput`.
- **Оверлеи с общим стеком.** `Modal`, `Drawer`, `Popover` и `Tooltip` построены на `@floating-ui/react`. Escape и клик снаружи срабатывают только у верхнего оверлея.
- **Лёгкий основной бандл.** Только ESM с `preserveModules`. Тяжёлые зависимости (`imask`, `libphonenumber-js`, `react-pdf`, `marked`, `react-hook-form`) вынесены в отдельные точки входа.

## Установка

Registry для пакета пока не выбран ([`docs/tech-debt/package-registry.md`](docs/tech-debt/package-registry.md)), поэтому сейчас пакет ставится из локального tarball:

```bash
# в репозитории кита
npm install
npm run build && npm pack   # → v-lab-ui-kit-<version>.tgz

# в приложении: пакет из tarball и обязательные peer-зависимости
npm install /path/to/v-lab-ui-kit-<version>.tgz react react-dom @remixicon/react clsx @floating-ui/react
```

Какие peer-зависимости нужны для отдельных точек входа и как подключать пакет при SSR, описано в [`docs/guides/installation.md`](docs/guides/installation.md).

## Быстрый старт

```tsx
import '@v-lab/ui-kit/skins/corporate.css' // CSS скина — первой строкой, до стилей приложения
import { Button, TextInput, ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

export function App() {
  return (
    <ThemeProvider skins={[corporateSkin]} defaultColorScheme="system" storageKey="app-theme">
      <TextInput label="Email" placeholder="you@example.com" />
      <Button>Продолжить</Button>
    </ThemeProvider>
  )
}
```

`ThemeProvider` ставит на `<html>` атрибуты `data-vl-skin` и `data-vl-scheme`, поэтому тема доходит и до порталов (модалки, тосты, поповеры). Без CSS скина или без этих атрибутов компоненты отрисуются без оформления.

## Темы и скины

**Переключение схемы:**

```tsx
import { useTheme } from '@v-lab/ui-kit'

function ThemeSwitch() {
  const { resolvedColorScheme, setColorScheme } = useTheme()
  return (
    <button onClick={() => setColorScheme(resolvedColorScheme === 'dark' ? 'light' : 'dark')}>
      {resolvedColorScheme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    </button>
  )
}
```

**Без React-провайдера** (SSR-шаблон, не-React-обвязка) достаточно атрибутов: `<html data-vl-skin="corporate" data-vl-scheme="dark">`.

**Точечная настройка.** Префикс скина `:where([data-vl-skin~='corporate'])` не добавляет селектору веса. Поэтому правило с тем же селектором, подключённое после CSS скина, перекрывает скин:

```css
.vl-button {
  border-radius: 999px;
}
```

**Свой скин.** Скин — это CSS по контрактам компонентов плюс манифест. Префикс пишется один раз на файл, правила — внутри блока:

```css
/* brand.css */
:where([data-vl-skin~='brand']) {
  .vl-button {
    border-radius: 999px;
  }
  .vl-button[data-variant='filled'] {
    background: var(--brand-500);
  }
}
```

```ts
import { defineSkin } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import './brand.css'

export const brandSkin = defineSkin({
  name: 'brand',
  schemes: ['light', 'dark'],
  extends: corporateSkin, // на <html> будет data-vl-skin="corporate brand": работают оба скина
})
```

Скин может наследовать другой (`extends`) и подгружаться лениво (`load: () => import('./brand.css')`). В бандл приложения попадают только те скины, которые оно импортирует. Правила селекторов, контракты и реестр `themeContracts` описаны в [`docs/architecture/theming.md`](docs/architecture/theming.md).

**SSR.** Компоненты рендерятся на сервере. Чтобы стили работали с первого кадра, до гидрации, поставьте атрибуты темы на серверный `<html>`:

```tsx
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

<html lang="ru" {...themeHtmlAttributes(corporateSkin, 'light')}>
```

В Next.js App Router пока нужен свой файл-прослойка с `'use client'` для импорта компонентов — см. [`docs/tech-debt/use-client-directive.md`](docs/tech-debt/use-client-directive.md).

## Компоненты

| Группа         | Компоненты                                                                                                                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Действия       | `Button`, `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `SegmentedControl`                                                                                                                         |
| Поля ввода     | `TextInput`, `EmailInput`, `PasswordInput`, `SearchInput`, `SiteInput`, `ShareLinkInput`, `TagInput`, `RichInput`, `SelectInput`, `AsyncSearchSelect`, `Checkbox`, `CheckboxField`, `CheckboxCard` |
| Основа полей   | `InputField`, `BaseInput`, `BaseCheckbox`, `useCompositeInput`                                                                                                                                     |
| Оверлеи        | `Modal` (+ `ConfirmModal`, `ModalStatus`, `ModalProvider`), `Drawer`, `Popover`, `Tooltip`, `Toast` (`ToastProvider`, `useToast`)                                                                  |
| Layout         | `LayoutRoot`, `Sidebar*`, `SidebarInset`, `PageHeader`, `AppSwitcher`, `LanguageSwitcher`                                                                                                          |
| Данные         | `Table`, `Tabs`, `Accordion`, `Breadcrumbs`, `Calendar`, `Badge`, `Tag`, `Avatar`, `AvatarGroup`, `AvatarCard`, `Typography`, `ContentDivider`, `Box`                                              |
| Файлы, контент | `FileDropZone`, `FileUploadField`, `FileUploadItem`, `CommentsSection`, `CommentRichInput`                                                                                                         |
| Тема           | `ThemeProvider`, `useTheme`, `defineSkin`, `defineContract`, `themeContracts`                                                                                                                      |

Полный каталог с пропсами: [`docs/reference/components.md`](docs/reference/components.md), Storybook и сайт документации.

## Точки входа

| Импорт                              | Что внутри                                          | Peer-зависимости                                                       |
| ----------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| `@v-lab/ui-kit`                     | Основные компоненты, хуки, `ThemeProvider`          | `react`, `react-dom`, `@remixicon/react`, `clsx`, `@floating-ui/react` |
| `@v-lab/ui-kit/skins/corporate.css` | CSS скина corporate                                 | —                                                                      |
| `@v-lab/ui-kit/skins/corporate`     | Манифест скина `corporateSkin`                      | —                                                                      |
| `@v-lab/ui-kit/date`                | `DateInput`                                         | `imask`, `react-imask`                                                 |
| `@v-lab/ui-kit/phone`               | `PhoneInput`                                        | `libphonenumber-js`, `react-phone-number-input`                        |
| `@v-lab/ui-kit/pdf`                 | `PdfPreview`                                        | `react-pdf`, `pdfjs-dist`                                              |
| `@v-lab/ui-kit/markdown`            | `MarkdownInput`, `markdownToHtml`, `htmlToMarkdown` | `marked`, `turndown`                                                   |
| `@v-lab/ui-kit/adapters`            | `RHFTextInput`, `RHFCheckbox`, `RHFTagInput`        | `react-hook-form`                                                      |
| `@v-lab/ui-kit/icons`               | `SvgIcon`                                           | —                                                                      |
| `@v-lab/ui-kit/flags`               | 262 флага стран и регионов                          | —                                                                      |

Подробнее: [`docs/reference/subpath-exports.md`](docs/reference/subpath-exports.md).

## Разработка

```bash
git clone git@github.com:v-lab-comp/ui-kit.git
cd ui-kit
npm install
npm run storybook     # http://localhost:6006 — основная среда разработки
npm run docs:dev      # http://localhost:5173 — сайт документации (VitePress)
npm run test:run      # unit-тесты (Vitest)
npm run test:e2e      # e2e (Playwright)
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
npm run build         # сборка dist/
```

```
src/
├── components/   компоненты (unstyled): inputs/, overlays/, layout/, …
├── theme/        ThemeProvider, useTheme, defineSkin, контракты компонентов
├── skins/        скины; corporate/ — токены, палитры и стили всех компонентов
├── adapters/     react-hook-form → @v-lab/ui-kit/adapters
└── index.ts      основная точка входа (+ date, phone, pdf, markdown, icons, flags)
```

Палитра цветов хранится в `src/skins/corporate/primitives.css`. Файл `src/colors/primitives.ts` генерируется из неё: после правок запустите `npm run gen:primitives`.

## Документация

| Что нужно                               | Где                                                               |
| --------------------------------------- | ----------------------------------------------------------------- |
| API компонентов и интерактивные примеры | Storybook (`npm run storybook`) и сайт [`docs-site/`](docs-site/) |
| Темы, скины, контракты                  | [`docs/architecture/theming.md`](docs/architecture/theming.md)    |
| Архитектура, гайды, справочники         | [`docs/`](docs/README.md)                                         |
| Новый компонент — пошагово              | [`docs/guides/new-component.md`](docs/guides/new-component.md)    |
| Миграции между версиями                 | [`docs/guides/migrations.md`](docs/guides/migrations.md)          |
| Известный технический долг              | [`docs/tech-debt/`](docs/tech-debt/README.md)                     |
| Публичный changelog                     | [`docs-site/guide/changelog.md`](docs-site/guide/changelog.md)    |
| Внутренний лог изменений                | [`docs/changes/`](docs/changes/README.md)                         |
| Правила кода и команды (для AI-агентов) | [`CLAUDE.md`](CLAUDE.md)                                          |

## Вклад

Базовая ветка — `dev` (не `main`). Префиксы веток, требования к PR и правила документации описаны в [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md). Версии выпускает мейнтейнер, процесс — в [`docs/guides/publishing.md`](docs/guides/publishing.md); публикация в registry пока не настроена.
