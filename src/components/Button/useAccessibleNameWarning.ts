import { Children, useEffect, type ReactNode } from 'react'

interface AccessibleNameSource {
  children?: ReactNode
  'aria-label'?: string
  'aria-labelledby'?: string
  title?: string
}

/** Есть ли у кнопки хоть какой-то источник доступного имени. */
export function hasAccessibleName({
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  title,
}: AccessibleNameSource): boolean {
  // Children.toArray отбрасывает null / undefined / boolean — пустая разметка не считается подписью.
  return Children.toArray(children).length > 0 || Boolean(ariaLabel || ariaLabelledBy || title)
}

/**
 * Dev-only предупреждение: кнопка без children, aria-label, aria-labelledby и title
 * не имеет доступного имени. Типы уже требуют подпись, но `as`-касты и JS-потребители их обходят.
 */
export function useAccessibleNameWarning(componentName: string, source: AccessibleNameSource) {
  const named = hasAccessibleName(source)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || named) return
    console.warn(
      `[${componentName}] Кнопка без подписи: передайте children, aria-label или aria-labelledby, ` +
        'иначе у неё нет доступного имени для скринридеров.'
    )
  }, [componentName, named])
}
