import { useState, useMemo, useCallback, useRef } from 'react'
import clsx from 'clsx'
import { ToggleGroupContext } from './ToggleGroupContext'
import { toggleGroupContract } from '@/theme/contracts/toggle-group'
import type { ToggleGroupProps } from './ToggleGroup.types'

const ITEM_SELECTOR = '[data-toggle-item]:not([disabled])'

export const ToggleGroup = (props: ToggleGroupProps) => {
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

  const containerRef = useRef<HTMLDivElement>(null)

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

  // ---- Roving focus ----
  const getInitialRovingValue = () => {
    // Start rover on the first pressed item; fall back to defaultValue or first item.
    if (pressedValues.size > 0) return [...pressedValues][0]
    if (defaultValue) return Array.isArray(defaultValue) ? defaultValue[0] : defaultValue
    return undefined
  }

  const [rovingValue, setRovingValue] = useState<string | undefined>(getInitialRovingValue)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e)
      if (!rovingFocus || e.defaultPrevented) return

      const items = Array.from(
        containerRef.current?.querySelectorAll<HTMLButtonElement>(ITEM_SELECTOR) ?? []
      )
      if (items.length === 0) return

      const currentIndex = items.findIndex((el) => el === document.activeElement)

      const isForward = orientation === 'vertical' ? e.key === 'ArrowDown' : e.key === 'ArrowRight'
      const isBackward = orientation === 'vertical' ? e.key === 'ArrowUp' : e.key === 'ArrowLeft'
      // Support both axes regardless of orientation (matches Radix behaviour)
      const isForwardAlt = e.key === 'ArrowDown'
      const isBackwardAlt = e.key === 'ArrowUp'

      let nextIndex = currentIndex

      if (isForward || (orientation === 'horizontal' && isForwardAlt)) {
        nextIndex =
          currentIndex === -1
            ? 0
            : loop
              ? (currentIndex + 1) % items.length
              : Math.min(currentIndex + 1, items.length - 1)
      } else if (isBackward || (orientation === 'horizontal' && isBackwardAlt)) {
        nextIndex =
          currentIndex === -1
            ? items.length - 1
            : loop
              ? (currentIndex - 1 + items.length) % items.length
              : Math.max(currentIndex - 1, 0)
      } else if (e.key === 'Home') {
        nextIndex = 0
      } else if (e.key === 'End') {
        nextIndex = items.length - 1
      } else {
        return
      }

      e.preventDefault()
      const target = items[nextIndex]
      target.focus()
      const targetValue = target.dataset.toggleValue
      if (targetValue) setRovingValue(targetValue)
    },
    [rovingFocus, loop, orientation, onKeyDown]
  )

  const ctx = useMemo(
    () => ({
      type,
      pressedValues,
      toggle,
      size,
      shape,
      disabled,
      rovingFocus,
      rovingValue,
      setRovingValue,
    }),
    [type, pressedValues, toggle, size, shape, disabled, rovingFocus, rovingValue]
  )

  return (
    <ToggleGroupContext.Provider value={ctx}>
      <div
        role="group"
        data-orientation={orientation}
        ref={containerRef}
        className={clsx(toggleGroupContract.className, className)}
        onKeyDown={handleKeyDown}
        {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

ToggleGroup.displayName = 'ToggleGroup'
