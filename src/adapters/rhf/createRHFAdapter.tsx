import type { ComponentType } from 'react'
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { Controller } from 'react-hook-form'

type FieldMapper<FieldProps> = (
  field: ControllerRenderProps<FieldValues, string>,
  fieldState: ControllerFieldState
) => Partial<FieldProps>

/**
 * Creates a React Hook Form adapter for any form component.
 * Extracts Controller props, spreads remaining props, and maps field/fieldState.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createRHFAdapter<FieldProps extends Record<string, any>>(
  Component: ComponentType<FieldProps>,
  mapField: FieldMapper<FieldProps>,
  displayName: string
) {
  type AdapterProps<T extends FieldValues> = UseControllerProps<T> &
    Omit<FieldProps, keyof ControllerRenderProps>

  const Adapter = <T extends FieldValues>({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    ...fieldProps
  }: AdapterProps<T>) => (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState }) => (
        <Component
          {...(fieldProps as unknown as FieldProps)}
          {...field}
          {...(mapField(
            field as unknown as ControllerRenderProps<FieldValues, string>,
            fieldState
          ) as Partial<FieldProps>)}
        />
      )}
    />
  )

  Adapter.displayName = displayName
  return Adapter
}
