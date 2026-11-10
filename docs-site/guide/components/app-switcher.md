---
title: AppSwitcher
description: Переключатель приложений для header'а — trigger с активным приложением и сетка в dropdown.
---

# AppSwitcher

Переключатель приложений для шапки. Показывает активное приложение в кнопке-trigger'е и сетку 3×N со всеми доступными приложениями в выпадающем меню.

## Превью

<ComponentDocsPreview name="appSwitcher" />

## Импорт

```tsx
import { AppSwitcher } from '@v-lab/ui-kit'
import type { AppItem } from '@v-lab/ui-kit'
```

## Пример

```tsx
import { AppSwitcher } from '@v-lab/ui-kit'
import type { AppItem } from '@v-lab/ui-kit'

const apps: AppItem[] = [
  { id: 'hrm', label: 'HRM', description: 'HR система', isActive: true },
  { id: 'crm', label: 'CRM', description: 'Клиенты', href: '/crm/' },
  { id: 'erp', label: 'ERP', href: '/erp/', disabled: true },
]

export function AppHeader() {
  return (
    <header>
      <AppSwitcher apps={apps} />
    </header>
  )
}
```

## Иконки приложения

Поле `icon` в `AppItem` принимает три варианта:

| Значение            | Поведение                                                       |
| ------------------- | --------------------------------------------------------------- |
| `string` (URL/путь) | Рендерится через `<img>`, при ошибке загрузки — авто-инициал    |
| `ReactNode`         | Рендерится как есть                                             |
| `undefined`         | Авто-инициал: первая буква `label` со стабильным цветом по хешу |

```tsx
// URL или путь к файлу
{ icon: '/icons/hrm.png' }

// ReactNode
import { RiShieldCheckLine } from '@remixicon/react'
{ icon: <RiShieldCheckLine size={18} /> }

// Авто-инициал — просто не передавайте icon
{ id: 'hrm', label: 'HRM' }
```

## Промо-баннер

Баннер с анимированным градиентом показывается **по умолчанию** с дефолтным текстом. Передай свои строки из i18n провайдера — или `null` чтобы скрыть.

```tsx
// Свой текст из i18n (react-i18next, vue-i18n, etc.)
const { t } = useTranslation()

<AppSwitcher
  apps={apps}
  promo={{ title: t('nav.promo.title'), subtitle: t('nav.promo.subtitle') }}
/>

// Скрыть баннер
<AppSwitcher apps={apps} promo={null} />
```

Кастомный градиент через CSS или токены:

```tsx
promo={{
  title: 'Все продукты компании',
  subtitle: 'Один аккаунт — единый рабочий стол',
  gradient: 'linear-gradient(135deg, var(--success-base), var(--information-base))',
}}
```

## Пропсы `AppSwitcherProps`

| Проп    | Тип                        | Описание                                                                      |
| ------- | -------------------------- | ----------------------------------------------------------------------------- |
| `apps`  | `AppItem[]`                | Список приложений                                                             |
| `promo` | `AppSwitcherPromo \| null` | Промо-баннер. По умолчанию показывается с дефолтным текстом. `null` — скрыть. |

## Тип `AppSwitcherPromo`

| Поле       | Тип       | Описание                                                                                                                                                              |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`    | `string`  | Заголовок баннера                                                                                                                                                     |
| `subtitle` | `string?` | Подзаголовок (опционально)                                                                                                                                            |
| `gradient` | `string?` | CSS-значение `background`. По умолчанию — анимированный фиолетово-синий. Можно передать токены: `'linear-gradient(135deg, var(--primary-base), var(--feature-base))'` |

## Тип `AppItem`

| Поле          | Тип                    | Описание                                                              |
| ------------- | ---------------------- | --------------------------------------------------------------------- |
| `id`          | `string`               | Уникальный идентификатор                                              |
| `label`       | `string`               | Название (показывается в trigger'е и dropdown'е)                      |
| `description` | `string?`              | Подпись под названием в trigger'е для активного приложения            |
| `icon`        | `string \| ReactNode?` | Иконка: URL → `<img>`, ReactNode → рендер, `undefined` → авто-инициал |
| `href`        | `string?`              | URL для перехода (`window.location.assign`)                           |
| `onClick`     | `() => void?`          | Колбэк при клике (приоритет над `href`)                               |
| `isActive`    | `boolean?`             | Текущее активное приложение                                           |
| `badge`       | `number?`              | Числовой бейдж (уведомления); `99+` при значении > 99                 |
| `disabled`    | `boolean?`             | Недоступное приложение — серый, некликабельный, метка «Скоро»         |

## Галерея

<ComponentDocsPreview name="appSwitcherGallery" />

Исходники: `src/components/AppSwitcher/`.
