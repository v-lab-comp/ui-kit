# Sub-entry points

Пакет публикует несколько entry points через поле `exports` в `package.json`. Это сделано, чтобы тяжёлые опциональные peer-зависимости (`imask`, `libphonenumber-js`, `react-pdf`, `react-hook-form`) не попадали в основной граф потребителя. Зачем именно так — в [`../architecture/bundling.md`](../architecture/bundling.md).

## Все entry points

| Импорт                              | Что внутри                                                                                                                                                               | Обязательные peer-зависимости                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `@v-lab/ui-kit`                     | Основные компоненты: Button, TextInput, Modal, Drawer, Popover, Sidebar, Table, Toast и др.; `ThemeProvider`, `useTheme`, `defineSkin`, `themeHtmlAttributes`, контракты | `react`, `react-dom`, `clsx`, `@remixicon/react`, `@floating-ui/react` |
| `@v-lab/ui-kit/date`                | `DateInput`, утилиты дат: `formatMaskedToIso`, `formatIsoToMasked`, `parseMaskedDateString`, `formatDateToMasked`                                                        | `imask`, `react-imask`                                                 |
| `@v-lab/ui-kit/phone`               | `PhoneInput`, утилиты стран/номеров                                                                                                                                      | `libphonenumber-js`, `react-phone-number-input`                        |
| `@v-lab/ui-kit/pdf`                 | `PdfPreview`, `getPdfWorkerUrl`                                                                                                                                          | `react-pdf`, `pdfjs-dist`                                              |
| `@v-lab/ui-kit/markdown`            | `MarkdownInput`, конвертеры `markdownToHtml`, `htmlToMarkdown`                                                                                                           | `marked`, `turndown`                                                   |
| `@v-lab/ui-kit/adapters`            | `RHFTextInput`, `RHFTagInput`, `RHFCheckbox`                                                                                                                             | `react-hook-form`                                                      |
| `@v-lab/ui-kit/icons`               | Переэкспорт `@remixicon/react` + `SvgIcon`                                                                                                                               | `@remixicon/react`                                                     |
| `@v-lab/ui-kit/flags`               | SVG-флаги стран (используются `PhoneInput`)                                                                                                                              | —                                                                      |
| `@v-lab/ui-kit/skins/corporate`     | `corporateSkin` — манифест скина corporate для `ThemeProvider skins={[…]}` и `themeHtmlAttributes`; CSS не подключает                                                    | —                                                                      |
| `@v-lab/ui-kit/skins/corporate.css` | CSS скина corporate целиком (токены, палитры, стили всех компонентов) — подключить один раз в корне приложения, до своих стилей                                          | —                                                                      |

Как пути отображаются на `dist/` (поле `exports` в `package.json`):

| Ключ `exports`  | Файлы                                                                             |
| --------------- | --------------------------------------------------------------------------------- |
| `.`             | `types` → `./dist/index.d.ts`, `default` → `./dist/index.js`                      |
| `./icons`       | `types` → `./dist/icons.d.ts`, `default` → `./dist/icons.js`                      |
| `./flags`       | `types` → `./dist/flags.d.ts`, `default` → `./dist/flags.js`                      |
| `./phone`       | `types` → `./dist/phone.d.ts`, `default` → `./dist/phone.js`                      |
| `./date`        | `types` → `./dist/date.d.ts`, `default` → `./dist/date.js`                        |
| `./pdf`         | `types` → `./dist/pdf.d.ts`, `default` → `./dist/pdf.js`                          |
| `./markdown`    | `types` → `./dist/markdown.d.ts`, `default` → `./dist/markdown.js`                |
| `./adapters`    | `types` → `./dist/adapters.d.ts`, `default` → `./dist/adapters.js`                |
| `./skins/*.css` | `./dist/skins/*.css` — CSS скина                                                  |
| `./skins/*`     | `types` → `./dist/skins/*.d.ts`, `default` → `./dist/skins/*.js` — манифест скина |

Экспорта `./style.css` нет: CSS собирается отдельным файлом на каждый скин. Шаблоны `./skins/*` покрывают любой скин из `src/skins/` — новый скин доступен как `@v-lab/ui-kit/skins/<name>` и `@v-lab/ui-kit/skins/<name>.css` без правок `package.json`. Другие подпути (`@v-lab/ui-kit/dist/...`, `@v-lab/ui-kit/components/...`) закрыты полем `exports`.

## Установка по сценариям

Сам пакет пока ставится из локального tarball (registry не выбран) — см. раздел «Откуда ставить пакет» ниже. Команды в этом разделе ставят только peer-зависимости.

### Только основной bundle

```bash
npm install react react-dom clsx @remixicon/react @floating-ui/react
```

### С `DateInput`

```bash
npm install imask react-imask
```

```tsx
import { DateInput } from '@v-lab/ui-kit/date'
```

### С `PhoneInput`

```bash
npm install libphonenumber-js react-phone-number-input
```

```tsx
import { PhoneInput } from '@v-lab/ui-kit/phone'
```

### С `PdfPreview`

```bash
npm install react-pdf pdfjs-dist
```

```tsx
import { PdfPreview } from '@v-lab/ui-kit/pdf'
```

### С `MarkdownInput`

```bash
npm install marked turndown
```

```tsx
import { MarkdownInput } from '@v-lab/ui-kit/markdown'
```

`RichInput` из основного bundle работает с HTML и этих зависимостей **не требует** — они нужны только для Markdown.

### С RHF-адаптерами

```bash
npm install react-hook-form
```

```tsx
import { RHFTextInput, RHFTagInput, RHFCheckbox } from '@v-lab/ui-kit/adapters'
```

## Стили и скин

В корне приложения, **до собственных стилей**:

```tsx
import '@v-lab/ui-kit/skins/corporate.css'
import { ThemeProvider } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

root.render(
  <ThemeProvider skins={[corporateSkin]} defaultColorScheme="system">
    <App />
  </ThemeProvider>
)
```

Нужны оба импорта: `skins/corporate.css` несёт CSS скина, `skins/corporate` — только его манифест `corporateSkin`. Стили действуют под атрибутом `data-vl-skin` на `<html>` — его ставит `ThemeProvider`; без провайдера достаточно `<html data-vl-skin="corporate" data-vl-scheme="light">`. При SSR атрибуты рендерятся на серверном `<html>` хелпером `themeHtmlAttributes(corporateSkin, 'light')` из `@v-lab/ui-kit` — см. [`../guides/installation.md`](../guides/installation.md).

## Откуда ставить пакет

Registry для `@v-lab/ui-kit` пока не выбран, `publishConfig` и `.npmrc` в репозитории нет. До решения пакет собирается в tarball (`npm run build && npm pack` → `v-lab-ui-kit-<version>.tgz`) и ставится из файла: `npm install /path/to/v-lab-ui-kit-<version>.tgz`. Пошагово и что известно про выбор registry — в [`../guides/installation.md`](../guides/installation.md). Что менялось в entry points между версиями — в [`../guides/migrations.md`](../guides/migrations.md).
