import { forwardRef, useState } from 'react'
import clsx from 'clsx'
import { contractAttrs } from '@/theme/contract'
import { baseInputContract } from '@/theme/contracts/base-input'
import type { BaseInputProps } from './BaseInput.types'

const hasValue = (v: unknown): boolean => v != null && String(v).length > 0

/**
 * Базовый input без label/hint. Используется внутри TextInput или standalone.
 * Размеры: big 40px, medium 36px, small 32px.
 * По умолчанию **`autoComplete="off"`**, чтобы браузер не подмешивал подсказки в произвольные поля; передайте свой **`autoComplete`**, где нужен осмысленный автозаполнитель (**`email`**, **`url`** и т.д.).
 * Пустая строка **`autoComplete=""`** трактуется как **`off`** (иначе часть браузеров включает эвристики автозаполнения).
 */
export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ size = 'medium', hasError, className, autoComplete, onInput, ...props }, ref) => {
    const isControlled = props.value !== undefined
    const [filledState, setFilledState] = useState(() =>
      hasValue(props.value ?? props.defaultValue)
    )
    const filled = isControlled ? hasValue(props.value) : filledState

    return (
      <input
        ref={ref}
        className={clsx(baseInputContract.className, className)}
        {...contractAttrs(baseInputContract, { size, error: hasError, filled })}
        onInput={(e) => {
          if (!isControlled) setFilledState(e.currentTarget.value.length > 0)
          onInput?.(e)
        }}
        {...props}
        autoComplete={autoComplete === undefined || autoComplete === '' ? 'off' : autoComplete}
      />
    )
  }
)

BaseInput.displayName = 'BaseInput'
