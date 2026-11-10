import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
} from 'react'
import { IMaskInput } from 'react-imask'
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  useDismiss,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react'
import clsx from 'clsx'
import { InputField } from '../base/InputField'
import { baseInputContract } from '@/theme/contracts/base-input'
import { useMergeRefs } from '@/utils/useMergeRefs'
import { Calendar, defaultLocale } from '../../Calendar'
import { contractPart } from '@/theme/contract'
import { dateInputContract } from '@/theme/contracts/date-input'
import type { DateInputProps } from './DateInput.types'
import {
  DATE_INPUT_MASK,
  DATE_INPUT_PLACEHOLDER,
  formatDateToMasked,
  formatIsoToMasked,
  formatMaskedToIso,
  parseMaskedDateString,
} from './dateInputFormat'
import { RiCalendarLine } from '@remixicon/react'

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      label,
      required,
      requiredMarker,
      optional,
      labelTooltip,
      hint,
      error,
      completed,
      completedColor,
      prefix,
      suffix,
      id,
      size = 'medium',
      disabled,
      className,
      value,
      onChange,
      onAccept,
      valueFormat = 'masked',
      locale = defaultLocale,
      getDotDays,
      placeholder = DATE_INPUT_PLACEHOLDER,
      ...inputProps
    },
    forwardedRef
  ) => {
    const maskedRef = useRef<HTMLInputElement | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false)

    // Позиционирование календаря: flip (если снизу не помещается) + shift (держит в пределах
    // вьюпорта по горизонтали). Портал в body, поэтому не обрезается контейнерами со скроллом.
    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom-start',
      strategy: 'fixed',
      middleware: [offsetMiddleware(6), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
    })

    // Закрытие по клику вне (учитывает порталённый календарь как «свой») и по Escape.
    const dismiss = useDismiss(context)
    const { getFloatingProps } = useInteractions([dismiss])

    useLayoutEffect(() => {
      if (isOpen) refs.setReference(containerRef.current)
    }, [isOpen, refs])

    /**
     * Отображаемая строка маски «DD / MM / YYYY».
     * При valueFormat="iso" + controlled нельзя выводить маску из `value` на каждом рендере:
     * пока пользователь вводит дату, в форме часто `''`, и маска бы сбрасывалась.
     */
    const [internalMasked, setInternalMasked] = useState(() => {
      if (value === undefined) return ''
      // ISO в форме → строка маски для поля; masked в форме → уже «DD / MM / YYYY»
      return valueFormat === 'iso' ? formatIsoToMasked(String(value)) : String(value)
    })

    const isControlled = value !== undefined

    // Синхронизация маски с ISO из формы при сбросе/загрузке (value меняется снаружи).
    useEffect(() => {
      if (value === undefined || valueFormat !== 'iso') return
      // eslint-disable-next-line react-hooks/set-state-in-effect -- намеренная подстройка отображения под контролируемый value
      setInternalMasked(formatIsoToMasked(String(value ?? '')))
    }, [value, valueFormat])

    // Контролируемый masked: value уже в формате маски (не ISO — см. DateInputProps).
    const displayMasked =
      isControlled && valueFormat !== 'iso' ? String(value ?? '') : internalMasked

    const calendarDate = parseMaskedDateString(displayMasked)

    const handleRef = useMergeRefs([maskedRef, forwardedRef])

    const emitOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = e.target.value
        /* controlled+masked: маской управляет value с родителя; иначе — локальная маска */
        if (!isControlled || valueFormat === 'iso') {
          setInternalMasked(masked)
        }
        if (!onChange) return
        if (valueFormat !== 'iso') {
          onChange(e)
          return
        }
        const iso = formatMaskedToIso(masked) ?? ''
        const next = {
          ...e,
          target: { ...e.target, value: iso },
          currentTarget: { ...e.currentTarget, value: iso },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(next)
      },
      [onChange, valueFormat, isControlled]
    )

    const emitOnAccept = useCallback(
      (masked: string) => {
        if (!onAccept) return
        if (valueFormat === 'iso') {
          const iso = formatMaskedToIso(masked) ?? ''
          onAccept(iso)
        } else {
          onAccept(masked)
        }
      },
      [onAccept, valueFormat]
    )

    /** When user picks a date in the calendar popover */
    const handleCalendarSelect = (date: Date | null) => {
      if (!date) return
      const masked = formatDateToMasked(date)
      if (!isControlled || valueFormat === 'iso') setInternalMasked(masked)
      emitOnAccept(masked)
      setIsOpen(false)
    }

    /** When user finishes typing in the mask */
    const handleMaskAccept = (val: string) => {
      if (!isControlled || valueFormat === 'iso') setInternalMasked(val)
      emitOnAccept(val)
    }

    const defaultPrefix = (
      <span
        onClick={(e) => {
          e.stopPropagation()
          if (!disabled) setIsOpen((v) => !v)
        }}
        className={contractPart(dateInputContract, 'calendar-btn')}
        data-disabled={disabled || undefined}
      >
        <RiCalendarLine size={20} />
      </span>
    )

    return (
      <div
        ref={containerRef}
        className={dateInputContract.className}
        onClick={!disabled ? () => setIsOpen(true) : undefined}
      >
        <InputField
          label={label}
          required={required}
          requiredMarker={requiredMarker}
          optional={optional}
          labelTooltip={labelTooltip}
          hint={hint}
          error={error}
          completed={completed}
          completedColor={completedColor}
          prefix={prefix ?? defaultPrefix}
          suffix={suffix}
          size={size}
          disabled={disabled}
          className={className}
          id={id}
        >
          {(fieldId) => (
            <IMaskInput
              inputRef={handleRef}
              id={fieldId}
              {...DATE_INPUT_MASK}
              placeholder={placeholder}
              value={displayMasked}
              onAccept={handleMaskAccept}
              disabled={disabled}
              data-size={size}
              data-error={!!error || undefined}
              data-filled={/\d/.test(displayMasked) || undefined}
              className={clsx(
                baseInputContract.className,
                contractPart(dateInputContract, 'input-inner')
              )}
              onChange={emitOnChange}
              {...(inputProps as object)}
              autoComplete={(() => {
                const ac = (inputProps as InputHTMLAttributes<HTMLInputElement>).autoComplete
                return ac === undefined || ac === '' ? 'off' : ac
              })()}
            />
          )}
        </InputField>

        {isOpen && (
          <FloatingPortal>
            <div
              ref={(el) => refs.setFloating(el)}
              className={contractPart(dateInputContract, 'popover')}
              style={floatingStyles}
              {...getFloatingProps({
                onClick: (e) => e.stopPropagation(),
                onMouseDown: (e) => e.stopPropagation(),
              })}
            >
              <Calendar
                value={calendarDate}
                onChange={handleCalendarSelect}
                locale={locale}
                getDotDays={getDotDays}
              />
            </div>
          </FloatingPortal>
        )}
      </div>
    )
  }
)

DateInput.displayName = 'DateInput'
