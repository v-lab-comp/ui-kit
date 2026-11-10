# Хуки

Все публичные хуки экспортируются из основного entry `@v-lab/ui-kit`.

## `useTheme`

Скин и цветовая схема из ближайшего `ThemeProvider`. Вне провайдера бросает ошибку.

```tsx
import { useTheme } from '@v-lab/ui-kit'

const { skin, setSkin, skins, colorScheme, resolvedColorScheme, setColorScheme } = useTheme()
setColorScheme('system')
```

| Поле                  | Тип                                       | Назначение                                           |
| --------------------- | ----------------------------------------- | ---------------------------------------------------- |
| `skin`                | `string`                                  | Имя активного скина                                  |
| `setSkin`             | `(name: string) => void`                  | Сменить скин; имя не из `skins` провайдера — ошибка  |
| `skins`               | `string[]`                                | Имена доступных скинов                               |
| `colorScheme`         | `'light' \| 'dark' \| 'system'`           | Выбор пользователя                                   |
| `resolvedColorScheme` | `'light' \| 'dark'`                       | Фактическая схема после учёта `prefers-color-scheme` |
| `setColorScheme`      | `(scheme: ColorSchemePreference) => void` | Сменить схему                                        |

В controlled-режиме (`skin` / `colorScheme` переданы в провайдер) сеттеры только вызывают `onSkinChange` / `onColorSchemeChange`. Реализация — `src/theme/ThemeProvider.tsx`, устройство тем — в [`../architecture/theming.md`](../architecture/theming.md).

## `useClickOutside`

Вызывает callback при клике вне указанного элемента.

```tsx
import { useClickOutside } from '@v-lab/ui-kit'

const ref = useRef<HTMLDivElement>(null)
useClickOutside(ref, () => setOpen(false))
```

| Параметр         | Тип                           | Назначение                              |
| ---------------- | ----------------------------- | --------------------------------------- |
| `ref`            | `RefObject<T \| null>`        | Целевой элемент                         |
| `onClickOutside` | `(event: MouseEvent) => void` | Срабатывает при клике вне `ref.current` |
| `enabled?`       | `boolean` (default `true`)    | Включить / выключить подписку           |

Реализация — `src/hooks/dom/useClickOutside.ts`.

## `useTabsSearchParam`

Синхронизирует активный таб с URL search param (`?tab=...`). Подписывается на `popstate`, чтобы переключение табов работало через `history`-навигацию.

```tsx
import { useTabsSearchParam } from '@v-lab/ui-kit'

const { value, setTab } = useTabsSearchParam('tab', {
  defaultValue: 'overview',
})
```

Первый аргумент — имя параметра. Опции: `defaultValue`, `replace` (`true` по умолчанию — `history.replaceState`, `false` — `pushState`, отдельные шаги «Назад»), `validValues` (whitelist допустимых значений). Возвращает `{ value, setTab, onChange, getTabFromUrl }`. Реализация — `src/hooks/tabs/useTabsSearchParam.ts`.

## `useSidebar`

Доступ к состоянию `Sidebar` (collapsed / expanded) из любого компонента **внутри `SidebarLayout`**.

```tsx
import { useSidebar } from '@v-lab/ui-kit'

const { collapsed, toggle } = useSidebar()
```

Контекст устанавливает `SidebarLayout`. Вне него хук вернёт значения по умолчанию — `collapsed: false` и пустой `toggle` (см. `src/components/layout/Sidebar/SidebarContext.ts`). Устройство сайдбара — в [`../architecture/layout.md`](../architecture/layout.md).

## `useToast`

Программно показывает toast-уведомления. Требует `ToastProvider` выше в дереве.

```tsx
import { useToast, ToastProvider } from '@v-lab/ui-kit'

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  )
}

function MyComponent() {
  const toast = useToast()
  return <button onClick={() => toast.add('success', { title: 'Сохранено' })}>Save</button>
}
```

`useToast()` возвращает `{ add, dismiss }`: `add(color, options)` показывает уведомление и возвращает его `id`, `dismiss(id)` закрывает. Вне `ToastProvider` хук бросает ошибку.

Полное API уведомления (варианты, позиция, размер, действия) — в страницах VitePress (`docs-site/guide/components/toast.md`) и Storybook.

## `useCompositeInput`

Хук для composite-полей (значение собирается из нескольких частей: протокол + путь, код страны + телефон, домен + tld).

```tsx
import { useCompositeInput } from '@v-lab/ui-kit'

const { composedValue, parts, notify, notifyParts, hiddenInputs } = useCompositeInput({
  value,
  defaultValue,
  onChange,
  name,
  split: (full) => splitProtocol(full, 'https://'), // string → parts[]
  join: ([proto, path]) => proto + path, // parts[] → string
  formNames: ['protocol'], // ключи для <input type="hidden">
})
```

Правила:

- `value` / `onChange` снаружи — всегда **полная строка**, без частей.
- `formNames[i] === undefined` — часть пропускается в hidden-инпутах.
- `hiddenInputs` — готовый JSX; вставить в дерево, вручную `<input type="hidden">` не писать.

Эталонная реализация — `SiteInput` (`src/components/inputs/SiteInput/SiteInput.tsx`). Полное описание API — в `src/components/inputs/base/COMPOSITE_INPUTS.md` и в [`../architecture/inputs.md`](../architecture/inputs.md).
