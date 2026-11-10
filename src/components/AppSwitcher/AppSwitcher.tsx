import { useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { RiLayoutGridLine } from '@remixicon/react'
import { Box } from '@/components/Box'
import { useClickOutside } from '@/hooks'
import { contractPart } from '@/theme/contract'
import { appSwitcherContract } from '@/theme/contracts/app-switcher'
import type { AppItem, AppSwitcherProps, AppSwitcherPromo } from './AppSwitcher.types'

// ─── color hash (stable color from label string) ──────────────────────────────

const COLOR_NAMES = [
  'primary',
  'feature',
  'success',
  'warning',
  'error',
  'information',
  'away',
  'verified',
  'highlighted',
  'stable',
  'neutral',
] as const

type ColorName = (typeof COLOR_NAMES)[number]

const COLOR_VALUES: Record<ColorName, string> = {
  primary: 'var(--primary-base, #0b5fff)',
  feature: 'var(--feature-base, #7839ee)',
  success: 'var(--success-base, #12b76a)',
  warning: 'var(--warning-base, #f79009)',
  error: 'var(--error-base, #f04438)',
  information: 'var(--information-base, #2e90fa)',
  away: 'var(--away-base, #eab308)',
  verified: 'var(--verified-base, #0ea5e9)',
  highlighted: 'var(--highlighted-base, #ec4899)',
  stable: 'var(--stable-base, #14b8a6)',
  neutral: 'var(--faded-base, #6b7280)',
}

function hashColor(label: string): string {
  let hash = 5381
  for (let i = 0; i < label.length; i++) {
    hash = ((hash << 5) + hash + label.charCodeAt(i)) >>> 0
  }
  const name = COLOR_NAMES[hash % COLOR_NAMES.length] ?? 'neutral'
  return COLOR_VALUES[name]
}

// ─── AppIcon ──────────────────────────────────────────────────────────────────

type AppIconProps = { icon?: string | ReactNode; label: string; size: number }

function AppIcon({ icon, label, size }: AppIconProps) {
  const [imgError, setImgError] = useState(false)
  const radius = size <= 32 ? 8 : 10

  // Пустая строка — как отсутствие иконки: React 19 не ставит src="", и onError бы не сработал
  if (typeof icon === 'string' && icon !== '' && !imgError) {
    return (
      <img
        src={icon}
        alt={label}
        width={size}
        height={size}
        className={contractPart(appSwitcherContract, 'icon-img')}
        style={{ borderRadius: radius }}
        draggable={false}
        onError={() => setImgError(true)}
      />
    )
  }

  if (icon != null && typeof icon !== 'string') {
    return (
      <span
        className={contractPart(appSwitcherContract, 'icon-node')}
        style={{ width: size, height: size, borderRadius: radius } as CSSProperties}
      >
        {icon}
      </span>
    )
  }

  return (
    <span
      className={contractPart(appSwitcherContract, 'icon-initial')}
      style={
        {
          width: size,
          height: size,
          borderRadius: radius,
          fontSize: Math.round(size * 0.38),
          ['--app-icon-color']: hashColor(label),
        } as CSSProperties
      }
    >
      {label.charAt(0).toUpperCase()}
    </span>
  )
}

// ─── AppSwitcher ──────────────────────────────────────────────────────────────

const DEFAULT_PROMO: AppSwitcherPromo = {
  title: 'Все продукты компании',
  subtitle: 'Один аккаунт — единый рабочий стол',
}

export function AppSwitcher({ apps, promo = DEFAULT_PROMO }: AppSwitcherProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useClickOutside(containerRef, () => setOpen(false), open)

  const activeApp = apps.find((a) => a.isActive) ?? apps[0]

  function handleItemClick(app: AppItem) {
    setOpen(false)
    if (app.onClick) {
      app.onClick()
    } else if (app.href) {
      const { href } = app
      setTimeout(() => window.location.assign(href), 0)
    }
  }

  return (
    <Box ref={containerRef} className={appSwitcherContract.className}>
      {/* ── Trigger ── */}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="App switcher"
        className={contractPart(appSwitcherContract, 'trigger')}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={contractPart(appSwitcherContract, 'trigger-info')}>
          {activeApp && <AppIcon icon={activeApp.icon} label={activeApp.label} size={30} />}
          {activeApp && (
            <span className={contractPart(appSwitcherContract, 'trigger-labels')}>
              <span className={contractPart(appSwitcherContract, 'trigger-name')}>
                {activeApp.label}
              </span>
              {activeApp.description && (
                <span className={contractPart(appSwitcherContract, 'trigger-description')}>
                  {activeApp.description}
                </span>
              )}
            </span>
          )}
        </span>

        <span className={contractPart(appSwitcherContract, 'trigger-divider')} aria-hidden />

        <span className={contractPart(appSwitcherContract, 'trigger-grid')}>
          <RiLayoutGridLine size={15} />
        </span>
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <Box role="menu" className={contractPart(appSwitcherContract, 'dropdown')}>
          {promo && (
            <div
              className={contractPart(appSwitcherContract, 'promo')}
              style={
                promo.gradient
                  ? ({ '--promo-gradient': promo.gradient } as CSSProperties)
                  : undefined
              }
            >
              <p className={contractPart(appSwitcherContract, 'promo-title')}>{promo.title}</p>
              {promo.subtitle && (
                <p className={contractPart(appSwitcherContract, 'promo-subtitle')}>
                  {promo.subtitle}
                </p>
              )}
            </div>
          )}
          <div className={contractPart(appSwitcherContract, 'grid')}>
            {apps.map((app) => (
              <button
                key={app.id}
                type="button"
                role="menuitem"
                disabled={app.disabled}
                data-active={app.isActive && !app.disabled ? 'true' : undefined}
                className={contractPart(appSwitcherContract, 'item')}
                onClick={() => !app.disabled && handleItemClick(app)}
              >
                <span className={contractPart(appSwitcherContract, 'icon-wrap')}>
                  <AppIcon icon={app.icon} label={app.label} size={44} />
                  {app.isActive && !app.disabled && (
                    <span className={contractPart(appSwitcherContract, 'active-dot')} aria-hidden />
                  )}
                </span>

                <span className={contractPart(appSwitcherContract, 'item-label')}>{app.label}</span>

                {app.disabled && (
                  <span className={contractPart(appSwitcherContract, 'soon-label')} aria-hidden>
                    Скоро
                  </span>
                )}

                {!app.disabled && app.badge != null && app.badge > 0 && (
                  <span
                    className={contractPart(appSwitcherContract, 'badge')}
                    aria-label={`${app.badge} уведомлений`}
                  >
                    {app.badge > 99 ? '99+' : app.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Box>
      )}
    </Box>
  )
}

AppSwitcher.displayName = 'AppSwitcher'
