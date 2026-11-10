import { forwardRef, useId, useRef, type KeyboardEvent, type MouseEvent } from 'react'
import { IMaskInput } from 'react-imask'
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import clsx from 'clsx'
import { RiCalendarLine } from '@remixicon/react'
import { InputField, inputFieldLabelId, splitInputFieldProps } from '../base/InputField'
import { baseInputContract } from '@/theme/contracts/base-input'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { Calendar, defaultLocale } from '../../Calendar'
import { contractPart } from '@/theme/contract'
import { dateInputContract } from '@/theme/contracts/date-input'
import type { DateInputProps } from './DateInput.types'
import { DATE_INPUT_MASK, DATE_INPUT_PLACEHOLDER } from './dateInputFormat'
import { useDateInputValue } from './useDateInputValue'
import { useCalendarPopover } from './useCalendarPopover'

/** Пустой autoComplete трактуем как off — как в BaseInput. */
const normalizeAutoComplete = (ac: string | undefined) =>
  ac === undefined || ac === '' ? 'off' : ac

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>((props, forwardedRef) => {
  const [field, rest] = splitInputFieldProps(props)
  const {
    value,
    onChange,
    onAccept,
    valueFormat,
    locale = defaultLocale,
    getDotDays,
    calendarButtonLabel,
    placeholder = DATE_INPUT_PLACEHOLDER,
    autoComplete,
    onKeyDown,
    ...inputProps
  } = rest
  const { error, disabled } = field
  const size = field.size ?? 'medium'
  const autoId = useId()
  const fieldId = field.id ?? autoId
  // Имя кнопки и диалога: явный проп, иначе подпись поля.
  const labelledBy = field.label ? inputFieldLabelId(fieldId) : undefined

  const containerRef = useRef<HTMLDivElement>(null)
  const inputElRef = useRef<HTMLInputElement | null>(null)
  const inputRef = useMergeRefs([inputElRef, forwardedRef])
  // Куда вернуть фокус при закрытии: на кнопку, если открыли ею, иначе в поле.
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const dateValue = useDateInputValue({ value, onChange, onAccept, valueFormat })
  const toggleRef = useRef<HTMLButtonElement>(null)
  const {
    isOpen,
    focusInside,
    open,
    toggle,
    close,
    context,
    floatingStyles,
    setFloating,
    getToggleProps,
    getFloatingProps,
  } = useCalendarPopover(containerRef, disabled)

  const handleCalendarSelect = (date: Date) => {
    dateValue.acceptDate(date)
    close()
  }

  // Alt+↓ открывает календарь с фокусом на дне (как у combobox/date picker в APG).
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented || !e.altKey || e.key !== 'ArrowDown') return
    e.preventDefault()
    returnFocusRef.current = inputElRef.current
    open(true)
  }

  const handleToggleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Не даём клику всплыть до контейнера (он открывает без переноса фокуса).
    e.stopPropagation()
    returnFocusRef.current = toggleRef.current
    toggle()
  }

  const defaultPrefix = (
    <button
      ref={toggleRef}
      type="button"
      className={contractPart(dateInputContract, 'calendar-btn')}
      data-disabled={disabled || undefined}
      disabled={disabled}
      aria-label={calendarButtonLabel}
      aria-labelledby={calendarButtonLabel ? undefined : labelledBy}
      {...getToggleProps()}
      onClick={handleToggleClick}
    >
      <RiCalendarLine size={20} aria-hidden />
    </button>
  )

  return (
    <div
      ref={containerRef}
      className={dateInputContract.className}
      onClick={
        !disabled
          ? () => {
              returnFocusRef.current = inputElRef.current
              open(false)
            }
          : undefined
      }
    >
      <InputField {...field} id={fieldId} prefix={field.prefix ?? defaultPrefix} size={size}>
        {(_id, control) => (
          <IMaskInput
            inputRef={inputRef}
            {...control}
            {...DATE_INPUT_MASK}
            placeholder={placeholder}
            value={dateValue.displayMasked}
            onAccept={dateValue.acceptMasked}
            disabled={disabled}
            data-size={size}
            data-error={!!error || undefined}
            data-filled={/\d/.test(dateValue.displayMasked) || undefined}
            className={clsx(
              baseInputContract.className,
              contractPart(dateInputContract, 'input-inner')
            )}
            onChange={dateValue.handleChange}
            onKeyDown={handleKeyDown}
            {...(inputProps as object)}
            autoComplete={normalizeAutoComplete(autoComplete)}
          />
        )}
      </InputField>

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={focusInside}
            initialFocus={-1}
            returnFocus={returnFocusRef}
          >
            <div
              ref={setFloating}
              className={contractPart(dateInputContract, 'popover')}
              style={floatingStyles}
              aria-label={labelledBy ? undefined : calendarButtonLabel}
              aria-labelledby={labelledBy}
              {...getFloatingProps({
                onClick: (e) => e.stopPropagation(),
                onMouseDown: (e) => e.stopPropagation(),
              })}
            >
              <Calendar
                value={dateValue.calendarDate}
                onChange={handleCalendarSelect}
                locale={locale}
                getDotDays={getDotDays}
                autoFocus={focusInside}
              />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  )
})

DateInput.displayName = 'DateInput'
