# Установка пакета

Инструкция для разработчика, подключающего `@v-lab/ui-kit` в свой проект.

Registry для пакета пока не выбран, и в registry `@v-lab/ui-kit` не опубликован: варианты и что осталось настроить — в [`../tech-debt/package-registry.md`](../tech-debt/package-registry.md). До этого пакет ставится из локального tarball.

## 1. Собрать tarball пакета

В репозитории кита ([github.com/v-lab-comp/ui-kit](https://github.com/v-lab-comp/ui-kit)):

```bash
npm install
npm run build && npm pack   # → v-lab-ui-kit-<version>.tgz
```

В tarball попадают `dist/` (поле `files` в `package.json`), `package.json` и `README.md`. Готовый tarball выпущенной версии может передать и мейнтейнер пакета.

## 2. Установить пакет из tarball

В проекте-потребителе:

```bash
npm install /path/to/v-lab-ui-kit-<version>.tgz
```

npm запишет в `package.json` зависимость `"@v-lab/ui-kit": "file:…/v-lab-ui-kit-<version>.tgz"`. Путь должен быть доступен везде, где ставятся зависимости приложения (у других разработчиков, в CI приложения) — например, tarball можно положить в репозиторий приложения и указать относительный путь. Новая версия кита — новый tarball и повторный `npm install` с ним.

`npm install @v-lab/ui-kit` без пути сейчас не работает: npm ищет пакет в registry по умолчанию и не находит его (`E404`).

## 3. Установить peer-зависимости

Минимум, нужный любому проекту (React — 18.2+ или 19):

```bash
npm install react react-dom @remixicon/react clsx @floating-ui/react
```

Опциональные пакеты добавляются только если используется соответствующий sub-entry — полная таблица `entry → peers` в [`../reference/subpath-exports.md`](../reference/subpath-exports.md). Типичные ситуации:

```bash
# + DateInput
npm install imask react-imask

# + PhoneInput
npm install libphonenumber-js react-phone-number-input

# + PdfPreview
npm install react-pdf pdfjs-dist

# + react-hook-form адаптеры
npm install react-hook-form
```

## 4. Подключить стили

В корневом файле приложения (`main.tsx`, `App.tsx`), **до собственных стилей**:

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

Компоненты сами по себе без оформления — его даёт скин. `@v-lab/ui-kit/skins/corporate.css` — стили скина **corporate** (токены, палитры и все компоненты), `@v-lab/ui-kit/skins/corporate` — его манифест `corporateSkin`. `ThemeProvider` включает скин (ставит `data-vl-skin` и `data-vl-scheme` на `<html>`) и переключает светлую/тёмную схему (`useTheme`). Без провайдера достаточно атрибутов: `<html data-vl-skin="corporate" data-vl-scheme="light">`, тёмная схема — `data-vl-scheme="dark"`. Без CSS скина или без `data-vl-skin` компоненты будут без оформления.

CSS скина подключается **первым**: правила скина весят ровно столько, сколько их селектор (`.vl-button` — 0,1,0), поэтому стили приложения, подключённые после, перебивают их обычным классом, а токены переопределяются на `:root`. Подробнее — в [`../architecture/theming.md`](../architecture/theming.md).

Опционально — шрифт Google Sans (если он используется в дизайне продукта):

```bash
npm install @fontsource/google-sans
```

```tsx
import '@fontsource/google-sans/latin-400.css'
import '@fontsource/google-sans/latin-500.css'
import '@fontsource/google-sans/cyrillic-400.css'
import '@fontsource/google-sans/cyrillic-500.css'
import '@v-lab/ui-kit/skins/corporate.css'
```

Без шрифта используется системный `system-ui`.

## 5. Использовать компоненты

```tsx
import { Button, TextInput, Badge } from '@v-lab/ui-kit'

export function App() {
  return (
    <form>
      <TextInput label="Имя" placeholder="Введите имя…" />
      <Badge color="success">Активен</Badge>
      <Button>Отправить</Button>
    </form>
  )
}
```

Компоненты, требующие отдельных peer-зависимостей, импортируются из sub-entry:

```tsx
import { DateInput } from '@v-lab/ui-kit/date'
import { PhoneInput } from '@v-lab/ui-kit/phone'
import { PdfPreview } from '@v-lab/ui-kit/pdf'
import { RHFTextInput } from '@v-lab/ui-kit/adapters'
```

## 6. SSR и Next.js

Компоненты кита рендерятся на сервере. `ThemeProvider` ставит атрибуты на `<html>` только в эффекте на клиенте, поэтому при SSR их нужно отрисовать на серверном `<html>` — хелпером `themeHtmlAttributes(skin, scheme = 'light')` из `@v-lab/ui-kit`. Он возвращает те же атрибуты, что ставит провайдер: `data-vl-skin`, `data-vl-scheme`, `data-theme` и `style.colorScheme`. Тогда стили скина действуют с первого кадра, ещё до гидрации.

Пример для **Next.js App Router**:

```tsx
// app/ui-kit.ts
'use client'
export * from '@v-lab/ui-kit'
```

```tsx
// app/layout.tsx — серверный компонент
import type { ReactNode } from 'react'
import '@v-lab/ui-kit/skins/corporate.css'
import { themeHtmlAttributes } from '@v-lab/ui-kit'
import { corporateSkin } from '@v-lab/ui-kit/skins/corporate'
import { ThemeProvider } from './ui-kit'

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

- **`'use client'`.** В собранном пакете пока нет директив `'use client'`, поэтому в App Router компоненты кита импортируются не из `@v-lab/ui-kit` напрямую, а из своего файла с `'use client'` (выше — `app/ui-kit.ts`); для sub-entry — такой же файл, например `export * from '@v-lab/ui-kit/pdf'`. `themeHtmlAttributes` и `corporateSkin` — обычные функция и объект: их импортируют из пакета напрямую, через `'use client'`-файл функцию на сервере вызвать нельзя. Скин с `load` (функцией) из серверного компонента в `ThemeProvider` не передать — тогда провайдер выносится в свой клиентский компонент. Это техдолг: [`../tech-debt/use-client-directive.md`](../tech-debt/use-client-directive.md).
- **Сохранённая или системная схема.** Сервер не видит `localStorage` и настройку ОС, поэтому со `storageKey` или `defaultColorScheme="system"` первый кадр светлый, а нужная схема ставится после гидрации — [`../tech-debt/ssr-color-scheme-flash.md`](../tech-debt/ssr-color-scheme-flash.md).
- **`PdfPreview`** (`@v-lab/ui-kit/pdf`) работает при SSR: `react-pdf` загружается лениво, только в браузере. Если приложение уже задало `pdfjs.GlobalWorkerOptions.workerSrc`, оно сохраняется; иначе используется URL воркера с unpkg (`getPdfWorkerUrl`).

## Troubleshooting

| Симптом                                               | Причина и решение                                                                                                                                                                                                                                                           |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm error code E404` при `npm install @v-lab/ui-kit` | Пакета нет в registry: registry ещё не выбран. Установите пакет из tarball — шаги 1–2 выше.                                                                                                                                                                                 |
| `Cannot find module '@floating-ui/react'`             | Не установлен обязательный peer. `npm install @floating-ui/react`.                                                                                                                                                                                                          |
| `Invalid hook call` / две копии React                 | Дубль React в `node_modules`. `npm ls react` — должна быть одна версия. При необходимости — `overrides` / `resolutions` в `package.json`.                                                                                                                                   |
| `Cannot find module '@v-lab/ui-kit/date'`             | Старый импорт без sub-entry. Перейти на `@v-lab/ui-kit/date` — таблица в [`../reference/subpath-exports.md`](../reference/subpath-exports.md).                                                                                                                              |
| Стили компонентов «голые»                             | Компоненты без стилей, оформление даёт скин. Проверьте оба условия: подключён `@v-lab/ui-kit/skins/corporate.css` и на `<html>` есть `data-vl-skin="corporate"` — его ставит `ThemeProvider skins={[corporateSkin]}` (при SSR — `themeHtmlAttributes`) или атрибут вручную. |
| `Cannot find module '@v-lab/ui-kit/style.css'`        | Файла больше нет: CSS собирается отдельно на скин. Замените импорт на `@v-lab/ui-kit/skins/corporate.css` — [`migrations.md`](migrations.md).                                                                                                                               |
| `… only works in Client Components` (Next.js)         | Компонент кита импортирован в серверный компонент напрямую. Импортируйте через свой файл с `'use client'` — раздел «SSR и Next.js» выше.                                                                                                                                    |

Что менялось между версиями (включая разделение entry points) — в [`migrations.md`](migrations.md).
