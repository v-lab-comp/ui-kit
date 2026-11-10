# Директива `'use client'` для Next.js App Router

**Статус:** открыто · **Приоритет:** средний — до первого потребителя на Next.js App Router · **Заведено:** 2026-11-10

## Текущая ситуация

В собранном `dist/` нет директивы `'use client'` ни в одном модуле. В Next.js App Router (папка `app/`) компоненты по умолчанию серверные (Server Components): в них нельзя `useState`, `useEffect`, контекст и обработчики событий. Почти все компоненты кита — с хуками (`SelectInput`, `Modal`, `Tabs`, `Tooltip`, `ThemeProvider`, …), поэтому прямой импорт в серверный компонент падает:

```tsx
// app/page.tsx — серверный компонент по умолчанию
import { SelectInput } from '@v-lab/ui-kit' // ✗ «useState only works in Client Components…»
```

Обход на стороне потребителя — свой файл-прослойка:

```tsx
// app/ui-kit.ts
'use client'
export * from '@v-lab/ui-kit'
```

На SSR как таковой это не влияет: все stories рендерятся через `renderToString` в Node без ошибок (проверено 2026-11-10). Vite-SPA, Remix, Next.js Pages Router и Storybook директива не касается.

## Целевое состояние

Компоненты кита импортируются в серверные компоненты Next.js напрямую, без прослойки (как у MUI, Mantine, Chakra). Директива стоит **только** в модулях с клиентским кодом:

- **с директивой** — модули компонентов (`*.tsx`) и хуков (`use*.ts`), включая `ThemeProvider`;
- **без директивы** — утилиты и данные: `src/theme/skin.ts` (`themeHtmlAttributes`, `defineSkin`), `src/theme/contract.ts`, `src/theme/contracts/*`, `src/types/*`, `src/colors/*`, манифесты скинов и barrel-файлы (`index.js` точек входа).

Почему не везде: функцию из `'use client'`-модуля нельзя вызвать на сервере — она становится клиентской ссылкой. А `themeHtmlAttributes()` должен вызываться в серверном `app/layout.tsx`.

`'use client'` не отключает SSR: клиентские компоненты Next тоже рендерит на сервере в HTML и потом гидрирует.

## Trade-offs

- **Выигрываем:** импорт кита в App Router «из коробки», без прослойки у каждого потребителя.
- **Риски:** ошибочная директива на утилите ломает её вызов на сервере; ошибочное отсутствие на компоненте с хуками ломает импорт. Rollup вырезает директивы из исходников (`Module level directives cause errors when bundled`), поэтому ставить их надо при сборке (`output.banner` по модулю) или плагином вроде `rollup-preserve-directives`, и проверять в `dist/`.

## Сценарий миграции

- Шаг 1: в `vite.config.ts` добавить `output.banner`, который возвращает `'use client';` для чанков с `facadeModuleId` из `src/**/*.tsx` и `src/**/use*.ts` и пустую строку для остальных.
- Шаг 2: проверка в `postbuild` (`scripts/check-dist-css.mjs` или отдельный скрипт): директива есть у всех модулей компонентов и хуков и отсутствует у `theme/skin.js`, `theme/contract.js`, `theme/contracts/*`, манифестов `skins/*.js` и barrel-файлов.
- Шаг 3: смоук-тест на минимальном приложении Next.js App Router: серверный `layout.tsx` с `themeHtmlAttributes(corporateSkin)`, серверная `page.tsx` с `SelectInput`, `Modal`, `ThemeProvider`.
- Шаг 4: раздел «Next.js» в `docs-site/guide/installation.md` (ru/en/uz), запись в changelog.
- Откат: убрать `banner` из `vite.config.ts`.

## Метрики успеха

- `next build` минимального App Router-приложения проходит без прослойки `'use client'` у потребителя.
- В `dist/` директива ровно у модулей компонентов и хуков; `themeHtmlAttributes` вызывается в серверном `layout.tsx`.
