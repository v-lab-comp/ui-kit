import type { ComponentType, Ref } from 'react'
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { Controller } from 'react-hook-form'

/** Ключи, которыми управляет `Controller` (`field`), — снаружи адаптера их не передают. */
type ControllerFieldKey = keyof ControllerRenderProps

/**
 * Пропсы адаптера: `UseControllerProps<T>` + пропсы компонента без ключей `field`
 * и без ключей `Controlled`, которые выставляет маппер (например `checked`).
 * Публичные типы `RHFXxxProps` выводятся из этого же типа — расхождение с фабрикой невозможно.
 */
export type RHFAdapterProps<
  FieldProps,
  T extends FieldValues,
  Controlled extends PropertyKey = never,
> = UseControllerProps<T> & Omit<FieldProps, ControllerFieldKey | Controlled>

/** Пропсы, которые маппер отдаёт компоненту: часть его пропсов + `ref` из `field` (для фокуса при ошибке). */
export type RHFMappedProps<FieldProps> = Partial<FieldProps> & { ref?: Ref<never> }

/**
 * Маппер полностью решает, какие ключи `field` попадут в компонент:
 * фабрика `field` сама не раскладывает (иначе чекбокс получил бы `value="true"`).
 */
export type RHFFieldMapper<FieldProps> = (
  field: ControllerRenderProps<FieldValues, string>,
  fieldState: ControllerFieldState
) => RHFMappedProps<FieldProps>

/**
 * Creates a React Hook Form adapter for any form component.
 * Extracts Controller props, spreads remaining props, and maps field/fieldState.
 */
export function createRHFAdapter<FieldProps extends object, Controlled extends PropertyKey = never>(
  Component: ComponentType<FieldProps>,
  mapField: RHFFieldMapper<FieldProps>,
  displayName: string
) {
  // `disabled` остаётся пропом компонента (как раньше): в Controller не передаём,
  // иначе RHF исключит значение из данных формы
  const Adapter = <T extends FieldValues>({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    ...fieldProps
  }: RHFAdapterProps<FieldProps, T, Controlled>) => (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState }) => {
        // field типизирован по T; маппер работает с общим FieldValues
        const mapped = mapField(field as ControllerRenderProps<FieldValues, string>, fieldState)
        return <Component {...(fieldProps as FieldProps)} {...(mapped as FieldProps)} />
      }}
    />
  )

  Adapter.displayName = displayName
  return Adapter
}
