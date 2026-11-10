# Миграции и breaking changes

Что меняется в публичном API между мажорными и минорными версиями и как пройти апгрейд без сюрпризов. Полная история изменений — во внутреннем логе [`../changes/`](../changes/README.md) и в публичном changelog `docs-site/guide/changelog.md`; этот файл — только про breaking changes и сложные миграции.

## Текущая мажорная серия — `0.x`

Пакет в pre-1.0. Это значит:

- Минорные версии (`0.x.0`) могут содержать ломающие изменения.
- Любой breaking change сопровождается секцией ниже в этом файле и явной пометкой в публичном changelog.
- `1.0` пока не объявлена.

## 0.15 → следующая версия: V-Lab UI Kit, скины, только ESM

Изменения из `## [Unreleased]` публичного changelog. Внешний вид компонентов не меняется, но подключение — да.

### 1. Новое имя пакета

Пакет переименован в `@v-lab/ui-kit`, scope `@ui-kit` → `@v-lab`. Замените прежнее имя пакета в `dependencies` на `@v-lab/ui-kit`.

Registry для следующей версии ещё не выбран (0.15 и раньше публиковались в GitLab Package Registry, репозиторий с тех пор переехал на GitHub) — варианты в [`../tech-debt/package-registry.md`](../tech-debt/package-registry.md). Пока решения нет, `@v-lab/ui-kit` ставится из локального tarball — см. [`installation.md`](installation.md). Настройки GitLab registry в `.npmrc` проекта (строка `@ui-kit:registry=…`) и токен в `~/.npmrc` для `@v-lab/ui-kit` не нужны.

Во всех импортах, включая подпути, прежнее имя тоже меняется на `@v-lab/ui-kit`: `@v-lab/ui-kit/date`, `@v-lab/ui-kit/phone` и т.д.

### 2. Только ESM

CommonJS-сборка `dist/cjs/` удалена; в `exports` у каждого JS-entry — только `types` и `default`. Бандлеры (Vite, Next.js, Webpack 5) берут ESM как раньше. `require('@v-lab/ui-kit')` работает в Node 20.19+ / 22.12+ (там `require()` загружает ESM).

### 3. Компоненты без стилей: CSS скина + скин на `<html>`

Компоненты больше не несут CSS — оформление даёт скин `corporate`. Нужны **оба** шага:

```diff
- import '…/style.css' // style.css прежнего пакета
+ import '@v-lab/ui-kit/skins/corporate.css'
+ import { ThemeProvider } from '@v-lab/ui-kit'
+ import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'

  root.render(
+   <ThemeProvider skins={[corporateSkin]} defaultColorScheme="system">
      <App />
+   </ThemeProvider>
  )
```

- `style.css` больше нет: CSS собирается отдельным файлом на скин, `@v-lab/ui-kit/skins/corporate.css`. Импорт старого пути падает (`exports` его не знает).
- Стили действуют только под атрибутом `data-vl-skin` на `<html>`. Его ставит `ThemeProvider`; без провайдера — `<html data-vl-skin="corporate" data-vl-scheme="light">`; при SSR — `themeHtmlAttributes(corporateSkin, 'light')` на серверном `<html>` (см. [`installation.md`](installation.md)).
- Тёмная схема — `data-vl-scheme="dark"` на `<html>` (или `colorScheme` у провайдера). Прежний `data-theme="dark"` на `<html>` и на вложенном контейнере продолжает работать.

### 4. Классы и палитры

| Было                                                   | Стало                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Хешированные классы CSS Modules                        | Стабильные `vl-<name>`, части `vl-<name>__<part>`, data-атрибуты контракта    |
| Варианты через классы модуля (`.filled`, `.lighter`)   | `[data-variant='filled']`, `[data-size='small']` на корне `vl-<name>`         |
| Глобальные классы палитры `.color-primary`, `.color-…` | Атрибут `data-color="primary"` (палитра `[data-color='primary']` → `--pal-*`) |
| `@keyframes` с хешем                                   | `vl-<компонент>-<имя>`                                                        |

Если приложение цепляло стили к хешированным классам или к `.color-*` — перепишите селекторы на классы `vl-*` и data-атрибуты. Список атрибутов компонента — его контракт `src/theme/contracts/<name>.ts` (в рантайме — реестр `themeContracts`).

### 5. Как перекрасить компоненты под продукт

Правила скина обёрнуты в `:where([data-vl-skin~='corporate'])` с нулевой специфичностью, поэтому каждое весит ровно столько, сколько его внутренний селектор. CSS приложения подключается **после** `skins/corporate.css` — и тогда:

- **Токены** переопределяются на `:root` — в обеих схемах (тёмные токены скина тоже весят 0,1,0):

  ```css
  :root {
    --primary-base: #0b6bcb;
    --radius-10: 6px;
  }
  ```

- **Отдельный компонент** — своим классом через `className` или классом кита: `.vl-button` (0,1,0) бьёт правило скина того же веса порядком подключения, вариант — `.vl-button[data-variant='filled']` (0,2,0) бьёт `:where(.vl-button)[data-variant='filled']` (0,1,0).
- **Свой скин** поверх `corporate` — `defineSkin({ name, schemes: ['light', 'dark'], extends: corporateSkin, load })`; на `<html>` будет `data-vl-skin="corporate brand"`, применяются оба. Правила написания скина — [`../architecture/theming.md`](../architecture/theming.md).

### 6. React 18.2+ или 19

Peer `react` / `react-dom` — `^18.2.0 || ^19.0.0` (было `>=17`). На React 17 кит и раньше не работал: компоненты используют `useId` из React 18. На React 18.2+ менять ничего не нужно. На React 19 callback-ref компонентов кита может возвращать функцию очистки — она вызывается при отсоединении.

### 7. `Button` и кнопки только с иконкой

- `Button` без `type` теперь `type="button"`: кнопка в `<form>` больше не отправляет форму. Кнопкам отправки укажите `type="submit"`.
- `Button`, `ToggleButton`, `SegmentedControl.Item` без `children` требуют `aria-label` или `aria-labelledby` (ошибка TypeScript). Свои обёртки, которые сами подставляют имя, типизируйте через `ButtonBaseProps` / `ToggleButtonBaseProps` / `SegmentedControlItemBaseProps`.

## Sub-entry points для тяжёлых peer-зависимостей

С версии `0.2.0` `DateInput`, `PhoneInput`, `PdfPreview` и RHF-адаптеры вынесены в отдельные entry points. Импорт из основного `@v-lab/ui-kit` не сработает.

| Компонент    | Импорт                   | Peer-зависимости                                |
| ------------ | ------------------------ | ----------------------------------------------- |
| `DateInput`  | `@v-lab/ui-kit/date`     | `imask`, `react-imask`                          |
| `PhoneInput` | `@v-lab/ui-kit/phone`    | `libphonenumber-js`, `react-phone-number-input` |
| `PdfPreview` | `@v-lab/ui-kit/pdf`      | `react-pdf`, `pdfjs-dist`                       |
| RHF-адаптеры | `@v-lab/ui-kit/adapters` | `react-hook-form`                               |

Полная таблица entry → peers — в [`../reference/subpath-exports.md`](../reference/subpath-exports.md). Зачем разделено — в [`../architecture/bundling.md`](../architecture/bundling.md).

## Подключение глобальных стилей

С первой публичной версии до 0.15.0 включительно — один импорт `style.css` пакета в корне приложения. Начиная со следующей версии вместо него — CSS скина и скин на `<html>`:

```tsx
import '@v-lab/ui-kit/skins/corporate.css'
```

Без CSS скина или без `data-vl-skin` на `<html>` у компонентов нет оформления — см. раздел выше и [`installation.md`](installation.md).

## DateInput: `valueFormat`

С версии `0.5.0` у `DateInput` есть проп `valueFormat`:

- `'masked'` (по умолчанию) — `onChange` / `onAccept` отдают строку в формате маски (`DD / MM / YYYY`). Сохраняется для обратной совместимости.
- `'iso'` — отдают `YYYY-MM-DD` (ISO 8601). Это удобно для REST API и `react-hook-form` без ручного парсинга.

Для нового кода рекомендуется `valueFormat="iso"`. Утилита `formatMaskedToIso` экспортируется из `@v-lab/ui-kit/date` — если нужно нормализовать существующую строку маски.

## Troubleshooting

| Симптом                                               | Решение                                                                                                                |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `npm error code E404` при `npm install @v-lab/ui-kit` | Пакета нет в registry: registry ещё не выбран. Установите пакет из tarball (см. [`installation.md`](installation.md)). |
| `Cannot resolve '@floating-ui/react'`                 | Обязательный peer не установлен: `npm install @floating-ui/react`.                                                     |
| `Cannot find module '@v-lab/ui-kit/date'`             | Старый bundler / Node не понимает `exports` из `package.json`. Обновить tooling или импортировать с явным расширением. |
| `Invalid hook call` / две копии React                 | `npm ls react` — две версии. Привести к одной через `overrides` (`package.json`).                                      |
| `Cannot find module '…/style.css'`                    | `style.css` удалён — импортируйте `@v-lab/ui-kit/skins/corporate.css`.                                                 |
| Компоненты без оформления после апгрейда              | Нет скина на `<html>`: `ThemeProvider skins={[corporateSkin]}` или `data-vl-skin="corporate"`.                         |

Дополнительные проблемы установки — в [`installation.md`](installation.md) (раздел Troubleshooting).
