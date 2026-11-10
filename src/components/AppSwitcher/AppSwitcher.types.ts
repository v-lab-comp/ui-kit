import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

/**
 * Промо-баннер в верхней части dropdown'а.
 * Текст передаётся напрямую — подставляй строки из своего i18n провайдера.
 *
 * @example
 * promo={{ title: t('appSwitcher.promo.title'), subtitle: t('appSwitcher.promo.subtitle') }}
 */
export type AppSwitcherPromo = {
  /** Заголовок баннера */
  title: string
  /** Подзаголовок (опционально) */
  subtitle?: string
  /**
   * CSS-градиент для фона. По умолчанию — фиолетово-синий градиент.
   * Можно передать любое значение CSS background, в том числе токены:
   * `'linear-gradient(135deg, var(--primary-base), var(--feature-base))'`
   */
  gradient?: string
}

/**
 * Пункт меню. `T` — компонент ссылки из `as` (по умолчанию `<a>`): Link роутера и т.п.
 *
 * @example
 * { id: 'crm', label: 'CRM', href: '/crm', as: Link, linkProps: { prefetch: false } }
 */
export type AppItem<T extends ElementType = 'a'> = {
  id: string
  /** Название приложения */
  label: string
  /** Подпись под названием (показывается в trigger для активного приложения) */
  description?: string
  /** Иконка: URL/путь к изображению, ReactNode; undefined или пустая строка → авто-инициал */
  icon?: string | ReactNode
  /** URL перехода: пункт рендерится ссылкой `<a href>`. Если есть и `onClick` — обычный клик вызывает только `onClick`, Ctrl/⌘/средняя кнопка открывают `href` */
  href?: string
  /** Компонент ссылки для пункта с `href` (по умолчанию `<a>`), например Link роутера. Получает `href`, `linkProps` и пропсы пункта меню */
  as?: T
  /** Дополнительные пропсы ссылки (`as` или `<a>`): `target`, `prefetch`, `replace` и т.п. */
  linkProps?: Omit<
    ComponentPropsWithoutRef<T>,
    'as' | 'href' | 'children' | 'className' | 'role' | 'onClick'
  >
  onClick?: () => void
  /** Пометить как текущее активное приложение */
  isActive?: boolean
  /** Числовой бейдж (уведомления) */
  badge?: number
  /** Недоступно — серый, не кликабельно, показывает «Скоро» */
  disabled?: boolean
}

export type AppSwitcherProps<T extends ElementType = 'a'> = {
  apps: AppItem<T>[]
  /**
   * Промо-баннер в верхней части выпадающего меню.
   * По умолчанию показывается с дефолтным текстом.
   * Передай `null` чтобы скрыть баннер.
   */
  promo?: AppSwitcherPromo | null
}
