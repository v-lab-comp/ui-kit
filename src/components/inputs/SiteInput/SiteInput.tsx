import clsx from 'clsx'
import { forwardRef, useId } from 'react'
import { InputField, inputFieldLabelId, splitInputFieldProps } from '../base/InputField'
import { BaseInput } from '../base/BaseInput'
import { compositeSelectName, useCompositeInput } from '../base/useCompositeInput'
import { SelectInput } from '../SelectInput'
import { contractPart } from '@/theme/contract'
import { siteInputContract } from '@/theme/contracts/site-input'
import type { SiteInputProps } from './SiteInput.types'

/** Match any scheme like https://, http://, ftp://, ssh:// */
const PROTOCOL_RE = /^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//

function splitProtocol(url: string, fallback: string): [string, string] {
  const match = url.match(PROTOCOL_RE)
  if (match) return [match[0], url.slice(match[0].length)]
  return [fallback, url]
}

export const SiteInput = forwardRef<HTMLInputElement, SiteInputProps>((props, ref) => {
  const {
    protocol = 'https://',
    protocolOptions,
    protocolAriaLabel,
    value,
    defaultValue,
    onChange,
    name,
    ...otherProps
  } = props
  const [field, inputProps] = splitInputFieldProps(otherProps)
  const { error, completed, completedColor, disabled } = field
  const size = field.size ?? 'medium'
  const defaultProtocol = protocolOptions?.[0]?.value ?? protocol

  const { parts, notifyParts, hiddenInputs } = useCompositeInput<[string, string]>({
    value: value as string | undefined,
    defaultValue: defaultValue as string | undefined,
    onChange,
    name,
    split: (url) => splitProtocol(url, defaultProtocol),
    join: ([proto, path]) => proto + path,
    formNames: ['protocol'],
  })

  const [currentProtocol, currentPath] = parts

  const showCompletedChrome = !!(completed && !error && !disabled)
  const generatedFieldId = useId()
  const fieldId = field.id ?? generatedFieldId

  const startBlock = protocolOptions ? (
    <SelectInput
      variant="inline"
      {...compositeSelectName({
        ariaLabel: protocolAriaLabel,
        labelId: field.label ? inputFieldLabelId(fieldId) : undefined,
        fallbackLabel:
          protocolOptions.find((option) => option.value === currentProtocol)?.label ??
          currentProtocol,
      })}
      options={protocolOptions}
      value={currentProtocol}
      onChange={(nextProtocol) => notifyParts([nextProtocol, currentPath])}
      size={size}
      disabled={disabled}
      placement="bottom"
      completed={showCompletedChrome}
      completedColor={completedColor}
    />
  ) : (
    currentProtocol
  )

  return (
    <>
      {hiddenInputs}
      <InputField
        {...field}
        size={size}
        className={clsx(siteInputContract.className, field.className)}
        id={fieldId}
        startBlock={startBlock}
      >
        {(_fieldId, control) => (
          <BaseInput
            ref={ref}
            {...control}
            type="text"
            inputMode="url"
            autoComplete="url"
            size={size}
            hasError={!!error}
            disabled={disabled}
            className={contractPart(siteInputContract, 'input-inner')}
            value={currentPath}
            onChange={(e) => notifyParts([currentProtocol, e.target.value])}
            {...inputProps}
          />
        )}
      </InputField>
    </>
  )
})

SiteInput.displayName = 'SiteInput'
