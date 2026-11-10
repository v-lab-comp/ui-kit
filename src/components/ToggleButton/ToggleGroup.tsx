import { forwardRef, useState, useMemo, useCallback } from 'react'
import { Composite } from '@floating-ui/react'
import clsx from 'clsx'
import { ToggleGroupContext } from './ToggleGroupContext'
import { toggleGroupContract } from '@/theme/contracts/toggle-group'
import { useRovingTabStop } from './useRovingTabStop'
import { useMergeRefs } from '@/utils/useMergeRefs'
import type { ToggleGroupProps } from './ToggleGroup.types'

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(props, ref) {
    const {
      children,
      type,
      size,
      shape,
      disabled,
      rovingFocus = true,
      loop = true,
      orientation = 'horizontal',
      className,
      onKeyDown,
      ...rest
    } = props

    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      ...divProps
    } = rest as {
      value?: string | string[]
      defaultValue?: string | string[]
      onValueChange?: (v: string | string[] | undefined) => void
      [k: string]: unknown
    }

    // ---- Selection state ----
    const [uncontrolledValues, setUncontrolledValues] = useState<Set<string>>(() => {
      const init = defaultValue
      if (!init) return new Set()
      if (Array.isArray(init)) return new Set(init)
      return new Set([init])
    })

    const isControlled = valueProp !== undefined
    const controlledSet = useMemo(() => {
      if (!isControlled) return null
      if (Array.isArray(valueProp)) return new Set(valueProp as string[])
      return valueProp ? new Set([valueProp as string]) : new Set<string>()
    }, [isControlled, valueProp])

    const pressedValues: Set<string> = isControlled ? controlledSet! : uncontrolledValues

    const toggle = useCallback(
      (value: string) => {
        if (type === 'single') {
          const next = pressedValues.has(value) ? undefined : value
          if (!isControlled) setUncontrolledValues(next ? new Set([next]) : new Set())
          ;(onValueChange as ((v: string | undefined) => void) | undefined)?.(next)
        } else {
          const next = new Set(pressedValues)
          if (next.has(value)) next.delete(value)
          else next.add(value)
          if (!isControlled) setUncontrolledValues(next)
          ;(onValueChange as ((v: string[]) => void) | undefined)?.([...next])
        }
      },
      [type, pressedValues, isControlled, onValueChange]
    )

    // ---- Roving focus: Composite из floating-ui + ровно один tab stop ----
    const roving = useRovingTabStop<HTMLDivElement>({ selectedSelector: '[aria-pressed="true"]' })
    const mergedRef = useMergeRefs([roving.containerRef, ref])

    const ctx = useMemo(
      () => ({ type, pressedValues, toggle, size, shape, disabled, rovingFocus }),
      [type, pressedValues, toggle, size, shape, disabled, rovingFocus]
    )

    const groupProps = {
      role: 'group',
      'data-orientation': orientation,
      className: clsx(toggleGroupContract.className, className),
      ...(divProps as React.HTMLAttributes<HTMLDivElement>),
    }

    return (
      <ToggleGroupContext.Provider value={ctx}>
        {rovingFocus ? (
          <Composite
            // horizontal — стрелки обеих осей (как раньше); vertical — только ↑/↓
            orientation={orientation === 'vertical' ? 'vertical' : 'both'}
            loop={loop}
            activeIndex={roving.activeIndex}
            onNavigate={roving.onNavigate}
            onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
              onKeyDown?.(e as React.KeyboardEvent<HTMLDivElement>)
              roving.onKeyDown(e)
            }}
            // aria-orientation недопустим для role="group" — убираем его из пропсов Composite
            render={({ 'aria-orientation': _orientation, ...htmlProps }) => (
              <div {...htmlProps} {...groupProps} ref={mergedRef}>
                {children}
              </div>
            )}
          />
        ) : (
          <div {...groupProps} ref={ref} onKeyDown={onKeyDown}>
            {children}
          </div>
        )}
      </ToggleGroupContext.Provider>
    )
  }
)

ToggleGroup.displayName = 'ToggleGroup'
