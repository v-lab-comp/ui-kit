# Установка

Исходный код пакета **`@v-lab/ui-kit`** — на GitHub: [v-lab-comp/ui-kit](https://github.com/v-lab-comp/ui-kit). Ниже — минимальный путь; полные инструкции лежат в репозитории в `docs/guides/installation.md`.

## Реестр пакетов

Реестр, в котором будет публиковаться пакет, ещё не выбран. Когда его выберут, здесь появятся адрес реестра и настройка доступа; статус решения — в репозитории, `docs/tech-debt/package-registry.md`.

До этого ставьте пакет только из локального архива (ниже): по имени `@v-lab/ui-kit` npm будет искать его на npmjs.com, а там кит не опубликован.

## Установка зависимостей

Соберите архив в клоне репозитория кита:

```bash
npm install
npm run build
npm pack
```

`npm pack` кладёт в корень репозитория архив `v-lab-ui-kit-<версия>.tgz` с собранным `dist/`. В приложении установите архив вместе с обязательными peer-пакетами:

```bash
npm install /путь/к/v-lab-ui-kit-<версия>.tgz react react-dom @remixicon/react clsx @floating-ui/react
```

npm запишет путь к архиву (`file:…`) в `package.json` приложения. Чтобы обновить кит, соберите новый архив и установите его так же.

Обязательные peer-пакеты для основного входа: **react**, **react-dom**, **@remixicon/react**, **clsx**, **@floating-ui/react** (оверлеи, Select и позиционирование).

Опциональные входы (`date`, `phone`, `pdf`, `markdown`, `adapters`) требуют дополнительных peer-зависимостей — см. экспорты и `peerDependencies` в `package.json` пакета. Отдельно про **`adapters`** и **`react-hook-form`**: [Адаптеры RHF](./adapters).

## Стили

Подключите CSS скина **до** ваших стилей и оберните приложение в `ThemeProvider`:

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

Компоненты сами по себе без оформления — его даёт скин. `@v-lab/ui-kit/skins/corporate.css` — стили скина **corporate** (токены, палитры и все компоненты), `@v-lab/ui-kit/skins/corporate` — его манифест `corporateSkin`. `ThemeProvider` включает скин (ставит `data-vl-skin` и `data-vl-scheme` на `<html>`) и переключает светлую/тёмную схему (`useTheme`). Без провайдера достаточно атрибутов на `<html>`:

```html
<html data-vl-skin="corporate" data-vl-scheme="light"></html>
```

Тёмная схема — `data-vl-scheme="dark"`. Без CSS скина или без `data-vl-skin` компоненты остаются без оформления.

Пропсы провайдера, переключение схемы, переопределение стилей и собственный скин — в разделе [Темизация](./theming).

При необходимости подключите вариативный шрифт **Google Sans** (`@fontsource/google-sans`) — см. Storybook и гайды в репозитории.

## Импорт компонентов

```tsx
import { Button, TextInput } from '@v-lab/ui-kit'
```

Отдельные точки входа: `@v-lab/ui-kit/date`, `phone`, `pdf`, `adapters` и т.д. Кратко про **`adapters`**: [React Hook Form adapters](./adapters).

## SSR и Next.js {#ssr}

Компоненты кита рендерятся на сервере (SSR). `ThemeProvider` ставит атрибуты на `<html>` только в эффекте на клиенте, поэтому при SSR отрисуйте их на серверном `<html>` сами — хелпером `themeHtmlAttributes(skin, scheme = 'light')` из `@v-lab/ui-kit`. Он возвращает те же атрибуты, что ставит провайдер: `data-vl-skin`, `data-vl-scheme`, `data-theme` и `style.colorScheme`. Тогда стили скина действуют с первого кадра, ещё до гидрации.

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

- **`'use client'`.** В собранном пакете пока нет директив `'use client'`, поэтому в App Router компоненты кита импортируйте не из `@v-lab/ui-kit` напрямую, а из своего файла с `'use client'` (выше — `app/ui-kit.ts`); для sub-entry — такой же файл, например `export * from '@v-lab/ui-kit/pdf'`. `themeHtmlAttributes` и `corporateSkin` — обычные функция и объект: их импортируйте из пакета напрямую, через `'use client'`-файл функцию на сервере вызвать нельзя. Скин с `load` (функцией) из серверного компонента в `ThemeProvider` не передать — тогда вынесите провайдер в свой клиентский компонент. Задача заведена в техдолг репозитория: `docs/tech-debt/use-client-directive.md`.
- **Сохранённая или системная схема.** Сервер не видит `localStorage` и настройку ОС, поэтому со `storageKey` или `defaultColorScheme="system"` первый кадр светлый, а нужная схема ставится после гидрации (`docs/tech-debt/ssr-color-scheme-flash.md`).
- **`PdfPreview`** (`@v-lab/ui-kit/pdf`) работает при SSR: `react-pdf` загружается лениво, только в браузере. Если приложение уже задало `pdfjs.GlobalWorkerOptions.workerSrc`, оно сохраняется; иначе используется URL воркера с unpkg (`getPdfWorkerUrl`).

Атрибуты без провайдера и подробности о схемах — в разделе [Темизация](./theming).
