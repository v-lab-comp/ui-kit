/**
 * Короткие имена для **`completedColor`** → **`var(--…-base)`** из **`tokens.css`**.
 * Любое другое значение (hex, **`rgb()`**, **`var(--custom)`**) возвращается как есть.
 */
const PRESETS: Record<string, string> = {
  primary: 'var(--primary-base)',
  success: 'var(--success-base)',
  warning: 'var(--warning-base)',
  error: 'var(--error-base)',
  information: 'var(--information-base)',
  faded: 'var(--faded-base)',
  feature: 'var(--feature-base)',
  verified: 'var(--verified-base)',
  away: 'var(--away-base)',
  highlighted: 'var(--highlighted-base)',
}

export function resolveCompletedBorderColor(completedColor: string): string {
  const key = completedColor.trim().toLowerCase()
  return PRESETS[key] ?? completedColor
}
