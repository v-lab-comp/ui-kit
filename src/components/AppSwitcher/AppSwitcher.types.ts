import type { ReactNode } from 'react'

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

export type AppItem = {
  id: string
  /** Название приложения */
  label: string
  /** Подпись под названием (показывается в trigger для активного приложения) */
  description?: string
  /** Иконка: URL/путь к изображению, ReactNode; undefined или пустая строка → авто-инициал */
  icon?: string | ReactNode
  /** URL перехода: пункт рендерится ссылкой `<a href>`. Если есть и `onClick` — обычный клик вызывает только `onClick`, Ctrl/⌘/средняя кнопка открывают `href` */
  href?: string
  onClick?: () => void
  /** Пометить как текущее активное приложение */
  isActive?: boolean
  /** Числовой бейдж (уведомления) */
  badge?: number
  /** Недоступно — серый, не кликабельно, показывает «Скоро» */
  disabled?: boolean
}

export type AppSwitcherProps = {
  apps: AppItem[]
  /**
   * Промо-баннер в верхней части выпадающего меню.
   * По умолчанию показывается с дефолтным текстом.
   * Передай `null` чтобы скрыть баннер.
   */
  promo?: AppSwitcherPromo | null
}
